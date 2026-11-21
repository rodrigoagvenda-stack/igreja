'use server'

import { createClient } from '@/lib/supabase/server'
import { requireRole, logAudit } from '@/lib/supabase/admin-guard'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateConfig(formData: FormData) {
  const admin = await requireRole(['admin'])
  const supabase = await createClient()

  const { data: configs } = await supabase
    .from('arq_site_config')
    .select('chave')

  const alterados: string[] = []

  if (configs) {
    for (const { chave } of configs) {
      const valor = formData.get(chave) as string | null
      if (valor !== null) {
        await supabase
          .from('arq_site_config')
          .update({ valor })
          .eq('chave', chave)
        alterados.push(chave)
      }
    }
  }

  await logAudit({ user: admin, acao: 'update', entidade: 'site_config', detalhes: { campos: alterados } })
  revalidatePath('/admin/configuracoes')
  redirect('/admin/configuracoes?ok=atualizado')
}
