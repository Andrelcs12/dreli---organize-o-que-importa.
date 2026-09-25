"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { BrandLogo } from "@/common/components/brand-logo";
import { ThemeToggle } from "@/common/components/theme-toggle";

export function AuthLayout({
  children,
  mode,
}: {
  children: ReactNode;
  mode: "login" | "signup";
}) {
  const reduceMotion = useReducedMotion();
  const message =
    mode === "login"
      ? "Volte para o que importa, no seu ritmo."
      : "Um espaço tranquilo para o que você quer guardar.";

  return (
    <main className={`auth-shell auth-shell--${mode}`}>
      <section className="auth-form-column">
        <header className="auth-header">
          <BrandLogo />
          <ThemeToggle />
        </header>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="auth-form-wrap"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </section>
      <aside className="auth-visual" aria-label="Dreli, Own your rhythm">
        <div className="auth-visual-text">
          <span>Own your rhythm.</span>
          <p>{message}</p>
        </div>
        <div className="auth-orbit auth-orbit-one" />
        <div className="auth-orbit auth-orbit-two" />
        <div className="auth-light" />
      </aside>
    </main>
  );
}
