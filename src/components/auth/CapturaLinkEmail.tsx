"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

// Quando o template do Supabase usa {{ .ConfirmationURL }}, o link do e-mail volta para o
// Site URL com a sessão no hash (#access_token=...&type=invite). O servidor não enxerga o
// hash, então isto pega a sessão no navegador e leva para a tela certa (criar/redefinir senha).
export function CapturaLinkEmail() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || (!hash.includes("access_token=") && !hash.includes("error="))) return

    const p = new URLSearchParams(hash.slice(1))
    window.history.replaceState(null, "", window.location.pathname + window.location.search)

    if (p.get("error")) {
      window.location.replace("/admin/login?erro=link-expirado")
      return
    }

    const access_token = p.get("access_token")
    const refresh_token = p.get("refresh_token")
    const type = p.get("type")
    if (!access_token || !refresh_token) return

    createClient()
      .auth.setSession({ access_token, refresh_token })
      .then(({ error }) => {
        if (error) return window.location.replace("/admin/login?erro=link-expirado")
        if (type === "invite") return window.location.replace("/admin/redefinir-senha?convite=1")
        if (type === "recovery") return window.location.replace("/admin/redefinir-senha")
        window.location.replace("/admin/login")
      })
  }, [])

  return null
}
