"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { signOut } from "@/app/admin/actions"

type IconProps = { active?: boolean }

function DashboardIcon({ active }: IconProps) {
  const c = active ? "#FFFFFF" : "#FFFFFF99"
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <rect width="7" height="9" x="3" y="3" rx="1" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect width="7" height="5" x="14" y="3" rx="1" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect width="7" height="9" x="14" y="12" rx="1" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect width="7" height="5" x="3" y="16" rx="1" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NoticiasIcon({ active }: IconProps) {
  const c = active ? "#FFFFFF" : "#FFFFFF99"
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 14h-8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 18h-5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 6h8v4h-8V6Z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AgendaIcon({ active }: IconProps) {
  const c = active ? "#FFFFFF" : "#FFFFFF99"
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <rect width="18" height="18" x="3" y="4" rx="2" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ParoquiasIcon({ active }: IconProps) {
  const c = active ? "#FFFFFF" : "#FFFFFF99"
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path d="M10 9h4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7v5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 22v-4a2 2 0 0 0-4 0v4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HorariosIcon({ active }: IconProps) {
  const c = active ? "#FFFFFF" : "#FFFFFF99"
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="12 6 12 12 16 14" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CleroIcon({ active }: IconProps) {
  const c = active ? "#FFFFFF" : "#FFFFFF99"
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DocumentosIcon({ active }: IconProps) {
  const c = active ? "#FFFFFF" : "#FFFFFF99"
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 9H8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 13H8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17H8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ConfiguracoesIcon({ active }: IconProps) {
  const c = active ? "#FFFFFF" : "#FFFFFF99"
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#FFFFFF99" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 17 21 12 16 7" stroke="#FFFFFF99" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" x2="9" y1="12" y2="12" stroke="#FFFFFF99" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0 transition-transform", open && "rotate-180")}>
      <path d="m6 9 6 6 6-6" stroke="#FFFFFF99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type NavLink  = { label: string; href: string; Icon: typeof DashboardIcon; children?: never }
type NavGroup = { label: string; Icon: typeof DashboardIcon; children: { label: string; href: string }[]; href?: never }
type NavItem  = NavLink | NavGroup

function isGroup(item: NavItem): item is NavGroup {
  return Array.isArray((item as NavGroup).children)
}

const nav: NavItem[] = [
  { label: "Dashboard",         href: "/admin",            Icon: DashboardIcon },
  { label: "Notícias",          href: "/admin/noticias",   Icon: NoticiasIcon },
  { label: "Agenda",            href: "/admin/agenda",     Icon: AgendaIcon },
  { label: "Paróquias",         href: "/admin/paroquias",  Icon: ParoquiasIcon },
  { label: "Horários de Missa", href: "/admin/horarios",   Icon: HorariosIcon },
  {
    label: "Clero", Icon: CleroIcon,
    children: [
      { label: "Padres",       href: "/admin/clero/padres" },
      { label: "Diáconos",     href: "/admin/clero/diaconos" },
      { label: "Seminaristas", href: "/admin/clero/seminaristas" },
    ],
  },
  { label: "Documentos",    href: "/admin/documentos",    Icon: DocumentosIcon },
  { label: "Configurações", href: "/admin/configuracoes", Icon: ConfiguracoesIcon },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [cleroOpen, setCleroOpen] = useState(pathname.startsWith("/admin/clero"))

  return (
    <aside className="w-[232px] flex-shrink-0 bg-[#16305E] flex flex-col h-full">
      {/* Logo */}
      <Link
        href="/admin"
        className="flex items-center justify-center border-b border-white/[0.08] pt-5 pb-[18px] px-5"
      >
        <Image
          src="/Arqu de botucatu.svg"
          alt="Arquidiocese de Botucatu"
          width={180}
          height={63}
          className="w-[180px] h-[63px] object-contain"
        />
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3.5 flex flex-col gap-0.5">
        {nav.map((item) => {
          if (isGroup(item)) {
            const isActive = item.children.some(c => pathname.startsWith(c.href))
            return (
              <div key={item.label}>
                <button
                  onClick={() => setCleroOpen(v => !v)}
                  className="w-full flex items-center gap-2.5 py-[9px] px-3 rounded-lg text-[13px] font-semibold text-white/70"
                >
                  <item.Icon active={isActive} />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronIcon open={cleroOpen} />
                </button>
                {cleroOpen && (
                  <div className="flex flex-col pl-[35px]">
                    {item.children.map(child => {
                      const childActive = pathname === child.href
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "py-[7px] px-2.5 text-[12.5px] font-medium",
                            childActive ? "text-white" : "text-white/45"
                          )}
                        >
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 py-[9px] px-3 rounded-lg text-[13px]",
                isActive ? "bg-white/10 font-bold text-white" : "font-semibold text-white/70"
              )}
            >
              <item.Icon active={isActive} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div>
        <div className="flex items-center gap-2.5 border-t border-white/[0.08] py-3.5 px-5">
          <div className="flex items-center justify-center flex-shrink-0 w-[30px] h-[30px] rounded-full bg-[#C9A84C]">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-white truncate">Administrador</p>
            <p className="text-[10px] text-white/50 truncate">admin@arquidiocesebotucatu.org.br</p>
          </div>
        </div>
        <form action={signOut} className="pt-3 pb-[18px] px-5">
          <button type="submit" className="w-full flex items-center gap-2 text-[12.5px] font-semibold text-white/60">
            <LogoutIcon />
            Sair
          </button>
        </form>
      </div>
    </aside>
  )
}
