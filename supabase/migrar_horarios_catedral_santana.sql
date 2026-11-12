-- ══════════════════════════════════════════════════════════════
--  Atualiza os horários da Catedral Metropolitana Basílica Menor
--  de Sant'Ana (Matriz + Capela S. Trindade).
-- ══════════════════════════════════════════════════════════════

DO $$
DECLARE
  v_paroquia_id uuid;
  v_matriz_id   uuid;
  v_capela_id   uuid;
BEGIN
  SELECT id INTO v_paroquia_id
  FROM public.arq_paroquias
  WHERE nome = 'Catedral Metropolitana Basílica Menor de Sant''Ana';

  -- local "Matriz" (mesmo nome da paróquia)
  SELECT id INTO v_matriz_id
  FROM public.arq_locais
  WHERE paroquia_id = v_paroquia_id
    AND nome = 'Catedral Metropolitana Basílica Menor de Sant''Ana';

  DELETE FROM public.arq_horarios_missa WHERE local_id = v_matriz_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_matriz_id, ARRAY['Sábado'], ARRAY['16h','19h']),
    (v_matriz_id, ARRAY['Domingo'], ARRAY['7h30','10h','19h']);

  -- Capela S. Trindade: cria se não existir, senão reaproveita
  SELECT id INTO v_capela_id
  FROM public.arq_locais
  WHERE paroquia_id = v_paroquia_id
    AND nome = 'Capela S. Trindade';

  IF v_capela_id IS NULL THEN
    INSERT INTO public.arq_locais (nome, tipos, paroquia_id)
    VALUES ('Capela S. Trindade', ARRAY['Capela'], v_paroquia_id)
    RETURNING id INTO v_capela_id;
  END IF;

  DELETE FROM public.arq_horarios_missa WHERE local_id = v_capela_id;
  INSERT INTO public.arq_horarios_missa (local_id, dias, horarios) VALUES
    (v_capela_id, ARRAY['Quarta'], ARRAY['12h']),
    (v_capela_id, ARRAY['Terça','Quinta','Sexta'], ARRAY['7h','18h30']);
END $$;

-- Confere o resultado
SELECT p.nome AS paroquia, l.nome AS local, l.tipos, h.dias, h.horarios
FROM public.arq_horarios_missa h
JOIN public.arq_locais l ON l.id = h.local_id
JOIN public.arq_paroquias p ON p.id = l.paroquia_id
WHERE p.nome = 'Catedral Metropolitana Basílica Menor de Sant''Ana'
ORDER BY l.nome;
