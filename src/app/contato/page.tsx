"use client"

import { useState } from "react"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { PageHeader } from "@/components/layout/PageHeader"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { IconMapPin, IconPhone, IconMail, IconClock, IconSend } from "@tabler/icons-react"

export const dynamic = "force-static"

const assuntos = [
  "Informação geral",
  "Imprensa e comunicação",
  "Documentos e certidões",
  "Setores pastorais",
  "Reclamação ou sugestão",
  "Outro",
]

export default function ContatoPage() {
  const [enviado, setEnviado] = useState(false)
  const [aceite, setAceite] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!aceite) return
    setEnviado(true)
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Fale conosco"
        title="Contato"
        subtitle="Entre em contato com a Cúria Metropolitana da Arquidiocese de Botucatu."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Contato" }]}
      />

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

          {/* Formulário */}
          <div>
            {enviado ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <IconSend size={24} className="text-green-600" />
                </div>
                <h2 className="font-serif text-[20px] font-bold mb-2">Mensagem enviada!</h2>
                <p className="text-[14px] text-muted-foreground">Recebemos sua mensagem e responderemos em até 3 dias úteis.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input id="nome" placeholder="Seu nome" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="assunto">Assunto</Label>
                  <Select required>
                    <SelectTrigger id="assunto">
                      <SelectValue placeholder="Selecione o assunto…" />
                    </SelectTrigger>
                    <SelectContent>
                      {assuntos.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea id="mensagem" placeholder="Digite sua mensagem…" rows={6} required />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="lgpd"
                    checked={aceite}
                    onCheckedChange={(v) => setAceite(v === true)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="lgpd" className="text-[13px] text-muted-foreground leading-[1.5] cursor-pointer">
                    Li e aceito a{" "}
                    <a href="/lgpd" className="text-primary underline">Política de Privacidade</a>{" "}
                    e consinto com o tratamento dos meus dados para fins de atendimento.
                  </Label>
                </div>

                <button
                  type="submit"
                  disabled={!aceite}
                  className="flex items-center gap-2 bg-primary text-white text-[14px] font-semibold px-6 py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IconSend size={15} />
                  Enviar mensagem
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <aside className="space-y-5">
            <div className="bg-card border border-border rounded-lg p-5 space-y-4">
              <h3 className="font-serif text-[16px] font-bold pb-3 border-b border-border">Cúria Metropolitana</h3>
              <div className="flex gap-3 text-[13px]">
                <IconMapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="leading-[1.5]">Rua Dr. Costa Leite, 668 — Centro<br />Botucatu/SP — CEP 18600-010</p>
              </div>
              <div className="flex gap-3 text-[13px]">
                <IconPhone size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <p>(14) 3811-5900</p>
              </div>
              <div className="flex gap-3 text-[13px]">
                <IconMail size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:secretaria@arquidiocesebotucatu.org.br" className="text-primary hover:underline break-all">
                  secretaria@arquidiocesebotucatu.org.br
                </a>
              </div>
              <div className="flex gap-3 text-[13px]">
                <IconClock size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p>Segunda a sexta</p>
                  <p className="text-muted-foreground">8h00 – 18h00</p>
                </div>
              </div>
            </div>

            {/* Mapa placeholder */}
            <div className="bg-muted rounded-lg h-[200px] flex items-center justify-center border border-border">
              <p className="text-[12px] text-muted-foreground">Mapa (Google Maps)</p>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  )
}
