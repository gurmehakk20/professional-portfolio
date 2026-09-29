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
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { detail } = project;
  const nextProject = getNextProject(slug);
  // Backgrounds alternate, so "Next project" takes the opposite tone of the section above it.
  const sectionAboveIsSubtle = detail.screenshots.length === 0 && detail.features.length > 0;

  return (
    <>
      <ProjectHeader project={project} number={getProjectNumber(slug)} />
      <ProjectStory
        overview={detail.overview}
        challenge={detail.challenge}
        approach={detail.approach}
      />
      <ProjectFeatures features={detail.features} />
      <ProjectGallery screenshots={detail.screenshots} />
      {nextProject ? (
        <ProjectNext
          project={nextProject}
          number={getProjectNumber(nextProject.slug)}
          tone={sectionAboveIsSubtle ? "default" : "subtle"}
        />
      ) : null}
      <FinalCta content={finalCta} />
    </>
  );
}
