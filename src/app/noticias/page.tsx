import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { createClient } from "@/lib/supabase/server"
import NoticiasClient from "./NoticiasClient"

export const metadata = { title: "Notícias — Arquidiocese de Botucatu" }
export const dynamic = "force-dynamic"

export default async function NoticiasPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_noticias")
    .select("id, slug, titulo, resumo, categoria, imagem_url, publicado_em")
    .eq("status", "publicado")
    .order("publicado_em", { ascending: false })

  const noticias = data ?? []
  const categorias = Array.from(new Set(noticias.map(n => n.categoria))).sort()

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Acontece na Arquidiocese"
        title="Últimas notícias"
        subtitle="Acompanhe os comunicados, eventos e novidades da Arquidiocese de Botucatu e de suas paróquias."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Notícias" }]}
      />
      <NoticiasClient noticias={noticias} categorias={categorias} />
    </SiteLayout>
  )
}
