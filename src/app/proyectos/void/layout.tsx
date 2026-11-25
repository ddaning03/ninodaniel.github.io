import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata({
  title: "VOID — Proyecto de concepto",
  description:
    "Caso de concepto: estrategia de lanzamiento para un drop limitado de streetwear.",
  image: "/projects/void/1.png",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
