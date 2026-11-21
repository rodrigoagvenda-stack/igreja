import { IconArrowLeft, IconHistory } from "@tabler/icons-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { requireRole } from "@/lib/supabase/admin-guard"

export const metadata = { title: "Histórico de atividades" }

const ACAO_LABEL: Record<string, string> = {
  create: "Criou",
  update: "Editou",
  delete: "Excluiu",
}

const ACAO_COR: Record<string, string> = {
  create: "text-success bg-success/10",
  update: "text-primary bg-primary/10",
  delete: "text-destructive bg-destructive/10",
}

const ENTIDADE_LABEL: Record<string, string> = {
  paroquia: "paróquia",
  padre: "padre",
  diacono: "diácono",
  seminarista: "seminarista",
  noticia: "notícia",
  evento: "evento",
  documento: "documento",
  site_config: "configurações do site",
  horarios_paroquia: "horários de uma paróquia",
}

export default async function HistoricoPage() {
  await requireRole(['admin'])
  const supabase = await createClient()

  const { data: registros } = await supabase
    .from('arq_audit_log')
    .select('*')
    .order('criado_em', { ascending: false })
    .limit(200)

  return (
    <div className="p-8 max-w-[900px] w-full mx-auto">
      <div className="mb-8 pb-6 border-b border-border">
        <Link href="/admin/configuracoes" className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-3">
          <IconArrowLeft size={14} />
          Voltar para Configurações
        </Link>
        <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
          <span className="block w-4 h-0.5 bg-primary shrink-0" />
          Segurança
        </p>
        <h1 className="font-serif text-[28px] font-bold flex items-center gap-2">
          <IconHistory size={24} className="text-primary" />
          Histórico de atividades
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Registro de quem criou, editou ou excluiu algo no painel — últimos 200 eventos.
        </p>
      </div>

      <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
        {(!registros || registros.length === 0) && (
          <div className="px-5 py-10 text-center text-[13px] text-muted-foreground">
            Nenhuma atividade registrada ainda.
          </div>
        )}

        {registros?.map((r) => (
          <div key={r.id} className="flex items-start gap-4 px-5 py-4 border-b border-border last:border-0">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${ACAO_COR[r.acao] ?? "bg-muted text-muted-foreground"}`}>
              {ACAO_LABEL[r.acao] ?? r.acao}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px]">
                <span className="font-semibold">{r.user_email}</span>
                {" "}
                {ACAO_LABEL[r.acao]?.toLowerCase() ?? r.acao}
                {" "}
                <span className="font-medium">{ENTIDADE_LABEL[r.entidade] ?? r.entidade}</span>
                {r.entidade_id && <span className="text-muted-foreground"> · {r.entidade_id.slice(0, 8)}</span>}
              </p>
              {r.detalhes != null && (
                <p className="text-[12px] text-muted-foreground truncate">
                  {Object.entries(r.detalhes as Record<string, unknown>)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(" · ")}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="text-[12px] text-muted-foreground">
                {new Date(r.criado_em).toLocaleDateString("pt-BR")} · {new Date(r.criado_em).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </p>
              {r.ip && <p className="text-[11px] text-muted-foreground/70 font-mono">{r.ip}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
