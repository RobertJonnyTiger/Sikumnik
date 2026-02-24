import { test, expect } from '@playwright/test';

test.skip('Arcade blocks render on Chapter 1', async ({ page }) => {
    // Navigate to Chapter 1
    // Explicitly using port 3002 because default 3000 is occupied by stale server and config is hardcoded
    await page.goto('/courses/microeconomics/chapter-1');

    // Wait for content to load (basic check)
    await expect(page.locator('h1')).toContainText('מהו מדע הכלכלה?');

    // Verify Speed Sorter Placeholder
    const speedSorter = page.getByTestId('arcade-speed-sorter');
    await expect(speedSorter).toBeVisible();
    await expect(speedSorter).toContainText('Speed Sorter');

    // Verify Flashcard Blitz Placeholder
    const flashcards = page.getByTestId('arcade-flashcard-blitz');
    await expect(flashcards).toBeVisible();
    await expect(flashcards).toContainText('Flashcard Blitz');

    // Verify Prediction Market Placeholder
    const predictionMarket = page.getByTestId('arcade-prediction-market');
    await expect(predictionMarket).toBeVisible();
    await expect(predictionMarket).toContainText('Prediction Market');
});
