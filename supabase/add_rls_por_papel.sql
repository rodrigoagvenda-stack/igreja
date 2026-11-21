-- =============================================================
--  RLS POR PAPEL — Admin Arquidiocese
--  JÁ APLICADO em produção em 21/11/2026 via Supabase MCP (ALTER POLICY,
--  sem apagar nenhum dado). Este arquivo fica como registro/histórico —
--  se precisar recriar do zero num projeto novo, rode na ordem abaixo.
-- =============================================================

-- Função auxiliar: AAL2 + papel do usuário dentro da lista permitida.
create or replace function public.arq_has_role(variadic allowed arq_papel_admin[])
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select
    auth.role() = 'authenticated'
    and coalesce((auth.jwt() ->> 'aal'), '') = 'aal2'
    and exists (
      select 1 from public.arq_usuarios_admin u
      where u.user_id = auth.uid() and u.papel = any(allowed)
    )
$$;

revoke all on function public.arq_has_role(arq_papel_admin[]) from public, anon;
grant execute on function public.arq_has_role(arq_papel_admin[]) to authenticated;

-- Blinda a função antiga (ainda usada pelas leituras "admin vê tudo"):
-- fixa search_path e tira o acesso de anon/public, deixando só authenticated.
alter function public.arq_is_admin() set search_path = public, pg_temp;
revoke all on function public.arq_is_admin() from public, anon;
grant execute on function public.arq_is_admin() to authenticated;

alter function public.arq_set_updated_at() set search_path = public, pg_temp;

-- ── Tabelas 100% admin (estrutura/clero/config) ──────────────────────
alter policy "arq_paroquias: admin insere (AAL2)" on public.arq_paroquias with check (arq_has_role('admin'));
alter policy "arq_paroquias: admin atualiza (AAL2)" on public.arq_paroquias using (arq_has_role('admin')) with check (arq_has_role('admin'));
alter policy "arq_paroquias: admin exclui (AAL2)" on public.arq_paroquias using (arq_has_role('admin'));
alter policy "arq_paroquias: admin lê todas (AAL2)" on public.arq_paroquias using (arq_has_role('admin'));

alter policy "arq_locais: admin insere (AAL2)" on public.arq_locais with check (arq_has_role('admin'));
alter policy "arq_locais: admin atualiza (AAL2)" on public.arq_locais using (arq_has_role('admin')) with check (arq_has_role('admin'));
alter policy "arq_locais: admin exclui (AAL2)" on public.arq_locais using (arq_has_role('admin'));

alter policy "arq_horarios: admin insere (AAL2)" on public.arq_horarios_missa with check (arq_has_role('admin'));
alter policy "arq_horarios: admin atualiza (AAL2)" on public.arq_horarios_missa using (arq_has_role('admin')) with check (arq_has_role('admin'));
alter policy "arq_horarios: admin exclui (AAL2)" on public.arq_horarios_missa using (arq_has_role('admin'));

alter policy "arq_padres: admin insere (AAL2)" on public.arq_padres with check (arq_has_role('admin'));
alter policy "arq_padres: admin atualiza (AAL2)" on public.arq_padres using (arq_has_role('admin')) with check (arq_has_role('admin'));
alter policy "arq_padres: admin exclui (AAL2)" on public.arq_padres using (arq_has_role('admin'));
alter policy "arq_padres: admin lê todos (AAL2)" on public.arq_padres using (arq_has_role('admin'));

alter policy "arq_diaconos: admin insere (AAL2)" on public.arq_diaconos with check (arq_has_role('admin'));
alter policy "arq_diaconos: admin atualiza (AAL2)" on public.arq_diaconos using (arq_has_role('admin')) with check (arq_has_role('admin'));
alter policy "arq_diaconos: admin exclui (AAL2)" on public.arq_diaconos using (arq_has_role('admin'));
alter policy "arq_diaconos: admin lê todos (AAL2)" on public.arq_diaconos using (arq_has_role('admin'));

alter policy "arq_seminaristas: admin insere (AAL2)" on public.arq_seminaristas with check (arq_has_role('admin'));
alter policy "arq_seminaristas: admin atualiza (AAL2)" on public.arq_seminaristas using (arq_has_role('admin')) with check (arq_has_role('admin'));
alter policy "arq_seminaristas: admin exclui (AAL2)" on public.arq_seminaristas using (arq_has_role('admin'));
alter policy "arq_seminaristas: admin lê todos (AAL2)" on public.arq_seminaristas using (arq_has_role('admin'));

alter policy "arq_setores: admin insere (AAL2)" on public.arq_setores_pastorais with check (arq_has_role('admin'));
alter policy "arq_setores: admin atualiza (AAL2)" on public.arq_setores_pastorais using (arq_has_role('admin')) with check (arq_has_role('admin'));
alter policy "arq_setores: admin exclui (AAL2)" on public.arq_setores_pastorais using (arq_has_role('admin'));

alter policy "arq_site_config: admin atualiza (AAL2)" on public.arq_site_config using (arq_has_role('admin')) with check (arq_has_role('admin'));

-- ── Tabelas de conteúdo (admin + editor podem criar/editar; só admin exclui) ──
alter policy "arq_noticias: admin insere (AAL2)" on public.arq_noticias with check (arq_has_role('admin','editor'));
alter policy "arq_noticias: admin atualiza (AAL2)" on public.arq_noticias using (arq_has_role('admin','editor')) with check (arq_has_role('admin','editor'));
alter policy "arq_noticias: admin exclui (AAL2)" on public.arq_noticias using (arq_has_role('admin'));
alter policy "arq_noticias: admin lê tudo (AAL2)" on public.arq_noticias using (arq_has_role('admin','editor'));

alter policy "arq_eventos: admin insere (AAL2)" on public.arq_eventos with check (arq_has_role('admin','editor'));
alter policy "arq_eventos: admin atualiza (AAL2)" on public.arq_eventos using (arq_has_role('admin','editor')) with check (arq_has_role('admin','editor'));
alter policy "arq_eventos: admin exclui (AAL2)" on public.arq_eventos using (arq_has_role('admin'));

alter policy "arq_documentos: admin insere (AAL2)" on public.arq_documentos with check (arq_has_role('admin','editor'));
alter policy "arq_documentos: admin atualiza (AAL2)" on public.arq_documentos using (arq_has_role('admin','editor')) with check (arq_has_role('admin','editor'));
alter policy "arq_documentos: admin exclui (AAL2)" on public.arq_documentos using (arq_has_role('admin'));

-- ── Storage (buckets arq-fotos / arq-documentos) ─────────────────────
-- As políticas de escrita no Storage só exigiam "estar logado" (sem 2FA, sem papel) —
-- buraco separado das tabelas, corrigido aqui.
alter policy "auth_insert_fotos" on storage.objects
  with check (bucket_id = 'arq-fotos' and arq_has_role('admin'));
alter policy "auth_update_fotos" on storage.objects
  using (bucket_id = 'arq-fotos' and arq_has_role('admin'));
alter policy "auth_delete_fotos" on storage.objects
  using (bucket_id = 'arq-fotos' and arq_has_role('admin'));

alter policy "auth_insert_documentos" on storage.objects
  with check (bucket_id = 'arq-documentos' and arq_has_role('admin','editor'));
alter policy "auth_update_documentos" on storage.objects
  using (bucket_id = 'arq-documentos' and arq_has_role('admin','editor'));
alter policy "auth_delete_documentos" on storage.objects
  using (bucket_id = 'arq-documentos' and arq_has_role('admin'));
