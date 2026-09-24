import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/common/components/brand-logo";
import { Button } from "@/components/ui/button";

const steps = [
  [
    "01",
    "Guarde sem organizar demais",
    "Salve um link, uma ideia ou uma tarefa no momento em que ela aparece. A Inbox segura o resto para depois.",
  ],
  [
    "02",
    "Entenda em poucos minutos",
    "Resumos curtos, contexto e sugestões de tags ajudam você a decidir se algo merece sua atenção.",
  ],
  [
    "03",
    "Encontre quando precisar",
    "Sua biblioteca não é um arquivo morto. Ela existe para devolver o que foi importante na hora certa.",
  ],
];

export function LandingSections() {
  return (
    <>
      <section id="como-funciona" className="steps shell">
        <p className="eyebrow">
          <span /> Um lugar para voltar
        </p>
        <div className="section-intro">
          <h2>O que cruza seu caminho não precisa se perder nele.</h2>
          <p>
            O Dreli cuida do contexto, para você não precisar lembrar de onde
            guardou cada coisa.
          </p>
        </div>
        <div className="step-list">
          {steps.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="ritmo" className="rhythm-section">
        <div className="shell rhythm-wrap">
          <div>
            <p className="eyebrow">
              <span /> Consistência, sem cobrança
            </p>
            <h2>Seu ritmo não cabe em uma sequência perfeita.</h2>
            <p className="rhythm-copy">
              Acompanhe o que faz bem para você, perceba continuidade e siga em
              frente. Um dia fora não apaga o caminho que você já percorreu.
            </p>
            <a className="underlined-link" href="#como-funciona">
              Por que o Dreli existe <ArrowUpRight />
            </a>
          </div>
          <RhythmCard />
        </div>
      </section>
      <section className="assistant-section shell">
        <div className="assistant-copy">
          <p className="eyebrow">
            <span /> Assistente Dreli
          </p>
          <h2>Uma conversa que conhece o seu contexto.</h2>
          <p>
            Quando precisar retomar uma ideia, decidir o que fazer hoje ou
            reencontrar algo salvo, o assistente estará ali — com base no que é
            seu.
          </p>
          <Button asChild className="hero-primary" size="lg">
            <Link href="/assistente">
              Conhecer o assistente <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <ChatPreview />
      </section>
      <section className="closing">
        <div className="shell">
          <BrandLogo href="" tone="light" />
          <p>Own your rhythm.</p>
          <h2>Clareza para seguir em frente.</h2>
          <Button asChild className="closing-button" size="lg">
            <Link href="/assistente">
              Abrir o Dreli <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
      <footer className="footer shell">
        <BrandLogo />
        <span>Um espaço mais calmo para as coisas que importam.</span>
        <span>© 2026 Dreli</span>
      </footer>
    </>
  );
}

function RhythmCard() {
  return (
    <div className="rhythm-card">
      <div className="rhythm-head">
        <div>
          <span>Esta semana</span>
          <strong>
            12 <small>/ 16 ações</small>
          </strong>
        </div>
        <b>75%</b>
      </div>
      <div className="weekly-bars">
        {["seg", "ter", "qua", "qui", "sex", "sab", "dom"].map((day, index) => (
          <i className={index > 4 ? "empty" : ""} key={day} />
        ))}
      </div>
      <div className="week-labels">
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <p>Você apareceu em 4 dos últimos 5 dias.</p>
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="chat-preview">
      <div className="chat-top">
        <span className="assistant-orb">
          <Sparkles />
        </span>
        <div>
          <strong>Assistente Dreli</strong>
          <small>Seu contexto, em conversa</small>
        </div>
        <span className="chat-options">•••</span>
      </div>
      <div className="bubble user-bubble">
        O que eu salvei sobre validação de produto?
      </div>
      <div className="bubble assistant-bubble">
        Você guardou 4 itens sobre o tema. Os dois mais relevantes falam sobre
        conversar com usuários antes de escalar e reduzir o escopo da primeira
        versão.
        <br />
        <a href="#como-funciona">Ver itens relacionados →</a>
      </div>
      <div className="chat-input">
        Pergunte sobre seu dia ou biblioteca <ArrowUpRight />
      </div>
    </div>
  );
}
