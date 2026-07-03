import Link from "next/link"
import { IconPlus, IconPencil, IconTrash, IconDownload } from "@tabler/icons-react"

export const metadata = { title: "Documentos" }

const docs = [
  { id: 1, titulo: "Decreto de Nomeação — Pároco da Catedral",           tipo: "Decreto",    data: "28 mai 2025" },
  { id: 2, titulo: "Comunicado sobre o Jubileu de 2025",                 tipo: "Comunicado", data: "20 mai 2025" },
  { id: 3, titulo: "Nomeação de Vigário Episcopal — Setor Avaré",        tipo: "Nomeação",   data: "15 mai 2025" },
  { id: 4, titulo: "Circular n.º 12/2025 — Semana Nacional de Catequese",tipo: "Circular",   data: "08 mai 2025" },
  { id: 5, titulo: "Decreto de Criação da Paróquia Santa Cruz em Itatinga", tipo: "Decreto", data: "10 mar 2025" },
]

const tipoColor: Record<string, string> = {
  Decreto:    "bg-primary/10 text-primary",
  Comunicado: "bg-accent/20 text-foreground",
  Nomeação:   "bg-success/10 text-success",
  Circular:   "bg-muted text-muted-foreground",
}

export default function AdminDocumentosPage() {
  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Governo eclesiástico
          </p>
          <h1 className="font-serif text-[28px] font-bold">Documentos</h1>
        </div>
        <Link
          href="/admin/documentos/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Novo documento
        </Link>
      </div>

      <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {docs.map(({ id, titulo, tipo, data }) => (
            <div key={id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm ${tipoColor[tipo]}`}>
                    {tipo}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{data}</span>
                </div>
                <p className="text-[13px] font-medium truncate">{titulo}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <IconDownload size={14} />
                </button>
                <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <IconPencil size={14} />
                </button>
                <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <IconTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
