import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { createClient } from "@/lib/supabase/server"
import PadresClient from "../padres/PadresClient"

export const metadata = { title: "Párocos — Arquidiocese de Botucatu" }
export const dynamic = "force-dynamic"

type PadreRow = {
  id: string
  nome: string
  foto_url: string | null
  arq_paroquias: { nome: string; cidade: string } | null
}

export default async function ParocosPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_padres")
    .select("id, nome, foto_url, arq_paroquias(nome, cidade)")
    .eq("ativo", true)
    .not("paroquia_id", "is", null)
    .order("nome")

  const padres = (data ?? []) as unknown as PadreRow[]

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Clero"
        title="Párocos"
        subtitle="Conheça os sacerdotes que servem como párocos nas comunidades da Arquidiocese de Botucatu."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Párocos" }]}
      />
      <PadresClient padres={padres} />
    </SiteLayout>
  )
}
