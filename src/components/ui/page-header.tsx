import type { ReactNode } from "react";
import type { PageIntro } from "@/content/types";
import { Container } from "./container";
import { Glow, GridPattern } from "./decor";
import { SectionHeader } from "./section-header";

type PageHeaderProps = Pick<PageIntro, "eyebrow" | "title" | "description"> & {
  /** Optional content under the intro, e.g. jump links or buttons. */
  children?: ReactNode;
};

/**
 * The top of an inner page: eyebrow, <h1> and intro on a faint grid with a
 * soft glow. It slides up under the transparent header so the background
 * runs to the top of the screen, and fades up on load (`enter` in globals.css).
 */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <div className="relative isolate -mt-(--header-height) overflow-hidden border-b border-line pt-(--header-height)">
      <GridPattern className="[mask-image:radial-gradient(ellipse_75%_90%_at_85%_0%,black,transparent_75%)]" />
      <Glow className="-top-48 -right-24 w-[34rem]" />
      <Glow color="cyan" className="-top-24 right-[28%] hidden w-[22rem] md:block" />
      <Container className="pt-12 pb-12 md:pt-20 md:pb-16">
        <SectionHeader
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="enter"
        />
        {children ? <div className="enter mt-8 [--enter-delay:120ms]">{children}</div> : null}
      </Container>
    </div>
  );
}
