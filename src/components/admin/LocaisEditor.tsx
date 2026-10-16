"use client"

import { useState } from "react"
import { IconTrash, IconPlus } from "@tabler/icons-react"

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

const DIAS_SEMANA = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

export type GrupoHorarioInicial = {
  id: string
  dias: string[]
  horarios: string[]
}

// Se nenhum dos 7 dias padrão bate com o que veio salvo (ex: "Todo dia 13 de cada mês"),
// é porque esse grupo foi salvo com o campo de padrão personalizado preenchido.
function isDiaCustom(dias: string[]): boolean {
  return dias.length > 0 && !dias.every(d => DIAS_SEMANA.includes(d))
}

export type LocalInicial = {
  id: string
  nome: string
  tipos: string[]
  endereco: string | null
  grupos: GrupoHorarioInicial[]
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

      {keys.map((key, i) => (
        <LocalBlock
          key={key}
          localKey={key}
          index={i}
          dados={dadosPorKey.get(key)}
          onRemover={keys.length > 1 ? () => remover(key) : undefined}
        />
      ))}

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

function LocalBlock({
  localKey,
  index,
  dados,
  onRemover,
}: {
  localKey: string
  index: number
  dados: LocalInicial | undefined
  onRemover?: () => void
}) {
  return (
    <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-4">
      <input type="hidden" name="local_key" value={localKey} />
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <h3 className="font-serif text-[15px] font-bold">Local {index + 1}</h3>
        {onRemover && (
          <button type="button" onClick={onRemover} className="flex items-center gap-1 text-[12px] text-destructive hover:underline">
            <IconTrash size={13} /> Remover este local
          </button>
        )}
      </div>

      <div>
        <label className={labelCls}>Nome do local *</label>
        <input
          name={`local_${localKey}_nome`}
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
                name={`local_${localKey}_tipo_matriz`}
                value="true"
                defaultChecked={dados ? dados.tipos.includes("Matriz") : index === 0}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-[13px]">Matriz</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                name={`local_${localKey}_tipo_capela`}
                value="true"
                defaultChecked={dados ? dados.tipos.includes("Capela") : index > 0}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-[13px]">Capela</span>
            </label>
          </div>
        </div>
        <div>
          <label className={labelCls}>Endereço</label>
          <input
            name={`local_${localKey}_endereco`}
            defaultValue={dados?.endereco ?? ""}
            className={inputCls}
            placeholder="Rua, número, bairro"
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Horários de missa</label>
        <p className="text-[11px] text-muted-foreground mb-2">Marque o(s) dia(s) e digite os horários daquele dia. Um grupo por combinação de dias.</p>
        <GrupoHorarios localKey={localKey} gruposIniciais={dados?.grupos ?? []} />
      </div>
    </div>
  )
}

function GrupoHorarios({ localKey, gruposIniciais }: { localKey: string; gruposIniciais: GrupoHorarioInicial[] }) {
  const [grupoKeys, setGrupoKeys] = useState<string[]>(
    gruposIniciais.length > 0 ? gruposIniciais.map(g => g.id) : [`novo-${Date.now()}`]
  )
  const dadosPorGrupo = new Map(gruposIniciais.map(g => [g.id, g]))

  function adicionarGrupo() {
    setGrupoKeys(k => [...k, `novo-${Date.now()}-${k.length}`])
  }

  function removerGrupo(key: string) {
    setGrupoKeys(k => k.filter(x => x !== key))
  }

  return (
    <div className="space-y-3">
      {grupoKeys.map(grupoKey => {
        const dados = dadosPorGrupo.get(grupoKey)
        const custom = dados ? isDiaCustom(dados.dias) : false
        return (
          <div key={grupoKey} className="border border-border rounded-md p-3 space-y-2">
            <input type="hidden" name={`local_${localKey}_grupo_key`} value={grupoKey} />
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {DIAS_SEMANA.map(dia => (
                  <label key={dia} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      name={`local_${localKey}_grupo_${grupoKey}_dias`}
                      value={dia}
                      defaultChecked={!custom && (dados?.dias.includes(dia) ?? false)}
                      className="w-3.5 h-3.5 accent-primary"
                    />
                    <span className="text-[11px]">{dia}</span>
                  </label>
                ))}
              </div>
              {grupoKeys.length > 1 && (
                <button type="button" onClick={() => removerGrupo(grupoKey)} className="text-destructive hover:opacity-70 shrink-0">
                  <IconTrash size={13} />
                </button>
              )}
            </div>
            <div>
              <input
                name={`local_${localKey}_grupo_${grupoKey}_dia_personalizado`}
                defaultValue={custom ? dados!.dias.join(", ") : ""}
                className={inputCls}
                placeholder="Ou padrão personalizado — ex.: Todo dia 13 de cada mês"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Preenchendo isso, ignora os dias marcados acima.</p>
            </div>
            <div>
              <input
                name={`local_${localKey}_grupo_${grupoKey}_horarios`}
                defaultValue={dados?.horarios.join(", ") ?? ""}
                className={inputCls}
                placeholder="Ex.: 8h, 10h, 19h"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Horários separados por vírgula.</p>
            </div>
          </div>
        )
      })}

      <button type="button" onClick={adicionarGrupo} className="flex items-center gap-1.5 text-[12px] text-primary font-medium hover:underline">
        <IconPlus size={13} /> Adicionar grupo de dias/horários
      </button>
    </div>
  )
}
