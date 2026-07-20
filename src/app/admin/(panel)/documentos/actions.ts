'use server'

import { createClient } from '@/lib/supabase/server'
import { resolveUpload } from '@/lib/supabase/storage'
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
  const supabase = await createClient()
  const titulo = formData.get('titulo') as string

  const arquivo_url = await resolveUpload(formData, 'arquivo_file', 'arquivo_url_atual', 'arq-documentos')

  const { error } = await supabase.from('arq_documentos').insert({
    titulo,
    slug: slugify(titulo),
    tipo: formData.get('tipo') as 'Decreto' | 'Comunicado' | 'Nomeação' | 'Circular',
    arquivo_url,
    publicado_em: (formData.get('publicado_em') as string) || new Date().toISOString().split('T')[0],
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/documentos')
  redirect('/admin/documentos')
}

export async function updateDocumento(id: string, formData: FormData) {
  const supabase = await createClient()

  const arquivo_url = await resolveUpload(formData, 'arquivo_file', 'arquivo_url_atual', 'arq-documentos')

  const { error } = await supabase.from('arq_documentos').update({
    titulo: formData.get('titulo') as string,
    tipo: formData.get('tipo') as 'Decreto' | 'Comunicado' | 'Nomeação' | 'Circular',
    arquivo_url,
    publicado_em: (formData.get('publicado_em') as string) || new Date().toISOString().split('T')[0],
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/documentos')
  redirect('/admin/documentos')
}

export async function deleteDocumento(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('arq_documentos').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/documentos')
}
