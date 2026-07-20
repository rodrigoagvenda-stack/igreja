-- ══════════════════════════════════════════════════════════════
-- seed.sql — Dados reais do Guia Informativo 2026
-- Fonte: Guia Informativo Arquidiocese de Sant'Ana de Botucatu 2026
-- Executar no SQL Editor do Supabase
-- ══════════════════════════════════════════════════════════════

-- Limpar dados existentes (ordem respeita FKs)
TRUNCATE public.arq_seminaristas   RESTART IDENTITY CASCADE;
TRUNCATE public.arq_diaconos       RESTART IDENTITY CASCADE;
TRUNCATE public.arq_padres         RESTART IDENTITY CASCADE;
TRUNCATE public.arq_horarios_missa RESTART IDENTITY CASCADE;
TRUNCATE public.arq_locais         RESTART IDENTITY CASCADE;
TRUNCATE public.arq_paroquias      RESTART IDENTITY CASCADE;
TRUNCATE public.arq_setores_pastorais RESTART IDENTITY CASCADE;
TRUNCATE public.arq_eventos        RESTART IDENTITY CASCADE;

-- ─── PARÓQUIAS ────────────────────────────────────────────────
-- 47 paróquias em 4 Regiões Pastorais

INSERT INTO public.arq_paroquias (slug, nome, cidade, regiao_pastoral, padroeiro, ativa) VALUES
  -- RP1 — Botucatu (Coord: Pe. Ricardo Vieira Pinto)
  ('catedral-santana',               'Catedral Metropolitana Basílica Menor de Sant''Ana', 'Botucatu',              'RP1', 'Sant''Ana',                    true),
  ('santuario-nossa-senhora-lourdes','Santuário Nossa Senhora de Lourdes',                 'Botucatu',              'RP1', 'Nossa Senhora de Lourdes',     true),
  ('sagrado-coracao-de-jesus',       'Paróquia Sagrado Coração de Jesus',                  'Botucatu',              'RP1', 'Sagrado Coração de Jesus',     true),
  ('divino-pai-eterno',              'Paróquia Divino Pai Eterno',                         'Botucatu',              'RP1', 'Divino Pai Eterno',            true),
  ('sao-benedito-botucatu',          'Paróquia São Benedito',                              'Botucatu',              'RP1', 'São Benedito',                 true),
  ('menino-deus-santo-antonio',      'Paróquia Menino Deus e Santo Antônio',               'Botucatu',              'RP1', 'Menino Deus',                  true),
  ('rosario-de-fatima',              'Paróquia Nossa Senhora do Rosário de Fátima',        'Botucatu',              'RP1', 'Nossa Senhora do Rosário',     true),
  ('nossa-senhora-menina',           'Paróquia Nossa Senhora Menina',                      'Botucatu',              'RP1', 'Nossa Senhora Menina',         true),
  ('nossa-senhora-aparecida-btu',    'Paróquia Nossa Senhora Aparecida',                   'Botucatu',              'RP1', 'Nossa Senhora Aparecida',      true),
  ('nossa-senhora-guadalupe',        'Paróquia Nossa Senhora de Guadalupe',                'Botucatu',              'RP1', 'Nossa Senhora de Guadalupe',   true),
  ('santa-teresinha-btu',            'Paróquia Santa Teresinha',                           'Botucatu',              'RP1', 'Santa Teresinha',              true),
  ('sao-pio-x',                      'Paróquia São Pio X',                                 'Botucatu',              'RP1', 'São Pio X',                    true),
  ('santo-antonio-rubiao-junior',    'Paróquia Santo Antônio — Rubião Júnior',             'Botucatu',              'RP1', 'Santo Antônio',                true),
  ('sagrada-familia',                'Paróquia Sagrada Família',                           'Botucatu',              'RP1', 'Sagrada Família',              true),
  ('santissimo-sacramento',          'Paróquia Santíssimo Sacramento',                     'Botucatu',              'RP1', 'Santíssimo Sacramento',        true),
  ('sao-joao-batista-itatinga',      'Paróquia São João Batista',                          'Itatinga',              'RP1', 'São João Batista',             true),
  ('divino-espirito-santo-pardinho', 'Paróquia Divino Espírito Santo',                     'Pardinho',              'RP1', 'Divino Espírito Santo',        true),
  -- RP2 — Avaré (Coord: Pe. Edenilson das Neves)
  ('santuario-nossa-senhora-dores',  'Santuário Nossa Senhora das Dores',                  'Avaré',                 'RP2', 'Nossa Senhora das Dores',      true),
  ('santo-expedito-avare',           'Paróquia Santo Expedito',                            'Avaré',                 'RP2', 'Santo Expedito',               true),
  ('sao-benedito-avare',             'Paróquia São Benedito',                              'Avaré',                 'RP2', 'São Benedito',                 true),
  ('nossa-senhora-fatima-avare',     'Paróquia Nossa Senhora de Fátima',                   'Avaré',                 'RP2', 'Nossa Senhora de Fátima',      true),
  ('sao-pedro-apostolo-avare',       'Paróquia São Pedro Apóstolo',                        'Avaré',                 'RP2', 'São Pedro Apóstolo',           true),
  ('sao-jose-avare',                 'Paróquia São José',                                  'Avaré',                 'RP2', 'São José',                     true),
  ('santuario-sao-judas-tadeu',      'Santuário São Judas Tadeu',                          'Avaré',                 'RP2', 'São Judas Tadeu',              true),
  ('santa-teresinha-cerqueira',      'Paróquia Santa Teresinha',                           'Cerqueira César',       'RP2', 'Santa Teresinha',              true),
  ('santa-barbara-aguas',            'Paróquia Santa Bárbara',                             'Águas de Sta. Bárbara', 'RP2', 'Santa Bárbara',                true),
  ('nossa-senhora-boa-morte-arandu', 'Paróquia Nossa Senhora da Boa Morte',                'Arandu',                'RP2', 'Nossa Senhora da Boa Morte',   true),
  ('santa-luzia-iaras',              'Paróquia Santa Luzia',                               'Iaras',                 'RP2', 'Santa Luzia',                  true),
  -- RP3 — Laranjal Paulista (Coord: Pe. Edélcio Augusto Soares)
  ('sao-joao-batista-laranjal',      'Paróquia São João Batista',                          'Laranjal Paulista',     'RP3', 'São João Batista',             true),
  ('sao-roque',                      'Paróquia São Roque',                                 'Laranjal Paulista',     'RP3', 'São Roque',                    true),
  ('santo-antonio-maristela',        'Paróquia Santo Antônio',                             'Maristela',             'RP3', 'Santo Antônio',                true),
  ('senhor-bom-jesus-conchas',       'Santuário Senhor Bom Jesus',                         'Conchas',               'RP3', 'Senhor Bom Jesus',             true),
  ('nossa-senhora-piedade-bofete',   'Paróquia Nossa Senhora da Piedade',                  'Bofete',                'RP3', 'Nossa Senhora da Piedade',     true),
  ('nossa-senhora-remedios-anhembi', 'Paróquia Nossa Senhora dos Remédios',                'Anhembi',               'RP3', 'Nossa Senhora dos Remédios',   true),
  ('nossa-senhora-gracas-piramboiia','Paróquia Nossa Senhora das Graças',                  'Pirambóia',             'RP3', 'Nossa Senhora das Graças',     true),
  ('nossa-senhora-conceicao-pereiras','Paróquia Nossa Senhora da Conceição',               'Pereiras',              'RP3', 'Nossa Senhora da Conceição',   true),
  -- RP4 — Lençóis Paulista / São Manuel (Coord: Pe. Ivonil Parraz)
  ('santuario-piedade-lencois',      'Santuário Nossa Senhora da Piedade',                 'Lençóis Paulista',      'RP4', 'Nossa Senhora da Piedade',     true),
  ('sao-jose-lencois',               'Paróquia São José',                                  'Lençóis Paulista',      'RP4', 'São José',                     true),
  ('nossa-senhora-aparecida-lencois','Paróquia Nossa Senhora Aparecida',                   'Lençóis Paulista',      'RP4', 'Nossa Senhora Aparecida',      true),
  ('sao-pedro-e-sao-paulo-lencois',  'Paróquia São Pedro e São Paulo',                     'Lençóis Paulista',      'RP4', 'São Pedro e São Paulo',        true),
  ('cristo-ressuscitado',            'Paróquia Cristo Ressuscitado',                       'Lençóis Paulista',      'RP4', 'Cristo Ressuscitado',          true),
  ('santana-e-sao-joaquim',          'Paróquia Sant''Ana e São Joaquim',                   'Lençóis Paulista',      'RP4', 'Sant''Ana',                    true),
  ('sao-manuel',                     'Paróquia São Manuel',                                'São Manuel',            'RP4', 'São Manuel',                   true),
  ('nossa-senhora-consolata',        'Paróquia Nossa Senhora Consolata',                   'São Manuel',            'RP4', 'Nossa Senhora Consolata',      true),
  ('nossa-senhora-aparecida-sao-manuel','Santuário Nossa Senhora Aparecida',               'Aparecida de S. Manuel','RP4', 'Nossa Senhora Aparecida',      true),
  ('santo-antonio-macatuba',         'Paróquia Santo Antônio',                             'Macatuba',              'RP4', 'Santo Antônio',                true),
  ('santa-cruz-areiopolis',          'Paróquia Santa Cruz',                                'Areiópolis',            'RP4', 'Santa Cruz',                   true),
  ('sao-joaquim-igaracu',            'Paróquia São Joaquim',                               'Igaraçu do Tietê',      'RP4', 'São Joaquim',                  true),
  ('nossa-senhora-gracas-borebi',    'Paróquia Nossa Senhora das Graças',                  'Borebi',                'RP4', 'Nossa Senhora das Graças',     true),
  ('senhor-bom-jesus-pratania',      'Paróquia Senhor Bom Jesus e Santa Marcelina',        'Pratânia',              'RP4', 'Senhor Bom Jesus',             true)
;

-- ─── PADRES ───────────────────────────────────────────────────

INSERT INTO public.arq_padres (nome, paroquia_id, ativo) VALUES
  -- RP1
  ('Côn. Emerson Rogério Anizi',        (SELECT id FROM public.arq_paroquias WHERE slug = 'catedral-santana'),               true),
  ('Pe. Athila José Tintino',            (SELECT id FROM public.arq_paroquias WHERE slug = 'sagrado-coracao-de-jesus'),       true),
  ('Pe. João Vitor Panchoni Sant''Anna', (SELECT id FROM public.arq_paroquias WHERE slug = 'divino-pai-eterno'),             true),
  ('Pe. Ademar Domingos Roma',           (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-benedito-botucatu'),         true),
  ('Pe. José Aparecido Hergesse',        (SELECT id FROM public.arq_paroquias WHERE slug = 'menino-deus-santo-antonio'),     true),
  ('Côn. Joinville Antônio de Arruda',  (SELECT id FROM public.arq_paroquias WHERE slug = 'rosario-de-fatima'),             true),
  ('Pe. Gustavo Viaro Correa',           (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-menina'),          true),
  ('Pe. Milton José Perretti',           (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-aparecida-btu'),   true),
  ('Pe. Richard Alisson Ferreira',       (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-guadalupe'),       true),
  ('Pe. João Camilo Silveira',           (SELECT id FROM public.arq_paroquias WHERE slug = 'santa-teresinha-btu'),           true),
  ('Pe. José Francisco Antunes',         (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-pio-x'),                    true),
  ('Côn. Alberto Campezato',            (SELECT id FROM public.arq_paroquias WHERE slug = 'santo-antonio-rubiao-junior'),   true),
  ('Pe. Ricardo Vieira Pinto',           (SELECT id FROM public.arq_paroquias WHERE slug = 'sagrada-familia'),               true),
  ('Pe. Marco Antônio Raphael',          (SELECT id FROM public.arq_paroquias WHERE slug = 'santissimo-sacramento'),         true),
  ('Côn. Marcos Paulo de Campos',       (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-joao-batista-itatinga'),     true),
  ('Pe. Alberico Pinheiro',              (SELECT id FROM public.arq_paroquias WHERE slug = 'divino-espirito-santo-pardinho'),true),
  -- RP2
  ('Pe. Bruno F. Gonçalves de Oliveira',(SELECT id FROM public.arq_paroquias WHERE slug = 'santuario-nossa-senhora-dores'), true),
  ('Côn. Marcelo Aparecido Paes',       (SELECT id FROM public.arq_paroquias WHERE slug = 'santo-expedito-avare'),          true),
  ('Pe. Fernando Maróstica',             (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-benedito-avare'),            true),
  ('Pe. Jonnhy Peterson Oliveira Rocha',(SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-fatima-avare'),    true),
  ('Pe. Luís Gustavo Faxina',            (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-pedro-apostolo-avare'),     true),
  ('Pe. Lázaro Augusto Iglesias',        (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-jose-avare'),               true),
  ('Pe. João Paulo Sillio',              (SELECT id FROM public.arq_paroquias WHERE slug = 'santuario-sao-judas-tadeu'),     true),
  ('Pe. Tarcísio César de Oliveira',     (SELECT id FROM public.arq_paroquias WHERE slug = 'santa-teresinha-cerqueira'),    true),
  ('Mons. Edmilson José Zanin',          (SELECT id FROM public.arq_paroquias WHERE slug = 'santa-barbara-aguas'),          true),
  ('Pe. Edenilson Aparecido das Neves',  (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-boa-morte-arandu'),true),
  ('Pe. Valter Jeremias da Silva',       (SELECT id FROM public.arq_paroquias WHERE slug = 'santa-luzia-iaras'),            true),
  -- RP3
  ('Pe. Edélcio Augusto Soares',         (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-joao-batista-laranjal'),    true),
  ('Pe. Cristiano Pedroso Robles',       (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-roque'),                    true),
  ('Pe. Rafael Antônio Paixão Soares',   (SELECT id FROM public.arq_paroquias WHERE slug = 'santo-antonio-maristela'),      true),
  ('Pe. José Carlos Ferreira da Silva',  (SELECT id FROM public.arq_paroquias WHERE slug = 'senhor-bom-jesus-conchas'),     true),
  ('Pe. Antônio Donisete Musachio',      (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-piedade-bofete'), true),
  ('Pe. Márcio Luiz Cândido',            (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-remedios-anhembi'),true),
  ('Pe. Donizette Camilo Júnior',        (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-conceicao-pereiras'),true),
  -- RP4
  ('Pe. Adauto José Martins',            (SELECT id FROM public.arq_paroquias WHERE slug = 'santuario-piedade-lencois'),    true),
  ('Pe. Marcelo Henrique do Prado',      (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-jose-lencois'),             true),
  ('Pe. Márcio Godoy Junior',            (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-aparecida-lencois'),true),
  ('Pe. Gleison Nascimento Magatão',     (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-pedro-e-sao-paulo-lencois'),true),
  ('Pe. Daniel Bruno Garcia Veiga',      (SELECT id FROM public.arq_paroquias WHERE slug = 'cristo-ressuscitado'),           true),
  ('Pe. Arley José Leite',               (SELECT id FROM public.arq_paroquias WHERE slug = 'santana-e-sao-joaquim'),        true),
  ('Pe. Luiz Andriolo',                  (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-manuel'),                   true),
  ('Pe. Laudo Corrêa',                   (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-consolata'),      true),
  ('Pe. Maurício dos Santos Guerra',     (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-aparecida-sao-manuel'),true),
  ('Pe. Silvano Palmeira',               (SELECT id FROM public.arq_paroquias WHERE slug = 'santo-antonio-macatuba'),       true),
  ('Pe. Luiz Aparecido Iauch',           (SELECT id FROM public.arq_paroquias WHERE slug = 'santa-cruz-areiopolis'),        true),
  ('Pe. Ivonil Parraz',                  (SELECT id FROM public.arq_paroquias WHERE slug = 'sao-joaquim-igaracu'),          true),
  ('Pe. Carlos Eduardo de Vasconcelos',  (SELECT id FROM public.arq_paroquias WHERE slug = 'senhor-bom-jesus-pratania'),    true)
;

-- ─── DIÁCONOS PERMANENTES ─────────────────────────────────────

INSERT INTO public.arq_diaconos (nome, ativo) VALUES
  ('Dc. Adilson Rocha',             true),
  ('Dc. Attílio Luiz Albiero',      true),
  ('Dc. Daniel Tomazella',          true),
  ('Dc. Estevão Pesavento',         true),
  ('Dc. Germano Zimmerman',         true),
  ('Dc. Hélio Camilo Silva',        true),
  ('Dc. João Carlos Batista',       true),
  ('Dc. João Marques Santos',       true),
  ('Dc. Luiz Carlos dos Santos',    true),
  ('Dc. Luiz Roberto Marques',      true),
  ('Dc. Marcos Tozadore',           true),
  ('Dc. Ricardo Gilberto Delazari', true),
  ('Dc. Ronaldo Pereira de Souza',  true)
;

-- ─── SEMINARISTAS 2026 ────────────────────────────────────────

INSERT INTO public.arq_seminaristas (nome, nascimento, ano_formacao, paroquia_id, ativo) VALUES
  -- Propedêutico — Seminário São José, Botucatu
  ('André Lucas Sousa da Silva',     '2000-06-10', 'Propedêutico',  (SELECT id FROM public.arq_paroquias WHERE slug = 'santissimo-sacramento'),      true),
  ('Jhonatan Sousa da Silva',        '1996-04-16', 'Propedêutico',  (SELECT id FROM public.arq_paroquias WHERE slug = 'santana-e-sao-joaquim'),      true),
  ('João Pedro Porphírio dos Santos','2008-02-23', 'Propedêutico',  (SELECT id FROM public.arq_paroquias WHERE slug = 'rosario-de-fatima'),           true),
  ('Mateus Henrique Langoni',        '2005-07-08', 'Propedêutico',  (SELECT id FROM public.arq_paroquias WHERE slug = 'santana-e-sao-joaquim'),      true),
  -- Filosofia — FAJE, Belo Horizonte
  ('Pedro Silvério de Oliveira',     '1997-04-09', '2.º Filosofia', (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-boa-morte-arandu'),true),
  ('Diego Tellecher Alves Dias',     '2002-12-05', '3.º Filosofia', (SELECT id FROM public.arq_paroquias WHERE slug = 'rosario-de-fatima'),           true),
  ('João Victor dos Reis Armando',   '2005-06-11', '3.º Filosofia', (SELECT id FROM public.arq_paroquias WHERE slug = 'nossa-senhora-boa-morte-arandu'),true),
  -- Teologia — FAJE, Belo Horizonte
  ('Alex Ângelo Batistela Júnior',   '1991-12-21', '2.º Teologia',  (SELECT id FROM public.arq_paroquias WHERE slug = 'santana-e-sao-joaquim'),      true),
  ('Leonardo Fernandes Rocha',       '1996-05-02', '3.º Teologia',  (SELECT id FROM public.arq_paroquias WHERE slug = 'santuario-nossa-senhora-dores'),true),
  ('Rafael Augusto da Costa',        '2001-01-02', '3.º Teologia',  (SELECT id FROM public.arq_paroquias WHERE slug = 'santuario-piedade-lencois'),  true)
;

-- ─── SETORES PASTORAIS ────────────────────────────────────────

INSERT INTO public.arq_setores_pastorais (slug, nome, descricao, ordem) VALUES
  ('comunhao-e-participacao', 'Comunhão e Participação',
   'Animação da vida comunitária e coordenação da participação dos fiéis na missão evangelizadora da Igreja.', 1),
  ('familia',                 'Família',
   'Acompanhamento pastoral das famílias em todas as fases da vida, promovendo a espiritualidade conjugal e familiar.', 2),
  ('vocacoes',                'Vocações',
   'Promoção e acompanhamento de vocações ao sacerdócio, ao diaconato e à vida consagrada na Arquidiocese.', 3),
  ('liturgia',                'Liturgia',
   'Animação litúrgica, formação de ministros e promoção das celebrações litúrgicas nas comunidades da Arquidiocese.', 4),
  ('catequese',               'Catequese',
   'Formação e iniciação à fé cristã para crianças, jovens e adultos, em articulação com todas as paróquias.', 5),
  ('juventude',               'Juventude',
   'Pastoral juvenil, grupos de jovens, encontros diocesanos e animação missionária entre os jovens da Arquidiocese.', 6),
  ('movimentos-associacoes',  'Movimentos e Associações',
   'Coordenação dos movimentos apostólicos e associações de fiéis presentes na Arquidiocese.', 7),
  ('pastorais-sociais',       'Pastorais Sociais',
   'Promoção humana integral e serviço solidário aos mais vulneráveis, em resposta ao Evangelho da Caridade.', 8),
  ('pascom',                  'PASCOM',
   'Pastoral da Comunicação Social — evangelização nos meios digitais, imprensa e comunicação comunitária.', 9),
  ('pastoral-universitaria',  'Pastoral Universitária',
   'Acompanhamento pastoral dos universitários e animação da fé nos ambientes acadêmicos da região.', 10)
;

-- ─── EVENTOS — Calendário Pastoral 2026 ──────────────────────

INSERT INTO public.arq_eventos (titulo, descricao, local, categoria, inicio, fim, destaque) VALUES
  ('Início do Ano Pastoral 2026',
   'Abertura solene do Ano Pastoral Arquidiocesano com celebração presidida pelo Arcebispo Dom Maurício Grotto de Camargo.',
   'Catedral Metropolitana de Botucatu', 'Litúrgico', '2026-02-01 10:00:00-03', NULL, true),

  ('Quaresma — Início do Tempo Quaresmal',
   'Celebração do Domingo de Ramos nas paróquias da Arquidiocese. Início do Tempo Quaresmal.',
   'Todas as paróquias', 'Litúrgico', '2026-02-18 00:00:00-03', '2026-04-04 00:00:00-03', true),

  ('Semana Santa 2026',
   'Triduo Pascal: Quinta-feira Santa, Sexta-feira da Paixão e Vigília Pascal. Celebrações em todas as paróquias.',
   'Todas as paróquias', 'Litúrgico', '2026-03-29 00:00:00-03', '2026-04-05 00:00:00-03', true),

  ('Páscoa do Senhor',
   'Solenidade da Ressurreição do Senhor. Missa Festiva presidida pelo Arcebispo na Catedral.',
   'Catedral Metropolitana de Botucatu', 'Litúrgico', '2026-04-05 10:00:00-03', NULL, true),

  ('Assembléia Diocesana de Pastoral',
   'Encontro anual com representantes de todos os setores pastorais, paróquias e regiões da Arquidiocese.',
   'Centro Pastoral — Botucatu', 'Institucional', '2026-04-25 09:00:00-03', '2026-04-25 17:00:00-03', false),

  ('Festa de Sant''Ana — Padroeira da Arquidiocese',
   'Solenidade de Sant''Ana, padroeira da Arquidiocese de Botucatu. Missa Pontifical presidida pelo Arcebispo.',
   'Catedral Metropolitana de Botucatu', 'Litúrgico', '2026-07-26 10:00:00-03', NULL, true),

  ('Assembleia dos Párocos — 2.º Semestre',
   'Reunião de planejamento pastoral com todos os párocos da Arquidiocese para o segundo semestre.',
   'Cúria Metropolitana — Botucatu', 'Institucional', '2026-08-01 09:00:00-03', '2026-08-01 17:00:00-03', false),

  ('Encontro Regional de Catequistas — RP1',
   'Formação para catequistas da Região Pastoral 1 — Botucatu.',
   'Centro Pastoral — Botucatu', 'Formação', '2026-08-15 09:00:00-03', '2026-08-15 17:00:00-03', false),

  ('Nossa Senhora Aparecida — Padroeira do Brasil',
   'Solenidade de Nossa Senhora Aparecida. Celebrações festivas em todas as paróquias.',
   'Todas as paróquias', 'Litúrgico', '2026-10-12 00:00:00-03', NULL, true),

  ('Finados — Missas nos Cemitérios',
   'Celebrações de sufrágio pelos fiéis defuntos. Missas nos cemitérios das cidades da Arquidiocese.',
   'Cemitérios das paróquias', 'Litúrgico', '2026-11-02 00:00:00-03', NULL, false),

  ('Cristo Rei — Encerramento do Ano Litúrgico',
   'Solenidade de Cristo Rei do Universo. Encerramento do Ano Litúrgico 2026.',
   'Todas as paróquias', 'Litúrgico', '2026-11-22 00:00:00-03', NULL, true),

  ('Advento — Início do Ano Litúrgico 2027',
   'Início do Tempo do Advento. Abertura do Ano Litúrgico 2026-2027.',
   'Todas as paróquias', 'Litúrgico', '2026-11-29 00:00:00-03', NULL, false),

  ('Natal do Senhor',
   'Solenidade do Natal do Senhor. Missas do Galo e das 10h na Catedral presididas pelo Arcebispo.',
   'Catedral Metropolitana de Botucatu', 'Litúrgico', '2026-12-25 00:00:00-03', NULL, true)
;

-- ══════════════════════════════════════════════════════════════
-- FIM DO SEED — Guia Informativo 2026
-- ══════════════════════════════════════════════════════════════
