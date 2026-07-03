"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  IconLayoutDashboard, IconNews, IconCalendar, IconBuildingChurch,
  IconClock, IconUsers, IconFileText, IconSettings, IconLogout,
  IconChevronDown,
} from "@tabler/icons-react"
import { useState } from "react"

type Icon = React.ComponentType<{ size?: number; className?: string }>
type NavLink  = { label: string; href: string; icon: Icon; children?: never }
type NavGroup = { label: string; icon: Icon; children: { label: string; href: string }[]; href?: never }
type NavItem  = NavLink | NavGroup

function isGroup(item: NavItem): item is NavGroup {
  return Array.isArray((item as NavGroup).children)
}

const nav: NavItem[] = [
  { label: "Dashboard",         href: "/admin",            icon: IconLayoutDashboard },
  { label: "Notícias",          href: "/admin/noticias",   icon: IconNews },
  { label: "Agenda",            href: "/admin/agenda",     icon: IconCalendar },
  { label: "Paróquias",         href: "/admin/paroquias",  icon: IconBuildingChurch },
  { label: "Horários de Missa", href: "/admin/horarios",   icon: IconClock },
  {
    label: "Clero", icon: IconUsers,
    children: [
      { label: "Padres",       href: "/admin/clero/padres" },
      { label: "Diáconos",     href: "/admin/clero/diaconos" },
      { label: "Seminaristas", href: "/admin/clero/seminaristas" },
    ],
  },
  { label: "Documentos",    href: "/admin/documentos",    icon: IconFileText },
  { label: "Configurações", href: "/admin/configuracoes", icon: IconSettings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [cleroOpen, setCleroOpen] = useState(pathname.startsWith("/admin/clero"))

  return (
    <aside className="w-[220px] flex-shrink-0 bg-sidebar flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/Arqu de botucatu.svg"
            alt="Arquidiocese de Botucatu"
            width={32} height={32}
            className="brightness-0 invert opacity-90 w-8 h-8 object-contain"
          />
          <div>
            <p className="text-white text-[12px] font-semibold leading-tight">Arquidiocese</p>
            <p className="text-white/40 text-[10px] leading-tight">de Botucatu</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {nav.map((item) => {
          if (isGroup(item)) {
            const isActive = item.children.some(c => pathname.startsWith(c.href))
            return (
              <div key={item.label}>
                <button
                  onClick={() => setCleroOpen(v => !v)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 h-9 rounded-md text-[13px] font-medium transition-colors",
                    isActive ? "bg-white/12 text-white" : "text-white/60 hover:text-white hover:bg-white/8"
                  )}
                >
                  <item.icon size={16} className="flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <IconChevronDown size={12} className={cn("transition-transform opacity-50", cleroOpen && "rotate-180")} />
                </button>
                {cleroOpen && (
                  <div className="ml-6 mt-0.5 flex flex-col gap-0.5">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center h-8 px-3 rounded-md text-[12px] transition-colors",
                          pathname === child.href
                            ? "bg-white/12 text-white font-medium"
                            : "text-white/50 hover:text-white hover:bg-white/8"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
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
                "flex items-center gap-2.5 px-3 h-9 rounded-md text-[13px] font-medium transition-colors",
                isActive ? "bg-white/12 text-white" : "text-white/60 hover:text-white hover:bg-white/8"
              )}
            >
              <item.icon size={16} className="flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        <div className="flex items-center gap-2.5 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[11px] font-bold">A</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-[12px] font-medium truncate">Administrador</p>
            <p className="text-white/40 text-[10px] truncate">admin@arquidiocese.org.br</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-2.5 px-3 h-9 rounded-md text-[13px] text-white/50 hover:text-white hover:bg-white/8 transition-colors">
          <IconLogout size={15} />
          Sair
        </button>
      </div>
    </aside>
  )
}
