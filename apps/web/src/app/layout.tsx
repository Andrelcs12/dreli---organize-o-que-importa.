import type { Metadata, Viewport } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { SplashScreen } from "@/common/components/splash-screen";
import { ThemeProvider } from "@/common/components/theme-provider";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

const manrope = Manrope({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dreli.app",
);

export const metadata: Metadata = {
  title: { default: "Dreli — Own your rhythm", template: "%s | Dreli" },
  description:
    "Seu espaço pessoal para organizar informações, acompanhar prioridades e manter clareza sobre o que importa.",
  applicationName: "Dreli",
  metadataBase: siteUrl,
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png", type: "image/png" }],
    shortcut: ["/icon.png"],
  },
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f0e7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1e29" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${sourceSerif.variable} ${manrope.variable}`}
      lang="pt-BR"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SplashScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
