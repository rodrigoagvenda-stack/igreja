import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { createClient } from "@/lib/supabase/server"
import { IconBookmark, IconMapPin } from "@tabler/icons-react"

export const metadata = { title: "Seminaristas" }
export const dynamic = "force-dynamic"

const anoColors: Record<string, string> = {
  "Propedêutico":  "bg-muted text-muted-foreground",
  "1.º Filosofia": "bg-blue-50 text-blue-700",
  "2.º Filosofia": "bg-blue-50 text-blue-700",
  "3.º Filosofia": "bg-blue-50 text-blue-700",
  "1.º Teologia":  "bg-primary/10 text-primary",
  "2.º Teologia":  "bg-primary/10 text-primary",
  "3.º Teologia":  "bg-primary/10 text-primary",
  "4.º Teologia":  "bg-primary/10 text-primary",
}

type SemRow = {
  id: string
  nome: string
  nascimento: string | null
  ano_formacao: string
  foto_url: string | null
  arq_paroquias: { nome: string; cidade: string } | null
}

export default async function SeminaristasPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_seminaristas")
    .select("id, nome, nascimento, ano_formacao, foto_url, arq_paroquias(nome, cidade)")
    .eq("ativo", true)
    .order("ano_formacao")
    .order("nome")

  const seminaristas = (data ?? []) as unknown as SemRow[]

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Clero"
        title="Seminaristas"
        subtitle="Jovens da Arquidiocese de Botucatu em formação para o sacerdócio — Seminário São José (Propedêutico) e FAJE, Belo Horizonte (Filosofia e Teologia)."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Clero" }, { label: "Seminaristas" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <p className="text-[13px] text-muted-foreground mb-8">
          {seminaristas.length} seminarista{seminaristas.length !== 1 ? "s" : ""} em formação
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {seminaristas.map(({ id, nome, ano_formacao, foto_url, arq_paroquias: paroquia }) => (
            <div
              key={id}
              className="bg-card border border-border rounded-lg p-5 flex flex-col items-center text-center gap-3 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.08)] transition-all"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0 bg-muted">
                {foto_url ? (
                  <img src={foto_url} alt={nome} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-[28px] font-serif font-bold">
                    {nome.charAt(0)}
                  </div>
                )}
              </div>
              <div className="w-full">
                <p className="font-serif font-bold text-[14px] leading-snug">{nome}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded mt-1.5 ${anoColors[ano_formacao] ?? "bg-muted text-muted-foreground"}`}>
                  <IconBookmark size={9} /> {ano_formacao}
                </span>
                {paroquia && (
                  <p className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground mt-1.5 leading-snug">
                    <IconMapPin size={10} className="text-primary flex-shrink-0" />
                    <span className="line-clamp-2">{paroquia.nome} — {paroquia.cidade}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {seminaristas.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-medium">Nenhum seminarista cadastrado.</p>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
