import { notFound } from "next/navigation"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { ParoquiaGaleria } from "@/components/paroquias/ParoquiaGaleria"
import type { FotoParoquia } from "@/types/database"
import { formatDias } from "@/lib/horarios"
import {
  IconMapPin, IconPhone, IconMail, IconClock,
  IconUser, IconArrowLeft, IconBuildingChurch,
} from "@tabler/icons-react"

export const dynamic = "force-dynamic"

type LocalComHorarios = {
  id: string
  nome: string
  tipos: ("Matriz" | "Capela")[]
  endereco: string | null
  fotos: FotoParoquia[]
  arq_horarios_missa: { id: string; dias: string[]; horarios: string[] }[]
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
  fotos: FotoParoquia[] | null
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

  const { data: parData } = await supabase
    .from("arq_paroquias")
    .select("id, slug, nome, cidade, regiao_pastoral, padroeiro, data_criacao, endereco, telefone, email, site, fotos")
    .eq("slug", slug)
    .eq("ativa", true)
    .single()

  if (!parData) notFound()

  const paroquia = parData as unknown as ParoquiaRow

  const { data: locaisFiltrados } = await supabase
    .from("arq_locais")
    .select("id, nome, tipos, endereco, fotos, arq_horarios_missa(id, dias, horarios)")
    .eq("paroquia_id", paroquia.id)
    .order("nome")

  const { data: padresFiltrados } = await supabase
    .from("arq_padres")
    .select("id, nome")
    .eq("paroquia_id", paroquia.id)
    .eq("ativo", true)

  const locaisReais = (locaisFiltrados ?? []) as unknown as LocalComHorarios[]
  const padresReais = (padresFiltrados ?? []) as unknown as PadreRow[]

  const matriz = locaisReais.find(l => l.tipos.includes("Matriz")) ?? null
  const capelas = locaisReais.filter(l => l.id !== matriz?.id)

  const galeriaFotos = matriz?.fotos?.length ? matriz.fotos : (paroquia.fotos ?? [])
  const fotoPadroeiro = matriz?.fotos?.find(f => f.tag === "Padroeiro")
    ?? paroquia.fotos?.find(f => f.tag === "Padroeiro")
    ?? null

  const enderecoCompleto = [matriz?.endereco ?? paroquia.endereco, paroquia.cidade ? `${paroquia.cidade}/SP` : null]
    .filter(Boolean)
    .join(", ")
  const mapaHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto || paroquia.nome)}`

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={paroquia.regiao_pastoral}
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
            {/* Galeria da Matriz (ou da paróquia, se não houver local cadastrado) */}
            {galeriaFotos.length > 0 && (
              <ParoquiaGaleria fotos={galeriaFotos} nome={matriz?.nome ?? paroquia.nome} />
            )}

            {/* Horários da Matriz, em destaque logo após a foto */}
            {matriz && (
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <IconClock size={18} className="text-primary" />
                    <h2 className="font-serif text-[20px] font-bold">Horários na Matriz</h2>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[.04em] px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    Matriz
                  </span>
                </div>
                {matriz.arq_horarios_missa.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5">
                    {matriz.arq_horarios_missa.map(h => (
                      <div key={h.id} className="flex flex-col gap-0.5 bg-muted rounded-lg px-4 py-2.5 flex-1 min-w-[150px]">
                        <span className="text-[13px] font-semibold">{formatDias(h.dias)}</span>
                        <span className="text-[13px] font-semibold text-primary">{h.horarios.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-muted-foreground">Horários não cadastrados.</p>
                )}
              </section>
            )}

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

            {/* Capelas da comunidade */}
            {capelas.length > 0 && (
              <section>
                <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-border">
                  <h2 className="font-serif text-[20px] font-bold">
                    {matriz ? "Capelas da comunidade" : "Locais e horários de missa"}
                  </h2>
                  <span className="text-[13px] text-muted-foreground">
                    {capelas.length} {capelas.length === 1 ? "local" : "locais"}
                  </span>
                </div>
                <div className="flex flex-col gap-3.5">
                  {capelas.map(local => {
                    const capa = local.fotos?.[0]?.url ?? null
                    return (
                      <div key={local.id} className="flex bg-card border border-border rounded-xl overflow-hidden">
                        {capa && (
                          <div className="relative w-[130px] h-[130px] flex-shrink-0">
                            <Image src={capa} alt={local.nome} fill className="object-cover" sizes="130px" />
                          </div>
                        )}
                        <div className="flex flex-col justify-center gap-1.5 px-5 py-3.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {local.tipos.map(tipo => (
                              <span key={tipo} className={`text-[10px] font-semibold uppercase tracking-[.05em] px-1.5 py-0.5 rounded ${tipo === "Matriz" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                                {tipo}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-serif font-bold text-[16px] leading-snug">{local.nome}</h3>
                          {local.endereco && (
                            <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                              <IconMapPin size={13} className="text-primary flex-shrink-0" /> {local.endereco}
                            </p>
                          )}
                          {local.arq_horarios_missa.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5 mt-0.5">
                              {local.arq_horarios_missa.map(h => (
                                <span key={h.id} className="text-[12px] font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-1">
                                  {formatDias(h.dias)} · {h.horarios.join(", ")}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[12px] text-muted-foreground mt-0.5">Horário não cadastrado.</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
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

              {enderecoCompleto && (
                <div className="flex gap-3 text-[13px]">
                  <IconMapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Endereço</p>
                    <p className="leading-[1.5]">{enderecoCompleto}</p>
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

            {fotoPadroeiro && paroquia.padroeiro && (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="relative w-full h-[160px]">
                  <Image src={fotoPadroeiro.url} alt={paroquia.padroeiro} fill className="object-cover" sizes="320px" />
                </div>
                <div className="px-5 py-4">
                  <p className="text-[11px] font-semibold text-accent uppercase tracking-[.06em]">Padroeiro(a)</p>
                  <p className="font-serif font-bold text-[16px] mt-0.5">{paroquia.padroeiro}</p>
                </div>
              </div>
            )}

            {enderecoCompleto && (
              <a
                href={mapaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-[14px] font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <IconMapPin size={15} />
                Ver no mapa
              </a>
            )}

            <Link href="/paroquias" className="inline-flex items-center gap-2 text-[13px] text-primary font-medium hover:gap-3 transition-all">
              <IconArrowLeft size={14} /> Ver todas as paróquias
            </Link>
          </aside>
        </div>
      </div>
    </SiteLayout>
  )
}
