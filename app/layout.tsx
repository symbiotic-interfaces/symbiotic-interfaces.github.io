import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://symbiotic-interfaces-lab.yudaitanaka.chatgpt.site",
  ),
  title: {
    default: "Symbiotic Interfaces Lab",
    template: "%s · Symbiotic Interfaces Lab",
  },
  description:
    "Symbiotic Interfaces Lab at UT Austin builds a symbiotic loop between computing interfaces and human abilities.",
  keywords: [
    "human-computer interaction",
    "haptics",
    "brain-computer interfaces",
    "nervous system",
    "UT Austin",
    "Yudai Tanaka",
  ],
  icons: {
    icon: "/images/symbiotic-interfaces-square.png",
    shortcut: "/images/symbiotic-interfaces-square.png",
    apple: "/images/symbiotic-interfaces-square.png",
  },
  openGraph: {
    title: "Symbiotic Interfaces Lab",
    description:
      "Building a symbiotic loop between computing interfaces and human abilities.",
    type: "website",
    images: [{ url: "/og-v4.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Symbiotic Interfaces Lab",
    description:
      "Building a symbiotic loop between computing interfaces and human abilities.",
    images: ["/og-v4.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
