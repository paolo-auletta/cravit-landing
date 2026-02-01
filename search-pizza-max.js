const https = require('https');

const API_KEY = 'AIzaSyDb-LLmkfV4Tb_Ftm5go5jIKR2yJ4abb_w';

// Try different search terms for Pizza Max
const searchTerms = [
  'Max Pizza Ostia',
  'Pizza Max Largo Cesidio da Fossa',
  'Forno Max Ostia',
  'Pizzeria Max Lido di Ostia'
];

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

async function searchPlace(query) {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,photos,formatted_address&key=${API_KEY}`;
  return await makeRequest(url);
}

async function main() {
  console.log('Searching for Pizza Max with different terms...\n');
  
  for (const term of searchTerms) {
    console.log(`Trying: "${term}"`);
    const result = await searchPlace(term);
    
    if (result.candidates && result.candidates.length > 0) {
      const place = result.candidates[0];
      console.log(`  Found: ${place.name}`);
      console.log(`  Address: ${place.formatted_address || 'N/A'}`);
      console.log(`  Has photos: ${place.photos ? 'YES (' + place.photos.length + ')' : 'NO'}`);
      console.log(`  Place ID: ${place.place_id}`);
      console.log('');
    } else {
      console.log('  No results\n');
    }
  }
}

main().catch(console.error);
