-- ══════════════════════════════════════════════════════════════
--  Arquidiocese de Botucatu — Schema Supabase
--  Prefixo arq_ em todas as tabelas, funções e objetos
--  Executar inteiro no SQL Editor do Supabase (uma só vez)
-- ══════════════════════════════════════════════════════════════

-- ─── EXTENSÕES ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ─── FUNÇÕES AUXILIARES ──────────────────────────────────────

CREATE OR REPLACE FUNCTION public.arq_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Retorna true se o usuário está autenticado com MFA (AAL2)
CREATE OR REPLACE FUNCTION public.arq_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    auth.role() = 'authenticated'
    AND coalesce((auth.jwt() ->> 'aal'), '') = 'aal2'
$$;

-- ─── TABELAS ─────────────────────────────────────────────────

CREATE TABLE public.arq_noticias (
  id           uuid        DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug         text        NOT NULL UNIQUE,
  titulo       text        NOT NULL,
  resumo       text,
  conteudo     text,
  categoria    text        NOT NULL DEFAULT 'Geral',
  status       text        NOT NULL DEFAULT 'rascunho'
                           CHECK (status IN ('rascunho', 'revisao', 'publicado')),
  destaque     boolean     DEFAULT false,
  imagem_url   text,
  autor_id     uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  publicado_em timestamptz,
  created_at   timestamptz DEFAULT now() NOT NULL,
  updated_at   timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.arq_eventos (
  id          uuid        DEFAULT uuid_generate_v4() PRIMARY KEY,
  titulo      text        NOT NULL,
  descricao   text,
  local       text,
  categoria   text        NOT NULL DEFAULT 'Geral',
  inicio      timestamptz NOT NULL,
  fim         timestamptz,
  destaque    boolean     DEFAULT false,
  created_at  timestamptz DEFAULT now() NOT NULL,
  updated_at  timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.arq_paroquias (
  id               uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug             text    NOT NULL UNIQUE,
  nome             text    NOT NULL,
  cidade           text    NOT NULL,
  regiao_pastoral  text    NOT NULL CHECK (regiao_pastoral IN ('RP1','RP2','RP3','RP4')),
  padroeiro        text,
  data_criacao     date,
  endereco         text,
  cep              text,
  telefone         text,
  email            text,
  site             text,
  ativa            boolean DEFAULT true,
  created_at       timestamptz DEFAULT now() NOT NULL,
  updated_at       timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.arq_locais (
  id           uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  paroquia_id  uuid NOT NULL REFERENCES public.arq_paroquias(id) ON DELETE CASCADE,
  nome         text NOT NULL,
  tipo         text NOT NULL CHECK (tipo IN ('Matriz','Capela')),
  endereco     text,
  created_at   timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.arq_horarios_missa (
  id          uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  local_id    uuid NOT NULL REFERENCES public.arq_locais(id) ON DELETE CASCADE,
  descricao   text NOT NULL,
  created_at  timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.arq_padres (
  id           uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome         text    NOT NULL,
  nascimento   date,
  ordenacao    date,
  paroquia_id  uuid    REFERENCES public.arq_paroquias(id) ON DELETE SET NULL,
  foto_url     text,
  ativo        boolean DEFAULT true,
  created_at   timestamptz DEFAULT now() NOT NULL,
  updated_at   timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.arq_diaconos (
  id           uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome         text    NOT NULL,
  nascimento   date,
  ordenacao    date,
  paroquia_id  uuid    REFERENCES public.arq_paroquias(id) ON DELETE SET NULL,
  foto_url     text,
  ativo        boolean DEFAULT true,
  created_at   timestamptz DEFAULT now() NOT NULL,
  updated_at   timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.arq_seminaristas (
  id             uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome           text    NOT NULL,
  nascimento     date,
  ano_formacao   text    NOT NULL,
  paroquia_id    uuid    REFERENCES public.arq_paroquias(id) ON DELETE SET NULL,
  foto_url       text,
  ativo          boolean DEFAULT true,
  created_at     timestamptz DEFAULT now() NOT NULL,
  updated_at     timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.arq_documentos (
  id            uuid  DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug          text  NOT NULL UNIQUE,
  titulo        text  NOT NULL,
  tipo          text  NOT NULL CHECK (tipo IN ('Decreto','Comunicado','Nomeação','Circular')),
  arquivo_url   text,
  publicado_em  date  NOT NULL DEFAULT CURRENT_DATE,
  created_at    timestamptz DEFAULT now() NOT NULL,
  updated_at    timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.arq_setores_pastorais (
  id           uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug         text    NOT NULL UNIQUE,
  nome         text    NOT NULL,
  descricao    text,
  coordenador  text,
  email        text,
  telefone     text,
  ordem        integer DEFAULT 0,
  created_at   timestamptz DEFAULT now() NOT NULL,
  updated_at   timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE public.arq_site_config (
  id          uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  chave       text NOT NULL UNIQUE,
  valor       text,
  descricao   text,
  updated_at  timestamptz DEFAULT now() NOT NULL
);

-- ─── ÍNDICES ─────────────────────────────────────────────────

CREATE INDEX idx_arq_noticias_status     ON public.arq_noticias(status);
CREATE INDEX idx_arq_noticias_publicado  ON public.arq_noticias(publicado_em DESC NULLS LAST);
CREATE INDEX idx_arq_noticias_destaque   ON public.arq_noticias(destaque) WHERE destaque = true;
CREATE INDEX idx_arq_noticias_categoria  ON public.arq_noticias(categoria);

CREATE INDEX idx_arq_eventos_inicio      ON public.arq_eventos(inicio);
CREATE INDEX idx_arq_eventos_destaque    ON public.arq_eventos(destaque) WHERE destaque = true;

CREATE INDEX idx_arq_paroquias_regiao    ON public.arq_paroquias(regiao_pastoral);
CREATE INDEX idx_arq_paroquias_cidade    ON public.arq_paroquias(cidade);
CREATE INDEX idx_arq_paroquias_ativa     ON public.arq_paroquias(ativa) WHERE ativa = true;

CREATE INDEX idx_arq_locais_paroquia     ON public.arq_locais(paroquia_id);
CREATE INDEX idx_arq_horarios_local      ON public.arq_horarios_missa(local_id);

CREATE INDEX idx_arq_padres_paroquia     ON public.arq_padres(paroquia_id);
CREATE INDEX idx_arq_padres_ativo        ON public.arq_padres(ativo) WHERE ativo = true;

CREATE INDEX idx_arq_diaconos_paroquia   ON public.arq_diaconos(paroquia_id);
CREATE INDEX idx_arq_diaconos_ativo      ON public.arq_diaconos(ativo) WHERE ativo = true;

CREATE INDEX idx_arq_seminaristas_ano    ON public.arq_seminaristas(ano_formacao);
CREATE INDEX idx_arq_seminaristas_ativo  ON public.arq_seminaristas(ativo) WHERE ativo = true;

CREATE INDEX idx_arq_documentos_tipo     ON public.arq_documentos(tipo);
CREATE INDEX idx_arq_documentos_data     ON public.arq_documentos(publicado_em DESC);

CREATE INDEX idx_arq_setores_ordem       ON public.arq_setores_pastorais(ordem);

-- ─── TRIGGERS updated_at ─────────────────────────────────────

CREATE TRIGGER trg_arq_noticias_updated_at
  BEFORE UPDATE ON public.arq_noticias
  FOR EACH ROW EXECUTE FUNCTION public.arq_set_updated_at();

CREATE TRIGGER trg_arq_eventos_updated_at
  BEFORE UPDATE ON public.arq_eventos
  FOR EACH ROW EXECUTE FUNCTION public.arq_set_updated_at();

CREATE TRIGGER trg_arq_paroquias_updated_at
  BEFORE UPDATE ON public.arq_paroquias
  FOR EACH ROW EXECUTE FUNCTION public.arq_set_updated_at();

CREATE TRIGGER trg_arq_padres_updated_at
  BEFORE UPDATE ON public.arq_padres
  FOR EACH ROW EXECUTE FUNCTION public.arq_set_updated_at();

CREATE TRIGGER trg_arq_diaconos_updated_at
  BEFORE UPDATE ON public.arq_diaconos
  FOR EACH ROW EXECUTE FUNCTION public.arq_set_updated_at();

CREATE TRIGGER trg_arq_seminaristas_updated_at
  BEFORE UPDATE ON public.arq_seminaristas
  FOR EACH ROW EXECUTE FUNCTION public.arq_set_updated_at();

CREATE TRIGGER trg_arq_documentos_updated_at
  BEFORE UPDATE ON public.arq_documentos
  FOR EACH ROW EXECUTE FUNCTION public.arq_set_updated_at();

CREATE TRIGGER trg_arq_setores_updated_at
  BEFORE UPDATE ON public.arq_setores_pastorais
  FOR EACH ROW EXECUTE FUNCTION public.arq_set_updated_at();

CREATE TRIGGER trg_arq_site_config_updated_at
  BEFORE UPDATE ON public.arq_site_config
  FOR EACH ROW EXECUTE FUNCTION public.arq_set_updated_at();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

ALTER TABLE public.arq_noticias          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arq_eventos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arq_paroquias         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arq_locais            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arq_horarios_missa    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arq_padres            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arq_diaconos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arq_seminaristas      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arq_documentos        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arq_setores_pastorais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arq_site_config       ENABLE ROW LEVEL SECURITY;

-- ─── POLÍTICAS ───────────────────────────────────────────────

-- ┌─ ARQ_NOTICIAS ──────────────────────────────────────────────
CREATE POLICY "arq_noticias: leitura pública de publicadas"
  ON public.arq_noticias FOR SELECT
  TO anon, authenticated
  USING (status = 'publicado');

CREATE POLICY "arq_noticias: admin lê tudo (AAL2)"
  ON public.arq_noticias FOR SELECT
  TO authenticated
  USING (public.arq_is_admin());

CREATE POLICY "arq_noticias: admin insere (AAL2)"
  ON public.arq_noticias FOR INSERT
  TO authenticated
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_noticias: admin atualiza (AAL2)"
  ON public.arq_noticias FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_noticias: admin exclui (AAL2)"
  ON public.arq_noticias FOR DELETE
  TO authenticated
  USING (public.arq_is_admin());

-- ┌─ ARQ_EVENTOS ───────────────────────────────────────────────
CREATE POLICY "arq_eventos: leitura pública"
  ON public.arq_eventos FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "arq_eventos: admin insere (AAL2)"
  ON public.arq_eventos FOR INSERT
  TO authenticated
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_eventos: admin atualiza (AAL2)"
  ON public.arq_eventos FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_eventos: admin exclui (AAL2)"
  ON public.arq_eventos FOR DELETE
  TO authenticated
  USING (public.arq_is_admin());

-- ┌─ ARQ_PAROQUIAS ─────────────────────────────────────────────
CREATE POLICY "arq_paroquias: leitura pública das ativas"
  ON public.arq_paroquias FOR SELECT
  TO anon, authenticated
  USING (ativa = true);

CREATE POLICY "arq_paroquias: admin lê todas (AAL2)"
  ON public.arq_paroquias FOR SELECT
  TO authenticated
  USING (public.arq_is_admin());

CREATE POLICY "arq_paroquias: admin insere (AAL2)"
  ON public.arq_paroquias FOR INSERT
  TO authenticated
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_paroquias: admin atualiza (AAL2)"
  ON public.arq_paroquias FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_paroquias: admin exclui (AAL2)"
  ON public.arq_paroquias FOR DELETE
  TO authenticated
  USING (public.arq_is_admin());

-- ┌─ ARQ_LOCAIS ────────────────────────────────────────────────
CREATE POLICY "arq_locais: leitura pública"
  ON public.arq_locais FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "arq_locais: admin insere (AAL2)"
  ON public.arq_locais FOR INSERT
  TO authenticated
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_locais: admin atualiza (AAL2)"
  ON public.arq_locais FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_locais: admin exclui (AAL2)"
  ON public.arq_locais FOR DELETE
  TO authenticated
  USING (public.arq_is_admin());

-- ┌─ ARQ_HORARIOS_MISSA ────────────────────────────────────────
CREATE POLICY "arq_horarios: leitura pública"
  ON public.arq_horarios_missa FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "arq_horarios: admin insere (AAL2)"
  ON public.arq_horarios_missa FOR INSERT
  TO authenticated
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_horarios: admin atualiza (AAL2)"
  ON public.arq_horarios_missa FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_horarios: admin exclui (AAL2)"
  ON public.arq_horarios_missa FOR DELETE
  TO authenticated
  USING (public.arq_is_admin());

-- ┌─ ARQ_PADRES ────────────────────────────────────────────────
CREATE POLICY "arq_padres: leitura pública dos ativos"
  ON public.arq_padres FOR SELECT
  TO anon, authenticated
  USING (ativo = true);

CREATE POLICY "arq_padres: admin lê todos (AAL2)"
  ON public.arq_padres FOR SELECT
  TO authenticated
  USING (public.arq_is_admin());

CREATE POLICY "arq_padres: admin insere (AAL2)"
  ON public.arq_padres FOR INSERT
  TO authenticated
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_padres: admin atualiza (AAL2)"
  ON public.arq_padres FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_padres: admin exclui (AAL2)"
  ON public.arq_padres FOR DELETE
  TO authenticated
  USING (public.arq_is_admin());

-- ┌─ ARQ_DIACONOS ──────────────────────────────────────────────
CREATE POLICY "arq_diaconos: leitura pública dos ativos"
  ON public.arq_diaconos FOR SELECT
  TO anon, authenticated
  USING (ativo = true);

CREATE POLICY "arq_diaconos: admin lê todos (AAL2)"
  ON public.arq_diaconos FOR SELECT
  TO authenticated
  USING (public.arq_is_admin());

CREATE POLICY "arq_diaconos: admin insere (AAL2)"
  ON public.arq_diaconos FOR INSERT
  TO authenticated
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_diaconos: admin atualiza (AAL2)"
  ON public.arq_diaconos FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_diaconos: admin exclui (AAL2)"
  ON public.arq_diaconos FOR DELETE
  TO authenticated
  USING (public.arq_is_admin());

-- ┌─ ARQ_SEMINARISTAS ──────────────────────────────────────────
CREATE POLICY "arq_seminaristas: leitura pública dos ativos"
  ON public.arq_seminaristas FOR SELECT
  TO anon, authenticated
  USING (ativo = true);

CREATE POLICY "arq_seminaristas: admin lê todos (AAL2)"
  ON public.arq_seminaristas FOR SELECT
  TO authenticated
  USING (public.arq_is_admin());

CREATE POLICY "arq_seminaristas: admin insere (AAL2)"
  ON public.arq_seminaristas FOR INSERT
  TO authenticated
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_seminaristas: admin atualiza (AAL2)"
  ON public.arq_seminaristas FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_seminaristas: admin exclui (AAL2)"
  ON public.arq_seminaristas FOR DELETE
  TO authenticated
  USING (public.arq_is_admin());

-- ┌─ ARQ_DOCUMENTOS ────────────────────────────────────────────
CREATE POLICY "arq_documentos: leitura pública"
  ON public.arq_documentos FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "arq_documentos: admin insere (AAL2)"
  ON public.arq_documentos FOR INSERT
  TO authenticated
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_documentos: admin atualiza (AAL2)"
  ON public.arq_documentos FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_documentos: admin exclui (AAL2)"
  ON public.arq_documentos FOR DELETE
  TO authenticated
  USING (public.arq_is_admin());

-- ┌─ ARQ_SETORES_PASTORAIS ─────────────────────────────────────
CREATE POLICY "arq_setores: leitura pública"
  ON public.arq_setores_pastorais FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "arq_setores: admin insere (AAL2)"
  ON public.arq_setores_pastorais FOR INSERT
  TO authenticated
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_setores: admin atualiza (AAL2)"
  ON public.arq_setores_pastorais FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

CREATE POLICY "arq_setores: admin exclui (AAL2)"
  ON public.arq_setores_pastorais FOR DELETE
  TO authenticated
  USING (public.arq_is_admin());

-- ┌─ ARQ_SITE_CONFIG ───────────────────────────────────────────
CREATE POLICY "arq_site_config: leitura pública"
  ON public.arq_site_config FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "arq_site_config: admin atualiza (AAL2)"
  ON public.arq_site_config FOR UPDATE
  TO authenticated
  USING (public.arq_is_admin())
  WITH CHECK (public.arq_is_admin());

-- ─── DADOS INICIAIS — arq_site_config ────────────────────────

INSERT INTO public.arq_site_config (chave, valor, descricao) VALUES
  ('nome_instituicao',   'Arquidiocese de Botucatu',                         'Nome oficial da instituição'),
  ('arcebispo',          'Dom Maurício Grotto de Camargo',                   'Nome do Arcebispo atual'),
  ('endereco',           'Rua Dr. Costa Leite, 668 — Centro',                'Endereço da Cúria'),
  ('cidade',             'Botucatu/SP',                                       'Cidade e estado'),
  ('cep',                '18600-010',                                         'CEP da Cúria'),
  ('telefone',           '(14) 3811-5900',                                   'Telefone da Cúria'),
  ('email',              'secretaria@arquidiocesebotucatu.org.br',            'E-mail institucional'),
  ('horario_atendimento','Segunda a sexta, 8h às 18h',                       'Horário de atendimento'),
  ('instagram',          'https://www.instagram.com/arquidiocesedebotucatu', 'Instagram'),
  ('facebook',           'https://www.facebook.com/arquidiocesedebotucatu',  'Facebook'),
  ('youtube',            '',                                                  'YouTube'),
  ('site_externo',       'https://arquidiocesebotucatu.org.br',              'Site anterior/externo')
ON CONFLICT (chave) DO NOTHING;

-- ─── STORAGE BUCKETS ─────────────────────────────────────────
-- Criar manualmente no painel: Storage → New bucket
--   arq-noticias   (público)  — imagens dos artigos
--   arq-clero      (público)  — fotos de padres/diáconos/seminaristas
--   arq-documentos (privado)  — PDFs (download via URL assinada)

-- ══════════════════════════════════════════════════════════════
--  FIM DO SCHEMA — Arquidiocese de Botucatu
-- ══════════════════════════════════════════════════════════════
