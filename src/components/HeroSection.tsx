"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

interface HeroSectionProps {
  onWebClick: () => void;
}

/* Split text into words and animate each */
function AnimatedHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const line1 = "No diseño páginas bonitas. Construyo infraestructura visual que";
  const words = line1.split(" ");

  return (
    <h1
      ref={ref}
      className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-zinc-900 max-w-4xl"
      style={{ fontFamily: "var(--font-syne)" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.6,
            delay: i * 0.06,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          {word}
        </motion.span>
      ))}{" "}
      <motion.span
        className="text-vermilion italic font-bold inline-block"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 40, scale: 0.9 }
        }
        transition={{
          duration: 0.8,
          delay: words.length * 0.06,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        factura.
      </motion.span>
    </h1>
  );
}

export default function HeroSection({ onWebClick }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen pt-20 flex flex-col justify-center overflow-hidden border-b border-zinc-900/10"
      aria-label="Sección principal"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-line-v left-1/4 hidden lg:block" />
        <div className="grid-line-v left-2/4 hidden lg:block" />
        <div className="grid-line-v left-3/4 hidden lg:block" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-4 gap-12 items-end">
        <div className="lg:col-span-3 pb-12 lg:pb-24">
          <AnimatedHeading />

          <ScrollReveal delay={0.6}>
            <p className="mt-8 text-lg lg:text-2xl font-medium max-w-2xl opacity-70">
              Desarrollo Web de alta conversión y Marketing Digital
              especializado en escalar tu negocio.
            </p>
          </ScrollReveal>
        </div>

        <div className="flex justify-end pb-12 lg:pb-24">
          <ScrollReveal delay={0.8} direction="right">
            <div className="flex flex-col gap-6 items-end">
              <MagneticButton
                className="cursor-pointer group relative bg-vermilion text-white w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center transition-transform duration-500"
                onClick={onWebClick}
                ariaLabel="Ver casos de desarrollo web"
              >
                <span
                  className="font-bold text-center leading-tight uppercase tracking-widest text-sm lg:text-base"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  VER CASOS <br /> WEB ➝
                </span>
              </MagneticButton>

              <a 
                href="https://wa.me/5491167644591"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-vermilion transition-colors flex items-center gap-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                CONSULTA POR WHATSAPP ↗
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
