import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import {
  IconBook2, IconFlame, IconHeart, IconUsers,
  IconHome, IconMicrophone2, IconWorld, IconStar,
  IconMail, IconPhone, IconArrowRight, IconCross,
} from "@tabler/icons-react"

export const metadata = { title: "Setores Pastorais — Arquidiocese de Botucatu" }
export const dynamic = "force-dynamic"

const iconBySlug: Record<string, React.ReactNode> = {
  "comunhao-e-participacao": <IconCross size={28} />,
  "familia":                 <IconHome size={28} />,
  "vocacoes":                <IconStar size={28} />,
  "liturgia":                <IconFlame size={28} />,
  "catequese":               <IconBook2 size={28} />,
  "juventude":               <IconUsers size={28} />,
  "movimentos-associacoes":  <IconWorld size={28} />,
  "pastorais-sociais":       <IconHeart size={28} />,
  "pascom":                  <IconMicrophone2 size={28} />,
  "pastoral-universitaria":  <IconUsers size={28} />,
}

type Setor = {
  id: string
  slug: string
  nome: string
  descricao: string | null
  coordenador: string | null
  email: string | null
  telefone: string | null
}

export default async function SetoresPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_setores_pastorais")
    .select("id, slug, nome, descricao, coordenador, email, telefone")
    .order("ordem")

  const setores = (data ?? []) as Setor[]

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Organização pastoral"
        title="Setores Pastorais"
        subtitle="Os setores pastorais coordenam a missão evangelizadora da Arquidiocese nas suas diferentes dimensões."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Setores" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {setores.map(({ id, slug, nome, descricao, coordenador, email, telefone }) => (
            <div key={id} className="bg-card border border-border rounded-lg p-6 flex gap-5 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.08)] transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                {iconBySlug[slug] ?? <IconCross size={28} />}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-[18px] font-bold mb-1 group-hover:text-primary transition-colors">{nome}</h2>
                {descricao && (
                  <p className="text-[13px] text-muted-foreground leading-[1.55] mb-3">{descricao}</p>
                )}
                <div className="flex flex-col gap-1 text-[12px] text-muted-foreground mb-3">
                  {coordenador && (
                    <span className="flex items-center gap-1.5">
                      <IconUsers size={12} className="text-primary" /> {coordenador}
                    </span>
                  )}
                  {email && (
                    <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <IconMail size={12} className="text-primary" /> {email}
                    </a>
                  )}
                  {telefone && (
                    <span className="flex items-center gap-1.5">
                      <IconPhone size={12} className="text-primary" /> {telefone}
                    </span>
                  )}
                </div>
                <Link href={`/setores/${slug}`} className="inline-flex items-center gap-1 text-[12px] text-primary font-semibold hover:gap-2 transition-all">
                  Ver detalhes <IconArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {setores.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-medium">Nenhum setor cadastrado.</p>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
