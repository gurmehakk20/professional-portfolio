import { Fragment } from "react";

/**
 * An email address or web address that wraps at natural points on narrow
 * screens — after "@" and after each "/" (e.g. "name@" / "gmail.com") —
 * instead of mid-word. Pair it with `wrap-anywhere` as a last resort for
 * a single part that's still too long for its line.
 */
export function BreakableText({ text }: { text: string }) {
  return text.split(/(?<=[@/])/).map((part, index) => (
    <Fragment key={index}>
      {index > 0 ? <wbr /> : null}
      {part}
    </Fragment>
  ));
}
