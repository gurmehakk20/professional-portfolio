import type { IconName } from "@/components/ui/icon";
import { site } from "@/content/site";
import { mailtoUrl, opensInNewTab, whatsappUrl } from "./links";

/*
 * The ways people can reach you, built from src/content/site.ts.
 * Anything left empty there is left out here, so the site never shows
 * placeholder contact details.
 */

export type ContactMethod = {
  id: string;
  /** e.g. "WhatsApp". */
  label: string;
  /** What's shown next to the label, e.g. the address or number. */
  value: string;
  href: string;
  icon: IconName;
  /** Opens in a new tab (web links). */
  external: boolean;
};

export const hasEmail = site.contact.email.trim() !== "";
export const hasWhatsApp = site.contact.whatsapp.number.trim() !== "";

/** Profiles with a link filled in. */
export const socialLinks = site.socials.filter((social) => social.href.trim() !== "");

/** Every configured way to get in touch: WhatsApp, email, then profiles. */
export function getContactMethods(): ContactMethod[] {
  const methods: ContactMethod[] = [];

  if (hasWhatsApp) {
    methods.push({
      id: "whatsapp",
      label: "WhatsApp",
      value: site.contact.whatsapp.display || `+${site.contact.whatsapp.number}`,
      href: whatsappUrl(),
      icon: "whatsapp",
      external: true,
    });
  }

  if (hasEmail) {
    methods.push({
      id: "email",
      label: "Email",
      value: site.contact.email,
      href: mailtoUrl(),
      icon: "mail",
      external: false,
    });
  }

  for (const social of socialLinks) {
    methods.push({
      id: social.label.toLowerCase(),
      label: social.label,
      value: social.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
      href: social.href,
      icon: social.icon,
      external: opensInNewTab(social.href),
    });
  }

  return methods;
}
