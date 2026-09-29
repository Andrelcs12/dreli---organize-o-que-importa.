"use client";

import { ChevronUp, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

export function ProductAccountMenu({
  avatarUrl,
  email,
  initials,
  name,
}: {
  avatarUrl: string | null;
  email: string | null;
  initials: string;
  name: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  return (
    <div className="product-account" data-tour="account" ref={ref}>
      {isOpen ? (
        <div className="product-account-menu" role="menu">
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            role="menuitem"
          >
            <User aria-hidden="true" />
            Perfil
          </Link>
          <span />
          <SignOutButton destructive />
        </div>
      ) : null}
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="product-account-identity"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className="product-avatar" aria-hidden="true">
          {avatarUrl ? (
            // biome-ignore lint/performance/noImgElement: avatar pode vir de host externo do Supabase/OAuth.
            <img alt="" src={avatarUrl} />
          ) : (
            initials.toUpperCase()
          )}
        </span>
        <span className="product-account-copy">
          <strong>{name ?? "Seu espaço"}</strong>
          <small>{email ?? "Conta Dreli"}</small>
        </span>
        <ChevronUp
          aria-hidden="true"
          className={isOpen ? "is-open" : undefined}
        />
      </button>
    </div>
  );
}
