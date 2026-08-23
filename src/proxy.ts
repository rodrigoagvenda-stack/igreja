import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

const ADMIN_HOSTNAME = "ads.arquidiocesedebotucatu.com.br"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get("host") ?? ""

  // Redireciona o subdomínio do admin para /admin
  if (hostname === ADMIN_HOSTNAME && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  // Só processa rotas /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Login sempre acessível
  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  // Se as env vars do Supabase não estiverem configuradas, redireciona para login
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Requisições de Server Actions (POST com header next-action) não podem receber um redirect
  // aqui: o cliente espera uma resposta RSC da action, e um redirect 3xx quebra esse contrato
  // (aparece como "An unexpected response was received from the server" no navegador). Nesses
  // casos deixamos passar — a action em si roda contra o banco protegido por RLS (arq_is_admin,
  // exige AAL2), então uma sessão inválida/expirada é rejeitada como erro tratável, não como
  // redirect cru.
  const isServerAction = request.headers.get("next-action") !== null

  // Verifica sessão
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    if (isServerAction) return response
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // Verifica AAL2 (MFA obrigatório)
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

  if (!aal || aal.currentLevel !== "aal2") {
    if (isServerAction) return response
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("mfa", "required")
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
