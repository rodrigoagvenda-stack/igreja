"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { IconLock, IconShieldCheck, IconLoader2, IconShieldLock } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/client"

type Step = "credentials" | "mfa"

export default function AdminLoginPage() {
  const router = useRouter()
  const [step, setStep]         = useState<Step>("credentials")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode]         = useState("")
  const [factorId, setFactorId] = useState("")
  const [error, setError]       = useState("")
  const [loading, setLoading]   = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError("E-mail ou senha incorretos.")
      setLoading(false)
      return
    }

    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

    if (aal?.nextLevel === "aal2") {
      const { data: factors } = await supabase.auth.mfa.listFactors()
      const totp = factors?.totp?.[0]
      if (totp) {
        setFactorId(totp.id)
        setStep("mfa")
        setLoading(false)
        return
      }
    }

    router.push("/admin")
    router.refresh()
  }

  async function handleMFA(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const supabase = createClient()
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId })

    if (challengeError || !challenge) {
      setError("Erro ao iniciar verificação. Tente novamente.")
      setLoading(false)
      return
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code,
    })

    if (verifyError) {
      setError("Código inválido ou expirado.")
      setLoading(false)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">

        <div className="flex flex-col items-center mb-8">
          <Image
            src="/Arqu de botucatu.svg"
            alt="Arquidiocese de Botucatu"
            width={56} height={56}
            className="brightness-0 invert opacity-90 w-14 h-14 object-contain mb-3"
          />
          <h1 className="text-white font-serif text-[22px] font-bold">Arquidiocese de Botucatu</h1>
          <p className="text-white/40 text-[13px] mt-1">Painel administrativo</p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-8 pt-7 pb-6">

            {step === "credentials" ? (
              <>
                <h2 className="font-serif text-[20px] font-bold mb-5">Acesso restrito</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                      E-mail institucional
                    </label>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="usuario@arquidiocesebotucatu.org.br"
                      className="w-full h-10 px-3 rounded-md border border-border text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                      Senha
                    </label>
                    <input
                      type="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-10 px-3 rounded-md border border-border text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-[13px] text-destructive">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 bg-primary text-white text-[14px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading
                      ? <IconLoader2 size={16} className="animate-spin" />
                      : <IconLock size={14} />
                    }
                    {loading ? "Entrando…" : "Entrar"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <IconShieldLock size={18} className="text-primary" />
                  <h2 className="font-serif text-[20px] font-bold">Verificação em duas etapas</h2>
                </div>
                <p className="text-[13px] text-muted-foreground mb-5">
                  Digite o código do seu app autenticador.
                </p>
                <form onSubmit={handleMFA} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                      Código de 6 dígitos
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                      autoFocus
                      value={code}
                      onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="000000"
                      className="w-full h-10 px-3 rounded-md border border-border text-[14px] text-center tracking-[.3em] font-mono bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-[13px] text-destructive">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || code.length !== 6}
                    className="w-full h-10 bg-primary text-white text-[14px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading
                      ? <IconLoader2 size={16} className="animate-spin" />
                      : <IconShieldLock size={14} />
                    }
                    {loading ? "Verificando…" : "Verificar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setStep("credentials"); setError(""); setCode("") }}
                    className="w-full text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Voltar
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="bg-muted/50 px-8 py-4 flex items-center gap-2 border-t border-border">
            <IconShieldCheck size={14} className="text-primary flex-shrink-0" />
            <p className="text-[11px] text-muted-foreground leading-snug">
              Autenticação de dois fatores obrigatória. Configure um app autenticador antes do primeiro acesso.
            </p>
          </div>
        </div>

        <p className="text-center text-white/20 text-[11px] mt-6">
          Acesso exclusivo para equipe autorizada · Arquidiocese de Botucatu
        </p>
      </div>
    </div>
  )
}
