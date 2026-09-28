"use client";

import { createClient } from "@/lib/supabase/client";
import { getApiUrl } from "@/lib/supabase/env";
import type { SavedLink, SavedLinkStatus } from "../types";

async function request<T>(path: string, init: RequestInit) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Sua sessão expirou. Entre novamente para continuar.");
  }

  const response = await fetch(`${getApiUrl()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      message?: string | string[];
    } | null;
    const message = Array.isArray(body?.message)
      ? body.message[0]
      : body?.message;
    throw new Error(message ?? "Não foi possível atualizar este link.");
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export function createSavedLink(url: string) {
  return request<SavedLink>("/saved-links", {
    body: JSON.stringify({ url }),
    method: "POST",
  });
}

export function updateSavedLink(
  id: string,
  input: { isFavorite?: boolean; status?: SavedLinkStatus },
) {
  return request<SavedLink>(`/saved-links/${id}`, {
    body: JSON.stringify(input),
    method: "PATCH",
  });
}

export function deleteSavedLink(id: string) {
  return request<{ id: string }>(`/saved-links/${id}`, { method: "DELETE" });
}
