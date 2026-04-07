import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page and have correct title', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Next.js default or custom title. Adjust based on metadata in layout.tsx.
    await expect(page).toHaveTitle(/Pro Graphics | Signage \& Vehicle Branding Durban/i);
    
    // Check if the Hero section is visible by targeting a known heading or button
    const ctaButton = page.locator('a[href="/quote"]');
    await expect(ctaButton.first()).toBeVisible();
  });
});
