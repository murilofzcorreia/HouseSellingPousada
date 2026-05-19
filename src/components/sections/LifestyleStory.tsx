"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { fadeBlurUp, sectionOrchestrator, easeReveal, useIsMobile } from "@/lib/framer-variants";
import { LIFESTYLE_BLOCKS } from "@/lib/constants";

function LifestyleBlock({ block, index }: { block: typeof LIFESTYLE_BLOCKS[number]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reversed = block.align === "left";

  const { scrollYProgress: textProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(textProgress, [0, 1], ["15%", "-15%"]);

  // GSAP Parallax Windowing (Fixed Background Illusion)
  useEffect(() => {
    if (isMobile || !containerRef.current || !imageRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    // The image shifts downwards exactly as the user scrolls downwards,
    // creating the illusion that it is completely fixed to the background
    const tween = gsap.to(imageRef.current, {
      yPercent: 30, // Intense parallax opposite to scroll
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [isMobile]);

  return (
    <motion.div
      ref={containerRef}
      className="container-editorial py-16 md:py-32 relative"
      variants={sectionOrchestrator}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center ${reversed ? "lg:[direction:rtl]" : ""}`}>
        
        {/* Windowing Mask Container */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden lg:[direction:ltr]">
          <motion.div
            ref={imageRef}
            className="absolute inset-0 md:top-[-15%] md:left-[-10%] md:w-[120%] md:h-[130%] will-change-transform"
            variants={{
              hidden: { scale: 1.2, opacity: 0, filter: "blur(10px)" },
              visible: { scale: 1, opacity: 1, filter: "blur(0px)", transition: { duration: 1.5, ease: easeReveal } }
            }}
          >
            <Image
              src={block.image}
              alt={block.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Inner vignette for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(15,14,13,0.4)] pointer-events-none" />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          className="flex flex-col gap-5 lg:py-8 lg:[direction:ltr] relative z-10"
          style={isMobile ? {} : { y: textY }}
          variants={fadeBlurUp}
        >
          <div className="overflow-hidden">
            <motion.h3
              className="text-cream text-2xl md:text-3xl lg:text-4xl font-normal leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { duration: 1.0, ease: easeReveal } },
              }}
            >
              {block.title}
            </motion.h3>
          </div>
          <motion.p
            className="text-stone-400 text-base lg:text-lg leading-relaxed max-w-md"
            variants={fadeBlurUp}
          >
            {block.description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function LifestyleStory() {
  const dividerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress: divScroll } = useScroll({
    target: dividerRef,
    offset: ["start end", "end start"],
  });

  // Extreme parallax on the full-width divider
  const divY = useTransform(divScroll, [0, 1], ["-25%", "25%"]);

  return (
    <section id="lifestyle" className="bg-ink-950 relative z-10 overflow-hidden">
      <motion.div
        className="container-editorial pt-20 pb-10 md:pt-40 md:pb-16"
        variants={sectionOrchestrator}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4" variants={fadeBlurUp}>
          A experiência
        </motion.p>
        <motion.h2 className="text-cream text-balance max-w-md text-3xl md:text-5xl" variants={fadeBlurUp}>
          Viver à beira do rio
        </motion.h2>
      </motion.div>

      {LIFESTYLE_BLOCKS.map((block, i) => (
        <LifestyleBlock key={block.title} block={block} index={i} />
      ))}

      {/* Full-width cinematic divider */}
      <div ref={dividerRef} className="relative h-[34vh] min-h-[220px] md:h-[60vh] md:min-h-[400px] overflow-hidden mt-12 md:mt-24">
        <motion.div
          className="absolute inset-0 md:inset-[-25%] origin-center will-change-transform"
          style={isMobile ? {} : { y: divY, scale: 1.3 }}
        >
          <Image
            src="/assets/images/rio-por-do-sol-ponte.jpg"
            alt="Pôr do sol no Rio Paranapanema com vista da ponte"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40 pointer-events-none" />
      </div>
    </section>
  );
}
