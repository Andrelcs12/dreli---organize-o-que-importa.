import { getAuthenticatedProfile } from "@/features/auth/server/authenticated-profile";
import { getSavedLinks } from "@/features/saved-links/server/get-saved-links";

export async function getProductPageData(
  view: "dashboard" | "links" | "inbox" | "library" | "favorites" | "archived",
) {
  const authenticatedProfile = await getAuthenticatedProfile();

  if (!authenticatedProfile) return null;

  const savedLinks = await getSavedLinks(view);
  return { authenticatedProfile, savedLinks };
}
