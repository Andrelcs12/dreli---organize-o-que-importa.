import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductShell } from "@/features/product/components/product-shell";
import { getProductPageData } from "@/features/product/server/get-product-page-data";
import { DashboardLinks } from "@/features/saved-links/components/dashboard-links";

export const metadata: Metadata = {
  title: "Links",
  robots: { index: false, follow: false },
};

export default async function LinksPage() {
  const pageData = await getProductPageData("links");
  if (!pageData) redirect("/login");
  if (pageData.authenticatedProfile.destination === "/setup")
    redirect("/setup");

  return (
    <ProductShell
      identity={pageData.authenticatedProfile.identity}
      linkCounts={pageData.savedLinks.counts}
      profile={pageData.authenticatedProfile.profile}
      section="links"
      title="Links"
    >
      <DashboardLinks capture={false} savedLinks={pageData.savedLinks} />
    </ProductShell>
  );
}
