"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { fadeBlurUp, sectionOrchestrator, easeReveal, useIsMobile } from "@/lib/framer-variants";
import { FEATURES } from "@/lib/constants";

// 3D Magnetic Card Component
function FeatureCard({ feature, index, isMobile }: { feature: typeof FEATURES[number], index: number, isMobile: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid return
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation (-10deg to +10deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Specular glare follow
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-soft-black p-7 md:p-10 flex flex-col gap-3 relative cursor-default"
      style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      variants={{
        hidden: { opacity: 0, scale: 0.8, rotateX: 45, y: 50 },
        visible: {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          y: 0,
          transition: {
            duration: 1.2,
            ease: easeReveal,
            delay: (Math.floor(index / 3) + (index % 3)) * 0.1, // Diagonal deal
          },
        },
      }}
    >
      {/* Dynamic Specular Glare */}
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none rounded opacity-0 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at center, rgba(176,154,122,0.15) 0%, transparent 60%)",
            left: glareX,
            top: glareY,
            transform: "translate(-50%, -50%)",
            width: "200%",
            height: "200%",
            opacity: isHovered ? 1 : 0
          }}
        />
      )}

      {/* Accent line — grows from center on hover */}
      <div className="absolute inset-x-0 top-0 h-px flex justify-center pointer-events-none">
        <div className={`h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent transition-all duration-700 ease-out ${isHovered ? 'w-full' : 'w-0'}`} />
      </div>

      <motion.h3 
        className="text-cream text-sm font-medium relative z-10 transition-colors duration-300"
        style={isMobile ? {} : { translateZ: "40px" }} // Pop out in 3D
      >
        {feature.title}
      </motion.h3>
      
      <motion.p 
        className="text-stone-500 text-sm leading-relaxed relative z-10"
        style={isMobile ? {} : { translateZ: "20px" }} // Pop out slightly
      >
        {feature.description}
      </motion.p>
    </motion.div>
  );
}

export default function PremiumFeatures() {
  const isMobile = useIsMobile();

  return (
    <section id="features" className="section-spacing bg-ink-950 relative overflow-hidden" style={{ perspective: "1500px" }}>
      <motion.div
        className="container-editorial relative z-10"
        variants={sectionOrchestrator}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4" variants={fadeBlurUp}>
          Diferenciais
        </motion.p>

        <motion.h2 className="text-cream text-balance max-w-md mb-14 md:mb-20" variants={fadeBlurUp}>
          O que a propriedade oferece
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800/30"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} isMobile={isMobile} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
