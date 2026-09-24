import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/common/components/brand-logo";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "./animated-number";
import { LandingAssistant } from "./landing-assistant";
import { MotionReveal } from "./motion-reveal";

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
        <MotionReveal>
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
        </MotionReveal>
        <div className="step-list">
          {steps.map(([number, title, copy], index) => (
            <MotionReveal delay={index * 0.08} key={number}>
              <article>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </section>
      <section id="ritmo" className="rhythm-section">
        <div className="shell rhythm-wrap">
          <MotionReveal>
            <div>
              <p className="eyebrow">
                <span /> Consistência, sem cobrança
              </p>
              <h2>Seu ritmo não cabe em uma sequência perfeita.</h2>
              <p className="rhythm-copy">
                Acompanhe o que faz bem para você, perceba continuidade e siga
                em frente. Um dia fora não apaga o caminho que você já
                percorreu.
              </p>
              <a className="underlined-link" href="#assistente">
                Tire uma dúvida sobre o Dreli <ArrowUpRight />
              </a>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <RhythmCard />
          </MotionReveal>
        </div>
      </section>
      <LandingAssistant />
      <section className="closing">
        <MotionReveal>
          <div className="shell">
            <BrandLogo href="" tone="light" />
            <p>Own your rhythm.</p>
            <h2>Clareza para seguir em frente.</h2>
            <Button asChild className="closing-button" size="lg">
              <a href="#assistente">
                Começar pelo essencial <ArrowUpRight />
              </a>
            </Button>
          </div>
        </MotionReveal>
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
            <AnimatedNumber value={12} /> <small>/ 16 ações</small>
          </strong>
        </div>
        <b>
          <AnimatedNumber suffix="%" value={75} />
        </b>
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
