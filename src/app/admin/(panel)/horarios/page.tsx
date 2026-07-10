import Link from "next/link"
import { IconPlus, IconPencil, IconTrash, IconClock } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"
import { deleteLocal } from "./actions"

export const metadata = { title: "Horários de Missa" }

export default async function AdminHorariosPage() {
  const supabase = await createClient()
  const { data: locais } = await supabase
    .from('arq_locais')
    .select('id, nome, tipo, arq_horarios_missa(id, descricao), arq_paroquias(nome, cidade)')
    .order('nome')

  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Liturgia
          </p>
          <h1 className="font-serif text-[28px] font-bold">
            Horários de Missa {locais && locais.length > 0 && <span className="text-muted-foreground text-[18px] font-normal">({locais.length})</span>}
          </h1>
        </div>
        <Link
          href="/admin/horarios/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Novo horário
        </Link>
      </div>

      {locais && locais.length > 0 ? (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="divide-y divide-border">
            {locais.map((local) => {
              const paroquia = local.arq_paroquias as { nome: string; cidade: string } | null
              const horarios = local.arq_horarios_missa as { id: string; descricao: string }[]
              return (
                <div key={local.id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <IconClock size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-medium">{local.nome}</p>
                      <span className={`text-[10px] font-semibold uppercase tracking-[.05em] px-1.5 py-0.5 rounded ${local.tipo === 'Matriz' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {local.tipo}
                      </span>
                    </div>
                    {paroquia && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">{paroquia.nome} — {paroquia.cidade}</p>
                    )}
                    {horarios.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {horarios.map(h => (
                          <span key={h.id} className="text-[11px] bg-muted rounded px-2 py-0.5 text-foreground">{h.descricao}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      href={`/admin/horarios/${local.id}/editar`}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <IconPencil size={14} />
                    </Link>
                    <form action={deleteLocal.bind(null, local.id)}>
                      <button
                        type="submit"
                        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Excluir"
                      >
                        <IconTrash size={14} />
                      </button>
                    </form>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-12 text-center">
          <p className="text-[14px] font-semibold text-foreground">Nenhum local cadastrado</p>
          <p className="text-[13px] text-muted-foreground mt-1">Clique em "Novo horário" para cadastrar um local e seus horários de missa.</p>
        </div>
      )}
    </div>
  )
}
