import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateWorkspaceLogo() {
  const templatePath = path.join(__dirname, 'workspace-logo-template.html');
  const outputDir = path.resolve(__dirname, '../public');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Uruchamianie Puppeteer do wygenerowania logo Google Workspace (320x132)...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: 320,
      height: 132,
      deviceScaleFactor: 2 // Retina high-res 2x
    });

    await page.goto(`file://${templatePath}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));

    const outputPath = path.join(outputDir, 'google-workspace-logo.png');
    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: 320, height: 132 },
      omitBackground: false
    });

    console.log(`✅ Wygenerowano logo pod Google Workspace: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

generateWorkspaceLogo().catch(err => {
  console.error('❌ Błąd podczas generowania logo:', err);
  process.exit(1);
});
