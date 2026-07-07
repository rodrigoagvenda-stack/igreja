import Link from "next/link"
import { IconPlus, IconPencil } from "@tabler/icons-react"

export const metadata = { title: "Padres" }

const padres = [
  { id: 1,  nome: "Pe. José Carlos de Oliveira",   nascimento: "12/03/1965", ordenacao: "28/06/1991", paroquia: "Catedral N. S. das Dores",   cidade: "Botucatu" },
  { id: 2,  nome: "Pe. Antonio Marcos Silva",      nascimento: "08/07/1972", ordenacao: "15/08/1999", paroquia: "São Benedito",               cidade: "Botucatu" },
  { id: 3,  nome: "Pe. Francisco Alves Pereira",  nascimento: "20/11/1968", ordenacao: "29/06/1995", paroquia: "N. S. Aparecida",            cidade: "Botucatu" },
  { id: 4,  nome: "Pe. João Paulo Ferreira",       nascimento: "14/04/1980", ordenacao: "12/06/2007", paroquia: "Sant'Ana e São Joaquim",     cidade: "Lençóis Paulista" },
  { id: 5,  nome: "Pe. Marcos Aurélio Costa",      nascimento: "03/09/1975", ordenacao: "29/06/2002", paroquia: "São José",                   cidade: "Avaré" },
  { id: 6,  nome: "Pe. Luís Fernando Rodrigues",  nascimento: "22/01/1983", ordenacao: "04/08/2011", paroquia: "N. S. do Rosário",           cidade: "Itatinga" },
]

export default function AdminPadresPage() {
  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Clero
          </p>
          <h1 className="font-serif text-[28px] font-bold">Padres</h1>
        </div>
        <Link
          href="/admin/clero/padres/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Cadastrar padre
        </Link>
      </div>

      <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-5 py-3 border-b border-border bg-muted/40">
          <span>Padre</span>
          <span className="px-4 text-center">Nascimento</span>
          <span className="px-4 text-center">Ordenação</span>
          <span className="w-8" />
        </div>
        <div className="divide-y divide-border">
          {padres.map(({ id, nome, nascimento, ordenacao, paroquia, cidade }) => (
            <div key={id} className="grid grid-cols-[1fr_auto_auto_auto] items-center px-5 py-3.5 hover:bg-muted/40 transition-colors">
              <div>
                <p className="text-[13px] font-medium">{nome}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{paroquia} — {cidade}</p>
              </div>
              <span className="text-[12px] text-muted-foreground px-4 text-center">{nascimento}</span>
              <span className="text-[12px] text-muted-foreground px-4 text-center">{ordenacao}</span>
              <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <IconPencil size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-border bg-muted/30">
          <p className="text-[12px] text-muted-foreground">Exibindo 6 de 89 padres</p>
        </div>
      </div>
    </div>
  )
}
