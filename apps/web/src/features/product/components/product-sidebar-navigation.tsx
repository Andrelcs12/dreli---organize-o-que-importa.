"use client";

import {
  Activity,
  Archive,
  ArchiveX,
  ChartNoAxesCombined,
  ChevronDown,
  CloudSun,
  History,
  Inbox,
  LayoutDashboard,
  Link2,
  Newspaper,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SavedLinkCount } from "@/features/saved-links/components/saved-link-counts";

type Section =
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

type Counts = {
  archived: number;
  favorites: number;
  inbox: number;
  library: number;
};

const linkChildren = [
  {
    count: "inbox",
    href: "/inbox",
    icon: Inbox,
    label: "Inbox",
    section: "inbox",
  },
  {
    count: "library",
    href: "/library",
    icon: Archive,
    label: "Biblioteca",
    section: "library",
  },
  {
    count: "favorites",
    href: "/favorites",
    icon: Star,
    label: "Favoritos",
    section: "favorites",
  },
  {
    count: "archived",
    href: "/archived",
    icon: ArchiveX,
    label: "Arquivados",
    section: "archived",
  },
] as const;

const secondary = [
  { href: "/weather", icon: CloudSun, label: "Clima", section: "weather" },
  { href: "/news", icon: Newspaper, label: "Notícias", section: "news" },
  { href: "/history", icon: History, label: "Histórico", section: "history" },
  {
    href: "/reports",
    icon: ChartNoAxesCombined,
    label: "Relatórios",
    section: "reports",
  },
  {
    href: "/performance",
    icon: Activity,
    label: "Desempenho",
    section: "performance",
  },
] as const;

export function ProductSidebarNavigation({
  counts,
  section,
}: {
  counts: Counts;
  section: Section;
}) {
  const linkIsActive =
    section === "links" ||
    linkChildren.some((item) => item.section === section);
  const [isLinksOpen, setIsLinksOpen] = useState(linkIsActive);

  useEffect(() => {
    const open = () => setIsLinksOpen(true);
    window.addEventListener("dreli:open-links-navigation", open);
    return () =>
      window.removeEventListener("dreli:open-links-navigation", open);
  }, []);

  return (
    <nav aria-label="Áreas do Dreli" className="product-navigation">
      <Link
        aria-current={section === "dashboard" ? "page" : undefined}
        className={
          section === "dashboard"
            ? "product-nav-item is-active"
            : "product-nav-item"
        }
        href="/dashboard"
      >
        <LayoutDashboard aria-hidden="true" />
        <span>Visão geral</span>
      </Link>
      <div
        data-tour="sidebar-links"
        className={
          linkIsActive ? "product-nav-links is-active" : "product-nav-links"
        }
      >
        <div className="product-nav-links-trigger">
          <Link
            aria-current={section === "links" ? "page" : undefined}
            className={
              section === "links"
                ? "product-nav-item is-active"
                : "product-nav-item"
            }
            href="/links"
          >
            <Link2 aria-hidden="true" />
            <span>Links</span>
          </Link>
          <button
            aria-expanded={isLinksOpen}
            aria-label="Alternar subitens de Links"
            onClick={() => setIsLinksOpen((open) => !open)}
            type="button"
          >
            <ChevronDown aria-hidden="true" />
          </button>
        </div>
        {isLinksOpen ? (
          <div className="product-nav-children">
            {linkChildren.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  aria-current={section === item.section ? "page" : undefined}
                  className={
                    section === item.section
                      ? "product-nav-child is-active"
                      : "product-nav-child"
                  }
                  href={item.href}
                  key={item.section}
                >
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                  <SavedLinkCount count={item.count} counts={counts} />
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="product-nav-divider" />
      <div data-tour="sidebar-context">
        {secondary.slice(0, 2).map((item) => {
          const Icon = item.icon;
          return (
            <Link
              aria-current={section === item.section ? "page" : undefined}
              className={
                section === item.section
                  ? "product-nav-item is-active"
                  : "product-nav-item"
              }
              href={item.href}
              key={item.section}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
              {item.section === "performance" ? (
                <TrendingUp aria-hidden="true" className="product-nav-trend" />
              ) : null}
            </Link>
          );
        })}
      </div>
      <div data-tour="sidebar-insights">
        {secondary.slice(2).map((item) => {
          const Icon = item.icon;
          return (
            <Link
              aria-current={section === item.section ? "page" : undefined}
              className={
                section === item.section
                  ? "product-nav-item is-active"
                  : "product-nav-item"
              }
              href={item.href}
              key={item.section}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
              {item.section === "performance" ? (
                <TrendingUp aria-hidden="true" className="product-nav-trend" />
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
