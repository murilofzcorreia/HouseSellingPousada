"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/lib/framer-variants";

/* ============================================
   FEATURE CARD — Premium glass feature tile
   ============================================ */

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

/** Simple SVG icon lookup for the luxury feature set */
function FeatureIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    crown: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M2 20h20M5 17l-3-9 5.5 4L12 4l4.5 8L22 8l-3 9H5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    sun: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    leaf: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 8.5-3 10.68-7.75A18.1 18.1 0 0021 3s-3.79-.44-7 2a14.24 14.24 0 00-3.63 3.63" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    droplets: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.56 14.06c1.32 0 2.39-1.1 2.39-2.43 0-.7-.34-1.36-1.02-1.91-.68-.55-1.07-1.13-1.37-2.02-.18.89-.49 1.47-1.17 2.02-.68.55-1.02 1.21-1.02 1.91 0 1.33 1.07 2.43 2.39 2.43z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S15.29 6.75 15 5.3c-.29 1.45-1.14 2.84-2.29 3.76S11 11.1 11 12.25c0 2.22 1.8 4.05 4 4.05z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "map-pin": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  };

  return (
    <div className="text-gold-400">
      {iconMap[name] || iconMap["crown"]}
    </div>
  );
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="
        group relative
        glass rounded-lg p-7 md:p-8
        hover-lift cursor-default
        border border-white/[0.04] hover:border-gold-400/20
        transition-colors duration-500
      "
      variants={staggerItem}
    >
      {/* Subtle top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col gap-5">
        <div className="w-12 h-12 rounded-md bg-gold-400/10 flex items-center justify-center group-hover:bg-gold-400/15 transition-colors duration-500">
          <FeatureIcon name={icon} />
        </div>

        <h3 className="text-ivory text-lg font-medium tracking-tight">
          {title}
        </h3>

        <p className="text-charcoal-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
