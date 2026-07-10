import Link from "next/link"
import {
  IconNews, IconCalendar, IconBuildingChurch, IconUsers,
  IconFileText, IconPlus, IconArrowRight,
  IconClock, IconCircleCheck, IconAlertCircle, IconPencil,
} from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"

export const metadata = { title: "Dashboard" }

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
      <span className="block w-4 h-0.5 bg-primary shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

const quickActions = [
  { label: "Nova notícia",    href: "/admin/noticias/novo",     icon: IconNews },
  { label: "Novo evento",     href: "/admin/agenda/novo",       icon: IconCalendar },
  { label: "Novo documento",  href: "/admin/documentos/novo",   icon: IconFileText },
  { label: "Cadastrar padre", href: "/admin/clero/padres/novo", icon: IconUsers },
]

const statusConfig = {
  publicado: { label: "Publicado", icon: IconCircleCheck, cls: "bg-success/10 text-success" },
  rascunho:  { label: "Rascunho",  icon: IconPencil,      cls: "bg-muted text-muted-foreground" },
  revisao:   { label: "Em revisão", icon: IconAlertCircle, cls: "bg-warning/15 text-warning-foreground" },
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: totalNoticias },
    { count: totalEventos },
    { count: totalParoquias },
    { count: totalPadres },
    { count: totalDiaconos },
    { count: totalSeminaristas },
    { count: totalDocumentos },
    { count: totalHorarios },
    { data: recentNoticias },
    { data: proximosEventos },
  ] = await Promise.all([
    supabase.from('arq_noticias').select('*', { count: 'exact', head: true }).eq('status', 'publicado'),
    supabase.from('arq_eventos').select('*', { count: 'exact', head: true }).gte('inicio', new Date().toISOString()),
    supabase.from('arq_paroquias').select('*', { count: 'exact', head: true }).eq('ativa', true),
    supabase.from('arq_padres').select('*', { count: 'exact', head: true }).eq('ativo', true),
    supabase.from('arq_diaconos').select('*', { count: 'exact', head: true }).eq('ativo', true),
    supabase.from('arq_seminaristas').select('*', { count: 'exact', head: true }).eq('ativo', true),
    supabase.from('arq_documentos').select('*', { count: 'exact', head: true }),
    supabase.from('arq_horarios_missa').select('*', { count: 'exact', head: true }),
    supabase.from('arq_noticias').select('titulo, status, created_at').order('created_at', { ascending: false }).limit(4),
    supabase.from('arq_eventos').select('titulo, local, inicio').gte('inicio', new Date().toISOString()).order('inicio').limit(3),
  ])

  const stats = [
    { label: "Notícias publicadas",   value: totalNoticias ?? 0,    sub: "publicadas",          icon: IconNews,           variant: "primary" },
    { label: "Eventos na agenda",     value: totalEventos ?? 0,     sub: "próximos",             icon: IconCalendar,       variant: "accent"  },
    { label: "Paróquias ativas",      value: totalParoquias ?? 0,   sub: "4 regiões pastorais",  icon: IconBuildingChurch, variant: "primary" },
    { label: "Padres",                value: totalPadres ?? 0,      sub: "ativos",               icon: IconUsers,          variant: "primary" },
    { label: "Diáconos",              value: totalDiaconos ?? 0,    sub: "permanentes",          icon: IconUsers,          variant: "accent"  },
    { label: "Seminaristas",          value: totalSeminaristas ?? 0, sub: "em formação",         icon: IconUsers,          variant: "primary" },
    { label: "Documentos",            value: totalDocumentos ?? 0,  sub: "publicados",           icon: IconFileText,       variant: "accent"  },
    { label: "Horários cadastrados",  value: totalHorarios ?? 0,    sub: "por local",            icon: IconClock,          variant: "primary" },
  ]

  const hora = new Date().getHours()
  const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite"

  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">

      {/* Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <SectionLabel>Painel administrativo</SectionLabel>
        <h1 className="font-serif text-[30px] font-bold text-foreground leading-tight">
          {saudacao}, Administrador
        </h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, sub, icon: Icon, variant }) => (
          <div
            key={label}
            className="bg-card ring-1 ring-foreground/10 rounded-xl p-5 hover:ring-primary/30 hover:shadow-sm transition-all"
          >
            <div className={[
              "w-8 h-8 rounded-lg flex items-center justify-center mb-4",
              variant === "accent" ? "bg-accent/15 text-foreground" : "bg-primary/10 text-primary",
            ].join(" ")}>
              <Icon size={16} />
            </div>
            <p className="font-serif text-[28px] font-bold text-foreground leading-none">{value}</p>
            <p className="text-[12px] font-semibold text-foreground mt-1.5">{label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-10">
        <div className="flex items-end justify-between pb-4 border-b border-border mb-5">
          <div>
            <SectionLabel>Criar novo</SectionLabel>
            <h2 className="font-serif text-[20px] font-bold">Ações rápidas</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 bg-card ring-1 ring-foreground/10 rounded-xl px-4 py-3.5 text-[13px] font-medium hover:ring-primary hover:shadow-sm transition-all"
            >
              <span className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon size={14} />
              </span>
              <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                <IconPlus size={11} className="opacity-40" />
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

        {/* Últimas notícias */}
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <SectionLabel>Conteúdo</SectionLabel>
              <h2 className="font-serif text-[16px] font-bold leading-tight">Últimas notícias</h2>
            </div>
            <Link
              href="/admin/noticias"
              className="text-[12px] text-primary font-medium flex items-center gap-1 hover:gap-1.5 transition-all"
            >
              Ver todas <IconArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentNoticias && recentNoticias.length > 0 ? recentNoticias.map(({ titulo, status, created_at }) => {
              const cfg = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.rascunho
              const data = new Date(created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
              return (
                <div key={titulo} className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">{titulo}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{data}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded-full shrink-0 ${cfg.cls}`}>
                    <cfg.icon size={10} />
                    {cfg.label}
                  </span>
                </div>
              )
            }) : (
              <div className="px-5 py-6 text-center text-[13px] text-muted-foreground">Nenhuma notícia cadastrada</div>
            )}
          </div>
        </div>

        {/* Próximos eventos */}
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <SectionLabel>Agenda</SectionLabel>
              <h2 className="font-serif text-[16px] font-bold leading-tight">Próximos eventos</h2>
            </div>
            <Link
              href="/admin/agenda"
              className="text-[12px] text-primary font-medium flex items-center gap-1 hover:gap-1.5 transition-all"
            >
              Ver agenda <IconArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {proximosEventos && proximosEventos.length > 0 ? proximosEventos.map(({ titulo, local, inicio }) => {
              const d = new Date(inicio)
              const dia = d.toLocaleDateString('pt-BR', { day: '2-digit' })
              const mes = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
              return (
                <div key={titulo} className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex flex-col items-center justify-center shrink-0">
                    <span className="font-serif text-[15px] font-bold text-primary leading-none">{dia}</span>
                    <span className="text-[8px] text-primary/60 uppercase font-semibold tracking-wide">{mes}</span>
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[13px] font-semibold leading-snug truncate">{titulo}</p>
                    {local && <p className="text-[11px] text-muted-foreground mt-0.5">{local}</p>}
                  </div>
                </div>
              )
            }) : (
              <div className="px-5 py-6 text-center text-[13px] text-muted-foreground">Nenhum evento próximo</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
