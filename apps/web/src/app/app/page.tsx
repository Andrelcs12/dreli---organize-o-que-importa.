import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { getAuthenticatedProfile } from "@/features/auth/server/authenticated-profile";

export const metadata: Metadata = {
  title: "Seu espaço",
  robots: { index: false, follow: false },
};

export default async function AppPage() {
  const authenticatedProfile = await getAuthenticatedProfile();

  if (!authenticatedProfile) {
    redirect("/login");
  }

  if (authenticatedProfile.destination === "/setup") {
    redirect("/setup");
  }

  return (
    <main className="app-placeholder">
      <p>Seu espaço está pronto.</p>
      <h1>O Dreli continua daqui.</h1>
      <span>A área principal será construída na próxima etapa.</span>
      <SignOutButton />
    </main>
  );
}
