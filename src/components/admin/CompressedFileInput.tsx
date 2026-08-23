"use client"

import { useRef, useState } from "react"

const MAX_DIM = 1600
const QUALITY = 0.82

async function compressImage(file: File): Promise<File> {
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

interface Props {
  name: string
  accept?: string
  className?: string
}

export function CompressedFileInput({ name, accept, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [otimizando, setOtimizando] = useState(false)

  async function handleChange() {
    const input = inputRef.current
    const file = input?.files?.[0]
    if (!input || !file) return

    setOtimizando(true)
    try {
      const compressed = await compressImage(file)
      if (compressed !== file) {
        const dt = new DataTransfer()
        dt.items.add(compressed)
        input.files = dt.files
      }
    } finally {
      setOtimizando(false)
    }
  }

  return (
    <>
      <input ref={inputRef} type="file" name={name} accept={accept} onChange={handleChange} className={className} />
      {otimizando && <p className="text-[10px] text-primary mt-1">Otimizando imagem…</p>}
    </>
  )
}
