import Link from "next/link"
import { IconArrowRight, IconMapPin, IconBuildingChurch, IconCalendar } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"

type Evento = {
  id: string
  titulo: string
  local: string | null
  categoria: string
  inicio: string
}

const catColor: Record<string, string> = {
  Litúrgico:     "bg-primary",
  Formação:      "bg-accent",
  Institucional: "bg-foreground/60",
  Pastoral:      "bg-green-600",
}

export async function AgendaMissaSection() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("arq_eventos")
    .select("id, titulo, local, categoria, inicio")
    .gte("inicio", new Date().toISOString())
    .order("inicio")
    .limit(4)

  const eventos = (data ?? []) as Evento[]

  return (
    <section className="py-16 md:py-20 bg-muted/50" aria-label="Agenda pastoral e horários de missa">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

          {/* Agenda */}
          <div className="flex flex-col">
            <div className="flex items-end justify-between mb-5 pb-4 border-b border-border">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                  <span className="block w-4 h-0.5 bg-primary" aria-hidden="true" />
                  Calendário pastoral
                </p>
                <h2 className="font-serif text-[22px] font-bold">Próximos eventos</h2>
              </div>
              <Link href="/agenda" className="text-[13px] text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Ver calendário <IconArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden divide-y divide-border flex-1">
              {eventos.length > 0 ? eventos.map(({ id, titulo, local, categoria, inicio }) => {
                const d = new Date(inicio)
                const dia = d.toLocaleDateString("pt-BR", { day: "2-digit" })
                const mes = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")
                const cor = catColor[categoria] ?? "bg-muted-foreground"
                return (
                  <Link key={id} href="/agenda" className="flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors group">
                    <div className={`w-11 h-11 ${cor} rounded-md flex flex-col items-center justify-center flex-shrink-0`}>
                      <span className="text-[18px] font-bold text-white leading-none">{dia}</span>
                      <span className="text-[9px] text-white/80 uppercase tracking-wide font-semibold">{mes}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold leading-[1.3] group-hover:text-primary transition-colors truncate">{titulo}</p>
                      {local && (
                        <p className="flex items-center gap-1 text-[12px] text-muted-foreground mt-0.5">
                          <IconMapPin size={11} className="text-primary flex-shrink-0" />
                          {local}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              }) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
                  <IconCalendar size={32} className="opacity-20" />
                  <p className="text-[13px]">Nenhum evento programado no momento.</p>
                </div>
              )}
            </div>
          </div>

          {/* Horários de missa */}
          <div className="flex flex-col">
            <div className="flex items-end justify-between mb-5 pb-4 border-b border-border">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                  <span className="block w-4 h-0.5 bg-primary" aria-hidden="true" />
                  Ferramenta
                </p>
                <h2 className="font-serif text-[22px] font-bold">Encontre uma missa</h2>
              </div>
            </div>

            <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm flex-1 flex flex-col justify-between">
              <div className="px-6 pt-6 pb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <IconBuildingChurch size={28} className="text-primary" />
                </div>
                <h3 className="font-serif text-[20px] font-bold text-foreground mb-2">
                  Horários de missa
                </h3>
                <p className="text-[14px] text-muted-foreground leading-[1.6]">
                  Consulte os horários de missa em todas as paróquias e capelas da Arquidiocese de Botucatu por cidade.
                </p>
              </div>
              <div className="px-6 pb-6">
                <Link
                  href="/horarios-de-missa"
                  className="flex items-center justify-center gap-2 w-full bg-accent text-foreground text-[14px] font-semibold py-3 rounded-md hover:bg-accent/90 transition-colors"
                >
                  Buscar horários <IconArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
