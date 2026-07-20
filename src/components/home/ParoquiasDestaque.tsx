import Link from "next/link"
import { IconMapPin, IconArrowRight, IconBuildingChurch } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"

export async function ParoquiasDestaque() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_paroquias")
    .select("slug, nome, cidade, regiao_pastoral")
    .eq("ativa", true)
    .order("nome")
    .limit(3)

  const paroquias = (data ?? []) as { slug: string; nome: string; cidade: string; regiao_pastoral: string }[]

  return (
    <section className="py-16 md:py-20 bg-muted" aria-label="Paróquias em destaque">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">

        <div className="flex items-end justify-between mb-7 pb-4 border-b border-border">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
              <span className="block w-4 h-0.5 bg-primary" aria-hidden="true" />
              Comunidades
            </p>
            <h2 className="font-serif text-2xl font-bold">Paróquias em destaque</h2>
          </div>
          <Link href="/paroquias" className="text-[13px] text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Ver todas <IconArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paroquias.map(({ slug, nome, cidade, regiao_pastoral }) => (
            <Link
              key={slug}
              href={`/paroquias/${slug}`}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_4px_16px_rgba(139,26,46,.12)] transition-all"
            >
              <div className="h-[120px] relative overflow-hidden bg-primary/5 flex items-center justify-center">
                <IconBuildingChurch size={40} className="text-primary/20 group-hover:text-primary/30 transition-colors" />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                <span className="absolute top-2 right-2 text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded bg-primary/10 text-primary">
                  {regiao_pastoral.split(" ")[0]}
                </span>
              </div>

              <div className="px-4 py-3">
                <h3 className="font-serif text-[14px] font-bold leading-[1.3] mb-1 group-hover:text-primary transition-colors">
                  {nome}
                </h3>
                <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
                  <IconMapPin size={12} className="text-primary flex-shrink-0" />
                  {cidade}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
