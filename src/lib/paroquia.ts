import type { FotoParoquia } from "@/types/database"

export function getFotoCapa(fotos: FotoParoquia[] | null | undefined): string | null {
  if (!fotos || fotos.length === 0) return null
  return fotos.find(f => f.tag === "Fachada")?.url ?? fotos[0].url
}
