import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact-section";
import { Faq } from "@/components/sections/faq";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { Principles } from "@/components/sections/principles";
import { Process } from "@/components/sections/process";
import { ServicesOverview } from "@/components/sections/services-overview";
import { faqIntro, faqs } from "@/content/faq";
import {
  about,
  contactSection,
  differentiators,
  hero,
  servicesIntro,
  whyIntro,
  workIntro,
} from "@/content/home";
import { processIntro, processSteps } from "@/content/process";
import { projects } from "@/content/projects";
import { services, standardDeliverables } from "@/content/services";
import { site } from "@/content/site";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const hasMoreWork = projects.length > featured.length;

  // The page answers a visitor's questions in order: what do you do (hero),
  // can you do it (work), what can you build (services), why you (why), how
  // does it work (process), who are you (about), what about… (FAQ), and how
  // do I start (contact). Backgrounds alternate and sections are numbered here.
  return (
    <>
      <Hero content={hero} availability={site.availability} project={featured[0]} name={site.name} />
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
        number="02"
      />
      <Principles intro={whyIntro} items={differentiators} tone="subtle" number="03" />
      <Process intro={processIntro} steps={processSteps} number="04" />
      <About content={about} name={site.name} number="05" />
      <Faq intro={faqIntro} items={faqs} tone="subtle" number="06" />
      <ContactSection content={contactSection} number="07" />
    </>
  );
}
