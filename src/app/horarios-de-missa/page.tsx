"use client"

import { useState } from "react"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { IconSearch, IconMapPin, IconClock, IconBuildingChurch, IconArrowRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

const cidadesData: Record<string, string[]> = {
  botucatu:  ["Catedral Nossa Senhora das Dores", "Paróquia São José", "Paróquia Sagrado Coração de Jesus", "Paróquia São Francisco"],
  avare:     ["Paróquia Nossa Senhora Aparecida", "Paróquia São Pedro Apóstolo", "Paróquia Imaculada Conceição"],
  piraju:    ["Paróquia Nossa Senhora da Penha", "Paróquia Santo Antônio"],
  lencois:   ["Paróquia São Bento", "Paróquia Nossa Senhora de Fátima"],
  ourinhos:  ["Paróquia Nossa Senhora das Graças", "Paróquia São Luís"],
}

type Local = { nome: string; tipo: "Matriz" | "Capela"; horarios: string[] }
type ResultadoParoquia = { paroquia: string; cidade: string; locais: Local[]; href: string }

const resultadosMock: ResultadoParoquia[] = [
  {
    paroquia: "Catedral Nossa Senhora das Dores",
    cidade: "Botucatu",
    href: "/paroquias/catedral-nossa-senhora-das-dores",
    locais: [
      { nome: "Igreja Matriz — Catedral",       tipo: "Matriz",  horarios: ["8h00", "10h00", "18h00"] },
      { nome: "Capela São João Batista",         tipo: "Capela",  horarios: ["7h00", "19h00"] },
      { nome: "Capela Nossa Senhora de Fátima",  tipo: "Capela",  horarios: ["9h00"] },
    ],
  },
  {
    paroquia: "Paróquia São José",
    cidade: "Botucatu",
    href: "/paroquias/sao-jose-botucatu",
    locais: [
      { nome: "Igreja Matriz — São José",  tipo: "Matriz",  horarios: ["7h30", "10h00", "19h30"] },
      { nome: "Capela Santo Expedito",     tipo: "Capela",  horarios: ["8h00"] },
    ],
  },
  {
    paroquia: "Paróquia Sagrado Coração de Jesus",
    cidade: "Botucatu",
    href: "/paroquias/sagrado-coracao-botucatu",
    locais: [
      { nome: "Igreja Matriz — Sagrado Coração",  tipo: "Matriz",  horarios: ["8h00", "18h00"] },
      { nome: "Capela São Francisco de Assis",    tipo: "Capela",  horarios: ["7h00", "17h00"] },
    ],
  },
]

const dias = [
  { value: "dom", label: "Domingo" },
  { value: "seg", label: "Segunda-feira" },
  { value: "ter", label: "Terça-feira" },
  { value: "qua", label: "Quarta-feira" },
  { value: "qui", label: "Quinta-feira" },
  { value: "sex", label: "Sexta-feira" },
  { value: "sab", label: "Sábado" },
]

export default function HorariosMissaPage() {
  const [cidade, setCidade] = useState("")
  const [paroquia, setParoquia] = useState("")
  const [dia, setDia] = useState("")
  const [buscou, setBuscou] = useState(false)

  const paroquiasDisponiveis = cidade ? cidadesData[cidade] ?? [] : []

  function handleBuscar() {
    setBuscou(true)
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Ferramenta"
        title="Horários de Missa"
        subtitle="Encontre os horários de missa nas paróquias da Arquidiocese de Botucatu."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Horários de Missa" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">

          {/* Formulário */}
          <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm h-fit">
            <div className="px-6 pt-6 pb-4 border-b border-border">
              <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="block w-3 h-0.5 bg-accent" aria-hidden="true" />
                Busca de horários
              </p>
              <h2 className="font-serif text-[22px] font-bold text-foreground">Encontre uma missa</h2>
            </div>

            <div className="px-6 py-5 space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Cidade</Label>
                <Select value={cidade} onValueChange={(v) => { setCidade(v ?? ""); setParoquia(""); setBuscou(false) }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a cidade…" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(cidadesData).map(c => (
                      <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Paróquia (opcional)</Label>
                  <Select value={paroquia} onValueChange={(v) => setParoquia(v ?? "")} disabled={!cidade}>
                    <SelectTrigger className="disabled:opacity-60">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as paróquias</SelectItem>
                      {paroquiasDisponiveis.map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Dia da semana</Label>
                  <Select value={dia} onValueChange={(v) => setDia(v ?? "")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qualquer dia" />
                    </SelectTrigger>
                    <SelectContent>
                      {dias.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleBuscar}
                disabled={!cidade}
                className="flex items-center justify-center gap-2 w-full bg-accent text-foreground text-[14px] font-semibold py-3 rounded-md hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IconSearch size={16} />
                Buscar horários
              </button>
            </div>

            <p className="text-center text-[12px] text-muted-foreground px-6 pb-5">
              50 paróquias · 20 municípios da Arquidiocese
            </p>
          </div>

          {/* Resultados */}
          <div>
            {!buscou ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                <IconBuildingChurch size={48} className="mb-3 opacity-20" aria-hidden="true" />
                <p className="font-medium">Selecione uma cidade e clique em buscar</p>
                <p className="text-[13px] mt-1">Os resultados aparecerão aqui</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-[13px] text-muted-foreground">{resultadosMock.length} paróquias encontradas</p>
                {resultadosMock.map(({ paroquia: p, cidade: c, locais, href }) => (
                  <div key={p} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_2px_12px_rgba(39,79,160,.08)] transition-all">
                    {/* Cabeçalho da paróquia */}
                    <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-border">
                      <div>
                        <h3 className="font-serif font-bold text-[16px] leading-snug">{p}</h3>
                        <p className="flex items-center gap-1 text-[12px] text-muted-foreground mt-0.5">
                          <IconMapPin size={11} className="text-primary" /> {c}
                        </p>
                      </div>
                      <Link href={href} className="text-[12px] text-primary font-medium flex items-center gap-1 hover:gap-1.5 transition-all whitespace-nowrap flex-shrink-0">
                        Ver paróquia <IconArrowRight size={12} />
                      </Link>
                    </div>

                    {/* Locais com horários */}
                    <div className="divide-y divide-border">
                      {locais.map(({ nome, tipo, horarios }) => (
                        <div key={nome} className="px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className={`text-[10px] font-semibold uppercase tracking-[.05em] px-1.5 py-0.5 rounded flex-shrink-0 ${tipo === "Matriz" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                              {tipo}
                            </span>
                            <span className="text-[13px] font-medium truncate">{nome}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {horarios.map(h => (
                              <span key={h} className="flex items-center gap-1 text-[12px] bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">
                                <IconClock size={10} /> {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
