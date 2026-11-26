import Image from "next/image";
import { Alfa_Slab_One, Archivo } from "next/font/google";
import type { Demo } from "@content/demos";
import { MI_WHATSAPP, has, waLink, telLink, mapsSearch } from "@/lib/demo-utils";

/*
 * Diseño "garage": sale de la identidad de Radaelli, no del portfolio.
 * - Logo: slab grueso rojo con contorno negro, en arco, sobre blanco.
 * - Destacadas de Instagram: círculos rojos con íconos negros de línea.
 * - Taller: techo de luces hexagonales y piso a cuadros rojo y negro.
 * Igual que la plantilla: solo muestra lo que está en el archivo de datos.
 */

const slab = Alfa_Slab_One({ subsets: ["latin"], preload: false, weight: "400", variable: "--font-gr-slab" });
const sans = Archivo({ subsets: ["latin"], preload: false, weight: ["400", "500", "600", "700", "800"], variable: "--font-gr-sans" });

const BLACK = "#121212";
const SLAB = { fontFamily: "var(--font-gr-slab), Georgia, serif" };

/* Contorno negro como el del logo (sombra en 8 direcciones + caída) */
const outline = (w: number) =>
  [
    `${w}px 0 ${BLACK}`, `-${w}px 0 ${BLACK}`, `0 ${w}px ${BLACK}`, `0 -${w}px ${BLACK}`,
    `${w}px ${w}px ${BLACK}`, `-${w}px ${w}px ${BLACK}`, `${w}px -${w}px ${BLACK}`, `-${w}px -${w}px ${BLACK}`,
    `${w + 2}px ${w + 3}px 0 ${BLACK}`,
  ].join(", ");

/* ─────────── Íconos de línea (como sus destacadas) ─────────── */
function Svg({ children, className = "w-7 h-7" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const icons = {
  martillo: (
    <>
      <path d="M13.5 3.5 20.5 10.5 18 13 11 6z" />
      <path d="M13 8.5 4 17.5a1.5 1.5 0 0 0 2.1 2.1l9-9" />
    </>
  ),
  pintura: (
    <>
      <rect x="6" y="9" width="8" height="12" rx="1.5" />
      <path d="M8 9V6h4v3M12 6h2l1-2" />
      <path d="M17 7h.01M19 5h.01M19 9h.01M21 7h.01" />
    </>
  ),
  brillo: (
    <>
      <path d="M11 3l1.6 4.4L17 9l-4.4 1.6L11 15l-1.6-4.4L5 9l4.4-1.6z" />
      <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" />
    </>
  ),
  polarizado: (
    <>
      <path d="M2.5 16.5h19v-3.5l-3.2-5H7.2L4 13H2.5z" />
      <path d="M9 9.5 7.5 13M12.5 9.5 11 13M16 9.5 14.5 13" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </>
  ),
  llanta: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3v6.5M12 14.5V21M3.4 9.2l6.2 2M14.4 12.8l6.2 2M5.6 18.7l4.4-4.8M14 10.1l4.4-4.8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  auto: (
    <>
      <path d="M3 16.5h18V13l-2.5-4.5h-13L3 13z" />
      <path d="M3 13h18" />
      <circle cx="7" cy="16.5" r="1.8" />
      <circle cx="17" cy="16.5" r="1.8" />
    </>
  ),
};
function iconFor(nombre: string) {
  const n = nombre.toLowerCase();
  if (n.includes("bollo")) return icons.martillo;
  if (n.includes("pintura") || n.includes("chapa")) return icons.pintura;
  if (n.includes("detail")) return icons.brillo;
  if (n.includes("polariz")) return icons.polarizado;
  if (n.includes("llanta")) return icons.llanta;
  return icons.auto;
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
    <Svg className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Svg>
  );
}

/* ─────────── Motivos del taller ─────────── */

/* Luces hexagonales del techo del taller */
function Hexes({ id, stroke, opacity }: { id: string; stroke: string; opacity: number }) {
  const r = 26;
  const h = Math.sqrt(3) * r;
  const hex = (cx: number, cy: number) =>
    [[cx - r, cy], [cx - r / 2, cy - h / 2], [cx + r / 2, cy - h / 2], [cx + r, cy], [cx + r / 2, cy + h / 2], [cx - r / 2, cy + h / 2]]
      .map((p) => p.join(","))
      .join(" ");
  return (
    <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <pattern id={id} width={3 * r} height={h} patternUnits="userSpaceOnUse">
          <polygon points={hex(r, h / 2)} fill="none" stroke={stroke} strokeWidth="2" />
          <polygon points={hex(2.5 * r, 0)} fill="none" stroke={stroke} strokeWidth="2" />
          <polygon points={hex(2.5 * r, h)} fill="none" stroke={stroke} strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity} />
    </svg>
  );
}

/* Piso a cuadros rojo y negro */
function Checker({ red }: { red: string }) {
  return (
    <div
      className="h-5 sm:h-6"
      aria-hidden="true"
      style={{ backgroundImage: `conic-gradient(${red} 25%, ${BLACK} 0 50%, ${red} 0 75%, ${BLACK} 0)`, backgroundSize: "40px 40px" }}
    />
  );
}

/* Bajada entre líneas, como "— SACABOLLOS & DETAILING —" del logo */
function Ribbon({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center justify-center gap-3 font-extrabold uppercase tracking-[0.08em] ${dark ? "text-white" : "text-[#121212]"}`}>
      <span className={`h-[3px] w-8 sm:w-14 rounded-full ${dark ? "bg-white" : "bg-[#121212]"}`} aria-hidden="true" />
      <span>{children}</span>
      <span className={`h-[3px] w-8 sm:w-14 rounded-full ${dark ? "bg-white" : "bg-[#121212]"}`} aria-hidden="true" />
    </p>
  );
}

/* Título de sección en slab con un subrayado a cuadros */
function Title({ children, id, light = false }: { children: React.ReactNode; id: string; light?: boolean }) {
  return (
    <h2 id={id} className={`text-4xl sm:text-5xl leading-tight ${light ? "text-white" : "text-[#121212]"}`} style={SLAB}>
      {children}
    </h2>
  );
}

/* Círculo rojo con ícono, como las destacadas de su Instagram */
function Badge({ children, red, size = "w-16 h-16" }: { children: React.ReactNode; red: string; size?: string }) {
  return (
    <span className={`grid place-items-center shrink-0 rounded-full ring-2 ring-offset-2 ring-[#121212]/15 text-[#121212] ${size}`} style={{ backgroundColor: red }}>
      {children}
    </span>
  );
}

/* ─────────── Diseño ─────────── */
export default function GarageTaller({ d }: { d: Demo }) {
  const red = d.color;
  const [brand, tagline] = d.nombre.includes(" - ") ? d.nombre.split(" - ") : [d.nombreCorto ?? d.nombre, ""];
  const short = d.nombreCorto ?? brand;

  const wa = d.whatsapp ? waLink(d.whatsapp, d.mensajeWhatsApp ?? "Hola, quería hacer una consulta.") : null;
  const tel = d.telefono ? telLink(d.telefono) : null;
  const ctaText = d.textoBotonWhatsApp ?? "Escribinos por WhatsApp";
  const propuesta = waLink(MI_WHATSAPP, `¡Hola Daniel! Vi la propuesta de diseño para ${short}.`);

  const sedes = has(d.sucursales)
    ? d.sucursales.filter((s) => s.direccion || s.mapa)
    : d.direccion || d.mapa
      ? [{ nombre: d.barrio ?? "", direccion: d.direccion, mapa: d.mapa, horarios: d.horarios }]
      : [];

  const pill = "inline-flex items-center justify-center gap-2.5 rounded-full font-bold transition-transform active:scale-[0.97]";

  return (
    <div className={`${slab.variable} ${sans.variable} min-h-screen bg-white text-[#121212] pb-24 sm:pb-0`} style={{ fontFamily: "var(--font-gr-sans), system-ui, sans-serif" }}>
      {/* Franja: propuesta de diseño (mía, discreta) */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#121212] text-white/75 text-[11px] sm:text-xs">
        <p className="px-4 py-1.5 text-center">
          {d.ejemplo && <strong className="text-amber-300 font-semibold">Ejemplo con datos ficticios · </strong>}
          Propuesta de diseño para {short} · por{" "}
          <a href={propuesta} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">
            Daniel Niño
          </a>
        </p>
      </div>

      {/* ─── Hero: el logo en grande ─── */}
      <header className="relative overflow-hidden pt-8">
        <Hexes id="hex-hero" stroke="#121212" opacity={0.06} />
        <div className="relative mx-auto max-w-5xl px-5 pt-10 pb-14 sm:pt-16 sm:pb-20 text-center">
          <h1>
            <span className="sr-only">{d.nombre}</span>
            {/* Nombre en arco, como el logo */}
            <svg viewBox="0 0 1000 270" className="w-full max-w-3xl mx-auto overflow-visible" aria-hidden="true">
              <defs>
                <path id="arco" d="M 30 250 Q 500 140 970 250" />
              </defs>
              <text
                style={SLAB}
                fontSize="150"
                textAnchor="middle"
                fill={red}
                stroke={BLACK}
                strokeWidth="14"
                strokeLinejoin="round"
                paintOrder="stroke fill"
              >
                <textPath href="#arco" startOffset="50%">
                  {brand.toUpperCase()}
                </textPath>
              </text>
            </svg>
          </h1>
          {tagline && (
            <div className="-mt-2 sm:-mt-4 text-sm sm:text-xl">
              <Ribbon>{tagline}</Ribbon>
            </div>
          )}

          {d.servicioPrincipal && <p className="mt-6 text-lg sm:text-2xl text-[#121212]/80">{d.servicioPrincipal}</p>}
          {d.desde && (
            <p className="mt-3 inline-block rounded-full bg-[#121212] px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">Desde {d.desde}</p>
          )}

          {(wa || tel) && (
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`${pill} px-7 py-4 text-lg text-white shadow-[0_6px_0_#121212] hover:-translate-y-0.5`} style={{ backgroundColor: red }}>
                  <WhatsAppIcon /> {ctaText}
                </a>
              )}
              {tel && (
                <a href={tel} className={`${pill} px-6 py-3.5 border-2 border-[#121212] hover:bg-[#121212] hover:text-white`}>
                  <PhoneIcon /> {d.telefono}
                </a>
              )}
            </div>
          )}

          {/* Fotos como sus destacadas: círculos con aro rojo */}
          {has(d.fotos) && (
            <ul className="mt-12 flex justify-center gap-4 sm:gap-6" aria-label="Algunos trabajos">
              {d.fotos.slice(0, 4).map((f) => (
                <li key={f.src} className="rounded-full p-[3px]" style={{ background: `conic-gradient(${red}, ${BLACK}, ${red})` }}>
                  <span className="block rounded-full bg-white p-[3px]">
                    <span className="relative block w-16 h-16 sm:w-24 sm:h-24 overflow-hidden rounded-full">
                      <Image src={f.src} alt={f.alt} fill sizes="96px" className="object-cover" />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <Checker red={red} />

      <main>
        {/* ─── Servicios ─── */}
        {has(d.servicios) && (
          <section className="px-5 py-16 sm:py-24" aria-labelledby="servicios">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <Title id="servicios">Servicios</Title>
                <p className="mt-3 text-[#121212]/70">Tocá el que necesitás y consultanos por WhatsApp.</p>
              </div>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {d.servicios.map((s) => {
                  const href = d.whatsappPorServicio && d.whatsapp ? waLink(d.whatsapp, `Hola, quiero consultar por el servicio de ${s.nombre}`) : null;
                  const inner = (
                    <>
                      <Badge red={red}>
                        <Svg className="w-8 h-8 [stroke-width:2.2]">{iconFor(s.nombre)}</Svg>
                      </Badge>
                      <span className="min-w-0">
                        <span className="block text-xl leading-snug" style={SLAB}>
                          {s.nombre}
                        </span>
                        {s.detalle && <span className="mt-1 block text-[15px] leading-relaxed text-[#121212]/70">{s.detalle}</span>}
                        {href && (
                          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: red }}>
                            <WhatsAppIcon className="w-4 h-4" /> Consultar
                          </span>
                        )}
                      </span>
                    </>
                  );
                  return (
                    <li key={s.nombre}>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${s.nombre}: consultar por WhatsApp`}
                          className="flex gap-4 h-full rounded-3xl border-2 border-[#121212] bg-white p-5 shadow-[4px_4px_0_#121212] transition-transform hover:-translate-y-1"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex gap-4 h-full rounded-3xl border-2 border-[#121212] bg-white p-5">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {/* ─── Trabajos: bajo las luces hexagonales ─── */}
        {has(d.fotos) && (
          <section className="relative overflow-hidden bg-[#121212] px-5 py-16 sm:py-24 text-white" aria-labelledby="trabajos">
            <Hexes id="hex-trabajos" stroke="#FFFFFF" opacity={0.08} />
            <div className="relative mx-auto max-w-5xl">
              <div className="text-center">
                <Title id="trabajos" light>
                  Trabajos
                </Title>
                {d.instagram && (
                  <a href={d.instagram} target="_blank" rel="noopener noreferrer" className={`${pill} mt-5 px-5 py-2.5 text-sm bg-white text-[#121212]`}>
                    Ver más en Instagram
                  </a>
                )}
              </div>
              <ul className="mt-10 -mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible" aria-label="Galería de trabajos">
                {d.fotos.map((f) => (
                  <li key={f.src} className="snap-start shrink-0 w-[75%] sm:w-auto">
                    <div className="relative aspect-square overflow-hidden rounded-3xl border-4 border-white/90">
                      <Image src={f.src} alt={f.alt} fill sizes="(max-width: 640px) 75vw, 280px" className="object-cover" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ─── Cómo trabajamos ─── */}
        {has(d.pasos) && (
          <section className="px-5 py-16 sm:py-24" aria-labelledby="proceso">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <Title id="proceso">Cómo trabajamos</Title>
              </div>
              <ol className="relative mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6">
                {/* Línea punteada que une los pasos */}
                <span className="hidden sm:block absolute top-8 left-[16%] right-[16%] border-t-[3px] border-dashed border-[#121212]/25" aria-hidden="true" />
                {d.pasos.map((p, i) => (
                  <li key={p.titulo} className="relative text-center">
                    <span className="relative mx-auto grid place-items-center w-16 h-16 rounded-full border-[3px] border-[#121212] text-2xl text-white" style={{ ...SLAB, backgroundColor: red }}>
                      <span className="sr-only">Paso </span>
                      {i + 1}
                    </span>
                    <h3 className="mt-4 text-xl" style={SLAB}>
                      {p.titulo}
                    </h3>
                    <p className="mt-1 text-[15px] text-[#121212]/70 max-w-[16rem] mx-auto">{p.texto}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ─── Reseñas (solo con datos reales) ─── */}
        {(d.google || has(d.resenas)) && (
          <section className="px-5 py-16 sm:py-24 border-t-2 border-[#121212]" aria-labelledby="resenas">
            <div className="mx-auto max-w-5xl text-center">
              <Title id="resenas">Opiniones en Google</Title>
              {d.google && (
                <p className="mt-3 text-lg font-bold">
                  {d.google.puntaje.toString().replace(".", ",")} de 5 · {d.google.resenas} reseñas
                </p>
              )}
              {has(d.resenas) && (
                <ul className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
                  {d.resenas.map((r, i) => (
                    <li key={i} className="rounded-3xl border-2 border-[#121212] p-5">
                      <p className="leading-relaxed">“{r.texto}”</p>
                      <p className="mt-3 text-sm font-bold">{r.autor}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* ─── Ubicación ─── */}
        {sedes.length > 0 && (
          <section className="px-5 pb-16 sm:pb-24" aria-labelledby="ubicacion">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <Title id="ubicacion">{sedes.length > 1 ? "Sucursales" : "Dónde estamos"}</Title>
              </div>
              <div className="mt-10 grid gap-6">
                {sedes.map((s) => {
                  const q = s.mapa || s.direccion || "";
                  return (
                    <div key={s.nombre || q} className="grid overflow-hidden rounded-3xl border-2 border-[#121212] lg:grid-cols-5">
                      <div className="p-6 sm:p-8 lg:col-span-2 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <Badge red={red} size="w-14 h-14">
                            <Svg className="w-7 h-7 [stroke-width:2.2]">{icons.pin}</Svg>
                          </Badge>
                          {s.nombre && (
                            <p className="text-2xl" style={SLAB}>
                              Sucursal {s.nombre}
                            </p>
                          )}
                        </div>
                        {s.direccion && <p className="text-lg font-semibold">{s.direccion}</p>}
                        {has(s.horarios) && (
                          <dl className="text-[15px]">
                            {s.horarios.map((h) => (
                              <div key={h.dias} className="flex justify-between gap-4 py-1.5 border-b border-[#121212]/15">
                                <dt className="text-[#121212]/70">{h.dias}</dt>
                                <dd className="font-semibold">{h.horas}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {q && (
                          <a href={mapsSearch(q)} target="_blank" rel="noopener noreferrer" className={`${pill} self-start px-5 py-2.5 text-sm bg-[#121212] text-white`}>
                            Cómo llegar
                          </a>
                        )}
                      </div>
                      {q && (
                        <div className="relative min-h-[260px] lg:col-span-3 border-t-2 lg:border-t-0 lg:border-l-2 border-[#121212] bg-zinc-100">
                          <iframe
                            title={`Mapa: ${d.nombre}${s.nombre ? ` — ${s.nombre}` : ""}`}
                            src={`https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`}
                            className="absolute inset-0 w-full h-full"
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
          <section className="relative overflow-hidden px-5 py-16 sm:py-24 text-center" style={{ backgroundColor: red }} aria-labelledby="cierre">
            <Hexes id="hex-cierre" stroke="#FFFFFF" opacity={0.12} />
            <div className="relative mx-auto max-w-3xl">
              <h2 id="cierre" className="text-4xl sm:text-6xl leading-tight text-white" style={{ ...SLAB, textShadow: outline(2) }}>
                {d.cierre}
              </h2>
              <a href={wa} target="_blank" rel="noopener noreferrer" className={`${pill} mt-9 px-7 py-4 text-lg bg-white text-[#121212] shadow-[0_6px_0_#121212] hover:-translate-y-0.5`}>
                <WhatsAppIcon /> {ctaText}
              </a>
            </div>
          </section>
        )}
        <Checker red={red} />
      </main>

      {/* ─── Pie ─── */}
      <footer className="bg-[#121212] px-5 py-12 text-white">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-5 text-center">
          <p className="text-4xl text-white" style={{ ...SLAB, textShadow: outline(2).replaceAll(BLACK, red) }}>
            {brand.toUpperCase()}
          </p>
          {tagline && (
            <div className="text-xs sm:text-sm">
              <Ribbon dark>{tagline}</Ribbon>
            </div>
          )}
          <ul className="mt-2 flex flex-wrap justify-center gap-3">
            {d.instagram && (
              <li>
                <a href={d.instagram} target="_blank" rel="noopener noreferrer" className={`${pill} px-5 py-2.5 text-sm border-2 border-white/80 hover:bg-white hover:text-[#121212]`}>
                  Instagram
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`${pill} px-5 py-2.5 text-sm border-2 border-white/80 hover:bg-white hover:text-[#121212]`}>
                  WhatsApp
                </a>
              </li>
            )}
            {tel && (
              <li>
                <a href={tel} className={`${pill} px-5 py-2.5 text-sm border-2 border-white/80 hover:bg-white hover:text-[#121212]`}>
                  {d.telefono}
                </a>
              </li>
            )}
          </ul>
        </div>
      </footer>

      {/* ─── Botón flotante de WhatsApp (celular) ─── */}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={`sm:hidden fixed bottom-4 right-4 z-40 ${pill} pl-4 pr-5 py-3.5 text-white border-2 border-[#121212] shadow-[0_5px_0_#121212]`}
          style={{ backgroundColor: red }}
        >
          <WhatsAppIcon className="w-6 h-6" /> Turnos
        </a>
      )}
    </div>
  );
}
