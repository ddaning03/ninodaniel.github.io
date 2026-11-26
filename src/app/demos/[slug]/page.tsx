import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Barlow_Condensed } from "next/font/google";
import { demos, type Demo } from "@content/demos";
import EditorialTaller from "./EditorialTaller";
import GarageTaller from "./GarageTaller";
import EstudioTaller from "./EstudioTaller";
import ConversionLocal from "./ConversionLocal";
import CircuitoElectrico from "./CircuitoElectrico";

/* Tipografía técnica y angosta, para demos con fuente: "condensada" */
const condensada = Barlow_Condensed({
  subsets: ["latin"], preload: false,
  weight: ["500", "600", "700"],
  variable: "--font-condensada",
});

/* Solo existen las demos registradas en content/demos/index.ts */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(demos).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = demos[slug];
  if (!d) return {};
  return {
    title: { absolute: `${d.nombreCorto ?? d.nombre} — Propuesta de diseño` },
    description: `Propuesta de página web para ${d.nombre}.`,
    // Las demos no se indexan ni aparecen en buscadores
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    openGraph: null,
    twitter: null,
  };
}

const MI_WHATSAPP = "5491167644591";

/* ─────────── Color y contraste ─────────── */
const rgb = (hex: string) => {
  const n = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};
const luminance = (hex: string) => {
  const [r, g, b] = rgb(hex).map((v) => v / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
/* Texto blanco o negro según qué contrasta mejor con el color */
const textOn = (hex: string) => (contrast(hex, "#FFFFFF") >= contrast(hex, "#111111") ? "#FFFFFF" : "#111111");
/* Aclara el color hasta que se lea como texto sobre el fondo (WCAG AA, 4.5:1) */
function readableOn(hex: string, bg: string) {
  const base = rgb(hex);
  for (let t = 0; t <= 1; t += 0.05) {
    const mixed = "#" + base.map((v) => Math.round(v + (255 - v) * t).toString(16).padStart(2, "0")).join("");
    if (contrast(mixed, bg) >= 4.5) return mixed;
  }
  return "#FFFFFF";
}

const has = <T,>(v: T[] | undefined): v is T[] => Array.isArray(v) && v.length > 0;
const waLink = (num: string, text: string) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;

/* ─────────── Temas ─────────── */
const DARK_BG = "#0B0B0C";
const THEMES = {
  claro: {
    page: "bg-white text-zinc-900",
    border: "border-zinc-200",
    muted: "text-zinc-600",
    subtle: "text-zinc-500",
    card: "border border-zinc-200",
    soft: "bg-zinc-50",
    bar: "bg-white/95 border-zinc-200",
  },
  oscuro: {
    page: `bg-[#0B0B0C] text-zinc-100`,
    border: "border-white/10",
    muted: "text-zinc-300",
    subtle: "text-zinc-400",
    card: "border border-white/10 bg-white/[0.03]",
    soft: "bg-white/[0.05]",
    bar: "bg-[#0B0B0C]/95 border-white/10",
  },
} as const;

/* ─────────── Íconos (SVG en línea, sin librerías) ─────────── */
function IconWhatsApp({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.006L0 24l6.132-1.61c1.742.951 3.71 1.453 5.712 1.454h.005c6.635 0 12.043-5.411 12.047-12.046a11.812 11.812 0 00-3.29-8.412" />
    </svg>
  );
}
function IconPhone({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconInstagram({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function Stars({ value, color, off }: { value: number; color: string; off: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value.toString().replace(".", ",")} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill={i <= Math.round(value) ? color : off} aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

type SectionProps = {
  title: string;
  id?: string;
  border: string;
  condensed: boolean;
  headingFont?: React.CSSProperties;
  children: React.ReactNode;
};

function Section({ title, id, border, condensed, headingFont, children }: SectionProps) {
  return (
    <section id={id} className={`px-5 py-10 sm:px-8 border-t ${border}`}>
      <div className="max-w-3xl mx-auto">
        <h2
          className={`text-xl sm:text-2xl font-bold mb-6 ${condensed ? "uppercase tracking-wide text-2xl sm:text-3xl" : "tracking-tight"}`}
          style={headingFont}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

/* ─────────── Página ─────────── */
export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d: Demo | undefined = demos[slug];
  if (!d) notFound();

  /* Diseño propio para talleres (ficha técnica). El resto usa la plantilla. */
  if (d.diseno === "editorial") return <EditorialTaller d={d} />;
  if (d.diseno === "garage") return <GarageTaller d={d} />;
  if (d.diseno === "estudio") return <EstudioTaller d={d} />;
  if (d.diseno === "conversion") return <ConversionLocal d={d} />;
  if (d.diseno === "circuito") return <CircuitoElectrico d={d} />;

  const dark = d.tema === "oscuro";
  const t = THEMES[dark ? "oscuro" : "claro"];
  const onColor = textOn(d.color);
  /* Color principal usado como texto: en tema oscuro se aclara hasta tener contraste AA */
  const accentText = dark ? readableOn(d.color, DARK_BG) : d.color;
  const headingFont = d.fuente === "condensada" ? { fontFamily: "var(--font-condensada), var(--font-inter), sans-serif" } : undefined;
  const headingCase = d.fuente === "condensada" ? "uppercase tracking-wide" : "tracking-tight";
  const short = d.nombreCorto ?? d.nombre;

  const wa = d.whatsapp ? waLink(d.whatsapp, d.mensajeWhatsApp ?? `¡Hola ${d.nombre}! Quería hacer una consulta.`) : null;
  const tel = d.telefono ? `tel:${d.telefono.replace(/[^\d+]/g, "")}` : null;
  const propuestaWa = waLink(MI_WHATSAPP, `¡Hola Daniel! Vi la propuesta de diseño para ${short}.`);
  const showReviews = !!d.google || has(d.resenas);

  /* Botón principal de WhatsApp: verde en tema claro; color de la marca en tema oscuro */
  const waStyle = dark ? { backgroundColor: d.color, color: onColor } : undefined;
  const waClass = dark ? "" : "bg-[#25D366] text-white";

  /* Ubicaciones: varias sucursales o la dirección única de siempre */
  const singleMap = d.mapa || [d.direccion, d.barrio].filter(Boolean).join(", ");
  const locations = has(d.sucursales)
    ? d.sucursales.filter((s) => s.direccion || s.mapa)
    : singleMap || has(d.horarios)
      ? [{ nombre: "", direccion: d.direccion, mapa: singleMap, horarios: d.horarios }]
      : [];

  /* Props de estilo compartidas por todas las secciones */
  const sec = { border: t.border, condensed: d.fuente === "condensada", headingFont };

  return (
    <div
      className={`min-h-screen ${t.page} pb-24 sm:pb-0 ${d.fuente === "condensada" ? condensada.variable : ""}`}
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      {/* Franja fija: propuesta de diseño */}
      <div className="fixed top-0 inset-x-0 z-50 bg-zinc-900 text-white/80 text-[11px] sm:text-xs">
        <div className="max-w-3xl mx-auto px-4 py-1.5 flex items-center justify-center gap-1 text-center">
          <span>
            {d.ejemplo && <strong className="text-amber-300 font-semibold">Ejemplo con datos ficticios · </strong>}
            Propuesta de diseño para {short} · por{" "}
            <a href={propuestaWa} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">
              Daniel Niño
            </a>
          </span>
        </div>
      </div>

      <main className="pt-8">
        {/* Hero */}
        <header
          className={`relative overflow-hidden px-5 sm:px-8 ${d.heroImagen ? "pt-24 pb-14 sm:pt-32 sm:pb-20 min-h-[70svh] flex items-end" : "pt-12 pb-10 sm:pt-16"}`}
          style={d.heroImagen ? { color: "#FFFFFF" } : { backgroundColor: d.color, color: onColor }}
        >
          {d.heroImagen && (
            <>
              <Image src={d.heroImagen.src} alt={d.heroImagen.alt} fill priority sizes="100vw" className="object-cover scale-110 blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-black/75 to-black/60" />
              <div className="absolute left-0 inset-y-0 w-1.5" style={{ backgroundColor: d.color }} aria-hidden="true" />
            </>
          )}
          <div className="relative max-w-3xl mx-auto w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
              {d.rubro}
              {d.barrio && ` · ${d.barrio}`}
            </p>
            <h1
              className={`mt-3 font-extrabold ${d.fuente === "condensada" ? "leading-[1.02] text-5xl sm:text-7xl uppercase tracking-wide" : "text-4xl sm:text-5xl tracking-tight leading-[1.05]"}`}
              style={headingFont}
            >
              {d.nombre}
            </h1>
            {d.servicioPrincipal && (
              <p className="mt-4 text-lg sm:text-xl opacity-90">
                {d.servicioPrincipal}
                {d.desde && <span className="block mt-1 text-sm uppercase tracking-[0.2em] opacity-80">Desde {d.desde}</span>}
              </p>
            )}

            {d.google && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/95 text-zinc-900 px-3 py-1.5 text-sm font-medium">
                <Stars value={d.google.puntaje} color="#F59E0B" off="#D4D4D8" />
                {d.google.puntaje.toString().replace(".", ",")} · {d.google.resenas} reseñas en Google
              </p>
            )}

            {(wa || tel) && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-3 rounded-2xl text-lg font-bold py-4 shadow-lg active:scale-[0.98] transition-transform ${waClass}`}
                    style={waStyle}
                  >
                    <IconWhatsApp /> {d.textoBotonWhatsApp ?? "Escribinos por WhatsApp"}
                  </a>
                )}
                {tel && (
                  <a
                    href={tel}
                    className={`flex items-center justify-center gap-3 rounded-2xl text-lg font-bold py-4 shadow-lg active:scale-[0.98] transition-transform ${dark ? "border border-white/30 text-white hover:bg-white/10" : "bg-white text-zinc-900"}`}
                  >
                    <IconPhone /> Llamar {d.telefono}
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {has(d.servicios) && (
          <Section {...sec} title="Servicios" id="servicios">
            <ul className="grid gap-3 sm:grid-cols-2">
              {d.servicios.map((s) => (
                <li key={s.nombre} className={`rounded-2xl p-4 flex flex-col ${t.card} ${dark ? "border-l-2" : ""}`} style={dark ? { borderLeftColor: d.color } : undefined}>
                  <p className={`font-semibold flex items-start gap-2 ${d.fuente === "condensada" ? "text-xl uppercase tracking-wide" : ""}`} style={headingFont}>
                    {!dark && <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} aria-hidden="true" />}
                    {s.nombre}
                  </p>
                  {s.detalle && <p className={`mt-1 ${dark ? "" : "pl-4"} text-sm ${t.muted}`}>{s.detalle}</p>}
                  {d.whatsappPorServicio && d.whatsapp && (
                    <a
                      href={waLink(d.whatsapp, `Hola, quiero consultar por el servicio de ${s.nombre}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 self-start rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{ backgroundColor: d.color, color: onColor }}
                      aria-label={`Consultar por ${s.nombre} por WhatsApp`}
                    >
                      <IconWhatsApp className="w-4 h-4" /> Consultar
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {has(d.fotos) && (
          <Section {...sec} title="Trabajos" id="trabajos">
            {/* Celular: carrusel deslizable con scroll-snap. Escritorio: grilla */}
            <ul className="-mx-5 px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0" aria-label="Galería de trabajos">
              {d.fotos.map((f) => (
                <li key={f.src} className="snap-start shrink-0 w-[78%] sm:w-auto">
                  <div className={`relative aspect-square overflow-hidden rounded-2xl ${t.soft}`}>
                    <Image src={f.src} alt={f.alt} fill sizes="(max-width: 640px) 78vw, 384px" className="object-cover" />
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {has(d.pasos) && (
          <Section {...sec} title="Cómo trabajamos" id="como-trabajamos">
            <ol className="grid gap-3 sm:grid-cols-3">
              {d.pasos.map((p, i) => (
                <li key={p.titulo} className={`rounded-2xl p-5 ${t.card}`}>
                  <span className="text-3xl font-bold" style={{ ...headingFont, color: accentText }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={`mt-2 font-semibold ${d.fuente === "condensada" ? "text-lg uppercase tracking-wide" : ""}`} style={headingFont}>
                    {p.titulo}
                  </p>
                  <p className={`mt-1 text-sm ${t.muted}`}>{p.texto}</p>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {showReviews && (
          <Section {...sec} title="Lo que dicen en Google">
            {d.google && (
              <p className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-extrabold">{d.google.puntaje.toString().replace(".", ",")}</span>
                <span>
                  <Stars value={d.google.puntaje} color="#F59E0B" off={dark ? "#3F3F46" : "#D4D4D8"} />
                  <span className={`block text-sm ${t.muted}`}>{d.google.resenas} reseñas</span>
                </span>
              </p>
            )}
            {has(d.resenas) && (
              <ul className="grid gap-3">
                {d.resenas.map((r, i) => (
                  <li key={i} className={`rounded-2xl p-5 ${t.soft}`}>
                    {r.estrellas && <Stars value={r.estrellas} color="#F59E0B" off={dark ? "#3F3F46" : "#D4D4D8"} />}
                    <p className={`mt-2 ${dark ? "text-zinc-100" : "text-zinc-800"}`}>“{r.texto}”</p>
                    <p className={`mt-2 text-sm ${t.subtle}`}>{r.autor}</p>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}

        {has(d.cobertura) && (
          <Section {...sec} title="Zona de cobertura">
            <ul className="flex flex-wrap gap-2">
              {d.cobertura.map((z) => (
                <li
                  key={z}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={{ backgroundColor: `${d.color}14`, color: dark ? "#F4F4F5" : "#18181b", border: `1px solid ${d.color}40` }}
                >
                  {z}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {locations.length > 0 && (
          <Section {...sec} title={has(d.sucursales) && d.sucursales.length > 1 ? "Sucursales" : "Dónde estamos"} id="ubicacion">
            <div className="grid gap-10">
              {locations.map((l) => (
                <div key={l.nombre || "unica"}>
                  {l.nombre && (
                    <h3 className={`text-lg font-semibold mb-1 ${d.fuente === "condensada" ? "uppercase tracking-wide text-xl" : ""}`} style={{ ...headingFont, color: dark ? accentText : undefined }}>
                      {l.nombre}
                    </h3>
                  )}
                  {l.direccion && <p className="font-medium mb-4">{l.direccion}</p>}
                  {l.mapa && (
                    <div className={`rounded-2xl overflow-hidden border aspect-[4/3] sm:aspect-[16/9] ${t.border} ${dark ? "bg-zinc-900" : "bg-zinc-100"}`}>
                      <iframe
                        title={`Mapa: ${d.nombre}${l.nombre ? ` — ${l.nombre}` : ""}`}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(l.mapa)}&output=embed`}
                        className="w-full h-full"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  )}
                  {has(l.horarios) && (
                    <dl className={`mt-6 divide-y rounded-2xl border ${t.border} ${dark ? "divide-white/10" : "divide-zinc-200"}`}>
                      {l.horarios.map((h) => (
                        <div key={h.dias} className="flex justify-between gap-4 px-4 py-3">
                          <dt className={t.muted}>{h.dias}</dt>
                          <dd className="font-semibold text-right">{h.horas}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {d.cierre && wa && (
          <section className={`px-5 py-14 sm:px-8 border-t ${t.border} text-center`}>
            <div className="max-w-3xl mx-auto">
              <h2 className={`text-3xl sm:text-4xl font-bold ${headingCase}`} style={headingFont}>
                {d.cierre}
              </h2>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center justify-center gap-3 rounded-2xl text-lg font-bold px-8 py-4 shadow-lg active:scale-[0.98] transition-transform ${waClass}`}
                style={waStyle}
              >
                <IconWhatsApp /> {d.textoBotonWhatsApp ?? "Escribinos por WhatsApp"}
              </a>
            </div>
          </section>
        )}

        <footer className={`px-5 py-10 sm:px-8 border-t ${t.border} text-center text-sm ${t.subtle}`}>
          <p>
            {d.nombre}
            {d.barrio && ` · ${d.barrio}`}
          </p>
          {/* Links del pie: solo en demos con redes cargadas */}
          {d.instagram && (
            <p className="mt-4 flex items-center justify-center gap-6">
              {(
                <a href={d.instagram} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 underline-offset-4 hover:underline ${dark ? "text-zinc-200" : "text-zinc-700"}`}>
                  <IconInstagram /> Instagram
                </a>
              )}
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 underline-offset-4 hover:underline ${dark ? "text-zinc-200" : "text-zinc-700"}`}>
                  <IconWhatsApp className="w-5 h-5" /> WhatsApp
                </a>
              )}
            </p>
          )}
        </footer>
      </main>

      {/* Barra fija de contacto en celular */}
      {(wa || tel) && (
        <nav aria-label="Contacto rápido" className={`sm:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-2 p-3 backdrop-blur border-t ${t.bar}`}>
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-xl font-bold py-3 ${tel ? "" : "col-span-2"} ${waClass}`}
              style={waStyle}
            >
              <IconWhatsApp className="w-5 h-5" /> WhatsApp
            </a>
          ) : null}
          {tel ? (
            <a
              href={tel}
              className={`flex items-center justify-center gap-2 rounded-xl font-bold py-3 ${wa ? "" : "col-span-2"} ${dark ? "border border-white/30 text-white" : ""}`}
              style={dark ? undefined : { backgroundColor: d.color, color: onColor }}
            >
              <IconPhone className="w-5 h-5" /> Llamar
            </a>
          ) : null}
        </nav>
      )}
    </div>
  );
}
