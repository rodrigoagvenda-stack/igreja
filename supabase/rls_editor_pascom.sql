-- =============================================================
--  EDITOR AMPLIADO (equipe da Pascom) — 25/11/2026
--
--  Editor passa a criar/editar também Paróquias, Horários e Clero (antes só
--  Notícias, Agenda e Documentos). Continua SEM: excluir paróquia/clero/
--  notícia/evento/documento, Configurações e Usuários (só admin).
--
--  Exceção consciente: em Horários o editor pode apagar horários e locais,
--  porque a tela de horários salva apagando e recriando os horários de cada
--  igreja. Tudo fica no histórico (arq_audit_log) com quem fez.
--
--  Somente leitura passa a enxergar no painel também o que não é público
--  (paróquias inativas, clero inativo, notícias em rascunho), sem editar.
--
--  Só ALTER POLICY: não apaga nada, não mexe em dado nenhum.
-- =============================================================

begin;

-- ── Paróquias ────────────────────────────────────────────────────────
alter policy "arq_paroquias: admin insere (AAL2)"  on public.arq_paroquias with check (arq_has_role('admin','editor'));
alter policy "arq_paroquias: admin atualiza (AAL2)" on public.arq_paroquias using (arq_has_role('admin','editor')) with check (arq_has_role('admin','editor'));
alter policy "arq_paroquias: admin lê todas (AAL2)" on public.arq_paroquias using (arq_has_role('admin','editor','leitura'));
-- exclusão de paróquia continua só admin

-- ── Locais e horários de missa ───────────────────────────────────────
alter policy "arq_locais: admin insere (AAL2)"  on public.arq_locais with check (arq_has_role('admin','editor'));
alter policy "arq_locais: admin atualiza (AAL2)" on public.arq_locais using (arq_has_role('admin','editor')) with check (arq_has_role('admin','editor'));
alter policy "arq_locais: admin exclui (AAL2)"   on public.arq_locais using (arq_has_role('admin','editor'));

alter policy "arq_horarios: admin insere (AAL2)"  on public.arq_horarios_missa with check (arq_has_role('admin','editor'));
alter policy "arq_horarios: admin atualiza (AAL2)" on public.arq_horarios_missa using (arq_has_role('admin','editor')) with check (arq_has_role('admin','editor'));
alter policy "arq_horarios: admin exclui (AAL2)"   on public.arq_horarios_missa using (arq_has_role('admin','editor'));

-- ── Clero ────────────────────────────────────────────────────────────
alter policy "arq_padres: admin insere (AAL2)"  on public.arq_padres with check (arq_has_role('admin','editor'));
alter policy "arq_padres: admin atualiza (AAL2)" on public.arq_padres using (arq_has_role('admin','editor')) with check (arq_has_role('admin','editor'));
alter policy "arq_padres: admin lê todos (AAL2)" on public.arq_padres using (arq_has_role('admin','editor','leitura'));

alter policy "arq_diaconos: admin insere (AAL2)"  on public.arq_diaconos with check (arq_has_role('admin','editor'));
alter policy "arq_diaconos: admin atualiza (AAL2)" on public.arq_diaconos using (arq_has_role('admin','editor')) with check (arq_has_role('admin','editor'));
alter policy "arq_diaconos: admin lê todos (AAL2)" on public.arq_diaconos using (arq_has_role('admin','editor','leitura'));

alter policy "arq_seminaristas: admin insere (AAL2)"  on public.arq_seminaristas with check (arq_has_role('admin','editor'));
alter policy "arq_seminaristas: admin atualiza (AAL2)" on public.arq_seminaristas using (arq_has_role('admin','editor')) with check (arq_has_role('admin','editor'));
alter policy "arq_seminaristas: admin lê todos (AAL2)" on public.arq_seminaristas using (arq_has_role('admin','editor','leitura'));
-- exclusão de padre/diácono/seminarista continua só admin

-- ── Notícias: leitura do painel (rascunhos) também para somente leitura ──
alter policy "arq_noticias: admin lê tudo (AAL2)" on public.arq_noticias using (arq_has_role('admin','editor','leitura'));

-- ── Fotos (bucket arq-fotos): editor envia foto de padre/paróquia ────
alter policy "auth_insert_fotos" on storage.objects
  with check (bucket_id = 'arq-fotos' and arq_has_role('admin','editor'));
alter policy "auth_update_fotos" on storage.objects
  using (bucket_id = 'arq-fotos' and arq_has_role('admin','editor'));
-- apagar foto do storage continua só admin

commit;

-- Conferência: deve listar as políticas acima com 'editor' no texto.
select tablename, policyname, cmd, coalesce(qual, with_check) as regra
from pg_policies
where policyname like any (array['arq_paroquias:%','arq_locais:%','arq_horarios:%','arq_padres:%','arq_diaconos:%','arq_seminaristas:%','arq_noticias: admin lê%','auth_%_fotos'])
order by tablename, policyname;
