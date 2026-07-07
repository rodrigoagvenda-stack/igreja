"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  IconLock, IconShieldCheck, IconLoader2,
  IconShieldLock, IconQrcode,
} from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/client"

type Step = "credentials" | "mfa-enroll" | "mfa-verify"

export default function AdminLoginPage() {
  const router = useRouter()

  const [step, setStep]       = useState<Step>("credentials")
  const [email, setEmail]     = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode]       = useState("")
  const [factorId, setFactorId] = useState("")
  const [qrCode, setQrCode]   = useState("")
  const [secret, setSecret]   = useState("")
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)

  // ── Passo 1: e-mail + senha ──────────────────────────────────
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    let supabase
    try {
      supabase = createClient()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro de configuração. Contate o administrador.")
      setLoading(false)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError("E-mail ou senha incorretos.")
      setLoading(false)
      return
    }

    // Verifica se já tem fator TOTP cadastrado
    const { data: factors } = await supabase.auth.mfa.listFactors()
    const totp = factors?.totp?.[0]

    if (totp) {
      // Já tem MFA → ir para verificação
      setFactorId(totp.id)
      setCode("")
      setStep("mfa-verify")
      setLoading(false)
      return
    }

    // Sem MFA → cadastrar agora
    const { data: enrolled, error: enrollError } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      issuer: "Arquidiocese de Botucatu",
    })

    if (enrollError || !enrolled) {
      setError("Erro ao configurar autenticação. Tente novamente.")
      setLoading(false)
      return
    }

    setFactorId(enrolled.id)
    setQrCode(enrolled.totp.qr_code)
    setSecret(enrolled.totp.secret)
    setCode("")
    setStep("mfa-enroll")
    setLoading(false)
  }

  // ── Passo 2 / 3: verificar código TOTP ───────────────────────
  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    let supabase
    try {
      supabase = createClient()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro de configuração. Contate o administrador.")
      setLoading(false)
      return
    }

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

  // ── UI ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">

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

            {/* ── CREDENTIALS ── */}
            {step === "credentials" && (
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
                      className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
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
                      className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  {error && <p className="text-[13px] text-destructive">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 bg-primary text-white text-[14px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? <IconLoader2 size={16} className="animate-spin" /> : <IconLock size={14} />}
                    {loading ? "Verificando…" : "Entrar"}
                  </button>
                </form>
              </>
            )}

            {/* ── MFA ENROLL (primeira vez) ── */}
            {step === "mfa-enroll" && (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <IconQrcode size={18} className="text-primary" />
                  <h2 className="font-serif text-[20px] font-bold">Configurar autenticador</h2>
                </div>
                <p className="text-[13px] text-muted-foreground mb-4">
                  Escaneie o QR code com Google Authenticator, Authy ou similar. Depois digite o código gerado.
                </p>

                {qrCode && (
                  <div className="flex justify-center mb-4">
                    {/* qr_code vem como SVG base64 do Supabase */}
                    <img src={qrCode} alt="QR Code MFA" className="w-44 h-44 border border-border rounded-lg p-2" />
                  </div>
                )}

                {secret && (
                  <div className="mb-4 bg-muted/50 rounded-md px-3 py-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Código manual</p>
                    <p className="text-[12px] font-mono break-all text-foreground">{secret}</p>
                  </div>
                )}

                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                      Código de verificação (6 dígitos)
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
                      className="w-full h-10 px-3 rounded-md border border-border text-[14px] text-center tracking-[.3em] font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  {error && <p className="text-[13px] text-destructive">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading || code.length !== 6}
                    className="w-full h-10 bg-primary text-white text-[14px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? <IconLoader2 size={16} className="animate-spin" /> : <IconShieldLock size={14} />}
                    {loading ? "Configurando…" : "Confirmar e entrar"}
                  </button>
                </form>
              </>
            )}

            {/* ── MFA VERIFY (logins seguintes) ── */}
            {step === "mfa-verify" && (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <IconShieldLock size={18} className="text-primary" />
                  <h2 className="font-serif text-[20px] font-bold">Verificação em duas etapas</h2>
                </div>
                <p className="text-[13px] text-muted-foreground mb-5">
                  Digite o código atual do seu app autenticador.
                </p>
                <form onSubmit={handleVerify} className="space-y-4">
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
                      className="w-full h-10 px-3 rounded-md border border-border text-[14px] text-center tracking-[.3em] font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  {error && <p className="text-[13px] text-destructive">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading || code.length !== 6}
                    className="w-full h-10 bg-primary text-white text-[14px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? <IconLoader2 size={16} className="animate-spin" /> : <IconShieldLock size={14} />}
                    {loading ? "Verificando…" : "Verificar e entrar"}
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
              Autenticação em duas etapas obrigatória para acesso ao painel.
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
