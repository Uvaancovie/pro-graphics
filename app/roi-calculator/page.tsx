import CalculatorComponent from './CalculatorComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fleet Branding ROI Calculator | Pro Graphics Durban',
    description: 'Calculate exactly how much revenue and brand visibility your unbranded fleet is losing daily on Durban roads. Try our free ROI calculator.',
};

export default function ROICalculatorPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-950 mb-6">
                        Fleet Branding ROI Calculator
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find out exactly how much visibility and brand value your unbranded fleet is bleeding every month on Durban roads based on 2026 traffic data.
                    </p>
                </div>

                <CalculatorComponent />

            </div>
        </div>
    );
}
