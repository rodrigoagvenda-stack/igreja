import { SiteLayout } from "@/components/layout/SiteLayout"
import { Hero } from "@/components/home/Hero"
import { QuickLinks } from "@/components/home/QuickLinks"
import { NewsSection } from "@/components/home/NewsSection"
import { AgendaMissaSection } from "@/components/home/AgendaMissaSection"
import { ParoquiasDestaque } from "@/components/home/ParoquiasDestaque"
import { ArcebispoSection } from "@/components/home/ArcebispoSection"
import { SetoresSection } from "@/components/home/SetoresSection"
import { DocumentosSection } from "@/components/home/DocumentosSection"

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <QuickLinks />
      <NewsSection />
      <AgendaMissaSection />
      <ParoquiasDestaque />
      <ArcebispoSection />
      <SetoresSection />
      <DocumentosSection />
    </SiteLayout>
  )
}
