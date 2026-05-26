import Image from "next/image";

export default function Hero() {
  const titleWords = ["560m²", "à", "beira", "do", "Rio", "Paranapanema"];

  return (
    <section
      id="hero"
      className="relative h-[72svh] min-h-[520px] md:h-screen md:min-h-[640px] flex items-end overflow-hidden bg-ink-950"
    >
      {/* Background — static, no parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/fachada-h1.webp"
          alt="Vista da propriedade"
          fill
          preload
          quality={75}
          className="object-contain object-top md:object-cover md:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/10 md:via-ink-950/40 md:to-ink-950/20" />
      </div>

      {/* Content — CSS keyframe animations */}
      <div className="relative z-10 container-editorial w-full pb-12 md:pb-20 pt-32">
        <div className="max-w-2xl flex flex-col gap-5 md:gap-6">
          <p className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em] hero-animate hero-animate-delay-1">
            Condomínio Pousada do Paranapanema — Santo Inácio, PR
          </p>

          <h1 className="text-cream text-balance leading-tight flex flex-wrap gap-x-3 gap-y-1">
            {titleWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block pb-2">
                <span className="hero-word" style={{ animationDelay: `${0.35 + i * 0.05}s` }}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p className="text-stone-300 text-base md:text-lg leading-relaxed max-w-lg hero-animate hero-animate-delay-3">
            Sete quartos, ampla área gourmet, piscina com hidromassagem
            e automação residencial completa.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2 hero-animate hero-animate-delay-4">
            <a href="#gallery" className="inline-flex items-center justify-center gap-2 tracking-[0.08em] uppercase transition-colors duration-300 cursor-pointer select-none bg-accent text-ink-950 hover:bg-accent-light px-7 py-3 text-xs">
              Ver galeria
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 tracking-[0.08em] uppercase transition-colors duration-300 cursor-pointer select-none bg-transparent text-cream border border-stone-600 hover:border-stone-400 px-7 py-3 text-xs">
              Agendar visita
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in-late">
        <div className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent animate-scroll-pulse" />
      </div>
    </section>
  );
}
