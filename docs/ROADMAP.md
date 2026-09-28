# Dreli — Roadmap

Para escopo de produto, consulte [PRODUCT.md](./PRODUCT.md). Para o que o código já contém, consulte [ARCHITECTURE.md](./ARCHITECTURE.md).

## Regra

Fechar fluxos verticais reais antes de abrir outra frente. Código existente não equivale automaticamente a fluxo validado ou feature concluída.

## Estado atual

### Concluído

- landing, identidade, Route Groups e rotas públicas;
- base de dados: Prisma, PostgreSQL Supabase, Profile e migrations;
- proteção de `/setup` e `/dashboard`, callback PKCE e validação de JWT pelo Nest;
- Google OAuth testado manualmente no ambiente atual.

### Preparado / aguardando validação

- email/senha, login, cadastro, logout, refresh e redirects: código existe, mas a validação ponta a ponta deve continuar;
- a migration `20260928141340_refine_onboarding_preferences` existe e foi aplicada no banco de desenvolvimento;
- o endpoint autenticado `PATCH /profiles/me/onboarding` existe, com validações de payload;
- `/dashboard` possui shell protegido usando apenas dados reais do Profile e do Supabase; `/app` permanece como redirect compatível. Ainda não possui vertical de produto.

### Em andamento — Onboarding real

O setup possui três etapas e persiste `name`, `currentFocus`, `priorities` e `homePreference` apenas na conclusão. A implementação atual:

- reutiliza nome de Profile ou metadata do Supabase, com fallback manual;
- usa escolhas para foco, prioridades e primeira visão;
- preserva estado local em caso de erro e permite retry.

Ainda precisa de validação manual ponta a ponta com sessão real antes de ser marcado como concluído.

## NOW — Fechar onboarding

```text
Auth
↓
Profile
↓
/setup
↓
PATCH /profiles/me/onboarding
↓
/dashboard
```

Critério de conclusão:

- novo usuário chega ao setup com o nome reutilizado quando disponível;
- `currentFocus` exige uma escolha inicial;
- `priorities` aceita de 1 a 3 escolhas;
- `homePreference` exige uma escolha;
- sucesso persiste, marca `onboardingCompletedAt` e leva a `/dashboard`;
- erro preserva o estado e permite nova tentativa.

## Preparado — Product shell

O shell de `/dashboard` possui navegação estrutural, header, tema, perfil, logout e empty state; usa nome, foco, prioridades e preferência inicial reais. Não criar dashboard de demonstração, métricas fictícias ou features sem dados.

## NEXT — SavedLink

Primeira vertical slice do produto: salvar uma URL, persistir metadata real e apresentá-la na Inbox.

## Sequência de produto

1. SavedLink;
2. Inbox;
3. Gemini summary;
4. Library;
5. Tasks;
6. Habits;
7. Progress;
8. Weather;
9. Product Tour.

Today deve reunir somente dados reais dessas features, quando existirem.

## Entrada no NOW

Uma feature entra no NOW quando resolve um problema atual, tem dependências prontas, pode ser validada e aproxima uma V1 utilizável. Caso contrário, permanece futura.
