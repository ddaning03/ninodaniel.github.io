"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function AboutSection() {
  return (
    <section 
      id="sobre-mi"
      className="relative py-24 lg:py-32 bg-white border-b border-zinc-900/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual: Editorial Portrait Placeholder */}
          <ScrollReveal direction="left">
            <div className="relative aspect-[3/4] bg-zinc-100 group overflow-hidden border border-zinc-900/5 shadow-2xl">
              <Image
                src="/about-me.png"
                alt="Daniel Niño trabajando en su estudio"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-x-8 bottom-8 z-10">
                <p className="text-white font-bold uppercase tracking-widest text-[10px] mb-2 drop-shadow-md" style={{ fontFamily: "var(--font-syne)" }}>
                  Buenos Aires, Argentina
                </p>
                <div className="h-[1px] w-full bg-white/30" />
              </div>
            </div>
          </ScrollReveal>

          {/* Copy: Humanizing & Local Trust */}
          <div className="space-y-8">
            <ScrollReveal delay={0.2}>
              <span 
                className="inline-block px-3 py-1 border border-zinc-900/20 text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Quién Soy
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <h2 
                className="text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Daniel Niño. <br />
                Tu socio digital en <span className="text-vermilion">Caballito.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="space-y-6 text-xl lg:text-2xl text-zinc-600 leading-relaxed max-w-xl">
                <p>
                  No soy una agencia multinacional con procesos lentos. Soy un estratega visual independiente que vive y trabaja en <span className="text-zinc-900 font-bold">CABA</span>, enfocado en que los negocios de mi barrio se vean y vendan como marcas globales.
                </p>
                <p>
                  Tengo +3 años optimizando infraestructuras visuales. Mi enfoque es simple: eliminar la fricción entre tu cliente y tu caja registradora usando <span className="text-zinc-900 font-semibold italic">tecnología de alto rendimiento</span> y diseño editorial de primer nivel.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-900/10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-2" style={{ fontFamily: "var(--font-syne)" }}>Tecnologías</h4>
                  <p className="text-sm font-bold">Next.js, Framer Motion, Meta Ads</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-2" style={{ fontFamily: "var(--font-syne)" }}>Alcance</h4>
                  <p className="text-sm font-bold">CABA / Remoto Global</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
