import Link from "next/link";
import { BreakableText } from "@/components/ui/breakable-text";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/site";
import { hasEmail, hasWhatsApp, socialLinks } from "@/lib/contact";
import { mailtoUrl, whatsappUrl } from "@/lib/links";
import { Wordmark } from "./logo";

/** Full-width 44px rows on phones for comfortable tapping; compact 32px links from md up. */
const linkClasses =
  "flex min-h-11 items-center gap-2.5 text-sm text-muted transition-colors duration-200 hover:text-accent-strong md:inline-flex md:min-h-8";

/** Site footer. Contact details and profiles appear only once they're filled in (src/content/site.ts). */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const { contact } = site;

  return (
    <footer className="relative bg-canvas">
      {/* A thin blue hairline along the top. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
      />
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-8">
          <div className="col-span-2 md:col-span-5">
            <Link href="/" aria-label={`${site.name} — home`} className="inline-flex min-h-11 items-center rounded-sm">
              <Wordmark name={site.name} />
            </Link>
            <p className="mt-3 text-sm font-medium text-ink">{site.tagline}</p>
            <p className="mt-3 max-w-xs text-sm text-muted">{site.footer.blurb}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="font-sans text-sm font-semibold text-ink">Navigation</h2>
            <ul className="mt-3 md:mt-4 md:space-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {hasEmail || hasWhatsApp || socialLinks.length > 0 ? (
            // Full width on the smallest phones, so the email address has room.
            <div className="max-xs:col-span-2 md:col-span-4">
              <h2 className="font-sans text-sm font-semibold text-ink">Get in touch</h2>
              {hasEmail || hasWhatsApp ? (
                <ul className="mt-3 md:mt-4 md:space-y-1">
                  {hasEmail ? (
                    <li>
                      <a href={mailtoUrl()} className={linkClasses}>
                        <Icon name="mail" size={16} className="shrink-0" />
                        <span className="wrap-anywhere">
                          <BreakableText text={contact.email} />
                        </span>
                      </a>
                    </li>
                  ) : null}
                  {hasWhatsApp ? (
                    <li>
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClasses}
                      >
                        <Icon name="whatsapp" size={16} className="shrink-0" />
                        <span>
                          WhatsApp{" "}
                          <span className="whitespace-nowrap">
                            {contact.whatsapp.display || `+${contact.whatsapp.number}`}
                          </span>
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              ) : null}

              {socialLinks.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Profiles">
                  {socialLinks.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-11 items-center justify-center rounded-lg border md:size-10 border-line bg-surface text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                      >
                        <Icon name={social.icon} size={18} />
                        <span className="sr-only">{social.label} (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.fullName}. All rights reserved.
          </p>
          {contact.location ? <p>{contact.location}</p> : null}
        </div>
      </Container>
    </footer>
  );
}
