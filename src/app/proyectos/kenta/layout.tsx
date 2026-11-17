import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenta — Proyecto de concepto",
  description:
    "Landing page de concepto para una marca de cosméticos: diseño editorial, animaciones al hacer scroll y compra simplificada.",
  openGraph: {
    images: ["/projects/kenta/hero.png"],
    title: "Kenta — Proyecto de concepto | Daniel Niño",
    description:
      "Landing page de concepto para una marca de cosméticos: diseño editorial, animaciones al hacer scroll y compra simplificada.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
