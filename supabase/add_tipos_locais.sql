-- ══════════════════════════════════════════════════════════════
--  Permite um local ser Matriz e Capela ao mesmo tempo (ou só um)
--  Rodar UMA VEZ no SQL Editor do Supabase (projeto dkvznmmiiiljyrkopiqx)
-- ══════════════════════════════════════════════════════════════

ALTER TABLE public.arq_locais ADD COLUMN IF NOT EXISTS tipos text[];

UPDATE public.arq_locais SET tipos = ARRAY[tipo] WHERE tipos IS NULL;

ALTER TABLE public.arq_locais ALTER COLUMN tipos SET NOT NULL;
ALTER TABLE public.arq_locais ADD CONSTRAINT arq_locais_tipos_check
  CHECK (tipos <@ ARRAY['Matriz','Capela']::text[] AND array_length(tipos, 1) > 0);

ALTER TABLE public.arq_locais DROP COLUMN tipo;
