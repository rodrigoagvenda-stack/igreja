import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { createClient } from "@/lib/supabase/server"
import { IconUser, IconBuildingChurch, IconMapPin } from "@tabler/icons-react"

export const metadata = { title: "Diáconos Permanentes — Arquidiocese de Botucatu" }
export const dynamic = "force-dynamic"

type DiaconoRow = {
  id: string
  nome: string
  foto_url: string | null
  arq_paroquias: { nome: string; cidade: string } | null
}

export default async function DiaconosPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_diaconos")
    .select("id, nome, foto_url, arq_paroquias(nome, cidade)")
    .eq("ativo", true)
    .order("nome")

  const diaconos = (data ?? []) as unknown as DiaconoRow[]

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Clero"
        title="Diáconos Permanentes"
        subtitle="Conheça os 13 diáconos permanentes que servem nas paróquias da Arquidiocese de Botucatu."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Clero" }, { label: "Diáconos" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <p className="text-[13px] text-muted-foreground mb-8">
          {diaconos.length} diácono{diaconos.length !== 1 ? "s" : ""} permanente{diaconos.length !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {diaconos.map(({ id, nome, foto_url, arq_paroquias: paroquia }) => (
            <div key={id} className="bg-card border border-border rounded-lg p-5 flex flex-col items-center text-center gap-3 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.08)] transition-all">
              <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0 bg-muted flex items-center justify-center">
                {foto_url ? (
                  <img src={foto_url} alt={nome} className="w-full h-full object-cover" />
                ) : (
                  <IconUser size={28} className="text-muted-foreground/40" />
                )}
              </div>
              <div>
                <p className="font-serif font-bold text-[14px] leading-snug">{nome}</p>
                {paroquia && (
                  <>
                    <p className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground mt-1">
                      <IconBuildingChurch size={11} className="text-primary flex-shrink-0" />
                      <span className="line-clamp-2">{paroquia.nome}</span>
                    </p>
                    <p className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                      <IconMapPin size={11} className="text-primary flex-shrink-0" />
                      {paroquia.cidade}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {diaconos.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-medium">Nenhum diácono cadastrado.</p>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
