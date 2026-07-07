import Link from "next/link"
import { IconPlus, IconPencil } from "@tabler/icons-react"

export const metadata = { title: "Diáconos" }

const diaconos = [
  { id: 1,  nome: "Dc. Carlos Alberto Souza",     nascimento: "14/05/1958", ordenacao: "29/06/2002", cidade: "Botucatu" },
  { id: 2,  nome: "Dc. Paulo Roberto Mendes",     nascimento: "22/08/1962", ordenacao: "28/06/2008", cidade: "Botucatu" },
  { id: 3,  nome: "Dc. José Renato Alves",        nascimento: "07/01/1960", ordenacao: "29/06/2010", cidade: "Lençóis Paulista" },
  { id: 4,  nome: "Dc. Antônio Carlos Lima",      nascimento: "30/11/1955", ordenacao: "15/08/2012", cidade: "Avaré" },
  { id: 5,  nome: "Dc. Mário Sérgio Ferreira",    nascimento: "18/03/1967", ordenacao: "29/06/2015", cidade: "Botucatu" },
  { id: 6,  nome: "Dc. Luís Henrique Castro",     nascimento: "04/07/1970", ordenacao: "28/06/2018", cidade: "Laranjal Paulista" },
  { id: 7,  nome: "Dc. Roberto Carlos Gomes",     nascimento: "12/09/1965", ordenacao: "29/06/2020", cidade: "Lençóis Paulista" },
  { id: 8,  nome: "Dc. Francisco Neto Carvalho",  nascimento: "26/04/1972", ordenacao: "12/06/2022", cidade: "Botucatu" },
  { id: 9,  nome: "Dc. Pedro Augusto Pires",      nascimento: "09/02/1963", ordenacao: "28/06/2014", cidade: "Avaré" },
  { id: 10, nome: "Dc. João Batista Rezende",     nascimento: "17/12/1968", ordenacao: "29/06/2016", cidade: "Botucatu" },
  { id: 11, nome: "Dc. Eduardo Moreira Dias",     nascimento: "23/06/1975", ordenacao: "28/06/2019", cidade: "Lençóis Paulista" },
  { id: 12, nome: "Dc. Marcelo Aparecido Cunha",  nascimento: "01/08/1971", ordenacao: "29/06/2021", cidade: "Botucatu" },
  { id: 13, nome: "Dc. Sérgio Luís Barbosa",      nascimento: "15/10/1969", ordenacao: "28/06/2023", cidade: "Avaré" },
]

export default function AdminDiaconosPage() {
  return (
    <div className="p-8 max-w-[1100px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <span className="block w-4 h-0.5 bg-primary shrink-0" />
            Clero
          </p>
          <h1 className="font-serif text-[28px] font-bold">Diáconos Permanentes</h1>
        </div>
        <Link
          href="/admin/clero/diaconos/novo"
          className="flex items-center gap-2 bg-primary text-white text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <IconPlus size={14} />
          Cadastrar diácono
        </Link>
      </div>

      <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-5 py-3 border-b border-border bg-muted/40">
          <span>Nome</span>
          <span className="px-4 text-center">Nascimento</span>
          <span className="px-4 text-center">Ordenação</span>
          <span className="w-8" />
        </div>
        <div className="divide-y divide-border">
          {diaconos.map(({ id, nome, nascimento, ordenacao, cidade }) => (
            <div key={id} className="grid grid-cols-[1fr_auto_auto_auto] items-center px-5 py-3.5 hover:bg-muted/40 transition-colors">
              <div>
                <p className="text-[13px] font-medium">{nome}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{cidade}</p>
              </div>
              <span className="text-[12px] text-muted-foreground px-4 text-center">{nascimento}</span>
              <span className="text-[12px] text-muted-foreground px-4 text-center">{ordenacao}</span>
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
