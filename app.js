/**
 * VaultAlexa+ Controller Logic - Standby Mic Toggle Fix
 */

const SERVER_URL = 'http://localhost:3000/mcp/v1/rpc';

let state = {
  accountBalance: 24560.80,
  investmentValue: 68125.00,
  monthlySpending: 3150.45,
  categories: {
    groceries: { percent: 65, spent: 520, limit: 800, class: 'blue' },
    diningOut: { percent: 88, spent: 352, limit: 400, class: 'green' },
    utilities: { percent: 40, spent: 120, limit: 300, class: 'purple' },
    shopping: { percent: 72, spent: 432, limit: 600, class: 'blue' }
  },
  deals: [
    { title: 'Amazon Echo Show 8', discount: '30% Off', price: 99.99, wasPrice: 129.99, badgeClass: 'blue-badge', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop&q=60' },
    { title: 'Running Shoes', discount: '15% Off', price: 65.50, wasPrice: null, badgeClass: 'green-badge', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60' },
    { title: 'Bose Headphones', discount: '15% Off', price: 219.00, wasPrice: null, badgeClass: 'purple-badge', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' }
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

// Process User Query
function processUserQuery(query) {
  addMessage('user', 'Sarah', query);
  const qLower = query.toLowerCase();

  setTimeout(() => {
    if (qLower.includes('tech') || qLower.includes('deal') || qLower.includes('item')) {
      addMessage('alexa', 'Alexa+', 'Here are tech deals for you: Amazon Echo Show 8 at $99.99 (30% Off) and Bose Headphones at $219.00!');
    } else if (qLower.includes('grocery') || qLower.includes('food')) {
      addMessage('alexa', 'Alexa+', 'You have spent $520 out of your $800 grocery budget (65% used). Safe remaining capacity: $280.');
    } else if (qLower.includes('balance') || qLower.includes('account')) {
      addMessage('alexa', 'Alexa+', `Your total Account Balance is $24,560.80 and your Investment Value grew to $68,125.00 (+4.2%).`);
    } else {
      addMessage('alexa', 'Alexa+', `I analyzed your request via MCP Server v2025-11-25. Your monthly spending is $3,150.45.`);
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
