'use server'

import { createClient } from '@/lib/supabase/server'
import { resolveUpload } from '@/lib/supabase/storage'
import { requireRole, logAudit } from '@/lib/supabase/admin-guard'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function slugify(text: string) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() + '-' + Date.now()
}

export async function createDocumento(formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])
  const supabase = await createClient()
  const titulo = formData.get('titulo') as string

  const arquivo_url = await resolveUpload(supabase, formData, 'arquivo_file', 'arquivo_url_atual', 'arq-documentos')

  const { data, error } = await supabase.from('arq_documentos').insert({
    titulo,
    slug: slugify(titulo),
    tipo: formData.get('tipo') as 'Decreto' | 'Comunicado' | 'Nomeação' | 'Circular',
    arquivo_url,
    publicado_em: (formData.get('publicado_em') as string) || new Date().toISOString().split('T')[0],
  }).select('id').single()

  if (error) redirect(`/admin/documentos?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'create', entidade: 'documento', entidadeId: data?.id, detalhes: { titulo } })
  revalidatePath('/admin/documentos')
  redirect('/admin/documentos?ok=criado')
}

export async function updateDocumento(id: string, formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])
  const supabase = await createClient()
  const titulo = formData.get('titulo') as string

  const arquivo_url = await resolveUpload(supabase, formData, 'arquivo_file', 'arquivo_url_atual', 'arq-documentos')

  const { error } = await supabase.from('arq_documentos').update({
    titulo,
    tipo: formData.get('tipo') as 'Decreto' | 'Comunicado' | 'Nomeação' | 'Circular',
    arquivo_url,
    publicado_em: (formData.get('publicado_em') as string) || new Date().toISOString().split('T')[0],
  }).eq('id', id)

  if (error) redirect(`/admin/documentos?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'update', entidade: 'documento', entidadeId: id, detalhes: { titulo } })
  revalidatePath('/admin/documentos')
  redirect('/admin/documentos?ok=atualizado')
}

export async function deleteDocumento(id: string) {
  const admin = await requireRole(['admin'])
  const supabase = await createClient()
  // Guarda o nome antes de apagar, para o histórico dizer o que foi excluído.
  const { data: antes } = await supabase.from('arq_documentos').select('titulo').eq('id', id).maybeSingle()
  const { error } = await supabase.from('arq_documentos').delete().eq('id', id)

  if (error) redirect(`/admin/documentos?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'delete', entidade: 'documento', entidadeId: id, detalhes: { titulo: antes?.titulo ?? null } })
  revalidatePath('/admin/documentos')
  redirect('/admin/documentos?ok=excluido')
}
