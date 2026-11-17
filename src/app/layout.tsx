import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const description =
  "Páginas web para negocios locales en Buenos Aires: rápidas en el celular, fáciles de encontrar en Google y listas para recibir consultas por WhatsApp. También reviso la seguridad de páginas hechas con IA (Lovable, Bolt, v0).";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daniel Niño | Páginas web y seguridad para negocios en Buenos Aires",
    template: "%s | Daniel Niño",
  },
  description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Daniel Niño // Estratega Visual",
    title: "Daniel Niño | Páginas web y seguridad para negocios en Buenos Aires",
    description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Daniel Niño trabajando en su estudio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Niño | Páginas web y seguridad para negocios en Buenos Aires",
    description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${syne.variable} scroll-smooth`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
