import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { updateNoticia } from "../../actions"

export const metadata = { title: "Editar Notícia" }

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
const labelCls = "block text-[12px] font-semibold text-foreground mb-1.5"

export default async function EditarNoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: noticia } = await supabase
    .from('arq_noticias')
    .select('*')
    .eq('id', id)
    .single()

  if (!noticia) notFound()

  const action = updateNoticia.bind(null, id)

  return (
    <div className="p-8 max-w-[700px] w-full mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-border">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">
            <Link href="/admin/noticias" className="block w-4 h-0.5 bg-primary shrink-0 hover:bg-primary/60 transition-colors" />
            Notícias
          </p>
          <h1 className="font-serif text-[28px] font-bold">Editar notícia</h1>
        </div>
      </div>

      <form action={action} className="space-y-6">
        <div className="bg-card ring-1 ring-foreground/10 rounded-xl p-6 space-y-5">
          <div>
            <label className={labelCls}>Título *</label>
            <input name="titulo" required defaultValue={noticia.titulo} className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Categoria *</label>
              <select name="categoria" required defaultValue={noticia.categoria} className={inputCls}>
                <option value="Pastoral">Pastoral</option>
                <option value="Formação">Formação</option>
                <option value="Evangelização">Evangelização</option>
                <option value="Litúrgico">Litúrgico</option>
                <option value="Institucional">Institucional</option>
                <option value="Clero">Clero</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Status *</label>
              <select name="status" defaultValue={noticia.status} className={inputCls}>
                <option value="rascunho">Rascunho</option>
                <option value="revisao">Em revisão</option>
                <option value="publicado">Publicado</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Resumo</label>
            <textarea name="resumo" rows={3} defaultValue={noticia.resumo ?? ''} className={inputCls + " resize-y"} />
          </div>

          <div>
            <label className={labelCls}>Conteúdo</label>
            <textarea name="conteudo" rows={10} defaultValue={noticia.conteudo ?? ''} className={inputCls + " resize-y"} />
          </div>

          <div>
            <label className={labelCls}>URL da imagem</label>
            <input name="imagem_url" type="url" defaultValue={noticia.imagem_url ?? ''} className={inputCls} placeholder="https://..." />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="destaque" defaultChecked={noticia.destaque} className="w-4 h-4 accent-primary" />
            <span className="text-[13px]">Destacar na página inicial</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors">
            Salvar alterações
          </button>
          <Link href="/admin/noticias" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
