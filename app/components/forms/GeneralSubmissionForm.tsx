"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, FileText, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { cn } from "@/lib/utils";
import { generalSubmissionSchema, type GeneralSubmissionFormData } from "@/lib/schemas/general-submission-schema";

const queryOptions = [
    { value: "general-question", label: "General Question", icon: "💬" },
    { value: "quote-request", label: "Quote Request", icon: "🧾" },
    { value: "support-request", label: "Support Request", icon: "🛠️" },
    { value: "privacy-request", label: "Privacy Request", icon: "🛡️" },
    { value: "security-concern", label: "Security Concern", icon: "🔒" },
    { value: "billing", label: "Billing", icon: "💳" },
    { value: "partnership", label: "Partnership", icon: "🤝" },
    { value: "other", label: "Other", icon: "📝" },
];

const urgencyOptions = [
    { value: "low", label: "Low" },
    { value: "normal", label: "Normal" },
    { value: "urgent", label: "Urgent" },
];

export function GeneralSubmissionForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(generalSubmissionSchema),
        defaultValues: {
            urgency: "normal",
            hasSensitiveData: false,
            consentGiven: false,
            noSecretsAcknowledged: false,
        },
    });

    const selectedQueryType = watch("queryType");
    const hasSensitiveData = watch("hasSensitiveData");

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setErrorMsg("");

        try {
            const submitData = {
                ...data,
                consentTimestamp: new Date().toISOString(),
            };

            const response = await fetch("/api/general-submission", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            setIsSuccess(true);
            reset({
                fullName: "",
                email: "",
                company: "",
                urgency: "normal",
                summary: "",
                hasSensitiveData: false,
                noSecretsAcknowledged: false,
                consentGiven: false,
            });
        } catch (error) {
            console.error("General submission error:", error);
            setErrorMsg("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-2">Submission received</h3>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    Thanks. We’ve received your enquiry and will review it using the details you provided.
                    If your message is security- or privacy-related, it will be handled with priority.
                </p>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-950 text-amber-400 px-4 py-2 rounded-full text-sm font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    Compliance-friendly submission
                </div>

                <div>
                    <h2 className="text-3xl md:text-5xl font-black text-blue-950 mb-4">
                        General Submission
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                        Use this form to tell us what type of query you have. Please include only the information needed to respond.
                        Do not submit passwords, payment card details, or other confidential credentials.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {[
                        { icon: <Clock3 className="w-5 h-5" />, title: "Fast triage", text: "We can route your query to the right person quickly." },
                        { icon: <LockKeyhole className="w-5 h-5" />, title: "Safer by design", text: "Built to avoid collecting unnecessary sensitive data." },
                        { icon: <AlertTriangle className="w-5 h-5" />, title: "Security matters", text: "Security and privacy concerns are handled with priority." },
                        { icon: <FileText className="w-5 h-5" />, title: "Clear records", text: "We capture only the context needed to respond well." },
                    ].map((item) => (
                        <Card key={item.title} hover className="border-blue-100 bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-5 flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-950 mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Card className="shadow-2xl border-blue-100 overflow-hidden">
                <CardHeader className="bg-blue-950 text-white p-6 md:p-8">
                    <CardTitle className="text-2xl md:text-3xl text-amber-400">Tell us what you need</CardTitle>
                    <CardDescription className="text-blue-100 text-base mt-2">
                        Select the query type, share the minimum details required, and we’ll take it from there.
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-6 md:p-8 bg-white">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-blue-950 mb-2">Full Name</label>
                                <input
                                    {...register("fullName")}
                                    className={cn(
                                        "w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all bg-white text-blue-950 font-medium placeholder:text-gray-400",
                                        errors.fullName ? "border-red-500" : "border-gray-200"
                                    )}
                                    placeholder="John Doe"
                                />
                                {errors.fullName && <p className="mt-1 text-sm text-red-600 font-bold">{errors.fullName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-blue-950 mb-2">Email Address</label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    className={cn(
                                        "w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all bg-white text-blue-950 font-medium placeholder:text-gray-400",
                                        errors.email ? "border-red-500" : "border-gray-200"
                                    )}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600 font-bold">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-blue-950 mb-2">Company Name <span className="text-gray-500 font-normal">(optional)</span></label>
                                <input
                                    {...register("company")}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all bg-white text-blue-950 font-medium placeholder:text-gray-400"
                                    placeholder="Your company"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-blue-950 mb-2">Priority</label>
                                <select
                                    {...register("urgency")}
                                    className={cn(
                                        "w-full px-4 py-3 border-2 rounded-lg bg-white text-blue-950 font-medium",
                                        errors.urgency ? "border-red-500" : "border-gray-200"
                                    )}
                                >
                                    {urgencyOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.urgency && <p className="mt-1 text-sm text-red-600 font-bold">{errors.urgency.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-blue-950 mb-3">What type of query is this?</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {queryOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className={cn(
                                            "relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md",
                                            selectedQueryType === option.value
                                                ? "border-amber-400 bg-amber-50"
                                                : "border-gray-200 hover:border-blue-900 bg-white"
                                        )}
                                    >
                                        <input {...register("queryType")} type="radio" value={option.value} className="sr-only" />
                                        <span className="text-2xl mr-3">{option.icon}</span>
                                        <span className="font-bold text-sm text-blue-950">{option.label}</span>
                                        {selectedQueryType === option.value && (
                                            <div className="absolute top-2 right-2 w-3 h-3 bg-amber-500 rounded-full" />
                                        )}
                                    </label>
                                ))}
                            </div>
                            {errors.queryType && <p className="mt-2 text-sm text-red-600 font-bold">{errors.queryType.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-blue-950 mb-2">Query Summary</label>
                            <textarea
                                {...register("summary")}
                                rows={5}
                                className={cn(
                                    "w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all bg-white text-blue-950 font-medium placeholder:text-gray-400",
                                    errors.summary ? "border-red-500" : "border-gray-200"
                                )}
                                placeholder="Briefly describe the issue, request, or outcome you need..."
                            />
                            {errors.summary && <p className="mt-1 text-sm text-red-600 font-bold">{errors.summary.message}</p>}
                        </div>

                        <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    {...register("hasSensitiveData")}
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                                />
                                <span className="text-sm text-blue-950">
                                    This query involves personal or sensitive information.
                                </span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    {...register("noSecretsAcknowledged")}
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                                />
                                <span className="text-sm text-blue-950">
                                    I confirm I will not include passwords, card details, or other confidential credentials.
                                </span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    {...register("consentGiven")}
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                                />
                                <span className="text-sm text-blue-950">
                                    I consent to the processing of my personal data as described in the{' '}
                                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold underline">
                                        Privacy Policy
                                    </a>.
                                </span>
                            </label>
                        </div>

                        <div className="space-y-1">
                            {errors.noSecretsAcknowledged && <p className="text-sm text-red-600 font-bold">{errors.noSecretsAcknowledged.message}</p>}
                            {errors.consentGiven && <p className="text-sm text-red-600 font-bold">{errors.consentGiven.message}</p>}
                        </div>

                        {hasSensitiveData && (
                            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                                Sensitive submissions are handled carefully. Please keep the details limited to what is needed for us to help.
                            </div>
                        )}

                        {errorMsg && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                                {errorMsg}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-6 text-lg rounded-xl group relative overflow-hidden bg-blue-950 hover:bg-blue-900 text-white font-bold"
                        >
                            <span className="relative flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Securely
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
