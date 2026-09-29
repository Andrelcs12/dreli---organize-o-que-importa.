"use client";

import { useMemo, useState } from "react";
import { getLinkRhythm, getTopDomains, type InsightPeriod } from "../insights";
import type { SavedLinksResponse } from "../types";
import { SavedLinksList } from "./saved-links-list";

const periods: InsightPeriod[] = [7, 30, 90];

function PeriodPicker({
  period,
  setPeriod,
}: {
  period: InsightPeriod;
  setPeriod: (value: InsightPeriod) => void;
}) {
  return (
    <fieldset className="insight-periods">
      <legend className="sr-only">Período</legend>
      {periods.map((value) => (
        <button
          aria-pressed={period === value}
          key={value}
          onClick={() => setPeriod(value)}
          type="button"
        >
          {value}D
        </button>
      ))}
    </fieldset>
  );
}
function Chart({
  period,
  savedLinks,
}: {
  period: InsightPeriod;
  savedLinks: SavedLinksResponse;
}) {
  const rhythm = getLinkRhythm(savedLinks.items, period);
  const max = Math.max(...rhythm.days.map((day) => day.count), 1);
  if (!rhythm.total)
    return (
      <p className="insight-empty">Ainda não há links salvos nesse período.</p>
    );
  return (
    <div
      className="insight-chart"
      role="img"
      aria-label={`${rhythm.activeDays} dias ativos nos últimos ${period} dias`}
    >
      {rhythm.days.map((day) => (
        <span
          key={day.key}
          title={`${day.date.toLocaleDateString("pt-BR")}: ${day.count} links salvos`}
        >
          <i
            style={{
              height: `${Math.max(day.count ? 10 : 2, (day.count / max) * 100)}%`,
            }}
          />
          {period === 7 ? (
            <small>
              {day.date
                .toLocaleDateString("pt-BR", { weekday: "short" })
                .replace(".", "")}
            </small>
          ) : null}
        </span>
      ))}
    </div>
  );
}
export function LinkHistory({
  savedLinks,
}: {
  savedLinks: SavedLinksResponse;
}) {
  const links = savedLinks.items.slice(0, 30);
  return (
    <section className="insight-page">
      <p className="insight-eyebrow">Histórico</p>
      <h2>Itens salvos</h2>
      <p className="insight-description">
        Uma linha do tempo dos links que você guardou no Dreli.
      </p>
      <SavedLinksList emptyCopy="Nenhum item salvo ainda." items={links} />
    </section>
  );
}
export function LinkReports({
  savedLinks,
}: {
  savedLinks: SavedLinksResponse;
}) {
  const [period, setPeriod] = useState<InsightPeriod>(30);
  const rhythm = getLinkRhythm(savedLinks.items, period);
  const domains = useMemo(
    () => getTopDomains(savedLinks.items),
    [savedLinks.items],
  );
  const library = savedLinks.items.filter(
    (link) => link.status === "LIBRARY",
  ).length;
  const favorites = savedLinks.items.filter(
    (link) => link.isFavorite && link.status !== "ARCHIVED",
  ).length;
  return (
    <section className="insight-page">
      <div className="insight-page-heading">
        <div>
          <p className="insight-eyebrow">Relatórios</p>
          <h2>Resumo do período</h2>
        </div>
        <PeriodPicker period={period} setPeriod={setPeriod} />
      </div>
      <div className="insight-stats">
        <span>
          <b>{rhythm.total}</b> links salvos
        </span>
        <span>
          <b>{library}</b> na Biblioteca
        </span>
        <span>
          <b>{favorites}</b> favoritos
        </span>
        <span>
          <b>{rhythm.activeDays}</b> dias ativos
        </span>
      </div>
      <section className="insight-domains">
        <h3>Principais fontes</h3>
        {domains.length ? (
          domains.map(([domain, count]) => (
            <p key={domain}>
              <span>{domain}</span>
              <b>{count}</b>
            </p>
          ))
        ) : (
          <p className="insight-empty">Ainda não há fontes para resumir.</p>
        )}
      </section>
    </section>
  );
}
export function LinkPerformance({
  savedLinks,
}: {
  savedLinks: SavedLinksResponse;
}) {
  const [period, setPeriod] = useState<InsightPeriod>(7);
  const rhythm = getLinkRhythm(savedLinks.items, period);
  return (
    <section className="insight-page">
      <div className="insight-page-heading">
        <div>
          <p className="insight-eyebrow">Seu ritmo</p>
          <h2>Links salvos</h2>
        </div>
        <PeriodPicker period={period} setPeriod={setPeriod} />
      </div>
      <Chart period={period} savedLinks={savedLinks} />
      <div className="insight-stats">
        <span>
          <b>{rhythm.activeDays}</b> dias ativos
        </span>
        <span>
          <b>{rhythm.currentStreak}</b> sequência atual
        </span>
        <span>
          <b>{rhythm.bestSequence}</b> melhor sequência
        </span>
        <span>
          <b>{rhythm.total}</b> links salvos
        </span>
      </div>
    </section>
  );
}
