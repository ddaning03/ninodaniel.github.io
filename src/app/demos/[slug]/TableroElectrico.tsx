import Image from "next/image";
import type { Demo } from "@content/demos";
import { MI_WHATSAPP, has, waLink, telLink, mapsSearch } from "@/lib/demo-utils";
import { display, D, Svg, icons, iconFor, WhatsAppIcon } from "./CircuitoElectrico";

/*
 * Diseño "tablero": la landing entera pensada como un tablero eléctrico real, con volumen.
 * - Hero: tablero en 3D (CSS) con térmicas y luces de estado; etiquetas flotantes con los datos.
 * - Servicios: cada servicio es una térmica del tablero (toda la tarjeta abre WhatsApp).
 * - Botones tipo tecla (relieve + sombra), capas superpuestas, mapa con tarjeta flotante,
 *   cierre con una llave de luz. Todo CSS/SVG: sin imágenes ni JS extra.
 * Igual que la plantilla: solo muestra lo que está en el archivo de datos.
 */

const NAVY = "#0B1626";
const MUTED = "#4A5361"; /* 7,9:1 sobre blanco */
const BG = "#EEF1F5";
const AMBER_DARK = "#B97F00";

/* Relieves reutilizables */
const METAL: React.CSSProperties = {
  background: "linear-gradient(150deg,#FBFCFD 0%,#E3E8EE 45%,#C7CFD9 100%)",
  boxShadow: "inset 0 2px 0 #fff, inset 0 -3px 0 rgba(11,22,38,.10), 0 40px 70px -30px rgba(11,22,38,.50), 0 12px 24px -12px rgba(11,22,38,.25)",
};
const FONDO_TABLERO: React.CSSProperties = {
  background: "radial-gradient(120% 80% at 50% 0%,#1A2C46 0%,#0B1626 60%)",
  boxShadow: "inset 0 10px 24px rgba(0,0,0,.55), inset 0 -2px 0 rgba(255,255,255,.05)",
};
const MODULO: React.CSSProperties = {
  background: "linear-gradient(180deg,#FFFFFF 0%,#EDF1F5 55%,#D9E0E8 100%)",
  boxShadow: "inset 0 1px 0 #fff, inset 0 -2px 0 rgba(11,22,38,.08), 0 10px 18px -8px rgba(0,0,0,.55)",
};
const teclaAmarilla = (accent: string): React.CSSProperties => ({
  background: `linear-gradient(180deg,#FFD66B 0%,${accent} 100%)`,
  color: NAVY,
  boxShadow: `inset 0 1px 0 rgba(255,255,255,.7), 0 5px 0 ${AMBER_DARK}, 0 18px 28px -12px rgba(185,127,0,.75)`,
});
const TECLA_BLANCA: React.CSSProperties = {
  background: "linear-gradient(180deg,#FFFFFF 0%,#E9EDF2 100%)",
  color: NAVY,
  boxShadow: "inset 0 1px 0 #fff, 0 5px 0 #C3CCD7, 0 18px 28px -14px rgba(11,22,38,.45)",
};
const TECLA_NAVY: React.CSSProperties = {
  background: "linear-gradient(180deg,#22344F 0%,#0B1626 100%)",
  color: "#fff",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.18), 0 5px 0 #02060C, 0 18px 28px -12px rgba(11,22,38,.7)",
};
const tecla =
  "inline-flex items-center justify-center gap-2.5 rounded-2xl px-6 py-4 text-[17px] font-bold transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 active:translate-y-[4px]";

/* ─────────── Térmica (palanca + luz) ─────────── */
function Termica({ accent, small = false, delay = 0 }: { accent: string; small?: boolean; delay?: number }) {
  return (
    <span className={`relative block shrink-0 rounded-[9px] ${small ? "h-[74px] w-[40px]" : "h-[92px] w-[50px]"}`} style={MODULO} aria-hidden="true">
      <span className="tb-led absolute left-1/2 top-[7px] h-[6px] w-[6px] -translate-x-1/2 rounded-full" style={{ backgroundColor: "#34D399", boxShadow: "0 0 8px #34D399", animationDelay: `${delay}s` }} />
      <span className={`absolute left-1/2 -translate-x-1/2 rounded-[6px] bg-[#162235] ${small ? "top-[18px] h-[44px] w-[20px]" : "top-[20px] h-[58px] w-[26px]"}`} style={{ boxShadow: "inset 0 3px 6px rgba(0,0,0,.7)" }}>
        <span className="tb-lever absolute inset-x-[3px] top-[3px] h-[45%] rounded-[4px]" style={{ background: `linear-gradient(180deg,#FFE08A,${accent})`, boxShadow: `0 3px 0 ${AMBER_DARK}` }} />
      </span>
    </span>
  );
}

/* ─────────── Tablero 3D del hero ─────────── */
function TableroHero({ accent, marca, n, chips }: { accent: string; marca: string; n: number; chips: string[] }) {
  const filas = [Array.from({ length: Math.min(n, 6) }), Array.from({ length: 3 })];
  return (
    <div className="relative mx-auto w-full max-w-[560px] [perspective:1800px]">
      {/* Halo cálido detrás del tablero */}
      <div className="pointer-events-none absolute -inset-10 rounded-full blur-3xl" style={{ background: `radial-gradient(closest-side, ${accent}55, transparent)` }} aria-hidden="true" />
      <div className="relative rounded-[30px] p-3.5 sm:p-4 lg:[transform:rotateY(-16deg)_rotateX(7deg)_rotateZ(1deg)]" style={METAL} aria-hidden="true">
        {/* Tornillos */}
        {["left-2 top-2", "right-2 top-2", "left-2 bottom-2", "right-2 bottom-2"].map((pos) => (
          <span key={pos} className={`absolute ${pos} h-2.5 w-2.5 rounded-full`} style={{ background: "radial-gradient(circle at 35% 35%,#fff,#8C98A8)", boxShadow: "inset 0 -1px 1px rgba(0,0,0,.3)" }} />
        ))}
        <div className="rounded-[20px] p-4 sm:p-5" style={FONDO_TABLERO}>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-white/85" style={D}>{marca}</span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
              <span className="tb-led h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 10px #34D399" }} />
              En servicio
            </span>
          </div>
          {filas.map((fila, f) => (
            <div key={f} className="relative mt-4">
              {/* Riel DIN */}
              <span className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-sm" style={{ background: "linear-gradient(180deg,#9AA6B6,#5D6878)", boxShadow: "0 2px 4px rgba(0,0,0,.5)" }} />
              <div className="relative flex justify-between gap-1.5">
                {fila.map((_, i) => (
                  <Termica key={i} accent={f === 0 ? accent : "#E6EBF1"} small delay={(i + f * 3) * 0.37} />
                ))}
                {f === 1 && (
                  <span className="relative grid h-[74px] flex-1 place-items-center rounded-[9px] text-center" style={MODULO}>
                    <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: `linear-gradient(180deg,#FFE08A,${accent})`, color: NAVY, boxShadow: `0 3px 0 ${AMBER_DARK}` }}>
                      <Svg className="w-5 h-5">{icons.rayo}</Svg>
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
          {/* Cables */}
          <svg className="mt-4 h-10 w-full" viewBox="0 0 300 40" preserveAspectRatio="none" fill="none">
            <path d="M20 0 C20 30 60 30 60 40" stroke={accent} strokeWidth="4" strokeLinecap="round" />
            <path d="M70 0 C70 24 110 26 120 40" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
            <path d="M150 0 C150 26 170 28 175 40" stroke="#E5484D" strokeWidth="4" strokeLinecap="round" />
            <path d="M230 0 C230 22 260 28 270 40" stroke="#34D399" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {/* Etiquetas flotantes (datos del archivo) */}
      {chips[0] && (
        <span className="absolute -top-5 right-6 sm:right-10 rounded-2xl px-4 py-2.5 text-sm font-extrabold" style={{ ...D, ...teclaAmarilla(accent), boxShadow: `inset 0 1px 0 rgba(255,255,255,.7), 0 20px 30px -12px rgba(185,127,0,.7)` }}>
          {chips[0]}
        </span>
      )}
      {chips[1] && (
        <span className="absolute -left-2 top-[76%] sm:-left-8 rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-bold backdrop-blur-md ring-1 ring-white" style={{ ...D, color: NAVY, boxShadow: "0 20px 34px -14px rgba(11,22,38,.45)" }}>
          {chips[1]}
        </span>
      )}
      {chips[2] && (
        <span className="absolute -bottom-5 right-6 sm:right-12 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-white" style={{ ...D, ...TECLA_NAVY, boxShadow: "0 20px 34px -14px rgba(11,22,38,.7)" }}>
          <span className="h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px #34D399" }} />
          {chips[2]}
        </span>
      )}
    </div>
  );
}

/* ─────────── Llave de luz del cierre ─────────── */
function LlaveDeLuz({ accent }: { accent: string }) {
  return (
    <div className="relative mx-auto h-56 w-40 sm:h-72 sm:w-52 rotate-[-8deg]" aria-hidden="true">
      <div className="absolute inset-0 rounded-[28px]" style={{ background: "linear-gradient(150deg,#FFFFFF,#E2E7EE)", boxShadow: "inset 0 2px 0 #fff, 0 40px 60px -20px rgba(122,84,0,.55), 0 10px 20px -10px rgba(0,0,0,.25)" }} />
      <div className="absolute inset-x-6 inset-y-8 sm:inset-x-8 sm:inset-y-10 rounded-[18px]" style={{ background: "linear-gradient(180deg,#D7DEE7,#F4F6F9)", boxShadow: "inset 0 3px 8px rgba(11,22,38,.25)" }}>
        {/* Tecla presionada hacia arriba: encendida */}
        <div className="absolute inset-1.5 rounded-[14px]" style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#F1F4F7 48%,#D5DCE5 52%,#EEF2F6 100%)", boxShadow: "0 6px 12px -4px rgba(11,22,38,.35), inset 0 1px 0 #fff" }}>
          <span className="tb-led absolute left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 14px ${accent}` }} />
        </div>
      </div>
      {["top-3", "bottom-3"].map((p) => (
        <span key={p} className={`absolute left-1/2 ${p} h-2.5 w-2.5 -translate-x-1/2 rounded-full`} style={{ background: "radial-gradient(circle at 35% 35%,#fff,#9AA6B6)" }} />
      ))}
    </div>
  );
}

/* ─────────── Encabezados de sección ─────────── */
function Titulo({ id, children, claro = false }: { id: string; children: React.ReactNode; claro?: boolean }) {
  return (
    <h2 id={id} className="text-[2.1rem] sm:text-6xl font-extrabold leading-[0.98] tracking-[-0.035em]" style={{ ...D, color: claro ? "#fff" : NAVY }}>
      {children}
    </h2>
  );
}

/* ─────────── Diseño ─────────── */
export default function TableroElectrico({ d }: { d: Demo }) {
  const accent = d.color;
  const [marca, linea] = d.nombre.includes(" · ") ? d.nombre.split(" · ") : [d.nombreCorto ?? d.nombre, ""];
  const short = d.nombreCorto ?? marca;

  const wa = d.whatsapp ? waLink(d.whatsapp, d.mensajeWhatsApp ?? "Hola, quería hacer una consulta.") : null;
  const tel = d.telefono ? telLink(d.telefono) : null;
  const ctaText = d.textoBotonWhatsApp ?? "Escribinos por WhatsApp";
  const propuesta = waLink(MI_WHATSAPP, `¡Hola Daniel! Vi la propuesta de diseño para ${short}.`);
  const mapQ = d.mapa || [d.direccion, d.barrio].filter(Boolean).join(", ");
  const servicios = d.servicios ?? [];

  /* Titular con "desde AAAA" resaltado como marcador */
  const titular = d.titular ?? d.servicioPrincipal ?? d.rubro;
  const m = d.desde ? titular.match(new RegExp(`(desde ${d.desde})`, "i")) : null;
  const antes = m ? titular.slice(0, m.index) : titular;
  const despues = m ? titular.slice((m.index ?? 0) + m[0].length) : "";

  const chips = has(d.razones) ? d.razones.map((r) => r.titulo) : [];

  return (
    <div className={`${display.variable} min-h-screen overflow-x-clip antialiased pb-24 sm:pb-0`} style={{ backgroundColor: BG, color: NAVY, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
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

      {/* ═══════════ HERO ═══════════ */}
      <div className="relative pt-7">
        {/* Fondo con volumen: brillo cálido + frío y retícula que se desvanece */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(55% 45% at 88% 18%, ${accent}40, transparent 70%), radial-gradient(45% 40% at 0% 0%, rgba(59,130,246,.16), transparent 70%), linear-gradient(180deg,#F7F8FA, ${BG})` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_60%_30%,#000,transparent)]"
          style={{ backgroundImage: "linear-gradient(rgba(11,22,38,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(11,22,38,.06) 1px,transparent 1px)", backgroundSize: "44px 44px" }}
          aria-hidden="true"
        />

        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5">
          <p className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl" style={teclaAmarilla(accent)}>
              <Svg className="w-5 h-5">{icons.rayo}</Svg>
            </span>
            <span className="leading-tight">
              <span className="block text-[17px] font-extrabold tracking-tight" style={D}>{marca}</span>
              {linea && <span className="block text-xs font-medium" style={{ color: MUTED }}>{linea}</span>}
            </span>
          </p>
          {tel && (
            <a href={tel} className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-bold" style={TECLA_BLANCA} aria-label={`Llamar al ${d.telefono}`}>
              <Svg className="w-4 h-4">{icons.tel}</Svg>
              <span className="hidden sm:inline">{d.telefono}</span>
            </a>
          )}
        </header>

        <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 pt-4 pb-20 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:pt-12 lg:pb-28" aria-label="Presentación">
          <div>
            <p className="text-[15px] font-semibold" style={{ color: MUTED }}>{d.rubro}</p>
            <h1 className="mt-3 text-[2.75rem] leading-[0.95] sm:text-7xl lg:text-[5.4rem] font-extrabold tracking-[-0.045em]" style={D}>
              {antes}
              {m && (
                <span className="relative inline-block whitespace-nowrap">
                  <span className="absolute inset-x-[-0.08em] bottom-[0.06em] h-[0.42em] -skew-x-6 rounded-md" style={{ background: `linear-gradient(90deg,${accent},#FFD66B)` }} aria-hidden="true" />
                  <span className="relative">{m[1]}</span>
                </span>
              )}
              {despues}
            </h1>
            {d.bajada && <p className="mt-5 max-w-lg text-[17px] sm:text-xl leading-snug" style={{ color: MUTED }}>{d.bajada}</p>}
            {(wa || tel) && (
              <div className="mt-7 grid gap-3.5 sm:flex sm:gap-4">
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" data-origen="hero" className={tecla} style={teclaAmarilla(accent)}>
                    <WhatsAppIcon className="w-6 h-6" /> {ctaText}
                  </a>
                )}
                {tel && (
                  <a href={tel} className={tecla} style={TECLA_BLANCA}>
                    <Svg className="w-5 h-5">{icons.tel}</Svg> Llamar
                  </a>
                )}
              </div>
            )}
          </div>
          <TableroHero accent={accent} marca={short} n={servicios.length || 6} chips={chips} />
        </section>
      </div>

      <main>
        {/* ═══════════ SERVICIOS: las térmicas del tablero ═══════════ */}
        {servicios.length > 0 && (
          <section className="relative px-3 sm:px-6 pb-20 sm:pb-28" aria-labelledby="servicios">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between">
                <Titulo id="servicios">Elegí tu servicio</Titulo>
                {d.whatsappPorServicio && (
                  <p className="max-w-xs text-[15px] leading-snug" style={{ color: MUTED }}>
                    Tocá uno y se abre WhatsApp con tu consulta ya escrita.
                  </p>
                )}
              </div>

              {/* Gabinete */}
              <div className="mt-9 rounded-[34px] p-2.5 sm:p-4" style={METAL}>
                <div className="rounded-[26px] p-3 sm:p-6" style={FONDO_TABLERO}>
                  <div className="flex items-center justify-between px-1 pb-4 sm:pb-6">
                    <span className="text-sm font-bold text-white/80" style={D}>Tablero de servicios</span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                      <span className="tb-led h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 10px #34D399" }} />
                      {servicios.length} circuitos
                    </span>
                  </div>
                  <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
                    {servicios.map((s, i) => {
                      const href = d.whatsappPorServicio && d.whatsapp ? waLink(d.whatsapp, `Hola, quiero consultar por ${s.nombre.toLowerCase()}`) : wa;
                      const contenido = (
                        <>
                          <div className="flex items-start gap-4 sm:flex-col sm:gap-5">
                            <div className="flex items-center gap-3">
                              <Termica accent={accent} delay={i * 0.41} />
                              <span className="hidden sm:grid h-12 w-12 place-items-center rounded-2xl" style={TECLA_NAVY}>
                                <span style={{ color: accent }}><Svg className="w-6 h-6">{iconFor(s.nombre)}</Svg></span>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-xs font-bold tabular-nums" style={{ color: MUTED }}>Circuito {String(i + 1).padStart(2, "0")}</span>
                              <h3 className="mt-1 text-[1.2rem] sm:text-[1.35rem] font-bold leading-[1.12] tracking-[-0.02em]" style={D}>{s.nombre}</h3>
                              {s.detalle && <p className="mt-1.5 text-[14.5px] leading-relaxed" style={{ color: MUTED }}>{s.detalle}</p>}
                            </div>
                          </div>
                          {href && (
                            <span className="mt-5 flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-bold transition-transform group-hover:-translate-y-0.5" style={teclaAmarilla(accent)}>
                              <span className="flex items-center gap-2"><WhatsAppIcon className="w-5 h-5" /> Consultar</span>
                              <Svg className="w-4 h-4">{icons.flecha}</Svg>
                            </span>
                          )}
                        </>
                      );
                      return (
                        <li key={s.nombre} className="flex">
                          {href ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-origen={`servicio: ${s.nombre}`}
                              aria-label={`Consultar por ${s.nombre} por WhatsApp`}
                              className="group tb-modulo flex w-full flex-col justify-between rounded-[20px] p-4 sm:p-5 transition-transform duration-200 hover:-translate-y-1"
                              style={MODULO}
                            >
                              {contenido}
                            </a>
                          ) : (
                            <div className="flex w-full flex-col justify-between rounded-[20px] p-4 sm:p-5" style={MODULO}>{contenido}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ POR QUÉ ELEGIRNOS: tarjetas escalonadas sobre el año ═══════════ */}
        {has(d.razones) && (
          <section className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-28 text-white" style={{ background: `radial-gradient(70% 60% at 85% 0%, ${accent}33, transparent 60%), linear-gradient(180deg,#13233A,${NAVY})` }} aria-labelledby="razones">
            {d.desde && (
              <span
                className="pointer-events-none absolute -bottom-[0.18em] right-[-0.04em] select-none text-[38vw] lg:text-[26rem] font-extrabold leading-none tracking-[-0.06em]"
                style={{ ...D, color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,.08)", backgroundImage: `linear-gradient(180deg, ${accent}2E, transparent 75%)`, WebkitBackgroundClip: "text", backgroundClip: "text" }}
                aria-hidden="true"
              >
                {d.desde}
              </span>
            )}
            <div className="relative mx-auto max-w-6xl">
              <Titulo id="razones" claro>Por qué elegirnos</Titulo>
              <ol className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
                {d.razones.map((r, i) => (
                  <li
                    key={r.titulo}
                    className={`rounded-[26px] p-6 sm:p-8 backdrop-blur-md ring-1 ring-white/15 ${["", "lg:translate-y-10", "lg:translate-y-20"][i % 3]}`}
                    style={{ background: "linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04))", boxShadow: "0 30px 60px -30px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.2)" }}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl text-lg font-extrabold" style={{ ...D, ...teclaAmarilla(accent) }}>
                      {i + 1}
                    </span>
                    <h3 className="mt-6 text-2xl font-bold tracking-[-0.02em]" style={D}>{r.titulo}</h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-white/80">{r.texto}</p>
                  </li>
                ))}
              </ol>
              <div className="h-0 lg:h-20" />
            </div>
          </section>
        )}

        {/* ═══════════ TRABAJOS (solo con fotos reales) ═══════════ */}
        {has(d.fotos) && (
          <section className="px-4 sm:px-6 pt-20 sm:pt-28" aria-labelledby="trabajos">
            <div className="mx-auto max-w-6xl">
              <Titulo id="trabajos">Algunos trabajos</Titulo>
              <ul className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {d.fotos.map((f, i) => (
                  <li key={f.src} className={`relative aspect-[4/5] overflow-hidden rounded-[22px] shadow-[0_24px_40px_-24px_rgba(11,22,38,.6)] ${i % 2 ? "lg:translate-y-8" : ""}`}>
                    <Image src={f.src} alt={f.alt} fill sizes="(max-width: 1024px) 50vw, 280px" className="object-cover" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ═══════════ RESEÑAS (solo con datos reales) ═══════════ */}
        {(d.google || has(d.resenas)) && (
          <section className="px-4 sm:px-6 pt-20 sm:pt-28" aria-labelledby="resenas">
            <div className="mx-auto max-w-6xl">
              <Titulo id="resenas">{d.google ? `${d.google.puntaje.toString().replace(".", ",")} de 5 en Google` : "Lo que dicen"}</Titulo>
              {has(d.resenas) && (
                <ul className="mt-9 grid gap-4 sm:grid-cols-3">
                  {d.resenas.map((r, i) => (
                    <li key={i} className="rounded-[24px] bg-white p-6 shadow-[0_24px_40px_-28px_rgba(11,22,38,.5)]">
                      <p className="leading-relaxed">“{r.texto}”</p>
                      <p className="mt-3 text-sm font-semibold" style={{ color: MUTED }}>{r.autor}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* ═══════════ UBICACIÓN: mapa grande con tarjeta flotante ═══════════ */}
        {mapQ && (
          <section id="ubicacion" className="px-3 sm:px-6 pt-20 sm:pt-28" aria-labelledby="ubicacion-titulo">
            <div className="mx-auto max-w-6xl">
              <div className="px-1"><Titulo id="ubicacion-titulo">Dónde estamos</Titulo></div>
              <div className="relative mt-9">
                <div className="relative h-[320px] sm:h-[460px] overflow-hidden rounded-[32px] bg-[#DCE2E9]" style={{ boxShadow: "0 40px 70px -40px rgba(11,22,38,.6)" }}>
                  <iframe
                    title={`Mapa: ${d.nombre}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(mapQ)}&output=embed`}
                    className="absolute inset-0 h-full w-full"
                    style={{ filter: "grayscale(0.35) contrast(1.05)" }}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <div className="relative mx-3 -mt-16 rounded-[26px] bg-white/90 p-6 backdrop-blur-md ring-1 ring-white sm:absolute sm:left-6 sm:top-6 sm:mx-0 sm:mt-0 sm:w-[340px] sm:p-7" style={{ boxShadow: "0 30px 60px -24px rgba(11,22,38,.5)" }}>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl" style={teclaAmarilla(accent)}>
                    <Svg className="w-5 h-5">{icons.pin}</Svg>
                  </span>
                  {d.direccion && <p className="mt-4 text-2xl font-bold leading-tight tracking-[-0.02em]" style={D}>{d.direccion}</p>}
                  {has(d.horarios) && (
                    <dl className="mt-3 text-[15px]">
                      {d.horarios.map((h) => (
                        <div key={h.dias} className="flex justify-between gap-4 border-b border-black/10 py-2">
                          <dt style={{ color: MUTED }}>{h.dias}</dt>
                          <dd className="font-semibold">{h.horas}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {d.email && (
                    <a href={`mailto:${d.email}`} className="mt-3 flex items-center gap-2 text-[14.5px] font-semibold hover:underline" style={{ color: MUTED }}>
                      <Svg className="w-4 h-4 shrink-0">{icons.mail}</Svg> <span className="min-w-0">{d.email.replace("@", "@​")}</span>
                    </a>
                  )}
                  <a href={mapsSearch(mapQ)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[15px] font-bold" style={TECLA_NAVY}>
                    Cómo llegar <Svg className="w-4 h-4">{icons.flecha}</Svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ CIERRE: la llave de luz ═══════════ */}
        {d.cierre && (wa || tel) && (
          <section className="px-3 sm:px-6 py-20 sm:py-28" aria-labelledby="cierre">
            <div
              className="relative mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[36px] px-6 py-14 sm:px-14 sm:py-16 lg:grid-cols-[1fr_auto]"
              style={{ background: `radial-gradient(60% 80% at 80% 50%, #FFE3A0, transparent 70%), linear-gradient(135deg,#FFD15C,${accent})`, boxShadow: "inset 0 2px 0 rgba(255,255,255,.6), 0 50px 80px -40px rgba(185,127,0,.75)" }}
            >
              <div>
                <h2 id="cierre" className="text-[2.6rem] sm:text-7xl font-extrabold leading-[0.95] tracking-[-0.045em]" style={{ ...D, color: NAVY }}>
                  {d.cierre}
                </h2>
                <div className="mt-9 grid gap-3.5 sm:flex sm:gap-4">
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" data-origen="cierre" className={tecla} style={TECLA_NAVY}>
                      <WhatsAppIcon className="w-6 h-6" /> {ctaText}
                    </a>
                  )}
                  {tel && (
                    <a href={tel} className={tecla} style={TECLA_BLANCA}>
                      <Svg className="w-5 h-5">{icons.tel}</Svg> {d.telefono ?? "Llamar"}
                    </a>
                  )}
                </div>
              </div>
              <div className="hidden lg:block lg:pr-6">
                <LlaveDeLuz accent={accent} />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ─── Pie ─── */}
      <footer className="px-5 sm:px-8 pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 border-t border-black/10 pt-6 text-sm sm:flex-row sm:items-center" style={{ color: MUTED }}>
          <p className="font-bold" style={{ ...D, color: NAVY }}>{d.nombre}</p>
          <p>{[d.direccion, d.telefono].filter(Boolean).join(" · ")}</p>
        </div>
      </footer>

      {/* ─── Botón flotante de WhatsApp (celular) ─── */}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-origen="boton-flotante"
          className="sm:hidden fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-[15px] font-bold"
          style={{ ...teclaAmarilla(accent), boxShadow: `inset 0 1px 0 rgba(255,255,255,.7), 0 4px 0 ${AMBER_DARK}, 0 16px 30px -8px rgba(11,22,38,.5)` }}
        >
          <WhatsAppIcon className="w-6 h-6" /> WhatsApp
        </a>
      )}
    </div>
  );
}
