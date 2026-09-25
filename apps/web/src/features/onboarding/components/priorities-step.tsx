import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type PriorityId, priorities } from "../priorities";

type PrioritiesStepProps = {
  error?: string;
  onBack: () => void;
  onSubmit: () => void;
  onToggle: (priority: PriorityId) => void;
  selectedPriorities: PriorityId[];
};

export function PrioritiesStep({
  error,
  onBack,
  onSubmit,
  onToggle,
  selectedPriorities,
}: PrioritiesStepProps) {
  return (
    <section
      className="setup-form setup-priorities-step"
      aria-labelledby="priorities-title"
    >
      <div className="setup-intro">
        <span>O que importa agora</span>
        <h2 id="priorities-title">O que você quer manter por perto?</h2>
        <p>Escolha até três pontos de partida para o seu espaço.</p>
      </div>
      <fieldset
        aria-describedby={error ? "setup-priorities-error" : undefined}
        className="setup-priority-grid"
      >
        <legend className="sr-only">Prioridades para o seu espaço</legend>
        {priorities.map((priority) => {
          const Icon = priority.icon;
          const selected = selectedPriorities.includes(priority.id);

          return (
            <button
              aria-pressed={selected}
              className={
                selected
                  ? "setup-priority-option is-selected"
                  : "setup-priority-option"
              }
              key={priority.id}
              onClick={() => onToggle(priority.id)}
              type="button"
            >
              <span className="setup-priority-icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="setup-priority-copy">
                <strong>{priority.title}</strong>
                <small>{priority.description}</small>
              </span>
              <span className="setup-priority-state" aria-hidden="true">
                {selected ? <Check /> : null}
              </span>
            </button>
          );
        })}
      </fieldset>
      {error ? (
        <p className="setup-error" id="setup-priorities-error">
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
          onClick={onSubmit}
          type="button"
        >
          Continuar <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
