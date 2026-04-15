import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost Calculator | Pro Graphics",
  description: "Calculate the cost of your canvas prints, split frames, and water labels instantly.",
};

export default function CostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
