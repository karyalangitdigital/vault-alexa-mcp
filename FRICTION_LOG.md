# Product Feedback & Friction Log: VaultAlexa+

**Submitted for:** Amazon Developer Hackathon 2026 (Bonus Score Claim: Up to 10%)  
**Track:** Alexa+ (MCP Server & Agent Skills) & AWS Builder Mini Challenge  

---

## 📋 1. Developer Tools, APIs & SDKs Used

1. **Model Context Protocol (MCP) Spec 2025-11-25**:
   - Used to expose **15 autonomous tools** across two role-based agent branches (11 Buyer tools + 4 Seller tools), including proactive executive standup `generate_morning_briefing` (role-aware: Buyer vs Seller), FBA co-pilot `predict_inventory_stockout`, runway deficit forecast `predict_monthly_runway`, and bilateral discount negotiation `negotiate_dynamic_discount`. Transport: Streamable HTTP (SSE) + JSON-RPC 2.0.
2. **AWS Bedrock / AgentCore (Simulated Integration)**:
   - Used for natural language intent resolution and multi-agent tool selection routing.
3. **Google Gemini 2.0 Flash (Multimodal Vision)**:
   - Used for AI-powered product image analysis to auto-generate Amazon-ready product listings (`analyze_product_image_listing` tool) — supporting the Human-in-the-Loop Seller workflow.
4. **Web Speech API**:
   - Used for hands-free voice synthesis (Text-to-Speech) and Speech Recognition in the Alexa+ simulator.


---

## 👍 2. What Worked Well

- **MCP Protocol Standardization**: The standardized JSON-RPC schema for tool definitions (`tools/list`, `tools/call`) made defining agentic capabilities straightforward and type-safe.
- **Agentic Flexibility**: Alexa+ can chain multiple tool calls dynamically—such as checking remaining budget first before executing a deal recommendation query.
- **Onboarding Speed**: Transitioning from zero to a working "Hello World" MCP server took under 15 minutes due to clear specification docs.

---

## ⚠️ 3. What Needs Work (Friction Entries)

### Entry #1: Streamable HTTP Header Resolution in Local Sandboxes
- **Task Attempted**: Establishing a bidirectional MCP SSE (Server-Sent Events) connection locally.
- **Steps Taken**: Initialized JSON-RPC endpoint on port 3000 and attempted long-polling headers.
- **Expected vs Actual Result**: Expected auto-reconnection headers; actually encountered CORS handshake issues on standard browsers without explicit preflight OPTIONS handling.
- **Severity Rating**: Medium.
- **Workaround Used**: Added explicit CORS middleware and JSON-RPC 2.0 fallback handler.
- **Actionable Suggestion**: Provide official SDK helpers for Express/Fastify to auto-wrap MCP JSON-RPC routes with built-in CORS and SSE handling.

### Entry #2: Visual Feedback Cards Metadata Standardization
- **Task Attempted**: Rendering rich media cards (carousels, product deals) directly from tool results.
- **Steps Taken**: Returned raw JSON payload within text content blocks.
- **Expected vs Actual Result**: Desired a standardized UI schema for rendering cards in Alexa+ visual surfaces (Echo Show / Fire TV).
- **Severity Rating**: Minor.
- **Actionable Suggestion**: Expand MCP specs to include standardized `media/card` response types.

---

## 🚀 4. Onboarding Experience & Future Commitment

- **Onboarding Score**: 9/10. The documentation for Model Context Protocol is clear, modern, and developer-friendly.
- **Would we build with these devices & services again?**: **YES!** Combining Alexa+ agentic capabilities with MCP servers unlocks enormous potential for voice-activated, personalized financial, healthcare, and smart-home applications.
