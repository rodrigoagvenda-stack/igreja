'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateConfig(formData: FormData) {
  const supabase = await createClient()

  const { data: configs } = await supabase
    .from('arq_site_config')
    .select('chave')

  if (configs) {
    for (const { chave } of configs) {
      const valor = formData.get(chave) as string | null
      if (valor !== null) {
        await supabase
          .from('arq_site_config')
          .update({ valor })
          .eq('chave', chave)
      }
    }
  }

  revalidatePath('/admin/configuracoes')
}
