import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { createClient } from "@/lib/supabase/server"
import HorariosMissaClient from "./HorariosMissaClient"

export const metadata = { title: "Horários de Missa — Arquidiocese de Botucatu" }
export const dynamic = "force-dynamic"

type Horario = { id: string; dias: string[]; horarios: string[] }
type FotoParoquia = { url: string; tag: string | null }
type Local = { id: string; nome: string; tipos: ("Matriz" | "Capela")[]; endereco: string | null; fotos: FotoParoquia[]; arq_horarios_missa: Horario[] }
type ParoquiaRaw = { slug: string; nome: string; cidade: string; fotos: FotoParoquia[] | null; arq_locais: Local[] }

export default async function HorariosMissaPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_paroquias")
    .select("slug, nome, cidade, fotos, arq_locais(id, nome, tipos, endereco, fotos, arq_horarios_missa(id, dias, horarios))")
    .eq("ativa", true)
    .order("cidade")
    .order("nome")

  const raw = (data ?? []) as unknown as ParoquiaRaw[]

  const paroquias = raw.map(p => {
    const locais = p.arq_locais ?? []
    const matriz = locais.find(l => l.tipos.includes("Matriz"))
    const capa = matriz?.fotos?.[0]?.url ?? p.fotos?.[0]?.url ?? null
    return {
      slug: p.slug,
      nome: p.nome,
      cidade: p.cidade,
      capa,
      locais,
    }
  })

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Ferramenta"
        title="Horários de Missa"
        subtitle="Encontre os horários de missa nas paróquias da Arquidiocese de Botucatu."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Horários de Missa" }]}
      />
      <HorariosMissaClient paroquias={paroquias} />
    </SiteLayout>
  )
}
