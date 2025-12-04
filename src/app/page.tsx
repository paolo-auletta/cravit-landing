 import { Hero } from "./components/hero";
 import { FeaturesSection } from "./components/features";
 import { HowItWorksSection } from "./components/how-it-works";
 import { CtaSection } from "./components/cta-section";
 import { Footer } from "./components/footer";

 export default function Home() {
   return (
     <main className="min-h-screen bg-[var(--color-background)]">
       <Hero />
       <div className="flex flex-col">
         <div className="order-last sm:order-first">
           <FeaturesSection />
         </div>
         <div className="order-first sm:order-last">
           <HowItWorksSection />
         </div>
       </div>
       <CtaSection />
       <Footer />
     </main>
   );
 }
