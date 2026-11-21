"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { IconLock, IconLoader2, IconCheck } from "@tabler/icons-react"
import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"

interface Props {
  supabaseUrl: string
  supabaseAnonKey: string
}

const REQUISITOS = [
  { label: "Mínimo de 8 caracteres", test: (s: string) => s.length >= 8 },
  { label: "Pelo menos 1 número",    test: (s: string) => /\d/.test(s) },
  { label: "1 letra maiúscula",      test: (s: string) => /[A-Z]/.test(s) },
]

export function RedefinirSenhaForm({ supabaseUrl, supabaseAnonKey }: Props) {
  const router = useRouter()
  const [senha, setSenha]             = useState("")
  const [confirmar, setConfirmar]     = useState("")
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState("")

  const requisitosOk = REQUISITOS.every(r => r.test(senha))
  const senhasIguais = senha.length > 0 && senha === confirmar

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!requisitosOk) {
      setError("A senha não atende aos requisitos mínimos.")
      return
    }
    if (!senhasIguais) {
      setError("As senhas não coincidem.")
      return
    }

    setLoading(true)
    const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
    const { error: updateError } = await supabase.auth.updateUser({ password: senha })
    setLoading(false)

    if (updateError) {
      setError("Não foi possível redefinir a senha. O link pode ter expirado — solicite um novo.")
      return
    }

    router.push("/admin")
    router.refresh()
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
            <div className="flex items-center gap-2 mb-5">
              <IconLock size={18} className="text-primary" />
              <h2 className="font-serif text-[20px] font-bold">Definir nova senha</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                  Nova senha
                </label>
                <input
                  type="password" required autoFocus value={senha}
                  onChange={e => setSenha(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                  Confirmar nova senha
                </label>
                <input
                  type="password" required value={confirmar}
                  onChange={e => setConfirmar(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <div className="bg-muted/40 rounded-md px-3 py-2.5 space-y-1.5">
                {REQUISITOS.map(({ label, test }) => {
                  const ok = test(senha)
                  return (
                    <div key={label} className="flex items-center gap-2 text-[11.5px]">
                      <IconCheck size={13} className={ok ? "text-success" : "text-muted-foreground/40"} />
                      <span className={ok ? "text-foreground" : "text-muted-foreground"}>{label}</span>
                    </div>
                  )
                })}
              </div>

              {error && <p className="text-[13px] text-destructive">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full h-10 bg-primary text-white text-[14px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <IconLoader2 size={16} className="animate-spin" /> : <IconLock size={14} />}
                {loading ? "Salvando…" : "Salvar nova senha e entrar"}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-white/20 text-[11px] mt-6">
          Acesso exclusivo para equipe autorizada · Arquidiocese de Botucatu
        </p>
      </div>
    </div>
  )
}
