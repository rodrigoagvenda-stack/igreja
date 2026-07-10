import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { updateDocumento } from "../../actions"

export const metadata = { title: "Editar Documento" }

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

export default async function EditarDocumentoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: doc } = await supabase
    .from('arq_documentos')
    .select('*')
    .eq('id', id)
    .single()

  if (!doc) notFound()

  const action = updateDocumento.bind(null, id)

  return (
    <div className="p-8 max-w-[700px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <Link href="/admin/documentos" className="block w-4 h-0.5 bg-primary shrink-0 hover:bg-primary/60 transition-colors" />
            Documentos
          </p>
          <h1 className="font-serif text-[28px] font-bold">Editar documento</h1>
        </div>
      </div>

      <form action={action} className="space-y-6">
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-5">
          <div>
            <label className={labelCls}>Título *</label>
            <input name="titulo" required defaultValue={doc.titulo} className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tipo *</label>
              <select name="tipo" required defaultValue={doc.tipo} className={inputCls}>
                <option value="Decreto">Decreto</option>
                <option value="Comunicado">Comunicado</option>
                <option value="Nomeação">Nomeação</option>
                <option value="Circular">Circular</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Data de publicação *</label>
              <input name="publicado_em" type="date" required defaultValue={doc.publicado_em} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>URL do arquivo</label>
            <input name="arquivo_url" type="url" defaultValue={doc.arquivo_url ?? ''} className={inputCls} placeholder="https://..." />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors">
            Salvar alterações
          </button>
          <Link href="/admin/documentos" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
