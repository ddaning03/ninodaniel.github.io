"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Mantiene el foco del teclado dentro del panel abierto y lo devuelve al botón
 * que lo abrió cuando se cierra. Recibe varios refs porque cada panel tiene una
 * versión de escritorio y otra de celular (una de las dos está oculta con CSS).
 */
export function useFocusTrap(isOpen: boolean, refs: RefObject<HTMLElement | null>[]) {
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const visiblePanel = () =>
      // offsetParent no sirve acá: los paneles son position: fixed
      refs.map((r) => r.current).find((el) => el && el.getClientRects().length > 0) ?? null;

    const focusables = (panel: HTMLElement) =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0
      );

    const raf = requestAnimationFrame(() => {
      const panel = visiblePanel();
      if (panel) focusables(panel)[0]?.focus({ preventScroll: true });
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const panel = visiblePanel();
      if (!panel) return;
      const items = focusables(panel);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (!panel.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
}
