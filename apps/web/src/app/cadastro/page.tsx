import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Crie seu espaço pessoal no Dreli.",
};

export default function SignupPage() {
  return (
    <AuthLayout mode="signup">
      <SignupForm />
    </AuthLayout>
  );
}
