const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    recordVideo: {
      dir: './',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  console.log('Navigating to the application...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  console.log('Recording 10 seconds of the clock application...');
  await page.waitForTimeout(10000); // Record for 10 seconds

  console.log('Closing browser and saving video...');
  await context.close();
  await browser.close();

  console.log('Video recording complete!');
  console.log('The video has been saved in the current directory.');
})();
