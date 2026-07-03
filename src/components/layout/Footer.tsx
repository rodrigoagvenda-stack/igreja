import Link from "next/link"
import {
  IconMapPin, IconPhone, IconMail,
  IconBrandInstagram, IconBrandFacebook, IconBrandYoutube,
  IconChevronRight,
} from "@tabler/icons-react"
import { FooterLogo } from "./Logo"

const footerCols = [
  {
    title: "Institucional",
    links: [
      { label: "Sobre a Arquidiocese", href: "/sobre" },
      { label: "O Arcebispo",          href: "/sobre/arcebispo" },
      { label: "Estrutura",            href: "/sobre/estrutura" },
      { label: "História",             href: "/sobre/historia" },
      { label: "Imprensa",             href: "/imprensa" },
    ],
  },
  {
    title: "Pastoral",
    links: [
      { label: "Paróquias",            href: "/paroquias" },
      { label: "Padres",               href: "/padres" },
      { label: "Diáconos",             href: "/diaconos" },
      { label: "Seminaristas",         href: "/seminaristas" },
      { label: "Setores pastorais",    href: "/setores" },
      { label: "Agenda pastoral",      href: "/agenda" },
      { label: "Horários de missa",    href: "/horarios-de-missa" },
    ],
  },
  {
    title: "Documentos",
    links: [
      { label: "Atos do governo",      href: "/documentos" },
      { label: "Decretos",             href: "/documentos?tipo=decreto" },
      { label: "Nomeações",            href: "/documentos?tipo=nomeacao" },
      { label: "Comunicados",          href: "/documentos?tipo=comunicado" },
      { label: "Política de privacidade", href: "/lgpd" },
    ],
  },
]

const socials = [
  { icon: <IconBrandInstagram size={15} />, label: "Instagram", href: "https://www.instagram.com/arquidiocesedebotucatu" },
  { icon: <IconBrandFacebook size={15} />,  label: "Facebook",  href: "https://www.facebook.com/arquidiocesedebotucatu" },
  { icon: <IconBrandYoutube size={15} />,   label: "YouTube",   href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-[#0d1a30] text-white/70 text-sm">
      {/* Main grid */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">

          {/* Brand col */}
          <div className="space-y-4">
            <FooterLogo />

            <p className="text-white/50 text-xs leading-relaxed">
              Portal Oficial da Arquidiocese de Botucatu — Cúria Metropolitana. Servindo às 47 paróquias em 4 regiões pastorais.
            </p>

            <address className="not-italic space-y-1.5 text-xs text-white/45">
              <p className="flex items-center gap-2">
                <IconMapPin size={12} className="text-accent flex-shrink-0" />
                Rua Dr. Costa Leite, 668 — Centro, Botucatu, SP
              </p>
              <p className="flex items-center gap-2">
                <IconPhone size={12} className="text-accent flex-shrink-0" />
                (14) 3811-5900
              </p>
              <p className="flex items-center gap-2">
                <IconMail size={12} className="text-accent flex-shrink-0" />
                secretaria@arquidiocesebotucatu.org.br
              </p>
            </address>

            <div className="flex gap-2 pt-1" aria-label="Redes sociais">
              {socials.map(({ icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-md bg-white/8 flex items-center justify-center text-white/50 hover:bg-primary hover:text-white transition-colors"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {footerCols.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-[11px] font-semibold text-accent uppercase tracking-[.08em] mb-4 pb-2 border-b border-white/8">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                    >
                      <IconChevronRight size={11} className="opacity-40" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#091530] py-3.5">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">
            © 2025 Arquidiocese de Botucatu · Todos os direitos reservados
          </p>
          <div className="flex gap-4">
            {[
              { label: "Política de Privacidade", href: "/lgpd" },
              { label: "LGPD",                    href: "/lgpd" },
              { label: "Mapa do site",             href: "/mapa-do-site" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[12px] text-white/30 hover:text-white/60 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
