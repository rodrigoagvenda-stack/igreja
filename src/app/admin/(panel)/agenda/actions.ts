'use server'

import { createClient } from '@/lib/supabase/server'
import { requireRole, logAudit } from '@/lib/supabase/admin-guard'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEvento(formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])
  const supabase = await createClient()
  const titulo = formData.get('titulo') as string

  const { data, error } = await supabase.from('arq_eventos').insert({
    titulo,
    descricao: (formData.get('descricao') as string) || null,
    local: (formData.get('local') as string) || null,
    categoria: formData.get('categoria') as string,
    inicio: formData.get('inicio') as string,
    fim: (formData.get('fim') as string) || null,
    destaque: formData.get('destaque') === 'on',
  }).select('id').single()

  if (error) redirect(`/admin/agenda?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'create', entidade: 'evento', entidadeId: data?.id, detalhes: { titulo } })
  revalidatePath('/admin/agenda')
  redirect('/admin/agenda?ok=criado')
}

export async function updateEvento(id: string, formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])
  const supabase = await createClient()
  const titulo = formData.get('titulo') as string

  const { error } = await supabase.from('arq_eventos').update({
    titulo,
    descricao: (formData.get('descricao') as string) || null,
    local: (formData.get('local') as string) || null,
    categoria: formData.get('categoria') as string,
    inicio: formData.get('inicio') as string,
    fim: (formData.get('fim') as string) || null,
    destaque: formData.get('destaque') === 'on',
  }).eq('id', id)

  if (error) redirect(`/admin/agenda?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'update', entidade: 'evento', entidadeId: id, detalhes: { titulo } })
  revalidatePath('/admin/agenda')
  redirect('/admin/agenda?ok=atualizado')
}

export async function deleteEvento(id: string) {
  const admin = await requireRole(['admin'])
  const supabase = await createClient()
  const { error } = await supabase.from('arq_eventos').delete().eq('id', id)

  if (error) redirect(`/admin/agenda?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'delete', entidade: 'evento', entidadeId: id })
  revalidatePath('/admin/agenda')
  redirect('/admin/agenda?ok=excluido')
}
