import { LoginForm } from "./LoginForm"

const AVISOS: Record<string, { tipo: "ok" | "erro"; texto: string }> = {
  "conta-criada":   { tipo: "ok",   texto: "Conta criada. Entre com seu e-mail e a senha nova; em seguida você cadastra a verificação em duas etapas." },
  "senha-alterada": { tipo: "ok",   texto: "Senha alterada. Entre com a senha nova." },
  "link-expirado":  { tipo: "erro", texto: "Esse link expirou ou já foi usado. Peça um novo em \"Esqueci minha senha\" ou peça ao administrador para reenviar o convite." },
  "link-invalido":  { tipo: "erro", texto: "Link inválido. Abra o link direto do e-mail recebido." },
}

// Server Component — lê as env vars em tempo de requisição (não de build)
export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ ok?: string; erro?: string }> }) {
  const { ok, erro } = await searchParams
  const aviso = AVISOS[ok ?? erro ?? ""] ?? null

  return (
    <LoginForm
      supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}
      supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}
      aviso={aviso}
    />
  )
}
