import Link from "next/link"
import Image from "next/image"
import { IconArrowRight, IconClock, IconBuildingChurch } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"

type Noticia = {
  id: string
  slug: string
  titulo: string
  resumo: string | null
  categoria: string
  publicado_em: string | null
  imagem_url: string | null
}

type Evento = {
  id: string
  titulo: string
  local: string | null
  categoria: string
  inicio: string
}

const catColor: Record<string, string> = {
  Litúrgico:     "bg-primary",
  Formação:      "bg-accent",
  Institucional: "bg-foreground/60",
  Pastoral:      "bg-green-600",
}

export async function NoticiasEAgenda() {
  const supabase = await createClient()
  const [{ data: noticiasData }, { data: eventosData }] = await Promise.all([
    supabase
      .from("arq_noticias")
      .select("id, slug, titulo, resumo, categoria, publicado_em, imagem_url")
      .eq("status", "publicado")
      .order("publicado_em", { ascending: false })
      .limit(1),
    supabase
      .from("arq_eventos")
      .select("id, titulo, local, categoria, inicio")
      .gte("inicio", new Date().toISOString())
      .order("inicio")
      .limit(3),
  ])

  const noticias = (noticiasData ?? []) as Noticia[]
  const eventos = (eventosData ?? []) as Evento[]
  const destaque = noticias[0]

  if (!destaque && eventos.length === 0) return null

  return (
    <section className="py-16 md:py-20" aria-label="Acontece na Arquidiocese">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="flex items-baseline gap-3.5 mb-7">
          <h2 className="font-serif text-[28px] md:text-[30px] font-bold">Acontece na Arquidiocese</h2>
          <Link href="/noticias" className="ml-auto text-[13px] text-primary font-semibold flex items-center gap-1 hover:gap-1.5 transition-all whitespace-nowrap">
            Ver todas as notícias <IconArrowRight size={14} />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-7">
          {destaque ? (
            <Link
              href={`/noticias/${destaque.slug}`}
              className="group relative block w-full lg:w-[640px] h-[300px] md:h-[360px] rounded-[14px] overflow-hidden flex-shrink-0"
            >
              {destaque.imagem_url ? (
                <Image src={destaque.imagem_url} alt={destaque.titulo} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-300" sizes="(max-width: 1024px) 100vw, 640px" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 to-primary/10" />
              )}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(13,26,48,.9) 0%, rgba(13,26,48,.1) 55%)" }}
              />
              <span className="absolute top-5 left-5 text-[11px] font-semibold uppercase tracking-[.05em] px-2.5 py-1 rounded bg-accent text-foreground">
                {destaque.categoria}
              </span>
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                <h3 className="font-serif text-[22px] md:text-[24px] font-bold text-white leading-[1.25]">{destaque.titulo}</h3>
                {destaque.publicado_em && (
                  <span className="text-[13px] text-white/65">
                    {new Date(destaque.publicado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                  </span>
                )}
              </div>
            </Link>
          ) : (
            <div className="w-full lg:w-[640px]" />
          )}

          {/* Agenda / horários de missa */}
          <div className="flex flex-col gap-3 flex-1 bg-muted rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-[17px]">Próximos eventos</span>
              <Link href="/agenda" className="text-[12px] font-semibold text-primary">Ver agenda</Link>
            </div>

            <div className="flex flex-col gap-0.5 bg-card rounded-lg overflow-hidden">
              {eventos.length > 0 ? eventos.map(({ id, titulo, categoria, inicio }) => {
                const d = new Date(inicio)
                const dia = d.toLocaleDateString("pt-BR", { day: "2-digit" })
                const mes = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")
                const cor = catColor[categoria] ?? "bg-muted-foreground"
                return (
                  <Link key={id} href="/agenda" className="flex items-center gap-3 px-4 py-3.5 border-b border-border last:border-b-0 hover:bg-primary/5 transition-colors group">
                    <div className={`w-[38px] h-[38px] ${cor} rounded-lg flex flex-col items-center justify-center flex-shrink-0`}>
                      <span className="text-[14px] font-bold text-white leading-none">{dia}</span>
                      <span className="text-[8px] text-white/80 uppercase tracking-wide font-semibold">{mes}</span>
                    </div>
                    <span className="text-[13px] font-semibold leading-[1.3] group-hover:text-primary transition-colors truncate">{titulo}</span>
                  </Link>
                )
              }) : (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
                  <IconBuildingChurch size={28} className="opacity-20" />
                  <p className="text-[13px]">Nenhum evento programado.</p>
                </div>
              )}
            </div>

            <Link
              href="/horarios-de-missa"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-[13px] font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors mt-0.5"
            >
              <IconClock size={14} />
              Buscar horário de missa
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
