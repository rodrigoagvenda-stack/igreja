import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { createClient } from "@/lib/supabase/server"
import AgendaClient from "./AgendaClient"

export const metadata = { title: "Agenda Pastoral — Arquidiocese de Botucatu" }
export const dynamic = "force-dynamic"

export default async function AgendaPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_eventos")
    .select("id, titulo, descricao, local, categoria, inicio, fim, destaque")
    .gte("inicio", new Date().toISOString())
    .order("inicio", { ascending: true })

  const eventos = data ?? []
  const categorias = Array.from(new Set(eventos.map(e => e.categoria))).sort()

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Calendário"
        title="Agenda Pastoral"
        subtitle="Acompanhe os próximos eventos, celebrações e encontros da Arquidiocese de Botucatu."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Agenda" }]}
      />
      <AgendaClient eventos={eventos} categorias={categorias} />
    </SiteLayout>
  )
}
