/* ============================================
   FEATURE CARD — Premium glass feature tile
   ============================================ */

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div
      data-reveal
      className="group relative glass-subtle rounded-lg p-7 md:p-8 hover:-translate-y-1 transition-transform duration-500 cursor-default border border-white/[0.04] hover:border-accent/20"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col gap-5">
        <h3 className="text-cream text-lg font-medium tracking-tight">{title}</h3>
        <p className="text-stone-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
