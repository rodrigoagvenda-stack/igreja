import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import {
  IconBook, IconExternalLink, IconCalendar, IconCross,
} from "@tabler/icons-react"

export const metadata = {
  title: "Liturgia do Dia",
  description: "Leituras e orações da liturgia diária da Igreja Católica.",
}

const recursos = [
  {
    titulo: "Liturgia Diária — CNBB",
    descricao: "Leituras, salmo responsorial e evangelho do dia conforme o Lecionário da CNBB.",
    href: "https://liturgiadiaria.site",
    externo: true,
  },
  {
    titulo: "Liturgia das Horas",
    descricao: "Laudes, Vésperas e demais horas do Ofício Divino para o dia de hoje.",
    href: "https://www.liturgiadashoras.com.br",
    externo: true,
  },
  {
    titulo: "Calendário Litúrgico 2026",
    descricao: "Calendário completo do Ano Litúrgico com solenidades, festas e memórias.",
    href: "/documentos?tipo=calendario",
    externo: false,
  },
  {
    titulo: "Horários de Missa",
    descricao: "Consulte os horários de missa nas paróquias e capelas da Arquidiocese.",
    href: "/horarios-de-missa",
    externo: false,
  },
]

const tempos = [
  { nome: "Advento",     cor: "bg-violet-100 border-violet-300", texto: "text-violet-700", desc: "Tempo de espera e preparação para o Natal. Cor litúrgica: roxo." },
  { nome: "Natal",       cor: "bg-amber-50 border-amber-200",    texto: "text-amber-700",  desc: "Celebração do nascimento de Jesus. Cor litúrgica: branco/dourado." },
  { nome: "Quaresma",    cor: "bg-violet-100 border-violet-300", texto: "text-violet-700", desc: "Tempo de conversão e penitência. Cor litúrgica: roxo." },
  { nome: "Páscoa",      cor: "bg-amber-50 border-amber-200",    texto: "text-amber-700",  desc: "O maior tempo do ano litúrgico — 50 dias. Cor litúrgica: branco." },
  { nome: "Tempo Comum", cor: "bg-green-50 border-green-200",    texto: "text-green-700",  desc: "Aprofundamento da vida cristã ao longo do ano. Cor litúrgica: verde." },
]

export default function LiturgiaPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Oração e vida"
        title="Liturgia do Dia"
        subtitle="Mergulhe na Palavra de Deus e na oração da Igreja para cada dia."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Liturgia do Dia" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          {/* Main */}
          <div className="space-y-10">

            {/* Recursos */}
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                <span className="block w-4 h-0.5 bg-primary shrink-0" aria-hidden="true" />
                Recursos litúrgicos
              </p>
              <h2 className="font-serif text-[22px] font-bold mb-5">Leituras e orações do dia</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recursos.map(({ titulo, descricao, href, externo }) => (
                  <Link
                    key={titulo}
                    href={href}
                    target={externo ? "_blank" : undefined}
                    rel={externo ? "noopener noreferrer" : undefined}
                    className="group bg-card ring-1 ring-foreground/10 rounded-xl p-5 hover:ring-primary hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <IconBook size={15} />
                      </div>
                      {externo && <IconExternalLink size={13} className="text-muted-foreground mt-1 shrink-0" />}
                    </div>
                    <h3 className="font-serif text-[15px] font-bold mb-1.5 group-hover:text-primary transition-colors">
                      {titulo}
                    </h3>
                    <p className="text-[13px] text-muted-foreground leading-[1.5]">{descricao}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tempos litúrgicos */}
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                <span className="block w-4 h-0.5 bg-primary shrink-0" aria-hidden="true" />
                Ano litúrgico
              </p>
              <h2 className="font-serif text-[22px] font-bold mb-5">Tempos litúrgicos</h2>

              <div className="flex flex-col gap-3">
                {tempos.map(({ nome, cor, texto, desc }) => (
                  <div key={nome} className={`flex items-start gap-4 border rounded-lg px-5 py-4 ${cor}`}>
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${texto.replace("text-", "bg-")}`} />
                    <div>
                      <p className={`text-[13px] font-bold ${texto}`}>{nome}</p>
                      <p className="text-[12px] text-foreground/70 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <IconCross size={18} />
              </div>
              <h3 className="font-serif text-[16px] font-bold mb-2">O que é a Liturgia?</h3>
              <p className="text-[13px] text-muted-foreground leading-[1.6]">
                A liturgia é a oração pública da Igreja. Por meio dela, Cristo continua a obra da redenção por meio de seu Corpo Místico, exercendo o sacerdócio em favor da glória de Deus e da santificação dos homens.
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <IconCalendar size={16} className="text-primary" />
                <h3 className="font-semibold text-[14px]">Agenda litúrgica</h3>
              </div>
              <p className="text-[13px] text-muted-foreground leading-[1.5] mb-4">
                Consulte o calendário pastoral completo da Arquidiocese de Botucatu para 2026.
              </p>
              <Link
                href="/agenda"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline"
              >
                Ver agenda pastoral
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  )
}
