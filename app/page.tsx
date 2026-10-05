import { Approach } from "@/components/sections/Approach";
import { Audience } from "@/components/sections/Audience";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Services } from "@/components/sections/Services";
import { Statement } from "@/components/sections/Statement";
import { SystemSteps } from "@/components/sections/SystemSteps";
import { MotionProvider } from "@/components/ui/MotionProvider";

/* Sections follow the order of the reference design; reorder freely. */
export default function Home() {
  return (
    <MotionProvider>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Services />
        <Audience />
        <CaseStudy />
        <Approach />
        <SystemSteps />
        <Faq />
      </main>
      <Footer />
    </MotionProvider>
  );
}
