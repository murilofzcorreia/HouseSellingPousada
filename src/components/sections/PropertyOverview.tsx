"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { PROPERTY_STATS } from "@/lib/constants";

function AnimatedCounter({ value, unit, inView }: { value: string; unit: string; inView: boolean }) {
  const numericValue = parseInt(value);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView || isNaN(numericValue)) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * numericValue).toString());
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, numericValue, value]);

  return (
    <span className="text-cream text-2xl md:text-3xl font-light tabular-nums">
      {display}
      {unit && <span className="text-stone-500 text-sm ml-0.5">{unit}</span>}
    </span>
  );
}

export default function PropertyOverview() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="overview" className="section-spacing bg-ink-950 relative overflow-hidden">
      <div className="container-editorial relative z-10">
        
        <p data-reveal className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4">
          A propriedade
        </p>

        <h2 data-reveal className="text-cream text-balance max-w-xl mb-14 md:mb-20">
          Projetada para viver com calma
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Image */}
          <div
            data-reveal="scale"
            className="relative aspect-[16/10] lg:aspect-[3/4] rounded overflow-hidden"
          >
            <Image
              src="/assets/images/fachada-2.1.jpg"
              alt="Vista frontal da propriedade"
              fill
              className="object-cover object-[center_30%] lg:object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={60}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(15,14,13,0.3)_100%)] pointer-events-none" />
          </div>

          {/* Text & Stats */}
          <div data-reveal className="flex flex-col gap-7 lg:gap-8 lg:pt-8">
            <p className="text-stone-300 text-base leading-relaxed">
              São 560m² de construção na Rua Beira Rio, dentro do Condomínio Pousada do
              Paranapanema. A casa tem sete quartos — seis deles suítes — com vista
              direta para o rio.
            </p>

            <p className="text-stone-400 text-sm leading-relaxed">
              A área gourmet de 80m² é climatizada, assim como todos os quartos, salas
              e a cozinha. A casa conta com automação por aplicativo, projeto de
              iluminação em LED, paisagismo implantado com irrigação automatizada,
              e garagem com espaço para barcos e quadriciclos.
            </p>

            <div data-reveal="line" className="h-px bg-stone-800" />

            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-x-6 gap-y-8 pt-4"
              data-reveal-stagger
            >
              {PROPERTY_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1" data-reveal>
                  <AnimatedCounter value={stat.value} unit={stat.unit} inView={statsInView} />
                  <span className="text-stone-500 text-[11px] uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
