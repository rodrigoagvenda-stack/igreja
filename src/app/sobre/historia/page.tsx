import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"

export const metadata = { title: "História da Arquidiocese" }

const timeline = [
  { ano: "1908", titulo: "Criação da Diocese", descricao: "A Diocese de Botucatu foi criada pelo Papa Pio X através da Bula papal, desmembrada da Diocese de São Paulo. D. Eusébio de Sousa torna-se o primeiro bispo." },
  { ano: "1952", titulo: "Elevação a Arquidiocese", descricao: "A Diocese de Botucatu é elevada à Arquidiocese pelo Papa Pio XII, tornando-se sede de Província Eclesiástica e ampliando sua jurisdição na região." },
  { ano: "1970s", titulo: "Expansão Pastoral", descricao: "Criação de novas paróquias em consonância com o crescimento populacional da região. Realização dos primeiros sínodos diocesanos e planejamento pastoral sistemático." },
  { ano: "2000s", titulo: "Missão no Século XXI", descricao: "Implementação de novas pastorais, incremento da formação do laicato e início do processo de digitalização dos serviços pastorais e administrativos." },
  { ano: "2025", titulo: "Jubileu e Renovação", descricao: "Celebração do Jubileu Ordinário com eventos em toda a Arquidiocese, marcando um momento de renovação espiritual e missionária das comunidades diocesanas." },
]

export default function HistoriaPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Sobre a Arquidiocese"
        title="Nossa História"
        subtitle="Da criação da Diocese à Arquidiocese Metropolitana — mais de um século de evangelização no coração de São Paulo."
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Sobre", href: "/sobre" },
          { label: "História" },
        ]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="max-w-[720px] space-y-5 mb-12">
          <p className="text-[15px] leading-[1.75] text-muted-foreground">
            A história da Igreja Diocesana de Botucatu é a história de uma comunidade de fé que cresceu junto com a região, evangelizando e servindo ao povo que construiu o interior paulista.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[52px] top-0 bottom-0 w-px bg-border hidden md:block" aria-hidden="true" />

          <div className="space-y-8">
            {timeline.map(({ ano, titulo, descricao }) => (
              <div key={ano} className="flex gap-6">
                {/* Ano */}
                <div className="flex flex-col items-center flex-shrink-0 w-[104px]">
                  <div className="w-[104px] bg-primary text-white text-center py-2 rounded-lg font-bold text-[14px] relative z-10">
                    {ano}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="bg-card border border-border rounded-lg p-5 flex-1 hover:border-primary transition-colors">
                  <h3 className="font-serif text-[17px] font-bold mb-2">{titulo}</h3>
                  <p className="text-[14px] text-muted-foreground leading-[1.6]">{descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link href="/sobre" className="inline-flex items-center gap-1 text-[13px] text-primary font-medium mt-10 hover:gap-2 transition-all">
          ← Voltar para Sobre
        </Link>
      </div>
    </SiteLayout>
  )
}
