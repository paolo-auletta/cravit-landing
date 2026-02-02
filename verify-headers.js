#!/usr/bin/env node

/**
 * Verification script to test X-Robots-Tag headers
 * Run this after starting your development server with: node verify-headers.js
 */

const https = require('https');
const http = require('http');

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const testPaths = ['/', '/blog'];

console.log('🔍 Verifying X-Robots-Tag headers...\n');
console.log(`Testing site: ${siteUrl}\n`);

function checkHeaders(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      const robotsTag = res.headers['x-robots-tag'];
      
      console.log(`✓ ${url}`);
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  X-Robots-Tag: ${robotsTag || 'Not set'}`);
      
      if (robotsTag) {
        if (robotsTag.includes('noindex')) {
          console.log(`  ⚠️  WARNING: Contains 'noindex'`);
        } else if (robotsTag.includes('index')) {
          console.log(`  ✅ Good: Contains 'index'`);
        }
      } else {
        console.log(`  ℹ️  No X-Robots-Tag header found`);
      }
      
      console.log('');
      resolve();
    }).on('error', (err) => {
      console.log(`✗ ${url}`);
      console.log(`  Error: ${err.message}\n`);
      reject(err);
    });
  });
}

async function runTests() {
  for (const path of testPaths) {
    try {
      await checkHeaders(siteUrl + path);
    } catch (err) {
      console.error(`Failed to check ${path}`);
    }
  }
  
  console.log('\n📋 Summary:');
  console.log('If you see "index, follow" in X-Robots-Tag, your fix is working correctly!');
  console.log('\nNext steps:');
  console.log('1. Deploy these changes to production');
  console.log('2. Use Google Search Console URL Inspection tool to verify');
  console.log('3. Request re-indexing through Search Console');
}

runTests();
