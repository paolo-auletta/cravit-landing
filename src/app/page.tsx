 import { BlogNavbar } from "./components/blog-navbar"
import { CtaSection } from "./components/cta-section"
import { FeaturesSection } from "./components/features"
import { Footer } from "./components/footer"
import { Hero } from "./components/hero"
import { HowItWorksSection } from "./components/how-it-works"

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-28 sm:pt-32">
      <section className="px-5 pt-6 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <BlogNavbar />
        </div>
      </section>
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
  )
}