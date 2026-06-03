import Link from "next/link"
import {
  IconArrowRight,
  IconBook2,
  IconFlame,
  IconHeart,
  IconUsers,
  IconHome,
  IconMicrophone2,
  IconWorld,
  IconStar,
} from "@tabler/icons-react"

const setores = [
  {
    icon: <IconBook2 size={22} />,
    nome: "Catequese",
    descricao: "Formação e iniciação à fé cristã para crianças, jovens e adultos.",
    href: "/setores/catequese",
  },
  {
    icon: <IconFlame size={22} />,
    nome: "Liturgia",
    descricao: "Animação litúrgica, ministérios e celebrações da Arquidiocese.",
    href: "/setores/liturgia",
  },
  {
    icon: <IconHeart size={22} />,
    nome: "Caridade",
    descricao: "Promoção humana e serviço aos mais vulneráveis da região.",
    href: "/setores/caridade",
  },
  {
    icon: <IconUsers size={22} />,
    nome: "Juventude",
    descricao: "Pastoral juvenil, grupos de jovens e encontros diocesanos.",
    href: "/setores/juventude",
  },
  {
    icon: <IconHome size={22} />,
    nome: "Família",
    descricao: "Acompanhamento pastoral das famílias em todas as fases da vida.",
    href: "/setores/familia",
  },
  {
    icon: <IconMicrophone2 size={22} />,
    nome: "Comunicação",
    descricao: "PASCOM, mídia e comunicação da boa-nova nos meios digitais.",
    href: "/setores/comunicacao",
  },
  {
    icon: <IconWorld size={22} />,
    nome: "Missões",
    descricao: "Animação missionária e cooperação com as missões ad gentes.",
    href: "/setores/missoes",
  },
  {
    icon: <IconStar size={22} />,
    nome: "Vocações",
    descricao: "Promoção e acompanhamento de vocações ao sacerdócio e vida consagrada.",
    href: "/setores/vocacoes",
  },
]

export function SetoresSection() {
  return (
    <section className="py-16 md:py-20" aria-label="Setores pastorais">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">

        {/* Section header */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
              <span className="block w-4 h-0.5 bg-primary" aria-hidden="true" />
              Organização pastoral
            </p>
            <h2 className="font-serif text-2xl font-bold">Setores pastorais</h2>
          </div>
          <Link href="/setores" className="text-[13px] text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Ver todos <IconArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {setores.map(({ icon, nome, descricao, href }) => (
            <Link
              key={href}
              href={href}
              className="group bg-card border border-border rounded-lg p-5 flex flex-col gap-3 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.10)] transition-all"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white flex-shrink-0">
                {icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-[14px] leading-snug mb-1 group-hover:text-primary transition-colors">
                  {nome}
                </h3>
                <p className="text-[12px] text-muted-foreground leading-[1.5] line-clamp-2">
                  {descricao}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
