import Link from "next/link"
import Image from "next/image"
import { IconMapPin, IconArrowRight } from "@tabler/icons-react"

const paroquias = [
  { nome: "Catedral Nossa Senhora das Dores", cidade: "Botucatu", href: "/paroquias/catedral-nossa-senhora-das-dores" },
  { nome: "Paróquia São José",               cidade: "Botucatu", href: "/paroquias/sao-jose" },
  { nome: "Paróquia Nossa Senhora Aparecida", cidade: "Avaré",   href: "/paroquias/nossa-senhora-aparecida" },
]

export function ParoquiasDestaque() {
  return (
    <section className="py-16 md:py-20 bg-muted" aria-label="Paróquias em destaque">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">

        {/* Section header */}
        <div className="flex items-end justify-between mb-7 pb-4 border-b border-border">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
              <span className="block w-4 h-0.5 bg-primary" aria-hidden="true" />
              Comunidades
            </p>
            <h2 className="font-serif text-2xl font-bold">Paróquias em destaque</h2>
          </div>
          <Link href="/paroquias" className="text-[13px] text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Ver todas <IconArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paroquias.map(({ nome, cidade, href }) => (
            <Link
              key={href}
              href={href}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_4px_16px_rgba(139,26,46,.12)] transition-all"
            >
              {/* Image */}
              <div className="h-[120px] relative overflow-hidden">
                <Image src={`https://picsum.photos/seed/${href}/400/160`} alt={nome} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
              </div>

              {/* Body */}
              <div className="px-4 py-3">
                <h3 className="font-serif text-[14px] font-bold leading-[1.3] mb-1 group-hover:text-primary transition-colors">
                  {nome}
                </h3>
                <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
                  <IconMapPin size={12} className="text-primary flex-shrink-0" />
                  {cidade}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
