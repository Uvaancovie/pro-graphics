import { Metadata } from 'next';
import { LeadCaptureForm } from '@/app/components/forms/LeadCaptureForm';
import { ShieldAlert, TrendingUp, Wallet, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: '10 Costly Signage Mistakes & How to Avoid Them | Pro Graphics',
    description: 'Download our free guide to discover the 10 most common signage mistakes that are costing your business money, and learn how to fix them.',
    openGraph: {
        title: '10 Costly Signage Mistakes & How to Avoid Them',
        description: 'Download out free guide and ensure your brand stands out for all the right reasons.',
        images: [{ url: '/roi-calculator-current.png', width: 1200, height: 630, alt: 'Signage Mistakes Guide' }],
    },
};

const benefits = [
    {
        icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
        title: 'Avoid Common Pitfalls',
        description: 'Learn the exact mistakes that make vehicle wraps and shopfront signs fail prematurely.',
    },
    {
        icon: <Wallet className="w-6 h-6 text-green-500" />,
        title: 'Save Wasted Money',
        description: 'Stop paying twice for bad signage. We show you what materials and finishes actually last.',
    },
    {
        icon: <TrendingUp className="w-6 h-6 text-primary" />,
        title: 'Maximize Brand Impact',
        description: 'Ensure your signage turns heads, captures attention, and brings in qualified leads.',
    },
];

const highlights = [
    "The 'Cheap Material' Trap and why it costs you 3x more",
    "Why your phone number is invisible from 20 meters away",
    "The #1 mistake people make when designing vehicle wraps",
    "How bad lighting ruins expensive signage at night",
];

export default function SignageMistakesPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 pt-24 pb-16">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />

            {/* Glow Effects */}
            <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column - Copy */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 animate-fade-in">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-sm font-medium text-gray-300">Free PDF Guide</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                                Are You Making These <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">10 Costly Signage Mistakes?</span>
                            </h1>

                            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                                Bad signage doesn't just look unprofessional—it costs you customers every single day. Download our exclusive guide to uncover the 10 most common mistakes and learn how to ensure your brand stands out out perfectly.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold border-b border-white/10 pb-2">Inside the Guide:</h3>
                            <ul className="space-y-4">
                                {highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start text-gray-300">
                                        <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-lg">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="space-y-3">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                        {benefit.icon}
                                    </div>
                                    <h4 className="font-semibold text-white">{benefit.title}</h4>
                                    <p className="text-sm text-gray-400">{benefit.description}</p>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:pl-8 lg:mt-0 mt-12 w-full max-w-md mx-auto lg:max-w-full">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-[2rem] blur-xl opacity-20 animate-pulse" />
                            <div className="bg-gray-950 border border-white/10 rounded-[2rem] p-8 relative shadow-2xl">
                                <div className="text-center mb-8">
                                    <h3 className="text-3xl font-bold text-white mb-3">Where should we send it?</h3>
                                    <p className="text-gray-400">Enter your details below to get instant access to the PDF guide.</p>
                                </div>

                                <LeadCaptureForm />

                                <p className="text-xs text-gray-500 text-center mt-6">
                                    By downloading, you agree to receive marketing emails from Pro Graphics. We respect your privacy and will never share your information.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
