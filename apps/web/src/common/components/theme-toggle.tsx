"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return <span className="theme-toggle-placeholder" aria-hidden="true" />;

  const isDark = resolvedTheme === "dark";
  return (
    <Button
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size="icon"
      variant="ghost"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
