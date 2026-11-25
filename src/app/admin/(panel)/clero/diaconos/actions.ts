'use server'

import { createClient } from '@/lib/supabase/server'
import { requireRole, logAudit } from '@/lib/supabase/admin-guard'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createDiacono(formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])
  const supabase = await createClient()
  const nome = formData.get('nome') as string

  const { data, error } = await supabase.from('arq_diaconos').insert({
    nome,
    nascimento: (formData.get('nascimento') as string) || null,
    ordenacao: (formData.get('ordenacao') as string) || null,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url: (formData.get('foto_url') as string) || null,
    ativo: formData.get('ativo') === 'true',
  }).select('id').single()

  if (error) redirect(`/admin/clero/diaconos?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'create', entidade: 'diacono', entidadeId: data?.id, detalhes: { nome } })
  revalidatePath('/admin/clero/diaconos')
  redirect('/admin/clero/diaconos?ok=criado')
}

export async function updateDiacono(id: string, formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])
  const supabase = await createClient()
  const nome = formData.get('nome') as string

  const { error } = await supabase.from('arq_diaconos').update({
    nome,
    nascimento: (formData.get('nascimento') as string) || null,
    ordenacao: (formData.get('ordenacao') as string) || null,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url: (formData.get('foto_url') as string) || null,
    ativo: formData.get('ativo') === 'true',
  }).eq('id', id)

  if (error) redirect(`/admin/clero/diaconos?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'update', entidade: 'diacono', entidadeId: id, detalhes: { nome } })
  revalidatePath('/admin/clero/diaconos')
  redirect('/admin/clero/diaconos?ok=atualizado')
}

export async function deleteDiacono(id: string) {
  const admin = await requireRole(['admin'])
  const supabase = await createClient()
  // Guarda o nome antes de apagar, para o histórico dizer o que foi excluído.
  const { data: antes } = await supabase.from('arq_diaconos').select('nome').eq('id', id).maybeSingle()
  const { error } = await supabase.from('arq_diaconos').delete().eq('id', id)

  if (error) redirect(`/admin/clero/diaconos?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'delete', entidade: 'diacono', entidadeId: id, detalhes: { nome: antes?.nome ?? null } })
  revalidatePath('/admin/clero/diaconos')
  redirect('/admin/clero/diaconos?ok=excluido')
}
