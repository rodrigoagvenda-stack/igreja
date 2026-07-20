"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconMapPin, IconBuildingChurch, IconUser } from "@tabler/icons-react"

type Padre = {
  id: string
  nome: string
  foto_url: string | null
  arq_paroquias: { nome: string; cidade: string } | null
}

export default function PadresClient({ padres }: { padres: Padre[] }) {
  const cidades = ["Todas as cidades", ...Array.from(new Set(
    padres.flatMap(p => p.arq_paroquias ? [p.arq_paroquias.cidade] : [])
  )).sort()]

  const [cidade, setCidade] = useState("Todas as cidades")

  const filtrados = cidade === "Todas as cidades"
    ? padres
    : padres.filter(p => p.arq_paroquias?.cidade === cidade)

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Select value={cidade} onValueChange={v => setCidade(v ?? "Todas as cidades")}>
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cidades.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <span className="text-[13px] text-muted-foreground">
          {filtrados.length} padre{filtrados.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtrados.map(({ id, nome, foto_url, arq_paroquias: paroquia }) => (
          <div key={id} className="bg-card border border-border rounded-lg p-5 flex flex-col items-center text-center gap-3 hover:border-primary hover:shadow-[0_4px_16px_rgba(39,79,160,.08)] transition-all">
            <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0 bg-muted flex items-center justify-center">
              {foto_url ? (
                <img src={foto_url} alt={nome} className="w-full h-full object-cover" />
              ) : (
                <IconUser size={28} className="text-muted-foreground/40" />
              )}
            </div>
            <div>
              <p className="font-serif font-bold text-[14px] leading-snug">{nome}</p>
              {paroquia && (
                <>
                  <p className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground mt-1">
                    <IconBuildingChurch size={11} className="text-primary flex-shrink-0" />
                    <span className="line-clamp-2">{paroquia.nome}</span>
                  </p>
                  <p className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                    <IconMapPin size={11} className="text-primary flex-shrink-0" />
                    {paroquia.cidade}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="font-medium">Nenhum padre encontrado para essa cidade.</p>
        </div>
      )}
    </div>
  )
}
