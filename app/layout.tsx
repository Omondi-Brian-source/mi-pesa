import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";
const siteName = "Mi-Pesa";
const siteDescription =
  "A modern, optimized web application built with Next.js 16, React 19, and Tailwind CSS.";

export const metadata: Metadata = {
  metadataBase: new URL(siteURL),
  title: {
    default: `${siteName} - Modern Web Application`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  generator: "Next.js 16",
  applicationName: siteName,
  referrer: "strict-origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Web Application",
    "Performance",
  ],
  authors: [
    {
      name: "Development Team",
      url: siteURL,
    },
  ],
  creator: "Development Team",
  publisher: "Mi-Pesa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteURL,
    title: `${siteName} - Modern Web Application`,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${siteURL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteName,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Modern Web Application`,
    description: siteDescription,
    images: [`${siteURL}/twitter-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <link rel="canonical" href={siteURL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: siteName,
              description: siteDescription,
              url: siteURL,
              applicationCategory: "WebApplication",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
