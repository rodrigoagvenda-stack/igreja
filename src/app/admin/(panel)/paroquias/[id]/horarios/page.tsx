import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { saveLocaisDaParoquia } from "../../../horarios/actions"
import { LocaisEditor, type LocalInicial } from "@/components/admin/LocaisEditor"

export const metadata = { title: "Locais e Horários" }

type LocalRaw = {
  id: string
  nome: string
  tipos: string[]
  endereco: string | null
  arq_horarios_missa: { descricao: string }[]
}

export default async function ParoquiaHorariosPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: paroquia }, { data: locaisData }] = await Promise.all([
    supabase.from('arq_paroquias').select('id, nome, cidade').eq('id', id).single(),
    supabase
      .from('arq_locais')
      .select('id, nome, tipos, endereco, arq_horarios_missa(descricao)')
      .eq('paroquia_id', id)
      .order('nome'),
  ])

  if (!paroquia) notFound()

  const locais = (locaisData ?? []) as unknown as LocalRaw[]
  const locaisIniciais: LocalInicial[] = locais.map(l => ({
    id: l.id,
    nome: l.nome,
    tipos: l.tipos,
    endereco: l.endereco,
    horarios: l.arq_horarios_missa.map(h => h.descricao).join('\n'),
  }))

  const action = saveLocaisDaParoquia.bind(null, id)

  return (
    <div className="p-8 max-w-[700px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <Link href="/admin/horarios" className="block w-4 h-0.5 bg-primary shrink-0 hover:bg-primary/60 transition-colors" />
            Horários de Missa
          </p>
          <h1 className="font-serif text-[28px] font-bold">{paroquia.nome}</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">{paroquia.cidade}</p>
        </div>
      </div>

      <LocaisEditor paroquiaId={id} locaisIniciais={locaisIniciais} action={action} />
    </div>
  )
}
