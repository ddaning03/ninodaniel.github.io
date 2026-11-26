import Image from "next/image";
import { Saira, Figtree, Archivo, Michroma, DM_Sans } from "next/font/google";
import type { Demo } from "@content/demos";
import { MI_WHATSAPP, has, waLink, telLink, mapsSearch } from "@/lib/demo-utils";

/*
 * Diseño "estudio": estudio de detailing luminoso con la identidad del negocio.
 * - El techo de luces LED hexagonales del taller, en perspectiva, sobre un techo claro.
 * - Base clara y fría, tarjetas blancas; el color de la marca como acento.
 * - Tipografía elegible por demo (campo `tipografia`).
 * Igual que la plantilla: solo muestra lo que está en el archivo de datos.
 */

/* ─────────── Tipografías (se descarga solo la que usa la demo) ─────────── */
const saira = Saira({ subsets: ["latin"], weight: "variable", axes: ["wdth"], variable: "--font-es-saira" });
const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-es-figtree" });
const archivo = Archivo({ subsets: ["latin"], weight: "variable", axes: ["wdth"], variable: "--font-es-archivo" });
const michroma = Michroma({ subsets: ["latin"], weight: "400", variable: "--font-es-michroma" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-es-dmsans" });

const TYPE = {
  saira: {
    vars: `${saira.variable} ${figtree.variable}`,
    head: { fontFamily: "var(--font-es-saira), sans-serif", fontStretch: "118%", fontWeight: 650 } as React.CSSProperties,
    body: "var(--font-es-figtree), system-ui, sans-serif",
    tracking: "-0.01em",
  },
  archivo: {
    vars: archivo.variable,
    head: { fontFamily: "var(--font-es-archivo), sans-serif", fontStretch: "122%", fontWeight: 700 } as React.CSSProperties,
    body: "var(--font-es-archivo), system-ui, sans-serif",
    tracking: "-0.02em",
  },
  michroma: {
    vars: `${michroma.variable} ${dmSans.variable}`,
    head: { fontFamily: "var(--font-es-michroma), sans-serif", fontWeight: 400 } as React.CSSProperties,
    body: "var(--font-es-dmsans), system-ui, sans-serif",
    tracking: "-0.01em",
  },
} as const;

/* ─────────── Paleta clara ─────────── */
const INK = "#15171C";
const MUTED = "#555B65"; /* 6,6:1 sobre blanco */
const BG = "#F1F2F4";

/* ─────────── Íconos finos ─────────── */
function Svg({ children, className = "w-7 h-7" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const icons = {
  martillo: (<><path d="M13.5 3.5 20.5 10.5 18 13 11 6z" /><path d="M13 8.5 4 17.5a1.5 1.5 0 0 0 2.1 2.1l9-9" /></>),
  pintura: (<><rect x="6" y="9" width="8" height="12" rx="1.5" /><path d="M8 9V6h4v3M12 6h2l1-2" /><path d="M17 7h.01M19 5h.01M19 9h.01M21 7h.01" /></>),
  brillo: (<><path d="M11 3l1.6 4.4L17 9l-4.4 1.6L11 15l-1.6-4.4L5 9l4.4-1.6z" /><path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" /></>),
  polarizado: (<><path d="M2.5 16.5h19v-3.5l-3.2-5H7.2L4 13H2.5z" /><path d="M9 9.5 7.5 13M12.5 9.5 11 13M16 9.5 14.5 13" /><circle cx="7" cy="17" r="1.6" /><circle cx="17" cy="17" r="1.6" /></>),
  llanta: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><path d="M12 3v6.5M12 14.5V21M3.4 9.2l6.2 2M14.4 12.8l6.2 2M5.6 18.7l4.4-4.8M14 10.1l4.4-4.8" /></>),
  auto: (<><path d="M3 16.5h18V13l-2.5-4.5h-13L3 13z" /><circle cx="7" cy="16.5" r="1.8" /><circle cx="17" cy="16.5" r="1.8" /></>),
  pin: (<><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  flecha: (<path d="M5 12h14M13 6l6 6-6 6" />),
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

/* ─────────── Techo de luces LED hexagonales (claro) ─────────── */
/* Perspectiva calculada a mano: cada vértice del techo se proyecta hacia la cámara.
   Cada luz se dibuja como un tubo LED: una sombra gris debajo y la luz blanca arriba. */
function HexCeiling({ id = "led" }: { id?: string }) {
  const W = 1600, horizon = 560, F = 620, Z0 = 320, ceiling = 520, r = 120;
  const h = Math.sqrt(3) * r;
  const project = (X: number, Z: number) => {
    const k = F / (Z + Z0);
    return [W / 2 + X * k, horizon - ceiling * k, k] as const;
  };
  const cells: { pts: string; k: number }[] = [];
  for (let c = -24; c <= 24; c++) {
    for (let row = 0; row < 22; row++) {
      const cx = c * 1.5 * r;
      const cz = 120 + row * h + (c % 2 ? h / 2 : 0);
      const verts = [[cx - r, cz], [cx - r / 2, cz - h / 2], [cx + r / 2, cz - h / 2], [cx + r, cz], [cx + r / 2, cz + h / 2], [cx - r / 2, cz + h / 2]].map(([x, z]) => project(x, z));
      const xs = verts.map((v) => v[0]);
      const ys = verts.map((v) => v[1]);
      if (Math.max(...ys) < -20 || Math.min(...xs) > W + 20 || Math.max(...xs) < -20) continue;
      cells.push({ pts: verts.map((v) => `${v[0].toFixed(1)},${v[1].toFixed(1)}`).join(" "), k: project(cx, cz)[2] });
    }
  }
  const w = (k: number) => Math.min(6, Math.max(0.8, 3.2 * k));
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[80%] overflow-hidden"
      aria-hidden="true"
      style={{ maskImage: "linear-gradient(to bottom, #000 30%, transparent 92%)", WebkitMaskImage: "linear-gradient(to bottom, #000 30%, transparent 92%)" }}
    >
      <svg viewBox={`0 0 ${W} 620`} preserveAspectRatio="xMidYMin slice" className="absolute inset-0 w-full h-full">
        <defs>
          <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Carcasa / sombra de cada tubo */}
        <g fill="none" stroke="#B9BEC6" strokeLinejoin="round">
          {cells.map((c, i) => (
            <polygon key={i} points={c.pts} strokeWidth={w(c.k) + 2.2} strokeOpacity={Math.min(0.55, Math.max(0.12, c.k * 0.45))} />
          ))}
        </g>
        {/* Luz */}
        <g filter={`url(#${id})`} fill="none" stroke="#FFFFFF" strokeLinejoin="round">
          {cells.map((c, i) => (
            <polygon key={i} points={c.pts} strokeWidth={w(c.k)} />
          ))}
        </g>
      </svg>
      <div className="estudio-sweep absolute inset-0 opacity-60" />
    </div>
  );
}

/* ─────────── Piezas ─────────── */
function Eyebrow({ children, red }: { children: React.ReactNode; red: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/80 px-3.5 py-1.5 text-[13px] font-medium backdrop-blur" style={{ color: MUTED }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: red }} aria-hidden="true" />
      {children}
    </p>
  );
}
function SectionHead({ eyebrow, title, id, red, H }: { eyebrow: string; title: string; id: string; red: string; H: React.CSSProperties }) {
  return (
    <div className="max-w-2xl">
      <Eyebrow red={red}>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-5 text-3xl sm:text-[2.75rem] leading-[1.1]" style={{ ...H, color: INK }}>
        {title}
      </h2>
    </div>
  );
}

/* ─────────── Diseño ─────────── */
export default function EstudioTaller({ d }: { d: Demo }) {
  const t = TYPE[d.tipografia ?? "saira"];
  const H: React.CSSProperties = { ...t.head, letterSpacing: t.tracking };
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

  const card = "rounded-[26px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(20,24,30,.04),0_12px_32px_-12px_rgba(20,24,30,.12)]";
  const primaryBtn = "group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5";
  const primaryStyle = { backgroundColor: red, boxShadow: `0 12px 28px -10px ${red}` };
  const ghostBtn = "inline-flex items-center justify-center gap-2.5 rounded-full border border-black/10 bg-white px-6 py-4 text-[15px] font-semibold transition-colors hover:border-black/25";

  const headline = d.servicioPrincipal ?? d.rubro;
  const servicios = d.servicios ?? [];

  return (
    <div className={`${t.vars} min-h-screen antialiased pb-24 sm:pb-0`} style={{ backgroundColor: BG, color: INK, fontFamily: t.body }}>
      {/* Franja: propuesta de diseño */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#15171C] text-[11px] sm:text-xs text-white/75">
        <p className="px-4 py-1.5 text-center">
          {d.ejemplo && <strong className="text-amber-300 font-semibold">Ejemplo con datos ficticios · </strong>}
          Propuesta de diseño para {short} · por{" "}
          <a href={propuesta} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">
            Daniel Niño
          </a>
        </p>
      </div>

      {/* ─── Hero ─── */}
      <header className="relative overflow-hidden pt-8" style={{ background: "linear-gradient(180deg, #DCDFE4 0%, #E9EBEE 38%, #F1F2F4 70%)" }}>
        <HexCeiling />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <nav className="mt-4 flex items-center justify-between rounded-full border border-white/70 bg-white/75 py-2.5 pl-5 pr-2.5 shadow-[0_8px_24px_-12px_rgba(20,24,30,.25)] backdrop-blur-xl" aria-label={short}>
            <p className="text-[15px] tracking-[0.14em]" style={{ ...t.head, color: INK }}>
              {brand.toUpperCase()}
              <span style={{ color: red }}>.</span>
            </p>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: red }}>
                <WhatsAppIcon className="w-4 h-4" /> <span className="hidden sm:inline">Turnos</span>
              </a>
            )}
          </nav>

          <div className="grid gap-12 pt-20 pb-20 sm:pt-28 sm:pb-28 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow red={red}>
                {d.rubro}
                {d.desde && ` · desde ${d.desde}`}
              </Eyebrow>
              <h1 className="mt-6 text-[clamp(2.4rem,7.6vw,5rem)] leading-[1.04]" style={{ ...H, color: INK }}>
                <span className="sr-only">{d.nombre}: </span>
                {headline}
                <span style={{ color: red }}>.</span>
              </h1>
              {tagline && <p className="mt-5 text-lg" style={{ color: MUTED }}>{brand} · {tagline}</p>}

              {(wa || tel) && (
                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className={primaryBtn} style={primaryStyle}>
                      <WhatsAppIcon /> {ctaText}
                      <Svg className="w-4 h-4 transition-transform group-hover:translate-x-1">{icons.flecha}</Svg>
                    </a>
                  )}
                  {tel && (
                    <a href={tel} className={ghostBtn} style={{ color: INK }}>
                      Llamar · {d.telefono}
                    </a>
                  )}
                </div>
              )}
            </div>

            {d.heroImagen && (
              <figure className="lg:col-span-4 mx-auto w-full max-w-[320px]">
                <div className={`${card} p-2.5`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[18px]">
                    <Image src={d.heroImagen.src} alt={d.heroImagen.alt} fill priority sizes="320px" className="object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.22)_0%,transparent_35%)]" aria-hidden="true" />
                  </div>
                  <figcaption className="px-2 pt-3 pb-1 text-[13px]" style={{ color: MUTED }}>
                    Trabajo terminado
                  </figcaption>
                </div>
              </figure>
            )}
          </div>
        </div>
        {/* Línea roja de acento, como un filete en la carrocería */}
        <div className="relative h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${red} 20%, ${red} 80%, transparent)` }} aria-hidden="true" />
      </header>

      <main>
        {/* ─── Servicios (bento) ─── */}
        {servicios.length > 0 && (
          <section className="px-5 sm:px-8 py-20 sm:py-28" aria-labelledby="servicios">
            <div className="mx-auto max-w-6xl">
              <SectionHead red={red} H={H} eyebrow="Servicios" title="Todo lo que tu auto necesita, en un solo lugar" id="servicios" />
              <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(190px,auto)]">
                {servicios.map((s, i) => {
                  const big = i === 0;
                  const href = d.whatsappPorServicio && d.whatsapp ? waLink(d.whatsapp, `Hola, quiero consultar por el servicio de ${s.nombre}`) : null;
                  return (
                    <li key={s.nombre} className={`group relative overflow-hidden ${card} p-6 sm:p-7 flex flex-col transition-transform duration-500 hover:-translate-y-1 ${big ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}>
                      {big && (
                        <span className="pointer-events-none absolute -bottom-10 -right-10 hidden lg:block" style={{ color: `${red}14` }} aria-hidden="true">
                          <Svg className="w-72 h-72">{iconFor(s.nombre)}</Svg>
                        </span>
                      )}
                      <span className="relative grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ backgroundColor: red, boxShadow: `0 10px 22px -10px ${red}` }}>
                        <Svg>{iconFor(s.nombre)}</Svg>
                      </span>
                      <h3 className={`relative mt-6 ${big ? "text-3xl sm:text-4xl" : "text-xl"}`} style={{ ...H, color: INK }}>
                        {s.nombre}
                      </h3>
                      {s.detalle && (
                        <p className={`relative mt-3 leading-relaxed ${big ? "text-lg max-w-xs" : "text-[15px]"}`} style={{ color: MUTED }}>
                          {s.detalle}
                        </p>
                      )}
                      {href && (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="relative mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: red }} aria-label={`Consultar por ${s.nombre} por WhatsApp`}>
                          Consultar
                          <Svg className="w-4 h-4 transition-transform group-hover:translate-x-1">{icons.flecha}</Svg>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {/* ─── Trabajos ─── */}
        {has(d.fotos) && (
          <section className="px-5 sm:px-8 pb-20 sm:pb-28" aria-labelledby="trabajos">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHead red={red} H={H} eyebrow="Trabajos" title="Recién salidos del taller" id="trabajos" />
                {d.instagram && (
                  <a href={d.instagram} target="_blank" rel="noopener noreferrer" className={ghostBtn} style={{ color: INK }}>
                    Ver más en Instagram
                  </a>
                )}
              </div>
              <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label="Galería de trabajos">
                {d.fotos.map((f) => (
                  <li key={f.src} className={`group overflow-hidden ${card} p-1.5`}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
                      <Image src={f.src} alt={f.alt} fill sizes="(max-width: 1024px) 50vw, 280px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.18)_0%,transparent_30%)]" aria-hidden="true" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ─── Cómo trabajamos ─── */}
        {has(d.pasos) && (
          <section className="px-5 sm:px-8 pb-20 sm:pb-28" aria-labelledby="proceso">
            <div className="mx-auto max-w-6xl">
              <SectionHead red={red} H={H} eyebrow="Cómo trabajamos" title="Tres pasos y listo" id="proceso" />
              <ol className="mt-12 grid gap-4 sm:grid-cols-3">
                {d.pasos.map((p, i) => (
                  <li key={p.titulo} className={`${card} p-7`}>
                    <span className="block text-5xl leading-none" style={{ ...H, color: red }} aria-hidden="true">
                      0{i + 1}
                    </span>
                    <h3 className="mt-6 text-lg" style={{ ...H, color: INK }}>
                      <span className="sr-only">Paso {i + 1}: </span>
                      {p.titulo}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTED }}>
                      {p.texto}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ─── Reseñas (solo con datos reales) ─── */}
        {(d.google || has(d.resenas)) && (
          <section className="px-5 sm:px-8 pb-20 sm:pb-28" aria-labelledby="resenas">
            <div className="mx-auto max-w-6xl">
              <SectionHead red={red} H={H} eyebrow="Google" title={d.google ? `${d.google.puntaje.toString().replace(".", ",")} de 5 en ${d.google.resenas} reseñas` : "Lo que dicen"} id="resenas" />
              {has(d.resenas) && (
                <ul className="mt-12 grid gap-4 sm:grid-cols-3">
                  {d.resenas.map((r, i) => (
                    <li key={i} className={`${card} p-7`}>
                      <p className="leading-relaxed">“{r.texto}”</p>
                      <p className="mt-4 text-sm" style={{ color: MUTED }}>{r.autor}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* ─── Ubicación ─── */}
        {sedes.length > 0 && (
          <section className="px-5 sm:px-8 pb-20 sm:pb-28" aria-labelledby="ubicacion">
            <div className="mx-auto max-w-6xl">
              <SectionHead red={red} H={H} eyebrow={sedes.length > 1 ? "Sucursales" : "Ubicación"} title="Vení a vernos" id="ubicacion" />
              <div className="mt-12 grid gap-4">
                {sedes.map((s) => {
                  const q = s.mapa || s.direccion || "";
                  return (
                    <div key={s.nombre || q} className={`${card} grid overflow-hidden lg:grid-cols-5`}>
                      <div className="p-7 sm:p-9 lg:col-span-2 flex flex-col gap-5">
                        <span className="grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ backgroundColor: red, boxShadow: `0 10px 22px -10px ${red}` }}>
                          <Svg>{icons.pin}</Svg>
                        </span>
                        {s.nombre && <p className="text-sm" style={{ color: MUTED }}>Sucursal {s.nombre}</p>}
                        {s.direccion && (
                          <p className="text-2xl leading-snug" style={{ ...H, color: INK }}>
                            {s.direccion}
                          </p>
                        )}
                        {has(s.horarios) && (
                          <dl className="text-[15px]">
                            {s.horarios.map((h) => (
                              <div key={h.dias} className="flex justify-between gap-4 py-2 border-b border-black/10">
                                <dt style={{ color: MUTED }}>{h.dias}</dt>
                                <dd className="font-semibold">{h.horas}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {q && (
                          <a href={mapsSearch(q)} target="_blank" rel="noopener noreferrer" className={`${ghostBtn} self-start py-3`} style={{ color: INK }}>
                            Cómo llegar
                          </a>
                        )}
                      </div>
                      {q && (
                        <div className="relative min-h-[280px] lg:col-span-3 border-t lg:border-t-0 lg:border-l border-black/[0.06] bg-[#E7E9EC]">
                          <iframe
                            title={`Mapa: ${d.nombre}${s.nombre ? ` — ${s.nombre}` : ""}`}
                            src={`https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`}
                            className="absolute inset-0 w-full h-full"
                            style={{ filter: "grayscale(0.35) contrast(1.02)" }}
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
          <section className="px-5 sm:px-8 pb-24 sm:pb-32" aria-labelledby="cierre">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] px-6 py-16 sm:px-16 sm:py-24 text-center text-white" style={{ background: `linear-gradient(135deg, ${red}, #6E0E0E)` }}>
              {/* Las mismas luces hexagonales, como reflejo */}
              <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
                <HexCeiling id="led-cierre" />
              </div>
              <h2 id="cierre" className="relative mx-auto max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.08]" style={H}>
                {d.cierre}
              </h2>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="group relative mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-[15px] font-semibold shadow-[0_12px_30px_-12px_rgba(0,0,0,.45)] transition-transform hover:-translate-y-0.5" style={{ color: INK }}>
                <WhatsAppIcon /> {ctaText}
                <Svg className="w-4 h-4 transition-transform group-hover:translate-x-1">{icons.flecha}</Svg>
              </a>
            </div>
          </section>
        )}
      </main>

      {/* ─── Pie ─── */}
      <footer className="border-t border-black/[0.07] bg-white px-5 sm:px-8 py-10">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-lg tracking-[0.14em]" style={{ ...t.head, color: INK }}>
              {brand.toUpperCase()}
              <span style={{ color: red }}>.</span>
            </p>
            {tagline && <p className="mt-1 text-sm" style={{ color: MUTED }}>{tagline}</p>}
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {d.instagram && (
              <li>
                <a href={d.instagram} target="_blank" rel="noopener noreferrer" className={`${ghostBtn} px-5 py-2.5 text-sm`} style={{ color: INK }}>
                  Instagram
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`${ghostBtn} px-5 py-2.5 text-sm`} style={{ color: INK }}>
                  WhatsApp
                </a>
              </li>
            )}
            {tel && (
              <li>
                <a href={tel} className={`${ghostBtn} px-5 py-2.5 text-sm`} style={{ color: INK }}>
                  {d.telefono}
                </a>
              </li>
            )}
          </ul>
        </div>
      </footer>

      {/* ─── Botón flotante (celular) ─── */}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white"
          style={{ backgroundColor: red, boxShadow: `0 14px 34px -10px ${red}` }}
        >
          <WhatsAppIcon /> Pedí tu turno
        </a>
      )}
    </div>
  );
}
