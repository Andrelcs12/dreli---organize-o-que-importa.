import { redirect } from "next/navigation";
import { NewsPage } from "@/features/news/components/news-page";
import { ProductShell } from "@/features/product/components/product-shell";
import { getProductPageData } from "@/features/product/server/get-product-page-data";
export default async function NewsRoute() {
  const data = await getProductPageData("dashboard");
  if (!data) redirect("/login");
  if (data.authenticatedProfile.destination === "/setup") redirect("/setup");
  return (
    <ProductShell
      identity={data.authenticatedProfile.identity}
      linkCounts={data.savedLinks.counts}
      profile={data.authenticatedProfile.profile}
      section="news"
      title="Notícias"
    >
      <NewsPage />
    </ProductShell>
  );
}
