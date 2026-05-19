"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroStagger, fadeBlurUp, delayedFade, charReveal, staggerFast } from "@/lib/framer-variants";
import Button from "@/components/ui/Button";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Advanced Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background moves down slowly as we scroll down
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  // Foreground moves up slightly faster
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  // Subtle fade out on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Split text for precise stagger reveal
  const titleWords = ["560m²", "à", "beira", "do", "Rio", "Paranapanema"];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[72svh] min-h-[520px] md:h-screen md:min-h-[640px] flex items-end overflow-hidden bg-ink-950"
    >
      {/* Layer 1: Background Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        style={{ y: bgY }}
      >
        <Image
          src="/assets/images/fachada-h1.png"
          alt="Vista da propriedade"
          fill
          preload
          quality={90}
          className="object-contain object-top md:object-cover md:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/10 md:via-ink-950/40 md:to-ink-950/20" />
      </motion.div>

      {/* Layer 2: Foreground Content Parallax */}
      <motion.div
        className="relative z-10 container-editorial w-full pb-12 md:pb-20 pt-32"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-2xl flex flex-col gap-5 md:gap-6">
          <motion.p
            className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em]"
            variants={fadeBlurUp}
          >
            Condomínio Pousada do Paranapanema — Santo Inácio, PR
          </motion.p>

          <motion.h1
            className="text-cream text-balance leading-tight flex flex-wrap gap-x-3 gap-y-1"
            variants={staggerFast}
          >
            {titleWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block pb-2">
                <motion.span className="inline-block" variants={charReveal}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="text-stone-300 text-base md:text-lg leading-relaxed max-w-lg"
            variants={delayedFade(0.7)}
          >
            Sete quartos, ampla área gourmet, piscina com hidromassagem
            e automação residencial completa.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-2"
            variants={delayedFade(0.9)}
          >
            <Button href="#gallery">Ver galeria</Button>
            <Button variant="outline" href="#contact">Agendar visita</Button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
