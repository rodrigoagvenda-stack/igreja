import Link from "next/link"

export function ArcebispoSection() {
  return (
    <section className="bg-[#0d1a30] py-14 md:py-16" aria-label="Palavra do Arcebispo">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* Monograma */}
          <div className="w-[110px] h-[110px] rounded-full bg-accent/10 border-[1.5px] border-accent flex-shrink-0 flex items-center justify-center">
            <span className="font-serif font-bold text-[34px] text-accent">MG</span>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 text-center md:text-left flex flex-col gap-3.5">
            <p className="text-[11px] font-semibold text-accent uppercase tracking-[.1em]">
              Palavra do Arcebispo
            </p>

            <blockquote className="font-serif italic font-normal text-[22px] md:text-[24px] text-white leading-[1.5]">
              &ldquo;Sereis minhas testemunhas.&rdquo;
            </blockquote>

            <p className="flex items-center justify-center md:justify-start gap-2.5 text-[13px]">
              <span className="text-white/45">At 1,8 — Lema episcopal</span>
              <span className="w-[3px] h-[3px] rounded-full bg-white/30 hidden md:block" aria-hidden="true" />
              <span className="font-semibold text-white/70">Dom Maurício Grotto de Camargo</span>
            </p>
          </div>

          <Link
            href="/sobre/arcebispo"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-white border border-white/25 hover:bg-white/10 px-5 py-3 rounded-full transition-all flex-shrink-0"
          >
            Conheça o Arcebispo
          </Link>
        </div>
      </div>
    </section>
  )
}
