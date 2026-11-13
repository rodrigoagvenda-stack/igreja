import Link from "next/link"
import Image from "next/image"
import { IconMapPin, IconArrowRight, IconBuildingChurch } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"
import { getFotoCapa } from "@/lib/paroquia"
import type { FotoParoquia } from "@/types/database"

export async function ParoquiasDestaque() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_paroquias")
    .select("slug, nome, cidade, regiao_pastoral, fotos")
    .eq("ativa", true)
    .order("nome")
    .limit(3)

  const paroquias = (data ?? []) as { slug: string; nome: string; cidade: string; regiao_pastoral: string; fotos: FotoParoquia[] | null }[]

  return (
    <section className="py-16 md:py-20 bg-muted" aria-label="Paróquias em destaque">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">

        <div className="flex items-baseline gap-3.5 mb-7">
          <h2 className="font-serif text-[28px] md:text-[30px] font-bold">Comunidades da Arquidiocese</h2>
          <Link href="/paroquias" className="ml-auto text-[13px] text-primary font-semibold flex items-center gap-1 hover:gap-1.5 transition-all whitespace-nowrap">
            Ver as 50 paróquias <IconArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paroquias.map(({ slug, nome, cidade, regiao_pastoral, fotos }) => {
            const capa = getFotoCapa(fotos)
            return (
              <Link
                key={slug}
                href={`/paroquias/${slug}`}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_4px_16px_rgba(139,26,46,.12)] transition-all"
              >
                <div className="h-[120px] relative overflow-hidden bg-primary/5 flex items-center justify-center">
                  {capa ? (
                    <Image
                      src={capa}
                      alt={nome}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    />
                  ) : (
                    <>
                      <IconBuildingChurch size={40} className="text-primary/20 group-hover:text-primary/30 transition-colors" />
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                    </>
                  )}
                  <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-[.05em] px-2.5 py-1 rounded bg-[#0d1a30]/70 text-white backdrop-blur-sm">
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
