import { SiteLayout } from "@/components/layout/SiteLayout"
import { Hero } from "@/components/home/Hero"
import { QuickLinks } from "@/components/home/QuickLinks"
import { NoticiasEAgenda } from "@/components/home/NoticiasEAgenda"
import { ParoquiasDestaque } from "@/components/home/ParoquiasDestaque"
import { ArcebispoSection } from "@/components/home/ArcebispoSection"
import { SetoresEDocumentos } from "@/components/home/SetoresEDocumentos"
import { ScrollReveal } from "@/components/providers/ScrollReveal"

export default function Home() {
  return (
    <SiteLayout>
      {/* Hero sem reveal — é acima da dobra */}
      <Hero />

      <ScrollReveal>
        <QuickLinks />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <NoticiasEAgenda />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ParoquiasDestaque />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ArcebispoSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SetoresEDocumentos />
      </ScrollReveal>
    </SiteLayout>
  )
}
