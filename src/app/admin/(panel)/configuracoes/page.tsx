import { IconUser, IconLock, IconBuildingChurch } from "@tabler/icons-react"
import { createClient } from "@/lib/supabase/server"
import { updateConfig } from "./actions"

export const metadata = { title: "Configurações" }

export default async function AdminConfiguracoesPage() {
  const supabase = await createClient()
  const { data: configs } = await supabase
    .from('arq_site_config')
    .select('chave, valor, descricao')
    .order('chave')

  const get = (chave: string) => configs?.find(c => c.chave === chave)?.valor ?? ''

  return (
    <div className="p-8 max-w-[700px] w-full mx-auto">
      <div className="mb-8 pb-6 border-b border-border">
        <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
          <span className="block w-4 h-0.5 bg-primary shrink-0" />
          Sistema
        </p>
        <h1 className="font-serif text-[28px] font-bold">Configurações</h1>
      </div>

      <div className="space-y-6">

        {/* Dados institucionais */}
        <section className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <IconBuildingChurch size={16} className="text-primary" />
            <h2 className="font-serif text-[15px] font-bold">Dados institucionais</h2>
          </div>
          <form action={updateConfig} className="px-5 py-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Nome da instituição</label>
              <input readOnly value="Arquidiocese de Botucatu" className="w-full h-10 px-3 rounded-md border border-border text-[14px] bg-muted/30 text-muted-foreground cursor-not-allowed" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Telefone</label>
                <input
                  name="telefone"
                  defaultValue={get('telefone')}
                  className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">E-mail</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={get('email')}
                  className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Endereço</label>
              <input
                name="endereco"
                defaultValue={get('endereco')}
                className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            {configs && configs.filter(c => !['telefone','email','endereco'].includes(c.chave)).length > 0 && (
              <div className="space-y-4 pt-2 border-t border-border">
                {configs.filter(c => !['telefone','email','endereco'].includes(c.chave)).map(({ chave, valor, descricao }) => (
                  <div key={chave} className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                      {descricao ?? chave}
                    </label>
                    <input
                      name={chave}
                      defaultValue={valor ?? ''}
                      className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </section>

        {/* Segurança */}
        <section className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <IconLock size={16} className="text-primary" />
            <h2 className="font-serif text-[15px] font-bold">Segurança</h2>
          </div>
          <div className="px-5 py-5 space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="text-[13px] font-semibold">Autenticação de dois fatores</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">Obrigatória para todas as contas (AAL2)</p>
              </div>
              <span className="text-[11px] font-semibold text-success bg-success/10 px-3 py-1 rounded-full">Ativa</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-[13px] font-semibold">Conta administradora</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">admin@arquidiocesebotucatu.org.br</p>
              </div>
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                <IconUser size={11} className="inline mr-1" />
                Admin
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
