import { services, extraServices } from "@/lib/services";
import { siteUrl } from "@/lib/site";

/* Datos estructurados (JSON-LD) para que Google entienda quién soy, dónde trabajo y qué ofrezco. */
export default function StructuredData() {
  const toNumber = (price: string) => Number(price.replace(/\./g, ""));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Daniel Niño — Páginas web y seguridad",
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
    email: "ninogalattidaniel@gmail.com",
    telephone: "+54 9 11 6764-4591",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Caballito",
      addressRegion: "Ciudad Autónoma de Buenos Aires",
      addressCountry: "AR",
    },
    areaServed: [
      { "@type": "City", name: "Buenos Aires" },
      { "@type": "Country", name: "Argentina" },
    ],
    sameAs: ["https://instagram.com/ddani.ng"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: [...services, ...extraServices].map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.tier, description: s.features.join(". ") },
        price: toNumber(s.price),
        priceCurrency: "ARS",
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
