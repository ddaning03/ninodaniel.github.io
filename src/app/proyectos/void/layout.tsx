import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VOID — Proyecto de concepto",
  description:
    "Caso de concepto: estrategia de lanzamiento para un drop limitado de streetwear.",
  openGraph: {
    images: ["/projects/void/1.png"],
    title: "VOID — Proyecto de concepto | Daniel Niño",
    description:
      "Caso de concepto: estrategia de lanzamiento para un drop limitado de streetwear.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
