/*
 * Registro de demos. Cada entrada genera la página /demos/<slug>.
 * Para sumar una demo: creá content/demos/<slug>.ts y agregala acá abajo.
 */
import type { Demo } from "./types";
import cerrajeriaEjemplo from "./cerrajeria-ejemplo";
import tallerEjemplo from "./taller-ejemplo";

export const demos: Record<string, Demo> = {
  "cerrajeria-ejemplo": cerrajeriaEjemplo,
  "taller-ejemplo": tallerEjemplo,
};

export type { Demo };
