import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import {
  IconCalendar, IconUser, IconTag, IconBrandWhatsapp,
  IconBrandFacebook, IconLink, IconArrowLeft, IconPhoto,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"

export const metadata = { title: "Notícia" }

const artigo = {
  categoria: "Pastoral",
  titulo: "Dom [Arcebispo] preside encontro de formação para lideranças pastorais da Arquidiocese",
  data: "28 de maio de 2025",
  autor: "Assessoria de Comunicação",
  leitura: "4 min",
  excerpt: "Evento reuniu coordenadores e agentes pastorais de todas as paróquias para reflexão e planejamento do ano missionário.",
  conteudo: [
    "O encontro de formação para lideranças pastorais da Arquidiocese de Botucatu, realizado na última semana, reuniu mais de 120 participantes entre coordenadores de setores, agentes pastorais e representantes das 50 paróquias da região.",
    "Dom [Arcebispo], que presidiu a abertura solene, destacou a importância da formação contínua como pilar da missão evangelizadora. \"A Igreja que forma seus agentes é a Igreja que multiplica a semente do Evangelho em cada comunidade\", afirmou o Arcebispo durante a homilia de abertura.",
    "O programa incluiu grupos de trabalho por setor pastoral, partilha de experiências bem-sucedidas e elaboração participativa do planejamento pastoral para o segundo semestre de 2025. Os participantes também dedicaram tempo à oração comunitária e à lectio divina guiada.",
    "O encontro encerrou com uma celebração eucarística presidida pelo Arcebispo e a apresentação das propostas elaboradas pelos grupos, que serão sistematizadas e enviadas a todas as paróquias como subsídio pastoral.",
  ],
  relacionadas: [
    { slug: "semana-catequese-2025",   categoria: "Formação",  titulo: "Semana de catequese reúne mais de 300 catequistas", data: "22 mai 2025" },
    { slug: "escola-evangelizacao",    categoria: "Formação",  titulo: "Escola de Evangelização abre novas turmas para 2025", data: "05 mai 2025" },
    { slug: "crisma-parroquias-2025",  categoria: "Pastoral",  titulo: "Mais de 800 jovens recebem o sacramento da Crisma", data: "12 mai 2025" },
  ],
}

const categoryColor: Record<string, string> = {
  Pastoral: "bg-primary/10 text-primary",
  Formação: "bg-green-100 text-green-700",
}

export default function NoticiaSlugPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={artigo.categoria}
        title={artigo.titulo}
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Notícias", href: "/noticias" },
          { label: artigo.categoria, href: "/noticias" },
          { label: "Artigo" },
        ]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          {/* Main article */}
          <article>
            {/* Hero image */}
            <div className="w-full h-[280px] md:h-[360px] bg-gradient-to-br from-muted to-border rounded-lg flex items-center justify-center mb-6">
              <IconPhoto size={52} className="text-muted-foreground/25" aria-hidden="true" />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border text-[13px] text-muted-foreground">
              <span className={`inline-flex text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm ${categoryColor[artigo.categoria] ?? "bg-muted text-muted-foreground"}`}>
                {artigo.categoria}
              </span>
              <span className="flex items-center gap-1.5"><IconCalendar size={13} /> {artigo.data}</span>
              <span className="flex items-center gap-1.5"><IconUser size={13} /> {artigo.autor}</span>
              <span>{artigo.leitura} de leitura</span>
            </div>

            {/* Body */}
            <div className="prose max-w-none">
              {artigo.conteudo.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.75] text-foreground mb-5">
                  {p}
                </p>
              ))}
            </div>

            {/* Share */}
            <div className="mt-8 pt-6 border-t border-border flex items-center gap-3 flex-wrap">
              <span className="text-[13px] font-semibold text-muted-foreground">Compartilhar:</span>
              <a href="#" className="flex items-center gap-1.5 text-[13px] font-medium text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-md transition-colors">
                <IconBrandWhatsapp size={15} /> WhatsApp
              </a>
              <a href="#" className="flex items-center gap-1.5 text-[13px] font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors">
                <IconBrandFacebook size={15} /> Facebook
              </a>
              <button className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-border px-3 py-1.5 rounded-md transition-colors">
                <IconLink size={15} /> Copiar link
              </button>
            </div>

            {/* Back */}
            <Link href="/noticias" className="inline-flex items-center gap-2 text-[13px] text-primary font-medium mt-8 hover:gap-3 transition-all">
              <IconArrowLeft size={14} /> Voltar para notícias
            </Link>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div>
              <h3 className="font-serif text-[16px] font-bold mb-4 pb-3 border-b border-border">
                Mais notícias
              </h3>
              <div className="flex flex-col gap-4">
                {artigo.relacionadas.map(({ slug, categoria, titulo, data }) => (
                  <Link
                    key={slug}
                    href={`/noticias/${slug}`}
                    className="group flex gap-3 items-start"
                  >
                    <div className="w-14 h-14 rounded-md bg-muted flex-shrink-0 flex items-center justify-center">
                      <IconPhoto size={18} className="text-muted-foreground/40" aria-hidden="true" />
                    </div>
                    <div>
                      <span className={`inline-flex text-[9px] font-semibold uppercase tracking-[.06em] px-1.5 py-0.5 rounded-sm mb-1 ${categoryColor[categoria] ?? "bg-muted text-muted-foreground"}`}>
                        {categoria}
                      </span>
                      <p className="text-[13px] font-medium leading-[1.35] group-hover:text-primary transition-colors line-clamp-2">
                        {titulo}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{data}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  )
}
