import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import {
  IconBook2, IconFlame, IconHeart, IconUsers,
  IconHome, IconMicrophone2, IconWorld, IconStar,
  IconMail, IconPhone, IconArrowRight,
} from "@tabler/icons-react"

export const metadata = { title: "Setores Pastorais" }

const setores = [
  { slug: "catequese",    icon: <IconBook2 size={28} />,      nome: "Catequese",     missao: "Formação e iniciação à fé cristã para crianças, jovens e adultos.", responsavel: "Coord. [Nome]", contato: "catequese@arquidiocesebotucatu.org.br" },
  { slug: "liturgia",     icon: <IconFlame size={28} />,      nome: "Liturgia",      missao: "Animação litúrgica, ministérios e celebrações da Arquidiocese.",    responsavel: "Coord. [Nome]", contato: "liturgia@arquidiocesebotucatu.org.br" },
  { slug: "caridade",     icon: <IconHeart size={28} />,      nome: "Caridade",      missao: "Promoção humana e serviço solidário aos mais vulneráveis.",          responsavel: "Coord. [Nome]", contato: "caridade@arquidiocesebotucatu.org.br" },
  { slug: "juventude",    icon: <IconUsers size={28} />,      nome: "Juventude",     missao: "Pastoral juvenil, grupos de jovens e encontros diocesanos.",         responsavel: "Coord. [Nome]", contato: "juventude@arquidiocesebotucatu.org.br" },
  { slug: "familia",      icon: <IconHome size={28} />,       nome: "Família",       missao: "Acompanhamento pastoral das famílias em todas as fases da vida.",    responsavel: "Coord. [Nome]", contato: "familia@arquidiocesebotucatu.org.br" },
  { slug: "comunicacao",  icon: <IconMicrophone2 size={28} />,nome: "Comunicação",   missao: "PASCOM, mídia e comunicação da boa-nova nos meios digitais.",        responsavel: "Coord. [Nome]", contato: "pascom@arquidiocesebotucatu.org.br" },
  { slug: "missoes",      icon: <IconWorld size={28} />,      nome: "Missões",       missao: "Animação missionária e cooperação com as missões ad gentes.",        responsavel: "Coord. [Nome]", contato: "missoes@arquidiocesebotucatu.org.br" },
  { slug: "vocacoes",     icon: <IconStar size={28} />,       nome: "Vocações",      missao: "Promoção e acompanhamento de vocações sacerdotais e consagradas.",   responsavel: "Coord. [Nome]", contato: "vocacoes@arquidiocesebotucatu.org.br" },
]

export default function SetoresPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Organização pastoral"
        title="Setores Pastorais"
        subtitle="Os setores pastorais coordenam a missão evangelizadora da Arquidiocese nas suas diferentes dimensões."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Setores" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {setores.map(({ slug, icon, nome, missao, responsavel, contato }) => (
            <div key={slug} className="bg-card border border-border rounded-lg p-6 flex gap-5 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.08)] transition-all group">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                {icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-[18px] font-bold mb-1 group-hover:text-primary transition-colors">{nome}</h2>
                <p className="text-[13px] text-muted-foreground leading-[1.55] mb-3">{missao}</p>
                <div className="flex flex-col gap-1 text-[12px] text-muted-foreground mb-3">
                  <span className="flex items-center gap-1.5"><IconUsers size={12} className="text-primary" /> {responsavel}</span>
                  <a href={`mailto:${contato}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <IconMail size={12} className="text-primary" /> {contato}
                  </a>
                </div>
                <Link href={`/setores/${slug}`} className="inline-flex items-center gap-1 text-[12px] text-primary font-semibold hover:gap-2 transition-all">
                  Ver detalhes <IconArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
