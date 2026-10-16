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

    // Cada "grupo" é uma combinação de dias + os horários daquela combinação (ex: Seg-Sex 7h).
    // Estruturado assim — nunca texto livre — pra não ter mais como um nome de capela acabar
    // entrando no lugar de horário.
    const grupoKeys = formData.getAll(`local_${key}_grupo_key`) as string[]
    const grupos: { dias: string[]; horarios: string[] }[] = []
    for (const grupoKey of grupoKeys) {
      // Padrão personalizado (ex: "Todo dia 13 de cada mês") substitui os dias marcados —
      // pra escalas que não cabem em "dia da semana" (data fixa do mês, feriado móvel, etc.)
      const diaPersonalizado = (formData.get(`local_${key}_grupo_${grupoKey}_dia_personalizado`) as string)?.trim()
      const dias = diaPersonalizado
        ? [diaPersonalizado]
        : (formData.getAll(`local_${key}_grupo_${grupoKey}_dias`) as string[])
      const horariosText = (formData.get(`local_${key}_grupo_${grupoKey}_horarios`) as string) ?? ''
      const horarios = horariosText.split(',').map(h => h.trim()).filter(Boolean)
      if (dias.length > 0 && horarios.length > 0) {
        grupos.push({ dias, horarios })
      }
    }

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
    if (grupos.length > 0) {
      const { error: hErr } = await supabase.from('arq_horarios_missa').insert(
        grupos.map(g => ({ local_id: localId, dias: g.dias, horarios: g.horarios }))
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
