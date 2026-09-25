import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthenticatedProfile } from "@/features/auth/server/authenticated-profile";
import { OnboardingFlow } from "@/features/onboarding/components/onboarding-flow";

export const metadata: Metadata = {
  title: "Preparar seu espaço",
  description: "Personalize seu espaço no Dreli.",
  alternates: { canonical: "/setup" },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SetupPage() {
  const authenticatedProfile = await getAuthenticatedProfile();

  if (!authenticatedProfile) {
    redirect("/login");
  }

  if (authenticatedProfile.destination === "/app") {
    redirect("/app");
  }

  return <OnboardingFlow />;
}
