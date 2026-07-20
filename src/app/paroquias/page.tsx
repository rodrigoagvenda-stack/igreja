import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { createClient } from "@/lib/supabase/server"
import ParoquiasClient from "./ParoquiasClient"

export const metadata = { title: "Paróquias da Arquidiocese de Botucatu" }
export const dynamic = "force-dynamic"

export default async function ParoquiasPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_paroquias")
    .select("slug, nome, cidade, regiao_pastoral, padroeiro")
    .eq("ativa", true)
    .order("regiao_pastoral")
    .order("nome")

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Comunidades"
        title="Paróquias da Arquidiocese"
        subtitle="A Arquidiocese de Botucatu abrange 47 paróquias distribuídas em 4 Regiões Pastorais."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Paróquias" }]}
      />
      <ParoquiasClient paroquias={data ?? []} />
    </SiteLayout>
  )
}
