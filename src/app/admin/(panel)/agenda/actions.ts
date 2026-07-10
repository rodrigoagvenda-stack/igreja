'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEvento(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('arq_eventos').insert({
    titulo: formData.get('titulo') as string,
    descricao: (formData.get('descricao') as string) || null,
    local: (formData.get('local') as string) || null,
    categoria: formData.get('categoria') as string,
    inicio: formData.get('inicio') as string,
    fim: (formData.get('fim') as string) || null,
    destaque: formData.get('destaque') === 'on',
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/agenda')
  redirect('/admin/agenda')
}

export async function updateEvento(id: string, formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('arq_eventos').update({
    titulo: formData.get('titulo') as string,
    descricao: (formData.get('descricao') as string) || null,
    local: (formData.get('local') as string) || null,
    categoria: formData.get('categoria') as string,
    inicio: formData.get('inicio') as string,
    fim: (formData.get('fim') as string) || null,
    destaque: formData.get('destaque') === 'on',
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/agenda')
  redirect('/admin/agenda')
}

export async function deleteEvento(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('arq_eventos').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/agenda')
}
