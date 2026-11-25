/* Utilidades compartidas por los diseños de demos. */

export const MI_WHATSAPP = "5491167644591";

export const has = <T,>(v: T[] | undefined): v is T[] => Array.isArray(v) && v.length > 0;

export const waLink = (num: string, text: string) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;

export const telLink = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const mapsSearch = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const rgb = (hex: string) => {
  const n = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};

const luminance = (hex: string) => {
  const [r, g, b] = rgb(hex)
    .map((v) => v / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrast = (a: string, b: string) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/** Aclara el color hasta que se lea como texto sobre el fondo (WCAG AA, 4.5:1). */
export function readableOn(hex: string, bg: string) {
  const base = rgb(hex);
  for (let t = 0; t <= 1; t += 0.05) {
    const mixed = "#" + base.map((v) => Math.round(v + (255 - v) * t).toString(16).padStart(2, "0")).join("");
    if (contrast(mixed, bg) >= 4.5) return mixed;
  }
  return "#FFFFFF";
}
