"use client"

import { useState } from "react"
import Link from "next/link"
import { IconCalendar, IconArrowRight, IconNewspaper } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type Noticia = {
  id: string
  slug: string
  titulo: string
  resumo: string | null
  categoria: string
  imagem_url: string | null
  publicado_em: string | null
}

const categoryColor: Record<string, string> = {
  Pastoral:      "bg-primary/10 text-primary",
  Institucional: "bg-accent/20 text-foreground",
  Formação:      "bg-green-100 text-green-700",
  Litúrgico:     "bg-purple-100 text-purple-700",
  Social:        "bg-orange-100 text-orange-700",
  Geral:         "bg-muted text-muted-foreground",
}

export default function NoticiasClient({ noticias, categorias }: { noticias: Noticia[]; categorias: string[] }) {
  const [filtro, setFiltro] = useState("Todas")

  const filtradas = filtro === "Todas" ? noticias : noticias.filter(n => n.categoria === filtro)

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["Todas", ...categorias].map(cat => (
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

      {filtradas.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <IconNewspaper size={48} className="mx-auto mb-3 opacity-20" />
          <p className="font-medium">Nenhuma notícia publicada ainda.</p>
          <p className="text-[13px] mt-1">As notícias cadastradas no painel aparecem aqui.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtradas.map(({ id, slug, categoria, titulo, resumo, imagem_url, publicado_em }) => (
            <Link
              key={id}
              href={`/noticias/${slug}`}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_4px_20px_rgba(39,79,160,.10)] transition-all flex flex-col"
            >
              <div className="h-[180px] relative overflow-hidden flex-shrink-0 bg-muted">
                {imagem_url ? (
                  <img src={imagem_url} alt={titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <IconNewspaper size={40} className="text-muted-foreground/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-2 left-3 text-[10px] font-semibold text-white/90 uppercase tracking-[.06em]">{categoria}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className={cn("inline-flex text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm mb-2 w-fit", categoryColor[categoria] ?? categoryColor.Geral)}>
                  {categoria}
                </span>
                <h2 className="font-serif text-[16px] font-bold leading-[1.35] mb-2 group-hover:text-primary transition-colors flex-1">
                  {titulo}
                </h2>
                {resumo && (
                  <p className="text-[13px] text-muted-foreground leading-[1.6] line-clamp-2 mb-3">{resumo}</p>
                )}
                <div className="flex items-center justify-between mt-auto">
                  {publicado_em && (
                    <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                      <IconCalendar size={12} />
                      {new Date(publicado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[12px] text-primary font-medium ml-auto">
                    Ler mais <IconArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
