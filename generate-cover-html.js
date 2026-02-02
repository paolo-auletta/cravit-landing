const fs = require('fs');
const path = require('path');

// Create a simple PNG using canvas API approach
// We'll create a raw RGBA buffer and convert to PNG

function createCoverImage(title, subtitle, outputPath) {
  const width = 1200;
  const height = 630;
  
  // Create a simple HTML file that renders the cover
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .bg-pattern {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(circle at 20% 80%, rgba(255, 105, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 105, 0, 0.15) 0%, transparent 50%);
    }
    .content {
      text-align: center;
      z-index: 1;
      padding: 40px;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      color: #ff6900;
      margin-bottom: 30px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .title {
      font-size: 80px;
      font-weight: 900;
      color: white;
      margin-bottom: 20px;
      line-height: 1.1;
    }
    .subtitle {
      font-size: 32px;
      color: rgba(255,255,255,0.8);
      font-weight: 500;
      letter-spacing: 1px;
    }
    .badge {
      display: inline-block;
      background: #ff6900;
      color: white;
      padding: 12px 30px;
      border-radius: 30px;
      font-size: 18px;
      font-weight: 700;
      margin-top: 40px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .line {
      width: 100px;
      height: 4px;
      background: #ff6900;
      margin: 30px auto;
      border-radius: 2px;
    }
  </style>
</head>
<body>
  <div class="bg-pattern"></div>
  <div class="content">
    <div class="logo">Cravit Guide</div>
    <h1 class="title">${title}</h1>
    <div class="line"></div>
    <p class="subtitle">${subtitle}</p>
    <div class="badge">Le Migliori Pizze</div>
  </div>
</body>
</html>
  `.trim();
  
  return html;
}

const covers = [
  { title: 'Roma Sud', subtitle: 'Marconi · Garbatella · Ostia', filename: 'pizza-roma-sud-cover.png' },
  { title: 'Roma Nord', subtitle: 'Tufello · Trieste · Prati', filename: 'pizza-roma-nord-cover.png' },
  { title: 'Roma Est', subtitle: 'Centocelle · Tuscolano · Pigneto', filename: 'pizza-roma-est-cover.png' },
  { title: 'Roma Ovest', subtitle: 'Monteverde · Trullo · Magliana', filename: 'pizza-roma-ovest-cover.png' }
];

const blogDir = '/Users/paoloauletta/Documents/cravit-landing-opecode/public/blog';

console.log('Generating HTML files for cover images...\n');

covers.forEach(cover => {
  const html = createCoverImage(cover.title, cover.subtitle);
  const htmlPath = path.join(blogDir, cover.filename.replace('.png', '.html'));
  fs.writeFileSync(htmlPath, html);
  console.log(`Created ${htmlPath}`);
});

console.log('\nTo convert to PNG, run:');
console.log('node screenshot-covers.js');
