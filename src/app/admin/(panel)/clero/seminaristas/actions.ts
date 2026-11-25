'use server'

import { createClient } from '@/lib/supabase/server'
import { resolveUpload } from '@/lib/supabase/storage'
import { requireRole, logAudit } from '@/lib/supabase/admin-guard'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createSeminarista(formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])
  const supabase = await createClient()

  const foto_url = await resolveUpload(supabase, formData, 'foto_file', 'foto_url_atual', 'arq-fotos')
  const nome = formData.get('nome') as string

  const { data, error } = await supabase.from('arq_seminaristas').insert({
    nome,
    nascimento: (formData.get('nascimento') as string) || null,
    ano_formacao: formData.get('ano_formacao') as string,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url,
    ativo: formData.get('ativo') === 'true',
  }).select('id').single()

  if (error) redirect(`/admin/clero/seminaristas?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'create', entidade: 'seminarista', entidadeId: data?.id, detalhes: { nome } })
  revalidatePath('/admin/clero/seminaristas')
  redirect('/admin/clero/seminaristas?ok=criado')
}

export async function updateSeminarista(id: string, formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])
  const supabase = await createClient()

  const foto_url = await resolveUpload(supabase, formData, 'foto_file', 'foto_url_atual', 'arq-fotos')
  const nome = formData.get('nome') as string

  const { error } = await supabase.from('arq_seminaristas').update({
    nome,
    nascimento: (formData.get('nascimento') as string) || null,
    ano_formacao: formData.get('ano_formacao') as string,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url,
    ativo: formData.get('ativo') === 'true',
  }).eq('id', id)

  if (error) redirect(`/admin/clero/seminaristas?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'update', entidade: 'seminarista', entidadeId: id, detalhes: { nome } })
  revalidatePath('/admin/clero/seminaristas')
  redirect('/admin/clero/seminaristas?ok=atualizado')
}

export async function deleteSeminarista(id: string) {
  const admin = await requireRole(['admin'])
  const supabase = await createClient()
  // Guarda o nome antes de apagar, para o histórico dizer o que foi excluído.
  const { data: antes } = await supabase.from('arq_seminaristas').select('nome').eq('id', id).maybeSingle()
  const { error } = await supabase.from('arq_seminaristas').delete().eq('id', id)

  if (error) redirect(`/admin/clero/seminaristas?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'delete', entidade: 'seminarista', entidadeId: id, detalhes: { nome: antes?.nome ?? null } })
  revalidatePath('/admin/clero/seminaristas')
  redirect('/admin/clero/seminaristas?ok=excluido')
}
