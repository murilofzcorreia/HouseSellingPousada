import Image from "next/image";
import { LIFESTYLE_BLOCKS } from "@/lib/constants";

export default function LifestyleStory() {
  return (
    <section id="lifestyle" className="bg-ink-950 relative z-10 overflow-hidden">
      <div className="container-editorial pt-20 pb-10 md:pt-40 md:pb-16">
        <p data-reveal className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4">
          A experiência
        </p>
        <h2 data-reveal className="text-cream text-balance max-w-md text-3xl md:text-5xl">
          Viver à beira do rio
        </h2>
      </div>

      {LIFESTYLE_BLOCKS.map((block) => {
        const reversed = block.align === "left";
        return (
          <div key={block.title} className="container-editorial py-16 md:py-32 relative">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center ${reversed ? "lg:[direction:rtl]" : ""}`}>
              
              {/* Image */}
              <div data-reveal="scale" className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden lg:[direction:ltr]">
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={60}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(15,14,13,0.35)_100%)] pointer-events-none" />
              </div>

              {/* Text */}
              <div data-reveal className="flex flex-col gap-5 lg:py-8 lg:[direction:ltr] relative z-10">
                <h3
                  className="text-cream text-2xl md:text-3xl lg:text-4xl font-normal leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {block.title}
                </h3>
                <p className="text-stone-400 text-base lg:text-lg leading-relaxed max-w-md">
                  {block.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Full-width cinematic divider — static image, no parallax */}
      <div className="relative h-[34vh] min-h-[220px] md:h-[60vh] md:min-h-[400px] overflow-hidden mt-12 md:mt-24">
        <Image
          src="/assets/images/rio-por-do-sol-ponte.webp"
          alt="Pôr do sol no Rio Paranapanema com vista da ponte"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={60}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40 pointer-events-none" />
      </div>
    </section>
  );
}
