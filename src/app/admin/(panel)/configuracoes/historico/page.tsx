import { IconArrowLeft, IconHistory } from "@tabler/icons-react"
import Link from "next/link"
import { requireRole, adminClient } from "@/lib/supabase/admin-guard"

export const metadata = { title: "Histórico de atividades" }

const LIMITE = 300
const FUSO = "America/Sao_Paulo"

const VERBO: Record<string, string> = { create: "criou", update: "editou", delete: "excluiu" }

const COR: Record<string, string> = {
  create: "text-[#1D7A4C] bg-[#1D7A4C]/10",
  update: "text-[#274FA0] bg-[#274FA0]/10",
  delete: "text-[#B42318] bg-[#B42318]/10",
  login: "text-[#5A5753] bg-[#F5F3EF]",
  falha: "text-[#9A7A1F] bg-[#C9A84C]/15",
}

const SELO: Record<string, string> = { create: "Criou", update: "Editou", delete: "Excluiu", login: "Entrou", falha: "Falhou" }

// entidade do log -> [como aparece no texto, tabela, coluna com o nome]
const ENTIDADE: Record<string, [string, string | null, string | null]> = {
  paroquia: ["a paróquia", "arq_paroquias", "nome"],
  horarios_paroquia: ["os horários da paróquia", "arq_paroquias", "nome"],
  padre: ["o padre", "arq_padres", "nome"],
  diacono: ["o diácono", "arq_diaconos", "nome"],
  seminarista: ["o seminarista", "arq_seminaristas", "nome"],
  noticia: ["a notícia", "arq_noticias", "titulo"],
  evento: ["o evento", "arq_eventos", "titulo"],
  documento: ["o documento", "arq_documentos", "titulo"],
  site_config: ["as configurações do site", null, null],
  usuario_admin: ["o acesso de", "arq_usuarios_admin", "nome"],
}

const PAPEL: Record<string, string> = { admin: "Administrador", editor: "Editor", leitura: "Somente leitura" }

type Linha = {
  chave: string
  quando: string
  tipo: keyof typeof SELO
  quem: string
  texto: string
  extra: string | null
  ip: string | null
}

function dataHora(iso: string) {
  const d = new Date(iso)
  const data = d.toLocaleDateString("pt-BR", { timeZone: FUSO, day: "2-digit", month: "2-digit", year: "numeric" })
  const hora = d.toLocaleTimeString("pt-BR", { timeZone: FUSO, hour: "2-digit", minute: "2-digit" })
  return { data, hora }
}

function texto(v: unknown) {
  return typeof v === "string" && v.trim() ? v.trim() : null
}

export default async function HistoricoPage() {
  await requireRole(["admin"])
  // Leitura pela chave de serviço, depois de confirmar acima que é admin com 2FA.
  const sb = adminClient()

  const [{ data: registros }, { data: logins }, { data: usuarios }] = await Promise.all([
    sb.from("arq_audit_log").select("*").order("criado_em", { ascending: false }).limit(LIMITE),
    sb.from("arq_login_attempts").select("*").order("criado_em", { ascending: false }).limit(LIMITE),
    sb.from("arq_usuarios_admin").select("user_id, nome, email"),
  ])

  const nomePorId = new Map((usuarios ?? []).map(u => [u.user_id, u.nome]))
  const nomePorEmail = new Map((usuarios ?? []).map(u => [u.email.toLowerCase(), u.nome]))

  // Nome atual de cada item citado (o que foi excluído usa o nome guardado no próprio log).
  const idsPorTabela = new Map<string, Set<string>>()
  for (const r of registros ?? []) {
    const [, tabela] = ENTIDADE[r.entidade] ?? []
    if (tabela && r.entidade_id && r.acao !== "delete") {
      if (!idsPorTabela.has(tabela)) idsPorTabela.set(tabela, new Set())
      idsPorTabela.get(tabela)!.add(r.entidade_id)
    }
  }
  const nomeItem = new Map<string, string>()
  await Promise.all(
    [...idsPorTabela].map(async ([tabela, ids]) => {
      const coluna = Object.values(ENTIDADE).find(([, t]) => t === tabela)![2]!
      const idCol = tabela === "arq_usuarios_admin" ? "user_id" : "id"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (sb.from(tabela as any) as any).select(`${idCol}, ${coluna}`).in(idCol, [...ids])
      for (const linha of (data ?? []) as Record<string, string>[]) nomeItem.set(`${tabela}:${linha[idCol]}`, linha[coluna])
    })
  )

  const linhas: Linha[] = []

  for (const r of registros ?? []) {
    const det = (r.detalhes ?? {}) as Record<string, unknown>
    const [rotulo, tabela, coluna] = ENTIDADE[r.entidade] ?? [r.entidade, null, null]
    const nome =
      (tabela && r.entidade_id && nomeItem.get(`${tabela}:${r.entidade_id}`)) ||
      (coluna && texto(det[coluna])) ||
      texto(det.nome) || texto(det.titulo) || texto(det.email)

    let frase = `${VERBO[r.acao] ?? r.acao} ${rotulo}${nome ? ` ${nome}` : ""}`
    let extra: string | null = null

    if (r.entidade === "usuario_admin") {
      if (det.senha_criada_no_convite) frase = "aceitou o convite e criou a senha"
      else if (det.reenvio_convite) frase = `reenviou o convite de ${nome ?? "um usuário"}`
      else if (r.acao === "create") frase = `convidou ${nome ?? texto(det.email) ?? "um usuário"}`
      else if (r.acao === "delete") frase = `removeu o acesso de ${nome ?? "um usuário"}`
      else if (det.papel) frase = `mudou o nível de acesso de ${nome ?? "um usuário"}`
      if (typeof det.papel === "string") extra = `Nível: ${PAPEL[det.papel] ?? det.papel}`
    } else if (r.entidade === "site_config" && Array.isArray(det.campos) && det.campos.length) {
      extra = `Campos: ${det.campos.join(", ")}`
    } else if (r.entidade === "noticia" && typeof det.status === "string") {
      extra = det.status === "publicado" ? "Publicada" : det.status === "revisao" ? "Em revisão" : "Rascunho"
    }

    linhas.push({
      chave: `a${r.id}`,
      quando: r.criado_em,
      tipo: (r.acao in SELO ? r.acao : "update") as Linha["tipo"],
      quem: (r.user_id && nomePorId.get(r.user_id)) || r.user_email,
      texto: frase,
      extra,
      ip: r.ip,
    })
  }

  for (const l of logins ?? []) {
    linhas.push({
      chave: `l${l.id}`,
      quando: l.criado_em,
      tipo: l.sucesso ? "login" : "falha",
      quem: nomePorEmail.get(l.email.toLowerCase()) ?? l.email,
      texto: l.sucesso ? "entrou no painel" : "errou a senha ao tentar entrar",
      extra: null,
      ip: l.ip,
    })
  }

  linhas.sort((a, b) => b.quando.localeCompare(a.quando))
  const visiveis = linhas.slice(0, LIMITE)

  // Agrupa por dia (no horário de Brasília).
  const dias: { data: string; itens: Linha[] }[] = []
  for (const l of visiveis) {
    const { data } = dataHora(l.quando)
    if (dias.at(-1)?.data !== data) dias.push({ data, itens: [] })
    dias.at(-1)!.itens.push(l)
  }

  return (
    <div className="flex flex-col gap-5 min-w-0">
      <div className="pt-7 pb-6 px-5 lg:px-9 border-b border-[#E2DFD9]">
        <Link href="/admin/configuracoes" className="inline-flex items-center gap-1.5 text-[12px] text-[#8A877F] hover:text-[#1A1A1A] transition-colors mb-3">
          <IconArrowLeft size={14} />
          Voltar para Configurações
        </Link>
        <h1 className="font-serif text-[26px] font-bold flex items-center gap-2">
          <IconHistory size={22} className="text-[#274FA0]" />
          Histórico de atividades
        </h1>
        <p className="text-[13px] text-[#8A877F] mt-1">
          Quem entrou no painel e o que cada pessoa criou, editou ou excluiu. Horário de Brasília.
        </p>
      </div>

      <div className="flex flex-col gap-5 max-w-[820px] w-full px-5 lg:px-10 pb-10">
        {dias.length === 0 && (
          <div className="bg-white border border-[#ECEAE5] rounded-xl px-5 py-10 text-center text-[13px] text-[#8A877F]">
            Nenhuma atividade registrada ainda.
          </div>
        )}

        {dias.map(dia => (
          <section key={dia.data}>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8A877F] mb-2">{dia.data}</h2>
            <div className="bg-white border border-[#ECEAE5] rounded-xl overflow-clip">
              {dia.itens.map(l => (
                <div key={l.chave} className="flex items-start gap-3 px-5 py-3.5 border-b border-[#ECEAE5] last:border-0">
                  <span className="text-[12px] tabular-nums text-[#8A877F] w-[42px] shrink-0 pt-0.5">{dataHora(l.quando).hora}</span>
                  <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full shrink-0 w-[58px] text-center ${COR[l.tipo]}`}>
                    {SELO[l.tipo]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#1A1A1A] leading-5">
                      <span className="font-semibold">{l.quem}</span> {l.texto}
                    </p>
                    {l.extra && <p className="text-[12px] text-[#8A877F]">{l.extra}</p>}
                  </div>
                  {l.ip && <span className="hidden sm:block text-[11px] text-[#8A877F]/80 font-mono shrink-0 pt-0.5">{l.ip}</span>}
                </div>
              ))}
            </div>
          </section>
        ))}

        {linhas.length > LIMITE && (
          <p className="text-center text-[12px] text-[#8A877F]">Mostrando as {LIMITE} atividades mais recentes.</p>
        )}
      </div>
    </div>
  )
}
