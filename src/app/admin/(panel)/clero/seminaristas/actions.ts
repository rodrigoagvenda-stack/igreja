'use server'

import { createClient } from '@/lib/supabase/server'
import { resolveUpload } from '@/lib/supabase/storage'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createSeminarista(formData: FormData) {
  const supabase = await createClient()

  const foto_url = await resolveUpload(formData, 'foto_file', 'foto_url_atual', 'arq-fotos')

  const { error } = await supabase.from('arq_seminaristas').insert({
    nome: formData.get('nome') as string,
    nascimento: (formData.get('nascimento') as string) || null,
    ano_formacao: formData.get('ano_formacao') as string,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url,
    ativo: formData.get('ativo') === 'true',
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/clero/seminaristas')
  redirect('/admin/clero/seminaristas')
}

export async function updateSeminarista(id: string, formData: FormData) {
  const supabase = await createClient()

  const foto_url = await resolveUpload(formData, 'foto_file', 'foto_url_atual', 'arq-fotos')

  const { error } = await supabase.from('arq_seminaristas').update({
    nome: formData.get('nome') as string,
    nascimento: (formData.get('nascimento') as string) || null,
    ano_formacao: formData.get('ano_formacao') as string,
    paroquia_id: (formData.get('paroquia_id') as string) || null,
    foto_url,
    ativo: formData.get('ativo') === 'true',
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/clero/seminaristas')
  redirect('/admin/clero/seminaristas')
}

export async function deleteSeminarista(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('arq_seminaristas').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/clero/seminaristas')
}
