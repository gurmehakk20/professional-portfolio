import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectFeatures } from "@/components/projects/project-features";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectHeader } from "@/components/projects/project-header";
import { ProjectNext } from "@/components/projects/project-next";
import { ProjectStory } from "@/components/projects/project-story";
import { FinalCta } from "@/components/sections/final-cta";
import { finalCta } from "@/content/home";
import { projects } from "@/content/projects";
import { getNextProject, getProject, getProjectNumber } from "@/lib/projects";

// Only the projects in src/content/projects.ts exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return {
    title: project.title,
    description: project.summary,
    // Example projects stay out of search results until they're replaced with real work.
    ...(project.placeholder ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { detail } = project;
  const nextProject = getNextProject(slug);
  // Backgrounds alternate: features are subtle, screenshots aren't, and "Next project"
  // takes the opposite tone of whichever section sits above it.
  const sectionAboveIsSubtle = detail.screenshots.length === 0 && detail.features.length > 0;
  const nextTone = sectionAboveIsSubtle ? "default" : "subtle";
  // The closing panel sits on the plain background, so it drops its top
  // padding when the section above it is plain too (avoids a doubled gap).
  const lastTone = nextProject ? nextTone : sectionAboveIsSubtle ? "subtle" : "default";

  return (
    <>
      <ProjectHeader project={project} number={getProjectNumber(slug)} />
      <ProjectStory
        overview={detail.overview}
        challenge={detail.challenge}
        approach={detail.approach}
      />
      <ProjectFeatures features={detail.features} tone="subtle" />
      <ProjectGallery screenshots={detail.screenshots} tone="default" />
      {nextProject ? (
        <ProjectNext
          project={nextProject}
          number={getProjectNumber(nextProject.slug)}
          tone={nextTone}
        />
      ) : null}
      <FinalCta content={finalCta} flushTop={lastTone === "default"} />
    </>
  );
}
