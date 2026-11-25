import "server-only"
import { cache } from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { createClient as createSupabaseJs } from "@supabase/supabase-js"
import type { Database, Json } from "@/types/database"

type Papel = Database["public"]["Tables"]["arq_usuarios_admin"]["Row"]["papel"]

export interface AdminUser {
  id: string
  email: string
  nome: string
  papel: Papel
}

/**
 * Garante sessão autenticada com MFA (AAL2) completo.
 * Usar no início de toda Server Action que lê/grava dados do admin.
 */
// cache(): layout e página chamam no mesmo request; assim só consulta uma vez.
export const requireAdminUser = cache(async function requireAdminUser(): Promise<AdminUser> {
  const supabase = await createServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  if (aal?.currentLevel !== "aal2") redirect("/admin/login")

  // Lido com a chave de serviço: o id vem do getUser() acima (validado no Auth), e assim o
  // papel não depende da policy de arq_usuarios_admin (que referencia a própria tabela).
  const { data: perfil } = await adminClient()
    .from("arq_usuarios_admin")
    .select("papel, email, nome")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!perfil) redirect("/admin/login")

  return { id: user.id, email: perfil.email, nome: perfil.nome, papel: perfil.papel }
})

/** Telas de criar/editar: "Somente leitura" volta para o painel com aviso (a gravação já é barrada no servidor e no banco). */
export async function requirePodeEditar(): Promise<AdminUser> {
  const eu = await requireAdminUser()
  if (eu.papel === "leitura") {
    redirect(`/admin?erro=${encodeURIComponent("Seu acesso é somente leitura: você pode ver, mas não editar.")}`)
  }
  return eu
}

/** Garante que o usuário tem um dos papéis permitidos; senão lança erro (mostrado como toast de erro na action). */
export async function requireRole(allowed: Papel[]): Promise<AdminUser> {
  const admin = await requireAdminUser()
  if (!allowed.includes(admin.papel)) {
    throw new Error("Você não tem permissão para executar esta ação.")
  }
  return admin
}

export function adminClient() {
  return createSupabaseJs<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/** Registra uma ação no log de auditoria. Nunca lança — falha de log não deve derrubar a ação principal. */
export async function logAudit(params: {
  user: AdminUser
  acao: "create" | "update" | "delete"
  entidade: string
  entidadeId?: string | null
  detalhes?: Record<string, unknown>
}) {
  try {
    const h = await headers()
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? null
    const userAgent = h.get("user-agent")

    await adminClient().from("arq_audit_log").insert({
      user_id: params.user.id,
      user_email: params.user.email,
      acao: params.acao,
      entidade: params.entidade,
      entidade_id: params.entidadeId ?? null,
      detalhes: (params.detalhes as Json) ?? null,
      ip,
      user_agent: userAgent,
    })
  } catch (err) {
    console.error("[audit] falha ao registrar log:", err)
  }
}
