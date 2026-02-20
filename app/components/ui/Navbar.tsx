"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/Button";

const navLinks = [
    { href: "/vehicle-branding", label: "Vehicle Branding" },
    { href: "/sign-boards", label: "Sign Boards" },
    { href: "/contravisions", label: "Contravisions" },
    { href: "/custom-stickers", label: "Stickers" },
    { href: "/gallery", label: "Gallery" }, // New Gallery Link
    { href: "/blog", label: "Blog" },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-blue-100 h-24">
            <div className="container mx-auto px-4 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4 group relative h-full py-2">
                        <div className="relative w-48 h-full transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/images/content/logo.png"
                                alt="Pro Graphics - Professional Printing & Signage"
                                fill
                                className="object-contain" // Preserves aspect ratio
                                priority
                                sizes="(max-width: 768px) 150px, 200px"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "font-medium transition-colors border-b-2 py-1",
                                    pathname === link.href
                                        ? "text-amber-600 border-amber-600"
                                        : "text-blue-900 hover:text-amber-600 border-transparent hover:border-amber-400"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/quote">
                            <Button className="bg-gradient-to-r from-blue-900 to-blue-800 text-amber-400 px-6 py-3 rounded-lg font-bold hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-amber-500/20 hover:scale-105 border border-amber-500/30">
                                Get Free Quote
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-blue-900 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-24 left-0 right-0 bg-white border-b border-gray-200 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "block py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                                    pathname === link.href
                                        ? "bg-blue-50 text-amber-600"
                                        : "text-blue-900 hover:bg-gray-50"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-100">
                            <Link href="/quote" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-blue-900 text-amber-400 font-bold py-4 text-lg">
                                    Get Free Quote
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
