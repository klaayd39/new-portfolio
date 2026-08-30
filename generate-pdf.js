import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Assuming the dev server is running on 5173
  const url = 'http://localhost:5173/resume';
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Hide the download buttons and the sidebar before printing
  await page.evaluate(() => {
    const actions = document.querySelector('.resume-actions');
    if (actions) actions.style.display = 'none';

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.style.display = 'none';

    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) mobileNav.style.display = 'none';

    // Also adjust the page-wrap and main-content padding if needed
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.padding = '0';
      mainContent.style.margin = '0';
      mainContent.style.width = '100%';
    }
    
    // We want to extract JUST the resume card to print it nicely, or let the CSS print media handle it.
    // The CSS print media query might already handle hiding the sidebar. Let's see.
  });

  console.log('Generating PDF...');
  await page.pdf({
    path: 'public/Klyde_Joseph_Yabo_Resume.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }
  });

  await browser.close();
  console.log('PDF generated at public/Klyde_Joseph_Yabo_Resume.pdf');
})();
