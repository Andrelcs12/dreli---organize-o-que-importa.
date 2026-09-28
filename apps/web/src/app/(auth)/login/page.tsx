import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";
import { getAuthenticatedProfile } from "@/features/auth/server/authenticated-profile";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entre no seu espaço pessoal no Dreli.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const authenticatedProfile = await getAuthenticatedProfile();

  if (authenticatedProfile) {
    redirect(authenticatedProfile.destination);
  }

  return (
    <AuthLayout mode="login">
      <LoginForm />
    </AuthLayout>
  );
}
