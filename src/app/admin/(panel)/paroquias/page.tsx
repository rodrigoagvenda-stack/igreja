import Link from "next/link"
import { IconPlus, IconPencil, IconMapPin } from "@tabler/icons-react"

export const metadata = { title: "Paróquias" }

const paroquias = [
  { id: 1,  nome: "Catedral Nossa Senhora das Dores",  cidade: "Botucatu",          regiao: "RP1", padres: 3 },
  { id: 2,  nome: "São Benedito",                      cidade: "Botucatu",          regiao: "RP1", padres: 1 },
  { id: 3,  nome: "Nossa Senhora Aparecida",           cidade: "Botucatu",          regiao: "RP1", padres: 2 },
  { id: 4,  nome: "Sant'Ana e São Joaquim",            cidade: "Lençóis Paulista",  regiao: "RP4", padres: 2 },
  { id: 5,  nome: "São José",                          cidade: "Avaré",             regiao: "RP2", padres: 1 },
  { id: 6,  nome: "Nossa Senhora do Rosário",          cidade: "Itatinga",          regiao: "RP1", padres: 1 },
  { id: 7,  nome: "São Francisco de Assis",            cidade: "Bofete",            regiao: "RP1", padres: 1 },
  { id: 8,  nome: "Santa Cruz",                        cidade: "Laranjal Paulista", regiao: "RP3", padres: 1 },
]

const regiaoColor: Record<string, string> = {
  RP1: "bg-primary/10 text-primary",
  RP2: "bg-accent/20 text-foreground",
  RP3: "bg-success/10 text-success",
  RP4: "bg-warning/15 text-warning-foreground",
}

export default function AdminParoquiasPage() {
  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Estrutura pastoral
          </p>
          <h1 className="font-serif text-[28px] font-bold">Paróquias</h1>
        </div>
        <Link
          href="/admin/paroquias/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Nova paróquia
        </Link>
      </div>

      <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-5 py-3 border-b border-border bg-muted/40">
          <span>Paróquia</span>
          <span className="text-center px-4">Região</span>
          <span className="text-center px-4">Padres</span>
          <span className="w-8" />
        </div>
        <div className="divide-y divide-border">
          {paroquias.map(({ id, nome, cidade, regiao, padres }) => (
            <div key={id} className="grid grid-cols-[1fr_auto_auto_auto] items-center px-5 py-3.5 hover:bg-muted/40 transition-colors">
              <div>
                <p className="text-[13px] font-medium">{nome}</p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                  <IconMapPin size={10} />
                  {cidade}
                </p>
              </div>
              <span className={`text-[10px] font-semibold uppercase tracking-[.05em] px-2.5 py-0.5 rounded-full mx-4 ${regiaoColor[regiao]}`}>
                {regiao}
              </span>
              <span className="text-[13px] text-muted-foreground text-center px-4">{padres}</span>
              <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <IconPencil size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-border bg-muted/30">
          <p className="text-[12px] text-muted-foreground">
            Exibindo 8 de 47 paróquias — <Link href="#" className="text-primary hover:underline">ver todas</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
