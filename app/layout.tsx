import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pro-graphics.co.za"),
  title: {
    default: "Pro Graphics | Professional Printing, Signage & Vehicle Branding Durban",
    template: "%s | Pro Graphics Durban"
  },
  description: "Durban's premier printing and signage company in Phoenix Industrial Park. Specialists in vehicle branding, custom signs, stickers, banners, and promotional materials. Get high-quality, affordable branding with 24hr quotes. Call 065 9424 036.",
  keywords: ["printing company Durban", "vehicle branding Phoenix", "signage Durban", "custom stickers Durban", "Pro Graphics", "Phoenix Industrial Park printers", "car wraps Durban", "sign boards Durban", "branded office signage"],
  icons: {
    icon: '/images/content/logo.png',
    shortcut: '/images/content/logo.png',
    apple: '/images/content/logo.png',
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://pro-graphics.co.za",
    title: "Pro Graphics | Professional Printing & Signage Durban",
    description: "Premium vehicle branding, custom signs, and printing services in Durban. Specialists in quality visual marketing.",
    siteName: "Pro Graphics",
    images: [
      {
        url: "/images/content/logo.png",
        width: 1200,
        height: 630,
        alt: "Pro Graphics Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Graphics | Professional Printing & Signage Durban",
    description: "Premium vehicle branding, custom signs, and printing services in Durban.",
    images: ["/images/content/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased min-h-screen flex flex-col font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
