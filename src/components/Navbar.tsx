"use client";

import MagneticButton from "./MagneticButton";

interface NavbarProps {
  onCtaClick: () => void;
}

export default function Navbar({ onCtaClick }: NavbarProps) {
  return (
    <nav
      className="fixed top-0 w-full z-50 border-b border-zinc-900/10 bg-premium-cream/80 backdrop-blur-md"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <div
          className="font-bold text-sm tracking-tighter uppercase"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          DANIEL NIÑO //{" "}
          <span className="opacity-50">ESTRATEGA VISUAL</span>
        </div>

        <a
          href="https://wa.me/5491167644591?text=Hola%20Daniel!%20Vengo%20de%20tu%20web%20y%20me%20gustar%C3%ADa%20consultar%20un%20presupuesto."
          target="_blank"
          rel="noopener noreferrer"
        >
          <MagneticButton
            className="cursor-pointer bg-vermilion text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors duration-300"
            ariaLabel="Consultar presupuesto por WhatsApp"
          >
            <span style={{ fontFamily: "var(--font-syne)" }}>
              Consultar Presupuesto
            </span>
          </MagneticButton>
        </a>
      </div>
    </nav>
  );
}
