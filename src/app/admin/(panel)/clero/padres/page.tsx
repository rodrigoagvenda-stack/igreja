import Link from "next/link"
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"
import { deletePadre } from "./actions"
import { Pagination } from "@/components/admin/Pagination"

export const metadata = { title: "Padres" }

const PAGE_SIZE = 20

export default async function AdminPadresPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? "1", 10))
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const supabase = await createClient()
  const { data: padres, count } = await supabase
    .from("arq_padres")
    .select("id, nome, nascimento, ordenacao, ativo, arq_paroquias(nome, cidade)", { count: "exact" })
    .order("nome")
    .range(from, to)

  const total = count ?? 0

  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Clero
          </p>
          <h1 className="font-serif text-[28px] font-bold">
            Padres {total > 0 && <span className="text-muted-foreground text-[18px] font-normal">({total})</span>}
          </h1>
        </div>
        <Link
          href="/admin/clero/padres/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Cadastrar padre
        </Link>
      </div>

      {padres && padres.length > 0 ? (
        <>
          <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-5 py-3 border-b border-border bg-muted/40">
              <span>Padre</span>
              <span className="px-4 text-center">Nascimento</span>
              <span className="px-4 text-center">Ordenação</span>
              <span className="w-8" />
              <span className="w-8" />
            </div>
            <div className="divide-y divide-border">
              {padres.map((padre) => {
                const paroquia = padre.arq_paroquias as { nome: string; cidade: string } | null
                const nasc = padre.nascimento ? new Date(padre.nascimento).toLocaleDateString("pt-BR") : "—"
                const ord = padre.ordenacao ? new Date(padre.ordenacao).toLocaleDateString("pt-BR") : "—"
                return (
                  <div key={padre.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center px-5 py-3.5 hover:bg-muted/40 transition-colors">
                    <div>
                      <p className="text-[13px] font-medium">{padre.nome}</p>
                      {paroquia && <p className="text-[11px] text-muted-foreground mt-0.5">{paroquia.nome} — {paroquia.cidade}</p>}
                      {!padre.ativo && <span className="text-[10px] text-muted-foreground">(inativo)</span>}
                    </div>
                    <span className="text-[12px] text-muted-foreground px-4 text-center">{nasc}</span>
                    <span className="text-[12px] text-muted-foreground px-4 text-center">{ord}</span>
                    <Link href={`/admin/clero/padres/${padre.id}/editar`} className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <IconPencil size={14} />
                    </Link>
                    <form action={deletePadre.bind(null, padre.id)}>
                      <button type="submit" className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" title="Excluir">
                        <IconTrash size={14} />
                      </button>
                    </form>
                  </div>
                )
              })}
            </div>
          </div>
          <Pagination page={page} total={total} pageSize={PAGE_SIZE} basePath="/admin/clero/padres" />
        </>
      ) : (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-12 text-center">
          <p className="text-[14px] font-semibold text-foreground">Nenhum padre cadastrado</p>
          <p className="text-[13px] text-muted-foreground mt-1">Clique em "Cadastrar padre" para começar.</p>
        </div>
      )}
    </div>
  )
}
