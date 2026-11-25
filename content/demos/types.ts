/*
 * Datos de una demo para un prospecto.
 * REGLA: la plantilla solo muestra lo que está acá. Si un campo opcional
 * no está o está vacío, su sección no aparece. No hay campos de precios,
 * años de experiencia ni nada que haya que inventar.
 */
export type Demo = {
  /** Si es true, la franja superior aclara "Ejemplo con datos ficticios". */
  ejemplo?: boolean;

  /** Nombre del negocio, tal cual aparece en Google. */
  nombre: string;
  /** Rubro, por ejemplo "Cerrajería". */
  rubro: string;
  /** Servicio principal, para el título del hero. */
  servicioPrincipal?: string;
  /** Barrio, por ejemplo "Caballito". */
  barrio?: string;
  /** Dirección como se muestra en pantalla. */
  direccion?: string;
  /** Texto para ubicar el mapa. Si falta, se usa dirección + barrio. */
  mapa?: string;

  /** Horarios, uno por renglón. */
  horarios?: { dias: string; horas: string }[];

  /** Teléfono como se muestra, por ejemplo "11 4567-8900". */
  telefono?: string;
  /** WhatsApp solo con dígitos y código de país, por ejemplo "5491145678900". */
  whatsapp?: string;

  /** Servicios, con un detalle corto opcional. */
  servicios?: { nombre: string; detalle?: string }[];
  /** Barrios o zonas que cubre. */
  cobertura?: string[];

  /** Puntaje y cantidad de reseñas en Google, copiados de su ficha. */
  google?: { puntaje: number; resenas: number };
  /** 2 o 3 reseñas reales, copiadas textuales de Google. */
  resenas?: { autor: string; texto: string; estrellas?: number }[];

  /** Color principal en hexadecimal, por ejemplo "#2563EB". */
  color: string;
};
