import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isExternalHref } from "@/lib/links";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./button-styles";
import { Icon, type IconName } from "./icon";

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon before the label. */
  icon?: IconName;
  /** Icon after the label, e.g. "arrow-right". */
  trailingIcon?: IconName;
  children: ReactNode;
};

/**
 * A link styled as a button. Internal paths use next/link; web links open
 * in a new tab; mailto: and tel: links open the relevant app.
 */
export function ButtonLink({
  href,
  variant,
  size,
  icon,
  trailingIcon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className: cn("group", className) });
  const content = (
    <>
      {icon ? <Icon name={icon} size={18} /> : null}
      {children}
      {trailingIcon ? (
        <Icon
          name={trailingIcon}
          size={18}
          className="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (isExternalHref(href)) {
    const opensNewTab = /^(https?:)?\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {content}
        {opensNewTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
