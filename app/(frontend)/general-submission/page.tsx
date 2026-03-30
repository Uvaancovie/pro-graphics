import { Metadata } from "next";
import { GeneralSubmissionForm } from "@/app/components/forms/GeneralSubmissionForm";

export const metadata: Metadata = {
    title: "General Submission | Pro Graphics",
    description:
        "Send a secure general enquiry and choose the type of query you need help with. Built with privacy and security in mind.",
};

export default function GeneralSubmissionPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-950 text-amber-400 px-5 py-2.5 rounded-full mb-6 shadow-lg">
                        <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="font-black uppercase tracking-widest text-xs md:text-sm">Secure enquiry routing</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-blue-950 mb-4">
                        General Submission
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Share the type of query you have and we’ll route it appropriately. Please include only the information needed to help us respond.
                    </p>
                </div>

                <GeneralSubmissionForm />
            </div>
        </main>
    );
}
