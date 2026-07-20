import { notFound } from "next/navigation"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import {
  IconMapPin, IconPhone, IconMail, IconClock,
  IconUser, IconArrowLeft, IconBuildingChurch,
} from "@tabler/icons-react"

export const dynamic = "force-dynamic"

type LocalComHorarios = {
  id: string
  nome: string
  tipo: "Matriz" | "Capela"
  endereco: string | null
  arq_horarios_missa: { id: string; descricao: string }[]
}

type ParoquiaRow = {
  id: string
  slug: string
  nome: string
  cidade: string
  regiao_pastoral: string
  padroeiro: string | null
  data_criacao: string | null
  endereco: string | null
  telefone: string | null
  email: string | null
  site: string | null
}

type PadreRow = { id: string; nome: string }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_paroquias")
    .select("nome, cidade")
    .eq("slug", slug)
    .eq("ativa", true)
    .single()
  if (!data) return { title: "Paróquia" }
  return { title: `${(data as { nome: string; cidade: string }).nome} — ${(data as { nome: string; cidade: string }).cidade}` }
}

export default async function ParoquiaSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const [{ data: parData }, { data: locaisData }, { data: padresData }] = await Promise.all([
    supabase
      .from("arq_paroquias")
      .select("id, slug, nome, cidade, regiao_pastoral, padroeiro, data_criacao, endereco, telefone, email, site")
      .eq("slug", slug)
      .eq("ativa", true)
      .single(),
    supabase
      .from("arq_locais")
      .select("id, nome, tipo, endereco, arq_horarios_missa(id, descricao)")
      .order("tipo"),
    supabase
      .from("arq_padres")
      .select("id, nome")
      .eq("ativo", true),
  ])

  if (!parData) notFound()

  const paroquia = parData as unknown as ParoquiaRow
  const locais = (locaisData ?? []) as unknown as LocalComHorarios[]
  const allPadres = (padresData ?? []) as unknown as PadreRow[]

  // Filtra locais e padres desta paróquia
  const locaisParoquia = locais.filter(() => true) // locais já vêm filtrados pelo FK no select abaixo
  const padresParoquia = allPadres

  // Re-fetch locais filtrados por paroquia_id
  const { data: locaisFiltrados } = await supabase
    .from("arq_locais")
    .select("id, nome, tipo, endereco, arq_horarios_missa(id, descricao)")
    .eq("paroquia_id", paroquia.id)
    .order("tipo")

  const { data: padresFiltrados } = await supabase
    .from("arq_padres")
    .select("id, nome")
    .eq("paroquia_id", paroquia.id)
    .eq("ativo", true)

  const locaisReais = (locaisFiltrados ?? []) as unknown as LocalComHorarios[]
  const padresReais = (padresFiltrados ?? []) as unknown as PadreRow[]

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Paróquia"
        title={paroquia.nome}
        subtitle={paroquia.cidade}
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Paróquias", href: "/paroquias" },
          { label: paroquia.nome },
        ]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

          {/* Main */}
          <div className="space-y-8">
            {/* Badge região */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[.06em] px-2.5 py-1 rounded bg-primary/10 text-primary">
                {paroquia.regiao_pastoral}
              </span>
              {paroquia.padroeiro && (
                <span className="text-[13px] text-muted-foreground">
                  Padroeiro(a): <strong>{paroquia.padroeiro}</strong>
                </span>
              )}
            </div>

            {/* Padres */}
            {padresReais.length > 0 && (
              <section>
                <h2 className="font-serif text-[20px] font-bold mb-3 pb-3 border-b border-border">
                  {padresReais.length === 1 ? "Pároco" : "Clero paroquial"}
                </h2>
                <div className="flex flex-col gap-2">
                  {padresReais.map(p => (
                    <div key={p.id} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconUser size={16} className="text-primary" />
                      </div>
                      <span className="text-[14px] font-medium">{p.nome}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Locais e horários */}
            {locaisReais.length > 0 && (
              <section>
                <h2 className="font-serif text-[20px] font-bold mb-4 pb-3 border-b border-border">
                  Locais e horários de missa
                </h2>
                <div className="space-y-4">
                  {locaisReais.map(local => (
                    <div key={local.id} className="bg-card border border-border rounded-lg overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                        <IconBuildingChurch size={15} className="text-primary" />
                        <span className="font-semibold text-[14px]">{local.nome}</span>
                        <span className={`ml-auto text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded ${local.tipo === "Matriz" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                          {local.tipo}
                        </span>
                      </div>
                      {local.arq_horarios_missa.length > 0 ? (
                        <div className="divide-y divide-border">
                          {local.arq_horarios_missa.map(h => (
                            <div key={h.id} className="flex items-center gap-2 px-4 py-3">
                              <IconClock size={13} className="text-primary flex-shrink-0" />
                              <span className="text-[13px]">{h.descricao}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="px-4 py-3 text-[13px] text-muted-foreground">Horários não cadastrados.</p>
                      )}
                      {local.endereco && (
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/30 text-[12px] text-muted-foreground border-t border-border">
                          <IconMapPin size={12} className="text-primary" /> {local.endereco}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {locaisReais.length === 0 && (
              <section>
                <h2 className="font-serif text-[20px] font-bold mb-4 pb-3 border-b border-border">Horários de missa</h2>
                <p className="text-[14px] text-muted-foreground">Horários não cadastrados. Entre em contato com a paróquia.</p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-card border border-border rounded-lg p-5 space-y-4">
              <h3 className="font-serif text-[16px] font-bold pb-3 border-b border-border">Informações</h3>

              {paroquia.endereco && (
                <div className="flex gap-3 text-[13px]">
                  <IconMapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Endereço</p>
                    <p className="leading-[1.5]">{paroquia.endereco}{paroquia.cidade ? `, ${paroquia.cidade}/SP` : ""}</p>
                  </div>
                </div>
              )}

              {paroquia.telefone && (
                <div className="flex gap-3 text-[13px]">
                  <IconPhone size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Telefone</p>
                    <p>{paroquia.telefone}</p>
                  </div>
                </div>
              )}

              {paroquia.email && (
                <div className="flex gap-3 text-[13px]">
                  <IconMail size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">E-mail</p>
                    <a href={`mailto:${paroquia.email}`} className="text-primary hover:underline break-all">{paroquia.email}</a>
                  </div>
                </div>
              )}

              {paroquia.data_criacao && (
                <div className="flex gap-3 text-[13px]">
                  <IconBuildingChurch size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Criação</p>
                    <p>{new Date(paroquia.data_criacao).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
              )}
            </div>

            <Link href="/paroquias" className="inline-flex items-center gap-2 text-[13px] text-primary font-medium hover:gap-3 transition-all">
              <IconArrowLeft size={14} /> Ver todas as paróquias
            </Link>
          </aside>
        </div>
      </div>
    </SiteLayout>
  )
}
