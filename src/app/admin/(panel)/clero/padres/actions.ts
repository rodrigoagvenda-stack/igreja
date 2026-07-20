'use server'

import { createClient } from '@/lib/supabase/server'
import { resolveUpload } from '@/lib/supabase/storage'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPadre(formData: FormData) {
  const supabase = await createClient()

  const foto_url = await resolveUpload(formData, 'foto_file', 'foto_url_atual', 'arq-fotos')

  const { error } = await supabase.from('arq_padres').insert({
    nome: formData.get('nome') as string,
    nascimento: (formData.get('nascimento') as string) || null,
    ordenacao: (formData.get('ordenacao') as string) || null,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url,
    ativo: formData.get('ativo') === 'true',
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/clero/padres')
  redirect('/admin/clero/padres')
}

export async function updatePadre(id: string, formData: FormData) {
  const supabase = await createClient()

  const foto_url = await resolveUpload(formData, 'foto_file', 'foto_url_atual', 'arq-fotos')

  const { error } = await supabase.from('arq_padres').update({
    nome: formData.get('nome') as string,
    nascimento: (formData.get('nascimento') as string) || null,
    ordenacao: (formData.get('ordenacao') as string) || null,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url,
    ativo: formData.get('ativo') === 'true',
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/clero/padres')
  redirect('/admin/clero/padres')
}

export async function deletePadre(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('arq_padres').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/clero/padres')
}
