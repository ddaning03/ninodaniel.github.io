"use client";

import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

interface PerformanceSectionProps {
  onAdsClick: () => void;
}

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

/* ─── Dashboard data cards ─── */
const metrics = [
  { label: "Conversión", value: "4.8%", delta: "+127%", up: true },
  { label: "CPA Promedio", value: "$3.20", delta: "-42%", up: false },
  { label: "ROAS", value: "5.2x", delta: "+89%", up: true },
  { label: "CTR", value: "3.1%", delta: "+68%", up: true },
];

function MetricCard({ label, value, delta, up, delay }: { label: string; value: string; delta: string; up: boolean; delay: number }) {
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
        <div className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={up ? "#22c55e" : "#E63946"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={up ? "" : "rotate-180"}
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span className={`text-sm font-medium ${up ? "text-green-400" : "text-vermilion"}`}>
            {delta}
          </span>
          <span className="text-xs text-white/30">vs periodo anterior</span>
        </div>

        {/* Mini sparkline */}
        <svg className="w-full h-8 mt-2 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 100 30" fill="none">
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

export default function PerformanceSection({
  onAdsClick,
}: PerformanceSectionProps) {
  return (
    <section
      className="relative min-h-screen bg-dark-zinc text-white py-24 lg:py-32 flex flex-col justify-center border-b border-white/10 overflow-hidden"
      aria-label="Sección de rendimiento y resultados"
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
                Resultados
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h2
                className="text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Más allá de los <br /> píxeles:{" "}
                <span className="text-vermilion">Rendimiento.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-xl lg:text-2xl opacity-60 max-w-lg leading-relaxed">
                Tus anuncios no necesitan ser arte, necesitan detener el
                scroll y reducir tu CPA.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <MagneticButton
                className="inline-block cursor-pointer border-4 border-vermilion px-10 py-5 font-extrabold uppercase tracking-widest hover:bg-vermilion transition-all duration-300"
                onClick={onAdsClick}
                ariaLabel="Ver creativos y anuncios"
              >
                <span style={{ fontFamily: "var(--font-syne)" }}>
                  ← VER CREATIVOS &amp; ADS
                </span>
              </MagneticButton>
            </ScrollReveal>
          </div>

          {/* Right: Dashboard metrics */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <MetricCard key={m.label} {...m} delay={0.15 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
