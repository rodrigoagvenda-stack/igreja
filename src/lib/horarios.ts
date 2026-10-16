const ORDEM_DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

// Junta dias consecutivos em faixa ("Segunda a Sexta") e o resto por vírgula.
export function formatDias(dias: string[]): string {
  if (dias.length === 0) return ""

  const indices = dias
    .map(d => ORDEM_DIAS.indexOf(d))
    .filter(i => i >= 0)
    .sort((a, b) => a - b)

  if (indices.length === 0) return dias.join(", ")

  const grupos: number[][] = []
  let atual: number[] = [indices[0]]
  for (let i = 1; i < indices.length; i++) {
    if (indices[i] === atual[atual.length - 1] + 1) {
      atual.push(indices[i])
    } else {
      grupos.push(atual)
      atual = [indices[i]]
    }
  }
  grupos.push(atual)

  return grupos
    .map(g => {
      if (g.length === 1) return ORDEM_DIAS[g[0]]
      if (g.length === 2) return `${ORDEM_DIAS[g[0]]} e ${ORDEM_DIAS[g[1]]}`
      return `${ORDEM_DIAS[g[0]]} a ${ORDEM_DIAS[g[g.length - 1]]}`
    })
    .join(", ")
}
