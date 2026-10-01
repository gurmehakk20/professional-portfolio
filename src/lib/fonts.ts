import { Inter, Plus_Jakarta_Sans } from "next/font/google";

/*
 * The site's fonts, loaded once and shared by the root layout and the
 * global error page (loading them in both would duplicate the font CSS).
 * Plus Jakarta Sans for headings, Inter for body text.
 * To change fonts, swap these for any Google font and keep the variable names.
 * Share images (Open Graph) use their own copies in src/assets/fonts/.
 */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

/** Class names that expose the fonts as CSS variables. Put them on <html>. */
export const fontVariables = `${inter.variable} ${jakarta.variable}`;
