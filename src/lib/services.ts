/* Planes y servicios: fuente única para la sección de precios y los datos estructurados (JSON-LD). */

export interface Service {
  tier: string;
  price: string;
  /** Unidad que acompaña al precio (por defecto "ARS") */
  unit?: string;
  time?: string;
  ideal: string;
  features: string[];
  cta: string;
  popular?: boolean;
  /** Mensaje precargado de WhatsApp */
  waText?: string;
  /** Página con más detalle del servicio */
  detail?: { href: string; label: string };
}

export const services: Service[] = [
  {
    tier: "Presencia",
    price: "50.000",
    time: "48hs",
    ideal: "Sin nada digital todavía",
    features: [
      "Landing page de 1 sección",
      "Google Business optimizado",
      "Botón de WhatsApp integrado",
      "Dominio .com.ar / Subdominio",
      "Hosting incluido por 1 año"
    ],
    cta: "Empezar Presencia"
  },
  {
    tier: "Profesional",
    price: "80.000",
    time: "5 días",
    ideal: "Quiere crecer online",
    features: [
      "Web completa (3-4 secciones)",
      "Sistema de turnos integrado",
      "Todo lo del Plan Presencia",
      "5 posts de Instagram diseñados",
      "SEO técnico optimizado"
    ],
    cta: "Empezar Profesional",
    popular: true
  },
  {
    tier: "Autoridad",
    price: "150.000",
    time: "10 días",
    ideal: "Referente local CABA",
    features: [
      "Web Premium + Branding básico",
      "10 posts diseñados para redes",
      "1 Reel / Video presentación",
      "Estrategia de Reseñas Google",
      "Todo lo del Plan Profesional"
    ],
    cta: "Empezar Autoridad"
  }
];

export const extraServices: Service[] = [
  {
    tier: "Revisión de seguridad",
    price: "40.000",
    ideal: "Para páginas hechas con IA (Lovable, Bolt, v0)",
    features: [
      "Chequeo completo de tu página",
      "Informe claro, en lenguaje simple",
      "Riesgos encontrados, de más a menos urgente",
      "Propuesta de arreglo para cada uno"
    ],
    cta: "Pedir Revisión",
    waText: "¡Hola Daniel! Me interesa la revisión de seguridad para mi página. ¿Podemos charlar?",
    detail: { href: "/revision-seguridad-ia#ejemplo", label: "Ver ejemplo de informe →" }
  },
  {
    tier: "Mantenimiento mensual",
    price: "30.000",
    unit: "ARS/mes",
    ideal: "Para que tu página no se descuide",
    features: [
      "Actualizaciones",
      "Backups",
      "Monitoreo: que esté online y segura",
      "Reporte mensual corto"
    ],
    cta: "Sumar Mantenimiento",
    waText: "¡Hola Daniel! Me interesa el mantenimiento mensual para mi página. ¿Podemos charlar?"
  }
];
