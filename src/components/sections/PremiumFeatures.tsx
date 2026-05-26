import { FEATURES } from "@/lib/constants";

export default function PremiumFeatures() {
  return (
    <section id="features" className="section-spacing bg-ink-950 relative overflow-hidden">
      <div className="container-editorial relative z-10">
        <p data-reveal className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4">
          Diferenciais
        </p>

        <h2 data-reveal className="text-cream text-balance max-w-md mb-14 md:mb-20">
          O que a propriedade oferece
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800/30"
          data-reveal-stagger
        >
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              data-reveal
              className="bg-soft-black p-7 md:p-10 flex flex-col gap-3 relative cursor-default group hover:-translate-y-1 transition-transform duration-500 ease-out"
            >
              {/* Accent line */}
              <div className="absolute inset-x-0 top-0 h-px flex justify-center pointer-events-none">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              </div>

              <h3 className="text-cream text-sm font-medium">{feature.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
