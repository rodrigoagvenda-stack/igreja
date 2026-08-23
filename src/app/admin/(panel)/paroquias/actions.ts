'use server'

import { createClient } from '@/lib/supabase/server'
import { resolveMultiUpload } from '@/lib/supabase/storage'
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

export async function createParoquia(formData: FormData) {
  const nome = formData.get('nome') as string
  const cidade = formData.get('cidade') as string
  console.log(`[paroquias] createParoquia iniciado nome="${nome}"`)

  try {
    const supabase = await createClient()
    const fotos = await resolveMultiUpload(formData, 'foto', 'arq-fotos', 10, 'foto_principal')
    console.log(`[paroquias] createParoquia fotos resolvidas count=${fotos.length}`)

    const { error } = await supabase.from('arq_paroquias').insert({
      nome,
      slug: slugify(nome + '-' + cidade),
      cidade,
      regiao_pastoral: formData.get('regiao_pastoral') as 'RP1' | 'RP2' | 'RP3' | 'RP4',
      padroeiro: (formData.get('padroeiro') as string) || null,
      endereco: (formData.get('endereco') as string) || null,
      cep: (formData.get('cep') as string) || null,
      telefone: (formData.get('telefone') as string) || null,
      email: (formData.get('email') as string) || null,
      site: (formData.get('site') as string) || null,
      data_criacao: (formData.get('data_criacao') as string) || null,
      fotos,
      ativa: formData.get('ativa') === 'true',
    })

    if (error) {
      console.error(`[paroquias] createParoquia erro insert:`, error)
      throw new Error(error.message)
    }
    console.log(`[paroquias] createParoquia sucesso nome="${nome}"`)
  } catch (err) {
    console.error(`[paroquias] createParoquia FALHOU nome="${nome}":`, err)
    throw err
  }

  revalidatePath('/admin/paroquias')
  redirect('/admin/paroquias')
}

export async function updateParoquia(id: string, formData: FormData) {
  console.log(`[paroquias] updateParoquia iniciado id=${id}`)

  try {
    const supabase = await createClient()
    const fotos = await resolveMultiUpload(formData, 'foto', 'arq-fotos', 10, 'foto_principal')
    console.log(`[paroquias] updateParoquia fotos resolvidas id=${id} count=${fotos.length}`)

    const { error } = await supabase.from('arq_paroquias').update({
      nome: formData.get('nome') as string,
      cidade: formData.get('cidade') as string,
      regiao_pastoral: formData.get('regiao_pastoral') as 'RP1' | 'RP2' | 'RP3' | 'RP4',
      padroeiro: (formData.get('padroeiro') as string) || null,
      endereco: (formData.get('endereco') as string) || null,
      cep: (formData.get('cep') as string) || null,
      telefone: (formData.get('telefone') as string) || null,
      email: (formData.get('email') as string) || null,
      site: (formData.get('site') as string) || null,
      data_criacao: (formData.get('data_criacao') as string) || null,
      fotos,
      ativa: formData.get('ativa') === 'true',
    }).eq('id', id)

    if (error) {
      console.error(`[paroquias] updateParoquia erro update id=${id}:`, error)
      throw new Error(error.message)
    }
    console.log(`[paroquias] updateParoquia sucesso id=${id}`)
  } catch (err) {
    console.error(`[paroquias] updateParoquia FALHOU id=${id}:`, err)
    throw err
  }

  revalidatePath('/admin/paroquias')
  redirect('/admin/paroquias')
}

export async function deleteParoquia(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('arq_paroquias').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/paroquias')
}
