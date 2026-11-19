"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/* Registra en Vercel Analytics cada clic a WhatsApp, con la sección de donde vino.
   (Los eventos personalizados requieren el plan Pro de Vercel; en Hobby se ignoran sin error.) */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="https://wa.me"]');
      if (!link) return;

      const container = link.parentElement?.closest<HTMLElement>("section[id], section[aria-label], footer, nav, [role=dialog]");
      const origen =
        link.dataset.origen ||
        container?.id ||
        container?.getAttribute("aria-label") ||
        container?.tagName.toLowerCase() ||
        "otro";

      track("whatsapp_click", { origen, pagina: window.location.pathname });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
