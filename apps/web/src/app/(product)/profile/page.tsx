import { redirect } from "next/navigation";
import { ProductShell } from "@/features/product/components/product-shell";
import { ProfilePage } from "@/features/product/components/profile-page";
import { getProductPageData } from "@/features/product/server/get-product-page-data";
export default async function ProfileRoute() {
  const data = await getProductPageData("dashboard");
  if (!data) redirect("/login");
  if (data.authenticatedProfile.destination === "/setup") redirect("/setup");
  return (
    <ProductShell
      identity={data.authenticatedProfile.identity}
      linkCounts={data.savedLinks.counts}
      profile={data.authenticatedProfile.profile}
      section="profile"
      title="Perfil"
    >
      <ProfilePage
        avatarUrl={data.authenticatedProfile.identity.avatarUrl}
        email={data.authenticatedProfile.identity.email}
        name={data.authenticatedProfile.profile.name}
      />
    </ProductShell>
  );
}
