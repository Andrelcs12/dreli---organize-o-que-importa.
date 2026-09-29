import type { ReactNode } from "react";
import { BrandLogo } from "@/common/components/brand-logo";
import { ThemeToggle } from "@/common/components/theme-toggle";
import { DreliTour } from "@/features/onboarding/components/dreli-tour";
import { ProductAccountMenu } from "@/features/product/components/product-account-menu";
import { ProductSidebarNavigation } from "@/features/product/components/product-sidebar-navigation";
import { QuickMenu } from "@/features/product/components/quick-menu";
import { SaveLinkShortcut } from "@/features/saved-links/components/save-link-shortcut";

type ProductProfile = {
  id: string;
  name: string | null;
};

type ProductIdentity = {
  avatarUrl: string | null;
  email: string | null;
};

type ProductSection =
  | "dashboard"
  | "links"
  | "inbox"
  | "library"
  | "favorites"
  | "archived"
  | "weather"
  | "news"
  | "history"
  | "reports"
  | "performance"
  | "profile";
type LinkCounts = {
  archived: number;
  favorites: number;
  inbox: number;
  library: number;
};

function getInitials(name: string | null, email: string | null) {
  const source = name?.trim() || email?.split("@")[0] || "D";
  const parts = source.split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] ?? "D") + (parts[1]?.[0] ?? "");
}

export function ProductShell({
  children,
  identity,
  linkCounts,
  profile,
  section,
  showSaveLinkShortcut = true,
  subtitle,
  title,
}: {
  children: ReactNode;
  identity: ProductIdentity;
  linkCounts: LinkCounts;
  profile: ProductProfile;
  section: ProductSection;
  showSaveLinkShortcut?: boolean;
  subtitle?: string;
  title: string;
}) {
  const firstName = profile.name?.trim().split(/\s+/)[0] ?? "você";
  const initials = getInitials(profile.name, identity.email);

  return (
    <main className="product-shell">
      <DreliTour profileId={profile.id} />
      <aside className="product-sidebar" aria-label="Navegação do produto">
        <div className="product-sidebar-top">
          <BrandLogo href="/dashboard" />
          <ProductSidebarNavigation counts={linkCounts} section={section} />
        </div>

        <ProductAccountMenu
          avatarUrl={identity.avatarUrl}
          email={identity.email}
          initials={initials}
          name={profile.name}
        />
      </aside>

      <section className="product-main">
        <header
          className={
            section === "dashboard"
              ? "product-header product-header--dashboard"
              : "product-header"
          }
        >
          <div>
            <h1>{title === "Visão geral" ? `Olá, ${firstName}.` : title}</h1>
            {subtitle ? (
              <p className="product-header-subtitle">{subtitle}</p>
            ) : null}
          </div>
          <div className="product-header-actions">
            <QuickMenu />
            <ThemeToggle />
            {showSaveLinkShortcut ? <SaveLinkShortcut /> : null}
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}
