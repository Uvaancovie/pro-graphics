import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/app/components/ui/Navbar";
import PromotionBanner from "@/app/components/ui/PromotionBanner";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pro Graphics",
    "image": "https://pro-graphics.co.za/images/content/logo.png",
    "description": "Professional printing, signage, and vehicle branding services in Durban.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "160 Aberdare Dr, 158 Phoenix Industrial Park",
      "addressLocality": "Phoenix Industrial",
      "addressRegion": "Durban",
      "postalCode": "4090",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -29.7, // Approximate coordinates for Phoenix Industrial Park
      "longitude": 31.0
    },
    "url": "https://pro-graphics.co.za",
    "telephone": "+27659424036",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "16:45"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "52"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Siyabonga Patrick"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Friendly place to meet up with stuff. They are friendly. Great service and attention to detail on my signs."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "karriem simons"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Excellent quality vehicle branding. The team was professional and the finish was perfect. Highly recommended."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-50">
        <PromotionBanner />
        <Navbar />
      </header>

      <div className="flex-grow">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-16 border-t-4 border-amber-500">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="relative w-40 h-12 mb-4">
                <Image
                  src="/images/content/logo.png"
                  alt="Pro Graphics Logo"
                  fill
                  className="object-contain brightness-0 invert opacity-90"
                />
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Durban's trusted partner for high-quality printing, vehicle branding, and corporate signage solutions.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-amber-400">Our Services</h4>
              <ul className="space-y-3 text-sm text-blue-100">
                <li><Link href="/vehicle-branding" className="hover:text-white hover:translate-x-1 transition-all inline-block">Vehicle Branding</Link></li>
                <li><Link href="/sign-boards" className="hover:text-white hover:translate-x-1 transition-all inline-block">Custom Sign Boards</Link></li>
                <li><Link href="/contravisions" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contravision Graphics</Link></li>
                <li><Link href="/custom-stickers" className="hover:text-white hover:translate-x-1 transition-all inline-block">Vinyl Stickers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-amber-400">Quick Links</h4>
              <ul className="space-y-3 text-sm text-blue-100">
                <li><Link href="/general-submission" className="hover:text-white hover:translate-x-1 transition-all inline-block">General Submission</Link></li>
                <li><Link href="/quote" className="hover:text-white hover:translate-x-1 transition-all inline-block">Request a Quote</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Portfolio Gallery</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">About Us</Link></li>
                <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-amber-400">Contact Us</h4>
              <ul className="space-y-4 text-sm text-blue-100">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 mt-1">Address</span>
                  <span>
                    158 Phoenix Industrial Park,<br />
                    160 Aberdare Dr, Phoenix,<br />
                    Durban, 4090
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-amber-500">Phone</span>
                  <span><a href="tel:0659424036" className="hover:text-white transition-colors">065 9424 036</a></span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-amber-500">Hours</span>
                  <span>Mon - Fri: 8:00 AM - 4:45 PM</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-amber-500">Email</span>
                  <a href="mailto:gdesigners14@gmail.com" className="hover:text-white transition-colors">gdesigners14@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-900 mt-12 pt-8 text-center text-sm text-blue-400 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Pro Graphics. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/27659424036"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span className="absolute right-full mr-3 bg-black text-white px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us
        </span>
      </a>
    </>
  );
}
