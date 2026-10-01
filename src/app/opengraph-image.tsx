import { hero } from "@/content/home";
import { site } from "@/content/site";
import { ogImage, ogImageSize } from "@/lib/og";

// Default share image for every page (project pages have their own).
export const alt = site.title;
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage({ title: hero.title, highlight: hero.titleHighlight, subtitle: site.tagline });
}
