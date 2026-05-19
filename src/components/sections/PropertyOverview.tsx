"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, animate, MotionValue } from "framer-motion";
import { fadeBlurUp, maskLeft, staggerContainer, staggerItem, easeReveal, useIsMobile } from "@/lib/framer-variants";
import { PROPERTY_STATS } from "@/lib/constants";

function AnimatedCounter({ value, unit, inView }: { value: string; unit: string; inView: boolean }) {
  const numericValue = parseInt(value);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView || isNaN(numericValue)) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, numericValue, {
      duration: 1.8,
      ease: [0.16, 1.0, 0.3, 1.0],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, numericValue, value]);

  return (
    <span className="text-cream text-2xl md:text-3xl font-light tabular-nums">
      {display}
      {unit && <span className="text-stone-500 text-sm ml-0.5">{unit}</span>}
    </span>
  );
}

// Scrubbed Typography Word
function ScrubbedWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span className="inline-block mr-2 lg:mr-3" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export default function PropertyOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const isMobile = useIsMobile();
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });

  // Scrubbed typography scroll progress
  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    offset: ["start 85%", "start 45%"], // Words light up as title moves from 85% to 45% of viewport height
  });

  const { scrollYProgress: imgScroll } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  // Kinetic scaling with wider range + elastic settle
  const scale = useTransform(imgScroll, [0, 0.5, 1], [1.18, 1.02, 1.0]);
  const imgY = useTransform(imgScroll, [0, 1], ["6%", "-6%"]);

  const titleWords = "Projetada para viver com calma".split(" ");

  return (
    <section id="overview" ref={sectionRef} className="section-spacing bg-ink-950 relative overflow-hidden">
      <div className="container-editorial relative z-10">
        
        {/* Label */}
        <motion.p 
          className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4" 
          variants={fadeBlurUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          A propriedade
        </motion.p>

        {/* Scrubbed Typography Title */}
        <h2 ref={titleRef} className="text-cream text-balance max-w-xl mb-14 md:mb-20 flex flex-wrap">
          {titleWords.map((word, i) => {
            const start = i / titleWords.length;
            const end = start + (1 / titleWords.length);
            return (
              <ScrubbedWord key={i} progress={titleProgress} range={[start, end]}>
                {word}
              </ScrubbedWord>
            );
          })}
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Image — directional mask reveal + kinetic scale */}
          <motion.div
            ref={imageRef}
            className="relative aspect-[16/10] lg:aspect-[3/4] rounded overflow-hidden"
            initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.4, ease: [0.16, 1.0, 0.3, 1.0] } }}
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.div
              className="absolute inset-0 origin-center will-change-transform"
              style={isMobile ? {} : { scale, y: imgY }}
            >
              <Image
                src="/assets/images/fachada-2.1.png"
                alt="Vista frontal da propriedade"
                fill
                className="object-cover object-[center_30%] lg:object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            {/* Subtle inner vignette for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(15,14,13,0.3)] pointer-events-none" />
          </motion.div>

          {/* Text & Stats */}
          <motion.div 
            className="flex flex-col gap-7 lg:gap-8 lg:pt-8" 
            variants={fadeBlurUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-stone-300 text-base leading-relaxed">
              São 560m² de construção na Rua Beira Rio, dentro do Condomínio Pousada do
              Paranapanema. A casa tem sete quartos — seis deles suítes — com vista
              direta para o rio.
            </p>

            <motion.p className="text-stone-400 text-sm leading-relaxed" variants={fadeBlurUp}>
              A área gourmet de 80m² é climatizada, assim como todos os quartos, salas
              e a cozinha. A casa conta com automação por aplicativo, projeto de
              iluminação em LED, paisagismo implantado com irrigação automatizada,
              e garagem com espaço para barcos e quadriciclos.
            </motion.p>

            {/* Animated divider line */}
            <motion.div
              className="h-px bg-stone-800 origin-left"
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 1.2, ease: easeReveal, delay: 0.2 } },
              }}
            />

            {/* Stats with counter animation */}
            <motion.div
              ref={statsRef}
              className="grid grid-cols-3 gap-x-6 gap-y-8 pt-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {PROPERTY_STATS.map((stat) => (
                <motion.div key={stat.label} className="flex flex-col gap-1" variants={staggerItem}>
                  <AnimatedCounter value={stat.value} unit={stat.unit} inView={statsInView} />
                  <span className="text-stone-500 text-[11px] uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
