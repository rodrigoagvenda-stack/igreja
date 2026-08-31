import Link from "next/link"
import { IconPencil, IconMapPin } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"

export const metadata = { title: "Horários de Missa" }

type LocalRaw = {
  id: string
  nome: string
  tipos: ('Matriz' | 'Capela')[]
  arq_horarios_missa: { id: string }[]
}

type ParoquiaRaw = {
  id: string
  nome: string
  cidade: string
  arq_locais: LocalRaw[]
}

export default async function AdminHorariosPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('arq_paroquias')
    .select('id, nome, cidade, arq_locais(id, nome, tipos, arq_horarios_missa(id))')
    .eq('ativa', true)
    .order('nome')

  const paroquias = (data ?? []) as unknown as ParoquiaRaw[]

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

      {paroquias.length > 0 ? (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="divide-y divide-border">
            {paroquias.map((paroquia) => {
              const locais = paroquia.arq_locais ?? []
              const totalHorarios = locais.reduce((sum, l) => sum + l.arq_horarios_missa.length, 0)
              return (
                <Link
                  key={paroquia.id}
                  href={`/admin/paroquias/${paroquia.id}/horarios`}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium">{paroquia.nome}</p>
                    <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                      <IconMapPin size={10} /> {paroquia.cidade}
                    </p>
                    {locais.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {locais.map(l => (
                          <span key={l.id} className="flex items-center gap-1 text-[11px] bg-muted rounded px-2 py-0.5 text-foreground">
                            {l.nome}
                            <span className="text-muted-foreground">({l.tipos.join(", ")})</span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-warning-foreground mt-1.5">Nenhum local cadastrado ainda</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-muted-foreground">{totalHorarios} horário{totalHorarios !== 1 ? "s" : ""}</p>
                    <span className="inline-flex items-center gap-1 text-[12px] text-primary font-medium mt-1">
                      <IconPencil size={13} /> Gerenciar
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-12 text-center">
          <p className="text-[14px] font-semibold text-foreground">Nenhuma paróquia ativa</p>
        </div>
      )}
    </div>
  )
}
