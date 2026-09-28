import { getAuthenticatedProfile } from "@/features/auth/server/authenticated-profile";
import { getSavedLinks } from "@/features/saved-links/server/get-saved-links";

export async function getProductPageData(
  view: "dashboard" | "inbox" | "library" | "favorites",
) {
  const authenticatedProfile = await getAuthenticatedProfile();

  if (!authenticatedProfile) return null;

  const savedLinks = await getSavedLinks(view);
  return { authenticatedProfile, savedLinks };
}
