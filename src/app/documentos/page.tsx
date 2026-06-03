"use client"

import { useState } from "react"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { IconFileText, IconDownload, IconChevronRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

const tipos = ["Todos", "Decreto", "Comunicado", "Nomeação", "Circular"]
const anos  = ["Todos os anos", "2025", "2024", "2023"]

const documentos = [
  { slug: "decreto-nomeacao-paroco-catedral",   tipo: "Decreto",    titulo: "Decreto de Nomeação — Pároco da Catedral Nossa Senhora das Dores",                data: "28 mai 2025", ano: "2025" },
  { slug: "comunicado-jubileu-2025",            tipo: "Comunicado", titulo: "Comunicado sobre o Jubileu de 2025 e celebrações diocesanas",                   data: "20 mai 2025", ano: "2025" },
  { slug: "nomeacao-vigario-episcopal-avare",   tipo: "Nomeação",   titulo: "Nomeação de Vigário Episcopal para o Setor Pastoral de Avaré",                  data: "15 mai 2025", ano: "2025" },
  { slug: "circular-12-catequese",              tipo: "Circular",   titulo: "Circular n.º 12/2025 — Orientações para a Semana Nacional da Catequese",        data: "08 mai 2025", ano: "2025" },
  { slug: "decreto-criacao-paroquia-itatinga",  tipo: "Decreto",    titulo: "Decreto de Criação da Paróquia Santa Cruz em Itatinga",                         data: "10 mar 2025", ano: "2025" },
  { slug: "comunicado-quaresma-2025",           tipo: "Comunicado", titulo: "Comunicado Pastoral para a Quaresma e Páscoa de 2025",                          data: "01 mar 2025", ano: "2025" },
  { slug: "circular-01-2024",                   tipo: "Circular",   titulo: "Circular n.º 01/2024 — Diretrizes para o Ano Pastoral 2024",                    data: "15 jan 2024", ano: "2024" },
  { slug: "decreto-nomeacao-parocos-2024",      tipo: "Decreto",    titulo: "Decreto de Nomeação de Párocos — Reorganização Pastoral 2024",                  data: "02 jan 2024", ano: "2024" },
]

const badgeStyle: Record<string, string> = {
  Decreto:    "bg-primary/10 text-primary",
  Comunicado: "bg-accent/20 text-foreground",
  Nomeação:   "bg-green-100 text-green-700",
  Circular:   "bg-purple-100 text-purple-700",
}

export default function DocumentosPage() {
  const [tipo, setTipo] = useState("Todos")
  const [ano, setAno]   = useState("Todos os anos")

  const filtrados = documentos.filter(d => {
    const matchTipo = tipo === "Todos" || d.tipo === tipo
    const matchAno  = ano  === "Todos os anos" || d.ano === ano
    return matchTipo && matchAno
  })

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Governo eclesiástico"
        title="Documentos Oficiais"
        subtitle="Decretos, comunicados, nomeações e circulares do governo arquidiocesano."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Documentos" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Select value={tipo} onValueChange={(v) => setTipo(v ?? "Todos")}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tipos.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={ano} onValueChange={(v) => setAno(v ?? "Todos os anos")}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {anos.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
          <span className="self-center text-[13px] text-muted-foreground ml-auto">
            {filtrados.length} documento{filtrados.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-3">
          {filtrados.map(({ slug, tipo: t, titulo, data }) => (
            <Link
              key={slug}
              href={`/documentos/${slug}`}
              className="group bg-card border border-border rounded-lg px-5 py-4 flex items-center gap-4 hover:border-primary hover:shadow-[0_2px_12px_rgba(39,79,160,.08)] transition-all"
            >
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <IconFileText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("inline-flex text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm", badgeStyle[t])}>
                    {t}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{data}</span>
                </div>
                <p className="text-[14px] font-medium leading-[1.4] truncate group-hover:text-primary transition-colors">
                  {titulo}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="hidden sm:flex items-center gap-1 text-[12px] text-muted-foreground group-hover:text-primary transition-colors">
                  <IconDownload size={13} /> PDF
                </span>
                <IconChevronRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
