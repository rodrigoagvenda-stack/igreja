"use client"

import Link from "next/link"
import { useState } from "react"
import { IconMapPin, IconArrowRight, IconSearch, IconCalendar } from "@tabler/icons-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const agendaItems = [
  { day: "08", month: "Jun", title: "Ordenação Presbiteral Arquidiocesana", location: "Catedral de Botucatu · 10h00", dotColor: "bg-primary", href: "/agenda" },
  { day: "15", month: "Jun", title: "Encontro Regional de Catequistas",     location: "Centro Pastoral · 9h00",         dotColor: "bg-accent",   href: "/agenda" },
  { day: "22", month: "Jun", title: "Assembleia dos Párocos — 2.º Semestre", location: "Cúria Metropolitana · 14h00",   dotColor: "bg-muted-foreground", href: "/agenda" },
  { day: "29", month: "Jun", title: "Solenidade de São Pedro e São Paulo",  location: "Todas as paróquias",             dotColor: "bg-info",     href: "/agenda" },
]

export function AgendaMissaSection() {
  const [cidade, setCidade] = useState("")
  const [dia, setDia] = useState("")

  return (
    <section className="py-16 md:py-20 bg-muted/50" aria-label="Agenda pastoral e horários de missa">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

          {/* ── AGENDA ── */}
          <div>
            <div className="flex items-end justify-between mb-5 pb-4 border-b border-border">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                  <span className="block w-4 h-0.5 bg-primary" aria-hidden="true" />
                  Calendário pastoral
                </p>
                <h2 className="font-serif text-[22px] font-bold">Próximos eventos</h2>
              </div>
              <Link href="/agenda" className="text-[13px] text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Ver calendário <IconArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden divide-y divide-border">
              {agendaItems.map(({ day, month, title, location, dotColor, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors group"
                >
                  {/* Date box */}
                  <div className={`w-11 h-11 ${dotColor} rounded-md flex flex-col items-center justify-center flex-shrink-0`}>
                    <span className="text-[18px] font-bold text-white leading-none">{day}</span>
                    <span className="text-[9px] text-white/80 uppercase tracking-wide font-semibold">{month}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold leading-[1.3] group-hover:text-primary transition-colors truncate">
                      {title}
                    </p>
                    <p className="flex items-center gap-1 text-[12px] text-muted-foreground mt-0.5">
                      <IconMapPin size={11} className="text-primary flex-shrink-0" />
                      {location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── BUSCA DE MISSA ── */}
          <div>
            <div className="flex items-end justify-between mb-5 pb-4 border-b border-border">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                  <span className="block w-4 h-0.5 bg-primary" aria-hidden="true" />
                  Ferramenta
                </p>
                <h2 className="font-serif text-[22px] font-bold">Encontre uma missa</h2>
              </div>
            </div>

            <div className="bg-primary rounded-lg overflow-hidden">
              {/* Header */}
              <div className="px-6 pt-5 pb-4 border-b border-white/15">
                <p className="text-[10px] font-semibold text-accent uppercase tracking-widest mb-1 flex items-center gap-2">
                  <span className="block w-3 h-0.5 bg-accent" aria-hidden="true" />
                  Busca de horários
                </p>
                <h3 className="font-serif text-[20px] font-bold text-white">
                  Horários de missa na sua cidade
                </h3>
              </div>

              {/* Form */}
              <div className="px-6 py-5 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold text-white/70 uppercase tracking-[.06em]">
                    Cidade
                  </Label>
                  <Select value={cidade} onValueChange={(v) => setCidade(v ?? "")}>
                    <SelectTrigger className="bg-white border-white/30 text-foreground focus:border-accent">
                      <SelectValue placeholder="Selecione a cidade…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="botucatu">Botucatu</SelectItem>
                      <SelectItem value="avare">Avaré</SelectItem>
                      <SelectItem value="piraju">Piraju</SelectItem>
                      <SelectItem value="lencois">Lençóis Paulista</SelectItem>
                      <SelectItem value="ourinhos">Ourinhos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold text-white/70 uppercase tracking-[.06em]">
                    Paróquia (opcional)
                  </Label>
                  <Select disabled={!cidade}>
                    <SelectTrigger className="bg-white border-white/30 text-foreground disabled:opacity-60">
                      <SelectValue placeholder="Todas as paróquias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as paróquias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold text-white/70 uppercase tracking-[.06em]">
                    Dia da semana
                  </Label>
                  <Select value={dia} onValueChange={(v) => setDia(v ?? "")}>
                    <SelectTrigger className="bg-white border-white/30 text-foreground">
                      <SelectValue placeholder="Qualquer dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dom">Domingo</SelectItem>
                      <SelectItem value="seg">Segunda-feira</SelectItem>
                      <SelectItem value="ter">Terça-feira</SelectItem>
                      <SelectItem value="qua">Quarta-feira</SelectItem>
                      <SelectItem value="qui">Quinta-feira</SelectItem>
                      <SelectItem value="sex">Sexta-feira</SelectItem>
                      <SelectItem value="sab">Sábado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Link
                  href="/horarios-de-missa"
                  className="flex items-center justify-center gap-2 w-full bg-accent text-foreground text-[14px] font-semibold py-3 rounded-md hover:bg-accent/90 transition-colors mt-2"
                >
                  <IconSearch size={16} />
                  Buscar horários
                </Link>
              </div>

              {/* Footer */}
              <p className="text-center text-[12px] text-white/55 px-6 pb-5">
                50 paróquias · 20 municípios da Arquidiocese
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
