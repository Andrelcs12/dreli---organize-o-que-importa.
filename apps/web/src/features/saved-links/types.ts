export type SavedLinkStatus = "INBOX" | "LIBRARY" | "ARCHIVED";

export type SavedLink = {
  createdAt: string;
  description: string | null;
  domain: string;
  id: string;
  imageUrl: string | null;
  isFavorite: boolean;
  status: SavedLinkStatus;
  title: string | null;
  url: string;
};

export type SavedLinksResponse = {
  counts: {
    favorites: number;
    inbox: number;
    library: number;
  };
  items: SavedLink[];
};
