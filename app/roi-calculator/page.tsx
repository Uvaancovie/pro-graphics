import CalculatorComponent from './CalculatorComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fleet Branding ROI Calculator | Pro Graphics Durban',
    description: 'Calculate exactly how much revenue and brand visibility your unbranded fleet is losing daily on Durban roads. Try our free ROI calculator.',
};

export default function ROICalculatorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-gray-50 pt-32 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 font-bold text-sm px-4 py-2 rounded-full border border-amber-500/30 mb-6">
                        🔥 FREE TOOL — LIMITED ACCESS
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
                        Fleet Branding <span className="text-amber-500">ROI Calculator</span>
                    </h1>
                    <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                        Find out exactly how much visibility and brand value your unbranded fleet is bleeding every month on Durban roads based on 2026 traffic data.
                    </p>
                </div>

                <CalculatorComponent />

            </div>
        </div>
    );
}
