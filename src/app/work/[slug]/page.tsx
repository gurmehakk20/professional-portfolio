import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectFeatures } from "@/components/projects/project-features";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectHeader } from "@/components/projects/project-header";
import { ProjectNext } from "@/components/projects/project-next";
import { ProjectStory } from "@/components/projects/project-story";
import { ContactSection } from "@/components/sections/contact-section";
import { contactSection } from "@/content/home";
import { getCaseStudies, getNextCaseStudy, getProject, getProjectNumber } from "@/lib/projects";

// Only projects with a `caseStudy` in src/content/projects.ts get a page; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const { caseStudy } = project;
  const nextProject = getNextCaseStudy(slug);
  // Backgrounds alternate: features are subtle, screenshots aren't, and "Next project"
  // takes the opposite tone of whichever section sits above it.
  const sectionAboveIsSubtle =
    caseStudy.screenshots.length === 0 && caseStudy.features.length > 0;
  const nextTone = sectionAboveIsSubtle ? "default" : "subtle";
  // The contact section sits on the plain background, so it drops its top
  // padding when the section above it is plain too (avoids a doubled gap).
  const lastTone = nextProject ? nextTone : sectionAboveIsSubtle ? "subtle" : "default";

  return (
    <>
      <ProjectHeader project={project} number={getProjectNumber(slug)} />
      <ProjectStory
        overview={caseStudy.overview}
        challenge={caseStudy.challenge}
        approach={caseStudy.approach}
      />
      <ProjectFeatures features={caseStudy.features} tone="subtle" />
      <ProjectGallery screenshots={caseStudy.screenshots} tone="default" />
      {nextProject ? (
        <ProjectNext
          project={nextProject}
          number={getProjectNumber(nextProject.slug)}
          tone={nextTone}
        />
      ) : null}
      <ContactSection content={contactSection} flushTop={lastTone === "default"} />
    </>
  );
}
