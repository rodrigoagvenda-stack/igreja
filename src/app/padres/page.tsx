import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { createClient } from "@/lib/supabase/server"
import PadresClient from "./PadresClient"

export const metadata = { title: "Padres — Clero da Arquidiocese" }
export const dynamic = "force-dynamic"

type PadreRow = {
  id: string
  nome: string
  foto_url: string | null
  arq_paroquias: { nome: string; cidade: string } | null
}

export default async function PadresPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_padres")
    .select("id, nome, foto_url, arq_paroquias(nome, cidade)")
    .eq("ativo", true)
    .order("nome")

  const padres = (data ?? []) as unknown as PadreRow[]

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Clero"
        title="Padres"
        subtitle="Conheça os sacerdotes que servem nas paróquias da Arquidiocese de Botucatu."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Clero" }, { label: "Padres" }]}
      />
      <PadresClient padres={padres} />
    </SiteLayout>
  )
}
