import { SITE_CONFIG } from "@/lib/constants";

export default function LocationStory() {
  const { location } = SITE_CONFIG;

  return (
    <section id="location" className="section-spacing bg-soft-black">
      <div className="container-editorial">
        <p data-reveal className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4">
          Localização
        </p>

        <h2 data-reveal className="text-cream text-balance max-w-md mb-14 md:mb-20">
          {location.city}, {location.state}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Map */}
          <div data-reveal="scale" className="relative aspect-[4/3] rounded overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.5!2d-51.7494477!3d-22.6338424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94930a4a8671c83b%3A0x8f44d5d264208e4e!2sCondominio%20Pousada%20do%20Paranapanema!5e0!3m2!1spt-BR!2sbr!4v1"
              className="absolute inset-0 w-full h-full border-0 opacity-80 hover:opacity-100 transition-opacity duration-700"
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localização — ${location.condominium}, Rua Beira Rio`}
            />
          </div>

          {/* Details */}
          <div data-reveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-cream">{location.condominium}</h3>
              <p className="text-stone-400 leading-relaxed">
                Condomínio fechado com segurança 24 horas, acesso ao rio e infraestrutura
                completa de lazer. Localizado entre o Oeste Paulista e o Norte do Paraná,
                com fácil acesso às principais cidades da região.
              </p>
            </div>

            <div data-reveal="line" className="h-px bg-stone-800" />

            <div className="grid grid-cols-2 gap-6" data-reveal-stagger>
              {[
                { title: "Segurança", desc: "Portaria e monitoramento 24h" },
                { title: "Rio", desc: "Acesso direto e rampa para barcos" },
                { title: "Natureza", desc: "Mata ciliar preservada" },
                { title: "Lazer", desc: "Infraestrutura completa" },
              ].map((item) => (
                <div key={item.title} className="flex flex-col gap-1" data-reveal>
                  <span className="text-cream text-sm font-medium">{item.title}</span>
                  <span className="text-stone-500 text-xs">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
