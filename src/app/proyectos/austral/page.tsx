"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { useFocusTrap } from "@/lib/useFocusTrap";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

const ease = [0.32, 0.72, 0, 1] as const;

/* Calidad de compresión para las fotos (debe estar en images.qualities de next.config) */
const Q = 90;

/* Paleta */
const INK = "#0E0D0B";
const BONE = "#EDE8DF";
const AMBER = "#C8A27A";

const S = { fontFamily: "var(--font-cormorant), Georgia, serif" };
const M = { fontFamily: "var(--font-plex-mono), ui-monospace, monospace" };

/* ─────────── Obra ─────────── */
type Photo = {
  src: string;
  title: string;
  place: string;
  year: string;
  coords: string;
  data: string;
  alt: string;
  w: number;
  h: number;
};

const photos: Photo[] = [
  {
    src: "/projects/austral/lago-lengas.jpg",
    title: "Lago entre lengas",
    place: "Tierra del Fuego",
    year: "2025",
    coords: "54°41′S 68°10′W",
    data: "210 m · 07:40",
    alt: "Lago de agua gris verdosa entre montañas, enmarcado por ramas de lenga bajo un cielo cubierto",
    w: 2000,
    h: 1332,
  },
  {
    src: "/projects/austral/lago-cumbre.jpg",
    title: "Lago desde la cumbre",
    place: "Río Negro",
    year: "2024",
    coords: "41°10′S 71°24′W",
    data: "1.400 m · 13:05",
    alt: "Vista desde una cumbre rocosa de un lago azul profundo rodeado de bosque y montañas, con nubes blancas",
    w: 1333,
    h: 2000,
  },
  {
    src: "/projects/austral/glaciar-frente.jpg",
    title: "Frente del glaciar",
    place: "Santa Cruz",
    year: "2024",
    coords: "50°29′S 73°03′W",
    data: "185 m · 11:20",
    alt: "Pared de hielo de un glaciar sobre un lago turquesa con témpanos, montañas nevadas al fondo y bosque otoñal en primer plano",
    w: 2000,
    h: 1500,
  },
  {
    src: "/projects/austral/espejo-yungas.jpg",
    title: "Espejo en las yungas",
    place: "Tucumán",
    year: "2025",
    coords: "26°48′S 65°22′W",
    data: "1.050 m · 17:45",
    alt: "Lago quieto que refleja nubes y cerros verdes, con un bote pequeño en el centro",
    w: 2000,
    h: 1332,
  },
  {
    src: "/projects/austral/ruta-alamos.jpg",
    title: "Ruta y álamos",
    place: "Chubut",
    year: "2023",
    coords: "42°55′S 71°18′W",
    data: "640 m · 09:15",
    alt: "Curva de una ruta frente a una hilera de álamos sin hojas, campo dorado y un banco de niebla sobre los cerros",
    w: 2000,
    h: 1333,
  },
];

const series = [
  { name: "Hielos", count: "16 fotografías", years: "2020 — 2025", cover: photos[2] },
  { name: "Lagos del sur", count: "24 fotografías", years: "2019 — 2025", cover: photos[1] },
  { name: "Norte verde", count: "12 fotografías", years: "2022 — 2025", cover: photos[3] },
];

const prints = [
  { size: "30 × 45 cm", price: "120.000", note: "Edición de 25" },
  { size: "50 × 75 cm", price: "210.000", note: "Edición de 15" },
  { size: "80 × 120 cm", price: "390.000", note: "Edición de 5" },
];

/* ─────────── Utilidades ─────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Caption({ p, index }: { p: Photo; index: number }) {
  return (
    <div className="flex items-baseline justify-between gap-4 pt-4 text-[11px] uppercase tracking-[0.18em]" style={M}>
      <span style={{ color: AMBER }}>N° {String(index + 1).padStart(2, "0")}</span>
      <span className="flex-1 text-white/70 normal-case tracking-normal text-[15px]" style={S}>
        <em>{p.title}</em>
      </span>
      <span className="text-white/40 hidden sm:inline">{p.place}, {p.year}</span>
    </div>
  );
}

/* ─────────── Hero ─────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const hero = photos[0];

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden" aria-label="Portada">
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <Image src={hero.src} alt={hero.alt} fill priority quality={Q} sizes="(max-width: 768px) 280vw, 100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0E0D0B]" />

      <motion.div style={{ opacity: fade }} className="relative z-10 h-full max-w-[1500px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-14 md:pb-20">
        <motion.p
          className="text-[11px] uppercase tracking-[0.35em] mb-6 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]"
          style={{ ...M, color: AMBER }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Fotografía de paisaje — Argentina
        </motion.p>
        <h1 className="text-[15vw] md:text-[9vw] leading-[0.85] font-light tracking-[-0.02em]" style={S}>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.1 }}
          >
            La luz del sur,
          </motion.span>
          <motion.span
            className="block italic pl-[8vw]"
            style={{ color: AMBER }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.3 }}
          >
            esperada.
          </motion.span>
        </h1>

        <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-[11px] uppercase tracking-[0.2em] text-white/60" style={M}>
          <p>
            {hero.coords} · {hero.data}
            <br />
            <span className="text-white/40">{hero.title}, {hero.place}</span>
          </p>
          <p className="flex items-center gap-3">
            Desplazá
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────── Visor ─────────── */
function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number | null;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const open = index !== null;
  useFocusTrap(open, [ref]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, onNav]);

  const p = open ? photos[index] : null;

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografía: ${p.title}`}
          className="fixed inset-0 z-[70] flex flex-col"
          style={{ backgroundColor: "rgba(10,9,8,0.97)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between px-6 lg:px-12 h-20 text-[11px] uppercase tracking-[0.2em] text-white/50" style={M}>
            <span>
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>
            <button onClick={onClose} className="hover:text-white transition-colors p-2" aria-label="Cerrar visor">
              Cerrar ✕
            </button>
          </div>

          <div className="relative flex-1 mx-4 md:mx-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.src}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <Image src={p.src} alt={p.alt} fill quality={Q} sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            <button
              onClick={() => onNav(-1)}
              className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 p-3 text-3xl text-white/50 hover:text-white transition-colors"
              style={S}
              aria-label="Fotografía anterior"
            >
              ←
            </button>
            <button
              onClick={() => onNav(1)}
              className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 p-3 text-3xl text-white/50 hover:text-white transition-colors"
              style={S}
              aria-label="Fotografía siguiente"
            >
              →
            </button>
          </div>

          <div className="px-6 lg:px-12 py-6 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
            <p className="text-2xl md:text-3xl italic" style={S}>{p.title}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50" style={M}>
              {p.place}, {p.year} · {p.coords} · {p.data}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────── Galería ─────────── */
const layout = [
  "md:col-span-8",
  "md:col-span-4 md:mt-40",
  "md:col-span-6 md:col-start-2",
  "md:col-span-5 md:mt-32",
  "md:col-span-10 md:col-start-2",
];

function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="obra" className="max-w-[1500px] mx-auto px-6 lg:px-12 py-28 md:py-40" aria-label="Obra">
      <Reveal>
        <div className="flex items-end justify-between mb-16 md:mb-24 border-b border-white/10 pb-6">
          <h2 className="text-5xl md:text-7xl font-light" style={S}>
            Obra <em style={{ color: AMBER }}>seleccionada</em>
          </h2>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 hidden md:block" style={M}>
            {photos.length} de 52 · 2019 — 2025
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 md:gap-y-24">
        {photos.map((p, i) => (
          <Reveal key={p.src} className={layout[i]} delay={0.05}>
            <figure>
              <button
                onClick={() => onOpen(i)}
                className="group relative block w-full overflow-hidden cursor-zoom-in"
                style={{ aspectRatio: `${p.w} / ${p.h}` }}
                aria-label={`Ver en grande: ${p.title}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  quality={Q}
                  sizes="(max-width: 768px) 100vw, 75vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                />
                <span
                  className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={M}
                >
                  Ampliar +
                </span>
              </button>
              <figcaption>
                <Caption p={p} index={i} />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────── Página ─────────── */
export default function AustralPage() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    []
  );

  return (
    <div
      className={`${serif.variable} ${mono.variable} min-h-screen antialiased selection:bg-[#C8A27A] selection:text-black`}
      style={{ backgroundColor: INK, color: BONE, fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white" aria-label="Navegación de Austral">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <a href="#" className="text-2xl tracking-[0.3em] font-medium" style={S}>
            AUSTRAL
          </a>
          <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.25em]" style={M}>
            <a href="#series" className="hover:opacity-60 transition-opacity">Series</a>
            <a href="#obra" className="hover:opacity-60 transition-opacity">Obra</a>
            <a href="#copias" className="hover:opacity-60 transition-opacity">Copias</a>
            <a href="#contacto" className="hover:opacity-60 transition-opacity">Contacto</a>
          </div>
          <Link href="/" className="text-[11px] uppercase tracking-[0.25em] hover:opacity-60 transition-opacity" style={M}>
            ← Portfolio
          </Link>
        </div>
      </nav>

      <main>
        <Hero />

        {/* Manifiesto */}
        <section className="max-w-[1500px] mx-auto px-6 lg:px-12 py-28 md:py-44 grid md:grid-cols-12 gap-10" aria-label="Manifiesto">
          <Reveal className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.3em]" style={{ ...M, color: AMBER }}>
              01 — Manifiesto
            </p>
          </Reveal>
          <div className="md:col-span-8 space-y-10">
            <Reveal delay={0.1}>
              <p className="text-4xl md:text-6xl leading-[1.08] font-light" style={S}>
                Camino kilómetros para estar en el lugar correcto diez minutos.{" "}
                <em className="text-white/45">El resto es paciencia.</em>
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl text-white/55 leading-relaxed">
                Fotografío los paisajes del sur argentino con luz natural, sin agregar ni quitar nada
                de la escena. Cada imagen es una sola toma, revelada a mano y pensada para verse en papel.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Series */}
        <section id="series" className="max-w-[1500px] mx-auto px-6 lg:px-12 pb-10" aria-label="Series">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] mb-10" style={{ ...M, color: AMBER }}>
              02 — Series
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {series.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.12}>
                <a href="#obra" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={s.cover.src}
                      alt={s.cover.alt}
                      fill
                      quality={Q}
                      sizes="(max-width: 768px) 200vw, 60vw"
                      className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                    <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                      <h3 className="text-4xl md:text-5xl font-light italic" style={S}>
                        {s.name}
                      </h3>
                      <span className="text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" style={S} aria-hidden="true">
                        →
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 text-[11px] uppercase tracking-[0.2em] text-white/45" style={M}>
                    <span>{s.count}</span>
                    <span>{s.years}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <Gallery onOpen={setOpen} />

        {/* Banda a sangre */}
        <section className="relative h-[80vh] min-h-[480px] overflow-hidden" aria-label="Cita">
          <Image src={photos[4].src} alt={photos[4].alt} fill quality={Q} sizes="(max-width: 768px) 210vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/65" />
          <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
            <Reveal>
              <blockquote className="text-4xl md:text-7xl font-light leading-[1.05] max-w-5xl" style={S}>
                “No busco el paisaje perfecto. <br className="hidden md:block" />
                <em style={{ color: AMBER }}>Espero a que la luz lo encuentre.</em>”
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* Copias */}
        <section id="copias" className="max-w-[1500px] mx-auto px-6 lg:px-12 py-28 md:py-40" aria-label="Copias en venta">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <Reveal className="md:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.3em]" style={{ ...M, color: AMBER }}>
                03 — Copias
              </p>
            </Reveal>
            <Reveal className="md:col-span-8" delay={0.1}>
              <h2 className="text-5xl md:text-7xl font-light leading-[1.02]" style={S}>
                Para colgar, <em className="text-white/45">no para scrollear.</em>
              </h2>
              <p className="mt-8 max-w-xl text-white/55 leading-relaxed">
                Impresión en papel de algodón de 308 g con tintas pigmentadas de archivo. Cada copia
                se firma, se numera y viaja con su certificado de autenticidad.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 border-t border-white/10">
            {prints.map((p, i) => (
              <Reveal key={p.size} delay={i * 0.1}>
                <div className="py-10 md:px-8 md:first:pl-0 border-b md:border-b-0 md:border-r last:border-r-0 border-white/10 group">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6" style={M}>{p.note}</p>
                  <p className="text-4xl md:text-5xl font-light mb-3" style={S}>{p.size}</p>
                  <p className="text-xl transition-colors duration-500 group-hover:text-[#C8A27A]" style={M}>
                    ${p.price} <span className="text-xs text-white/40">ARS</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="border-t border-white/10" aria-label="Contacto">
          <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-28 md:py-40 text-center">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ ...M, color: AMBER }}>
                Encargos · Licencias · Copias
              </p>
              <h2 className="text-6xl md:text-[8vw] leading-[0.9] font-light" style={S}>
                Escribime <em style={{ color: AMBER }}>antes del amanecer.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <button
                type="button"
                className="mt-14 inline-flex items-center gap-4 border px-10 py-5 text-[11px] uppercase tracking-[0.3em] transition-colors duration-500 hover:bg-[#C8A27A] hover:text-black"
                style={{ ...M, borderColor: AMBER }}
              >
                Pedir una copia o un encargo <span aria-hidden="true">→</span>
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-white/40" style={M}>
          <p>© 2026 Austral — Fotografía de paisaje</p>
          <p>Proyecto de concepto · Diseño y desarrollo: Daniel Niño</p>
        </div>
      </footer>

      <Lightbox index={open} onClose={close} onNav={nav} />
    </div>
  );
}
