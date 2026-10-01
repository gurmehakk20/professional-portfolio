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
  accent: "#2563eb",
  accentSoft: "#e8f1ff",
  cyan: "#06b6d4",
  cyanSoft: "#e2f7fb",
  night: "#0c1220",
} as const;
