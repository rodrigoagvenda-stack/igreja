import Link from "next/link"
import {
  IconArrowRight, IconFileText, IconChevronRight,
  IconBook2, IconFlame, IconHeart, IconUsers,
  IconHome, IconMicrophone2, IconWorld, IconStar, IconCross,
} from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"

const iconBySlug: Record<string, React.ReactNode> = {
  "comunhao-e-participacao": <IconCross size={20} />,
  "familia":                 <IconHome size={20} />,
  "vocacoes":                <IconStar size={20} />,
  "liturgia":                <IconFlame size={20} />,
  "catequese":               <IconBook2 size={20} />,
  "juventude":               <IconUsers size={20} />,
  "movimentos-associacoes":  <IconWorld size={20} />,
  "pastorais-sociais":       <IconHeart size={20} />,
  "pascom":                  <IconMicrophone2 size={20} />,
  "pastoral-universitaria":  <IconUsers size={20} />,
}

const tipoColor: Record<string, string> = {
  Decreto:    "text-primary",
  Comunicado: "text-accent",
  Nomeação:   "text-green-700",
  Circular:   "text-muted-foreground",
}

type Setor = { id: string; slug: string; nome: string; descricao: string | null }
type Documento = { id: string; slug: string; titulo: string; tipo: string; publicado_em: string }

export async function SetoresEDocumentos() {
  const supabase = await createClient()
  const [{ data: setoresData }, { data: docsData }] = await Promise.all([
    supabase.from("arq_setores_pastorais").select("id, slug, nome, descricao").order("ordem").limit(4),
    supabase.from("arq_documentos").select("id, slug, titulo, tipo, publicado_em").order("publicado_em", { ascending: false }).limit(3),
  ])

  const setores = (setoresData ?? []) as Setor[]
  const docs = (docsData ?? []) as Documento[]
  if (setores.length === 0 && docs.length === 0) return null

  return (
    <section className="py-16 md:py-20" aria-label="Setores pastorais e documentos oficiais">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Setores pastorais */}
          {setores.length > 0 && (
            <div className="flex flex-col gap-5 w-full lg:w-[680px]">
              <h2 className="font-serif text-[26px] font-bold">Setores pastorais</h2>
              <div className="flex flex-wrap gap-3.5 items-stretch">
                {setores.map(({ id, slug, nome, descricao }) => (
                  <Link
                    key={id}
                    href={`/setores/${slug}`}
                    className="group flex flex-col gap-2.5 w-full sm:w-[calc(50%-7px)] bg-muted rounded-[10px] p-5 hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-[42px] h-[42px] rounded-[10px] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                      {iconBySlug[slug] ?? <IconCross size={20} />}
                    </div>
                    <span className="font-semibold text-[15px] leading-snug group-hover:text-primary transition-colors line-clamp-2">{nome}</span>
                    {descricao && (
                      <span className="text-[13px] text-muted-foreground leading-[1.5] line-clamp-2">{descricao}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Documentos oficiais */}
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="font-serif text-[26px] font-bold">Atos oficiais</h2>
            {docs.length > 0 ? (
              <>
                <div className="flex flex-col gap-2.5">
                  {docs.map(({ id, slug, titulo, tipo }) => (
                    <Link
                      key={id}
                      href={`/documentos/${slug}`}
                      className="group flex items-center gap-3 bg-muted rounded-[10px] px-4 py-3.5 hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-[34px] h-[34px] rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <IconFileText size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[10px] font-semibold uppercase tracking-[.06em] ${tipoColor[tipo] ?? "text-muted-foreground"}`}>{tipo}</p>
                        <p className="text-[13px] font-medium leading-[1.4] truncate">{titulo}</p>
                      </div>
                      <IconChevronRight size={14} className="text-muted-foreground flex-shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
                <Link href="/documentos" className="text-[13px] font-semibold text-primary flex items-center justify-center gap-1">
                  Ver todos os documentos <IconArrowRight size={13} />
                </Link>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-muted rounded-[10px] py-10 text-muted-foreground">
                <IconFileText size={32} className="opacity-25" />
                <p className="text-[13px]">Nenhum documento publicado ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
