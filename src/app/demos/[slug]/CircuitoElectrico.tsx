import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";
import type { Demo } from "@content/demos";
import { MI_WHATSAPP, has, waLink, telLink, mapsSearch } from "@/lib/demo-utils";

/*
 * Diseño "circuito": landing con personalidad para servicios eléctricos.
 * - Motivo propio del rubro: pistas de circuito con pulsos de corriente (SVG + CSS, sin JS).
 * - Hero tipo panel + grilla bento; servicios en bento con íconos de símbolos eléctricos.
 * - Una sola fuente extra (Bricolage Grotesque) para títulos; el texto usa la Inter del sitio.
 * - Botones de WhatsApp con data-origen para medir conversiones.
 * Igual que la plantilla: solo muestra lo que está en el archivo de datos.
 */

const display = Bricolage_Grotesque({ subsets: ["latin"], preload: false, weight: ["600", "700", "800"], variable: "--font-ci-display" });

const NAVY = "#0B1626";
const MUTED = "#4A5361"; /* 7,9:1 sobre blanco */
const BG = "#F2F4F7";
const D: React.CSSProperties = { fontFamily: "var(--font-ci-display), var(--font-inter), sans-serif" };

/* ─────────── Íconos lineales (símbolos eléctricos) ─────────── */
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
  pin: (<><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  tel: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6 8.5-6" /></>),
  flecha: <path d="M7 17 17 7M8 7h9v9" />,
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

/* ─────────── Circuito con pulsos de corriente ─────────── */
const TRACES = [
  "M-10 80 H200 V170 H400",
  "M-10 230 H130 V310 H330 V390 H500",
  "M810 60 H610 V150 H470",
  "M810 270 H670 V210 H560 V120",
  "M120 510 V430 H290 V340",
  "M700 510 V410 H590 V330 H450",
  "M250 -10 V55 H380 V20 H520",
  "M810 430 H720 V480 H560",
];
const NODES = [[200, 80], [200, 170], [400, 170], [130, 230], [130, 310], [330, 390], [610, 60], [610, 150], [670, 210], [560, 120], [290, 430], [290, 340], [590, 410], [590, 330], [380, 55], [520, 20], [720, 480]];

function Circuit({ accent, base = "rgba(255,255,255,.12)", opacity = 1 }: { accent: string; base?: string; opacity?: number }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ opacity }}>
      <g fill="none" stroke={base} strokeWidth="2" strokeLinejoin="round">
        {TRACES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill={base}>
        {NODES.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />
        ))}
      </g>
      {/* Pulsos de corriente recorriendo las pistas */}
      <g fill="none" stroke={accent} strokeWidth="2.6" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 5px ${accent})` }}>
        {TRACES.map((d, i) => (
          <path key={d} d={d} pathLength={100} className="circ-pulse" style={{ animationDuration: `${4.2 + (i % 4) * 0.9}s`, animationDelay: `${-i * 0.7}s` }} />
        ))}
      </g>
    </svg>
  );
}

/* ─────────── Piezas ─────────── */
function Kicker({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: MUTED }}>
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full opacity-40" style={{ backgroundColor: accent }} />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
      </span>
      {children}
    </p>
  );
}
function Title({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mt-3 text-[2rem] sm:text-5xl font-extrabold leading-[1.02] tracking-[-0.03em]" style={{ ...D, color: NAVY }}>
      {children}
    </h2>
  );
}

/* ─────────── Diseño ─────────── */
export default function CircuitoElectrico({ d }: { d: Demo }) {
  const accent = d.color;
  const [marca, linea] = d.nombre.includes(" · ") ? d.nombre.split(" · ") : [d.nombreCorto ?? d.nombre, ""];
  const short = d.nombreCorto ?? marca;

  const wa = d.whatsapp ? waLink(d.whatsapp, d.mensajeWhatsApp ?? "Hola, quería hacer una consulta.") : null;
  const tel = d.telefono ? telLink(d.telefono) : null;
  const ctaText = d.textoBotonWhatsApp ?? "Escribinos por WhatsApp";
  const propuesta = waLink(MI_WHATSAPP, `¡Hola Daniel! Vi la propuesta de diseño para ${short}.`);
  const mapQ = d.mapa || [d.direccion, d.barrio].filter(Boolean).join(", ");

  /* Titular con "desde AAAA" en el color de acento */
  const titular = d.titular ?? d.servicioPrincipal ?? d.rubro;
  const m = d.desde ? titular.match(new RegExp(`(desde ${d.desde})`, "i")) : null;
  const antes = m ? titular.slice(0, m.index) : titular;
  const despues = m ? titular.slice((m.index ?? 0) + m[0].length) : "";

  const btnWa = "group inline-flex items-center justify-center gap-2.5 rounded-2xl px-6 py-4 text-[17px] font-bold transition-transform active:scale-[0.98] hover:-translate-y-0.5";
  const servicios = d.servicios ?? [];

  return (
    <div className={`${display.variable} min-h-screen antialiased pb-24 sm:pb-0`} style={{ backgroundColor: BG, color: NAVY, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      {/* Franja: propuesta de diseño */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#0B1626] text-[11px] sm:text-xs text-white/75">
        <p className="px-4 py-1.5 text-center">
          {d.ejemplo && <strong className="text-amber-300 font-semibold">Ejemplo con datos ficticios · </strong>}
          Propuesta de diseño para {short} · por{" "}
          <a href={propuesta} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">
            Daniel Niño
          </a>
        </p>
      </div>

      <div className="px-3 sm:px-6 pt-9"><div className="mx-auto max-w-6xl">
        {/* ─── Encabezado ─── */}
        <header className="flex items-center justify-between px-2 py-3">
          <p className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ backgroundColor: NAVY, color: accent }}>
              <Svg className="w-5 h-5">{icons.rayo}</Svg>
            </span>
            <span className="leading-tight">
              <span className="block text-[17px] font-extrabold tracking-tight" style={D}>{marca}</span>
              {linea && <span className="block text-xs font-medium" style={{ color: MUTED }}>{linea}</span>}
            </span>
          </p>
          {tel && (
            <a href={tel} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2.5 text-sm font-semibold shadow-[0_1px_2px_rgba(11,22,38,.06)] ring-1 ring-black/5" aria-label={`Llamar al ${d.telefono}`}>
              <Svg className="w-4 h-4">{icons.tel}</Svg>
              <span className="hidden sm:inline">{d.telefono}</span>
            </a>
          )}
        </header>

        {/* ─── Hero bento ─── */}
        <section className="grid gap-3 lg:grid-cols-12" aria-label="Presentación">
          <div className="relative overflow-hidden rounded-[30px] px-6 pt-8 pb-7 sm:p-12 lg:col-span-8 lg:min-h-[520px] flex flex-col justify-end" style={{ backgroundColor: NAVY }}>
            <Circuit accent={accent} />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_20%_85%,rgba(11,22,38,.95),transparent_70%)]" aria-hidden="true" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-semibold text-white/85 backdrop-blur">
                <Svg className="w-4 h-4" >{icons.rayo}</Svg>
                {d.rubro}
              </p>
              <h1 className="mt-5 text-[2.65rem] leading-[0.98] sm:text-7xl font-extrabold tracking-[-0.035em] text-white" style={D}>
                {antes}
                {m && <span style={{ color: accent }}>{m[1]}</span>}
                {despues}
              </h1>
              {d.bajada && <p className="mt-4 max-w-xl text-[17px] sm:text-xl leading-snug text-white/80">{d.bajada}</p>}
              {(wa || tel) && (
                <div className="mt-7 grid gap-2.5 sm:flex sm:gap-3">
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" data-origen="hero" className={btnWa} style={{ backgroundColor: accent, color: NAVY, boxShadow: `0 10px 30px -10px ${accent}` }}>
                      <WhatsAppIcon className="w-6 h-6" /> {ctaText}
                    </a>
                  )}
                  {tel && (
                    <a href={tel} className={`${btnWa} bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15`}>
                      <Svg className="w-5 h-5">{icons.tel}</Svg> Llamar
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha: datos rápidos */}
          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
            {d.desde && (
              <div className="relative overflow-hidden rounded-[26px] p-6 flex flex-col justify-between min-h-[150px]" style={{ backgroundColor: accent, color: NAVY }}>
                <p className="text-sm font-bold">En CABA desde</p>
                <p className="text-6xl sm:text-7xl font-extrabold leading-none tracking-[-0.04em]" style={D}>
                  {d.desde}
                </p>
              </div>
            )}
            {(tel || d.email) && (
              <div className="rounded-[26px] bg-white p-6 ring-1 ring-black/5 flex flex-col justify-between gap-4 min-h-[150px]">
                <p className="text-sm font-bold" style={{ color: MUTED }}>Contacto directo</p>
                <div className="space-y-2">
                  {tel && (
                    <a href={tel} className="flex items-center gap-2.5 text-lg font-bold hover:underline" style={D}>
                      <Svg className="w-5 h-5">{icons.tel}</Svg> {d.telefono}
                    </a>
                  )}
                  {d.email && (
                    <a href={`mailto:${d.email}`} className="flex items-center gap-2.5 text-[15px] font-semibold hover:underline" style={{ color: MUTED }}>
                      <Svg className="w-5 h-5 shrink-0">{icons.mail}</Svg> <span className="min-w-0">{d.email.replace("@", "@​")}</span>
                    </a>
                  )}
                </div>
              </div>
            )}
            {d.direccion && (
              <a href="#ubicacion" className="group rounded-[26px] bg-white p-6 ring-1 ring-black/5 flex flex-col justify-between gap-4 min-h-[150px] transition-shadow hover:shadow-lg">
                <span className="flex items-center justify-between text-sm font-bold" style={{ color: MUTED }}>
                  Dónde estamos
                  <Svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{icons.flecha}</Svg>
                </span>
                <span className="flex items-start gap-2.5 text-lg font-bold leading-snug" style={D}>
                  <Svg className="w-5 h-5 mt-1 shrink-0">{icons.pin}</Svg> {d.direccion}
                </span>
              </a>
            )}
          </div>
        </section>
      </div></div>

      <main>
        {/* ─── Servicios (bento) ─── */}
        {servicios.length > 0 && (
          <section className="px-3 sm:px-6 pt-16 sm:pt-24" aria-labelledby="servicios">
            <div className="mx-auto max-w-6xl">
              <div className="px-2">
                <Kicker accent={accent}>Servicios</Kicker>
                <Title id="servicios">¿Qué necesitás?</Title>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {servicios.map((s, i) => {
                  const big = i === 0;
                  /* La última tarjeta completa la fila de la grilla de 3 (la primera ocupa 2) */
                  const resto = (servicios.length + 1) % 3;
                  const span = i === servicios.length - 1 && !big && resto !== 0 ? (resto === 1 ? "lg:col-span-3" : "lg:col-span-2") : "";
                  const href = d.whatsappPorServicio && d.whatsapp ? waLink(d.whatsapp, `Hola, quiero consultar por ${s.nombre.toLowerCase()}`) : null;
                  return (
                    <li
                      key={s.nombre}
                      className={`group relative overflow-hidden rounded-[26px] p-6 sm:p-7 flex flex-col min-h-[230px] transition-shadow duration-300 ${big ? "text-white lg:col-span-2" : "bg-white ring-1 ring-black/5 hover:shadow-[0_18px_40px_-18px_rgba(11,22,38,.35)]"} ${span}`}
                      style={big ? { backgroundColor: NAVY } : undefined}
                    >
                      {big && <Circuit accent={accent} opacity={0.6} />}
                      <div className="relative flex items-start justify-between gap-4">
                        <span className="text-sm font-bold tabular-nums" style={{ color: big ? accent : MUTED }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:rotate-[-6deg]" style={big ? { backgroundColor: accent, color: NAVY } : { backgroundColor: NAVY, color: accent }}>
                          <Svg>{iconFor(s.nombre)}</Svg>
                        </span>
                      </div>
                      <h3 className={`relative mt-6 font-bold leading-[1.1] tracking-[-0.02em] ${big ? "text-3xl sm:text-4xl" : "text-[1.35rem]"}`} style={D}>
                        {s.nombre}
                      </h3>
                      {s.detalle && (
                        <p className={`relative mt-2 text-[15px] leading-relaxed ${big ? "text-white/80 max-w-md" : ""}`} style={big ? undefined : { color: MUTED }}>
                          {s.detalle}
                        </p>
                      )}
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-origen={`servicio: ${s.nombre}`}
                          className={`relative mt-auto pt-6 inline-flex items-center gap-2 self-start text-[15px] font-bold`}
                          aria-label={`Consultar por ${s.nombre} por WhatsApp`}
                        >
                          <span className="grid h-10 w-10 place-items-center rounded-full transition-transform group-hover:scale-110" style={big ? { backgroundColor: accent, color: NAVY } : { backgroundColor: accent, color: NAVY }}>
                            <WhatsAppIcon className="w-5 h-5" />
                          </span>
                          Consultar
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {/* ─── Por qué elegirnos: tres nodos sobre un cable ─── */}
        {has(d.razones) && (
          <section className="px-3 sm:px-6 pt-16 sm:pt-24" aria-labelledby="razones">
            <div className="mx-auto max-w-6xl rounded-[30px] bg-white p-6 sm:p-12 ring-1 ring-black/5">
              <Kicker accent={accent}>{short}</Kicker>
              <Title id="razones">Por qué elegirnos</Title>
              <ol className="relative mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
                {/* Cable con corriente (horizontal en escritorio, vertical en celular) */}
                <span className="absolute left-[19px] top-2 bottom-2 w-[2px] sm:left-0 sm:right-0 sm:top-[19px] sm:bottom-auto sm:h-[2px] sm:w-auto overflow-hidden rounded-full bg-[#0B1626]/10" aria-hidden="true">
                  <span className="wire-pulse absolute inset-0" style={{ ["--wire" as string]: accent }} />
                </span>
                {d.razones.map((r, i) => (
                  <li key={r.titulo} className="relative pl-14 sm:pl-0">
                    <span className="absolute left-0 top-0 sm:static grid h-10 w-10 place-items-center rounded-full text-[15px] font-extrabold ring-4 ring-white" style={{ ...D, backgroundColor: accent, color: NAVY }}>
                      {i + 1}
                    </span>
                    <h3 className="sm:mt-5 text-xl font-bold tracking-[-0.01em]" style={D}>
                      {r.titulo}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: MUTED }}>{r.texto}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ─── Trabajos (aparece solo con fotos reales cargadas) ─── */}
        {has(d.fotos) && (
          <section className="px-3 sm:px-6 pt-16 sm:pt-24" aria-labelledby="trabajos">
            <div className="mx-auto max-w-6xl">
              <div className="px-2">
                <Kicker accent={accent}>Trabajos</Kicker>
                <Title id="trabajos">Algunos trabajos</Title>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {d.fotos.map((f) => (
                  <li key={f.src} className="relative aspect-square overflow-hidden rounded-[22px] bg-white">
                    <Image src={f.src} alt={f.alt} fill sizes="(max-width: 1024px) 50vw, 280px" className="object-cover" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ─── Reseñas (solo con datos reales) ─── */}
        {(d.google || has(d.resenas)) && (
          <section className="px-3 sm:px-6 pt-16 sm:pt-24" aria-labelledby="resenas">
            <div className="mx-auto max-w-6xl">
              <div className="px-2">
                <Kicker accent={accent}>Opiniones en Google</Kicker>
                <Title id="resenas">{d.google ? `${d.google.puntaje.toString().replace(".", ",")} de 5 · ${d.google.resenas} reseñas` : "Lo que dicen"}</Title>
              </div>
              {has(d.resenas) && (
                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  {d.resenas.map((r, i) => (
                    <li key={i} className="rounded-[26px] bg-white p-6 ring-1 ring-black/5">
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
        {mapQ && (
          <section id="ubicacion" className="px-3 sm:px-6 pt-16 sm:pt-24 scroll-mt-10" aria-labelledby="ubicacion-titulo">
            <div className="mx-auto max-w-6xl">
              <div className="px-2">
                <Kicker accent={accent}>Ubicación</Kicker>
                <Title id="ubicacion-titulo">Dónde estamos</Title>
              </div>
              <div className="mt-8 grid gap-3 lg:grid-cols-12">
                <div className="rounded-[26px] bg-white p-6 sm:p-8 ring-1 ring-black/5 lg:col-span-4 flex flex-col gap-4">
                  {d.direccion && (
                    <p className="text-2xl font-bold leading-snug tracking-[-0.02em]" style={D}>
                      {d.direccion}
                    </p>
                  )}
                  {has(d.horarios) && (
                    <dl className="text-[15px]">
                      {d.horarios.map((h) => (
                        <div key={h.dias} className="flex justify-between gap-4 border-b border-black/10 py-2">
                          <dt style={{ color: MUTED }}>{h.dias}</dt>
                          <dd className="font-semibold">{h.horas}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <a href={mapsSearch(mapQ)} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 self-start rounded-full px-5 py-3 text-[15px] font-bold text-white" style={{ backgroundColor: NAVY }}>
                    Cómo llegar <Svg className="w-4 h-4">{icons.flecha}</Svg>
                  </a>
                </div>
                <div className="relative min-h-[300px] overflow-hidden rounded-[26px] bg-[#E3E7EC] ring-1 ring-black/5 lg:col-span-8">
                  <iframe
                    title={`Mapa: ${d.nombre}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(mapQ)}&output=embed`}
                    className="absolute inset-0 h-full w-full"
                    style={{ filter: "grayscale(0.4) contrast(1.05)" }}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Cierre ─── */}
        {d.cierre && (wa || tel) && (
          <section className="px-3 sm:px-6 py-16 sm:py-24" aria-labelledby="cierre">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[30px] px-6 py-14 text-center sm:px-12 sm:py-20" style={{ backgroundColor: NAVY }}>
              <Circuit accent={accent} opacity={0.8} />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(11,22,38,.92),transparent_75%)]" aria-hidden="true" />
              <h2 id="cierre" className="relative text-4xl sm:text-6xl font-extrabold leading-[1] tracking-[-0.035em] text-white" style={D}>
                {d.cierre}
              </h2>
              <div className="relative mx-auto mt-9 grid max-w-2xl gap-2.5 sm:grid-cols-2 [&>a]:whitespace-nowrap">
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" data-origen="cierre" className={btnWa} style={{ backgroundColor: accent, color: NAVY }}>
                    <WhatsAppIcon className="w-6 h-6" /> {ctaText}
                  </a>
                )}
                {tel && (
                  <a href={tel} className={`${btnWa} bg-white`} style={{ color: NAVY }}>
                    <Svg className="w-5 h-5">{icons.tel}</Svg> Llamar
                  </a>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ─── Pie ─── */}
      <footer className="px-5 sm:px-8 pb-10">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-black/10 pt-6 text-sm" style={{ color: MUTED }}>
          <p className="font-bold" style={{ ...D, color: NAVY }}>{d.nombre}</p>
          <p>{[d.direccion, d.telefono, d.email].filter(Boolean).join(" · ")}</p>
        </div>
      </footer>

      {/* ─── Botón flotante de WhatsApp (celular) ─── */}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-origen="boton-flotante"
          className="sm:hidden fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-bold ring-4 ring-white/70"
          style={{ backgroundColor: accent, color: NAVY, boxShadow: "0 12px 30px -8px rgba(11,22,38,.45)" }}
        >
          <WhatsAppIcon className="w-6 h-6" /> WhatsApp
        </a>
      )}
    </div>
  );
}
