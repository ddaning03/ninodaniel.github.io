"use client";

import ScrollReveal from "./ScrollReveal";
import { services, extraServices, type Service } from "@/lib/services";

function ServiceCard({ s, delay }: { s: Service; delay: number }) {
  const waText = s.waText ?? `¡Hola Daniel! Me interesa el plan ${s.tier}. ¿Podemos charlar?`;

  return (
    <ScrollReveal delay={delay}>
      <div className={`relative p-8 lg:p-12 border-r border-b border-white/10 flex flex-col h-full group transition-all duration-500 hover:bg-white/5 ${s.popular ? 'bg-white/[0.02]' : ''}`}>
        {s.popular && (
          <div className="absolute top-0 left-0 w-full h-1 bg-vermilion" />
        )}

        <div className="mb-12">
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-2" style={{ fontFamily: "var(--font-syne)" }}>{s.tier}</h3>
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-8" style={{ fontFamily: "var(--font-syne)" }}>{s.ideal}</p>

          <div className="flex items-baseline gap-1">
            <span className="text-4xl lg:text-5xl font-bold tracking-tighter text-vermilion" style={{ fontFamily: "var(--font-syne)" }}>{`$${s.price}`}</span>{" "}
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{s.unit ?? "ARS"}</span>
          </div>
          {s.time && (
            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-2">{s.time} entrega aprox.</p>
          )}
        </div>

        <ul className="space-y-4 mb-12 flex-grow">
          {s.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/60">
              <svg className="w-4 h-4 text-vermilion mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {s.detail && (
          <a
            href={s.detail.href}
            className="-mt-6 mb-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-vermilion transition-colors"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {s.detail.label}
          </a>
        )}

        <a
          href={`https://wa.me/5491167644591?text=${encodeURIComponent(waText)}`}
          data-origen={`plan: ${s.tier}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-4 text-xs font-bold uppercase text-center block tracking-[0.2em] transition-all duration-500 border ${s.popular ? 'bg-vermilion border-vermilion text-white hover:bg-white hover:text-black hover:border-white' : 'border-white/20 hover:bg-white hover:text-black hover:border-white'}`}
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {s.cta}
        </a>
      </div>
    </ScrollReveal>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="relative py-24 lg:py-32 bg-dark-zinc text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <span className="text-vermilion text-[10px] uppercase tracking-[0.4em] font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                Tarifas de Lanzamiento
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tighter" style={{ fontFamily: "var(--font-syne)" }}>
                Servicios & <br /> <span className="text-white/40">Inversión.</span>
              </h2>
            </div>
            <p className="max-w-xs text-white/40 text-sm leading-relaxed">
              Precios promocionales en los 3 planes, a cambio de un testimonio para mi portfolio. Válido para negocios locales en Argentina.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-0 border-t border-l border-white/10">
          {services.map((s, i) => (
            <ServiceCard key={s.tier} s={s} delay={i * 0.1} />
          ))}
        </div>

        {/* ─── Servicios adicionales ─── */}
        <ScrollReveal>
          <span className="block mt-20 mb-8 text-vermilion text-[10px] uppercase tracking-[0.4em] font-bold" style={{ fontFamily: "var(--font-syne)" }}>
            Servicios Adicionales
          </span>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-0 border-t border-l border-white/10">
          {extraServices.map((s, i) => (
            <ServiceCard key={s.tier} s={s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
