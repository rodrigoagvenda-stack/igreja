"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { IconArrowRight, IconPhoto, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    eyebrow: "Palavra da semana",
    title: "A voz da fé no coração do interior paulista",
    excerpt: "Acompanhe as notícias, eventos e comunicados oficiais da Arquidiocese de Botucatu — a serviço de 50 paróquias e toda a comunidade diocesana.",
    badge: "Destaque",
    href: "/noticias",
    cta: "Explorar o portal",
  },
  {
    eyebrow: "Agenda pastoral",
    title: "Ordenação Presbiteral Arquidiocesana em junho",
    excerpt: "Dom [Arcebispo] presidirá a solenidade na Catedral de Botucatu no dia 8 de junho, às 10h. Toda a comunidade está convidada.",
    badge: "Agenda",
    href: "/agenda",
    cta: "Ver agenda completa",
  },
  {
    eyebrow: "Formação",
    title: "Semana de catequese reúne mais de 300 catequistas",
    excerpt: "Formação acontece em todas as zonas pastorais da Arquidiocese ao longo do mês de junho, com encontros regionais.",
    badge: "Pastoral",
    href: "/noticias",
    cta: "Leia a notícia",
  },
]

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  const goTo = useCallback((index: number) => {
    setVisible(false)
    setTimeout(() => {
      setCurrent(index)
      setVisible(true)
    }, 220)
  }, [])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  useEffect(() => {
    const t = setTimeout(next, 6000)
    return () => clearTimeout(t)
  }, [current, next])

  const slide = slides[current]

  return (
    <section
      className="flex flex-col md:flex-row min-h-[480px] md:min-h-[560px] bg-sidebar"
      aria-label="Banner principal"
    >
      {/* Image area */}
      <div className="relative flex-[1.2] min-h-[260px] md:min-h-0 bg-gradient-to-br from-sidebar via-primary to-primary/80 flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-3 opacity-10 select-none">
          <IconPhoto size={72} className="text-white" aria-hidden="true" />
          <span className="text-white text-[11px] tracking-[.1em] uppercase">Imagem de destaque</span>
        </div>

        {/* Badge */}
        <div className="absolute bottom-6 left-6">
          <span
            className="bg-accent text-foreground text-[11px] font-semibold px-3 py-1 rounded-sm tracking-[.06em] uppercase transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {slide.badge}
          </span>
        </div>

        {/* Prev / Next arrows (desktop) */}
        <div className="absolute inset-y-0 left-0 right-0 hidden md:flex items-center justify-between px-3 pointer-events-none">
          <button
            onClick={prev}
            aria-label="Slide anterior"
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <IconChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Próximo slide"
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <IconChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-primary px-8 py-12 md:px-12 md:py-14 flex flex-col justify-center gap-6">
        <div
          className="flex flex-col gap-5 transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {/* Eyebrow */}
          <p className="flex items-center gap-2 text-[11px] font-semibold text-accent tracking-[.1em] uppercase">
            <span className="block w-6 h-0.5 bg-accent" aria-hidden="true" />
            {slide.eyebrow}
          </p>

          {/* Title */}
          <h1 className="font-serif text-[28px] md:text-[34px] font-bold text-white leading-[1.15] max-w-[400px]">
            {slide.title}
          </h1>

          {/* Excerpt */}
          <p className="text-[15px] text-white/75 leading-[1.7] max-w-[400px]">
            {slide.excerpt}
          </p>

          {/* CTA */}
          <Link
            href={slide.href}
            className="inline-flex items-center gap-2 bg-white text-primary text-[13px] font-semibold px-5 py-2.5 rounded-md w-fit hover:bg-accent hover:text-white transition-colors"
          >
            <IconArrowRight size={14} />
            {slide.cta}
          </Link>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-1" role="tablist" aria-label="Slides">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === current ? "bg-white w-6" : "bg-white/30 hover:bg-white/60 w-1.5"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
