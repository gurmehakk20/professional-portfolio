import { ButtonLink } from "@/components/ui/button";
import { DevNotice } from "@/components/ui/dev-notice";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { site } from "@/content/site";
import type { ContactSectionContent } from "@/content/types";
import { getContactMethods } from "@/lib/contact";

type ContactSectionProps = {
  content: ContactSectionContent;
  id?: string;
  /** Section number shown before the eyebrow, e.g. "07". */
  number?: string;
  /** Drop the top padding when the section above has the same background. */
  flushTop?: boolean;
};

/**
 * The closing conversion section, at the end of most pages: a dark panel with
 * the main call to action and every configured way to get in touch. Contact
 * methods left empty in src/content/site.ts are simply not listed.
 */
export function ContactSection({ content, id = "contact", number, flushTop }: ContactSectionProps) {
  const headingId = `${id}-heading`;
  const methods = getContactMethods();
  const { primaryCta, methodsLabel } = content;

  return (
    <Section id={id} labelledBy={headingId} flushTop={flushTop}>
      <div className="theme-dark relative isolate overflow-hidden rounded-3xl px-6 py-12 ring-1 ring-white/10 sm:px-10 md:px-14 md:py-16">
        {/* Grid and soft glows. Decorative only. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_100%_at_100%_50%,black,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-1/2 -right-[10%] -z-10 aspect-square w-[42rem] max-w-[120%] rounded-full bg-[radial-gradient(closest-side,rgb(49_105_196/0.45),transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-2/3 left-[20%] -z-10 aspect-square w-[30rem] max-w-full rounded-full bg-[radial-gradient(closest-side,rgb(47_139_166/0.2),transparent)]"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeader
              id={headingId}
              number={number}
              tone="dark"
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href={primaryCta.href} variant="inverse" size="lg" trailingIcon="arrow-right">
                {primaryCta.label}
              </ButtonLink>
              {site.contact.responseTime ? (
                <p className="flex items-center gap-2 text-sm">
                  <Icon name="clock" size={16} className="shrink-0 text-accent-on-dark" />
                  {site.contact.responseTime}
                </p>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-5">
            {methods.length > 0 ? (
              <>
                <p
                  id={`${id}-methods`}
                  className="text-eyebrow font-semibold text-on-dark-muted uppercase"
                >
                  {methodsLabel}
                </p>
                <ul
                  role="list"
                  aria-labelledby={`${id}-methods`}
                  className="mt-4 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  {methods.map((method) => (
                    <li key={method.id}>
                      <a
                        href={method.href}
                        {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-4 px-4 py-4 transition-colors duration-200 hover:bg-white/[0.05] sm:px-5"
                      >
                        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-on-dark">
                          <Icon name={method.icon} size={18} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm">{method.label}</span>
                          <span className="block truncate font-semibold text-white">
                            {method.value}
                          </span>
                        </span>
                        <Icon
                          name={method.external ? "arrow-up-right" : "arrow-right"}
                          size={18}
                          className={`shrink-0 text-on-dark-muted transition-[translate,color] duration-200 ease-out-soft group-hover:text-white ${
                            method.external
                              ? "motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                              : "motion-safe:group-hover:translate-x-1"
                          }`}
                        />
                        {method.external ? (
                          <span className="sr-only"> (opens in a new tab)</span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {methods.length === 0 || !site.contact.email || !site.contact.whatsapp.number ? (
              <DevNotice className="mt-4 border-white/30 bg-white/5 text-white">
                Add your email address and WhatsApp number in src/content/site.ts — they&apos;ll
                appear here automatically.
              </DevNotice>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
