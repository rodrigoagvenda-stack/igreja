-- ══════════════════════════════════════════════════════════════
--  Adiciona galeria de fotos às paróquias
--  Rodar UMA VEZ no SQL Editor do Supabase (projeto dkvznmmiiiljyrkopiqx)
-- ══════════════════════════════════════════════════════════════

ALTER TABLE public.arq_paroquias
  ADD COLUMN IF NOT EXISTS fotos text[] DEFAULT '{}' NOT NULL;
