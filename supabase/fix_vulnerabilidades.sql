-- =============================================================
--  CORREÇÃO DE VULNERABILIDADES — Passo a passo
--  IMPORTANTE: Rode PRIMEIRO os blocos de diagnóstico para
--  entender o impacto antes de aplicar os fixes.
-- =============================================================

-- ─── PASSO 1: VER QUAIS SÃO AS 4 TABELAS SEM RLS ─────────────
SELECT schemaname, tablename
FROM pg_tables
WHERE schemaname = 'public' AND rowsecurity = false
ORDER BY tablename;

-- ─── PASSO 2: VER AS 97 POLICIES DE ESCRITA ANON ─────────────
-- Rode isso primeiro para entender o que são antes de apagar
SELECT
  tablename,
  policyname,
  cmd,
  roles,
  qual        AS condicao_using,
  with_check  AS condicao_with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND cmd IN ('INSERT', 'UPDATE', 'DELETE', 'ALL')
  AND (
    roles = '{}'
    OR 'anon' = ANY(roles)
    OR 'public' = ANY(roles)
  )
ORDER BY tablename, cmd
LIMIT 120;

-- ─── PASSO 3: VER POLICIES DE ESCRITA SÓ NAS TABELAS arq_ ─────
-- As tabelas da Arquidiocese que já existirem
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename LIKE 'arq_%'
  AND cmd IN ('INSERT', 'UPDATE', 'DELETE', 'ALL')
  AND ('anon' = ANY(roles) OR roles = '{}' OR 'public' = ANY(roles));
-- Resultado esperado: 0 linhas (schema.sql já protege corretamente)

-- ─── PASSO 4: ATIVAR RLS NAS 4 TABELAS SEM PROTEÇÃO ──────────
-- Isso bloqueia acesso a essas tabelas até adicionar policies.
-- ATENÇÃO: pode quebrar o app Vend.AI_CRM se ele depende de acesso anon.
-- Confirme quais são as 4 tabelas no Passo 1 antes de rodar.

-- Substitua os nomes abaixo pelas 4 tabelas encontradas no Passo 1:
-- ALTER TABLE public.banners          ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.users            ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.admin_users      ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- ─── PASSO 5: CORRIGIR BUCKETS PÚBLICOS (se necessário) ────────
-- Ver quais buckets estão públicos
SELECT id, name, public FROM storage.buckets ORDER BY name;

-- Para tornar um bucket privado (requer auth para ler):
-- UPDATE storage.buckets SET public = false WHERE name = 'nome-do-bucket';
-- Depois adicione policies de SELECT para authenticated:
-- CREATE POLICY "autenticados podem ler" ON storage.objects
--   FOR SELECT TO authenticated USING (bucket_id = 'nome-do-bucket');

-- ─── PASSO 6: VERIFICAR SEPARAÇÃO DAS TABELAS arq_ ────────────
-- Confirma que as tabelas arq_ têm RLS ativo e policies corretas
SELECT
  t.tablename,
  t.rowsecurity AS rls_ativo,
  count(p.policyname) AS total_policies
FROM pg_tables t
LEFT JOIN pg_policies p
  ON p.schemaname = t.schemaname AND p.tablename = t.tablename
WHERE t.schemaname = 'public'
  AND t.tablename LIKE 'arq_%'
GROUP BY t.tablename, t.rowsecurity
ORDER BY t.tablename;
