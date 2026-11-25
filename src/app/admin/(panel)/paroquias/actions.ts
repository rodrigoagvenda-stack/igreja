'use server'

import { createClient } from '@/lib/supabase/server'
import { resolvePhotos } from '@/lib/supabase/storage'
import { requireRole, logAudit } from '@/lib/supabase/admin-guard'
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
  const admin = await requireRole(['admin', 'editor'])
  const nome = formData.get('nome') as string
  const cidade = formData.get('cidade') as string

  const supabase = await createClient()
  const fotos = await resolvePhotos(formData, 'foto', 10)

  const { data: inserted, error } = await supabase.from('arq_paroquias').insert({
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
  }).select('id').single()

  if (error) {
    console.error(`[paroquias] createParoquia erro insert:`, error)
    redirect(`/admin/paroquias?erro=${encodeURIComponent(error.message)}`)
  }

  await logAudit({ user: admin, acao: 'create', entidade: 'paroquia', entidadeId: inserted?.id, detalhes: { nome, cidade } })
  revalidatePath('/admin/paroquias')
  redirect('/admin/paroquias?ok=criado')
}

export async function updateParoquia(id: string, formData: FormData) {
  const admin = await requireRole(['admin', 'editor'])

  const supabase = await createClient()
  const fotos = await resolvePhotos(formData, 'foto', 10)

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
    redirect(`/admin/paroquias?erro=${encodeURIComponent(error.message)}`)
  }

  await logAudit({ user: admin, acao: 'update', entidade: 'paroquia', entidadeId: id })
  revalidatePath('/admin/paroquias')
  redirect('/admin/paroquias?ok=atualizado')
}

export async function deleteParoquia(id: string) {
  const admin = await requireRole(['admin'])
  const supabase = await createClient()
  // Guarda o nome antes de apagar, para o histórico dizer o que foi excluído.
  const { data: antes } = await supabase.from('arq_paroquias').select('nome').eq('id', id).maybeSingle()
  const { error } = await supabase.from('arq_paroquias').delete().eq('id', id)

  if (error) redirect(`/admin/paroquias?erro=${encodeURIComponent(error.message)}`)

  await logAudit({ user: admin, acao: 'delete', entidade: 'paroquia', entidadeId: id, detalhes: { nome: antes?.nome ?? null } })
  revalidatePath('/admin/paroquias')
  redirect('/admin/paroquias?ok=excluido')
}
