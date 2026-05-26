import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import PropertyOverview from "@/components/sections/PropertyOverview";
import PremiumFeatures from "@/components/sections/PremiumFeatures";
import LifestyleStory from "@/components/sections/LifestyleStory";
import LocationStory from "@/components/sections/LocationStory";

const ImmersionGallery = dynamic(() => import("@/components/sections/ImmersionGallery"));
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PropertyOverview />
        <PremiumFeatures />
        <ImmersionGallery />
        <LifestyleStory />
        <LocationStory />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
