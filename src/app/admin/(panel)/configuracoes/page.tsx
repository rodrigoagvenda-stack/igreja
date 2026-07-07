import { IconUser, IconLock, IconBell, IconBuildingChurch } from "@tabler/icons-react"

export const metadata = { title: "Configurações" }

export default function AdminConfiguracoesPage() {
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
          <div className="px-5 py-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Nome da instituição</label>
              <input readOnly value="Arquidiocese de Botucatu" className="w-full h-10 px-3 rounded-md border border-border text-[14px] bg-muted/30 text-muted-foreground cursor-not-allowed" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Telefone</label>
                <input defaultValue="(14) 3811-5900" className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">E-mail</label>
                <input defaultValue="secretaria@arquidiocesebotucatu.org.br" className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Endereço</label>
              <input defaultValue="Rua Dr. Costa Leite, 668 — Centro, Botucatu/SP — CEP 18600-010" className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
            </div>
            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors">
                Salvar alterações
              </button>
            </div>
          </div>
        </section>

        {/* Perfil */}
        <section className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <IconUser size={16} className="text-primary" />
            <h2 className="font-serif text-[15px] font-bold">Meu perfil</h2>
          </div>
          <div className="px-5 py-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">Nome</label>
                <input defaultValue="Administrador" className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">E-mail</label>
                <input defaultValue="admin@arquidiocese.org.br" className="w-full h-10 px-3 rounded-md border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors" />
              </div>
            </div>
          </div>
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
                <p className="text-[13px] font-semibold">Alterar senha</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">Última alteração há 30 dias</p>
              </div>
              <button className="text-[12px] text-primary font-semibold hover:underline">Alterar</button>
            </div>
          </div>
        </section>

        {/* Notificações */}
        <section className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <IconBell size={16} className="text-primary" />
            <h2 className="font-serif text-[15px] font-bold">Notificações</h2>
          </div>
          <div className="px-5 py-5">
            <p className="text-[13px] text-muted-foreground">Configurações de notificação disponíveis após a integração com o Supabase.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
