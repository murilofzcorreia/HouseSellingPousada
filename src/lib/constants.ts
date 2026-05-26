/* ============================================
   SITE DATA — Pousada do Paranapanema
   ============================================ */

export const SITE_CONFIG = {
  name: "Pousada do Paranapanema",
  tagline: "Condomínio Pousada do Paranapanema",
  description:
    "Casa de veraneio de alto padrão com 560m² de área construída, à beira do Rio Paranapanema. Sete quartos, ampla área gourmet, piscina com hidromassagem e automação residencial completa.",
  locale: "pt-BR",
  contact: {
    name: "Ronaldo Correia",
    phone: "(18) 98129-7652",
    whatsapp: "5518981297652",
  },
  location: {
    address: "Rua Beira Rio",
    condominium: "Condomínio Pousada do Paranapanema",
    city: "Santo Inácio",
    state: "PR",
    region: "Oeste Paulista e Norte do Paraná",
  },
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "#hero" },
  { label: "A Propriedade", href: "#overview" },
  { label: "Diferenciais", href: "#features" },
  { label: "Galeria", href: "#gallery" },
  { label: "Experiência", href: "#lifestyle" },
  { label: "Localização", href: "#location" },
  { label: "Contato", href: "#contact" },
] as const;

export const PROPERTY_STATS = [
  { value: "560", unit: "m²", label: "Área construída" },
  { value: "7", unit: "", label: "Quartos" },
  { value: "6", unit: "", label: "Suítes" },
  { value: "80", unit: "m²", label: "Área gourmet" },
  { value: "3", unit: "", label: "Vagas cobertas" },
  { value: "1", unit: "", label: "Piscina c/ hidro" },
] as const;

export const FEATURES = [
  {
    title: "Vista para o Rio",
    description: "Posicionada na Rua Beira Rio, com vista direta para o Paranapanema.",
  },
  {
    title: "Automação Residencial",
    description: "Controle de iluminação, climatização e fachada por aplicativo.",
  },
  {
    title: "Piscina com Hidromassagem",
    description: "Piscina com hidro integrada e área de deck ampla.",
  },
  {
    title: "Área Gourmet — 80m²",
    description: "Espaço amplo com climatização, ideal para recepções e eventos familiares.",
  },
  {
    title: "Iluminação Profissional",
    description: "Projeto completo em LED com controle por aplicativo em todos os ambientes.",
  },
  {
    title: "Paisagismo e Irrigação",
    description: "Jardins implantados com sistema de irrigação automatizada.",
  },
  {
    title: "Climatização Completa",
    description: "Ar condicionado em quartos, salas, área gourmet e cozinha.",
  },
  {
    title: "Garagem e Embarcações",
    description: "Três vagas cobertas e amplo espaço para barcos ou quadriciclos.",
  },
] as const;

export const GALLERY_IMAGES = [
  { src: "/assets/images/gourmet-completa.jpg", alt: "Área gourmet completa com churrasqueira, bancada e iluminação em LED", label: "Área Gourmet" },
  { src: "/assets/images/piscina-dia.jpg", alt: "Piscina com hidromassagem e espreguiçadeiras durante o dia", label: "Piscina" },
  { src: "/assets/images/fachada-noturna-sem-nada.jpg", alt: "Fachada da casa iluminada à noite", label: "Fachada Noturna" },
  { src: "/assets/images/cozinha-h1.jpg", alt: "Cozinha planejada com acabamento premium", label: "Cozinha" },
  { src: "/assets/images/sala-social-com-cortina-automatizada.jpg", alt: "Sala social com cortina automatizada e iluminação", label: "Sala Social" },
  { src: "/assets/images/fachada-embarcacoes-h1.jpg", alt: "Fachada lateral com espaço para embarcações", label: "Garagem & Embarcações" },
  { src: "/assets/images/fachada-h4.jpg", alt: "Vista frontal da entrada principal iluminada", label: "Entrada Principal" },
  { src: "/assets/images/piscina-noite.jpg", alt: "Piscina iluminada durante a noite", label: "Piscina Noturna" },
] as const;

export const LIFESTYLE_BLOCKS = [
  {
    image: "/assets/images/rio-por-do-sol-nuvens.jpg",
    title: "Lazer e tranquilidade",
    description:
      "Aproveite os dias de sol na piscina com hidromassagem e os fins de tarde na varanda, sentindo a brisa do Rio Paranapanema.",
    align: "right" as const,
  },
  {
    image: "/assets/images/gourmet-com-sofa.jpg",
    title: "Espaços que reúnem",
    description:
      "A área gourmet integrada de 80m² oferece o ambiente perfeito para receber família e amigos com máximo conforto e climatização.",
    align: "left" as const,
  },
] as const;
