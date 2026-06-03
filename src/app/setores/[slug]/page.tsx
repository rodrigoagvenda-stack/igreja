import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import { IconMail, IconPhone, IconUsers, IconArrowLeft, IconBook2 } from "@tabler/icons-react"

export const metadata = { title: "Setor Pastoral" }

const setor = {
  nome: "Catequese",
  missao: "Formação e iniciação à fé cristã para crianças, jovens e adultos de toda a Arquidiocese.",
  descricao: [
    "O Setor de Catequese da Arquidiocese de Botucatu coordena e anima a ação catequética em todas as 50 paróquias, promovendo a formação integral dos catequizandos e a capacitação permanente dos catequistas.",
    "Através de encontros regionais, materiais didáticos atualizados e assessoria às paróquias, o setor busca oferecer uma catequese viva, enraizada na Palavra de Deus e nos sacramentos, que conduza os fiéis a um encontro pessoal e comunitário com Jesus Cristo.",
    "Em 2025, o setor lança o novo itinerário catequético arquidiocesano, elaborado a partir das diretrizes do Diretório Nacional de Catequese e adaptado à realidade local.",
  ],
  responsavel: "Coord. [Nome do Coordenador]",
  email: "catequese@arquidiocesebotucatu.org.br",
  telefone: "(14) 3111-0010",
  acoes: [
    "Formação inicial e permanente de catequistas",
    "Itinerário catequético para crianças (1.ª Eucaristia)",
    "Catequese de adultos e RICA",
    "Encontros regionais e diocesanos de catequistas",
    "Assessoria às paróquias na organização catequética",
  ],
}

export default function SetorSlugPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Setor Pastoral"
        title={setor.nome}
        subtitle={setor.missao}
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Setores", href: "/setores" },
          { label: setor.nome },
        ]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

          {/* Main */}
          <div className="space-y-8">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <IconBook2 size={32} />
            </div>

            {setor.descricao.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.75] text-muted-foreground">{p}</p>
            ))}

            <section>
              <h2 className="font-serif text-[20px] font-bold mb-4 pb-3 border-b border-border">Principais ações</h2>
              <ul className="space-y-2">
                {setor.acoes.map((acao, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {acao}
                  </li>
                ))}
              </ul>
            </section>

            <Link href="/setores" className="inline-flex items-center gap-2 text-[13px] text-primary font-medium hover:gap-3 transition-all">
              <IconArrowLeft size={14} /> Ver todos os setores
            </Link>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="bg-card border border-border rounded-lg p-5 space-y-4">
              <h3 className="font-serif text-[16px] font-bold pb-3 border-b border-border">Contato</h3>
              <div className="flex gap-3 text-[13px]">
                <IconUsers size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Responsável</p>
                  <p>{setor.responsavel}</p>
                </div>
              </div>
              <div className="flex gap-3 text-[13px]">
                <IconMail size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">E-mail</p>
                  <a href={`mailto:${setor.email}`} className="text-primary hover:underline break-all">{setor.email}</a>
                </div>
              </div>
              <div className="flex gap-3 text-[13px]">
                <IconPhone size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Telefone</p>
                  <p>{setor.telefone}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  )
}
