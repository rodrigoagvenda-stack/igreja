-- ══════════════════════════════════════════════════════════════
--  Migra os horários antigos (texto livre) das 8 paróquias pra
--  estrutura nova (Local + dias/horários), separando Matriz de
--  cada Capela mencionada no texto.
--  Rodar UMA VEZ no SQL Editor do Supabase (projeto dkvznmmiiiljyrkopiqx)
-- ══════════════════════════════════════════════════════════════

-- 1) Paróquia Cristo Ressuscitado ────────────────────────────────
DO $$
DECLARE
  v_paroquia_id uuid;
  v_matriz_id   uuid;
  v_capela_id   uuid;
BEGIN
  SELECT id INTO v_paroquia_id FROM public.arq_paroquias WHERE nome = 'Paróquia Cristo Ressuscitado';
  SELECT id INTO v_matriz_id FROM public.arq_locais WHERE paroquia_id = v_paroquia_id AND nome = 'Paróquia Cristo Ressuscitado';

  DELETE FROM public.arq_horarios_missa WHERE local_id = v_matriz_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_matriz_id, ARRAY['Quarta'], ARRAY['15h00']),
    (v_matriz_id, ARRAY['Sexta'], ARRAY['19h30']),
    (v_matriz_id, ARRAY['Domingo'], ARRAY['7h30','19h00']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela São José', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES (v_capela_id, ARRAY['Sábado'], ARRAY['15h00']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela Nossa Senhora das Graças - Campos Elíseos', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES (v_capela_id, ARRAY['Sábado'], ARRAY['18h00']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela São Francisco - Maristela', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES (v_capela_id, ARRAY['Sábado'], ARRAY['18h00']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela Nossa Senhora de Fátima - Serra Italiana', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES (v_capela_id, ARRAY['Domingo'], ARRAY['9h30']);
END $$;

-- 2) Paróquia Divino Pai Eterno ───────────────────────────────────
DO $$
DECLARE
  v_paroquia_id uuid;
  v_matriz_id   uuid;
  v_capela_id   uuid;
BEGIN
  SELECT id INTO v_paroquia_id FROM public.arq_paroquias WHERE nome = 'Paróquia Divino Pai Eterno';
  SELECT id INTO v_matriz_id FROM public.arq_locais WHERE paroquia_id = v_paroquia_id AND nome = 'Paróquia Divino Pai Eterno';

  DELETE FROM public.arq_horarios_missa WHERE local_id = v_matriz_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_matriz_id, ARRAY['Sexta'], ARRAY['19h30']),
    (v_matriz_id, ARRAY['Domingo'], ARRAY['9h30','18h']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela Santo Expedito', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_capela_id, ARRAY['Terça'], ARRAY['19h30']),
    (v_capela_id, ARRAY['Sábado'], ARRAY['16h00']),
    (v_capela_id, ARRAY['Domingo'], ARRAY['11h00']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela São Cristóvão', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_capela_id, ARRAY['Quinta'], ARRAY['15h00']),
    (v_capela_id, ARRAY['Sábado'], ARRAY['18h30']),
    (v_capela_id, ARRAY['Domingo'], ARRAY['8h00']);
END $$;

-- 3) Paróquia Menino Deus e Santo Antônio ─────────────────────────
DO $$
DECLARE
  v_paroquia_id uuid;
  v_matriz_id   uuid;
  v_capela_id   uuid;
BEGIN
  SELECT id INTO v_paroquia_id FROM public.arq_paroquias WHERE nome = 'Paróquia Menino Deus e Santo Antônio';
  SELECT id INTO v_matriz_id FROM public.arq_locais WHERE paroquia_id = v_paroquia_id AND nome = 'Paróquia Menino Deus e Santo Antônio';

  DELETE FROM public.arq_horarios_missa WHERE local_id = v_matriz_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_matriz_id, ARRAY['Sábado'], ARRAY['18h']),
    (v_matriz_id, ARRAY['Domingo'], ARRAY['10h','19h']),
    (v_matriz_id, ARRAY['Quarta'], ARRAY['19h']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela Santo Antônio', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES (v_capela_id, ARRAY['Sábado'], ARRAY['16h']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela Servas do Senhor', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES (v_capela_id, ARRAY['Domingo'], ARRAY['8h']);
END $$;

-- 4) Paróquia Nossa Senhora de Guadalupe ───────────────────────────
DO $$
DECLARE
  v_paroquia_id uuid;
  v_matriz_id   uuid;
  v_capela_id   uuid;
BEGIN
  SELECT id INTO v_paroquia_id FROM public.arq_paroquias WHERE nome = 'Paróquia Nossa Senhora de Guadalupe';
  SELECT id INTO v_matriz_id FROM public.arq_locais WHERE paroquia_id = v_paroquia_id AND nome = 'Paróquia Nossa Senhora de Guadalupe';

  DELETE FROM public.arq_horarios_missa WHERE local_id = v_matriz_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_matriz_id, ARRAY['Sexta'], ARRAY['19h30']),
    (v_matriz_id, ARRAY['Sábado'], ARRAY['19h30']),
    (v_matriz_id, ARRAY['Domingo'], ARRAY['10h','19h30']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela São Judas', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES (v_capela_id, ARRAY['Domingo'], ARRAY['08h00']);
END $$;

-- 5) Paróquia Nossa Senhora do Rosário de Fátima ───────────────────
DO $$
DECLARE
  v_paroquia_id uuid;
  v_matriz_id   uuid;
  v_capela_id   uuid;
BEGIN
  SELECT id INTO v_paroquia_id FROM public.arq_paroquias WHERE nome = 'Paróquia Nossa Senhora do Rosário de Fátima';
  SELECT id INTO v_matriz_id FROM public.arq_locais WHERE paroquia_id = v_paroquia_id AND nome = 'Paróquia Nossa Senhora do Rosário de Fátima';

  DELETE FROM public.arq_horarios_missa WHERE local_id = v_matriz_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_matriz_id, ARRAY['Quarta'], ARRAY['15h']),
    (v_matriz_id, ARRAY['1ª Sexta-feira do mês — Missa Votiva ao Sagrado Coração de Jesus'], ARRAY['19h30']),
    (v_matriz_id, ARRAY['Sexta'], ARRAY['19h30']),
    (v_matriz_id, ARRAY['Sábado'], ARRAY['19h']),
    (v_matriz_id, ARRAY['Domingo'], ARRAY['9h','19h']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela Santo Expedito', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_capela_id, ARRAY['Domingo'], ARRAY['17h']),
    (v_capela_id, ARRAY['Quarta'], ARRAY['19h30']),
    (v_capela_id, ARRAY['Todo dia 19 — Missa Votiva a Santo Expedito e São José'], ARRAY['19h30']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela São Francisco de Assis', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_capela_id, ARRAY['Todo 1º Sábado do mês'], ARRAY['17h']);
END $$;

-- 6) Paróquia Nossa Senhora Menina ──────────────────────────────── (um local só)
DO $$
DECLARE
  v_paroquia_id uuid;
  v_matriz_id   uuid;
BEGIN
  SELECT id INTO v_paroquia_id FROM public.arq_paroquias WHERE nome = 'Paróquia Nossa Senhora Menina';
  SELECT id INTO v_matriz_id FROM public.arq_locais WHERE paroquia_id = v_paroquia_id AND nome = 'Paróquia Nossa Senhora Menina';

  DELETE FROM public.arq_horarios_missa WHERE local_id = v_matriz_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_matriz_id, ARRAY['Segunda','Terça','Quinta','Sexta'], ARRAY['19h']),
    (v_matriz_id, ARRAY['Quarta'], ARRAY['15h']),
    (v_matriz_id, ARRAY['Sábado'], ARRAY['18h']),
    (v_matriz_id, ARRAY['Domingo'], ARRAY['8h','9h30','11h','19h30']);
END $$;

-- 7) Paróquia Sagrado Coração de Jesus ─────────────────────────────
DO $$
DECLARE
  v_paroquia_id uuid;
  v_matriz_id   uuid;
  v_capela_id   uuid;
BEGIN
  SELECT id INTO v_paroquia_id FROM public.arq_paroquias WHERE nome = 'Paróquia Sagrado Coração de Jesus';
  SELECT id INTO v_matriz_id FROM public.arq_locais WHERE paroquia_id = v_paroquia_id AND nome = 'Paróquia Sagrado Coração de Jesus';

  DELETE FROM public.arq_horarios_missa WHERE local_id = v_matriz_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_matriz_id, ARRAY['Segunda'], ARRAY['7h','12h','19h30']),
    (v_matriz_id, ARRAY['Terça'], ARRAY['7h']),
    (v_matriz_id, ARRAY['Quarta'], ARRAY['7h','12h','15h']),
    (v_matriz_id, ARRAY['Quinta'], ARRAY['7h','12h']),
    (v_matriz_id, ARRAY['Sexta'], ARRAY['7h','12h']),
    (v_matriz_id, ARRAY['Sábado'], ARRAY['7h','16h','18h30']),
    (v_matriz_id, ARRAY['Domingo'], ARRAY['7h','9h30','11h','19h']),
    (v_matriz_id, ARRAY['Primeira sexta-feira do mês — Votiva ao Coração de Jesus'], ARRAY['19h30']);

  INSERT INTO public.arq_locais (nome, tipos, paroquia_id) VALUES ('Capela Santo Antônio', ARRAY['Capela'], v_paroquia_id) RETURNING id INTO v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_capela_id, ARRAY['Segunda sexta-feira do mês'], ARRAY['19h30']);
END $$;

-- 8) Paróquia Santíssimo Sacramento ───────────────────────────────── (um local só)
DO $$
DECLARE
  v_paroquia_id uuid;
  v_matriz_id   uuid;
BEGIN
  SELECT id INTO v_paroquia_id FROM public.arq_paroquias WHERE nome = 'Paróquia Santíssimo Sacramento';
  SELECT id INTO v_matriz_id FROM public.arq_locais WHERE paroquia_id = v_paroquia_id AND nome = 'Paróquia Santíssimo Sacramento';

  DELETE FROM public.arq_horarios_missa WHERE local_id = v_matriz_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_matriz_id, ARRAY['Domingo'], ARRAY['9h','19h']),
    (v_matriz_id, ARRAY['Quarta'], ARRAY['14h30']),
    (v_matriz_id, ARRAY['Quinta'], ARRAY['19h30']),
    (v_matriz_id, ARRAY['1ª Sexta-feira do mês'], ARRAY['19h30']),
    (v_matriz_id, ARRAY['Sábado'], ARRAY['19h']);
END $$;

-- Confere o resultado
SELECT p.nome AS paroquia, l.nome AS local, l.tipos, h.dias, h.horarios
FROM public.arq_horarios_missa h
JOIN public.arq_locais l ON l.id = h.local_id
JOIN public.arq_paroquias p ON p.id = l.paroquia_id
WHERE p.nome IN (
  'Paróquia Cristo Ressuscitado', 'Paróquia Divino Pai Eterno', 'Paróquia Menino Deus e Santo Antônio',
  'Paróquia Nossa Senhora de Guadalupe', 'Paróquia Nossa Senhora do Rosário de Fátima',
  'Paróquia Nossa Senhora Menina', 'Paróquia Sagrado Coração de Jesus', 'Paróquia Santíssimo Sacramento'
)
ORDER BY p.nome, l.nome;
