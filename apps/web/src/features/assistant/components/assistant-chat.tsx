"use client";

import { ArrowUp, Sparkles } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = { role: "assistant" | "user"; content: string };

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Olá, André. Posso ajudar você a retomar algo que salvou, organizar suas prioridades ou olhar seu ritmo da semana.",
  },
];

export function AssistantChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMessages((current) => [
      ...current,
      { role: "user", content: question },
      {
        role: "assistant",
        content:
          "O chat ainda está em modo de interface. Quando a biblioteca e o Gemini estiverem conectados, esta resposta será gerada apenas com o seu contexto salvo.",
      },
    ]);
    setInput("");
  }

  return (
    <section
      className="assistant-chat"
      aria-label="Conversa com o Assistente Dreli"
    >
      <div className="chat-context">
        <span>
          <Sparkles />
        </span>
        <p>Respostas baseadas na sua biblioteca e no seu dia.</p>
      </div>
      <div className="chat-messages" aria-live="polite">
        {messages.map((message, index) => (
          <div
            className={`chat-message ${message.role}`}
            key={`${message.role}-${index}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        <label className="sr-only" htmlFor="message">
          Mensagem
        </label>
        <Input
          id="message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Pergunte sobre seu dia ou biblioteca"
        />
        <Button aria-label="Enviar mensagem" size="icon" type="submit">
          <ArrowUp />
        </Button>
      </form>
    </section>
  );
}
