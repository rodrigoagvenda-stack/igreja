"use client"

import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { convidarUsuario } from "./actions"

const PAPEIS = [
  { valor: "admin", titulo: "Administrador", descricao: "Acesso total: paróquias, clero, conteúdo e configurações" },
  { valor: "editor", titulo: "Editor de conteúdo", descricao: "Pode criar e editar Notícias, Agenda e Documentos" },
  { valor: "leitura", titulo: "Somente leitura", descricao: "Pode visualizar tudo, sem editar" },
] as const

const inputCls =
  "h-[42px] w-full px-3 rounded-lg border border-[#DDD9D1] text-[13px] leading-4 text-[#1A1A1A] placeholder:text-[#B8B4AB] focus:outline-none focus:border-[#274FA0] focus:ring-2 focus:ring-[#274FA0]/20 transition-colors"

function BotaoEnviar() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="py-2.5 px-5 rounded-lg bg-[#274FA0] text-[13px] font-semibold leading-4 text-white hover:bg-[#274FA0]/90 transition-colors disabled:opacity-60"
    >
      {pending ? "Enviando…" : "Enviar convite"}
    </button>
  )
}

export function ConvidarUsuarioModal() {
  const [aberto, setAberto] = useState(false)
  const [papel, setPapel] = useState<string>("editor")

  useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [aberto])

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="flex items-center gap-1.5 py-2 px-3.5 rounded-lg bg-[#274FA0] hover:bg-[#274FA0]/90 transition-colors shrink-0"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" className="shrink-0">
          <path d="M12 5V19M5 12H19" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <span className="text-[12px] font-semibold leading-4 text-white">Convidar usuário</span>
      </button>

      {aberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1A308C] p-4"
          onClick={() => setAberto(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="convidar-titulo"
            onClick={e => e.stopPropagation()}
            className="w-full max-w-[460px] max-h-[calc(100vh-32px)] overflow-y-auto flex flex-col rounded-2xl bg-white shadow-[0_24px_60px_#00000040]"
          >
            <form action={convidarUsuario}>
              <div className="flex items-center justify-between gap-3 py-5 px-6 border-b border-[#ECEAE5]">
                <div className="flex flex-col gap-0.5">
                  <h2 id="convidar-titulo" className="text-[16px] font-bold leading-5 text-[#1A1A1A]">Convidar usuário</h2>
                  <p className="text-[12px] leading-4 text-[#8A877F]">Enviaremos um convite por e-mail para criar a senha</p>
                </div>
                <button
                  type="button"
                  aria-label="Fechar"
                  onClick={() => setAberto(false)}
                  className="flex items-center justify-center size-[30px] rounded-lg bg-[#F5F3EF] hover:bg-[#ECEAE5] transition-colors shrink-0"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24">
                    <path d="M5 5L19 19M19 5L5 19" fill="none" stroke="#5A5753" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-semibold leading-4 text-[#5A5753]">Nome completo</span>
                  <input name="nome" required minLength={2} maxLength={80} autoFocus placeholder="Ex: Pe. João Carlos Ferreira" className={inputCls} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-semibold leading-4 text-[#5A5753]">E-mail</span>
                  <input name="email" type="email" required autoComplete="off" placeholder="nome@arquidiocese.org.br" className={inputCls} />
                </label>

                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-2 text-[12px] font-semibold leading-4 text-[#5A5753]">Nível de acesso</legend>
                  {PAPEIS.map(p => {
                    const ativo = papel === p.valor
                    return (
                      <label
                        key={p.valor}
                        className={
                          ativo
                            ? "flex items-center gap-2.5 py-2.5 px-3 rounded-lg cursor-pointer bg-[#274FA00D] border-[1.5px] border-[#274FA0]"
                            : "flex items-center gap-2.5 py-2.5 px-3 rounded-lg cursor-pointer border border-[#DDD9D1] hover:border-[#B8B4AB] transition-colors"
                        }
                      >
                        <input
                          type="radio"
                          name="papel"
                          value={p.valor}
                          checked={ativo}
                          onChange={() => setPapel(p.valor)}
                          className="sr-only"
                        />
                        {ativo ? (
                          <span className="flex items-center justify-center size-4 shrink-0 rounded-full border-2 border-[#274FA0]">
                            <span className="size-2 rounded-full bg-[#274FA0]" />
                          </span>
                        ) : (
                          <span className="size-4 shrink-0 rounded-full border-2 border-[#DDD9D1]" />
                        )}
                        <span className="flex flex-col">
                          <span className="text-[12.5px] font-semibold leading-4 text-[#1A1A1A]">{p.titulo}</span>
                          <span className="text-[11px] leading-[14px] text-[#8A877F]">{p.descricao}</span>
                        </span>
                      </label>
                    )
                  })}
                </fieldset>

                <div className="flex items-start gap-2 py-2.5 px-3 rounded-lg bg-[#FAF9F6]">
                  <svg width="14" height="14" viewBox="0 0 24 24" className="mt-px shrink-0">
                    <circle cx="12" cy="12" r="9" fill="none" stroke="#274FA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16v-4M12 8h.01" fill="none" stroke="#274FA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-[11.5px] leading-[150%] text-[#5A5753]">
                    O usuário receberá um e-mail para definir a senha e ativar a autenticação em dois fatores (obrigatória para todas as contas).
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 py-4 px-6 border-t border-[#ECEAE5]">
                <button
                  type="button"
                  onClick={() => setAberto(false)}
                  className="py-2.5 px-[18px] rounded-lg bg-[#F5F3EF] text-[13px] font-semibold leading-4 text-[#5A5753] hover:bg-[#ECEAE5] transition-colors"
                >
                  Cancelar
                </button>
                <BotaoEnviar />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
