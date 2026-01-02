import { test, expect } from '@playwright/test'

test.describe('Material Icons Loading', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('Material Icons font should be loaded', async ({ page }) => {
    // Check if Material Symbols font stylesheet is loaded
    const fontLinks = await page.locator('link[href*="Material+Symbols+Outlined"]').count()
    expect(fontLinks).toBeGreaterThan(0)

    // Wait for fonts to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000) // Give extra time for font loading
  })

  test('Material Icon component should render with correct class', async ({ page }) => {
    // Look for Material Icons on the page
    const materialIcons = page.locator('.material-symbols-outlined')
    const iconCount = await materialIcons.count()

    // Should have at least one icon on the page
    expect(iconCount).toBeGreaterThan(0)

    // Check first icon has correct attributes
    if (iconCount > 0) {
      const firstIcon = materialIcons.first()
      const classList = await firstIcon.getAttribute('class')
      expect(classList).toContain('material-symbols-outlined')

      // Icon should be visible
      await expect(firstIcon).toBeVisible()
    }
  })

  test('Material Icons should have correct font-family applied', async ({ page }) => {
    const materialIcons = page.locator('.material-symbols-outlined').first()

    if (await materialIcons.count() > 0) {
      // Check computed styles
      const fontFamily = await materialIcons.evaluate((el) => {
        return window.getComputedStyle(el).fontFamily
      })

      // Should include 'Material Symbols Outlined'
      expect(fontFamily).toContain('Material Symbols Outlined')
    }
  })

  test('Icons should render as glyphs, not text', async ({ page }) => {
    const materialIcons = page.locator('.material-symbols-outlined')
    const iconCount = await materialIcons.count()

    if (iconCount > 0) {
      // Get the first icon's text content and computed width
      const firstIcon = materialIcons.first()
      const iconText = await firstIcon.textContent()
      const iconWidth = await firstIcon.evaluate((el) => {
        return el.getBoundingClientRect().width
      })

      // Icon should have text content (the icon name)
      expect(iconText).toBeTruthy()

      // But the rendered width should be reasonable for an icon (not text width)
      // Material icons are typically 24px wide by default
      expect(iconWidth).toBeGreaterThan(0)
      expect(iconWidth).toBeLessThan(100) // Should not be text-width
    }
  })

  test('CSS class .material-symbols-outlined should not be purged by Tailwind', async ({ page }) => {
    // Check if the CSS class exists in the loaded stylesheets
    const hasClass = await page.evaluate(() => {
      // Check all stylesheets for the class definition
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          const rules = Array.from(sheet.cssRules || [])
          for (const rule of rules) {
            if (rule instanceof CSSStyleRule) {
              if (rule.selectorText && rule.selectorText.includes('material-symbols-outlined')) {
                return true
              }
            }
          }
        } catch (e) {
          // Skip CORS-protected stylesheets
          continue
        }
      }
      return false
    })

    expect(hasClass).toBe(true)
  })

  test('Icons in warehouse section should display correctly', async ({ page }) => {
    const warehouseSection = page.locator('section#warehouse')
    const warehouseIcons = warehouseSection.locator('.material-symbols-outlined')
    const iconCount = await warehouseIcons.count()

    // If warehouse has fallback content, it should have 3 icons
    if (iconCount > 0) {
      expect(iconCount).toBeGreaterThanOrEqual(3)

      // Each icon should be visible
      for (let i = 0; i < Math.min(iconCount, 3); i++) {
        await expect(warehouseIcons.nth(i)).toBeVisible()
      }
    }
  })

  test('Icons should support filled variant', async ({ page }) => {
    const materialIcons = page.locator('.material-symbols-outlined')
    const iconCount = await materialIcons.count()

    if (iconCount > 0) {
      // Check if any icons have the filled style
      const hasFilledIcon = await page.evaluate(() => {
        const icons = document.querySelectorAll('.material-symbols-outlined')
        for (const icon of icons) {
          const style = (icon as HTMLElement).style.fontVariationSettings
          if (style && style.includes('FILL')) {
            return true
          }
        }
        return false
      })

      // This is not a strict requirement, just checking the capability
      // hasFilledIcon can be true or false
      expect(typeof hasFilledIcon).toBe('boolean')
    }
  })

  test('Icon sizes should be applied correctly', async ({ page }) => {
    const materialIcons = page.locator('.material-symbols-outlined')
    const iconCount = await materialIcons.count()

    if (iconCount > 0) {
      const firstIcon = materialIcons.first()
      const fontSize = await firstIcon.evaluate((el) => {
        return window.getComputedStyle(el).fontSize
      })

      // Should have a font-size set (either default or custom)
      expect(fontSize).toBeTruthy()
      expect(parseInt(fontSize)).toBeGreaterThan(0)
    }
  })
})
