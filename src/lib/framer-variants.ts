import { type Variants, type Transition, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ============================================
   MOTION — Cinematic Architectural System
   ============================================ */

// --- Easing Palette ---
export const easeReveal: [number, number, number, number] = [0.16, 1.0, 0.3, 1.0];   // slow start, dramatic finish
export const easeImage:  [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]; // elastic settle
export const easeText:   [number, number, number, number] = [0.19, 1.0, 0.22, 1.0];   // sharp snap
export const easeCinema: [number, number, number, number] = [0.76, 0.0, 0.24, 1.0];   // slow-in slow-out

const base: Transition = { duration: 1.2, ease: easeReveal };
const slow: Transition = { duration: 1.6, ease: easeReveal };
const snap: Transition = { duration: 0.9, ease: easeText };

// ─── PROGRESSIVE BLUR REVEALS ───────────────────────

export const fadeBlurUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: base },
};

export const fadeBlur: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: slow },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: base },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: base },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: base },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: slow },
};

// ─── DIRECTIONAL CLIP-PATH MASKS ────────────────────

export const maskUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.4, ease: easeReveal } },
};

export const maskDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.4, ease: easeReveal } },
};

export const maskLeft: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.5, ease: easeReveal } },
};

export const maskRight: Variants = {
  hidden: { clipPath: "inset(0 0 0 100%)" },
  visible: { clipPath: "inset(0 0 0 0%)", transition: { duration: 1.5, ease: easeReveal } },
};

export const maskCenter: Variants = {
  hidden: { clipPath: "inset(50% 50% 50% 50%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.6, ease: easeCinema } },
};

// ─── ORCHESTRATED STAGGER SYSTEMS ───────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
};

/** Orchestrated section: label → title → body → details in sequence */
export const sectionOrchestrator: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: base },
};

// ─── TEXT REVEAL SYSTEMS ────────────────────────────

/** Word-by-word masked reveal from below */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.85, ease: easeText } },
};

/** Line-by-line reveal with tracking refinement */
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: "100%", letterSpacing: "0.05em" },
  visible: {
    opacity: 1,
    y: "0%",
    letterSpacing: "0em",
    transition: { duration: 0.9, ease: easeText },
  },
};

// ─── HERO SPECIFIC ──────────────────────────────────

export const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.4 } },
};

export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.8, ease: easeReveal },
  },
};

// ─── UTILITY VARIANT FACTORIES ──────────────────────

export function delayedFade(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...base, delay } },
  };
}

export function delayedMaskLeft(delay: number): Variants {
  return {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.5, ease: easeReveal, delay } },
  };
}

// ─── VIEWPORT CONFIGS ───────────────────────────────

export const viewport = { once: true, amount: 0.15 as const };
export const viewportEager = { once: true, amount: 0.05 as const };
export const viewportDeep = { once: true, amount: 0.3 as const };

// ─── REUSABLE SCROLL HOOKS ──────────────────────────

/** Parallax hook: returns a MotionValue for translateY based on scroll position */
export function useParallax(speed: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  return { ref, y, scrollYProgress };
}

/** Kinetic scale hook: element scales down as it scrolls through viewport */
export function useKineticScale(from: number = 1.15, to: number = 1.0) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [from, to, to]);
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  return { ref, scale, y, scrollYProgress };
}

/** Mobile detection hook */
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}
