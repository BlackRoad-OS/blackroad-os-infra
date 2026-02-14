import { test, expect, Page } from '@playwright/test';

/**
 * Comprehensive E2E Test Template (Playwright)
 *
 * Tests complete user journeys across:
 * - User authentication
 * - Form submissions
 * - Navigation flows
 * - Payment processing
 * - Mobile responsiveness
 * - Cross-browser compatibility
 */

// Test configuration
test.describe.configure({ mode: 'parallel' });

// Helper functions
async function login(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
}

async function logout(page: Page) {
  await page.click('[data-testid="user-menu"]');
  await page.click('text=Logout');
  await page.waitForURL('/');
}

test.describe('E2E Tests - [Feature Name]', () => {
  // ===== AUTHENTICATION FLOWS =====
  test.describe('Authentication', () => {
    test('should register new user', async ({ page }) => {
      await page.goto('/register');

      // Fill registration form
      await page.fill('input[name="email"]', 'newuser@example.com');
      await page.fill('input[name="name"]', 'New User');
      await page.fill('input[name="password"]', 'SecurePass123!');
      await page.fill('input[name="confirmPassword"]', 'SecurePass123!');

      // Submit
      await page.click('button[type="submit"]');

      // Verify success
      await expect(page).toHaveURL('/verify-email');
      await expect(page.locator('text=Check your email')).toBeVisible();
    });

    test('should show validation errors', async ({ page }) => {
      await page.goto('/register');

      // Submit empty form
      await page.click('button[type="submit"]');

      // Verify error messages
      await expect(page.locator('text=Email is required')).toBeVisible();
      await expect(page.locator('text=Password is required')).toBeVisible();
    });

    test('should login existing user', async ({ page }) => {
      await page.goto('/login');

      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', 'password123');
      await page.click('button[type="submit"]');

      await expect(page).toHaveURL('/dashboard');
      await expect(page.locator('text=Welcome back')).toBeVisible();
    });

    test('should show error on invalid credentials', async ({ page }) => {
      await page.goto('/login');

      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', 'wrongpassword');
      await page.click('button[type="submit"]');

      await expect(page.locator('text=Invalid credentials')).toBeVisible();
    });

    test('should reset password', async ({ page }) => {
      // Request reset
      await page.goto('/forgot-password');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.click('button[type="submit"]');

      await expect(page.locator('text=Reset link sent')).toBeVisible();

      // TODO: Click email link and complete reset
    });

    test('should logout user', async ({ page }) => {
      await login(page, 'test@example.com', 'password123');
      await logout(page);

      await expect(page).toHaveURL('/');
    });
  });

  // ===== NAVIGATION FLOWS =====
  test.describe('Navigation', () => {
    test('should navigate between pages', async ({ page }) => {
      await page.goto('/');

      // Click navigation links
      await page.click('a[href="/about"]');
      await expect(page).toHaveURL('/about');

      await page.click('a[href="/pricing"]');
      await expect(page).toHaveURL('/pricing');

      await page.click('a[href="/contact"]');
      await expect(page).toHaveURL('/contact');
    });

    test('should use browser back/forward', async ({ page }) => {
      await page.goto('/');
      await page.goto('/about');
      await page.goto('/pricing');

      await page.goBack();
      await expect(page).toHaveURL('/about');

      await page.goForward();
      await expect(page).toHaveURL('/pricing');
    });

    test('should handle 404 pages', async ({ page }) => {
      await page.goto('/nonexistent-page');
      await expect(page.locator('text=404')).toBeVisible();
      await expect(page.locator('text=Page not found')).toBeVisible();
    });

    test('should redirect unauthenticated users', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page).toHaveURL('/login');
    });

    test('should preserve return URL after login', async ({ page }) => {
      await page.goto('/dashboard');
      // Redirected to login
      await login(page, 'test@example.com', 'password123');
      // Should return to dashboard
      await expect(page).toHaveURL('/dashboard');
    });
  });

  // ===== FORM SUBMISSIONS =====
  test.describe('Forms', () => {
    test('should submit contact form', async ({ page }) => {
      await page.goto('/contact');

      await page.fill('input[name="name"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('textarea[name="message"]', 'Test message');

      await page.click('button[type="submit"]');

      await expect(page.locator('text=Message sent')).toBeVisible();
    });

    test('should validate form fields', async ({ page }) => {
      await page.goto('/contact');

      // Invalid email
      await page.fill('input[name="email"]', 'invalid-email');
      await page.click('button[type="submit"]');

      await expect(page.locator('text=Invalid email')).toBeVisible();
    });

    test('should auto-save draft', async ({ page }) => {
      await login(page, 'test@example.com', 'password123');
      await page.goto('/new-post');

      // Type content
      await page.fill('input[name="title"]', 'Draft Post');
      await page.fill('textarea[name="content"]', 'Draft content');

      // Wait for auto-save
      await page.waitForTimeout(2000);

      // Verify draft saved indicator
      await expect(page.locator('text=Draft saved')).toBeVisible();
    });

    test('should handle file upload', async ({ page }) => {
      await login(page, 'test@example.com', 'password123');
      await page.goto('/upload');

      // Upload file
      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles('path/to/test/file.txt');

      await page.click('button[type="submit"]');

      await expect(page.locator('text=Upload successful')).toBeVisible();
    });

    test('should show upload progress', async ({ page }) => {
      await login(page, 'test@example.com', 'password123');
      await page.goto('/upload');

      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles('path/to/large/file.zip');

      await page.click('button[type="submit"]');

      // Verify progress bar appears
      await expect(page.locator('[role="progressbar"]')).toBeVisible();
    });
  });

  // ===== SEARCH FUNCTIONALITY =====
  test.describe('Search', () => {
    test('should search and display results', async ({ page }) => {
      await page.goto('/');

      await page.fill('input[name="search"]', 'test query');
      await page.press('input[name="search"]', 'Enter');

      await expect(page).toHaveURL(/.*search\?q=test\+query/);
      await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
    });

    test('should filter search results', async ({ page }) => {
      await page.goto('/search?q=test');

      // Apply filters
      await page.click('input[name="filter-recent"]');
      await page.click('select[name="category"]');
      await page.click('option[value="tech"]');

      // Verify filtered results
      await expect(page).toHaveURL(/.*filter=recent/);
    });

    test('should show no results message', async ({ page }) => {
      await page.goto('/');

      await page.fill('input[name="search"]', 'nonexistentquery12345');
      await page.press('input[name="search"]', 'Enter');

      await expect(page.locator('text=No results found')).toBeVisible();
    });

    test('should have search autocomplete', async ({ page }) => {
      await page.goto('/');

      await page.fill('input[name="search"]', 'tes');

      // Verify autocomplete appears
      await expect(page.locator('[data-testid="autocomplete"]')).toBeVisible();
    });
  });

  // ===== CHECKOUT FLOW =====
  test.describe('Checkout', () => {
    test('should complete purchase', async ({ page }) => {
      await login(page, 'test@example.com', 'password123');

      // Add item to cart
      await page.goto('/products/1');
      await page.click('button:has-text("Add to Cart")');

      // Go to cart
      await page.click('[data-testid="cart-icon"]');
      await expect(page).toHaveURL('/cart');

      // Proceed to checkout
      await page.click('button:has-text("Checkout")');
      await expect(page).toHaveURL('/checkout');

      // Fill shipping info
      await page.fill('input[name="address"]', '123 Main St');
      await page.fill('input[name="city"]', 'Anytown');
      await page.fill('input[name="zip"]', '12345');

      await page.click('button:has-text("Continue to Payment")');

      // Fill payment info
      await page.fill('input[name="cardNumber"]', '4242424242424242');
      await page.fill('input[name="expiry"]', '12/25');
      await page.fill('input[name="cvc"]', '123');

      // Submit order
      await page.click('button:has-text("Place Order")');

      // Verify success
      await expect(page).toHaveURL('/order-confirmation');
      await expect(page.locator('text=Order successful')).toBeVisible();
    });

    test('should update cart quantities', async ({ page }) => {
      await login(page, 'test@example.com', 'password123');
      await page.goto('/cart');

      // Increase quantity
      await page.click('[data-testid="increase-quantity"]');
      await expect(page.locator('[data-testid="quantity"]')).toHaveText('2');

      // Verify total updated
      await expect(page.locator('[data-testid="total"]')).toContainText('$');
    });

    test('should apply promo code', async ({ page }) => {
      await login(page, 'test@example.com', 'password123');
      await page.goto('/cart');

      await page.fill('input[name="promoCode"]', 'SAVE10');
      await page.click('button:has-text("Apply")');

      await expect(page.locator('text=Discount applied')).toBeVisible();
    });
  });

  // ===== MOBILE RESPONSIVENESS =====
  test.describe('Mobile', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should show mobile menu', async ({ page }) => {
      await page.goto('/');

      // Open hamburger menu
      await page.click('[data-testid="mobile-menu-button"]');

      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    });

    test('should be responsive', async ({ page }) => {
      await page.goto('/');

      // Verify mobile layout
      const header = page.locator('header');
      const box = await header.boundingBox();
      expect(box?.width).toBeLessThanOrEqual(375);
    });
  });

  // ===== ACCESSIBILITY =====
  test.describe('Accessibility', () => {
    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/');

      // Tab through elements
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      // Verify navigation worked
    });

    test('should have proper ARIA labels', async ({ page }) => {
      await page.goto('/');

      const button = page.locator('button[aria-label="Search"]');
      await expect(button).toHaveAttribute('aria-label');
    });

    test('should support screen readers', async ({ page }) => {
      await page.goto('/');

      // Verify semantic HTML
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  });

  // ===== PERFORMANCE =====
  test.describe('Performance', () => {
    test('should load quickly', async ({ page }) => {
      const start = Date.now();
      await page.goto('/');
      const loadTime = Date.now() - start;

      expect(loadTime).toBeLessThan(3000); // 3 seconds
    });

    test('should lazy load images', async ({ page }) => {
      await page.goto('/gallery');

      // Scroll to trigger lazy loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Verify images loaded
      const images = page.locator('img[loading="lazy"]');
      await expect(images.first()).toBeVisible();
    });
  });

  // ===== ERROR HANDLING =====
  test.describe('Error Handling', () => {
    test('should show error on network failure', async ({ page, context }) => {
      // Simulate offline
      await context.setOffline(true);

      await page.goto('/');
      await page.fill('input[name="search"]', 'test');
      await page.press('input[name="search"]', 'Enter');

      await expect(page.locator('text=Network error')).toBeVisible();
    });

    test('should retry failed requests', async ({ page }) => {
      // Mock failing API
      await page.route('**/api/**', route => route.abort());

      await page.goto('/data');

      // Verify retry indicator
      await expect(page.locator('text=Retrying')).toBeVisible();
    });
  });
});
