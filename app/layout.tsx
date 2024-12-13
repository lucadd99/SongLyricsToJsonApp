"use client";

import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Songs lyrics and chords to Json</title>
      <body className="bg-[#18181b]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
