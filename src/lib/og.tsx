import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/*
 * Shared design for the Open Graph images — the preview card shown when a
 * link to the site is shared on WhatsApp, LinkedIn, X and similar apps.
 *
 * next/og renders this to a PNG. It only understands flexbox and inline
 * styles, and any <div> with more than one child needs `display: "flex"`.
 *
 * Fonts: Manrope and Inter (Latin subsets, via Fontsource), both licensed
 * under the SIL Open Font License 1.1.
 */

export const ogImageSize = { width: 1200, height: 630 };

const fontsDir = join(process.cwd(), "src/assets/fonts");
const [manropeBold, interMedium, interSemiBold] = await Promise.all([
  readFile(join(fontsDir, "manrope-latin-700-normal.woff")),
  readFile(join(fontsDir, "inter-latin-500-normal.woff")),
  readFile(join(fontsDir, "inter-latin-600-normal.woff")),
]);

/** The site's colour tokens (see globals.css). */
const color = {
  canvas: "#faf9f6",
  surface: "#ffffff",
  ink: "#0f1b2d",
  muted: "#5c6573",
  line: "#e6e2da",
  lineStrong: "#d6d0c5",
  field: "#8a8f98",
  accent: "#0f766e",
  accentSoft: "#e7f2f0",
};

type OgCardProps = {
  /** Small teal label above the title, e.g. a project's category. */
  eyebrow?: string;
  /** Adds a "Placeholder" tag, so example projects are never mistaken for real work. */
  placeholder?: boolean;
  title: string;
  /** "lg" suits short titles such as a project name. */
  titleSize?: "md" | "lg";
  /** Line under the title. */
  subtitle: string;
};

/** Renders a 1200×630 Open Graph card. */
export function ogImage(props: OgCardProps) {
  return new ImageResponse(<OgCard {...props} />, {
    ...ogImageSize,
    fonts: [
      { name: "Manrope", data: manropeBold, weight: 700, style: "normal" },
      { name: "Inter", data: interMedium, weight: 500, style: "normal" },
      { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
    ],
  });
}

/** Keeps titles to two or three lines: short names get the biggest size. */
function getTitleFontSize(title: string, titleSize: "md" | "lg") {
  if (titleSize === "md") return 56;
  if (title.length <= 12) return 88;
  return title.length <= 28 ? 72 : 60;
}

function OgCard({ eyebrow, placeholder, title, titleSize = "md", subtitle }: OgCardProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: color.canvas,
        color: color.ink,
        fontFamily: "Inter",
      }}
    >
      <BrowserHint />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 640,
          padding: "64px 0 64px 72px",
        }}
      >
        <Wordmark />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: color.accent,
                }}
              >
                {eyebrow}
              </div>
              {placeholder ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 34,
                    padding: "0 14px",
                    borderRadius: 999,
                    border: `2px dashed ${color.field}`,
                    backgroundColor: color.surface,
                    fontSize: 18,
                    fontWeight: 500,
                    color: color.muted,
                  }}
                >
                  Placeholder
                </div>
              ) : null}
            </div>
          ) : null}
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: getTitleFontSize(title, titleSize),
              fontWeight: 700,
              lineHeight: titleSize === "lg" ? 1.06 : 1.12,
              letterSpacing: "-0.03em",
              textWrap: "balance",
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 28, fontSize: 28, fontWeight: 500, color: color.muted }}>
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The header wordmark: a teal square and the name in wide-spaced capitals. */
function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: color.accent }} />
      <div
        style={{
          fontFamily: "Manrope",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {site.name}
      </div>
    </div>
  );
}

/** A rounded bar: the stand-in for a line of text or a button. */
function Bar({
  width,
  height,
  fill,
  marginTop = 0,
}: {
  width: number | string;
  height: number;
  fill: string;
  marginTop?: number;
}) {
  return <div style={{ width, height, borderRadius: height / 2, backgroundColor: fill, marginTop }} />;
}

/** A flat browser window with an abstract, text-free page, running off the bottom edge. */
function BrowserHint() {
  return (
    <div
      style={{
        position: "absolute",
        left: 700,
        top: 150,
        width: 428,
        height: 540,
        display: "flex",
        flexDirection: "column",
        backgroundColor: color.surface,
        border: `2px solid ${color.line}`,
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 46,
          padding: "0 18px",
          backgroundColor: color.canvas,
          borderBottom: `2px solid ${color.line}`,
        }}
      >
        <Bar width={11} height={11} fill={color.lineStrong} />
        <Bar width={11} height={11} fill={color.lineStrong} />
        <Bar width={11} height={11} fill={color.lineStrong} />
        <div
          style={{
            marginLeft: 44,
            width: 180,
            height: 22,
            borderRadius: 6,
            border: `2px solid ${color.line}`,
            backgroundColor: color.surface,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", padding: "26px 30px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: color.accent }} />
            <Bar width={54} height={9} fill={color.ink} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Bar width={28} height={7} fill={color.lineStrong} />
            <Bar width={34} height={7} fill={color.lineStrong} />
            <Bar width={26} height={7} fill={color.lineStrong} />
            <div style={{ width: 60, height: 24, borderRadius: 6, backgroundColor: color.ink }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 50 }}>
          <Bar width={64} height={7} fill={color.accent} />
          <Bar width={268} height={18} fill={color.ink} marginTop={18} />
          <Bar width={204} height={18} fill={color.ink} marginTop={11} />
          <Bar width={250} height={8} fill={color.lineStrong} marginTop={24} />
          <Bar width={214} height={8} fill={color.lineStrong} marginTop={10} />
          <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
            <div style={{ width: 90, height: 30, borderRadius: 6, backgroundColor: color.ink }} />
            <div
              style={{
                width: 90,
                height: 30,
                borderRadius: 6,
                border: `2px solid ${color.lineStrong}`,
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 42 }}>
          {[0, 1, 2].map((card) => (
            <div
              key={card}
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                flexBasis: 0,
                padding: 14,
                borderRadius: 10,
                border: `2px solid ${color.line}`,
              }}
            >
              <div style={{ width: 26, height: 26, borderRadius: 6, backgroundColor: color.accentSoft }} />
              <Bar width="72%" height={8} fill={color.ink} marginTop={14} />
              <Bar width="92%" height={7} fill={color.lineStrong} marginTop={9} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
