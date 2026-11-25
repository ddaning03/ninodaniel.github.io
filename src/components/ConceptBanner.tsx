import Link from "next/link";

/* Franja fija que aclara que el proyecto es un concepto. Mide 28 px (h-7):
   cada página corre su contenido fijo esa misma altura. */
export default function ConceptBanner() {
  return (
    <div
      role="note"
      className="fixed top-0 inset-x-0 z-[60] h-7 flex items-center justify-center px-4 bg-black text-white/80 text-[10px] sm:text-[11px] tracking-wide whitespace-nowrap overflow-hidden"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <span>
        Proyecto de concepto · marca ficticia · diseñado por{" "}
        <Link href="/" className="text-white underline underline-offset-2 hover:text-[#E63946] transition-colors">
          Daniel Niño
        </Link>
      </span>
    </div>
  );
}
