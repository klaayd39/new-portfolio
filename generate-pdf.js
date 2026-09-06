import puppeteer from 'puppeteer';

(async () => {
  const url = process.env.RESUME_URL || 'http://localhost:5173/resume';
  const outputPath = 'public/Klyde_Joseph_Yabo_Resume.pdf';

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  console.log(`Navigating to ${url}...`);
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('.resume-card', { timeout: 30000 });

  await page.evaluate(() => {
    document.querySelectorAll('[style*="opacity"]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log('Generating PDF...');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });

  await browser.close();
  console.log(`PDF generated at ${outputPath}`);
})().catch((err) => {
  console.error('Failed to generate resume PDF:', err.message);
  console.error('Make sure the dev server is running: npm run dev');
  process.exit(1);
});
