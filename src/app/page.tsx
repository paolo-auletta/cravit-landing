import { CtaSection } from "./components/cta-section"
import { FeaturesSection } from "./components/features"
import { Hero } from "./components/hero"
import { HowItWorksSection } from "./components/how-it-works"
import { SiteShell } from "./components/site-shell"
import {
  WebsiteJsonLd,
  OrganizationJsonLd,
  SoftwareAppJsonLd,
} from "@/components/seo/json-ld"

export default function Home() {
  return (
    <>
      <WebsiteJsonLd />
      <OrganizationJsonLd />
      <SoftwareAppJsonLd />
      <SiteShell>
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
      </SiteShell>
    </>
  )
}
