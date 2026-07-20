import Link from "next/link"
import { createDocumento } from "../actions"

export const metadata = { title: "Novo Documento" }

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

export default function NovoDocumentoPage() {
  const hoje = new Date().toISOString().split('T')[0]

  return (
    <div className="p-8 max-w-[700px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <Link href="/admin/documentos" className="block w-4 h-0.5 bg-primary shrink-0 hover:bg-primary/60 transition-colors" />
            Documentos
          </p>
          <h1 className="font-serif text-[28px] font-bold">Novo documento</h1>
        </div>
      </div>

      <form action={createDocumento} encType="multipart/form-data" className="space-y-6">
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-5">
          <div>
            <label className={labelCls}>Título *</label>
            <input name="titulo" required className={inputCls} placeholder="Título do documento" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tipo *</label>
              <select name="tipo" required className={inputCls}>
                <option value="Decreto">Decreto</option>
                <option value="Comunicado">Comunicado</option>
                <option value="Nomeação">Nomeação</option>
                <option value="Circular">Circular</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Data de publicação *</label>
              <input name="publicado_em" type="date" required defaultValue={hoje} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Arquivo (PDF)</label>
            <input
              name="arquivo_file"
              type="file"
              accept="application/pdf,.pdf"
              className="w-full text-[13px] text-muted-foreground file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-[12px] file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
            />
            <p className="text-[11px] text-muted-foreground mt-1">PDF — máx. 20 MB</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors">
            Salvar documento
          </button>
          <Link href="/admin/documentos" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
