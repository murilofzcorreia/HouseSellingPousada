import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import PropertyOverview from "@/components/sections/PropertyOverview";
import PremiumFeatures from "@/components/sections/PremiumFeatures";
import ImmersionGallery from "@/components/sections/ImmersionGallery";
import LifestyleStory from "@/components/sections/LifestyleStory";
import LocationStory from "@/components/sections/LocationStory";
import ContactCTA from "@/components/sections/ContactCTA";

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
