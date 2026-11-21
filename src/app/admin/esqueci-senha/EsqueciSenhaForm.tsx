"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { IconMailForward, IconLoader2, IconArrowLeft, IconMailCheck } from "@tabler/icons-react"
import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"

interface Props {
  supabaseUrl: string
  supabaseAnonKey: string
}

export function EsqueciSenhaForm({ supabaseUrl, supabaseAnonKey }: Props) {
  const [email, setEmail]     = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")
  const [sent, setSent]       = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!supabaseUrl || !supabaseAnonKey) {
      setError("Variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY não configuradas.")
      setLoading(false)
      return
    }

    const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/redefinir-senha`,
    })

    setLoading(false)
    // Sempre mostra sucesso, mesmo se o e-mail não existir — evita confirmar quais e-mails têm conta.
    if (!resetError) setSent(true)
    else setSent(true)
  }

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">

        <div className="flex flex-col items-center mb-8">
          <Image
            src="/Arqu de botucatu.svg"
            alt="Arquidiocese de Botucatu"
            width={56} height={56}
            className="w-14 h-14 object-contain mb-3"
          />
          <h1 className="text-white font-serif text-[22px] font-bold">Arquidiocese de Botucatu</h1>
          <p className="text-white/40 text-[13px] mt-1">Painel administrativo</p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-8 pt-7 pb-6">

            {!sent ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <IconMailForward size={18} className="text-primary" />
                  <h2 className="font-serif text-[20px] font-bold">Esqueci minha senha</h2>
                </div>
                <p className="text-[13px] text-muted-foreground mb-5">
                  Informe seu e-mail e enviaremos um link para redefinir a senha.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                      E-mail
                    </label>
                    <input
                      type="email" required autoComplete="email" autoFocus
                      value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="usuario@arquidiocesebotucatu.org.br"
                      className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  {error && <p className="text-[13px] text-destructive">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="w-full h-10 bg-primary text-white text-[14px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? <IconLoader2 size={16} className="animate-spin" /> : <IconMailForward size={14} />}
                    {loading ? "Enviando…" : "Enviar link de redefinição"}
                  </button>
                  <Link href="/admin/login" className="flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                    <IconArrowLeft size={13} />
                    Voltar ao login
                  </Link>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-2">
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <IconMailCheck size={26} className="text-success" />
                </div>
                <h2 className="font-serif text-[18px] font-bold mb-1">Link enviado!</h2>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Se <b className="text-foreground">{email}</b> tiver uma conta, enviamos um link de redefinição. Verifique também o spam.
                </p>
                <Link href="/admin/login" className="mt-5 text-[13px] font-semibold text-primary hover:underline">
                  Voltar ao login
                </Link>
              </div>
            )}

          </div>
        </div>

        <p className="text-center text-white/20 text-[11px] mt-6">
          Acesso exclusivo para equipe autorizada · Arquidiocese de Botucatu
        </p>
      </div>
    </div>
  )
}
