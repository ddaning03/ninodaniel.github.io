"use client";

import { useRef } from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const ease = [0.32, 0.72, 0, 1] as const;

/* ─────────── Kenta Logo SVG ─────────── */
function KentaLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="100" y1="4" x2="100" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <text
        x="100"
        y="55"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="30"
        fontWeight="400"
        letterSpacing="6"
      >
        KENTA
      </text>
    </svg>
  );
}

/* ─────────── Scroll Reveal (local) ─────────── */
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
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Organic background shape */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#E8DDD0]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#D4E4DE]/30 blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 w-full py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <div className="space-y-8 order-2 lg:order-1">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.4em] text-[#5B8A7A] font-semibold">
                Modern · Beauty · Philosophy
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Consigue una Piel de Cristal{" "}
                <em className="text-[#5B8A7A]">
                  sin la Rutina de 10 Pasos.
                </em>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-zinc-500 max-w-md leading-relaxed">
                El sérum que simplifica tu skincare. Limpia, hidrata y protege en un solo paso.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex items-center gap-6 pt-2">
                <button className="bg-[#2A2A2A] text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-[#5B8A7A] transition-colors duration-500">
                  Reclamar 50% OFF Hoy
                </button>
                <span className="text-sm text-zinc-400 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Sin pruebas en animales
                </span>
              </div>
            </Reveal>
          </div>

          {/* Hero image */}
          <Reveal delay={0.15} className="order-1 lg:order-2">
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-[500px] mx-auto overflow-hidden">
                <Image
                  src="/projects/kenta/hero.png"
                  alt="KENTA Hydrating & Brightening Serum"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 90vw, 500px"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 lg:-left-8 bg-white shadow-xl px-6 py-4 border border-zinc-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease }}
              >
                <p className="text-xs text-zinc-400 uppercase tracking-widest">Dermatológicamente</p>
                <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
                  Probado & Seguro
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   VALUE PROPOSITION
   ═══════════════════════════════════════════════ */
function ValueSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-zinc-200/60">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <Reveal>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl tracking-tight mb-20 max-w-2xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Menos botellas, más resultados.
          </h2>
        </Reveal>

        {/* Bento grid */}
        <div className="grid md:grid-cols-12 gap-4">
          {/* Card 1 — ingredients image */}
          <Reveal className="md:col-span-5 md:row-span-2" delay={0.1}>
            <div className="relative h-full min-h-[400px] overflow-hidden group">
              <Image
                src="/projects/kenta/ingredients.png"
                alt="Ingredientes naturales del sérum KENTA"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-[0.3em] opacity-70 mb-2">Formulación</p>
                <p className="text-xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
                  Ácido Hialurónico 3D
                </p>
                <p className="text-sm opacity-70 mt-1">
                  Tres pesos moleculares distintos que hidratan hasta las capas más profundas.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 2 — Niacinamida */}
          <Reveal className="md:col-span-7" delay={0.2}>
            <div className="bg-[#F0EDE7] p-8 lg:p-10 h-full flex flex-col justify-between min-h-[200px]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#5B8A7A] font-semibold mb-3">
                  Ingrediente Estrella
                </p>
                <h3
                  className="text-2xl lg:text-3xl tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Niacinamida 10%
                </h3>
              </div>
              <p className="text-zinc-500 mt-4 max-w-md leading-relaxed">
                Controla los poros, combate la irritación, restaura la barrera cutánea y compensa la producción de sebo. Sin parabenos ni siliconas.
              </p>
            </div>
          </Reveal>

          {/* Card 3 — Textura */}
          <Reveal className="md:col-span-4" delay={0.3}>
            <div className="bg-[#5B8A7A] text-white p-8 lg:p-10 h-full flex flex-col justify-between min-h-[200px]">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60 font-semibold">
                Sensorial
              </p>
              <div>
                <h3
                  className="text-2xl tracking-tight mt-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Textura Nube
                </h3>
                <p className="text-sm opacity-70 mt-2">
                  Una fórmula ultraligera que se absorbe en segundos. Sin residuos, sin grasa.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 4 — Stat */}
          <Reveal className="md:col-span-3" delay={0.35}>
            <div className="border border-zinc-200 p-8 h-full flex flex-col justify-center items-center text-center min-h-[200px]">
              <span
                className="text-5xl font-semibold text-[#5B8A7A]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                97%
              </span>
              <p className="text-sm text-zinc-500 mt-2 max-w-[150px]">
                reportó piel más luminosa en 14 días
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TESTIMONIAL
   ═══════════════════════════════════════════════ */
function TestimonialSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#2A2A2A] text-white">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-16 text-center">
        <Reveal>
          <blockquote>
            <p
              className="text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              &ldquo;Dejé de gastar $200 en cremas que me daban alergia.{" "}
              <em className="text-[#C5A572]">Kenta simplificó mi vida</em> y mi
              piel nunca estuvo mejor.&rdquo;
            </p>
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C5A572]/20 flex items-center justify-center">
              <span className="text-[#C5A572] font-semibold text-sm">SM</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Sofía M.</p>
              <p className="text-xs text-white/50">Buenos Aires, Argentina</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PRICING CTA
   ═══════════════════════════════════════════════ */
function PricingSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#5B8A7A] font-semibold mb-6">
            Esto es menos de lo que gastás en café al mes
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="text-3xl md:text-4xl tracking-tight mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Empieza tu Ritual KENTA
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="my-8">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-zinc-400 line-through text-xl">$78.00</span>
              <span
                className="text-5xl font-semibold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                $39.00
              </span>
              <span className="text-zinc-400 text-sm">USD</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <button className="w-full bg-[#5B8A7A] text-white py-5 text-sm font-semibold uppercase tracking-[0.2em] hover:bg-[#4A7668] transition-colors duration-500 shadow-lg">
            Comprar Ahora → 50% OFF
          </button>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Envío protegido
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Garantía 30 días
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Envío gratis
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
function KentaFooter() {
  return (
    <footer className="border-t border-zinc-200/60 py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col items-center gap-6">
        <KentaLogo className="w-28 h-auto text-zinc-300" />
        <p className="text-xs text-zinc-400 text-center">
          © {new Date().getFullYear()} KENTA. Cuidado Esencial. Sin Complicaciones.
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */
export default function KentaPage() {
  return (
    <div
      className={`${playfair.variable} bg-[#FDFBF7] text-[#2A2A2A] antialiased`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Minimal nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-zinc-200/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
          <KentaLogo className="w-24 h-auto text-[#2A2A2A]" />

          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-zinc-500">
            <span className="hover:text-[#5B8A7A] transition-colors cursor-pointer">Ritual</span>
            <span className="hover:text-[#5B8A7A] transition-colors cursor-pointer">Ingredients</span>
            <span className="hover:text-[#5B8A7A] transition-colors cursor-pointer">About</span>
            <span className="hover:text-[#5B8A7A] transition-colors cursor-pointer">Shop</span>
          </div>

          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-[#5B8A7A] transition-colors flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Portfolio
          </Link>
        </div>
      </nav>

      <main className="pt-16">
        <HeroSection />
        <ValueSection />
        <TestimonialSection />
        <PricingSection />
      </main>

      <KentaFooter />
    </div>
  );
}
