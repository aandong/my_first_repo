import type { Metadata } from "next";
import { Roboto, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-roboto",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project Alpha — Prototype Preview",
  description:
    "A bold new product in early development. Get early access to Project Alpha, built for creators who want to shape the future.",
  openGraph: {
    title: "Project Alpha — Prototype Preview",
    description:
      "A bold new product in early development. Get early access.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Germania+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${roboto.variable} ${jetbrainsMono.variable}`}
        style={{ fontFamily: "var(--font-roboto), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
