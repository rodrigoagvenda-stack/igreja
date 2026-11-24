import { NextResponse, type NextRequest } from "next/server"
import type { EmailOtpType } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"

// Links de convite e de recuperação de senha chegam aqui com token_hash (templates em
// supabase/email-templates). A validação é no servidor, então o link abre em qualquer
// aparelho, não só no navegador que pediu.
const TIPOS_ACEITOS: EmailOtpType[] = ["invite", "recovery"]

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  // No container (standalone, HOSTNAME=0.0.0.0) o nextUrl.origin vira http://0.0.0.0:3000.
  // O endereço público vem do proxy do Easypanel nos cabeçalhos.
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host
  const proto = request.headers.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")
  const origin = `${proto.split(",")[0].trim()}://${host.split(",")[0].trim()}`
  const tokenHash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null

  if (!tokenHash || !type || !TIPOS_ACEITOS.includes(type)) {
    return NextResponse.redirect(new URL("/admin/login?erro=link-invalido", origin))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })

  if (error) {
    return NextResponse.redirect(new URL("/admin/login?erro=link-expirado", origin))
  }

  const destino = type === "invite" ? "/admin/redefinir-senha?convite=1" : "/admin/redefinir-senha"
  return NextResponse.redirect(new URL(destino, origin))
}
