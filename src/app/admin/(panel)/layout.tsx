import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-muted/40">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  )
}
