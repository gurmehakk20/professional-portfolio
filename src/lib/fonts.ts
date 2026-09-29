import { Inter, Manrope } from "next/font/google";

/*
 * The site's fonts, loaded once and shared by the root layout and the
 * global error page (loading them in both would duplicate the font CSS).
 * To change fonts, swap these for any Google font and keep the variable names.
 * Share images (Open Graph) use their own copies in src/assets/fonts/.
 */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

/** Class names that expose the fonts as CSS variables. Put them on <html>. */
export const fontVariables = `${inter.variable} ${manrope.variable}`;
