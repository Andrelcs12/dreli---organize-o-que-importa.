import { Archive, Inbox, Star } from "lucide-react";
import Link from "next/link";
import type { SavedLinksResponse } from "../types";
import { LinkCapture } from "./link-capture";
import { SavedLinksList } from "./saved-links-list";

export function DashboardOverview({
  currentFocus,
  savedLinks,
}: {
  currentFocus: string | null;
  savedLinks: SavedLinksResponse;
}) {
  return (
    <div className="product-content dashboard-content">
      <div className="dashboard-intro">
        <div>
          <p>Agora</p>
          <h2>Um lugar para o que você encontra pelo caminho.</h2>
        </div>
        {currentFocus ? <span>{currentFocus}</span> : null}
      </div>

      <LinkCapture />

      <section className="link-indicators" aria-label="Resumo dos links salvos">
        <Link href="/inbox">
          <Inbox aria-hidden="true" />
          <span>
            <strong>{savedLinks.counts.inbox}</strong>
            Inbox
          </span>
        </Link>
        <Link href="/library">
          <Archive aria-hidden="true" />
          <span>
            <strong>{savedLinks.counts.library}</strong>
            Biblioteca
          </span>
        </Link>
        <Link href="/favorites">
          <Star aria-hidden="true" />
          <span>
            <strong>{savedLinks.counts.favorites}</strong>
            Favoritos
          </span>
        </Link>
      </section>

      <section
        className="saved-links-section"
        aria-labelledby="recent-links-title"
      >
        <div className="saved-links-section-heading">
          <div>
            <p>Recentes</p>
            <h2 id="recent-links-title">Salvos por último</h2>
          </div>
          <Link href="/inbox">Ver Inbox</Link>
        </div>
        <SavedLinksList
          emptyCopy="Ainda não há links salvos. Cole uma URL acima para começar."
          items={savedLinks.items}
        />
      </section>
    </div>
  );
}
