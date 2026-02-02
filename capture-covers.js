const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const covers = [
  { name: 'pizza-roma-sud-cover.png', html: 'pizza-roma-sud-cover.html' },
  { name: 'pizza-roma-nord-cover.png', html: 'pizza-roma-nord-cover.html' },
  { name: 'pizza-roma-est-cover.png', html: 'pizza-roma-est-cover.html' },
  { name: 'pizza-roma-ovest-cover.png', html: 'pizza-roma-ovest-cover.html' }
];

const blogDir = '/Users/paoloauletta/Documents/cravit-landing-opecode/public/blog';

async function captureCover(htmlFile, pngFile) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    
    const htmlPath = path.join(blogDir, htmlFile);
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
    
    const pngPath = path.join(blogDir, pngFile);
    await page.screenshot({ path: pngPath, fullPage: false });
    
    console.log(`✓ Created ${pngFile}`);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('Generating cover images...\n');
  
  for (const cover of covers) {
    try {
      await captureCover(cover.html, cover.name);
    } catch (error) {
      console.error(`✗ Failed to create ${cover.name}: ${error.message}`);
    }
  }
  
  console.log('\nDone!');
}

main().catch(console.error);
