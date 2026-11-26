import type { Demo } from "./types";

/*
 * Prospecto: Módulo Técnico · Proyectos Eléctricos.
 * Landing para tráfico de Google Ads (diseño "circuito").
 * Solo datos confirmados por Daniel. No hay reseñas de Google cargadas: la sección no se muestra.
 */
const demo: Demo = {
  nombre: "Módulo Técnico · Proyectos Eléctricos",
  nombreCorto: "Módulo Técnico",
  rubro: "Instalaciones eléctricas",
  desde: "2006",
  titular: "Electricistas en CABA desde 2006",
  bajada: "Instalación y mantenimiento eléctrico en baja tensión, para casas y comercios.",

  telefono: "(011) 3600-3143",
  whatsapp: "5491136003143",
  email: "gdbinstalacioneselectricas@gmail.com",
  mensajeWhatsApp: "Hola, quiero consultar por un trabajo eléctrico",
  textoBotonWhatsApp: "Escribinos por WhatsApp",
  whatsappPorServicio: true,

  // Servicios en el orden que promocionan.
  // TEXTO A CONFIRMAR CON EL CLIENTE: las líneas explican cada servicio en lenguaje simple.
  servicios: [
    { nombre: "Mantenimiento eléctrico", detalle: "Revisamos la instalación de tu casa o comercio y reparamos las fallas." },
    { nombre: "Montaje de artefactos", detalle: "Colocamos lámparas, apliques y otros artefactos eléctricos." },
    { nombre: "Instalaciones eléctricas residenciales y comerciales", detalle: "Instalaciones nuevas o reformas en baja tensión, para casas, departamentos y locales." },
    { nombre: "Protocolos de puesta a tierra", detalle: "Medimos la puesta a tierra y armamos el protocolo, el documento que suelen pedirle a comercios y empresas." },
    { nombre: "Mediciones con equipo homologado", detalle: "Medimos tu instalación con equipos homologados para saber en qué estado está." },
    { nombre: "Colocación de ventiladores de techo", detalle: "Instalamos tu ventilador de techo y lo dejamos funcionando." },
  ],

  // TEXTO A CONFIRMAR CON EL CLIENTE: "por qué elegirnos", armado solo con los datos que pasaron.
  razones: [
    { titulo: "Desde 2006", texto: "Trabajamos en instalaciones eléctricas en CABA desde 2006." },
    { titulo: "Residencial y comercial", texto: "Hacemos trabajos en casas, departamentos y locales." },
    { titulo: "Equipo homologado", texto: "Hacemos las mediciones con equipos homologados." },
  ],

  direccion: "Av. Santa Fe 1624, CABA",
  mapa: "Av. Santa Fe 1624, C1060 CABA, Argentina",

  // Fotos reales: cuando las tengas, copialas a public/demos/modulo-tecnico/ y descomentá.
  // La sección "Trabajos" aparece sola.
  // fotos: [
  //   { src: "/demos/modulo-tecnico/tablero.webp", alt: "Tablero eléctrico terminado", ancho: 1200, alto: 1200 },
  // ],

  cierre: "¿Necesitás un electricista?",

  color: "#FFB81C",
  diseno: "circuito",
};

export default demo;
