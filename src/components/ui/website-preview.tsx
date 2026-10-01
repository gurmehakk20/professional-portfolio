import { cn } from "@/lib/cn";

export type PreviewVariant = "split" | "centered" | "mobile";

type WebsitePreviewProps = {
  variant?: PreviewVariant;
  className?: string;
};

/*
 * An abstract, text-free website layout. It stands in wherever a real
 * screenshot hasn't been added yet, and forms the hero illustration.
 * Everything is sized in container query units (cqw), so it scales
 * cleanly from a small card thumbnail to a full-width frame.
 */

/** Fills its (positioned) parent with an abstract website layout. Decorative. */
export function WebsitePreview({ variant = "split", className }: WebsitePreviewProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-hidden bg-surface @container", className)}
    >
      {variant === "split" ? <SplitLayout /> : null}
      {variant === "centered" ? <CenteredLayout /> : null}
      {variant === "mobile" ? <PhoneOnBackdrop /> : null}
    </div>
  );
}

function Nav() {
  return (
    <div className="flex items-center justify-between px-[6cqw] pt-[3.5cqw]">
      <div className="flex items-center gap-[1cqw]">
        <span className="size-[2.2cqw] rounded-[0.5cqw] bg-linear-135 from-accent to-accent-bright" />
        <span className="h-[1.4cqw] w-[8cqw] rounded-full bg-ink" />
      </div>
      <div className="flex items-center gap-[2.6cqw]">
        <span className="h-[1cqw] w-[5cqw] rounded-full bg-line-strong" />
        <span className="h-[1cqw] w-[6cqw] rounded-full bg-line-strong" />
        <span className="h-[1cqw] w-[4.5cqw] rounded-full bg-line-strong" />
        <span className="h-[3.2cqw] w-[9cqw] rounded-[0.6cqw] bg-accent" />
      </div>
    </div>
  );
}

function Buttons({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-[1.4cqw]", className)}>
      <span className="h-[3.6cqw] w-[11cqw] rounded-[0.6cqw] bg-accent" />
      <span className="h-[3.6cqw] w-[11cqw] rounded-[0.6cqw] border border-line-strong" />
    </div>
  );
}

function SplitLayout() {
  return (
    <>
      <Nav />
      <div className="mt-[7cqw] grid grid-cols-[1fr_0.95fr] gap-[5cqw] px-[6cqw]">
        <div className="flex flex-col items-start pt-[1.5cqw]">
          <span className="h-[1cqw] w-[11cqw] rounded-full bg-cyan/70" />
          <span className="mt-[2.4cqw] h-[3cqw] w-[36cqw] max-w-full rounded-[0.5cqw] bg-ink" />
          <span className="mt-[1.3cqw] h-[3cqw] w-[27cqw] rounded-[0.5cqw] bg-ink" />
          <span className="mt-[3cqw] h-[1.1cqw] w-[34cqw] max-w-full rounded-full bg-line-strong" />
          <span className="mt-[1.2cqw] h-[1.1cqw] w-[29cqw] rounded-full bg-line-strong" />
          <Buttons className="mt-[3.4cqw]" />
        </div>
        <div className="relative h-[27cqw] rounded-[1.2cqw] bg-linear-135 from-accent-soft to-cyan-soft">
          <span className="absolute right-[3cqw] bottom-[3cqw] size-[13cqw] rounded-full bg-accent/20" />
          <span className="absolute top-[3cqw] right-[3cqw] size-[5cqw] rounded-full bg-surface/70" />
          <div className="absolute -bottom-[2.5cqw] -left-[3cqw] w-[17cqw] rounded-[0.9cqw] border border-line bg-surface p-[1.4cqw] shadow-[0_0.4cqw_1.6cqw_-0.4cqw_rgb(17_19_24/0.18)]">
            <span className="block h-[1cqw] w-[9cqw] rounded-full bg-ink" />
            <span className="mt-[1cqw] block h-[0.9cqw] w-[13cqw] rounded-full bg-line-strong" />
            <span className="mt-[1.6cqw] block h-[2.6cqw] w-full rounded-[0.5cqw] bg-accent" />
          </div>
        </div>
      </div>
      <div className="mt-[6cqw] grid grid-cols-3 gap-[2cqw] px-[6cqw]">
        {[0, 1, 2].map((card) => (
          <div key={card} className="rounded-[1cqw] border border-line p-[1.6cqw]">
            <span className="block size-[3cqw] rounded-[0.6cqw] bg-accent-soft" />
            <span className="mt-[1.6cqw] block h-[1.1cqw] w-[12cqw] rounded-full bg-ink/85" />
            <span className="mt-[1cqw] block h-[0.9cqw] w-[18cqw] max-w-full rounded-full bg-line-strong" />
          </div>
        ))}
      </div>
    </>
  );
}

function CenteredLayout() {
  return (
    <>
      <Nav />
      <div className="mt-[7cqw] flex flex-col items-center px-[6cqw]">
        <span className="h-[1cqw] w-[11cqw] rounded-full bg-cyan/70" />
        <span className="mt-[2.4cqw] h-[3cqw] w-[48cqw] rounded-[0.5cqw] bg-ink" />
        <span className="mt-[1.3cqw] h-[3cqw] w-[34cqw] rounded-[0.5cqw] bg-ink" />
        <span className="mt-[3cqw] h-[1.1cqw] w-[40cqw] rounded-full bg-line-strong" />
        <Buttons className="mt-[3.4cqw]" />
      </div>
      <div className="mt-[5cqw] grid grid-cols-[1.4fr_1fr_1fr] gap-[2cqw] px-[6cqw]">
        <span className="h-[18cqw] rounded-[1cqw] bg-linear-135 from-accent-soft to-cyan-soft" />
        <span className="h-[18cqw] rounded-[1cqw] bg-[#eef2f7]" />
        <span className="h-[18cqw] rounded-[1cqw] bg-[#eef2f7]" />
      </div>
    </>
  );
}

function PhoneOnBackdrop() {
  return (
    <div className="flex h-full items-center justify-center bg-linear-160 from-accent-soft to-cyan-soft">
      <div className="h-[54cqw] w-[27cqw] overflow-hidden rounded-[3.2cqw] border-[0.7cqw] border-ink bg-surface">
        <MobileScreen />
      </div>
    </div>
  );
}

/**
 * The same abstract website, laid out for a phone screen.
 * Place it inside any phone-shaped frame; content below the fold is clipped.
 */
export function MobileScreen({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("h-full w-full bg-surface @container", className)}>
      <div className="flex items-center justify-between px-[8cqw] pt-[8cqw]">
        <div className="flex items-center gap-[3cqw]">
          <span className="size-[7cqw] rounded-[1.6cqw] bg-linear-135 from-accent to-accent-bright" />
          <span className="h-[4cqw] w-[22cqw] rounded-full bg-ink" />
        </div>
        <div className="flex flex-col gap-[2.4cqw]">
          <span className="h-[1.6cqw] w-[9cqw] rounded-full bg-ink" />
          <span className="h-[1.6cqw] w-[9cqw] rounded-full bg-ink" />
        </div>
      </div>
      <div className="flex flex-col items-start px-[8cqw] pt-[12cqw]">
        <span className="h-[3cqw] w-[30cqw] rounded-full bg-cyan/70" />
        <span className="mt-[6cqw] h-[8cqw] w-[80cqw] rounded-[1.6cqw] bg-ink" />
        <span className="mt-[3.5cqw] h-[8cqw] w-[58cqw] rounded-[1.6cqw] bg-ink" />
        <span className="mt-[7cqw] h-[3cqw] w-[84cqw] rounded-full bg-line-strong" />
        <span className="mt-[3cqw] h-[3cqw] w-[70cqw] rounded-full bg-line-strong" />
        <span className="mt-[8cqw] h-[11cqw] w-full rounded-[2cqw] bg-accent" />
        <span className="mt-[3.5cqw] h-[11cqw] w-full rounded-[2cqw] border border-line-strong" />
        <span className="mt-[8cqw] h-[40cqw] w-full rounded-[3cqw] bg-linear-135 from-accent-soft to-cyan-soft" />
        <div className="mt-[5cqw] w-full rounded-[3cqw] border border-line p-[5cqw]">
          <span className="block size-[9cqw] rounded-[2cqw] bg-accent-soft" />
          <span className="mt-[4cqw] block h-[3cqw] w-[40cqw] rounded-full bg-ink/85" />
          <span className="mt-[3cqw] block h-[2.6cqw] w-[60cqw] rounded-full bg-line-strong" />
        </div>
      </div>
    </div>
  );
}
