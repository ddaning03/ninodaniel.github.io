import type { Demo } from "./types";

/*
 * Prospecto: Radaelli - Sacabollos & Detailing.
 * Fuentes: su Instagram (@sacabollosradaelli) y su página de Facebook.
 * Solo datos publicados por el negocio o confirmados por Daniel. Faltan, y por eso
 * no se muestran: año de inicio, horarios, dirección de Córdoba y reseñas de Google.
 */
const demo: Demo = {
  nombre: "Radaelli - Sacabollos & Detailing",
  nombreCorto: "Radaelli",
  rubro: "Taller de chapa, sacabollos y detailing",
  servicioPrincipal: "Sacabollos, chapa y detailing",
  // desde: "", // "SINCE 199_" en el logo: falta confirmar el año

  // Teléfono de Facebook; Daniel confirmó usarlo también para WhatsApp.
  telefono: "011 5833-8436",
  whatsapp: "5491158338436",
  textoBotonWhatsApp: "Pedí tu turno por WhatsApp",
  mensajeWhatsApp: "Hola, quiero consultar por un turno",
  whatsappPorServicio: true,

  // Servicios: los 5 del Instagram. Las líneas usan lo que dice su Facebook.
  servicios: [
    { nombre: "Sacabollos", detalle: "Sacamos abolladuras sin pintar: golpes de estacionamiento, granizo y más." },
    { nombre: "Chapa y pintura", detalle: "Reparamos la chapa y pintamos las partes dañadas." },
    { nombre: "Detailing", detalle: "Tratamientos acrílicos, cerámicos y de vidrio líquido." },
    { nombre: "Polarizados", detalle: "Polarizamos los vidrios de tu auto." },
    { nombre: "Reparación de llantas", detalle: "Reparamos llantas dañadas." },
  ],

  // Fotos recortadas de la grilla de su Instagram (baja resolución: reemplazar por originales).
  heroImagen: { src: "/demos/radaelli/suv-mate.webp", alt: "SUV gris mate en el taller de Radaelli, sobre piso a cuadros rojo y negro" },
  fotos: [
    { src: "/demos/radaelli/suv-mate.webp", alt: "SUV gris mate en el taller, sobre piso a cuadros rojo y negro", ancho: 279, alto: 276 },
    { src: "/demos/radaelli/deportivo.webp", alt: "Frente de un auto deportivo gris brillante que refleja las luces hexagonales del taller", ancho: 243, alto: 226 },
    { src: "/demos/radaelli/parrilla.webp", alt: "Detalle de la parrilla cromada de un auto azul", ancho: 278, alto: 276 },
    { src: "/demos/radaelli/puerta.webp", alt: "Panel interior de una puerta gris con desgaste cerca de la manija", ancho: 279, alto: 276 },
  ],

  // TEXTO A CONFIRMAR CON EL CLIENTE: es una propuesta de cómo explicar el proceso.
  pasos: [
    { titulo: "Mandanos fotos", texto: "Sacale fotos al auto y mandalas por WhatsApp." },
    { titulo: "Te pasamos el presupuesto", texto: "Lo revisamos y te decimos cuánto sale el arreglo." },
    { titulo: "Coordinamos el turno", texto: "Elegimos juntos el día para traer el auto." },
  ],

  // Solo Buenos Aires: la dirección figura en su Facebook. Córdoba no tiene dirección cargada.
  sucursales: [
    {
      nombre: "Buenos Aires",
      direccion: "José León Suárez 2678, Buenos Aires (CP 1440)",
      mapa: "José León Suárez 2678, C1440, Buenos Aires, Argentina",
    },
  ],

  cierre: "¿Tu auto necesita un arreglo?",
  instagram: "https://www.instagram.com/sacabollosradaelli/",

  color: "#A31515",
  diseno: "estudio",
  // Si se vuelve a la plantilla, estas dos opciones la dejan en oscuro y condensada:
  tema: "oscuro",
  fuente: "condensada",
};

export default demo;
