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

// Update UI Values
function updateUIOverview() {
  document.getElementById('dash-account-balance').textContent = `$${state.accountBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  document.getElementById('dash-monthly-spending').textContent = `$${state.monthlySpending.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

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

// Speech Synthesis
const synth = window.speechSynthesis;
function speakText(text) {
  if (!synth) return;
  synth.cancel();
  const cleanText = text.replace(/<[^>]*>/g, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.0;
  synth.speak(utterance);
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
  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

  if (sender === 'alexa') {
    playAlexaChime();
    speakText(text);
  }
}

// Process User Query with Autonomous MCP Tool Logic
function processUserQuery(query) {
  addMessage('user', 'Sarah', query);
  const qLower = query.toLowerCase();

  setTimeout(() => {
    if (qLower.includes('buy') || qLower.includes('purchase')) {
      addMessage('alexa', 'Alexa+', `🛡️ <strong>MCP Tool [validate_purchase_safety]:</strong> Validating order with your remaining shopping allowance. Safe capacity verified! Purchase order initiated with 1-Click Prime Delivery.`);
    } else if (qLower.includes('track') || qLower.includes('price') || qLower.includes('drop')) {
      addMessage('alexa', 'Alexa+', `🎯 <strong>MCP Tool [track_price_drop_target]:</strong> Price Drop Sniper activated for targeted Amazon product! Target set at -20% discount threshold.`);
    } else if (qLower.includes('split') || qLower.includes('household') || qLower.includes('share')) {
      addMessage('alexa', 'Alexa+', `👥 <strong>MCP Tool [split_shared_expense]:</strong> Household expense split 50/50 with Michael Jenkins. Updated shared pool ledger.`);
    } else if (qLower.includes('tech') || qLower.includes('deal') || qLower.includes('item')) {
      addMessage('alexa', 'Alexa+', '🛍️ <strong>MCP Tool [search_amazon_deals]:</strong> Found top verified deals! Amazon Echo Show 8 ($99.99, 30% Off) & Bose 700 ($219.00).');
      switchTab('shopping');
    } else if (qLower.includes('grocery') || qLower.includes('food')) {
      addMessage('alexa', 'Alexa+', `🥦 <strong>MCP Tool [get_financial_summary]:</strong> You have spent $${state.categories.groceries.spent} out of $${state.categories.groceries.limit} (${state.categories.groceries.percent}%). Buffer remaining: $${state.categories.groceries.limit - state.categories.groceries.spent}.`);
    } else if (qLower.includes('balance') || qLower.includes('account')) {
      addMessage('alexa', 'Alexa+', `💳 <strong>MCP Resource [vault://financial/overview]:</strong> Account Balance is $${state.accountBalance.toLocaleString('en-US', {minimumFractionDigits:2})}. Investment Value: $${state.investmentValue.toLocaleString('en-US', {minimumFractionDigits:2})} (+4.2%).`);
    } else {
      addMessage('alexa', 'Alexa+', `⚡ <strong>MCP Protocol 2025-11-25:</strong> Analyzed request via 6 Autonomous Tools & 3 Resources. Total monthly spending is $${state.monthlySpending.toLocaleString('en-US', {minimumFractionDigits:2})}. All categories healthy.`);
    }
  }, 600);
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
    if (listeningSection) listeningSection.classList.add('is-listening');
    if (btnVoiceInput) btnVoiceInput.classList.add('active-listening');
    if (listeningLabel) listeningLabel.textContent = 'Listening...';
  } else {
    if (listeningSection) listeningSection.classList.remove('is-listening');
    if (btnVoiceInput) btnVoiceInput.classList.remove('active-listening');
    if (listeningLabel) listeningLabel.textContent = 'Click mic to speak';
  }
}

// Speech Recognition for Mic
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';

  btnVoiceInput.addEventListener('click', () => {
    setMicActiveState(true);
    playAlexaChime();
    recognition.start();
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

// Default state is Standby
setMicActiveState(false);
