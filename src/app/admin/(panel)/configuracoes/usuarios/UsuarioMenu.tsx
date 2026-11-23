"use client"

import { useEffect, useRef, useState } from "react"
import { alterarPapel, reenviarConvite, removerUsuario } from "./actions"

type Papel = "admin" | "editor" | "leitura"

const ROTULOS: Record<Papel, string> = {
  admin: "Administrador",
  editor: "Editor de conteúdo",
  leitura: "Somente leitura",
}

const itemCls =
  "w-full text-left px-3 py-2 text-[12.5px] font-medium leading-4 text-[#1A1A1A] hover:bg-[#F5F3EF] transition-colors"

export function UsuarioMenu({ userId, nome, papel, pendente }: { userId: string; nome: string; papel: Papel; pendente: boolean }) {
  const [aberto, setAberto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!aberto) return
    const fora = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setAberto(false) }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false)
    document.addEventListener("mousedown", fora)
    window.addEventListener("keydown", esc)
    return () => { document.removeEventListener("mousedown", fora); window.removeEventListener("keydown", esc) }
  }, [aberto])

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label={`Ações para ${nome}`}
        aria-expanded={aberto}
        onClick={() => setAberto(v => !v)}
        className="flex items-center justify-center size-[30px] rounded-lg bg-[#F5F3EF] hover:bg-[#ECEAE5] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.6" fill="#5A5753" />
          <circle cx="12" cy="12" r="1.6" fill="#5A5753" />
          <circle cx="12" cy="19" r="1.6" fill="#5A5753" />
        </svg>
      </button>

      {aberto && (
        <div className="absolute right-0 top-[36px] z-20 w-[210px] py-1.5 rounded-lg bg-white border border-[#ECEAE5] shadow-[0_8px_24px_#0000001F]">
          <p className="px-3 pt-1 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] leading-[14px] text-[#8A877F]">
            Nível de acesso
          </p>
          {(Object.keys(ROTULOS) as Papel[]).map(p => (
            <form key={p} action={alterarPapel.bind(null, userId)}>
              <input type="hidden" name="papel" value={p} />
              <button type="submit" disabled={p === papel} className={`${itemCls} flex items-center justify-between disabled:cursor-default`}>
                {ROTULOS[p]}
                {p === papel && (
                  <svg width="12" height="12" viewBox="0 0 24 24">
                    <path d="M5 12L10 17L19 7" fill="none" stroke="#274FA0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </form>
          ))}

          <div className="my-1.5 border-t border-[#F0EFEC]" />

          {pendente && (
            <form action={reenviarConvite.bind(null, userId)}>
              <button type="submit" className={itemCls}>Reenviar convite</button>
            </form>
          )}
          <form
            action={removerUsuario.bind(null, userId)}
            onSubmit={e => {
              if (!confirm(`Remover o acesso de ${nome}? A pessoa não vai mais conseguir entrar no painel.`)) e.preventDefault()
            }}
          >
            <button type="submit" className={`${itemCls} text-[#B42318] hover:bg-[#B42318]/[0.06]`}>Remover acesso</button>
          </form>
        </div>
      )}
    </div>
  )
}
