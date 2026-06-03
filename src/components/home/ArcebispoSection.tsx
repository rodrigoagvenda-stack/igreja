import Link from "next/link"
import { IconArrowRight, IconUser } from "@tabler/icons-react"

export function ArcebispoSection() {
  return (
    <section className="bg-primary py-14 md:py-16" aria-label="Palavra do Arcebispo">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">

          {/* Photo placeholder */}
          <div className="w-[110px] h-[110px] rounded-lg bg-white/15 border-2 border-white/25 flex items-center justify-center flex-shrink-0">
            <IconUser size={48} className="text-white/40" aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <p className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-semibold text-accent uppercase tracking-[.1em] mb-4">
              <span className="block w-3 h-0.5 bg-accent hidden md:block" aria-hidden="true" />
              Palavra do Arcebispo
            </p>

            <blockquote className="font-serif text-[20px] md:text-[22px] font-normal text-white leading-[1.5] italic mb-4 relative pl-5 md:pl-5">
              <span className="absolute left-0 top-[-6px] text-[36px] text-accent font-serif leading-none" aria-hidden="true">"</span>
              A missão da Igreja é ir ao encontro de cada pessoa, onde ela está, com a misericórdia e a verdade do Evangelho.
            </blockquote>

            <p className="text-[14px] font-semibold text-white/75 flex items-center justify-center md:justify-start gap-2 mb-4">
              <span className="text-accent" aria-hidden="true">—</span>
              Dom [Nome do Arcebispo] · Arcebispo Metropolitano de Botucatu
            </p>

            <Link
              href="/sobre/arcebispo"
              className="inline-flex items-center gap-2 text-[12px] text-white/60 hover:text-white border border-white/20 hover:bg-white/10 px-3 py-1.5 rounded-md transition-all"
            >
              <IconArrowRight size={13} />
              Ler mensagem completa
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
