import { NextResponse, type NextRequest } from "next/server"
import type { EmailOtpType } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"

// Links de convite e de recuperação de senha chegam aqui com token_hash (templates em
// supabase/email-templates). A validação é no servidor, então o link abre em qualquer
// aparelho, não só no navegador que pediu.
const TIPOS_ACEITOS: EmailOtpType[] = ["invite", "recovery"]

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
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
