"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { PasswordInput } from "./password-input";

export function LoginForm() {
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    router.replace("/setup");
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setError(undefined);
    setIsSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
    }
  }
  return (
    <div>
      <div className="auth-copy">
        <h1>Bem-vindo de volta.</h1>
        <p>Seu espaço para seguir com clareza, sem recomeçar do zero.</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="email">E-mail</label>
          <Input
            autoComplete="email"
            id="email"
            inputMode="email"
            name="email"
            placeholder="voce@exemplo.com"
            required
            type="email"
          />
        </div>
        <div className="auth-field">
          <div className="auth-label-row">
            <label htmlFor="password">Senha</label>
            <button type="button">Esqueci minha senha</button>
          </div>
          <PasswordInput
            autoComplete="current-password"
            id="password"
            name="password"
          />
        </div>
        {error ? (
          <p className="auth-error" role="alert">
            {error}
          </p>
        ) : null}
        <Button
          className="auth-submit"
          disabled={isSubmitting}
          size="lg"
          type="submit"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
        <div className="auth-divider">
          <span />
          ou
          <span />
        </div>
        <Button
          className="auth-google"
          disabled={isSubmitting}
          onClick={handleGoogleSignIn}
          size="lg"
          type="button"
          variant="outline"
        >
          <GoogleMark />
          Continuar com Google
        </Button>
      </form>
      <p className="auth-switch">
        Ainda não tem seu espaço? <Link href="/cadastro">Criar conta</Link>
      </p>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M21.35 12.23c0-.72-.06-1.23-.2-1.76H12v3.38h5.37c-.11.84-.73 2.1-2.1 2.95l-.02.11 3.05 2.36.21.02c1.93-1.78 2.84-4.4 2.84-7.06Z"
        fill="#4285F4"
      />
      <path
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.07-2.38c-.82.57-1.92.97-3.38.97a5.85 5.85 0 0 1-5.53-4.05l-.1.01-3.17 2.45-.03.1A9.75 9.75 0 0 0 12 21.75Z"
        fill="#34A853"
      />
      <path
        d="M6.47 13.93A5.91 5.91 0 0 1 6.16 12c0-.67.12-1.32.3-1.93l-.01-.13-3.2-2.49-.1.05A9.75 9.75 0 0 0 2.25 12c0 1.62.39 3.15.9 4.5l3.32-2.57Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.02c1.84 0 3.08.79 3.79 1.45l2.77-2.7C16.83 3.15 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.15 7.5l3.3 2.57A5.85 5.85 0 0 1 12 6.02Z"
        fill="#EA4335"
      />
    </svg>
  );
}
