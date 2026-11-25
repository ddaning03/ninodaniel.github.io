import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demos, type Demo } from "@content/demos";

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
    title: { absolute: `${d.nombre} — Propuesta de diseño` },
    description: `Propuesta de página web para ${d.nombre}.`,
    // Las demos no se indexan ni aparecen en buscadores
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    openGraph: null,
    twitter: null,
  };
}

const MI_WHATSAPP = "5491167644591";

/* Texto blanco o negro según qué contrasta mejor con el color principal */
function textOn(hex: string) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  );
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.4 ? "#111111" : "#FFFFFF";
}

const has = <T,>(v: T[] | undefined): v is T[] => Array.isArray(v) && v.length > 0;

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
function Stars({ value, color }: { value: number; color: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value.toString().replace(".", ",")} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill={i <= Math.round(value) ? color : "#D4D4D8"} aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="px-5 py-10 sm:px-8 border-t border-zinc-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">{title}</h2>
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

  const onColor = textOn(d.color);
  const wa = d.whatsapp ? `https://wa.me/${d.whatsapp}?text=${encodeURIComponent(`¡Hola ${d.nombre}! Quería hacer una consulta.`)}` : null;
  const tel = d.telefono ? `tel:${d.telefono.replace(/[^\d+]/g, "")}` : null;
  const mapQuery = d.mapa || [d.direccion, d.barrio].filter(Boolean).join(", ");
  const propuestaWa = `https://wa.me/${MI_WHATSAPP}?text=${encodeURIComponent(`¡Hola Daniel! Vi la propuesta de diseño para ${d.nombre}.`)}`;
  const showReviews = !!d.google || has(d.resenas);

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-24 sm:pb-0" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      {/* Franja fija: propuesta de diseño */}
      <div className="fixed top-0 inset-x-0 z-50 bg-zinc-900 text-white/80 text-[11px] sm:text-xs">
        <div className="max-w-3xl mx-auto px-4 py-1.5 flex items-center justify-center gap-1 text-center">
          <span>
            {d.ejemplo && <strong className="text-amber-300 font-semibold">Ejemplo con datos ficticios · </strong>}
            Propuesta de diseño para {d.nombre} · por{" "}
            <a href={propuestaWa} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">
              Daniel Niño
            </a>
          </span>
        </div>
      </div>

      <main className="pt-8">
        {/* Hero */}
        <header className="px-5 pt-12 pb-10 sm:px-8 sm:pt-16" style={{ backgroundColor: d.color, color: onColor }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
              {d.rubro}
              {d.barrio && ` · ${d.barrio}`}
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">{d.nombre}</h1>
            {d.servicioPrincipal && <p className="mt-4 text-lg sm:text-xl opacity-90">{d.servicioPrincipal}</p>}

            {d.google && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/95 text-zinc-900 px-3 py-1.5 text-sm font-medium">
                <Stars value={d.google.puntaje} color="#F59E0B" />
                {d.google.puntaje.toString().replace(".", ",")} · {d.google.resenas} reseñas en Google
              </p>
            )}

            {(wa || tel) && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] text-white text-lg font-bold py-4 shadow-lg active:scale-[0.98] transition-transform">
                    <IconWhatsApp /> Escribinos por WhatsApp
                  </a>
                )}
                {tel && (
                  <a href={tel} className="flex items-center justify-center gap-3 rounded-2xl bg-white text-zinc-900 text-lg font-bold py-4 shadow-lg active:scale-[0.98] transition-transform">
                    <IconPhone /> Llamar {d.telefono}
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {has(d.servicios) && (
          <Section title="Servicios">
            <ul className="grid gap-3 sm:grid-cols-2">
              {d.servicios.map((s) => (
                <li key={s.nombre} className="rounded-2xl border border-zinc-200 p-4">
                  <p className="font-semibold flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} aria-hidden="true" />
                    {s.nombre}
                  </p>
                  {s.detalle && <p className="mt-1 pl-4 text-sm text-zinc-600">{s.detalle}</p>}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {showReviews && (
          <Section title="Lo que dicen en Google">
            {d.google && (
              <p className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-extrabold">{d.google.puntaje.toString().replace(".", ",")}</span>
                <span>
                  <Stars value={d.google.puntaje} color="#F59E0B" />
                  <span className="block text-sm text-zinc-600">{d.google.resenas} reseñas</span>
                </span>
              </p>
            )}
            {has(d.resenas) && (
              <ul className="grid gap-3">
                {d.resenas.map((r, i) => (
                  <li key={i} className="rounded-2xl bg-zinc-50 p-5">
                    {r.estrellas && <Stars value={r.estrellas} color="#F59E0B" />}
                    <p className="mt-2 text-zinc-800">“{r.texto}”</p>
                    <p className="mt-2 text-sm text-zinc-500">{r.autor}</p>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}

        {has(d.cobertura) && (
          <Section title="Zona de cobertura">
            <ul className="flex flex-wrap gap-2">
              {d.cobertura.map((z) => (
                <li key={z} className="rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: `${d.color}14`, color: "#18181b", border: `1px solid ${d.color}40` }}>
                  {z}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {(mapQuery || has(d.horarios)) && (
          <Section title="Dónde estamos">
            {d.direccion && <p className="font-medium mb-4">{d.direccion}</p>}
            {mapQuery && (
              <div className="rounded-2xl overflow-hidden border border-zinc-200 aspect-[4/3] sm:aspect-[16/9] bg-zinc-100">
                <iframe
                  title={`Mapa: ${d.nombre}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            )}
            {has(d.horarios) && (
              <dl className="mt-6 divide-y divide-zinc-200 rounded-2xl border border-zinc-200">
                {d.horarios.map((h) => (
                  <div key={h.dias} className="flex justify-between gap-4 px-4 py-3">
                    <dt className="text-zinc-600">{h.dias}</dt>
                    <dd className="font-semibold text-right">{h.horas}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Section>
        )}

        <footer className="px-5 py-10 sm:px-8 border-t border-zinc-200 text-center text-sm text-zinc-500">
          {d.nombre}
          {d.barrio && ` · ${d.barrio}`}
        </footer>
      </main>

      {/* Barra fija de contacto en celular */}
      {(wa || tel) && (
        <nav aria-label="Contacto rápido" className="sm:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-2 p-3 bg-white/95 backdrop-blur border-t border-zinc-200">
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-bold py-3 ${tel ? "" : "col-span-2"}`}>
              <IconWhatsApp className="w-5 h-5" /> WhatsApp
            </a>
          ) : null}
          {tel ? (
            <a href={tel} className={`flex items-center justify-center gap-2 rounded-xl font-bold py-3 ${wa ? "" : "col-span-2"}`} style={{ backgroundColor: d.color, color: onColor }}>
              <IconPhone className="w-5 h-5" /> Llamar
            </a>
          ) : null}
        </nav>
      )}
    </div>
  );
}
