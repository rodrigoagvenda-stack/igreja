import type { Metadata } from "next"
import { EsqueciSenhaForm } from "./EsqueciSenhaForm"

export const metadata: Metadata = { title: "Esqueci minha senha" }

export default function EsqueciSenhaPage() {
  return (
    <EsqueciSenhaForm
      supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}
      supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}
    />
  )
}
