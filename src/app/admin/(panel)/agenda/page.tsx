import Link from "next/link"
import { IconPlus, IconPencil, IconTrash, IconMapPin } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"
import { deleteEvento } from "./actions"

export const metadata = { title: "Agenda" }

const catColor: Record<string, string> = {
  Liturgia:  "bg-primary/10 text-primary",
  Formação:  "bg-accent/20 text-foreground",
  Clero:     "bg-muted text-muted-foreground",
  Pastoral:  "bg-success/10 text-success",
  Devoção:   "bg-warning/15 text-warning-foreground",
}

export default async function AdminAgendaPage() {
  const supabase = await createClient()
  const { data: eventos } = await supabase
    .from('arq_eventos')
    .select('id, titulo, local, categoria, inicio')
    .order('inicio', { ascending: true })

  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Calendário
          </p>
          <h1 className="font-serif text-[28px] font-bold">
            Agenda {eventos && eventos.length > 0 && <span className="text-muted-foreground text-[18px] font-normal">({eventos.length})</span>}
          </h1>
        </div>
        <Link
          href="/admin/agenda/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Novo evento
        </Link>
      </div>

      {eventos && eventos.length > 0 ? (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="divide-y divide-border">
            {eventos.map(({ id, titulo, local, categoria, inicio }) => {
              const d = new Date(inicio)
              const dia = d.toLocaleDateString('pt-BR', { day: '2-digit' })
              const mes = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
              const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
              return (
                <div key={id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex flex-col items-center justify-center shrink-0">
                    <span className="font-serif text-[15px] font-bold text-primary leading-none">{dia}</span>
                    <span className="text-[8px] text-primary/60 uppercase font-semibold tracking-wide">{mes}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">{titulo}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {local && (
                        <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <IconMapPin size={10} />
                          {local}
                        </p>
                      )}
                      <span className="text-[11px] text-muted-foreground">{hora}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded-full shrink-0 ${catColor[categoria] ?? 'bg-muted text-muted-foreground'}`}>
                    {categoria}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      href={`/admin/agenda/${id}/editar`}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <IconPencil size={14} />
                    </Link>
                    <form action={deleteEvento.bind(null, id)}>
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
          <p className="text-[14px] font-semibold text-foreground">Nenhum evento cadastrado</p>
          <p className="text-[13px] text-muted-foreground mt-1">Clique em "Novo evento" para começar.</p>
        </div>
      )}
    </div>
  )
}
