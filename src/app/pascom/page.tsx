import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import {
  IconRadio, IconCamera, IconMicrophone, IconBrandInstagram,
  IconBrandFacebook, IconBrandYoutube, IconMail, IconPhone,
} from "@tabler/icons-react"

export const metadata = {
  title: "PASCOM",
  description: "Pastoral da Comunicação da Arquidiocese de Botucatu.",
}

const areas = [
  {
    icon: IconRadio,
    titulo: "Comunicação institucional",
    desc: "Gestão do portal, boletins informativos e comunicados oficiais da Arquidiocese.",
  },
  {
    icon: IconCamera,
    titulo: "Cobertura fotográfica",
    desc: "Registro e divulgação de eventos, celebrações e atividades pastorais.",
  },
  {
    icon: IconMicrophone,
    titulo: "Produção audiovisual",
    desc: "Transmissões ao vivo, podcasts e vídeos para o canal do YouTube diocesano.",
  },
  {
    icon: IconBrandInstagram,
    titulo: "Redes sociais",
    desc: "Presença e engajamento da Arquidiocese nas principais plataformas digitais.",
  },
]

const redesSociais = [
  { icon: IconBrandInstagram, label: "Instagram", handle: "@arquidiocesebotucatu", href: "https://www.instagram.com/arquidiocesedebotucatu" },
  { icon: IconBrandFacebook,  label: "Facebook",  handle: "Arquidiocese de Botucatu", href: "https://www.facebook.com/arquidiocesedebotucatu" },
  { icon: IconBrandYoutube,   label: "YouTube",   handle: "Arquidiocese Botucatu", href: "#" },
]

export default function PascomPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Comunicação"
        title="PASCOM"
        subtitle="Pastoral da Comunicação — evangelizando pelas mídias e redes digitais."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "PASCOM" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          {/* Main */}
          <div className="space-y-10">

            {/* Missão */}
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                <span className="block w-4 h-0.5 bg-primary shrink-0" aria-hidden="true" />
                Quem somos
              </p>
              <h2 className="font-serif text-[22px] font-bold mb-4">Nossa missão</h2>
              <p className="text-[15px] text-muted-foreground leading-[1.7] mb-3">
                A Pastoral da Comunicação (PASCOM) é o setor responsável por coordenar e promover a presença da Arquidiocese de Botucatu nos meios de comunicação, utilizando as mídias como instrumento de evangelização e serviço à comunidade.
              </p>
              <p className="text-[15px] text-muted-foreground leading-[1.7]">
                Atuamos na formação de comunicadores nas paróquias, na produção de conteúdo para o portal e redes sociais, e no suporte à comunicação das comunidades da Arquidiocese.
              </p>
            </div>

            {/* Áreas de atuação */}
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                <span className="block w-4 h-0.5 bg-primary shrink-0" aria-hidden="true" />
                Áreas de atuação
              </p>
              <h2 className="font-serif text-[22px] font-bold mb-5">O que fazemos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {areas.map(({ icon: Icon, titulo, desc }) => (
                  <div key={titulo} className="bg-card ring-1 ring-foreground/10 rounded-xl p-5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <Icon size={16} />
                    </div>
                    <h3 className="font-serif text-[14px] font-bold mb-1.5">{titulo}</h3>
                    <p className="text-[13px] text-muted-foreground leading-[1.5]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enviar material */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
                <span className="block w-4 h-0.5 bg-primary shrink-0" aria-hidden="true" />
                Paróquias e setores pastorais
              </p>
              <h3 className="font-serif text-[18px] font-bold mb-2">Envie sua notícia</h3>
              <p className="text-[14px] text-muted-foreground leading-[1.6] mb-4">
                Sua paróquia tem um evento, celebração ou ação pastoral? Entre em contato com a PASCOM para que possamos divulgar no portal e nas redes sociais da Arquidiocese.
              </p>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
              >
                <IconMail size={14} />
                Enviar material
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Contato */}
            <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-5 space-y-3">
              <h3 className="font-serif text-[15px] font-bold pb-3 border-b border-border">Contato PASCOM</h3>
              <div className="flex gap-3 text-[13px]">
                <IconMail size={15} className="text-primary shrink-0 mt-0.5" />
                <a href="mailto:secretaria@arquidiocesebotucatu.org.br" className="text-primary hover:underline break-all">
                  secretaria@arquidiocesebotucatu.org.br
                </a>
              </div>
              <div className="flex gap-3 text-[13px]">
                <IconPhone size={15} className="text-primary shrink-0 mt-0.5" />
                <span>(14) 3811-5900</span>
              </div>
            </div>

            {/* Redes sociais */}
            <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-5">
              <h3 className="font-serif text-[15px] font-bold mb-4 pb-3 border-b border-border">Siga-nos</h3>
              <div className="space-y-3">
                {redesSociais.map(({ icon: Icon, label, handle, href }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold group-hover:text-primary transition-colors">{label}</p>
                      <p className="text-[11px] text-muted-foreground">{handle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  )
}
