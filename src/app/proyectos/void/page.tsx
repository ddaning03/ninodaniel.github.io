"use client";

import { useRef } from "react";
import { Inter, VT323 } from "next/font/google";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const ease = [0.32, 0.72, 0, 1] as const;

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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function VoidPage() {
  return (
    <div
      className={`${inter.variable} ${vt323.variable} bg-[#0A0A0A] text-[#F3F3F3] antialiased min-h-screen selection:bg-[#FF0000] selection:text-white flex overflow-hidden`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* ─── FIXED VERTICAL SIDEBAR ─── */}
      <aside className="fixed left-0 top-0 h-screen w-16 md:w-32 border-r border-white/10 flex flex-col items-center justify-center bg-[#070707] z-50">
        <div className="flex justify-center items-center h-full w-full relative">
          <h1
            className="text-[4rem] md:text-[6rem] lg:text-[8rem] text-[#FF0000] leading-none tracking-tight mix-blend-screen select-none opacity-90 absolute whitespace-nowrap left-1/2 -translate-x-1/2"
            style={{
              fontFamily: "var(--font-vt323)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              maxHeight: "80vh",
            }}
          >
            V O I D
          </h1>
        </div>
        <div className="absolute bottom-12 w-[1px] h-24 bg-red-900/30 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/3 bg-[#FF0000]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </aside>

      {/* ─── MAIN SCROLLABLE CONTENT (BENTO LAYOUT) ─── */}
      <main className="ml-16 md:ml-32 w-full px-4 md:px-8 py-8 md:py-16 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto">
          {/* Top Header */}
          <header className="mb-14 border-b border-white/10 pb-10">
            <Reveal>
              <div className="flex flex-col gap-2 mb-4">
                <span className="text-[#FF0000] text-sm md:text-base tracking-[0.3em] font-bold uppercase" style={{ fontFamily: "var(--font-vt323)" }}>
                  [ CASO DE ESTUDIO /// DTC STREETWEAR ]
                </span>
              </div>
              <h2
                className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.9] tracking-tighter uppercase font-black"
                style={{ fontFamily: "var(--font-vt323)" }}
              >
                Estrategia de <br />
                <span className="text-white/40">Lanzamiento</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex gap-8 text-[12px] tracking-widest uppercase font-bold text-white/50">
              <span className="hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white pb-1">Identidad Visual</span>
              <span className="hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white pb-1">Copywriting</span>
              <span className="hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white pb-1">Performance</span>
            </Reveal>
          </header>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
            {/* Bento Item 1: Main Product / Hoodie */}
            <Reveal className="md:col-span-8 md:row-span-2 h-full" delay={0.3}>
              <div className="relative w-full h-full bg-[#111] overflow-hidden group border border-white/10">
                <Image
                  src="/projects/void/1.png"
                  alt="VOID Hoodie Drop 04"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-90 saturate-50 group-hover:saturate-100"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-[12px] tracking-[0.3em] uppercase text-[#FF0000] font-bold mb-2 shadow-black drop-shadow-md">Drop 04</p>
                  <p className="text-3xl md:text-5xl uppercase" style={{ fontFamily: "var(--font-vt323)" }}>
                    EDICIÓN LIMITADA <br/> [100 PIEZAS]
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 2: Manifesto Text */}
            <Reveal className="md:col-span-4 h-full" delay={0.4}>
              <div className="relative w-full h-full bg-[#0D0D0D] border border-[#FF0000]/20 p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />
                <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-[#FF0000]/30" />
                <div className="relative z-10">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#FF0000] font-bold mb-6 block">&gt;_ REGLAS DE MARCA </p>
                  <h3 className="text-2xl mb-4 font-bold" style={{ fontFamily: "var(--font-vt323)" }}>&gt; EL SILENCIO ES CONTENIDO.</h3>
                  <p className="text-sm md:text-sm leading-relaxed text-zinc-400 font-mono">
                    Un post sin caption es tan válido como uno con texto largo. Números concretos en lugar de adjetivos: &apos;100 piezas&apos; en lugar de &apos;muy pocas unidades&apos;. Primera persona nunca. La marca habla como sistema.
                  </p>
                </div>
                <div className="relative z-10 text-xs text-zinc-600 font-mono flex items-center gap-2 mt-4">
                  <span className="w-2 h-2 bg-[#FF0000] animate-pulse block"></span>
                  SYSTEM.READY
                </div>
              </div>
            </Reveal>

            {/* Bento Item 3: Tactics & KPIs */}
            <Reveal className="md:col-span-4 h-full" delay={0.5}>
              <div className="relative w-full h-full bg-[#1A1A1A] border border-white/5 p-8 flex flex-col justify-between group hover:bg-[#202020] transition-colors overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold mb-6 border-b border-white/10 pb-4">Indicadores KPI</p>
                  <ul className="space-y-4 font-mono text-xs md:text-sm text-zinc-300">
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/50">Sold Out</span>
                      <span className="text-[#FF0000] font-bold">&lt; 7 DÍAS</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/50">Lista de Espera</span>
                      <span className="text-white font-bold">+200 USRS</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/50">Impresiones Org.</span>
                      <span className="text-white font-bold">50.000+</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/50">Growth Seguidores</span>
                      <span className="text-white font-bold">+15%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 4: Model/Vibe Image */}
            <Reveal className="md:col-span-6 h-full" delay={0.6}>
              <div className="relative w-full h-full bg-[#000] overflow-hidden group border border-white/10">
                <Image
                  src="/projects/void/4.png"
                  alt="Architecture Oversized Model"
                  fill
                  className="object-cover object-top transition-transform duration-[2000ms] group-hover:scale-105 opacity-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-8 right-8 text-right bg-black/80 backdrop-blur-md px-4 py-2 border border-[#FF0000]/30 border-l-4 border-l-[#FF0000]">
                  <p className="text-[10px] tracking-[0.2em] font-bold uppercase text-white/70 font-mono">Target</p>
                  <p className="text-xl uppercase text-white" style={{ fontFamily: "var(--font-vt323)" }}>Urbano / Underground</p>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 5: Fabric / Detail Image */}
            <Reveal className="md:col-span-6 h-full" delay={0.7}>
              <div className="relative w-full h-full bg-[#111] overflow-hidden group border border-white/10">
                <Image
                  src="/projects/void/2.png"
                  alt="Fabric Detail 500 GSM"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none opacity-80" />
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div>
                     <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1 font-mono">Specs</p>
                     <p className="text-2xl text-white" style={{ fontFamily: "var(--font-vt323)" }}>500 GSM COTTON</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#FF0000] font-mono">DURABILIDAD ETERNA</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 6: Phase 3 (Launch CTA) & Box */}
            <Reveal className="md:col-span-12 h-full md:h-auto md:aspect-[21/9]" delay={0.8}>
              <div className="relative w-full h-full bg-[#000] border border-white/10 overflow-hidden group">
                 <Image
                  src="/projects/void/3.png"
                  alt="VOID Box available now"
                  fill
                  className="object-cover object-center transition-transform duration-[3000ms] group-hover:scale-105 opacity-60 mix-blend-lighten"
                  sizes="100vw"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10 bg-black/40">
                  <span className="text-[#FF0000] tracking-[0.5em] font-bold text-xs md:text-sm mb-4 bg-black/80 px-4 py-1 border border-[#FF0000]/50 uppercase font-mono">
                    Fase 03: Ejecución
                  </span>
                  <h3 className="text-5xl md:text-7xl lg:text-8xl text-white mb-8 uppercase" style={{ fontFamily: "var(--font-vt323)" }}>
                    SOLD OUT EN HORAS.
                  </h3>
                  <a href="#" className="inline-block px-8 py-3 bg-[#FF0000] text-black font-bold uppercase tracking-widest text-xs font-mono hover:bg-white transition-colors duration-300">
                    [ VOID-CLO.COM ]
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Footer */}
          <Reveal delay={0.4}>
            <footer className="mt-20 py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-mono">CA: VOID X [AGENCIA]</p>
              <div className="flex gap-6 text-[10px] tracking-[0.2em] uppercase text-white/40 font-mono">
                <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
                <span className="hover:text-white transition-colors cursor-pointer">Case Study</span>
              </div>
            </footer>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
