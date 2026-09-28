import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/common/components/brand-logo";
import { AssistantChat } from "@/features/assistant/components/assistant-chat";

export const metadata: Metadata = {
  title: "Assistente",
  description:
    "Converse com o contexto da sua biblioteca e do seu dia no Dreli.",
};

export default function AssistentePage() {
  return (
    <main className="assistant-page">
      <nav className="assistant-nav">
        <BrandLogo />
        <Link href="/" className="back-link">
          ← Voltar para início
        </Link>
      </nav>
      <div className="assistant-layout">
        <aside className="assistant-intro">
          <p className="eyebrow">
            <span /> Assistente Dreli
          </p>
          <h1>Retome o que importa sem procurar em todo lugar.</h1>
          <p>
            O assistente foi pensado para conversar sobre o seu próprio
            contexto: links salvos, prioridades e hábitos. Ele não substitui sua
            biblioteca — ajuda você a voltar até ela.
          </p>
          <div className="assistant-suggestions">
            <span>Experimente perguntar</span>
            <button type="button">O que eu salvei sobre validação?</button>
            <button type="button">Como está meu dia hoje?</button>
            <button type="button">
              Quais hábitos estão mais consistentes?
            </button>
          </div>
        </aside>
        <AssistantChat />
      </div>
    </main>
  );
}
