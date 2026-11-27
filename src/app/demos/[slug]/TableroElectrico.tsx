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
    <div className="relative w-full max-w-[600px] lg:max-w-none [perspective:1800px]">
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
        <span className="absolute -top-5 left-10 sm:left-14 rounded-2xl px-4 py-2.5 text-sm font-extrabold" style={{ ...D, ...teclaAmarilla(accent), boxShadow: `inset 0 1px 0 rgba(255,255,255,.7), 0 20px 30px -12px rgba(185,127,0,.7)` }}>
          {chips[0]}
        </span>
      )}
      {chips[1] && (
        <span className="absolute -left-2 top-[76%] sm:-left-8 rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-bold backdrop-blur-md ring-1 ring-white" style={{ ...D, color: NAVY, boxShadow: "0 20px 34px -14px rgba(11,22,38,.45)" }}>
          {chips[1]}
        </span>
      )}
      {chips[2] && (
        <span className="absolute -bottom-5 left-[38%] flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-white" style={{ ...D, ...TECLA_NAVY, boxShadow: "0 20px 34px -14px rgba(11,22,38,.7)" }}>
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

/* Alineación con la grilla de 72rem, dejando que el otro lado llegue al borde de la pantalla */
const ALIGN_L = "pl-4 sm:pl-6 lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]";
const ALIGN_R = "pr-4 sm:pr-6 lg:pr-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]";

/* ─────────── Ficha de ubicación ─────────── */
function FichaUbicacion({ d, accent, mapQ }: { d: Demo; accent: string; mapQ: string }) {
  return (
    <>
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
          <Svg className="w-4 h-4 shrink-0">{icons.mail}</Svg> <span className="min-w-0">{d.email.replace("@", "@\u200b")}</span>
        </a>
      )}
      <a href={mapsSearch(mapQ)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[15px] font-bold" style={TECLA_NAVY}>
        Cómo llegar <Svg className="w-4 h-4">{icons.flecha}</Svg>
      </a>
    </>
  );
}

/* ─────────── Canaleta con cables: llena el lado del gabinete que se va de pantalla ─────────── */
function Canaleta() {
  const cables = [
    ["#FFB81C", "M0 120 C 70 120 60 60 120 60"],
    ["#3B82F6", "M0 380 C 80 380 70 300 135 300"],
    ["#E5484D", "M0 640 C 75 640 65 560 120 560"],
    ["#34D399", "M0 880 C 80 880 70 800 135 800"],
  ];
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block" style={{ width: "max(0px, calc((100vw - 72rem) / 2))" }} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 1000" preserveAspectRatio="none" fill="none">
        {cables.map(([c, d]) => (
          <path key={c} d={d} stroke={c} strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {/* Canaleta ranurada vertical */}
      <div
        className="absolute inset-y-6 left-[60%] w-14 rounded-xl"
        style={{
          background: "repeating-linear-gradient(180deg,#9AA6B6 0 18px,#5D6878 18px 22px)",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,.35), 0 10px 24px rgba(0,0,0,.45)",
        }}
      />
    </div>
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
        <p className={`py-1.5 ${ALIGN_L} ${ALIGN_R}`}>
          {d.ejemplo && <strong className="text-amber-300 font-semibold">Ejemplo con datos ficticios · </strong>}
          Propuesta de diseño para {short} · por{" "}
          <a href={propuesta} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">
            Daniel Niño
          </a>
        </p>
      </div>

      {/* ═══════════ HERO: texto a la izquierda, tablero que se sale por la derecha ═══════════ */}
      <div className="relative pt-7">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(50% 55% at 95% 40%, ${accent}45, transparent 70%), radial-gradient(40% 40% at 0% 0%, rgba(59,130,246,.15), transparent 70%), linear-gradient(180deg,#F7F8FA, ${BG})` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_60%_at_75%_40%,#000,transparent)]"
          style={{ backgroundImage: "linear-gradient(rgba(11,22,38,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(11,22,38,.06) 1px,transparent 1px)", backgroundSize: "44px 44px" }}
          aria-hidden="true"
        />

        <header className={`relative flex items-center justify-between py-3.5 ${ALIGN_L} ${ALIGN_R}`}>
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

        <section className="relative grid items-center pb-16 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:pb-24" aria-label="Presentación">
          <div className={`${ALIGN_L} pr-4 sm:pr-6 pt-4 lg:pt-14`}>
            <p className="text-[15px] font-semibold" style={{ color: MUTED }}>{d.rubro}</p>
            <h1 className="mt-3 text-[2.75rem] leading-[0.95] sm:text-7xl lg:text-[5.6rem] font-extrabold tracking-[-0.045em]" style={D}>
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
            {d.direccion && (
              <a href="#ubicacion" className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold hover:underline" style={{ color: MUTED }}>
                <Svg className="w-4 h-4">{icons.pin}</Svg> {d.direccion}
              </a>
            )}
          </div>
          {/* El tablero se corta contra el borde derecho de la pantalla */}
          <div className="relative mt-16 pl-8 -mr-[28%] sm:-mr-[12%] lg:mt-6 lg:mr-0 lg:pl-0 lg:pr-[max(0rem,calc((100vw-72rem)/2-2.5rem))]"><div className="lg:ml-auto lg:w-[min(560px,44vw)]">
            <TableroHero accent={accent} marca={short} n={servicios.length || 6} chips={chips} />
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* ═══════════ SERVICIOS: columna fija a la izquierda, gabinete pegado al borde derecho ═══════════ */}
        {servicios.length > 0 && (
          <section className="relative grid gap-10 pb-20 lg:grid-cols-[calc(max(1.5rem,calc((100vw-72rem)/2+1.5rem))+21rem)_minmax(0,1fr)] lg:gap-12 lg:pb-28" aria-labelledby="servicios">
            <div className={`${ALIGN_L} pr-4 lg:pr-0`}>
              <div className="lg:sticky lg:top-20">
                <span
                  className="block text-[6.5rem] lg:text-[10rem] font-extrabold leading-[0.85] tracking-[-0.06em] tabular-nums"
                  style={{ ...D, color: "transparent", WebkitTextStroke: `2px ${NAVY}26`, backgroundImage: `linear-gradient(180deg, ${accent}, ${accent}00 85%)`, WebkitBackgroundClip: "text", backgroundClip: "text" }}
                  aria-hidden="true"
                >
                  {String(servicios.length).padStart(2, "0")}
                </span>
                <div className="mt-2"><Titulo id="servicios">Elegí tu servicio</Titulo></div>
                {d.whatsappPorServicio && (
                  <p className="mt-4 max-w-xs text-[16px] leading-snug" style={{ color: MUTED }}>
                    Tocá uno y se abre WhatsApp con tu consulta ya escrita.
                  </p>
                )}
                {wa && (
                  <div className="mt-7 hidden lg:block">
                    <a href={wa} target="_blank" rel="noopener noreferrer" data-origen="servicios-otro" className={`${tecla} whitespace-nowrap`} style={TECLA_NAVY}>
                      <WhatsAppIcon className="w-5 h-5" /> Consultar otro trabajo
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Gabinete: abierto hacia el borde derecho */}
            <div className="pl-3 sm:pl-6 lg:pl-0">
              <div className="rounded-l-[34px] py-2.5 pl-2.5 sm:py-4 sm:pl-4" style={METAL}>
                <div className={`relative overflow-hidden rounded-l-[26px] py-3 pl-3 pr-3 sm:py-6 sm:pl-6 sm:pr-6 ${ALIGN_R}`} style={FONDO_TABLERO}>
                  <Canaleta />
                  <div className="relative flex items-center justify-between px-1 pb-4 sm:pb-6">
                    <span className="text-sm font-bold text-white/80" style={D}>Tablero de servicios</span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                      <span className="tb-led h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 10px #34D399" }} />
                      {servicios.length} circuitos
                    </span>
                  </div>
                  <ul className="relative grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                    {servicios.map((s, i) => {
                      const href = d.whatsappPorServicio && d.whatsapp ? waLink(d.whatsapp, `Hola, quiero consultar por ${s.nombre.toLowerCase()}`) : wa;
                      const contenido = (
                        <>
                          <div className="flex items-start gap-4">
                            <Termica accent={accent} delay={i * 0.41} />
                            <div className="min-w-0 flex-1">
                              <span className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold tabular-nums" style={{ color: MUTED }}>Circuito {String(i + 1).padStart(2, "0")}</span>
                                <span className="grid h-9 w-9 place-items-center rounded-xl" style={TECLA_NAVY}>
                                  <span style={{ color: accent }}><Svg className="w-5 h-5">{iconFor(s.nombre)}</Svg></span>
                                </span>
                              </span>
                              <h3 className="mt-1 text-[1.2rem] sm:text-[1.3rem] font-bold leading-[1.12] tracking-[-0.02em]" style={D}>{s.nombre}</h3>
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

        {/* ═══════════ POR QUÉ ELEGIRNOS: año gigante cortado a la izquierda, razones en escalera ═══════════ */}
        {has(d.razones) && (
          <section className="relative overflow-hidden py-20 text-white lg:py-28" style={{ background: `radial-gradient(60% 70% at 0% 100%, ${accent}30, transparent 60%), linear-gradient(180deg,#13233A,${NAVY})` }} aria-labelledby="razones">
            <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
              {d.desde && (
                <span
                  className="order-last -ml-[0.08em] block select-none text-[44vw] font-extrabold leading-[0.78] tracking-[-0.07em] lg:order-first lg:text-[15rem] xl:text-[16.5rem]"
                  style={{ ...D, color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,.10)", backgroundImage: `linear-gradient(180deg, ${accent}, ${accent}10 90%)`, WebkitBackgroundClip: "text", backgroundClip: "text" }}
                  aria-hidden="true"
                >
                  {d.desde}
                </span>
              )}
              <div className={`${ALIGN_R} pl-4 sm:pl-6 lg:pl-0`}>
                <Titulo id="razones" claro>Por qué elegirnos</Titulo>
                <ol className="mt-10 space-y-4">
                  {d.razones.map((r, i) => (
                    <li
                      key={r.titulo}
                      className={`flex items-start gap-5 rounded-[24px] p-5 sm:p-6 backdrop-blur-md ring-1 ring-white/15 ${["", "lg:ml-14", "lg:ml-28"][i % 3]}`}
                      style={{ background: "linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04))", boxShadow: "0 30px 60px -30px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.2)" }}
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-extrabold" style={{ ...D, ...teclaAmarilla(accent) }}>
                        {i + 1}
                      </span>
                      <span>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em]" style={D}>{r.titulo}</h3>
                        <p className="mt-1.5 text-[15.5px] leading-relaxed text-white/80">{r.texto}</p>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ TRABAJOS (solo con fotos reales) ═══════════ */}
        {has(d.fotos) && (
          <section className={`pt-20 sm:pt-28 ${ALIGN_L} ${ALIGN_R}`} aria-labelledby="trabajos">
            <Titulo id="trabajos">Algunos trabajos</Titulo>
            <ul className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {d.fotos.map((f, i) => (
                <li key={f.src} className={`relative aspect-[4/5] overflow-hidden rounded-[22px] shadow-[0_24px_40px_-24px_rgba(11,22,38,.6)] ${i % 2 ? "lg:translate-y-8" : ""}`}>
                  <Image src={f.src} alt={f.alt} fill sizes="(max-width: 1024px) 50vw, 280px" className="object-cover" />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ═══════════ RESEÑAS (solo con datos reales) ═══════════ */}
        {(d.google || has(d.resenas)) && (
          <section className={`pt-20 sm:pt-28 ${ALIGN_L} ${ALIGN_R}`} aria-labelledby="resenas">
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
          </section>
        )}

        {/* ═══════════ UBICACIÓN: mapa pegado al borde izquierdo, ficha que se monta encima ═══════════ */}
        {mapQ && (
          <section id="ubicacion" className="relative grid items-center pt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:pt-28 scroll-mt-10" aria-labelledby="ubicacion-titulo">
            <div className={`order-first pl-4 pb-8 sm:pl-6 lg:order-last lg:pb-0 lg:pl-0 ${ALIGN_R}`}>
              <Titulo id="ubicacion-titulo">Dónde estamos</Titulo>
              <div className="relative z-10 mt-8 hidden rounded-[26px] bg-white/90 p-7 backdrop-blur-md ring-1 ring-white lg:-ml-28 lg:block" style={{ boxShadow: "0 30px 60px -24px rgba(11,22,38,.5)" }}>
                <FichaUbicacion d={d} accent={accent} mapQ={mapQ} />
              </div>
            </div>
            <div className="pr-3 sm:pr-6 lg:pr-0">
              <div className="relative h-[320px] overflow-hidden rounded-r-[32px] bg-[#DCE2E9] sm:h-[420px] lg:h-[540px]" style={{ boxShadow: "0 40px 70px -40px rgba(11,22,38,.6)" }}>
                <iframe
                  title={`Mapa: ${d.nombre}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(mapQ)}&output=embed`}
                  className="absolute inset-0 h-full w-full"
                  style={{ filter: "grayscale(0.35) contrast(1.05)" }}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="relative z-10 ml-4 -mt-14 mr-1 rounded-[26px] bg-white/95 p-6 backdrop-blur-md ring-1 ring-white sm:ml-12 lg:hidden" style={{ boxShadow: "0 30px 60px -24px rgba(11,22,38,.5)" }}>
                <FichaUbicacion d={d} accent={accent} mapQ={mapQ} />
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ CIERRE: bloque que entra desde la derecha, con la llave saliéndose ═══════════ */}
        {d.cierre && (wa || tel) && (
          <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-28" aria-labelledby="cierre">
            <div
              className={`relative ml-3 grid items-center rounded-l-[36px] py-14 pl-6 sm:ml-6 sm:py-16 sm:pl-12 lg:ml-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:grid-cols-[minmax(0,1fr)_auto] lg:pl-14 ${ALIGN_R}`}
              style={{ background: `radial-gradient(50% 90% at 85% 40%, #FFE3A0, transparent 70%), linear-gradient(120deg,#FFD15C,${accent})`, boxShadow: "inset 0 2px 0 rgba(255,255,255,.6), 0 50px 80px -40px rgba(185,127,0,.75)" }}
            >
              <div>
                <h2 id="cierre" className="max-w-2xl text-[2.6rem] sm:text-7xl font-extrabold leading-[0.95] tracking-[-0.045em]" style={{ ...D, color: NAVY }}>
                  {d.cierre}
                </h2>
                <div className="mt-9 grid gap-3.5 pr-4 sm:flex sm:gap-4 sm:pr-0">
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
              {/* La llave sobresale por arriba del bloque */}
              <div className="hidden lg:block lg:-mt-48 lg:mb-[-2rem] lg:pl-10 lg:scale-110">
                <LlaveDeLuz accent={accent} />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ─── Pie ─── */}
      <footer className={`pb-10 ${ALIGN_L} ${ALIGN_R}`}>
        <div className="grid gap-4 border-t border-black/10 pt-8 text-sm sm:grid-cols-[1fr_auto] sm:items-end" style={{ color: MUTED }}>
          <p className="text-2xl sm:text-4xl font-extrabold tracking-[-0.03em]" style={{ ...D, color: NAVY }}>
            {marca}
            {linea && <span className="block text-base font-semibold tracking-normal" style={{ color: MUTED }}>{linea}</span>}
          </p>
          <p className="sm:text-right leading-relaxed">
            {d.direccion}
            {d.telefono && <><br />{d.telefono}</>}
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
          className="sm:hidden fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-[15px] font-bold"
          style={{ ...teclaAmarilla(accent), boxShadow: `inset 0 1px 0 rgba(255,255,255,.7), 0 4px 0 ${AMBER_DARK}, 0 16px 30px -8px rgba(11,22,38,.5)` }}
        >
          <WhatsAppIcon className="w-6 h-6" /> WhatsApp
        </a>
      )}
    </div>
  );
}
