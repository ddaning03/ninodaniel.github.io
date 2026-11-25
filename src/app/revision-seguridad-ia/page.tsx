import { pageMetadata } from "@/lib/pageMetadata";
import Link from "next/link";
import Footer from "@/components/Footer";
import { extraServices } from "@/lib/services";

const service = extraServices.find((s) => s.tier === "Revisión de seguridad")!;
const waHref = `https://wa.me/5491167644591?text=${encodeURIComponent(service.waText ?? "")}`;

export const metadata = pageMetadata({
  title: "Revisión de seguridad para páginas hechas con IA",
  description: `¿Tu página la hiciste con Lovable, Bolt o v0? La reviso, te paso un informe en lenguaje simple con los riesgos encontrados y cómo arreglarlos. $${service.price} ARS.`,
});

const syne = { fontFamily: "var(--font-syne)" };

const checks = [
  { t: "Base de datos", d: "Si cualquiera puede leer o borrar datos de tus clientes (Supabase, Firebase y similares)." },
  { t: "Claves a la vista", d: "Contraseñas, tokens o claves de servicios pagos que quedaron en el código que baja el navegador." },
  { t: "Formularios y login", d: "Que no se puedan usar para mandar spam, adivinar contraseñas o meter código malicioso." },
  { t: "Configuración del sitio", d: "Los headers de seguridad que protegen a tus visitantes de ataques comunes." },
  { t: "Librerías desactualizadas", d: "Piezas de código con fallas conocidas y públicas que conviene actualizar." },
  { t: "Datos personales", d: "Qué datos pedís, dónde terminan y si estás cumpliendo con lo básico de la ley." },
];

const steps = [
  { n: "01.", t: "Me pasás el link", d: "Con eso alcanza para empezar. Si querés una revisión más a fondo, me das acceso de solo lectura al proyecto." },
  { n: "02.", t: "Reviso sin tocar nada", d: "Miro tu página desde afuera, como lo haría alguien con malas intenciones. No cambio ni rompo nada." },
  { n: "03.", t: "Te entrego el informe", d: "Qué encontré, qué tan grave es cada cosa y cómo se arregla. Si querés, lo arreglo yo con un presupuesto aparte." },
];

const findings = [
  {
    level: "Crítico",
    color: "bg-vermilion text-white",
    t: "Cualquiera puede descargar la lista de clientes",
    d: "La tabla de turnos en la base de datos no tenía reglas de acceso. Con la clave pública que está en la página se podían bajar nombres y teléfonos de todos los clientes.",
    fix: "Activar las reglas de acceso para que cada persona vea solo sus propios turnos.",
  },
  {
    level: "Alto",
    color: "bg-vermilion/20 text-vermilion",
    t: "Una clave secreta quedó a la vista",
    d: "La clave del servicio que manda los emails de confirmación estaba en el código que descarga el navegador. Alguien podría usarla para mandar emails en nombre del negocio.",
    fix: "Generar una clave nueva y moverla al servidor, donde nadie la ve.",
  },
  {
    level: "Medio",
    color: "bg-white/10 text-white",
    t: "El formulario de contacto no frena el spam",
    d: "Un bot podía mandar miles de mensajes por minuto y llenar la casilla del negocio.",
    fix: "Agregar un campo trampa para bots y un límite de envíos.",
  },
  {
    level: "Bajo",
    color: "bg-white/5 text-white/60",
    t: "Faltan headers de seguridad",
    d: "La página no le indica al navegador las protecciones básicas contra ataques comunes.",
    fix: "Agregarlos en la configuración del sitio (son unas pocas líneas).",
  },
];

export default function RevisionSeguridadPage() {
  return (
    <>
      <main>
        {/* ─── Intro ─── */}
        <section className="bg-premium-cream py-24 lg:py-32 border-b border-zinc-900/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 hover:text-vermilion transition-colors"
              style={syne}
            >
              ← Volver al inicio
            </Link>

            <div className="mt-12 grid lg:grid-cols-4 gap-12 items-end">
              <div className="lg:col-span-3 space-y-8">
                <span
                  className="inline-block px-3 py-1 border border-vermilion text-vermilion text-[10px] uppercase tracking-[0.3em] font-bold"
                  style={syne}
                >
                  Servicio
                </span>
                <h1 className="text-5xl md:text-7xl leading-[0.95] tracking-tighter max-w-4xl" style={syne}>
                  Revisión de seguridad para páginas hechas con{" "}
                  <span className="text-vermilion italic font-bold">IA.</span>
                </h1>
                <p className="text-lg lg:text-2xl font-medium max-w-2xl opacity-70">
                  Lovable, Bolt o v0 te arman una página en minutos, pero no te avisan si
                  dejó datos de tus clientes a la vista. Yo la reviso y te lo explico en
                  criollo.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tighter text-vermilion" style={syne}>
                    {`$${service.price}`}
                  </span>{" "}
                  <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">ARS</span>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-vermilion text-white py-4 text-xs font-bold uppercase text-center tracking-[0.2em] hover:bg-black transition-colors duration-300"
                  style={syne}
                >
                  {service.cta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Qué reviso ─── */}
        <section className="bg-white py-24 lg:py-32 border-b border-zinc-900/10" aria-label="Qué reviso">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <h2 className="text-sm uppercase tracking-[0.4em] font-bold mb-16 opacity-40" style={syne}>
              Qué reviso
            </h2>
            <div className="grid md:grid-cols-3 gap-0 border-t border-l border-zinc-900/10">
              {checks.map((c) => (
                <div key={c.t} className="p-8 lg:p-12 border-r border-b border-zinc-900/10 space-y-4 group hover:bg-premium-cream transition-colors duration-500">
                  <h3 className="text-xl uppercase tracking-tight group-hover:text-vermilion transition-colors duration-500" style={syne}>
                    {c.t}
                  </h3>
                  <p className="opacity-60 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Cómo funciona ─── */}
        <section className="bg-premium-cream py-24 lg:py-32 border-b border-zinc-900/10" aria-label="Cómo funciona">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <h2 className="text-sm uppercase tracking-[0.4em] font-bold mb-16 opacity-40" style={syne}>
              Cómo funciona
            </h2>
            <div className="grid md:grid-cols-3 gap-0 border-t border-l border-zinc-900/10">
              {steps.map((s) => (
                <div key={s.n} className="p-12 border-r border-b border-zinc-900/10 space-y-6 group hover:bg-white transition-colors duration-500">
                  <span className="text-6xl lg:text-7xl block text-zinc-900/10 group-hover:text-vermilion transition-colors duration-500" style={syne}>
                    {s.n}
                  </span>
                  <h3 className="text-2xl uppercase tracking-tight" style={syne}>{s.t}</h3>
                  <p className="opacity-60 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Ejemplo de informe ─── */}
        <section id="ejemplo" className="bg-dark-zinc text-white py-24 lg:py-32 border-b border-white/10" aria-label="Ejemplo de informe">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-4">
                <span className="text-vermilion text-[10px] uppercase tracking-[0.4em] font-bold" style={syne}>
                  Ejemplo de informe
                </span>
                <h2 className="text-4xl md:text-6xl leading-tight tracking-tighter" style={syne}>
                  Así se ve lo <br /> <span className="text-white/40">que te entrego.</span>
                </h2>
              </div>
              <p className="max-w-sm text-white/40 text-sm leading-relaxed">
                Ejemplo ilustrativo sobre una página de prueba ficticia (un sistema de turnos
                para una barbería hecho con IA). No es un cliente real.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-8 lg:p-12 mb-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-3" style={syne}>
                Resumen
              </p>
              <p className="text-xl lg:text-2xl leading-relaxed text-white/80 max-w-3xl">
                Encontré 4 problemas: 1 crítico, 1 alto, 1 medio y 1 bajo. Los dos primeros
                conviene arreglarlos esta semana, porque exponen datos de tus clientes.
              </p>
            </div>

            <ol className="grid gap-4">
              {findings.map((f, i) => (
                <li key={f.t} className="border border-white/10 p-8 lg:p-12 grid lg:grid-cols-4 gap-6 hover:border-vermilion/30 transition-colors duration-500">
                  <div className="space-y-3">
                    <span className="text-white/30 text-sm" style={syne}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`block w-fit px-3 py-1 text-[10px] uppercase tracking-[0.3em] font-bold ${f.color}`} style={syne}>
                      {f.level}
                    </span>
                  </div>
                  <div className="lg:col-span-3 space-y-4">
                    <h3 className="text-xl lg:text-2xl uppercase tracking-tight" style={syne}>{f.t}</h3>
                    <p className="text-white/60 leading-relaxed">{f.d}</p>
                    <p className="text-sm text-white/80 leading-relaxed border-l-2 border-vermilion pl-4">
                      <span className="font-bold">Cómo se arregla:</span> {f.fix}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="bg-premium-cream py-24 lg:py-32" aria-label="Contacto">
          <div className="text-center max-w-4xl mx-auto px-6 space-y-12">
            <h2 className="text-5xl md:text-7xl tracking-tighter leading-none" style={syne}>
              ¿Revisamos tu página?
            </h2>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-3xl mx-auto bg-vermilion text-white text-xl md:text-2xl font-bold py-8 lg:py-10 uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 shadow-2xl"
              style={syne}
            >
              Mandame el link
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
