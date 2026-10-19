import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import VideoShowcase from "@/components/VideoShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import Industries from "@/components/Industries";
import Partners from "@/components/Partners";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <VideoShowcase />
        <WhyChooseUs />
        <Industries />
        <Partners />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
