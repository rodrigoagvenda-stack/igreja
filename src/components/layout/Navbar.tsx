"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  IconSearch, IconClock, IconMenu2, IconArrowRight, IconChevronDown,
  IconBrandInstagram, IconBrandFacebook, IconBrandYoutube,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { NavLogo } from "./Logo"

const navLinks = [
  { label: "Início",      href: "/" },
  { label: "Sobre",       href: "/sobre" },
  { label: "Notícias",    href: "/noticias" },
  { label: "Paróquias",   href: "/paroquias" },
  { label: "Agenda",      href: "/agenda" },
  { label: "Setores",     href: "/setores" },
  { label: "Documentos",  href: "/documentos" },
]

const cleroLinks = [
  { label: "Padres",        href: "/padres" },
  { label: "Diáconos",      href: "/diaconos" },
  { label: "Seminaristas",  href: "/seminaristas" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [cleroOpen, setCleroOpen] = useState(false)
  const isCleroActive = cleroLinks.some(l => pathname === l.href)

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-primary shadow-[0_2px_12px_rgba(0,0,0,.06)]">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <NavLogo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navegação principal">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-[13px] font-medium px-3 py-2 rounded-md transition-all",
                pathname === href
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              {label}
            </Link>
          ))}

          {/* Clero dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCleroOpen(true)}
            onMouseLeave={() => setCleroOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 text-[13px] font-medium px-3 py-2 rounded-md transition-all",
                isCleroActive
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              Clero <IconChevronDown size={12} className={cn("transition-transform", cleroOpen && "rotate-180")} />
            </button>
            {cleroOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg py-1 min-w-[160px] z-50">
                {cleroLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "block px-4 py-2 text-[13px] transition-colors",
                      pathname === href
                        ? "text-primary font-semibold bg-primary/5"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex w-9 h-9"
            aria-label="Buscar"
          >
            <IconSearch size={16} />
          </Button>

          <Link
            href="/horarios-de-missa"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            <IconClock size={14} />
            Horários de missa
          </Link>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="flex lg:hidden w-9 h-9"
                  aria-label="Abrir menu"
                />
              }
            >
              <IconMenu2 size={20} />
            </SheetTrigger>

            <SheetContent side="left" className="w-[280px] flex flex-col p-0">
              <SheetHeader className="p-6 pb-0">
                <SheetTitle className="font-serif text-base text-primary text-left">
                  Arquidiocese de Botucatu
                </SheetTitle>
              </SheetHeader>

              <nav className="flex-1 px-4 mt-6 flex flex-col gap-0.5" aria-label="Navegação mobile">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 h-12 text-sm rounded-md transition-colors",
                      pathname === href
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <IconArrowRight size={14} className="opacity-40 flex-shrink-0" />
                    {label}
                  </Link>
                ))}

                <p className="px-3 pt-3 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Clero</p>
                {cleroLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 h-10 text-sm rounded-md transition-colors pl-6",
                      pathname === href
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <IconArrowRight size={12} className="opacity-30 flex-shrink-0" />
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="p-4 mt-auto space-y-3">
                <Separator />
                <Link
                  href="/horarios-de-missa"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
                >
                  <IconClock size={15} />
                  Horários de missa
                </Link>
                <div className="flex gap-2 justify-center">
                  {[
                    { icon: <IconBrandInstagram size={18} />, label: "Instagram", href: "#" },
                    { icon: <IconBrandFacebook size={18} />,  label: "Facebook",  href: "#" },
                    { icon: <IconBrandYoutube size={18} />,   label: "YouTube",   href: "#" },
                  ].map(({ icon, label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {icon}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
