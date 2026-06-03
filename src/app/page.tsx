import { SiteLayout } from "@/components/layout/SiteLayout"
import { Hero } from "@/components/home/Hero"
import { QuickLinks } from "@/components/home/QuickLinks"
import { NewsSection } from "@/components/home/NewsSection"
import { AgendaMissaSection } from "@/components/home/AgendaMissaSection"
import { ParoquiasDestaque } from "@/components/home/ParoquiasDestaque"
import { ArcebispoSection } from "@/components/home/ArcebispoSection"
import { SetoresSection } from "@/components/home/SetoresSection"
import { DocumentosSection } from "@/components/home/DocumentosSection"
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
        <NewsSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <AgendaMissaSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ParoquiasDestaque />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ArcebispoSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SetoresSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <DocumentosSection />
      </ScrollReveal>
    </SiteLayout>
  )
}
