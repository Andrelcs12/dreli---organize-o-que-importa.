"use client";

import { Archive, Inbox, Link2, Search, Star } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import type { SavedLink, SavedLinksResponse } from "../types";
import { LinkCapture } from "./link-capture";
import { SavedLinksList } from "./saved-links-list";

const filters = [
  { id: "all", label: "Todos" },
  { id: "inbox", label: "Inbox" },
  { id: "library", label: "Biblioteca" },
  { id: "favorites", label: "Favoritos" },
] as const;

type Filter = (typeof filters)[number]["id"];

function matchesFilter(link: SavedLink, filter: Filter) {
  if (filter === "inbox") return link.status === "INBOX";
  if (filter === "library") return link.status === "LIBRARY";
  if (filter === "favorites") return link.isFavorite;
  return true;
}

export function DashboardLinks({
  capture,
  compact = false,
  savedLinks,
}: {
  capture: boolean;
  compact?: boolean;
  savedLinks: SavedLinksResponse;
}) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [links, setLinks] = useState(savedLinks.items);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const visibleLinks = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return links
      .filter((link) => matchesFilter(link, activeFilter))
      .filter(
        (link) =>
          !normalized ||
          [link.title, link.domain, link.url].some((value) =>
            value?.toLocaleLowerCase("pt-BR").includes(normalized),
          ),
      )
      .sort(
        (a, b) =>
          (sort === "newest" ? 1 : -1) *
          (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      );
  }, [activeFilter, links, query, sort]);
  const counts = useMemo(
    () => ({
      favorites: links.filter((link) => link.isFavorite).length,
      inbox: links.filter((link) => link.status === "INBOX").length,
      library: links.filter((link) => link.status === "LIBRARY").length,
    }),
    [links],
  );

  const updateLink = useCallback(
    (link: SavedLink | null, deletedId?: string) => {
      setLinks((current) => {
        if (deletedId) return current.filter((item) => item.id !== deletedId);
        if (!link) return current;
        if (link.status === "ARCHIVED") {
          return current.filter((item) => item.id !== link.id);
        }
        return current.some((item) => item.id === link.id)
          ? current.map((item) => (item.id === link.id ? link : item))
          : [link, ...current];
      });
    },
    [],
  );

  useEffect(() => {
    const addSavedLink = (event: Event) => {
      const link = (event as CustomEvent<SavedLink>).detail;
      if (link) updateLink(link);
    };

    window.addEventListener("dreli:saved-link", addSavedLink);
    return () => window.removeEventListener("dreli:saved-link", addSavedLink);
  }, [updateLink]);

  if (compact) {
    return (
      <div className="product-content dashboard-home">
        <section
          className="dashboard-home-main"
          aria-labelledby="recent-links-title"
        >
          <div className="dashboard-home-heading">
            <div>
              <p>Links recentes</p>
              <h2 id="recent-links-title">O que você guardou por último.</h2>
            </div>
            <Link href="/links">Ver todos</Link>
          </div>
          <LinkCapture onSaved={updateLink} />
          {links.length ? (
            <SavedLinksList
              emptyCopy=""
              items={links.slice(0, 5)}
              onChange={updateLink}
            />
          ) : (
            <div className="dashboard-links-empty">
              <Link2 aria-hidden="true" />
              <div>
                <h3>Guarde algo para lembrar depois.</h3>
                <p>Cole uma URL acima e ela ficará disponível aqui.</p>
              </div>
            </div>
          )}
        </section>
        <aside
          className="dashboard-home-collections"
          aria-label="Suas coleções"
        >
          <Link href="/inbox">
            <Inbox aria-hidden="true" />
            <span>
              <b>Inbox</b>
              <small>Aguardando organização</small>
            </span>
            <strong>{counts.inbox}</strong>
          </Link>
          <Link href="/library">
            <Archive aria-hidden="true" />
            <span>
              <b>Biblioteca</b>
              <small>Referências guardadas</small>
            </span>
            <strong>{counts.library}</strong>
          </Link>
          <Link href="/favorites">
            <Star aria-hidden="true" />
            <span>
              <b>Favoritos</b>
              <small>O que manter por perto</small>
            </span>
            <strong>{counts.favorites}</strong>
          </Link>
        </aside>
      </div>
    );
  }

  return (
    <div className="product-content links-workspace">
      {capture ? <LinkCapture onSaved={updateLink} /> : null}
      <section aria-label="Resumo dos seus links" className="links-context">
        <Link
          className="links-context-card links-context-card--inbox"
          href="/inbox"
        >
          <Inbox aria-hidden="true" />
          <span>
            <strong>{counts.inbox}</strong>
            <b>Inbox</b>
            <small>Para olhar depois</small>
          </span>
        </Link>
        <Link
          className="links-context-card links-context-card--library"
          href="/library"
        >
          <Archive aria-hidden="true" />
          <span>
            <strong>{counts.library}</strong>
            <b>Biblioteca</b>
            <small>Links guardados</small>
          </span>
        </Link>
        <Link
          className="links-context-card links-context-card--favorites"
          href="/favorites"
        >
          <Star aria-hidden="true" />
          <span>
            <strong>{counts.favorites}</strong>
            <b>Favoritos</b>
            <small>O que importa</small>
          </span>
        </Link>
      </section>
      <section
        aria-labelledby="links-list-title"
        className="links-list-section"
      >
        <div className="links-list-heading">
          <h2 id="links-list-title">Links</h2>
          <div aria-label="Filtrar links" className="links-tabs" role="tablist">
            {filters.map((filter) => {
              const count = links.filter((link) =>
                matchesFilter(link, filter.id),
              ).length;
              return (
                <button
                  aria-selected={activeFilter === filter.id}
                  className={
                    activeFilter === filter.id ? "is-active" : undefined
                  }
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  role="tab"
                  type="button"
                >
                  {filter.label} <small>{count}</small>
                </button>
              );
            })}
          </div>
        </div>
        <div className="links-toolbar">
          <div className="saved-links-search">
            <Search aria-hidden="true" />
            <span className="sr-only">Buscar links</span>
            <Input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar links..."
              type="search"
              value={query}
            />
          </div>
          <select
            aria-label="Ordenar links"
            onChange={(event) =>
              setSort(event.target.value as "newest" | "oldest")
            }
            value={sort}
          >
            <option value="newest">Mais recentes</option>
            <option value="oldest">Mais antigos</option>
          </select>
        </div>
        {links.length === 0 && capture ? (
          <div className="links-empty-state">
            <span aria-hidden="true">
              <Link2 />
            </span>
            <div>
              <h3>Seu primeiro link começa acima.</h3>
              <p>Cole uma URL para guardar algo que você queira reencontrar.</p>
            </div>
          </div>
        ) : (
          <SavedLinksList
            emptyCopy={
              query ? "Nenhum link encontrado." : "Nenhum link nesta coleção."
            }
            items={visibleLinks}
            onChange={updateLink}
          />
        )}
      </section>
    </div>
  );
}
