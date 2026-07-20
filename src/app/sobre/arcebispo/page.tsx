import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Image from "next/image"
import Link from "next/link"

export const metadata = { title: "Dom Maurício Grotto de Camargo — Arcebispo" }

const bio = [
  "Dom Maurício Grotto de Camargo nasceu em 26 de setembro de 1957. Ordenado sacerdote em 11 de abril de 1981, recebeu a ordenação episcopal em 30 de julho de 2000, tendo sido nomeado Bispo pelo Papa João Paulo II.",
  "Foi nomeado Arcebispo Metropolitano de Botucatu pelo Papa Bento XVI em 19 de novembro de 2008, tomando posse canônica da Arquidiocese em 15 de fevereiro de 2009. É o 8.º Bispo e 5.º Arcebispo da Diocese, elevada à dignidade de Arquidiocese em 19 de abril de 1958.",
  "Sob sua liderança, a Arquidiocese de Sant'Ana de Botucatu avança em iniciativas de evangelização, formação do laicato e serviço às comunidades das 47 paróquias distribuídas em quatro Regiões Pastorais.",
]

export default function ArcebispoPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Sobre a Arquidiocese"
        title="O Arcebispo"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Sobre", href: "/sobre" },
          { label: "O Arcebispo" },
        ]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

          {/* Foto + info */}
          <div className="space-y-4">
            <div className="w-full aspect-[3/4] max-w-[260px] mx-auto lg:mx-0 rounded-xl overflow-hidden relative border border-border">
              <Image
                src="https://picsum.photos/seed/arcebispo-mauricio/280/380"
                alt="Dom Maurício Grotto de Camargo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="bg-card border border-border rounded-lg p-4 space-y-2 text-[13px]">
              <p className="font-serif font-bold text-[16px]">Dom Maurício Grotto de Camargo</p>
              <p className="text-muted-foreground">Arcebispo Metropolitano de Botucatu</p>
              <p className="text-muted-foreground text-[12px]">8.º Bispo — 5.º Arcebispo</p>
              <p className="text-muted-foreground text-[12px]">Nascimento: 26/09/1957</p>
              <p className="text-muted-foreground text-[12px]">Ordenação sacerdotal: 11/04/1981</p>
              <p className="text-muted-foreground text-[12px]">Ordenação episcopal: 30/07/2000</p>
              <p className="text-muted-foreground text-[12px]">Nomeado: 19/11/2008</p>
              <p className="text-muted-foreground text-[12px]">Posse: 15/02/2009</p>
            </div>
          </div>

          {/* Biografia */}
          <div className="space-y-6">
            <h2 className="font-serif text-[22px] font-bold pb-3 border-b border-border">Biografia</h2>

            {bio.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.75] text-muted-foreground">{p}</p>
            ))}

            {/* Lema */}
            <blockquote className="border-l-4 border-accent pl-5 py-2 my-6">
              <p className="font-serif text-[18px] italic text-foreground leading-[1.6]">
                "Sereis minhas testemunhas"
              </p>
              <footer className="text-[13px] text-muted-foreground mt-2 font-semibold">
                — At 1,8 · Lema episcopal de Dom Maurício Grotto de Camargo
              </footer>
            </blockquote>

            {/* Histórico da Diocese */}
            <div className="bg-card border border-border rounded-lg p-5 space-y-2">
              <h3 className="font-serif text-[16px] font-bold mb-3">A Arquidiocese</h3>
              <p className="text-[13px] text-muted-foreground leading-[1.6]">
                A Diocese de Botucatu foi criada em 7 de junho de 1908 pela Bula <em>Diocesium nimiam amplitudinem</em>
                do Papa Pio X. Em 19 de abril de 1958 foi elevada à dignidade de Arquidiocese Metropolitana.
                Hoje abrange <strong>47 paróquias</strong> em <strong>4 Regiões Pastorais</strong>.
              </p>
            </div>

            <Link href="/sobre" className="inline-flex items-center gap-1 text-[13px] text-primary font-medium hover:gap-2 transition-all">
              ← Voltar para Sobre
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
