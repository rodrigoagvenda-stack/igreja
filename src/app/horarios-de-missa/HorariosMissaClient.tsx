"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { IconSearch, IconMapPin, IconClock, IconBuildingChurch, IconArrowRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { formatDias, diaDeHojePt, horarioBateHoje } from "@/lib/horarios"

type Horario = { id: string; dias: string[]; horarios: string[] }
type Local = { id: string; nome: string; tipos: ("Matriz" | "Capela")[]; endereco: string | null; arq_horarios_missa: Horario[] }
type Paroquia = { slug: string; nome: string; cidade: string; capa: string | null; locais: Local[] }

type Filtro = "hoje" | "domingo" | "todos"

function semAcentoLower(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}

export default function HorariosMissaClient({ paroquias }: { paroquias: Paroquia[] }) {
  const [busca, setBusca] = useState("")
  const [filtro, setFiltro] = useState<Filtro>("todos")
  const hoje = diaDeHojePt()

  const resultados = useMemo(() => {
    const termo = semAcentoLower(busca.trim())
    return paroquias.filter(p => {
      if (termo && !semAcentoLower(`${p.nome} ${p.cidade}`).includes(termo)) return false
      return p.locais.some(l => l.arq_horarios_missa.length > 0)
    })
  }, [paroquias, busca])

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-10 flex flex-col gap-5">

      {/* Busca única */}
      <div className="bg-white border border-border rounded-xl px-5 py-3.5 flex items-center gap-3">
        <IconSearch size={20} className="text-muted-foreground flex-shrink-0" />
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Busque por cidade ou paróquia…"
          className="flex-1 bg-transparent outline-none text-[16px] placeholder:text-muted-foreground"
        />
      </div>

      {/* Filtros rápidos por dia */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[12px] text-muted-foreground">Filtrar por:</span>
        <button
          onClick={() => setFiltro("hoje")}
          className={cn(
            "text-[13px] font-semibold px-4 py-2 rounded-full transition-colors",
            filtro === "hoje" ? "bg-primary text-white" : "bg-white border border-border text-foreground hover:border-primary"
          )}
        >
          Hoje · {hoje.toLowerCase()}-feira
        </button>
        <button
          onClick={() => setFiltro("domingo")}
          className={cn(
            "text-[13px] font-medium px-4 py-2 rounded-full transition-colors",
            filtro === "domingo" ? "bg-primary text-white" : "bg-white border border-border text-foreground hover:border-primary"
          )}
        >
          Domingo
        </button>
        <button
          onClick={() => setFiltro("todos")}
          className={cn(
            "text-[13px] font-medium px-4 py-2 rounded-full transition-colors",
            filtro === "todos" ? "bg-primary text-white" : "bg-white border border-border text-foreground hover:border-primary"
          )}
        >
          Todos os dias
        </button>
      </div>

      {/* Resultados */}
      {resultados.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
          <IconBuildingChurch size={48} className="mb-3 opacity-20" />
          <p className="font-medium">Nenhuma paróquia encontrada.</p>
          <p className="text-[13px] mt-1">Tente buscar por outra cidade ou nome.</p>
        </div>
      ) : (
        <>
          <p className="text-[13px] text-muted-foreground">
            {resultados.length} paróquia{resultados.length !== 1 ? "s" : ""} encontrada{resultados.length !== 1 ? "s" : ""}
          </p>
          <div className="flex flex-col gap-4">
            {resultados.map(({ slug, nome, cidade, capa, locais }) => {
              const matriz = locais.find(l => l.tipos.includes("Matriz")) ?? locais[0]
              const horariosMatriz = matriz?.arq_horarios_missa ?? []
              const diaFiltro = filtro === "hoje" ? hoje : filtro === "domingo" ? "Domingo" : null
              const batemHoje = diaFiltro
                ? horariosMatriz.filter(h => filtro === "hoje" ? horarioBateHoje(h.dias) : h.dias.includes("Domingo"))
                : horariosMatriz

              return (
                <div key={slug} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_2px_12px_rgba(39,79,160,.08)] transition-all">
                  <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-3 border-b border-border">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {capa && (
                        <div className="relative w-[52px] h-[52px] rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={capa} alt={nome} fill className="object-cover" sizes="52px" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-serif font-bold text-[16px] leading-snug truncate">{nome}</h3>
                        <p className="flex items-center gap-1 text-[12px] text-muted-foreground mt-0.5">
                          <IconMapPin size={11} className="text-primary flex-shrink-0" /> {cidade}
                        </p>
                      </div>
                    </div>
                    <Link href={`/paroquias/${slug}`} className="text-[12px] text-primary font-medium flex items-center gap-1 hover:gap-1.5 transition-all whitespace-nowrap flex-shrink-0">
                      Ver paróquia <IconArrowRight size={12} />
                    </Link>
                  </div>

                  {filtro === "hoje" && (
                    batemHoje.length > 0 ? null : (
                      <div className="flex items-center gap-2 px-5 py-3 bg-muted/50 text-[13px] text-muted-foreground">
                        <IconClock size={14} />
                        Sem missa hoje ({hoje.toLowerCase()}-feira) na Matriz
                        {horariosMatriz.length > 0 && (
                          <>
                            {" — próxima: "}
                            <span className="font-semibold text-primary">{formatDias(horariosMatriz[0].dias)}, {horariosMatriz[0].horarios.join(", ")}</span>
                          </>
                        )}
                      </div>
                    )
                  )}

                  <div className="flex flex-wrap gap-2 px-5 py-4">
                    {horariosMatriz.map(h => {
                      const ativo = filtro === "todos" || batemHoje.some(b => b.id === h.id)
                      return (
                        <div
                          key={h.id}
                          className={cn(
                            "flex flex-col gap-0.5 rounded-lg px-3.5 py-2.5",
                            ativo ? "bg-primary" : "bg-muted"
                          )}
                        >
                          <span className={cn("text-[12px] font-semibold", ativo ? "text-white" : "text-foreground")}>{formatDias(h.dias)}</span>
                          <span className={cn("text-[12px]", ativo ? "text-white/85" : "text-muted-foreground")}>{h.horarios.join(", ")}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
