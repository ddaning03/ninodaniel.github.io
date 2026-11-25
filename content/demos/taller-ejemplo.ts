import type { Demo } from "./types";

/* EJEMPLO con datos ficticios: negocio y teléfono inventados para mostrar la
   plantilla. No representa a ningún negocio real.
   A propósito no tiene puntaje ni reseñas: esa sección no se muestra. */
const demo: Demo = {
  ejemplo: true,
  nombre: "Taller Mecánico Ejemplo",
  rubro: "Taller mecánico",
  servicioPrincipal: "Mecánica general y service para tu auto",
  barrio: "Flores",
  direccion: "Dirección de ejemplo, Flores, CABA",
  mapa: "Plaza Flores, Buenos Aires",
  horarios: [
    { dias: "Lunes a viernes", horas: "8 a 18 h" },
    { dias: "Sábados", horas: "8 a 13 h" },
  ],
  telefono: "11 0000-0001",
  whatsapp: "5491100000001",
  servicios: [
    { nombre: "Service y cambio de aceite" },
    { nombre: "Frenos", detalle: "Pastillas, discos y líquido." },
    { nombre: "Tren delantero y suspensión" },
    { nombre: "Diagnóstico computarizado" },
    { nombre: "Embrague" },
  ],
  cobertura: ["Flores", "Floresta", "Caballito", "Parque Avellaneda", "Vélez Sarsfield"],
  color: "#C2410C",
};

export default demo;
