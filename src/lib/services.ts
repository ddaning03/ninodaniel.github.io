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
      "Landing de 1 sección, pensada para celular",
      "Botones de WhatsApp y llamada con mensaje prellenado",
      "Servicios, horarios y mapa de ubicación",
      "SEO básico: título y descripción para Google, y vista previa configurada al compartir el link por WhatsApp",
      "2 rondas de cambios"
    ],
    cta: "Empezar Presencia"
  },
  {
    tier: "Profesional",
    price: "80.000",
    time: "5 días",
    ideal: "Quiere crecer online",
    features: [
      "Web completa de hasta 4 secciones",
      "Galería de trabajos",
      "Sección de reseñas (con las reseñas reales que elijas)",
      "Botón de consulta por cada servicio",
      "SEO técnico optimizado",
      "Revisión de seguridad básica incluida (sin informe)",
      "Todo lo del plan Presencia"
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
      "Inicio premium de hasta 6 secciones",
      "Sistema de turnos online",
      "Redacción de todos los textos",
      "Una página por servicio (hasta 5), para aparecer en más búsquedas de Google",
      "Tarjeta con código QR para pedir reseñas a tus clientes (diseño listo para imprimir)",
      "1 mes de mantenimiento incluido",
      "Todo lo del plan Profesional"
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
