import { test, expect } from '@playwright/test';

test('ChapterHeader visibility on tabs', async ({ page }) => {
    // Navigate to Chapter 2
    await page.goto('http://localhost:3001/courses/organizational-behavior/chapter-2');

    // 1. Initial state (Tab 1): Header SHOULD be visible
    const header = page.locator('header.relative.overflow-hidden'); // Selector for ChapterHeader
    await expect(header).toBeVisible();
    await expect(page.locator('h1')).toContainText('תפיסה וקבלת החלטות');

    // 2. Switch to Tab 2
    // The tabs are buttons in the nav. Topic 2 is usually the second button.
    const tabs = page.locator('nav button');
    await tabs.nth(1).click();

    // 3. Tab 2 State: Header should NOT be visible
    await expect(header).not.toBeVisible();

    // 4. Switch back to Tab 1
    await tabs.nth(0).click();

    // 5. Tab 1 State: Header SHOULD be visible again
    await expect(header).toBeVisible();
});
