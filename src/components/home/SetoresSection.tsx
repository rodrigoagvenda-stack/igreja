import Link from "next/link"
import {
  IconArrowRight, IconBook2, IconFlame, IconHeart, IconUsers,
  IconHome, IconMicrophone2, IconWorld, IconStar, IconCross,
} from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"

const iconBySlug: Record<string, React.ReactNode> = {
  "comunhao-e-participacao": <IconCross size={22} />,
  "familia":                 <IconHome size={22} />,
  "vocacoes":                <IconStar size={22} />,
  "liturgia":                <IconFlame size={22} />,
  "catequese":               <IconBook2 size={22} />,
  "juventude":               <IconUsers size={22} />,
  "movimentos-associacoes":  <IconWorld size={22} />,
  "pastorais-sociais":       <IconHeart size={22} />,
  "pascom":                  <IconMicrophone2 size={22} />,
  "pastoral-universitaria":  <IconUsers size={22} />,
}

type Setor = { id: string; slug: string; nome: string; descricao: string | null }

export async function SetoresSection() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_setores_pastorais")
    .select("id, slug, nome, descricao")
    .order("ordem")
    .limit(8)

  const setores = (data ?? []) as Setor[]
  if (setores.length === 0) return null

  return (
    <section className="py-16 md:py-20" aria-label="Setores pastorais">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
              <span className="block w-4 h-0.5 bg-primary" aria-hidden="true" />
              Organização pastoral
            </p>
            <h2 className="font-serif text-2xl font-bold">Setores pastorais</h2>
          </div>
          <Link href="/setores" className="text-[13px] text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Ver todos <IconArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {setores.map(({ id, slug, nome, descricao }) => (
            <Link
              key={id}
              href={`/setores/${slug}`}
              className="group bg-card border border-border rounded-lg p-5 flex flex-col gap-3 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.10)] transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white flex-shrink-0">
                {iconBySlug[slug] ?? <IconCross size={22} />}
              </div>
              <div>
                <h3 className="font-semibold text-[14px] leading-snug mb-1 group-hover:text-primary transition-colors">{nome}</h3>
                {descricao && (
                  <p className="text-[12px] text-muted-foreground leading-[1.5] line-clamp-2">{descricao}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
