'use strict';
/**
 * bedrock-client.js — Amazon Nova Pro via Bedrock Mantle API
 * VaultAlexa+ MCP Server | Amazon Developer Hackathon 2026
 *
 * Supports two auth modes:
 *   1. Bedrock Mantle API Key  (BEDROCK_MANTLE_API_KEY)  — new Bedrock console key
 *   2. AWS IAM Credentials     (AWS_ACCESS_KEY_ID + SECRET) — standard SDK auth
 */

require('dotenv').config();
const https = require('https');

const REGION       = process.env.AWS_REGION || 'us-east-1';
const MANTLE_KEY   = (process.env.BEDROCK_MANTLE_API_KEY || '').trim();
const MODEL_ID     = 'amazon.nova-pro-v1:0';

// Bedrock Mantle endpoint uses Bearer token auth (new Bedrock console API keys)
const MANTLE_HOST  = `bedrock-mantle.${REGION}.amazonaws.com`;
// Standard Bedrock Runtime — confirmed working with Bearer auth from Mantle key
const RUNTIME_HOST = `bedrock-runtime.${REGION}.amazonaws.com`;

// Always use runtime host (confirmed works with Bearer token auth)
const ACTIVE_HOST  = RUNTIME_HOST;
const INVOKE_PATH  = `/model/${encodeURIComponent(MODEL_ID)}/invoke`;


/**
 * makeHttpsRequest — thin HTTPS wrapper (no external deps)
 */
function makeHttpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`Bedrock HTTP ${res.statusCode}: ${JSON.stringify(parsed.message || parsed)}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Bedrock parse error: ${data.slice(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(new Error('Bedrock request timeout (30s)')); });
    req.write(body);
    req.end();
  });
}

/**
 * invokeNovaPro — invoke Amazon Nova Pro with text-only or multimodal (image) prompt
 * @param {string} textPrompt
 * @param {string|null} imageBase64  — raw base64 (no data URI prefix)
 * @param {string}      imageMime    — e.g. 'image/jpeg'
 * @returns {Promise<string>}        — model text output
 */
async function invokeNovaPro(textPrompt, imageBase64 = null, imageMime = 'image/jpeg') {
  const contentParts = [];

  // Add image block if provided (Nova Pro multimodal)
  if (imageBase64) {
    const fmt = (imageMime || 'image/jpeg').replace('image/', ''); // jpeg|png|gif|webp
    contentParts.push({
      image: {
        format: fmt,
        source: { bytes: imageBase64 }
      }
    });
  }

  // Add text block
  contentParts.push({ text: textPrompt });

  const payload = JSON.stringify({
    messages: [
      { role: 'user', content: contentParts }
    ],
    inferenceConfig: {
      maxTokens: 1500,
      temperature: 0.2,
      topP: 0.9
    }
  });

  const headers = {
    'Content-Type':   'application/json',
    'Accept':         'application/json',
    'Content-Length': Buffer.byteLength(payload)
  };

  // Bedrock Mantle API key → Authorization: Bearer
  // Standard Bedrock Runtime → requires SigV4 (AWS_ACCESS_KEY_ID + SECRET)
  if (MANTLE_KEY) {
    headers['Authorization'] = `Bearer ${MANTLE_KEY}`;
  }

  const options = {
    hostname: ACTIVE_HOST,
    path:     INVOKE_PATH,
    method:   'POST',
    headers
  };

  const response = await makeHttpsRequest(options, payload);

  // Nova Pro response: response.output.message.content[0].text
  const text = response?.output?.message?.content?.[0]?.text
            || response?.results?.[0]?.outputText
            || '';

  if (!text) throw new Error('Nova Pro returned empty response');
  return text;
}

/**
 * analyzeProductImageWithNova — analyze uploaded product image → Amazon listing JSON
 * Mirrors the Gemini vision function signature for drop-in replacement.
 */
async function analyzeProductImageWithNova(base64Data, mimeType, hintProductName) {
  // Strip data URI prefix if present
  const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');

  const prompt = `You are VaultAlexa+, an autonomous Amazon FBA commercial cataloging specialist and live market grounding agent.
Analyze this product image carefully.
${hintProductName ? `User file name hint: "${hintProductName}".` : ''}

Instructions:
1. Identify the exact product title, brand/model, and category (electronics, kitchen, wearables, apparel, home, or general).
2. Ground realistic competitor market prices across Amazon, Best Buy, and Walmart in USD with accurate retail market values:
   - Flagship smartphones (Samsung Galaxy S25/S24, iPhone 16/15 Pro): $799–$1,399
   - High-end laptops & MacBooks: $900–$2,500
   - Tablets & iPads: $399–$1,100
   - Premium smartwatches & wearables: $199–$499
   - Wireless headphones: $49–$350
   - Everyday accessories, tumblers, home items: $15–$60
3. Propose an optimal price undercutting market by 10-15% to win 95%+ Amazon Buy Box share with healthy margin.
4. Estimate shipping weight in lbs and FBA fulfillment tier.
5. Provide 4 compelling Amazon SEO bullet points.

Respond ONLY with a valid raw JSON object (no markdown, no backticks, no explanation):
{
  "title": "Clear SEO title with model and key features",
  "category": "electronics",
  "competitorPrice": 999.99,
  "wholesaleCost": 680.00,
  "suggestedPrice": 889.99,
  "weightLbs": 0.45,
  "fbaTier": "Small Standard-Size ($3.42/unit)",
  "webSearchQuery": "Brand Model live price Amazon BestBuy Walmart",
  "webSources": [
    {"marketplace": "Amazon Live", "price": 999.99, "seller": "Verified Prime Buy Box", "icon": "fa-brands fa-amazon", "tag": "Amazon Buy Box"},
    {"marketplace": "Best Buy", "price": 1049.99, "seller": "Best Buy Direct", "icon": "fa-solid fa-store", "tag": "Official Retail"},
    {"marketplace": "Walmart", "price": 989.00, "seller": "Top Rated Merchant", "icon": "fa-solid fa-basket-shopping", "tag": "Top Marketplace"}
  ],
  "bullets": [
    "Feature 1 with technical detail",
    "Feature 2 with performance metric",
    "Feature 3 with build quality",
    "Feature 4 with Prime delivery and warranty"
  ]
}`;

  const rawText = await invokeNovaPro(prompt, cleanBase64, mimeType);
  const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

  let parsed = {};
  try {
    parsed = JSON.parse(cleanJson);
  } catch (e) {
    const match = rawText.match(/\{[\s\S]*\}/);
    if (match) parsed = JSON.parse(match[0]);
    else throw new Error(`Nova Pro returned non-JSON: ${rawText.slice(0, 200)}`);
  }

  parsed.imageUrl         = base64Data;
  parsed.hintProductName  = hintProductName || parsed.title;
  parsed.isNovaProLive    = true;
  parsed.novaModel        = MODEL_ID;
  return parsed;
}

/**
 * isBedrockAvailable — check if Mantle key or IAM creds are configured
 */
function isBedrockAvailable() {
  return !!(MANTLE_KEY || (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY));
}

module.exports = { invokeNovaPro, analyzeProductImageWithNova, isBedrockAvailable, MODEL_ID };
