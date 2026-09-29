import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/final-cta";
import { ProjectGrid } from "@/components/projects/project-grid";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { finalCta } from "@/content/home";
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
      {/* The grid shares the CTA's background, so the CTA skips its top padding. */}
      <FinalCta content={finalCta} flushTop={hasProjects} />
    </>
  );
}
