"use client";

import {
  Archive,
  ArrowUpRight,
  Inbox,
  Link2,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SavedLinkChange } from "../service/saved-links-events";
import type { SavedLink, SavedLinksResponse } from "../types";
import { LinkCapture } from "./link-capture";
import { SavedLinksList } from "./saved-links-list";

const periods = [7, 30, 90] as const;
const tabs = [
  { id: "overview", label: "Visão geral" },
  { id: "links", label: "Links" },
  { id: "rhythm", label: "Ritmo" },
  { id: "recent", label: "Recentes" },
] as const;

type Tab = (typeof tabs)[number]["id"];
type Period = (typeof periods)[number];

function dateKey(value: Date) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
}

function getRhythm(links: SavedLink[], period: Period) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: period }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (period - 1 - index));
    return { count: 0, date, key: dateKey(date) };
  });
  const byDay = new Map(days.map((day) => [day.key, day]));
  for (const link of links) {
    const day = byDay.get(dateKey(new Date(link.createdAt)));
    if (day) day.count += 1;
  }
  const activeDays = days.filter((day) => day.count > 0).length;
  let bestSequence = 0;
  let current = 0;
  for (const day of days) {
    current = day.count ? current + 1 : 0;
    bestSequence = Math.max(bestSequence, current);
  }
  const currentStreak = [...days].reverse().findIndex((day) => !day.count);
  return {
    activeDays,
    bestSequence,
    currentStreak: currentStreak === -1 ? days.length : currentStreak,
    days,
    total: days.reduce((sum, day) => sum + day.count, 0),
  };
}

function ConsistencyChart({
  links,
  period,
}: {
  links: SavedLink[];
  period: Period;
}) {
  const rhythm = getRhythm(links, period);
  const max = Math.max(...rhythm.days.map((day) => day.count), 1);
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
  });

  if (!rhythm.total) {
    return (
      <div className="dashboard-rhythm-empty">
        <TrendingUp aria-hidden="true" />
        <p>Ainda não há links salvos nesse período para mostrar seu ritmo.</p>
      </div>
    );
  }

  return (
    <div className={`consistency-chart consistency-chart--${period}`}>
      <div
        className="consistency-chart-bars"
        role="img"
        aria-label={`${rhythm.activeDays} dias ativos e ${rhythm.total} links salvos nos últimos ${period} dias`}
      >
        {rhythm.days.map((day) => (
          <span
            className="consistency-chart-day"
            key={day.key}
            title={`${dateFormatter.format(day.date)}: ${day.count} ${day.count === 1 ? "link salvo" : "links salvos"}`}
          >
            <i
              style={{
                height: `${Math.max(day.count ? 12 : 3, (day.count / max) * 100)}%`,
              }}
            />
            {period === 7 ? (
              <small>
                {new Intl.DateTimeFormat("pt-BR", { weekday: "short" })
                  .format(day.date)
                  .replace(".", "")}
              </small>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function RhythmContent({
  links,
  period,
  setPeriod,
}: {
  links: SavedLink[];
  period: Period;
  setPeriod: (period: Period) => void;
}) {
  const rhythm = getRhythm(links, period);
  return (
    <section className="dashboard-rhythm" aria-labelledby="rhythm-title">
      <div className="dashboard-section-heading">
        <div>
          <p>Links salvos</p>
          <h2 id="rhythm-title">Constância</h2>
        </div>
        <fieldset className="dashboard-periods">
          <legend className="sr-only">Período da constância</legend>
          {periods.map((option) => (
            <button
              aria-pressed={period === option}
              key={option}
              onClick={() => setPeriod(option)}
              type="button"
            >
              {option}D
            </button>
          ))}
        </fieldset>
      </div>
      <ConsistencyChart links={links} period={period} />
      {rhythm.total ? (
        <div className="dashboard-rhythm-metrics">
          <span>
            <b>{rhythm.activeDays}</b> dias ativos
          </span>
          <span>
            <b>{rhythm.bestSequence}</b> melhor sequência
          </span>
          <span>
            <b>{rhythm.currentStreak}</b> sequência atual
          </span>
          <span>
            <b>{rhythm.total}</b> links salvos
          </span>
        </div>
      ) : null}
    </section>
  );
}

export function DashboardOverview({
  savedLinks,
}: {
  savedLinks: SavedLinksResponse;
}) {
  const [links, setLinks] = useState(savedLinks.items);
  const [period, setPeriod] = useState<Period>(7);
  const [tab, setTab] = useState<Tab>("overview");
  const [filter, setFilter] = useState<
    "all" | "inbox" | "library" | "favorites"
  >("all");
  const currentLinks = links.filter((link) => link.status !== "ARCHIVED");
  const counts = useMemo(
    () => ({
      favorites: currentLinks.filter((link) => link.isFavorite).length,
      inbox: currentLinks.filter((link) => link.status === "INBOX").length,
      library: currentLinks.filter((link) => link.status === "LIBRARY").length,
    }),
    [currentLinks],
  );
  const filteredLinks = currentLinks.filter((link) =>
    filter === "all"
      ? true
      : filter === "favorites"
        ? link.isFavorite
        : link.status === filter.toUpperCase(),
  );

  const updateLink = useCallback(
    (link: SavedLink | null, deletedId?: string) => {
      setLinks((items) =>
        deletedId
          ? items.filter((item) => item.id !== deletedId)
          : !link
            ? items
            : [link, ...items.filter((item) => item.id !== link.id)],
      );
    },
    [],
  );

  useEffect(() => {
    const update = (event: Event) => {
      const { current, previous } = (event as CustomEvent<SavedLinkChange>)
        .detail;
      updateLink(current, previous && !current ? previous.id : undefined);
    };
    window.addEventListener("dreli:saved-link-change", update);
    return () => window.removeEventListener("dreli:saved-link-change", update);
  }, [updateLink]);

  const noLinks = links.length === 0;
  const rhythm = getRhythm(links, 7);
  return (
    <div className="dashboard-v2">
      <section
        className="dashboard-summary-cards"
        aria-label="Resumo dos seus links"
        data-tour="summary-cards"
      >
        <Link href="/inbox">
          <span className="dashboard-summary-card-heading">
            <span>
              <Inbox aria-hidden="true" /> Inbox
            </span>
            <ArrowUpRight aria-hidden="true" />
          </span>
          <strong>{counts.inbox} para organizar</strong>
          <small>Links aguardando uma decisão</small>
        </Link>
        <Link href="/library">
          <span className="dashboard-summary-card-heading">
            <span>
              <Archive aria-hidden="true" /> Biblioteca
            </span>
            <ArrowUpRight aria-hidden="true" />
          </span>
          <strong>{counts.library} referências</strong>
          <small>O que você decidiu manter</small>
        </Link>
        <Link href="/favorites">
          <span className="dashboard-summary-card-heading">
            <span>
              <Star aria-hidden="true" /> Favoritos
            </span>
            <ArrowUpRight aria-hidden="true" />
          </span>
          <strong>{counts.favorites} importantes</strong>
          <small>Para manter por perto</small>
        </Link>
        <button onClick={() => setTab("rhythm")} type="button">
          <span className="dashboard-summary-card-heading">
            <span>
              <TrendingUp aria-hidden="true" /> Ritmo
            </span>
            <ArrowUpRight aria-hidden="true" />
          </span>
          <strong>{rhythm.activeDays} de 7 dias ativos</strong>
          <small>Baseado nos links salvos</small>
        </button>
      </section>
      <div
        aria-label="Perspectivas do dashboard"
        className="dashboard-tabs"
        data-tour="dashboard-tabs"
        role="tablist"
      >
        {tabs.map((item) => (
          <button
            aria-controls={`dashboard-${item.id}`}
            aria-selected={tab === item.id}
            className={tab === item.id ? "is-active" : undefined}
            key={item.id}
            onClick={() => setTab(item.id)}
            role="tab"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      {noLinks ? (
        <section className="dashboard-tab-panel dashboard-empty-state">
          <Link2 aria-hidden="true" />
          <h2>Seu ritmo começa aqui.</h2>
          <p>
            Salve algo no Dreli e sua atividade aparecerá conforme você usar o
            espaço.
          </p>
          <LinkCapture />
          <small className="dashboard-capture-note">
            Os links novos entram na Inbox.
          </small>
        </section>
      ) : null}
      {!noLinks && tab === "overview" ? (
        <div
          className="dashboard-tab-panel dashboard-overview-grid"
          id="dashboard-overview"
          role="tabpanel"
        >
          <section className="dashboard-recent-panel">
            <div className="dashboard-section-heading">
              <div>
                <p>Continue</p>
                <h2>Links recentes</h2>
              </div>
              <Link href="/links">Ver todos</Link>
            </div>
            <SavedLinksList
              emptyCopy="Nenhum link recente."
              items={currentLinks.slice(0, 5)}
              onChange={updateLink}
            />
          </section>
          <aside className="dashboard-aside">
            <RhythmContent
              links={links}
              period={period}
              setPeriod={setPeriod}
            />
            <section className="dashboard-attention">
              <p>Atenção</p>
              <h2>
                {counts.inbox
                  ? `${counts.inbox} ${counts.inbox === 1 ? "item aguarda" : "itens aguardam"} organização.`
                  : "Inbox limpa."}
              </h2>
              <Link href="/inbox">Abrir Inbox</Link>
            </section>
          </aside>
        </div>
      ) : null}
      {!noLinks && tab === "links" ? (
        <section
          className="dashboard-tab-panel dashboard-links-tab"
          id="dashboard-links"
          role="tabpanel"
        >
          <div className="dashboard-section-heading">
            <div>
              <p>Links</p>
              <h2>Salvos recentemente</h2>
            </div>
            <Link href="/links">Abrir todos</Link>
          </div>
          <fieldset className="dashboard-link-filters">
            <legend className="sr-only">Filtrar links</legend>
            {(["all", "inbox", "library", "favorites"] as const).map((item) => (
              <button
                aria-pressed={filter === item}
                key={item}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item === "all"
                  ? "Todos"
                  : item === "inbox"
                    ? "Inbox"
                    : item === "library"
                      ? "Biblioteca"
                      : "Favoritos"}
              </button>
            ))}
          </fieldset>
          <SavedLinksList
            emptyCopy="Nenhum link nesta visão."
            items={filteredLinks.slice(0, 10)}
            onChange={updateLink}
          />
          <Link className="dashboard-list-cta" href="/links">
            Ver todos os links →
          </Link>
        </section>
      ) : null}
      {!noLinks && tab === "rhythm" ? (
        <div
          className="dashboard-tab-panel dashboard-rhythm-tab"
          id="dashboard-rhythm"
          role="tabpanel"
        >
          <RhythmContent links={links} period={period} setPeriod={setPeriod} />
        </div>
      ) : null}
      {!noLinks && tab === "recent" ? (
        <section
          className="dashboard-tab-panel dashboard-links-tab"
          id="dashboard-recent"
          role="tabpanel"
        >
          <div className="dashboard-section-heading">
            <div>
              <p>Recentes</p>
              <h2>Links salvos</h2>
            </div>
            <Link href="/links">Ver todos</Link>
          </div>
          <SavedLinksList
            emptyCopy="Nenhum link recente."
            items={links.slice(0, 10)}
            onChange={updateLink}
          />
        </section>
      ) : null}
    </div>
  );
}
