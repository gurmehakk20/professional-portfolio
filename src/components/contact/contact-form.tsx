"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type SVGProps } from "react";
import { flushSync } from "react-dom";
import { buttonStyles } from "@/components/ui/button-styles";
import type { ContactDetails, ContactPageContent } from "@/content/types";
import { cn } from "@/lib/cn";

type ContactFormProps = {
  content: ContactPageContent["form"];
  /** Options for "What do you need?", e.g. your services. */
  services: { value: string; label: string }[];
  /** Name used to greet you at the start of every message ("Hi Mehak, …"). */
  recipientName: string;
  whatsapp: Pick<ContactDetails["whatsapp"], "number" | "display">;
  email: string;
  className?: string;
};

type Channel = "whatsapp" | "email";
type FieldName = "name" | "message";
type Sent = { channel: Channel; href: string; count: number };

/** Value of the extra "Something else" option. */
const OTHER = "other";

/**
 * A short enquiry form with no server behind it: it writes the message for
 * the visitor and opens it in WhatsApp or their email app, ready to send.
 */
export function ContactForm({
  content,
  services,
  recipientName,
  whatsapp,
  email,
  className,
}: ContactFormProps) {
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;
  const serviceRef = useRef<HTMLSelectElement>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sent, setSent] = useState<Sent | null>(null);

  // Pre-select a service from links such as /contact?service=clinic-websites.
  // Read once on mount (useSearchParams would stop this page being static).
  useEffect(() => {
    const select = serviceRef.current;
    const requested = new URLSearchParams(window.location.search).get("service");
    if (!select || !requested) return;
    if (Array.from(select.options).some((option) => option.value === requested)) {
      select.value = requested;
    }
  }, []);

  function clearErrorIfFixed(field: FieldName, value: string) {
    if (errors[field] && value.trim()) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) ?? "").trim();

    const name = read("name");
    const message = read("message");
    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!message) nextErrors.message = "Please write a short message.";

    if (nextErrors.name || nextErrors.message) {
      // Show the errors before moving focus, so they're announced with the field.
      flushSync(() => {
        setErrors(nextErrors);
        setSent(null);
      });
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    const service = read("service");
    const interest =
      service === OTHER
        ? content.otherOption
        : services.find((option) => option.value === service)?.label;
    const text = composeMessage({
      recipientName,
      name,
      business: read("business"),
      interest,
      message,
    });

    const submitter = event.nativeEvent.submitter;
    const channel: Channel =
      submitter instanceof HTMLButtonElement && submitter.value === "email" ? "email" : "whatsapp";

    let href: string;
    if (channel === "whatsapp") {
      href = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(text)}`;
      // Opened straight from the submit so pop-up blockers allow it.
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      // Email line breaks should be CRLF (RFC 6068).
      const body = encodeURIComponent(text.replace(/\n/g, "\r\n"));
      href = `mailto:${email}?subject=${encodeURIComponent(content.emailSubject)}&body=${body}`;
      window.location.href = href;
    }

    setErrors({});
    setSent((previous) => ({ channel, href, count: (previous?.count ?? 0) + 1 }));
  }

  const fieldClasses = (field?: FieldName) =>
    cn(
      "block w-full rounded-lg border bg-surface px-4 text-ink transition-colors duration-200 ease-out-soft",
      field && errors[field] ? "border-danger" : "border-field hover:border-muted",
    );

  const errorProps = (field: FieldName) =>
    errors[field]
      ? { "aria-invalid": true as const, "aria-describedby": id(`${field}-error`) }
      : {};

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-card md:p-8",
        className,
      )}
    >
      <h2 id={id("heading")} className="text-h3 font-semibold">
        {content.title}
      </h2>
      <p className="mt-2 text-muted">{content.description}</p>

      {/* On large screens the card can be taller than the form; the message box takes up the extra room. */}
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-labelledby={id("heading")}
        className="mt-8 flex flex-1 flex-col"
      >
        <div className="grid flex-1 gap-5 sm:grid-cols-2 lg:grid-rows-[auto_auto_1fr]">
          <Field htmlFor={id("name")} label="Name" error={errors.name} errorId={id("name-error")}>
            <input
              id={id("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              onChange={(event) => clearErrorIfFixed("name", event.target.value)}
              className={cn(fieldClasses("name"), "h-12")}
              {...errorProps("name")}
            />
          </Field>

          <Field htmlFor={id("business")} label="Business or website" optional>
            <input
              id={id("business")}
              name="business"
              type="text"
              autoComplete="organization"
              className={cn(fieldClasses(), "h-12")}
            />
          </Field>

          <Field
            htmlFor={id("service")}
            label="What do you need?"
            optional
            className="sm:col-span-2"
          >
            <div className="relative">
              <select
                ref={serviceRef}
                id={id("service")}
                name="service"
                defaultValue=""
                className={cn(
                  fieldClasses(),
                  "h-12 appearance-none pr-11 has-[option[value='']:checked]:text-muted [&_option]:text-ink",
                )}
              >
                <option value="">Choose an option</option>
                {services.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
                <option value={OTHER}>{content.otherOption}</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
            </div>
          </Field>

          <Field
            htmlFor={id("message")}
            label="Message"
            error={errors.message}
            errorId={id("message-error")}
            grow
            className="sm:col-span-2"
          >
            <textarea
              id={id("message")}
              name="message"
              rows={5}
              required
              onChange={(event) => clearErrorIfFixed("message", event.target.value)}
              className={cn(fieldClasses("message"), "min-h-28 resize-y py-3 lg:grow")}
              {...errorProps("message")}
            />
          </Field>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="submit"
            name="channel"
            value="whatsapp"
            className={buttonStyles({ size: "lg" })}
          >
            <WhatsAppIcon />
            {content.submitWhatsApp}
          </button>
          <button
            type="submit"
            name="channel"
            value="email"
            className={buttonStyles({ variant: "secondary", size: "lg" })}
          >
            <MailIcon />
            {content.submitEmail}
          </button>
        </div>

        {/* Always rendered, so screen readers pick up the message when it appears. */}
        <div role="status">
          {sent ? (
            <div
              key={sent.count}
              className="mt-6 flex items-start gap-3 rounded-xl bg-accent-soft p-4 text-sm text-accent-strong"
            >
              <CheckCircleIcon className="mt-px shrink-0" />
              {sent.channel === "whatsapp" ? (
                <p>
                  Your message should now be open in WhatsApp, ready to send. If nothing opened,{" "}
                  <a
                    href={sent.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold whitespace-nowrap underline underline-offset-2"
                  >
                    message me on {whatsapp.display}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  .
                </p>
              ) : (
                <p>
                  Your message should now be open in your email app, ready to send. If nothing
                  opened, email me at{" "}
                  <a href={sent.href} className="font-semibold wrap-anywhere underline underline-offset-2">
                    {email}
                  </a>
                  .
                </p>
              )}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  htmlFor: string;
  label: string;
  optional?: boolean;
  error?: string;
  errorId?: string;
  /** Let the control grow to fill spare height (large screens). */
  grow?: boolean;
  className?: string;
  children: ReactNode;
};

function Field({
  htmlFor,
  label,
  optional,
  error,
  errorId,
  grow = false,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn(grow && "lg:flex lg:flex-col", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
        {label}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
      </label>
      <div className={cn("mt-2", grow && "lg:flex lg:flex-1 lg:flex-col")}>{children}</div>
      {error ? (
        <p id={errorId} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
          <AlertIcon className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function composeMessage({
  recipientName,
  name,
  business,
  interest,
  message,
}: {
  recipientName: string;
  name: string;
  business: string;
  interest?: string;
  message: string;
}) {
  const withoutFullStop = (value: string) => value.replace(/[.\s]+$/, "");
  const from = business ? ` from ${withoutFullStop(business)}` : "";
  const greeting = `Hi ${recipientName}, I'm ${withoutFullStop(name)}${from}.`;
  return [greeting, interest ? `I'm interested in: ${interest}` : "", message]
    .filter(Boolean)
    .join("\n\n");
}

/* Small inline icons — kept local so the full icon registry isn't shipped to the browser. */

function SvgIcon({ children, size = 18, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="m6 9 6 6 6-6" />
    </SvgIcon>
  );
}

function MailIcon() {
  return (
    <SvgIcon>
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </SvgIcon>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <SvgIcon size={16} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </SvgIcon>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <SvgIcon size={18} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m16 9-5.5 5.5L8 12" />
    </SvgIcon>
  );
}

function WhatsAppIcon() {
  return (
    <SvgIcon fill="currentColor" stroke="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </SvgIcon>
  );
}
