import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const ALLOWED_BUCKETS = new Set(['arq-fotos', 'arq-documentos'])

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
  }

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  if (!aal || aal.currentLevel !== 'aal2') {
    return NextResponse.json({ error: 'Sessão sem verificação em duas etapas.' }, { status: 403 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const bucket = formData.get('bucket') as string | null

  if (!file || !bucket || !ALLOWED_BUCKETS.has(bucket)) {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 })
  }

  const t0 = Date.now()
  console.log(`[api/upload] iniciando bucket=${bucket} nome=${file.name} tamanho=${(file.size / 1024).toFixed(0)}KB`)

  try {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const bytes = await file.arrayBuffer()

    const { error } = await supabase.storage.from(bucket).upload(path, bytes, {
      contentType: file.type,
      upsert: false,
    })

    if (error) {
      console.error(`[api/upload] FALHOU bucket=${bucket} nome=${file.name} apos=${Date.now() - t0}ms erro=${error.message}`)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const url = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
    console.log(`[api/upload] ok bucket=${bucket} nome=${file.name} apos=${Date.now() - t0}ms url=${url}`)
    return NextResponse.json({ url })
  } catch (err) {
    console.error(`[api/upload] EXCECAO bucket=${bucket} nome=${file.name} apos=${Date.now() - t0}ms`, err)
    return NextResponse.json({ error: 'Falha inesperada no upload.' }, { status: 500 })
  }
}
