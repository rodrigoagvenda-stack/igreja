import Link from "next/link"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { IconChevronRight } from "@tabler/icons-react"

export const metadata = { title: "Mapa do Site" }

const secoes = [
  {
    titulo: "Institucional",
    links: [
      { label: "Início",              href: "/" },
      { label: "Sobre a Arquidiocese", href: "/sobre" },
      { label: "O Arcebispo",          href: "/sobre/arcebispo" },
      { label: "Estrutura",            href: "/sobre/estrutura" },
      { label: "História",             href: "/sobre/historia" },
      { label: "Imprensa",             href: "/imprensa" },
    ],
  },
  {
    titulo: "Pastoral",
    links: [
      { label: "Paróquias",            href: "/paroquias" },
      { label: "Padres",               href: "/padres" },
      { label: "Diáconos",             href: "/diaconos" },
      { label: "Seminaristas",         href: "/seminaristas" },
      { label: "Setores pastorais",    href: "/setores" },
      { label: "Agenda pastoral",      href: "/agenda" },
      { label: "Horários de missa",    href: "/horarios-de-missa" },
    ],
  },
  {
    titulo: "Documentos",
    links: [
      { label: "Atos do governo",      href: "/documentos" },
      { label: "Política de privacidade", href: "/lgpd" },
    ],
  },
  {
    titulo: "Notícias",
    links: [
      { label: "Todas as notícias",    href: "/noticias" },
    ],
  },
  {
    titulo: "Contato",
    links: [
      { label: "Fale conosco",         href: "/contato" },
    ],
  },
]

export default function MapaDoSitePage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Navegação"
        title="Mapa do Site"
        subtitle="Todas as seções e páginas do portal da Arquidiocese de Botucatu."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Mapa do Site" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {secoes.map(({ titulo, links }) => (
            <div key={titulo}>
              <h2 className="font-serif text-[17px] font-bold mb-3 pb-2 border-b border-border">{titulo}</h2>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center gap-1.5 text-[14px] text-foreground hover:text-primary transition-colors">
                      <IconChevronRight size={12} className="text-primary flex-shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
