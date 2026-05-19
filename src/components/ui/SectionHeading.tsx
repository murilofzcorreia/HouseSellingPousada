"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewport } from "@/lib/framer-variants";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      className={`flex flex-col gap-4 mb-14 md:mb-16 ${alignClass}`}
      initial="hidden" whileInView="visible" viewport={viewport} variants={fadeInUp}
    >
      {label && (
        <span className="text-accent text-xs uppercase tracking-[0.2em]">{label}</span>
      )}
      <h2 className="text-cream text-balance">{title}</h2>
      {subtitle && (
        <p className="max-w-xl text-stone-400 text-sm leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
