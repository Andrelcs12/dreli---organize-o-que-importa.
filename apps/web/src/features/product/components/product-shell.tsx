import type { ReactNode } from "react";
import {
  Archive,
  Inbox,
  LayoutDashboard,
  Link2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/common/components/brand-logo";
import { ThemeToggle } from "@/common/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

type ProductProfile = {
  name: string | null;
};

type ProductIdentity = {
  avatarUrl: string | null;
  email: string | null;
};

type ProductSection = "dashboard" | "inbox" | "library" | "favorites";

const navigation: {
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
  section: ProductSection;
}[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Visão geral",
    section: "dashboard",
  },
  { href: "/inbox", icon: Inbox, label: "Inbox", section: "inbox" },
  { href: "/library", icon: Archive, label: "Biblioteca", section: "library" },
  { href: "/favorites", icon: Star, label: "Favoritos", section: "favorites" },
];

function getInitials(name: string | null, email: string | null) {
  const source = name?.trim() || email?.split("@")[0] || "D";
  const parts = source.split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] ?? "D") + (parts[1]?.[0] ?? "");
}

export function ProductShell({
  children,
  identity,
  profile,
  section,
  title,
}: {
  children: ReactNode;
  identity: ProductIdentity;
  profile: ProductProfile;
  section: ProductSection;
  title: string;
}) {
  const firstName = profile.name?.trim().split(/\s+/)[0] ?? "você";
  const initials = getInitials(profile.name, identity.email);

  return (
    <main className="product-shell">
      <aside className="product-sidebar" aria-label="Navegação do produto">
        <div className="product-sidebar-top">
          <BrandLogo href="/dashboard" />
          <Button asChild className="product-save-link" size="sm">
            <Link href="/dashboard#salvar-link">
              <Link2 aria-hidden="true" /> Salvar link
            </Link>
          </Button>
          <nav aria-label="Áreas do Dreli">
            <p className="product-nav-label">Seu espaço</p>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.section === section;

              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive ? "product-nav-item is-active" : "product-nav-item"
                  }
                  href={item.href}
                  key={item.section}
                >
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                  {isActive ? (
                    <i aria-hidden="true" className="product-nav-active-dot" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="product-sidebar-account">
          <div className="product-account-identity">
            <span className="product-avatar" aria-hidden="true">
              {identity.avatarUrl ? (
                // biome-ignore lint/performance/noImgElement: avatar_url vem de hosts externos do Supabase/Google e não há host fixo para next/image.
                <img alt="" src={identity.avatarUrl} />
              ) : (
                initials.toUpperCase()
              )}
            </span>
            <span className="product-account-copy">
              <strong>{profile.name ?? "Seu espaço"}</strong>
              <small>{identity.email ?? "Conta Dreli"}</small>
            </span>
          </div>
          <SignOutButton className="product-account-signout" iconOnly />
        </div>
      </aside>

      <section className="product-main">
        <header className="product-header">
          <div>
            <p>Seu espaço</p>
            <h1>{title === "Visão geral" ? `Olá, ${firstName}.` : title}</h1>
          </div>
          <ThemeToggle />
        </header>
        {children}
      </section>
    </main>
  );
}
