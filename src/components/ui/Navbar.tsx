import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Menu, X } from "lucide-react";

const services = [
  { href: "/vehicle-branding", label: "Vehicle Branding" },
  { href: "/sign-boards", label: "Sign Boards" },
  { href: "/contravisions", label: "Contravisions" },
  { href: "/custom-stickers", label: "Stickers" },
];

const topLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setServicesMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [servicesOpen]);

  const isServiceActive = services.some((s) => pathname === s.href);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/90 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 h-16 md:h-20">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-28 sm:w-32 md:w-36 h-10 sm:h-12 md:h-14 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/content/logo.png"
                alt="Pro Graphics"
                className="object-contain w-full h-full"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                  isServiceActive
                    ? "text-amber-600"
                    : "text-blue-900 hover:text-amber-600 hover:bg-blue-50/50"
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    servicesOpen && "rotate-180"
                  )}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 z-50">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      to={s.href}
                      onClick={() => setServicesOpen(false)}
                      className={cn(
                        "block px-4 py-2.5 text-sm font-medium transition-colors",
                        pathname === s.href
                          ? "text-amber-600 bg-amber-50/50"
                          : "text-blue-900 hover:text-amber-600 hover:bg-gray-50"
                      )}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {topLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                  pathname === link.href
                    ? "text-amber-600"
                    : "text-blue-900 hover:text-amber-600 hover:bg-blue-50/50"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/general-submission" className="ml-3">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm">
                Submit Enquiry
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            className="lg:hidden p-2.5 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2">
          <div className="px-4 py-4 space-y-1">
            <button
              onClick={() => setServicesMobileOpen(!servicesMobileOpen)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-semibold text-blue-900 hover:bg-gray-50 transition-colors"
            >
              Services
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  servicesMobileOpen && "rotate-180"
                )}
              />
            </button>

            {servicesMobileOpen && (
              <div className="ml-4 space-y-0.5 border-l-2 border-amber-200 pl-3 mb-1">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      pathname === s.href
                        ? "text-amber-600 bg-amber-50/50"
                        : "text-blue-900 hover:bg-gray-50"
                    )}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}

            {topLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-semibold transition-colors",
                  pathname === link.href
                    ? "text-amber-600 bg-amber-50/50"
                    : "text-blue-900 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/general-submission"
              onClick={() => setMobileOpen(false)}
              className="block mt-3"
            >
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                Submit Enquiry
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
