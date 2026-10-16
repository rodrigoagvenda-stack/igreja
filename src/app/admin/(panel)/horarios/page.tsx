import { createClient } from "@/lib/supabase/server"
import { HorariosListClient } from "./HorariosListClient"

export const metadata = { title: "Horários de Missa" }

export default async function AdminHorariosPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('arq_paroquias')
    .select('id, nome, cidade, arq_locais(id, nome, tipos, arq_horarios_missa(id, horarios))')
    .eq('ativa', true)
    .order('nome')

  const paroquias = (data ?? []) as unknown as Parameters<typeof HorariosListClient>[0]["paroquias"]

  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="mb-8 pb-6 border-b border-border">
        <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
          <span className="block w-4 h-0.5 bg-primary shrink-0" />
          Liturgia
        </p>
        <h1 className="font-serif text-[28px] font-bold">
          Horários de Missa {paroquias.length > 0 && <span className="text-muted-foreground text-[18px] font-normal">({paroquias.length} paróquias)</span>}
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1">Clique em uma paróquia para gerenciar seus locais (Matriz, Capelas) e os horários de cada um.</p>
      </div>

      <HorariosListClient paroquias={paroquias} />
    </div>
  )
}
