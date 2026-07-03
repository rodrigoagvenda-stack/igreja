import Link from "next/link"
import { IconPlus, IconPencil, IconTrash, IconCircleCheck, IconAlertCircle, IconPencil as IconDraft } from "@tabler/icons-react"

export const metadata = { title: "Notícias" }

const noticias = [
  { id: 1, titulo: "Dom Maurício Grotto de Camargo preside encontro de lideranças pastorais", categoria: "Pastoral",      status: "publicado", data: "28 mai 2025" },
  { id: 2, titulo: "Semana de catequese reúne mais de 300 catequistas",                        categoria: "Formação",      status: "publicado", data: "22 mai 2025" },
  { id: 3, titulo: "Escola de Evangelização abre novas turmas para 2025",                      categoria: "Evangelização", status: "rascunho",  data: "05 mai 2025" },
  { id: 4, titulo: "Calendário litúrgico do 2.º semestre é divulgado",                         categoria: "Litúrgico",     status: "revisao",   data: "18 mai 2025" },
  { id: 5, titulo: "Nomeação de novo pároco para a Paróquia São José em Botucatu",             categoria: "Institucional", status: "publicado", data: "25 abr 2025" },
  { id: 6, titulo: "Retiro quaresmal de padres na Casa de Espiritualidade",                    categoria: "Clero",         status: "publicado", data: "10 abr 2025" },
]

const statusConfig = {
  publicado: { label: "Publicado", icon: IconCircleCheck, cls: "bg-success/10 text-success" },
  rascunho:  { label: "Rascunho",  icon: IconDraft,       cls: "bg-muted text-muted-foreground" },
  revisao:   { label: "Em revisão", icon: IconAlertCircle, cls: "bg-warning/15 text-warning-foreground" },
}

export default function AdminNoticiasPage() {
  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Conteúdo
          </p>
          <h1 className="font-serif text-[28px] font-bold">Notícias</h1>
        </div>
        <Link
          href="/admin/noticias/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Nova notícia
        </Link>
      </div>

      <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {noticias.map(({ id, titulo, categoria, status, data }) => {
            const cfg = statusConfig[status as keyof typeof statusConfig]
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
                  <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    <IconPencil size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <IconTrash size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
