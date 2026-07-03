"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconMapPin, IconBuildingChurch } from "@tabler/icons-react"

export const dynamic = "force-static"

const padres = [
  { nome: "Pe. [Nome 01]", paroquia: "Catedral Nossa Senhora das Dores", cidade: "Botucatu" },
  { nome: "Pe. [Nome 02]", paroquia: "Paróquia São José",                cidade: "Botucatu" },
  { nome: "Pe. [Nome 03]", paroquia: "Paróquia Sagrado Coração de Jesus", cidade: "Botucatu" },
  { nome: "Pe. [Nome 04]", paroquia: "Paróquia Nossa Senhora Aparecida",  cidade: "Avaré" },
  { nome: "Pe. [Nome 05]", paroquia: "Paróquia São Pedro Apóstolo",       cidade: "Avaré" },
  { nome: "Pe. [Nome 06]", paroquia: "Paróquia Nossa Senhora da Penha",   cidade: "Piraju" },
  { nome: "Pe. [Nome 07]", paroquia: "Paróquia São Bento",                cidade: "Lençóis Paulista" },
  { nome: "Pe. [Nome 08]", paroquia: "Paróquia Nossa Senhora das Graças", cidade: "Ourinhos" },
  { nome: "Pe. [Nome 09]", paroquia: "Paróquia Santa Cruz",               cidade: "Itatinga" },
  { nome: "Pe. [Nome 10]", paroquia: "Paróquia São Francisco de Assis",   cidade: "Botucatu" },
  { nome: "Pe. [Nome 11]", paroquia: "Paróquia Imaculada Conceição",      cidade: "Avaré" },
  { nome: "Pe. [Nome 12]", paroquia: "Paróquia Santo Antônio",            cidade: "Piraju" },
]

const cidades = ["Todas as cidades", "Botucatu", "Avaré", "Piraju", "Lençóis Paulista", "Ourinhos", "Itatinga"]

export default function PadresPage() {
  const [cidade, setCidade] = useState("Todas as cidades")
  const filtrados = cidade === "Todas as cidades" ? padres : padres.filter(p => p.cidade === cidade)

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Clero"
        title="Padres"
        subtitle="Conheça os sacerdotes que servem nas paróquias da Arquidiocese de Botucatu."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Clero" }, { label: "Padres" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Select value={cidade} onValueChange={(v) => setCidade(v ?? "Todas as cidades")}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cidades.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <span className="text-[13px] text-muted-foreground">{filtrados.length} padre{filtrados.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtrados.map(({ nome, paroquia, cidade: c }) => (
            <div key={nome} className="bg-card border border-border rounded-lg p-5 flex flex-col items-center text-center gap-3 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.08)] transition-all">
              <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0">
                <Image src={`https://picsum.photos/seed/padre-${nome}/80/80`} alt={nome} fill className="object-cover" />
              </div>
              <div>
                <p className="font-serif font-bold text-[14px] leading-snug">{nome}</p>
                <p className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground mt-1">
                  <IconBuildingChurch size={11} className="text-primary flex-shrink-0" />
                  <span className="line-clamp-2">{paroquia}</span>
                </p>
                <p className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                  <IconMapPin size={11} className="text-primary flex-shrink-0" /> {c}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
