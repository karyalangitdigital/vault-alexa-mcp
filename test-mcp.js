// Test script for VaultAlexa+ MCP Server (JSON-RPC 2.0 over Stdio)
const { spawn } = require('child_process');
const path = require('path');

const mcpProcess = spawn('node', [path.join(__dirname, 'mcp-server.js')]);

console.log('🚀 Starting MCP JSON-RPC 2.0 Protocol Test...\n');

mcpProcess.stdout.on('data', (data) => {
  const raw = data.toString();
  // Filter MCP JSON lines
  const lines = raw.split('\n').filter(l => l.trim().startsWith('{'));
  lines.forEach(line => {
    try {
      const parsed = JSON.parse(line);
      console.log('📥 [MCP Response Received]:');
      console.dir(parsed, { depth: null, colors: true });
      console.log('---------------------------------------------------\n');
    } catch (e) {
      console.log('Output:', line);
    }
  });
});

mcpProcess.stderr.on('data', (data) => {
  // Stderr outputs logs
  process.stdout.write('ℹ️ ' + data.toString());
});

// Helper to send JSON-RPC requests
function sendJsonRpc(req) {
  console.log(`📤 [Sending JSON-RPC]: method="${req.method}"`);
  mcpProcess.stdin.write(JSON.stringify(req) + '\n');
}

// 1. Initialize Handshake
setTimeout(() => {
  sendJsonRpc({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-11-25",
      clientInfo: { name: "Hackathon-Judge-Client", version: "1.0.0" }
    }
  });
}, 500);

// 2. List Available Tools
setTimeout(() => {
  sendJsonRpc({
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list",
    params: {}
  });
}, 1200);

// 3. Call Tool: validate_purchase_safety
setTimeout(() => {
  sendJsonRpc({
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: {
      name: "validate_purchase_safety",
      arguments: {
        item_title: "Amazon Echo Show 8 (3rd Gen)",
        item_price: 149.99,
        category: "Smart Home"
      }
    }
  });
}, 2000);

// 4. Call Tool: split_shared_expense
setTimeout(() => {
  sendJsonRpc({
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: {
      name: "split_shared_expense",
      arguments: {
        description: "Weekly Grocery & Whole Foods",
        total_amount: 150.00
      }
    }
  });
}, 2800);

// 5. Read Resource
setTimeout(() => {
  sendJsonRpc({
    jsonrpc: "2.0",
    id: 5,
    method: "resources/read",
    params: {
      uri: "vault://financial/overview.json"
    }
  });
}, 3500);

// Exit test after completions
setTimeout(() => {
  console.log('✅ MCP Protocol Verification Test Complete!');
  mcpProcess.kill();
  process.exit(0);
}, 4500);
