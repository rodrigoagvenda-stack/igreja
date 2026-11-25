"use client"

import { useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { IconTrash, IconAlertTriangle, IconDeviceFloppy } from "@tabler/icons-react"

// Modal de confirmação no mesmo visual do "Convidar usuário" (Configurações).
function Modal({
  aberto, perigo, titulo, children, rotuloConfirmar, onCancelar, onConfirmar,
}: {
  aberto: boolean
  perigo?: boolean
  titulo: string
  children: React.ReactNode
  rotuloConfirmar: string
  onCancelar: () => void
  onConfirmar: () => void
}) {
  const confirmarRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!aberto) return
    // Foco no Cancelar seria o mais seguro, mas o Enter confirmando é o esperado em "salvar";
    // na exclusão o foco fica no Cancelar.
    if (!perigo) confirmarRef.current?.focus()
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onCancelar()
    window.addEventListener("keydown", esc)
    return () => window.removeEventListener("keydown", esc)
  }, [aberto, perigo, onCancelar])

  if (!aberto) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1A308C] px-4"
      onMouseDown={e => { if (e.target === e.currentTarget) onCancelar() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmacao-titulo"
    >
      <div className="w-full max-w-[420px] rounded-2xl bg-white shadow-[0_24px_60px_#00000040] p-6">
        <div className="flex items-start gap-3">
          <span className={`flex items-center justify-center size-9 rounded-full shrink-0 ${perigo ? "bg-[#B42318]/10 text-[#B42318]" : "bg-[#274FA0]/10 text-[#274FA0]"}`}>
            {perigo ? <IconAlertTriangle size={18} /> : <IconDeviceFloppy size={18} />}
          </span>
          <div className="min-w-0">
            <h2 id="confirmacao-titulo" className="font-serif text-[18px] font-bold text-[#1A1A1A] leading-6">{titulo}</h2>
            <div className="mt-1.5 text-[13px] leading-5 text-[#5A5753]">{children}</div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            autoFocus={perigo}
            onClick={onCancelar}
            className="h-10 px-4 rounded-lg bg-[#F5F3EF] text-[13px] font-semibold text-[#1A1A1A] hover:bg-[#ECEAE5] transition-colors"
          >
            Cancelar
          </button>
          <button
            ref={confirmarRef}
            type="button"
            onClick={onConfirmar}
            className={`h-10 px-4 rounded-lg text-[13px] font-semibold text-white transition-colors ${perigo ? "bg-[#B42318] hover:bg-[#9B1C13]" : "bg-[#274FA0] hover:bg-[#1F3F82]"}`}
          >
            {rotuloConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}

/** Lixeira da lista: pergunta antes de excluir, dizendo o nome do item e que não tem volta. */
export function ExcluirComConfirmacao({
  action, item, tipo,
}: {
  action: () => Promise<void>
  item: string
  tipo: string
}) {
  const [aberto, setAberto] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={action}>
      <BotaoLixeira onClick={() => setAberto(true)} />
      <Modal
        aberto={aberto}
        perigo
        titulo={`Excluir ${tipo}?`}
        rotuloConfirmar="Sim, excluir"
        onCancelar={() => setAberto(false)}
        onConfirmar={() => { setAberto(false); formRef.current?.requestSubmit() }}
      >
        <p>
          <strong className="text-[#1A1A1A]">{item}</strong> será apagado de vez, inclusive do site.
        </p>
        <p className="mt-2 font-semibold text-[#B42318]">Essa ação não pode ser desfeita.</p>
      </Modal>
    </form>
  )
}

function BotaoLixeira({ onClick }: { onClick: () => void }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title="Excluir"
      aria-label="Excluir"
      className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
    >
      <IconTrash size={14} />
    </button>
  )
}

/**
 * Botão "Salvar" das telas de edição: confere antes de gravar. Fica dentro do <form> da
 * página; ao confirmar, envia o form (os campos obrigatórios do navegador são checados antes).
 */
export function SalvarComConfirmacao({ rotulo = "Salvar alterações", item }: { rotulo?: string; item: string }) {
  const [aberto, setAberto] = useState(false)
  const botaoRef = useRef<HTMLButtonElement>(null)
  const { pending } = useFormStatus()

  function abrir() {
    const form = botaoRef.current?.form
    if (form && !form.reportValidity()) return
    setAberto(true)
  }

  return (
    <>
      <button
        ref={botaoRef}
        type="button"
        onClick={abrir}
        disabled={pending}
        className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {pending ? "Salvando…" : rotulo}
      </button>
      <Modal
        aberto={aberto}
        titulo="Salvar alterações?"
        rotuloConfirmar="Sim, salvar"
        onCancelar={() => setAberto(false)}
        onConfirmar={() => { setAberto(false); botaoRef.current?.form?.requestSubmit() }}
      >
        <p>
          As mudanças em <strong className="text-[#1A1A1A]">{item}</strong> vão substituir os dados atuais e aparecem no site na hora.
        </p>
      </Modal>
    </>
  )
}
