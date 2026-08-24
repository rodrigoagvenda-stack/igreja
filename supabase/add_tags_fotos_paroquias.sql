-- ══════════════════════════════════════════════════════════════
--  Fotos das paróquias ganham tag (Fachada, Padroeiro(a), Capela, Paróquia)
--  Rodar UMA VEZ no SQL Editor do Supabase (projeto dkvznmmiiiljyrkopiqx)
--  Roda DEPOIS de add_fotos_paroquias.sql (que criou a coluna original)
-- ══════════════════════════════════════════════════════════════

ALTER TABLE public.arq_paroquias ADD COLUMN IF NOT EXISTS fotos_novo jsonb NOT NULL DEFAULT '[]'::jsonb;

UPDATE public.arq_paroquias
SET fotos_novo = (
  SELECT coalesce(jsonb_agg(jsonb_build_object('url', url, 'tag', CASE WHEN ord = 1 THEN 'Fachada' ELSE null END)), '[]'::jsonb)
  FROM unnest(fotos) WITH ORDINALITY AS t(url, ord)
)
WHERE fotos IS NOT NULL AND array_length(fotos, 1) > 0;

ALTER TABLE public.arq_paroquias DROP COLUMN fotos;
ALTER TABLE public.arq_paroquias RENAME COLUMN fotos_novo TO fotos;
