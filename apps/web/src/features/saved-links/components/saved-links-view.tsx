import type { SavedLinksResponse } from "../types";
import { SavedLinksList } from "./saved-links-list";

const content = {
  favorites: {
    empty: "Seus links favoritos vão aparecer aqui.",
    eyebrow: "Coleção",
    title: "Favoritos",
  },
  inbox: {
    empty: "A Inbox está vazia. Salve algo que você queira lembrar depois.",
    eyebrow: "Entrada",
    title: "Inbox",
  },
  library: {
    empty: "A Biblioteca ainda não tem links guardados.",
    eyebrow: "Guardados",
    title: "Biblioteca",
  },
} as const;

export function SavedLinksView({
  savedLinks,
  view,
}: {
  savedLinks: SavedLinksResponse;
  view: keyof typeof content;
}) {
  const copy = content[view];

  return (
    <div className="product-content saved-links-page">
      <div className="saved-links-page-heading">
        <p>{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
      </div>
      <SavedLinksList emptyCopy={copy.empty} items={savedLinks.items} />
    </div>
  );
}
