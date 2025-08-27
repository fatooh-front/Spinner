import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Cairo } from "next/font/google";

import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "تأجير السيارات - فرع الجزيرة مكة",
  description: "خدمة تأجير السيارات في مكة المكرمة",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <style>{`
html {
  font-family: ${cairo.style.fontFamily}, ${GeistSans.style.fontFamily}, 'Segoe UI', Tahoma, Arial, sans-serif;
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
