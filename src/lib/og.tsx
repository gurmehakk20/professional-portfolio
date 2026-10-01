import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { brandColors } from "@/lib/brand";

/*
 * Shared design for the Open Graph images — the preview card shown when a
 * link to the site is shared on WhatsApp, LinkedIn, X and similar apps.
 *
 * next/og renders this to a PNG. It only understands flexbox and inline
 * styles, and any <div> with more than one child needs `display: "flex"`.
 *
 * Fonts: Plus Jakarta Sans and Inter (Latin subsets, via Fontsource), both licensed
 * under the SIL Open Font License 1.1.
 */

export const ogImageSize = { width: 1200, height: 630 };

const fontsDir = join(process.cwd(), "src/assets/fonts");
const [jakartaBold, interMedium, interSemiBold] = await Promise.all([
  readFile(join(fontsDir, "plus-jakarta-sans-latin-700-normal.woff")),
  readFile(join(fontsDir, "inter-latin-500-normal.woff")),
  readFile(join(fontsDir, "inter-latin-600-normal.woff")),
]);

type OgCardProps = {
  /** Small blue label above the title, e.g. a project's category. */
  eyebrow?: string;
  title: string;
  /** Part of the title to show in blue (must match exactly). */
  highlight?: string;
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
      { name: "Plus Jakarta Sans", data: jakartaBold, weight: 700, style: "normal" },
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

function OgCard({ eyebrow, title, highlight, titleSize = "md", subtitle }: OgCardProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: brandColors.canvas,
        // Soft blue and cyan glows, as on the site.
        backgroundImage:
          "radial-gradient(circle at 88% 18%, rgba(37,99,235,0.2), transparent 42%), radial-gradient(circle at 8% 105%, rgba(6,182,212,0.16), transparent 38%)",
        color: brandColors.ink,
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
                  color: brandColors.accent,
                }}
              >
                {eyebrow}
              </div>
            </div>
          ) : null}
          <div
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: getTitleFontSize(title, titleSize),
              fontWeight: 700,
              lineHeight: titleSize === "lg" ? 1.06 : 1.12,
              letterSpacing: "-0.03em",
              // Words are laid out one by one so part of the title can be blue.
              display: "flex",
              flexWrap: "wrap",
              columnGap: "0.26em",
            }}
          >
            {renderTitle(title, highlight)}
          </div>
          <div style={{ marginTop: 28, fontSize: 28, fontWeight: 500, color: brandColors.muted }}>
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The title as one span per word, with the words of `highlight` (if it appears in the title) in brand blue. */
function renderTitle(title: string, highlight?: string) {
  const start = highlight ? title.indexOf(highlight) : -1;
  const end = highlight && start !== -1 ? start + highlight.length : -1;
  let offset = 0;

  return title.split(" ").map((word, index) => {
    const wordStart = title.indexOf(word, offset);
    offset = wordStart + word.length;
    const blue = start !== -1 && wordStart >= start && wordStart < end;
    return (
      <span key={index} style={blue ? { color: brandColors.accent } : undefined}>
        {word}
      </span>
    );
  });
}

/** The header wordmark: a blue-to-cyan square and the name in wide-spaced capitals. */
function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          backgroundImage: `linear-gradient(135deg, ${brandColors.accent}, ${brandColors.cyan})`,
        }}
      />
      <div
        style={{
          fontFamily: "Plus Jakarta Sans",
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
        backgroundColor: brandColors.surface,
        border: `2px solid ${brandColors.line}`,
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
          backgroundColor: brandColors.canvas,
          borderBottom: `2px solid ${brandColors.line}`,
        }}
      >
        <Bar width={11} height={11} fill={brandColors.lineStrong} />
        <Bar width={11} height={11} fill={brandColors.lineStrong} />
        <Bar width={11} height={11} fill={brandColors.lineStrong} />
        <div
          style={{
            marginLeft: 44,
            width: 180,
            height: 22,
            borderRadius: 6,
            border: `2px solid ${brandColors.line}`,
            backgroundColor: brandColors.surface,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", padding: "26px 30px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: brandColors.accent }}
            />
            <Bar width={54} height={9} fill={brandColors.ink} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Bar width={28} height={7} fill={brandColors.lineStrong} />
            <Bar width={34} height={7} fill={brandColors.lineStrong} />
            <Bar width={26} height={7} fill={brandColors.lineStrong} />
            <div style={{ width: 60, height: 24, borderRadius: 6, backgroundColor: brandColors.accent }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 50 }}>
          <Bar width={64} height={7} fill={brandColors.cyan} />
          <Bar width={268} height={18} fill={brandColors.ink} marginTop={18} />
          <Bar width={204} height={18} fill={brandColors.ink} marginTop={11} />
          <Bar width={250} height={8} fill={brandColors.lineStrong} marginTop={24} />
          <Bar width={214} height={8} fill={brandColors.lineStrong} marginTop={10} />
          <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
            <div style={{ width: 90, height: 30, borderRadius: 6, backgroundColor: brandColors.accent }} />
            <div
              style={{
                width: 90,
                height: 30,
                borderRadius: 6,
                border: `2px solid ${brandColors.lineStrong}`,
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
                border: `2px solid ${brandColors.line}`,
              }}
            >
              <div
                style={{ width: 26, height: 26, borderRadius: 6, backgroundColor: brandColors.accentSoft }}
              />
              <Bar width="72%" height={8} fill={brandColors.ink} marginTop={14} />
              <Bar width="92%" height={7} fill={brandColors.lineStrong} marginTop={9} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
