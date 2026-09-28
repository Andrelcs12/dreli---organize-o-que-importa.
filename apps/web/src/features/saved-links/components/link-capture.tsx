"use client";

import { Link2, LoaderCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSavedLink } from "../service/saved-links-client";

export function LinkCapture() {
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [url, setUrl] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setIsSubmitting(true);

    try {
      await createSavedLink(url);
      setUrl("");
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Não foi possível salvar este link.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="link-capture" id="salvar-link" onSubmit={handleSubmit}>
      <div className="link-capture-icon" aria-hidden="true">
        <Link2 />
      </div>
      <div className="link-capture-field">
        <label htmlFor="saved-link-url">Guarde um link</label>
        <Input
          aria-describedby={error ? "saved-link-error" : undefined}
          aria-invalid={Boolean(error)}
          autoComplete="url"
          id="saved-link-url"
          inputMode="url"
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://algo-que-você-quer-lembrar.com"
          required
          type="url"
          value={url}
        />
        {error ? (
          <p className="link-capture-error" id="saved-link-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? <LoaderCircle className="animate-spin" /> : <Plus />}
        {isSubmitting ? "Salvando" : "Salvar"}
      </Button>
    </form>
  );
}
