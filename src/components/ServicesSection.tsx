"use client";

import ScrollReveal from "./ScrollReveal";

const services = [
  {
    tier: "Presencia",
    price: "50.000",
    time: "48hs",
    ideal: "Sin nada digital todavía",
    features: [
      "Landing page de 1 sección",
      "Google Business optimizado",
      "Botón de WhatsApp integrado",
      "Dominio .com.ar / Subdominio",
      "Hosting incluido por 1 año"
    ],
    cta: "Empezar Presencia"
  },
  {
    tier: "Profesional",
    price: "80.000",
    time: "5 días",
    ideal: "Quiere crecer online",
    features: [
      "Web completa (3-4 secciones)",
      "Sistema de turnos integrado",
      "Todo lo del Plan Presencia",
      "5 posts de Instagram diseñados",
      "SEO técnico optimizado"
    ],
    cta: "Empezar Profesional",
    popular: true
  },
  {
    tier: "Autoridad",
    price: "150.000",
    time: "10 días",
    ideal: "Referente local CABA",
    features: [
      "Web Premium + Branding básico",
      "10 posts diseñados para redes",
      "1 Reel / Video presentación",
      "Estrategia de Reseñas Google",
      "Todo lo del Plan Profesional"
    ],
    cta: "Empezar Autoridad"
  }
];

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
              Precios promocionales por tiempo limitado a cambio de testimonio para portfolio. Válido para negocios locales en Argentina.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-0 border-t border-l border-white/10">
          {services.map((s, i) => (
            <ScrollReveal key={s.tier} delay={i * 0.1}>
              <div className={`relative p-8 lg:p-12 border-r border-b border-white/10 flex flex-col h-full group transition-all duration-500 hover:bg-white/5 ${s.popular ? 'bg-white/[0.02]' : ''}`}>
                {s.popular && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-vermilion" />
                )}
                
                <div className="mb-12">
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2" style={{ fontFamily: "var(--font-syne)" }}>{s.tier}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-8" style={{ fontFamily: "var(--font-syne)" }}>{s.ideal}</p>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-bold tracking-tighter text-vermilion" style={{ fontFamily: "var(--font-syne)" }}>${s.price}</span>
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">AR$</span>
                  </div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mt-2">{s.time} entrega aprox.</p>
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

                <a 
                  href={`https://wa.me/5491167644591?text=${encodeURIComponent(`¡Hola Daniel! Me interesa el plan ${s.tier}. ¿Podemos charlar?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 text-xs font-bold uppercase text-center block tracking-[0.2em] transition-all duration-500 border ${s.popular ? 'bg-vermilion border-vermilion text-white hover:bg-white hover:text-black hover:border-white' : 'border-white/20 hover:bg-white hover:text-black hover:border-white'}`}
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {s.cta}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
