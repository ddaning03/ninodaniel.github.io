"use client";

import { MotionConfig } from "framer-motion";

/* Respeta la preferencia "reducir movimiento" del sistema: quien la tenga activada
   ve los contenidos sin desplazamientos; para el resto no cambia nada. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
