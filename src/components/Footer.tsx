const links = [
  { label: "WhatsApp", href: "https://wa.me/5491167644591", external: true },
  { label: "Email", href: "mailto:ninogalattidaniel@gmail.com" },
  { label: "Instagram", href: "https://instagram.com/ddani.ng", external: true },
  { label: "Privacidad", href: "/privacidad" },
];

export default function Footer() {
  return (
    <footer className="bg-premium-cream border-t border-zinc-900/10">
      {/* pb extra en celular para que el botón flotante de WhatsApp no tape nada */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 pb-28 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <p
            className="font-bold text-sm tracking-tighter uppercase"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            DANIEL NIÑO //{" "}
            <span className="opacity-50">ESTRATEGA VISUAL</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500" style={{ fontFamily: "var(--font-syne)" }}>
            Páginas web y seguridad · Caballito, CABA
          </p>
        </div>

        <nav aria-label="Contacto y legales">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 hover:text-vermilion transition-colors"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500" suppressHydrationWarning>
          © {new Date().getFullYear()} Daniel Niño
        </p>
      </div>
    </footer>
  );
}
