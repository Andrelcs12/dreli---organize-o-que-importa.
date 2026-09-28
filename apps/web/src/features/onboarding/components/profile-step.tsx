import {
  BookOpenText,
  Compass,
  FolderKanban,
  Lightbulb,
  ListRestart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const focusOptions = [
  {
    id: "organizar minha rotina",
    label: "Organizar minha rotina",
    icon: Compass,
  },
  {
    id: "avançar em um projeto",
    label: "Avançar em um projeto",
    icon: FolderKanban,
  },
  {
    id: "estudar com mais clareza",
    label: "Estudar com mais clareza",
    icon: BookOpenText,
  },
  {
    id: "guardar referências e ideias",
    label: "Guardar referências e ideias",
    icon: Lightbulb,
  },
  {
    id: "colocar as coisas em ordem",
    label: "Colocar as coisas em ordem",
    icon: ListRestart,
  },
] as const;

type ProfileStepProps = {
  currentFocus: string;
  error?: string;
  knownName?: string | null;
  name: string;
  onChange: (value: string) => void;
  onCurrentFocusChange: (value: string) => void;
  onSubmit: () => void;
};

export function ProfileStep({
  currentFocus,
  error,
  knownName,
  name,
  onChange,
  onCurrentFocusChange,
  onSubmit,
}: ProfileStepProps) {
  const firstName = knownName?.trim().split(/\s+/)[0];

  return (
    <form
      className="setup-form setup-profile-step"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="setup-intro">
        <span>Seu espaço</span>
        <h2>
          {firstName
            ? `Olá, ${firstName}.`
            : "Vamos deixar o Dreli com a sua cara."}
        </h2>
        <p>Vamos preparar seu espaço para o que importa agora.</p>
      </div>

      {!knownName ? (
        <div className="setup-field">
          <label htmlFor="setup-name">Como podemos chamar você?</label>
          <Input
            aria-describedby={error ? "setup-name-error" : undefined}
            aria-invalid={Boolean(error)}
            autoComplete="name"
            autoFocus
            id="setup-name"
            onChange={(event) => onChange(event.target.value)}
            placeholder="Seu nome"
            value={name}
          />
          {error ? (
            <p className="setup-error" id="setup-name-error">
              {error}
            </p>
          ) : null}
        </div>
      ) : null}

      <fieldset
        aria-describedby={
          error && name.trim() ? "setup-focus-error" : undefined
        }
        aria-invalid={Boolean(error && name.trim())}
        className="setup-focus-options"
      >
        <legend>O que está ocupando sua atenção agora?</legend>
        <div>
          {focusOptions.map((option) => {
            const Icon = option.icon;
            const selected = currentFocus === option.id;

            return (
              <button
                aria-pressed={selected}
                className={
                  selected
                    ? "setup-focus-option is-selected"
                    : "setup-focus-option"
                }
                key={option.id}
                onClick={() => onCurrentFocusChange(option.id)}
                type="button"
              >
                <Icon aria-hidden="true" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
        {error && name.trim() ? (
          <p className="setup-error" id="setup-focus-error" role="alert">
            {error}
          </p>
        ) : null}
      </fieldset>

      <Button className="setup-primary-action" type="submit">
        Continuar
      </Button>
    </form>
  );
}
