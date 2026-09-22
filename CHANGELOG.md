# Changelog — VaultAlexa+

All notable changes to this project are documented in this file.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.5.0] — 2026-09-23

### Fixed
- **MCP Compliance**: `notifications/initialized` handler added — MCP Spec 2025-11-25 requires server to acknowledge this after handshake
- **URI Normalization**: `resources/read` now accepts both `vault://financial/overview` and `vault://financial/overview.json` — prevents curl test failures for judges
- **`resources/subscribe`**: Handler added to match `"subscribe": true` capability claim in `mcp-config.json`
- **`initialize` capabilities**: Now correctly returns `listChanged: true` and `logging: {}` per MCP Spec 2025-11-25
- **Diagnostics resource**: `vault://diagnostics/health` now returns real-time server metrics (uptime, memory, timestamp)
- **Role-aware agent routing**: `generate_morning_briefing` is now fully role-aware — Seller gets store operations briefing, Buyer gets personal finance briefing
- **Seller buy guard**: `buy/purchase/order` intent now blocked in Seller mode to prevent accidental Buyer state mutation
- **Dead code**: Removed orphaned briefing handler that was unreachable after role-aware refactor

### Added
- `.env.example` — complete environment variable reference for judges and contributors
- `CHANGELOG.md` — this file
- Screenshot gallery in `README.md`
- `docs/screenshots/` — 4 UI screenshots (dashboard, shopping, MCP inspector, AI negotiation)

### Changed
- `README.md`: Complete professional rewrite — accurate 15-tool reference table, curl examples, role-aware architecture diagram, judge testing guide, AWS services table, hackathon compliance checklist
- `mcp-config.json`: Fixed duplicate content, synced to 15 intents, correct author attribution
- `FRICTION_LOG.md`: Tool count 13 → 15, added Google Gemini 2.0 Flash to developer tools
- `.gitignore`: Expanded with secrets, IDE, coverage, and build output patterns

---

## [2.0.0] — 2026-09-22

### Added
- **Dual-Role Architecture**: Full Buyer / Seller mode with `window.currentUserRole` state management
- **Seller Mode**: `setUserRole('seller')` transforms entire UI — dashboard, finance, goals, insights, settings, sidebar
- **Seller Tools**: `predict_inventory_stockout`, `analyze_product_image_listing`, `publish_seller_product`
- **Human-in-the-Loop**: Seller listing draft review — AI generates listing, seller edits price/title, then confirms publish
- **Multimodal Vision**: Google Gemini 2.0 Flash integration for product photo → Amazon listing generation
- **Quick Action Chips**: Role-aware prompts (`PROMPT_SUGGESTIONS.buyer` vs `PROMPT_SUGGESTIONS.seller`)
- `test-dom-and-sync.js` — DOM state sync test suite
- `test-e2e-dom.js` — End-to-end role-switching E2E test suite

### Changed
- Transport upgraded: `http-jsonrpc` → `streamable-http` (MCP Spec 2025-11-25)
- Version unified: `1.0.0` → `2.5.0` across `package.json` and `mcp-config.json`
- Gemini model corrected: `gemini-3.8-flash` → `gemini-2.0-flash` (valid model ID)
- `test-mcp.js`: Field names corrected (`itemName`, `itemPrice`, `category`, `title`, `totalAmount`)

---

## [1.0.0] — 2026-09-20

### Added
- Initial VaultAlexa+ MCP Server (Express / JSON-RPC 2.0)
- 11 core Buyer tools: `get_financial_summary`, `search_amazon_deals`, `validate_purchase_safety`, `track_price_drop_target`, `split_shared_expense`, `log_transaction`, `negotiate_dynamic_discount`, `calculate_opportunity_cost`, `predict_monthly_runway`, `initiate_purchase_dispute`, `trigger_peer_split_request`
- 3 MCP Resources: `vault://financial/overview`, `vault://household/summary`, `vault://diagnostics/health`
- 2 MCP Prompts: `financial_health_audit`, `amazon_deal_negotiator`
- Web Simulator UI (`index.html` + `app.js` + `styles.css`)
- Bilingual support — EN (US) and Bahasa Indonesia (ID)
- Visual Reasoning Trace — real-time agentic chain-of-thought display
- SSE transport (`/mcp/v1/sse`) + Stdio transport (`--stdio` flag)
- `FRICTION_LOG.md` for hackathon bonus score
- MCP Inspector tab (built-in JSON-RPC playground)
- MIT License
