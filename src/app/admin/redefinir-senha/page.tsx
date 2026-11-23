import type { Metadata } from "next"
import { RedefinirSenhaForm } from "./RedefinirSenhaForm"

export const metadata: Metadata = { title: "Definir senha" }

export default async function RedefinirSenhaPage({ searchParams }: { searchParams: Promise<{ convite?: string }> }) {
  const { convite } = await searchParams
  return (
    <RedefinirSenhaForm
      supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}
      supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}
      convite={convite === "1"}
    />
  )
}
