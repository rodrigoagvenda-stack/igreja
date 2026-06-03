"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { Badge } from "@/components/ui/badge"
import { IconCalendar, IconArrowRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

const categorias = ["Todas", "Pastoral", "Institucional", "Formação", "Litúrgico", "Social"]

const noticias = [
  { slug: "encontro-formacao-liderancas", categoria: "Pastoral",      titulo: "Dom [Arcebispo] preside encontro de formação para lideranças pastorais",       excerpt: "Evento reuniu coordenadores e agentes pastorais de todas as paróquias para reflexão e planejamento do ano missionário.", data: "28 mai 2025", leitura: "4 min" },
  { slug: "nomeacao-paroco-sao-jose",     categoria: "Institucional", titulo: "Nomeação de novo pároco para a Paróquia São José em Botucatu",                   excerpt: "Dom [Arcebispo] nomeia padre [Nome] como pároco da Paróquia São José, com posse prevista para o próximo domingo.", data: "25 mai 2025", leitura: "2 min" },
  { slug: "semana-catequese-2025",        categoria: "Formação",      titulo: "Semana de catequese reúne mais de 300 catequistas na Arquidiocese",              excerpt: "Formação acontece em todas as zonas pastorais ao longo de junho, com encontros regionais e material novo para 2025.", data: "22 mai 2025", leitura: "3 min" },
  { slug: "calendario-liturgico-2025",   categoria: "Litúrgico",     titulo: "Calendário litúrgico arquidiocesano para o segundo semestre é divulgado",        excerpt: "Documento orienta celebrações, festas e solenidades de todas as paróquias da Arquidiocese de julho a dezembro de 2025.", data: "18 mai 2025", leitura: "2 min" },
  { slug: "jubileu-ordinario-2025",      categoria: "Institucional", titulo: "Arquidiocese lança programação do Jubileu Ordinário 2025",                       excerpt: "Uma série de eventos e peregrinações marcará o Ano Jubilar em todas as regiões pastorais da Arquidiocese de Botucatu.", data: "15 mai 2025", leitura: "5 min" },
  { slug: "crisma-parroquias-2025",      categoria: "Pastoral",      titulo: "Mais de 800 jovens recebem o sacramento da Crisma neste semestre",               excerpt: "Cerimônias são celebradas nas diferentes zonas pastorais, fortalecendo a presença jovem nas comunidades da região.", data: "12 mai 2025", leitura: "3 min" },
  { slug: "caridade-campanha-inverno",   categoria: "Social",        titulo: "Campanha do Agasalho arrecada mais de 5 mil peças em Botucatu e região",         excerpt: "Iniciativa da Pastoral da Caridade mobilizou fiéis e comunidades de 18 paróquias durante o mês de maio.", data: "10 mai 2025", leitura: "3 min" },
  { slug: "ordenacao-diaconal-2025",     categoria: "Litúrgico",     titulo: "Ordenação Diaconal será presidida pelo Arcebispo na Catedral",                   excerpt: "Dois candidatos ao diaconato permanente serão ordenados no dia 1.º de junho, às 10h, na Catedral Nossa Senhora das Dores.", data: "08 mai 2025", leitura: "2 min" },
  { slug: "escola-evangelizacao",        categoria: "Formação",      titulo: "Escola de Evangelização da Arquidiocese abre novas turmas para 2025",            excerpt: "Formação gratuita para agentes pastorais, catequistas e leigos com interesse em aprofundar a fé e a missão evangelizadora.", data: "05 mai 2025", leitura: "4 min" },
]

const categoryColor: Record<string, string> = {
  Pastoral:      "bg-primary/10 text-primary",
  Institucional: "bg-accent/20 text-foreground",
  Formação:      "bg-green-100 text-green-700",
  Litúrgico:     "bg-purple-100 text-purple-700",
  Social:        "bg-orange-100 text-orange-700",
}

export default function NoticiasPage() {
  const [filtro, setFiltro] = useState("Todas")

  const filtradas = filtro === "Todas" ? noticias : noticias.filter(n => n.categoria === filtro)

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Acontece na Arquidiocese"
        title="Últimas notícias"
        subtitle="Acompanhe os comunicados, eventos e novidades da Arquidiocese de Botucatu e de suas paróquias."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Notícias" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map(cat => (
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtradas.map(({ slug, categoria, titulo, excerpt, data, leitura }) => (
            <Link
              key={slug}
              href={`/noticias/${slug}`}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_4px_20px_rgba(39,79,160,.10)] transition-all flex flex-col"
            >
              {/* Thumb */}
              <div className="h-[180px] relative overflow-hidden flex-shrink-0">
                <Image src={`https://picsum.photos/seed/${slug}/600/240`} alt={titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-2 left-3 text-[10px] font-semibold text-white/90 uppercase tracking-[.06em]">{categoria}</span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <span className={cn("inline-flex text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm mb-2 w-fit", categoryColor[categoria])}>
                  {categoria}
                </span>
                <h2 className="font-serif text-[16px] font-bold leading-[1.35] mb-2 group-hover:text-primary transition-colors flex-1">
                  {titulo}
                </h2>
                <p className="text-[13px] text-muted-foreground leading-[1.6] line-clamp-2 mb-3">
                  {excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                    <IconCalendar size={12} /> {data}
                  </span>
                  <span className="text-[12px] text-muted-foreground">{leitura} de leitura</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Paginação simples */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button
                key={p}
                className={cn(
                  "w-9 h-9 rounded-md text-[13px] font-medium transition-colors",
                  p === 1 ? "bg-primary text-white" : "bg-card border border-border hover:border-primary hover:text-primary"
                )}
              >
                {p}
              </button>
            ))}
            <button className="w-9 h-9 rounded-md border border-border text-muted-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              <IconArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
