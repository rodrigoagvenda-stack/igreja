import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import { IconMail, IconPhone } from "@tabler/icons-react"

export const metadata = { title: "Estrutura Administrativa" }

const departamentos = [
  { nome: "Secretaria Geral",           responsavel: "[Nome]", email: "secretaria@arquidiocesebotucatu.org.br",   telefone: "(14) 3111-0001" },
  { nome: "Econômato Diocesano",        responsavel: "[Nome]", email: "economato@arquidiocesebotucatu.org.br",   telefone: "(14) 3111-0002" },
  { nome: "Chancelaria",                responsavel: "[Nome]", email: "chancelaria@arquidiocesebotucatu.org.br", telefone: "(14) 3111-0003" },
  { nome: "Tribunal Eclesiástico",      responsavel: "[Nome]", email: "tribunal@arquidiocesebotucatu.org.br",    telefone: "(14) 3111-0004" },
  { nome: "Comunicação (PASCOM)",       responsavel: "[Nome]", email: "pascom@arquidiocesebotucatu.org.br",      telefone: "(14) 3111-0005" },
  { nome: "Pastoral da Educação",       responsavel: "[Nome]", email: "educacao@arquidiocesebotucatu.org.br",    telefone: "(14) 3111-0006" },
  { nome: "Pastoral da Saúde",          responsavel: "[Nome]", email: "saude@arquidiocesebotucatu.org.br",       telefone: "(14) 3111-0007" },
  { nome: "Pastoral Carcerária",        responsavel: "[Nome]", email: "carceraria@arquidiocesebotucatu.org.br",  telefone: "(14) 3111-0008" },
]

export default function EstruturaPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Sobre a Arquidiocese"
        title="Estrutura Administrativa"
        subtitle="Conheça a Cúria Metropolitana e os departamentos que coordenam a vida pastoral e administrativa da Arquidiocese."
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Sobre", href: "/sobre" },
          { label: "Estrutura" },
        ]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        {/* Cabeçalho — Arcebispo */}
        <div className="bg-primary rounded-xl p-6 mb-8 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-serif font-bold text-xl">A</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-accent uppercase tracking-widest mb-0.5">Arcebispo Metropolitano</p>
            <p className="text-white font-serif text-[20px] font-bold">Dom [Nome do Arcebispo]</p>
          </div>
        </div>

        {/* Grid de departamentos */}
        <h2 className="font-serif text-[20px] font-bold mb-5 pb-3 border-b border-border">Cúria Metropolitana</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departamentos.map(({ nome, responsavel, email, telefone }) => (
            <div key={nome} className="bg-card border border-border rounded-lg p-5 hover:border-primary transition-colors">
              <h3 className="font-semibold text-[15px] mb-1">{nome}</h3>
              <p className="text-[12px] text-muted-foreground mb-3">Responsável: {responsavel}</p>
              <div className="space-y-1">
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-[12px] text-primary hover:underline">
                  <IconMail size={12} /> {email}
                </a>
                <p className="flex items-center gap-2 text-[12px] text-muted-foreground">
                  <IconPhone size={12} className="text-primary" /> {telefone}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/sobre" className="inline-flex items-center gap-1 text-[13px] text-primary font-medium mt-10 hover:gap-2 transition-all">
          ← Voltar para Sobre
        </Link>
      </div>
    </SiteLayout>
  )
}
