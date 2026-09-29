"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonStyles } from "@/components/ui/button-styles";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

type ErrorPageProps = {
  error: Error & { digest?: string };
  /** Re-fetches and re-renders the page that failed. */
  retry: () => void;
};

/** Shown if a page fails to load. The header and footer stay in place. */
export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    // Logs to the browser console; connect an error-reporting service here if you add one.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center py-20 md:py-28 lg:py-32">
      <SectionHeader
        as="h1"
        align="center"
        eyebrow="Error"
        title="Something went wrong"
        description="Sorry, this page didn’t load properly. Please try again in a moment."
      />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => retry()} className={buttonStyles()}>
          Try Again
        </button>
        <Link href="/" className={buttonStyles({ variant: "secondary" })}>
          Back to Home
        </Link>
      </div>
    </Container>
  );
}
