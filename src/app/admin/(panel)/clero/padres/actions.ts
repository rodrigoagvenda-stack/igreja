'use server'

import { createClient } from '@/lib/supabase/server'
import { resolveUpload } from '@/lib/supabase/storage'
import { requireRole, logAudit } from '@/lib/supabase/admin-guard'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPadre(formData: FormData) {
  const admin = await requireRole(['admin'])
  const supabase = await createClient()

  const foto_url = await resolveUpload(supabase, formData, 'foto_file', 'foto_url_atual', 'arq-fotos')
  const nome = formData.get('nome') as string

  const { data, error } = await supabase.from('arq_padres').insert({
    nome,
    nascimento: (formData.get('nascimento') as string) || null,
    ordenacao: (formData.get('ordenacao') as string) || null,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url,
    ativo: formData.get('ativo') === 'true',
  }).select('id').single()

  if (error) redirect(`/admin/clero/padres?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'create', entidade: 'padre', entidadeId: data?.id, detalhes: { nome } })
  revalidatePath('/admin/clero/padres')
  redirect('/admin/clero/padres?ok=criado')
}

export async function updatePadre(id: string, formData: FormData) {
  const admin = await requireRole(['admin'])
  const supabase = await createClient()

  const foto_url = await resolveUpload(supabase, formData, 'foto_file', 'foto_url_atual', 'arq-fotos')
  const nome = formData.get('nome') as string

  const { error } = await supabase.from('arq_padres').update({
    nome,
    nascimento: (formData.get('nascimento') as string) || null,
    ordenacao: (formData.get('ordenacao') as string) || null,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url,
    ativo: formData.get('ativo') === 'true',
  }).eq('id', id)

  if (error) redirect(`/admin/clero/padres?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'update', entidade: 'padre', entidadeId: id, detalhes: { nome } })
  revalidatePath('/admin/clero/padres')
  redirect('/admin/clero/padres?ok=atualizado')
}

export async function deletePadre(id: string) {
  const admin = await requireRole(['admin'])
  const supabase = await createClient()
  const { error } = await supabase.from('arq_padres').delete().eq('id', id)

  if (error) redirect(`/admin/clero/padres?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'delete', entidade: 'padre', entidadeId: id })
  revalidatePath('/admin/clero/padres')
  redirect('/admin/clero/padres?ok=excluido')
}
