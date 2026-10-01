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
  const featured = getFeaturedProjects();

  // Section backgrounds alternate (default, subtle, dark) and the main
  // sections are numbered 01–06; both are set here, in page order.
  return (
    <>
      <Hero content={hero} availability={site.availability} project={featured[0]} name={site.name} />
      <ValueStrip items={valuePoints} />
      <ServicesGrid intro={servicesIntro} services={services} number="01" />
      <FeaturedWork intro={workIntro} projects={featured} tone="subtle" number="02" />
      <Principles intro={principlesIntro} items={principles} number="03" />
      <Process intro={processIntro} steps={processSteps} tone="dark" number="04" />
      <About content={about} name={site.name} number="05" />
      <Faq intro={faqIntro} items={faqs} tone="subtle" number="06" />
      <FinalCta content={finalCta} />
    </>
  );
}
