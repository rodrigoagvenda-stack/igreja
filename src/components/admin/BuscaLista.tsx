import { IconSearch } from "@tabler/icons-react"

/** Limpa o texto da busca: tira caracteres que mudam o filtro do banco (%, _, vírgula, parênteses). */
export function limparBusca(q: string | undefined) {
  return (q ?? "").replace(/[%_,()*\\]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80)
}

/** Campo de busca das listas do painel (envia ?q= e volta para a página 1). */
export function BuscaLista({ valor, placeholder }: { valor: string; placeholder: string }) {
  return (
    <form className="relative mb-5" role="search">
      <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        name="q"
        defaultValue={valor}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
    </form>
  )
}
