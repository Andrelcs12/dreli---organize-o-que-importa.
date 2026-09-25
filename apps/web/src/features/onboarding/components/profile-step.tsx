import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProfileStepProps = {
  error?: string;
  name: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ProfileStep({
  error,
  name,
  onChange,
  onSubmit,
}: ProfileStepProps) {
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
        <h2>Vamos deixar o Dreli com a sua cara.</h2>
        <p>
          São só algumas escolhas iniciais. Você poderá ajustar tudo depois.
        </p>
      </div>
      <div className="setup-field">
        <label htmlFor="setup-name">Como podemos chamar você?</label>
        <Input
          autoComplete="name"
          autoFocus
          id="setup-name"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Seu nome"
          value={name}
          aria-describedby={error ? "setup-name-error" : undefined}
          aria-invalid={Boolean(error)}
        />
        {error ? (
          <p className="setup-error" id="setup-name-error">
            {error}
          </p>
        ) : null}
      </div>
      <Button className="setup-primary-action" type="submit">
        Continuar <ArrowRight />
      </Button>
    </form>
  );
}
