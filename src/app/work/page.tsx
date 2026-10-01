import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/project-grid";
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
          <ProjectGrid projects={projects} />
        </Section>
      ) : null}
      {/* The grid shares the contact section's background, so it skips its top padding. */}
      <ContactSection content={contactSection} flushTop={hasProjects} />
    </>
  );
}
