-- ══════════════════════════════════════════════════════════════
--  Mostra o texto antigo (descricao) que ainda está salvo no banco,
--  pra cada local cujo horário "sumiu" na tela nova (dias/horarios
--  vazios). Nada foi apagado — só não migrou automaticamente.
-- ══════════════════════════════════════════════════════════════

SELECT
  p.nome AS paroquia,
  l.nome AS local,
  h.descricao AS texto_antigo_salvo
FROM public.arq_horarios_missa h
JOIN public.arq_locais l ON l.id = h.local_id
JOIN public.arq_paroquias p ON p.id = l.paroquia_id
WHERE (h.dias = '{}' OR h.dias IS NULL)
  AND h.descricao IS NOT NULL
  AND h.descricao <> ''
ORDER BY p.nome, l.nome;
