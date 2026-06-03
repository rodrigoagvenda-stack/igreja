"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "./navigation"

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar — Fixed */}
      <aside className="w-64 border-r border-border bg-sidebar fixed top-0 left-0 h-screen overflow-y-auto flex flex-col">
        {/* Brand */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/styleguide" className="flex flex-col gap-1 group">
            <span className="text-xs font-semibold text-sidebar-ring uppercase tracking-widest">
              Arquidiocese
            </span>
            <span className="font-serif text-lg font-bold text-sidebar-foreground leading-tight group-hover:text-sidebar-ring transition-colors">
              Design System
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm transition-colors",
                        pathname === item.href
                          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {section.items.length === 0 && (
                  <li className="px-3 py-2 text-xs text-sidebar-foreground/40 italic">
                    Em breve...
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors rounded-md hover:bg-sidebar-accent"
          >
            ← Voltar ao portal
          </Link>
        </div>
      </aside>

      {/* Main content — offset by sidebar */}
      <main className="flex-1 ml-64 overflow-auto">
        {children}
      </main>
    </div>
  )
}
