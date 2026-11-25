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

  /* ───────── Opcionales de diseño y contenido extra ───────── */

  /** "oscuro" para fondo negro con detalles en el color principal. Por defecto "claro". */
  tema?: "claro" | "oscuro";
  /** "condensada" usa una tipografía técnica y angosta para títulos. Por defecto la del sitio. */
  fuente?: "sitio" | "condensada";
  /** Nombre corto para la franja superior y el título, por ejemplo "Radaelli". */
  nombreCorto?: string;
  /** Año desde el que trabaja. Solo si está confirmado; si no, se omite la línea. */
  desde?: string;
  /** Texto del botón principal de WhatsApp. Por defecto "Escribinos por WhatsApp". */
  textoBotonWhatsApp?: string;
  /** Mensaje prellenado del botón principal de WhatsApp. */
  mensajeWhatsApp?: string;
  /** Si es true, cada servicio lleva su propio botón de WhatsApp que menciona ese servicio. */
  whatsappPorServicio?: boolean;

  /** Foto de fondo del hero (un trabajo terminado). */
  heroImagen?: { src: string; alt: string };
  /** Fotos de trabajos para la galería. */
  fotos?: { src: string; alt: string; ancho: number; alto: number }[];
  /** Pasos de "Cómo trabajamos". */
  pasos?: { titulo: string; texto: string }[];

  /** Varias sucursales. Si está, reemplaza a dirección/mapa/horarios de arriba. */
  sucursales?: { nombre: string; direccion?: string; mapa?: string; horarios?: { dias: string; horas: string }[] }[];

  /** Título del bloque de cierre con botón de WhatsApp, por ejemplo "¿Tu auto necesita un arreglo?". */
  cierre?: string;
  /** Link al perfil de Instagram. Si está, el pie muestra links a Instagram y WhatsApp. */
  instagram?: string;
};
