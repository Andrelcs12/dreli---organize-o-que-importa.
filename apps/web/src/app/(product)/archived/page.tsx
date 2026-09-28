import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductShell } from "@/features/product/components/product-shell";
import { getProductPageData } from "@/features/product/server/get-product-page-data";
import { SavedLinksView } from "@/features/saved-links/components/saved-links-view";

export const metadata: Metadata = {
  title: "Arquivados",
  robots: { index: false, follow: false },
};

export default async function ArchivedPage() {
  const pageData = await getProductPageData("archived");
  if (!pageData) redirect("/login");
  if (pageData.authenticatedProfile.destination === "/setup")
    redirect("/setup");

  return (
    <ProductShell
      identity={pageData.authenticatedProfile.identity}
      linkCounts={pageData.savedLinks.counts}
      profile={pageData.authenticatedProfile.profile}
      section="archived"
      title="Arquivados"
    >
      <SavedLinksView savedLinks={pageData.savedLinks} view="archived" />
    </ProductShell>
  );
}
