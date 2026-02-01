const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'AIzaSyDb-LLmkfV4Tb_Ftm5go5jIKR2yJ4abb_w';
const OUTPUT_DIR = '/Users/paoloauletta/Documents/cravit-landing-opecode/public/blog/pizza-roma-sud';

// Pizzerias with grades > 8.25
const pizzerias = [
  {
    name: 'Quattro Stagioni',
    address: 'Via Giuseppe Bagnera 65 Roma',
    slug: 'quattro-stagioni',
    grade: '9+',
    layout: 'cover'
  },
  {
    name: 'Pizza Luigi',
    address: 'Via Federico Nansen 6 Roma',
    slug: 'luigi',
    grade: '9',
    layout: 'side-left'
  },
  {
    name: 'Sancho',
    address: 'Via della Torre Clementina 142 Fiumicino',
    slug: 'sancho',
    grade: '8.5',
    layout: 'side-right'
  },
  {
    name: 'Da Alberto',
    address: 'Circonvallazione Ostiense 225 Roma',
    slug: 'da-alberto',
    grade: '8.5',
    layout: 'side-left'
  },
  {
    name: 'Pizza Max',
    address: 'Largo Cesidio da Fossa 38 Roma',
    slug: 'pizza-max',
    grade: '8.5',
    layout: 'side-right'
  },
  {
    name: 'Il Tempio della Pizza',
    address: 'Piazza della Stazione del Lido 10 Lido di Ostia',
    slug: 'tempio-pizza',
    grade: '8.5',
    layout: 'side-left'
  },
  {
    name: 'Box 41',
    address: 'Viale dei Caduti per la Resistenza 609 Roma',
    slug: 'box-41',
    grade: '8+',
    layout: 'side-right'
  },
  {
    name: 'Claudio e Claudio',
    address: 'Via di Trigoria 90 Selcetta',
    slug: 'claudio-claudio',
    grade: '8.5',
    layout: 'side-left'
  }
];

// Helper: Make HTTPS request
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

// Helper: Download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        // Follow redirect
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

// Step 1: Find Place ID
async function findPlaceId(name, address) {
  const query = encodeURIComponent(`${name} ${address}`);
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id,name,photos&key=${API_KEY}`;
  
  const data = await makeRequest(url);
  
  if (data.candidates && data.candidates.length > 0) {
    return data.candidates[0];
  }
  return null;
}

// Step 2: Get Place Photos
async function getPlacePhotos(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos,name&key=${API_KEY}`;
  
  const data = await makeRequest(url);
  
  if (data.result && data.result.photos) {
    return data.result.photos.slice(0, 5); // Get up to 5 photos
  }
  return [];
}

// Step 3: Download photo
async function downloadPhoto(photoRef, filepath) {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${API_KEY}`;
  await downloadImage(url, filepath);
}

// Main function
async function main() {
  console.log('=== Fetching Google Maps Images ===\n');
  
  for (const pizzeria of pizzerias) {
    console.log(`--- ${pizzeria.name} (${pizzeria.grade}) ---`);
    
    // Create directory
    const dir = path.join(OUTPUT_DIR, pizzeria.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    try {
      // Find place
      console.log('  Searching...');
      const place = await findPlaceId(pizzeria.name, pizzeria.address);
      
      if (!place) {
        console.log('  ⚠️ Place not found');
        continue;
      }
      
      console.log(`  Found: ${place.name}`);
      
      // Get photos
      console.log('  Fetching photos...');
      const photos = await getPlacePhotos(place.place_id);
      
      if (photos.length === 0) {
        console.log('  ⚠️ No photos available');
        continue;
      }
      
      console.log(`  Downloading ${photos.length} images...`);
      
      // Download photos
      for (let i = 0; i < Math.min(photos.length, 5); i++) {
        const filename = i === 0 && pizzeria.layout === 'cover' 
          ? 'location-1.png' 
          : i === 0 
          ? 'location-1.jpg'
          : i === 1
          ? 'pizza-1.jpg'
          : i === 2
          ? 'pizza-2.jpg'
          : i === 3
          ? 'pizza-3.jpg'
          : 'suppli-1.jpg';
        
        const filepath = path.join(dir, filename);
        await downloadPhoto(photos[i].photo_reference, filepath);
        console.log(`    ✓ ${filename}`);
      }
      
      console.log('  ✓ Complete\n');
      
    } catch (error) {
      console.log(`  ✗ Error: ${error.message}\n`);
    }
  }
  
  console.log('=== Done ===');
}

main().catch(console.error);
