import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import {
  IconMapPin, IconPhone, IconMail, IconClock,
  IconUser, IconBuildingChurch, IconArrowLeft, IconPhoto,
} from "@tabler/icons-react"

export const metadata = { title: "Paróquia" }

const paroquia = {
  nome: "Catedral Nossa Senhora das Dores",
  cidade: "Botucatu",
  endereco: "Rua Dom Lino Deodato Rodrigues de Carvalho, 200 — Centro, Botucatu/SP",
  telefone: "(14) 3882-0000",
  email: "catedral@arquidiocesebotucatu.org.br",
  paroco: "Pe. [Nome do Pároco]",
  descricao: "A Catedral Nossa Senhora das Dores é a sede da Arquidiocese de Botucatu, erguida em estilo neogótico no coração da cidade. É centro da vida litúrgica diocesana e palco das principais celebrações do calendário pastoral.",
  horarios: [
    { dia: "Domingo",       horarios: ["8h00", "10h00", "18h00"] },
    { dia: "Segunda",       horarios: ["7h00", "19h00"] },
    { dia: "Terça",         horarios: ["7h00", "19h00"] },
    { dia: "Quarta",        horarios: ["7h00", "19h00"] },
    { dia: "Quinta",        horarios: ["7h00", "19h00"] },
    { dia: "Sexta",         horarios: ["7h00", "18h00"] },
    { dia: "Sábado",        horarios: ["8h00", "18h00"] },
  ],
}

export default function ParoquiaSlugPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Paróquia"
        title={paroquia.nome}
        subtitle={paroquia.cidade}
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Paróquias", href: "/paroquias" },
          { label: paroquia.nome },
        ]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

          {/* Main */}
          <div className="space-y-8">
            {/* Hero image */}
            <div className="w-full h-[260px] bg-gradient-to-br from-muted to-border rounded-lg flex items-center justify-center">
              <IconBuildingChurch size={64} className="text-muted-foreground/20" aria-hidden="true" />
            </div>

            {/* Descrição */}
            <section>
              <h2 className="font-serif text-[20px] font-bold mb-3">Sobre a paróquia</h2>
              <p className="text-[15px] leading-[1.7] text-muted-foreground">{paroquia.descricao}</p>
            </section>

            {/* Horários */}
            <section>
              <h2 className="font-serif text-[20px] font-bold mb-4 pb-3 border-b border-border">
                Horários de missa
              </h2>
              <div className="bg-card border border-border rounded-lg overflow-hidden divide-y divide-border">
                {paroquia.horarios.map(({ dia, horarios }) => (
                  <div key={dia} className="flex items-center px-5 py-3.5 gap-4">
                    <span className="text-[13px] font-semibold w-20 flex-shrink-0">{dia}</span>
                    <div className="flex flex-wrap gap-2">
                      {horarios.map(h => (
                        <span key={h} className="flex items-center gap-1 text-[12px] bg-primary/10 text-primary px-2.5 py-1 rounded-md font-medium">
                          <IconClock size={11} /> {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Galeria placeholder */}
            <section>
              <h2 className="font-serif text-[20px] font-bold mb-4 pb-3 border-b border-border">Galeria</h2>
              <div className="grid grid-cols-3 gap-3">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <IconPhoto size={24} className="text-muted-foreground/30" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Info card */}
            <div className="bg-card border border-border rounded-lg p-5 space-y-4">
              <h3 className="font-serif text-[16px] font-bold pb-3 border-b border-border">Informações</h3>

              <div className="flex gap-3 text-[13px]">
                <IconUser size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Pároco</p>
                  <p>{paroquia.paroco}</p>
                </div>
              </div>

              <div className="flex gap-3 text-[13px]">
                <IconMapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Endereço</p>
                  <p className="leading-[1.5]">{paroquia.endereco}</p>
                </div>
              </div>

              <div className="flex gap-3 text-[13px]">
                <IconPhone size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Telefone</p>
                  <p>{paroquia.telefone}</p>
                </div>
              </div>

              <div className="flex gap-3 text-[13px]">
                <IconMail size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">E-mail</p>
                  <a href={`mailto:${paroquia.email}`} className="text-primary hover:underline break-all">{paroquia.email}</a>
                </div>
              </div>
            </div>

            {/* Mapa placeholder */}
            <div className="bg-muted rounded-lg h-[200px] flex items-center justify-center border border-border">
              <p className="text-[12px] text-muted-foreground">Mapa (Google Maps)</p>
            </div>

            <Link href="/paroquias" className="inline-flex items-center gap-2 text-[13px] text-primary font-medium hover:gap-3 transition-all">
              <IconArrowLeft size={14} /> Ver todas as paróquias
            </Link>
          </aside>
        </div>
      </div>
    </SiteLayout>
  )
}
