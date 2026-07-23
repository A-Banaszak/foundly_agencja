import path from 'node:path';
import fs from 'node:fs';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function exportPdf(urlOrPath, outputFilename = 'Oferta_Foundly_Agencja.pdf') {
  const projectRoot = path.resolve(__dirname, '..');
  const outputPath = path.join(projectRoot, 'public', outputFilename);

  console.log(`🚀 Uruchamianie Puppeteer do wygenerowania PDF: ${outputFilename}`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    let targetUrl = urlOrPath;
    if (!urlOrPath.startsWith('http://') && !urlOrPath.startsWith('https://')) {
      const filePath = path.isAbsolute(urlOrPath) ? urlOrPath : path.join(projectRoot, urlOrPath);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Plik nie istnieje: ${filePath}`);
      }
      targetUrl = `file://${filePath}`;
    }

    console.log(`🌐 Ładowanie adresu: ${targetUrl}`);
    await page.goto(targetUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
    });

    console.log(`✅ Oferta PDF została wygenerowana i zapisana pod adresem: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

const target = process.argv[2] || 'dist/oferta/index.html';
const outputFile = process.argv[3] || 'Oferta_Foundly_Agencja.pdf';

exportPdf(target, outputFile).catch((err) => {
  console.error('❌ Błąd podczas generowania PDF:', err);
  process.exit(1);
});
