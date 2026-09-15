import { existsSync } from 'fs';
import puppeteer from 'puppeteer';

const OUTPUT_PATH = 'public/Klyde_Joseph_Yabo_Resume.pdf';
const DEFAULT_PORTS = [4173, 5173, 5174, 5175, 5176, 5177, 5178];

function getBrowserOptions() {
  const options = { headless: true };
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ];

  for (const path of candidates) {
    if (existsSync(path)) {
      options.executablePath = path;
      break;
    }
  }

  return options;
}

async function resolveResumeUrl() {
  if (process.env.RESUME_URL) return process.env.RESUME_URL;

  for (const port of DEFAULT_PORTS) {
    const url = `http://localhost:${port}/resume`;
    try {
      const response = await fetch(url, { redirect: 'follow' });
      if (response.ok) return url;
    } catch {
      // try next port
    }
  }

  throw new Error(
    'Could not reach /resume. Start the app with `npm run dev` or `npm run preview`, or set RESUME_URL.'
  );
}

(async () => {
  const url = await resolveResumeUrl();
  console.log('Launching browser...');
  const browser = await puppeteer.launch(getBrowserOptions());
  const page = await browser.newPage();

  console.log(`Navigating to ${url}...`);
  await page.emulateMediaType('print');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('.resume-card', { timeout: 30000 });

  await page.evaluate(() => {
    document.querySelectorAll('*').forEach((el) => {
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('transform', 'none', 'important');
      el.style.setProperty('animation', 'none', 'important');
      el.style.setProperty('visibility', 'visible', 'important');
    });
  });

  await new Promise((resolve) => setTimeout(resolve, 300));

  console.log('Generating PDF...');
  await page.pdf({
    path: OUTPUT_PATH,
    format: 'A4',
    printBackground: true,
    // Margins come from the CSS `@page` rule so browser printing and this
    // generator stay identical. Avoid also setting `margin` here or it doubles.
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`PDF generated at ${OUTPUT_PATH}`);
})().catch((err) => {
  console.error('Failed to generate resume PDF:', err.message);
  process.exit(1);
});
