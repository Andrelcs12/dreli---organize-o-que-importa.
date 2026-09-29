import type { SavedLink } from "./types";

export type InsightPeriod = 7 | 30 | 90;

function key(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getLinkRhythm(links: SavedLink[], period: InsightPeriod) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: period }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (period - 1 - index));
    return { count: 0, date, key: key(date) };
  });
  const map = new Map(days.map((day) => [day.key, day]));
  links.forEach((link) => {
    const day = map.get(key(new Date(link.createdAt)));
    if (day) day.count += 1;
  });
  let bestSequence = 0;
  let running = 0;
  days.forEach((day) => {
    running = day.count ? running + 1 : 0;
    bestSequence = Math.max(bestSequence, running);
  });
  const currentStreak = [...days].reverse().findIndex((day) => !day.count);
  return {
    activeDays: days.filter((day) => day.count).length,
    bestSequence,
    currentStreak: currentStreak === -1 ? days.length : currentStreak,
    days,
    total: days.reduce((sum, day) => sum + day.count, 0),
  };
}

export function getTopDomains(links: SavedLink[], limit = 5) {
  const counts = new Map<string, number>();
  links.forEach((link) => {
    counts.set(link.domain, (counts.get(link.domain) ?? 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}
