import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata({
  title: "Kenta — Proyecto de concepto",
  description:
    "Landing page de concepto para una marca de cosméticos: diseño editorial, animaciones al hacer scroll y compra simplificada.",
  image: "/projects/kenta/preview.jpg",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
