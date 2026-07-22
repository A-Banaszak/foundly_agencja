import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function main() {
  const outputDir = path.resolve('public/images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("Launching browser to capture high-res screenshots...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Capture Client Portal Login
  console.log("Navigating to http://localhost:4321/panel-klienta...");
  await page.goto('http://localhost:4321/panel-klienta', { waitUntil: 'networkidle2' });

  // Click 1-Click Demo Login button to reveal dashboard
  console.log("Clicking Demo Login button...");
  const demoBtn = await page.$('button[type="button"]');
  if (demoBtn) {
    await demoBtn.click();
    await new Promise(r => setTimeout(r, 1200));
  }

  // Apply CSS Blur on sensitive personal & domain data + hide dev toolbar
  await page.evaluate(() => {
    // Hide Astro dev toolbar completely
    const devToolbars = document.querySelectorAll('astro-dev-toolbar, [data-astro-dev-toolbar]');
    devToolbars.forEach(el => {
      if (el.style) el.style.display = 'none';
    });

    const style = document.createElement('style');
    style.innerHTML = `
      astro-dev-toolbar, [data-astro-dev-toolbar] { display: none !important; }
      .blur-sensitive {
        filter: blur(5px) !important;
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);

    // Target name, email, domains & account IDs for privacy blur
    const textNodes = document.querySelectorAll('p, strong, span, td, div, h1, h2, a');
    textNodes.forEach(el => {
      const text = el.textContent || '';
      if (
        text.includes('Jan Kowalski') || 
        text.includes('demo@foundly.pl') || 
        text.includes('kowalski-stolarstwo.pl') ||
        text.includes('https://kowalski-stolarstwo.pl') ||
        text.includes('389201948') ||
        text.includes('849-201-9482') ||
        text.includes('act_492019482')
      ) {
        if (el.children.length === 0 || el.tagName === 'STRONG' || el.tagName === 'SPAN' || el.tagName === 'A' || el.tagName === 'TD') {
          el.classList.add('blur-sensitive');
        }
      }
    });
  });

  const clientPortalPath = path.join(outputDir, 'panel-klienta-preview.png');
  await page.screenshot({ path: clientPortalPath, fullPage: false });
  console.log(`Saved clean blurred screenshot to: ${clientPortalPath}`);

  // 2. Capture Admin Panel (/panel-foundly)
  console.log("Navigating to http://localhost:4321/panel-foundly...");
  await page.goto('http://localhost:4321/panel-foundly', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => {
    const devToolbars = document.querySelectorAll('astro-dev-toolbar, [data-astro-dev-toolbar]');
    devToolbars.forEach(el => {
      if (el.style) el.style.display = 'none';
    });
  });

  const adminPanelPath = path.join(outputDir, 'panel-admin-preview.png');
  await page.screenshot({ path: adminPanelPath, fullPage: false });
  console.log(`Saved admin screenshot to: ${adminPanelPath}`);

  await browser.close();
  console.log("Screenshots updated successfully!");
}

main().catch(err => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
