import { test, expect } from '@playwright/test';

test('Locked courses redirect to /courses', async ({ page }) => {
    // 1. Try to access Accounting (Locked)
    await page.goto('/courses/accounting');
    await expect(page).toHaveURL(/\/courses\?error=locked/);

    // 2. Try to access Microeconomics (Locked)
    await page.goto('/courses/microeconomics/chapter-1');
    await expect(page).toHaveURL(/\/courses\?error=locked/);

    // 3. Try to access Organizational Behavior (Unlocked)
    const response = await page.goto('/courses/organizational-behavior/chapter-2');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/courses\/organizational-behavior\/chapter-2/);
});
