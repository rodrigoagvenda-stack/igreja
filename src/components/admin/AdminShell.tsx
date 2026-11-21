"use client"

import { useState } from "react"
import Image from "next/image"
import { AdminSidebar } from "./AdminSidebar"

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Topbar mobile/tablet */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 h-14 bg-[#16305E] flex items-center justify-between px-4">
        <button type="button" aria-label="Abrir menu" onClick={() => setOpen(true)} className="p-1">
          <MenuIcon />
        </button>
        <Image src="/Arqu de botucatu.svg" alt="Arquidiocese de Botucatu" width={120} height={42} className="h-9 w-auto object-contain" />
        <div className="w-[30px]" />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <AdminSidebar open={open} onNavigate={() => setOpen(false)} />

      <div className="flex-1 min-w-0 overflow-y-auto pt-14 lg:pt-0">
        {children}
      </div>
    </>
  )
}
