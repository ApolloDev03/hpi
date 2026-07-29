import type { Metadata } from "next";
import {
  Allura,
  Cormorant_Garamond,
  Montserrat,
  Oswald,
} from "next/font/google";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});



export const metadata: Metadata = {
  title: "HPI Studio",
  description:
    "HPI Studio creates thoughtful architecture and interior spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${montserrat.variable}
         
          font-sans font-light
        `}
      >
        {children}
      </body>
    </html>
  );
}