# Dreli

> **Own your rhythm.**

Dreli é um espaço pessoal para organizar informações, acompanhar o dia e manter clareza sobre aquilo que importa.

A proposta é reunir em um único lugar pequenas informações que normalmente ficam espalhadas entre navegador, bloco de notas, aplicativos de tarefas, previsão do tempo, redes sociais e páginas salvas.

O Dreli não tenta controlar toda a vida do usuário.

Ele deve responder principalmente:

> **O que importa para mim agora, o que eu quero lembrar e como está meu ritmo?**

---

# 1. Problema

Durante o dia, acumulamos informações em lugares diferentes.

Encontramos:

- artigos;
- sites;
- vídeos;
- ferramentas;
- notícias;
- ideias;
- tarefas;
- conteúdos para estudar;
- coisas que queremos consultar novamente.

Normalmente fazemos uma destas coisas:

- deixamos a aba aberta;
- mandamos para nós mesmos;
- salvamos nos favoritos;
- colocamos no Notion;
- tiramos print;
- salvamos no Instagram/TikTok;
- simplesmente esquecemos.

Ao mesmo tempo, quando começamos o dia, precisamos consultar várias fontes diferentes para entender:

- o que precisamos fazer;
- como está o clima;
- quais hábitos queremos cumprir;
- quais informações importantes surgiram;
- como estamos evoluindo nos últimos dias.

O problema central é fragmentação.

---

# 2. Proposta

Dreli centraliza o contexto pessoal do usuário.

O usuário pode:

1. salvar conteúdos;
2. entender rapidamente conteúdos usando IA;
3. recuperar aquilo que salvou;
4. acompanhar tarefas e hábitos;
5. visualizar sua evolução diária;
6. consultar informações úteis para começar o dia.

Tudo dentro de uma interface simples.

---

# 3. Princípio central

Dreli deve aumentar clareza.

Não aumentar gerenciamento.

Se uma funcionalidade exigir mais esforço para organizar do que o valor que devolve, ela não pertence ao produto.

---

# 4. Pilares

## 4.1 Capture

Salvar rapidamente aquilo que chamou atenção.

Exemplo:

```text
https://example.com/article
```

Dreli captura automaticamente:

- URL;
- título;
- descrição;
- imagem;
- domínio;
- data;
- conteúdo da página quando possível.

---

## 4.2 Understand

O conteúdo pode ser processado pelo Gemini.

A IA gera algo realmente útil e curto.

Exemplo:

### Resumo

O artigo explica como pequenas equipes conseguem validar produtos mais rapidamente reduzindo escopo e conversando diretamente com usuários.

### Principais ideias

- validar antes de escalar;
- reduzir funcionalidades iniciais;
- observar comportamento real;
- medir retenção;
- conversar frequentemente com usuários.

### Por que isso importa?

Ajuda a evitar construir meses antes de descobrir se alguém realmente quer o produto.

A IA não deve gerar textos enormes.

O objetivo é compreensão rápida.

---

## 4.3 Remember

Salvar não basta.

Dreli deve permitir encontrar novamente.

O usuário poderá pesquisar por:

- título;
- domínio;
- tag;
- resumo;
- conteúdo;
- data.

Exemplo:

```text
"artigos sobre startups que salvei mês passado"
```

Posteriormente, busca semântica poderá ser adicionada.

---

# 5. Links

Links são um dos principais objetos do Dreli.

## Fluxo

```text
Encontrou algo interessante
        ↓
Copia a URL
        ↓
Adiciona ao Dreli
        ↓
Dreli coleta informações
        ↓
Conteúdo é salvo
        ↓
Gemini gera resumo
        ↓
Usuário encontra novamente depois
```

## Dados iniciais

```text
SavedLink

id
userId

url
title
description
imageUrl
domain

content
summary

status
favorite

createdAt
updatedAt
lastOpenedAt
```

Possíveis status:

```text
INBOX
READING
READ
ARCHIVED
```

---

# 6. Inbox

Todo conteúdo novo começa na Inbox.

A Inbox funciona como uma caixa de entrada pessoal.

Exemplo:

```text
Inbox

○ artigo sobre agentes
○ documentação Supabase
○ vídeo sobre startups
○ ferramenta nova
○ artigo sobre sono
```

Depois o usuário pode:

- abrir;
- favoritar;
- categorizar;
- marcar como lido;
- arquivar.

O objetivo é permitir captura rápida sem obrigar organização imediata.

---

# 7. Tags

Links podem receber tags.

Exemplo:

```text
AI
Startups
Backend
Design
Books
Research
Health
```

As tags podem ser:

- adicionadas manualmente;
- sugeridas pelo Gemini.

A decisão final continua sendo do usuário.

---

# 8. Tarefas diárias

Dreli também funciona como um pequeno painel diário.

Não pretende substituir softwares complexos de gerenciamento de projetos.

O foco é:

> **O que preciso fazer hoje?**

Exemplo:

```text
Hoje

[ ] Finalizar autenticação do Dreli
[ ] Ler 50 páginas
[ ] Treinar
[ ] Revisar inglês
```

Uma tarefa pode conter:

```text
Task

id
userId

title
completed
date

createdAt
completedAt
```

---

# 9. Hábitos

Hábitos representam ações recorrentes simples.

Exemplo:

```text
Hoje

Leitura            ✓
Academia            ✓
Inglês              ○
Código              ✓
Sem redes sociais   ○
```

Cada hábito possui:

```text
Habit

id
userId

name
active
frequency

createdAt
```

E cada conclusão diária:

```text
HabitEntry

id
habitId
userId

date
completed
```

---

# 10. Progressão

Dreli deve fazer o usuário perceber continuidade.

Não apenas mostrar checkboxes.

Exemplo:

```text
Leitura

Seg ✓
Ter ✓
Qua ✓
Qui ✓
Sex ○
Sáb ○
Dom ○

🔥 4 dias
```

Outras informações possíveis:

```text
Esta semana

12 / 16 ações concluídas

75%
```

ou:

```text
Últimos 30 dias

████████████████░░░░

23 dias ativos
```

O objetivo é tornar progresso visível.

---

# 11. Streak

Cada hábito pode possuir uma sequência.

Exemplo:

```text
Leitura

Current streak
8 dias

Best streak
21 dias
```

Porém streak não deve dominar o produto.

O usuário não deveria sentir que perdeu todo o progresso porque falhou um dia.

Dreli deve mostrar também:

- frequência;
- consistência;
- número de dias ativos;
- progresso semanal/mensal.

---

# 12. Daily Rhythm

O Dreli pode consolidar tarefas e hábitos em uma visualização chamada:

# Today

Exemplo:

```text
Bom dia, André.

Quinta-feira
24 de setembro

────────────────────

Tempo

26°C
Parcialmente nublado

Máx. 29°
Mín. 23°

────────────────────

Seu dia

3 / 6 concluídos

✓ Leitura
✓ Academia
○ Inglês
○ Dreli
✓ Universidade
○ Sem Instagram

────────────────────

Tarefas

[ ] Finalizar página Library
[ ] Ler 50 páginas
[ ] Revisar tarefa do Elev

────────────────────

Continue de onde parou

Startup Enxuta
Página 110

────────────────────

Salvos recentemente

Building AI Agents
Supabase Authentication
Startup Distribution
```

Essa deve ser uma das telas mais importantes do produto.

---

# 13. Clima

Dreli consulta uma API meteorológica.

Informações iniciais:

- temperatura atual;
- condição;
- mínima;
- máxima;
- chance de chuva;
- localização configurada pelo usuário.

Exemplo:

```text
Aracaju

26°C
Parcialmente nublado

23° / 29°

Chuva: 20%
```

O clima deve ser informação contextual.

Não queremos construir um aplicativo meteorológico.

---

# 14. Morning Brief

Uma evolução natural do Today é o Morning Brief.

Quando o usuário abrir Dreli pela manhã:

```text
Bom dia.

Aqui está seu dia.
```

Dreli pode apresentar:

### Clima

```text
26°C
Máxima de 29°C
20% de chance de chuva
```

### Agenda

```text
10:00 — Universidade
14:00 — Projeto
18:00 — Academia
```

### Prioridades

```text
1. Finalizar API
2. Ler 50 páginas
3. Revisar Elev
```

### Hábitos

```text
0 / 5 concluídos
```

### Conteúdo

```text
3 itens não processados na Inbox
```

Posteriormente notícias poderão aparecer aqui.

---

# 15. Notícias

O usuário escolhe assuntos que quer acompanhar.

Exemplo:

```text
Artificial Intelligence
Startups
Software Engineering
Cybersecurity
Science
Brazil
```

Dreli coleta notícias de fontes externas.

O Gemini pode:

- eliminar duplicações;
- resumir;
- classificar;
- ordenar por relevância;
- explicar contexto.

Exemplo:

```text
AI

Google anuncia atualização do Gemini

Resumo:
...

Por que importa:
...
```

O objetivo não é criar um feed infinito.

O Dreli deve deliberadamente limitar o volume.

Exemplo:

```text
5 notícias importantes para você hoje.
```

E acabou.

Sem scroll infinito.

---

# 16. Gemini

Gemini será usado como camada de inteligência do Dreli.

Inicialmente:

## Resumo de links

```text
URL
↓
extração do conteúdo
↓
Gemini
↓
resumo estruturado
```

## Classificação

Gemini pode sugerir:

```text
AI
Programming
Startup
Research
```

## Morning Brief

Pode transformar informações estruturadas em uma breve introdução.

## Notícias

Pode gerar:

- resumo;
- principais pontos;
- contexto.

---

# 17. Regra para IA

IA nunca deve ser necessária para acessar conteúdo salvo.

Se o Gemini estiver indisponível:

```text
link continua salvo
tarefas continuam funcionando
hábitos continuam funcionando
clima continua funcionando
```

A IA é uma melhoria.

Não uma dependência estrutural do Dreli.

---

# 18. Home

A Home deve responder rapidamente:

> Como está meu dia?

Estrutura possível:

```text
┌─────────────────────────────────────┐
│ Good morning, André                 │
│ Thursday, September 24              │
├─────────────────────────────────────┤
│                                     │
│ TODAY                               │
│ ███████████░░░  68%                 │
│                                     │
│ 4 tasks remaining                   │
│ 3 habits completed                  │
│                                     │
├─────────────────────────────────────┤
│ WEATHER                             │
│ 26°C · Partly cloudy                │
├─────────────────────────────────────┤
│ TASKS                               │
│ ○ Finish Dreli auth                 │
│ ✓ Gym                               │
│ ○ Read 50 pages                     │
├─────────────────────────────────────┤
│ HABITS                              │
│ Reading      🔥 8                   │
│ English      🔥 3                   │
│ Gym          🔥 4                   │
├─────────────────────────────────────┤
│ RECENT                              │
│ 3 new saved links                   │
└─────────────────────────────────────┘
```

---

# 19. Navegação

V1:

```text
Today
Inbox
Library
Tasks
Settings
```

Possivelmente:

```text
Today
Inbox
Library
Progress
Settings
```

Tasks e habits também podem viver dentro de Today inicialmente.

Não precisamos criar uma tela para tudo.

---

# 20. Library

Library representa tudo que foi salvo.

Exemplo:

```text
Library

Search...

[All] [Unread] [Favorites] [Archived]

────────────────────

Building AI Agents

Anthropic.com

AI · Agents

Saved 2 days ago

────────────────────

How Startups Grow

YCombinator.com

Startup · Growth

Saved Sep 21
```

---

# 21. Search

Busca inicial:

```text
title ILIKE
summary ILIKE
content ILIKE
```

Posteriormente:

```text
Postgres Full Text Search
```

E depois:

```text
Embeddings
pgvector
semantic search
```

Busca semântica não pertence necessariamente à V1.

---

# 22. Autenticação

O Dreli terá conta individual.

Inicialmente:

```text
Google OAuth
```

Possivelmente:

```text
email + password
```

Supabase Auth será responsável pela autenticação.

Cada registro pertence a um usuário.

Toda consulta deve respeitar:

```text
userId
```

---

# 23. Segurança

Dados de usuários não podem ser acessados por outros usuários.

Utilizar:

- Supabase Auth;
- Row Level Security;
- validação no servidor;
- environment variables;
- API keys exclusivamente server-side.

A chave do Gemini nunca deve chegar ao browser.

---

# 24. Stack

## Frontend

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Lucide
```

## Backend

Inicialmente:

```text
Next.js Route Handlers
Server Actions
```

## Database

```text
Supabase
PostgreSQL
```

## Authentication

```text
Supabase Auth
```

## AI

```text
Gemini API
```

## Deployment

```text
Vercel
```

## Quality

```text
Biome
TypeScript
React Compiler
```

---

# 25. Por que não NestJS agora?

Não porque NestJS seria ruim.

Mas porque a primeira missão é:

> terminar Dreli.

Next.js é suficiente para:

- autenticação;
- CRUD;
- API;
- processamento;
- integrações;
- IA;
- banco.

Se Dreli crescer e começar a possuir:

- diversos módulos;
- jobs;
- filas;
- workers;
- webhooks;
- integrações externas;
- aplicativos diferentes consumindo a API;
- processamento pesado;
- domínio complexo;

poderemos extrair:

```text
apps/web → Next.js
apps/api → NestJS
```

Isso deve acontecer por necessidade arquitetural.

Não por antecipação.

---

# 26. Entidades iniciais

Uma primeira hipótese:

```text
User

Profile

SavedLink
Tag
SavedLinkTag

Task

Habit
HabitEntry

UserPreference
```

Não implementar automaticamente essa modelagem.

Ela deve ser revisada antes da implementação.

---

# 27. Possível estrutura

```text
src/

app/
  (auth)/
  (dashboard)/

  api/

components/

features/
  links/
  tasks/
  habits/
  weather/
  ai/

lib/
  supabase/
  gemini/
  weather/

types/
```

Evitar arquitetura excessiva inicialmente.

---

# 28. Escopo da V1

A V1 está pronta quando o usuário conseguir:

### Auth

- entrar;
- sair;
- permanecer autenticado.

### Links

- adicionar URL;
- salvar;
- visualizar;
- excluir;
- arquivar.

### IA

- resumir link usando Gemini;
- salvar resumo permanentemente.

### Library

- visualizar links;
- pesquisar;
- filtrar.

### Tasks

- adicionar tarefa;
- marcar como concluída;
- visualizar tarefas do dia.

### Habits

- criar hábito;
- concluir hábito;
- visualizar streak.

### Today

- visualizar tarefas;
- visualizar hábitos;
- visualizar progresso diário.

### Weather

- visualizar clima atual.

### Production

- banco real;
- auth real;
- API real;
- deploy;
- URL pública;
- funcionando em produção.

---

# 29. O que NÃO entra na V1

Não implementar inicialmente:

- app mobile;
- extensão Chrome;
- integração Redmi Watch;
- gamificação complexa;
- feed social;
- amigos;
- grupos;
- chat;
- marketplace;
- IA conversacional completa;
- calendário próprio;
- sistema avançado de notas;
- editor estilo Notion;
- integração com dezenas de serviços;
- colaboração;
- assinatura;
- pagamentos.

---

# 30. Evolução possível

Depois da V1:

## V1.1

- tags;
- favoritos;
- filtros;
- melhorias na busca;
- dashboard semanal.

## V1.2

- Morning Brief;
- notícias;
- categorias personalizadas;
- resumo diário.

## V1.3

- Calendar;
- Google Calendar;
- lembretes.

## V2

- embeddings;
- busca semântica;
- chat sobre sua própria biblioteca.

Exemplo:

```text
"O que já salvei sobre validação de startups?"
```

Dreli responde usando somente a biblioteca pessoal.

## V2+

Possíveis integrações:

- browser extension;
- compartilhamento mobile;
- smartwatch;
- dados de sono;
- exercícios;
- saúde;
- calendar;
- email.

---

# 31. Redmi Watch

Integração com Redmi Watch é uma hipótese futura.

Poderia permitir:

```text
Sono

7h 42min

Deep sleep
1h 31min

Heart rate
...

Steps
...
```

Isso poderia aparecer no Morning Brief.

Mas não faz parte da V1.

Primeiro precisamos provar que o próprio painel diário é utilizado.

---

# 32. Dreli ≠ Loop

Os produtos possuem intenções diferentes.

## Dreli

```text
organizar
capturar
entender
lembrar
visualizar
acompanhar
```

## Loop

```text
executar
manter consistência
sessões
accountability
progresso compartilhado
```

Dreli pode possuir hábitos e progresso pessoal.

Mas não deve evoluir para:

- grupos de accountability;
- sessões compartilhadas;
- desafios sociais;
- ranking de execução.

Esse território pertence ao Loop.

---

# 33. Métrica principal pessoal

Como Dreli inicialmente será construído para uso próprio, a primeira validação não é receita.

É uso.

Durante 14 dias:

```text
Quantos dias abri o Dreli?

Quantos links salvei?

Quantos links reencontrei?

Quantas tarefas marquei?

Quantos hábitos acompanhei?

Abri o Dreli espontaneamente?

Senti falta dele quando não utilizei?
```

Se Dreli não for útil nem para o próprio criador, adicionar funcionalidades não resolve.

---

# 34. Definição de sucesso da primeira versão

Dreli V1 será considerado concluído quando:

> Eu conseguir acordar, abrir uma URL pública e enxergar meu dia; acompanhar tarefas e hábitos; consultar o clima; salvar algo interessante que encontrei na internet; obter um resumo usando Gemini; fechar o navegador; voltar dias depois e encontrar aquela informação novamente.

Isso já é um produto completo.

---

# 35. Filosofia

Dreli não deve tentar maximizar tempo dentro do aplicativo.

Deve fazer o contrário.

Entrar.

Entender.

Organizar.

Agir.

Sair.

Não existe feed infinito.

Não existe conteúdo desenhado para prender atenção.

Dreli deve ajudar o usuário a recuperar controle sobre aquilo que consome e aquilo que pretende fazer.

---

# 36. Identidade

Nome:

# Dreli

Pronúncia:

```text
DRE-li
```

Tagline:

> **Own your rhythm.**

Descrição:

> Dreli é seu espaço pessoal para organizar informações, acompanhar prioridades e manter clareza sobre o que importa.

Versão curta:

> Organize what matters. Own your rhythm.

---

# 37. Regra de desenvolvimento

Antes de adicionar uma funcionalidade:

1. Qual problema ela resolve?
2. Eu realmente tenho esse problema?
3. Precisa estar na V1?
4. Existe uma solução mais simples?
5. Isso aproxima ou atrasa o lançamento?

Se não houver uma resposta forte:

> não implementar.

---

# 38. Objetivo imediato

A prioridade não é construir todo este documento.

A prioridade é fechar um fluxo vertical completo:

```text
Auth
↓
Dashboard
↓
Adicionar URL
↓
Extrair conteúdo
↓
Salvar no banco
↓
Gemini resumir
↓
Mostrar resumo
↓
Fechar aplicação
↓
Voltar depois
↓
Encontrar novamente
```

Quando isso funcionar em produção, Dreli já começou a existir.
