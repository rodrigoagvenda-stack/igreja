import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"

export const metadata = { title: "Política de Privacidade — LGPD" }

const secoes = [
  {
    titulo: "1. Quem somos",
    conteudo: "A Arquidiocese de Botucatu (CNPJ: XX.XXX.XXX/0001-XX), com sede na Rua da Cúria, 123, Botucatu/SP, é a controladora dos dados pessoais coletados por meio deste portal.",
  },
  {
    titulo: "2. Dados coletados",
    conteudo: "Coletamos apenas os dados necessários para prestar o serviço solicitado. Por meio do formulário de contato, coletamos: nome, e-mail e mensagem. Também coletamos dados de navegação (cookies de análise) para melhorar a experiência no site.",
  },
  {
    titulo: "3. Finalidade do tratamento",
    conteudo: "Os dados coletados são utilizados exclusivamente para: responder ao seu contato, enviar comunicações pastorais (se autorizado), e melhorar os serviços do portal. Não vendemos, cedemos ou compartilhamos dados com terceiros sem seu consentimento.",
  },
  {
    titulo: "4. Base legal",
    conteudo: "O tratamento de dados é realizado com base no consentimento do titular (art. 7.º, I da LGPD) ou para atendimento de interesse legítimo da organização religiosa (art. 7.º, IX da LGPD).",
  },
  {
    titulo: "5. Seus direitos",
    conteudo: "Nos termos da Lei n.º 13.709/2018 (LGPD), você tem direito a: confirmar a existência de tratamento; acessar seus dados; solicitar correção; solicitar a exclusão; revogar o consentimento a qualquer momento. Para exercer seus direitos, entre em contato pelo e-mail: privacidade@arquidiocesebotucatu.org.br.",
  },
  {
    titulo: "6. Cookies",
    conteudo: "Utilizamos cookies estritamente necessários para o funcionamento do site e, mediante consentimento, cookies de análise (Google Analytics 4). Você pode gerenciar suas preferências de cookies a qualquer momento pelo banner exibido na primeira visita.",
  },
  {
    titulo: "7. Retenção de dados",
    conteudo: "Os dados são mantidos pelo tempo necessário para a finalidade para a qual foram coletados, respeitando as obrigações legais e regulatórias aplicáveis.",
  },
  {
    titulo: "8. Contato e DPO",
    conteudo: "Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato com nosso Encarregado de Proteção de Dados (DPO): privacidade@arquidiocesebotucatu.org.br.",
  },
]

export default function LgpdPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Legal"
        title="Política de Privacidade"
        subtitle="Como tratamos seus dados pessoais em conformidade com a LGPD (Lei n.º 13.709/2018)."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Política de Privacidade" }]}
      />

      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-10">
        <p className="text-[13px] text-muted-foreground mb-8">
          Última atualização: 1.º de janeiro de 2025
        </p>

        <div className="space-y-8">
          {secoes.map(({ titulo, conteudo }) => (
            <section key={titulo}>
              <h2 className="font-serif text-[18px] font-bold mb-3 pb-2 border-b border-border">{titulo}</h2>
              <p className="text-[15px] leading-[1.75] text-muted-foreground">{conteudo}</p>
            </section>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
