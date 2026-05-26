"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { easeReveal } from "@/lib/framer-variants";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function ImmersionGallery() {
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Keyboard navigation
  useEffect(() => {
    if (active === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((prev) => prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null);
      if (e.key === "ArrowLeft") setActive((prev) => prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active]);

  const navigate = useCallback((dir: 1 | -1) => {
    if (active === null) return;
    const next = active + dir;
    setActive(next < 0 ? GALLERY_IMAGES.length - 1 : next >= GALLERY_IMAGES.length ? 0 : next);
  }, [active]);

  return (
    <section id="gallery" className="bg-ink-950 relative z-10">
      
      <div className="py-20 px-4 md:px-10 lg:px-20">
        <div className="container-editorial mb-8 md:mb-12">
          <p data-reveal className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4">
            Galeria
          </p>
          <h2 data-reveal className="text-cream text-balance max-w-sm">
            Os ambientes
          </h2>
        </div>

        {/* Simple responsive grid — no scroll hijacking */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6" data-reveal-stagger>
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              data-reveal
              className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
              onClick={() => setActive(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                loading={i < 3 ? "eager" : "lazy"}
                quality={60}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 overflow-hidden">
                <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-cream text-sm tracking-wide block font-light">{img.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox — only FM usage (AnimatePresence for mount/unmount) */}
      {mounted && createPortal(
        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="fixed inset-0 z-[999] bg-ink-950/98 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: easeReveal }}
              onClick={() => setActive(null)}
            >
              <motion.div
                key={active}
                className="relative w-[90vw] h-[80vh] max-w-5xl"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: easeReveal }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={GALLERY_IMAGES[active].src}
                  alt={GALLERY_IMAGES[active].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  quality={85}
                />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-stone-400 text-xs tracking-wider">
                  {GALLERY_IMAGES[active].label} — {active + 1}/{GALLERY_IMAGES.length}
                </div>
              </motion.div>

              <button
                className="absolute top-4 right-4 md:top-8 md:right-8 text-stone-400 hover:text-cream transition-colors p-2 cursor-pointer z-10"
                onClick={() => setActive(null)}
                aria-label="Fechar"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 md:w-10 md:h-10">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-stone-400 hover:text-cream transition-colors cursor-pointer p-3 z-10" onClick={(e) => { e.stopPropagation(); navigate(-1); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 md:w-10 md:h-10"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-stone-400 hover:text-cream transition-colors cursor-pointer p-3 z-10" onClick={(e) => { e.stopPropagation(); navigate(1); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 md:w-10 md:h-10"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
