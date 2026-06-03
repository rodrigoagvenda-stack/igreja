import Link from "next/link"
import { IconCalendar, IconArrowRight, IconPhoto } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"

const featured = {
  category: "Pastoral",
  title: "Dom [Arcebispo] preside encontro de formação para lideranças pastorais da Arquidiocese",
  excerpt: "Evento reuniu coordenadores e agentes pastorais de todas as paróquias para reflexão e planejamento do ano missionário.",
  date: "28 de maio de 2025",
  href: "/noticias/encontro-formacao",
}

const list = [
  { category: "Institucional", title: "Nomeação de novo pároco para a Paróquia São José em Botucatu",                    date: "25 mai 2025", href: "#" },
  { category: "Formação",      title: "Semana de catequese reúne mais de 300 catequistas na Diocese",                     date: "22 mai 2025", href: "#" },
  { category: "Litúrgico",    title: "Calendário litúrgico arquidiocesano para o segundo semestre é divulgado",           date: "18 mai 2025", href: "#" },
]

export function NewsSection() {
  return (
    <section className="py-16 md:py-20" aria-label="Últimas notícias">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">

        {/* Section header */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr] gap-7">

          {/* Featured */}
          <Link
            href={featured.href}
            className="group bg-card rounded-lg border border-border overflow-hidden hover:border-primary hover:shadow-[0_4px_20px_rgba(139,26,46,.1)] transition-all"
            aria-label={featured.title}
          >
            {/* Image placeholder */}
            <div className="h-[200px] md:h-[220px] bg-gradient-to-br from-muted to-border flex items-center justify-center relative">
              <IconPhoto size={40} className="text-muted-foreground/40" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-4 pb-3 pt-8">
                <span className="text-[11px] font-semibold text-white/90 uppercase tracking-[.06em]">
                  {featured.category}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              <Badge className="bg-primary/10 text-primary border-0 text-[11px] mb-2 hover:bg-primary/20">
                {featured.category}
              </Badge>
              <h3 className="font-serif text-[20px] font-bold leading-[1.3] mb-2 group-hover:text-primary transition-colors">
                {featured.title}
              </h3>
              <p className="text-[14px] text-muted-foreground leading-[1.6] line-clamp-2">
                {featured.excerpt}
              </p>
              <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground mt-3">
                <IconCalendar size={12} />
                {featured.date}
              </p>
            </div>
          </Link>

          {/* List */}
          <div className="flex flex-col gap-3">
            {list.map(({ category, title, date, href }) => (
              <Link
                key={href + title}
                href={href}
                className="group flex gap-4 items-start bg-card border border-border rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-all"
              >
                {/* Thumb placeholder */}
                <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                  <IconPhoto size={22} className="text-muted-foreground/40" aria-hidden="true" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-primary uppercase tracking-[.06em] mb-1">
                    {category}
                  </p>
                  <h3 className="text-[14px] font-semibold leading-[1.3] mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
                    <IconCalendar size={11} />
                    {date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
