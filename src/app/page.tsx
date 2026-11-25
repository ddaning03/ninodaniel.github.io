"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PerformanceSection from "@/components/PerformanceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MethodologySection from "@/components/MethodologySection";
import OffCanvasDrawer from "@/components/OffCanvasDrawer";
import ContactDrawer from "@/components/ContactDrawer";
import ProjectCard from "@/components/ProjectCard";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

/* ─── Drawer content for Web cases ─── */
function WebDrawerContent() {
  return (
    <div className="space-y-16">
      <ProjectCard
        imageSrc="/projects/kenta/preview.jpg"
        imageAlt="Captura de la landing de KENTA: titular con tipografía serif y frasco de sérum"
        deployUrl="/proyectos/kenta"
        category="Kenta — Cosméticos Premium"
        tag="Proyecto de concepto • Web"
        description="Landing page de alta conversión para marca de cosméticos. Diseño editorial con grid dinámico, animaciones scroll-triggered y checkout optimizado."
        techLine="Stack: Next.js + Framer Motion • Métricas simuladas: CR +4.8% • Rebote -34%"
      />

      <ProjectCard
        imageSrc="/projects/austral/preview.jpg"
        imageAlt="Captura del portfolio AUSTRAL: lago patagónico a pantalla completa con el título La luz del sur"
        deployUrl="/proyectos/austral"
        category="Austral — Fotografía de Paisaje"
        tag="Proyecto de concepto • Portfolio"
        description="Portfolio editorial para un fotógrafo de paisajes. Portada a pantalla completa con parallax, galería asimétrica con visor accesible y venta de copias firmadas."
        techLine="Stack: Next.js + Framer Motion • Visor con teclado y foco accesible"
      />

      <ProjectCard
        imageSrc="/projects/nocturne/preview.jpg"
        imageAlt="Captura de NOCTURNE: titular editorial y grilla oscura con foto del salón"
        deployUrl="/proyectos/nocturne"
        category="Nocturne — Fine Dining"
        tag="Proyecto de concepto • Diseño Editorial"
        description="Experiencia inmersiva para un restaurante Omakase premium. Diseño bento box oscuro, topografía asimétrica y atmósfera wabi-sabi."
        techLine="Stack: Next.js + CSS Grid + Framer Motion"
      />

      <ProjectCard
        imageSrc="/projects/synapse/preview.jpg"
        imageAlt="Captura de SYNAPSE: interfaz tipo terminal con titular en rojo y formulario de acceso"
        deployUrl="/proyectos/synapse"
        category="Synapse — AI Lab"
        tag="Proyecto de concepto • UX Técnico"
        description="Interfaz brutalista para motor de video AI. Animación typewriter simula generación de prompts en tiempo real sobre un sistema tipo terminal."
        techLine="Stack: Next.js + Tailwind + Framer Motion"
      />
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [webDrawerOpen, setWebDrawerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
    <main>
      <Navbar onCtaClick={() => setContactOpen(true)} />

      <HeroSection onWebClick={() => setWebDrawerOpen(true)} />

      <AboutSection />

      <ServicesSection />

      <PerformanceSection />

      <TestimonialsSection />

      <FaqSection />

      <MethodologySection onContactClick={() => setContactOpen(true)} />
    </main>

      <Footer />

      {/* Web cases drawer — from RIGHT on desktop */}
      <OffCanvasDrawer
        isOpen={webDrawerOpen}
        onClose={() => setWebDrawerOpen(false)}
        direction="right"
        title="Desarrollo Web"
      >
        <WebDrawerContent />
      </OffCanvasDrawer>


      <ContactDrawer
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <FloatingWhatsApp />
    </>
  );
}
