"use client";

import { Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function RestartTourButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        sessionStorage.setItem("dreli:restart-tour", "true");
        router.push("/dashboard");
      }}
      size="sm"
      type="button"
      variant="outline"
    >
      <Compass />
      Ver tutorial novamente
    </Button>
  );
}
