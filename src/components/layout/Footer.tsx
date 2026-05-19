import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { contact, location } = SITE_CONFIG;

  return (
    <footer className="border-t border-stone-800/40 bg-ink-950">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-14">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <a href="#hero">
              <Image
                src="/assets/images/logo.png"
                alt="Pousada do Paranapanema"
                width={120} height={40}
                className="h-10 w-auto object-contain"
                style={{ width: "auto" }}
              />
            </a>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              {location.address}, {location.condominium}.
              <br />{location.city}, {location.state}.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-4">
            <span className="text-stone-500 text-xs uppercase tracking-wider">Navegação</span>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-stone-400 hover:text-cream text-sm transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-stone-500 text-xs uppercase tracking-wider">Contato</span>
            <div className="flex flex-col gap-2.5">
              <span className="text-cream text-sm">{contact.name}</span>
              <a href={`tel:+${contact.whatsapp}`} className="text-stone-400 hover:text-cream text-sm transition-colors">{contact.phone}</a>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-cream text-sm transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="h-px bg-stone-800/40 mb-8" />
        <p className="text-stone-600 text-xs">
          © {currentYear} {SITE_CONFIG.name}. {location.city}, {location.state}.
        </p>
      </div>
    </footer>
  );
}
