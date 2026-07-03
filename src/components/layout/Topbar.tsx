import Link from "next/link"
import { IconMapPin } from "@tabler/icons-react"

const quickLinks = [
  { label: "Liturgia do dia", href: "/liturgia" },
  { label: "PASCOM",          href: "/pascom" },
  { label: "Imprensa",        href: "/imprensa" },
  { label: "Contato",         href: "/contato" },
]

export function Topbar() {
  return (
    <div className="hidden md:block bg-sidebar text-white text-xs py-1.5 tracking-[0.03em]">
      <div className="max-w-[1100px] mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-white/60">
          <IconMapPin size={13} aria-hidden="true" />
          <span>Rua Dr. Costa Leite, 668 — Botucatu, SP</span>
        </div>
        <nav aria-label="Links rápidos">
          <ul className="flex items-center">
            {quickLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-white/75 hover:text-white transition-colors ml-5"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
