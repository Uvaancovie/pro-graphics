import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '@/app/(frontend)/page';

// Mock the Next.js Link component since we're testing in isolation
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock the Next.js Image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock the components used in the page to simplify the test
vi.mock('@/app/components/ui/Button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock('@/app/components/ui/HeroCarousel', () => ({
  HeroCarousel: () => <div data-testid="hero-carousel">Hero Carousel</div>,
}));

vi.mock('@/app/components/ui/SocialProof', () => ({
  SocialProof: () => <div data-testid="social-proof">Social Proof</div>,
}));

vi.mock('@/app/components/ui/ROICalculatorPromo', () => ({
  ROICalculatorPromo: () => <div data-testid="roi-calculator">ROI Calculator</div>,
}));

describe('HomePage Unit Tests', () => {
  it('renders the core marketing sections successfully', () => {
    render(<HomePage />);

    // Check if mocked child components are rendered
    expect(screen.getByTestId('hero-carousel')).toBeInTheDocument();
    expect(screen.getByTestId('roi-calculator')).toBeInTheDocument();
    expect(screen.getByTestId('social-proof')).toBeInTheDocument();

    // Check if the Trust Indicators are present
    expect(screen.getByText('24hr')).toBeInTheDocument();
    expect(screen.getByText('Quote Response')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();

    // Check for "Why Choose Us" text block
    expect(screen.getByText(/Why Businesses Choose/i)).toBeInTheDocument();
  });
});
