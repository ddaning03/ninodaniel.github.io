"use client";

import Image from "next/image";
interface ProjectCardProps {
  /** Project image URL */
  imageSrc: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Live deploy URL (e.g. your-project.vercel.app) */
  deployUrl: string;
  /** Category title (e.g. 'E-COMMERCE HIGH-END') */
  category: string;
  /** Project type tag (e.g. 'Proyecto de Concepto') */
  tag: string;
  /** Short description */
  description: string;
  /** Technical details / stack line */
  techLine: string;
}

export default function ProjectCard({
  imageSrc,
  imageAlt,
  deployUrl,
  category,
  tag,
  description,
  techLine,
}: ProjectCardProps) {
  return (
    <article className="space-y-5">
      {/* ─── Image container with hover interactions ─── */}
      <a
        href={deployUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-video relative overflow-hidden group cursor-pointer"
        aria-label={`Ver deploy en vivo de ${category}`}
      >
        {/* Main image */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Dark overlay — fades in on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500" />

        {/* CTA pill — hidden, appears centered on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white border border-white/20 backdrop-blur-md bg-white/10 rounded-full"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Ver Deploy en Vivo
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </div>
      </a>

      {/* ─── Typography below image ─── */}
      <div className="space-y-3">
        {/* Category */}
        <h3
          className="text-2xl lg:text-3xl font-bold uppercase tracking-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {category}
        </h3>

        {/* Tag pill */}
        <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border border-zinc-300 text-zinc-500 rounded-full">
          {tag}
        </span>

        {/* Description */}
        <p className="text-zinc-500 max-w-md leading-relaxed">
          {description}
        </p>

        {/* Tech line */}
        <p className="text-xs text-zinc-400/70 font-mono tracking-wide">
          {techLine}
        </p>
      </div>
    </article>
  );
}
