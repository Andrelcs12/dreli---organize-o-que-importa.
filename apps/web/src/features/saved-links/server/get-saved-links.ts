import { getApiUrl } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { SavedLinksResponse } from "../types";

export async function getSavedLinks(
  view: "dashboard" | "links" | "inbox" | "library" | "favorites" | "archived",
) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Sessão autenticada não encontrada.");
  }

  const response = await fetch(`${getApiUrl()}/saved-links?view=${view}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${session.access_token}` },
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar seus links salvos.");
  }

  return (await response.json()) as SavedLinksResponse;
}
