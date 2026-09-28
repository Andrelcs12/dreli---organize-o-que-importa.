"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import type { SavedLinkChange } from "../service/saved-links-events";
import type { SavedLink, SavedLinksResponse } from "../types";
import { SavedLinksList } from "./saved-links-list";

const content = {
  archived: {
    empty: "Nada arquivado. Links arquivados aparecem aqui.",
    eyebrow: "Arquivo",
    search: "Buscar nos arquivados...",
    subtitle: "Links removidos das suas áreas principais.",
    title: "Arquivados",
  },
  favorites: {
    empty:
      "Nenhum favorito ainda. Marque links importantes com a estrela para encontrá-los rapidamente aqui.",
    eyebrow: "Acesso rápido",
    search: "Buscar favoritos...",
    subtitle: "Links que você quer manter por perto.",
    title: "Favoritos",
  },
  inbox: {
    empty:
      "Inbox limpa. Os links que você salvar para organizar depois aparecem aqui.",
    eyebrow: "Para decidir",
    search: "Buscar na Inbox...",
    subtitle: "Organize o que você salvou recentemente.",
    title: "Inbox",
  },
  library: {
    empty:
      "Você ainda não guardou nada na Biblioteca. Envie links da Inbox para manter suas referências organizadas.",
    eyebrow: "Referências",
    search: "Buscar na biblioteca...",
    subtitle: "Referências que você decidiu guardar.",
    title: "Biblioteca",
  },
} as const;

type View = keyof typeof content;

function belongsToView(link: SavedLink, view: View) {
  if (view === "inbox") return link.status === "INBOX";
  if (view === "library") return link.status === "LIBRARY";
  if (view === "favorites")
    return link.isFavorite && link.status !== "ARCHIVED";
  return link.status === "ARCHIVED";
}

export function SavedLinksView({
  savedLinks,
  view,
}: {
  savedLinks: SavedLinksResponse;
  view: View;
}) {
  const copy = content[view];
  const [links, setLinks] = useState(savedLinks.items);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  useEffect(() => setLinks(savedLinks.items), [savedLinks.items]);

  useEffect(() => {
    const update = (event: Event) => {
      const { current } = (event as CustomEvent<SavedLinkChange>).detail;
      setLinks((items) => {
        const withoutCurrent = items.filter((item) => item.id !== current?.id);
        return current && belongsToView(current, view)
          ? [current, ...withoutCurrent]
          : withoutCurrent;
      });
    };
    window.addEventListener("dreli:saved-link-change", update);
    return () => window.removeEventListener("dreli:saved-link-change", update);
  }, [view]);

  const visibleLinks = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return [...links]
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
  }, [links, query, sort]);

  return (
    <div className="product-content saved-links-page">
      <div className="saved-links-page-heading">
        <div>
          <p>{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <span>{copy.subtitle}</span>
        </div>
        <small>
          {links.length || "Nenhum"} {links.length === 1 ? "link" : "links"}
        </small>
      </div>
      <div className="saved-links-toolbar">
        <div className="saved-links-search">
          <Search aria-hidden="true" />
          <span className="sr-only">{copy.search}</span>
          <Input
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.search}
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
      <SavedLinksList
        emptyCopy={query ? "Nenhum link encontrado." : copy.empty}
        items={visibleLinks}
        onChange={(link, deletedId) => {
          setLinks((items) =>
            link
              ? [link, ...items.filter((item) => item.id !== link.id)]
              : items.filter((item) => item.id !== deletedId),
          );
        }}
      />
    </div>
  );
}
