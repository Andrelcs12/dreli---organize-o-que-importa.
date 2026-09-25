"use client";

import { BrandLogo } from "@/common/components/brand-logo";
import { ThemeToggle } from "@/common/components/theme-toggle";

const stepDetails = [
  {
    label: "Seu espaço",
    text: "Algumas escolhas simples para o Dreli começar no seu ritmo.",
  },
  {
    label: "Por perto",
    text: "Escolha o que faz sentido acompanhar agora.",
  },
  {
    label: "Pronto",
    text: "Seu ponto de partida está tomando forma.",
  },
];

type OnboardingLayoutProps = {
  children: React.ReactNode;
  step: number;
};

export function OnboardingLayout({ children, step }: OnboardingLayoutProps) {
  const detail = stepDetails[step];

  return (
    <main className="setup-shell">
      <aside className="setup-aside">
        <header className="setup-header">
          <BrandLogo tone="light" />
          <ThemeToggle />
        </header>
        <div className="setup-aside-copy">
          <span className="setup-step-count">0{step + 1} / 03</span>
          <div className="setup-step-lines">
            {stepDetails.map((item, index) => (
              <i
                className={index <= step ? "is-active" : undefined}
                key={item.label}
              />
            ))}
          </div>
          <h1>{detail.label}</h1>
          <p>{detail.text}</p>
        </div>
        <span className="setup-aside-signature">Own your rhythm.</span>
      </aside>
      <section className="setup-content">{children}</section>
    </main>
  );
}
