"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconSearch, IconMapPin, IconUser, IconBuildingChurch } from "@tabler/icons-react"

type Paroquia = {
  slug: string
  nome: string
  cidade: string
  regiao_pastoral: string
  padroeiro: string | null
}

const regioes = ["Todas as regiões", "RP1 — Botucatu", "RP2 — Avaré", "RP3 — Laranjal Paulista", "RP4 — Lençóis Paulista"]
const rpMap: Record<string, string> = {
  "RP1 — Botucatu": "RP1",
  "RP2 — Avaré": "RP2",
  "RP3 — Laranjal Paulista": "RP3",
  "RP4 — Lençóis Paulista": "RP4",
}

export default function ParoquiasClient({ paroquias }: { paroquias: Paroquia[] }) {
  const [busca, setBusca] = useState("")
  const [regiao, setRegiao] = useState("Todas as regiões")

  const filtradas = paroquias.filter(p => {
    const matchRegiao = regiao === "Todas as regiões" || p.regiao_pastoral === rpMap[regiao]
    const matchBusca =
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cidade.toLowerCase().includes(busca.toLowerCase())
    return matchRegiao && matchBusca
  })

  return (
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
        <Select value={regiao} onValueChange={v => setRegiao(v ?? "Todas as regiões")}>
          <SelectTrigger className="w-full sm:w-[260px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regioes.map(r => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
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
        {filtradas.map(({ slug, nome, cidade, regiao_pastoral, padroeiro }) => (
          <Link
            key={slug}
            href={`/paroquias/${slug}`}
            className="group bg-card border border-border rounded-lg p-5 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.10)] transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <IconBuildingChurch size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-[15px] font-bold leading-[1.3] mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                  {nome}
                </h2>
                <p className="flex items-center gap-1 text-[12px] text-muted-foreground mb-0.5">
                  <IconMapPin size={11} className="text-primary flex-shrink-0" />
                  {cidade}
                </p>
                {padroeiro && (
                  <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
                    <IconUser size={11} className="text-primary flex-shrink-0" />
                    {padroeiro}
                  </p>
                )}
                <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded bg-primary/10 text-primary">
                  {regiao_pastoral}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtradas.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <IconBuildingChurch size={48} className="mx-auto mb-3 opacity-20" />
          <p className="font-medium">Nenhuma paróquia encontrada.</p>
          <p className="text-[13px] mt-1">Tente outro nome, cidade ou região.</p>
        </div>
      )}
    </div>
  )
}
