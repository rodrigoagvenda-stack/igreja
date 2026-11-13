"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export type HeroSlide = {
  eyebrow: string
  title: string
  excerpt: string
  badge: string
  href: string
  cta: string
}

const FOTO_FUNDO = "https://dkvznmmiiiljyrkopiqx.supabase.co/storage/v1/object/public/arq-fotos/1794995500-catedral-santana-fachada-rua.jpg"

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
    <section className="relative h-[520px] md:h-[640px] overflow-hidden" aria-label="Banner principal">
      <Image
        src={FOTO_FUNDO}
        alt="Catedral Metropolitana Basílica Menor de Sant'Ana"
        fill
        priority
        className="object-cover object-[center_60%]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(13,26,48,.1) 0%, rgba(13,26,48,.3) 45%, rgba(13,26,48,.88) 100%)" }}
      />

      {/* Setas de navegação */}
      {slides.length > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 hidden md:flex items-center justify-between px-7 pointer-events-none z-10">
          <button onClick={prev} aria-label="Slide anterior" className="pointer-events-auto w-11 h-11 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <IconChevronLeft size={18} />
          </button>
          <button onClick={next} aria-label="Próximo slide" className="pointer-events-auto w-11 h-11 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <IconChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Conteúdo */}
      <div className="absolute inset-0 flex flex-col justify-end max-w-[1100px] mx-auto px-4 md:px-[170px] pb-16 md:pb-20">
        <div className="flex flex-col gap-4 max-w-[620px] transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
          <p className="flex items-center gap-2.5 text-[12px] font-semibold text-accent tracking-[.12em] uppercase">
            <span className="block w-6 h-[1.5px] bg-accent" aria-hidden="true" />
            {slide.eyebrow}
          </p>
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold text-white leading-[1.1]">
            {slide.title}
          </h1>
          <p className="text-[16px] text-white/80 leading-[1.7] max-w-[480px]">
            {slide.excerpt}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 pt-1.5">
            <Link href={slide.href} className="inline-flex items-center justify-center gap-2 bg-white text-primary text-[14px] font-semibold px-6 py-3.5 rounded-full w-fit hover:bg-accent hover:text-white transition-colors">
              {slide.cta} <IconArrowRight size={14} />
            </Link>
            {slide.href !== "/agenda" && (
              <Link href="/agenda" className="inline-flex items-center justify-center gap-2 border border-white/40 text-white text-[14px] font-semibold px-6 py-3.5 rounded-full w-fit hover:bg-white/10 transition-colors">
                Ver agenda pastoral
              </Link>
            )}
          </div>
        </div>

        {slides.length > 1 && (
          <div className="flex items-center gap-4 mt-8 max-w-[620px]">
            <span className="font-serif italic text-[14px] text-white/60">
              {String(current + 1).padStart(2, "0")} — {String(slides.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn("h-[2px] rounded-full transition-all duration-300", i === current ? "bg-accent w-10" : "bg-white/25 hover:bg-white/50 w-[18px]")}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
