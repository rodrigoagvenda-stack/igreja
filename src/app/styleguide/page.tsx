"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  IconSun, IconMoon, IconMapPin, IconClock, IconCalendar,
  IconFileText, IconLink, IconPencil, IconBuildingChurch,
  IconCheck, IconX, IconAlertTriangle, IconInfoCircle,
  IconLoader2, IconMail, IconArrowRight, IconMenu2,
  IconLayoutSidebarRight, IconBold, IconItalic, IconUnderline,
  IconSearch, IconDownload, IconExternalLink,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Toaster } from "@/components/ui/sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-6 scroll-mt-4">
      <div className="border-b border-border pb-3">
        <h2 className="font-serif text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</h3>
      {children}
    </div>
  )
}

function ColorSwatch({ variable, label }: { variable: string; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-14 w-full rounded-lg border border-border/30 shadow-sm" style={{ background: `var(${variable})` }} />
      <div>
        <p className="text-xs font-semibold truncate">{label}</p>
        <p className="text-[10px] font-mono text-muted-foreground truncate">{variable}</p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */

export default function StyleguidePage() {
  const [isDark, setIsDark] = useState(false)
  const [radioValue, setRadioValue] = useState("pastoral")
  const [calDate, setCalDate] = useState<Date | undefined>(new Date())
  const [toggleGroup, setToggleGroup] = useState<string[]>(["todos"])

  return (
    <div className={isDark ? "dark" : ""}>
      <Toaster richColors position="top-right" />
      <div className="min-h-screen bg-background text-foreground p-8 space-y-14">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Design System</p>
            <h1 className="font-serif text-4xl font-bold text-primary">Arquidiocese de Botucatu</h1>
            <p className="text-muted-foreground text-sm">28 componentes · Lora + Geist · Tailwind v4 · shadcn/ui · Tabler Icons</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsDark(!isDark)} className="gap-2">
            {isDark ? <IconSun size={14} /> : <IconMoon size={14} />}
            {isDark ? "Modo claro" : "Modo escuro"}
          </Button>
        </div>

        {/* ══════════════════════════════════════
            1. CORES
        ══════════════════════════════════════ */}
        <Section title="Cores" id="colors">
          <Sub title="Marca — Primary (vinho) + Accent (ouro)">
            <div className="grid grid-cols-6 gap-3">
              <ColorSwatch variable="--primary" label="primary" />
              <ColorSwatch variable="--primary-foreground" label="primary-fg" />
              <ColorSwatch variable="--accent" label="accent (ouro)" />
              <ColorSwatch variable="--accent-foreground" label="accent-fg" />
              <ColorSwatch variable="--sidebar" label="sidebar" />
              <ColorSwatch variable="--sidebar-ring" label="sidebar-ring" />
            </div>
          </Sub>
          <Sub title="Superfícies">
            <div className="grid grid-cols-6 gap-3">
              <ColorSwatch variable="--background" label="background" />
              <ColorSwatch variable="--foreground" label="foreground" />
              <ColorSwatch variable="--card" label="card" />
              <ColorSwatch variable="--muted" label="muted" />
              <ColorSwatch variable="--muted-foreground" label="muted-fg" />
              <ColorSwatch variable="--border" label="border" />
            </div>
          </Sub>
          <Sub title="Semânticas">
            <div className="grid grid-cols-4 gap-3">
              <ColorSwatch variable="--success" label="success" />
              <ColorSwatch variable="--warning" label="warning" />
              <ColorSwatch variable="--destructive" label="destructive" />
              <ColorSwatch variable="--info" label="info" />
            </div>
          </Sub>
          <Sub title="Charts">
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map(n => (
                <ColorSwatch key={n} variable={`--chart-${n}`} label={`chart-${n}`} />
              ))}
            </div>
          </Sub>
        </Section>

        {/* ══════════════════════════════════════
            2. TIPOGRAFIA
        ══════════════════════════════════════ */}
        <Section title="Tipografia" id="typography">
          <Sub title="Lora — Headings (serif)">
            <Card><CardContent className="p-6 space-y-3">
              {[
                { size: "text-5xl", label: "h1 · 48px" },
                { size: "text-4xl", label: "h2 · 36px" },
                { size: "text-3xl", label: "h3 · 30px" },
                { size: "text-2xl", label: "h4 · 24px" },
                { size: "text-xl",  label: "h5 · 20px" },
              ].map(({ size, label }) => (
                <div key={label}>
                  <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
                  <p className={`font-serif font-bold ${size} leading-tight`}>Arquidiocese de Botucatu</p>
                </div>
              ))}
              <div>
                <span className="text-[10px] font-mono text-muted-foreground">Lora italic</span>
                <p className="font-serif text-xl italic text-muted-foreground">"A missão da Igreja é ir ao encontro de cada pessoa."</p>
              </div>
            </CardContent></Card>
          </Sub>
          <Sub title="Geist Sans — Body (sans-serif)">
            <Card><CardContent className="p-6 space-y-3">
              {[
                { size: "text-lg",   label: "large · 18px",   text: "Acompanhe as notícias e eventos da Arquidiocese." },
                { size: "text-base", label: "base · 16px",     text: "A Arquidiocese de Botucatu serve às 50 paróquias e cerca de 20 municípios da região." },
                { size: "text-sm",   label: "small · 14px",   text: "Decreto de nomeação — Paróquia São Pedro Apóstolo · 27 de maio de 2025" },
                { size: "text-xs",   label: "xs · 12px",      text: "© 2025 Arquidiocese de Botucatu · Todos os direitos reservados" },
              ].map(({ size, label, text }) => (
                <div key={label}>
                  <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
                  <p className={`${size} text-muted-foreground`}>{text}</p>
                </div>
              ))}
              <div>
                <span className="text-[10px] font-mono text-muted-foreground">overline</span>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Pastoral da Saúde</p>
              </div>
            </CardContent></Card>
          </Sub>
        </Section>

        {/* ══════════════════════════════════════
            3. SEPARATOR
        ══════════════════════════════════════ */}
        <Section title="Separator" id="separator">
          <Card><CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm">Início</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm">Notícias</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm">Paróquias</span>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">Separador horizontal — usado entre seções e itens de navegação</p>
          </CardContent></Card>
        </Section>

        {/* ══════════════════════════════════════
            4. RAIOS DE BORDA
        ══════════════════════════════════════ */}
        <Section title="Raios de borda" id="radius">
          <div className="flex flex-wrap gap-8 items-end bg-card border border-border rounded-lg p-8">
            {[
              { label: "none",  cls: "rounded-none" },
              { label: "sm",    cls: "rounded-sm" },
              { label: "md",    cls: "rounded-md" },
              { label: "lg",    cls: "rounded-lg" },
              { label: "xl",    cls: "rounded-xl" },
              { label: "2xl",   cls: "rounded-2xl" },
              { label: "full",  cls: "rounded-full" },
            ].map(({ label, cls }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 bg-primary/15 border-2 border-primary/40 ${cls}`} />
                <span className="text-[11px] font-mono text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════
            5. FORMULÁRIOS
        ══════════════════════════════════════ */}
        <Section title="Formulários" id="forms">
          <div className="grid grid-cols-2 gap-6">

            <Sub title="Input">
              <Card><CardContent className="p-6 space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input id="nome" placeholder="Dom João da Silva" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="contato@paroquia.org.br" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="search">Busca com ícone</Label>
                  <div className="relative">
                    <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="search" className="pl-9" placeholder="Buscar paróquia..." />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="disabled">Desabilitado</Label>
                  <Input id="disabled" disabled placeholder="Campo desabilitado" />
                </div>
              </CardContent></Card>
            </Sub>

            <Sub title="Textarea">
              <Card><CardContent className="p-6 space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="msg">Mensagem</Label>
                  <Textarea id="msg" placeholder="Descreva sua solicitação..." rows={4} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="msg2">Desabilitado</Label>
                  <Textarea id="msg2" disabled placeholder="Não editável" rows={2} />
                </div>
              </CardContent></Card>
            </Sub>

            <Sub title="Select">
              <Card><CardContent className="p-6 space-y-3">
                <div className="space-y-1">
                  <Label>Cidade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cidade…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="botucatu">Botucatu</SelectItem>
                      <SelectItem value="avare">Avaré</SelectItem>
                      <SelectItem value="piraju">Piraju</SelectItem>
                      <SelectItem value="lencois">Lençóis Paulista</SelectItem>
                      <SelectItem value="ourinhos">Ourinhos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Dia da semana</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Qualquer dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dom">Domingo</SelectItem>
                      <SelectItem value="seg">Segunda-feira</SelectItem>
                      <SelectItem value="sab">Sábado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent></Card>
            </Sub>

            <Sub title="Checkbox · Toggle · Radio">
              <Card><CardContent className="p-6 space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-mono text-muted-foreground">Checkbox</p>
                  {["Aceito a política de privacidade (LGPD)", "Desejo receber comunicados"].map((lbl, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Checkbox id={`chk${i}`} defaultChecked={i === 0} />
                      <Label htmlFor={`chk${i}`} className="text-sm font-normal cursor-pointer">{lbl}</Label>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs font-mono text-muted-foreground">Toggle</p>
                  <div className="flex gap-2">
                    <Toggle aria-label="Negrito"><IconBold size={14} /></Toggle>
                    <Toggle aria-label="Itálico"><IconItalic size={14} /></Toggle>
                    <Toggle aria-label="Sublinhado" defaultPressed><IconUnderline size={14} /></Toggle>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs font-mono text-muted-foreground">Radio Group</p>
                  <RadioGroup value={radioValue} onValueChange={setRadioValue} className="grid grid-cols-2 gap-2">
                    {["pastoral", "juventude", "família", "catequese"].map(v => (
                      <div key={v} className="flex items-center gap-2">
                        <RadioGroupItem value={v} id={v} />
                        <Label htmlFor={v} className="text-sm font-normal capitalize cursor-pointer">{v}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent></Card>
            </Sub>
          </div>

          <Sub title="Toggle Group — filtros de categoria">
            <Card><CardContent className="p-6">
              <ToggleGroup value={toggleGroup} onValueChange={setToggleGroup} className="flex-wrap justify-start gap-2">
                {["todos", "pastoral", "institucional", "formação", "litúrgico", "social"].map(v => (
                  <ToggleGroupItem key={v} value={v} className="capitalize rounded-full px-4 text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                    {v}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </CardContent></Card>
          </Sub>

          <Sub title="Formulário completo — /contato">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Fale conosco</CardTitle>
                <CardDescription>Cúria Metropolitana da Arquidiocese de Botucatu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="fn">Nome</Label>
                    <Input id="fn" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="fe">E-mail</Label>
                    <Input id="fe" type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Assunto</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o assunto…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geral">Informações gerais</SelectItem>
                      <SelectItem value="pastoral">Pastoral</SelectItem>
                      <SelectItem value="imprensa">Imprensa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="fmsg">Mensagem</Label>
                  <Textarea id="fmsg" placeholder="Sua mensagem…" rows={4} />
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="lgpd" />
                  <Label htmlFor="lgpd" className="text-sm font-normal cursor-pointer leading-relaxed">
                    Li e aceito a <span className="text-primary underline cursor-pointer">Política de Privacidade</span> (LGPD).
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2" onClick={() => toast.success("Mensagem enviada!", { description: "Responderemos em até 3 dias úteis." })}>
                  <IconMail size={16} />
                  Enviar mensagem
                </Button>
              </CardFooter>
            </Card>
          </Sub>
        </Section>

        {/* ══════════════════════════════════════
            6. AVATAR & SKELETON
        ══════════════════════════════════════ */}
        <Section title="Avatar & Skeleton" id="avatar">
          <div className="grid grid-cols-2 gap-6">
            <Sub title="Avatar — fotos dos párocos">
              <Card><CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  {["GS", "MC", "JB", "RF"].map(initials => (
                    <Avatar key={initials}>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">{initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">PE</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">Pe. Eduardo Martins</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <IconMapPin size={11} />
                      Paróquia Nossa Senhora Aparecida · Avaré
                    </p>
                  </div>
                </div>
              </CardContent></Card>
            </Sub>

            <Sub title="Skeleton — loading states">
              <Card><CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
                <Skeleton className="h-36 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent></Card>
            </Sub>
          </div>
        </Section>

        {/* ══════════════════════════════════════
            7. TABLE — horários de missa
        ══════════════════════════════════════ */}
        <Section title="Table" id="table">
          <Sub title="Horários de missa — /paroquias/[slug]">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-base">Catedral Nossa Senhora das Dores</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <IconMapPin size={13} />
                  Botucatu — horários semanais
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-40">Dia</TableHead>
                      <TableHead>Horários</TableHead>
                      <TableHead className="w-48">Observação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { dia: "Segunda a Sexta", horarios: "07h00 · 12h00 · 18h30", obs: "" },
                      { dia: "Sábado",          horarios: "07h00 · 18h30",         obs: "18h30 — Véspera dominical" },
                      { dia: "Domingo",         horarios: "07h00 · 09h00 · 11h00 · 18h30", obs: "09h00 — Missa das famílias" },
                      { dia: "Feriados",        horarios: "09h00 · 18h30",         obs: "" },
                    ].map(({ dia, horarios, obs }) => (
                      <TableRow key={dia}>
                        <TableCell className="font-medium">{dia}</TableCell>
                        <TableCell className="flex items-center gap-1.5">
                          <IconClock size={13} className="text-muted-foreground flex-shrink-0" />
                          {horarios}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{obs}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Sub>
        </Section>

        {/* ══════════════════════════════════════
            8. BREADCRUMB & PAGINATION
        ══════════════════════════════════════ */}
        <Section title="Breadcrumb & Pagination" id="navigation">
          <Sub title="Breadcrumb — artigos e paróquias">
            <Card><CardContent className="p-6 space-y-3">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="#">Início</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Notícias</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Pastoral</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>Dom [Arcebispo] preside encontro de formação</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="#">Início</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Paróquias</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>Catedral Nossa Senhora das Dores</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </CardContent></Card>
          </Sub>

          <Sub title="Pagination — listagem de notícias">
            <Card><CardContent className="p-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">8</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent></Card>
          </Sub>
        </Section>

        {/* ══════════════════════════════════════
            9. TABS — página da paróquia
        ══════════════════════════════════════ */}
        <Section title="Tabs" id="tabs">
          <Sub title="Paróquia individual — seções da página">
            <Tabs defaultValue="info">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="horarios">Horários de missa</TabsTrigger>
                <TabsTrigger value="fotos">Galeria</TabsTrigger>
                <TabsTrigger value="historia">História</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <Card><CardContent className="p-6 grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Cidade</p><p className="font-medium flex items-center gap-1"><IconMapPin size={13} />Botucatu</p></div>
                  <div><p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Pároco</p><p className="font-medium">Pe. Eduardo Martins</p></div>
                  <div><p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Endereço</p><p className="font-medium">Praça Dom Lúcio, s/n — Centro</p></div>
                  <div><p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Telefone</p><p className="font-medium">(14) 3811-0000</p></div>
                </CardContent></Card>
              </TabsContent>
              <TabsContent value="horarios">
                <Card><CardContent className="p-6">
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <IconClock size={14} />
                    Dom 07h · 09h · 11h · 18h30 | Sáb 07h · 18h30 | Seg–Sex 07h · 12h · 18h30
                  </p>
                </CardContent></Card>
              </TabsContent>
              <TabsContent value="fotos">
                <Card><CardContent className="p-6">
                  <div className="grid grid-cols-4 gap-3">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-md" />)}
                  </div>
                </CardContent></Card>
              </TabsContent>
              <TabsContent value="historia">
                <Card><CardContent className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">A Catedral foi erigida em 1908, quando a Diocese de Botucatu foi desmembrada da Diocese de São Paulo.</p>
                </CardContent></Card>
              </TabsContent>
            </Tabs>
          </Sub>
        </Section>

        {/* ══════════════════════════════════════
            10. ACCORDION
        ══════════════════════════════════════ */}
        <Section title="Accordion" id="accordion">
          <Sub title="Setores pastorais — perguntas frequentes">
            <Accordion className="space-y-1">
              {[
                { value: "pastoral",   q: "O que é a Pastoral da Saúde?",                          a: "A Pastoral da Saúde atua em hospitais e casas de saúde, oferecendo assistência espiritual a enfermos e familiares." },
                { value: "catequese",  q: "Como matricular meu filho na catequese?",                a: "As matrículas são realizadas diretamente nas paróquias. Procure a secretaria com certidão de batismo e documento de identidade." },
                { value: "casamento",  q: "Quais documentos são necessários para o casamento?",     a: "Certidão de batismo (máx. 6 meses), certidão de crisma, RG e CPF. O processo dura em média 6 meses." },
              ].map(({ value, q, a }) => (
                <AccordionItem key={value} value={value} className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="font-medium text-sm hover:no-underline">{q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Sub>
        </Section>

        {/* ══════════════════════════════════════
            11. BADGE
        ══════════════════════════════════════ */}
        <Section title="Badge" id="badges">
          <Card><CardContent className="p-6 flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-accent text-accent-foreground">Destaque</Badge>
            <Badge className="bg-success text-success-foreground">Publicado</Badge>
            <Badge className="bg-warning text-warning-foreground">Pendente</Badge>
            <Badge className="bg-info text-info-foreground">Informação</Badge>
            <Badge variant="outline" className="border-primary text-primary">Pastoral</Badge>
            <Badge variant="outline" className="border-accent text-accent">Litúrgico</Badge>
            <Badge variant="outline">Decreto</Badge>
            <Badge variant="outline">Comunicado</Badge>
            <Badge variant="outline">Nomeação</Badge>
          </CardContent></Card>
        </Section>

        {/* ══════════════════════════════════════
            12. ALERT
        ══════════════════════════════════════ */}
        <Section title="Alert" id="alerts">
          <div className="space-y-3">
            <Alert>
              <AlertTitle className="font-serif">Comunicado oficial</AlertTitle>
              <AlertDescription>Orientações para o Corpus Christi 2025 nas paróquias foram divulgadas.</AlertDescription>
            </Alert>
            <Alert className="border-success/40 bg-success/10 text-success">
              <AlertTitle className="font-serif">Publicado com sucesso</AlertTitle>
              <AlertDescription className="text-success/80">A notícia já está disponível no portal.</AlertDescription>
            </Alert>
            <Alert className="border-warning/40 bg-warning/10 text-warning">
              <AlertTitle className="font-serif">Revisão necessária</AlertTitle>
              <AlertDescription className="text-warning/80">Este documento aguarda aprovação.</AlertDescription>
            </Alert>
            <Alert className="border-destructive/40 bg-destructive/10 text-destructive">
              <AlertTitle className="font-serif">Erro ao salvar</AlertTitle>
              <AlertDescription className="text-destructive/80">Não foi possível salvar. Tente novamente.</AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* ══════════════════════════════════════
            13. OVERLAYS — Dialog, Sheet, Tooltip, Popover
        ══════════════════════════════════════ */}
        <Section title="Overlays" id="overlays">
          <div className="grid grid-cols-2 gap-6">

            <Sub title="Dialog — confirmações">
              <Card><CardContent className="p-6 flex flex-col gap-3">
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" className="gap-2"><IconFileText size={15} />Publicar documento</Button>} />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-serif">Confirmar publicação</DialogTitle>
                      <DialogDescription>Este decreto ficará visível publicamente no portal.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancelar</Button>
                      <Button className="gap-2" onClick={() => toast.success("Documento publicado!")}><IconCheck size={15} />Publicar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger render={<Button variant="destructive" className="gap-2"><IconX size={15} />Excluir notícia</Button>} />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-serif">Excluir notícia?</DialogTitle>
                      <DialogDescription>Esta ação não pode ser desfeita. A notícia será removida permanentemente.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancelar</Button>
                      <Button variant="destructive" className="gap-2" onClick={() => toast.error("Notícia excluída.")}><IconX size={15} />Excluir</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent></Card>
            </Sub>

            <Sub title="Sheet — drawer mobile (navbar)">
              <Card><CardContent className="p-6 flex flex-col gap-3">
                <Sheet>
                  <SheetTrigger render={<Button variant="outline" className="gap-2"><IconMenu2 size={16} />Menu mobile</Button>} />
                  <SheetContent side="left" className="w-72 bg-sidebar text-sidebar-foreground border-sidebar-border">
                    <SheetHeader>
                      <SheetTitle className="font-serif text-sidebar-foreground">Arquidiocese</SheetTitle>
                      <SheetDescription className="text-sidebar-foreground/60">Portal Institucional</SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="flex-1 mt-6">
                      <nav className="flex flex-col gap-1">
                        {["Início", "Sobre", "Notícias", "Paróquias", "Párocos", "Agenda", "Setores", "Documentos"].map(item => (
                          <button key={item} className="text-left px-3 py-3 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent rounded-md transition-colors flex items-center gap-2">
                            <IconArrowRight size={14} className="text-sidebar-foreground/40" />
                            {item}
                          </button>
                        ))}
                      </nav>
                    </ScrollArea>
                    <div className="mt-4 pt-4 border-t border-sidebar-border">
                      <Button className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                        <IconClock size={15} />
                        Horários de missa
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger render={<Button variant="outline" className="gap-2"><IconLayoutSidebarRight size={16} />Filtros laterais</Button>} />
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="font-serif">Filtros</SheetTitle>
                      <SheetDescription>Filtrar paróquias por cidade</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <div className="space-y-1">
                        <Label>Cidade</Label>
                        <Select><SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="botucatu">Botucatu</SelectItem>
                            <SelectItem value="avare">Avaré</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent></Card>
            </Sub>

            <Sub title="Tooltip — dicas em ícones">
              <Card><CardContent className="p-6 flex flex-wrap gap-4">
                {[
                  { icon: <IconMapPin size={16} />,      tip: "Ver no mapa" },
                  { icon: <IconDownload size={16} />,    tip: "Baixar PDF" },
                  { icon: <IconCalendar size={16} />,    tip: "Adicionar à agenda" },
                  { icon: <IconLink size={16} />,        tip: "Copiar link" },
                  { icon: <IconPencil size={16} />,      tip: "Editar conteúdo" },
                  { icon: <IconExternalLink size={16} />,tip: "Abrir em nova aba" },
                ].map(({ icon, tip }) => (
                  <Tooltip key={tip}>
                    <TooltipTrigger render={<Button variant="outline" size="icon" />}>
                      {icon}
                    </TooltipTrigger>
                    <TooltipContent>{tip}</TooltipContent>
                  </Tooltip>
                ))}
              </CardContent></Card>
            </Sub>

            <Sub title="Popover — filtro de data">
              <Card><CardContent className="p-6 flex flex-col gap-3">
                <Popover>
                  <PopoverTrigger render={<Button variant="outline" className="gap-2"><IconCalendar size={15} />Filtrar por data</Button>} />
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={calDate} onSelect={setCalDate} />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <IconCalendar size={12} />
                  Selecionado: {calDate?.toLocaleDateString("pt-BR")}
                </p>
              </CardContent></Card>
            </Sub>
          </div>
        </Section>

        {/* ══════════════════════════════════════
            14. CALENDAR — agenda pastoral
        ══════════════════════════════════════ */}
        <Section title="Calendar" id="calendar">
          <Sub title="Visualização mensal — /agenda">
            <div className="flex gap-6 flex-wrap">
              <Calendar mode="single" selected={calDate} onSelect={setCalDate} className="rounded-lg border border-border bg-card" />
              <div className="flex-1 min-w-60 space-y-3">
                <p className="text-sm font-semibold">
                  Eventos em {calDate?.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                </p>
                {[
                  { day: "08", month: "jun", title: "Ordenação Presbiteral", local: "Catedral · 10h" },
                  { day: "15", month: "jun", title: "Encontro de Catequistas", local: "Centro Pastoral · 9h" },
                  { day: "29", month: "jun", title: "Solenidade SS. Pedro e Paulo", local: "Todas as paróquias" },
                ].map(({ day, month, title, local }) => (
                  <div key={day} className="flex gap-3 p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded bg-primary flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[11px] text-primary-foreground font-bold leading-none">{day}</span>
                      <span className="text-[9px] text-primary-foreground/70 leading-none">{month}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <IconMapPin size={11} />{local}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Sub>
        </Section>

        {/* ══════════════════════════════════════
            15. SONNER / TOASTS
        ══════════════════════════════════════ */}
        <Section title="Notificações (Sonner)" id="toasts">
          <Sub title="Feedback de ações do CMS e formulários">
            <Card><CardContent className="p-6 flex flex-wrap gap-3">
              <Button className="gap-2" onClick={() => toast.success("Notícia publicada!", { description: "Visível no portal agora." })}>
                <IconCheck size={15} /> Sucesso
              </Button>
              <Button variant="destructive" className="gap-2" onClick={() => toast.error("Erro ao salvar", { description: "Verifique os campos e tente novamente." })}>
                <IconX size={15} /> Erro
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => toast.warning("Atenção!", { description: "Este documento ainda não foi revisado." })}>
                <IconAlertTriangle size={15} /> Atenção
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => toast.info("Informação", { description: "O calendário litúrgico foi atualizado." })}>
                <IconInfoCircle size={15} /> Info
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => toast.loading("Enviando mensagem…")}>
                <IconLoader2 size={15} className="animate-spin" /> Carregando
              </Button>
              <Button variant="secondary" className="gap-2" onClick={() => toast("Mensagem enviada!", { description: "Responderemos em até 3 dias úteis.", action: { label: "Desfazer", onClick: () => {} } })}>
                <IconMail size={15} /> Com ação
              </Button>
            </CardContent></Card>
          </Sub>
        </Section>

        {/* ══════════════════════════════════════
            16. BUTTON
        ══════════════════════════════════════ */}
        <Section title="Buttons" id="buttons">
          <div className="grid grid-cols-2 gap-6">
            <Sub title="Variantes">
              <Card><CardContent className="p-6 flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Accent</Button>
                <Button className="bg-success text-success-foreground hover:bg-success/90 gap-2"><IconCheck size={14} />Sucesso</Button>
              </CardContent></Card>
            </Sub>
            <Sub title="Tamanhos · Com ícone · Estados">
              <Card><CardContent className="p-6 space-y-4">
                <div className="flex items-center flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><IconBuildingChurch size={18} /></Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="gap-2"><IconArrowRight size={15} />Com ícone</Button>
                  <Button variant="outline" className="gap-2"><IconSearch size={15} />Buscar</Button>
                  <Button disabled>Desabilitado</Button>
                </div>
              </CardContent></Card>
            </Sub>
          </div>
        </Section>

        {/* ══════════════════════════════════════
            17. CARDS
        ══════════════════════════════════════ */}
        <Section title="Cards" id="cards">
          <div className="grid grid-cols-3 gap-4">
            <Card className="hover:border-primary hover:shadow-md transition-all cursor-pointer">
              <CardHeader>
                <Badge className="w-fit mb-1 bg-primary/10 text-primary border-0">Pastoral</Badge>
                <CardTitle className="font-serif text-lg leading-tight">Dom [Arcebispo] preside encontro de formação</CardTitle>
                <CardDescription>Evento reuniu coordenadores de todas as paróquias.</CardDescription>
              </CardHeader>
              <CardFooter className="text-xs text-muted-foreground flex items-center gap-1">
                <IconCalendar size={12} />
                28 de maio de 2025
              </CardFooter>
            </Card>
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <Badge className="w-fit mb-1">Agenda</Badge>
                <CardTitle className="font-serif text-lg">Ordenação Presbiteral</CardTitle>
                <CardDescription className="flex items-center gap-1"><IconMapPin size={12} />Catedral · 8 de junho · 10h00</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button size="sm" className="w-full gap-2"><IconArrowRight size={14} />Ver detalhes</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-base">Catedral Nossa Senhora das Dores</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p className="flex items-center gap-1.5"><IconMapPin size={13} className="text-primary" />Botucatu — Centro</p>
                <p className="flex items-center gap-1.5"><IconClock size={13} className="text-primary" />Dom 07h · 09h · 11h · 18h30</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost" className="w-full text-primary gap-2">
                  Ver paróquia <IconArrowRight size={14} />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* ══════════════════════════════════════
            18. DESIGN SUMMARY
        ══════════════════════════════════════ */}
        <Section title="Design Summary" id="summary">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6 space-y-3 text-sm">
                {[
                  ["Primary",      "#8B1A2E — Vinho borgonha"],
                  ["Accent",       "#C9A84C — Ouro dourado"],
                  ["Background",   "#f5f3ef — Creme quente"],
                  ["Heading font", "Lora (serif)"],
                  ["Body font",    "Geist Sans"],
                  ["Icons",        "@tabler/icons-react"],
                  ["Radius",       "0.5rem — arredondado"],
                  ["Estilo",       "Clássico institucional"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2 border-b border-border pb-2 last:border-0 last:pb-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-right">{v}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-xs font-mono text-muted-foreground mb-3">28 componentes shadcn/ui instalados</p>
                <div className="flex flex-wrap gap-1.5">
                  {["button","card","badge","alert","radio-group","label","input","textarea","select","checkbox","toggle","toggle-group","separator","avatar","skeleton","table","breadcrumb","pagination","tabs","accordion","dialog","sheet","tooltip","popover","calendar","sonner","scroll-area","navigation-menu"].map(c => (
                    <Badge key={c} variant="outline" className="text-[10px] font-mono">{c}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Arquidiocese de Botucatu — Design System · 28 componentes · Tailwind CSS v4 · shadcn/ui · Next.js 16
        </div>

      </div>
    </div>
  )
}
