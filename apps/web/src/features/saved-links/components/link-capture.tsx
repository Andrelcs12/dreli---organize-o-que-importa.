"use client";

import { Link2, LoaderCircle, Plus } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSavedLink } from "../service/saved-links-client";
import { dispatchSavedLinkChange } from "../service/saved-links-events";
import type { SavedLink } from "../types";

export function LinkCapture({
  inputId = "saved-link-url",
  onSaved,
}: {
  inputId?: string;
  onSaved?: (link: SavedLink) => void;
}) {
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focus = () => inputRef.current?.focus();
    window.addEventListener("dreli:focus-link-capture", focus);
    return () => window.removeEventListener("dreli:focus-link-capture", focus);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setIsSubmitting(true);

    try {
      const link = await createSavedLink(url);
      setUrl("");
      onSaved?.(link);
      dispatchSavedLinkChange({ current: link, previous: null });
      window.dispatchEvent(
        new CustomEvent("dreli:saved-link", { detail: link }),
      );
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
    <form
      className="link-capture"
      data-tour="link-capture"
      id="salvar-link"
      onSubmit={handleSubmit}
    >
      <div className="link-capture-icon" aria-hidden="true">
        <Link2 />
      </div>
      <div className="link-capture-field">
        <label htmlFor={inputId}>Guarde um link</label>
        <Input
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-invalid={Boolean(error)}
          autoComplete="url"
          id={inputId}
          inputMode="url"
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://algo-que-você-quer-lembrar.com"
          required
          ref={inputRef}
          type="url"
          value={url}
        />
        {error ? (
          <p
            className="link-capture-error"
            id={`${inputId}-error`}
            role="alert"
          >
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
