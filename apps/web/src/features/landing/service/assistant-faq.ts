export type AssistantFaq = {
  question: string;
  answer: string;
};

export const assistantFaqs: AssistantFaq[] = [
  {
    question: "O Dreli substitui Notion ou Todoist?",
    answer:
      "Não. Ele começa menor: organiza o que importa hoje, o que você salvou e os hábitos que quer acompanhar — sem virar mais um sistema para manter.",
  },
  {
    question: "A IA lê tudo que eu salvo?",
    answer:
      "Ela só entra para resumir e recuperar o seu próprio conteúdo. Salvar, abrir e pesquisar continuam funcionando mesmo quando a IA não estiver disponível.",
  },
  {
    question: "O que entra na primeira versão?",
    answer:
      "Seu dia, tarefas, hábitos, links salvos e resumos curtos. O objetivo é fechar esse fluxo antes de adicionar mais camadas ao produto.",
  },
];
