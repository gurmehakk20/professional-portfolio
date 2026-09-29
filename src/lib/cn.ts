/**
 * Joins class names, skipping falsy values.
 *
 * It doesn't resolve conflicts: a `className` can add utilities, but it can't
 * reliably override one a component already sets (display, padding, colour).
 * Use a prop, or a responsive variant such as `max-md:h-11`, instead.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
