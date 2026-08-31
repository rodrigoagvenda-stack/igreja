'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Salva todos os locais (Matriz + Capelas) de uma paróquia numa tacada só. Cada bloco
// submetido pelo LocaisEditor tem uma "key": o id do local existente, ou "novo-*" pra um
// local recém-adicionado no formulário. Local existente que não veio na lista é removido —
// é assim que o botão "Remover este local" do editor funciona, sem precisar de um campo
// hidden de "removido" separado.
export async function saveLocaisDaParoquia(paroquiaId: string, formData: FormData) {
  const supabase = await createClient()
  const keys = formData.getAll('local_key') as string[]
  const idsAtuais = new Set<string>()

  for (const key of keys) {
    const nome = (formData.get(`local_${key}_nome`) as string)?.trim()
    if (!nome) continue

    const tipos: ('Matriz' | 'Capela')[] = []
    if (formData.get(`local_${key}_tipo_matriz`) === 'true') tipos.push('Matriz')
    if (formData.get(`local_${key}_tipo_capela`) === 'true') tipos.push('Capela')
    if (tipos.length === 0) tipos.push('Matriz')

    const endereco = (formData.get(`local_${key}_endereco`) as string) || null
    const horariosText = (formData.get(`local_${key}_horarios`) as string) ?? ''
    const linhas = horariosText.split('\n').map(l => l.trim()).filter(Boolean)

    let localId: string
    if (key.startsWith('novo-')) {
      const { data, error } = await supabase
        .from('arq_locais')
        .insert({ nome, tipos, paroquia_id: paroquiaId, endereco })
        .select('id')
        .single()
      if (error || !data) throw new Error(error?.message ?? 'Erro ao criar local')
      localId = data.id
    } else {
      localId = key
      const { error } = await supabase.from('arq_locais').update({ nome, tipos, endereco }).eq('id', localId)
      if (error) throw new Error(error.message)
    }

    idsAtuais.add(localId)

    await supabase.from('arq_horarios_missa').delete().eq('local_id', localId)
    if (linhas.length > 0) {
      const { error: hErr } = await supabase.from('arq_horarios_missa').insert(
        linhas.map(descricao => ({ local_id: localId, descricao }))
      )
      if (hErr) throw new Error(hErr.message)
    }
  }

  const { data: locaisExistentes } = await supabase
    .from('arq_locais')
    .select('id')
    .eq('paroquia_id', paroquiaId)
  const idsParaRemover = (locaisExistentes ?? []).map(l => l.id).filter(lid => !idsAtuais.has(lid))
  if (idsParaRemover.length > 0) {
    await supabase.from('arq_horarios_missa').delete().in('local_id', idsParaRemover)
    await supabase.from('arq_locais').delete().in('id', idsParaRemover)
  }

  revalidatePath('/admin/horarios')
  revalidatePath(`/admin/paroquias/${paroquiaId}/horarios`)
  redirect('/admin/horarios')
}
