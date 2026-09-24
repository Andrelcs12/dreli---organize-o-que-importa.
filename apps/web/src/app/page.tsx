import { LandingHero } from "@/features/landing/components/landing-hero";
import { LandingSections } from "@/features/landing/components/landing-sections";
import { ProductPreview } from "@/features/landing/components/product-preview";

export default function Home() {
  return (
    <main>
      <LandingHero />
      <ProductPreview />
      <LandingSections />
    </main>
  );
}
