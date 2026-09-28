# Dreli — Instruções para agentes

Leia somente o documento pertinente antes de alterar algo:

- `docs/PRODUCT.md`: produto, escopo e princípios;
- `docs/ARCHITECTURE.md`: estrutura, auth, dados e rotas;
- `docs/DESIGN_SYSTEM.md`: UI, temas e componentes;
- `docs/ROADMAP.md`: estado e prioridade atual.

## Regras operacionais

- Inspecione antes de editar e faça a menor mudança coerente.
- Preserve URLs e comportamento, salvo pedido explícito.
- `app/` compõe rotas; `features/` contém domínio; `common/` contém componentes Dreli; `components/ui/` contém primitives; `lib/` contém infraestrutura.
- Não crie camadas, pastas, dados, APIs ou persistência fictícios.
- Não implemente itens fora do NOW sem solicitação explícita.
- UI criada não significa fluxo validado; informe limites de validação.

## Segurança

- Supabase Auth é a identidade: não criar `User`, senha, sessão ou JWT paralelos.
- A identidade vem do token validado no backend, nunca de `userId` do client.
- `user_metadata` não autoriza ações; service role, `DATABASE_URL` e segredos nunca vão ao browser ou repositório.
- Migrations Prisma versionadas são a referência do schema da aplicação.

## Encerramento

Rode as verificações proporcionais à mudança e reporte o que foi alterado, validado e permaneceu pendente.
