-- ══════════════════════════════════════════════════════════════
--  Arquidiocese de Botucatu — Schema Supabase
--  Executar inteiro no SQL Editor do Supabase (uma só vez)
-- ══════════════════════════════════════════════════════════════

-- ─── EXTENSÕES ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ─── FUNÇÕES AUXILIARES ──────────────────────────────────────

-- Atualiza updated_at automaticamente em UPDATE
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Retorna true se o usuário está autenticado com MFA (AAL2)
-- Usado em todas as políticas de escrita do admin
CREATE OR REPLACE FUNCTION public.is_admin()
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

-- Notícias / artigos do site
CREATE TABLE public.noticias (
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

-- Agenda / eventos pastorais
CREATE TABLE public.eventos (
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

-- Paróquias das 4 regiões pastorais
CREATE TABLE public.paroquias (
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

-- Locais dentro de cada paróquia (matriz ou capelas)
CREATE TABLE public.locais (
  id           uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  paroquia_id  uuid NOT NULL REFERENCES public.paroquias(id) ON DELETE CASCADE,
  nome         text NOT NULL,
  tipo         text NOT NULL CHECK (tipo IN ('Matriz','Capela')),
  endereco     text,
  created_at   timestamptz DEFAULT now() NOT NULL
);

-- Horários de missa por local
CREATE TABLE public.horarios_missa (
  id          uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  local_id    uuid NOT NULL REFERENCES public.locais(id) ON DELETE CASCADE,
  descricao   text NOT NULL,  -- ex: "Domingo 8h", "Seg–Sex 7h"
  created_at  timestamptz DEFAULT now() NOT NULL
);

-- Padres da arquidiocese
CREATE TABLE public.padres (
  id           uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome         text    NOT NULL,
  nascimento   date,
  ordenacao    date,
  paroquia_id  uuid    REFERENCES public.paroquias(id) ON DELETE SET NULL,
  foto_url     text,
  ativo        boolean DEFAULT true,
  created_at   timestamptz DEFAULT now() NOT NULL,
  updated_at   timestamptz DEFAULT now() NOT NULL
);

-- Diáconos permanentes
CREATE TABLE public.diaconos (
  id           uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome         text    NOT NULL,
  nascimento   date,
  ordenacao    date,
  paroquia_id  uuid    REFERENCES public.paroquias(id) ON DELETE SET NULL,
  foto_url     text,
  ativo        boolean DEFAULT true,
  created_at   timestamptz DEFAULT now() NOT NULL,
  updated_at   timestamptz DEFAULT now() NOT NULL
);

-- Seminaristas em formação
CREATE TABLE public.seminaristas (
  id             uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome           text    NOT NULL,
  nascimento     date,
  ano_formacao   text    NOT NULL,
  paroquia_id    uuid    REFERENCES public.paroquias(id) ON DELETE SET NULL,
  foto_url       text,
  ativo          boolean DEFAULT true,
  created_at     timestamptz DEFAULT now() NOT NULL,
  updated_at     timestamptz DEFAULT now() NOT NULL
);

-- Documentos oficiais (decretos, nomeações, circulares, comunicados)
CREATE TABLE public.documentos (
  id            uuid  DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug          text  NOT NULL UNIQUE,
  titulo        text  NOT NULL,
  tipo          text  NOT NULL CHECK (tipo IN ('Decreto','Comunicado','Nomeação','Circular')),
  arquivo_url   text,
  publicado_em  date  NOT NULL DEFAULT CURRENT_DATE,
  created_at    timestamptz DEFAULT now() NOT NULL,
  updated_at    timestamptz DEFAULT now() NOT NULL
);

-- Setores pastorais (PASCOM, Catequese, Cáritas, etc.)
CREATE TABLE public.setores_pastorais (
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

-- Configurações gerais do site (endereço, redes sociais, etc.)
CREATE TABLE public.site_config (
  id          uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  chave       text NOT NULL UNIQUE,
  valor       text,
  descricao   text,
  updated_at  timestamptz DEFAULT now() NOT NULL
);

-- ─── ÍNDICES ─────────────────────────────────────────────────

CREATE INDEX idx_noticias_status      ON public.noticias(status);
CREATE INDEX idx_noticias_publicado   ON public.noticias(publicado_em DESC NULLS LAST);
CREATE INDEX idx_noticias_destaque    ON public.noticias(destaque) WHERE destaque = true;
CREATE INDEX idx_noticias_categoria   ON public.noticias(categoria);

CREATE INDEX idx_eventos_inicio       ON public.eventos(inicio);
CREATE INDEX idx_eventos_destaque     ON public.eventos(destaque) WHERE destaque = true;

CREATE INDEX idx_paroquias_regiao     ON public.paroquias(regiao_pastoral);
CREATE INDEX idx_paroquias_cidade     ON public.paroquias(cidade);
CREATE INDEX idx_paroquias_ativa      ON public.paroquias(ativa) WHERE ativa = true;

CREATE INDEX idx_locais_paroquia      ON public.locais(paroquia_id);
CREATE INDEX idx_horarios_local       ON public.horarios_missa(local_id);

CREATE INDEX idx_padres_paroquia      ON public.padres(paroquia_id);
CREATE INDEX idx_padres_ativo         ON public.padres(ativo) WHERE ativo = true;

CREATE INDEX idx_diaconos_paroquia    ON public.diaconos(paroquia_id);
CREATE INDEX idx_diaconos_ativo       ON public.diaconos(ativo) WHERE ativo = true;

CREATE INDEX idx_seminaristas_ano     ON public.seminaristas(ano_formacao);
CREATE INDEX idx_seminaristas_ativo   ON public.seminaristas(ativo) WHERE ativo = true;

CREATE INDEX idx_documentos_tipo      ON public.documentos(tipo);
CREATE INDEX idx_documentos_data      ON public.documentos(publicado_em DESC);

CREATE INDEX idx_setores_ordem        ON public.setores_pastorais(ordem);

-- ─── TRIGGERS updated_at ─────────────────────────────────────

CREATE TRIGGER trg_noticias_updated_at
  BEFORE UPDATE ON public.noticias
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_eventos_updated_at
  BEFORE UPDATE ON public.eventos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_paroquias_updated_at
  BEFORE UPDATE ON public.paroquias
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_padres_updated_at
  BEFORE UPDATE ON public.padres
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_diaconos_updated_at
  BEFORE UPDATE ON public.diaconos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_seminaristas_updated_at
  BEFORE UPDATE ON public.seminaristas
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_documentos_updated_at
  BEFORE UPDATE ON public.documentos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_setores_updated_at
  BEFORE UPDATE ON public.setores_pastorais
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_site_config_updated_at
  BEFORE UPDATE ON public.site_config
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

ALTER TABLE public.noticias          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paroquias         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locais            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horarios_missa    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.padres            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diaconos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seminaristas      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.setores_pastorais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config       ENABLE ROW LEVEL SECURITY;

-- ─── POLÍTICAS ───────────────────────────────────────────────
-- Padrão:
--   anon/authenticated → leitura de conteúdo publicado/ativo
--   authenticated + AAL2 (MFA) → escrita total via is_admin()
-- ─────────────────────────────────────────────────────────────

-- ┌─ NOTÍCIAS ──────────────────────────────────────────────────
CREATE POLICY "noticias: leitura pública de publicadas"
  ON public.noticias FOR SELECT
  TO anon, authenticated
  USING (status = 'publicado');

CREATE POLICY "noticias: admin lê tudo (AAL2)"
  ON public.noticias FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "noticias: admin insere (AAL2)"
  ON public.noticias FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "noticias: admin atualiza (AAL2)"
  ON public.noticias FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "noticias: admin exclui (AAL2)"
  ON public.noticias FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ┌─ EVENTOS ───────────────────────────────────────────────────
CREATE POLICY "eventos: leitura pública"
  ON public.eventos FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "eventos: admin insere (AAL2)"
  ON public.eventos FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "eventos: admin atualiza (AAL2)"
  ON public.eventos FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "eventos: admin exclui (AAL2)"
  ON public.eventos FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ┌─ PARÓQUIAS ─────────────────────────────────────────────────
CREATE POLICY "paroquias: leitura pública das ativas"
  ON public.paroquias FOR SELECT
  TO anon, authenticated
  USING (ativa = true);

CREATE POLICY "paroquias: admin lê todas (AAL2)"
  ON public.paroquias FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "paroquias: admin insere (AAL2)"
  ON public.paroquias FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "paroquias: admin atualiza (AAL2)"
  ON public.paroquias FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "paroquias: admin exclui (AAL2)"
  ON public.paroquias FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ┌─ LOCAIS ────────────────────────────────────────────────────
CREATE POLICY "locais: leitura pública"
  ON public.locais FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "locais: admin insere (AAL2)"
  ON public.locais FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "locais: admin atualiza (AAL2)"
  ON public.locais FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "locais: admin exclui (AAL2)"
  ON public.locais FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ┌─ HORÁRIOS DE MISSA ─────────────────────────────────────────
CREATE POLICY "horarios: leitura pública"
  ON public.horarios_missa FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "horarios: admin insere (AAL2)"
  ON public.horarios_missa FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "horarios: admin atualiza (AAL2)"
  ON public.horarios_missa FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "horarios: admin exclui (AAL2)"
  ON public.horarios_missa FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ┌─ PADRES ────────────────────────────────────────────────────
CREATE POLICY "padres: leitura pública dos ativos"
  ON public.padres FOR SELECT
  TO anon, authenticated
  USING (ativo = true);

CREATE POLICY "padres: admin lê todos (AAL2)"
  ON public.padres FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "padres: admin insere (AAL2)"
  ON public.padres FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "padres: admin atualiza (AAL2)"
  ON public.padres FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "padres: admin exclui (AAL2)"
  ON public.padres FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ┌─ DIÁCONOS ──────────────────────────────────────────────────
CREATE POLICY "diaconos: leitura pública dos ativos"
  ON public.diaconos FOR SELECT
  TO anon, authenticated
  USING (ativo = true);

CREATE POLICY "diaconos: admin lê todos (AAL2)"
  ON public.diaconos FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "diaconos: admin insere (AAL2)"
  ON public.diaconos FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "diaconos: admin atualiza (AAL2)"
  ON public.diaconos FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "diaconos: admin exclui (AAL2)"
  ON public.diaconos FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ┌─ SEMINARISTAS ──────────────────────────────────────────────
CREATE POLICY "seminaristas: leitura pública dos ativos"
  ON public.seminaristas FOR SELECT
  TO anon, authenticated
  USING (ativo = true);

CREATE POLICY "seminaristas: admin lê todos (AAL2)"
  ON public.seminaristas FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "seminaristas: admin insere (AAL2)"
  ON public.seminaristas FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "seminaristas: admin atualiza (AAL2)"
  ON public.seminaristas FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "seminaristas: admin exclui (AAL2)"
  ON public.seminaristas FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ┌─ DOCUMENTOS ────────────────────────────────────────────────
CREATE POLICY "documentos: leitura pública"
  ON public.documentos FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "documentos: admin insere (AAL2)"
  ON public.documentos FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "documentos: admin atualiza (AAL2)"
  ON public.documentos FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "documentos: admin exclui (AAL2)"
  ON public.documentos FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ┌─ SETORES PASTORAIS ─────────────────────────────────────────
CREATE POLICY "setores: leitura pública"
  ON public.setores_pastorais FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "setores: admin insere (AAL2)"
  ON public.setores_pastorais FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "setores: admin atualiza (AAL2)"
  ON public.setores_pastorais FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "setores: admin exclui (AAL2)"
  ON public.setores_pastorais FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ┌─ CONFIGURAÇÕES DO SITE ─────────────────────────────────────
CREATE POLICY "site_config: leitura pública"
  ON public.site_config FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "site_config: admin atualiza (AAL2)"
  ON public.site_config FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ─── DADOS INICIAIS — site_config ────────────────────────────

INSERT INTO public.site_config (chave, valor, descricao) VALUES
  ('nome_instituicao',  'Arquidiocese de Botucatu',                'Nome oficial da instituição'),
  ('arcebispo',         'Dom Maurício Grotto de Camargo',          'Nome do Arcebispo atual'),
  ('endereco',          'Rua Dr. Costa Leite, 668 — Centro',       'Endereço da Cúria'),
  ('cidade',            'Botucatu/SP',                              'Cidade e estado'),
  ('cep',               '18600-010',                                'CEP da Cúria'),
  ('telefone',          '(14) 3811-5900',                          'Telefone da Cúria'),
  ('email',             'secretaria@arquidiocesebotucatu.org.br',   'E-mail institucional'),
  ('horario_atendimento','Segunda a sexta, 8h às 18h',             'Horário de atendimento'),
  ('instagram',         'https://www.instagram.com/arquidiocesedebotucatu', 'Instagram'),
  ('facebook',          'https://www.facebook.com/arquidiocesedebotucatu',  'Facebook'),
  ('youtube',           '',                                         'YouTube'),
  ('site_externo',      'https://arquidiocesebotucatu.org.br',     'Site anterior/externo')
ON CONFLICT (chave) DO NOTHING;

-- ─── STORAGE BUCKETS ─────────────────────────────────────────
-- Criar no painel: Storage → New bucket

-- Bucket "noticias"  (imagens dos artigos)     → PUBLIC
-- Bucket "clero"     (fotos de padres/diáconos) → PUBLIC
-- Bucket "documentos" (PDFs dos documentos)     → PRIVATE (download via URL assinada)

-- ══════════════════════════════════════════════════════════════
--  FIM DO SCHEMA
-- ══════════════════════════════════════════════════════════════
