const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext({
    recordVideo: {
      dir: './',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  console.log('Navigating to app...');
  await page.goto('http://localhost:5174/');

  // Wait for the app to load
  await page.waitForTimeout(2000);

  console.log('Taking screenshot 1...');
  await page.screenshot({ path: 'fresh-demo-1.png', fullPage: true });

  // Wait a bit to show time changing
  await page.waitForTimeout(3000);

  console.log('Taking screenshot 2...');
  await page.screenshot({ path: 'fresh-demo-2.png', fullPage: true });

  // Wait more
  await page.waitForTimeout(3000);

  console.log('Taking screenshot 3...');
  await page.screenshot({ path: 'fresh-demo-3.png', fullPage: true });

  // Wait more for video
  await page.waitForTimeout(4000);

  console.log('Taking final screenshot...');
  await page.screenshot({ path: 'fresh-demo-final.png', fullPage: true });

  console.log('Closing browser and saving video...');
  await context.close();
  await browser.close();

  console.log('Done! Screenshots and video saved.');
})();
