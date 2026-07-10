'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createDiacono(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('arq_diaconos').insert({
    nome: formData.get('nome') as string,
    nascimento: (formData.get('nascimento') as string) || null,
    ordenacao: (formData.get('ordenacao') as string) || null,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url: (formData.get('foto_url') as string) || null,
    ativo: formData.get('ativo') === 'true',
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/clero/diaconos')
  redirect('/admin/clero/diaconos')
}

export async function updateDiacono(id: string, formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('arq_diaconos').update({
    nome: formData.get('nome') as string,
    nascimento: (formData.get('nascimento') as string) || null,
    ordenacao: (formData.get('ordenacao') as string) || null,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url: (formData.get('foto_url') as string) || null,
    ativo: formData.get('ativo') === 'true',
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/clero/diaconos')
  redirect('/admin/clero/diaconos')
}

export async function deleteDiacono(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('arq_diaconos').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/clero/diaconos')
}
