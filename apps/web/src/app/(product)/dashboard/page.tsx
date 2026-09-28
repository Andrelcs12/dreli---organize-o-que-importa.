import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductShell } from "@/features/product/components/product-shell";
import { getProductPageData } from "@/features/product/server/get-product-page-data";
import { DashboardOverview } from "@/features/saved-links/components/dashboard-overview";

export const metadata: Metadata = {
  title: "Seu espaço",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const pageData = await getProductPageData("dashboard");

  if (!pageData) {
    redirect("/login");
  }

  const { authenticatedProfile, savedLinks } = pageData;

  if (authenticatedProfile.destination === "/setup") {
    redirect("/setup");
  }

  return (
    <ProductShell
      identity={authenticatedProfile.identity}
      linkCounts={savedLinks.counts}
      profile={authenticatedProfile.profile}
      section="dashboard"
      showSaveLinkShortcut={false}
      subtitle={new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        timeZone: "America/Fortaleza",
        weekday: "long",
      }).format(new Date())}
      title="Visão geral"
    >
      <DashboardOverview savedLinks={savedLinks} />
    </ProductShell>
  );
}
