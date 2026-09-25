import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { SignupForm } from "@/features/auth/components/signup-form";
import { getAuthenticatedProfile } from "@/features/auth/server/authenticated-profile";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Crie seu espaço pessoal no Dreli.",
  alternates: { canonical: "/cadastro" },
  robots: { index: false, follow: false },
};

export default async function SignupPage() {
  const authenticatedProfile = await getAuthenticatedProfile();

  if (authenticatedProfile) {
    redirect(authenticatedProfile.destination);
  }

  return (
    <AuthLayout mode="signup">
      <SignupForm />
    </AuthLayout>
  );
}
