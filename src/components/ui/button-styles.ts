import { cn } from "@/lib/cn";

/*
 * Button classes, kept separate from the Button components so client
 * components can style their own <button>s without importing icons.
 */

export type ButtonVariant = "primary" | "secondary" | "inverse" | "outline-inverse";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap " +
  "transition-[background-color,border-color,color] duration-200 ease-out-soft " +
  "disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  /** Main action — navy on light backgrounds. */
  primary: "bg-ink text-white hover:bg-ink-hover",
  /** Secondary action — outlined on light backgrounds. */
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink/35",
  /** Main action on ink backgrounds. */
  inverse: "bg-white text-ink hover:bg-canvas",
  /** Secondary action on ink backgrounds. */
  "outline-inverse": "border border-white/30 text-white hover:border-white/60 hover:bg-white/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
