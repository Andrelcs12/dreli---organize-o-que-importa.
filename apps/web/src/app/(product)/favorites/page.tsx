import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductShell } from "@/features/product/components/product-shell";
import { getProductPageData } from "@/features/product/server/get-product-page-data";
import { SavedLinksView } from "@/features/saved-links/components/saved-links-view";

export const metadata: Metadata = {
  title: "Favoritos",
  robots: { index: false, follow: false },
};

export default async function FavoritesPage() {
  const pageData = await getProductPageData("favorites");
  if (!pageData) redirect("/login");
  if (pageData.authenticatedProfile.destination === "/setup")
    redirect("/setup");

  return (
    <ProductShell
      identity={pageData.authenticatedProfile.identity}
      linkCounts={pageData.savedLinks.counts}
      profile={pageData.authenticatedProfile.profile}
      section="favorites"
      title="Favoritos"
    >
      <SavedLinksView savedLinks={pageData.savedLinks} view="favorites" />
    </ProductShell>
  );
}
