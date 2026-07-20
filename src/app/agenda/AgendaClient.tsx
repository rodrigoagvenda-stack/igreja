"use client"

import { useState } from "react"
import { IconMapPin, IconClock, IconCalendar } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type Evento = {
  id: string
  titulo: string
  descricao: string | null
  local: string | null
  categoria: string
  inicio: string
  fim: string | null
  destaque: boolean
}

const categoryColor: Record<string, string> = {
  Litúrgico:     "bg-purple-100 text-purple-700",
  Pastoral:      "bg-primary/10 text-primary",
  Formação:      "bg-green-100 text-green-700",
  Institucional: "bg-accent/20 text-foreground",
  Geral:         "bg-muted text-muted-foreground",
}

const categoryDot: Record<string, string> = {
  Litúrgico:     "bg-purple-600",
  Pastoral:      "bg-primary",
  Formação:      "bg-green-600",
  Institucional: "bg-amber-500",
  Geral:         "bg-muted-foreground",
}

function formatData(iso: string) {
  const d = new Date(iso)
  return {
    dia: d.toLocaleDateString("pt-BR", { day: "2-digit" }),
    mes: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "").toLowerCase(),
    horario: d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  }
}

export default function AgendaClient({ eventos, categorias }: { eventos: Evento[]; categorias: string[] }) {
  const [filtro, setFiltro] = useState("Todos")

  const filtrados = filtro === "Todos" ? eventos : eventos.filter(e => e.categoria === filtro)

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["Todos", ...categorias].map(cat => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={cn(
              "text-[13px] font-medium px-4 py-1.5 rounded-full border transition-all",
              filtro === cat
                ? "bg-primary text-white border-primary"
                : "bg-white text-foreground border-border hover:border-primary hover:text-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <IconCalendar size={48} className="mx-auto mb-3 opacity-20" />
          <p className="font-medium">Nenhum evento encontrado.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtrados.map(({ id, titulo, descricao, local, categoria, inicio }) => {
            const { dia, mes, horario } = formatData(inicio)
            const dot = categoryDot[categoria] ?? categoryDot.Geral
            const badge = categoryColor[categoria] ?? categoryColor.Geral

            return (
              <div
                key={id}
                className="bg-card border border-border rounded-lg p-5 flex gap-5 hover:border-primary hover:shadow-[0_2px_12px_rgba(39,79,160,.08)] transition-all"
              >
                {/* Date box */}
                <div className={cn("w-14 h-14 rounded-lg flex flex-col items-center justify-center flex-shrink-0 text-white", dot)}>
                  <span className="text-[20px] font-bold leading-none">{dia}</span>
                  <span className="text-[10px] uppercase tracking-wide font-semibold opacity-80">{mes}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="font-semibold text-[15px] leading-snug">{titulo}</h2>
                    <span className={cn("inline-flex text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm", badge)}>
                      {categoria}
                    </span>
                  </div>
                  {descricao && (
                    <p className="text-[13px] text-muted-foreground leading-[1.5] mb-2">{descricao}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-[12px] text-muted-foreground">
                    {local && (
                      <span className="flex items-center gap-1.5">
                        <IconMapPin size={12} className="text-primary" /> {local}
                      </span>
                    )}
                    {horario !== "00:00" && (
                      <span className="flex items-center gap-1.5">
                        <IconClock size={12} className="text-primary" /> {horario}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
