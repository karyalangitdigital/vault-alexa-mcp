# 🎥 Skenario & Naskah Video Demo: "VaultAlexa+"

**Durasi Target:** 2.5 - 3 Menit  
**Persiapan Sebelum Merekam:**  
1. Buka Terminal/Command Prompt, jalankan `npm start`.  
2. Buka browser, masuk ke `http://localhost:3000` (atau buka file `index.html` Anda).  
3. Buka tab Terminal lain yang siap menjalankan `npm test`.

---

## ⏱️ Detik 0:00 - 0:30 | Pembukaan & Pengenalan Visi

- **Di Layar (Visual):** Menampilkan halaman GitHub `README.md` Anda, lalu berpindah ke tampilan UI web simulator VaultAlexa+ yang bersih.
- **Naskah (Voiceover):**
  > *"Hello judges, welcome to VaultAlexa+. Traditional shopping apps rely on clunky interfaces and rigid databases. But for the Amazon Developer Hackathon, we envisioned something completely different: a true Zero-Backend, Two-Sided Autonomous Agent powered entirely by the Model Context Protocol."*
  > 
  > *(Terjemahan: Halo juri, selamat datang di VaultAlexa+. Aplikasi belanja tradisional bergantung pada UI yang kaku dan database. Tapi untuk Hackathon ini, kami merancang sesuatu yang berbeda: Agen Otonom Dua-Sisi tanpa-backend yang ditenagai sepenuhnya oleh Model Context Protocol.)*

---

## ⏱️ Detik 0:30 - 1:15 | Skenario 1: Agen Pembeli (Buyer) & Proteksi Budget

- **Di Layar (Visual):**
  1. Pastikan profil di pojok kanan atas di-set sebagai **"Buyer"**.
  2. Ketik di kolom chat UI: *"I want to buy Bose Headphones for $219."*
  3. Tunjukkan layar saat agen Alexa+ menolak/memperingatkan karena melebihi budget, lalu memanggil tool `validate_purchase_safety` dan `negotiate_dynamic_discount`.
- **Naskah (Voiceover):**
  > *"Let's look at the Buyer Agent. When I ask Alexa+ to buy a $219 headphone, it doesn't just add it to a cart. Using our MCP Server, it autonomously calls the `validate_purchase_safety` tool. It notices my entertainment budget is low. Instead of just failing, it automatically calls the `negotiate_dynamic_discount` tool to simulate a real-time bilateral negotiation with the seller, getting me a 15% discount voucher instantly."*
  > 
  > *(Terjemahan: Mari lihat Agen Pembeli. Saat saya meminta Alexa+ membeli headphone seharga $219, ia tidak sekadar memasukannya ke keranjang. Menggunakan server MCP, ia secara otonom memanggil tool validasi budget. Karena budget saya menipis, ia otomatis menawar harga ke penjual dan mendapatkan diskon 15% secara instan.)*

---

## ⏱️ Detik 1:15 - 2:00 | Skenario 2: Agen Penjual (Seller) & Manajemen FBA

- **Di Layar (Visual):**
  1. Klik tombol *Role Switch* di UI untuk berubah menjadi mode **"Seller"**.
  2. Ketik di kolom chat: *"Give me my morning briefing."*
  3. Sorot layar saat agen memanggil tool `generate_morning_briefing` dan `predict_inventory_stockout`, menampilkan laporan inventaris dan draf Purchase Order.
- **Naskah (Voiceover):**
  > *"But VaultAlexa+ is two-sided. I can switch my role to Seller. When I ask for my morning briefing, the agent dynamically routes the intent to the Seller MCP tools. It calls `predict_inventory_stockout` and warns me that my Amazon FBA inventory will run out in 3 days, and proactively drafts a purchase order for my supplier. No databases, just intelligent tool orchestration."*
  > 
  > *(Terjemahan: Namun VaultAlexa+ ini memiliki dua sisi. Saya bisa berganti peran menjadi Penjual. Saat saya meminta laporan pagi, agen akan mengeksekusi tool penjual. Ia memprediksi bahwa stok gudang FBA saya akan habis dalam 3 hari, dan secara proaktif membuatkan draf pemesanan barang. Tanpa database, murni orkestrasi tool yang cerdas.)*

---

## ⏱️ Detik 2:00 - 2:30 | "Under The Hood" (Teknis & MCP Inspector)

- **Di Layar (Visual):**
  1. Klik menu **"MCP Inspector"** di panel samping UI.
  2. Pilih salah satu tool dari *dropdown* (misal: `search_amazon_deals`), klik tombol *Execute*, dan sorot JSON response-nya.
  3. Buka Terminal, jalankan perintah `npm test` dan tunjukkan teks hijau: `✅ All 9 MCP JSON-RPC 2.0 Method Calls Verified Successfully! (15 Tools...)`
- **Naskah (Voiceover):**
  > *"Under the hood, we strictly followed the November 2025 MCP specification using Streamable HTTP. Our Node.js server exposes 15 distinct autonomous tools and 3 resources. As you can see from our test suite, it perfectly passes all JSON-RPC 2.0 compliance checks."*
  > 
  > *(Terjemahan: Di balik layar, kami secara ketat mengikuti spesifikasi MCP November 2025 menggunakan Streamable HTTP. Server Node.js kami menyediakan 15 tool otonom dan 3 resource. Seperti yang terlihat di test suite kami, proyek ini lulus uji kepatuhan JSON-RPC 2.0 dengan sempurna.)*

---

## ⏱️ Detik 2:30 - 3:00 | Penutup (Conclusion)

- **Di Layar (Visual):** Kembali ke halaman UI awal (Dashboard), mungkin bisa sambil memainkan fitur *Text-to-Speech* (suara bot-nya bicara), lalu tampilkan wajah Anda (opsional) atau logo proyek.
- **Naskah (Voiceover):**
  > *"By connecting the Amazon ecosystem directly to Agentic reasoning via MCP, VaultAlexa+ shapes the future of how humans interact with smart commerce—transforming passive interfaces into proactive digital assistants. Thank you!"*
  > 
  > *(Terjemahan: Dengan menghubungkan ekosistem Amazon langsung ke penalaran Agentic via MCP, VaultAlexa+ membentuk masa depan bagaimana manusia berinteraksi dengan perdagangan cerdas—mengubah antarmuka pasif menjadi asisten digital proaktif. Terima kasih!)*
