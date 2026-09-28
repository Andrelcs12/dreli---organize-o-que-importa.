# Dreli — Arquitetura

Para intenção de produto, consulte [PRODUCT.md](./PRODUCT.md). Para estado de entrega, consulte [ROADMAP.md](./ROADMAP.md).

## Monorepo

- `apps/web`: Next.js, UI, rotas, SSR do Supabase e consumo da API;
- `apps/api`: NestJS, validação de JWT, Profile e Prisma;
- `apps/api/prisma`: schema e migrations da aplicação.

O PostgreSQL pertence à API. O browser não recebe `DATABASE_URL`, service role ou outra credencial privada.

## Web

O front usa Next.js App Router, TypeScript, Tailwind, shadcn/ui, Lucide, Framer Motion, next-themes e `@supabase/ssr`.

```text
src/app/
├── (marketing)/page.tsx            → /
├── (marketing)/assistente/page.tsx → /assistente
├── (auth)/login/page.tsx           → /login
├── (auth)/cadastro/page.tsx        → /cadastro
├── (onboarding)/setup/page.tsx     → /setup
├── (product)/dashboard/page.tsx    → /dashboard
├── (product)/links/page.tsx        → /links
├── (product)/archived/page.tsx     → /archived
├── (product)/app/page.tsx          → /app (redirect compatível)
└── auth/callback/route.ts          → /auth/callback
```

Route Groups não alteram URLs. O root layout concentra fontes, tema, metadata e splash; features mantêm a lógica de landing, auth e onboarding.

```text
common/        componentes compartilhados do Dreli
components/ui/ primitives do shadcn/ui
features/      domínio e composição por feature
lib/           clientes e infraestrutura compartilhada
```

## Auth e rotas

Supabase Auth é responsável por credenciais, sessão, OAuth e emissão de token. O front usa clientes SSR/browser do Supabase; o callback PKCE está em `/auth/callback`.

O Nest valida o access token contra o JWKS do projeto Supabase e deriva a identidade de `sub`. Não há `User`, senha, sessão ou JWT paralelo no Prisma.

```text
Browser → Supabase Auth → access token → NestJS → Prisma → PostgreSQL
```

O proxy protege `/setup`, `/dashboard` e o redirect compatível `/app`. Sem sessão, redireciona para `/login?next=<rota>`. Com sessão, `/login` e `/cadastro` redirecionam primeiro para `/setup`.

O callback também redireciona para `/setup` após trocar o código PKCE pela sessão. A decisão final ocorre nas páginas protegidas após buscar o Profile:

```text
onboardingCompletedAt ausente  → /setup
onboardingCompletedAt presente → /dashboard
```

O parâmetro `next` é aceito somente para o destino interno permitido `/dashboard`. O valor legado `/app` é normalizado para `/dashboard`. Login e callback OAuth o preservam, mas ele é aplicado apenas depois do onboarding concluído; nunca pode pular `/setup` ou redirecionar para origem externa.

## API e Profile

Endpoints existentes, ambos protegidos por `SupabaseAuthGuard`:

```http
GET /profiles/me
PATCH /profiles/me/onboarding
```

`GET /profiles/me` cria o Profile quando ainda não existe. `PATCH /profiles/me/onboarding` valida e persiste dados em uma única requisição autenticada.

`Profile.id` é o UUID de `auth.users.id`. Campos atuais:

| Campo                   | Uso atual                                |
| ----------------------- | ---------------------------------------- |
| `name`                  | nome do produto                          |
| `currentFocus`          | foco inicial obrigatório, até 140 caracteres |
| `priorities`            | 1 a 3 valores permitidos                 |
| `homePreference`        | `day`, `inbox`, `projects` ou `progress` |
| `onboardingCompletedAt` | conclusão persistida do setup            |

As migrations versionadas são `20260928133431_setup_auth` e `20260928141340_refine_onboarding_preferences`. A última adiciona `current_focus` e `home_preference`.

## Ambiente

Web:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_API_URL
```

API:

```text
DATABASE_URL
SUPABASE_URL
WEB_ORIGIN
PORT
```

Em desenvolvimento, a API escuta `4000` por padrão. Arquivos `.env` não são versionados; os `.env.example` definem os nomes esperados.

## Limites atuais

- Google OAuth foi testado manualmente; toda nova origem/ambiente ainda precisa da configuração correspondente no Google Cloud e no Supabase.
- O setup possui três etapas e reutiliza `Profile.name` ou metadata do Supabase; nome manual é apenas fallback.
- `/dashboard` é a home protegida, com resumo das coleções, links recentes e ritmo derivado exclusivamente de `SavedLink.createdAt`. A visão `dashboard` de Saved Links inclui também itens arquivados para que a constância represente todos os links salvos; `/links` concentra captura, filtros e a lista completa; `/app` redireciona para `/dashboard`.
