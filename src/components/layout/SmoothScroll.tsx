"use client";

import { useEffect } from "react";

/**
 * RevealObserver — Single IntersectionObserver for all [data-reveal] elements.
 * 
 * REPLACES: Lenis smooth scroll + Framer Motion whileInView system.
 * 
 * How it works:
 * 1. CSS defines [data-reveal] as opacity:0, translateY(24px)
 * 2. This observer adds .is-visible when element enters viewport
 * 3. CSS transitions handle the animation (no JS per frame)
 * 4. Observer unobserves after first trigger (once: true behavior)
 * 
 * Cost: ONE IntersectionObserver total, vs ~40 Framer Motion observers.
 * Scroll cost: ZERO. IntersectionObserver is browser-native and non-blocking.
 */
export default function RevealObserver({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    // Observe all [data-reveal] elements
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    // Also handle stagger parents — observe the parent, reveal children
    const staggerParents = document.querySelectorAll("[data-reveal-stagger]");
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll("[data-reveal]");
            children.forEach((child) => child.classList.add("is-visible"));
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );
    staggerParents.forEach((el) => staggerObserver.observe(el));

    return () => {
      observer.disconnect();
      staggerObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}
