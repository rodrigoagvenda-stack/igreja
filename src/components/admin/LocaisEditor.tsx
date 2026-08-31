"use client"

import { useState } from "react"
import { IconTrash, IconPlus } from "@tabler/icons-react"

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

export type LocalInicial = {
  id: string
  nome: string
  tipos: string[]
  endereco: string | null
  horarios: string
}

interface Props {
  paroquiaId: string
  locaisIniciais: LocalInicial[]
  action: (formData: FormData) => void
}

export function LocaisEditor({ paroquiaId, locaisIniciais, action }: Props) {
  const [keys, setKeys] = useState<string[]>(
    locaisIniciais.length > 0 ? locaisIniciais.map(l => l.id) : [`novo-${Date.now()}`]
  )
  const dadosPorKey = new Map(locaisIniciais.map(l => [l.id, l]))

  function adicionar() {
    setKeys(k => [...k, `novo-${Date.now()}-${k.length}`])
  }

  function remover(key: string) {
    setKeys(k => k.filter(x => x !== key))
  }

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="paroquia_id" value={paroquiaId} />

      {keys.map((key, i) => {
        const dados = dadosPorKey.get(key)
        return (
          <div key={key} className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-4">
            <input type="hidden" name="local_key" value={key} />
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-serif text-[15px] font-bold">Local {i + 1}</h3>
              {keys.length > 1 && (
                <button
                  type="button"
                  onClick={() => remover(key)}
                  className="flex items-center gap-1 text-[12px] text-destructive hover:underline"
                >
                  <IconTrash size={13} /> Remover este local
                </button>
              )}
            </div>

            <div>
              <label className={labelCls}>Nome do local *</label>
              <input
                name={`local_${key}_nome`}
                required
                defaultValue={dados?.nome ?? ""}
                className={inputCls}
                placeholder="Ex.: Capela Santo Expedito"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Tipo *</label>
                <div className="flex items-center gap-4 h-10">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name={`local_${key}_tipo_matriz`}
                      value="true"
                      defaultChecked={dados ? dados.tipos.includes("Matriz") : i === 0}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-[13px]">Matriz</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name={`local_${key}_tipo_capela`}
                      value="true"
                      defaultChecked={dados ? dados.tipos.includes("Capela") : i > 0}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-[13px]">Capela</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={labelCls}>Endereço</label>
                <input
                  name={`local_${key}_endereco`}
                  defaultValue={dados?.endereco ?? ""}
                  className={inputCls}
                  placeholder="Rua, número, bairro"
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Horários de missa</label>
              <p className="text-[11px] text-muted-foreground mb-2">Um horário por linha. Só os horários deste local.</p>
              <textarea
                name={`local_${key}_horarios`}
                rows={5}
                defaultValue={dados?.horarios ?? ""}
                className={inputCls + " resize-y"}
                placeholder={"Dom 8h, 10h, 18h\nSáb 18h\nSeg–Sex 7h"}
              />
            </div>
          </div>
        )
      })}

      <button
        type="button"
        onClick={adicionar}
        className="flex items-center gap-2 text-[13px] text-primary font-semibold hover:underline"
      >
        <IconPlus size={14} /> Adicionar outro local (Capela, etc.)
      </button>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors">
          Salvar todos os locais
        </button>
      </div>
    </form>
  )
}
