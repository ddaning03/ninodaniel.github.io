import type { Demo } from "./types";

/* EJEMPLO con datos ficticios: negocio, teléfono, puntaje y reseñas inventados
   para mostrar la plantilla. No representa a ningún negocio real. */
const demo: Demo = {
  ejemplo: true,
  nombre: "Cerrajería Ejemplo",
  rubro: "Cerrajería",
  servicioPrincipal: "Cerrajería de urgencia las 24 horas",
  barrio: "Caballito",
  direccion: "Dirección de ejemplo, Caballito, CABA",
  mapa: "Parque Rivadavia, Caballito, Buenos Aires",
  horarios: [
    { dias: "Lunes a sábados", horas: "8 a 20 h" },
    { dias: "Urgencias", horas: "Todos los días, 24 h" },
  ],
  telefono: "11 0000-0000",
  whatsapp: "5491100000000",
  servicios: [
    { nombre: "Apertura de puertas", detalle: "Sin romper la cerradura, siempre que se pueda." },
    { nombre: "Cambio de cerraduras", detalle: "Comunes y de seguridad." },
    { nombre: "Copias de llaves", detalle: "Simples, de seguridad y de auto." },
    { nombre: "Apertura de autos" },
    { nombre: "Instalación de cerrojos y trabas" },
  ],
  cobertura: ["Caballito", "Almagro", "Flores", "Boedo", "Parque Chacabuco", "Villa Crespo"],
  google: { puntaje: 4.8, resenas: 126 },
  resenas: [
    { autor: "Reseña de ejemplo", estrellas: 5, texto: "Me quedé afuera un domingo a la noche y en 20 minutos estaban. Abrieron sin romper nada." },
    { autor: "Reseña de ejemplo", estrellas: 5, texto: "Cambiaron la cerradura de la puerta de entrada y me explicaron bien las opciones." },
    { autor: "Reseña de ejemplo", estrellas: 4, texto: "Rápidos y prolijos. Me pasaron el precio antes de empezar." },
  ],
  color: "#2563EB",
};

export default demo;
