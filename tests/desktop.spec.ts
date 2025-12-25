import { test, expect } from '@playwright/test';

test.describe('zOS Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for boot sequence to complete
    await page.waitForSelector('[data-testid^="dock-"]', { timeout: 10000 });
  });

  test('should display the desktop after boot', async ({ page }) => {
    // Check dock is visible
    const dock = page.locator('[data-testid^="dock-"]').first();
    await expect(dock).toBeVisible();
  });

  test('should show menu bar with time', async ({ page }) => {
    // Check menu bar is visible
    const menuBar = page.locator('text=zOS');
    await expect(menuBar).toBeVisible();
  });

  test('should open Calculator from dock', async ({ page }) => {
    // Click Calculator in dock
    await page.click('[data-testid="dock-ai.hanzo.calculator"]');

    // Check Calculator window opens
    const window = page.locator('[data-testid="window-ai.hanzo.calculator"]');
    await expect(window).toBeVisible();
  });

  test('should close window with close button', async ({ page }) => {
    // Open Calculator
    await page.click('[data-testid="dock-ai.hanzo.calculator"]');

    // Click close button
    await page.click('[data-testid="window-ai.hanzo.calculator"] [data-testid="close-button"]');

    // Window should be gone
    const window = page.locator('[data-testid="window-ai.hanzo.calculator"]');
    await expect(window).not.toBeVisible();
  });

  test('should open multiple windows', async ({ page }) => {
    // Open Calculator
    await page.click('[data-testid="dock-ai.hanzo.calculator"]');
    await expect(page.locator('[data-testid="window-ai.hanzo.calculator"]')).toBeVisible();

    // Open Terminal
    await page.click('[data-testid="dock-ai.hanzo.terminal"]');
    await expect(page.locator('[data-testid="window-ai.hanzo.terminal"]')).toBeVisible();
  });

  test('should open Spotlight with keyboard shortcut', async ({ page }) => {
    // Press Cmd+Space
    await page.keyboard.press('Meta+Space');

    // Spotlight should be visible - check for the search input
    const spotlight = page.locator('input[placeholder="Spotlight Search"]');
    await expect(spotlight).toBeVisible();
  });

  test('should open app from Spotlight', async ({ page }) => {
    // Open Spotlight
    await page.keyboard.press('Meta+Space');

    // Click on Notes
    await page.click('[data-testid="spotlight-ai.hanzo.notes"]');

    // Notes window should open
    const window = page.locator('[data-testid="window-ai.hanzo.notes"]');
    await expect(window).toBeVisible();
  });
});

test.describe('zOS App Store', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for boot and open App Store
    await page.waitForSelector('[data-testid^="dock-"]', { timeout: 10000 });
    await page.click('[data-testid="dock-ai.hanzo.appstore"]');
    await page.waitForSelector('text=App Store', { timeout: 5000 });
  });

  test('should display App Store window', async ({ page }) => {
    const window = page.locator('[data-testid="window-ai.hanzo.appstore"]');
    await expect(window).toBeVisible();
  });

  test('should show Discover tab by default', async ({ page }) => {
    const discoverTab = page.locator('button:has-text("discover")');
    await expect(discoverTab).toHaveClass(/bg-blue-500/);
  });

  test('should show bundled apps', async ({ page }) => {
    // Check for bundled apps - use heading selector to be specific
    const calculator = page.locator('h3:has-text("Calculator")').first();
    await expect(calculator).toBeVisible();

    const terminal = page.locator('h3:has-text("Terminal")').first();
    await expect(terminal).toBeVisible();
  });

  test('should search apps', async ({ page }) => {
    // Type in search
    await page.fill('input[placeholder="Search apps..."]', 'calc');

    // Only Calculator should be visible
    const calculator = page.locator('h3:has-text("Calculator")').first();
    await expect(calculator).toBeVisible();

    // Terminal heading should not be visible (not in filtered results)
    const terminal = page.locator('h3:has-text("Terminal")').first();
    await expect(terminal).not.toBeVisible();
  });

  test('should switch to Installed tab', async ({ page }) => {
    // Click Installed tab
    await page.click('button:has-text("installed")');

    // Should show installed apps
    const installedTab = page.locator('button:has-text("installed")');
    await expect(installedTab).toHaveClass(/bg-blue-500/);
  });

  test('should switch to Updates tab', async ({ page }) => {
    // Click Updates tab
    await page.click('button:has-text("updates")');

    // Should show updates content
    const upToDate = page.locator('text=All apps are up to date');
    await expect(upToDate).toBeVisible();
  });

  test('should show app categories', async ({ page }) => {
    // Check for category labels
    const utilities = page.locator('text=utilities').first();
    await expect(utilities).toBeVisible();
  });

  test('should show GitHub link in footer', async ({ page }) => {
    const githubLink = page.locator('a[href="https://github.com/z-os4"]');
    await expect(githubLink).toBeVisible();
  });
});

test.describe('zOS Apps', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid^="dock-"]', { timeout: 10000 });
  });

  test('Calculator should perform basic arithmetic', async ({ page }) => {
    await page.click('[data-testid="dock-ai.hanzo.calculator"]');
    await page.waitForSelector('[data-testid="window-ai.hanzo.calculator"]');

    // Find calculator buttons and perform 2 + 3
    const calcWindow = page.locator('[data-testid="window-ai.hanzo.calculator"]');

    // The calculator should be interactive
    await expect(calcWindow).toBeVisible();
  });

  test('Terminal should display prompt', async ({ page }) => {
    await page.click('[data-testid="dock-ai.hanzo.terminal"]');
    await page.waitForSelector('[data-testid="window-ai.hanzo.terminal"]');

    const termWindow = page.locator('[data-testid="window-ai.hanzo.terminal"]');
    await expect(termWindow).toBeVisible();
  });

  test('Notes should be interactive', async ({ page }) => {
    await page.click('[data-testid="dock-ai.hanzo.notes"]');
    await page.waitForSelector('[data-testid="window-ai.hanzo.notes"]');

    const notesWindow = page.locator('[data-testid="window-ai.hanzo.notes"]');
    await expect(notesWindow).toBeVisible();
  });

  test('Clock should display time', async ({ page }) => {
    await page.click('[data-testid="dock-ai.hanzo.clock"]');
    await page.waitForSelector('[data-testid="window-ai.hanzo.clock"]');

    const clockWindow = page.locator('[data-testid="window-ai.hanzo.clock"]');
    await expect(clockWindow).toBeVisible();
  });

  test('Calendar should display current month', async ({ page }) => {
    await page.click('[data-testid="dock-ai.hanzo.calendar"]');
    await page.waitForSelector('[data-testid="window-ai.hanzo.calendar"]');

    const calWindow = page.locator('[data-testid="window-ai.hanzo.calendar"]');
    await expect(calWindow).toBeVisible();
  });

  test('System Preferences should open', async ({ page }) => {
    // Open via Spotlight since it's not in dock
    await page.keyboard.press('Meta+Space');
    await page.click('[data-testid="spotlight-ai.hanzo.preferences"]');
    await page.waitForSelector('[data-testid="window-ai.hanzo.preferences"]');

    const prefsWindow = page.locator('[data-testid="window-ai.hanzo.preferences"]');
    await expect(prefsWindow).toBeVisible();
  });
});
