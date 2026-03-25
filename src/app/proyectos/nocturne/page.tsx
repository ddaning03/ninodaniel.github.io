"use client";

import { useRef } from "react";
import { Newsreader } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
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

export default function NocturnePage() {
  return (
    <div
      className={`${newsreader.variable} bg-[#0A0A0A] text-[#F9F6F0] antialiased min-h-screen selection:bg-[#c00100] selection:text-white flex overflow-hidden`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* ─── FIXED VERTICAL SIDEBAR ─── */}
      <aside className="fixed left-0 top-0 h-screen w-16 md:w-32 border-r border-white/10 flex flex-col items-center justify-center bg-[#0A0A0A] z-50">
        <div className="flex justify-center items-center h-full w-full relative">
          <h1
            className="text-[3.5rem] md:text-[5rem] lg:text-[7.5rem] leading-none tracking-tighter mix-blend-difference select-none opacity-90 absolute whitespace-nowrap left-1/2 -translate-x-1/2"
            style={{
              fontFamily: "var(--font-newsreader)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              maxHeight: "80vh"
            }}
          >
            NOCTURNE.
          </h1>
        </div>
        <div className="absolute bottom-12 w-[1px] h-24 bg-white/20 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/3 bg-[#c00100]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </aside>

      {/* ─── MAIN SCROLLABLE CONTENT (BENTO LAYOUT) ─── */}
      <main className="ml-16 md:ml-32 w-full px-4 md:px-8 py-8 md:py-16 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto">
          {/* Top Header */}
          <header className="mb-14">
            <Reveal>
              <h2
                className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[1.05] tracking-tight max-w-[1200px]"
                style={{ fontFamily: "var(--font-newsreader)" }}
              >
                The Silent Authority{" "}
                <em className="text-white/60 italic">in gastronomy.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex gap-8 text-[10px] tracking-widest uppercase font-bold text-white/50">
              <span className="hover:text-white transition-colors cursor-pointer">The Experience</span>
              <span className="hover:text-white transition-colors cursor-pointer">Menu</span>
              <span className="hover:text-white transition-colors cursor-pointer">Reservations</span>
            </Reveal>
          </header>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
            {/* Bento Item 1: Large Image */}
            <Reveal className="md:col-span-8 md:row-span-2 h-full" delay={0.3}>
              <div className="relative w-full h-full bg-[#111] overflow-hidden group">
                <Image
                  src="/projects/nocturne/interior.png"
                  alt="Nocturne Interior"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-80"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 border border-white/5" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#c00100] font-bold mb-2">Atmosphere</p>
                  <p className="text-xl md:text-2xl" style={{ fontFamily: "var(--font-newsreader)" }}>
                    Brutalist elegance & soft acoustics
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 2: Philosophy Text */}
            <Reveal className="md:col-span-4 h-full" delay={0.4}>
              <div className="relative w-full h-full bg-[#161616] border border-white/5 p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />
                <div className="relative z-10">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold mb-6">Manifesto</p>
                  <p className="text-sm md:text-base leading-relaxed text-white/70">
                    We strip away the unnecessary noise of modern dining to focus on the raw narrative of ingredients. Each seating is a private monograph, a study in texture, shadow, and silence.
                  </p>
                </div>
                <button className="relative z-10 self-start text-[10px] tracking-widest uppercase border-b border-white/30 pb-1 hover:border-[#c00100] hover:text-[#c00100] transition-colors">
                  Read Editorial
                </button>
              </div>
            </Reveal>

            {/* Bento Item 3: Info & Hours */}
            <Reveal className="md:col-span-4 h-full" delay={0.5}>
              <div className="relative w-full h-full bg-[#0d0d0d] border border-white/5 p-8 flex flex-col justify-between group hover:bg-[#111111] transition-colors overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />
                <div className="relative z-10">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold mb-6">Location</p>
                  <p className="text-lg mb-2" style={{ fontFamily: "var(--font-newsreader)" }}>742 Midnight Ave, NYC</p>
                  <p className="text-xs text-white/50 leading-relaxed font-mono">
                    TUE - SUN<br />
                    18:00 — 23:00<br />
                    Omakase seating only.
                  </p>
                </div>
                <div className="relative z-10 text-[#c00100] opacity-0 group-hover:opacity-100 transition-opacity mt-4 md:mt-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 4: Dish Image */}
            <Reveal className="md:col-span-6 h-full" delay={0.6}>
              <div className="relative w-full h-full bg-[#111] overflow-hidden group">
                <Image
                  src="/projects/nocturne/hero.png"
                  alt="Omakase Dish"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 border border-white/5" />
                <div className="absolute top-8 right-8 text-right bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10">
                  <p className="text-[10px] tracking-[0.2em] font-bold uppercase text-white/70">Symphony No. 5</p>
                  <p className="text-sm italic" style={{ fontFamily: "var(--font-newsreader)" }}>Otoro & Gold Leaf</p>
                </div>
              </div>
            </Reveal>

            {/* Bento Item 5: CTA */}
            <Reveal className="md:col-span-6 h-full" delay={0.7}>
              <div className="relative w-full h-full bg-[#1c1c1a] border border-white/5 p-8 flex flex-col items-center justify-center text-center group overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />
                <div className="absolute inset-0 bg-gradient-to-b from-[#c00100]/0 to-[#c00100]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <h3 className="relative z-10 text-4xl md:text-5xl lg:text-6xl mb-10 text-[#fcf9f2]" style={{ fontFamily: "var(--font-newsreader)" }}>
                  Secure Your Seating
                </h3>
                <button className="relative z-10 px-10 py-4 border-[1.5px] border-[#c00100] text-[#fcf9f2] text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#c00100] hover:text-white transition-all duration-500">
                  Reserve Table
                </button>
              </div>
            </Reveal>
          </div>

          {/* Footer */}
          <Reveal delay={0.4}>
            <footer className="mt-20 py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">© MMXXIV Nocturne Editorial.</p>
              <div className="flex gap-6 text-[10px] tracking-[0.2em] uppercase text-white/40">
                <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
                <span className="hover:text-white transition-colors cursor-pointer">Press</span>
              </div>
            </footer>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
