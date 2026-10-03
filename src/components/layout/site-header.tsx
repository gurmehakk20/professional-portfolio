import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { hasEmail, hasWhatsApp } from "@/lib/contact";
import { mailtoUrl, whatsappUrl } from "@/lib/links";
import { Wordmark } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

/**
 * Sticky header. It's transparent over the top of the page and becomes a
 * solid, bordered bar once you scroll — see `.site-header` in globals.css.
 */
export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40">
      <Container className="flex h-(--header-height) items-center justify-between gap-3 xs:gap-6">
        <Link href="/" aria-label={`${site.name} — home`} className="rounded-sm">
          <Wordmark name={site.name} />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <NavLinks items={site.nav} />
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={site.cta.href}
            size="sm"
            className="max-md:h-11"
          >
            {site.cta.label}
          </ButtonLink>
          <MobileNav
            name={site.name}
            items={site.nav}
            cta={site.cta}
            whatsappHref={hasWhatsApp ? whatsappUrl() : undefined}
            emailHref={hasEmail ? mailtoUrl() : undefined}
          />
        </div>
      </Container>
    </header>
  );
}
