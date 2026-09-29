import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { ogImage, ogImageSize } from "@/lib/og";
import { getProject } from "@/lib/projects";

export const alt = `Website project by ${site.title}`;
export const size = ogImageSize;
export const contentType = "image/png";

// Image routes don't inherit the page's generateStaticParams. Exporting it here
// renders each project's image at build time.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });

  return ogImage({
    eyebrow: project.category,
    placeholder: project.placeholder,
    title: project.title,
    titleSize: "lg",
    subtitle: site.title,
  });
}
