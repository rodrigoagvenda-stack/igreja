'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireRole, adminClient, logAudit } from '@/lib/supabase/admin-guard'

const BASE = '/admin/configuracoes'
const PAPEIS = ['admin', 'editor', 'leitura'] as const
type Papel = (typeof PAPEIS)[number]

function erro(msg: string): never {
  redirect(`${BASE}?erro=${encodeURIComponent(msg)}`)
}

function papelValido(v: unknown): v is Papel {
  return typeof v === 'string' && (PAPEIS as readonly string[]).includes(v)
}

// Textos que o e-mail de convite mostra ("Fulano convidou você ... com permissão de X (detalhe)").
const PERMISSAO: Record<Papel, { permissao: string; permissao_detalhe: string }> = {
  admin: { permissao: 'Administrador', permissao_detalhe: 'acesso total ao painel' },
  editor: { permissao: 'Editor de conteúdo', permissao_detalhe: 'Notícias, Agenda e Documentos' },
  leitura: { permissao: 'Somente leitura', permissao_detalhe: 'visualiza tudo, sem editar' },
}

async function dadosConvite(adminId: string, nome: string, papel: Papel) {
  const { data } = await adminClient().from('arq_usuarios_admin').select('nome').eq('user_id', adminId).maybeSingle()
  return { nome, convidado_por: data?.nome ?? 'O administrador', ...PERMISSAO[papel] }
}

export async function convidarUsuario(formData: FormData) {
  const admin = await requireRole(['admin'])
  const nome = String(formData.get('nome') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const papel = formData.get('papel')

  if (nome.length < 2 || nome.length > 80) erro('Informe o nome da pessoa.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) erro('E-mail inválido.')
  if (!papelValido(papel)) erro('Papel inválido.')

  const sb = adminClient()

  const { data: existente } = await sb.from('arq_usuarios_admin').select('user_id').eq('email', email).maybeSingle()
  if (existente) erro('Esse e-mail já tem acesso ao painel.')

  const { data: convite, error: conviteErr } = await sb.auth.admin.inviteUserByEmail(email, {
    data: await dadosConvite(admin.id, nome, papel),
  })
  if (conviteErr || !convite.user) {
    erro(
      conviteErr?.message.toLowerCase().includes('already been registered')
        ? 'Esse e-mail já tem uma conta. Remova a conta antiga antes de convidar de novo.'
        : 'Não foi possível enviar o convite. Tente de novo em instantes.'
    )
  }

  const { error: insertErr } = await sb.from('arq_usuarios_admin').insert({
    user_id: convite.user.id,
    nome,
    email,
    papel,
  })
  if (insertErr) {
    // Sem o registro de papel a pessoa não teria acesso a nada; desfaz o convite pra não deixar conta órfã.
    await sb.auth.admin.deleteUser(convite.user.id)
    erro('Não foi possível concluir o convite. Tente de novo.')
  }

  await logAudit({ user: admin, acao: 'create', entidade: 'usuario_admin', entidadeId: convite.user.id, detalhes: { email, papel } })
  revalidatePath(BASE)
  redirect(`${BASE}?ok=convidado`)
}

export async function reenviarConvite(userId: string) {
  const admin = await requireRole(['admin'])
  const sb = adminClient()

  const { data: perfil } = await sb.from('arq_usuarios_admin').select('email, nome, papel').eq('user_id', userId).maybeSingle()
  if (!perfil) erro('Usuário não encontrado.')

  const { data: auth } = await sb.auth.admin.getUserById(userId)
  if (auth.user?.email_confirmed_at) erro('Essa pessoa já aceitou o convite.')

  const { error } = await sb.auth.admin.inviteUserByEmail(perfil.email, {
    data: await dadosConvite(admin.id, perfil.nome, perfil.papel),
  })
  if (error) erro('Não foi possível reenviar o convite. Tente de novo em instantes.')

  await logAudit({ user: admin, acao: 'update', entidade: 'usuario_admin', entidadeId: userId, detalhes: { reenvio_convite: true } })
  redirect(`${BASE}?ok=reenviado`)
}

export async function alterarPapel(userId: string, formData: FormData) {
  const admin = await requireRole(['admin'])
  const papel = formData.get('papel')

  if (!papelValido(papel)) erro('Papel inválido.')
  // Bloqueia mexer no próprio papel: é o que garante que nunca fica sem nenhum admin.
  if (userId === admin.id) erro('Você não pode alterar o seu próprio papel.')

  const { error } = await adminClient().from('arq_usuarios_admin').update({ papel }).eq('user_id', userId)
  if (error) erro('Não foi possível alterar o papel.')

  await logAudit({ user: admin, acao: 'update', entidade: 'usuario_admin', entidadeId: userId, detalhes: { papel } })
  revalidatePath(BASE)
  redirect(`${BASE}?ok=atualizado`)
}

export async function removerUsuario(userId: string) {
  const admin = await requireRole(['admin'])
  if (userId === admin.id) erro('Você não pode remover a sua própria conta.')

  const sb = adminClient()
  const { data: perfil } = await sb.from('arq_usuarios_admin').select('email').eq('user_id', userId).maybeSingle()

  // Apaga a conta de login; o registro em arq_usuarios_admin cai junto (on delete cascade).
  const { error } = await sb.auth.admin.deleteUser(userId)
  if (error) erro('Não foi possível remover o usuário.')

  await logAudit({ user: admin, acao: 'delete', entidade: 'usuario_admin', entidadeId: userId, detalhes: { email: perfil?.email ?? null } })
  revalidatePath(BASE)
  redirect(`${BASE}?ok=excluido`)
}
