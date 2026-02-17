"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function AccordionItem({
    title,
    children,
    defaultOpen = false,
}: AccordionItemProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-3 transition-all duration-300 hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 text-left bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-300 flex items-center justify-between group"
            >
                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {title}
                </span>
                <svg
                    className={cn(
                        "w-5 h-5 text-gray-500 transition-transform duration-300",
                        isOpen && "rotate-180"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96" : "max-h-0"
                )}
            >
                <div className="px-6 py-4 bg-white text-gray-700 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}

interface AccordionProps {
    children: React.ReactNode;
    className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
    return <div className={cn("space-y-2", className)}>{children}</div>;
}
