/**
 * VaultAlexa+ MCP Server
 * Implementation of Model Context Protocol (MCP) spec 2025-11-25
 * Enterprise-grade Financial AI Agent & Amazon Shopping Integration for Alexa+
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
  accountBalance: 24560.80,
  investmentValue: 68125.00,
  monthlyBudget: 5000.00,
  spentSoFar: 3150.45,
  remainingBudget: 1849.55,
  categories: {
    groceries: { allocated: 800, spent: 520.00, unit: 'USD' },
    diningOut: { allocated: 400, spent: 352.00, unit: 'USD' },
    utilities: { allocated: 300, spent: 120.00, unit: 'USD' },
    shopping: { allocated: 600, spent: 432.00, unit: 'USD' }
  },
  household: {
    poolLimit: 4000.00,
    poolSpent: 1850.00,
    members: [
      { id: 'usr-1', name: 'Sarah Jenkins', role: 'Owner', limit: 4000 },
      { id: 'usr-2', name: 'Michael Jenkins', role: 'Editor', limit: 2000 },
      { id: 'usr-3', name: 'David Jenkins', role: 'Viewer', limit: 150 }
    ]
  },
  priceWatchlist: [
    { id: 'deal-1', title: 'Amazon Echo Show 8', targetPrice: 89.99, currentPrice: 99.99 },
    { id: 'deal-2', title: 'Bose Headphones 700', targetPrice: 199.00, currentPrice: 219.00 }
  ],
  recentTransactions: [
    { id: 'tx-101', date: '2026-09-18', title: 'Whole Foods Market', category: 'groceries', amount: 84.50 },
    { id: 'tx-102', date: '2026-09-17', title: 'Amazon Fresh Order', category: 'groceries', amount: 120.00 },
    { id: 'tx-103', date: '2026-09-15', title: 'Salary Deposit (Amazon Dev)', category: 'income', amount: 4250.00 }
  ]
};

// Mock Amazon Deals Inventory across All Budget Categories
const amazonDeals = [
  { id: 'az-01', title: 'Whole Foods Organic Olive Oil 1L', price: 19.99, wasPrice: 24.99, discount: '20% Off', category: 'groceries', rating: 4.9 },
  { id: 'az-02', title: 'Starbucks French Roast Coffee 40oz', price: 24.90, wasPrice: 29.99, discount: '15% Off', category: 'groceries', rating: 4.8 },
  { id: 'az-03', title: 'Gourmet Dining Prime Pass $50', price: 39.99, wasPrice: 50.00, discount: '20% Off', category: 'diningOut', rating: 4.9 },
  { id: 'az-04', title: 'Philips Hue Smart LED Bulb 4-Pack', price: 49.99, wasPrice: 64.99, discount: '23% Off', category: 'utilities', rating: 4.8 },
  { id: 'az-05', title: 'Amazon Smart Thermostat', price: 59.99, wasPrice: 79.99, discount: '25% Off', category: 'utilities', rating: 4.7 },
  { id: 'az-06', title: 'Amazon Echo Show 8', price: 99.99, wasPrice: 129.99, discount: '30% Off', category: 'shopping', rating: 4.8 },
  { id: 'az-07', title: 'Running Shoes Pro', price: 65.50, wasPrice: 89.00, discount: '25% Off', category: 'shopping', rating: 4.7 },
  { id: 'az-08', title: 'Bose Headphones 700', price: 219.00, wasPrice: 279.00, discount: '20% Off', category: 'shopping', rating: 4.9 },
  { id: 'az-09', title: 'Kindle Paperwhite 16GB', price: 119.99, wasPrice: 149.99, discount: '20% Off', category: 'shopping', rating: 4.9 },
  { id: 'az-10', title: 'Apple Watch Series 9', price: 224.00, wasPrice: 249.00, discount: '10% Off', category: 'shopping', rating: 4.8 },
  { id: 'az-11', title: 'Anker Power Bank 20K', price: 37.49, wasPrice: 49.99, discount: '25% Off', category: 'shopping', rating: 4.9 }
];

// MCP Specification Tools Definitions (Spec 2025-11-25)
const MCP_TOOLS = [
  {
    name: 'get_financial_summary',
    description: 'Retrieve current monthly budget status, account balances, category breakdowns, and safe spending capacity for Alexa+',
    inputSchema: {
      type: 'object',
      properties: {
        timeframe: { type: 'string', description: 'Timeframe to query (e.g. current_month, last_30_days)' }
      }
    }
  },
  {
    name: 'search_amazon_deals',
    description: 'Search for high-rated Amazon deals and discounted products synchronized with Prime shipping',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Category filter (e.g. electronics, apparel, accessories, all)' },
        maxPrice: { type: 'number', description: 'Optional maximum price ceiling' }
      }
    }
  },
  {
    name: 'validate_purchase_safety',
    description: 'Autonomous financial safety validator: checks if a purchase exceeds remaining budget or endangers monthly goals before buying',
    inputSchema: {
      type: 'object',
      properties: {
        itemName: { type: 'string', description: 'Name of the item to purchase' },
        itemPrice: { type: 'number', description: 'Cost of the item in USD' },
        category: { type: 'string', description: 'Budget category (groceries, diningOut, utilities, shopping)' }
      },
      required: ['itemName', 'itemPrice', 'category']
    }
  },
  {
    name: 'track_price_drop_target',
    description: 'Register an automated price drop tracker / deal sniper target for an Amazon product',
    inputSchema: {
      type: 'object',
      properties: {
        itemName: { type: 'string', description: 'Name of the product to track' },
        targetPrice: { type: 'number', description: 'Target discounted price to trigger auto-alert' }
      },
      required: ['itemName', 'targetPrice']
    }
  },
  {
    name: 'split_shared_expense',
    description: 'Split a shared Amazon Household shopping or utility expense between family/team members',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Description of the expense' },
        totalAmount: { type: 'number', description: 'Total bill amount to split' },
        splitWithMemberId: { type: 'string', description: 'Target member ID in Amazon Household' }
      },
      required: ['title', 'totalAmount', 'splitWithMemberId']
    }
  },
  {
    name: 'log_transaction',
    description: 'Log a new expense into ledger and recalculate budget percentages',
    inputSchema: {
      type: 'object',
      properties: {
        amount: { type: 'number', description: 'Expense amount in USD' },
        category: { type: 'string', description: 'Category key (groceries, diningOut, utilities, shopping)' },
        description: { type: 'string', description: 'Transaction memo / merchant title' }
      },
      required: ['amount', 'category', 'description']
    }
  }
];

// MCP Resources Definitions (Spec 2025-11-25)
const MCP_RESOURCES = [
  {
    uri: 'vault://financial/overview.json',
    name: 'Vault Financial Overview Data',
    description: 'Live account balance, spending rates, and category limits in JSON',
    mimeType: 'application/json'
  },
  {
    uri: 'vault://household/summary.json',
    name: 'Amazon Household Shared Pool Ledger',
    description: 'Multi-user sharing quotas and member roles',
    mimeType: 'application/json'
  },
  {
    uri: 'vault://diagnostics/health.json',
    name: 'MCP Server Health & RPC Latency Status',
    description: 'System diagnostic metrics and version status',
    mimeType: 'application/json'
  }
];

// MCP Prompts Templates (Spec 2025-11-25)
const MCP_PROMPTS = [
  {
    name: 'financial_health_audit',
    description: 'Autonomous financial health assessment prompt template for Alexa+ LLM reasoning',
    arguments: [
      { name: 'user_persona', description: 'User spending risk profile (conservative, balanced, aggressive)', required: false }
    ]
  },
  {
    name: 'amazon_deal_negotiator',
    description: 'Prompt template to evaluate if an Amazon item is a true deal versus historical price trends',
    arguments: [
      { name: 'item_name', description: 'Product title to evaluate', required: true },
      { name: 'current_deal_price', description: 'Listed deal price', required: true }
    ]
  }
];

// MCP JSON-RPC Server Endpoint (MCP Spec 2025-11-25)
app.post('/mcp/v1/rpc', (req, res) => {
  const { jsonrpc, method, params, id } = req.body;

  if (jsonrpc !== '2.0') {
    return res.status(400).json({ jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request: Must be JSON-RPC 2.0' }, id });
  }

  // 1. Handle MCP Protocol Initialize
  if (method === 'initialize') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2025-11-25',
        capabilities: {
          tools: {},
          resources: {},
          prompts: {}
        },
        serverInfo: {
          name: 'VaultAlexa-Autonomous-MCP-Server',
          version: '2.5.0'
        }
      }
    });
  }

  // 2. Handle MCP Protocol List Tools
  if (method === 'tools/list') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        tools: MCP_TOOLS
      }
    });
  }

  // 3. Handle MCP Protocol List Resources
  if (method === 'resources/list') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        resources: MCP_RESOURCES
      }
    });
  }

  // 4. Handle MCP Protocol List Prompts
  if (method === 'prompts/list') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        prompts: MCP_PROMPTS
      }
    });
  }

  // 5. Handle MCP Protocol Get Prompt
  if (method === 'prompts/get') {
    const { name, arguments: args } = params || {};
    if (name === 'financial_health_audit') {
      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          description: 'Comprehensive financial evaluation prompt',
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Audit the user's monthly budget of $${userAccount.monthlyBudget.toFixed(2)} ($${userAccount.spentSoFar.toFixed(2)} spent so far). Identify high-risk categories and generate 3 actionable cost-cutting tips.`
              }
            }
          ]
        }
      });
    }

    if (name === 'amazon_deal_negotiator') {
      const item = (args && args.item_name) || 'Echo Show 8';
      const price = (args && args.current_deal_price) || 99.99;
      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          description: 'Amazon price vs budget evaluation prompt',
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Evaluate purchasing ${item} for $${price}. Cross-reference with current shopping allowance ($${userAccount.categories.shopping.spent.toFixed(2)}/$${userAccount.categories.shopping.allocated.toFixed(2)}). Issue a buy or wait verdict.`
              }
            }
          ]
        }
      });
    }
  }

  // 4. Handle MCP Protocol Read Resource
  if (method === 'resources/read') {
    const { uri } = params || {};
    let resourceContent = {};

    if (uri === 'vault://financial/overview.json') {
      resourceContent = userAccount;
    } else if (uri === 'vault://household/summary.json') {
      resourceContent = userAccount.household;
    } else {
      resourceContent = { status: 'HEALTHY', protocol: '2025-11-25', uptime: process.uptime() };
    }

    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(resourceContent, null, 2)
          }
        ]
      }
    });
  }

  // 5. Handle MCP Protocol Call Tool
  if (method === 'tools/call') {
    const { name, arguments: args } = params || {};

    // Tool: get_financial_summary
    if (name === 'get_financial_summary') {
      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                summary: `Account Balance: $${userAccount.accountBalance.toFixed(2)}. Monthly Spending: $${userAccount.spentSoFar.toFixed(2)} out of $${userAccount.monthlyBudget.toFixed(2)} limit. Remaining: $${userAccount.remainingBudget.toFixed(2)}.`,
                data: userAccount
              }, null, 2)
            }
          ]
        }
      });
    }

    // Tool: search_amazon_deals
    if (name === 'search_amazon_deals') {
      const filtered = args && args.category && args.category !== 'all'
        ? amazonDeals.filter(d => d.category === args.category)
        : amazonDeals;

      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ count: filtered.length, deals: filtered }, null, 2)
            }
          ]
        }
      });
    }

    // Tool: validate_purchase_safety (Agentic Autonomous Tool)
    if (name === 'validate_purchase_safety') {
      const { itemName, itemPrice, category } = args || {};
      const cat = userAccount.categories[category] || { allocated: 600, spent: 0 };
      const catRemaining = cat.allocated - cat.spent;
      const willExceed = itemPrice > catRemaining;
      const safetyRating = willExceed ? 'CAUTION_BUDGET_OVERFLOW' : 'SAFE_TO_PURCHASE';

      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                item: itemName,
                price: itemPrice,
                category,
                categoryRemaining: catRemaining,
                safetyRating,
                recommendation: willExceed
                  ? `Purchasing ${itemName} ($${itemPrice}) will exceed your remaining ${category} limit ($${catRemaining.toFixed(2)}) by $${(itemPrice - catRemaining).toFixed(2)}. Alexa+ recommends waiting until next billing cycle.`
                  : `Purchase of ${itemName} ($${itemPrice}) is verified SAFE. Your remaining ${category} buffer will be $${(catRemaining - itemPrice).toFixed(2)}.`
              }, null, 2)
            }
          ]
        }
      });
    }

    // Tool: track_price_drop_target
    if (name === 'track_price_drop_target') {
      const { itemName, targetPrice } = args || {};
      userAccount.priceWatchlist.push({ id: `wl-${Date.now()}`, title: itemName, targetPrice });

      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'TRACKER_ACTIVE',
                message: `Price drop sniper activated for "${itemName}" with target trigger at $${targetPrice}. Alexa+ will alert you upon price discount.`
              }, null, 2)
            }
          ]
        }
      });
    }

    // Tool: split_shared_expense
    if (name === 'split_shared_expense') {
      const { title, totalAmount, splitWithMemberId } = args || {};
      const share = totalAmount / 2;
      userAccount.household.poolSpent += share;

      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'EXPENSE_SPLIT',
                title,
                total: totalAmount,
                yourShare: share,
                partnerShare: share,
                message: `Split "${title}" ($${totalAmount.toFixed(2)}): charged $${share.toFixed(2)} to your card and dispatched split invoice of $${share.toFixed(2)} to member ${splitWithMemberId}.`
              }, null, 2)
            }
          ]
        }
      });
    }

    // Tool: log_transaction
    if (name === 'log_transaction') {
      const { amount, category, description } = args || {};
      userAccount.spentSoFar += Number(amount);
      userAccount.accountBalance -= Number(amount);
      userAccount.remainingBudget = userAccount.monthlyBudget - userAccount.spentSoFar;

      if (userAccount.categories[category]) {
        userAccount.categories[category].spent += Number(amount);
      }

      userAccount.recentTransactions.unshift({
        id: `tx-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        title: description,
        category,
        amount: Number(amount)
      });

      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'LOGGED_SUCCESSFULLY',
                transaction: { description, amount, category },
                updatedBalance: userAccount.accountBalance,
                remainingBudget: userAccount.remainingBudget
              }, null, 2)
            }
          ]
        }
      });
    }
  }

  // Method not found
  return res.status(404).json({
    jsonrpc: '2.0',
    error: { code: -32601, message: `Method '${method}' not found on MCP Server` },
    id
  });
});

// Root Health Diagnostic Endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'VaultAlexa+ MCP Server (Spec 2025-11-25)',
    status: 'ONLINE',
    rpcEndpoint: '/mcp/v1/rpc',
    toolsAvailable: MCP_TOOLS.map(t => t.name),
    resourcesAvailable: MCP_RESOURCES.map(r => r.uri),
    docs: 'https://github.com/karyalangitdigital/vault-alexa-mcp'
  });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 VaultAlexa+ MCP Server running on port ${PORT}`);
    console.log(`📡 JSON-RPC Endpoint: http://localhost:${PORT}/mcp/v1/rpc`);
    console.log(`📋 Protocol Version: 2025-11-25 (Alexa+ Hackathon Standard)`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
