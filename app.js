/**
 * VaultAlexa+ Controller Logic - Full Interactive Features, Popovers, & Verified Clean Product Assets
 */

const SERVER_URL = 'http://localhost:3000/mcp/v1/rpc';

let state = {
  accountBalance: 24560.80,
  investmentValue: 68125.00,
  monthlySpending: 3150.45,
  categories: {
    groceries: { title: 'Groceries', percent: 65, spent: 520, limit: 800, class: 'blue' },
    diningOut: { title: 'Dining Out', percent: 88, spent: 352, limit: 400, class: 'green' },
    utilities: { title: 'Utilities', percent: 40, spent: 120, limit: 300, class: 'purple' },
    shopping: { title: 'Shopping', percent: 72, spent: 432, limit: 600, class: 'blue' }
  },
  deals: [
    { 
      title: 'Amazon Echo Show 8', 
      discount: '30% Off', 
      price: 99.99, 
      wasPrice: 129.99, 
      badgeClass: 'blue-badge', 
      image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Running Shoes Pro', 
      discount: '15% Off', 
      price: 65.50, 
      wasPrice: null, 
      badgeClass: 'green-badge', 
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Bose Headphones 700', 
      discount: '15% Off', 
      price: 219.00, 
      wasPrice: null, 
      badgeClass: 'purple-badge', 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Kindle Paperwhite 16GB', 
      discount: '20% Off', 
      price: 119.99, 
      wasPrice: 149.99, 
      badgeClass: 'blue-badge', 
      image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Apple Watch Series 9', 
      discount: '10% Off', 
      price: 224.00, 
      wasPrice: 249.00, 
      badgeClass: 'green-badge', 
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Anker Power Bank 20K', 
      discount: '25% Off', 
      price: 37.49, 
      wasPrice: 49.99, 
      badgeClass: 'purple-badge', 
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80' 
    }
  ]
};

// DOM Elements
const chatMessagesContainer = document.getElementById('chat-messages-container');
const chatInputForm = document.getElementById('chat-input-form');
const userInputText = document.getElementById('user-input-text');
const btnVoiceInput = document.getElementById('btn-voice-input');
const listeningSection = document.getElementById('listening-section');
const listeningLabel = document.getElementById('listening-label');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const leftSidebar = document.getElementById('left-sidebar');
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
const fullShoppingGrid = document.getElementById('full-shopping-grid');
const formAddExpense = document.getElementById('form-add-expense');
const transactionLedgerList = document.getElementById('transaction-ledger-list');
const btnClearChat = document.getElementById('btn-clear-chat');
const btnSwitchToShopping = document.getElementById('btn-switch-to-shopping');

// Header Dropdowns & Popovers
const btnUserProfile = document.getElementById('btn-user-profile');
const profilePopover = document.getElementById('profile-popover');
const btnGroupShare = document.getElementById('btn-group-share');
const groupPopover = document.getElementById('group-popover');
const btnNotificationAlert = document.getElementById('btn-notification-alert');
const btnInviteMember = document.getElementById('btn-invite-member');
const btnMockLogout = document.getElementById('btn-mock-logout');

// Profile Popover Toggle
if (btnUserProfile && profilePopover) {
  btnUserProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    if (groupPopover) groupPopover.classList.remove('active');
    profilePopover.classList.toggle('active');
  });
}

// Group Sharing Popover Toggle
if (btnGroupShare && groupPopover) {
  btnGroupShare.addEventListener('click', (e) => {
    e.stopPropagation();
    if (profilePopover) profilePopover.classList.remove('active');
    groupPopover.classList.toggle('active');
  });
}

// Close Popovers when clicking outside
document.addEventListener('click', (e) => {
  if (profilePopover && !profilePopover.contains(e.target) && !btnUserProfile.contains(e.target)) {
    profilePopover.classList.remove('active');
  }
  if (groupPopover && !groupPopover.contains(e.target) && !btnGroupShare.contains(e.target)) {
    groupPopover.classList.remove('active');
  }
});

// Invite Member Action
if (btnInviteMember) {
  btnInviteMember.addEventListener('click', (e) => {
    e.stopPropagation();
    const name = prompt("Enter Household Member Name to invite to shared budget:");
    if (name && name.trim()) {
      addMessage('alexa', 'Alexa+', `👥 Invited <strong>${name.trim()}</strong> to your Amazon Household Shared Budget Pool with $500/mo spending allowance.`);
      groupPopover.classList.remove('active');
    }
  });
}

// Mock Logout Action
if (btnMockLogout) {
  btnMockLogout.addEventListener('click', (e) => {
    e.stopPropagation();
    profilePopover.classList.remove('active');
    addMessage('alexa', 'Alexa+', `🔒 Vault Session Locked for Sarah Jenkins. Passkey biometrics required for re-authentication.`);
  });
}

// Notification Alert Action
if (btnNotificationAlert) {
  btnNotificationAlert.addEventListener('click', () => {
    addMessage('alexa', 'Alexa+', `🔔 <strong>3 Unread Vault Alerts:</strong><br>• Dining Out budget reached 88% limit.<br>• Echo Show 8 price dropped by 30%.<br>• MCP Protocol RPC connection status: Active.`);
  });
}

// Sidebar Toggle Functionality
if (sidebarToggleBtn && leftSidebar) {
  sidebarToggleBtn.addEventListener('click', () => {
    leftSidebar.classList.toggle('is-collapsed');
  });
}

// Tab Navigation Logic
const menuItems = document.querySelectorAll('.menu-item');
const tabViews = document.querySelectorAll('.tab-view');

window.switchTab = function(tabId) {
  menuItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  tabViews.forEach(view => {
    if (view.id === `view-${tabId}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  if (profilePopover) profilePopover.classList.remove('active');
  if (groupPopover) groupPopover.classList.remove('active');
};

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const tabId = item.getAttribute('data-tab');
    switchTab(tabId);
  });
});

if (btnSwitchToShopping) {
  btnSwitchToShopping.addEventListener('click', () => switchTab('shopping'));
}

// Render Shopping Deals (Uniform Clean Cards)
function renderShoppingGrid() {
  if (!fullShoppingGrid) return;
  fullShoppingGrid.innerHTML = state.deals.map(deal => `
    <div class="card shopping-product-card">
      <span class="deal-discount-badge ${deal.badgeClass}">${deal.discount}</span>
      <div class="shopping-img-box">
        <img src="${deal.image}" alt="${deal.title}" loading="lazy">
      </div>
      <div class="shopping-card-body">
        <div class="product-tag"><i class="fa-brands fa-amazon"></i> Prime Delivery</div>
        <div class="shopping-title">${deal.title}</div>
        <div class="shopping-price-row">
          <span class="deal-now-price">Deal: $${deal.price.toFixed(2)}</span>
          ${deal.wasPrice ? `<span class="deal-was-price">Was $${deal.wasPrice.toFixed(2)}</span>` : ''}
        </div>
        <button class="btn-buy-alexa" onclick="buyAmazonDeal('${deal.title}', ${deal.price})">
          <i class="fa-solid fa-cart-shopping"></i> Buy with Alexa+
        </button>
      </div>
    </div>
  `).join('');
}
renderShoppingGrid();

// Global Amazon Buy Handler
window.buyAmazonDeal = function(title, price) {
  const q = `Buy ${title} for $${price}`;
  processUserQuery(q);
};

// Add Expense Form Handler (MCP Sync)
if (formAddExpense) {
  formAddExpense.addEventListener('submit', (e) => {
    e.preventDefault();
    const categoryKey = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const desc = document.getElementById('expense-desc').value.trim();

    if (isNaN(amount) || amount <= 0) return;

    // Mutate state
    state.monthlySpending += amount;
    state.accountBalance -= amount;
    
    if (state.categories[categoryKey]) {
      state.categories[categoryKey].spent += amount;
      state.categories[categoryKey].percent = Math.min(100, Math.round((state.categories[categoryKey].spent / state.categories[categoryKey].limit) * 100));
    }

    updateUIOverview();

    // Add to ledger
    const li = document.createElement('li');
    li.className = 'trans-item';
    li.innerHTML = `
      <div class="trans-info">
        <span class="trans-title">${desc}</span>
        <span class="trans-date">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${categoryKey}</span>
      </div>
      <span class="trans-amt negative">-$${amount.toFixed(2)}</span>
    `;
    transactionLedgerList.prepend(li);

    // Reset form
    formAddExpense.reset();

    // Trigger AI notification message
    addMessage('alexa', 'Alexa+', `✅ Logged expense of <strong>$${amount.toFixed(2)}</strong> for <em>${desc}</em> via MCP Protocol tool <code>log_transaction</code>. Updated remaining budget.`);
  });
}

// Card Live Flip Interaction
const primeVirtualCard = document.getElementById('prime-virtual-card');
if (primeVirtualCard) {
  let isFlipped = false;
  primeVirtualCard.addEventListener('click', () => {
    isFlipped = !isFlipped;
    primeVirtualCard.style.transform = isFlipped ? 'rotateY(180deg) translateY(-4px)' : '';
  });
}

// Update UI Values with Animated Rolling Counters
function updateUIOverview() {
  const balanceStr = `$${state.accountBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  const spentStr = `$${state.monthlySpending.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

  const balanceEl = document.getElementById('dash-account-balance');
  const cardBalanceEl = document.getElementById('card-live-balance');
  const spendEl = document.getElementById('dash-monthly-spending');

  if (balanceEl) balanceEl.textContent = balanceStr;
  if (cardBalanceEl) {
    cardBalanceEl.textContent = balanceStr;
    cardBalanceEl.style.color = '#10b981';
    setTimeout(() => { cardBalanceEl.style.color = '#38bdf8'; }, 600);
  }
  if (spendEl) spendEl.textContent = spentStr;

  const catContainer = document.getElementById('cat-progress-container');
  if (catContainer) {
    catContainer.innerHTML = Object.keys(state.categories).map(k => {
      const c = state.categories[k];
      return `
        <div class="cat-progress-row">
          <div class="cat-row-header">
            <span class="cat-row-title">${c.title}</span>
            <span class="cat-row-pct ${c.class}">${c.percent}%</span>
            <span class="cat-row-amt">$${c.spent}/$${c.limit}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill ${c.class}-fill" style="width: ${c.percent}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Clear Chat
if (btnClearChat) {
  btnClearChat.addEventListener('click', () => {
    chatMessagesContainer.innerHTML = `
      <div class="chat-msg alexa-msg">
        <div class="msg-sender-name">Alexa+</div>
        <div class="msg-bubble alexa-bubble">Chat history cleared. How can I assist with your finances or Amazon deals?</div>
      </div>
    `;
    const traceBox = document.getElementById('agent-reasoning-container');
    if (traceBox) traceBox.style.display = 'none';
  });
}

// Theme Switcher Logic
let isDarkMode = false;
themeToggleBtn.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeIcon.className = 'fa-solid fa-sun';
    themeText.textContent = 'Sun';
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.className = 'fa-solid fa-moon';
    themeText.textContent = 'Moon';
  }
});

// Synthesize Alexa Tone Chime
function playAlexaChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {}
}

// Natural Female Voice Speech Synthesis
const synth = window.speechSynthesis;
function speakAlexaVoice(text) {
  if (!synth) return;
  synth.cancel();
  // Strip HTML and MCP code tags for smooth natural speech
  const cleanText = text.replace(/<[^>]*>/g, '').replace(/\[.*?\]/g, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.05;
  utterance.pitch = 1.1; // Friendly assistant pitch

  // Pick female / English voice if available
  const voices = synth.getVoices();
  const femaleVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Zira') || v.name.includes('Victoria')));
  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }
  synth.speak(utterance);
}

// Live Agent Reasoning Trace Visualizer
function showReasoningTrace(steps, callback) {
  const container = document.getElementById('agent-reasoning-container');
  const statusBadge = document.getElementById('reasoning-status-badge');
  const list = document.getElementById('reasoning-steps-list');

  if (!container || !list) {
    if (callback) callback();
    return;
  }

  container.style.display = 'block';
  statusBadge.textContent = 'Agent Reasoning...';
  statusBadge.style.background = '#3b82f6';
  list.innerHTML = '';

  let currentStep = 0;
  function renderNextStep() {
    if (currentStep < steps.length) {
      const stepItem = document.createElement('div');
      stepItem.className = 'trace-step active';
      stepItem.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${steps[currentStep]}</span>`;
      list.appendChild(stepItem);

      setTimeout(() => {
        stepItem.className = 'trace-step done';
        stepItem.innerHTML = `<i class="fa-solid fa-check"></i> <span>${steps[currentStep]}</span>`;
        currentStep++;
        renderNextStep();
      }, 350);
    } else {
      statusBadge.textContent = 'MCP Executed';
      statusBadge.style.background = '#10b981';
      setTimeout(() => {
        if (callback) callback();
      }, 250);
    }
  }

  renderNextStep();
}

// Add Chat Message
function addMessage(sender, name, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}-msg`;
  const bubbleClass = sender === 'user' ? 'user-bubble' : 'alexa-bubble';

  msgDiv.innerHTML = `
    <div class="msg-sender-name">${name}</div>
    <div class="msg-bubble ${bubbleClass}">${text}</div>
  `;

  chatMessagesContainer.appendChild(msgDiv);
  
  // Smooth scroll to latest bottom message
  requestAnimationFrame(() => {
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    msgDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  if (sender === 'alexa') {
    playAlexaChime();
    speakAlexaVoice(text);
  }
}

// Quick Suggestion Chip Handler
window.handleChipClick = function(queryText) {
  processUserQuery(queryText);
};

// Vault Transfer Action Handler
window.transferFromSavings = function(amount) {
  state.accountBalance += amount;
  state.categories.shopping.limit += amount;
  state.categories.shopping.percent = Math.min(100, Math.round((state.categories.shopping.spent / state.categories.shopping.limit) * 100));
  updateUIOverview();
  addMessage('alexa', 'Alexa+', `✅ Successfully transferred <strong>+$${amount.toFixed(2)}</strong> from Vault Savings to Shopping Allowance. New category limit is $${state.categories.shopping.limit}.`);
};

// Process User Query with Autonomous MCP Tool Logic & Reasoning Flow
function processUserQuery(query) {
  addMessage('user', 'Sarah', query);
  const qLower = query.toLowerCase();

  if (qLower.includes('buy') || qLower.includes('purchase')) {
    // Extract actual price & item name from query or default
    let matchedDeal = state.deals.find(d => qLower.includes(d.title.toLowerCase())) || state.deals[0];
    let buyPrice = matchedDeal.price;

    // Check if user specified price directly (e.g. "Buy Running Shoes for $65.50")
    const priceMatch = query.match(/\$([0-9.]+)/) || query.match(/for ([0-9.]+)/);
    if (priceMatch) {
      const parsedPrice = parseFloat(priceMatch[1]);
      if (!isNaN(parsedPrice) && parsedPrice > 0) buyPrice = parsedPrice;
    }

    const isOverBudget = (state.categories.shopping.spent + buyPrice) > state.categories.shopping.limit;

    const traceSteps = [
      `Parsing intent: [Amazon Purchase - ${matchedDeal.title}]`,
      'Reading MCP Resource: vault://financial/overview.json',
      `Calling Tool: validate_purchase_safety(price: $${buyPrice.toFixed(2)}, limit: $${state.categories.shopping.limit})`,
      isOverBudget 
        ? `⚠️ Warning: Shopping budget limit exceeded by $${((state.categories.shopping.spent + buyPrice) - state.categories.shopping.limit).toFixed(2)}`
        : `Evaluating 30-day budget margin: Safe buffer remaining`,
      'Generating 1-Click Prime Order Dispatch'
    ];

    showReasoningTrace(traceSteps, () => {
      // Deduct actual item price
      state.accountBalance -= buyPrice;
      state.monthlySpending += buyPrice;
      state.categories.shopping.spent += buyPrice;
      state.categories.shopping.percent = Math.min(100, Math.round((state.categories.shopping.spent / state.categories.shopping.limit) * 100));
      updateUIOverview();

      const trackingNum = 'AMZ-' + Math.floor(100000 + Math.random() * 900000);

      let responseHTML = `
        <strong>MCP Tool [validate_purchase_safety]:</strong> Order verified for <em>${matchedDeal.title}</em>. 
        <div class="chat-order-card">
          <div class="order-card-header">
            <i class="fa-brands fa-amazon"></i> Prime 1-Click Order Placed
          </div>
          <div class="order-card-body">
            <img src="${matchedDeal.image}" class="order-card-thumb" alt="${matchedDeal.title}">
            <div class="order-card-details">
              <div class="order-card-title">${matchedDeal.title}</div>
              <div class="order-card-price">$${buyPrice.toFixed(2)}</div>
              <div class="order-card-dispatch">🚚 Arriving Tomorrow • Tracking: ${trackingNum}</div>
            </div>
          </div>
        </div>
      `;

      if (isOverBudget) {
        responseHTML += `
          <div class="chat-warning-card">
            <div class="warning-card-title">
              <i class="fa-solid fa-triangle-exclamation"></i> Budget Warning Threshold Reached
            </div>
            <div class="warning-card-desc">
              Your shopping category is now at <strong>${state.categories.shopping.percent}%</strong> capacity ($${state.categories.shopping.spent.toFixed(2)} / $${state.categories.shopping.limit}).
            </div>
            <div class="warning-actions-row">
              <button class="btn-warning-action primary" onclick="transferFromSavings(250)">+ Transfer $250 from Savings</button>
            </div>
          </div>
        `;
      }

      addMessage('alexa', 'Alexa+', responseHTML);
    });

  } else if (qLower.includes('track') || qLower.includes('price') || qLower.includes('drop') || qLower.includes('sniper')) {
    const traceSteps = [
      'Intent: [Amazon Price Drop Notification Watchdog]',
      'Querying Amazon Deals API via MCP Spec 2025-11-25',
      'Calling Tool: track_price_drop_target(threshold: -20%)',
      'Registering Background Price Drop Watcher'
    ];

    showReasoningTrace(traceSteps, () => {
      addMessage('alexa', 'Alexa+', `<strong>MCP Tool [track_price_drop_target]:</strong> Price Drop Sniper activated! Watching Amazon Echo Show & Bose Headphones. You'll be alerted when price drops by 20%.`);
    });

  } else if (qLower.includes('split') || qLower.includes('household') || qLower.includes('share') || qLower.includes('rent')) {
    const traceSteps = [
      'Reading MCP Resource: vault://household/summary.json',
      'Calling Tool: split_shared_expense(amount: $120.00, members: 3)',
      'Distributing $40.00 each to Sarah, Michael, David',
      'Synchronizing Shared Pool Ledger'
    ];

    showReasoningTrace(traceSteps, () => {
      addMessage('alexa', 'Alexa+', `<strong>MCP Tool [split_shared_expense]:</strong> Household expense of $120.00 split 3-ways with Michael & David ($40.00/person). Shared ledger updated.`);
    });

  } else if (qLower.includes('tech') || qLower.includes('deal') || qLower.includes('item') || qLower.includes('shopping')) {
    const traceSteps = [
      'Calling Tool: search_amazon_deals(category: "Electronics", discount_min: 15)',
      'Matching deals against remaining shopping allowance',
      'Displaying Top Curated Prime Deals'
    ];

    showReasoningTrace(traceSteps, () => {
      addMessage('alexa', 'Alexa+', '<strong>MCP Tool [search_amazon_deals]:</strong> Curated Prime deals found! Amazon Echo Show 8 ($99.99, 30% Off) & Bose 700 ($219.00). Switched to Shopping View.');
      switchTab('shopping');
    });

  } else if (qLower.includes('grocery') || qLower.includes('food')) {
    const traceSteps = [
      'Reading MCP Resource: vault://financial/overview.json',
      'Analyzing Groceries Category Threshold'
    ];

    showReasoningTrace(traceSteps, () => {
      addMessage('alexa', 'Alexa+', `<strong>MCP Tool [get_financial_summary]:</strong> You have spent $${state.categories.groceries.spent} out of $${state.categories.groceries.limit} (${state.categories.groceries.percent}%). Buffer remaining: $${state.categories.groceries.limit - state.categories.groceries.spent}.`);
    });

  } else if (qLower.includes('balance') || qLower.includes('budget') || qLower.includes('account')) {
    const traceSteps = [
      'Reading MCP Resource: vault://financial/overview.json',
      'Aggregating Liquid Checking & Investment Portfolio'
    ];

    showReasoningTrace(traceSteps, () => {
      addMessage('alexa', 'Alexa+', `<strong>MCP Resource [vault://financial/overview]:</strong> Account Balance: <strong>$${state.accountBalance.toLocaleString('en-US', {minimumFractionDigits:2})}</strong>. Investment Portfolio: <strong>$${state.investmentValue.toLocaleString('en-US', {minimumFractionDigits:2})}</strong> (+4.2%). Remaining monthly budget: <strong>$${(state.monthlySpending * 0.2).toFixed(2)}</strong>.`);
    });

  } else {
    const traceSteps = [
      'Autonomous Intent Classifier (MCP Spec 2025-11-25)',
      'Scanning 6 Registered Tools & 3 Resources',
      'Health Diagnostics: Nominal'
    ];

    showReasoningTrace(traceSteps, () => {
      addMessage('alexa', 'Alexa+', `<strong>MCP Protocol 2025-11-25:</strong> Analyzed query across 6 Tools & 3 Resources. Total monthly spending is $${state.monthlySpending.toLocaleString('en-US', {minimumFractionDigits:2})}. All system parameters nominal.`);
    });
  }
}

// Form Submission
chatInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = userInputText.value.trim();
  if (!text) return;
  userInputText.value = '';
  processUserQuery(text);
});

// Mic State Handlers (Standby vs Active Listening)
function setMicActiveState(active) {
  if (active) {
    if (listeningSection) {
      listeningSection.style.display = 'flex';
      listeningSection.classList.add('is-listening');
    }
    if (btnVoiceInput) btnVoiceInput.classList.add('active-listening');
    if (listeningLabel) listeningLabel.textContent = 'Listening... (Speak Now)';
  } else {
    if (listeningSection) {
      listeningSection.style.display = 'none';
      listeningSection.classList.remove('is-listening');
    }
    if (btnVoiceInput) btnVoiceInput.classList.remove('active-listening');
    if (listeningLabel) listeningLabel.textContent = 'Click mic to speak';
  }
}

// Live Speech Recognition for Mic
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  btnVoiceInput.addEventListener('click', () => {
    try {
      setMicActiveState(true);
      playAlexaChime();
      recognition.start();
    } catch (err) {
      setMicActiveState(false);
    }
  });

  recognition.onresult = (event) => {
    setMicActiveState(false);
    const transcript = event.results[0][0].transcript;
    processUserQuery(transcript);
  };

  recognition.onerror = () => {
    setMicActiveState(false);
  };

  recognition.onend = () => {
    setMicActiveState(false);
  };
} else {
  btnVoiceInput.addEventListener('click', () => {
    setMicActiveState(true);
    playAlexaChime();
    setTimeout(() => {
      setMicActiveState(false);
      processUserQuery('Find deals on tech items.');
    }, 2000);
  });
}

// AI Predictive Deal Financial Impact Simulator
window.simulateDealImpact = function(title, dealPrice, wasPrice) {
  const modal = document.getElementById('impact-simulator-modal');
  const modalBody = document.getElementById('impact-modal-body');
  if (!modal || !modalBody) return;

  const savings = wasPrice ? (wasPrice - dealPrice).toFixed(2) : (dealPrice * 0.2).toFixed(2);
  const remainingAllowance = Math.max(0, state.categories.shopping.limit - (state.categories.shopping.spent + dealPrice)).toFixed(2);
  const projected3MonthSavings = (dealPrice * 0.15).toFixed(2);

  modalBody.innerHTML = `
    <div class="impact-metric-grid">
      <div class="impact-card">
        <div class="impact-card-val text-green">+$${savings}</div>
        <div class="impact-card-lbl">Instant Savings (Prime Deal)</div>
      </div>
      <div class="impact-card">
        <div class="impact-card-val text-blue">$${remainingAllowance}</div>
        <div class="impact-card-lbl">Remaining Shopping Buffer</div>
      </div>
    </div>

    <div class="impact-recommendation-box">
      <p>🤖 <strong>MCP Agent Health Verdict for ${title}:</strong></p>
      <p style="margin-top:6px; color:var(--text-muted);">
        Purchasing this item today utilizes <strong>${((dealPrice / state.categories.shopping.limit) * 100).toFixed(1)}%</strong> of your monthly shopping budget. 
        Your 3-month savings projection with Prime price locks saves an estimated <strong>+$${projected3MonthSavings}</strong> in compounding interest.
      </p>
    </div>

    <div style="margin-top: 18px; display:flex; gap:10px;">
      <button class="btn-primary-action" style="width:100%;" onclick="buyAmazonDeal('${title}', ${dealPrice}); closeImpactModal();">
        <i class="fa-solid fa-cart-shopping"></i> Approve 1-Click Purchase
      </button>
    </div>
  `;

  modal.classList.add('show');
};

function closeImpactModal() {
  const modal = document.getElementById('impact-simulator-modal');
  if (modal) modal.classList.remove('show');
}

const btnCloseImpactModal = document.getElementById('btn-close-impact-modal');
if (btnCloseImpactModal) {
  btnCloseImpactModal.addEventListener('click', closeImpactModal);
}

const impactModalBackdrop = document.getElementById('impact-simulator-modal');
if (impactModalBackdrop) {
  impactModalBackdrop.addEventListener('click', (e) => {
    if (e.target === impactModalBackdrop) closeImpactModal();
  });
}

// Initialize Voice Voices on Load
if (synth) {
  synth.onvoiceschanged = () => {
    synth.getVoices();
  };
}

// Default state is Standby
setMicActiveState(false);

// Interactive Draggable Splitter Handle (Resize Agent Panel)
const chatResizerHandle = document.getElementById('chat-resizer-handle');
const chatColumn = document.getElementById('chat-column');

if (chatResizerHandle && chatColumn) {
  let isDragging = false;
  let startX = 0;
  let startWidth = 350;

  chatResizerHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startWidth = chatColumn.getBoundingClientRect().width;
    chatResizerHandle.classList.add('is-dragging');
    document.body.classList.add('resizing-active');
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    // Dragging to the left expands the chat column, dragging right shrinks it
    const deltaX = startX - e.clientX;
    const newWidth = Math.min(650, Math.max(280, startWidth + deltaX));
    chatColumn.style.width = `${newWidth}px`;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      chatResizerHandle.classList.remove('is-dragging');
      document.body.classList.remove('resizing-active');
    }
  });

  // Touch Support for Mobile / Touchscreens
  chatResizerHandle.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX;
      startWidth = chatColumn.getBoundingClientRect().width;
      chatResizerHandle.classList.add('is-dragging');
      document.body.classList.add('resizing-active');
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = startX - e.touches[0].clientX;
    const newWidth = Math.min(650, Math.max(280, startWidth + deltaX));
    chatColumn.style.width = `${newWidth}px`;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      chatResizerHandle.classList.remove('is-dragging');
      document.body.classList.remove('resizing-active');
    }
  });
}


