import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/revision-seguridad-ia", priority: 0.9 },
  { path: "/proyectos/kenta", priority: 0.5 },
  { path: "/proyectos/nocturne", priority: 0.5 },
  { path: "/proyectos/synapse", priority: 0.5 },
  { path: "/proyectos/void", priority: 0.5 },
  { path: "/privacidad", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    priority,
  }));
}
