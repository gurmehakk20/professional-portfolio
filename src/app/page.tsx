import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { ContactSection } from "@/components/sections/contact-section";
import { Faq } from "@/components/sections/faq";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WordPressSpotlight } from "@/components/sections/wordpress-spotlight";
import { faqIntro, faqs } from "@/content/faq";
import {
  about,
  capabilities,
  capabilitiesIntro,
  contactSection,
  hero,
  servicesIntro,
  wordpressSpotlight,
  workIntro,
} from "@/content/home";
import { processIntro, processSteps } from "@/content/process";
import { projects } from "@/content/projects";
import { services, standardDeliverables, startingPrice } from "@/content/services";
import { site } from "@/content/site";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const hasMoreWork = projects.length > featured.length;

  // The page answers a visitor's questions in order: what do you do (hero,
  // capabilities), can you do it (work), what can you build (services), can you
  // do WordPress (WordPress), who are you (about), how does it work (process),
  // what about… (FAQ), and how do I start (contact). Backgrounds alternate and
  // sections are numbered here.
  return (
    <>
      <Hero content={hero} availability={site.availability} project={featured[0]} name={site.name} />
      <Capabilities intro={capabilitiesIntro} items={capabilities} />
      <FeaturedWork
        intro={workIntro}
        projects={featured}
        tone="subtle"
        number="01"
        viewAllHref={hasMoreWork ? "/work" : undefined}
        cta={contactSection.primaryCta}
      />
      <ServicesOverview
        intro={servicesIntro}
        services={services}
        standard={standardDeliverables}
        startingPrice={startingPrice}
        number="02"
      />
      <WordPressSpotlight content={wordpressSpotlight} number="03" />
      <About content={about} name={site.name} number="04" />
      <Process intro={processIntro} steps={processSteps} number="05" />
      <Faq intro={faqIntro} items={faqs} tone="subtle" number="06" />
      <ContactSection content={contactSection} number="07" />
    </>
  );
}
