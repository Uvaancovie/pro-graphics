import { Routes, Route } from 'react-router-dom';
import Page0 from './pages/black-roof-wraps/page';
import Page1 from './pages/blog/page';
import Page2 from './pages/blog/[slug]/page';
import Page3 from './pages/branding-blueprint/page';
import Page4 from './pages/canvas-shop/page';
import Page5 from './pages/canvas-shop/[slug]/page';
import Page6 from './pages/case-studies/page';
import Page7 from './pages/contravisions/page';
import Page8 from './pages/cost-calculator/page';
import Page9 from './pages/custom-canvas/page';
import Page10 from './pages/custom-stickers/page';
import Page11 from './pages/custom-wallpaper/page';
import Page12 from './pages/gallery/page';
import Page13 from './pages/general-submission/page';
import Page14 from './pages/laminex-headlight-film/page';
import Page15 from './pages/page';
import Page16 from './pages/price-beat/page';
import Page17 from './pages/pricing-estimator/page';
import Page18 from './pages/products/page';
import Page19 from './pages/products/[id]/page';
import Page20 from './pages/quote/page';
import Page21 from './pages/roi-calculator/page';
import Page22 from './pages/sign-boards/page';
import Page23 from './pages/signage-mistakes/page';
import Page24 from './pages/vehicle-branding/page';
import Page25 from './pages/vehicle-branding/[area]/page';
import WorldCupPage from './pages/world-cup/page';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 md:pt-24">
        <Routes>
        <Route path="/black-roof-wraps" element={<Page0 />} />
        <Route path="/blog" element={<Page1 />} />
        <Route path="/blog/:slug" element={<Page2 />} />
        <Route path="/branding-blueprint" element={<Page3 />} />
        <Route path="/canvas-shop" element={<Page4 />} />
        <Route path="/canvas-shop/:slug" element={<Page5 />} />
        <Route path="/case-studies" element={<Page6 />} />
        <Route path="/contravisions" element={<Page7 />} />
        <Route path="/cost-calculator" element={<Page8 />} />
        <Route path="/custom-canvas" element={<Page9 />} />
        <Route path="/custom-stickers" element={<Page10 />} />
        <Route path="/custom-wallpaper" element={<Page11 />} />
        <Route path="/gallery" element={<Page12 />} />
        <Route path="/general-submission" element={<Page13 />} />
        <Route path="/laminex-headlight-film" element={<Page14 />} />
        <Route path="/" element={<Page15 />} />
        <Route path="/price-beat" element={<Page16 />} />
        <Route path="/pricing-estimator" element={<Page17 />} />
        <Route path="/products" element={<Page18 />} />
        <Route path="/products/:id" element={<Page19 />} />
        <Route path="/quote" element={<Page20 />} />
        <Route path="/roi-calculator" element={<Page21 />} />
        <Route path="/sign-boards" element={<Page22 />} />
        <Route path="/signage-mistakes" element={<Page23 />} />
        <Route path="/vehicle-branding" element={<Page24 />} />
        <Route path="/vehicle-branding/:area" element={<Page25 />} />
        <Route path="/world-cup" element={<WorldCupPage />} />

        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;