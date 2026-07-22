import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function main() {
  const outputDir = path.resolve('public/images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("Launching browser to capture screenshots...");
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
    await new Promise(r => setTimeout(r, 1500));
  }

  // Apply CSS Blur on any sensitive data elements for privacy
  await page.evaluate(() => {
    // Add CSS blur to client email / name for privacy
    const style = document.createElement('style');
    style.innerHTML = `
      .blur-sensitive {
        filter: blur(4px);
        user-select: none;
      }
    `;
    document.head.appendChild(style);

    // Apply blur class to specific text elements
    const elementsToBlur = document.querySelectorAll('strong, .font-mono');
    elementsToBlur.forEach(el => {
      if (el.textContent.includes('demo@foundly.pl') || el.textContent.includes('849-201-9482') || el.textContent.includes('act_492019482') || el.textContent.includes('389201948')) {
        el.classList.add('blur-sensitive');
      }
    });
  });

  const clientPortalPath = path.join(outputDir, 'panel-klienta-preview.png');
  await page.screenshot({ path: clientPortalPath, fullPage: false });
  console.log(`Saved screenshot to: ${clientPortalPath}`);

  // 2. Capture Admin Panel (/panel-foundly)
  console.log("Navigating to http://localhost:4321/panel-foundly...");
  await page.goto('http://localhost:4321/panel-foundly', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const adminPanelPath = path.join(outputDir, 'panel-admin-preview.png');
  await page.screenshot({ path: adminPanelPath, fullPage: false });
  console.log(`Saved screenshot to: ${adminPanelPath}`);

  await browser.close();
  console.log("Screenshots captured successfully!");
}

main().catch(err => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
