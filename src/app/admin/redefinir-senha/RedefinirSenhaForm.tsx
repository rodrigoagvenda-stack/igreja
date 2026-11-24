"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { IconLock, IconLoader2, IconCheck, IconX } from "@tabler/icons-react"
import { CampoSenha } from "@/components/auth/CampoSenha"
import { criarSenhaConvite } from "./actions"
import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"

interface Props {
  supabaseUrl: string
  supabaseAnonKey: string
  convite?: boolean
}

// Espelha a política de senha configurada no Supabase Auth; se divergir, o updateUser recusa.
const REQUISITOS = [
  { label: "Mínimo de 12 caracteres", test: (s: string) => s.length >= 12 },
  { label: "1 letra maiúscula",       test: (s: string) => /[A-Z]/.test(s) },
  { label: "1 letra minúscula",       test: (s: string) => /[a-z]/.test(s) },
  { label: "Pelo menos 1 número",     test: (s: string) => /\d/.test(s) },
  { label: "1 símbolo (!@#$...)",     test: (s: string) => /[^A-Za-z0-9]/.test(s) },
]

export function RedefinirSenhaForm({ supabaseUrl, supabaseAnonKey, convite = false }: Props) {
  const router = useRouter()
  const [senha, setSenha]             = useState("")
  const [confirmar, setConfirmar]     = useState("")
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState("")
  const [tentou, setTentou]           = useState(false)

  const faltando     = REQUISITOS.filter(r => !r.test(senha))
  const requisitosOk = faltando.length === 0
  const senhasIguais = senha.length > 0 && senha === confirmar
  // Confirmação fica vermelha quando já dá pra saber que não bate (ou depois de tentar salvar).
  const confirmaErrada = confirmar.length > 0 && (tentou || confirmar.length >= senha.length) && !senhasIguais

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setTentou(true)

    if (!requisitosOk) {
      setError(`Falta na senha: ${faltando.map(r => r.label.toLowerCase()).join(", ")}.`)
      return
    }
    if (!senhasIguais) {
      setError("As senhas não coincidem.")
      return
    }

    setLoading(true)
    const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

    // Primeira senha do convite vai pelo servidor (sem o e-mail "senha alterada").
    // Qualquer outro caso (esqueci a senha) o servidor devolve fluxoNormal e segue aqui.
    const convidado = await criarSenhaConvite(senha).catch(() => null)
    if (convidado?.ok) {
      await supabase.auth.signOut()
      router.push("/admin/login?ok=conta-criada")
      return
    }
    if (convidado && !convidado.fluxoNormal) {
      setLoading(false)
      setError(convidado.erro)
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: senha })
    setLoading(false)

    if (updateError) {
      const msg = updateError.message.toLowerCase()
      setError(
        msg.includes("session") || msg.includes("jwt")
          ? "O link expirou. Peça um novo pelo \"Esqueci minha senha\" ou peça ao administrador para reenviar o convite."
          : msg.includes("different from the old")
          ? "A nova senha precisa ser diferente da senha atual."
          : msg.includes("weak") || msg.includes("pwned") || msg.includes("leaked") || msg.includes("easy to guess")
          ? "Essa senha é fraca ou já apareceu em vazamentos de dados. Escolha outra."
          : "Não foi possível salvar a senha. Confira os requisitos e tente de novo."
      )
      return
    }

    // A sessão do link é só de 1 fator: o login pede a senha nova e o 2FA (ou o cadastro dele, no convite).
    await supabase.auth.signOut()
    router.push(convite ? "/admin/login?ok=conta-criada" : "/admin/login?ok=senha-alterada")
  }

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">

        <div className="flex flex-col items-center mb-8">
          <Image
            src="/Arqu de botucatu.svg"
            alt="Arquidiocese de Botucatu"
            width={283} height={100}
            className="w-[240px] sm:w-[283px] h-auto mb-6"
          />
          <h1 className="text-white font-serif text-[22px] font-bold">Arquidiocese de Botucatu</h1>
          <p className="text-white/40 text-[13px] mt-1">Painel administrativo</p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-8 pt-7 pb-6">
            <div className="flex items-center gap-2 mb-5">
              <IconLock size={18} className="text-primary" />
              <h2 className="font-serif text-[20px] font-bold">{convite ? "Criar sua senha" : "Definir nova senha"}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                  Nova senha
                </label>
                <CampoSenha
                  required autoFocus autoComplete="new-password" value={senha}
                  invalido={tentou && !requisitosOk}
                  onChange={e => { setSenha(e.target.value); setError("") }}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                  Confirmar nova senha
                </label>
                <CampoSenha
                  required autoComplete="new-password" value={confirmar}
                  invalido={confirmaErrada}
                  onChange={e => { setConfirmar(e.target.value); setError("") }}
                />
                {confirmaErrada && <p className="text-[12px] text-destructive">As senhas não coincidem.</p>}
              </div>

              <div className="bg-muted/40 rounded-md px-3 py-2.5 space-y-1.5">
                {REQUISITOS.map(({ label, test }) => {
                  const ok = test(senha)
                  // Antes de tentar salvar: cinza neutro. Depois: o que falta fica vermelho com X.
                  const falhou = !ok && tentou
                  const Icone = falhou ? IconX : IconCheck
                  return (
                    <div key={label} className="flex items-center gap-2 text-[11.5px]">
                      <Icone size={13} className={ok ? "text-success" : falhou ? "text-destructive" : "text-muted-foreground/40"} />
                      <span className={ok ? "text-foreground" : falhou ? "text-destructive font-medium" : "text-muted-foreground"}>{label}</span>
                    </div>
                  )
                })}
              </div>

              {error && <p className="text-[13px] text-destructive">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full h-10 bg-primary text-white text-[14px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <IconLoader2 size={16} className="animate-spin" /> : <IconLock size={14} />}
                {loading ? "Salvando…" : convite ? "Criar senha" : "Salvar nova senha"}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-white/20 text-[11px] mt-6">
          Acesso exclusivo para equipe autorizada · Arquidiocese de Botucatu
        </p>
        <p className="text-center text-white/40 text-[11px] mt-2">
          Desenvolvido por ❤️{" "}
          <a href="https://agenciavenda.com.br/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] font-semibold hover:underline">
            Grupo Venda
          </a>
        </p>
      </div>
    </div>
  )
}
