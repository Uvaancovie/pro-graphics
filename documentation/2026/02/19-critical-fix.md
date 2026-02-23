# Pro Graphics Website Improvement Plan

## Phase 1: Critical Fixes (Week 1)

### Mobile Experience Optimization
- [ ] **Implement responsive hero carousel**
  - Add swipe gestures for touch devices
  - Optimize image sizes for mobile (< 500KB per image)
  - Test on iOS Safari and Android Chrome
  - Priority: HIGH
  - Estimated time: 4 hours

- [ ] **Fix service card layouts for mobile**
  - Stack comparison tables vertically
  - Ensure touch targets minimum 44px
  - Test material comparison tool on small screens
  - Priority: HIGH
  - Estimated time: 3 hours

### Quote Form Improvements
- [ ] **Add Quick Quote option**
  - Create simplified single-step form (Service + Phone only)
  - Keep existing multi-step as "Detailed Quote"
  - Add toggle between quick/detailed modes
  - Priority: HIGH
  - Estimated time: 6 hours

- [ ] **Implement WhatsApp integration**
  - Add WhatsApp Business API or click-to-chat link
  - Pre-fill message with service context
  - Add floating WhatsApp button (bottom-right)
  - Priority: HIGH
  - Estimated time: 2 hours

- [ ] **Add form progress persistence**
  - Use localStorage to save form state
  - Show "Resume quote" notification for returning users
  - Clear storage on successful submission
  - Priority: MEDIUM
  - Estimated time: 3 hours

---

## Phase 2: Trust & Conversion (Week 2)

### Social Proof Enhancements
- [ ] **Expand before/after gallery**
  - Add slider component to all service pages
  - Include: Vehicle branding, signage, contravisions
  - Optimize images for fast loading (WebP format)
  - Priority: HIGH
  - Estimated time: 5 hours
### Local SEO Implementation
- [ ] **Add structured data markup**
  ```json
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pro Graphics",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "158 Phoenix Industrial Park, 160 Aberdare Dr",
      "addressLocality": "Phoenix",
      "addressRegion": "Durban",
      "postalCode": "4090",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-29.7041",
      "longitude": "31.0000"
    }
  }