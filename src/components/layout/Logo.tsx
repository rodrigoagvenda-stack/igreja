import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "icon"
  className?: string
  href?: string
  inverted?: boolean
}

export function Logo({ variant = "full", className, href = "/", inverted = false }: LogoProps) {
  const content = (
    <div className={cn("flex items-center select-none", className)}>
      <Image
        src="/Arqu de botucatu.svg"
        alt="Arquidiocese de Botucatu"
        width={220}
        height={78}
        className={cn("h-10 w-auto object-contain", inverted && "brightness-0 invert")}
        priority
      />
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-85 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}

export function NavLogo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-85 transition-opacity" aria-label="Arquidiocese de Botucatu — Página inicial">
      <Image
        src="/Arqu de botucatu.svg"
        alt="Arquidiocese de Botucatu"
        width={220}
        height={78}
        className="h-9 w-auto object-contain"
        priority
      />
    </Link>
  )
}

export function FooterLogo() {
  return (
    <Link href="/" className="inline-flex hover:opacity-85 transition-opacity" aria-label="Arquidiocese de Botucatu — Página inicial">
      <Image
        src="/Arqu de botucatu.svg"
        alt="Arquidiocese de Botucatu"
        width={220}
        height={78}
        className="h-10 w-auto object-contain brightness-0 invert opacity-90"
        priority
      />
    </Link>
  )
}
