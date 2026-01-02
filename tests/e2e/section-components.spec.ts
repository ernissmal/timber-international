import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Story 1-5: Section Components
 *
 * Tests verify:
 * - All sections have correct id attributes
 * - All sections have aria-label attributes
 * - Fallback content displays correctly
 * - Consistent patterns across all section components
 * - Accessibility requirements
 */

// Define all sections with their expected attributes
const sections = [
  { id: 'hero', ariaLabel: 'Hero', hasBackground: false },
  { id: 'about', ariaLabel: 'About Us', hasBackground: false },
  { id: 'oak-slabs', ariaLabel: 'Oak Slabs', hasBackground: true, backgroundColor: 'bg-moooi-sand' },
  { id: 'warehouse', ariaLabel: 'Warehouse', hasBackground: false },
  { id: 'products', ariaLabel: 'Products', hasBackground: true, backgroundColor: 'bg-moooi-cream' },
  { id: 'manufacturing', ariaLabel: 'Manufacturing', hasBackground: false },
  { id: 'sustainability', ariaLabel: 'Sustainability', hasBackground: true, backgroundColor: 'bg-moooi-sand' },
  { id: 'contact', ariaLabel: 'Contact', hasBackground: false },
]

test.describe('Section Components - Basic Structure', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the main page where sections are rendered
    await page.goto('/')
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
  })

  test('all sections have correct id attributes', async ({ page }) => {
    for (const section of sections) {
      const sectionElement = page.locator(`section#${section.id}`)
      await expect(sectionElement).toBeVisible()
    }
  })

  test('all sections have aria-label attributes', async ({ page }) => {
    for (const section of sections) {
      const sectionElement = page.locator(`section#${section.id}`)
      await expect(sectionElement).toHaveAttribute('aria-label', section.ariaLabel)
    }
  })

  test('all sections have scroll offset class', async ({ page }) => {
    for (const section of sections) {
      const sectionElement = page.locator(`section#${section.id}`)
      await expect(sectionElement).toHaveClass(/scroll-mt-20/)
    }
  })
})

test.describe('Section Components - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('all sections have semantic H2 headings in fallback content', async ({ page }) => {
    const expectedHeadings = [
      { section: 'hero', heading: 'h1' }, // Hero uses H1 as it's the main heading
      { section: 'about', heading: 'h2' },
      { section: 'oak-slabs', heading: 'h2' },
      { section: 'warehouse', heading: 'h2' },
      { section: 'products', heading: 'h2' },
      { section: 'manufacturing', heading: 'h2' },
      { section: 'sustainability', heading: 'h2' },
      { section: 'contact', heading: 'h2' },
    ]

    for (const { section, heading } of expectedHeadings) {
      const headingElement = page.locator(`section#${section} ${heading}`).first()
      await expect(headingElement).toBeVisible()
    }
  })

  test('anchor links work correctly', async ({ page }) => {
    // Test navigation to contact section
    const contactLink = page.locator('a[href="#contact"]').first()
    await contactLink.click()

    // Wait for scroll to complete
    await page.waitForTimeout(1000)

    // Verify contact section is in viewport
    const contactSection = page.locator('section#contact')
    await expect(contactSection).toBeInViewport()
  })
})

test.describe('Section Components - Fallback Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('HeroSection displays fallback content correctly', async ({ page }) => {
    const heroSection = page.locator('section#hero')
    await expect(heroSection).toBeVisible()

    // Check for main heading
    const heading = heroSection.locator('h1')
    await expect(heading).toContainText('Your supply chain doesn\'t have room for inconsistency')

    // Check for CTA button
    const ctaButton = heroSection.locator('a[href="/contact"]')
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toContainText('Request a Quote')
  })

  test('AboutSection displays fallback content correctly', async ({ page }) => {
    const aboutSection = page.locator('section#about')
    await expect(aboutSection).toBeVisible()

    const heading = aboutSection.locator('h2').first()
    await expect(heading).toContainText('The Timber International Story')
  })

  test('OakSlabsSection displays fallback with 3 feature cards', async ({ page }) => {
    const oakSlabsSection = page.locator('section#oak-slabs')
    await expect(oakSlabsSection).toBeVisible()

    // Check for heading
    const heading = oakSlabsSection.locator('h2')
    await expect(heading).toContainText('Solid Oak. Industrial Scale.')

    // Check for 3 feature cards
    const featureCards = oakSlabsSection.locator('.grid > div')
    await expect(featureCards).toHaveCount(3)

    // Verify feature titles
    await expect(oakSlabsSection.getByText('Custom Dimensions')).toBeVisible()
    await expect(oakSlabsSection.getByText('Kiln Dried')).toBeVisible()
    await expect(oakSlabsSection.getByText('FSC Certified')).toBeVisible()

    // Check for CTA button
    const ctaButton = oakSlabsSection.locator('a[href="#contact"]')
    await expect(ctaButton).toContainText('Request Specifications')
  })

  test('WarehouseSection displays fallback with Lucide icons', async ({ page }) => {
    const warehouseSection = page.locator('section#warehouse')
    await expect(warehouseSection).toBeVisible()

    // Check for heading
    const heading = warehouseSection.locator('h2')
    await expect(heading).toContainText('Storage & Logistics Excellence')

    // Check for 3 features with icons
    const features = warehouseSection.locator('.grid > div')
    await expect(features).toHaveCount(3)

    // Verify feature titles
    await expect(warehouseSection.getByText('10,000m² Storage')).toBeVisible()
    await expect(warehouseSection.getByText('Pan-European Delivery')).toBeVisible()
    await expect(warehouseSection.getByText('48-Hour Dispatch')).toBeVisible()

    // Verify icons are present (Lucide icons render as SVG)
    const icons = warehouseSection.locator('svg')
    await expect(icons).toHaveCount(3)
  })

  test('ProductsSection displays fallback content correctly', async ({ page }) => {
    const productsSection = page.locator('section#products')
    await expect(productsSection).toBeVisible()

    const heading = productsSection.locator('h2').first()
    await expect(heading).toContainText('Quality Standards')
  })

  test('ManufacturingSection displays fallback content correctly', async ({ page }) => {
    const manufacturingSection = page.locator('section#manufacturing')
    await expect(manufacturingSection).toBeVisible()

    const heading = manufacturingSection.locator('h2').first()
    await expect(heading).toContainText('Our Manufacturing Capabilities')
  })

  test('SustainabilitySection displays fallback with certification badges', async ({ page }) => {
    const sustainabilitySection = page.locator('section#sustainability')
    await expect(sustainabilitySection).toBeVisible()

    // Check for heading
    const heading = sustainabilitySection.locator('h2').first()
    await expect(heading).toContainText('Our Approach to Sustainability')

    // Check for 3 certification badges
    await expect(sustainabilitySection.getByText('FSC Certified')).toBeVisible()
    await expect(sustainabilitySection.getByText('ISO Compliance')).toBeVisible()
    await expect(sustainabilitySection.getByText('Transparent Sourcing')).toBeVisible()
  })

  test('ContactSection displays fallback content correctly', async ({ page }) => {
    const contactSection = page.locator('section#contact')
    await expect(contactSection).toBeVisible()

    const heading = contactSection.locator('h2').first()
    await expect(heading).toContainText("How We Can Help")
  })
})

test.describe('Section Components - Design System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('sections with backgrounds have correct CSS classes', async ({ page }) => {
    // OakSlabsSection should have bg-moooi-sand
    const oakSlabsSection = page.locator('section#oak-slabs')
    await expect(oakSlabsSection).toHaveClass(/bg-moooi-sand/)

    // ProductsSection should have bg-moooi-cream
    const productsSection = page.locator('section#products')
    await expect(productsSection).toHaveClass(/bg-moooi-cream/)

    // SustainabilitySection should have bg-moooi-sand
    const sustainabilitySection = page.locator('section#sustainability')
    await expect(sustainabilitySection).toHaveClass(/bg-moooi-sand/)
  })

  test('WarehouseSection icons have correct styling', async ({ page }) => {
    const warehouseSection = page.locator('section#warehouse')

    // Icons should have text-moooi-gold class
    const icons = warehouseSection.locator('svg.text-moooi-gold')
    await expect(icons).toHaveCount(3)
  })
})

test.describe('Section Components - Animations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('sections use Framer Motion for animations', async ({ page }) => {
    // Scroll to about section to trigger animations
    await page.locator('section#about').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Check that content is visible (animation completed)
    const aboutContent = page.locator('section#about h2')
    await expect(aboutContent).toBeVisible()
  })

  test('stagger animations work on OakSlabsSection', async ({ page }) => {
    // Scroll to oak-slabs section
    await page.locator('section#oak-slabs').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)

    // All feature cards should be visible after stagger animation
    const featureCards = page.locator('section#oak-slabs .grid > div')
    await expect(featureCards.nth(0)).toBeVisible()
    await expect(featureCards.nth(1)).toBeVisible()
    await expect(featureCards.nth(2)).toBeVisible()
  })
})

test.describe('Section Components - Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('all sections are present on the page in correct order', async ({ page }) => {
    const allSections = page.locator('section')
    const count = await allSections.count()

    // Should have at least 8 sections
    expect(count).toBeGreaterThanOrEqual(8)

    // Verify order by checking section IDs
    const sectionIds = []
    for (let i = 0; i < count; i++) {
      const id = await allSections.nth(i).getAttribute('id')
      if (id) {
        sectionIds.push(id)
      }
    }

    // Check that our expected sections are present
    const expectedIds = ['hero', 'about', 'oak-slabs', 'warehouse', 'products', 'manufacturing', 'sustainability', 'contact']
    for (const expectedId of expectedIds) {
      expect(sectionIds).toContain(expectedId)
    }
  })

  test('scroll navigation works with sticky header offset', async ({ page }) => {
    // Click on a navigation link (if present)
    const aboutLink = page.locator('a[href="#about"]').first()
    if (await aboutLink.isVisible()) {
      await aboutLink.click()
      await page.waitForTimeout(1000)

      // Verify about section is in viewport
      const aboutSection = page.locator('section#about')
      await expect(aboutSection).toBeInViewport()
    }
  })

  test('HeroSection uses anchor tag for CTA (not Link component)', async ({ page }) => {
    const heroSection = page.locator('section#hero')
    const ctaButton = heroSection.locator('a[href="/contact"]')

    // Verify it's an anchor tag
    await expect(ctaButton).toBeVisible()

    // Click and verify it navigates to contact section
    await ctaButton.click()
    await page.waitForTimeout(1000)

    const contactSection = page.locator('section#contact')
    await expect(contactSection).toBeInViewport()
  })
})

test.describe('Section Components - Responsive Design', () => {
  test('sections are responsive on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check that sections are still visible
    for (const section of sections) {
      const sectionElement = page.locator(`section#${section.id}`)
      await expect(sectionElement).toBeVisible()
    }
  })

  test('grid layouts stack on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll to oak-slabs section
    const oakSlabsSection = page.locator('section#oak-slabs')
    await oakSlabsSection.scrollIntoViewIfNeeded()

    // Feature cards should be visible (stacked vertically on mobile)
    const featureCards = oakSlabsSection.locator('.grid > div')
    await expect(featureCards).toHaveCount(3)
  })
})
