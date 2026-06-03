"use client"

import { useState } from "react"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { IconMapPin, IconClock, IconCalendar } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

const categorias = ["Todos", "Litúrgico", "Pastoral", "Formação", "Institucional"]

const eventos = [
  { dia: "08", mes: "Jun", titulo: "Ordenação Presbiteral Arquidiocesana",    local: "Catedral de Botucatu",   horario: "10h00", categoria: "Litúrgico",     descricao: "Dom [Arcebispo] presidirá a Ordenação Presbiteral na Catedral Nossa Senhora das Dores." },
  { dia: "15", mes: "Jun", titulo: "Encontro Regional de Catequistas",         local: "Centro Pastoral",        horario: "9h00",  categoria: "Formação",      descricao: "Formação para catequistas da região pastoral de Botucatu e municípios vizinhos." },
  { dia: "22", mes: "Jun", titulo: "Assembleia dos Párocos — 2.º Semestre",   local: "Cúria Metropolitana",    horario: "14h00", categoria: "Institucional", descricao: "Reunião de planejamento pastoral com todos os párocos da Arquidiocese." },
  { dia: "29", mes: "Jun", titulo: "Solenidade de São Pedro e São Paulo",     local: "Todas as paróquias",     horario: "",      categoria: "Litúrgico",     descricao: "Solenidade dos Santos Apóstolos Pedro e Paulo, padroeiros da Igreja de Roma." },
  { dia: "05", mes: "Jul", titulo: "Retiro dos Jovens Missionários",          local: "Casa de Retiros — Avaré",horario: "8h00",  categoria: "Pastoral",      descricao: "Retiro espiritual para jovens do setor pastoral de Avaré." },
  { dia: "12", mes: "Jul", titulo: "Assembleia Diocesana de Pastoral",        local: "Centro Diocesano",       horario: "9h00",  categoria: "Institucional", descricao: "Assembleia anual com representantes de todos os setores pastorais." },
  { dia: "25", mes: "Jul", titulo: "Solenidade de Santiago Apóstolo",         local: "Todas as paróquias",     horario: "",      categoria: "Litúrgico",     descricao: "Celebração do apóstolo Tiago, patrono de muitas comunidades da Arquidiocese." },
  { dia: "02", mes: "Ago", titulo: "Início da Escola de Evangelização 2025", local: "Centro Pastoral",        horario: "19h00", categoria: "Formação",      descricao: "Início das turmas do segundo semestre da Escola Diocesana de Evangelização." },
]

const categoryColor: Record<string, string> = {
  Litúrgico:     "bg-purple-100 text-purple-700",
  Pastoral:      "bg-primary/10 text-primary",
  Formação:      "bg-green-100 text-green-700",
  Institucional: "bg-accent/20 text-foreground",
}

const categoryDot: Record<string, string> = {
  Litúrgico:     "bg-purple-600",
  Pastoral:      "bg-primary",
  Formação:      "bg-green-600",
  Institucional: "bg-amber-500",
}

export default function AgendaPage() {
  const [filtro, setFiltro] = useState("Todos")
  const filtrados = filtro === "Todos" ? eventos : eventos.filter(e => e.categoria === filtro)

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Calendário"
        title="Agenda Pastoral"
        subtitle="Acompanhe os próximos eventos, celebrações e encontros da Arquidiocese de Botucatu."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Agenda" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map(cat => (
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

        {/* Lista */}
        <div className="flex flex-col gap-4">
          {filtrados.map(({ dia, mes, titulo, local, horario, categoria, descricao }) => (
            <div
              key={`${dia}${mes}${titulo}`}
              className="bg-card border border-border rounded-lg p-5 flex gap-5 hover:border-primary hover:shadow-[0_2px_12px_rgba(39,79,160,.08)] transition-all"
            >
              {/* Date box */}
              <div className={cn("w-14 h-14 rounded-lg flex flex-col items-center justify-center flex-shrink-0 text-white", categoryDot[categoria])}>
                <span className="text-[20px] font-bold leading-none">{dia}</span>
                <span className="text-[10px] uppercase tracking-wide font-semibold opacity-80">{mes}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="font-semibold text-[15px] leading-snug">{titulo}</h2>
                  <span className={cn("inline-flex text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm", categoryColor[categoria])}>
                    {categoria}
                  </span>
                </div>
                <p className="text-[13px] text-muted-foreground leading-[1.5] mb-2">{descricao}</p>
                <div className="flex flex-wrap gap-4 text-[12px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <IconMapPin size={12} className="text-primary" /> {local}
                  </span>
                  {horario && (
                    <span className="flex items-center gap-1.5">
                      <IconClock size={12} className="text-primary" /> {horario}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <IconCalendar size={48} className="mx-auto mb-3 opacity-20" />
            <p className="font-medium">Nenhum evento encontrado para essa categoria.</p>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
