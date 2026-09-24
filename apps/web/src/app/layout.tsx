import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dreli.app",
);

export const metadata: Metadata = {
  title: { default: "Dreli — Own your rhythm", template: "%s | Dreli" },
  description:
    "Seu espaço pessoal para organizar informações, acompanhar prioridades e manter clareza sobre o que importa.",
  applicationName: "Dreli",
  metadataBase: siteUrl,
  keywords: [
    "organização pessoal",
    "tarefas",
    "hábitos",
    "links salvos",
    "produtividade consciente",
    "assistente pessoal",
  ],
  authors: [{ name: "Dreli" }],
  creator: "Dreli",
  publisher: "Dreli",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Dreli",
    title: "Dreli — Own your rhythm",
    description: "Menos abas abertas. Mais espaço na cabeça.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreli — Own your rhythm",
    description: "Menos abas abertas. Mais espaço na cabeça.",
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "produtividade",
};

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
