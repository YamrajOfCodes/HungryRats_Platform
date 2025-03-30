// app/layout.tsx - Server Component
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import Script from "next/script";

// Optimize font loading
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

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: {
    default: "Hungryrats - Subscription Food Delivery for Hostelers",
    template: "%s | Hungryrats",
  },
  description:
    "Hungryrats delivers fresh, delicious meals on a subscription basis directly to hostelers. Save time and enjoy quality food with our reliable service.",
  keywords: [
    "food delivery",
    "subscription meals",
    "hostel food",
    "student meals",
    "campus delivery",
    "meal subscription",
    "hungryrats",
  ],
  authors: [{ name: "Hungryrats Team" }],
  creator: "Hungryrats",
  publisher: "Hungryrats Inc.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "Hungryrats - Food Delivery Service for Hostelers",
    description:
      "Subscription-based food delivery service designed for hostelers. Get tasty, affordable meals delivered right to your hostel door.",
    url: "https://www.hungryrats.in",
    siteName: "Hungryrats",
    // images: [
    //   {
    //     url: "/images/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Hungryrats Food Delivery",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hungryrats - Your Subscription-Based Food Delivery",
    description:
      "Hungryrats provides hostelers with a subscription food delivery service, bringing delicious meals right to their door.",
    creator: "@hungryrats",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

};

// Viewport configuration for responsiveness
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hungryrats",
              url: "https://www.hungryrats.in",
         
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+919960322509",
                contactType: "customer service",
                availableLanguage: "English",
              },
              offers: {
                "@type": "Offer",
                description: "Subscription-based food delivery for hostelers",
                price: "Starting at 4299 per month",
              },
            }),
          }}
        />
        
        {/* Optional Analytics Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXX');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}