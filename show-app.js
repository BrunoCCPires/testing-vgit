const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true
  });
  const page = await browser.newPage();

  await page.goto('http://localhost:5173/');

  // Wait for the page to load
  await page.waitForTimeout(2000);

  // Take a screenshot
  await page.screenshot({ path: 'app-screenshot.png', fullPage: true });

  console.log('Screenshot saved as app-screenshot.png');

  await browser.close();
})();
