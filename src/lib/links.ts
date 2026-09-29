import { site } from "@/content/site";

/** True for web links to other sites (they open in a new tab). */
export function opensInNewTab(href: string): boolean {
  return /^(https?:)?\/\//.test(href);
}

/** True for links that leave the site (http, mailto, tel, wa.me…). */
export function isExternalHref(href: string): boolean {
  return opensInNewTab(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

/** Turns a site-relative path into an absolute URL, e.g. for metadata. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${site.url}/`).toString();
}

/** "https://www.arkadental.com/" → "arkadental.com", for display in a browser frame. */
export function displayHost(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
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
