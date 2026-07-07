import Link from "next/link"
import { IconPlus, IconPencil, IconTrash, IconClock } from "@tabler/icons-react"

export const metadata = { title: "Horários de Missa" }

const horarios = [
  { id: 1, local: "Catedral Nossa Senhora das Dores", tipo: "Matriz",  cidade: "Botucatu",         horarios: ["Seg–Sex 7h", "Sáb 18h", "Dom 8h, 10h, 18h"] },
  { id: 2, local: "Igreja São Benedito",              tipo: "Matriz",  cidade: "Botucatu",         horarios: ["Sáb 17h", "Dom 9h"] },
  { id: 3, local: "Capelinha São Judas Tadeu",        tipo: "Capela",  cidade: "Botucatu",         horarios: ["Dom 8h"] },
  { id: 4, local: "Igreja Sant'Ana",                  tipo: "Matriz",  cidade: "Lençóis Paulista", horarios: ["Dom 8h, 17h", "Sáb 18h"] },
  { id: 5, local: "Igreja São Francisco",             tipo: "Matriz",  cidade: "Bofete",           horarios: ["Dom 9h", "Sex 19h"] },
]

export default function AdminHorariosPage() {
  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Liturgia
          </p>
          <h1 className="font-serif text-[28px] font-bold">Horários de Missa</h1>
        </div>
        <Link
          href="/admin/horarios/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Novo horário
        </Link>
      </div>

      <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {horarios.map(({ id, local, tipo, cidade, horarios: hrs }) => (
            <div key={id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <IconClock size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium">{local}</p>
                  <span className={`text-[10px] font-semibold uppercase tracking-[.05em] px-1.5 py-0.5 rounded ${tipo === "Matriz" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {tipo}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{cidade}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {hrs.map(h => (
                    <span key={h} className="text-[11px] bg-muted rounded px-2 py-0.5 text-foreground">{h}</span>
                  ))}
                </div>
              </div>
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
