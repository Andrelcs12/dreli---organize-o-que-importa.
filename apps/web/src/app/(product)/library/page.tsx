import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductShell } from "@/features/product/components/product-shell";
import { getProductPageData } from "@/features/product/server/get-product-page-data";
import { SavedLinksView } from "@/features/saved-links/components/saved-links-view";

export const metadata: Metadata = {
  title: "Biblioteca",
  robots: { index: false, follow: false },
};

export default async function LibraryPage() {
  const pageData = await getProductPageData("library");
  if (!pageData) redirect("/login");
  if (pageData.authenticatedProfile.destination === "/setup")
    redirect("/setup");

  return (
    <ProductShell
      identity={pageData.authenticatedProfile.identity}
      profile={pageData.authenticatedProfile.profile}
      section="library"
      title="Biblioteca"
    >
      <SavedLinksView savedLinks={pageData.savedLinks} view="library" />
    </ProductShell>
  );
}
