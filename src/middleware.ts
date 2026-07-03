import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Só processa rotas /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Login sempre acessível
  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  // Verifica sessão
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // Verifica AAL2 (MFA obrigatório)
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

  if (!aal || aal.currentLevel !== "aal2") {
    // Usuário logado mas MFA não concluído → redireciona para login com flag
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("mfa", "required")
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}
