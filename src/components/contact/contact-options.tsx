import { ButtonLink } from "@/components/ui/button";
import type { ButtonVariant } from "@/components/ui/button-styles";
import { Icon, type IconName } from "@/components/ui/icon";
import type { ContactChannel, ContactDetails, ContactPageContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { mailtoUrl, whatsappUrl } from "@/lib/links";

type ContactOptionsProps = {
  whatsapp: ContactChannel;
  email: ContactChannel;
  contact: ContactDetails;
  /** id of the visually hidden heading, so the page section can point to it. */
  headingId?: string;
  /** Stack the two cards on large screens, for a narrow column beside the form. */
  stacked?: boolean;
  className?: string;
};

/** The quickest ways to get in touch (WhatsApp and email), plus reply time and location. */
export function ContactOptions({
  whatsapp,
  email,
  contact,
  headingId = "contact-options-heading",
  stacked = true,
  className,
}: ContactOptionsProps) {
  const notes: { icon: IconName; text: string }[] = [];
  if (contact.responseTime) notes.push({ icon: "clock", text: contact.responseTime });
  if (contact.location) notes.push({ icon: "map-pin", text: contact.location });

  return (
    <div className={className}>
      <h2 id={headingId} className="sr-only">
        Contact options
      </h2>
      <ul
        role="list"
        className={cn("grid gap-4 sm:grid-cols-2 sm:gap-5", stacked && "lg:grid-cols-1")}
      >
        <li>
          <ChannelCard
            icon="whatsapp"
            channel={whatsapp}
            detail={contact.whatsapp.display}
            href={whatsappUrl()}
            variant="primary"
          />
        </li>
        <li>
          <ChannelCard
            icon="mail"
            channel={email}
            detail={contact.email}
            href={mailtoUrl()}
            variant="secondary"
          />
        </li>
      </ul>

      {notes.length > 0 ? (
        <div className="mt-6 space-y-2.5 text-sm text-muted">
          {notes.map((note) => (
            <p key={note.text} className="flex items-start gap-2.5">
              <Icon name={note.icon} size={16} className="mt-0.5 shrink-0 text-accent" />
              {note.text}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type ChannelCardProps = {
  icon: IconName;
  channel: ContactChannel;
  /** The number or address, shown so it can be read or copied. */
  detail: string;
  href: string;
  variant: ButtonVariant;
};

function ChannelCard({ icon, channel, detail, href, variant }: ChannelCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card">
      <div className="flex items-center gap-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon name={icon} size={20} />
        </span>
        <div className="min-w-0">
          <h3 className="text-h3 font-semibold">{channel.title}</h3>
          <p className="text-sm text-muted">{channel.description}</p>
        </div>
      </div>
      <p className="mt-5 font-display text-lg font-semibold tracking-[-0.01em] text-ink wrap-anywhere">
        {detail}
      </p>
      <div className="mt-auto pt-4">
        <ButtonLink href={href} variant={variant} className="w-full sm:w-auto">
          {channel.label}
        </ButtonLink>
      </div>
    </div>
  );
}

type ContactNextStepsProps = ContactPageContent["nextSteps"] & {
  className?: string;
};

/** Numbered "What happens next" list, so people know what to expect after getting in touch. */
export function ContactNextSteps({ title, steps, className }: ContactNextStepsProps) {
  if (steps.length === 0) return null;

  return (
    <div className={className}>
      <h2 className="text-h3 font-semibold">{title}</h2>
      <ol role="list" className="mt-4 border-t border-line">
        {steps.map((step, index) => (
          <li key={step} className="flex items-baseline gap-4 border-b border-line py-4">
            <span
              aria-hidden="true"
              className="w-6 shrink-0 font-display text-sm font-semibold text-accent tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p>
              <span className="sr-only">Step {index + 1}: </span>
              {step}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
