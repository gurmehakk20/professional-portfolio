import type { CSSProperties } from "react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

type ProjectCoverProps = {
  project: Pick<Project, "title" | "category" | "coverColor">;
  /** "banner" is wider and shorter, for the top of a case study. */
  shape?: "card" | "banner";
  className?: string;
};

/**
 * A designed cover for a project without a screenshot yet: its name and
 * category on a tint of its brand colour (`coverColor`), with a small browser
 * window. Decorative — the card or page around it already names the project.
 * Sized in container units, so it scales from a thumbnail to a full-width banner.
 */
export function ProjectCover({ project, shape = "card", className }: ProjectCoverProps) {
  const banner = shape === "banner";
  const style = { "--project": project.coverColor ?? "#1c4e9c" } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      style={style}
      className={cn(
        "relative isolate overflow-hidden bg-[color-mix(in_oklab,var(--project)_8%,#f7f8fa)] @container",
        banner ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-[16/10]",
        className,
      )}
    >
      {/* Tint, fine grid and a soft glow in the project's colour. */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--project)_15%,white),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-grid fade-edges [--grid-line:color-mix(in_oklab,var(--project)_14%,transparent)] [--grid-size:6cqw]" />
      <div className="absolute -top-[22cqw] -right-[12cqw] -z-10 aspect-square w-[64cqw] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--project)_26%,transparent),transparent)]" />

      {/* Category and name. */}
      <div className="absolute top-[8cqw] left-[7cqw] max-w-[50cqw]">
        <span className="inline-flex max-w-full items-center gap-[1.2cqw] rounded-full border border-[color-mix(in_oklab,var(--project)_22%,transparent)] bg-white/75 px-[2.2cqw] py-[0.9cqw] text-[clamp(0.5rem,2cqw,0.8125rem)] font-semibold tracking-[0.1em] text-[color-mix(in_oklab,var(--project)_70%,#111318)] uppercase">
          <span className="size-[1.4cqw] shrink-0 rounded-full bg-(--project)" />
          <span className="truncate">{project.category}</span>
        </span>
        <span className="mt-[3cqw] block font-display text-[8cqw] leading-[0.95] font-semibold tracking-[-0.04em] text-ink">
          {project.title}
        </span>
      </div>

      {/* A small browser window peeking in from the lower right. */}
      <div className="absolute -right-[3cqw] -bottom-[9cqw] w-[54cqw] overflow-hidden rounded-[1.8cqw] border border-white bg-white shadow-[0_2cqw_6cqw_-2cqw_rgb(17_19_24/0.28)]">
        <div className="flex h-[4.4cqw] items-center gap-[0.9cqw] border-b border-line bg-[#fbfcfd] px-[2cqw]">
          <span className="size-[1.1cqw] rounded-full bg-line-strong" />
          <span className="size-[1.1cqw] rounded-full bg-line-strong" />
          <span className="size-[1.1cqw] rounded-full bg-line-strong" />
        </div>
        <div className="p-[3.2cqw]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-[1cqw]">
              <span className="size-[2cqw] rounded-[0.5cqw] bg-(--project)" />
              <span className="h-[1.1cqw] w-[9cqw] rounded-full bg-ink/80" />
            </span>
            <span className="h-[2.6cqw] w-[8cqw] rounded-[0.6cqw] bg-(--project)" />
          </div>
          <span className="mt-[4cqw] block h-[2.4cqw] w-[30cqw] rounded-[0.5cqw] bg-ink/85" />
          <span className="mt-[1.4cqw] block h-[2.4cqw] w-[22cqw] rounded-[0.5cqw] bg-ink/85" />
          <span className="mt-[2.6cqw] block h-[1cqw] w-[34cqw] max-w-full rounded-full bg-line-strong" />
          <div className="mt-[3cqw] grid grid-cols-3 gap-[1.6cqw]">
            <span className="h-[10cqw] rounded-[1cqw] bg-[color-mix(in_oklab,var(--project)_12%,white)]" />
            <span className="h-[10cqw] rounded-[1cqw] bg-[#eef2f7]" />
            <span className="h-[10cqw] rounded-[1cqw] bg-[#eef2f7]" />
          </div>
        </div>
      </div>
    </div>
  );
}
