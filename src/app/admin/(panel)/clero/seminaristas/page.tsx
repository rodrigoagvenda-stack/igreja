import Link from "next/link"
import { IconPlus, IconPencil } from "@tabler/icons-react"

export const metadata = { title: "Seminaristas" }

const seminaristas = [
  { id: 1,  nome: "André Lucas Sousa da Silva",      nascimento: "10/06/2000", ano: "Propedêutico",  paroquia: "Santíssimo Sacramento",   cidade: "Botucatu" },
  { id: 2,  nome: "Jhonatan Sousa da Silva",         nascimento: "16/04/1996", ano: "Propedêutico",  paroquia: "Sant'Ana e São Joaquim",   cidade: "Lençóis Paulista" },
  { id: 3,  nome: "João Pedro Porphírio dos Santos", nascimento: "23/02/2008", ano: "Propedêutico",  paroquia: "N. S. Rosário de Fátima", cidade: "Botucatu" },
  { id: 4,  nome: "Mateus Henrique Langoni",         nascimento: "08/07/2005", ano: "Propedêutico",  paroquia: "Sant'Ana e São Joaquim",   cidade: "Lençóis Paulista" },
  { id: 5,  nome: "Gabriel Augusto Ferreira",        nascimento: "12/03/2001", ano: "1.º Filosofia", paroquia: "São Francisco de Assis",  cidade: "Botucatu" },
  { id: 6,  nome: "Lucas Henrique Pereira",          nascimento: "05/11/2000", ano: "2.º Filosofia", paroquia: "São Benedito",            cidade: "Botucatu" },
  { id: 7,  nome: "Matheus Costa Oliveira",          nascimento: "29/07/1999", ano: "3.º Filosofia", paroquia: "N. S. Aparecida",         cidade: "Botucatu" },
  { id: 8,  nome: "Rafael Souza Alves",              nascimento: "18/04/1998", ano: "1.º Teologia",  paroquia: "São José",                cidade: "Avaré" },
  { id: 9,  nome: "Pedro Henrique Lima",             nascimento: "22/09/1997", ano: "2.º Teologia",  paroquia: "Santa Cruz",              cidade: "Laranjal Paulista" },
  { id: 10, nome: "Vitor Augusto Gonçalves",         nascimento: "14/01/1996", ano: "3.º Teologia",  paroquia: "Sant'Ana e São Joaquim",  cidade: "Lençóis Paulista" },
  { id: 11, nome: "Thiago Rodrigues Santos",         nascimento: "03/06/1995", ano: "4.º Teologia",  paroquia: "São Benedito",            cidade: "Botucatu" },
]

const anoColor: Record<string, string> = {
  "Propedêutico":  "bg-muted text-muted-foreground",
  "1.º Filosofia": "bg-primary/10 text-primary",
  "2.º Filosofia": "bg-primary/10 text-primary",
  "3.º Filosofia": "bg-primary/10 text-primary",
  "1.º Teologia":  "bg-accent/20 text-foreground",
  "2.º Teologia":  "bg-accent/20 text-foreground",
  "3.º Teologia":  "bg-accent/20 text-foreground",
  "4.º Teologia":  "bg-accent/20 text-foreground",
}

export default function AdminSemainaristasPage() {
  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Clero
          </p>
          <h1 className="font-serif text-[28px] font-bold">Seminaristas</h1>
        </div>
        <Link
          href="/admin/clero/seminaristas/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Cadastrar seminarista
        </Link>
      </div>

      <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-5 py-3 border-b border-border bg-muted/40">
          <span>Nome</span>
          <span className="px-4 text-center">Nascimento</span>
          <span className="px-4 text-center">Ano</span>
          <span className="w-8" />
        </div>
        <div className="divide-y divide-border">
          {seminaristas.map(({ id, nome, nascimento, ano, paroquia, cidade }) => (
            <div key={id} className="grid grid-cols-[1fr_auto_auto_auto] items-center px-5 py-3.5 hover:bg-muted/40 transition-colors">
              <div>
                <p className="text-[13px] font-medium">{nome}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{paroquia} — {cidade}</p>
              </div>
              <span className="text-[12px] text-muted-foreground px-4 text-center">{nascimento}</span>
              <span className={`text-[10px] font-semibold uppercase tracking-[.04em] px-2 py-0.5 rounded-full mx-4 text-center whitespace-nowrap ${anoColor[ano]}`}>
                {ano}
              </span>
              <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <IconPencil size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
