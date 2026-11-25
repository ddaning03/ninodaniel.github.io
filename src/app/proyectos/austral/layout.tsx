import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata({
  title: "Austral — Proyecto de concepto",
  description:
    "Portfolio de concepto para un fotógrafo de paisajes: diseño editorial oscuro, galería con visor a pantalla completa y venta de copias.",
  image: "/projects/austral/preview.jpg",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
