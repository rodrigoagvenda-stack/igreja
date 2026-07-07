-- =============================================================
--  AUDITORIA DE SEGURANÇA — Supabase dkvznmmiiiljyrkopiqx
--  Rodar no SQL Editor: https://supabase.com/dashboard/project/dkvznmmiiiljyrkopiqx/sql
--  Execute bloco por bloco para facilitar a leitura
-- =============================================================

-- ─── 1. TABELAS COM RLS DESATIVADO (crítico) ──────────────────
-- Qualquer usuário anon pode ler/escrever sem restrição
SELECT
  schemaname,
  tablename,
  'RLS DESATIVADO — exposição total' AS risco
FROM pg_tables
WHERE schemaname = 'public'
  AND rowsecurity = false
ORDER BY tablename;

-- ─── 2. TABELAS COM RLS ATIVO MAS SEM NENHUMA POLICY ─────────
-- RLS ativo bloqueia tudo, mas vale confirmar que não há buracos
SELECT
  t.schemaname,
  t.tablename,
  'RLS ativo mas SEM policies — acesso completamente bloqueado' AS situacao
FROM pg_tables t
LEFT JOIN pg_policies p
  ON p.schemaname = t.schemaname AND p.tablename = t.tablename
WHERE t.schemaname = 'public'
  AND t.rowsecurity = true
  AND p.policyname IS NULL
ORDER BY t.tablename;

-- ─── 3. POLICIES QUE PERMITEM ESCRITA PARA ANON ───────────────
-- INSERT/UPDATE/DELETE liberado para o role anon = brecha grave
SELECT
  schemaname,
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
    roles = '{}'                      -- policy sem role = vale para todos
    OR 'anon' = ANY(roles)
    OR 'public' = ANY(roles)
  )
ORDER BY tablename, cmd;

-- ─── 4. POLICIES DE LEITURA ANON SEM CONDIÇÃO (SELECT *) ──────
-- SELECT liberado sem WHERE = dump completo da tabela
SELECT
  schemaname,
  tablename,
  policyname,
  cmd,
  roles,
  qual AS condicao_using
FROM pg_policies
WHERE schemaname = 'public'
  AND cmd IN ('SELECT', 'ALL')
  AND (
    roles = '{}'
    OR 'anon' = ANY(roles)
    OR 'public' = ANY(roles)
  )
  AND (qual IS NULL OR qual = 'true')
ORDER BY tablename;

-- ─── 5. FUNÇÕES COM SECURITY DEFINER SEM search_path FIXO ─────
-- Risco de privilege escalation via search_path injection
SELECT
  n.nspname   AS schema,
  p.proname   AS funcao,
  'SECURITY DEFINER sem search_path fixo' AS risco
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.prosecdef = true
  AND NOT (p.proconfig @> ARRAY['search_path=public,pg_temp']::text[])
  AND NOT (p.proconfig @> ARRAY['search_path=public']::text[])
ORDER BY p.proname;

-- ─── 6. PERMISSÕES DIRETAS NO SCHEMA PUBLIC ───────────────────
-- Se anon tem EXECUTE em funções sensíveis, há risco
SELECT
  grantee,
  routine_name  AS funcao,
  privilege_type
FROM information_schema.role_routine_grants
WHERE routine_schema = 'public'
  AND grantee IN ('anon', 'public')
ORDER BY routine_name, privilege_type;

-- ─── 7. BUCKETS DE STORAGE PÚBLICOS ───────────────────────────
-- Buckets public = qualquer um lê o objeto sem autenticação
SELECT
  id,
  name,
  public AS bucket_publico,
  CASE WHEN public THEN 'ATENÇÃO: leitura pública sem auth' ELSE 'OK' END AS status
FROM storage.buckets
ORDER BY name;

-- ─── 8. EXTENSÕES INSTALADAS (revisar necessidade) ────────────
SELECT
  name,
  installed_version,
  comment
FROM pg_available_extensions
WHERE installed_version IS NOT NULL
ORDER BY name;

-- ─── 9. RESUMO EXECUTIVO ──────────────────────────────────────
SELECT
  (SELECT count(*) FROM pg_tables WHERE schemaname='public' AND rowsecurity=false)
    AS tabelas_sem_rls,
  (SELECT count(*) FROM pg_policies WHERE schemaname='public'
    AND cmd IN ('INSERT','UPDATE','DELETE','ALL')
    AND ('anon'=ANY(roles) OR roles='{}' OR 'public'=ANY(roles)))
    AS policies_escrita_anon,
  (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
    WHERE n.nspname='public' AND p.prosecdef=true
    AND NOT (p.proconfig @> ARRAY['search_path=public']::text[]))
    AS funcoes_secdef_sem_search_path,
  (SELECT count(*) FROM storage.buckets WHERE public=true)
    AS buckets_publicos;
