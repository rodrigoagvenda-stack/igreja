"use client"

import { useRef, useState } from "react"
import { compressImage } from "@/lib/compressImage"
import { IconCheck, IconLoader2, IconAlertTriangle } from "@tabler/icons-react"

type Status = "idle" | "working" | "done" | "error"

interface Props {
  name: string
  bucket: string
  defaultUrl?: string
  accept?: string
  className?: string
}

export function PhotoUploadSlot({ name, bucket, defaultUrl = "", accept, className }: Props) {
  const hiddenRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setStatus("working")
    setErrorMsg("")

    try {
      const compressed = await compressImage(file)

      const fd = new FormData()
      fd.append("file", compressed)
      fd.append("bucket", bucket)

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) throw new Error(data.error || `Falha no upload (HTTP ${res.status}).`)
      if (!data.url) throw new Error("Resposta inválida do servidor.")

      if (hiddenRef.current) hiddenRef.current.value = data.url
      setStatus("done")
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Falha no upload.")
      e.target.value = ""
    }
  }

  return (
    <div>
      <input ref={hiddenRef} type="hidden" name={name} defaultValue={defaultUrl} />
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={status === "working"}
        className={className}
      />
      {status === "working" && (
        <p className="flex items-center gap-1 text-[10px] text-primary mt-1">
          <IconLoader2 size={11} className="animate-spin" /> Enviando…
        </p>
      )}
      {status === "done" && (
        <p className="flex items-center gap-1 text-[10px] text-success mt-1">
          <IconCheck size={11} /> Enviada
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-1 text-[10px] text-destructive mt-1">
          <IconAlertTriangle size={11} /> {errorMsg}
        </p>
      )}
    </div>
  )
}
