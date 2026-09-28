import { cache } from "react";
import { getApiUrl, isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

type Profile = {
  currentFocus: string | null;
  homePreference: string | null;
  id: string;
  name: string | null;
  onboardingCompletedAt: string | null;
  priorities: string[];
};

export type AuthenticatedProfile = {
  destination: "/dashboard" | "/setup";
  identity: {
    avatarUrl: string | null;
    email: string | null;
  };
  profile: Profile;
  suggestedName: string | null;
};

function getValidName(value: unknown) {
  if (typeof value !== "string") return null;

  const name = value.trim();
  return name && name.length <= 100 ? name : null;
}

function getAvatarUrl(value: unknown) {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return {
      destination: profile.onboardingCompletedAt ? "/dashboard" : "/setup",
      identity: {
        avatarUrl: getAvatarUrl(user?.user_metadata.avatar_url),
        email: user?.email ?? null,
      },
      profile,
      suggestedName:
        getValidName(profile.name) ?? getValidName(user?.user_metadata.name),
    };
  },
);
