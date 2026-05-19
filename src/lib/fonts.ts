import { Outfit, Inter, Playfair_Display } from "next/font/google";

/**
 * FONT CONFIGURATION
 *
 * Outfit — Primary heading font (geometric, luxury feel)
 * Inter — Body text (clean, highly readable)
 * Playfair Display — Accent / editorial touches
 */

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});
