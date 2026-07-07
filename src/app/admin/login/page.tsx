import { LoginForm } from "./LoginForm"

// Server Component — lê as env vars em tempo de requisição (não de build)
export default function AdminLoginPage() {
  return (
    <LoginForm
      supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}
      supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}
    />
  )
}
