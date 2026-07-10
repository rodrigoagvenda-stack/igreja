import Link from "next/link"
import { createParoquia } from "../actions"

export const metadata = { title: "Nova Paróquia" }

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

export default function NovaParoquiaPage() {
  return (
    <div className="p-8 max-w-[700px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <Link href="/admin/paroquias" className="block w-4 h-0.5 bg-primary shrink-0 hover:bg-primary/60 transition-colors" />
            Paróquias
          </p>
          <h1 className="font-serif text-[28px] font-bold">Nova paróquia</h1>
        </div>
      </div>

      <form action={createParoquia} className="space-y-6">
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Nome *</label>
              <input name="nome" required className={inputCls} placeholder="Nome completo da paróquia" />
            </div>
            <div>
              <label className={labelCls}>Cidade *</label>
              <input name="cidade" required className={inputCls} placeholder="Cidade" />
            </div>
            <div>
              <label className={labelCls}>Região pastoral *</label>
              <select name="regiao_pastoral" required className={inputCls}>
                <option value="RP1">RP1</option>
                <option value="RP2">RP2</option>
                <option value="RP3">RP3</option>
                <option value="RP4">RP4</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Padroeiro</label>
              <input name="padroeiro" className={inputCls} placeholder="Nome do padroeiro" />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Endereço</label>
              <input name="endereco" className={inputCls} placeholder="Rua, número, bairro" />
            </div>
            <div>
              <label className={labelCls}>CEP</label>
              <input name="cep" className={inputCls} placeholder="00000-000" />
            </div>
            <div>
              <label className={labelCls}>Telefone</label>
              <input name="telefone" className={inputCls} placeholder="(00) 0000-0000" />
            </div>
            <div>
              <label className={labelCls}>E-mail</label>
              <input name="email" type="email" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Site</label>
              <input name="site" type="url" className={inputCls} placeholder="https://..." />
            </div>
            <div>
              <label className={labelCls}>Data de criação</label>
              <input name="data_criacao" type="date" className={inputCls} />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="ativa" value="true" defaultChecked className="w-4 h-4 accent-primary" />
            <span className="text-[13px]">Paróquia ativa</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors">
            Cadastrar paróquia
          </button>
          <Link href="/admin/paroquias" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
