import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { updateEvento } from "../../actions"
import type { Evento } from "@/types/database"

export const metadata = { title: "Editar Evento" }

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

function toDatetimeLocal(iso: string) {
  return iso.slice(0, 16)
}

export default async function EditarEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('arq_eventos')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()
  const evento = data as unknown as Evento

  const action = updateEvento.bind(null, id)

  return (
    <div className="p-8 max-w-[700px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <Link href="/admin/agenda" className="block w-4 h-0.5 bg-primary shrink-0 hover:bg-primary/60 transition-colors" />
            Agenda
          </p>
          <h1 className="font-serif text-[28px] font-bold">Editar evento</h1>
        </div>
      </div>

      <form action={action} className="space-y-6">
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-5">
          <div>
            <label className={labelCls}>Título *</label>
            <input name="titulo" required defaultValue={evento.titulo} className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Início *</label>
              <input name="inicio" type="datetime-local" required defaultValue={toDatetimeLocal(evento.inicio)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Fim</label>
              <input name="fim" type="datetime-local" defaultValue={evento.fim ? toDatetimeLocal(evento.fim) : ''} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Categoria *</label>
              <select name="categoria" required defaultValue={evento.categoria} className={inputCls}>
                <option value="Liturgia">Liturgia</option>
                <option value="Formação">Formação</option>
                <option value="Clero">Clero</option>
                <option value="Pastoral">Pastoral</option>
                <option value="Devoção">Devoção</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Local</label>
              <input name="local" defaultValue={evento.local ?? ''} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Descrição</label>
            <textarea name="descricao" rows={5} defaultValue={evento.descricao ?? ''} className={inputCls + " resize-y"} />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="destaque" value="on" defaultChecked={evento.destaque} className="w-4 h-4 accent-primary" />
            <span className="text-[13px]">Destacar na página inicial</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors">
            Salvar alterações
          </button>
          <Link href="/admin/agenda" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
