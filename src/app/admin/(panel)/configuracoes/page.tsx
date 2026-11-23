import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { requireAdminUser, adminClient } from "@/lib/supabase/admin-guard"
import { updateConfig } from "./actions"
import { ConvidarUsuarioModal } from "./usuarios/ConvidarUsuarioModal"
import { UsuarioMenu } from "./usuarios/UsuarioMenu"

export const metadata = { title: "Configurações" }

const ROTULO_PAPEL = { admin: "Administrador", editor: "Editor", leitura: "Somente leitura" } as const

const labelCls = "text-[11px] font-semibold uppercase tracking-[0.06em] leading-[14px] text-[#8A877F]"
const inputCls =
  "h-10 w-full px-3 rounded-lg border border-[#DDD9D1] text-[13px] leading-4 text-[#1A1A1A] focus:outline-none focus:border-[#274FA0] focus:ring-2 focus:ring-[#274FA0]/20 transition-colors"
const cardCls = "bg-white border border-[#ECEAE5] rounded-xl overflow-clip"
const cardHeadCls = "flex items-center gap-2.5 py-4 px-5 border-b border-[#ECEAE5]"
const cardTitleCls = "text-[15px] font-bold leading-[18px] text-[#1A1A1A]"

export default async function AdminConfiguracoesPage() {
  const eu = await requireAdminUser()
  const souAdmin = eu.papel === "admin"

  const supabase = await createClient()
  const sb = adminClient()

  const [{ data: configs }, { data: perfis }, { data: contas }] = await Promise.all([
    supabase.from("arq_site_config").select("chave, valor, descricao").order("chave"),
    sb.from("arq_usuarios_admin").select("user_id, nome, email, papel, criado_em").order("criado_em"),
    sb.auth.admin.listUsers({ perPage: 1000 }),
  ])

  const confirmado = new Map(contas?.users.map(u => [u.id, Boolean(u.email_confirmed_at)]) ?? [])
  const get = (chave: string) => configs?.find(c => c.chave === chave)?.valor ?? ""
  const extras = configs?.filter(c => !["telefone", "email", "endereco"].includes(c.chave)) ?? []

  return (
    <div className="flex flex-col gap-5 min-w-0">
      <div className="flex items-center justify-between pt-7 pb-6 px-5 lg:px-9 border-b border-[#E2DFD9]">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] leading-[14px] text-[#274FA0]">Sistema</p>
          <h1 className="text-[28px] font-bold leading-[34px] text-[#1A1A1A]">Configurações</h1>
        </div>
      </div>

      <div className="flex flex-col gap-5 max-w-[820px] w-full pb-10 px-5 lg:px-10">

        {/* Dados institucionais */}
        <section className={cardCls}>
          <div className={cardHeadCls}>
            <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
              <path d="M4 21V5C4 3.9 4.9 3 6 3H18C19.1 3 20 3.9 20 5V21" fill="none" stroke="#274FA0" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M4 21H20M9 7H9.01M15 7H15.01M9 11H9.01M15 11H15.01M9 15H15" fill="none" stroke="#274FA0" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <h2 className={cardTitleCls}>Dados institucionais</h2>
          </div>
          <form action={updateConfig} className="flex flex-col gap-4 p-5">
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Nome da instituição</span>
              <input
                readOnly
                value="Arquidiocese de Botucatu"
                className="h-10 w-full px-3 rounded-lg border border-[#ECEAE5] bg-[#FAF9F6] text-[13px] leading-4 text-[#8A877F] cursor-not-allowed focus:outline-none"
              />
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex flex-col gap-1.5 flex-1 min-w-0">
                <span className={labelCls}>Telefone</span>
                <input name="telefone" defaultValue={get("telefone")} readOnly={!souAdmin} className={inputCls} />
              </label>
              <label className="flex flex-col gap-1.5 flex-1 min-w-0">
                <span className={labelCls}>E-mail</span>
                <input name="email" type="email" defaultValue={get("email")} readOnly={!souAdmin} className={inputCls} />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Endereço</span>
              <input name="endereco" defaultValue={get("endereco")} readOnly={!souAdmin} className={inputCls} />
            </label>
            {extras.map(({ chave, valor, descricao }) => (
              <label key={chave} className="flex flex-col gap-1.5">
                <span className={labelCls}>{descricao ?? chave}</span>
                <input name={chave} defaultValue={valor ?? ""} readOnly={!souAdmin} className={inputCls} />
              </label>
            ))}
            {souAdmin && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-2.5 px-[18px] rounded-lg bg-[#274FA0] text-[13px] font-semibold leading-4 text-white hover:bg-[#274FA0]/90 transition-colors"
                >
                  Salvar alterações
                </button>
              </div>
            )}
          </form>
        </section>

        {/* Segurança */}
        <section className={cardCls}>
          <div className={cardHeadCls}>
            <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
              <path d="M12 2L4 6V11C4 16 7.4 20.7 12 22C16.6 20.7 20 16 20 11V6L12 2Z" fill="none" stroke="#274FA0" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <h2 className={cardTitleCls}>Segurança</h2>
          </div>
          <div className="py-1.5 px-5">
            <div className="flex items-center justify-between gap-4 py-3.5 border-b border-[#F0EFEC]">
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] font-semibold leading-4 text-[#1A1A1A]">Autenticação em dois fatores (2FA)</p>
                <p className="text-[12px] leading-4 text-[#8A877F]">Obrigatória para todas as contas administrativas</p>
              </div>
              {/* Sempre ligada: o 2FA é exigido no middleware e no servidor, não tem como desligar por aqui. */}
              <div role="img" aria-label="Ativada" className="flex items-center w-[38px] h-[22px] p-0.5 rounded-full bg-[#1D7A4C] shrink-0">
                <div className="size-[18px] ml-4 rounded-full bg-white shrink-0" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 py-3.5">
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] font-semibold leading-4 text-[#1A1A1A]">Log de atividades</p>
                <p className="text-[12px] leading-4 text-[#8A877F]">Registra login, edições e exclusões de cada usuário</p>
              </div>
              <Link
                href="/admin/configuracoes/historico"
                className="py-2 px-3.5 rounded-[7px] bg-[#F5F3EF] text-[12px] font-semibold leading-4 text-[#5A5753] hover:bg-[#ECEAE5] transition-colors shrink-0"
              >
                Ver histórico
              </Link>
            </div>
          </div>
        </section>

        {/* Usuários do painel */}
        <section className={cardCls}>
          <div className="flex items-center justify-between gap-3 py-4 px-5 border-b border-[#ECEAE5]">
            <div className="flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
                <circle cx="9" cy="8" r="3.2" fill="none" stroke="#274FA0" strokeWidth="1.6" />
                <path d="M3 20C3 16.5 5.7 14 9 14C12.3 14 15 16.5 15 20" fill="none" stroke="#274FA0" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="17" cy="9" r="2.4" fill="none" stroke="#274FA0" strokeWidth="1.6" />
                <path d="M15.5 14C18 14.3 20 16.5 20 19.5" fill="none" stroke="#274FA0" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <h2 className={cardTitleCls}>Usuários do painel</h2>
            </div>
            {souAdmin && <ConvidarUsuarioModal />}
          </div>

          {(perfis ?? []).map((u, i, lista) => {
            const pendente = confirmado.get(u.user_id) === false
            const ehAdmin = u.papel === "admin"
            const souEu = u.user_id === eu.id
            return (
              <div
                key={u.user_id}
                className={`flex items-center gap-3 py-3.5 px-5 ${i < lista.length - 1 ? "border-b border-[#F0EFEC]" : ""}`}
              >
                <div className={`flex items-center justify-center size-9 rounded-full shrink-0 ${ehAdmin ? "bg-[#274FA0]" : "bg-[#C9A84C]"}`}>
                  <span className="text-[13px] font-bold leading-4 text-white">{u.nome.trim().charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-[13px] font-semibold leading-4 text-[#1A1A1A] truncate">
                    {u.nome}
                    {souEu && <span className="font-medium text-[#8A877F]"> (você)</span>}
                  </p>
                  <p className="text-[12px] leading-4 text-[#8A877F] truncate">{u.email}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {pendente && (
                    <span className="hidden sm:inline-block py-1 px-2.5 rounded-full bg-[#C9A84C1F] text-[11px] font-semibold leading-[14px] text-[#9A7A1F]">
                      Convite pendente
                    </span>
                  )}
                  <span
                    className={`py-1 px-2.5 rounded-full text-[11px] font-semibold leading-[14px] ${
                      ehAdmin ? "bg-[#274FA01A] text-[#274FA0]" : "bg-[#F5F3EF] text-[#5A5753]"
                    }`}
                  >
                    {ROTULO_PAPEL[u.papel]}
                  </span>
                  {souAdmin && !souEu && (
                    <UsuarioMenu userId={u.user_id} nome={u.nome} papel={u.papel} pendente={pendente} />
                  )}
                </div>
              </div>
            )
          })}
        </section>

      </div>
    </div>
  )
}
