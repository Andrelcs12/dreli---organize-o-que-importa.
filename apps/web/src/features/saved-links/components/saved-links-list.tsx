"use client";

import {
  Archive,
  ArchiveRestore,
  ArchiveX,
  ExternalLink,
  Globe2,
  Heart,
  LoaderCircle,
  Star,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  deleteSavedLink,
  updateSavedLink,
} from "../service/saved-links-client";
import type { SavedLink } from "../types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

function getFaviconUrl(url: string) {
  try {
    return `${new URL(url).origin}/favicon.ico`;
  } catch {
    return null;
  }
}

export function SavedLinksList({
  emptyCopy,
  items,
}: {
  emptyCopy: string;
  items: SavedLink[];
}) {
  if (!items.length) {
    return <p className="saved-links-empty">{emptyCopy}</p>;
  }

  return (
    <div className="saved-links-list">
      {items.map((link) => (
        <SavedLinkRow key={link.id} link={link} />
      ))}
    </div>
  );
}

function SavedLinkRow({ link }: { link: SavedLink }) {
  const [error, setError] = useState<string>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [faviconVisible, setFaviconVisible] = useState(true);
  const router = useRouter();
  const faviconUrl = getFaviconUrl(link.url);

  async function run(action: () => Promise<unknown>) {
    setError(undefined);
    setIsUpdating(true);
    try {
      await action();
      router.refresh();
    } catch (actionError) {
      setError(
        actionError instanceof Error
          ? actionError.message
          : "Não foi possível atualizar este link.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  const title = link.title || link.domain;

  return (
    <article className="saved-link-row">
      <span className="saved-link-favicon" aria-hidden="true">
        {faviconUrl && faviconVisible ? (
          // biome-ignore lint/performance/noImgElement: cada favicon pertence ao domínio salvo e não há host fixo para next/image.
          <img
            alt=""
            onError={() => setFaviconVisible(false)}
            src={faviconUrl}
          />
        ) : (
          <Globe2 />
        )}
      </span>
      <div className="saved-link-copy">
        <a href={link.url} rel="noreferrer" target="_blank">
          {title} <ExternalLink aria-hidden="true" />
        </a>
        <p>
          <span>{link.domain}</span>
          <i aria-hidden="true" />
          <time dateTime={link.createdAt}>{formatDate(link.createdAt)}</time>
        </p>
        {link.description ? <small>{link.description}</small> : null}
        {error ? (
          <span className="saved-link-error" role="alert">
            {error}
          </span>
        ) : null}
      </div>
      <div
        aria-label={`Ações para ${title}`}
        className="saved-link-actions"
        role="group"
      >
        <Button
          aria-label={link.isFavorite ? "Remover dos favoritos" : "Favoritar"}
          disabled={isUpdating}
          onClick={() =>
            run(() =>
              updateSavedLink(link.id, { isFavorite: !link.isFavorite }),
            )
          }
          size="icon-xs"
          title={link.isFavorite ? "Remover dos favoritos" : "Favoritar"}
          variant={link.isFavorite ? "secondary" : "ghost"}
        >
          {link.isFavorite ? <Heart fill="currentColor" /> : <Heart />}
        </Button>
        <Button
          aria-label={
            link.status === "LIBRARY"
              ? "Mover para Inbox"
              : "Guardar na Biblioteca"
          }
          disabled={isUpdating}
          onClick={() =>
            run(() =>
              updateSavedLink(link.id, {
                status: link.status === "LIBRARY" ? "INBOX" : "LIBRARY",
              }),
            )
          }
          size="icon-xs"
          title={
            link.status === "LIBRARY"
              ? "Mover para Inbox"
              : "Guardar na Biblioteca"
          }
          variant="ghost"
        >
          {link.status === "LIBRARY" ? <ArchiveRestore /> : <Archive />}
        </Button>
        <Button
          aria-label="Arquivar"
          disabled={isUpdating}
          onClick={() =>
            run(() => updateSavedLink(link.id, { status: "ARCHIVED" }))
          }
          size="icon-xs"
          title="Arquivar"
          variant="ghost"
        >
          <ArchiveX />
        </Button>
        <Button
          aria-label="Excluir link"
          disabled={isUpdating}
          onClick={() => run(() => deleteSavedLink(link.id))}
          size="icon-xs"
          title="Excluir link"
          variant="ghost"
        >
          {isUpdating ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
        </Button>
      </div>
    </article>
  );
}
