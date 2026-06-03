import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import Link from "next/link"
import { IconFileText, IconDownload, IconCalendar, IconArrowLeft } from "@tabler/icons-react"

export const metadata = { title: "Documento Oficial" }

const documento = {
  tipo: "Decreto",
  titulo: "Decreto de Nomeação — Pároco da Catedral Nossa Senhora das Dores",
  data: "28 de maio de 2025",
  numero: "Decreto n.º 045/2025",
  conteudo: [
    "Dom [Nome do Arcebispo], Arcebispo Metropolitano de Botucatu, no uso de suas atribuições canônicas e em conformidade com o Código de Direito Canônico (cân. 523), vem por meio deste ato nomear o Reverendo Padre [Nome do Padre], como Pároco da Paróquia Catedral Nossa Senhora das Dores, localizada no município de Botucatu, Estado de São Paulo.",
    "A posse canônica dar-se-á na data de [data], durante a Santa Missa presidida pelo Arcebispo Metropolitano, às 10h00, na própria Catedral.",
    "O novo pároco assume todos os direitos e deveres inerentes ao cargo, conforme as normas do direito canônico e as orientações pastorais da Arquidiocese de Botucatu.",
    "Botucatu, 28 de maio de 2025.",
  ],
}

const badgeStyle: Record<string, string> = {
  Decreto:    "bg-primary/10 text-primary",
  Comunicado: "bg-accent/20 text-foreground",
  Nomeação:   "bg-green-100 text-green-700",
  Circular:   "bg-purple-100 text-purple-700",
}

export default function DocumentoSlugPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={documento.tipo}
        title={documento.titulo}
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Documentos", href: "/documentos" },
          { label: documento.tipo },
        ]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

          {/* Documento */}
          <div>
            {/* Header do documento */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6 flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <IconFileText size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex text-[10px] font-semibold uppercase tracking-[.06em] px-2 py-0.5 rounded-sm ${badgeStyle[documento.tipo]}`}>
                    {documento.tipo}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{documento.numero}</span>
                </div>
                <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <IconCalendar size={13} /> {documento.data}
                </p>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="space-y-5">
              {documento.conteudo.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.75] text-foreground">{p}</p>
              ))}
            </div>

            {/* Assinatura placeholder */}
            <div className="mt-10 pt-6 border-t border-border text-center">
              <p className="text-[14px] font-semibold">Dom [Nome do Arcebispo]</p>
              <p className="text-[12px] text-muted-foreground">Arcebispo Metropolitano de Botucatu</p>
            </div>

            <Link href="/documentos" className="inline-flex items-center gap-2 text-[13px] text-primary font-medium mt-8 hover:gap-3 transition-all">
              <IconArrowLeft size={14} /> Voltar para documentos
            </Link>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="bg-card border border-border rounded-lg p-5 space-y-4">
              <h3 className="font-serif text-[16px] font-bold pb-3 border-b border-border">Download</h3>
              <p className="text-[13px] text-muted-foreground">Faça o download do documento em formato PDF.</p>
              <button className="flex items-center justify-center gap-2 w-full bg-primary text-white text-[13px] font-semibold py-2.5 rounded-md hover:bg-primary/90 transition-colors">
                <IconDownload size={15} /> Baixar PDF
              </button>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  )
}
