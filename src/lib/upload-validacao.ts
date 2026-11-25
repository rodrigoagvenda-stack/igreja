// Regras únicas de envio de arquivo (rota /api/admin/upload e formulários com arquivo).
// Só imagem em arq-fotos; imagem ou PDF em arq-documentos. A extensão sai do tipo aceito,
// não do nome que o navegador mandou, e os primeiros bytes precisam bater com o tipo:
// não dá pra subir .html/.svg/.js disfarçado.

const TIPOS: Record<string, Record<string, string>> = {
  "arq-fotos": { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" },
  "arq-documentos": { "application/pdf": "pdf", "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" },
}
const MAX_BYTES: Record<string, number> = { "arq-fotos": 10 * 1024 * 1024, "arq-documentos": 25 * 1024 * 1024 }

function assinaturaOk(tipo: string, b: Uint8Array) {
  const hex = (n: number) => Array.from(b.slice(0, n)).map(x => x.toString(16).padStart(2, "0")).join("")
  const txt = (i: number, f: number) => new TextDecoder().decode(b.slice(i, f))
  if (tipo === "image/jpeg") return hex(3) === "ffd8ff"
  if (tipo === "image/png") return hex(8) === "89504e470d0a1a0a"
  if (tipo === "image/webp") return txt(0, 4) === "RIFF" && txt(8, 12) === "WEBP"
  if (tipo === "application/pdf") return txt(0, 5) === "%PDF-"
  return false
}

/** Valida o arquivo; devolve a extensão segura ou a mensagem de erro para o usuário. */
export function validarArquivo(bucket: string, tipo: string, tamanho: number, inicio: Uint8Array):
  { ok: true; ext: string } | { ok: false; erro: string } {
  const aceitos = TIPOS[bucket]
  if (!aceitos) return { ok: false, erro: "Destino de arquivo inválido." }
  const ext = aceitos[tipo]
  if (!ext) {
    return { ok: false, erro: bucket === "arq-fotos" ? "Envie uma imagem JPG, PNG ou WebP." : "Envie um PDF ou uma imagem (JPG, PNG, WebP)." }
  }
  if (tamanho > MAX_BYTES[bucket]) {
    return { ok: false, erro: `Arquivo grande demais (máximo ${MAX_BYTES[bucket] / 1024 / 1024} MB).` }
  }
  if (!assinaturaOk(tipo, inicio)) return { ok: false, erro: "O conteúdo do arquivo não corresponde ao tipo informado." }
  return { ok: true, ext }
}
