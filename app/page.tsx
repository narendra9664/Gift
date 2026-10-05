import { Audience } from "@/components/sections/Audience";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { ChatDemo } from "@/components/sections/ChatDemo";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { LeakCalculator } from "@/components/sections/LeakCalculator";
import { Navbar } from "@/components/sections/Navbar";
import { Problem } from "@/components/sections/Problem";
import { Services } from "@/components/sections/Services";
import { SystemSteps } from "@/components/sections/SystemSteps";
import { MotionProvider } from "@/components/ui/MotionProvider";

/*
 * Story order: what the customer wants (hero) → the problem → the fix
 * (features, live demo, how it works) → who it's for and proof → a lead magnet
 * for visitors not ready to buy → questions answered → start the trial.
 */
export default function Home() {
  return (
    <MotionProvider>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Services />
        <ChatDemo />
        <SystemSteps />
        <Audience />
        <CaseStudy />
        <LeakCalculator />
        <Faq />
      </main>
      <Footer />
    </MotionProvider>
  );
}
