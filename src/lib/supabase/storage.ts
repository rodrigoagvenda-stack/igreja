'use server'

import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

type Supabase = SupabaseClient<Database>

// Recebe o client já criado pelo chamador (uma vez por request) em vez de criar o seu próprio.
// Criar um client por upload fazia cada chamada em paralelo (Promise.all) tentar renovar a
// sessão de forma independente — com poucas fotos raramente colidia, mas a partir de ~4 uploads
// simultâneos o Supabase Auth invalida o refresh token depois do primeiro uso e as chamadas
// concorrentes perdiam essa corrida, falhando a autenticação daquele upload silenciosamente.
export async function uploadToStorage(supabase: Supabase, file: File, bucket: string): Promise<string> {
  const t0 = Date.now()
  console.log(`[upload] iniciando bucket=${bucket} nome=${file.name} tamanho=${(file.size / 1024).toFixed(0)}KB tipo=${file.type}`)

  try {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const bytes = await file.arrayBuffer()
    const { error } = await supabase.storage.from(bucket).upload(path, bytes, {
      contentType: file.type,
      upsert: false,
    })
    if (error) {
      console.error(`[upload] FALHOU bucket=${bucket} nome=${file.name} apos=${Date.now() - t0}ms erro=${error.message}`)
      throw new Error(`Upload falhou (${file.name}): ${error.message}`)
    }
    const url = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
    console.log(`[upload] ok bucket=${bucket} nome=${file.name} apos=${Date.now() - t0}ms url=${url}`)
    return url
  } catch (err) {
    console.error(`[upload] EXCECAO bucket=${bucket} nome=${file.name} apos=${Date.now() - t0}ms`, err)
    throw err
  }
}

export async function resolveUpload(
  supabase: Supabase,
  formData: FormData,
  fileField: string,
  currentUrlField: string,
  bucket: string
): Promise<string | null> {
  const file = formData.get(fileField) as File | null
  if (file && file.size > 0) {
    return uploadToStorage(supabase, file, bucket)
  }
  return (formData.get(currentUrlField) as string) || null
}

// Resolve até `count` slots de foto (foto_1_file/foto_1_atual/foto_1_remover, foto_2_..., ...)
// `principalField` aponta pro número (1-based) do slot marcado como principal — vira o índice 0 do array.
// Uploads em sequência (não Promise.all) — evita qualquer corrida de renovação de sessão no
// mesmo client, o que causava falha silenciosa a partir de ~4 uploads simultâneos.
export async function resolveMultiUpload(
  supabase: Supabase,
  formData: FormData,
  fieldPrefix: string,
  bucket: string,
  count: number,
  principalField?: string
): Promise<string[]> {
  const resolved: (string | null)[] = []
  for (let i = 0; i < count; i++) {
    const n = i + 1
    const file = formData.get(`${fieldPrefix}_${n}_file`) as File | null
    if (file && file.size > 0) {
      resolved.push(await uploadToStorage(supabase, file, bucket))
    } else if (formData.get(`${fieldPrefix}_${n}_remover`) === 'true') {
      resolved.push(null)
    } else {
      resolved.push((formData.get(`${fieldPrefix}_${n}_atual`) as string) || null)
    }
  }

  let urls = resolved.filter((url): url is string => !!url)

  const principalSlot = principalField ? parseInt(formData.get(principalField) as string, 10) : NaN
  if (!isNaN(principalSlot)) {
    const principalUrl = resolved[principalSlot - 1]
    if (principalUrl) {
      urls = [principalUrl, ...urls.filter(url => url !== principalUrl)]
    }
  }

  return urls
}
