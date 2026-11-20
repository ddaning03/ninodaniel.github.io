import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Austral — Proyecto de concepto",
  description:
    "Portfolio de concepto para un fotógrafo de paisajes: diseño editorial oscuro, galería con visor a pantalla completa y venta de copias.",
  openGraph: {
    images: ["/projects/austral/lago-lengas.jpg"],
    title: "Austral — Proyecto de concepto | Daniel Niño",
    description:
      "Portfolio de concepto para un fotógrafo de paisajes: diseño editorial oscuro, galería con visor a pantalla completa y venta de copias.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
