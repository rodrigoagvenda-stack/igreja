# PRD — Portal Institucional Arquidiocese de Botucatu

> **Versão:** 1.0  
> **Data:** Maio 2025  
> **Responsável técnico:** Agência VENDA  
> **Destinatário:** Claude Code  

---

## 1. Visão Geral do Projeto

### 1.1 Objetivo

Desenvolver o Portal Institucional Oficial da Arquidiocese de Botucatu — um site institucional completo, responsivo e com CMS integrado, destinado a centralizar informações, publicar notícias, divulgar a agenda pastoral, listar paróquias e párocos, e disponibilizar documentos oficiais do governo eclesiástico.

### 1.2 Público-alvo

- Fiéis e comunidade católica regional
- Agentes pastorais e catequistas
- Clero (párocos e diáconos)
- Imprensa local e regional
- Equipe da PASCOM (gestores de conteúdo)

### 1.3 Escopo resumido

- Site público com ~10 seções/páginas principais
- ~50 páginas individuais de paróquias
- Sistema de busca de horários de Missa
- CMS para gestão autônoma de conteúdo pela PASCOM
- Totalmente responsivo: mobile, tablet e desktop

---

## 2. Stack Tecnológica Definida

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Estilização | Tailwind CSS + CSS Variables (tokens do design) |
| CMS | Payload CMS v3 (self-hosted, headless) |
| Banco de dados | PostgreSQL (via Supabase ou Railway) |
| Hosting | Easypanel (VPS) |
| Upload de mídia | Cloudflare R2 ou S3 |
| Fontes | Google Fonts: Playfair Display + Source Sans 3 |
| Ícones | Tabler Icons (`@tabler/icons-react`) |
| SEO | next-seo + sitemap automático |
| Analytics | Google Analytics 4 |

---

## 3. Design System

### 3.1 Tokens de cor

```css
--wine:       #8B1A2E;   /* primária */
--wine-dark:  #6B1322;   /* hover / topbar */
--wine-light: #f5eaed;   /* fundos suaves / hover states */
--gold:       #C9A84C;   /* acento / eyebrow / badges */
--cream:      #f5f3ef;   /* background global */
--white:      #ffffff;
--gray-light: #f0eeea;
--gray-mid:   #e2dfd9;
--gray-text:  #5a5753;
--text:       #1a1a1a;
```

### 3.2 Tipografia

- **Serif (títulos):** `Playfair Display` — pesos 400, 600, 700
- **Sans (corpo/UI):** `Source Sans 3` — pesos 300, 400, 500, 600

### 3.3 Padrões de componente

#### Section Header padrão
Toda seção usa o padrão:
```
[linha decorativa] EYEBROW EM MAIÚSCULAS
Título em Playfair Display
```
Com `border-bottom: 1px solid var(--gray-mid)` separando o header do conteúdo.

#### Cards
- `border-radius: 8px`
- `border: 1px solid var(--gray-mid)`
- `hover: border-color: var(--wine) + box-shadow suave`

#### Botões
- **Primário:** `bg: var(--wine)`, texto branco, `border-radius: 6px`
- **CTA hero:** `bg: white`, texto `var(--wine)`, `hover: bg var(--gold)`
- **Dourado:** `bg: var(--gold)` — usado no botão buscar missa

---

## 4. Arquitetura de Páginas

### 4.1 Mapa de rotas

```
/                          → Página Inicial
/sobre                     → Sobre a Arquidiocese
  /sobre/arcebispo         → O Arcebispo
  /sobre/historia          → História
  /sobre/estrutura         → Estrutura administrativa
/noticias                  → Listagem de notícias
  /noticias/[slug]         → Artigo individual
/paroquias                 → Listagem de paróquias (com filtro por cidade)
  /paroquias/[slug]        → Página individual da paróquia
/parocos                   → Listagem do clero
/agenda                    → Calendário pastoral
/setores                   → Setores pastorais
  /setores/[slug]          → Página individual do setor
/horarios-de-missa         → Ferramenta de busca
/documentos                → Atos do governo / documentos oficiais
  /documentos/[slug]       → Documento individual
/contato                   → Formulário de contato
/lgpd                      → Política de privacidade / LGPD
```

---

## 5. Seções da Página Inicial

A home é composta pelas seguintes seções, nesta ordem:

### 5.1 Topbar
- Fundo: `var(--wine-dark)`
- **Esquerda:** ícone de pin + endereço da Cúria
- **Direita:** links rápidos — Liturgia do dia · PASCOM · Imprensa · Contato
- Fonte: 12px, `letter-spacing: 0.03em`
- **Responsivo:** ocultar em mobile (< 768px)

### 5.2 Navbar (sticky)
- Fundo branco, `border-bottom: 2px solid var(--wine)`
- `position: sticky; top: 0; z-index: 100`
- **Logo:** escudo circular vinho + "Arquidiocese de Botucatu" (Playfair) + "Portal Institucional" (caption)
- **Links:** Início · Sobre · Notícias · Paróquias · Párocos · Agenda · Setores · Documentos
- **Ações:** botão search (ícone) + botão "Horários de missa" (vinho, destaque)
- **Responsivo mobile:**
  - Logo + hamburger menu
  - Menu abre em drawer lateral ou bottom sheet
  - Botão "Horários de missa" fixo no bottom do drawer

### 5.3 Hero (Banner rotativo)
- Layout: **split — imagem esquerda (flex 1.2) + conteúdo direita (flex 1)**
- Área de imagem: gradiente vinho como placeholder, aceita foto real
- Badge dourado no canto inferior esquerdo da imagem: "Destaque" / categoria
- Conteúdo direito (fundo `var(--wine)`):
  - Eyebrow dourado
  - `<h1>` em Playfair 32px, branco
  - Excerpt 15px, branco 75%
  - CTA branco com hover dourado
  - Dots de navegação (3 slides)
- **Responsivo:**
  - Tablet (768–1024px): mantém split mas reduz padding
  - Mobile (< 768px): empilha vertical — imagem topo (250px height), conteúdo abaixo com padding 24px

### 5.4 Acesso Rápido (Quick Links)
- Grid de 5 itens horizontais com `border-right` separando
- Cada item: ícone 44x44 + label curto
- Itens: Horários de missa · Encontrar paróquia · Agenda pastoral · Documentos oficiais · Fale conosco
- Hover: fundo `wine-light`, ícone vira vinho/branco
- **Responsivo:**
  - Tablet: 5 colunas mantidas, padding reduzido
  - Mobile: grid 3 colunas (últimos 2 vão para segunda linha)

### 5.5 Últimas Notícias
- Layout: grid `1.6fr 1fr`
  - **Esquerda (destaque):** card grande com imagem 220px + tag + título Playfair + excerpt + data
  - **Direita (lista):** 3 itens com thumb 64x64 + tag + título + data
- Link "Ver todas as notícias" alinhado à direita do section header
- **Responsivo:**
  - Tablet: grid `1fr 1fr`
  - Mobile: coluna única — destaque primeiro, lista abaixo

### 5.6 Agenda Pastoral + Busca de Missa (side-by-side)
- Grid `1fr 1fr`, gap 28px

**Agenda card (esquerda):**
- Header com eyebrow + título "Próximos eventos"
- Lista de eventos: date-box colorido (dia + mês abreviado em pt-BR) + título + localização
- Footer com link "Ver calendário completo"
- Cada evento pode ter cor diferente no date-box conforme categoria

**Busca de Missa (direita):**
- Card com fundo `var(--wine)`
- 3 selects: Cidade / Paróquia (opcional) / Dia da semana
- Botão "Buscar horários" dourado
- Footer: "50 paróquias · 20 municípios"

- **Responsivo:**
  - Tablet: mantém side-by-side
  - Mobile: empilha — Busca de Missa ACIMA da Agenda (prioridade funcional)

### 5.7 Paróquias em Destaque
- Fundo `var(--gray-light)`
- Grid 3 colunas
- Card: imagem 120px placeholder + nome (Playfair) + cidade com pin
- Link "Ver todas as paróquias"
- **Responsivo:**
  - Tablet: grid 2 colunas
  - Mobile: grid 1 coluna (scroll vertical)

### 5.8 Palavra do Arcebispo
- Fundo `var(--wine)`, full-width
- Layout: foto/placeholder 110x110 + conteúdo
- Eyebrow dourado + citação em Playfair itálico 22px com abertura tipográfica `"` dourada
- Nome do arcebispo + link "Ler mensagem completa"
- **Responsivo:**
  - Mobile: empilha vertical, foto centralizada, texto centralizado

### 5.9 Setores Pastorais
- Grid 4 colunas, 8 cards
- Cada card: ícone 36x36 em wine-light + nome + descrição curta
- Hover: borda vinho + fundo wine-light + ícone branco em fundo vinho
- **Responsivo:**
  - Tablet: grid 2 colunas
  - Mobile: grid 2 colunas (4 linhas)

### 5.10 Atos do Governo — Documentos Recentes
- Fundo `var(--gray-light)`
- Lista de documentos: ícone vinho + tipo (badge) + título + data + seta
- Hover: borda vinho, seta translada 3px
- Link "Ver todos"
- **Responsivo:** cards em coluna única desde tablet

### 5.11 Footer
- Fundo `#1a0a0d`
- Grid: `1.5fr 1fr 1fr 1fr`
  - **Coluna 1 (brand):** logo + descrição + endereço/tel/email + ícones sociais (Instagram, Facebook, YouTube)
  - **Colunas 2-4:** Institucional / Pastoral / Documentos
- Footer bottom: `#120508` — copyright + links LGPD/privacidade/mapa
- **Responsivo:**
  - Tablet: grid `1fr 1fr`
  - Mobile: coluna única empilhada

---

## 6. Páginas Internas

### 6.1 Listagem de Notícias (`/noticias`)

**Layout:**
- Filtro por categoria (horizontal, chips)
- Grid principal: 3 colunas no desktop
- Paginação ou infinite scroll (definir com cliente)
- Sidebar opcional com: categorias, notícias populares, agenda próxima

**Card de notícia:**
- Imagem destaque
- Categoria (badge vinho)
- Título (Playfair)
- Excerpt (2 linhas, clamp)
- Data + tempo de leitura estimado

**Responsivo:**
- Tablet: 2 colunas
- Mobile: 1 coluna

### 6.2 Artigo de Notícia (`/noticias/[slug]`)

- Imagem hero full-width com overlay
- Breadcrumb: Início › Notícias › [Categoria] › Título
- Título em Playfair Display grande
- Metadados: data, autor, categoria
- Corpo do artigo (tipografia legível, ~680px de largura)
- Botões de compartilhamento: WhatsApp, Facebook, copiar link
- Seção "Mais notícias" no rodapé da página

### 6.3 Sobre a Arquidiocese (`/sobre`)

Sub-páginas:
- **Arcebispo:** foto + biografia + mensagem pastoral
- **História:** texto longo com imagens intercaladas, linha do tempo opcional
- **Estrutura administrativa:** organograma ou lista de departamentos com contatos

### 6.4 Paróquias — Listagem (`/paroquias`)

- Filtro por cidade (select ou chips horizontais)
- Busca por nome
- Grid de cards: 3 colunas desktop
- Card: foto + nome + cidade + pároco responsável + link

**Responsivo:**
- Tablet: 2 colunas
- Mobile: 1 coluna

### 6.5 Paróquia Individual (`/paroquias/[slug]`)

Seções da página:
1. Hero com foto da paróquia
2. Informações gerais (nome oficial, cidade, endereço, contato)
3. Nome e foto do pároco responsável
4. Horários de Missa (tabela por dia da semana)
5. Galeria de fotos
6. Descrição / história da paróquia
7. Mapa (Google Maps embed)

### 6.6 Párocos (`/parocos`)

- Grid: 4 colunas desktop, cards com foto circular + nome + paróquia + cidade
- Filtro por cidade
- **Responsivo:**
  - Tablet: 3 colunas
  - Mobile: 2 colunas

### 6.7 Calendário Pastoral (`/agenda`)

- Visão mensal ou lista
- Filtros por categoria (cor codificada)
- Cada evento: data, título, localização, horário, descrição
- Export para .ics (Google Calendar / Apple Calendar)

### 6.8 Setores Pastorais (`/setores`)

- Listagem em grid
- Cada setor com: ícone + nome + missão + contato responsável
- Página individual por setor com mais detalhes

### 6.9 Horários de Missa (`/horarios-de-missa`)

**Funcionalidade de busca:**
- Campo: Cidade (obrigatório)
- Campo: Paróquia (opcional, carrega dinamicamente conforme cidade)
- Campo: Dia da semana
- Campo extra: Horário aproximado (manhã / tarde / noite)

**Resultados:**
- Cards com: nome da paróquia, endereço, horários do dia selecionado
- Link para página da paróquia
- "Nenhum resultado encontrado" com sugestão de outra cidade próxima

### 6.10 Atos do Governo / Documentos (`/documentos`)

- Filtros: Tipo (Decreto / Comunicado / Nomeação / Circular) + Ano
- Lista cronológica reversa
- Item: tipo (badge) + título + data + botão download (PDF) ou link
- Upload via CMS com campo de tipo, título, data e arquivo PDF

---

## 7. CMS — Estrutura de Conteúdo (Payload CMS)

### 7.1 Collections

#### `noticias`
| Campo | Tipo | Notas |
|---|---|---|
| titulo | text | required |
| slug | text | auto-gerado, unique |
| categoria | select | Pastoral / Institucional / Formação / Litúrgico / Social |
| imagem_destaque | upload | ratio 16:9 |
| excerpt | textarea | max 200 chars |
| conteudo | richText | Lexical editor |
| autor | text | |
| publicado_em | date | |
| publicado | boolean | default false |

#### `paroquias`
| Campo | Tipo | Notas |
|---|---|---|
| nome_oficial | text | required |
| slug | text | auto-gerado |
| cidade | relationship → `cidades` | required |
| paroco | relationship → `parocos` | |
| endereco | text | |
| telefone | text | |
| email | email | |
| descricao | richText | |
| fotos | array de uploads | galeria |
| horarios_de_missa | array | dia_semana + horarios[] |

#### `parocos`
| Campo | Tipo | Notas |
|---|---|---|
| nome | text | required |
| foto | upload | |
| paroquia | relationship → `paroquias` | |
| bio | textarea | opcional |

#### `eventos_agenda`
| Campo | Tipo | Notas |
|---|---|---|
| titulo | text | required |
| data_inicio | date | required |
| data_fim | date | opcional |
| horario | text | ex: "10h00" |
| local | text | |
| categoria | select | cores codificadas |
| descricao | richText | |

#### `setores_pastorais`
| Campo | Tipo | Notas |
|---|---|---|
| nome | text | required |
| icone | text | nome do ícone Tabler |
| missao | textarea | |
| descricao | richText | |
| contato_nome | text | |
| contato_email | email | |
| contato_telefone | text | |

#### `documentos_oficiais`
| Campo | Tipo | Notas |
|---|---|---|
| titulo | text | required |
| tipo | select | Decreto / Comunicado / Nomeação / Circular / Outro |
| data | date | required |
| arquivo | upload | PDF only |
| descricao | textarea | opcional |

#### `cidades`
| Campo | Tipo | Notas |
|---|---|---|
| nome | text | required |
| slug | text | auto |

#### `configuracoes_site` (Global)
| Campo | Tipo |
|---|---|
| nome_arcebispo | text |
| foto_arcebispo | upload |
| citacao_arcebispo | textarea |
| mensagem_arcebispo_url | text |
| endereco_curia | text |
| telefone | text |
| email | email |
| instagram_url | text |
| facebook_url | text |
| youtube_url | text |

---

## 8. Responsividade — Especificações Completas

### 8.1 Breakpoints

```
xs: 0–479px       (mobile pequeno)
sm: 480–767px     (mobile grande)
md: 768–1023px    (tablet)
lg: 1024–1279px   (desktop pequeno)
xl: 1280px+       (desktop padrão — layout base do design)
```

### 8.2 Comportamento por componente

| Componente | Desktop (xl) | Tablet (md) | Mobile (sm/xs) |
|---|---|---|---|
| Topbar | Visível | Ocultar | Ocultar |
| Navbar links | Horizontais | Hamburger | Hamburger |
| Navbar "Horários" btn | Visível | Visível (reduzido) | Ícone apenas ou ocultar (drawer) |
| Hero | Split horizontal | Split horizontal | Empilhado vertical |
| Quick Links | 5 colunas | 5 colunas | 3 colunas + 2 na linha abaixo |
| Notícias | 1.6fr + 1fr | 1fr + 1fr | Coluna única |
| Agenda + Missa | 1fr + 1fr | 1fr + 1fr | Coluna única (Missa acima) |
| Paróquias grid | 3 colunas | 2 colunas | 1 coluna |
| Arcebispo | Horizontal | Horizontal | Vertical centralizado |
| Setores | 4 colunas | 2 colunas | 2 colunas |
| Documentos | Lista 1 col | Lista 1 col | Lista 1 col |
| Footer | 4 colunas | 2 colunas | 1 coluna |
| Footer bottom | Flex row | Flex row | Flex col |

### 8.3 Regras gerais de responsividade

- `max-width: 1100px` no container principal, `margin: 0 auto`, `padding: 0 24px`
- Mobile: padding lateral reduz para `0 16px`
- Nunca usar overflow horizontal — todo conteúdo deve caber na viewport
- Imagens: sempre `width: 100%`, `height: auto`, com aspect-ratio preservado via CSS
- Fontes: Playfair Display em mobile reduz ~20% (ex: 32px → 26px, 24px → 20px)
- Botões e links: área mínima de toque 44x44px
- Formulários (busca de missa): campos full-width em mobile, label acima
- Cards com hover: em touch devices, remover hover e manter apenas active state

### 8.4 Navbar mobile

```
[Logo]                    [Hamburger ☰]

Drawer lateral (ou bottom sheet):
  - Links de navegação (verticais, 48px height cada)
  - Botão "Horários de missa" (full-width, vinho)
  - Redes sociais no rodapé do drawer
  - Overlay escuro por trás
```

---

## 9. SEO

### 9.1 Metadados por página

- `<title>`: `[Título da Página] — Arquidiocese de Botucatu`
- `<meta description>`: gerada a partir do excerpt/conteúdo
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
- Twitter Card: `summary_large_image`

### 9.2 Estrutura de URLs

- Slugs em pt-BR, minúsculos, sem acentos: `/paroquias/catedral-nossa-senhora-das-dores`
- Sem `/index.html`, sem parâmetros de query para conteúdo estático

### 9.3 Outros

- `sitemap.xml` gerado automaticamente (incluindo todas as paróquias e notícias)
- `robots.txt` configurado corretamente
- Schema.org: `Organization`, `Church`, `Event`, `NewsArticle`
- Canonical URLs
- Lazy loading de imagens
- `<html lang="pt-BR">`

---

## 10. Conformidade LGPD

- Banner de cookies no primeiro acesso (opt-in para analytics)
- Página `/lgpd` com política de privacidade completa
- Formulário de contato com checkbox de aceite
- Não coletar dados desnecessários
- Opção de exclusão de dados sob demanda (email de contato)

---

## 11. Performance

- Next.js Image component (`next/image`) para todas as imagens
- Lazy loading nativo em todos os recursos não críticos
- Fonts com `font-display: swap`
- CSS crítico inlined, restante deferido
- Target: Lighthouse score ≥ 90 em todas as categorias
- Compressão de imagens no upload (CMS processa automaticamente)

---

## 12. Acessibilidade

- Todos os ícones decorativos com `aria-hidden="true"`
- Todos os `<img>` com `alt` descritivo
- Labels explícitos em todos os campos de formulário
- Navegação por teclado funcional (focus visible)
- Contraste mínimo WCAG AA
- `role` e `aria-label` nos landmarks principais (`<nav>`, `<main>`, `<footer>`, seções)
- Estrutura de headings semântica (`h1` único por página, hierarquia correta)

---

## 13. Estrutura de Pastas do Projeto

```
/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Grupo de rotas públicas
│   │   ├── page.tsx              # Home
│   │   ├── sobre/
│   │   ├── noticias/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── paroquias/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── parocos/
│   │   ├── agenda/
│   │   ├── setores/
│   │   │   └── [slug]/page.tsx
│   │   ├── horarios-de-missa/
│   │   ├── documentos/
│   │   └── contato/
│   ├── (payload)/                # Admin do CMS
│   │   └── admin/[[...segments]]/page.tsx
│   └── api/
│       └── [...slug]/route.ts    # Payload API handler
│
├── components/
│   ├── layout/
│   │   ├── Topbar.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileDrawer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── QuickLinks.tsx
│   │   ├── NewsSection.tsx
│   │   ├── AgendaMissaSection.tsx
│   │   ├── ParoquiasDestaque.tsx
│   │   ├── ArcebispoSection.tsx
│   │   ├── SetoresSection.tsx
│   │   └── DocumentosSection.tsx
│   ├── paroquia/
│   │   ├── ParoquiaCard.tsx
│   │   ├── ParoquiaHero.tsx
│   │   └── HorariosMissa.tsx
│   ├── noticias/
│   │   ├── NoticiaCard.tsx
│   │   └── NoticiaMainCard.tsx
│   ├── agenda/
│   │   └── AgendaItem.tsx
│   └── ui/
│       ├── SectionHeader.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── SearchForm.tsx
│
├── payload.config.ts
├── collections/                  # Payload collections
│   ├── Noticias.ts
│   ├── Paroquias.ts
│   ├── Parocos.ts
│   ├── EventosAgenda.ts
│   ├── SetoresPastorais.ts
│   ├── DocumentosOficiais.ts
│   └── Cidades.ts
│
├── globals/
│   └── ConfiguracoesSite.ts
│
├── lib/
│   ├── payload.ts                # Payload client helper
│   └── utils.ts
│
├── styles/
│   └── globals.css               # Tokens CSS + reset
│
└── public/
    └── fonts/ (se necessário)
```

---

## 14. Fluxo de Gestão de Conteúdo (Pós-entrega)

A PASCOM gerenciará o conteúdo de forma autônoma pelo painel do CMS:

1. **Publicar notícia:** Acessar CMS → Notícias → Nova → preencher campos → Publicar
2. **Adicionar evento:** CMS → Agenda → Novo evento → data, local, categoria → Salvar
3. **Atualizar paróquia:** CMS → Paróquias → Selecionar → editar horários/pároco → Salvar
4. **Publicar documento oficial:** CMS → Documentos → Novo → upload PDF + metadados → Publicar
5. **Atualizar palavra do arcebispo:** CMS → Configurações do site → Citação → Salvar

Perfis de acesso:
- **Admin (PASCOM):** acesso completo
- **Editor (parishes):** criar/editar somente notícias e eventos, sem acesso a documentos oficiais
- **Viewer:** apenas visualização (para auditoria)

---

## 15. Critérios de Aceite

- [ ] Todas as rotas listadas no item 4.1 estão funcionando
- [ ] Home renderiza todas as 11 seções descritas
- [ ] Responsividade testada nos breakpoints xs/sm/md/lg/xl
- [ ] Navbar mobile com drawer funcional
- [ ] Busca de horários de missa retorna resultados corretos
- [ ] CMS acessível em `/admin` com todas as collections configuradas
- [ ] SEO: título, description e OG tags presentes em todas as páginas
- [ ] Lighthouse ≥ 90 em Performance, Acessibilidade e SEO
- [ ] LGPD: banner de cookies + página de política
- [ ] Deploy funcional no Easypanel com SSL
- [ ] Todas as imagens com lazy loading e `alt` preenchido
- [ ] Navegação por teclado funcional em toda a interface

---

## 16. Fora do Escopo (v1.0)

- Sistema de doações online
- Área de membros / login para fiéis
- Transmissão ao vivo integrada
- App mobile nativo
- Integração com sistemas de gestão paroquial externos
- Multi-idioma (versão em inglês ou espanhol)

---

*Documento gerado pela Ghost para uso no Claude Code.*