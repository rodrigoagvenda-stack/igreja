'use server'

import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { checkLoginRateLimit, recordLoginAttempt } from '@/lib/supabase/rate-limit'

function formatarEspera(segundos: number) {
  const min = Math.ceil(segundos / 60)
  return min <= 1 ? 'cerca de 1 minuto' : `cerca de ${min} minutos`
}

export async function loginComSenha(email: string, password: string) {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? h.get('x-real-ip') ?? null

  const status = await checkLoginRateLimit(email, ip)
  if (status.bloqueado) {
    return {
      ok: false as const,
      error: `Muitas tentativas de login. Tente novamente em ${formatarEspera(status.retryAfterSegundos)}.`,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  await recordLoginAttempt(email, ip, !error)

  if (error) {
    const restantes = status.tentativasRestantes - 1
    const aviso = restantes <= 2 && restantes > 0
      ? ` Mais ${restantes} tentativa(s) e o acesso será bloqueado temporariamente.`
      : ''
    return { ok: false as const, error: `E-mail ou senha incorretos.${aviso}` }
  }

  return { ok: true as const }
}
