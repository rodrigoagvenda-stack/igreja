import Link from "next/link"
import {
  IconNews, IconCalendar, IconBuildingChurch, IconUsers,
  IconFileText, IconPlus, IconArrowRight, IconTrendingUp,
  IconClock, IconCircleCheck, IconAlertCircle,
} from "@tabler/icons-react"

export const metadata = { title: "Dashboard" }

const stats = [
  { label: "Notícias publicadas",   value: "42",  sub: "+3 este mês",   icon: IconNews,           color: "text-blue-600",   bg: "bg-blue-50" },
  { label: "Eventos na agenda",     value: "8",   sub: "próximos 30 dias", icon: IconCalendar,    color: "text-amber-600",  bg: "bg-amber-50" },
  { label: "Paróquias cadastradas", value: "50",  sub: "20 municípios", icon: IconBuildingChurch, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Padres",                value: "12",  sub: "ativos",        icon: IconUsers,           color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Diáconos",              value: "8",   sub: "permanentes",   icon: IconUsers,           color: "text-rose-600",   bg: "bg-rose-50" },
  { label: "Seminaristas",          value: "8",   sub: "em formação",   icon: IconTrendingUp,      color: "text-cyan-600",   bg: "bg-cyan-50" },
  { label: "Documentos",            value: "27",  sub: "publicados",    icon: IconFileText,        color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Horários cadastrados",  value: "143", sub: "por local",     icon: IconClock,           color: "text-teal-600",   bg: "bg-teal-50" },
]

const quickActions = [
  { label: "Nova notícia",       href: "/admin/noticias/novo",       icon: IconNews },
  { label: "Novo evento",        href: "/admin/agenda/novo",         icon: IconCalendar },
  { label: "Novo documento",     href: "/admin/documentos/novo",     icon: IconFileText },
  { label: "Cadastrar padre",    href: "/admin/clero/padres/novo",   icon: IconUsers },
]

const recentNoticias = [
  { titulo: "Dom [Arcebispo] preside encontro de lideranças pastorais", status: "publicado", data: "28 mai 2025" },
  { titulo: "Semana de catequese reúne mais de 300 catequistas",        status: "publicado", data: "22 mai 2025" },
  { titulo: "Escola de Evangelização abre novas turmas para 2025",      status: "rascunho",  data: "05 mai 2025" },
  { titulo: "Calendário litúrgico do 2.º semestre é divulgado",         status: "revisao",   data: "18 mai 2025" },
]

const proximosEventos = [
  { titulo: "Ordenação Presbiteral Arquidiocesana", data: "08 Jun", local: "Catedral de Botucatu" },
  { titulo: "Encontro Regional de Catequistas",     data: "15 Jun", local: "Centro Pastoral" },
  { titulo: "Assembleia dos Párocos",               data: "22 Jun", local: "Cúria Metropolitana" },
]

const statusConfig = {
  publicado: { label: "Publicado", icon: IconCircleCheck, class: "text-emerald-600 bg-emerald-50" },
  rascunho:  { label: "Rascunho",  icon: IconAlertCircle, class: "text-muted-foreground bg-muted" },
  revisao:   { label: "Em revisão", icon: IconAlertCircle, class: "text-amber-600 bg-amber-50" },
}

export default function AdminDashboardPage() {
  const now = new Date()
  const hora = now.getHours()
  const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite"

  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-[13px] text-muted-foreground">{saudacao}, Administrador</p>
        <h1 className="font-serif text-[28px] font-bold text-foreground leading-tight">Dashboard</h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white border border-border rounded-xl p-5">
            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-[26px] font-bold text-foreground leading-none">{value}</p>
            <p className="text-[12px] font-medium text-foreground mt-1">{label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Ações rápidas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 bg-white border border-border rounded-lg px-4 py-3 text-[13px] font-medium hover:border-primary hover:text-primary hover:shadow-[0_2px_12px_rgba(39,79,160,.08)] transition-all group"
            >
              <span className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <Icon size={14} />
              </span>
              <span className="flex items-center gap-1">
                <IconPlus size={11} className="opacity-50" /> {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

        {/* Últimas notícias */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-[14px]">Últimas notícias</h2>
            <Link href="/admin/noticias" className="text-[12px] text-primary font-medium flex items-center gap-1 hover:gap-1.5 transition-all">
              Ver todas <IconArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentNoticias.map(({ titulo, status, data }) => {
              const cfg = statusConfig[status as keyof typeof statusConfig]
              return (
                <div key={titulo} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">{titulo}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{data}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[.05em] px-2 py-0.5 rounded flex-shrink-0 ${cfg.class}`}>
                    <cfg.icon size={10} /> {cfg.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Próximos eventos */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-[14px]">Próximos eventos</h2>
            <Link href="/admin/agenda" className="text-[12px] text-primary font-medium flex items-center gap-1 hover:gap-1.5 transition-all">
              Ver agenda <IconArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {proximosEventos.map(({ titulo, data, local }) => (
              <div key={titulo} className="flex items-start gap-3 px-5 py-3.5">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[14px] font-bold text-primary leading-none">{data.split(" ")[0]}</span>
                  <span className="text-[8px] text-primary/70 uppercase font-semibold">{data.split(" ")[1]}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium leading-snug">{titulo}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{local}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
