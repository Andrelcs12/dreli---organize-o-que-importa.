"use client";

import { useEffect, useState } from "react";
import type { SavedLinkChange } from "../service/saved-links-events";
import type { SavedLink, SavedLinksResponse } from "../types";

type Counts = SavedLinksResponse["counts"];

function applies(link: SavedLink | null, key: keyof Counts) {
  if (!link) return false;
  if (key === "inbox") return link.status === "INBOX";
  if (key === "library") return link.status === "LIBRARY";
  if (key === "archived") return link.status === "ARCHIVED";
  return link.isFavorite && link.status !== "ARCHIVED";
}

export function SavedLinkCount({
  count,
  counts,
}: {
  count: keyof Counts;
  counts: Counts;
}) {
  const [current, setCurrent] = useState(counts);

  useEffect(() => {
    setCurrent(counts);
  }, [counts]);

  useEffect(() => {
    const update = (event: Event) => {
      const { current: next, previous } = (
        event as CustomEvent<SavedLinkChange>
      ).detail;
      setCurrent((value) => {
        const delta =
          Number(applies(next, count)) - Number(applies(previous, count));
        return delta
          ? { ...value, [count]: Math.max(0, value[count] + delta) }
          : value;
      });
    };
    window.addEventListener("dreli:saved-link-change", update);
    return () => window.removeEventListener("dreli:saved-link-change", update);
  }, [count]);

  return current[count] ? <small>{current[count]}</small> : null;
}
