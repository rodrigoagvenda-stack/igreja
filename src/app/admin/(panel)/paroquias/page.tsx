import Link from "next/link"
import { IconPlus, IconPencil, IconTrash, IconMapPin } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"
import { deleteParoquia } from "./actions"

export const metadata = { title: "Paróquias" }

const regiaoColor: Record<string, string> = {
  RP1: "bg-primary/10 text-primary",
  RP2: "bg-accent/20 text-foreground",
  RP3: "bg-success/10 text-success",
  RP4: "bg-warning/15 text-warning-foreground",
}

export default async function AdminParoquiasPage() {
  const supabase = await createClient()
  const { data: paroquias } = await supabase
    .from('arq_paroquias')
    .select('id, nome, cidade, regiao_pastoral, ativa')
    .order('nome')

  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Estrutura pastoral
          </p>
          <h1 className="font-serif text-[28px] font-bold">
            Paróquias {paroquias && paroquias.length > 0 && <span className="text-muted-foreground text-[18px] font-normal">({paroquias.length})</span>}
          </h1>
        </div>
        <Link
          href="/admin/paroquias/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Nova paróquia
        </Link>
      </div>

      {paroquias && paroquias.length > 0 ? (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-5 py-3 border-b border-border bg-muted/40">
            <span>Paróquia</span>
            <span className="text-center px-4">Região</span>
            <span className="text-center px-4">Status</span>
            <span className="w-8" />
            <span className="w-8" />
          </div>
          <div className="divide-y divide-border">
            {paroquias.map(({ id, nome, cidade, regiao_pastoral, ativa }) => (
              <div key={id} className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center px-5 py-3.5 hover:bg-muted/40 transition-colors">
                <div>
                  <p className="text-[13px] font-medium">{nome}</p>
                  <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                    <IconMapPin size={10} />
                    {cidade}
                  </p>
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-[.05em] px-2.5 py-0.5 rounded-full mx-4 ${regiaoColor[regiao_pastoral] ?? 'bg-muted text-muted-foreground'}`}>
                  {regiao_pastoral}
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded-full mx-4 ${ativa ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                  {ativa ? 'Ativa' : 'Inativa'}
                </span>
                <Link
                  href={`/admin/paroquias/${id}/editar`}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <IconPencil size={14} />
                </Link>
                <form action={deleteParoquia.bind(null, id)}>
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    title="Excluir"
                  >
                    <IconTrash size={14} />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-12 text-center">
          <p className="text-[14px] font-semibold text-foreground">Nenhuma paróquia cadastrada</p>
          <p className="text-[13px] text-muted-foreground mt-1">Clique em "Nova paróquia" para começar.</p>
        </div>
      )}
    </div>
  )
}
