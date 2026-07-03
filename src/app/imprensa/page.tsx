import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import {
  IconNews, IconDownload, IconMail, IconPhone,
  IconPhoto, IconFileText, IconArrowRight,
} from "@tabler/icons-react"

export const metadata = {
  title: "Imprensa",
  description: "Assessoria de imprensa da Arquidiocese de Botucatu — releases, fotos e contato para jornalistas.",
}

const releases = [
  {
    titulo: "Dom Maurício Grotto de Camargo preside ordenação presbiteral na Catedral",
    data: "02 jun 2025",
    href: "/noticias/ordenacao-presbiteral-2025",
  },
  {
    titulo: "Arquidiocese de Botucatu lança portal institucional renovado",
    data: "20 mai 2025",
    href: "/noticias/novo-portal",
  },
  {
    titulo: "Assembleia arquidiocesana reúne mais de 200 agentes pastorais",
    data: "15 mai 2025",
    href: "/noticias/assembleia-pastoral-2025",
  },
  {
    titulo: "Semana Nacional de Catequese: programação especial na Arquidiocese",
    data: "05 mai 2025",
    href: "/noticias/semana-catequese-2025",
  },
]

const materiais = [
  { titulo: "Logotipo da Arquidiocese (PNG/SVG)", icon: IconPhoto,    href: "#" },
  { titulo: "Foto oficial — Dom Maurício Grotto", icon: IconPhoto,    href: "#" },
  { titulo: "Ficha institucional da Arquidiocese", icon: IconFileText, href: "#" },
  { titulo: "Calendário pastoral 2026 (PDF)",      icon: IconDownload, href: "#" },
]

export default function ImprensaPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Comunicação institucional"
        title="Imprensa"
        subtitle="Releases, materiais e contato para jornalistas e veículos de comunicação."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Imprensa" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          {/* Main */}
          <div className="space-y-10">

            {/* Últimos releases */}
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                <span className="block w-4 h-0.5 bg-primary shrink-0" aria-hidden="true" />
                Releases
              </p>
              <div className="flex items-end justify-between border-b border-border pb-4 mb-5">
                <h2 className="font-serif text-[22px] font-bold">Últimos comunicados</h2>
                <Link href="/noticias" className="text-[12px] text-primary font-medium flex items-center gap-1 hover:gap-1.5 transition-all">
                  Ver todas as notícias <IconArrowRight size={12} />
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {releases.map(({ titulo, data, href }) => (
                  <Link
                    key={titulo}
                    href={href}
                    className="group bg-card ring-1 ring-foreground/10 rounded-xl px-5 py-4 flex items-center gap-4 hover:ring-primary hover:shadow-sm transition-all"
                  >
                    <div className="w-9 h-9 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <IconNews size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium leading-[1.4] group-hover:text-primary transition-colors truncate">
                        {titulo}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{data}</p>
                    </div>
                    <IconArrowRight size={14} className="text-muted-foreground shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Materiais */}
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                <span className="block w-4 h-0.5 bg-primary shrink-0" aria-hidden="true" />
                Kit de imprensa
              </p>
              <h2 className="font-serif text-[22px] font-bold mb-5">Materiais disponíveis</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {materiais.map(({ titulo, icon: Icon, href }) => (
                  <Link
                    key={titulo}
                    href={href}
                    className="group flex items-center gap-3 bg-card ring-1 ring-foreground/10 rounded-xl px-4 py-3.5 hover:ring-primary hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon size={15} />
                    </div>
                    <span className="text-[13px] font-medium group-hover:text-primary transition-colors flex-1">
                      {titulo}
                    </span>
                    <IconDownload size={13} className="text-muted-foreground shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Contato imprensa */}
            <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-5 space-y-4">
              <h3 className="font-serif text-[15px] font-bold pb-3 border-b border-border">
                Contato para imprensa
              </h3>
              <p className="text-[13px] text-muted-foreground leading-[1.5]">
                Para entrevistas, declarações e solicitações de pauta, entre em contato com a Assessoria de Comunicação.
              </p>
              <div className="space-y-2.5">
                <div className="flex gap-3 text-[13px]">
                  <IconMail size={15} className="text-primary shrink-0 mt-0.5" />
                  <a href="mailto:secretaria@arquidiocesebotucatu.org.br" className="text-primary hover:underline break-all">
                    secretaria@arquidiocesebotucatu.org.br
                  </a>
                </div>
                <div className="flex gap-3 text-[13px]">
                  <IconPhone size={15} className="text-primary shrink-0 mt-0.5" />
                  <span>(14) 3811-5900</span>
                </div>
              </div>
              <Link
                href="/contato"
                className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors w-full justify-center"
              >
                <IconMail size={13} />
                Enviar solicitação
              </Link>
            </div>

            {/* Sobre a Arquidiocese */}
            <div className="bg-muted/60 border border-border rounded-xl p-5">
              <h3 className="font-serif text-[14px] font-bold mb-2">Sobre a Arquidiocese</h3>
              <p className="text-[12px] text-muted-foreground leading-[1.6] mb-3">
                Erigida em 07 de junho de 1908 e elevada a Arquidiocese em 19 de abril de 1958. Atualmente sob o pastoreio de Dom Maurício Grotto de Camargo, 5.º Arcebispo.
              </p>
              <Link
                href="/sobre"
                className="text-[12px] text-primary font-medium flex items-center gap-1 hover:gap-1.5 transition-all"
              >
                Saiba mais <IconArrowRight size={11} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  )
}
