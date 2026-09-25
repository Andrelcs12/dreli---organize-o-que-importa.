import { getAuthenticatedProfile } from "@/features/auth/server/authenticated-profile";
import { LandingHero } from "@/features/landing/components/landing-hero";
import { LandingSections } from "@/features/landing/components/landing-sections";
import { ProductPreview } from "@/features/landing/components/product-preview";

export default async function Home() {
  const authenticatedProfile = await getAuthenticatedProfile();

  return (
    <main>
      <LandingHero
        authenticatedDestination={authenticatedProfile?.destination}
      />
      <ProductPreview />
      <LandingSections
        authenticatedDestination={authenticatedProfile?.destination}
      />
    </main>
  );
}
