# VaultAlexa+ - Alexa+ Autonomous AI Financial Agent & Amazon Shopping Assistant

**Hackathon Submission for:** [Build, Ship, Shape: Amazon Developer Hackathon 2026](https://amazonappdev2026.devpost.com/)  
**Primary Track:** Alexa+ Track (Self-Hosted MCP Server & Simulated Alexa+ Agentic Experience)  
**Mini Challenges:** AWS Builder Mini Challenge & Open Source Initiative (MIT License)

---

## 📌 Overview

**VaultAlexa+** is an enterprise-grade autonomous AI financial advisor and intelligent Amazon shopping assistant designed for the **Alexa+** ecosystem. It is powered by the **Model Context Protocol (MCP)** specification (version `2025-11-25`) over JSON-RPC 2.0.

It equips Alexa+ with 6 Autonomous MCP Tools and 3 MCP Resource Schemas to deliver real-time financial protection and seamless shopping assistance:

1. **Autonomous Safe-to-Spend Validator (`validate_purchase_safety`)**: Pre-validates prospective purchase costs against remaining monthly category allowances to prevent impulsive overspending.
2. **Price Drop Sniper (`track_price_drop_target`)**: Monitors Amazon item discounts and dispatches alerts when target price thresholds are reached.
3. **Household Split Ledger (`split_shared_expense`)**: Manages multi-user family expenses and shared budget pools across Amazon Household members.
4. **Intelligent Deal Discovery (`search_amazon_deals`)**: Fetches verified Amazon Prime discounts tailored to current spending capacity.
5. **Real-time Financial Overview (`get_financial_summary`)**: Delivers accurate calculations of balances, spending rates, and budget health.
6. **Expense Logging (`log_transaction`)**: Directly registers new ledger items and updates category analytics in real time.

---

## 🏗️ Architecture & Technology Stack

- **Protocol**: Model Context Protocol (MCP) Spec Version `2025-11-25` (JSON-RPC 2.0).
- **Backend / MCP Server**: Node.js, Express, CORS.
- **Frontend / Simulator**: Vanilla HTML5, Modern CSS Design System (Amazon Brand Palette, Light/Dark Modes, Responsive Multi-Column Layout), ES6+ JavaScript, Web Audio API, Web Speech Synthesis.
- **Bonus Friction Log**: Full developer friction report available in `FRICTION_LOG.md` (10% Bonus Point Claim).

---

## 🛠️ Setup & Running Instructions

### Prerequisites
- Node.js (v18 or higher)
- Any modern web browser (Chrome, Edge, Firefox, Safari)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the MCP Server
```bash
node mcp-server.js
```
The MCP JSON-RPC Server will run at: `http://localhost:3000/mcp/v1/rpc`

### 3. Launch the Web Simulator & Dashboard
Simply double-click or open `index.html` in your browser. The application includes a **Dual-Mode System** with client-side fallback, allowing complete functional exploration even if the local Node.js server is offline.

---

## 🧪 Testing Instructions for Hackathon Judges

1. Open `index.html` in your browser.
2. Explore the **Sidebar Navigation**:
   - **Dashboard**: Live financial cards, category breakdown bars, SVG trendlines, and Alexa+ chat interface.
   - **Finance**: Interactive ledger and real-time expense logging form.
   - **Shopping**: Multi-column responsive product grid with 1-Click "Buy with Alexa+" validation.
   - **Goals**: Automated savings goals with progress tracking.
   - **Insights**: AI spending advice and live **MCP Protocol Diagnostics (Spec 2025-11-25)**.
3. Test Voice & Chat Simulator:
   - Click the **Microphone** or type: *"Buy Amazon Echo Show 8"* -> Triggers `validate_purchase_safety`.
   - Click **Avatar (Sarah Jenkins)** -> Opens Profile KYC, Vault Totals, and Credit Score popover.
   - Click **Group Icon (👥)** -> Opens Amazon Household multi-user budget pool manager.

---

## 📜 License & Friction Log

- Distributed under the **MIT Open Source License**. See `LICENSE` for details.
- Comprehensive MCP Developer Feedback report in `FRICTION_LOG.md`.
