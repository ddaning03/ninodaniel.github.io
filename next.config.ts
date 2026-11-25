import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/*
 * Content-Security-Policy (sitio estático, sin nonces).
 * - Scripts y estilos inline: los necesitan Next.js y Framer Motion.
 * - Fuentes: next/font las sirve desde el mismo dominio.
 * - Analytics / Speed Insights de Vercel: se sirven desde /_vercel (mismo dominio).
 * - Formspree: destino del formulario de contacto.
 * - vercel.live: barra de comentarios de Vercel en los deploys de preview.
 */
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://vercel.live${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self' data:;
  connect-src 'self' https://formspree.io https://vercel.live;
  frame-src https://vercel.live;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // 75 = por defecto; 90 = fotografía (proyecto Austral)
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
