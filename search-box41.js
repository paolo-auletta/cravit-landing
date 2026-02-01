const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyDb-LLmkfV4Tb_Ftm5go5jIKR2yJ4abb_w';

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

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
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

async function searchBox41() {
  const searches = [
    'Box 41 Mercato Spinaceto',
    'Box 41 pizzeria Spinaceto',
    'Pizzeria Box 41 Roma',
    'Box41 Viale dei Caduti per la Resistenza'
  ];
  
  for (const query of searches) {
    console.log(`Searching: "${query}"`);
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,photos,formatted_address&key=${API_KEY}`;
    const result = await makeRequest(url);
    
    if (result.candidates && result.candidates.length > 0) {
      console.log('  Found:', result.candidates[0].name);
      console.log('  Address:', result.candidates[0].formatted_address);
      console.log('  Photos:', result.candidates[0].photos ? result.candidates[0].photos.length : 0);
      console.log('');
    }
  }
}

searchBox41().catch(console.error);
