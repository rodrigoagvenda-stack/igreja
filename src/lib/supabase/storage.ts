'use server'

import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, FotoParoquia, FotoTag } from '@/types/database'

type Supabase = SupabaseClient<Database>

const FOTO_TAGS: FotoTag[] = ['Fachada', 'Padroeiro', 'Capela', 'Paroquia']

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

// Resolve até `count` slots de foto (foto_1/foto_1_tag/foto_1_remover, foto_2/..., ...).
// O upload em si já aconteceu antes, via /api/admin/upload (PhotoUploadSlot) — aqui só lemos
// a URL e a tag que já estão nos campos hidden. Nada de rede, nada de client Supabase.
// Fotos marcadas com a tag "Fachada" vêm primeiro (é a foto usada como capa na página pública).
export async function resolvePhotos(
  formData: FormData,
  fieldPrefix: string,
  count: number
): Promise<FotoParoquia[]> {
  const resolved: (FotoParoquia | null)[] = []
  for (let i = 0; i < count; i++) {
    const n = i + 1
    const removido = formData.get(`${fieldPrefix}_${n}_remover`) === 'true'
    const url = formData.get(`${fieldPrefix}_${n}`) as string | null
    const tagBruta = formData.get(`${fieldPrefix}_${n}_tag`) as string | null
    const tag = FOTO_TAGS.includes(tagBruta as FotoTag) ? (tagBruta as FotoTag) : null
    const item = removido || !url ? null : { url, tag }
    resolved.push(item)
    console.log(`[resolvePhotos] slot=${n} url="${url ? url.slice(-24) : '(vazio)'}" tag=${tag ?? '(nenhuma)'} removido=${removido}`)
  }

  const fotos = resolved.filter((f): f is FotoParoquia => !!f)
  const comFachada = fotos.filter(f => f.tag === 'Fachada')
  const semFachada = fotos.filter(f => f.tag !== 'Fachada')
  return [...comFachada, ...semFachada]
}
