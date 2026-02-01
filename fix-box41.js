const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyDb-LLmkfV4Tb_Ftm5go5jIKR2yJ4abb_w';
const OUTPUT_DIR = '/Users/paoloauletta/Documents/cravit-landing-opecode/public/blog/pizza-roma-sud/box-41';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

function downloadPhoto(photoRef, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${API_KEY}`;
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', reject);
  });
}

async function main() {
  // Search for Box 41
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent('Grazie Al Grano Spinaceto - Box 41')}&inputtype=textquery&fields=place_id,name,photos&key=${API_KEY}`;
  const result = await makeRequest(url);
  
  if (!result.candidates || result.candidates.length === 0) {
    console.log('Place not found');
    return;
  }
  
  const place = result.candidates[0];
  console.log('Found:', place.name);
  console.log('Photos available:', place.photos ? place.photos.length : 0);
  
  if (place.photos && place.photos.length > 0) {
    // Clear old wrong images
    const files = fs.readdirSync(OUTPUT_DIR);
    for (const file of files) {
      if (file.endsWith('.jpg') || file.endsWith('.png')) {
        fs.unlinkSync(path.join(OUTPUT_DIR, file));
        console.log('Removed old:', file);
      }
    }
    
    // Download the correct image
    await downloadPhoto(place.photos[0].photo_reference, path.join(OUTPUT_DIR, 'location-1.jpg'));
    console.log('Downloaded: location-1.jpg (correct Box 41 image)');
  }
}

main().catch(console.error);
