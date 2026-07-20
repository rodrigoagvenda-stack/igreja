import Link from "next/link"
import { IconPlus, IconPencil, IconTrash, IconDownload } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"
import { deleteDocumento } from "./actions"
import { Pagination } from "@/components/admin/Pagination"

export const metadata = { title: "Documentos" }

const PAGE_SIZE = 20

const tipoColor: Record<string, string> = {
  Decreto:    "bg-primary/10 text-primary",
  Comunicado: "bg-accent/20 text-foreground",
  Nomeação:   "bg-success/10 text-success",
  Circular:   "bg-muted text-muted-foreground",
}

export default async function AdminDocumentosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? "1", 10))
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const supabase = await createClient()
  const { data: docs, count } = await supabase
    .from("arq_documentos")
    .select("id, titulo, tipo, publicado_em, arquivo_url", { count: "exact" })
    .order("publicado_em", { ascending: false })
    .range(from, to)

  const total = count ?? 0

  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Governo eclesiástico
          </p>
          <h1 className="font-serif text-[28px] font-bold">
            Documentos {total > 0 && <span className="text-muted-foreground text-[18px] font-normal">({total})</span>}
          </h1>
        </div>
        <Link
          href="/admin/documentos/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Novo documento
        </Link>
      </div>

      {docs && docs.length > 0 ? (
        <>
          <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
            <div className="divide-y divide-border">
              {docs.map(({ id, titulo, tipo, publicado_em, arquivo_url }) => {
                const data = new Date(publicado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
                return (
                  <div key={id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm ${tipoColor[tipo] ?? "bg-muted text-muted-foreground"}`}>
                          {tipo}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{data}</span>
                      </div>
                      <p className="text-[13px] font-medium truncate">{titulo}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {arquivo_url && (
                        <a href={arquivo_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" title="Baixar arquivo">
                          <IconDownload size={14} />
                        </a>
                      )}
                      <Link href={`/admin/documentos/${id}/editar`} className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <IconPencil size={14} />
                      </Link>
                      <form action={deleteDocumento.bind(null, id)}>
                        <button type="submit" className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" title="Excluir">
                          <IconTrash size={14} />
                        </button>
                      </form>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <Pagination page={page} total={total} pageSize={PAGE_SIZE} basePath="/admin/documentos" />
        </>
      ) : (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-12 text-center">
          <p className="text-[14px] font-semibold text-foreground">Nenhum documento cadastrado</p>
          <p className="text-[13px] text-muted-foreground mt-1">Clique em "Novo documento" para começar.</p>
        </div>
      )}
    </div>
  )
}
