import { NextResponse } from "next/server";

const queries: Record<string, string> = {
  all: "(technology OR AI OR startups OR science OR business)",
  technology: "technology",
  ai: "artificial intelligence",
  startups: "startups",
  market: "business OR markets",
  science: "science",
  world: "world news",
};
export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get("category") ?? "all";
  const query = queries[category] ?? queries.all;
  try {
    const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query)}&mode=artlist&format=json&maxrecords=12&timespan=1day`;
    const response = await fetch(url, { next: { revalidate: 900 } });
    if (!response.ok) throw new Error();
    const body = (await response.json()) as {
      articles?: Array<{
        title?: string;
        url?: string;
        domain?: string;
        seendate?: string;
      }>;
    };
    return NextResponse.json({
      articles: (body.articles ?? [])
        .filter((article) => article.title && article.url)
        .map((article) => ({
          domain: article.domain ?? new URL(article.url as string).hostname,
          publishedAt: article.seendate ?? null,
          title: article.title,
          url: article.url,
        })),
    });
  } catch {
    return NextResponse.json({ articles: [] }, { status: 502 });
  }
}
