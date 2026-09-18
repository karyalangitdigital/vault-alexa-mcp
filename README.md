# VaultAlexa+ - Alexa+ Smart AI Personal Financial & Intelligent Shopping Agent

**Hackathon Submission for:** [Build, Ship, Shape: Amazon Developer Hackathon 2026](https://amazonappdev2026.devpost.com/)  
**Primary Track:** Alexa+ Track (Self-Hosted MCP Server & Simulated Alexa+ Agentic Experience)  
**Mini Challenges:** AWS Builder Mini Challenge (Amazon Bedrock / AgentCore Integration) & Open Source  

---

## 📌 Overview

**VaultAlexa+** is an autonomous AI financial assistant built for the **Alexa+** ecosystem using the **Model Context Protocol (MCP)** specification (version `2025-11-25`). 

It connects Alexa+ to user financial data, enabling users to:
1. **Monitor Budget Status**: Check monthly spending limits, category allocations, and safe remaining capacity via voice or web dashboard.
2. **Prevent Overspending**: Real-time tool-calling (`categorize_transaction`) alerts users if a prospective purchase will breach category allocations.
3. **Smart Amazon Shopping Recommendations**: Automatically query high-rated Amazon deals (`recommend_amazon_deals`) that fit safely within remaining budget bounds.
4. **Autonomous Purchase Execution**: Authorize automated purchasing workflows (`execute_smart_purchase_plan`) with Subscribe & Save discounts.

---

## 🏗️ Architecture & Technology Stack

- **Protocol Specification**: Model Context Protocol (MCP) Spec Version `2025-11-25` over JSON-RPC & Streamable HTTP.
- **Backend / MCP Server**: Node.js, Express, CORS.
- **Frontend / Simulator**: Vanilla HTML5, CSS3 Glassmorphism UI System, JavaScript ES6+, Web Speech API.
- **AWS Integration**: Simulated Amazon Bedrock / AgentCore tool orchestration.

---

## 🛠️ Setup & Running Instructions

### Prerequisites
- Node.js (v18 or higher)
- Any modern web browser (Google Chrome, Microsoft Edge, Safari)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the MCP Server
```bash
npm start
```
The MCP JSON-RPC Server will run at: `http://localhost:3000/mcp/v1/rpc`

### 3. Launch the Web Simulator & Dashboard
Open `index.html` in your peramban (browser) or run a local HTTP server.

---

## 🧪 Testing Instructions for Hackathon Judges

1. Open `index.html` in your peramban.
2. Verify the **MCP Server: Online** badge on the top navbar.
3. Click the suggestion pills or type queries in the chat simulator:
   - *"What is my remaining budget for this month?"* -> Triggers `get_financial_summary` tool.
   - *"Can I afford a $150 headphone purchase?"* -> Triggers `categorize_transaction` tool with warning.
   - *"Show me smart Amazon deals under $50"* -> Triggers `recommend_amazon_deals` tool.
4. Click **Plan Purchase** on any product card to execute an automated transaction via `execute_smart_purchase_plan`.

---

## 📜 License

Distributed under the MIT Open Source License. See `LICENSE` for details.
