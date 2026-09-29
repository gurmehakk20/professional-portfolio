import { site } from "@/content/site";

/** True for links that leave the site (http, mailto, tel, wa.me…). */
export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

/** Turns a site-relative path into an absolute URL, e.g. for metadata. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${site.url}/`).toString();
}

/** WhatsApp click-to-chat link with an optional pre-filled message. */
export function whatsappUrl(message: string = site.contact.whatsapp.message): string {
  const base = `https://wa.me/${site.contact.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** mailto: link with an optional subject and body. */
export function mailtoUrl({ subject, body }: { subject?: string; body?: string } = {}): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which some mail apps show literally.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.contact.email}${query ? `?${query}` : ""}`;
}
