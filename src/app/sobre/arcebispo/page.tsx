import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Image from "next/image"
import Link from "next/link"

export const metadata = { title: "O Arcebispo" }

const bio = [
  "Dom [Nome completo do Arcebispo] nasceu em [cidade], Estado de [estado], em [data de nascimento]. Ordenado sacerdote em [ano], serviu como [cargos anteriores] antes de ser ordenado bispo.",
  "Foi nomeado Arcebispo Metropolitano de Botucatu pelo Papa [Nome] em [data], tomando posse canônica da Diocese em [data da posse]. Sob sua liderança, a Arquidiocese tem avançado em iniciativas de evangelização, formação do laicato e serviço à comunidade.",
  "Dom [Nome] é reconhecido por seu compromisso com a pastoral social, a evangelização missionária e o diálogo com as comunidades locais. Preside regularmente as celebrações diocesanas e está presente nas diferentes zonas pastorais da Arquidiocese.",
]

const citacao = "A missão da Igreja é ir ao encontro de cada pessoa, onde ela está, com a misericórdia e a verdade do Evangelho."

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
              <Image src="https://picsum.photos/seed/arcebispo-retrato/280/380" alt="Dom [Arcebispo]" fill className="object-cover" priority />
            </div>
            <div className="bg-card border border-border rounded-lg p-4 space-y-2 text-[13px]">
              <p className="font-serif font-bold text-[16px]">Dom [Nome do Arcebispo]</p>
              <p className="text-muted-foreground">Arcebispo Metropolitano de Botucatu</p>
              <p className="text-muted-foreground text-[12px]">Nomeado em: [data]</p>
              <p className="text-muted-foreground text-[12px]">Posse: [data]</p>
            </div>
          </div>

          {/* Biografia */}
          <div className="space-y-6">
            <h2 className="font-serif text-[22px] font-bold pb-3 border-b border-border">Biografia</h2>

            {bio.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.75] text-muted-foreground">{p}</p>
            ))}

            {/* Citação */}
            <blockquote className="border-l-4 border-accent pl-5 py-2 my-6">
              <p className="font-serif text-[18px] italic text-foreground leading-[1.6]">"{citacao}"</p>
              <footer className="text-[13px] text-muted-foreground mt-2 font-semibold">— Dom [Nome do Arcebispo]</footer>
            </blockquote>

            <Link href="/sobre" className="inline-flex items-center gap-1 text-[13px] text-primary font-medium hover:gap-2 transition-all">
              ← Voltar para Sobre
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
