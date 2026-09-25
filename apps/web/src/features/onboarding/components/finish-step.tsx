import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type PriorityId, priorities } from "../priorities";

type FinishStepProps = {
  error?: string;
  isSubmitting: boolean;
  name: string;
  onBack: () => void;
  onSubmit: () => void;
  selectedPriorities: PriorityId[];
};

export function FinishStep({
  error,
  isSubmitting,
  name,
  onBack,
  onSubmit,
  selectedPriorities,
}: FinishStepProps) {
  const selected = priorities.filter((priority) =>
    selectedPriorities.includes(priority.id),
  );

  return (
    <section
      className="setup-form setup-finish-step"
      aria-labelledby="finish-title"
    >
      <div className="setup-finish-mark">
        <Sparkles aria-hidden="true" />
      </div>
      <div className="setup-intro">
        <span>Pronto</span>
        <h2 id="finish-title">Seu espaço está pronto.</h2>
        <p>
          {name}, o Dreli vai começar com o que faz sentido manter por perto.
        </p>
      </div>
      <div className="setup-summary">
        <span>Por enquanto</span>
        <div>
          {selected.map((priority) => (
            <span key={priority.id}>{priority.title}</span>
          ))}
        </div>
      </div>
      <div className="setup-actions">
        <Button
          className="setup-back-action"
          onClick={onBack}
          type="button"
          variant="ghost"
        >
          <ArrowLeft /> Voltar
        </Button>
        <div className="setup-finish-action">
          {error ? (
            <p className="setup-error" role="alert">
              {error}
            </p>
          ) : null}
          <Button
            className="setup-primary-action"
            disabled={isSubmitting}
            onClick={onSubmit}
            type="button"
          >
            {isSubmitting ? "Preparando..." : "Entrar no Dreli"}
          </Button>
          <span>Suas escolhas serão usadas para preparar seu espaço.</span>
        </div>
      </div>
    </section>
  );
}
