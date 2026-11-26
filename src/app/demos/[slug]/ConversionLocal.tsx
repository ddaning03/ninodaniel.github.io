import Image from "next/image";
import type { Demo } from "@content/demos";
import { MI_WHATSAPP, has, waLink, telLink, mapsSearch } from "@/lib/demo-utils";

/*
 * Diseño "conversion": landing para tráfico de anuncios (Google Ads).
 * Prioridades: entender en 5 segundos qué hacen y contactar en un toque.
 * - Sin fuentes extra (usa la Inter que ya carga el sitio), sin animaciones ni JS propio.
 * - Hero tipográfico con los dos botones visibles sin scroll en el celular.
 * - Cada botón de WhatsApp lleva data-origen para medir qué convierte (Vercel Analytics).
 * Igual que la plantilla: solo muestra lo que está en el archivo de datos.
 */

const NAVY = "#0E1A2B";
const MUTED = "#4A5361"; /* 7,9:1 sobre blanco */
const BG = "#F4F6F8";

/* ─────────── Íconos lineales ─────────── */
function Svg({ children, className = "w-7 h-7" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const icons = {
  rayo: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  llave: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3.5 17.5a2 2 0 0 0 3 3l5.8-5.8a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.6-.6-.6-2.6z" />,
  lampara: (<><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z" /></>),
  toma: (<><rect x="4" y="4" width="16" height="16" rx="3.5" /><path d="M9.5 9v3M14.5 9v3" /><path d="M10.3 16a1.7 1.7 0 0 1 3.4 0" /></>),
  tierra: (<><path d="M12 3v9" /><path d="M5.5 12h13M8 15.5h8M10.5 19h3" /></>),
  medidor: (<><path d="M4 15a8 8 0 0 1 16 0" /><path d="M12 15l3.6-4.4" /><circle cx="12" cy="15" r="1.2" /><path d="M4 19h16" /></>),
  ventilador: (<><circle cx="12" cy="12" r="1.7" /><path d="M12 10.3c-.6-3.5.5-6.6 2.6-6.6 1.8 0 1.5 3.6-1.3 6.9" /><path d="M12 10.3c-.6-3.5.5-6.6 2.6-6.6 1.8 0 1.5 3.6-1.3 6.9" transform="rotate(120 12 12)" /><path d="M12 10.3c-.6-3.5.5-6.6 2.6-6.6 1.8 0 1.5 3.6-1.3 6.9" transform="rotate(240 12 12)" /></>),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  pin: (<><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  tel: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6 8.5-6" /></>),
};
function iconFor(nombre: string) {
  const n = nombre.toLowerCase();
  if (n.includes("mantenim")) return icons.llave;
  if (n.includes("artefact") || n.includes("montaje")) return icons.lampara;
  if (n.includes("instalac")) return icons.toma;
  if (n.includes("tierra")) return icons.tierra;
  if (n.includes("medic")) return icons.medidor;
  if (n.includes("ventilad")) return icons.ventilador;
  return icons.rayo;
}
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.006L0 24l6.132-1.61c1.742.951 3.71 1.453 5.712 1.454h.005c6.635 0 12.043-5.411 12.047-12.046a11.812 11.812 0 00-3.29-8.412" />
    </svg>
  );
}

/* ─────────── Botones ─────────── */
type BtnProps = { href: string; accent: string; origen: string; children: React.ReactNode; className?: string };
function BtnWhatsApp({ href, accent, origen, children, className = "" }: BtnProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-origen={origen}
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-[17px] font-bold shadow-[0_2px_0_rgba(14,26,43,.25)] transition-transform active:scale-[0.98] hover:-translate-y-px ${className}`}
      style={{ backgroundColor: accent, color: NAVY }}
    >
      <WhatsAppIcon className="w-6 h-6" />
      {children}
    </a>
  );
}
function BtnLlamar({ href, children, className = "", dark = false }: { href: string; children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-[17px] font-bold transition-transform active:scale-[0.98] hover:-translate-y-px ${dark ? "bg-white text-[#0E1A2B]" : "text-white"} ${className}`}
      style={dark ? undefined : { backgroundColor: NAVY }}
    >
      <Svg className="w-5 h-5">{icons.tel}</Svg>
      {children}
    </a>
  );
}

function SectionTitle({ kicker, title, id, accent, light = false }: { kicker: string; title: string; id: string; accent: string; light?: boolean }) {
  return (
    <div>
      <p className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] ${light ? "text-white/80" : ""}`} style={light ? undefined : { color: MUTED }}>
        <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: accent }} aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={id} className={`mt-2 text-[1.75rem] sm:text-4xl font-extrabold tracking-[-0.02em] leading-tight ${light ? "text-white" : ""}`} style={light ? undefined : { color: NAVY }}>
        {title}
      </h2>
    </div>
  );
}

/* ─────────── Diseño ─────────── */
export default function ConversionLocal({ d }: { d: Demo }) {
  const accent = d.color;
  const [marca, linea] = d.nombre.includes(" · ") ? d.nombre.split(" · ") : [d.nombreCorto ?? d.nombre, ""];
  const short = d.nombreCorto ?? marca;

  const waMsg = d.mensajeWhatsApp ?? "Hola, quería hacer una consulta.";
  const wa = d.whatsapp ? waLink(d.whatsapp, waMsg) : null;
  const tel = d.telefono ? telLink(d.telefono) : null;
  const ctaText = d.textoBotonWhatsApp ?? "Escribinos por WhatsApp";
  const propuesta = waLink(MI_WHATSAPP, `¡Hola Daniel! Vi la propuesta de diseño para ${short}.`);
  const mapQ = d.mapa || [d.direccion, d.barrio].filter(Boolean).join(", ");

  /* Titular: resalta "desde AAAA" si aparece en el texto */
  const titular = d.titular ?? d.servicioPrincipal ?? d.rubro;
  const m = d.desde ? titular.match(new RegExp(`(desde ${d.desde})`, "i")) : null;
  const [antes, despues] = m ? [titular.slice(0, m.index), titular.slice((m.index ?? 0) + m[0].length)] : [titular, ""];

  return (
    <div className="min-h-screen antialiased pb-24 sm:pb-0" style={{ backgroundColor: BG, color: NAVY, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      {/* Franja: propuesta de diseño */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#0E1A2B] text-[11px] sm:text-xs text-white/75">
        <p className="px-4 py-1.5 text-center">
          {d.ejemplo && <strong className="text-amber-300 font-semibold">Ejemplo con datos ficticios · </strong>}
          Propuesta de diseño para {short} · por{" "}
          <a href={propuesta} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">
            Daniel Niño
          </a>
        </p>
      </div>

      {/* ─── Hero ─── */}
      <header
        className="relative overflow-hidden border-b border-[#0E1A2B]/10 bg-white pt-7"
        style={{
          backgroundImage: "linear-gradient(rgba(14,26,43,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(14,26,43,.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          {/* Marca + teléfono */}
          <div className="flex items-center justify-between py-4">
            <p className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ backgroundColor: NAVY, color: accent }}>
                <Svg className="w-5 h-5" >{icons.rayo}</Svg>
              </span>
              <span className="leading-tight">
                <span className="block text-[15px] font-extrabold tracking-tight">{marca}</span>
                {linea && <span className="block text-xs font-medium" style={{ color: MUTED }}>{linea}</span>}
              </span>
            </p>
            {tel && (
              <a href={tel} className="inline-flex items-center gap-2 rounded-lg border border-[#0E1A2B]/15 bg-white px-3 py-2 text-sm font-semibold" aria-label={`Llamar al ${d.telefono}`}>
                <Svg className="w-4 h-4">{icons.tel}</Svg>
                <span className="hidden sm:inline">{d.telefono}</span>
              </a>
            )}
          </div>

          <div className="pt-6 pb-10 sm:pt-14 sm:pb-16 max-w-3xl">
            <h1 className="text-[2.5rem] leading-[1.05] sm:text-6xl font-extrabold tracking-[-0.03em]">
              {antes}
              {m && (
                <span className="relative whitespace-nowrap">
                  <span className="absolute inset-x-[-0.1em] bottom-[0.06em] h-[0.34em] -z-0 rounded-sm" style={{ backgroundColor: accent }} aria-hidden="true" />
                  <span className="relative">{m[1]}</span>
                </span>
              )}
              {despues}
            </h1>
            {d.bajada && <p className="mt-4 text-lg sm:text-xl leading-snug" style={{ color: MUTED }}>{d.bajada}</p>}

            {(wa || tel) && (
              <div className="mt-7 grid gap-3 sm:flex">
                {wa && (
                  <BtnWhatsApp href={wa} accent={accent} origen="hero">
                    {ctaText}
                  </BtnWhatsApp>
                )}
                {tel && <BtnLlamar href={tel}>Llamar</BtnLlamar>}
              </div>
            )}

            {/* Datos de confianza: los títulos de "por qué elegirnos" */}
            {has(d.razones) && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold">
                {d.razones.map((r) => (
                  <li key={r.titulo} className="inline-flex items-center gap-1.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full" style={{ backgroundColor: accent }}>
                      <Svg className="w-3.5 h-3.5 [stroke-width:2.6]">{icons.check}</Svg>
                    </span>
                    {r.titulo}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* ─── Servicios ─── */}
        {has(d.servicios) && (
          <section className="px-5 sm:px-8 py-14 sm:py-20" aria-labelledby="servicios">
            <div className="mx-auto max-w-5xl">
              <SectionTitle kicker="Servicios" title="¿Qué necesitás?" id="servicios" accent={accent} />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {d.servicios.map((s) => (
                  <li key={s.nombre} className="flex flex-col rounded-2xl border border-[#0E1A2B]/10 bg-white p-5">
                    <div className="flex items-start gap-4 mb-5">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: NAVY, color: accent }}>
                        <Svg>{iconFor(s.nombre)}</Svg>
                      </span>
                      <div>
                        <h3 className="text-lg font-bold leading-snug">{s.nombre}</h3>
                        {s.detalle && <p className="mt-1 text-[15px] leading-relaxed" style={{ color: MUTED }}>{s.detalle}</p>}
                      </div>
                    </div>
                    {d.whatsappPorServicio && d.whatsapp && (
                      <a
                        href={waLink(d.whatsapp, `Hola, quiero consultar por ${s.nombre.toLowerCase()}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-origen={`servicio: ${s.nombre}`}
                        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-[15px] font-bold transition-colors hover:bg-[#0E1A2B] hover:text-white"
                        style={{ borderColor: NAVY }}
                        aria-label={`Consultar por ${s.nombre} por WhatsApp`}
                      >
                        <WhatsAppIcon className="w-[18px] h-[18px]" /> Consultar
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ─── Por qué elegirnos ─── */}
        {has(d.razones) && (
          <section className="px-5 sm:px-8 py-14 sm:py-20" style={{ backgroundColor: NAVY }} aria-labelledby="razones">
            <div className="mx-auto max-w-5xl">
              <SectionTitle kicker={short} title="Por qué elegirnos" id="razones" accent={accent} light />
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {d.razones.map((r) => (
                  <li key={r.titulo} className="rounded-2xl border border-white/12 bg-white/[0.04] p-6">
                    <span className="grid h-10 w-10 place-items-center rounded-lg" style={{ backgroundColor: accent, color: NAVY }}>
                      <Svg className="w-5 h-5 [stroke-width:2.4]">{icons.check}</Svg>
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-white">{r.titulo}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-white/80">{r.texto}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ─── Trabajos (aparece solo cuando se cargan fotos reales en los datos) ─── */}
        {has(d.fotos) && (
          <section className="px-5 sm:px-8 py-14 sm:py-20" aria-labelledby="trabajos">
            <div className="mx-auto max-w-5xl">
              <SectionTitle kicker="Trabajos" title="Algunos trabajos" id="trabajos" accent={accent} />
              <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {d.fotos.map((f) => (
                  <li key={f.src} className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                    <Image src={f.src} alt={f.alt} fill sizes="(max-width: 1024px) 50vw, 250px" className="object-cover" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ─── Reseñas (solo con datos reales) ─── */}
        {(d.google || has(d.resenas)) && (
          <section className="px-5 sm:px-8 py-14 sm:py-20" aria-labelledby="resenas">
            <div className="mx-auto max-w-5xl">
              <SectionTitle
                kicker="Opiniones en Google"
                title={d.google ? `${d.google.puntaje.toString().replace(".", ",")} de 5 · ${d.google.resenas} reseñas` : "Lo que dicen"}
                id="resenas"
                accent={accent}
              />
              {has(d.resenas) && (
                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  {d.resenas.map((r, i) => (
                    <li key={i} className="rounded-2xl border border-[#0E1A2B]/10 bg-white p-6">
                      <p className="leading-relaxed">“{r.texto}”</p>
                      <p className="mt-3 text-sm font-semibold" style={{ color: MUTED }}>{r.autor}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* ─── Ubicación ─── */}
        {(d.direccion || mapQ) && (
          <section className="px-5 sm:px-8 py-14 sm:py-20" aria-labelledby="ubicacion">
            <div className="mx-auto max-w-5xl">
              <SectionTitle kicker="Ubicación" title="Dónde estamos" id="ubicacion" accent={accent} />
              <div className="mt-8 grid overflow-hidden rounded-2xl border border-[#0E1A2B]/10 bg-white lg:grid-cols-5">
                <div className="flex flex-col gap-4 p-6 sm:p-8 lg:col-span-2">
                  {d.direccion && (
                    <p className="flex items-start gap-3 text-xl font-bold">
                      <Svg className="w-6 h-6 shrink-0 mt-0.5">{icons.pin}</Svg>
                      {d.direccion}
                    </p>
                  )}
                  {tel && (
                    <a href={tel} className="flex items-center gap-3 font-semibold hover:underline">
                      <Svg className="w-5 h-5">{icons.tel}</Svg> {d.telefono}
                    </a>
                  )}
                  {d.email && (
                    <a href={`mailto:${d.email}`} className="flex items-center gap-3 font-semibold hover:underline">
                      <Svg className="w-5 h-5 shrink-0">{icons.mail}</Svg> {d.email.replace("@", "@\u200b")}
                    </a>
                  )}
                  {has(d.horarios) && (
                    <dl className="text-[15px]">
                      {d.horarios.map((h) => (
                        <div key={h.dias} className="flex justify-between gap-4 border-b border-[#0E1A2B]/10 py-2">
                          <dt style={{ color: MUTED }}>{h.dias}</dt>
                          <dd className="font-semibold">{h.horas}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {mapQ && (
                    <a href={mapsSearch(mapQ)} target="_blank" rel="noopener noreferrer" className="mt-1 self-start rounded-xl border-2 px-4 py-2.5 text-[15px] font-bold" style={{ borderColor: NAVY }}>
                      Cómo llegar
                    </a>
                  )}
                </div>
                {mapQ && (
                  <div className="relative min-h-[260px] border-t border-[#0E1A2B]/10 bg-[#E6E9ED] lg:col-span-3 lg:border-l lg:border-t-0">
                    <iframe
                      title={`Mapa: ${d.nombre}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(mapQ)}&output=embed`}
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─── Cierre ─── */}
        {d.cierre && (wa || tel) && (
          <section className="px-5 sm:px-8 pb-16 sm:pb-24" aria-labelledby="cierre">
            <div className="mx-auto max-w-5xl rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16" style={{ backgroundColor: NAVY }}>
              <h2 id="cierre" className="text-3xl sm:text-5xl font-extrabold tracking-[-0.02em] text-white">
                {d.cierre}
              </h2>
              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2 [&>a]:whitespace-nowrap">
                {wa && (
                  <BtnWhatsApp href={wa} accent={accent} origen="cierre">
                    {ctaText}
                  </BtnWhatsApp>
                )}
                {tel && (
                  <BtnLlamar href={tel} dark>
                    Llamar
                  </BtnLlamar>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ─── Pie ─── */}
      <footer className="border-t border-[#0E1A2B]/10 bg-white px-5 sm:px-8 py-8">
        <div className="mx-auto max-w-5xl text-sm" style={{ color: MUTED }}>
          <p className="font-bold" style={{ color: NAVY }}>{d.nombre}</p>
          <p className="mt-1">
            {[d.direccion, d.telefono, d.email].filter(Boolean).join(" · ")}
          </p>
        </div>
      </footer>

      {/* ─── Botón flotante de WhatsApp (celular) ─── */}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-origen="boton-flotante"
          className="sm:hidden fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-bold shadow-[0_10px_30px_-6px_rgba(14,26,43,.45)]"
          style={{ backgroundColor: accent, color: NAVY }}
        >
          <WhatsAppIcon className="w-6 h-6" /> WhatsApp
        </a>
      )}
    </div>
  );
}
