#!/usr/bin/env node

/**
 * This script validates Twitter/X Card meta tags on your website.
 * Run it with: node scripts/test-twitter-card.js <url-of-your-blog-post>
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

if (process.argv.length < 3) {
  console.log('Usage: node test-twitter-card.js <url-of-your-blog-post>');
  process.exit(1);
}

const targetUrl = process.argv[2];
console.log(`Testing Twitter Card for: ${targetUrl}`);

function getProtocolHandler(url) {
  return url.startsWith('https:') ? https : http;
}

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 Twitter Card Validator'
      }
    };

    const protocolHandler = getProtocolHandler(url);
    
    const req = protocolHandler.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

function extractMetaTags(html) {
  const metaTags = {};
  
  // Extract Twitter Card meta tags
  const twitterTags = html.match(/<meta\s+name="twitter:[^"]+"\s+content="[^"]+"\s*\/?>/g) || [];
  twitterTags.forEach(tag => {
    const nameMatch = tag.match(/name="twitter:([^"]+)"/);
    const contentMatch = tag.match(/content="([^"]+)"/);
    
    if (nameMatch && contentMatch) {
      metaTags[`twitter:${nameMatch[1]}`] = contentMatch[1];
    }
  });
  
  // Extract Open Graph meta tags (X also uses these)
  const ogTags = html.match(/<meta\s+property="og:[^"]+"\s+content="[^"]+"\s*\/?>/g) || [];
  ogTags.forEach(tag => {
    const propertyMatch = tag.match(/property="og:([^"]+)"/);
    const contentMatch = tag.match(/content="([^"]+)"/);
    
    if (propertyMatch && contentMatch) {
      metaTags[`og:${propertyMatch[1]}`] = contentMatch[1];
    }
  });
  
  return metaTags;
}

async function validateTwitterCard() {
  try {
    const html = await fetchPage(targetUrl);
    const metaTags = extractMetaTags(html);
    
    console.log('\nTwitter Card Meta Tags found:');
    console.log('==============================');
    
    // Check for required Twitter Card meta tags
    const requiredTags = [
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image'
    ];
    
    let missingTags = [];
    
    requiredTags.forEach(tag => {
      if (metaTags[tag]) {
        console.log(`✅ ${tag}: ${metaTags[tag]}`);
      } else {
        console.log(`❌ ${tag}: Missing`);
        missingTags.push(tag);
      }
    });
    
    // Display other Twitter tags found
    Object.keys(metaTags)
      .filter(tag => tag.startsWith('twitter:') && !requiredTags.includes(tag))
      .forEach(tag => {
        console.log(`ℹ️ ${tag}: ${metaTags[tag]}`);
      });
    
    console.log('\nOpen Graph Meta Tags (also used by X):');
    console.log('======================================');
    
    // Check for important Open Graph meta tags
    const importantOgTags = [
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'og:type'
    ];
    
    importantOgTags.forEach(tag => {
      if (metaTags[tag]) {
        console.log(`✅ ${tag}: ${metaTags[tag]}`);
      } else {
        console.log(`⚠️ ${tag}: Missing`);
      }
    });
    
    // Display other OG tags found
    Object.keys(metaTags)
      .filter(tag => tag.startsWith('og:') && !importantOgTags.includes(tag))
      .forEach(tag => {
        console.log(`ℹ️ ${tag}: ${metaTags[tag]}`);
      });
    
    // Summary
    console.log('\nValidation Summary:');
    console.log('==================');
    
    if (missingTags.length === 0) {
      console.log('✅ All required Twitter Card meta tags are present.');
    } else {
      console.log(`❌ Missing ${missingTags.length} required Twitter Card meta tags: ${missingTags.join(', ')}`);
    }
    
    if (metaTags['twitter:card'] === 'summary_large_image' && metaTags['twitter:image']) {
      console.log('✅ Twitter Card type is "summary_large_image" with an image URL.');
      console.log(`ℹ️ Image URL: ${metaTags['twitter:image']}`);
      
      // Check if the image URL is absolute
      try {
        new URL(metaTags['twitter:image']);
        console.log('✅ Image URL is absolute (required by Twitter).');
      } catch (e) {
        console.log('❌ Image URL is not absolute. Twitter requires absolute URLs.');
      }
    }
    
    console.log('\nNOTE: To see how your Twitter Card will actually appear, use the Twitter Card Validator:');
    console.log('https://cards-dev.twitter.com/validator\n');
    
  } catch (error) {
    console.error('Error validating Twitter Card:', error);
  }
}

validateTwitterCard();
