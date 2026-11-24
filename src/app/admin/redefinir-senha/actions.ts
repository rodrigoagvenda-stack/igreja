'use server'

import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { adminClient } from '@/lib/supabase/admin-guard'

/**
 * Primeira senha de quem foi convidado.
 *
 * Gravar pelo navegador (auth.updateUser) faz o Supabase mandar "Sua senha foi alterada",
 * o que não faz sentido pra quem está criando a conta. Pela API admin (updateUserById) esse
 * aviso não sai, e a política de senha (tamanho, caracteres, senha vazada) é aplicada igual
 * (conferido no código do Supabase Auth: internal/api/admin.go chama checkPasswordStrength).
 *
 * Segurança: só vale pra conta com app_metadata.senha_pendente = true. Essa marca é gravada
 * pelo servidor no convite e só a chave de serviço consegue escrever em app_metadata; o
 * usuário não consegue se marcar. Depois de usada, a marca sai. Qualquer outra troca de senha
 * (esqueci a senha, conta já ativa) volta "fluxo-normal" e segue pelo navegador, com o aviso.
 */
export async function criarSenhaConvite(senha: string): Promise<
  { ok: true } | { ok: false; fluxoNormal: true } | { ok: false; fluxoNormal?: false; erro: string }
> {
  if (typeof senha !== 'string' || senha.length < 12 || senha.length > 72) {
    return { ok: false, erro: 'A senha não atende aos requisitos mínimos.' }
  }

  // Sessão validada no Auth (vem do link do e-mail).
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { ok: false, erro: 'O link expirou. Peça ao administrador para reenviar o convite.' }
  }

  const sb = adminClient()
  const { data: atual } = await sb.auth.admin.getUserById(user.id)
  if (atual.user?.app_metadata?.senha_pendente !== true) {
    return { ok: false, fluxoNormal: true }
  }

  const { error } = await sb.auth.admin.updateUserById(user.id, {
    password: senha,
    app_metadata: { senha_pendente: null }, // null remove a chave (merge do Supabase Auth)
  })

  if (error) {
    const msg = error.message.toLowerCase()
    if (error.code === 'weak_password' || msg.includes('pwned') || msg.includes('easy to guess')) {
      return {
        ok: false,
        erro: msg.includes('pwned') || msg.includes('easy to guess')
          ? 'Essa senha já apareceu em vazamentos de dados. Escolha outra.'
          : 'A senha não atende aos requisitos mínimos.',
      }
    }
    return { ok: false, erro: 'Não foi possível salvar a senha. Tente de novo.' }
  }

  // Registro no log de auditoria (sem a senha).
  try {
    const h = await headers()
    await sb.from('arq_audit_log').insert({
      user_id: user.id,
      user_email: user.email ?? '',
      acao: 'update',
      entidade: 'usuario_admin',
      entidade_id: user.id,
      detalhes: { senha_criada_no_convite: true },
      ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? h.get('x-real-ip') ?? null,
      user_agent: h.get('user-agent'),
    })
  } catch (err) {
    console.error('[convite] falha ao registrar log:', err)
  }

  return { ok: true }
}
