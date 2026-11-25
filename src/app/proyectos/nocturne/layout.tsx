import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata({
  title: "Nocturne — Proyecto de concepto",
  description:
    "Sitio de concepto para un restaurante de autor: diseño oscuro tipo bento y estética editorial.",
  image: "/projects/nocturne/preview.jpg",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
