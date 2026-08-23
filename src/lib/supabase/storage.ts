'use server'

import { createClient } from './server'

export async function uploadToStorage(file: File, bucket: string): Promise<string> {
  const t0 = Date.now()
  console.log(`[upload] iniciando bucket=${bucket} nome=${file.name} tamanho=${(file.size / 1024).toFixed(0)}KB tipo=${file.type}`)

  try {
    const supabase = await createClient()
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
  formData: FormData,
  fileField: string,
  currentUrlField: string,
  bucket: string
): Promise<string | null> {
  const file = formData.get(fileField) as File | null
  if (file && file.size > 0) {
    return uploadToStorage(file, bucket)
  }
  return (formData.get(currentUrlField) as string) || null
}

// Resolve até `count` slots de foto (foto_1_file/foto_1_atual/foto_1_remover, foto_2_..., ...)
// `principalField` aponta pro número (1-based) do slot marcado como principal — vira o índice 0 do array.
export async function resolveMultiUpload(
  formData: FormData,
  fieldPrefix: string,
  bucket: string,
  count: number,
  principalField?: string
): Promise<string[]> {
  const resolved = await Promise.all(
    Array.from({ length: count }, async (_, i) => {
      const n = i + 1
      const file = formData.get(`${fieldPrefix}_${n}_file`) as File | null
      if (file && file.size > 0) return uploadToStorage(file, bucket)
      if (formData.get(`${fieldPrefix}_${n}_remover`) === 'true') return null
      return (formData.get(`${fieldPrefix}_${n}_atual`) as string) || null
    })
  )

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
