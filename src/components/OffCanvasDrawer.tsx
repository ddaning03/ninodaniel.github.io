"use client";

import { useCallback, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface OffCanvasDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  direction: "left" | "right";
  title: string;
  children: React.ReactNode;
  darkMode?: boolean;
}

/* Apple-style easing */
const ease = [0.32, 0.72, 0, 1] as const;

export default function OffCanvasDrawer({
  isOpen,
  onClose,
  direction,
  title,
  children,
  darkMode = false,
}: OffCanvasDrawerProps) {
  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  /* Desktop slide variants */
  const desktopVariants = {
    hidden: {
      x: direction === "right" ? "100%" : "-100%",
    },
    visible: {
      x: 0,
      transition: { duration: 0.6, ease },
    },
    exit: {
      x: direction === "right" ? "100%" : "-100%",
      transition: { duration: 0.5, ease },
    },
  };

  /* Mobile bottom-sheet variants */
  const mobileVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 0.5, ease },
    },
    exit: {
      y: "100%",
      transition: { duration: 0.4, ease },
    },
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 300) {
      onClose();
    }
  };

  const bg = darkMode ? "bg-[#09090b]" : "bg-white";
  const text = darkMode ? "text-white" : "text-zinc-900";
  const border = darkMode ? "border-white/10" : "border-zinc-100";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* DESKTOP drawer (hidden on mobile) */}
          <motion.div
            className={`fixed top-0 ${direction === "right" ? "right-0" : "left-0"} h-full w-[90vw] md:w-[60vw] ${bg} ${text} z-[60] hidden md:flex flex-col shadow-2xl`}
            variants={desktopVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Header */}
            <div
              className={`p-8 border-b ${border} flex ${direction === "left" ? "flex-row-reverse" : "flex-row"} justify-between items-center sticky top-0 z-10 ${bg}`}
            >
              <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-4 hover:rotate-90 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-vermilion rounded"
                aria-label="Cerrar panel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 lg:p-16 no-scrollbar">
              {children}
            </div>
          </motion.div>

          {/* MOBILE bottom-sheet (hidden on desktop) */}
          <motion.div
            className={`fixed bottom-0 left-0 right-0 h-[85vh] ${bg} ${text} z-[60] flex md:hidden flex-col rounded-t-3xl shadow-2xl`}
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Drag indicator */}
            <div className="pt-3 pb-2">
              <div className="drag-indicator" />
            </div>

            {/* Header */}
            <div
              className={`px-6 pb-4 border-b ${border} flex ${direction === "left" ? "flex-row-reverse" : "flex-row"} justify-between items-center`}
            >
              <h2 className="text-xl font-bold uppercase tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-3 hover:rotate-90 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-vermilion rounded"
                aria-label="Cerrar panel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
