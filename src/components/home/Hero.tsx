import { createClient } from "@/lib/supabase/server"
import { HeroSlider } from "./HeroSlider"
import type { HeroSlide } from "./HeroSlider"

export async function Hero() {
  const supabase = await createClient()
  const { data: eventos } = await supabase
    .from("arq_eventos")
    .select("titulo, descricao, local, categoria, inicio")
    .eq("destaque", true)
    .gte("inicio", new Date().toISOString())
    .order("inicio")
    .limit(2)

  const base: HeroSlide = {
    eyebrow: "Arquidiocese de Sant'Ana de Botucatu",
    title: "A serviço da fé no interior paulista",
    excerpt: "Portal oficial da Arquidiocese de Botucatu — acompanhe notícias, eventos, as 51 paróquias e a vida pastoral da nossa comunidade diocesana.",
    badge: "Bem-vindo",
    href: "/paroquias",
    cta: "Conheça as paróquias",
  }

  const eventoSlides: HeroSlide[] = (eventos ?? []).map(e => ({
    eyebrow: "Agenda pastoral",
    title: e.titulo,
    excerpt: e.descricao ?? (e.local ? `Local: ${e.local}` : ""),
    badge: e.categoria,
    href: "/agenda",
    cta: "Ver agenda completa",
  }))

  return <HeroSlider slides={[base, ...eventoSlides]} />
}
