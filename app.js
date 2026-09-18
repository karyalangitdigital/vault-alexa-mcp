/**
 * VaultAlexa+ Controller Logic - Full Interactive Features, Bilingual ID/US, Popovers, & Verified Clean Product Assets
 */

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
      title: 'Whole Foods Organic Olive Oil 1L', 
      category: 'groceries',
      discount: '20% Off', 
      price: 19.99, 
      wasPrice: 24.99, 
      badgeClass: 'green-badge', 
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Starbucks French Roast Coffee 40oz', 
      category: 'groceries',
      discount: '15% Off', 
      price: 24.90, 
      wasPrice: 29.99, 
      badgeClass: 'purple-badge', 
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Gourmet Dining Prime Pass $50', 
      category: 'diningOut',
      discount: '20% Off', 
      price: 39.99, 
      wasPrice: 50.00, 
      badgeClass: 'blue-badge', 
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Philips Hue Smart LED Bulb 4-Pack', 
      category: 'utilities',
      discount: '23% Off', 
      price: 49.99, 
      wasPrice: 64.99, 
      badgeClass: 'green-badge', 
      image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Amazon Smart Thermostat', 
      category: 'utilities',
      discount: '25% Off', 
      price: 59.99, 
      wasPrice: 79.99, 
      badgeClass: 'purple-badge', 
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Amazon Echo Show 8', 
      category: 'shopping',
      discount: '30% Off', 
      price: 99.99, 
      wasPrice: 129.99, 
      badgeClass: 'blue-badge', 
      image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Running Shoes Pro', 
      category: 'shopping',
      discount: '25% Off', 
      price: 65.50, 
      wasPrice: 89.00, 
      badgeClass: 'green-badge', 
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Bose Headphones 700', 
      category: 'shopping',
      discount: '20% Off', 
      price: 219.00, 
      wasPrice: 279.00, 
      badgeClass: 'purple-badge', 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Kindle Paperwhite 16GB', 
      category: 'shopping',
      discount: '20% Off', 
      price: 119.99, 
      wasPrice: 149.99, 
      badgeClass: 'blue-badge', 
      image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Apple Watch Series 9', 
      category: 'shopping',
      discount: '10% Off', 
      price: 224.00, 
      wasPrice: 249.00, 
      badgeClass: 'green-badge', 
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80' 
    },
    { 
      title: 'Anker Power Bank 20K', 
      category: 'shopping',
      discount: '25% Off', 
      price: 37.49, 
      wasPrice: 49.99, 
      badgeClass: 'purple-badge', 
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80' 
    }
  ]
};

// Bilingual Dictionaries
let currentLang = 'ID'; // Default to Indonesian

const I18N_DICT = {
  ID: {
    langBtn: 'ID',
    logoSub: 'Agen Keuangan AI & Asisten Belanja Amazon',
    searchPlaceholder: 'Cari transaksi, promo, target tabungan...',
    navDashboard: 'Dashboard',
    navFinance: 'Keuangan',
    navShopping: 'Belanja',
    navGoals: 'Target',
    navInsights: 'Wawasan AI',
    navSettings: 'Pengaturan',
    navMcpInspector: 'Inspektur MCP',
    overviewTitle: 'Ringkasan Keuangan Anda',
    accBalanceLbl: 'Saldo Rekening',
    investValLbl: 'Nilai Investasi',
    monthlySpendLbl: 'Pengeluaran Bulan Ini',
    budgetBreakdownTitle: 'Rincian Kategori Anggaran',
    catGroceries: 'Kebutuhan Pokok',
    catDining: 'Makan di Luar',
    catUtilities: 'Tagihan & Listrik',
    catShopping: 'Belanja Santai',
    smartDealsTitle: 'Promo Cerdas Amazon',
    shoppingTitle: 'Asisten Belanja Cerdas Amazon',
    shoppingDesc: 'Promo pilihan Amazon yang tersinkronisasi dengan kemampuan pembelian suara Alexa+ dan pemeriksaan batas anggaran aman.',
    financeTitle: 'Buku Kas & Pelacak Pengeluaran',
    financeDesc: 'Catat transaksi dan pantau alokasi kategori anggaran secara real-time via Protokol MCP.',
    goalsTitle: 'Target Finansial & Tabungan Masa Depan',
    goalsDesc: 'Lacak progres tabungan otomatis dan alokasi dana cadangan.',
    insightsTitle: 'Wawasan Keuangan Berbasis AI',
    insightsDesc: 'Analisis prediktif dan rekomendasi efisiensi pengeluaran bulanan.',
    settingsTitle: 'Pengaturan Agen & Aplikasi',
    settingsDesc: 'Konfigurasikan preferensi suara AI Alexa+, nada dering, dan integrasi MCP.',
    chatTitle: 'Obrolan dengan Alexa+',
    chatInputPlaceholder: 'Ketik atau bicara ke VaultAlexa+...',
    chipBudget: '📊 Sisa Anggaran',
    chipDeals: '🛍️ Promo Teknologi',
    chipSplit: '👥 Bagi Tagihan',
    chipSniper: '🎯 Pemburu Diskon',
    listeningActive: 'Mendengarkan... (Silakan Bicara)',
    listeningStandby: 'Klik mic untuk bicara'
  },
  US: {
    langBtn: 'US',
    logoSub: 'AI Financial Agent & Amazon Shopping Assistant',
    searchPlaceholder: 'Search transactions, deals, goals...',
    navDashboard: 'Dashboard',
    navFinance: 'Finance',
    navShopping: 'Shopping',
    navGoals: 'Goals',
    navInsights: 'Insights',
    navSettings: 'Settings',
    navMcpInspector: 'MCP Inspector',
    overviewTitle: 'Your Financial Overview',
    accBalanceLbl: 'Account Balance',
    investValLbl: 'Investment Value',
    monthlySpendLbl: 'Monthly Spending',
    budgetBreakdownTitle: 'Budget Category Breakdown',
    catGroceries: 'Groceries',
    catDining: 'Dining Out',
    catUtilities: 'Utilities',
    catShopping: 'Shopping',
    smartDealsTitle: 'Smart Amazon Deals',
    shoppingTitle: 'Intelligent Amazon Shopping Assistant',
    shoppingDesc: 'Curated Amazon deals synchronized with Alexa+ voice purchasing capability and budget safety checks.',
    financeTitle: 'Ledger & Expense Tracker',
    financeDesc: 'Log transactions and monitor category allocations in real-time via MCP Protocol.',
    goalsTitle: 'Financial Goals & Savings Targets',
    goalsDesc: 'Track automatic savings progress and reserve fund allocations.',
    insightsTitle: 'AI-Powered Financial Insights',
    insightsDesc: 'Predictive analytics and monthly spending efficiency recommendations.',
    settingsTitle: 'Agent & Application Settings',
    settingsDesc: 'Configure your VaultAlexa+ AI voice preferences, budget limits, and MCP integration.',
    chatTitle: 'Chat with Alexa+',
    chatInputPlaceholder: 'Type or speak to VaultAlexa+...',
    chipBudget: '📊 Budget',
    chipDeals: '🛍️ Tech Deals',
    chipSplit: '👥 Split Bill',
    chipSniper: '🎯 Sniper',
    listeningActive: 'Listening... (Speak Now)',
    listeningStandby: 'Click mic to speak'
  }
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
const btnLangToggle = document.getElementById('btn-lang-toggle');
const langCurrentLabel = document.getElementById('lang-current-label');

// Header Dropdowns & Popovers
const btnUserProfile = document.getElementById('btn-user-profile');
const profilePopover = document.getElementById('profile-popover');
const btnGroupShare = document.getElementById('btn-group-share');
const groupPopover = document.getElementById('group-popover');
const btnNotificationAlert = document.getElementById('btn-notification-alert');
const btnInviteMember = document.getElementById('btn-invite-member');
const btnMockLogout = document.getElementById('btn-mock-logout');

// Core Message Dispatcher
function addMessage(sender, senderName, htmlContent) {
  if (!chatMessagesContainer) return;
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}-msg`;
  msgDiv.innerHTML = `
    <div class="msg-sender-name">${senderName}</div>
    <div class="msg-bubble ${sender}-bubble">${htmlContent}</div>
  `;
  chatMessagesContainer.appendChild(msgDiv);
  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

  if (sender === 'alexa') {
    speakAlexaVoice(htmlContent);
  }
}

// Live Speech Synthesizer
const synth = window.speechSynthesis;
function speakAlexaVoice(text) {
  if (!synth) return;
  try {
    synth.cancel();
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\[.*?\]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.1;

    const voices = synth.getVoices();
    if (currentLang === 'ID') {
      utterance.lang = 'id-ID';
      const idVoice = voices.find(v => v.lang && (v.lang.includes('id') || v.lang.includes('ID') || v.name.includes('Indonesian') || v.name.includes('Gadis') || v.name.includes('Damayanti')));
      if (idVoice) utterance.voice = idVoice;
    } else {
      utterance.lang = 'en-US';
      const femaleVoice = voices.find(v => v.lang && v.lang.includes('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Zira')));
      if (femaleVoice) utterance.voice = femaleVoice;
    }
    synth.speak(utterance);
  } catch (e) {}
}

// Alexa Sound Chime
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

// Animated Reasoning Trace
function showReasoningTrace(steps, onComplete) {
  const container = document.getElementById('agent-reasoning-container');
  const stepsList = document.getElementById('reasoning-steps-list');
  const statusBadge = document.getElementById('reasoning-status-badge');
  if (!container || !stepsList) {
    if (onComplete) onComplete();
    return;
  }

  container.style.display = 'block';
  stepsList.innerHTML = '';
  if (statusBadge) {
    statusBadge.textContent = currentLang === 'ID' ? 'Memproses MCP...' : 'Processing MCP...';
    statusBadge.className = 'reasoning-status text-blue';
  }

  let index = 0;
  function showNextStep() {
    if (index < steps.length) {
      const stepItem = document.createElement('div');
      stepItem.className = 'reasoning-step-item';
      stepItem.innerHTML = `
        <i class="fa-solid fa-circle-check text-green"></i>
        <span>${steps[index]}</span>
      `;
      stepsList.appendChild(stepItem);
      if (chatMessagesContainer) {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      }
      index++;
      setTimeout(showNextStep, 400);
    } else {
      if (statusBadge) {
        statusBadge.textContent = currentLang === 'ID' ? 'Selesai ✓' : 'Complete ✓';
        statusBadge.className = 'reasoning-status text-green';
      }
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 350);
    }
  }
  showNextStep();
}

// Global Quick Action Chips Handler
window.handleChipClick = function(text) {
  processUserQuery(text);
};

// Global Savings Transfer Handler
window.transferFromSavings = function(amount) {
  state.accountBalance += amount;
  state.categories.shopping.limit += amount;
  state.categories.shopping.percent = Math.min(100, Math.round((state.categories.shopping.spent / state.categories.shopping.limit) * 100));
  updateUIOverview();
  const isID = currentLang === 'ID';
  const msg = isID
    ? `💰 Berhasil mentransfer <strong>$${amount}</strong> dari rekening tabungan ke batas belanja. Batas belanja baru sekarang <strong>$${state.categories.shopping.limit}</strong>.`
    : `💰 Successfully transferred <strong>$${amount}</strong> from savings to shopping limit. New shopping limit is <strong>$${state.categories.shopping.limit}</strong>.`;
  addMessage('alexa', 'Alexa+', msg);
};

// Process User Query with Autonomous MCP Reasoning (Bilingual Support)
function processUserQuery(query) {
  addMessage('user', 'Sarah', query);
  const qLower = query.toLowerCase();
  const isID = currentLang === 'ID';

  if (qLower.includes('buy') || qLower.includes('beli') || qLower.includes('purchase') || qLower.includes('order')) {
    let matchedDeal = state.deals.find(d => {
      const dTitle = d.title.toLowerCase();
      if (qLower.includes(dTitle)) return true;
      if (dTitle.includes('olive') && (qLower.includes('olive') || qLower.includes('minyak') || qLower.includes('oil'))) return true;
      if (dTitle.includes('coffee') && (qLower.includes('coffee') || qLower.includes('kopi') || qLower.includes('starbucks'))) return true;
      if (dTitle.includes('dining') && (qLower.includes('dining') || qLower.includes('makan') || qLower.includes('restoran') || qLower.includes('pass'))) return true;
      if (dTitle.includes('bulb') && (qLower.includes('bulb') || qLower.includes('lampu') || qLower.includes('philips') || qLower.includes('hue') || qLower.includes('led'))) return true;
      if (dTitle.includes('thermostat') && (qLower.includes('thermostat') || qLower.includes('termostat') || qLower.includes('suhu'))) return true;
      if (dTitle.includes('running') && (qLower.includes('running') || qLower.includes('shoe') || qLower.includes('sepatu'))) return true;
      if (dTitle.includes('echo') && (qLower.includes('echo') || qLower.includes('show') || qLower.includes('alexa'))) return true;
      if (dTitle.includes('bose') && (qLower.includes('bose') || qLower.includes('headphone') || qLower.includes('earphone'))) return true;
      if (dTitle.includes('kindle') && (qLower.includes('kindle') || qLower.includes('paperwhite') || qLower.includes('ebook') || qLower.includes('buku'))) return true;
      if (dTitle.includes('watch') && (qLower.includes('watch') || qLower.includes('apple') || qLower.includes('jam'))) return true;
      if (dTitle.includes('anker') && (qLower.includes('anker') || qLower.includes('power bank') || qLower.includes('charger'))) return true;
      
      const words = dTitle.split(' ').filter(w => w.length > 3);
      return words.some(w => qLower.includes(w));
    }) || state.deals[0];
    
    let buyPrice = matchedDeal.price;
    const catKey = matchedDeal.category || 'shopping';
    const catObj = state.categories[catKey] || state.categories.shopping;

    const priceMatch = query.match(/\$([0-9.]+)/) || query.match(/for ([0-9.]+)/) || query.match(/sebesar ([0-9.]+)/);
    if (priceMatch) {
      const parsedPrice = parseFloat(priceMatch[1]);
      if (!isNaN(parsedPrice) && parsedPrice > 0) buyPrice = parsedPrice;
    }

    const isOverBudget = (catObj.spent + buyPrice) > catObj.limit;

    const traceSteps = isID ? [
      `Memproses maksud: [Pembelian Amazon - ${matchedDeal.title}]`,
      `Membaca Resource MCP: vault://financial/overview.json (Kategori: ${catObj.title})`,
      `Memanggil Tool: validate_purchase_safety(harga: $${buyPrice.toFixed(2)}, batas_kategori: $${catObj.limit})`,
      isOverBudget 
        ? `⚠️ Peringatan: Batas anggaran ${catObj.title} terlampaui $${((catObj.spent + buyPrice) - catObj.limit).toFixed(2)}`
        : `Mengevaluasi batas aman 30 hari: Kapasitas aman tersedia di ${catObj.title}`,
      'Menyiapkan Pesanan 1-Click Prime Delivery'
    ] : [
      `Parsing intent: [Amazon Purchase - ${matchedDeal.title}]`,
      `Reading MCP Resource: vault://financial/overview.json (Category: ${catObj.title})`,
      `Calling Tool: validate_purchase_safety(price: $${buyPrice.toFixed(2)}, category_limit: $${catObj.limit})`,
      isOverBudget 
        ? `⚠️ Warning: ${catObj.title} budget limit exceeded by $${((catObj.spent + buyPrice) - catObj.limit).toFixed(2)}`
        : `Evaluating 30-day budget margin: Safe buffer remaining in ${catObj.title}`,
      'Generating 1-Click Prime Order Dispatch'
    ];

    showReasoningTrace(traceSteps, () => {
      state.accountBalance -= buyPrice;
      state.monthlySpending += buyPrice;
      catObj.spent += buyPrice;
      catObj.percent = Math.min(100, Math.round((catObj.spent / catObj.limit) * 100));
      updateUIOverview();

      const trackingNum = 'AMZ-' + Math.floor(100000 + Math.random() * 900000);

      let responseHTML = isID ? `
        <strong>Tool MCP [validate_purchase_safety]:</strong> Pesanan terverifikasi aman untuk <em>${matchedDeal.title}</em>. 
        <div class="chat-order-card">
          <div class="order-card-header">
            <i class="fa-brands fa-amazon"></i> Pesanan Prime 1-Click Berhasil Dibuat
          </div>
          <div class="order-card-body">
            <img src="${matchedDeal.image}" class="order-card-thumb" alt="${matchedDeal.title}">
            <div class="order-card-details">
              <div class="order-card-title">${matchedDeal.title}</div>
              <div class="order-card-price">$${buyPrice.toFixed(2)} • (${catObj.title})</div>
              <div class="order-card-dispatch">🚚 Tiba Besok • No. Resi: ${trackingNum}</div>
            </div>
          </div>
        </div>
      ` : `
        <strong>MCP Tool [validate_purchase_safety]:</strong> Order verified for <em>${matchedDeal.title}</em>. 
        <div class="chat-order-card">
          <div class="order-card-header">
            <i class="fa-brands fa-amazon"></i> Prime 1-Click Order Placed
          </div>
          <div class="order-card-body">
            <img src="${matchedDeal.image}" class="order-card-thumb" alt="${matchedDeal.title}">
            <div class="order-card-details">
              <div class="order-card-title">${matchedDeal.title}</div>
              <div class="order-card-price">$${buyPrice.toFixed(2)} • (${catObj.title})</div>
              <div class="order-card-dispatch">🚚 Arriving Tomorrow • Tracking: ${trackingNum}</div>
            </div>
          </div>
        </div>
      `;

      if (isOverBudget) {
        responseHTML += isID ? `
          <div class="chat-warning-card">
            <div class="warning-card-title">
              <i class="fa-solid fa-triangle-exclamation"></i> Peringatan Batas Anggaran Terlampaui
            </div>
            <div class="warning-card-desc">
              Kategori <strong>${catObj.title}</strong> sekarang mencapai <strong>${catObj.percent}%</strong> kapasitas ($${catObj.spent.toFixed(2)} / $${catObj.limit}).
            </div>
            <div class="warning-actions-row">
              <button class="btn-warning-action primary" onclick="transferFromSavings(250)">+ Transfer $250 dari Tabungan</button>
            </div>
          </div>
        ` : `
          <div class="chat-warning-card">
            <div class="warning-card-title">
              <i class="fa-solid fa-triangle-exclamation"></i> Budget Warning Threshold Reached
            </div>
            <div class="warning-card-desc">
              Your <strong>${catObj.title}</strong> category is now at <strong>${catObj.percent}%</strong> capacity ($${catObj.spent.toFixed(2)} / $${catObj.limit}).
            </div>
            <div class="warning-actions-row">
              <button class="btn-warning-action primary" onclick="transferFromSavings(250)">+ Transfer $250 from Savings</button>
            </div>
          </div>
        `;
      }

      addMessage('alexa', 'Alexa+', responseHTML);
    });

  } else if (qLower.includes('track') || qLower.includes('pantau') || qLower.includes('price') || qLower.includes('harga') || qLower.includes('diskon') || qLower.includes('sniper')) {
    const traceSteps = isID ? [
      'Maksud: [Pengawas Penurunan Harga Promo Amazon]',
      'Mengecek API Promo Amazon via Protokol MCP 2025-11-25',
      'Memanggil Tool: track_price_drop_target(ambang: -20%)',
      'Mendaftarkan Pemantau Latar Belakang'
    ] : [
      'Intent: [Amazon Price Drop Notification Watchdog]',
      'Querying Amazon Deals API via MCP Spec 2025-11-25',
      'Calling Tool: track_price_drop_target(threshold: -20%)',
      'Registering Background Price Drop Watcher'
    ];

    showReasoningTrace(traceSteps, () => {
      const msg = isID
        ? `<strong>Tool MCP [track_price_drop_target]:</strong> Fitur Pemburu Diskon (Sniper) aktif! Memantau Amazon Echo Show & Headphone Bose. Anda akan diberitahu otomatis saat diskon mencapai 20%.`
        : `<strong>MCP Tool [track_price_drop_target]:</strong> Price Drop Sniper activated! Watching Amazon Echo Show & Bose Headphones. You'll be alerted when price drops by 20%.`;
      addMessage('alexa', 'Alexa+', msg);
    });

  } else if (qLower.includes('split') || qLower.includes('bagi') || qLower.includes('patungan') || qLower.includes('household') || qLower.includes('keluarga')) {
    const traceSteps = isID ? [
      'Membaca Resource MCP: vault://household/summary.json',
      'Memanggil Tool: split_shared_expense(jumlah: $120.00, anggota: 3)',
      'Membagi rata $40.00 ke Sarah, Michael, David',
      'Memperbarui Buku Kas Bersama'
    ] : [
      'Reading MCP Resource: vault://household/summary.json',
      'Calling Tool: split_shared_expense(amount: $120.00, members: 3)',
      'Distributing $40.00 each to Sarah, Michael, David',
      'Synchronizing Shared Pool Ledger'
    ];

    showReasoningTrace(traceSteps, () => {
      const msg = isID
        ? `<strong>Tool MCP [split_shared_expense]:</strong> Tagihan belanja $120.00 dibagi 3 orang bersama Michael & David ($40.00/orang). Buku kas keluarga berhasil diperbarui.`
        : `<strong>MCP Tool [split_shared_expense]:</strong> Household expense of $120.00 split 3-ways with Michael & David ($40.00/person). Shared ledger updated.`;
      addMessage('alexa', 'Alexa+', msg);
    });

  } else if (qLower.includes('tech') || qLower.includes('promo') || qLower.includes('deal') || qLower.includes('barang') || qLower.includes('shopping')) {
    const traceSteps = isID ? [
      'Memanggil Tool: search_amazon_deals(kategori: "Elektronik", diskon_min: 15)',
      'Mencocokkan promo dengan sisa kuota belanja',
      'Menampilkan Promo Pilihan Prime'
    ] : [
      'Calling Tool: search_amazon_deals(category: "Electronics", discount_min: 15)',
      'Matching deals against remaining shopping allowance',
      'Displaying Top Curated Prime Deals'
    ];

    showReasoningTrace(traceSteps, () => {
      const msg = isID
        ? '<strong>Tool MCP [search_amazon_deals]:</strong> Promo Prime terbaik ditemukan! Amazon Echo Show 8 ($99.99, Diskon 30%) & Bose 700 ($219.00). Beralih ke halaman Belanja.'
        : '<strong>MCP Tool [search_amazon_deals]:</strong> Curated Prime deals found! Amazon Echo Show 8 ($99.99, 30% Off) & Bose 700 ($219.00). Switched to Shopping View.';
      addMessage('alexa', 'Alexa+', msg);
      switchTab('shopping');
    });

  } else if (qLower.includes('minggu') || qLower.includes('week') || qLower.includes('spend') || qLower.includes('belanja') || qLower.includes('sisa')) {
    const weeklySafeCapacity = ((state.categories.shopping.limit - state.categories.shopping.spent) + (state.categories.diningOut.limit - state.categories.diningOut.spent)) / 2;
    const safeAmount = Math.max(0, weeklySafeCapacity).toFixed(2);

    const traceSteps = isID ? [
      'Maksud: [Kalkulasi Batas Belanja Aman Mingguan]',
      'Membaca Resource MCP: vault://financial/overview.json',
      'Memanggil Tool: get_financial_summary(interval: "proyeksi_mingguan")',
      'Menganalisis siklus 12 hari sisa bulan vs anggaran santai'
    ] : [
      'Intent: [Weekly Safe-to-Spend Computation]',
      'Reading MCP Resource: vault://financial/overview.json',
      'Calling Tool: get_financial_summary(interval: "weekly_projection")',
      'Analyzing 12 days remaining cycle vs discretionary budgets'
    ];

    showReasoningTrace(traceSteps, () => {
      const msg = isID ? `
        <strong>Tool MCP [get_financial_summary]:</strong> Berdasarkan ritme pengeluaran Anda (12 hari tersisa):
        <div class="chat-order-card" style="border-color:#10b981;">
          <div class="order-card-header" style="color:#059669;">
            <i class="fa-solid fa-shield-halved"></i> Batas Belanja Aman Mingguan
          </div>
          <div style="font-size: 1.25rem; font-weight: 800; color: #10b981; margin: 4px 0;">
            $${safeAmount} / minggu
          </div>
          <div style="font-size: 0.74rem; color: var(--text-muted); line-height: 1.4;">
            💡 <strong>Saran Alexa+:</strong> Kebutuhan pokok masih sangat aman (sisa $280), tapi makan di luar sudah 88%. Menjaga pengeluaran hiburan di bawah <strong>$${safeAmount}</strong> minggu ini memastikan target tabungan <em>Liburan ke Tokyo</em> Anda tercapai!
          </div>
        </div>
      ` : `
        <strong>MCP Tool [get_financial_summary]:</strong> Based on your monthly pacing (12 days left):
        <div class="chat-order-card" style="border-color:#10b981;">
          <div class="order-card-header" style="color:#059669;">
            <i class="fa-solid fa-shield-halved"></i> Weekly Safe-to-Spend Allowance
          </div>
          <div style="font-size: 1.25rem; font-weight: 800; color: #10b981; margin: 4px 0;">
            $${safeAmount} / week
          </div>
          <div style="font-size: 0.74rem; color: var(--text-muted); line-height: 1.4;">
            💡 <strong>Alexa+ Advice:</strong> You have plenty of room for groceries ($280 left), but dining out is at 88%. Keeping leisure spending under <strong>$${safeAmount}</strong> this week ensures you hit your <em>Vacation to Tokyo</em> savings goal!
          </div>
        </div>
      `;
      addMessage('alexa', 'Alexa+', msg);
    });

  } else if (qLower.includes('balance') || qLower.includes('budget') || qLower.includes('saldo') || qLower.includes('uang')) {
    const traceSteps = isID ? [
      'Membaca Resource MCP: vault://financial/overview.json',
      'Menggabungkan Rekening Giro & Portofolio Investasi'
    ] : [
      'Reading MCP Resource: vault://financial/overview.json',
      'Aggregating Liquid Checking & Investment Portfolio'
    ];

    showReasoningTrace(traceSteps, () => {
      const msg = isID
        ? `<strong>Resource MCP [vault://financial/overview]:</strong> Saldo Rekening: <strong>$${state.accountBalance.toLocaleString('en-US', {minimumFractionDigits:2})}</strong>. Portofolio Investasi: <strong>$${state.investmentValue.toLocaleString('en-US', {minimumFractionDigits:2})}</strong> (+4.2%). Sisa anggaran bulan ini: <strong>$${(state.monthlySpending * 0.2).toFixed(2)}</strong>.`
        : `<strong>MCP Resource [vault://financial/overview]:</strong> Account Balance: <strong>$${state.accountBalance.toLocaleString('en-US', {minimumFractionDigits:2})}</strong>. Investment Portfolio: <strong>$${state.investmentValue.toLocaleString('en-US', {minimumFractionDigits:2})}</strong> (+4.2%). Remaining monthly budget: <strong>$${(state.monthlySpending * 0.2).toFixed(2)}</strong>.`;
      addMessage('alexa', 'Alexa+', msg);
    });

  } else if (qLower.includes('performa') || qLower.includes('performance') || qLower.includes('analisis penjualan')) {
    const traceSteps = isID ? [
      'Maksud: [Audit Analisis Performa Merchant Apex Tech]',
      'Membaca Resource MCP: vault://deals/catalog.json',
      'Memanggil Tool: get_financial_summary(tipe: "laporan_merchant")',
      'Mengevaluasi Tren Konversi & Margin Keuntungan'
    ] : [
      'Intent: [Apex Tech Store Merchant Performance Audit]',
      'Reading MCP Resource: vault://deals/catalog.json',
      'Calling Tool: get_financial_summary(type: "merchant_report")',
      'Evaluating Conversion Trends & Profit Margins'
    ];

    showReasoningTrace(traceSteps, () => {
      const msg = isID ? `
        <strong>Resource MCP [vault://deals/catalog - Toko Apex]:</strong>
        <div class="chat-order-card" style="border-color:#10b981;">
          <div class="order-card-header" style="color:#059669;">
            <i class="fa-solid fa-store"></i> Ringkasan Performa Apex Tech Store
          </div>
          <div style="font-size: 0.82rem; line-height: 1.5; margin-top: 6px;">
            💵 <strong>Total Pendapatan:</strong> $14,850.00 (+18.4% vs bulan lalu)<br>
            📦 <strong>Pesanan Selesai:</strong> 142 pesanan terkirim via Prime Fulfillment<br>
            ⚡ <strong>Tingkat Konversi AI Alexa+:</strong> 32.4% (Rata-rata industri: 14.2%)<br>
            ⭐ <strong>Rating Toko:</strong> 4.9/5.0 (98% Ulasan Positif)
          </div>
        </div>
      ` : `
        <strong>MCP Resource [vault://deals/catalog - Apex Store]:</strong>
        <div class="chat-order-card" style="border-color:#10b981;">
          <div class="order-card-header" style="color:#059669;">
            <i class="fa-solid fa-store"></i> Apex Tech Store Performance Summary
          </div>
          <div style="font-size: 0.82rem; line-height: 1.5; margin-top: 6px;">
            💵 <strong>Total Revenue:</strong> $14,850.00 (+18.4% vs last month)<br>
            📦 <strong>Fulfilled Orders:</strong> 142 orders dispatched via Prime Fulfillment<br>
            ⚡ <strong>Alexa+ AI Conversion Rate:</strong> 32.4% (Industry Avg: 14.2%)<br>
            ⭐ <strong>Merchant Rating:</strong> 4.9/5.0 (98% Positive Feedback)
          </div>
        </div>
      `;
      addMessage('alexa', 'Alexa+', msg);
    });

  } else if (qLower.includes('pesanan') || qLower.includes('order') || qLower.includes('stok')) {
    const traceSteps = isID ? [
      'Maksud: [Pemeriksaan Pesanan Masuk & Status Inventaris]',
      'Membaca Resource MCP: vault://deals/catalog.json',
      'Menghubungkan ke Amazon Prime Fulfillment Center'
    ] : [
      'Intent: [Incoming Orders & Inventory Dispatch Check]',
      'Reading MCP Resource: vault://deals/catalog.json',
      'Connecting to Amazon Prime Fulfillment Dispatch'
    ];

    showReasoningTrace(traceSteps, () => {
      const msg = isID ? `
        <strong>Tool MCP [search_amazon_deals - Status Pesanan Hari Ini]:</strong>
        <div class="chat-order-card" style="border-color:#3b82f6;">
          <div class="order-card-header" style="color:#2563eb;">
            <i class="fa-solid fa-truck-fast"></i> 14 Pesanan Masuk Hari Ini (Semua Siap Dikirim)
          </div>
          <div style="font-size: 0.8rem; line-height: 1.5; margin-top: 6px;">
            • <strong>6x Amazon Echo Show 8</strong> ($99.99) -> <em>Telah Diverifikasi Pembayaran</em><br>
            • <strong>5x Bose Headphones 700</strong> ($219.00) -> <em>Sedang Dikemas di Gudang Prime</em><br>
            • <strong>3x Running Shoes Pro</strong> ($65.50) -> <em>Dalam Perjalanan Pengantaran</em>
          </div>
        </div>
      ` : `
        <strong>MCP Tool [search_amazon_deals - Daily Orders Dispatch]:</strong>
        <div class="chat-order-card" style="border-color:#3b82f6;">
          <div class="order-card-header" style="color:#2563eb;">
            <i class="fa-solid fa-truck-fast"></i> 14 Incoming Orders Today (Prime Ready)
          </div>
          <div style="font-size: 0.8rem; line-height: 1.5; margin-top: 6px;">
            • <strong>6x Amazon Echo Show 8</strong> ($99.99) -> <em>Payment Verified</em><br>
            • <strong>5x Bose Headphones 700</strong> ($219.00) -> <em>Packing at Prime Hub</em><br>
            • <strong>3x Running Shoes Pro</strong> ($65.50) -> <em>Out for Dispatch</em>
          </div>
        </div>
      `;
      addMessage('alexa', 'Alexa+', msg);
    });

  } else if (qLower.includes('seller') || qLower.includes('penjual') || qLower.includes('jual') || qLower.includes('penjualan') || qLower.includes('produk') || qLower.includes('omset') || qLower.includes('toko') || qLower.includes('marketing') || qLower.includes('laris') || qLower.includes('conversion') || qLower.includes('sales')) {
    const traceSteps = isID ? [
      'Maksud: [Analisis & Rekomendasi Pertumbuhan Penjualan Seller]',
      'Membaca Resource MCP: vault://deals/catalog.json',
      'Menganalisis Perilaku Keranjang Belanja & Sensitivitas Harga Pembeli',
      'Memanggil Tool: search_amazon_deals(kategori: "Semua", filter: "Tren_Konversi_Tertinggi")',
      'Menghasilkan 4 Strategi Pertumbuhan Penjual Amazon Terverifikasi'
    ] : [
      'Intent: [Seller Sales Growth & Conversion Rate Optimization]',
      'Reading MCP Resource: vault://deals/catalog.json',
      'Analyzing Consumer Cart Abandonment & Price Sensitivity Patterns',
      'Calling Tool: search_amazon_deals(category: "All", filter: "High_Conversion_Deals")',
      'Synthesizing 4 Actionable Amazon Seller Growth Strategies'
    ];

    showReasoningTrace(traceSteps, () => {
      const msg = isID ? `
        <strong>Tool MCP [search_amazon_deals & Seller Growth Advisor]:</strong>
        <div class="chat-order-card" style="border-color:#3b82f6;">
          <div class="order-card-header" style="color:#2563eb;">
            <i class="fa-solid fa-chart-line"></i> 4 Strategi Utama Meningkatkan Penjualan Produk Seller
          </div>
          <div style="font-size: 0.8rem; line-height: 1.5; color: var(--text-main); margin-top: 6px;">
            <strong>1. Pasang Diskon Ambang Batas Otomatis (15-20%):</strong><br>
            <span style="color:var(--text-muted);">Memicu algoritma <em>Deal Sniper</em> milik Buyer sehingga produk Anda langsung dipesan otomatis saat diskon tercapai.</span><br><br>
            <strong>2. Optimalkan untuk Perintah Suara Alexa+ (1-Click Voice Buy):</strong><br>
            <span style="color:var(--text-muted);">Pastikan judul produk ringkas dan relevan agar Agent dapat merekomendasikan produk Anda saat pembeli bertanya <em>"Cari promo teknologi"</em>.</span><br><br>
            <strong>3. Sasar Anggaran Belanja Bersama Keluarga ($50 - $150):</strong><br>
            <span style="color:var(--text-muted);">Produk di rentang harga ini memiliki tingkat persetujuan (*approval rate*) tercepat dalam fitur <em>Amazon Household Pool</em>.</span><br><br>
            <strong>4. Gunakan Bundling Produk Komplementer:</strong><br>
            <span style="color:var(--text-muted);">Gabungkan aksesori pelengkap (misal: Headphone + Power Bank) agar pas dengan sisa anggaran belanja mingguan pembeli.</span>
          </div>
        </div>
      ` : `
        <strong>MCP Tool [search_amazon_deals & Seller Growth Advisor]:</strong>
        <div class="chat-order-card" style="border-color:#3b82f6;">
          <div class="order-card-header" style="color:#2563eb;">
            <i class="fa-solid fa-chart-line"></i> 4 Actionable Strategies to Boost Seller Product Sales
          </div>
          <div style="font-size: 0.8rem; line-height: 1.5; color: var(--text-main); margin-top: 6px;">
            <strong>1. Implement Threshold Discounts (15-20% Off):</strong><br>
            <span style="color:var(--text-muted);">Triggers Buyer <em>Deal Sniper</em> watchers to auto-execute purchases once the discount target is hit.</span><br><br>
            <strong>2. Optimize for Alexa+ Voice Commerce:</strong><br>
            <span style="color:var(--text-muted);">Keep titles clean so the MCP agent can curate your listings during natural queries like <em>"Find tech deals"</em>.</span><br><br>
            <strong>3. Target Household Budget Range ($50 - $150):</strong><br>
            <span style="color:var(--text-muted);">Items in this bracket experience highest instant checkout approvals across Amazon Family pools.</span><br><br>
            <strong>4. Smart Complementary Bundling:</strong><br>
            <span style="color:var(--text-muted);">Pair accessories (e.g. Headphones + Power Bank) to capture remaining weekly buyer allowances.</span>
          </div>
        </div>
      `;
      addMessage('alexa', 'Alexa+', msg);
    });

  } else {
    const traceSteps = isID ? [
      'Klasifikasi Maksud Otomatis (Protokol MCP 2025-11-25)',
      'Memindai 6 Tools & 3 Resources Terdaftar',
      'Diagnostik Kesehatan: Normal'
    ] : [
      'Autonomous Intent Classifier (MCP Spec 2025-11-25)',
      'Scanning 6 Registered Tools & 3 Resources',
      'Health Diagnostics: Nominal'
    ];

    showReasoningTrace(traceSteps, () => {
      const msg = isID
        ? `<strong>Protokol MCP 2025-11-25:</strong> Permintaan dianalisis melalui 6 Tools & 3 Resources. Total pengeluaran bulan ini $${state.monthlySpending.toLocaleString('en-US', {minimumFractionDigits:2})}. Semua parameter normal.`
        : `<strong>MCP Protocol 2025-11-25:</strong> Analyzed query across 6 Tools & 3 Resources. Total monthly spending is $${state.monthlySpending.toLocaleString('en-US', {minimumFractionDigits:2})}. All system parameters nominal.`;
      addMessage('alexa', 'Alexa+', msg);
    });
  }
}

// Form Submission
if (chatInputForm) {
  chatInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!userInputText) return;
    const text = userInputText.value.trim();
    if (!text) return;
    userInputText.value = '';
    processUserQuery(text);
  });
}

// Apply Language Function
function applyLanguage(lang, announce = true) {
  currentLang = lang;
  const d = I18N_DICT[lang] || I18N_DICT.ID;
  if (langCurrentLabel) langCurrentLabel.textContent = d.langBtn;

  // Header
  const subLogo = document.querySelector('.logo-subtitle');
  if (subLogo) subLogo.textContent = d.logoSub;
  const globalSearch = document.getElementById('global-search-input');
  if (globalSearch) globalSearch.placeholder = d.searchPlaceholder;

  // Sidebar Menu Items
  const navMap = {
    dashboard: d.navDashboard,
    finance: d.navFinance,
    shopping: d.navShopping,
    goals: d.navGoals,
    insights: d.navInsights,
    settings: d.navSettings,
    'mcp-inspector': d.navMcpInspector
  };
  document.querySelectorAll('.menu-item').forEach(item => {
    const tabKey = item.getAttribute('data-tab');
    const span = item.querySelector('span');
    if (span && navMap[tabKey]) span.textContent = navMap[tabKey];
  });

  // Overview Titles
  const overviewH2 = document.querySelector('.overview-column .column-title');
  if (overviewH2) overviewH2.textContent = d.overviewTitle;

  const cardLabels = document.querySelectorAll('.balance-card .card-label, .small-metric-card .card-label');
  if (cardLabels[0]) cardLabels[0].textContent = d.accBalanceLbl;
  if (cardLabels[1]) cardLabels[1].textContent = d.investValLbl;
  if (cardLabels[2]) cardLabels[2].textContent = d.monthlySpendLbl;

  const budgetH3 = document.querySelector('.category-breakdown-card .card-subtitle');
  if (budgetH3) budgetH3.textContent = d.budgetBreakdownTitle;

  const dealsH2 = document.querySelector('.dashboard-deals-section .column-title');
  if (dealsH2) dealsH2.innerHTML = `<i class="fa-solid fa-bolt text-amber"></i> ${d.smartDealsTitle}`;

  // Tab Page Headers & Subtitles
  const shoppingH2 = document.querySelector('#view-shopping .column-title');
  const shoppingP = document.querySelector('#view-shopping .tab-description');
  if (shoppingH2) shoppingH2.innerHTML = `<i class="fa-solid fa-cart-shopping text-blue"></i> ${d.shoppingTitle}`;
  if (shoppingP) shoppingP.textContent = d.shoppingDesc;

  const financeH2 = document.querySelector('#view-finance .column-title');
  const financeP = document.querySelector('#view-finance .tab-description');
  if (financeH2) financeH2.innerHTML = `<i class="fa-solid fa-wallet text-green"></i> ${d.financeTitle}`;
  if (financeP) financeP.textContent = d.financeDesc;

  const goalsH2 = document.querySelector('#view-goals .column-title');
  const goalsP = document.querySelector('#view-goals .tab-description');
  if (goalsH2) goalsH2.innerHTML = `<i class="fa-solid fa-bullseye text-purple"></i> ${d.goalsTitle}`;
  if (goalsP) goalsP.textContent = d.goalsDesc;

  const insightsH2 = document.querySelector('#view-insights .column-title');
  const insightsP = document.querySelector('#view-insights .tab-description');
  if (insightsH2) insightsH2.innerHTML = `<i class="fa-solid fa-chart-simple text-amber"></i> ${d.insightsTitle}`;
  if (insightsP) insightsP.textContent = d.insightsDesc;

  const settingsH2 = document.querySelector('#view-settings .column-title');
  const settingsP = document.querySelector('#view-settings .tab-description');
  if (settingsH2) settingsH2.innerHTML = `<i class="fa-solid fa-gear text-blue"></i> ${d.settingsTitle}`;
  if (settingsP) settingsP.textContent = d.settingsDesc;

  // Chips
  const chips = document.querySelectorAll('.chip-item');
  if (chips[0]) {
    chips[0].textContent = d.chipBudget;
    chips[0].onclick = () => handleChipClick(lang === 'ID' ? 'Berapa sisa uang belanja minggu ini?' : 'What is my remaining budget?');
  }
  if (chips[1]) {
    chips[1].textContent = d.chipDeals;
    chips[1].onclick = () => handleChipClick(lang === 'ID' ? 'Cari promo barang teknologi' : 'Find deals on tech items.');
  }
  if (chips[2]) {
    chips[2].textContent = d.chipSplit;
    chips[2].onclick = () => handleChipClick(lang === 'ID' ? 'Bagi tagihan 120 dengan keluarga' : 'Split 120 with household for groceries');
  }
  if (chips[3]) {
    chips[3].textContent = d.chipSniper;
    chips[3].onclick = () => handleChipClick(lang === 'ID' ? 'Pantau diskon harga Echo Show' : 'Track price drop for Echo Show');
  }

  // Input Placeholder
  if (userInputText) userInputText.placeholder = d.chatInputPlaceholder;

  // Categories
  state.categories.groceries.title = d.catGroceries;
  state.categories.diningOut.title = d.catDining;
  state.categories.utilities.title = d.catUtilities;
  state.categories.shopping.title = d.catShopping;
  updateUIOverview();

  // Welcome note in new language
  if (announce) {
    if (lang === 'ID') {
      addMessage('alexa', 'Alexa+', `🇮🇩 Bahasa berhasil diubah ke <strong>Bahasa Indonesia</strong>. Saya siap membantu memeriksa keamanan belanja, bagi tagihan, dan memantau target diskon Amazon Anda!`);
    } else {
      addMessage('alexa', 'Alexa+', `🇺🇸 Language switched to <strong>English (US)</strong>. Ready to assist with your financial safety checks, bill splitting, and Amazon deal hunting!`);
    }
  }
}

// Toggle Language Button
if (btnLangToggle) {
  btnLangToggle.addEventListener('click', () => {
    const newLang = currentLang === 'ID' ? 'US' : 'ID';
    applyLanguage(newLang, true);
  });
}

// Update UI Values with Animated Counters
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

// Render Shopping Grid
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
          <i class="fa-solid fa-cart-shopping"></i> Beli via Alexa+
        </button>
      </div>
    </div>
  `).join('');
}

// Global Amazon Buy Handler
window.buyAmazonDeal = function(title, price) {
  const q = currentLang === 'ID' ? `Beli ${title} seharga $${price}` : `Buy ${title} for $${price}`;
  processUserQuery(q);
};

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

// Profile & Popovers
if (btnUserProfile && profilePopover) {
  btnUserProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    if (groupPopover) groupPopover.classList.remove('active');
    profilePopover.classList.toggle('active');
  });
}

if (btnGroupShare && groupPopover) {
  btnGroupShare.addEventListener('click', (e) => {
    e.stopPropagation();
    if (profilePopover) profilePopover.classList.remove('active');
    groupPopover.classList.toggle('active');
  });
}

document.addEventListener('click', (e) => {
  if (profilePopover && !profilePopover.contains(e.target) && !btnUserProfile.contains(e.target)) {
    profilePopover.classList.remove('active');
  }
  if (groupPopover && !groupPopover.contains(e.target) && !btnGroupShare.contains(e.target)) {
    groupPopover.classList.remove('active');
  }
});

if (btnInviteMember) {
  btnInviteMember.addEventListener('click', (e) => {
    e.stopPropagation();
    const name = prompt(currentLang === 'ID' ? "Masukkan nama anggota keluarga untuk diundang ke anggaran bersama:" : "Enter Household Member Name to invite to shared budget:");
    if (name && name.trim()) {
      addMessage('alexa', 'Alexa+', `👥 Invited <strong>${name.trim()}</strong> to your Amazon Household Shared Budget Pool with $500/mo spending allowance.`);
      groupPopover.classList.remove('active');
    }
  });
}

if (btnMockLogout) {
  btnMockLogout.addEventListener('click', (e) => {
    e.stopPropagation();
    if (profilePopover) profilePopover.classList.remove('active');
    addMessage('alexa', 'Alexa+', `🔒 Vault Session Locked for Sarah Jenkins. Passkey biometrics required for re-authentication.`);
  });
}

if (btnNotificationAlert) {
  btnNotificationAlert.addEventListener('click', () => {
    const isID = currentLang === 'ID';
    const notifMsg = isID
      ? `🔔 <strong>3 Notifikasi Vault Belum Dibaca:</strong><br>• Anggaran Makan di Luar telah mencapai batas 88%.<br>• Harga Echo Show 8 turun sebesar 30%.<br>• Status koneksi RPC Protokol MCP: Aktif & Normal.`
      : `🔔 <strong>3 Unread Vault Alerts:</strong><br>• Dining Out budget reached 88% limit.<br>• Echo Show 8 price dropped by 30%.<br>• MCP Protocol RPC connection status: Active.`;
    addMessage('alexa', 'Alexa+', notifMsg);
  });
}

if (sidebarToggleBtn && leftSidebar) {
  sidebarToggleBtn.addEventListener('click', () => {
    leftSidebar.classList.toggle('is-collapsed');
  });
}

// Add Expense Form Handler (MCP Sync)
if (formAddExpense) {
  formAddExpense.addEventListener('submit', (e) => {
    e.preventDefault();
    const categoryKey = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const desc = document.getElementById('expense-desc').value.trim();

    if (isNaN(amount) || amount <= 0) return;

    state.monthlySpending += amount;
    state.accountBalance -= amount;
    
    if (state.categories[categoryKey]) {
      state.categories[categoryKey].spent += amount;
      state.categories[categoryKey].percent = Math.min(100, Math.round((state.categories[categoryKey].spent / state.categories[categoryKey].limit) * 100));
    }

    updateUIOverview();

    if (transactionLedgerList) {
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
    }

    formAddExpense.reset();

    const isID = currentLang === 'ID';
    const logMsg = isID
      ? `✅ Mencatat pengeluaran <strong>$${amount.toFixed(2)}</strong> untuk <em>${desc}</em> via Tool MCP <code>log_transaction</code>. Sisa anggaran diperbarui.`
      : `✅ Logged expense of <strong>$${amount.toFixed(2)}</strong> for <em>${desc}</em> via MCP Protocol tool <code>log_transaction</code>. Updated remaining budget.`;
    addMessage('alexa', 'Alexa+', logMsg);
  });
}

// 3D Card Flip
const primeVirtualCard = document.getElementById('prime-virtual-card');
if (primeVirtualCard) {
  let isFlipped = false;
  primeVirtualCard.addEventListener('click', () => {
    isFlipped = !isFlipped;
    primeVirtualCard.style.transform = isFlipped ? 'rotateY(180deg) translateY(-4px)' : '';
  });
}

// Clear Chat
if (btnClearChat) {
  btnClearChat.addEventListener('click', () => {
    const isID = currentLang === 'ID';
    chatMessagesContainer.innerHTML = `
      <div class="chat-msg alexa-msg">
        <div class="msg-sender-name">Alexa+</div>
        <div class="msg-bubble alexa-bubble">${isID ? 'Riwayat percakapan dibersihkan. Ada yang bisa saya bantu dengan keuangan atau promo Amazon Anda?' : 'Chat history cleared. How can I assist with your finances or Amazon deals?'}</div>
      </div>
    `;
    const traceBox = document.getElementById('agent-reasoning-container');
    if (traceBox) traceBox.style.display = 'none';
  });
}

// Theme Switcher Logic
let isDarkMode = false;
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
      if (themeText) themeText.textContent = 'Sun';
    } else {
      document.body.classList.remove('dark-mode');
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
      if (themeText) themeText.textContent = 'Moon';
    }
  });
}

// Mic State Handlers
function setMicActiveState(active) {
  if (active) {
    if (listeningSection) {
      listeningSection.style.display = 'flex';
      listeningSection.classList.add('is-listening');
    }
    if (btnVoiceInput) btnVoiceInput.classList.add('active-listening');
    if (listeningLabel) listeningLabel.textContent = currentLang === 'ID' ? 'Mendengarkan... (Silakan Bicara)' : 'Listening... (Speak Now)';
  } else {
    if (listeningSection) {
      listeningSection.style.display = 'none';
      listeningSection.classList.remove('is-listening');
    }
    if (btnVoiceInput) btnVoiceInput.classList.remove('active-listening');
    if (listeningLabel) listeningLabel.textContent = currentLang === 'ID' ? 'Klik mic untuk bicara' : 'Click mic to speak';
  }
}

if (btnVoiceInput) {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = currentLang === 'ID' ? 'id-ID' : 'en-US';
    recognition.interimResults = false;

    btnVoiceInput.addEventListener('click', () => {
      try {
        setMicActiveState(true);
        playAlexaChime();
        recognition.lang = currentLang === 'ID' ? 'id-ID' : 'en-US';
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

    recognition.onerror = () => { setMicActiveState(false); };
    recognition.onend = () => { setMicActiveState(false); };
  } else {
    btnVoiceInput.addEventListener('click', () => {
      setMicActiveState(true);
      playAlexaChime();
      setTimeout(() => {
        setMicActiveState(false);
        processUserQuery(currentLang === 'ID' ? 'Cari promo barang teknologi' : 'Find deals on tech items.');
      }, 1800);
    });
  }
}

// Deal Impact Simulator
window.simulateDealImpact = function(title, dealPrice, wasPrice) {
  const modal = document.getElementById('impact-simulator-modal');
  const modalBody = document.getElementById('impact-modal-body');
  if (!modal || !modalBody) return;

  const savings = wasPrice ? (wasPrice - dealPrice).toFixed(2) : (dealPrice * 0.2).toFixed(2);
  const remainingAllowance = Math.max(0, state.categories.shopping.limit - (state.categories.shopping.spent + dealPrice)).toFixed(2);
  const projected3MonthSavings = (dealPrice * 0.15).toFixed(2);
  const isID = currentLang === 'ID';

  modalBody.innerHTML = `
    <div class="impact-metric-grid">
      <div class="impact-card">
        <div class="impact-card-val text-green">+$${savings}</div>
        <div class="impact-card-lbl">${isID ? 'Hemat Instan (Diskon Prime)' : 'Instant Savings (Prime Deal)'}</div>
      </div>
      <div class="impact-card">
        <div class="impact-card-val text-blue">$${remainingAllowance}</div>
        <div class="impact-card-lbl">${isID ? 'Sisa Batas Belanja Aman' : 'Remaining Shopping Buffer'}</div>
      </div>
    </div>

    <div class="impact-recommendation-box">
      <p>🤖 <strong>${isID ? 'Evaluasi Kesehatan Anggaran MCP untuk' : 'MCP Agent Health Verdict for'} ${title}:</strong></p>
      <p style="margin-top:6px; color:var(--text-muted);">
        ${isID 
          ? `Membeli item ini menggunakan <strong>${((dealPrice / state.categories.shopping.limit) * 100).toFixed(1)}%</strong> dari anggaran belanja bulanan Anda. Proyeksi penghematan 3 bulan dengan penguncian harga Prime diperkirakan menghemat <strong>+$${projected3MonthSavings}</strong>.`
          : `Purchasing this item utilizes <strong>${((dealPrice / state.categories.shopping.limit) * 100).toFixed(1)}%</strong> of your monthly shopping budget. 3-month savings projection with Prime price locks saves an estimated <strong>+$${projected3MonthSavings}</strong>.`
        }
      </p>
    </div>

    <div style="margin-top: 18px; display:flex; gap:10px;">
      <button class="btn-primary-action" style="width:100%;" onclick="buyAmazonDeal('${title}', ${dealPrice}); closeImpactModal();">
        <i class="fa-solid fa-cart-shopping"></i> ${isID ? 'Setujui Pembelian 1-Click' : 'Approve 1-Click Purchase'}
      </button>
    </div>
  `;

  modal.classList.add('show');
};

window.closeImpactModal = function() {
  const modal = document.getElementById('impact-simulator-modal');
  if (modal) modal.classList.remove('show');
};

const btnCloseImpactModal = document.getElementById('btn-close-impact-modal');
if (btnCloseImpactModal) {
  btnCloseImpactModal.addEventListener('click', window.closeImpactModal);
}

const impactModalBackdrop = document.getElementById('impact-simulator-modal');
if (impactModalBackdrop) {
  impactModalBackdrop.addEventListener('click', (e) => {
    if (e.target === impactModalBackdrop) window.closeImpactModal();
  });
}

// Resizable Chat Panel Splitter
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

// MCP Inspector & Playground Logic
const DEFAULT_TOOL_ARGS = {
  validate_purchase_safety: {
    itemTitle: "Bose Headphones 700",
    itemPrice: 219.00,
    category: "shopping",
    requiresApprovalAbove: 100.00
  },
  get_financial_summary: {
    includeRecentDays: 30,
    computeWeeklyPacing: true
  },
  search_amazon_deals: {
    category: "electronics",
    minimumDiscountPercent: 15,
    primeOnly: true
  },
  track_price_drop_target: {
    itemTitle: "Amazon Echo Show 8",
    targetPrice: 79.99,
    notifyViaVoice: true
  },
  split_shared_expense: {
    amount: 120.00,
    description: "Whole Foods Organic Groceries",
    splitCount: 3,
    payer: "Sarah Jenkins"
  },
  log_transaction: {
    description: "Starbucks Coffee & Snacks",
    amount: 14.50,
    category: "diningOut"
  }
};

window.onInspectorToolChange = function(toolName) {
  const argsInput = document.getElementById('mcp-tool-args-input');
  if (argsInput && DEFAULT_TOOL_ARGS[toolName]) {
    argsInput.value = JSON.stringify(DEFAULT_TOOL_ARGS[toolName], null, 2);
  }
};

window.resetInspectorArgs = function() {
  const select = document.getElementById('mcp-tool-select');
  if (select) {
    onInspectorToolChange(select.value);
  }
};

window.executeInspectorTool = function() {
  const select = document.getElementById('mcp-tool-select');
  const argsInput = document.getElementById('mcp-tool-args-input');
  const codeOutput = document.getElementById('inspector-json-code');
  const latencyBadge = document.getElementById('inspector-latency-badge');
  const statusBadge = document.getElementById('inspector-status-badge');

  if (!select || !argsInput || !codeOutput) return;

  const toolName = select.value;
  let parsedArgs = {};
  try {
    parsedArgs = JSON.parse(argsInput.value);
  } catch (err) {
    codeOutput.textContent = JSON.stringify({
      jsonrpc: "2.0",
      error: { code: -32700, message: "Parse Error: Invalid JSON input format" },
      id: "req-" + Date.now()
    }, null, 2);
    if (statusBadge) {
      statusBadge.textContent = "400 BAD REQUEST";
      statusBadge.className = "status-code-badge text-amber";
    }
    return;
  }

  const startTime = performance.now();
  
  // Simulate standard MCP JSON-RPC 2.0 execution result
  let toolResultContent = {};

  if (toolName === 'validate_purchase_safety') {
    const isSafe = (state.categories.shopping.spent + (parsedArgs.itemPrice || 0)) <= state.categories.shopping.limit;
    toolResultContent = {
      status: isSafe ? "APPROVED_SAFE" : "OVER_BUDGET_WARNING",
      item: parsedArgs.itemTitle || "Item",
      price: parsedArgs.itemPrice || 0,
      monthlyLimit: state.categories.shopping.limit,
      currentSpent: state.categories.shopping.spent,
      safeToSpendScore: isSafe ? "9.4/10" : "4.2/10",
      actionRecommendation: isSafe ? "Execute 1-Click Prime Order" : "Request Manual User Confirmation / Transfer"
    };
  } else if (toolName === 'get_financial_summary') {
    toolResultContent = {
      accountBalance: state.accountBalance,
      investmentValue: state.investmentValue,
      monthlySpending: state.monthlySpending,
      categoryUtilization: state.categories,
      healthStatus: "NOMINAL",
      currency: "USD"
    };
  } else if (toolName === 'search_amazon_deals') {
    toolResultContent = {
      dealsFoundCount: state.deals.length,
      deals: state.deals.map(d => ({ title: d.title, price: d.price, discount: d.discount, prime: true })),
      curationVerdict: "6 Verified Prime Deals matching current budget pacing"
    };
  } else if (toolName === 'track_price_drop_target') {
    toolResultContent = {
      watchdogId: "watch-" + Math.floor(1000 + Math.random() * 9000),
      item: parsedArgs.itemTitle,
      targetPrice: parsedArgs.targetPrice,
      status: "ACTIVE_BACKGROUND_POLL",
      triggerCondition: `Current Price <= $${parsedArgs.targetPrice}`
    };
  } else if (toolName === 'split_shared_expense') {
    const splitAmt = ((parsedArgs.amount || 0) / (parsedArgs.splitCount || 1)).toFixed(2);
    toolResultContent = {
      splitStatus: "LEDGER_SYNCHRONIZED",
      totalAmount: parsedArgs.amount,
      splitCount: parsedArgs.splitCount,
      perMemberShare: parseFloat(splitAmt),
      householdMembersDebited: ["Sarah Jenkins", "Michael Jenkins", "David Jenkins"]
    };
  } else if (toolName === 'log_transaction') {
    toolResultContent = {
      status: "LOGGED_SUCCESSFULLY",
      transactionId: "tx-" + Math.floor(10000 + Math.random() * 90000),
      recorded: parsedArgs,
      newLedgerBalance: state.accountBalance - (parsedArgs.amount || 0)
    };
  }

  const durationMs = Math.max(8, Math.round(performance.now() - startTime + Math.random() * 8));

  const responseRpc = {
    jsonrpc: "2.0",
    id: "rpc-call-" + Date.now().toString(36),
    result: {
      content: [
        {
          type: "text",
          structured: toolResultContent
        }
      ],
      isError: false,
      _meta: {
        protocolVersion: "2025-11-25",
        serverTimestamp: new Date().toISOString(),
        executionLatencyMs: durationMs
      }
    }
  };

  codeOutput.textContent = JSON.stringify(responseRpc, null, 2);

  if (latencyBadge) {
    latencyBadge.innerHTML = `<i class="fa-solid fa-bolt"></i> ${durationMs} ms`;
  }
  if (statusBadge) {
    statusBadge.textContent = "200 OK";
    statusBadge.className = "status-code-badge";
  }
};

window.copyMcpConfigSnippet = function() {
  const configText = `{
  "name": "vault-alexa-mcp",
  "version": "1.0.0",
  "protocolVersion": "2025-11-25",
  "transport": {
    "type": "http-jsonrpc",
    "url": "http://localhost:3000/mcp/v1/rpc"
  },
  "capabilities": {
    "tools": { "listChanged": true },
    "resources": { "subscribe": true },
    "prompts": { "listChanged": true }
  }
}`;

  navigator.clipboard.writeText(configText).then(() => {
    const btn = document.getElementById('btn-copy-mcp-config');
    if (btn) {
      btn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
      setTimeout(() => {
        btn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Config JSON`;
      }, 2000);
    }
  }).catch(() => {
    alert("MCP Config copied to clipboard!");
  });
};

// Role Switcher Management (Buyer vs Seller Mode)
window.currentUserRole = 'buyer';

window.setUserRole = function(role) {
  window.currentUserRole = role;
  const isID = currentLang === 'ID';

  const btnBuyer = document.getElementById('btn-role-buyer');
  const btnSeller = document.getElementById('btn-role-seller');
  const headerAvatar = document.getElementById('header-user-avatar');
  const headerName = document.getElementById('header-user-name');
  const headerBadge = document.getElementById('header-role-badge');
  const popoverAvatar = document.getElementById('popover-avatar-img');
  const popoverName = document.getElementById('popover-user-name');
  const popoverEmail = document.getElementById('popover-user-email');
  const popoverBadge = document.getElementById('popover-user-badge');

  if (role === 'seller') {
    if (btnBuyer) btnBuyer.classList.remove('active');
    if (btnSeller) btnSeller.classList.add('active');

    const sellerAvatarUrl = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80';
    if (headerAvatar) headerAvatar.src = sellerAvatarUrl;
    if (popoverAvatar) popoverAvatar.src = sellerAvatarUrl;
    if (headerName) headerName.textContent = 'Apex Tech Store';
    if (popoverName) popoverName.textContent = 'Apex Tech Store';
    if (popoverEmail) popoverEmail.textContent = 'merchant@apexstore.amazon.com';
    if (headerBadge) {
      headerBadge.textContent = 'Seller';
      headerBadge.className = 'header-role-badge seller-badge';
    }
    if (popoverBadge) {
      popoverBadge.innerHTML = '<i class="fa-solid fa-store"></i> Verified Amazon Merchant';
    }

    // Transform Dashboard to Seller Analytics
    const overviewH2 = document.querySelector('.overview-column .column-title');
    if (overviewH2) overviewH2.textContent = isID ? 'Ringkasan Performa Penjualan Toko' : 'Store Merchant Performance Overview';

    const cardLabels = document.querySelectorAll('.balance-card .card-label, .small-metric-card .card-label');
    if (cardLabels[0]) cardLabels[0].textContent = isID ? 'Total Pendapatan Toko' : 'Total Store Revenue';
    if (cardLabels[1]) cardLabels[1].textContent = isID ? 'Total Pesanan Masuk' : 'Incoming Orders';
    if (cardLabels[2]) cardLabels[2].textContent = isID ? 'Tingkat Konversi AI' : 'AI Conversion Rate';

    const balanceEl = document.getElementById('dash-account-balance');
    const investEl = document.getElementById('dash-investment-value');
    const spendEl = document.getElementById('dash-monthly-spending');
    if (balanceEl) balanceEl.textContent = '$14,850.00';
    if (investEl) investEl.textContent = '142 Orders';
    if (spendEl) spendEl.textContent = '32.4%';

    const subMetaRows = document.querySelectorAll('.small-metric-card .metric-meta-row');
    if (subMetaRows[0]) {
      subMetaRows[0].innerHTML = '<span class="trend-badge positive">+28.4% this week</span><span class="text-muted font-small">Prime Fulfilled</span>';
    }
    if (subMetaRows[1]) {
      subMetaRows[1].innerHTML = '<span class="cat-row-pct green font-small">+18.2% vs Benchmark</span><span class="text-muted font-small">AI Traffic</span>';
    }

    // Transform Virtual Card
    const cardBrandEl = document.querySelector('.card-brand');
    if (cardBrandEl) cardBrandEl.innerHTML = '<i class="fa-brands fa-amazon"></i> Merchant Prime Vault';
    const cardVaultLbl = document.querySelectorAll('.card-holder-lbl');
    if (cardVaultLbl[1]) cardVaultLbl[1].textContent = 'REVENUE VAULT';
    const cardBalanceEl = document.getElementById('card-live-balance');
    if (cardBalanceEl) cardBalanceEl.textContent = '$14,850.00';
    const cardHolderEl = document.querySelector('.card-holder-name');
    if (cardHolderEl) cardHolderEl.textContent = 'APEX TECH STORE';

    // Transform Category Breakdown to Seller Sales Categories
    const budgetH3 = document.querySelector('.category-breakdown-card .card-subtitle');
    if (budgetH3) budgetH3.textContent = isID ? 'Performa Kategori Penjualan Toko' : 'Merchant Category Sales Breakdown';

    const catContainer = document.getElementById('cat-progress-container');
    if (catContainer) {
      catContainer.innerHTML = `
        <div class="cat-progress-row">
          <div class="cat-row-header">
            <span class="cat-row-title">${isID ? 'Elektronik Audio & Video' : 'Audio & Video Electronics'}</span>
            <span class="cat-row-pct blue">78%</span>
            <span class="cat-row-amt">$6,450 / $8,000</span>
          </div>
          <div class="progress-track"><div class="progress-fill blue-fill" style="width: 78%;"></div></div>
        </div>
        <div class="cat-progress-row">
          <div class="cat-row-header">
            <span class="cat-row-title">${isID ? 'Aksesori Gadget & Daya' : 'Power & Gadget Accessories'}</span>
            <span class="cat-row-pct green">65%</span>
            <span class="cat-row-amt">$3,250 / $5,000</span>
          </div>
          <div class="progress-track"><div class="progress-fill green-fill" style="width: 65%;"></div></div>
        </div>
        <div class="cat-progress-row">
          <div class="cat-row-header">
            <span class="cat-row-title">${isID ? 'Perangkat Smart Home' : 'Smart Home Devices'}</span>
            <span class="cat-row-pct purple">82%</span>
            <span class="cat-row-amt">$3,150 / $4,000</span>
          </div>
          <div class="progress-track"><div class="progress-fill purple-fill" style="width: 82%;"></div></div>
        </div>
        <div class="cat-progress-row">
          <div class="cat-row-header">
            <span class="cat-row-title">${isID ? 'Sepatu & Apparel Olahraga' : 'Footwear & Sports Apparel'}</span>
            <span class="cat-row-pct green">90%</span>
            <span class="cat-row-amt">$2,000 / $2,200</span>
          </div>
          <div class="progress-track"><div class="progress-fill green-fill" style="width: 90%;"></div></div>
        </div>
      `;
    }

    // Transform Deals Header & Buttons for Seller
    const dealsH2 = document.querySelector('.dashboard-deals-section .column-title');
    if (dealsH2) dealsH2.innerHTML = `<i class="fa-solid fa-boxes-stacked text-amber"></i> ${isID ? 'Manajemen Produk & Pengaturan Diskon Toko' : 'Store Product Inventory & Prime Promo Controls'}`;

    // Update buttons in deals to Seller Action
    document.querySelectorAll('.btn-buy-alexa').forEach((btn, idx) => {
      const deal = state.deals[idx] || state.deals[0];
      btn.innerHTML = `<i class="fa-solid fa-sliders"></i> ${isID ? 'Atur Promo Prime' : 'Optimize Prime Deal'}`;
      btn.onclick = () => {
        const query = isID ? `Rekomendasikan diskon Prime terbaik untuk ${deal.title}` : `Recommend optimal Prime discount for ${deal.title}`;
        processUserQuery(query);
      };
    });

    // Seller Quick Action Chips
    const chips = document.querySelectorAll('.chip-item');
    if (chips[0]) {
      chips[0].textContent = isID ? '📈 Analisis Penjualan' : '📈 Sales Analytics';
      chips[0].onclick = () => handleChipClick(isID ? 'Bagaimana performa penjualan toko saya bulan ini?' : 'How is my store sales performance this month?');
    }
    if (chips[1]) {
      chips[1].textContent = isID ? '🏷️ Pasang Diskon Prime' : '🏷️ Prime Discounts';
      chips[1].onclick = () => handleChipClick(isID ? 'Rekomendasikan diskon Prime untuk tingkatkan pesanan' : 'Recommend Prime discounts to boost orders');
    }
    if (chips[2]) {
      chips[2].textContent = isID ? '📦 Pesanan Hari Ini' : '📦 Daily Orders';
      chips[2].onclick = () => handleChipClick(isID ? 'Berapa jumlah pesanan masuk hari ini?' : 'How many incoming orders today?');
    }
    if (chips[3]) {
      chips[3].textContent = isID ? '🎯 Optimasi AI' : '🎯 AI Optimization';
      chips[3].onclick = () => handleChipClick(isID ? 'Bagaimana cara meningkatkan penjualan produk seller?' : 'How to boost seller product sales?');
    }

    if (profilePopover) profilePopover.classList.remove('active');

    const welcomeSeller = isID
      ? `🏪 <strong>Mode Penjual (Seller) Aktif:</strong> Selamat datang di <em>Apex Tech Store</em>! Dashboard telah beralih ke metrik toko merchant (Pendapatan $14,850, 142 pesanan terkirim, konversi 32.4%). Siap menganalisis promo dan pesanan masuk!`
      : `🏪 <strong>Seller Mode Activated:</strong> Welcome to <em>Apex Tech Store</em>! Dashboard switched to merchant revenue analytics ($14,850 revenue, 142 fulfilled orders, 32.4% conversion rate). Ready to optimize deals and monitor incoming orders!`;
    addMessage('alexa', 'Alexa+', welcomeSeller);

  } else {
    // Restore Buyer Mode (Sarah Jenkins)
    if (btnBuyer) btnBuyer.classList.add('active');
    if (btnSeller) btnSeller.classList.remove('active');

    const buyerAvatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80';
    if (headerAvatar) headerAvatar.src = buyerAvatarUrl;
    if (popoverAvatar) popoverAvatar.src = buyerAvatarUrl;
    if (headerName) headerName.textContent = 'Sarah Jenkins';
    if (popoverName) popoverName.textContent = 'Sarah Jenkins';
    if (popoverEmail) popoverEmail.textContent = 'sarah.jenkins@amazon.dev';
    if (headerBadge) {
      headerBadge.textContent = 'Buyer';
      headerBadge.className = 'header-role-badge';
    }
    if (popoverBadge) {
      popoverBadge.innerHTML = '<i class="fa-brands fa-amazon"></i> Prime Family Head';
    }

    const cardBrandEl = document.querySelector('.card-brand');
    if (cardBrandEl) cardBrandEl.innerHTML = '<i class="fa-brands fa-amazon"></i> Prime Vault';
    const cardVaultLbl = document.querySelectorAll('.card-holder-lbl');
    if (cardVaultLbl[1]) cardVaultLbl[1].textContent = 'AVAILABLE VAULT';
    const cardHolderEl = document.querySelector('.card-holder-name');
    if (cardHolderEl) cardHolderEl.textContent = 'SARAH JENKINS';

    const subMetaRows = document.querySelectorAll('.small-metric-card .metric-meta-row');
    if (subMetaRows[0]) {
      subMetaRows[0].innerHTML = '<span class="trend-badge positive">+4.2% YTD</span><span class="text-muted font-small">Portfolio Active</span>';
    }
    if (subMetaRows[1]) {
      subMetaRows[1].innerHTML = '<span class="cat-row-pct blue font-small">78% of budget</span><span class="text-muted font-small">12 days left</span>';
    }

    const investEl = document.getElementById('dash-investment-value');
    if (investEl) investEl.textContent = '$68,125.00';

    updateUIOverview();
    applyLanguage(currentLang, false);
    renderShoppingGrid();

    if (profilePopover) profilePopover.classList.remove('active');

    const welcomeBuyer = isID
      ? `🛒 <strong>Mode Pembeli (Buyer) Aktif:</strong> Kembali ke akun personal <em>Sarah Jenkins</em>. Dashboard memantau saldo rekening, batas belanja bulanan, dan promo Prime!`
      : `🛒 <strong>Buyer Mode Activated:</strong> Switched back to personal account for <em>Sarah Jenkins</em>. Monitoring personal checking balance, monthly category budgets, and Prime deals!`;
    addMessage('alexa', 'Alexa+', welcomeBuyer);
  }
};

// Initialize Application on Load
renderShoppingGrid();
updateUIOverview();
applyLanguage('ID', false);
setMicActiveState(false);
resetInspectorArgs();


