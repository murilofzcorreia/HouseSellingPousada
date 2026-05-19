"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0f0e0d]/90 backdrop-blur-xl border-b border-[#302d29]/40 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-editorial flex items-center justify-between h-16 md:h-18">
          <a href="#hero" className="flex items-center">
            <Image
              src="/assets/images/logo.png"
              alt="Pousada do Paranapanema"
              width={130} height={44}
              className="h-9 md:h-10 w-auto object-contain"
              style={{ width: "auto" }}
              loading="eager"
            />
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-stone-400 hover:text-cream text-[11px] uppercase tracking-[0.12em] transition-colors duration-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button href="#contact" size="sm">Contato</Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[6px] cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu" id="mobile-menu-toggle"
          >
            <motion.span className="block w-5 h-px bg-cream origin-center"
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
            <motion.span className="block w-5 h-px bg-cream"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }} />
            <motion.span className="block w-5 h-px bg-cream origin-center"
              animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink-950/98 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a key={link.href} href={link.href}
                  className="text-cream text-lg font-light tracking-widest uppercase"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ delay: i * 0.04, duration: 0.3 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 flex flex-col items-center gap-3">
                <Button href="#contact" onClick={() => setMobileOpen(false)}>Agendar visita</Button>
                <span className="text-stone-500 text-xs">{SITE_CONFIG.contact.phone}</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
