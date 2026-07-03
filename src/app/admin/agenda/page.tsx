import Link from "next/link"
import { IconPlus, IconPencil, IconTrash, IconMapPin } from "@tabler/icons-react"

export const metadata = { title: "Agenda" }

const eventos = [
  { id: 1, titulo: "Ordenação Presbiteral Arquidiocesana",   data: "08 Jun 2025", local: "Catedral de Botucatu",          categoria: "Liturgia" },
  { id: 2, titulo: "Encontro Regional de Catequistas",       data: "15 Jun 2025", local: "Centro Pastoral",               categoria: "Formação" },
  { id: 3, titulo: "Assembleia dos Párocos",                 data: "22 Jun 2025", local: "Cúria Metropolitana",           categoria: "Clero" },
  { id: 4, titulo: "Retiro Espiritual — Agentes Pastorais",  data: "05 Jul 2025", local: "Casa de Espiritualidade",       categoria: "Pastoral" },
  { id: 5, titulo: "Peregrinação Arquidiocesana",            data: "15 Ago 2025", local: "Santuário Nossa Senhora Fátima", categoria: "Devoção" },
]

const catColor: Record<string, string> = {
  Liturgia:  "bg-primary/10 text-primary",
  Formação:  "bg-accent/20 text-foreground",
  Clero:     "bg-muted text-muted-foreground",
  Pastoral:  "bg-success/10 text-success",
  Devoção:   "bg-warning/15 text-warning-foreground",
}

export default function AdminAgendaPage() {
  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Calendário
          </p>
          <h1 className="font-serif text-[28px] font-bold">Agenda</h1>
        </div>
        <Link
          href="/admin/agenda/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Novo evento
        </Link>
      </div>

      <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {eventos.map(({ id, titulo, data, local, categoria }) => (
            <div key={id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors">
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex flex-col items-center justify-center shrink-0">
                <span className="font-serif text-[15px] font-bold text-primary leading-none">{data.split(" ")[0]}</span>
                <span className="text-[8px] text-primary/60 uppercase font-semibold tracking-wide">{data.split(" ")[1]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate">{titulo}</p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                  <IconMapPin size={10} />
                  {local}
                </p>
              </div>
              <span className={`text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded-full shrink-0 ${catColor[categoria]}`}>
                {categoria}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <IconPencil size={14} />
                </button>
                <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <IconTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
