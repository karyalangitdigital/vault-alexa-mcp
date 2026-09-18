/**
 * VaultAlexa+ MCP Server
 * Implementation of Model Context Protocol (MCP) spec 2025-11-25
 * Provides financial tools & Amazon deals integration for Alexa+
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock Financial Database State
const userAccount = {
  currency: 'USD',
  monthlyBudget: 2500,
  spentSoFar: 1420.50,
  remainingBudget: 1079.50,
  categories: {
    groceries: { allocated: 600, spent: 410.20 },
    entertainment: { allocated: 300, spent: 185.00 },
    utilities: { allocated: 500, spent: 440.00 },
    shopping: { allocated: 600, spent: 285.30 },
    savings: { allocated: 500, spent: 100.00 }
  },
  recentTransactions: [
    { id: 'tx-101', date: '2026-09-17', title: 'Whole Foods Market', category: 'groceries', amount: 84.50 },
    { id: 'tx-102', date: '2026-09-16', title: 'Amazon Electronics (Headphones)', category: 'shopping', amount: 129.99 },
    { id: 'tx-103', date: '2026-09-15', title: 'Power & Electric Utility', category: 'utilities', amount: 145.00 },
    { id: 'tx-104', date: '2026-09-14', title: 'Prime Video Subscription', category: 'entertainment', amount: 14.99 },
    { id: 'tx-105', date: '2026-09-12', title: 'Fresh Produce Basket', category: 'groceries', amount: 45.20 }
  ]
};

// Mock Amazon Deals Inventory
const amazonDeals = [
  { id: 'az-01', name: 'Organic Grocery Bundle (Fresh Produce & Pantry Items)', price: 28.50, originalPrice: 42.00, category: 'groceries', rating: 4.8, Prime: true, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60' },
  { id: 'az-02', name: 'Echo Dot (5th Gen) Smart Speaker with Alexa', price: 34.99, originalPrice: 49.99, category: 'shopping', rating: 4.7, Prime: true, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop&q=60' },
  { id: 'az-03', name: 'Smart LED Ergonomic Desk Lamp with Wireless Charger', price: 24.90, originalPrice: 39.99, category: 'shopping', rating: 4.6, Prime: true, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60' },
  { id: 'az-04', name: 'Stainless Steel Insulated Water Bottle (32oz)', price: 18.99, originalPrice: 29.99, category: 'shopping', rating: 4.9, Prime: true, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60' },
  { id: 'az-05', name: 'Premium Espresso Beans 2.2lbs (Subscribe & Save 15%)', price: 19.50, originalPrice: 26.00, category: 'groceries', rating: 4.9, Prime: true, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60' }
];

// MCP Specification Tools Definitions
const MCP_TOOLS = [
  {
    name: 'get_financial_summary',
    description: 'Retrieve current monthly budget status, total expenditure, and remaining safe spending capacity for Alexa+',
    inputSchema: {
      type: 'object',
      properties: {
        timeframe: { type: 'string', description: 'Timeframe to query (e.g. current_month, last_30_days)' }
      }
    }
  },
  {
    name: 'categorize_transaction',
    description: 'Categorize a transaction and check if it exceeds budget allocations',
    inputSchema: {
      type: 'object',
      properties: {
        amount: { type: 'number', description: 'Transaction amount in USD' },
        category: { type: 'string', description: 'Budget category (groceries, entertainment, utilities, shopping)' }
      },
      required: ['amount', 'category']
    }
  },
  {
    name: 'recommend_amazon_deals',
    description: 'Search for high-rated Amazon deals and essential products that fit safely within the remaining budget limit',
    inputSchema: {
      type: 'object',
      properties: {
        maxBudget: { type: 'number', description: 'Maximum budget allowed for purchase' },
        category: { type: 'string', description: 'Filter by category (all, groceries, shopping, electronics)' }
      }
    }
  },
  {
    name: 'execute_smart_purchase_plan',
    description: 'Simulate an authorized automated purchase plan that maximizes savings while keeping budget on track',
    inputSchema: {
      type: 'object',
      properties: {
        dealId: { type: 'string', description: 'ID of the deal item to purchase' },
        useSubscribeAndSave: { type: 'boolean', description: 'Apply Subscribe & Save discount' }
      },
      required: ['dealId']
    }
  }
];

// MCP JSON-RPC Server Endpoint (MCP Spec 2025-11-25)
app.post('/mcp/v1/rpc', (req, res) => {
  const { jsonrpc, method, params, id } = req.body;

  if (jsonrpc !== '2.0') {
    return res.status(400).json({ jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request: Must be JSON-RPC 2.0' }, id });
  }

  // Handle MCP Protocol Initialize
  if (method === 'initialize') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2025-11-25',
        capabilities: {
          tools: {},
          resources: {}
        },
        serverInfo: {
          name: 'VaultAlexa-MCP-Server',
          version: '1.0.0'
        }
      }
    });
  }

  // Handle MCP Protocol List Tools
  if (method === 'tools/list') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        tools: MCP_TOOLS
      }
    });
  }

  // Handle MCP Protocol Call Tool
  if (method === 'tools/call') {
    const { name, arguments: args } = params || {};

    if (name === 'get_financial_summary') {
      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                summary: `Monthly budget: $${userAccount.monthlyBudget}. Total spent: $${userAccount.spentSoFar}. Remaining safe budget: $${userAccount.remainingBudget}.`,
                details: userAccount
              }, null, 2)
            }
          ]
        }
      });
    }

    if (name === 'categorize_transaction') {
      const { amount, category } = args || {};
      const catData = userAccount.categories[category] || { allocated: 300, spent: 0 };
      const projectedSpent = catData.spent + amount;
      const isOverBudget = projectedSpent > catData.allocated;

      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                category,
                amount,
                currentSpent: catData.spent,
                allocated: catData.allocated,
                projectedTotal: projectedSpent,
                isOverBudget,
                warning: isOverBudget ? `Warning: Adding $${amount} will exceed your ${category} limit by $${(projectedSpent - catData.allocated).toFixed(2)}.` : 'Within safe budget allocation.'
              }, null, 2)
            }
          ]
        }
      });
    }

    if (name === 'recommend_amazon_deals') {
      const { maxBudget = userAccount.remainingBudget, category = 'all' } = args || {};
      let filteredDeals = amazonDeals.filter(d => d.price <= maxBudget);
      if (category !== 'all') {
        filteredDeals = filteredDeals.filter(d => d.category === category);
      }

      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                matchingCount: filteredDeals.length,
                maxBudgetAllowed: maxBudget,
                deals: filteredDeals
              }, null, 2)
            }
          ]
        }
      });
    }

    if (name === 'execute_smart_purchase_plan') {
      const { dealId, useSubscribeAndSave = false } = args || {};
      const item = amazonDeals.find(d => d.id === dealId);

      if (!item) {
        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            isError: true,
            content: [{ type: 'text', text: `Item with ID ${dealId} not found.` }]
          }
        });
      }

      let finalPrice = item.price;
      if (useSubscribeAndSave) finalPrice *= 0.85;

      userAccount.spentSoFar += finalPrice;
      userAccount.remainingBudget -= finalPrice;
      userAccount.categories.shopping.spent += finalPrice;

      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'SUCCESS',
                message: `Successfully planned purchase for '${item.name}' at $${finalPrice.toFixed(2)}.`,
                updatedSpentSoFar: userAccount.spentSoFar.toFixed(2),
                updatedRemainingBudget: userAccount.remainingBudget.toFixed(2)
              }, null, 2)
            }
          ]
        }
      });
    }

    return res.status(404).json({
      jsonrpc: '2.0',
      error: { code: -32601, message: `Tool '${name}' not found.` },
      id
    });
  }

  return res.status(400).json({
    jsonrpc: '2.0',
    error: { code: -32601, message: `Method '${method}' not supported.` },
    id
  });
});

// REST Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'VaultAlexa+ MCP Server',
    specVersion: '2025-11-25',
    activeToolsCount: MCP_TOOLS.length
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 VaultAlexa+ MCP Server running on port ${PORT}`);
  console.log(`📡 MCP Endpoint: http://localhost:${PORT}/mcp/v1/rpc`);
  console.log(`====================================================`);
});
