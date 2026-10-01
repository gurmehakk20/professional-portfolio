import { Container } from "@/components/ui/container";
import type { Project } from "@/content/types";
import { toParagraphs } from "@/lib/text";

type ProjectStoryProps = Pick<NonNullable<Project["caseStudy"]>, "overview" | "challenge" | "approach">;

/** Overview, challenge and approach: heading on the left, text on the right from large screens. */
export function ProjectStory({ overview, challenge, approach }: ProjectStoryProps) {
  const chapters = [
    { id: "overview", title: "Overview", paragraphs: toParagraphs(overview) },
    { id: "challenge", title: "The challenge", paragraphs: toParagraphs(challenge) },
    { id: "approach", title: "The approach", paragraphs: toParagraphs(approach) },
  ].filter((chapter) => chapter.paragraphs.length > 0);

  if (chapters.length === 0) return null;

  return (
    <div className="py-16 md:py-20 lg:py-24">
      <Container className="space-y-12 md:space-y-16">
        {chapters.map((chapter) => (
          <section
            key={chapter.id}
            id={chapter.id}
            aria-labelledby={`${chapter.id}-heading`}
            className="relative grid gap-4 border-t border-line pt-8 md:gap-6 md:pt-10 lg:grid-cols-12 lg:gap-8"
          >
            {/* Short accent mark on the hairline. */}
            <span aria-hidden="true" className="absolute -top-px left-0 h-px w-10 bg-accent" />
            <div className="lg:col-span-4">
              <h2 id={`${chapter.id}-heading`} className="text-h2 font-semibold lg:sticky lg:top-28">
                {chapter.title}
              </h2>
            </div>
            <div className="max-w-[60ch] space-y-5 text-lead lg:col-span-7 lg:col-start-6">
              {chapter.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </div>
  );
}
