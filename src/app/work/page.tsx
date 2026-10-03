import type { Metadata } from "next";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { ContactSection } from "@/components/sections/contact-section";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { contactSection } from "@/content/home";
import { projects, workPage } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: workPage.metaDescription ?? workPage.description,
};

export default function WorkPage() {
  const hasProjects = projects.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={workPage.eyebrow}
        title={workPage.title}
        description={workPage.description}
      />
      {hasProjects ? (
        <Section>
          <ProjectShowcase projects={projects} headingLevel="h2" />
        </Section>
      ) : null}
      {/* The projects share the contact section's background, so it skips its top padding. */}
      <ContactSection content={contactSection} flushTop={hasProjects} />
    </>
  );
}
