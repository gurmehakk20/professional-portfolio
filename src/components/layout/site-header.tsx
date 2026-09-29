import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { mailtoUrl, whatsappUrl } from "@/lib/links";
import { Wordmark } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <Container className="flex h-(--header-height) items-center justify-between gap-6">
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
            className="hidden min-[22.5rem]:inline-flex"
          >
            {site.cta.label}
          </ButtonLink>
          <MobileNav
            name={site.name}
            items={site.nav}
            cta={site.cta}
            whatsappHref={whatsappUrl()}
            emailHref={mailtoUrl()}
          />
        </div>
      </Container>
    </header>
  );
}
