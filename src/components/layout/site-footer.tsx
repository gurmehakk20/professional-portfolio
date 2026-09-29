import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { site } from "@/content/site";
import { mailtoUrl, whatsappUrl } from "@/lib/links";
import { Wordmark } from "./logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { contact, socials } = site;

  return (
    <footer className="border-t border-line bg-canvas">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-8">
          <div className="sm:col-span-2 md:col-span-5">
            <Link href="/" aria-label={`${site.name} — home`} className="inline-block rounded-sm">
              <Wordmark name={site.name} />
            </Link>
            <p className="mt-3 text-sm font-medium text-ink">{site.tagline}</p>
            <p className="mt-3 max-w-xs text-sm text-muted">{site.footer.blurb}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="font-sans text-sm font-semibold text-ink">
              Navigation
            </h2>
            <ul className="mt-4 space-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-8 items-center text-sm text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-sans text-sm font-semibold text-ink">Get in touch</h2>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={mailtoUrl()}
                  className="inline-flex min-h-8 items-center gap-2.5 text-sm text-muted transition-colors duration-200 hover:text-ink"
                >
                  <Icon name="mail" size={16} className="shrink-0" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-8 items-center gap-2.5 text-sm text-muted transition-colors duration-200 hover:text-ink"
                >
                  <Icon name="whatsapp" size={16} className="shrink-0" />
                  <span>
                    WhatsApp <span className="whitespace-nowrap">{contact.whatsapp.display}</span>
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>

            {socials.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Social profiles">
                {socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
                    >
                      <Icon name={social.icon} size={18} />
                      <span className="sr-only">{social.label} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          {contact.location ? <p>{contact.location}</p> : null}
        </div>
      </Container>
    </footer>
  );
}
