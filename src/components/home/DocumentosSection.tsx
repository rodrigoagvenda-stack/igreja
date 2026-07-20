import Link from "next/link"
import { IconArrowRight, IconFileText, IconChevronRight } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"

type Documento = { id: string; slug: string; titulo: string; tipo: string; publicado_em: string }

const tipoColor: Record<string, string> = {
  Decreto:    "bg-primary/10 text-primary",
  Comunicado: "bg-accent/20 text-foreground",
  Nomeação:   "bg-green-100 text-green-700",
  Circular:   "bg-muted text-muted-foreground",
}

export async function DocumentosSection() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_documentos")
    .select("id, slug, titulo, tipo, publicado_em")
    .order("publicado_em", { ascending: false })
    .limit(4)

  const docs = (data ?? []) as Documento[]
  if (docs.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-muted" aria-label="Atos do governo — documentos recentes">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
              <span className="block w-4 h-0.5 bg-primary" aria-hidden="true" />
              Governo eclesiástico
            </p>
            <h2 className="font-serif text-2xl font-bold">Atos e documentos oficiais</h2>
          </div>
          <Link href="/documentos" className="text-[13px] text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Ver todos <IconArrowRight size={14} />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {docs.map(({ id, slug, titulo, tipo, publicado_em }) => (
            <Link
              key={id}
              href={`/documentos/${slug}`}
              className="group bg-card border border-border rounded-lg px-5 py-4 flex items-center gap-4 hover:border-primary hover:shadow-[0_2px_12px_rgba(39,79,160,.08)] transition-all"
            >
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <IconFileText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm ${tipoColor[tipo] ?? "bg-muted text-muted-foreground"}`}>
                    {tipo}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(publicado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                </div>
                <p className="text-[14px] font-medium leading-[1.4] truncate group-hover:text-primary transition-colors">{titulo}</p>
              </div>
              <IconChevronRight size={16} className="text-muted-foreground flex-shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
