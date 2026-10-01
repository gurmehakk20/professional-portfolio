import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brandColors } from "@/lib/brand";

/*
 * Home-screen icon for iPhone and iPad, drawn from icon.svg so the two always
 * match. iOS rounds the corners itself, so the ink fills the whole square.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const icon = await readFile(join(process.cwd(), "src/app/icon.svg"), "base64");

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundImage: `linear-gradient(135deg, ${brandColors.accent}, #0891b2)`,
        }}
      >
        {/* ImageResponse renders to a PNG, so next/image doesn't apply here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;base64,${icon}`} width={160} height={160} alt="" />
      </div>
    ),
    size,
  );
}
