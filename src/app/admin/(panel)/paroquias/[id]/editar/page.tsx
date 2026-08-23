import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { updateParoquia } from "../../actions"
import { CompressedFileInput } from "@/components/admin/CompressedFileInput"
import type { Paroquia } from "@/types/database"

export const metadata = { title: "Editar Paróquia" }

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

export default async function EditarParoquiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('arq_paroquias')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()
  const paroquia = data as unknown as Paroquia

  const action = updateParoquia.bind(null, id)
  const fotosAtuais = paroquia.fotos ?? []

  return (
    <div className="p-8 max-w-[700px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <Link href="/admin/paroquias" className="block w-4 h-0.5 bg-primary shrink-0 hover:bg-primary/60 transition-colors" />
            Paróquias
          </p>
          <h1 className="font-serif text-[28px] font-bold">Editar paróquia</h1>
        </div>
      </div>

      <form action={action} encType="multipart/form-data" className="space-y-6">
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Nome *</label>
              <input name="nome" required defaultValue={paroquia.nome} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Cidade *</label>
              <input name="cidade" required defaultValue={paroquia.cidade} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Região pastoral *</label>
              <select name="regiao_pastoral" required defaultValue={paroquia.regiao_pastoral} className={inputCls}>
                <option value="RP1">RP1</option>
                <option value="RP2">RP2</option>
                <option value="RP3">RP3</option>
                <option value="RP4">RP4</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Padroeiro</label>
              <input name="padroeiro" defaultValue={paroquia.padroeiro ?? ''} className={inputCls} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Endereço</label>
              <input name="endereco" defaultValue={paroquia.endereco ?? ''} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>CEP</label>
              <input name="cep" defaultValue={paroquia.cep ?? ''} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Telefone</label>
              <input name="telefone" defaultValue={paroquia.telefone ?? ''} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>E-mail</label>
              <input name="email" type="email" defaultValue={paroquia.email ?? ''} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Site</label>
              <input name="site" type="url" defaultValue={paroquia.site ?? ''} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Data de criação</label>
              <input name="data_criacao" type="date" defaultValue={paroquia.data_criacao ?? ''} className={inputCls} />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="ativa" value="true" defaultChecked={paroquia.ativa} className="w-4 h-4 accent-primary" />
            <span className="text-[13px]">Paróquia ativa</span>
          </label>
        </div>

        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-5">
          <div>
            <label className={labelCls}>Fotos</label>
            <p className="text-[11px] text-muted-foreground mb-3">Até 10 fotos da paróquia (fachada, interior, eventos) — JPG, PNG ou WebP, máx. 5 MB cada. Marque uma como fachada para ela aparecer em destaque na página da paróquia.</p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => {
              const atual = fotosAtuais[n - 1] ?? ''
              const isPrincipalAtual = n === 1 && !!atual
              return (
                <div key={n}>
                  <label className={labelCls}>Foto {n}</label>
                  {atual && (
                    <div className="relative mb-2">
                      <Image
                        src={atual}
                        alt={`Foto ${n} atual`}
                        width={160}
                        height={100}
                        className="w-full h-24 rounded-md object-cover ring-1 ring-border"
                      />
                      {isPrincipalAtual && (
                        <span className="absolute top-1 left-1 text-[9px] font-semibold uppercase tracking-[.05em] px-1.5 py-0.5 rounded bg-primary text-white">
                          Fachada
                        </span>
                      )}
                    </div>
                  )}
                  <input type="hidden" name={`foto_${n}_atual`} value={atual} />
                  <CompressedFileInput
                    name={`foto_${n}_file`}
                    accept="image/jpeg,image/png,image/webp"
                    className="w-full text-[12px] text-muted-foreground file:mr-2 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                  <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                    <input type="radio" name="foto_principal" value={n} defaultChecked={isPrincipalAtual} className="w-3.5 h-3.5 accent-primary" />
                    <span className="text-[11px] text-muted-foreground">Marcar como fachada</span>
                  </label>
                  {atual && (
                    <label className="flex items-center gap-1.5 mt-1 cursor-pointer">
                      <input type="checkbox" name={`foto_${n}_remover`} value="true" className="w-3.5 h-3.5 accent-destructive" />
                      <span className="text-[11px] text-muted-foreground">Remover esta foto</span>
                    </label>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors">
            Salvar alterações
          </button>
          <Link href="/admin/paroquias" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
