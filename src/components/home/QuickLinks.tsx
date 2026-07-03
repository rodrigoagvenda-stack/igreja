import Link from "next/link"
import {
  IconClock, IconBuildingChurch, IconCalendar,
  IconFileText, IconMail,
} from "@tabler/icons-react"

const links = [
  { icon: <IconClock size={18} />,          label: "Horários de missa",    href: "/horarios-de-missa" },
  { icon: <IconBuildingChurch size={18} />, label: "Encontrar paróquia",   href: "/paroquias" },
  { icon: <IconCalendar size={18} />,       label: "Agenda pastoral",      href: "/agenda" },
  { icon: <IconFileText size={18} />,       label: "Documentos oficiais",  href: "/documentos" },
  { icon: <IconMail size={18} />,           label: "Fale conosco",         href: "/contato" },
]

export function QuickLinks() {
  return (
    <nav
      className="bg-white border-b border-border"
      aria-label="Acesso rápido"
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-3 md:grid-cols-5">
        {links.map(({ icon, label, href }, i) => (
          <Link
            key={href}
            href={href}
            className={`
              group flex flex-col items-center gap-1.5 py-3.5 px-4
              transition-colors hover:bg-primary/5
              ${i < links.length - 1 ? "border-r border-border" : ""}
            `}
          >
            <span className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              {icon}
            </span>
            <span className="text-[11px] font-semibold text-center leading-tight text-foreground group-hover:text-primary transition-colors">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
