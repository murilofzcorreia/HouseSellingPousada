import { useEffect, useState } from "react";

/* ============================================
   UTILITIES — Minimal motion helpers.
   
   ALL scroll-triggered reveals now use CSS [data-reveal].
   This file only contains:
   - Easing constants for CSS-in-JS edge cases
   - Device detection hooks
   ============================================ */

export const easeReveal: [number, number, number, number] = [0.16, 1.0, 0.3, 1.0];

/** Mobile detection hook */
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    let timeout: ReturnType<typeof setTimeout>;
    const debounced = () => {
      clearTimeout(timeout);
      timeout = setTimeout(check, 150);
    };
    window.addEventListener("resize", debounced, { passive: true });
    return () => {
      window.removeEventListener("resize", debounced);
      clearTimeout(timeout);
    };
  }, [breakpoint]);
  return isMobile;
}
