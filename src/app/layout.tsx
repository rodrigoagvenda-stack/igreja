import type { Metadata } from "next";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

// Fontes hospedadas localmente (não buscadas do Google a cada build) — next/font/google
// via Turbopack depende de buscar os arquivos ao vivo durante o build, e uma falha de
// rede nesse fetch (aconteceu em produção) derruba o build inteiro. Arquivos em
// src/fonts/ são variable fonts, cobrem todo o intervalo de peso num arquivo só.
const playfairDisplay = localFont({
  src: [
    { path: "../fonts/PlayfairDisplay-normal.woff2", weight: "400 700", style: "normal" },
    { path: "../fonts/PlayfairDisplay-italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-playfair-display",
  display: "swap",
});

const sourceSans3 = localFont({
  src: [
    { path: "../fonts/SourceSans3-normal.woff2", weight: "300 600", style: "normal" },
  ],
  variable: "--font-source-sans-3",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arquidiocesebotucatu.org.br"),
  title: {
    default: "Arquidiocese de Botucatu",
    template: "%s — Arquidiocese de Botucatu",
  },
  description: "Portal Oficial da Arquidiocese de Botucatu — Cúria Metropolitana. Notícias, paróquias, agenda pastoral e documentos oficiais.",
  keywords: ["Arquidiocese", "Botucatu", "Igreja Católica", "Paróquias", "Pastoral"],
  authors: [{ name: "Arquidiocese de Botucatu" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Arquidiocese de Botucatu",
    title: "Arquidiocese de Botucatu",
    description: "Portal Oficial da Arquidiocese de Botucatu — Cúria Metropolitana",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arquidiocese de Botucatu",
    description: "Portal Oficial da Arquidiocese de Botucatu",
  },
  icons: {
    icon: { url: "/Arqu de botucatu.svg", type: "image/svg+xml" },
    apple: "/Arqu de botucatu.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfairDisplay.variable} ${sourceSans3.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <TooltipProvider>{children}</TooltipProvider>
        </body>
    </html>
  );
}
