import Image from "next/image";
import { Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import type { Demo } from "@content/demos";
import { MI_WHATSAPP, has, waLink, telLink, mapsSearch, readableOn } from "@/lib/demo-utils";

/*
 * Diseño "editorial" para demos de talleres: estética de ficha técnica.
 * Negro y blanco hueso que se alternan, el color de la marca como acento,
 * tipografía condensada muy grande y etiquetas en mono.
 * Igual que la plantilla: solo muestra lo que está en el archivo de datos.
 */

const display = Barlow_Condensed({ subsets: ["latin"], preload: false, weight: ["500", "600", "700", "800"], variable: "--font-ed-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], preload: false, weight: ["400", "500"], variable: "--font-ed-mono" });

const INK = "#0D0D0D";
const PAPER = "#F1EEE8";

const D = { fontFamily: "var(--font-ed-display), sans-serif" };
const M = { fontFamily: "var(--font-ed-mono), ui-monospace, monospace" };

/* ─────────── Piezas chicas ─────────── */
function Arrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.006L0 24l6.132-1.61c1.742.951 3.71 1.453 5.712 1.454h.005c6.635 0 12.043-5.411 12.047-12.046a11.812 11.812 0 00-3.29-8.412" />
    </svg>
  );
}

function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* Rótulo de sección tipo ficha: "N.º 01 — SERVICIOS" */
function Label({ n, children, color }: { n: number; children: React.ReactNode; color?: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]" style={{ ...M, color }}>
      <span>N.º {String(n).padStart(2, "0")}</span>
      <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/* Piso a cuadros en perspectiva, como el del taller */
function CheckerFloor({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56 overflow-hidden" aria-hidden="true" style={{ perspective: "420px" }}>
      <div
        className="absolute -inset-x-1/2 bottom-0 h-[200%] origin-bottom"
        style={{
          transform: "rotateX(62deg)",
          backgroundImage: `conic-gradient(${color} 25%, ${INK} 0 50%, ${color} 0 75%, ${INK} 0)`,
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,.55), transparent 70%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,.55), transparent 70%)",
        }}
      />
    </div>
  );
}

/* ─────────── Diseño ─────────── */
export default function EditorialTaller({ d }: { d: Demo }) {
  const red = d.color;
  const redOnInk = readableOn(red, INK);
  const [brand, tagline] = d.nombre.includes(" - ") ? d.nombre.split(" - ") : [d.nombreCorto ?? d.nombre, ""];
  const short = d.nombreCorto ?? brand;

  const wa = d.whatsapp ? waLink(d.whatsapp, d.mensajeWhatsApp ?? `Hola, quería hacer una consulta.`) : null;
  const tel = d.telefono ? telLink(d.telefono) : null;
  const ctaText = d.textoBotonWhatsApp ?? "Escribinos por WhatsApp";
  const propuesta = waLink(MI_WHATSAPP, `¡Hola Daniel! Vi la propuesta de diseño para ${short}.`);

  const sedes = has(d.sucursales)
    ? d.sucursales.filter((s) => s.direccion || s.mapa)
    : d.direccion || d.mapa
      ? [{ nombre: d.barrio ?? "", direccion: d.direccion, mapa: d.mapa, horarios: d.horarios }]
      : [];

  /* Numeración de secciones: solo cuenta las que se muestran */
  let n = 0;
  const next = () => ++n;

  /* Titular: la última palabra del servicio principal va en el color de la marca */
  const headline = d.servicioPrincipal ?? d.rubro;
  const words = headline.split(" ");
  const last = words.pop();

  return (
    <div className={`${display.variable} ${mono.variable} min-h-screen pb-20 sm:pb-0 antialiased`} style={{ backgroundColor: INK, color: PAPER, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      {/* Franja: propuesta de diseño */}
      <div className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-white/70" style={M}>
        <p className="px-4 py-2 text-center">
          {d.ejemplo && <strong className="text-amber-300 font-medium">Ejemplo con datos ficticios · </strong>}
          Propuesta de diseño para {short} · por{" "}
          <a href={propuesta} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
            Daniel Niño
          </a>
        </p>
      </div>

      {/* ─── Hero ─── */}
      <header className="relative overflow-hidden pt-9">
        <div className="relative z-10 mx-auto max-w-[77rem] px-5 sm:px-10">
          {/* Barra de marca */}
          <div className="flex items-center justify-between py-6 border-b border-white/10">
            <p className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide leading-none" style={D}>
                {brand}
              </span>
              {tagline && (
                <span className="hidden sm:inline text-[11px] uppercase tracking-[0.22em] text-white/60" style={M}>
                  {tagline}
                </span>
              )}
            </p>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors" style={M}>
                <span className="hidden sm:inline">Turnos por WhatsApp</span>
                <span className="grid place-items-center w-9 h-9 border border-white/25 group-hover:border-white transition-colors">
                  <WhatsAppIcon className="w-4 h-4" />
                </span>
              </a>
            )}
          </div>

          <div className="grid gap-10 pt-10 pb-44 sm:pt-16 sm:pb-64 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/60" style={M}>
                {d.rubro}
                {d.desde && <> · Desde {d.desde}</>}
              </p>
              <h1
                className="mt-5 font-extrabold uppercase leading-[0.86] tracking-[-0.01em] text-[clamp(3.4rem,14vw,9.5rem)]"
                style={D}
              >
                {words.join(" ")} <span style={{ color: redOnInk }}>{last}</span>
              </h1>

              {(wa || tel) && (
                <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5">
                  {wa && (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-between gap-6 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-[gap] hover:gap-9"
                      style={{ backgroundColor: red, ...M }}
                    >
                      {ctaText}
                      <Arrow />
                    </a>
                  )}
                  {tel && (
                    <a href={tel} className="text-sm text-white/70 hover:text-white underline-offset-4 hover:underline" style={M}>
                      o llamá al {d.telefono}
                    </a>
                  )}
                </div>
              )}
            </div>

            {d.heroImagen && (
              <figure className="lg:col-span-4 w-[62%] max-w-[280px] ml-auto lg:w-full">
                <div className="relative aspect-[4/5] overflow-hidden border border-white/15">
                  <Image src={d.heroImagen.src} alt={d.heroImagen.alt} fill priority sizes="280px" className="object-cover" />
                </div>
                <figcaption className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/50" style={M}>
                  <span>Ref. 01</span>
                  <span>Trabajo terminado</span>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
        <CheckerFloor color={red} />
      </header>

      {/* ─── Cinta de servicios ─── */}
      {has(d.servicios) && (
        <div className="overflow-hidden border-y border-black/20 py-3" style={{ backgroundColor: red }} aria-hidden="true">
          <div className="demo-marquee flex w-max">
            {[0, 1].map((k) => (
              <p key={k} className="flex shrink-0 items-center text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white whitespace-nowrap" style={D}>
                {d.servicios!.map((s) => (
                  <span key={s.nombre} className="flex items-center">
                    <span className="px-6">{s.nombre}</span>
                    <span className="text-black/50">✕</span>
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      )}

      <main>
        {/* ─── Servicios ─── */}
        {has(d.servicios) && (
          <section className="px-5 sm:px-10 py-20 sm:py-28" style={{ backgroundColor: PAPER, color: INK }} aria-labelledby="servicios">
            <div className="mx-auto max-w-6xl">
              <Label n={next()} color={red}>Servicios</Label>
              <h2 id="servicios" className="mt-5 text-5xl sm:text-7xl font-extrabold uppercase leading-[0.9]" style={D}>
                Qué hacemos
              </h2>
              <ol className="mt-14 border-t border-black/15">
                {d.servicios.map((s, i) => (
                  <li key={s.nombre} className="group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[4rem_1.2fr_1fr_auto] gap-x-4 gap-y-2 items-baseline py-7 border-b border-black/15">
                    <span className="text-xs text-black/60" style={M}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl sm:text-5xl font-bold uppercase leading-none transition-colors group-hover:text-[color:var(--red)]" style={{ ...D, ["--red" as string]: red }}>
                      {s.nombre}
                    </h3>
                    {s.detalle && <p className="col-start-2 sm:col-start-auto text-[15px] leading-relaxed text-black/70 max-w-sm">{s.detalle}</p>}
                    {d.whatsappPorServicio && d.whatsapp && (
                      <a
                        href={waLink(d.whatsapp, `Hola, quiero consultar por el servicio de ${s.nombre}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-start-2 sm:col-start-auto justify-self-start sm:justify-self-end inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] border-b border-black/40 pb-1 hover:border-black transition-colors"
                        style={M}
                        aria-label={`Consultar por ${s.nombre} por WhatsApp`}
                      >
                        Consultar <Arrow className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ─── Trabajos: hoja de contactos ─── */}
        {has(d.fotos) && (
          <section className="py-20 sm:py-28" aria-labelledby="trabajos">
            <div className="mx-auto max-w-[77rem] px-5 sm:px-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Label n={next()} color={redOnInk}>Hoja de contactos</Label>
                <h2 id="trabajos" className="mt-5 text-5xl sm:text-7xl font-extrabold uppercase leading-[0.9]" style={D}>
                  Trabajos
                </h2>
              </div>
              {d.instagram && (
                <a href={d.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white border-b border-white/30 pb-1" style={M}>
                  Más en Instagram <Arrow className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <ul className="mt-12 flex gap-5 overflow-x-auto snap-x snap-mandatory px-5 sm:px-10 pb-4 lg:mx-auto lg:max-w-[77rem] lg:grid lg:grid-cols-4 lg:overflow-visible" aria-label="Galería de trabajos">
              {d.fotos.map((f, i) => (
                <li key={f.src} className="snap-start shrink-0 w-[68%] sm:w-[40%] lg:w-auto">
                  <figure>
                    <div className="relative aspect-square overflow-hidden border border-white/15 bg-white/5">
                      <Image src={f.src} alt={f.alt} fill sizes="(max-width: 1024px) 68vw, 280px" className="object-cover transition-transform duration-700 hover:scale-[1.04]" />
                    </div>
                    <figcaption className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/50" style={M}>
                      <span>{String(i + 1).padStart(2, "0")} / {String(d.fotos!.length).padStart(2, "0")}</span>
                      <span>{short}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ─── Cómo trabajamos ─── */}
        {has(d.pasos) && (
          <section className="px-5 sm:px-10 py-20 sm:py-28" style={{ backgroundColor: PAPER, color: INK }} aria-labelledby="proceso">
            <div className="mx-auto max-w-6xl">
              <Label n={next()} color={red}>Proceso</Label>
              <h2 id="proceso" className="mt-5 text-5xl sm:text-7xl font-extrabold uppercase leading-[0.9]" style={D}>
                Cómo trabajamos
              </h2>
              <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
                {d.pasos.map((p, i) => (
                  <li key={p.titulo} className="relative border-t-2 pt-6" style={{ borderColor: INK }}>
                    <span className="absolute -top-[2px] left-0 h-[2px] w-12" style={{ backgroundColor: red }} aria-hidden="true" />
                    <span
                      className="block text-7xl sm:text-8xl font-extrabold leading-none"
                      style={{ ...D, color: "transparent", WebkitTextStroke: `1.5px ${INK}` }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold uppercase" style={D}>
                      <span className="sr-only">Paso {i + 1}: </span>
                      {p.titulo}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-black/70">{p.texto}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ─── Reseñas (solo con datos reales) ─── */}
        {(d.google || has(d.resenas)) && (
          <section className="px-5 sm:px-10 py-20 sm:py-28" aria-labelledby="resenas">
            <div className="mx-auto max-w-6xl">
              <Label n={next()} color={redOnInk}>Google</Label>
              <h2 id="resenas" className="mt-5 text-5xl sm:text-7xl font-extrabold uppercase leading-[0.9]" style={D}>
                {d.google ? `${d.google.puntaje.toString().replace(".", ",")} / 5` : "Reseñas"}
              </h2>
              {d.google && (
                <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/60" style={M}>
                  {d.google.resenas} reseñas en Google
                </p>
              )}
              {has(d.resenas) && (
                <ul className="mt-12 grid gap-8 sm:grid-cols-3">
                  {d.resenas.map((r, i) => (
                    <li key={i} className="border-t border-white/20 pt-6">
                      <p className="text-lg leading-relaxed">“{r.texto}”</p>
                      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/60" style={M}>{r.autor}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* ─── Dónde estamos ─── */}
        {sedes.length > 0 && (
          <section className="px-5 sm:px-10 py-20 sm:py-28 border-t border-white/10" aria-labelledby="ubicacion">
            <div className="mx-auto max-w-6xl">
              <Label n={next()} color={redOnInk}>{sedes.length > 1 ? "Sucursales" : "Ubicación"}</Label>
              <h2 id="ubicacion" className="sr-only">Dónde estamos</h2>
              <div className="mt-10 grid gap-16">
                {sedes.map((s) => {
                  const [calle, ...resto] = (s.direccion ?? "").split(",");
                  const q = s.mapa || s.direccion || "";
                  return (
                    <div key={s.nombre || q} className="grid gap-8 lg:grid-cols-12 lg:items-start">
                      <div className="lg:col-span-5">
                        {s.nombre && (
                          <p className="text-[11px] uppercase tracking-[0.22em]" style={{ ...M, color: redOnInk }}>
                            Sucursal {s.nombre}
                          </p>
                        )}
                        {s.direccion && (
                          <>
                            <p className="mt-4 text-5xl sm:text-6xl font-extrabold uppercase leading-[0.92]" style={D}>
                              {calle}
                            </p>
                            {resto.length > 0 && (
                              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/60" style={M}>
                                {resto.join(",").trim()}
                              </p>
                            )}
                          </>
                        )}
                        {has(s.horarios) && (
                          <dl className="mt-8 border-t border-white/15" style={M}>
                            {s.horarios.map((h) => (
                              <div key={h.dias} className="flex justify-between gap-4 py-3 border-b border-white/15 text-sm">
                                <dt className="text-white/60">{h.dias}</dt>
                                <dd>{h.horas}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {q && (
                          <a href={mapsSearch(q)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white border-b border-white/30 pb-1" style={M}>
                            Cómo llegar <Arrow className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      {q && (
                        <div className="lg:col-span-7 relative aspect-[4/3] border border-white/15 bg-white/5 overflow-hidden">
                          <iframe
                            title={`Mapa: ${d.nombre}${s.nombre ? ` — ${s.nombre}` : ""}`}
                            src={`https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`}
                            className="absolute inset-0 w-full h-full"
                            style={{ filter: "grayscale(1) invert(0.9) contrast(0.95)" }}
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── Cierre ─── */}
        {d.cierre && wa && (
          <section className="relative overflow-hidden px-5 sm:px-10 py-24 sm:py-32" style={{ backgroundColor: red, color: "#FFFFFF" }} aria-labelledby="cierre">
            <div className="mx-auto max-w-6xl">
              <h2 id="cierre" className="max-w-4xl font-extrabold uppercase leading-[0.98] text-[clamp(3rem,10vw,7.5rem)]" style={D}>
                {d.cierre}
              </h2>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 inline-flex items-center gap-6 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] transition-[gap] hover:gap-9"
                style={{ backgroundColor: INK, color: PAPER, ...M }}
              >
                {ctaText}
                <Arrow />
              </a>
            </div>
          </section>
        )}
      </main>

      {/* ─── Pie ─── */}
      <footer className="px-5 sm:px-10 py-12">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div>
            <p className="text-4xl font-extrabold uppercase leading-none" style={D}>
              {brand}
            </p>
            {tagline && (
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/60" style={M}>
                {tagline}
              </p>
            )}
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-white/70" style={M}>
            {d.instagram && (
              <li>
                <a href={d.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                  Instagram <Arrow className="w-3 h-3" />
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                  WhatsApp <Arrow className="w-3 h-3" />
                </a>
              </li>
            )}
            {tel && (
              <li>
                <a href={tel} className="hover:text-white">
                  {d.telefono}
                </a>
              </li>
            )}
          </ul>
        </div>
      </footer>

      {/* ─── Botón flotante en celular ─── */}
      {wa && (
        <nav aria-label="Contacto rápido" className="sm:hidden fixed bottom-3 inset-x-3 z-40 flex gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 h-12 text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
            style={{ backgroundColor: red, ...M }}
          >
            <WhatsAppIcon className="w-4 h-4" /> Turno por WhatsApp
          </a>
          {tel && (
            <a href={tel} aria-label={`Llamar al ${d.telefono}`} className="grid place-items-center w-12 h-12 border border-white/20 text-white shadow-[0_8px_30px_rgba(0,0,0,0.45)]" style={{ backgroundColor: INK }}>
              <PhoneIcon className="w-4 h-4" />
            </a>
          )}
        </nav>
      )}
    </div>
  );
}
