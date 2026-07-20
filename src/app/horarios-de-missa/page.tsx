import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { createClient } from "@/lib/supabase/server"
import HorariosMissaClient from "./HorariosMissaClient"

export const metadata = { title: "Horários de Missa — Arquidiocese de Botucatu" }
export const dynamic = "force-dynamic"

type Horario = { id: string; descricao: string }
type Local = { id: string; nome: string; tipo: "Matriz" | "Capela"; endereco: string | null; arq_horarios_missa: Horario[] }
type ParoquiaRaw = { slug: string; nome: string; cidade: string; arq_locais: Local[] }

export default async function HorariosMissaPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_paroquias")
    .select("slug, nome, cidade, arq_locais(id, nome, tipo, endereco, arq_horarios_missa(id, descricao))")
    .eq("ativa", true)
    .order("cidade")
    .order("nome")

  const raw = (data ?? []) as unknown as ParoquiaRaw[]

  const paroquias = raw.map(p => ({
    slug: p.slug,
    nome: p.nome,
    cidade: p.cidade,
    locais: p.arq_locais ?? [],
  }))

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
