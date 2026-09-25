import { cache } from "react";
import { getApiUrl, isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

type Profile = {
  id: string;
  name: string | null;
  onboardingCompletedAt: string | null;
  priorities: string[];
};

export type AuthenticatedProfile = {
  destination: "/app" | "/setup";
  profile: Profile;
};

export const getAuthenticatedProfile = cache(
  async (): Promise<AuthenticatedProfile | null> => {
    if (!isSupabaseConfigured()) {
      return null;
    }

    const supabase = await createClient();
    const { data: claimsData } = await supabase.auth.getClaims();
    const claims = claimsData?.claims;

    if (!claims?.sub) {
      return null;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      return null;
    }

    const response = await fetch(`${getApiUrl()}/profiles/me`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${session.access_token}` },
    });

    if (!response.ok) {
      throw new Error("Não foi possível carregar o perfil autenticado.");
    }

    const profile = (await response.json()) as Profile;

    return {
      destination: profile.onboardingCompletedAt ? "/app" : "/setup",
      profile,
    };
  },
);
