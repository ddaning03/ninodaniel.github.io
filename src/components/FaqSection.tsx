"use client";

import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "¿Qué te tengo que mandar?",
    a: "Fotos de tu negocio, tu logo si tenés, y los datos básicos: qué hacés, horarios, zona y cómo querés que te contacten. Si no tenés los textos, los escribimos juntos.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "Entre 48 horas y 10 días según el plan, contando desde que me mandás todo el material.",
  },
  {
    q: "¿Cómo se paga?",
    a: "50% para arrancar y 50% cuando te entrego la página. Podés pagar por transferencia, Mercado Pago o en dólares.",
  },
  {
    q: "¿El dominio queda a mi nombre?",
    a: "Sí. El .com.ar se registra con tus datos en NIC Argentina: es tuyo desde el primer día.",
  },
  {
    q: "¿Qué pasa cuando se cumple el año de hosting?",
    a: "Te aviso antes de que venza y te paso el costo de la renovación anual. No se corta nada sin que lo sepas.",
  },
  {
    q: "¿Y si después quiero cambiar algo?",
    a: "Al entregar tenés 2 rondas de cambios incluidas. Después me pedís lo que necesites: los cambios chicos van incluidos en el mantenimiento mensual, o te paso el costo antes de hacerlos.",
  },
  {
    q: "¿Qué es la revisión de seguridad?",
    a: "Si tu página la armaste con una IA (Lovable, Bolt, v0…), puede tener problemas que no se ven: datos de clientes que cualquiera puede leer, claves a la vista o formularios que se usan para mandar spam. La reviso, te paso un informe en lenguaje simple con lo que encontré y te propongo cómo arreglarlo.",
  },
];

export default function FaqSection() {
  return (
    <section
      id="preguntas"
      className="relative py-24 lg:py-32 bg-white border-b border-zinc-900/10"
      aria-label="Preguntas frecuentes"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <span
            className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Preguntas Frecuentes
          </span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tighter mb-16"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Lo que todos <br /> <span className="text-vermilion">me preguntan.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="border-t border-zinc-900/10">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-zinc-900/10">
                <summary className="flex items-center justify-between gap-6 py-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3
                    className="text-lg md:text-2xl uppercase tracking-tight group-hover:text-vermilion transition-colors duration-500"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {f.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="text-3xl text-zinc-900/30 group-hover:text-vermilion group-open:rotate-45 transition-all duration-500 shrink-0"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    +
                  </span>
                </summary>
                <p className="pb-8 -mt-2 max-w-3xl text-lg text-zinc-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
