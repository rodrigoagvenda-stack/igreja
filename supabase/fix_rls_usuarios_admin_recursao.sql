-- Corrige "infinite recursion detected in policy for relation arq_usuarios_admin":
-- as policies originais consultavam a própria tabela. Aplicado no projeto naesyamhhdzzqoiakdcx em 24/11/2026.
alter policy "admins leem usuarios_admin" on public.arq_usuarios_admin
  using (user_id = (select auth.uid()) or public.arq_has_role('admin','editor','leitura'));

alter policy "admins (papel=admin) gerenciam usuarios_admin" on public.arq_usuarios_admin
  using (public.arq_has_role('admin')) with check (public.arq_has_role('admin'));
