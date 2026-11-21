import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { ActionToastListener } from "@/components/admin/ActionToastListener"

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/40">
      <Toaster richColors position="top-right" />
      <Suspense fallback={null}>
        <ActionToastListener />
      </Suspense>
      <AdminSidebar />
      <div className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
