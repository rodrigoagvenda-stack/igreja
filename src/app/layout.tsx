import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
