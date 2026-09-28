"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton({
  className,
  destructive = false,
  iconOnly = false,
}: {
  className?: string;
  destructive?: boolean;
  iconOnly?: boolean;
}) {
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    setError(undefined);
    setIsSubmitting(true);
    const supabase = createClient();
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
      setIsSubmitting(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <div>
      <Button
        aria-label={iconOnly ? "Sair da conta" : undefined}
        className={className}
        disabled={isSubmitting}
        onClick={handleSignOut}
        size={iconOnly ? "icon-sm" : "default"}
        variant={destructive || iconOnly ? "destructive" : "ghost"}
      >
        {iconOnly ? <LogOut /> : isSubmitting ? "Saindo..." : "Sair"}
      </Button>
      {error ? (
        <p className="auth-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
