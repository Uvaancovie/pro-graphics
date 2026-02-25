'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/Button';
import { FileText, ArrowRight, CheckCircle2, User, Mail, Building } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    company: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function LeadCaptureForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setErrorMsg('');

        try {
            const response = await fetch('/api/lead-capture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setIsSuccess(true);
        } catch (error) {
            console.error('Submission error:', error);
            setErrorMsg('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-green-50/10 border border-green-500/20 rounded-2xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Guide Sent!</h3>
                <p className="text-gray-300">
                    We've sent the "10 Signage Mistakes Guide" to your email. Check your inbox (and spam folder) in a few minutes!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-200 ml-1">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-white placeholder:text-gray-500"
                        />
                    </div>
                    {errors.name && <p className="text-red-400 text-sm mt-1 ml-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-200 ml-1">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="john@company.com"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-white placeholder:text-gray-500"
                        />
                    </div>
                    {errors.email && <p className="text-red-400 text-sm mt-1 ml-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-200 ml-1">Company Name (Optional)</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            {...register('company')}
                            type="text"
                            placeholder="Acme Corp"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-white placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {errorMsg && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {errorMsg}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg rounded-xl group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center justify-center font-bold">
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Sending...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 text-white">
                                <FileText className="w-5 h-5" />
                                Get the Free Guide Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                    </span>
                </Button>
            </form>
        </div>
    );
}
