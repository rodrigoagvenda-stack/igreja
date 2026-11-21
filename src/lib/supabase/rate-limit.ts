import "server-only"
import { adminClient } from "@/lib/supabase/admin-guard"

const JANELA_MINUTOS = 15
const MAX_TENTATIVAS = 5

export interface RateLimitStatus {
  bloqueado: boolean
  tentativasRestantes: number
  retryAfterSegundos: number
}

/** Verifica se o e-mail (ou IP) já estourou o limite de tentativas na janela atual. */
export async function checkLoginRateLimit(email: string, ip: string | null): Promise<RateLimitStatus> {
  const desde = new Date(Date.now() - JANELA_MINUTOS * 60_000).toISOString()

  const { data: tentativas } = await adminClient()
    .from("arq_login_attempts")
    .select("criado_em, sucesso")
    .eq("email", email.toLowerCase())
    .gte("criado_em", desde)
    .order("criado_em", { ascending: false })

  const falhas = (tentativas ?? []).filter(t => !t.sucesso)

  if (falhas.length >= MAX_TENTATIVAS) {
    const maisAntiga = falhas[falhas.length - 1]
    const liberaEm = new Date(maisAntiga.criado_em).getTime() + JANELA_MINUTOS * 60_000
    const retryAfterSegundos = Math.max(0, Math.ceil((liberaEm - Date.now()) / 1000))
    return { bloqueado: retryAfterSegundos > 0, tentativasRestantes: 0, retryAfterSegundos }
  }

  return { bloqueado: false, tentativasRestantes: MAX_TENTATIVAS - falhas.length, retryAfterSegundos: 0 }
}

export async function recordLoginAttempt(email: string, ip: string | null, sucesso: boolean) {
  try {
    await adminClient().from("arq_login_attempts").insert({ email: email.toLowerCase(), ip, sucesso })
  } catch (err) {
    console.error("[rate-limit] falha ao registrar tentativa:", err)
  }
}
