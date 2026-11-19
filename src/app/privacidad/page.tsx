import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Qué datos guardo cuando me escribís desde el formulario o por WhatsApp, para qué los uso y cómo pedir que los borre.",
};

const sections = [
  {
    title: "Quién es responsable",
    body: (
      <>
        Daniel Niño, desarrollador web freelance en Buenos Aires, Argentina.
        Contacto:{" "}
        <a href="mailto:ninogalattidaniel@gmail.com" className="text-vermilion hover:underline">
          ninogalattidaniel@gmail.com
        </a>
        .
      </>
    ),
  },
  {
    title: "Qué datos guardo",
    body: (
      <>
        Solo los que vos me mandás: tu nombre, tu email y el mensaje que escribís
        en el formulario de contacto. Si me escribís por WhatsApp o Instagram,
        también tu número o usuario y la conversación.
      </>
    ),
  },
  {
    title: "Para qué los uso",
    body: (
      <>
        Para responder tu consulta y, si trabajamos juntos, para coordinar el
        proyecto. No los vendo, no los cedo a terceros y no te agrego a listas de
        correo sin pedirte permiso.
      </>
    ),
  },
  {
    title: "Con quién se comparten",
    body: (
      <>
        El formulario se envía a través de Formspree, un servicio que me reenvía
        el mensaje por email y que guarda los datos en servidores fuera de
        Argentina. La página está alojada en Vercel, que mide visitas de forma
        anónima y sin cookies (no sabe quién sos).
      </>
    ),
  },
  {
    title: "Cuánto tiempo los guardo",
    body: (
      <>
        Mientras sea necesario para responderte o para el trabajo que hagamos
        juntos. Si no avanzamos, podés pedirme que los borre en cualquier momento.
      </>
    ),
  },
  {
    title: "Tus derechos",
    body: (
      <>
        Podés pedirme ver, corregir o borrar tus datos escribiéndome al email de
        arriba. Te respondo dentro de los plazos de la Ley 25.326 de Protección de
        los Datos Personales.
        <span className="block mt-4 text-sm text-zinc-500">
          La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano
          de Control de la Ley N° 25.326, tiene la atribución de atender las
          denuncias y reclamos que interpongan quienes resulten afectados en sus
          derechos por incumplimiento de las normas vigentes en materia de
          protección de datos personales.
        </span>
      </>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-premium-cream py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 hover:text-vermilion transition-colors"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          ← Volver al inicio
        </Link>

        <h1
          className="mt-12 text-4xl md:text-6xl leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Política de <span className="text-vermilion">privacidad.</span>
        </h1>

        <p className="mt-8 text-xl text-zinc-600 leading-relaxed">
          Corta y sin letra chica: qué pasa con tus datos cuando me escribís.
        </p>

        <div className="mt-16 border-t border-zinc-900/10">
          {sections.map((s) => (
            <section key={s.title} className="py-10 border-b border-zinc-900/10">
              <h2
                className="text-sm uppercase tracking-[0.3em] font-bold mb-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {s.title}
              </h2>
              <p className="text-zinc-600 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-xs text-zinc-500 uppercase tracking-widest">
          Última actualización: noviembre de 2026
        </p>
      </div>
    </main>
  );
}
