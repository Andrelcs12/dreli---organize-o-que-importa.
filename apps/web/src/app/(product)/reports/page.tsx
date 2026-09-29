import { redirect } from "next/navigation";
import { ProductShell } from "@/features/product/components/product-shell";
import { getProductPageData } from "@/features/product/server/get-product-page-data";
import { LinkReports } from "@/features/saved-links/components/link-insights-pages";
export default async function ReportsRoute() {
  const data = await getProductPageData("dashboard");
  if (!data) redirect("/login");
  if (data.authenticatedProfile.destination === "/setup") redirect("/setup");
  return (
    <ProductShell
      identity={data.authenticatedProfile.identity}
      linkCounts={data.savedLinks.counts}
      profile={data.authenticatedProfile.profile}
      section="reports"
      title="Relatórios"
    >
      <LinkReports savedLinks={data.savedLinks} />
    </ProductShell>
  );
}
