import Link from "next/link"
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"
import { deleteSeminarista } from "./actions"
import { Pagination } from "@/components/admin/Pagination"

export const metadata = { title: "Seminaristas" }

const PAGE_SIZE = 20

const anoColor: Record<string, string> = {
  "Propedêutico":  "bg-muted text-muted-foreground",
  "1.º Filosofia": "bg-primary/10 text-primary",
  "2.º Filosofia": "bg-primary/10 text-primary",
  "3.º Filosofia": "bg-primary/10 text-primary",
  "1.º Teologia":  "bg-accent/20 text-foreground",
  "2.º Teologia":  "bg-accent/20 text-foreground",
  "3.º Teologia":  "bg-accent/20 text-foreground",
  "4.º Teologia":  "bg-accent/20 text-foreground",
}

export default async function AdminSeminaristasPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? "1", 10))
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const supabase = await createClient()
  const { data: seminaristas, count } = await supabase
    .from("arq_seminaristas")
    .select("id, nome, nascimento, ano_formacao, ativo, arq_paroquias(nome, cidade)", { count: "exact" })
    .order("ano_formacao")
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
            Seminaristas {total > 0 && <span className="text-muted-foreground text-[18px] font-normal">({total})</span>}
          </h1>
        </div>
        <Link
          href="/admin/clero/seminaristas/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Cadastrar seminarista
        </Link>
      </div>

      {seminaristas && seminaristas.length > 0 ? (
        <>
          <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-5 py-3 border-b border-border bg-muted/40">
              <span>Nome</span>
              <span className="px-4 text-center">Nascimento</span>
              <span className="px-4 text-center">Ano</span>
              <span className="w-8" />
              <span className="w-8" />
            </div>
            <div className="divide-y divide-border">
              {seminaristas.map((sem) => {
                const paroquia = sem.arq_paroquias as { nome: string; cidade: string } | null
                const nasc = sem.nascimento ? new Date(sem.nascimento).toLocaleDateString("pt-BR") : "—"
                return (
                  <div key={sem.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center px-5 py-3.5 hover:bg-muted/40 transition-colors">
                    <div>
                      <p className="text-[13px] font-medium">{sem.nome}</p>
                      {paroquia && <p className="text-[11px] text-muted-foreground mt-0.5">{paroquia.nome} — {paroquia.cidade}</p>}
                    </div>
                    <span className="text-[12px] text-muted-foreground px-4 text-center">{nasc}</span>
                    <span className={`text-[10px] font-semibold uppercase tracking-[.04em] px-2 py-0.5 rounded-full mx-4 text-center whitespace-nowrap ${anoColor[sem.ano_formacao] ?? "bg-muted text-muted-foreground"}`}>
                      {sem.ano_formacao}
                    </span>
                    <Link href={`/admin/clero/seminaristas/${sem.id}/editar`} className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <IconPencil size={14} />
                    </Link>
                    <form action={deleteSeminarista.bind(null, sem.id)}>
                      <button type="submit" className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" title="Excluir">
                        <IconTrash size={14} />
                      </button>
                    </form>
                  </div>
                )
              })}
            </div>
          </div>
          <Pagination page={page} total={total} pageSize={PAGE_SIZE} basePath="/admin/clero/seminaristas" />
        </>
      ) : (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-12 text-center">
          <p className="text-[14px] font-semibold text-foreground">Nenhum seminarista cadastrado</p>
          <p className="text-[13px] text-muted-foreground mt-1">Clique em "Cadastrar seminarista" para começar.</p>
        </div>
      )}
    </div>
  )
}
