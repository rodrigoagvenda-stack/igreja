import Link from "next/link"
import { IconPlus, IconPencil, IconTrash, IconCircleCheck, IconAlertCircle, IconPencil as IconDraft } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"
import { deleteNoticia } from "./actions"

export const metadata = { title: "Notícias" }

const statusConfig = {
  publicado: { label: "Publicado", icon: IconCircleCheck, cls: "bg-success/10 text-success" },
  rascunho:  { label: "Rascunho",  icon: IconDraft,       cls: "bg-muted text-muted-foreground" },
  revisao:   { label: "Em revisão", icon: IconAlertCircle, cls: "bg-warning/15 text-warning-foreground" },
}

export default async function AdminNoticiasPage() {
  const supabase = await createClient()
  const { data: noticias } = await supabase
    .from('arq_noticias')
    .select('id, titulo, categoria, status, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Conteúdo
          </p>
          <h1 className="font-serif text-[28px] font-bold">
            Notícias {noticias && noticias.length > 0 && <span className="text-muted-foreground text-[18px] font-normal">({noticias.length})</span>}
          </h1>
        </div>
        <Link
          href="/admin/noticias/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Nova notícia
        </Link>
      </div>

      {noticias && noticias.length > 0 ? (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="divide-y divide-border">
            {noticias.map(({ id, titulo, categoria, status, created_at }) => {
              const cfg = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.rascunho
              const data = new Date(created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
              return (
                <div key={id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">{titulo}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[11px] text-primary font-medium">{categoria}</span>
                      <span className="text-[11px] text-muted-foreground">{data}</span>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded-full shrink-0 ${cfg.cls}`}>
                    <cfg.icon size={10} />
                    {cfg.label}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      href={`/admin/noticias/${id}/editar`}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <IconPencil size={14} />
                    </Link>
                    <form action={deleteNoticia.bind(null, id)}>
                      <button
                        type="submit"
                        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Excluir"
                      >
                        <IconTrash size={14} />
                      </button>
                    </form>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-12 text-center">
          <p className="text-[14px] font-semibold text-foreground">Nenhuma notícia cadastrada</p>
          <p className="text-[13px] text-muted-foreground mt-1">Clique em "Nova notícia" para começar.</p>
        </div>
      )}
    </div>
  )
}
