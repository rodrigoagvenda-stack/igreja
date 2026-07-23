import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_HOSTNAME = 'ads.arquidiocesedebotucatu.com.br'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''
  const { pathname } = request.nextUrl

  if (hostname === ADMIN_HOSTNAME && !pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
