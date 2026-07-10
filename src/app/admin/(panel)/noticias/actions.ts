'use server'

import { createClient } from '@/lib/supabase/server'
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
  const supabase = await createClient()
  const titulo = formData.get('titulo') as string
  const status = formData.get('status') as 'rascunho' | 'revisao' | 'publicado'

  const { error } = await supabase.from('arq_noticias').insert({
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
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/noticias')
  redirect('/admin/noticias')
}

export async function updateNoticia(id: string, formData: FormData) {
  const supabase = await createClient()
  const status = formData.get('status') as 'rascunho' | 'revisao' | 'publicado'

  const { error } = await supabase.from('arq_noticias').update({
    titulo: formData.get('titulo') as string,
    categoria: formData.get('categoria') as string,
    resumo: (formData.get('resumo') as string) || null,
    conteudo: (formData.get('conteudo') as string) || null,
    status,
    destaque: formData.get('destaque') === 'on',
    imagem_url: (formData.get('imagem_url') as string) || null,
    publicado_em: status === 'publicado' ? new Date().toISOString() : null,
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/noticias')
  redirect('/admin/noticias')
}

export async function deleteNoticia(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('arq_noticias').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/noticias')
}
