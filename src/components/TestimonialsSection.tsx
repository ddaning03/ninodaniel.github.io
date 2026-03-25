"use client";

import ScrollReveal from "./ScrollReveal";

export default function TestimonialsSection() {
  return (
    <section 
      id="testimonios"
      className="relative py-24 lg:py-32 bg-premium-cream border-b border-zinc-900/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="max-w-4xl">
            <span className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block" style={{ fontFamily: "var(--font-syne)" }}>
              Prueba Social
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tighter mb-16" style={{ fontFamily: "var(--font-syne)" }}>
              Lo que dicen mis <br /> <span className="text-vermilion">primeros clientes.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Active Placeholder for the first client */}
          <ScrollReveal delay={0.2}>
            <div className="p-12 bg-white border border-zinc-900/5 shadow-xl space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14C19.017 11.7909 17.2261 10 15.017 10H14.017V7H15.017C18.883 7 22.017 10.134 22.017 14V21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.9124 16 4.01697 16H7.01697V14C7.01697 11.7909 5.22606 10 3.01697 10H2.01697V7H3.01697C6.88297 7 10.017 10.134 10.017 14V21H2.01697Z"/></svg>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-4 h-4 text-vermilion" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-xl italic font-medium text-zinc-800 leading-relaxed">
                  &ldquo;Daniel entendió perfectamente lo que necesitaba mi negocio. No solo hizo la web, sino que me ayudó con Google Maps y ahora los clientes encuentran mi cafetería en Almagro mucho más rápido.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-zinc-900/10 pt-8">
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-sm">
                  C.B
                </div>
                <div>
                  <p className="font-bold uppercase tracking-widest text-xs" style={{ fontFamily: "var(--font-syne)" }}>Carlos Blanco</p>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Dueño de Local CABA</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Invitation for next client */}
          <ScrollReveal delay={0.4}>
            <div className="p-12 border-2 border-dashed border-zinc-900/10 flex flex-col justify-center items-center text-center space-y-6 group hover:border-vermilion/30 transition-colors">
              <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>Tu próximo caso <br /> de éxito aquí.</h3>
              <p className="text-zinc-400 text-sm max-w-xs uppercase tracking-widest font-bold">Reserva uno de los 3 cupos con precio de lanzamiento para este mes.</p>
              <a 
                href={`https://wa.me/5491167644591?text=${encodeURIComponent("¡Hola Daniel! Vengo de tu portfolio y me gustaría solicitar el precio especial para primeros clientes.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-8 py-4 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-vermilion transition-colors inline-block"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Solicitar Precio Especial
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
