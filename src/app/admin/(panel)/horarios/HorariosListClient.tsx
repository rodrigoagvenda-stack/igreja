"use client"

import { useState } from "react"
import Link from "next/link"
import { IconPencil, IconMapPin, IconSearch } from "@tabler/icons-react"

type LocalRaw = {
  id: string
  nome: string
  tipos: ("Matriz" | "Capela")[]
  arq_horarios_missa: { id: string }[]
}

type ParoquiaRaw = {
  id: string
  nome: string
  cidade: string
  arq_locais: LocalRaw[]
}

export function HorariosListClient({ paroquias }: { paroquias: ParoquiaRaw[] }) {
  const [busca, setBusca] = useState("")

  const filtradas = paroquias.filter(p => {
    const termo = busca.toLowerCase()
    return p.nome.toLowerCase().includes(termo) || p.cidade.toLowerCase().includes(termo)
  })

  return (
    <>
      <div className="relative mb-5">
        <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar por nome ou cidade…"
          className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {filtradas.length > 0 ? (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl overflow-hidden">
          <div className="divide-y divide-border">
            {filtradas.map((paroquia) => {
              const locais = paroquia.arq_locais ?? []
              const totalHorarios = locais.reduce((sum, l) => sum + l.arq_horarios_missa.length, 0)
              return (
                <Link
                  key={paroquia.id}
                  href={`/admin/paroquias/${paroquia.id}/horarios`}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium">{paroquia.nome}</p>
                    <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                      <IconMapPin size={10} /> {paroquia.cidade}
                    </p>
                    {locais.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {locais.map(l => (
                          <span key={l.id} className="flex items-center gap-1 text-[11px] bg-muted rounded px-2 py-0.5 text-foreground">
                            {l.nome}
                            <span className="text-muted-foreground">({l.tipos.join(", ")})</span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-warning-foreground mt-1.5">Nenhum local cadastrado ainda</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-muted-foreground">{totalHorarios} horário{totalHorarios !== 1 ? "s" : ""}</p>
                    <span className="inline-flex items-center gap-1 text-[12px] text-primary font-medium mt-1">
                      <IconPencil size={13} /> Gerenciar
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-12 text-center">
          <p className="text-[14px] font-semibold text-foreground">Nenhuma paróquia encontrada para "{busca}"</p>
          <p className="text-[13px] text-muted-foreground mt-1">Tente outro nome ou cidade.</p>
        </div>
      )}
    </>
  )
}
