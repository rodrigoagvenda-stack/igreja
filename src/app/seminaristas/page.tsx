import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Image from "next/image"
import { IconBookmark } from "@tabler/icons-react"

export const metadata = { title: "Seminaristas" }

type Seminarista = { nome: string; seminario: string; ano: string; cidade: string }

const seminaristas: Seminarista[] = [
  { nome: "[Nome 01]", seminario: "Seminário Nossa Senhora da Imaculada Conceição", ano: "1.º Teologia",  cidade: "Botucatu" },
  { nome: "[Nome 02]", seminario: "Seminário Nossa Senhora da Imaculada Conceição", ano: "2.º Teologia",  cidade: "Botucatu" },
  { nome: "[Nome 03]", seminario: "Seminário Nossa Senhora da Imaculada Conceição", ano: "3.º Teologia",  cidade: "Botucatu" },
  { nome: "[Nome 04]", seminario: "Seminário Nossa Senhora da Imaculada Conceição", ano: "4.º Teologia",  cidade: "Botucatu" },
  { nome: "[Nome 05]", seminario: "Seminário Nossa Senhora da Imaculada Conceição", ano: "Propedêutico",  cidade: "Botucatu" },
  { nome: "[Nome 06]", seminario: "Seminário Nossa Senhora da Imaculada Conceição", ano: "Propedêutico",  cidade: "Botucatu" },
  { nome: "[Nome 07]", seminario: "Seminário Nossa Senhora da Imaculada Conceição", ano: "1.º Filosofia", cidade: "Botucatu" },
  { nome: "[Nome 08]", seminario: "Seminário Nossa Senhora da Imaculada Conceição", ano: "2.º Filosofia", cidade: "Botucatu" },
]

const anoColors: Record<string, string> = {
  "Propedêutico":  "bg-muted text-muted-foreground",
  "1.º Filosofia": "bg-blue-50 text-blue-700",
  "2.º Filosofia": "bg-blue-50 text-blue-700",
  "1.º Teologia":  "bg-primary/10 text-primary",
  "2.º Teologia":  "bg-primary/10 text-primary",
  "3.º Teologia":  "bg-primary/10 text-primary",
  "4.º Teologia":  "bg-primary/10 text-primary",
}

export default function SeminaristasPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Clero"
        title="Seminaristas"
        subtitle="Jovens da Arquidiocese de Botucatu em formação para o sacerdócio."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Clero" }, { label: "Seminaristas" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <p className="text-[13px] text-muted-foreground mb-8">{seminaristas.length} seminaristas em formação</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {seminaristas.map(({ nome, seminario, ano, cidade }) => (
            <div
              key={nome + ano}
              className="bg-card border border-border rounded-lg p-5 flex flex-col items-center text-center gap-3 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.08)] transition-all"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0">
                <Image
                  src={`https://picsum.photos/seed/seminarista-${nome}/80/80`}
                  alt={nome}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full">
                <p className="font-serif font-bold text-[14px] leading-snug">{nome}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded mt-1.5 ${anoColors[ano] ?? "bg-muted text-muted-foreground"}`}>
                  <IconBookmark size={9} /> {ano}
                </span>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug line-clamp-2">{seminario}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{cidade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
