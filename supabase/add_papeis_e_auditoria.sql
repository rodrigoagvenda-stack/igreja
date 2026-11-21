-- =============================================================
--  PAPÉIS DE USUÁRIO + LOG DE AUDITORIA — Admin Arquidiocese
--  Rodar no SQL Editor: https://supabase.com/dashboard/project/dkvznmmiiiljyrkopiqx/sql
-- =============================================================

-- ─── 1. PAPÉIS ─────────────────────────────────────────────────
create type arq_papel_admin as enum ('admin', 'editor', 'leitura');

create table if not exists public.arq_usuarios_admin (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  nome       text not null,
  email      text not null,
  papel      arq_papel_admin not null default 'leitura',
  criado_em  timestamptz not null default now()
);

alter table public.arq_usuarios_admin enable row level security;

-- só quem já está cadastrado como admin pode ler/gerenciar a lista de usuários
create policy "admins leem usuarios_admin"
  on public.arq_usuarios_admin for select
  to authenticated
  using (
    exists (select 1 from public.arq_usuarios_admin u where u.user_id = auth.uid())
  );

create policy "admins (papel=admin) gerenciam usuarios_admin"
  on public.arq_usuarios_admin for all
  to authenticated
  using (
    exists (select 1 from public.arq_usuarios_admin u where u.user_id = auth.uid() and u.papel = 'admin')
  )
  with check (
    exists (select 1 from public.arq_usuarios_admin u where u.user_id = auth.uid() and u.papel = 'admin')
  );

-- Cadastre o primeiro administrador manualmente (ajuste o e-mail):
-- insert into public.arq_usuarios_admin (user_id, nome, email, papel)
-- select id, 'Administrador', email, 'admin' from auth.users where email = 'admin@arquidiocese.org.br';


-- ─── 2. LOG DE AUDITORIA ───────────────────────────────────────
create table if not exists public.arq_audit_log (
  id          bigint generated always as identity primary key,
  user_id     uuid references auth.users(id) on delete set null,
  user_email  text not null,
  acao        text not null,           -- 'create' | 'update' | 'delete'
  entidade    text not null,           -- 'paroquia' | 'padre' | 'noticia' | ...
  entidade_id text,
  detalhes    jsonb,
  ip          text,
  user_agent  text,
  criado_em   timestamptz not null default now()
);

alter table public.arq_audit_log enable row level security;

-- só admins (papel=admin) podem ler o log
create policy "admins leem audit_log"
  on public.arq_audit_log for select
  to authenticated
  using (
    exists (select 1 from public.arq_usuarios_admin u where u.user_id = auth.uid() and u.papel = 'admin')
  );

-- inserção feita sempre com a service role (bypassa RLS) a partir das Server Actions,
-- então nenhuma policy de INSERT é concedida a 'authenticated' ou 'anon'.

create index if not exists arq_audit_log_criado_em_idx on public.arq_audit_log (criado_em desc);
create index if not exists arq_audit_log_user_id_idx on public.arq_audit_log (user_id);


-- ─── 3. RATE LIMITING DE LOGIN (anti brute-force) ──────────────
create table if not exists public.arq_login_attempts (
  id        bigint generated always as identity primary key,
  email     text not null,
  ip        text,
  sucesso   boolean not null,
  criado_em timestamptz not null default now()
);

alter table public.arq_login_attempts enable row level security;
-- nenhuma policy para anon/authenticated: só a service role (usada nas Server Actions) lê/escreve aqui.

create index if not exists arq_login_attempts_email_idx on public.arq_login_attempts (email, criado_em desc);
create index if not exists arq_login_attempts_ip_idx on public.arq_login_attempts (ip, criado_em desc);
