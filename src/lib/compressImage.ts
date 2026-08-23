const MAX_DIM = 1600
const QUALITY = 0.82

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file

  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_DIM / Math.max(bitmap.width, bitmap.height))
    const w = Math.round(bitmap.width * scale)
    const h = Math.round(bitmap.height * scale)

    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d")
    if (!ctx) return file
    ctx.drawImage(bitmap, 0, 0, w, h)

    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", QUALITY))
    if (!blob || blob.size >= file.size) return file

    const newName = file.name.replace(/\.\w+$/, "") + ".jpg"
    return new File([blob], newName, { type: "image/jpeg" })
  } catch {
    return file
  }
}
