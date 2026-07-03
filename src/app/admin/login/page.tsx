import Image from "next/image"
import { IconLock, IconShieldCheck } from "@tabler/icons-react"

export const metadata = { title: "Entrar — Admin" }

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/Arqu de botucatu.svg"
            alt="Arquidiocese de Botucatu"
            width={56} height={56}
            className="brightness-0 invert opacity-90 w-14 h-14 object-contain mb-3"
          />
          <h1 className="text-white font-serif text-[22px] font-bold">Arquidiocese de Botucatu</h1>
          <p className="text-white/40 text-[13px] mt-1">Painel administrativo</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-8 pt-7 pb-6">
            <h2 className="font-serif text-[20px] font-bold mb-5">Acesso restrito</h2>

            <form className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                  E-mail institucional
                </label>
                <input
                  type="email"
                  placeholder="usuario@arquidiocesebotucatu.org.br"
                  className="w-full h-10 px-3 rounded-md border border-border text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[.06em]">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-10 px-3 rounded-md border border-border text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-primary text-white text-[14px] font-semibold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <IconLock size={14} />
                Entrar
              </button>
            </form>
          </div>

          <div className="bg-muted/50 px-8 py-4 flex items-center gap-2 border-t border-border">
            <IconShieldCheck size={14} className="text-primary flex-shrink-0" />
            <p className="text-[11px] text-muted-foreground leading-snug">
              Autenticação de dois fatores obrigatória. Após o login, você será solicitado a confirmar sua identidade via app autenticador.
            </p>
          </div>
        </div>

        <p className="text-center text-white/20 text-[11px] mt-6">
          Acesso exclusivo para equipe autorizada · Arquidiocese de Botucatu
        </p>
      </div>
    </div>
  )
}
