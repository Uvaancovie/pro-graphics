"use client";

import { Accordion, AccordionItem } from "@/app/components/ui/Accordion";

const faqs = [
    {
        question: "How long does a vehicle wrap last?",
        answer: "Our premium 3M and Avery Dennison cast vinyl wraps typically last 5-7 years with proper care. We provide a full 3-year warranty on installation and materials for your peace of mind.",
    },
    {
        question: "Will the wrap damage my paint?",
        answer: "No, in fact, it protects it! The vinyl acts as a shield against UV rays, stone chips, and minor scratches. When removed professionally, your original paint will look as good as the day it was wrapped.",
    },
    {
        question: "How should I wash my wrapped vehicle?",
        answer: "Hand washing is best. Avoid automated car washes with stiff brushes, as they can lift edges or scratch the film. Use a mild detergent and soft cloth. We'll provide a detailed care kit with your wrap.",
    },
    {
        question: "How long does the installation take?",
        answer: "A full wrap typically takes 2-3 days to ensure proper application and curing. Partial wraps can often be done in 1 day. We can arrange a courtesy car or pickup/drop-off service if needed.",
    },
    {
        question: "Do you design the graphics?",
        answer: "Yes! We have an in-house team of expert vehicle styling designers. We'll create digital mockups on your specific vehicle model so you can see exactly how it will look before we print anything.",
    },
];

export function VehicleCareGuide() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-blue-950 mb-4">
                        Vehicle Wrap <span className="text-amber-500">Care & FAQs</span>
                    </h2>
                    <p className="text-xl text-blue-800/70">
                        Everything you need to know about protecting your investment
                    </p>
                </div>

                <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100 mb-12">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-blue-950 mb-2">Pro Tip: Resale Value</h3>
                            <p className="text-gray-600 leading-relaxed">
                                A full vehicle wrap protects your OEM paint from sun damage and scratches. When you're ready to sell your fleet vehicles, simply remove the wrap to reveal pristine paint underneath, significantly increasing resale value.
                            </p>
                        </div>
                    </div>
                </div>

                <Accordion className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            title={faq.question}
                        >
                            {faq.answer}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
