import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactNextSteps, ContactOptions } from "@/components/contact/contact-options";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { contactPage } from "@/content/contact";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.metaDescription ?? contactPage.description,
};

export default function ContactPage() {
  const { form } = contactPage;
  const serviceOptions = services.map((service) => ({ value: service.slug, label: service.name }));

  return (
    <>
      <PageHeader
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        description={contactPage.description}
      />
      <Section labelledBy="contact-options-heading">
        {/*
          Phones: quick options, then the form, then next steps.
          Large screens: options and next steps on the left, the form on the right.
        */}
        <div
          className={cn(
            "grid gap-12 lg:grid-cols-12 lg:gap-x-12",
            form.enabled && "lg:grid-rows-[auto_1fr]",
          )}
        >
          <ContactOptions
            headingId="contact-options-heading"
            whatsapp={contactPage.whatsapp}
            email={contactPage.email}
            contact={site.contact}
            stacked={form.enabled}
            className={form.enabled ? "lg:col-span-5" : "lg:col-span-7"}
          />
          {form.enabled ? (
            <ContactForm
              content={form}
              services={serviceOptions}
              recipientName={site.author}
              whatsapp={site.contact.whatsapp}
              email={site.contact.email}
              className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1"
            />
          ) : null}
          <ContactNextSteps
            title={contactPage.nextSteps.title}
            steps={contactPage.nextSteps.steps}
            className={form.enabled ? "lg:col-span-5" : "lg:col-span-4 lg:col-start-9"}
          />
        </div>
      </Section>
    </>
  );
}
