'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createLocal(formData: FormData) {
  const supabase = await createClient()

  const { data: local, error } = await supabase
    .from('arq_locais')
    .insert({
      nome: formData.get('nome') as string,
      tipo: formData.get('tipo') as 'Matriz' | 'Capela',
      paroquia_id: formData.get('paroquia_id') as string,
      endereco: (formData.get('endereco') as string) || null,
    })
    .select('id')
    .single()

  if (error || !local) throw new Error(error?.message ?? 'Erro ao criar local')

  const horariosText = (formData.get('horarios') as string) ?? ''
  const linhas = horariosText.split('\n').map(l => l.trim()).filter(Boolean)

  if (linhas.length > 0) {
    const { error: hErr } = await supabase.from('arq_horarios_missa').insert(
      linhas.map(descricao => ({ local_id: local.id, descricao }))
    )
    if (hErr) throw new Error(hErr.message)
  }

  revalidatePath('/admin/horarios')
  redirect('/admin/horarios')
}

export async function updateLocal(id: string, formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('arq_locais').update({
    nome: formData.get('nome') as string,
    tipo: formData.get('tipo') as 'Matriz' | 'Capela',
    paroquia_id: formData.get('paroquia_id') as string,
    endereco: (formData.get('endereco') as string) || null,
  }).eq('id', id)

  if (error) throw new Error(error.message)

  await supabase.from('arq_horarios_missa').delete().eq('local_id', id)

  const horariosText = (formData.get('horarios') as string) ?? ''
  const linhas = horariosText.split('\n').map(l => l.trim()).filter(Boolean)

  if (linhas.length > 0) {
    const { error: hErr } = await supabase.from('arq_horarios_missa').insert(
      linhas.map(descricao => ({ local_id: id, descricao }))
    )
    if (hErr) throw new Error(hErr.message)
  }

  revalidatePath('/admin/horarios')
  redirect('/admin/horarios')
}

export async function deleteLocal(id: string) {
  const supabase = await createClient()
  await supabase.from('arq_horarios_missa').delete().eq('local_id', id)
  const { error } = await supabase.from('arq_locais').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/horarios')
}
