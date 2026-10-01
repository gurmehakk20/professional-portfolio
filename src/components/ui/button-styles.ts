import { cn } from "@/lib/cn";

/*
 * Button classes, kept separate from the Button components so client
 * components can style their own <button>s without importing icons.
 */

export type ButtonVariant = "primary" | "secondary" | "inverse" | "outline-inverse";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap [&_svg]:shrink-0 " +
  "transition-[background-color,border-color,color,box-shadow] duration-200 ease-out-soft " +
  "disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  /** Main action — blue, with a soft glow. */
  primary: "bg-accent text-white shadow-glow hover:bg-accent-strong",
  /** Secondary action — white with a border. */
  secondary:
    "border border-line-strong bg-surface text-ink shadow-card hover:border-accent/45 hover:text-accent-strong",
  /** Light button for dark backgrounds. */
  inverse: "bg-white text-ink hover:bg-accent-soft",
  /** Secondary action on dark backgrounds. */
  "outline-inverse": "border border-white/25 text-white hover:border-white/55 hover:bg-white/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-[0.9375rem] sm:text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
