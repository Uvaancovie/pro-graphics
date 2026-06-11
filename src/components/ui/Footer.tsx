import { Link } from "react-router-dom";

const serviceLinks = [
  { href: "/vehicle-branding", label: "Vehicle Branding" },
  { href: "/sign-boards", label: "Sign Boards" },
  { href: "/contravisions", label: "Contravisions" },
  { href: "/custom-stickers", label: "Stickers" },
  { href: "/custom-canvas", label: "Custom Canvas" },
];

const quickLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/general-submission", label: "Submit Enquiry" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/content/logo.png"
                alt="Pro Graphics"
                className="h-14 w-auto opacity-90"
              />
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed">
              Durban's premier printing and signage specialists. Vehicle wraps, sign boards,
              contravisions, stickers, and custom canvas — all crafted in-house.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 uppercase tracking-wider text-sm mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-blue-200 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 uppercase tracking-wider text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-blue-200 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 uppercase tracking-wider text-sm mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-blue-200">
              <li>
                <a
                  href="tel:0659424036"
                  className="hover:text-amber-400 transition-colors"
                >
                  065 9424 036
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27659424036"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-blue-300">
                Durban, South Africa
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-800/50 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-400">
          <p>&copy; {year} Pro Graphics. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <a
              href="https://wa.me/27659424036"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
