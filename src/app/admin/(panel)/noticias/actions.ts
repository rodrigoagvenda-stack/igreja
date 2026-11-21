'use server'

import { createClient } from '@/lib/supabase/server'
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

export async function createNoticia(formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])
  const supabase = await createClient()
  const titulo = formData.get('titulo') as string
  const status = formData.get('status') as 'rascunho' | 'revisao' | 'publicado'

  const { data, error } = await supabase.from('arq_noticias').insert({
    titulo,
    slug: slugify(titulo),
    categoria: formData.get('categoria') as string,
    resumo: (formData.get('resumo') as string) || null,
    conteudo: (formData.get('conteudo') as string) || null,
    status,
    destaque: formData.get('destaque') === 'on',
    imagem_url: (formData.get('imagem_url') as string) || null,
    publicado_em: status === 'publicado' ? new Date().toISOString() : null,
    autor_id: null,
  }).select('id').single()

  if (error) redirect(`/admin/noticias?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'create', entidade: 'noticia', entidadeId: data?.id, detalhes: { titulo, status } })
  revalidatePath('/admin/noticias')
  redirect('/admin/noticias?ok=criado')
}

export async function updateNoticia(id: string, formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])
  const supabase = await createClient()
  const status = formData.get('status') as 'rascunho' | 'revisao' | 'publicado'
  const titulo = formData.get('titulo') as string

  const { error } = await supabase.from('arq_noticias').update({
    titulo,
    categoria: formData.get('categoria') as string,
    resumo: (formData.get('resumo') as string) || null,
    conteudo: (formData.get('conteudo') as string) || null,
    status,
    destaque: formData.get('destaque') === 'on',
    imagem_url: (formData.get('imagem_url') as string) || null,
    publicado_em: status === 'publicado' ? new Date().toISOString() : null,
  }).eq('id', id)

  if (error) redirect(`/admin/noticias?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'update', entidade: 'noticia', entidadeId: id, detalhes: { titulo, status } })
  revalidatePath('/admin/noticias')
  redirect('/admin/noticias?ok=atualizado')
}

export async function deleteNoticia(id: string) {
  const admin = await requireRole(['admin'])
  const supabase = await createClient()
  const { error } = await supabase.from('arq_noticias').delete().eq('id', id)

  if (error) redirect(`/admin/noticias?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'delete', entidade: 'noticia', entidadeId: id })
  revalidatePath('/admin/noticias')
  redirect('/admin/noticias?ok=excluido')
}
