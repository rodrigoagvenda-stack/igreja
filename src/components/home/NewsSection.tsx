import Link from "next/link"
import { IconCalendar, IconArrowRight, IconNews } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"

type Noticia = {
  id: string
  slug: string
  titulo: string
  resumo: string | null
  categoria: string
  publicado_em: string | null
}

const catColor: Record<string, string> = {
  Pastoral:      "bg-primary/10 text-primary",
  Institucional: "bg-accent/20 text-foreground",
  Formação:      "bg-green-100 text-green-700",
  Litúrgico:     "bg-purple-100 text-purple-700",
  Social:        "bg-orange-100 text-orange-700",
  Geral:         "bg-muted text-muted-foreground",
}

export async function NewsSection() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_noticias")
    .select("id, slug, titulo, resumo, categoria, publicado_em")
    .eq("status", "publicado")
    .order("publicado_em", { ascending: false })
    .limit(4)

  const noticias = (data ?? []) as Noticia[]
  if (noticias.length === 0) return null

  const [destaque, ...lista] = noticias

  return (
    <section className="py-16 md:py-20" aria-label="Últimas notícias">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-7 pb-4 border-b border-border">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
              <span className="block w-4 h-0.5 bg-primary" aria-hidden="true" />
              Acontece na Arquidiocese
            </p>
            <h2 className="font-serif text-2xl font-bold">Últimas notícias</h2>
          </div>
          <Link href="/noticias" className="text-[13px] text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Ver todas <IconArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr] gap-7">
          {/* Destaque */}
          <Link
            href={`/noticias/${destaque.slug}`}
            className="group bg-card rounded-lg border border-border overflow-hidden hover:border-primary hover:shadow-[0_4px_20px_rgba(139,26,46,.1)] transition-all"
          >
            <div className="h-[200px] md:h-[220px] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <IconNews size={48} className="text-primary/20" />
            </div>
            <div className="p-5">
              <span className={`inline-flex text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm mb-2 ${catColor[destaque.categoria] ?? catColor.Geral}`}>
                {destaque.categoria}
              </span>
              <h3 className="font-serif text-[20px] font-bold leading-[1.3] mb-2 group-hover:text-primary transition-colors">
                {destaque.titulo}
              </h3>
              {destaque.resumo && (
                <p className="text-[14px] text-muted-foreground leading-[1.6] line-clamp-2">{destaque.resumo}</p>
              )}
              {destaque.publicado_em && (
                <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground mt-3">
                  <IconCalendar size={12} />
                  {new Date(destaque.publicado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                </p>
              )}
            </div>
          </Link>

          {/* Lista */}
          <div className="flex flex-col gap-3">
            {lista.map(n => (
              <Link
                key={n.id}
                href={`/noticias/${n.slug}`}
                className="group flex gap-4 items-start bg-card border border-border rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="w-14 h-14 rounded-md flex-shrink-0 bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                  <IconNews size={22} className="text-primary/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-primary uppercase tracking-[.06em] mb-1">{n.categoria}</p>
                  <h3 className="text-[14px] font-semibold leading-[1.3] mb-1.5 group-hover:text-primary transition-colors line-clamp-2">{n.titulo}</h3>
                  {n.publicado_em && (
                    <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
                      <IconCalendar size={11} />
                      {new Date(n.publicado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
