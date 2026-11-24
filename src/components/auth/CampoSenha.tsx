"use client"

import { useState } from "react"
import { IconEye, IconEyeOff } from "@tabler/icons-react"

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalido?: boolean
}

// Campo de senha com o botão de mostrar/ocultar.
export function CampoSenha({ invalido, className, ...props }: Props) {
  const [visivel, setVisivel] = useState(false)
  return (
    <div className="relative">
      <input
        {...props}
        type={visivel ? "text" : "password"}
        aria-invalid={invalido || undefined}
        className={`w-full h-10 pl-3 pr-10 rounded-md border text-[14px] focus:outline-none focus:ring-2 transition-colors ${
          invalido
            ? "border-destructive focus:ring-destructive/25 focus:border-destructive"
            : "border-border focus:ring-primary/30 focus:border-primary"
        } ${className ?? ""}`}
      />
      <button
        type="button"
        onClick={() => setVisivel(v => !v)}
        aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
        className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
      >
        {visivel ? <IconEyeOff size={17} /> : <IconEye size={17} />}
      </button>
    </div>
  )
}
