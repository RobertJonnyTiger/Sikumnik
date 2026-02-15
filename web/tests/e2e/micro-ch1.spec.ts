import { test, expect } from '@playwright/test';

test.describe('Microeconomics Chapter 1', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/courses/microeconomics/chapter-1');
    });

    test('should have correct title and opener', async ({ page }) => {
        // Check PageMap title
        await expect(page.getByRole('heading', { name: 'מהו מדע הכלכלה?', exact: true })).toBeVisible();

        // Check Introduction (Opener)
        await expect(page.locator('#introduction')).toBeVisible();
        await expect(page.getByText('למה אנחנו לומדים כלכלה?')).toBeVisible();
    });

    test('should display key concepts', async ({ page }) => {
        // Check for specific concept cards
        await expect(page.getByText('מחסור (Scarcity)')).toBeVisible();
        await expect(page.getByText('יעילות ביצור (Production Efficiency)')).toBeVisible();
        await expect(page.getByText('עקומת התמורה (PPC)')).toBeVisible();
    });

    test('should have working next chapter button', async ({ page }) => {
        const nextButton = page.getByRole('link', { name: /הפרק הבא/i });
        await expect(nextButton).toBeVisible();
        await expect(nextButton).toHaveAttribute('href', /courses\/microeconomics\/chapter-2/);

        // Optional: click and verify navigation
        // await nextButton.click();
        // await expect(page).toHaveURL(/.*chapter-2/);
    });
});
