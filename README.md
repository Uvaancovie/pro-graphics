# Pro Graphics - Durban's Premier Printing & Signage Solutions

Pro Graphics is a high-end web application for a Durban-based printing and signage company positioned in Phoenix Industrial Park. The platform showcases premium services including vehicle branding, custom signage, and window graphics, with a strong focus on ROI-driven branding and automated lead generation.

## 🚀 Vision & Branding

The application follows a strict **Blue & Gold** branding palette (Blue 900/950 and Amber 400/500/600) designed to convey professionalism, trust, and premium quality. The typography is built on the **Poppins** family, utilizing Light and Bold weights to create a clean, modern aesthetic.

## ✨ Key Features

- **Dynamic Hero Experience**: High-impact carousel showcasing real-world projects and a value-first ROI calculator.
- **ROI Calculator**: Interactive tool for businesses to estimate daily impressions and revenue impact from vehicle branding.
- **Service Pages**: Comprehensive niche-specific pages for Vehicle Branding, Sign Boards, Contravisions, and Custom Stickers.
- **Price Beat Guarantee**: Dedicated offer page with integrated lead capture and file upload for competitive quotes.
- **Lead Magnet System**: Strategy-driven funnel using Hormozi's "$100M Leads" framework to capture and nurture prospects.
- **CRM Integration**: Automated lead sync with Brevo CRM for transactional email workflows and contact management.
- **Interactive Gallery**: Portfolio with lightbox viewer displaying 10+ years of successfully completed projects.
- **Smart Quote System**: Multi-step quote form with dynamic routing and Supabase-backed data persistence.
- **SEO Optimized**: Advanced metadata, JSON-LD (LocalBusiness), and automated sitemap/robots.txt generation for maximum search visibility.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Email/CRM**: [Brevo](https://www.brevo.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
app/
├── (services)/          # niche service pages (vehicle-branding, sign-boards, etc.)
├── api/                 # Lead capture and CRM integration routes
├── auth/                # Supabase magic link authentication flow
├── blog/                # Educational content and branding guides
├── gallery/             # Interactive portfolio
├── price-beat/          # High-conversion offer page
├── roi-calculator/      # ROI-driven lead magnet tool
├── quote/               # Main multi-step lead funnel
├── components/          # Design system and business logic
│   ├── ui/              # Primitive components (Button, Card, Carousel)
│   └── ...              # Domain-specific components
└── layout.tsx           # Global configuration and viewport/SEO metadata

public/
└── images/
    ├── content/         # actual logo and project photography
    └── ads/             # marketing-specific imagery
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📈 SEO & Business Details

- **Location**: 158 Phoenix Industrial Park, 160 Aberdare Dr, Phoenix, Durban, 4090.
- **Phone**: 067 0897 759 / 065 9424 036
- **Email**: <gdesigners14@gmail.com>
- **Hours**: Mon - Fri: 8:00 AM - 4:45 PM

The site utilizes `next/metadata` for page-specific titles and descriptions tailored to "Printing Durban" and "Vehicle Branding South Africa" keywords.

## 📄 License

Internal Project - All Rights Reserved by Pro Graphics.
