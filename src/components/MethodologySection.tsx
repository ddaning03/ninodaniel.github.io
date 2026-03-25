"use client";

import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

const steps = [
  {
    num: "01.",
    title: "Auditoría de Conversión",
    desc: "Analizamos cada punto de fricción en tu embudo actual para encontrar fugas de capital.",
  },
  {
    num: "02.",
    title: "Diseño de Infraestructura",
    desc: "Construimos la base visual y técnica optimizada para escalar sin romper la experiencia.",
  },
  {
    num: "03.",
    title: "Lanzamiento y Escala",
    desc: "Iteración continua basada en datos reales para maximizar el retorno de inversión.",
  },
];

interface MethodologySectionProps {
  onContactClick: () => void;
}

export default function MethodologySection({ onContactClick }: MethodologySectionProps) {
  return (
    <section
      className="relative min-h-screen bg-premium-cream py-24 lg:py-32"
      aria-label="Metodología de trabajo"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <h2
            className="text-sm uppercase tracking-[0.4em] font-bold mb-16 opacity-40"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Mi Método Operativo
          </h2>
        </ScrollReveal>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-l border-zinc-900/10 mb-32">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.15}>
              <div className="p-12 border-r border-b border-zinc-900/10 space-y-6 group hover:bg-white transition-colors duration-500 h-full">
                <span
                  className="text-6xl lg:text-7xl block text-zinc-900/10 group-hover:text-vermilion transition-colors duration-500"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {step.num}
                </span>
                <h3
                  className="text-2xl uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {step.title}
                </h3>
                <p className="opacity-60 leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center max-w-4xl mx-auto space-y-12">
          <ScrollReveal>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              ¿Listo para dejar de perder leads?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <MagneticButton
              className="w-full max-w-3xl bg-vermilion text-white text-xl md:text-2xl font-bold py-8 lg:py-10 uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 shadow-2xl"
              ariaLabel="Agendar sesión estratégica"
              onClick={onContactClick}
            >
              <span style={{ fontFamily: "var(--font-syne)" }}>
                Agendar Sesión Estratégica
              </span>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
