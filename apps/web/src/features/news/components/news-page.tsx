"use client";
import { ExternalLink, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const categories = [
  ["all", "Todos"],
  ["technology", "Tecnologia"],
  ["ai", "IA"],
  ["startups", "Startups"],
  ["market", "Mercado"],
  ["science", "Ciência"],
  ["world", "Mundo"],
] as const;
type Article = {
  domain: string;
  publishedAt: string | null;
  title: string;
  url: string;
};
export function NewsPage() {
  const [category, setCategory] = useState("all");
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    fetch(`/api/news?category=${category}`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((body: { articles: Article[] }) => {
        if (active) setArticles(body.articles);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [category]);
  return (
    <section className="context-page">
      <p className="context-eyebrow">Notícias</p>
      <h2>Seu radar de hoje.</h2>
      <fieldset className="news-filters">
        <legend className="sr-only">Categoria de notícias</legend>
        {categories.map(([id, label]) => (
          <button
            aria-pressed={category === id}
            key={id}
            onClick={() => setCategory(id)}
            type="button"
          >
            {label}
          </button>
        ))}
      </fieldset>
      {loading ? (
        <p className="context-loading">
          <LoaderCircle className="animate-spin" />
          Buscando notícias.
        </p>
      ) : null}
      {error ? (
        <p className="context-error">
          Não foi possível carregar o radar agora.
        </p>
      ) : null}
      {!loading && !error && !articles.length ? (
        <p className="context-empty-copy">
          Nenhuma notícia disponível para esta categoria agora.
        </p>
      ) : null}
      <div className="news-list">
        {articles.map((article) => (
          <article key={article.url}>
            <small>{article.domain}</small>
            <h3>{article.title}</h3>
            <a href={article.url} rel="noreferrer" target="_blank">
              Abrir original <ExternalLink aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
