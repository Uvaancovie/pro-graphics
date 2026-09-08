import { Seo } from "@/components/Seo";
import { GeneralSubmissionForm } from "@/components/forms/GeneralSubmissionForm";



export default function GeneralSubmissionPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
            <Seo
                title="General Submission | Pro Graphics Durban"
                description="Submit any enquiry to Pro Graphics Durban. We route your request to the right team for signage, branding, or print projects."
                canonicalUrl="/general-submission"
            />
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
