import Link from "next/link"
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"
import { deleteDiacono } from "./actions"

export const metadata = { title: "Diáconos" }

export default async function AdminDiaconosPage() {
  const supabase = await createClient()
  const { data: diaconos } = await supabase
    .from('arq_diaconos')
    .select('id, nome, nascimento, ordenacao, ativo, arq_paroquias(nome, cidade)')
    .order('nome')

  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Clero
          </p>
          <h1 className="font-serif text-[28px] font-bold">
            Diáconos Permanentes {diaconos && diaconos.length > 0 && <span className="text-muted-foreground text-[18px] font-normal">({diaconos.length})</span>}
          </h1>
        </div>
        <Link
          href="/admin/clero/diaconos/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Cadastrar diácono
        </Link>
      </div>

      {diaconos && diaconos.length > 0 ? (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-5 py-3 border-b border-border bg-muted/40">
            <span>Nome</span>
            <span className="px-4 text-center">Nascimento</span>
            <span className="px-4 text-center">Ordenação</span>
            <span className="w-8" />
            <span className="w-8" />
          </div>
          <div className="divide-y divide-border">
            {diaconos.map((dc) => {
              const paroquia = dc.arq_paroquias as { nome: string; cidade: string } | null
              const nasc = dc.nascimento ? new Date(dc.nascimento).toLocaleDateString('pt-BR') : '—'
              const ord = dc.ordenacao ? new Date(dc.ordenacao).toLocaleDateString('pt-BR') : '—'
              return (
                <div key={dc.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center px-5 py-3.5 hover:bg-muted/40 transition-colors">
                  <div>
                    <p className="text-[13px] font-medium">{dc.nome}</p>
                    {paroquia && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">{paroquia.nome} — {paroquia.cidade}</p>
                    )}
                  </div>
                  <span className="text-[12px] text-muted-foreground px-4 text-center">{nasc}</span>
                  <span className="text-[12px] text-muted-foreground px-4 text-center">{ord}</span>
                  <Link
                    href={`/admin/clero/diaconos/${dc.id}/editar`}
                    className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <IconPencil size={14} />
                  </Link>
                  <form action={deleteDiacono.bind(null, dc.id)}>
                    <button
                      type="submit"
                      className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Excluir"
                    >
                      <IconTrash size={14} />
                    </button>
                  </form>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-12 text-center">
          <p className="text-[14px] font-semibold text-foreground">Nenhum diácono cadastrado</p>
          <p className="text-[13px] text-muted-foreground mt-1">Clique em "Cadastrar diácono" para começar.</p>
        </div>
      )}
    </div>
  )
}
