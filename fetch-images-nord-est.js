const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'AIzaSyDb-LLmkfV4Tb_Ftm5go5jIKR2yJ4abb_w';

const regions = {
  'pizza-roma-nord': [
    { name: 'Angelo e Simonetta', address: 'Via Nomentana 581 Roma', slug: 'angelo-simonetta', grade: '9+', layout: 'cover' },
    { name: 'Boccione', address: 'Via dei Monti Tiburtini Roma Montesacro', slug: 'boccione', grade: '9', layout: 'side-left' },
    { name: 'Pizza Chef', address: 'Via Clelia 63 Roma Centocelle', slug: 'pizza-chef-centocelle', grade: '9', layout: 'side-right' },
    { name: 'Il Muretto', address: 'Via Monte Canda Roma Tufello', slug: 'il-muretto', grade: '8+', layout: 'side-left' },
    { name: 'Angelino', address: 'Via Trionfale 7190 Roma Balduina', slug: 'angelino', grade: '8+', layout: 'side-right' },
    { name: 'Pizza Imperiale', address: 'Via dei Glicini 44 Roma Centocelle', slug: 'pizza-imperiale', grade: '8+', layout: 'side-left' },
  ],
  'pizza-roma-est': [
    { name: 'Boccione', address: 'Via dei Monti Tiburtini 196 Roma', slug: 'boccione', grade: '9.5', layout: 'cover' },
    { name: 'Pizza Chef', address: 'Via del Tuscolano 180 Roma', slug: 'pizza-chef', grade: '9', layout: 'side-left' },
    { name: 'Pizzeria Collatina', address: 'Via della Collatina 89 Roma', slug: 'collatina', grade: '9', layout: 'side-right' },
    { name: 'Frontoni', address: 'Viale di Trastevere 52 Roma', slug: 'frontoni', grade: '8.5', layout: 'side-left' },
    { name: 'Pizza Imperiale Centocelle', address: 'Via di Centocelle 45 Roma', slug: 'pizza-imperiale', grade: '8.5', layout: 'side-right' },
    { name: 'Pizzeria Cinecittà Est', address: 'Via di Torrenova 89 Roma', slug: 'cinecittaest', grade: '8.5', layout: 'side-left' },
  ]
};

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(data); }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', reject);
  });
}

async function findPlaceId(name, address) {
  const query = encodeURIComponent(`${name} ${address}`);
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id,name,photos&key=${API_KEY}`;
  const data = await makeRequest(url);
  if (data.candidates && data.candidates.length > 0) return data.candidates[0];
  return null;
}

async function getPlacePhotos(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos,name&key=${API_KEY}`;
  const data = await makeRequest(url);
  if (data.result && data.result.photos) return data.result.photos.slice(0, 5);
  return [];
}

async function downloadPhoto(photoRef, filepath) {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${API_KEY}`;
  await downloadImage(url, filepath);
}

async function main() {
  const BASE = '/Users/paoloauletta/Documents/cravit-landing-opecode/public/blog';

  for (const [region, pizzerias] of Object.entries(regions)) {
    console.log(`\n=== ${region} ===\n`);

    for (const pizzeria of pizzerias) {
      console.log(`--- ${pizzeria.name} (${pizzeria.grade}) ---`);
      const dir = path.join(BASE, region, pizzeria.slug);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      try {
        const place = await findPlaceId(pizzeria.name, pizzeria.address);
        if (!place) { console.log('  NOT FOUND'); continue; }
        console.log(`  Found: ${place.name}`);

        const photos = await getPlacePhotos(place.place_id);
        if (photos.length === 0) { console.log('  No photos'); continue; }

        console.log(`  Downloading ${photos.length} images...`);
        const filenames = ['location-1.jpg', 'pizza-1.jpg', 'pizza-2.jpg', 'pizza-3.jpg', 'suppli-1.jpg'];

        for (let i = 0; i < Math.min(photos.length, 5); i++) {
          const filepath = path.join(dir, filenames[i]);
          await downloadPhoto(photos[i].photo_reference, filepath);
          console.log(`    OK ${filenames[i]}`);
        }
        console.log('  Done\n');
      } catch (error) {
        console.log(`  ERROR: ${error.message}\n`);
      }
    }
  }
  console.log('=== All Done ===');
}

main().catch(console.error);
