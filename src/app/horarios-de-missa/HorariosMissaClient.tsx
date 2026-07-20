"use client"

import { useState } from "react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { IconSearch, IconMapPin, IconClock, IconBuildingChurch, IconArrowRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type Horario = { id: string; descricao: string }
type Local = { id: string; nome: string; tipo: "Matriz" | "Capela"; endereco: string | null; arq_horarios_missa: Horario[] }
type Paroquia = { slug: string; nome: string; cidade: string; locais: Local[] }

export default function HorariosMissaClient({ paroquias }: { paroquias: Paroquia[] }) {
  const cidades = ["", ...Array.from(new Set(paroquias.map(p => p.cidade))).sort()]
  const [cidade, setCidade] = useState("")
  const [paroquiaSel, setParoquiaSel] = useState("")
  const [buscou, setBuscou] = useState(false)

  const paroquiasDaCidade = cidade ? paroquias.filter(p => p.cidade === cidade) : []

  const resultados = (() => {
    if (!buscou || !cidade) return []
    const pool = paroquiaSel
      ? paroquiasDaCidade.filter(p => p.slug === paroquiaSel)
      : paroquiasDaCidade
    return pool.filter(p => p.locais.some(l => l.arq_horarios_missa.length > 0))
  })()

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">

        {/* Formulário */}
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm h-fit">
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="block w-3 h-0.5 bg-accent" />
              Busca de horários
            </p>
            <h2 className="font-serif text-[22px] font-bold text-foreground">Encontre uma missa</h2>
          </div>

          <div className="px-6 py-5 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Cidade</Label>
              <Select value={cidade} onValueChange={v => { setCidade(v ?? ""); setParoquiaSel(""); setBuscou(false) }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a cidade…" />
                </SelectTrigger>
                <SelectContent>
                  {cidades.filter(Boolean).map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Paróquia (opcional)</Label>
              <Select value={paroquiaSel} onValueChange={v => setParoquiaSel(v ?? "")} disabled={!cidade}>
                <SelectTrigger className="disabled:opacity-60">
                  <SelectValue placeholder="Todas as paróquias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as paróquias</SelectItem>
                  {paroquiasDaCidade.map(p => (
                    <SelectItem key={p.slug} value={p.slug}>{p.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={() => setBuscou(true)}
              disabled={!cidade}
              className="flex items-center justify-center gap-2 w-full bg-accent text-foreground text-[14px] font-semibold py-3 rounded-md hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconSearch size={16} />
              Buscar horários
            </button>
          </div>

          <p className="text-center text-[12px] text-muted-foreground px-6 pb-5">
            {paroquias.length} paróquias · Arquidiocese de Botucatu
          </p>
        </div>

        {/* Resultados */}
        <div>
          {!buscou ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
              <IconBuildingChurch size={48} className="mb-3 opacity-20" />
              <p className="font-medium">Selecione uma cidade e clique em buscar</p>
              <p className="text-[13px] mt-1">Os resultados aparecerão aqui</p>
            </div>
          ) : resultados.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
              <IconBuildingChurch size={48} className="mb-3 opacity-20" />
              <p className="font-medium">Nenhum horário cadastrado para essa seleção.</p>
              <p className="text-[13px] mt-1">Entre em contato diretamente com a paróquia.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-[13px] text-muted-foreground">
                {resultados.length} paróquia{resultados.length !== 1 ? "s" : ""} encontrada{resultados.length !== 1 ? "s" : ""}
              </p>
              {resultados.map(({ slug, nome, cidade: c, locais }) => (
                <div key={slug} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_2px_12px_rgba(39,79,160,.08)] transition-all">
                  <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-border">
                    <div>
                      <h3 className="font-serif font-bold text-[16px] leading-snug">{nome}</h3>
                      <p className="flex items-center gap-1 text-[12px] text-muted-foreground mt-0.5">
                        <IconMapPin size={11} className="text-primary" /> {c}
                      </p>
                    </div>
                    <Link href={`/paroquias/${slug}`} className="text-[12px] text-primary font-medium flex items-center gap-1 hover:gap-1.5 transition-all whitespace-nowrap flex-shrink-0">
                      Ver paróquia <IconArrowRight size={12} />
                    </Link>
                  </div>
                  <div className="divide-y divide-border">
                    {locais.filter(l => l.arq_horarios_missa.length > 0).map(({ id, nome: ln, tipo, arq_horarios_missa: hs }) => (
                      <div key={id} className="px-5 py-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-semibold uppercase tracking-[.05em] px-1.5 py-0.5 rounded ${tipo === "Matriz" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                            {tipo}
                          </span>
                          <span className="text-[13px] font-medium">{ln}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          {hs.map(h => (
                            <p key={h.id} className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                              <IconClock size={12} className="text-primary flex-shrink-0" /> {h.descricao}
                            </p>
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
  )
}
