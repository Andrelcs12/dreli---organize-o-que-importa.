import { redirect } from "next/navigation";
import { ProductShell } from "@/features/product/components/product-shell";
import { getProductPageData } from "@/features/product/server/get-product-page-data";
import { LinkHistory } from "@/features/saved-links/components/link-insights-pages";
export default async function HistoryRoute() {
  const data = await getProductPageData("dashboard");
  if (!data) redirect("/login");
  if (data.authenticatedProfile.destination === "/setup") redirect("/setup");
  return (
    <ProductShell
      identity={data.authenticatedProfile.identity}
      linkCounts={data.savedLinks.counts}
      profile={data.authenticatedProfile.profile}
      section="history"
      title="Histórico"
    >
      <LinkHistory savedLinks={data.savedLinks} />
    </ProductShell>
  );
}
