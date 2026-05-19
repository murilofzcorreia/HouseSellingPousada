"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { fadeBlurUp, easeReveal, useIsMobile } from "@/lib/framer-variants";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function ImmersionGallery() {
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

  // GSAP Horizontal Scrolljacking
  useEffect(() => {
    if (isMobile || !sectionRef.current || !sliderRef.current || !containerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const slider = sliderRef.current;
    
    // Calculate total scroll distance needed
    const getScrollAmount = () => {
      const sliderWidth = slider.scrollWidth;
      return -(sliderWidth - window.innerWidth + 100); // 100px padding
    };

    const tween = gsap.to(slider, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // The scroll distance equals the physical slider width
        pin: true,
        scrub: 1, // Momentum scrubbing
        invalidateOnRefresh: true, // Recalculate on resize
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, [isMobile]);

  return (
    <section id="gallery" ref={sectionRef} className="bg-ink-950 relative z-10 overflow-visible md:overflow-hidden">
      
      {/* Pinned Container */}
      <div ref={containerRef} className="min-h-0 py-20 md:h-screen md:min-h-[600px] flex flex-col justify-center relative">
        
        <div className="container-editorial relative z-20 mb-8 md:mb-12">
          <motion.p 
            className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4" 
            variants={fadeBlurUp}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}
          >
            Galeria
          </motion.p>
          <motion.h2 
            className="text-cream text-balance max-w-sm" 
            variants={fadeBlurUp}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}
          >
            Os ambientes
          </motion.h2>
        </div>

        {/* Horizontal Slider Track */}
        <div 
          ref={sliderRef}
          className="grid w-full grid-cols-1 gap-4 px-4 will-change-auto md:flex md:w-max md:gap-8 md:px-10 md:items-center md:will-change-transform lg:px-20"
        >
          {GALLERY_IMAGES.map((img, i) => {
            // Alternate sizes for cinematic rhythm
            const isLarge = i % 3 === 0;
            const aspectClass = isLarge
              ? "aspect-[4/3] w-full md:aspect-[16/10] md:w-[60vw] md:max-w-[900px]"
              : "aspect-[4/3] w-full md:w-[45vw] md:max-w-[600px]";

            return (
              <motion.div
                key={i}
                className={`relative overflow-hidden cursor-pointer group ${aspectClass}`}
                onClick={() => setActive(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1.0,0.3,1.0)] group-hover:scale-[1.03] md:group-hover:scale-[1.06]"
                  sizes={isLarge ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 45vw"}
                  loading={i < 2 ? "eager" : "lazy"}
                />

                {/* Hover overlay — gradient from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Hover accent border */}
                <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/15 transition-all duration-700 pointer-events-none" />

                {/* Label — masked slide-up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 overflow-hidden">
                  <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1.0,0.3,1.0)]">
                    <span className="text-cream text-sm md:text-base tracking-wide block font-light">{img.label}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox via Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="fixed inset-0 z-[999] bg-ink-950/98 flex items-center justify-center backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeReveal }}
              onClick={() => setActive(null)}
            >
              <motion.div
                key={active}
                className="relative w-[90vw] h-[80vh] max-w-5xl"
                initial={{ opacity: 0, scale: 0.88, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                transition={{ duration: 0.6, ease: easeReveal }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={GALLERY_IMAGES[active].src}
                  alt={GALLERY_IMAGES[active].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  quality={95}
                />
                <motion.div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 text-stone-400 text-xs tracking-wider"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {GALLERY_IMAGES[active].label} — {active + 1}/{GALLERY_IMAGES.length}
                </motion.div>
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
