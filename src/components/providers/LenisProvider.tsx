"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })

    lenis.on("scroll", () => ScrollTrigger.update())

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Lenis mede a altura rolável da página e não recalcula sozinho quando o conteúdo
    // muda de altura depois (resultados de busca, listas que carregam via estado,
    // dropdowns que alteram o overflow do body). Sem isso o scroll fica travado no
    // tamanho antigo da página, mesmo com conteúdo novo visível mais abaixo.
    const resizeObserver = new ResizeObserver(() => lenis.resize())
    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
