import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackgroundOrbs from "@/components/ui/BackgroundOrbs";
import SectionDivider from "@/components/ui/SectionDivider";
import Hero from "@/components/sections/Hero";
import Technologies from "@/components/sections/Technologies";
import Services from "@/components/sections/Services";
import WhyMadavac from "@/components/sections/WhyMadavac";
import Process from "@/components/sections/Process";
import Industries from "@/components/sections/Industries";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import { getSocialLinks } from "@/lib/social-links";

export default function Home() {
  const socialLinks = getSocialLinks();

  return (
    <>
      <BackgroundOrbs />
      <Header />
      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Technologies />
        <SectionDivider />
        <WhyMadavac />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Industries />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <Contact />
      </main>
      <Footer socialLinks={socialLinks} />
    </>
  );
}