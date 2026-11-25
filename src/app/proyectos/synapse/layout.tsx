import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata({
  title: "Synapse — Proyecto de concepto",
  description:
    "Interfaz de concepto para la lista de espera de un motor de video con IA, con estética de terminal.",
  image: "/projects/synapse/preview.jpg",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
