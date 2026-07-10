import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { updateSeminarista } from "../../actions"

export const metadata = { title: "Editar Seminarista" }

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

const anosFormacao = [
  "Propedêutico",
  "1.º Filosofia",
  "2.º Filosofia",
  "3.º Filosofia",
  "1.º Teologia",
  "2.º Teologia",
  "3.º Teologia",
  "4.º Teologia",
]

export default async function EditarSeminaryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: sem }, { data: paroquias }] = await Promise.all([
    supabase.from('arq_seminaristas').select('*').eq('id', id).single(),
    supabase.from('arq_paroquias').select('id, nome, cidade').eq('ativa', true).order('nome'),
  ])

  if (!sem) notFound()

  const action = updateSeminarista.bind(null, id)

  return (
    <div className="p-8 max-w-[700px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <Link href="/admin/clero/seminaristas" className="block w-4 h-0.5 bg-primary shrink-0 hover:bg-primary/60 transition-colors" />
            Seminaristas
          </p>
          <h1 className="font-serif text-[28px] font-bold">Editar seminarista</h1>
        </div>
      </div>

      <form action={action} className="space-y-6">
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-5">
          <div>
            <label className={labelCls}>Nome completo *</label>
            <input name="nome" required defaultValue={sem.nome} className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Data de nascimento</label>
              <input name="nascimento" type="date" defaultValue={sem.nascimento ?? ''} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Ano de formação *</label>
              <select name="ano_formacao" required defaultValue={sem.ano_formacao} className={inputCls}>
                {anosFormacao.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Paróquia de origem</label>
            <select name="paroquia_id" defaultValue={sem.paroquia_id ?? ''} className={inputCls}>
              <option value="">Sem paróquia vinculada</option>
              {paroquias?.map(p => (
                <option key={p.id} value={p.id}>{p.nome} — {p.cidade}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>URL da foto</label>
            <input name="foto_url" type="url" defaultValue={sem.foto_url ?? ''} className={inputCls} placeholder="https://..." />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="ativo" value="true" defaultChecked={sem.ativo} className="w-4 h-4 accent-primary" />
            <span className="text-[13px]">Ativo</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors">
            Salvar alterações
          </button>
          <Link href="/admin/clero/seminaristas" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
