"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { toast } from "sonner"

const MENSAGENS: Record<string, string> = {
  criado: "Criado com sucesso",
  atualizado: "Salvo com sucesso",
  excluido: "Excluído com sucesso",
  convidado: "Convite enviado por e-mail",
  reenviado: "Convite reenviado",
}

export function ActionToastListener() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const ok = searchParams.get("ok")
    const erro = searchParams.get("erro")

    if (ok && MENSAGENS[ok]) {
      toast.success(MENSAGENS[ok])
      router.replace(pathname)
    } else if (erro) {
      toast.error(decodeURIComponent(erro))
      router.replace(pathname)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return null
}
