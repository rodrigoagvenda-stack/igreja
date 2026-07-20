import Link from "next/link"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

type Props = {
  page: number
  total: number
  pageSize: number
  basePath: string
}

export function Pagination({ page, total, pageSize, basePath }: Props) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null

  const prev = page > 1 ? page - 1 : null
  const next = page < totalPages ? page + 1 : null

  const btnBase = "flex items-center gap-1 text-[12px] font-medium px-3 py-1.5 rounded-md border transition-colors"
  const btnActive = `${btnBase} border-border hover:border-primary hover:text-primary`
  const btnDisabled = `${btnBase} border-border text-muted-foreground opacity-40 cursor-not-allowed`

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-[12px] text-muted-foreground">
        Página <strong>{page}</strong> de <strong>{totalPages}</strong> — {total} itens
      </p>
      <div className="flex items-center gap-2">
        {prev ? (
          <Link href={`${basePath}?page=${prev}`} className={btnActive}>
            <IconChevronLeft size={14} /> Anterior
          </Link>
        ) : (
          <span className={btnDisabled}><IconChevronLeft size={14} /> Anterior</span>
        )}
        {next ? (
          <Link href={`${basePath}?page=${next}`} className={btnActive}>
            Próxima <IconChevronRight size={14} />
          </Link>
        ) : (
          <span className={btnDisabled}>Próxima <IconChevronRight size={14} /></span>
        )}
      </div>
    </div>
  )
}
