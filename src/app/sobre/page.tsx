import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import { IconArrowRight, IconUser, IconBook, IconSitemap } from "@tabler/icons-react"

export const metadata = { title: "Sobre a Arquidiocese" }

const subpaginas = [
  { href: "/sobre/arcebispo", icon: <IconUser size={24} />,    titulo: "O Arcebispo",               descricao: "Conheça Dom [Nome], Arcebispo Metropolitano de Botucatu, sua trajetória e mensagem pastoral." },
  { href: "/sobre/historia",  icon: <IconBook size={24} />,    titulo: "História",                  descricao: "A história da Igreja Diocesana de Botucatu, desde sua criação até os dias atuais." },
  { href: "/sobre/estrutura", icon: <IconSitemap size={24} />, titulo: "Estrutura Administrativa",  descricao: "Conheça a organização da Cúria Metropolitana, departamentos e seus responsáveis." },
]

export default function SobrePage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Institucional"
        title="Sobre a Arquidiocese"
        subtitle="Conheça a história, a missão e a estrutura da Arquidiocese de Botucatu — a Igreja que serve o interior paulista há mais de um século."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Sobre" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        {/* Texto introdutório */}
        <div className="max-w-[720px] space-y-5 mb-12">
          <p className="text-[15px] leading-[1.75] text-muted-foreground">
            A Arquidiocese de Botucatu é uma circunscrição eclesiástica da Igreja Católica no Brasil, pertencente à Província Eclesiástica de Botucatu. Sua sede é a cidade de Botucatu, no interior do Estado de São Paulo.
          </p>
          <p className="text-[15px] leading-[1.75] text-muted-foreground">
            Abrange cerca de 20 municípios da região central do Estado, com 50 paróquias e dezenas de comunidades rurais. É servida por um corpo de sacerdotes diocesanos e religiosos, além de diáconos permanentes e grande quantidade de agentes leigos.
          </p>
          <p className="text-[15px] leading-[1.75] text-muted-foreground">
            A Arquidiocese tem como missão evangelizar, celebrar os sacramentos e promover a caridade — em fidelidade ao Evangelho de Jesus Cristo e em comunhão com o Bispo de Roma.
          </p>
        </div>

        {/* Cards de sub-páginas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {subpaginas.map(({ href, icon, titulo, descricao }) => (
            <Link
              key={href}
              href={href}
              className="group bg-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.10)] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {icon}
              </div>
              <div>
                <h2 className="font-serif text-[17px] font-bold mb-2 group-hover:text-primary transition-colors">{titulo}</h2>
                <p className="text-[13px] text-muted-foreground leading-[1.55]">{descricao}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[12px] text-primary font-semibold mt-auto group-hover:gap-2 transition-all">
                Saiba mais <IconArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>

        {/* Números */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { numero: "50+",   label: "Paróquias" },
            { numero: "20",    label: "Municípios" },
            { numero: "100+",  label: "Sacerdotes" },
            { numero: "1.200+",label: "Catequistas" },
          ].map(({ numero, label }) => (
            <div key={label} className="bg-primary rounded-lg p-5 text-center">
              <p className="font-serif text-[32px] font-bold text-white leading-none mb-1">{numero}</p>
              <p className="text-[12px] text-white/70 font-semibold uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
