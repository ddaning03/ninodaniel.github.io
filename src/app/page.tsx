"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PerformanceSection from "@/components/PerformanceSection";
import MethodologySection from "@/components/MethodologySection";
import OffCanvasDrawer from "@/components/OffCanvasDrawer";
import ContactDrawer from "@/components/ContactDrawer";
import ProjectCard from "@/components/ProjectCard";

/* ─── Drawer content for Web cases ─── */
function WebDrawerContent() {
  return (
    <div className="space-y-16">
      <ProjectCard
        imageSrc="/projects/kenta/hero.png"
        imageAlt="KENTA – Landing page de cosméticos premium"
        deployUrl="/proyectos/kenta"
        category="Kenta — Cosméticos Premium"
        tag="Desarrollo Web Integral"
        description="Landing page de alta conversión para marca de cosméticos. Diseño editorial con grid dinámico, animaciones scroll-triggered y checkout optimizado."
        techLine="Stack: Next.js + Framer Motion • CR: +4.8% • Tasa de rebote: -34%"
      />

      <ProjectCard
        imageSrc="/projects/nocturne/interior.png"
        imageAlt="NOCTURNE. — Gastronomía de Autor"
        deployUrl="/proyectos/nocturne"
        category="Nocturne — Fine Dining"
        tag="Diseño Editorial • Web"
        description="Experiencia inmersiva para un restaurante Omakase premium. Diseño bento box oscuro, topografía asimétrica y atmósfera wabi-sabi."
        techLine="Stack: Next.js + CSS Grid + Framer Motion"
      />

      <ProjectCard
        imageSrc="/projects/synapse/vision.png"
        imageAlt="SYNAPSE — Waitlist Interface"
        deployUrl="/proyectos/synapse"
        category="Synapse — AI Lab"
        tag="Dashboard • UX Técnico"
        description="Interfaz brutalista para motor de video AI. Animación typewriter simula generación de prompts en tiempo real sobre un sistema tipo terminal."
        techLine="Stack: Next.js + Tailwind + Framer Motion"
      />
    </div>
  );
}

/* ─── Drawer content for Ads ─── */
function AdsDrawerContent() {
  const ads = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9-2niZp4szSt-3r74rJZKS-z7Yfkm0bhOoQ-wrwkamTG3QL485X_urisrrvSA_MuJlylRtwsLA8L5V6cWsOjRLuDvOtW_7hmlhvqsjTbsyzXHvWwi4g8VjWym9lMHtEi38h5jYlKdXt6UyJ8-w5aK4kD3s8Zl0z64pcbiI9ZKYK-vRlVWZPgUEi_KVP8uvUKz_7BhmzLqesTjTW1HsqKMcsW9BEEe-JRjNLzz9WPHMyutW_ilvUwN60YV6X1vZ6eUCqrT8XfyxHc",
      label: "Meta Ads #01",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxTXJ4066AXLHTOVAQ2YniAVqqAETUzH1OdXrLDunvDMZKY2kvwBs_dQHGWBUt_x9r4tppSlO-HJqWOdzqA0O5gaJepeEK1j62PPczmkdxzGJld2koY_53169hJuvyxGwiEK8MMQkgQv9KosMTz7sbNJiZl7JHElawrsdao8yp_7eMD-Rlzu7OeJizOkX1P0XgctiH3szjT-GLpo_mZG-AltzHD5gn-dEvypcxMK-EMmf6XCJjOC3Drdej4F4mXzV08H_HjrURbsA",
      label: "Static Creative #02",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg42yRp_VLrjmvf-HVZiHXt2abxs5Z292XbvhhrC95Vm_5vyEIbsyMPKho-tNYhKrGdQQw_4y1hYPy_aZldCT69OsJqH47oQBxiunyr6NPUavehWgnGaXZI9hQuPf18KgiBUT1zkAyaBLxB8CeVFJAeGYDZMqfakX_qWhnMu3HDB6nDGeKSTF8Vgi01F8CzFyngfvq2dhANyI9MtlrCax5N-NUkyXy61px9IlxFHAYQ28ZMkm2cZA_YYLRMQK9tg0tjHZjRjMT2iY",
      label: "UGC Style #03",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuiEnCA7C3QAjQ0ShzXXuiZkWdRHu8kraRMvc5j4D1hsR-oFUFoDBxmmDFd-HV0P8vAOw94PoHu37Vh7GnCgzcHihqVYJwogyqxZ_SxGVNbTRi0a6Q2kzXznQNbAqzm2ILSpr_aR-SUwkJcj-IU4ykXd_Eo0NNne6s7PFW3TRG3m512gxfbbfUukZpUasDb663PLgfLA-2JzAN5DiOV5auf7Z-3mLDHNbenfZydO4pf_iV-qWdBAlys9rVO_6JHf7JAH9bOc6rLdc",
      label: "Video Motion #04",
    },
  ];

  return (
    <div className="space-y-12">
      {/* ─── Caso de Estudio VOID ─── */}
      <ProjectCard
        imageSrc="/projects/void/1.png"
        imageAlt="VOID - Caso de Estudio Marketing Digital"
        deployUrl="/proyectos/void"
        category="VOID — Drop 04"
        tag="Estrategia de Marketing • Streetwear DTC"
        description="Estrategia end-to-end para el lanzamiento de un drop limitado de 100 piezas. Posicionamiento basado en la escasez, identidad brutalista y hype orgánico."
        techLine="Sold Out: < 7 días • Impresiones: +50k • Conversión: +4.5%"
      />

      <div className="border-t border-white/10 pt-8 mt-12">
        <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-6" style={{ fontFamily: "var(--font-syne)" }}>
          Más creativos de Performance
        </h4>
        <div className="grid grid-cols-2 gap-4">
        {ads.map((ad) => (
          <div
            key={ad.label}
            className="relative overflow-hidden aspect-square bg-zinc-900 border border-white/5 p-4 flex flex-col justify-end group"
          >
            <Image
              alt={ad.label}
              src={ad.src}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span
              className="relative z-10 text-xs font-bold uppercase tracking-widest opacity-40 mt-auto"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {ad.label}
            </span>
          </div>
        ))}
        </div>
      </div>

      <div className="bg-vermilion/10 border-l-4 border-vermilion p-8">
        <p className="text-lg italic" style={{ fontFamily: "var(--font-syne)" }}>
          &ldquo;Detenemos el scroll antes de que el usuario piense en su
          siguiente acción.&rdquo;
        </p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [webDrawerOpen, setWebDrawerOpen] = useState(false);
  const [adsDrawerOpen, setAdsDrawerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main>
      <Navbar onCtaClick={() => setContactOpen(true)} />

      <HeroSection onWebClick={() => setWebDrawerOpen(true)} />

      <PerformanceSection onAdsClick={() => setAdsDrawerOpen(true)} />

      <MethodologySection onContactClick={() => setContactOpen(true)} />

      {/* Web cases drawer — from RIGHT on desktop */}
      <OffCanvasDrawer
        isOpen={webDrawerOpen}
        onClose={() => setWebDrawerOpen(false)}
        direction="right"
        title="Desarrollo Web"
      >
        <WebDrawerContent />
      </OffCanvasDrawer>

      {/* Ads drawer — from LEFT on desktop */}
      <OffCanvasDrawer
        isOpen={adsDrawerOpen}
        onClose={() => setAdsDrawerOpen(false)}
        direction="left"
        title="Marketing & Ads"
        darkMode
      >
        <AdsDrawerContent />
      </OffCanvasDrawer>

      {/* Contact drawer */}
      <ContactDrawer
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </main>
  );
}
