"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { IconSearch, IconMapPin, IconBuildingChurch, IconUser } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

const paroquias = [
  { slug: "catedral-nossa-senhora-das-dores", nome: "Catedral Nossa Senhora das Dores", cidade: "Botucatu",         paroco: "Pe. [Nome]" },
  { slug: "sao-jose-botucatu",               nome: "Paróquia São José",                cidade: "Botucatu",         paroco: "Pe. [Nome]" },
  { slug: "sagrado-coracao-botucatu",        nome: "Paróquia Sagrado Coração de Jesus", cidade: "Botucatu",        paroco: "Pe. [Nome]" },
  { slug: "nossa-senhora-aparecida-avare",   nome: "Paróquia Nossa Senhora Aparecida",  cidade: "Avaré",           paroco: "Pe. [Nome]" },
  { slug: "sao-pedro-avare",                 nome: "Paróquia São Pedro Apóstolo",       cidade: "Avaré",           paroco: "Pe. [Nome]" },
  { slug: "nossa-senhora-piraju",            nome: "Paróquia Nossa Senhora da Penha",   cidade: "Piraju",          paroco: "Pe. [Nome]" },
  { slug: "sao-bento-lencois",              nome: "Paróquia São Bento",                cidade: "Lençóis Paulista", paroco: "Pe. [Nome]" },
  { slug: "nossa-senhora-ourinhos",          nome: "Paróquia Nossa Senhora das Graças", cidade: "Ourinhos",        paroco: "Pe. [Nome]" },
  { slug: "santa-cruz-itatinga",             nome: "Paróquia Santa Cruz",               cidade: "Itatinga",        paroco: "Pe. [Nome]" },
]

const cidades = ["Todas as cidades", "Botucatu", "Avaré", "Piraju", "Lençóis Paulista", "Ourinhos", "Itatinga"]

export default function ParoquiasPage() {
  const [busca, setBusca] = useState("")
  const [cidade, setCidade] = useState("Todas as cidades")

  const filtradas = paroquias.filter(p => {
    const matchCidade = cidade === "Todas as cidades" || p.cidade === cidade
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase()) || p.cidade.toLowerCase().includes(busca.toLowerCase())
    return matchCidade && matchBusca
  })

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Comunidades"
        title="Paróquias da Arquidiocese"
        subtitle="Encontre a paróquia da sua cidade. A Arquidiocese de Botucatu abrange 50 paróquias em cerca de 20 municípios."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Paróquias" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou cidade…"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={cidade} onValueChange={(v) => setCidade(v ?? "Todas as cidades")}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cidades.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contador */}
        <p className="text-[13px] text-muted-foreground mb-5">
          {filtradas.length} paróquia{filtradas.length !== 1 ? "s" : ""} encontrada{filtradas.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtradas.map(({ slug, nome, cidade: c, paroco }) => (
            <Link
              key={slug}
              href={`/paroquias/${slug}`}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.10)] transition-all"
            >
              {/* Image */}
              <div className="h-[130px] relative overflow-hidden">
                <Image src={`https://picsum.photos/seed/${slug}/400/160`} alt={nome} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
              </div>
              {/* Body */}
              <div className="p-4">
                <h2 className="font-serif text-[15px] font-bold leading-[1.3] mb-2 group-hover:text-primary transition-colors">
                  {nome}
                </h2>
                <p className="flex items-center gap-1 text-[12px] text-muted-foreground mb-1">
                  <IconMapPin size={12} className="text-primary flex-shrink-0" /> {c}
                </p>
                <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
                  <IconUser size={12} className="text-primary flex-shrink-0" /> {paroco}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtradas.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <IconBuildingChurch size={48} className="mx-auto mb-3 opacity-20" />
            <p className="font-medium">Nenhuma paróquia encontrada.</p>
            <p className="text-[13px] mt-1">Tente outro nome ou cidade.</p>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
