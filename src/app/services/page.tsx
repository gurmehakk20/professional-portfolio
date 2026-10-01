import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";
import { Faq } from "@/components/sections/faq";
import { Process } from "@/components/sections/process";
import { IncludedList } from "@/components/services/included-list";
import { ServiceJumpLinks } from "@/components/services/service-jump-links";
import { ServiceList } from "@/components/services/service-list";
import { PageHeader } from "@/components/ui/page-header";
import { faqIntro, faqs } from "@/content/faq";
import { contactSection } from "@/content/home";
import { processIntro, processSteps } from "@/content/process";
import {
  includedIntro,
  services,
  servicesPage,
  standardDeliverables,
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
      <IncludedList intro={includedIntro} items={standardDeliverables} />
      <Process intro={processIntro} steps={processSteps} />
      <Faq intro={faqIntro} items={faqs} />
      {/* The FAQ shares the contact section's background, so it skips its top padding. */}
      <ContactSection content={contactSection} flushTop />
    </>
  );
}
