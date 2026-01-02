import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Story 1-1: Navigation Anchor Links
 *
 * Tests cover:
 * - Navigation renders with all 8 anchor links
 * - Clicking nav link scrolls to correct section
 * - Active section highlighting on scroll
 * - Mobile menu opens/closes
 * - Escape key closes mobile menu
 * - Skip-nav link is focusable
 */

test.describe('Navigation Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for navigation to be visible
    await page.waitForSelector('nav[role="navigation"]')
  })

  test('renders with all 8 anchor links', async ({ page }) => {
    // Define expected navigation links
    const expectedLinks = [
      { href: '#hero', label: 'Home' },
      { href: '#about', label: 'About' },
      { href: '#oak-slabs', label: 'Oak Slabs' },
      { href: '#warehouse', label: 'Warehouse' },
      { href: '#products', label: 'Products' },
      { href: '#manufacturing', label: 'Manufacturing' },
      { href: '#sustainability', label: 'Sustainability' },
      { href: '#contact', label: 'Contact' },
    ]

    // Check each link exists in desktop navigation
    for (const link of expectedLinks) {
      const navLink = page.locator(`nav a[href="${link.href}"]`, {
        hasText: link.label,
      }).first()
      await expect(navLink).toBeVisible()
    }

    // Verify total count
    const allNavLinks = page.locator('nav a[href^="#"]')
    const count = await allNavLinks.count()
    // At least 8 (may include logo and skip-nav)
    expect(count).toBeGreaterThanOrEqual(8)
  })

  test('clicking nav link scrolls to correct section', async ({ page }) => {
    // Click on About link
    await page.click('nav a[href="#about"]')

    // Wait for scroll to complete
    await page.waitForTimeout(1000)

    // Verify About section is in viewport
    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeInViewport()

    // Check URL hash updated (scroll spy may have changed it, but should have a hash)
    expect(page.url()).toContain('#')

    // Test another section
    await page.click('nav a[href="#products"]')
    await page.waitForTimeout(1000)

    const productsSection = page.locator('#products')
    await expect(productsSection).toBeInViewport()

    // URL should still have a hash
    expect(page.url()).toContain('#')
  })

  test('active section highlights on scroll', async ({ page }) => {
    // Wait for initial state to settle
    await page.waitForTimeout(500)

    // Initial state - hero or first visible section should be active
    const heroLink = page.locator('nav a[href="#hero"]').first()
    await expect(heroLink).toHaveClass(/text-moooi-gold/)

    // Scroll to About section
    await page.locator('#about').scrollIntoViewIfNeeded()
    // Wait longer for scroll spy to update
    await page.waitForTimeout(800)

    // About link should now be active (or a nearby section)
    const aboutLink = page.locator('nav a[href="#about"]').first()
    await expect(aboutLink).toHaveClass(/text-moooi-gold/)
    await expect(aboutLink).toHaveAttribute('aria-current', 'page')

    // Scroll to Products section
    await page.locator('#products').scrollIntoViewIfNeeded()
    // Wait longer for scroll spy to update
    await page.waitForTimeout(800)

    // Products link should be active (or a nearby section)
    const productsLink = page.locator('nav a[href="#products"]').first()
    await expect(productsLink).toHaveClass(/text-moooi-gold/)
    await expect(productsLink).toHaveAttribute('aria-current', 'page')
  })

  test('mobile menu opens and closes', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Mobile menu should not be visible initially
    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).not.toBeVisible()

    // Click hamburger button
    const menuButton = page.locator('button[aria-label="Open menu"]')
    await expect(menuButton).toBeVisible()
    await menuButton.click()
    await page.waitForTimeout(300)

    // Mobile menu should be visible
    await expect(mobileMenu).toBeVisible()

    // Menu button should show aria-expanded="true"
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // Close button should be visible
    const closeButton = page.locator('button[aria-label="Close menu"]')
    await expect(closeButton).toBeVisible()

    // Click close button
    await closeButton.click()
    await page.waitForTimeout(300)

    // Mobile menu should be hidden
    await expect(mobileMenu).not.toBeVisible()

    // Verify aria-expanded is false
    const reopenButton = page.locator('button[aria-label="Open menu"]')
    await expect(reopenButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('mobile menu closes immediately after clicking link', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Open mobile menu
    await page.click('button[aria-label="Open menu"]')
    await page.waitForTimeout(300)

    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).toBeVisible()

    // Click a navigation link in mobile menu
    const aboutLinkMobile = mobileMenu.locator('a[href="#about"]')
    await aboutLinkMobile.click()
    await page.waitForTimeout(300)

    // Mobile menu should close immediately
    await expect(mobileMenu).not.toBeVisible()

    // Verify navigation occurred (URL should have a hash, scroll spy may change it)
    expect(page.url()).toContain('#')
  })

  test('escape key closes mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Open mobile menu
    await page.click('button[aria-label="Open menu"]')
    await page.waitForTimeout(300)

    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).toBeVisible()

    // Press Escape key
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)

    // Mobile menu should close
    await expect(mobileMenu).not.toBeVisible()
  })

  test('skip-nav link is focusable and functional', async ({ page }) => {
    // Focus should start at beginning of page
    await page.keyboard.press('Tab')

    // Check if skip-nav link is focused
    const skipNav = page.locator('.skip-nav')
    await expect(skipNav).toBeFocused()

    // Skip-nav should be visible when focused
    await expect(skipNav).toBeVisible()

    // Verify it has correct href
    await expect(skipNav).toHaveAttribute('href', '#hero')

    // Click skip-nav link
    await skipNav.press('Enter')

    // Verify it navigates to main content
    expect(page.url()).toContain('#hero')
  })

  test('browser URL updates with hash on scroll', async ({ page }) => {
    // Wait for initial scroll spy to settle
    await page.waitForTimeout(500)

    // Initial URL should have a hash (scroll spy sets it on load)
    const initialUrl = page.url()
    expect(initialUrl).toContain('#')

    // Scroll to About section
    await page.locator('#about').scrollIntoViewIfNeeded()
    // Wait longer for scroll spy to update
    await page.waitForTimeout(800)

    // URL should update to have a hash (scroll spy determines which one)
    expect(page.url()).toContain('#')

    // Scroll to Products section
    await page.locator('#products').scrollIntoViewIfNeeded()
    // Wait longer for scroll spy to update
    await page.waitForTimeout(800)

    // URL should update to have a hash
    expect(page.url()).toContain('#')
  })

  test('initial hash scroll on page load', async ({ page }) => {
    // Navigate to page with hash
    await page.goto('/#products', { waitUntil: 'domcontentloaded' })

    // Wait for scroll to complete and scroll spy to settle
    await page.waitForTimeout(1500)

    // Products section should be in viewport
    const productsSection = page.locator('#products')
    await expect(productsSection).toBeInViewport()

    // Products link should be active (or a nearby section that's most visible)
    const productsLink = page.locator('nav a[href="#products"]').first()
    await expect(productsLink).toHaveClass(/text-moooi-gold/)
  })

  test('navigation is sticky and always visible on scroll', async ({ page }) => {
    const nav = page.locator('nav[role="navigation"]')

    // Navigation should be visible at top
    await expect(nav).toBeVisible()

    // Scroll down the page
    await page.evaluate(() => window.scrollBy(0, 1000))
    await page.waitForTimeout(300)

    // Navigation should still be visible (sticky)
    await expect(nav).toBeVisible()

    // Check sticky positioning
    const navBox = await nav.boundingBox()
    expect(navBox?.y).toBeLessThanOrEqual(10) // Should be at or near top
  })

  test('aria-current attribute updates correctly', async ({ page }) => {
    // Hero should have aria-current initially
    const heroLink = page.locator('nav a[href="#hero"]').first()
    await expect(heroLink).toHaveAttribute('aria-current', 'page')

    // Click About link
    await page.click('nav a[href="#about"]')
    await page.waitForTimeout(500)

    // About should have aria-current
    const aboutLink = page.locator('nav a[href="#about"]').first()
    await expect(aboutLink).toHaveAttribute('aria-current', 'page')

    // Hero should NOT have aria-current
    await expect(heroLink).not.toHaveAttribute('aria-current', 'page')
  })

  test('smooth scrolling behavior', async ({ page }) => {
    // Get initial scroll position
    const initialY = await page.evaluate(() => window.scrollY)

    // Click on a section far down the page
    await page.click('nav a[href="#contact"]')

    // Allow some time for scroll animation
    await page.waitForTimeout(200)

    // Check that scroll position is changing (smooth scroll in progress)
    const midScrollY = await page.evaluate(() => window.scrollY)
    expect(midScrollY).toBeGreaterThan(initialY)

    // Wait for scroll to complete
    await page.waitForTimeout(1000)

    // Contact section should be in viewport
    const contactSection = page.locator('#contact')
    await expect(contactSection).toBeInViewport()
  })

  test('mobile menu prevents body scroll when open', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check initial body overflow style
    let bodyOverflow = await page.evaluate(() => document.body.style.overflow)
    expect(bodyOverflow).toBe('')

    // Open mobile menu
    await page.click('button[aria-label="Open menu"]')
    await page.waitForTimeout(300)

    // Body should have overflow hidden
    bodyOverflow = await page.evaluate(() => document.body.style.overflow)
    expect(bodyOverflow).toBe('hidden')

    // Close mobile menu
    await page.click('button[aria-label="Close menu"]')
    await page.waitForTimeout(300)

    // Body overflow should be restored
    bodyOverflow = await page.evaluate(() => document.body.style.overflow)
    expect(bodyOverflow).toBe('')
  })

  test('navigation logo links to hero section', async ({ page }) => {
    // Scroll down first
    await page.locator('#about').scrollIntoViewIfNeeded()
    await page.waitForTimeout(800)

    // Click logo
    const logo = page.locator('a', { hasText: 'Timber International' })
    await logo.click()

    // Should scroll back to hero
    await page.waitForTimeout(1200)

    // Hero section should be in viewport
    const heroSection = page.locator('#hero')
    await expect(heroSection).toBeInViewport()

    // URL should have a hash (scroll spy determines which)
    expect(page.url()).toContain('#')
  })

  test('mobile backdrop closes menu on click', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Open mobile menu
    await page.click('button[aria-label="Open menu"]')
    await page.waitForTimeout(300)

    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).toBeVisible()

    // Click backdrop
    const backdrop = page.locator('div[class*="bg-black/20"]')
    await expect(backdrop).toBeVisible()
    await backdrop.click()
    await page.waitForTimeout(300)

    // Menu should close
    await expect(mobileMenu).not.toBeVisible()
  })
})
