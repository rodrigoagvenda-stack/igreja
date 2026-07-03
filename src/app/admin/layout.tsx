import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin Arquidiocese" },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/40">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
