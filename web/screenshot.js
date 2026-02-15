const { chromium } = require('playwright');

(async () => {
    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();

        console.log('Navigating to Chapter 12...');
        await page.goto('http://localhost:3000/courses/accounting/chapter-12', { waitUntil: 'networkidle' });

        console.log('Taking screenshot...');
        await page.screenshot({
            path: '.tmp/audit_screenshots/chapter12_audit.png',
            fullPage: true
        });

        await browser.close();
        console.log('Screenshot saved successfully to .tmp/audit_screenshots/chapter12_audit.png');
    } catch (error) {
        console.error('Error taking screenshot:', error);
        process.exit(1);
    }
})();
