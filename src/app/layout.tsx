import type { Metadata } from "next";
import { outfit, inter, playfair } from "@/lib/fonts";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pousada do Paranapanema — 560m² à beira do rio",
  description:
    "Casa de veraneio com 560m² no Condomínio Pousada do Paranapanema, Santo Inácio-PR. 7 quartos, sala de cinema, piscina com hidromassagem, automação residencial.",
  keywords: [
    "casa de veraneio",
    "Pousada do Paranapanema",
    "Santo Inácio PR",
    "Rio Paranapanema",
    "imóvel alto padrão",
  ],
  openGraph: {
    title: "Pousada do Paranapanema — Casa à beira do rio",
    description: "560m², 7 quartos, sala de cinema, piscina com hidro. Santo Inácio, PR.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ambient-bg">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
