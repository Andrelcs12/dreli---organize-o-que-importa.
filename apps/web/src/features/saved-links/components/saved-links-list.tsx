"use client";

import {
  Archive,
  ArchiveRestore,
  ArchiveX,
  ExternalLink,
  Globe2,
  Heart,
  LoaderCircle,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  deleteSavedLink,
  updateSavedLink,
} from "../service/saved-links-client";
import { dispatchSavedLinkChange } from "../service/saved-links-events";
import type { SavedLink } from "../types";

function formatDate(value: string) {
  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(value).getTime()) / 1_000),
  );

  if (elapsedSeconds < 60) return "agora";
  if (elapsedSeconds < 3_600)
    return `há ${Math.floor(elapsedSeconds / 60)} min`;
  if (elapsedSeconds < 86_400)
    return `há ${Math.floor(elapsedSeconds / 3_600)}h`;
  if (elapsedSeconds < 604_800)
    return `há ${Math.floor(elapsedSeconds / 86_400)}d`;

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
  onChange,
}: {
  emptyCopy: string;
  items: SavedLink[];
  onChange?: (link: SavedLink | null, deletedId?: string) => void;
}) {
  if (!items.length) {
    return <p className="saved-links-empty">{emptyCopy}</p>;
  }

  return (
    <div className="saved-links-list">
      {items.map((link) => (
        <SavedLinkRow key={link.id} link={link} onChange={onChange} />
      ))}
    </div>
  );
}

function SavedLinkRow({
  link,
  onChange,
}: {
  link: SavedLink;
  onChange?: (link: SavedLink | null, deletedId?: string) => void;
}) {
  const [error, setError] = useState<string>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [faviconVisible, setFaviconVisible] = useState(true);
  const router = useRouter();
  const faviconUrl = getFaviconUrl(link.url);

  async function run(action: () => Promise<SavedLink | { id: string }>) {
    setError(undefined);
    setIsUpdating(true);
    try {
      const result = await action();
      const current = "url" in result ? result : null;
      dispatchSavedLinkChange({ current, previous: link });
      if (onChange) {
        onChange(current, current ? undefined : result.id);
      } else {
        router.refresh();
      }
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
  const isArchived = link.status === "ARCHIVED";

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
        {error ? (
          <span className="saved-link-error" role="alert">
            {error}
          </span>
        ) : null}
      </div>
      <div className="saved-link-actions">
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
            isArchived
              ? "Restaurar para Inbox"
              : link.status === "LIBRARY"
                ? "Mover para Inbox"
                : "Guardar na Biblioteca"
          }
          disabled={isUpdating}
          onClick={() =>
            run(() =>
              updateSavedLink(link.id, {
                status:
                  link.status === "LIBRARY" || isArchived ? "INBOX" : "LIBRARY",
              }),
            )
          }
          size="icon-xs"
          title={
            isArchived
              ? "Restaurar para Inbox"
              : link.status === "LIBRARY"
                ? "Mover para Inbox"
                : "Guardar na Biblioteca"
          }
          variant="ghost"
        >
          {link.status === "LIBRARY" || isArchived ? (
            <ArchiveRestore />
          ) : (
            <Archive />
          )}
        </Button>
        {!isArchived ? (
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
        ) : null}
        <Button
          aria-label="Excluir link"
          disabled={isUpdating}
          onClick={() => {
            if (
              window.confirm(
                "Excluir este link? Essa ação não poderá ser desfeita.",
              )
            ) {
              void run(() => deleteSavedLink(link.id));
            }
          }}
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
