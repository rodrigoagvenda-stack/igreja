'use server'

import { createClient } from './server'

export async function uploadToStorage(file: File, bucket: string): Promise<string> {
  const supabase = await createClient()
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const bytes = await file.arrayBuffer()
  const { error } = await supabase.storage.from(bucket).upload(path, bytes, {
    contentType: file.type,
    upsert: false,
  })
  if (error) throw new Error(`Upload falhou: ${error.message}`)
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
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
