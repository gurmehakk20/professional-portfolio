"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonStyles } from "@/components/ui/button-styles";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

// This page replaces the root layout, so it applies the site's fonts and styles itself.

type GlobalErrorProps = {
  error: Error & { digest?: string };
  /** Re-fetches and re-renders the page that failed. */
  retry: () => void;
};

/** Shown only if the root layout itself fails to render. */
export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-dvh items-center">
        <title>Something went wrong</title>
        <main className="mx-auto w-full max-w-xl px-5 py-16 text-center sm:px-8">
          <p className="text-eyebrow font-semibold text-accent uppercase">Error</p>
          <h1 className="mt-3 text-h1 font-semibold">Something went wrong</h1>
          <p className="mt-4 text-lead text-muted">
            Sorry, the site didn’t load properly. Please try again in a moment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => retry()} className={buttonStyles()}>
              Try Again
            </button>
            <Link href="/" className={buttonStyles({ variant: "secondary" })}>
              Back to Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
