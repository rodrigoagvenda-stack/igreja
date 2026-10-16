-- ══════════════════════════════════════════════════════════════
--  Horários de missa estruturados: dias (array) + horários (array)
--  em vez de uma linha de texto livre. Elimina a ambiguidade de
--  "essa linha é horário ou nome de local?" na origem.
--  Rodar UMA VEZ no SQL Editor do Supabase (projeto dkvznmmiiiljyrkopiqx)
-- ══════════════════════════════════════════════════════════════

ALTER TABLE public.arq_horarios_missa
  ADD COLUMN IF NOT EXISTS dias text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS horarios text[] NOT NULL DEFAULT '{}';

ALTER TABLE public.arq_horarios_missa
  ALTER COLUMN descricao DROP NOT NULL;

-- Dado antigo (campo "descricao" livre) não é migrado automaticamente —
-- misturava horário com nome de capela de forma não-estruturada demais
-- pra separar com segurança. Precisa ser refeito manualmente pela nova
-- tela /admin/paroquias/[id]/horarios, que não usa mais "descricao".
