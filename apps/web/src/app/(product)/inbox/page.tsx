import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductShell } from "@/features/product/components/product-shell";
import { getProductPageData } from "@/features/product/server/get-product-page-data";
import { SavedLinksView } from "@/features/saved-links/components/saved-links-view";

export const metadata: Metadata = {
  title: "Inbox",
  robots: { index: false, follow: false },
};

export default async function InboxPage() {
  const pageData = await getProductPageData("inbox");
  if (!pageData) redirect("/login");
  if (pageData.authenticatedProfile.destination === "/setup")
    redirect("/setup");

  return (
    <ProductShell
      identity={pageData.authenticatedProfile.identity}
      profile={pageData.authenticatedProfile.profile}
      section="inbox"
      title="Inbox"
    >
      <SavedLinksView savedLinks={pageData.savedLinks} view="inbox" />
    </ProductShell>
  );
}
