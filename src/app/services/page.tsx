import type { Metadata } from "next";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Process } from "@/components/sections/process";
import { IncludedList } from "@/components/services/included-list";
import { ServiceJumpLinks } from "@/components/services/service-jump-links";
import { ServiceList } from "@/components/services/service-list";
import { PageHeader } from "@/components/ui/page-header";
import { faqIntro, faqs } from "@/content/faq";
import { finalCta } from "@/content/home";
import { processIntro, processSteps } from "@/content/process";
import {
  includedInEveryProject,
  includedIntro,
  services,
  servicesPage,
} from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPage.metaDescription ?? servicesPage.description,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        description={servicesPage.description}
      >
        <ServiceJumpLinks services={services} />
      </PageHeader>
      <ServiceList services={services} />
      <IncludedList intro={includedIntro} items={includedInEveryProject} />
      <Process intro={processIntro} steps={processSteps} tone="dark" />
      <Faq intro={faqIntro} items={faqs} />
      <FinalCta content={finalCta} flushTop />
    </>
  );
}
