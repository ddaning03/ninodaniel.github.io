"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ease = [0.32, 0.72, 0, 1] as const;

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* DESKTOP panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[90vw] md:w-[50vw] lg:w-[40vw] bg-dark-zinc text-white z-[60] hidden md:flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease }}
            role="dialog"
            aria-modal="true"
            aria-label="Contacto"
          >
            <DrawerHeader onClose={onClose} />
            <div className="flex-1 overflow-y-auto p-8 lg:p-12 no-scrollbar">
              <ContactContent
                formData={formData}
                setFormData={setFormData}
                submitted={submitted}
                onSubmit={handleSubmit}
              />
            </div>
          </motion.div>

          {/* MOBILE bottom-sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 h-[90vh] bg-dark-zinc text-white z-[60] flex md:hidden flex-col rounded-t-3xl shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease }}
            role="dialog"
            aria-modal="true"
            aria-label="Contacto"
          >
            <div className="pt-3 pb-2">
              <div className="drag-indicator" />
            </div>
            <DrawerHeader onClose={onClose} mobile />
            <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
              <ContactContent
                formData={formData}
                setFormData={setFormData}
                submitted={submitted}
                onSubmit={handleSubmit}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Sub-components ─── */

function DrawerHeader({ onClose, mobile }: { onClose: () => void; mobile?: boolean }) {
  return (
    <div className={`${mobile ? "px-6 pb-4" : "p-8"} border-b border-white/10 flex justify-between items-center`}>
      <h2
        className={`${mobile ? "text-xl" : "text-2xl"} font-bold uppercase tracking-tight`}
        style={{ fontFamily: "var(--font-syne)" }}
      >
        Hablemos
      </h2>
      <button
        onClick={onClose}
        className="p-3 hover:rotate-90 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-vermilion rounded"
        aria-label="Cerrar panel de contacto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

function ContactContent({
  formData,
  setFormData,
  submitted,
  onSubmit,
}: {
  formData: { name: string; email: string; message: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string }>>;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="space-y-10">
      {/* Contact info */}
      <div className="space-y-6">
        <p className="text-white/50 text-sm uppercase tracking-[0.3em] font-bold" style={{ fontFamily: "var(--font-syne)" }}>
          Información de contacto
        </p>

        <div className="space-y-4">
          <a
            href="mailto:ninogalattidaniel@gmail.com"
            className="flex items-center gap-4 group p-4 border border-white/10 hover:border-vermilion/50 transition-colors duration-300 rounded-sm"
          >
            <div className="w-12 h-12 bg-vermilion/10 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest" style={{ fontFamily: "var(--font-syne)" }}>Email</p>
              <p className="text-white group-hover:text-vermilion transition-colors">ninogalattidaniel@gmail.com</p>
            </div>
          </a>

          <a
            href="https://wa.me/5491167644591"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group p-4 border border-white/10 hover:border-vermilion/50 transition-colors duration-300 rounded-sm"
          >
            <div className="w-12 h-12 bg-vermilion/10 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest" style={{ fontFamily: "var(--font-syne)" }}>WhatsApp</p>
              <p className="text-white group-hover:text-vermilion transition-colors">+54 9 11 6764-4591</p>
            </div>
          </a>

          <a
            href="https://instagram.com/ddani.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group p-4 border border-white/10 hover:border-vermilion/50 transition-colors duration-300 rounded-sm"
          >
            <div className="w-12 h-12 bg-vermilion/10 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest" style={{ fontFamily: "var(--font-syne)" }}>Instagram</p>
              <p className="text-white group-hover:text-vermilion transition-colors">@ddani.ng</p>
            </div>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/30 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-syne)" }}>
          o envía un mensaje
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Contact form */}
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 space-y-4"
        >
          <div className="w-16 h-16 mx-auto bg-vermilion/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>
            ¡Mensaje enviado!
          </h3>
          <p className="text-white/50">Te responderé en menos de 24 horas.</p>
        </motion.div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="contact-name" className="block text-xs text-white/40 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-syne)" }}>
              Nombre
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-vermilion transition-colors"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs text-white/40 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-syne)" }}>
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-vermilion transition-colors"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-xs text-white/40 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-syne)" }}>
              Mensaje
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-vermilion transition-colors resize-none"
              placeholder="Cuéntame sobre tu proyecto..."
            />
          </div>

          <MagneticButton
            className="w-full bg-vermilion text-white font-bold py-4 uppercase tracking-[0.2em] hover:bg-white hover:text-dark-zinc transition-all duration-500"
            ariaLabel="Enviar mensaje de contacto"
          >
            <span style={{ fontFamily: "var(--font-syne)" }}>
              Enviar Mensaje
            </span>
          </MagneticButton>
        </form>
      )}
    </div>
  );
}
