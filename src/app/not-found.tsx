import type { Metadata } from "next";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Page not found",
  // A missing page shouldn't declare a canonical URL. (Next.js also marks it noindex.)
  alternates: { canonical: null },
};

/** Shown for any URL that doesn't exist, inside the normal header and footer. */
export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-20 md:py-28 lg:py-32">
      <SectionHeader
        as="h1"
        align="center"
        eyebrow="404"
        title="Page not found"
        description="The page you’re looking for doesn’t exist or may have moved."
      />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          View Work
        </ButtonLink>
      </div>
      <ArrowLink href="/contact" className="mt-8">
        Get in touch
      </ArrowLink>
    </Container>
  );
}
