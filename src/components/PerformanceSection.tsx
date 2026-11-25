"use client";

import ScrollReveal from "./ScrollReveal";

/* ─── Background SVG chart ─── */
function BackgroundChart() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 left-0 w-full h-[70%] opacity-[0.06]"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid lines */}
        {[100, 200, 300].map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        ))}
        {[0, 200, 400, 600, 800, 1000].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        ))}

        {/* Area fill */}
        <path
          d="M0 380 L100 340 L200 350 L300 280 L400 300 L500 220 L600 240 L700 180 L800 160 L900 120 L1000 90 L1100 60 L1200 40 L1200 400 L0 400 Z"
          fill="url(#chartGradient)"
        />

        {/* Line */}
        <path
          d="M0 380 L100 340 L200 350 L300 280 L400 300 L500 220 L600 240 L700 180 L800 160 L900 120 L1000 90 L1100 60 L1200 40"
          stroke="#E63946"
          strokeWidth="2"
          fill="none"
        />

        {/* Data points */}
        {[
          [0, 380], [100, 340], [200, 350], [300, 280], [400, 300],
          [500, 220], [600, 240], [700, 180], [800, 160], [900, 120],
          [1000, 90], [1100, 60], [1200, 40],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#E63946" />
        ))}

        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E63946" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E63946" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Qué reviso en tu página ─── */
const checks = [
  {
    label: "Velocidad en celular",
    value: "01",
    desc: "Que cargue rápido con datos móviles. Si tarda, la gente se va antes de ver lo que vendés.",
  },
  {
    label: "Conversión",
    value: "02",
    desc: "Que escribirte por WhatsApp, llamarte o pedir un turno sea fácil y esté siempre a la vista.",
  },
  {
    label: "Presencia en Google",
    value: "03",
    desc: "Que aparezcas cuando alguien busca lo que hacés en tu zona, con tu ficha de Google al día.",
  },
  {
    label: "Seguridad",
    value: "04",
    desc: "Que no queden datos de clientes ni claves a la vista. Clave si tu página la armó una IA.",
  },
];

function MetricCard({ label, value, desc, delay }: { label: string; value: string; desc: string; delay: number }) {
  const up = true; // mini gráfico decorativo
  return (
    <ScrollReveal delay={delay}>
      <div className="bg-white/[0.04] border border-white/[0.08] p-6 space-y-3 hover:border-vermilion/30 transition-colors duration-500 group">
        <p
          className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {label}
        </p>
        <p
          className="text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover:text-vermilion transition-colors duration-500"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {value}
        </p>
        <p className="text-sm text-white/60 leading-relaxed">{desc}</p>

        {/* Mini sparkline (decorativo) */}
        <svg aria-hidden="true" className="w-full h-8 mt-2 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 100 30" fill="none">
          {up ? (
            <polyline
              points="0,28 15,24 30,26 45,20 55,22 70,14 85,10 100,4"
              stroke="#22c55e"
              strokeWidth="1.5"
              fill="none"
            />
          ) : (
            <polyline
              points="0,4 15,8 30,6 45,14 55,12 70,20 85,18 100,26"
              stroke="#E63946"
              strokeWidth="1.5"
              fill="none"
            />
          )}
        </svg>
      </div>
    </ScrollReveal>
  );
}

export default function PerformanceSection() {
  return (
    <section
      className="relative min-h-screen bg-dark-zinc text-white py-24 lg:py-32 flex flex-col justify-center border-b border-white/10 overflow-hidden"
      aria-label="Qué reviso en tu página"
    >
      <BackgroundChart />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <ScrollReveal>
              <div
                className="inline-block px-3 py-1 border border-vermilion text-vermilion text-[10px] uppercase tracking-[0.3em] font-bold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Qué reviso
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h2
                className="text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Qué reviso en <br /> tu{" "}
                <span className="text-vermilion">página.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-6">
                <p className="text-xl lg:text-2xl opacity-60 max-w-lg leading-relaxed">
                  Antes de tocar nada, miro tu página como la ve tu cliente
                  desde el celular. Estos son los 4 puntos que reviso siempre.
                </p>
              </div>
            </ScrollReveal>

          </div>

          {/* Right: Qué reviso */}
          <div className="grid grid-cols-2 gap-4">
            {checks.map((m, i) => (
              <MetricCard key={m.label} {...m} delay={0.15 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
