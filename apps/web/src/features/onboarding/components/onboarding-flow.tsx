"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSafePostAuthDestination } from "@/features/auth/post-auth-destination";
import { createClient } from "@/lib/supabase/client";
import { getApiUrl } from "@/lib/supabase/env";
import type { PriorityId } from "../priorities";
import {
  type HomePreference,
  HomePreferenceStep,
} from "./home-preference-step";
import { OnboardingLayout } from "./onboarding-layout";
import { PrioritiesStep } from "./priorities-step";
import { ProfileStep } from "./profile-step";

export function OnboardingFlow({
  initialName,
}: {
  initialName?: string | null;
}) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(initialName ?? "");
  const [priorities, setPriorities] = useState<PriorityId[]>([]);
  const [currentFocus, setCurrentFocus] = useState("");
  const [homePreference, setHomePreference] = useState<HomePreference>();
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  const nextProfileStep = () => {
    if (!name.trim()) {
      setError("Conte para o Dreli como podemos chamar você.");
      return;
    }

    if (!currentFocus) {
      setError("Escolha o que está ocupando sua atenção agora.");
      return;
    }

    setError(undefined);
    setStep(1);
  };

  const togglePriority = (priority: PriorityId) => {
    if (priorities.includes(priority)) {
      setError(undefined);
      setPriorities((current) => current.filter((item) => item !== priority));
      return;
    }

    if (priorities.length === 3) {
      setError("Escolha até três pontos de partida.");
      return;
    }

    setError(undefined);
    setPriorities((current) => [...current, priority]);
  };

  const nextPrioritiesStep = () => {
    if (priorities.length === 0) {
      setError("Escolha pelo menos um ponto de partida.");
      return;
    }

    setError(undefined);
    setStep(2);
  };

  const back = () => {
    setError(undefined);
    setStep((current) => current - 1);
  };

  const completeSetup = async () => {
    setError(undefined);
    setIsSubmitting(true);

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      setError("Sua sessão expirou. Entre novamente para continuar.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${getApiUrl()}/profiles/me/onboarding`, {
        body: JSON.stringify({
          name: name.trim(),
          currentFocus: currentFocus.trim(),
          priorities,
          homePreference,
        }),
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          message?: string | string[];
        } | null;
        const message = Array.isArray(body?.message)
          ? body.message[0]
          : body?.message;
        throw new Error(message ?? "Não foi possível salvar seu espaço.");
      }

      const next = getSafePostAuthDestination(
        new URLSearchParams(window.location.search).get("next"),
      );
      router.replace(next ?? "/dashboard");
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Não foi possível salvar seu espaço.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingLayout step={step}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="setup-step"
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          key={step}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 ? (
            <ProfileStep
              error={error}
              name={name}
              knownName={initialName}
              currentFocus={currentFocus}
              onCurrentFocusChange={(value) => {
                setCurrentFocus(value);
                setError(undefined);
              }}
              onChange={(value) => {
                setName(value);
                setError(undefined);
              }}
              onSubmit={nextProfileStep}
            />
          ) : null}
          {step === 1 ? (
            <PrioritiesStep
              error={error}
              onBack={back}
              onSubmit={nextPrioritiesStep}
              onToggle={togglePriority}
              selectedPriorities={priorities}
            />
          ) : null}
          {step === 2 ? (
            <HomePreferenceStep
              error={error}
              isSubmitting={isSubmitting}
              onBack={back}
              onSelect={setHomePreference}
              onSubmit={completeSetup}
              selected={homePreference}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </OnboardingLayout>
  );
}
