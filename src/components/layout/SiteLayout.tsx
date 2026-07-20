import { Topbar } from "./Topbar"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { LenisProvider } from "@/components/providers/LenisProvider"

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Topbar />
      <Navbar />
      <main id="main-content" className="flex-1 bg-background">
        {children}
      </main>
      <Footer />
    </LenisProvider>
  )
}
