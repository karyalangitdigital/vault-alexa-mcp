const fs = require('fs');
const http = require('http');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');
const mcp = fs.readFileSync('mcp-server.js', 'utf8');

console.log('===========================================================');
console.log('🧪 VAULTALEXA+ DOM & SYNCHRONIZATION AUDIT SUITE');
console.log('===========================================================\n');

// 1. Check DOM IDs in app.js vs index.html
console.log('--- TEST 1: DOM Elements Referenced in app.js vs index.html ---');
const idMatches = [...js.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
const uniqueIds = [...new Set(idMatches)];
const dynamicIds = ['draft-card-price', 'draft-card-margin', 'draft-card-title', 'gemini-api-key-input', 'gemini-key-msg', 'gemini-eye-icon', 'gemini-status-badge'];
const missingIds = [];
uniqueIds.forEach(id => {
  if (!html.includes(`id="${id}"`) && !html.includes(`id='${id}'`) && !dynamicIds.includes(id)) {
    missingIds.push(id);
  }
});
console.log(`Total getElementById queries in app.js: ${uniqueIds.length}`);
if (missingIds.length > 0) {
  console.log('❌ Missing IDs in index.html:', missingIds);
} else {
  console.log(`✅ All ${uniqueIds.length} IDs referenced in app.js exist in index.html!`);
}

// 2. Check MCP Server Tools vs index.html Tools Dropdown
console.log('\n--- TEST 2: MCP Server Tools vs Dropdown Sync ---');
// Match tool definitions in mcp-server.js
const toolDefs = [...mcp.matchAll(/name:\s*['"]([a-zA-Z0-9_]+)['"]/g)].map(m => m[1]);
const ignoreNames = ['vault', 'alexa', 'financial_health_audit', 'amazon_deal_negotiator', 'include_savings_goals', 'item_name', 'current_deal_price'];
const uniqueServerTools = [...new Set(toolDefs.filter(t => !ignoreNames.includes(t)))];
console.log(`Tools defined in mcp-server.js (${uniqueServerTools.length}):`, uniqueServerTools);

// Find <select id="mcp-tool-select"> ... </select> in index.html
const selectMatch = html.match(/<select[^>]*id=["']mcp-tool-select["'][^>]*>([\s\S]*?)<\/select>/i);
if (selectMatch) {
  const options = [...selectMatch[1].matchAll(/<option[^>]*value=["']([^"']+)["']/g)].map(m => m[1]);
  console.log(`Tool options in index.html dropdown (${options.length}):`, options);
  
  const missingInHtml = uniqueServerTools.filter(t => !options.includes(t));
  const extraInHtml = options.filter(t => !uniqueServerTools.includes(t));
  
  if (missingInHtml.length > 0) {
    console.log('⚠️ Tools in mcp-server but missing in dropdown options:', missingInHtml);
  } else {
    console.log('✅ All server tools are present in the dropdown options!');
  }
  if (extraInHtml.length > 0) {
    console.log('⚠️ Extra options in dropdown not in mcp-server:', extraInHtml);
  }
} else {
  console.log('❌ mcp-tool-select element not found in HTML!');
}

// 3. Test HTTP JSON-RPC call to all tools on localhost:3000
console.log('\n--- TEST 3: Live JSON-RPC 2.0 API Test on port 3030 ---');

function callJsonRpc(method, params) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: method,
      params: params
    });

    const req = http.request({
      hostname: 'localhost',
      port: 3030,
      path: '/mcp/v1/rpc',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 3000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(postData);
    req.end();
  });
}

async function runApiTests() {
  const { spawn } = require('child_process');
  const path = require('path');
  console.log('🚀 Starting local MCP server on port 3030 for API tests...');
  const serverProcess = spawn('node', [path.join(__dirname, 'mcp-server.js')], { env: { ...process.env, PORT: '3030' } });
  
  // Wait a bit for server to start
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const toolsList = await callJsonRpc('tools/list', {});
    console.log(`✅ tools/list API responded with ${toolsList.data?.result?.tools?.length || 0} tools.`);

    // Test a few core tools
    const testCases = [
      { name: 'validate_purchase_safety', args: { item_title: 'Kindle Paperwhite', item_price: 139.99, category: 'electronics' } },
      { name: 'search_amazon_deals', args: { query: 'headphones' } },
      { name: 'generate_morning_briefing', args: { includeWatchlistRadar: true } },
      { name: 'predict_inventory_stockout', args: { productTitle: 'Echo Show 8', currentStockUnits: 5, dailySalesVelocity: 2.1 } },
      { name: 'get_financial_summary', args: {} }
    ];

    for (const tc of testCases) {
      const res = await callJsonRpc('tools/call', { name: tc.name, arguments: tc.args });
      if (res.data?.result) {
        console.log(`✅ Tool call '${tc.name}': SUCCESS`);
      } else {
        console.log(`❌ Tool call '${tc.name}': ERROR ->`, res.data?.error || res.raw || res);
      }
    }

    // Check resources
    const resourceRes = await callJsonRpc('resources/read', { uri: 'vault://financial/overview.json' });
    if (resourceRes.data?.result) {
      console.log('✅ Resource read "vault://financial/overview.json": SUCCESS');
    } else {
      console.log('❌ Resource read: ERROR ->', resourceRes.data?.error || resourceRes.raw || resourceRes);
    }
  } catch (err) {
    console.error('API Test Failed:', err.message);
  } finally {
    serverProcess.kill();
  }

  console.log('\n===========================================================');
  console.log('🏁 AUDIT FINISHED');
  console.log('===========================================================');
}

runApiTests();
