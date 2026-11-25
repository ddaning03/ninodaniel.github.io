import type { Metadata } from "next";

/* Metadatos completos de una página (title, description, Open Graph y Twitter),
   para que ninguna subpágina herede los del portfolio principal. */
export function pageMetadata({
  title,
  description,
  image = "/og-image.jpg",
}: {
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const full = `${title} | Daniel Niño`;
  return {
    title,
    description,
    openGraph: { type: "website", title: full, description, images: [image] },
    twitter: { card: "summary_large_image", title: full, description, images: [image] },
  };
}
