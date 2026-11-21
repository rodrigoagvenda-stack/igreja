import { Suspense } from "react"
import { Montserrat } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { AdminShell } from "@/components/admin/AdminShell"
import { ActionToastListener } from "@/components/admin/ActionToastListener"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
})

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${montserrat.variable} flex h-screen overflow-hidden bg-muted/40 [font-family:var(--font-montserrat)]`}>
      <Toaster richColors position="top-right" />
      <Suspense fallback={null}>
        <ActionToastListener />
      </Suspense>
      <AdminShell>{children}</AdminShell>
    </div>
  )
}
