import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type HomePreference = "day" | "inbox" | "projects" | "progress";

const options: { id: HomePreference; title: string; description: string }[] = [
  {
    id: "day",
    title: "Meu dia",
    description: "O que precisa da sua atenção agora.",
  },
  {
    id: "inbox",
    title: "Inbox",
    description: "O que você salvou recentemente.",
  },
  {
    id: "projects",
    title: "Em andamento",
    description: "Projetos, estudos e coisas em construção.",
  },
  {
    id: "progress",
    title: "Progresso",
    description: "Seu ritmo e o que vem se mantendo.",
  },
];

type HomePreferenceStepProps = {
  error?: string;
  isSubmitting: boolean;
  onBack: () => void;
  onSelect: (value: HomePreference) => void;
  onSubmit: () => void;
  selected?: HomePreference;
};

export function HomePreferenceStep({
  error,
  isSubmitting,
  onBack,
  onSelect,
  onSubmit,
  selected,
}: HomePreferenceStepProps) {
  return (
    <section className="setup-form" aria-labelledby="home-preference-title">
      <div className="setup-intro">
        <span>Primeira visão</span>
        <h2 id="home-preference-title">
          Quando você abrir o Dreli, o que quer enxergar primeiro?
        </h2>
        <p>Você poderá mudar isso depois.</p>
      </div>

      <div className="setup-priority-grid setup-home-preference-grid">
        {options.map((option) => (
          <button
            aria-pressed={selected === option.id}
            className={
              selected === option.id
                ? "setup-priority-option is-selected"
                : "setup-priority-option"
            }
            key={option.id}
            onClick={() => onSelect(option.id)}
            type="button"
          >
            <span className="setup-priority-copy">
              <strong>{option.title}</strong>
              <small>{option.description}</small>
            </span>
          </button>
        ))}
      </div>

      {error ? (
        <p className="setup-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="setup-actions">
        <Button
          className="setup-back-action"
          onClick={onBack}
          type="button"
          variant="ghost"
        >
          <ArrowLeft /> Voltar
        </Button>
        <Button
          className="setup-primary-action"
          disabled={!selected || isSubmitting}
          onClick={onSubmit}
          type="button"
        >
          {isSubmitting ? "Preparando..." : "Entrar no Dreli"} <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
