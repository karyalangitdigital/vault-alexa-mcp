'use strict';
/**
 * bedrock-client.js — Amazon Nova Pro via AWS Bedrock
 * VaultAlexa+ MCP Server | Amazon Developer Hackathon 2026
 *
 * Auth Priority:
 *   1. IAM Credentials  (AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY) — SigV4, full $150 credit
 *   2. Mantle API Key   (BEDROCK_MANTLE_API_KEY)                    — Bearer token, demo quota
 */

require('dotenv').config();
const https = require('https');

const REGION    = process.env.AWS_REGION            || 'us-east-1';
const ACCESS_ID = (process.env.AWS_ACCESS_KEY_ID     || '').trim();
const SECRET    = (process.env.AWS_SECRET_ACCESS_KEY  || '').trim();
const MANTLE    = (process.env.BEDROCK_MANTLE_API_KEY || '').trim();
const MODEL_ID  = 'amazon.nova-pro-v1:0';
const HOST      = `bedrock-runtime.${REGION}.amazonaws.com`;

// ─── Use official AWS SDK when IAM creds are present ────────────────────────
let _sdkClient = null;
function getSdkClient() {
  if (_sdkClient) return _sdkClient;
  const { BedrockRuntimeClient } = require('@aws-sdk/client-bedrock-runtime');
  _sdkClient = new BedrockRuntimeClient({
    region:      REGION,
    credentials: { accessKeyId: ACCESS_ID, secretAccessKey: SECRET }
  });
  return _sdkClient;
}

// ─── HTTPS helper (for Mantle Bearer token) ──────────────────────────────────
function makeRequest(headers, payload) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      path:     `/model/${encodeURIComponent(MODEL_ID)}/invoke`,
      method:   'POST',
      headers:  { ...headers, 'Content-Length': Buffer.byteLength(payload) }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`Bedrock HTTP ${res.statusCode}: ${parsed.message || parsed.Message || JSON.stringify(parsed)}`));
          } else { resolve(parsed); }
        } catch (e) { reject(new Error(`Bedrock parse error: ${data.slice(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => req.destroy(new Error('Bedrock timeout (30s)')));
    req.write(payload); req.end();
  });
}

// ─── Nova Pro Invocation ──────────────────────────────────────────────────────
async function invokeNovaPro(textPrompt, imageBase64 = null, imageMime = 'image/jpeg') {
  const contentParts = [];
  if (imageBase64) {
    const fmt = (imageMime || 'image/jpeg').replace('image/', '');
    contentParts.push({ image: { format: fmt, source: { bytes: imageBase64 } } });
  }
  contentParts.push({ text: textPrompt });

  const bodyObj = {
    messages:       [{ role: 'user', content: contentParts }],
    inferenceConfig: { maxTokens: 1500, temperature: 0.2, topP: 0.9 }
  };

  let response;

  // ── Priority 1: IAM SigV4 via AWS SDK (full $150 credit, no rate limit) ──
  if (ACCESS_ID && SECRET) {
    const { InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
    const client  = getSdkClient();
    const command = new InvokeModelCommand({
      modelId:     MODEL_ID,
      contentType: 'application/json',
      accept:      'application/json',
      body:        JSON.stringify(bodyObj)
    });
    const sdkResp = await client.send(command);
    response = JSON.parse(Buffer.from(sdkResp.body).toString());
  }
  // ── Priority 2: Mantle Bearer token (demo key, limited daily quota) ──
  else if (MANTLE) {
    response = await makeRequest({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${MANTLE}`
    }, JSON.stringify(bodyObj));
  }
  else {
    throw new Error('No Bedrock credentials — set AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY in .env');
  }

  const text = response?.output?.message?.content?.[0]?.text
             || response?.results?.[0]?.outputText
             || '';
  if (!text) throw new Error('Nova Pro returned empty response');
  return text;
}

// ─── Product Image → Amazon Listing ─────────────────────────────────────────
async function analyzeProductImageWithNova(base64Data, mimeType, hintProductName) {
  const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');

  const prompt = `You are VaultAlexa+, an autonomous Amazon FBA commercial cataloging specialist.
Analyze this product image carefully.
${hintProductName ? `User file name hint: "${hintProductName}".` : ''}

Instructions:
1. Identify the exact product title, brand/model, and category (electronics, kitchen, wearables, apparel, home, or general).
2. Ground realistic competitor market prices across Amazon, Best Buy, and Walmart in USD:
   - Flagship smartphones (Samsung Galaxy S25/S24, iPhone 16/15 Pro): $799–$1,399
   - High-end laptops & MacBooks: $900–$2,500
   - Tablets & iPads: $399–$1,100
   - Premium smartwatches & wearables: $199–$499
   - Wireless headphones: $49–$350
   - Everyday accessories, tumblers, home items: $15–$60
3. Propose optimal price undercutting market by 10-15% to win 95%+ Amazon Buy Box.
4. Estimate shipping weight in lbs and FBA fulfillment tier.
5. Provide 4 compelling Amazon SEO bullet points.

Respond ONLY with a valid raw JSON object (no markdown, no backticks):
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
  "bullets": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
}`;

  const rawText = await invokeNovaPro(prompt, cleanBase64, mimeType);
  const clean   = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

  let parsed = {};
  try { parsed = JSON.parse(clean); }
  catch (e) {
    const m = rawText.match(/\{[\s\S]*\}/);
    if (m) parsed = JSON.parse(m[0]);
    else throw new Error(`Nova Pro non-JSON: ${rawText.slice(0, 200)}`);
  }

  parsed.imageUrl        = base64Data;
  parsed.hintProductName = hintProductName || parsed.title;
  parsed.isNovaProLive   = true;
  parsed.novaModel       = MODEL_ID;
  parsed.authMethod      = (ACCESS_ID && SECRET) ? 'IAM-SigV4' : 'Mantle-Bearer';
  return parsed;
}

function isBedrockAvailable() {
  return !!(ACCESS_ID && SECRET) || !!MANTLE;
}

function getAuthMode() {
  if (ACCESS_ID && SECRET) return 'IAM SigV4 (Full Access)';
  if (MANTLE)              return 'Mantle Bearer Token (Demo)';
  return 'Not configured';
}

module.exports = { invokeNovaPro, analyzeProductImageWithNova, isBedrockAvailable, getAuthMode, MODEL_ID };
