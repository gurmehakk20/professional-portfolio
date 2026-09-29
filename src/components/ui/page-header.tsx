import type { ReactNode } from "react";
import type { PageIntro } from "@/content/types";
import { Container } from "./container";
import { SectionHeader } from "./section-header";

type PageHeaderProps = Pick<PageIntro, "eyebrow" | "title" | "description"> & {
  /** Optional content under the intro, e.g. jump links or buttons. */
  children?: ReactNode;
};

/** The top of an inner page: eyebrow, <h1> and intro, above a divider. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <div className="border-b border-line">
      <Container className="pt-12 pb-12 md:pt-20 md:pb-16">
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} description={description} />
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </div>
  );
}
