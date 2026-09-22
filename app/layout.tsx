import type { Metadata } from "next";
import "./globals.css";
import { siteDescription, siteName, siteUrl } from "./site";

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/images/symbiotic-interfaces-square.png`,
  description: siteDescription,
  founder: {
    "@type": "Person",
    name: "Yudai Tanaka",
    url: "https://yudai-tanaka.com/",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Department of Computer Science",
    url: "https://www.cs.utexas.edu/",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "The University of Texas at Austin",
      url: "https://www.utexas.edu/",
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gates-Dell Complex, 2317 Speedway",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78712",
    addressCountry: "US",
  },
  knowsAbout: [
    "human-computer interaction",
    "haptics",
    "neurotechnology",
    "wearable computing",
    "somatosensory neuroscience",
    "cognitive science",
    "robotics",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteName,
    description:
      "Building a symbiotic loop between computing interfaces and human abilities.",
    url: "/",
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteName,
    description:
      "Building a symbiotic loop between computing interfaces and human abilities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      </body>
    </html>
  );
}
