import { test, expect } from '@playwright/test';

test('ChapterHeader visibility on tabs', async ({ page }) => {
    // Navigate to Chapter 2
    await page.goto('/courses/organizational-behavior/chapter-2');

    // 1. Initial state (Tab 1): Header SHOULD be visible
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
    await expect(page.locator('h1')).toContainText('תפיסה וקבלת החלטות');

    // 2. Switch to Tab 2 using specific button text
    // "תאוריית הייחוס" is the second tab in Chapter 2
    const tab2Button = page.getByRole('button', { name: 'תאוריית הייחוס' });
    await tab2Button.click();

    // 3. Tab 2 State: Header should NOT be visible
    await expect(header).not.toBeVisible();

    // 4. Switch back to Tab 1
    const tab1Button = page.getByRole('button', { name: 'מהי תפיסה?' });
    await tab1Button.click();

    // 5. Tab 1 State: Header SHOULD be visible again
    await expect(header).toBeVisible();
});
