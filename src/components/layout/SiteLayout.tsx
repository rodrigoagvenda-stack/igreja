import { Topbar } from "./Topbar"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <Navbar />
      <main id="main-content" className="flex-1 bg-background">
        {children}
      </main>
      <Footer />
    </>
  )
}
