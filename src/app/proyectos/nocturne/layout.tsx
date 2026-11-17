import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nocturne — Proyecto de concepto",
  description:
    "Sitio de concepto para un restaurante de autor: diseño oscuro tipo bento y estética editorial.",
  openGraph: {
    images: ["/projects/nocturne/interior.png"],
    title: "Nocturne — Proyecto de concepto | Daniel Niño",
    description:
      "Sitio de concepto para un restaurante de autor: diseño oscuro tipo bento y estética editorial.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
