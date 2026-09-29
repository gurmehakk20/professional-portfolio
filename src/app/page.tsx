import { About } from "@/components/sections/about";
import { Faq } from "@/components/sections/faq";
import { FeaturedWork } from "@/components/sections/featured-work";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Principles } from "@/components/sections/principles";
import { Process } from "@/components/sections/process";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ValueStrip } from "@/components/sections/value-strip";
import { faqIntro, faqs } from "@/content/faq";
import {
  about,
  finalCta,
  hero,
  principles,
  principlesIntro,
  servicesIntro,
  valuePoints,
  workIntro,
} from "@/content/home";
import { processIntro, processSteps } from "@/content/process";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  return (
    <>
      <Hero content={hero} availability={site.availability} />
      <ValueStrip items={valuePoints} />
      <ServicesGrid intro={servicesIntro} services={services} />
      <FeaturedWork intro={workIntro} projects={getFeaturedProjects()} />
      <Principles intro={principlesIntro} items={principles} />
      <Process intro={processIntro} steps={processSteps} tone="subtle" />
      <About content={about} />
      <Faq intro={faqIntro} items={faqs} tone="subtle" />
      <FinalCta content={finalCta} />
    </>
  );
}
