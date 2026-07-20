import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { updateLocal } from "../../actions"

export const metadata = { title: "Editar Horários" }

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

type LocalRow = {
  id: string
  nome: string
  tipo: 'Matriz' | 'Capela'
  paroquia_id: string
  endereco: string | null
  arq_horarios_missa: { id: string; descricao: string }[]
}

type ParoquiaOption = { id: string; nome: string; cidade: string }

export default async function EditarHorarioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: localData }, { data: paroquiasData }] = await Promise.all([
    supabase.from('arq_locais').select('*, arq_horarios_missa(id, descricao)').eq('id', id).single(),
    supabase.from('arq_paroquias').select('id, nome, cidade').eq('ativa', true).order('nome'),
  ])

  if (!localData) notFound()

  const local = localData as unknown as LocalRow
  const paroquias = (paroquiasData ?? []) as ParoquiaOption[]
  const horariosText = local.arq_horarios_missa.map(h => h.descricao).join('\n')

  const action = updateLocal.bind(null, id)

  return (
    <div className="p-8 max-w-[700px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <Link href="/admin/horarios" className="block w-4 h-0.5 bg-primary shrink-0 hover:bg-primary/60 transition-colors" />
            Horários de Missa
          </p>
          <h1 className="font-serif text-[28px] font-bold">Editar local</h1>
        </div>
      </div>

      <form action={action} className="space-y-6">
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-5">
          <div>
            <label className={labelCls}>Nome do local *</label>
            <input name="nome" required defaultValue={local.nome} className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tipo *</label>
              <select name="tipo" required defaultValue={local.tipo} className={inputCls}>
                <option value="Matriz">Matriz</option>
                <option value="Capela">Capela</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Paróquia *</label>
              <select name="paroquia_id" required defaultValue={local.paroquia_id} className={inputCls}>
                <option value="">Selecione...</option>
                {paroquias.map(p => (
                  <option key={p.id} value={p.id}>{p.nome} — {p.cidade}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Endereço</label>
            <input name="endereco" defaultValue={local.endereco ?? ''} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Horários de missa</label>
            <p className="text-[11px] text-muted-foreground mb-2">Um horário por linha</p>
            <textarea name="horarios" rows={6} defaultValue={horariosText} className={inputCls + " resize-y"} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors">
            Salvar alterações
          </button>
          <Link href="/admin/horarios" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
