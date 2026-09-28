# Dreli — Design System

Para intenção do produto, consulte [PRODUCT.md](./PRODUCT.md). Este documento registra regras visuais estáveis, não correções pontuais de CSS.

## Direção

Calmo, claro, pessoal e preciso. O Dreli é software com toque editorial controlado — não template SaaS, dashboard corporativo, produto de IA genérico ou revista de luxo.

Prefira espaço negativo intencional, hierarquia nítida e composição variada. Evite glow, blobs, gradientes grandes, glassmorphism, sombras pesadas, cards repetitivos e radius exagerado.

## Cor e temas

Os tokens em `src/app/globals.css` são a fonte de verdade.

| Papel           | Light                      | Dark                               |
| --------------- | -------------------------- | ---------------------------------- |
| Background      | creme/off-white            | azul-petróleo profundo (`#0C222D`) |
| Texto           | azul-petróleo escuro       | off-white                          |
| Surface         | variação sutil do creme    | variação próxima do azul-petróleo  |
| Primary         | azul-petróleo              | off-white/creme                    |
| Accent          | coral queimado (`#C65E50`) | coral queimado (`#C65E50`)         |
| Estado positivo | teal/ciano discreto        | teal/ciano discreto                |

Coral é acento raro; verde não é cor de marca. Light e dark preservam a mesma geometria e hierarquia.

Tokens mínimos: `background`, `foreground`, `card`, `muted`, `muted-foreground`, `primary`, `primary-foreground`, `accent`, `accent-foreground`, `border`, `input`, `ring` e `destructive`.

## Tipografia

- `Manrope`: interface, body, labels, inputs, navegação e botões;
- `Source Serif 4`: display e headings editoriais atuais, carregada somente no peso `400`.

O CSS atual aplica `Source Serif 4` em títulos como hero, auth e onboarding. A serif deve manter peso moderado e não competir com a legibilidade da interface.

## Componentes

`components/ui` é a camada de primitives shadcn. Não duplicar `Button` ou `Input` dentro de features.

- Buttons: tamanho pelo conteúdo; `primary` tem texto contrastante nos dois temas; links navegam, buttons executam ações.
- Inputs: labels reais, autocomplete, focus visível e radius moderado.
- Cards: agrupam informação real; bordas sutis; sem “card dentro de card” por padrão.
- Radius: moderado em cards e inputs; pill apenas quando fizer sentido.
- Ícones: Lucide React para ações; ícone isolado recebe nome acessível.

`BrandLogo` é a única entrada para a marca: seleciona a variante clara ou escura adequada, mantém proporção e evita filtros ou offsets locais.

## Motion

Framer Motion deve usar `opacity`, pequeno `translateY`, stagger curto e hover discreto. Respeitar `prefers-reduced-motion`.

Não usar bounce, escalas dramáticas, pulso contínuo, partículas ou glow forte.

## Padrões de página

- Landing: mensagem + preview integrado; CTAs e anchors reais; coral reservado ao fechamento.
- Auth: formulário claro e painel azul-petróleo; mesmos tokens e componentes da landing; desktop cabe na viewport útil sem esconder conteúdo artificialmente.
- Onboarding: curto, escolhas úteis, indicador discreto e seleção acessível.
- Produto: conteúdo e contexto antes de métricas ou painéis fictícios.

## Responsividade e acessibilidade

Use grid, flex, `max-width`, `gap`, `clamp()` e containers antes de posições rígidas. Não deve haver scroll horizontal, logo cortada, CTA sem texto ou contraste insuficiente.

`focus-visible`, labels, semântica de headings, teclado e alvos de toque fazem parte do padrão visual.
