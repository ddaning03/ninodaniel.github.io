import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synapse — Proyecto de concepto",
  description:
    "Interfaz de concepto para la lista de espera de un motor de video con IA, con estética de terminal.",
  openGraph: {
    images: ["/projects/synapse/vision.png"],
    title: "Synapse — Proyecto de concepto | Daniel Niño",
    description:
      "Interfaz de concepto para la lista de espera de un motor de video con IA, con estética de terminal.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
