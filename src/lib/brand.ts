/*
 * Brand colours for places that can't read the CSS: share images, the app
 * icon, the web manifest and the browser theme colour.
 * They mirror the @theme colours in src/app/globals.css (and the colours in
 * src/app/icon.svg) — update all three together.
 */
export const brandColors = {
  canvas: "#faf9f6",
  surface: "#ffffff",
  ink: "#0f1b2d",
  muted: "#5c6573",
  line: "#e6e2da",
  lineStrong: "#d6d0c5",
  field: "#8a8f98",
  accent: "#0f766e",
  accentSoft: "#e7f2f0",
} as const;
