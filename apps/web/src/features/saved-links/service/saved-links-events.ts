"use client";

import type { SavedLink } from "../types";

export type SavedLinkChange = {
  current: SavedLink | null;
  previous: SavedLink | null;
};

export function dispatchSavedLinkChange(change: SavedLinkChange) {
  window.dispatchEvent(
    new CustomEvent<SavedLinkChange>("dreli:saved-link-change", {
      detail: change,
    }),
  );
}
