const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('Navigating to the application...');
  await page.goto('http://localhost:5173/');

  console.log('Waiting for the page to load...');
  await page.waitForTimeout(2000);

  console.log('Taking screenshots of the clock application...');

  // Take multiple screenshots to show the clock ticking
  for (let i = 0; i < 5; i++) {
    await page.screenshot({ path: `clock-screenshot-${i + 1}.png`, fullPage: true });
    console.log(`Screenshot ${i + 1}/5 taken`);
    await page.waitForTimeout(1000); // Wait 1 second between screenshots
  }

  console.log('Creating a final full-page screenshot...');
  await page.screenshot({ path: 'clock-app-final.png', fullPage: true });

  console.log('Closing browser...');
  await browser.close();

  console.log('Screenshots complete! Check the current directory for the image files.');
  console.log('The clock application is still running at http://localhost:5173/');
})();
