"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { IconArrowRight, IconChevronLeft, IconChevronRight, IconCross } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export type HeroSlide = {
  eyebrow: string
  title: string
  excerpt: string
  badge: string
  href: string
  cta: string
}

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  const goTo = useCallback((index: number) => {
    setVisible(false)
    setTimeout(() => { setCurrent(index); setVisible(true) }, 220)
  }, [])

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo, slides.length])
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const t = setTimeout(next, 7000)
    return () => clearTimeout(t)
  }, [current, next, slides.length])

  const slide = slides[current]

  return (
    <section className="flex flex-col md:flex-row min-h-[480px] md:min-h-[560px]" aria-label="Banner principal">
      {/* Painel decorativo */}
      <div className="relative flex-[1.2] min-h-[220px] md:min-h-0 overflow-hidden bg-gradient-to-br from-sidebar via-primary/90 to-primary flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative z-10 flex flex-col items-center gap-4 opacity-30">
          <IconCross size={80} className="text-white" />
        </div>
        {slides.length > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 hidden md:flex items-center justify-between px-3 pointer-events-none z-10">
            <button onClick={prev} aria-label="Slide anterior" className="pointer-events-auto w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
              <IconChevronLeft size={18} />
            </button>
            <button onClick={next} aria-label="Próximo slide" className="pointer-events-auto w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
              <IconChevronRight size={18} />
            </button>
          </div>
        )}
        {/* Badge */}
        <div className="absolute bottom-6 left-6 z-10">
          <span className="bg-accent text-foreground text-[11px] font-semibold px-3 py-1 rounded-sm tracking-[.06em] uppercase transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
            {slide.badge}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 bg-primary px-8 py-12 md:px-12 md:py-14 flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-5 transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-accent tracking-[.1em] uppercase">
            <span className="block w-6 h-0.5 bg-accent" aria-hidden="true" />
            {slide.eyebrow}
          </p>
          <h1 className="font-serif text-[28px] md:text-[34px] font-bold text-white leading-[1.15] max-w-[400px]">
            {slide.title}
          </h1>
          <p className="text-[15px] text-white/75 leading-[1.7] max-w-[400px]">
            {slide.excerpt}
          </p>
          <Link href={slide.href} className="inline-flex items-center gap-2 bg-white text-primary text-[13px] font-semibold px-5 py-2.5 rounded-md w-fit hover:bg-accent hover:text-white transition-colors">
            <IconArrowRight size={14} /> {slide.cta}
          </Link>
        </div>

        {slides.length > 1 && (
          <div className="flex gap-2 mt-1" role="tablist" aria-label="Slides">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn("h-1.5 rounded-full transition-all duration-300", i === current ? "bg-white w-6" : "bg-white/30 hover:bg-white/60 w-1.5")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
