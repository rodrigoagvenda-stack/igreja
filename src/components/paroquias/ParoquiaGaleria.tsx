"use client"

import { useState } from "react"
import Image from "next/image"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

interface Props {
  fotos: string[]
  nome: string
}

export function ParoquiaGaleria({ fotos, nome }: Props) {
  const [selecionada, setSelecionada] = useState(0)

  if (fotos.length === 0) return null

  function anterior() {
    setSelecionada(i => (i === 0 ? fotos.length - 1 : i - 1))
  }

  function proxima() {
    setSelecionada(i => (i === fotos.length - 1 ? 0 : i + 1))
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden ring-1 ring-border bg-muted">
        <Image
          key={fotos[selecionada]}
          src={fotos[selecionada]}
          alt={`${nome} — foto ${selecionada + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 780px"
          priority={selecionada === 0}
        />

        {selecionada === 0 && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-[.05em] px-2.5 py-1 rounded bg-primary text-white shadow-sm">
            Fachada
          </span>
        )}

        {fotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center shadow-md transition-colors"
            >
              <IconChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={proxima}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center shadow-md transition-colors"
            >
              <IconChevronRight size={18} />
            </button>
            <span className="absolute bottom-3 right-3 text-[11px] font-medium px-2 py-1 rounded bg-black/50 text-white">
              {selecionada + 1} / {fotos.length}
            </span>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {fotos.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setSelecionada(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`relative shrink-0 w-20 h-14 rounded-md overflow-hidden transition-all ${
                i === selecionada ? "ring-2 ring-primary" : "ring-1 ring-border opacity-80 hover:opacity-100"
              }`}
            >
              <Image src={url} alt={`Miniatura ${i + 1}`} fill className="object-cover" sizes="80px" />
              {i === 0 && (
                <span className="absolute bottom-0.5 left-0.5 text-[8px] font-semibold uppercase px-1 py-px rounded bg-primary/90 text-white">
                  Fachada
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
