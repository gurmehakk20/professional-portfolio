/*
 * Brand colours for places that can't read the CSS: share images, the app
 * icon, the web manifest and the browser theme colour.
 * They mirror the @theme colours in src/app/globals.css (and the colours in
 * src/app/icon.svg) — update all three together.
 */
export const brandColors = {
  canvas: "#f7f8fa",
  surface: "#ffffff",
  ink: "#111318",
  muted: "#5e6573",
  line: "#e3e7ee",
  lineStrong: "#cbd2dc",
  field: "#8c94a3",
  accent: "#1c4e9c",
  accentBright: "#3169c4",
  accentSoft: "#eaf0fa",
  cyan: "#2f8ba6",
  cyanSoft: "#e6f1f4",
  night: "#0d1b33",
} as const;
