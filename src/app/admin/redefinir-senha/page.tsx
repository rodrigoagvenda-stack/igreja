import type { Metadata } from "next"
import { RedefinirSenhaForm } from "./RedefinirSenhaForm"

export const metadata: Metadata = { title: "Redefinir senha" }

export default function RedefinirSenhaPage() {
  return (
    <RedefinirSenhaForm
      supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}
      supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}
    />
  )
}
