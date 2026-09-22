const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

console.log('================================================================');
console.log('🤖 VAULTALEXA+ DEEP HEADLESS E2E DOM & LOGIC AUDIT');
console.log('================================================================\n');

const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Setup JSDOM
const dom = new JSDOM(htmlContent, {
  url: 'http://localhost:3000/app',
  runScripts: 'outside-only',
  beforeParse(window) {
    // Polyfill Audio
    window.Audio = class {
      play() { return Promise.resolve(); }
      pause() {}
    };
    // Polyfill prompt & alert
    window.prompt = () => "Test Member";
    window.alert = () => {};
    // Polyfill scrollTo
    window.HTMLElement.prototype.scrollTo = () => {};
    window.HTMLElement.prototype.scrollIntoView = () => {};
  }
});

const { window } = dom;
const { document } = window;

// Collect any uncaught window errors
const errors = [];
window.addEventListener('error', (e) => {
  errors.push(e.message || e.error);
});

let failedTests = 0;
let passedTests = 0;

function assert(condition, testName, detail = '') {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}${detail ? ' -> ' + detail : ''}`);
    failedTests++;
  }
}

async function runE2EAudit() {
  try {
    // 1. Load app.js into DOM
    console.log('--- PHASE 1: Loading app.js into DOM ---');
    const appJsCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
    dom.window.eval(appJsCode);

    assert(errors.length === 0, 'No uncaught syntax or runtime errors during initialization', errors.join('; '));

    // 2. Audit 3-Column Layout & Docking
    console.log('\n--- PHASE 2: 3-Column Layout & Docked Chat Verification ---');
    const leftSidebar = document.getElementById('left-sidebar');
    const centerViews = document.querySelector('.center-views-container');
    const chatColumn = document.getElementById('chat-column');
    const resizerHandle = document.getElementById('chat-resizer-handle');
    const floatingLauncher = document.getElementById('floating-chat-launcher');

    assert(!!leftSidebar, 'Left sidebar exists');
    assert(!!centerViews, 'Center views container exists');
    assert(!!chatColumn, 'Chat column exists');
    assert(!chatColumn.classList.contains('is-closed'), 'Chat column is OPEN (docked on side) by default');
    assert(!!resizerHandle, 'Draggable resizer handle exists between center views and chat column');
    assert(!resizerHandle.classList.contains('is-hidden'), 'Resizer handle is VISIBLE by default');
    assert(!floatingLauncher.classList.contains('is-visible'), 'Floating launcher bubble is HIDDEN by default');

    // 3. Audit Initial Dashboard Content
    console.log('\n--- PHASE 3: Dashboard & Components Rendering ---');
    const dealCards = document.querySelectorAll('.deal-item-card');
    assert(dealCards.length > 0, `Deal cards rendered in dashboard (Found: ${dealCards.length})`);

    const balanceEl = document.getElementById('dash-account-balance');
    assert(balanceEl && balanceEl.textContent.includes('24,560'), `Account balance formatted correctly: "${balanceEl?.textContent}"`);

    // 4. Audit Tab Navigation
    console.log('\n--- PHASE 4: Tab Navigation Switching ---');
    const tabsToTest = ['finance', 'shopping', 'goals', 'insights', 'settings', 'mcp-inspector', 'dashboard'];
    for (const tabId of tabsToTest) {
      window.switchTab(tabId);
      const activeTab = document.querySelector('.tab-view.active');
      assert(activeTab && activeTab.id === `view-${tabId}`, `Tab successfully switched to view-${tabId}`);
    }

    // 5. Audit Role Switching (Buyer -> Seller -> Buyer)
    console.log('\n--- PHASE 5: Buyer vs Seller Role Synchronization ---');
    const roleBadge = document.getElementById('header-role-badge');
    const userName = document.getElementById('header-user-name');
    const chipContainer = document.getElementById('chat-quick-chips');

    // Switch to Seller
    window.setUserRole('seller');
    assert(window.currentUserRole === 'seller', 'currentUserRole set to seller');
    assert(roleBadge && roleBadge.textContent.toLowerCase().includes('seller'), `Role badge updated to Seller: "${roleBadge?.textContent}"`);
    assert(userName && userName.textContent.includes('Apex'), `User name updated to Seller name: "${userName?.textContent}"`);
    assert(chipContainer && (chipContainer.innerHTML.includes('Restock') || chipContainer.innerHTML.includes('Stock') || chipContainer.innerHTML.includes('Omzet') || chipContainer.innerHTML.includes('Revenue')), 'Chat chips updated with Seller specific prompts');
    
    // Check Seller Settings rendered
    const settingsPanel = document.getElementById('settings-card-container');
    assert(settingsPanel && (settingsPanel.innerHTML.includes('FBA') || settingsPanel.innerHTML.includes('Merchant') || settingsPanel.innerHTML.includes('Toko')), 'Settings panel displays Seller store settings');

    // Switch back to Buyer
    window.setUserRole('buyer');
    assert(window.currentUserRole === 'buyer', 'currentUserRole returned to buyer');
    assert(roleBadge && roleBadge.textContent.toLowerCase().includes('buyer'), `Role badge restored to Buyer: "${roleBadge?.textContent}"`);
    assert(userName && userName.textContent.includes('Sarah'), `User name restored to Sarah Jenkins: "${userName?.textContent}"`);
    assert(chipContainer && (chipContainer.innerHTML.includes('Standup') || chipContainer.innerHTML.includes('Budget')), 'Chat chips restored to Buyer specific prompts');

    // 6. Audit Chat Interactions & Prompts
    console.log('\n--- PHASE 6: Chat Panel Functional Interaction ---');
    const chatContainer = document.getElementById('chat-messages-container');
    const initialMsgCount = chatContainer.querySelectorAll('.chat-msg').length;

    // Simulate clicking a chip
    window.handleChipClick('What is my remaining safe-to-spend budget?');
    // Fast-forward any simulated response timers if any
    await new Promise(r => setTimeout(r, 1200));

    const updatedMsgCount = chatContainer.querySelectorAll('.chat-msg').length;
    assert(updatedMsgCount > initialMsgCount, `Chat message added after chip click (From ${initialMsgCount} to ${updatedMsgCount})`);

    // Simulate user typing custom input
    const chatInput = document.getElementById('user-input-text');
    const chatForm = document.getElementById('chat-input-form');
    chatInput.value = 'Find tech deals';
    chatForm.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));

    await new Promise(r => setTimeout(r, 1200));
    const afterCustomInputCount = chatContainer.querySelectorAll('.chat-msg').length;
    assert(afterCustomInputCount > updatedMsgCount, `Alexa responded to custom input (Message count: ${afterCustomInputCount})`);

    // 7. Audit Chat Minimize (X) and Restore (Floating Bubble)
    console.log('\n--- PHASE 7: Minimize to Bubble & Restore Docking ---');
    window.closeChatPanel();
    assert(chatColumn.classList.contains('is-closed'), 'Chat column is-closed added on minimize');
    assert(floatingLauncher.classList.contains('is-visible'), 'Floating launcher is-visible added on minimize');

    window.openChatPanel();
    assert(!chatColumn.classList.contains('is-closed'), 'Chat column is-closed removed on reopen');
    assert(!floatingLauncher.classList.contains('is-visible'), 'Floating launcher is-visible removed on reopen');

    // 8. Audit MCP Inspector & 15 Tools Execution
    console.log('\n--- PHASE 8: MCP Inspector Tools Execution ---');
    window.switchTab('mcp-inspector');
    const mcpSelect = document.getElementById('mcp-tool-select');
    const mcpCodeOutput = document.getElementById('inspector-json-code');
    const executeBtn = document.getElementById('btn-execute-mcp-tool');

    assert(mcpSelect && mcpSelect.options.length === 15, `MCP Inspector dropdown has all 15 tools (Found: ${mcpSelect.options.length})`);

    // Test executing every single tool in the inspector
    let allToolsPassed = true;
    for (let i = 0; i < mcpSelect.options.length; i++) {
      const toolVal = mcpSelect.options[i].value;
      mcpSelect.value = toolVal;
      window.onInspectorToolChange(toolVal);
      window.executeInspectorTool();

      try {
        const parsed = JSON.parse(mcpCodeOutput.textContent);
        if (!parsed.result || parsed.error) {
          allToolsPassed = false;
          console.error(`  ⚠️ Tool ${toolVal} returned error:`, parsed);
        }
      } catch (e) {
        allToolsPassed = false;
        console.error(`  ⚠️ Tool ${toolVal} produced invalid JSON output`);
      }
    }
    assert(allToolsPassed, 'All 15 MCP tools executed successfully in the Inspector with valid JSON-RPC 2.0 payloads');

    // 9. Audit Modal Simulator
    console.log('\n--- PHASE 9: Interactive Deal Impact Modal ---');
    window.simulateDealImpact('Amazon Echo Show 8', 99.99, 129.99);
    const modal = document.getElementById('impact-simulator-modal');
    assert(modal && modal.classList.contains('show'), 'Impact simulator modal opened with .show');

    window.closeImpactModal();
    assert(!modal.classList.contains('show'), 'Impact simulator modal closed successfully');

    // 10. Audit Language Switcher (US <-> ID)
    console.log('\n--- PHASE 10: Language Toggle (US <-> ID) ---');
    const langBtn = document.getElementById('btn-lang-toggle');
    const langLabel = document.getElementById('lang-current-label');
    assert(!!langBtn, 'Language switch button exists in header');

    if (langBtn) {
      langBtn.click();
      assert(window.currentLang === 'ID', `Language switched to ID (currentLang: ${window.currentLang})`);
      assert(langLabel && langLabel.textContent === 'ID', `Lang label updated to ID: "${langLabel?.textContent}"`);
      
      langBtn.click();
      assert(window.currentLang === 'US', `Language switched back to US (currentLang: ${window.currentLang})`);
      assert(langLabel && langLabel.textContent === 'US', `Lang label updated back to US: "${langLabel?.textContent}"`);
    }

    // 11. Audit Multimodal AI Vision Auto-Listing & Chat Review Workflow
    console.log('\n--- PHASE 11: AI Vision Auto-Listing & Human-in-the-Loop Chat Review ---');
    window.setUserRole('seller');
    const visionCard = document.getElementById('seller-vision-listing-container');
    assert(visionCard && visionCard.style.display === 'block', 'Vision auto-listing container visible in Seller mode');

    // 11A. Trigger Sample Product Scan
    window.triggerSampleListing('headphones');
    await new Promise(r => setTimeout(r, 1400));

    const draftCard = document.getElementById('active-chat-draft-card');
    assert(!!draftCard, 'Active Draft Review Card generated and rendered in Alexa+ Chat');
    const draftPriceEl = document.getElementById('draft-card-price');
    assert(draftPriceEl && draftPriceEl.textContent.includes('49.99'), `Initial suggested price is $49.99 (Found: "${draftPriceEl?.textContent}")`);

    // 11B. Audit Live Market Web Search Grounding Elements
    const webSearchBox = draftCard.querySelector('.draft-web-search-box');
    assert(!!webSearchBox, 'Web search market grounding container rendered in draft card');
    const sourcePills = draftCard.querySelectorAll('.web-source-pill');
    assert(sourcePills.length === 3, `Grounded 3 competitor market sources rendered (Found: ${sourcePills.length})`);
    const logicNote = draftCard.querySelector('.pricing-logic-note');
    assert(logicNote && logicNote.textContent.includes('Buy Box'), 'Buy Box data-driven pricing explanation rendered');

    // 11C. Simulate Seller Modifying Price via Chat
    const sellerChatInput = document.getElementById('user-input-text');
    const sellerChatForm = document.getElementById('chat-input-form');
    sellerChatInput.value = 'Ubah harga ke $44.50';
    sellerChatForm.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));

    await new Promise(r => setTimeout(r, 600));
    assert(draftPriceEl && draftPriceEl.textContent.includes('44.50'), `Draft card price dynamically updated to $44.50 via chat (Found: "${draftPriceEl?.textContent}")`);

    // 11C. Confirm and Publish Product to Store
    const initialProductCount = window.eval('SELLER_PRODUCTS.length');
    window.confirmPublishDraft();

    const updatedProductCount = window.eval('SELLER_PRODUCTS.length');
    assert(updatedProductCount === initialProductCount + 1, `Product successfully added to SELLER_PRODUCTS catalog (${initialProductCount} -> ${updatedProductCount})`);
    
    const newestItem = window.eval('SELLER_PRODUCTS[0]');
    assert(newestItem && newestItem.price === 44.50, `Newly listed item has the updated price of $44.50 (Found: $${newestItem?.price})`);
    assert(newestItem && newestItem.asin.startsWith('B09'), `Newly listed item assigned valid Amazon ASIN: ${newestItem?.asin}`);

    // 12. Audit Real Local PC Image Upload & Dynamic Web Search Grounding
    console.log('\n--- PHASE 12: Real Local PC Image Upload & Dynamic Web Search Pricing Grounding ---');
    const customDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const customFilename = 'mouse-gaming-rgb.png';
    const customHint = customFilename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

    const generatedCustomListing = window.buildListingDataFromUploadedFile(customHint, customDataUrl);
    assert(generatedCustomListing && generatedCustomListing.category === 'electronics', 'Dynamic category classified as electronics for mouse upload');
    assert(generatedCustomListing && generatedCustomListing.webSearchQuery.includes('live price'), 'Dynamic web search query generated for uploaded mouse');
    assert(generatedCustomListing && generatedCustomListing.webSources.length === 3, 'Grounded 3 web search sources created for custom item');

    // Trigger scanning for uploaded local file
    window.scanProductImageForListing(customDataUrl, customHint, generatedCustomListing);
    await new Promise(r => setTimeout(r, 1200));

    const localDraftCard = document.getElementById('active-chat-draft-card');
    assert(!!localDraftCard, 'Draft review card rendered for local PC upload');
    const localDraftTitle = document.getElementById('draft-card-title');
    assert(localDraftTitle && localDraftTitle.textContent.toLowerCase().includes('mouse'), `Draft card title dynamically reflects uploaded product: "${localDraftTitle?.textContent}"`);
    const localWebSearchQuery = localDraftCard.querySelector('.web-search-query');
    assert(localWebSearchQuery && localWebSearchQuery.textContent.toLowerCase().includes('mouse'), `Web search query contains uploaded product name: "${localWebSearchQuery?.textContent?.trim()}"`);

    // Confirm publish for the uploaded local product
    const countBeforeUpload = window.eval('SELLER_PRODUCTS.length');
    window.confirmPublishDraft();
    const countAfterUpload = window.eval('SELLER_PRODUCTS.length');
    assert(countAfterUpload === countBeforeUpload + 1, `Uploaded product successfully added to store catalog (${countBeforeUpload} -> ${countAfterUpload})`);
    const newestUploaded = window.eval('SELLER_PRODUCTS[0]');
    assert(newestUploaded && newestUploaded.image === customDataUrl, 'Catalog item retains uploaded local image data');

    // 13. Audit Google Gemini Live AI Integration (Judge Manual Input & Chat Setup)
    console.log('\n--- PHASE 13: Google Gemini Live AI Configuration (Judge Manual Setup) ---');
    window.switchTab('settings');
    const geminiCard = document.getElementById('gemini-settings-card');
    assert(!!geminiCard, 'Gemini AI integration card rendered in Settings tab');

    const geminiInput = document.getElementById('gemini-api-key-input');
    assert(!!geminiInput, 'Gemini API key input field exists for judges');

    // 13A. Simulate Judge Typing Key and Saving via Button
    geminiInput.value = 'AIzaSyFakeKeyForJudgeManualTesting123';
    window.saveGeminiApiKey();

    assert(window.localStorage.getItem('gemini_api_key') === 'AIzaSyFakeKeyForJudgeManualTesting123', 'API key correctly persisted to localStorage');
    const statusBadge = document.getElementById('gemini-status-badge');
    assert(statusBadge && statusBadge.classList.contains('status-connected'), 'Status badge reflects connected Gemini Live state');

    // 13B. Simulate Reset / Clear
    window.clearGeminiApiKey();
    assert(!window.localStorage.getItem('gemini_api_key'), 'API key cleared from localStorage');
    assert(statusBadge && statusBadge.classList.contains('status-simulated'), 'Status badge restored to simulated default state');

    // 13C. Simulate Setting Key via Chat Input
    const geminiChatInput = document.getElementById('user-input-text');
    const geminiChatForm = document.getElementById('chat-input-form');
    geminiChatInput.value = 'Gunakan Gemini API Key AIzaSyChatProvidedKeyForJudgeTesting99';
    geminiChatForm.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));

    await new Promise(r => setTimeout(r, 400));
    assert(window.localStorage.getItem('gemini_api_key') === 'AIzaSyChatProvidedKeyForJudgeTesting99', 'API key saved via chat natural language command');

    // Cleanup key to keep environment pristine
    window.clearGeminiApiKey();

  } catch (err) {
    console.error('💥 Fatal error during E2E audit:', err);
    failedTests++;
  }

  console.log('\n================================================================');
  console.log(`📊 AUDIT SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('================================================================');

  process.exit(failedTests > 0 ? 1 : 0);
}

runE2EAudit();
