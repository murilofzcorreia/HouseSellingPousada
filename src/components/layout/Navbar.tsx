"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-[#0f0e0d]/95 border-b border-[#302d29]/40"
            : "bg-transparent border-b border-transparent"
        }`}
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
            <a href="#contact" className="inline-flex items-center justify-center gap-2 tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer select-none bg-accent text-ink-950 hover:bg-accent-light px-5 py-2.5 text-[11px]">
              Contato
            </a>
          </div>

          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[6px] cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu" id="mobile-menu-toggle"
          >
            <span className={`block w-5 h-px bg-cream origin-center transition-transform duration-250 ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
            <span className={`block w-5 h-px bg-cream transition-opacity duration-150 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-cream origin-center transition-transform duration-250 ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu — AnimatePresence is the only FM usage (toggle, not scroll) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink-950/98 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-cream text-lg font-light tracking-widest uppercase"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col items-center gap-3">
                <a href="#contact" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center gap-2 tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer select-none bg-accent text-ink-950 hover:bg-accent-light px-7 py-3 text-xs">
                  Agendar visita
                </a>
                <span className="text-stone-500 text-xs">{SITE_CONFIG.contact.phone}</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
