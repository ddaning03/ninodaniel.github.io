/* Datos generales del sitio (usados en metadata, sitemap, robots y JSON-LD). */

export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const siteName = "Daniel Niño // Estratega Visual";
