"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeBlurUp, sectionOrchestrator, staggerContainer, staggerItem, maskCenter, easeReveal, viewport } from "@/lib/framer-variants";
import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { contact } = SITE_CONFIG;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputClass = "w-full bg-transparent border-b border-stone-700 pb-3 pt-1 text-cream text-sm placeholder:text-stone-600 focus:outline-none focus:border-accent transition-colors duration-500";

  return (
    <section id="contact" className="section-spacing bg-ink-950">
      <motion.div
        className="container-editorial"
        variants={sectionOrchestrator}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — info */}
          <motion.div className="flex flex-col gap-8" variants={fadeBlurUp}>
            <div className="flex flex-col gap-4">
              <p className="text-accent text-[10px] md:text-xs uppercase tracking-[0.25em]">Contato</p>
              <h2 className="text-cream text-balance">Agende uma visita</h2>
              <p className="text-stone-400 leading-relaxed mt-2">
                Para conhecer a propriedade ou obter mais informações,
                entre em contato diretamente com o proprietário.
              </p>
            </div>

            <motion.div
              className="h-px bg-stone-800 origin-left"
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 1.0, ease: easeReveal } },
              }}
            />

            <motion.div className="flex flex-col gap-4" variants={fadeBlurUp}>
              <div className="flex flex-col gap-1">
                <span className="text-cream text-sm font-medium">{contact.name}</span>
                <span className="text-stone-500 text-xs">Proprietário</span>
              </div>

              <a
                href={`tel:+${contact.whatsapp}`}
                className="text-stone-300 hover:text-cream transition-colors text-sm"
              >
                {contact.phone}
              </a>

              <motion.a
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Olá, tenho interesse na casa do Condomínio Pousada do Paranapanema.")}`}
                target="_blank" rel="noopener noreferrer"
                className="text-accent hover:text-accent-light transition-colors text-sm inline-flex items-center gap-2"
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Enviar mensagem no WhatsApp →
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — form with sequential reveal */}
          <motion.div variants={fadeBlurUp}>
            {isSubmitted ? (
              <motion.div
                className="flex flex-col gap-4 py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeReveal }}
              >
                <h3 className="text-cream">Mensagem enviada</h3>
                <p className="text-stone-400 text-sm">Entraremos em contato em breve.</p>
                <button
                  className="text-accent text-sm hover:text-accent-light transition-colors cursor-pointer mt-2"
                  onClick={() => setIsSubmitted(false)}
                >
                  Enviar outra mensagem
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
                variants={staggerContainer}
              >
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-8" variants={staggerItem}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-stone-500 text-xs uppercase tracking-wider">Nome</label>
                    <input type="text" name="name" id="contact-name" value={form.name} onChange={handleChange} required className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-phone" className="text-stone-500 text-xs uppercase tracking-wider">Telefone</label>
                    <input type="tel" name="phone" id="contact-phone" value={form.phone} onChange={handleChange} className={inputClass} />
                  </div>
                </motion.div>

                <motion.div className="flex flex-col gap-2" variants={staggerItem}>
                  <label htmlFor="contact-email" className="text-stone-500 text-xs uppercase tracking-wider">E-mail</label>
                  <input type="email" name="email" id="contact-email" value={form.email} onChange={handleChange} required className={inputClass} />
                </motion.div>

                <motion.div className="flex flex-col gap-2" variants={staggerItem}>
                  <label htmlFor="contact-message" className="text-stone-500 text-xs uppercase tracking-wider">Mensagem</label>
                  <textarea name="message" id="contact-message" value={form.message} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} />
                </motion.div>

                <motion.div variants={staggerItem}>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
