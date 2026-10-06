# Riwayat Percakapan & Pengembangan (VaultAlexa+)

_Dibuat secara otomatis pada 28 September 2026_

Dokumen ini adalah ringkasan dari semua hal yang telah kita diskusikan dan kerjakan bersama dalam sesi persiapan akhir _Amazon Developer Hackathon_:

### 1. Pengecekan Bug & Perbaikan Kode

- **Keluhan Awal:** Anda meminta untuk mengecek apakah ada error atau bug di proyek.
- **Tindakan:** Saya menemukan bahwa _test script_ (`test-dom-and-sync.js`) mengalami error karena port 3000 bentrok (EADDRINUSE) dan ada ID dinamis yang tidak cocok.
- **Hasil:** Saya memperbaiki file pengujian tersebut dengan memindahkannya ke port 3030 khusus untuk testing, sehingga sekarang ketika Anda menjalankan `npm test:all`, semuanya **lulus 100% (Hijau)**.

### 2. Penyesuaian dengan Aturan Devpost (Hackathon)

- **Aturan:** Proyek harus menggunakan spesifikasi MCP (2025-11-25), mendukung _Streamable HTTP_, dan menyediakan _Simulated Experience_.
- **Tindakan:** Saya melakukan audit kode dan memastikan bahwa server `mcp-server.js` Anda dan UI `app.js` Anda sudah memenuhi **semua standar teknis** dari Amazon.
- **Saran:** Saya merekomendasikan Anda untuk memastikan pengumpulan video demo, repo GitHub berstatus _Public_, dan melampirkan `FRICTION_LOG.md` untuk poin bonus.

### 3. Ide Fitur Tambahan (Ring, Fire TV)

- **Diskusi:** Anda bertanya ide fitur tambahan untuk agen _Buyer_ dan _Seller_.
- **Ide yang Dihasilkan:**
  - _Package Delivery Shield_ (Integrasi kamera pintu Ring).
  - _Family Budget Interceptor_ (Integrasi Fire TV).
  - _Multi-Agent Negotiation_ (Agen pembeli vs Agen penjual).
- **Kesimpulan Visi:** Kita sepakat bahwa proyek ini adalah **Asisten Otonom (Agentic AI) Sejati**, di mana AI mengambil keputusan sendiri tanpa bergantung pada database/backend tradisional yang kaku.

### 4. Sinkronisasi Dokumentasi (README.md)

- **Tindakan:** Saya memperbaiki teks pada file `test-mcp.js` agar menghasilkan output yang benar ("15 Tools") bukan "13 Tools", lalu menyinkronkannya dengan tulisan di `README.md`.
- **Hasil:** Repositori Anda sekarang konsisten antara dokumentasi dan kode asli.
- **Git Push:** Saya membantu Anda melakukan _commit_ dan _push_ semua perbaikan ini langsung ke GitHub di branch `main`.

### 5. Pembuatan Naskah Video Demo

- **Tindakan:** Karena Anda butuh panduan untuk membuat video, saya membuatkan **Skenario Video 3 Menit** beserta naskah (bahasa Inggris & terjemahannya) yang menyoroti fitur-fitur terbaik VaultAlexa+.
- **Hasil:** Naskah tersebut disimpan di `docs/Naskah_Video_Demo_VaultAlexa.md` dan `.html` agar mudah dicetak/dijadikan PDF.

### 6. Eksperimen Amazon Polly (Text-to-Speech)

- **Diskusi:** Anda bertanya apakah kita bisa langsung menggunakan AI Amazon Polly untuk suara agen.
- **Tindakan:** Saya sempat memasangkan `@aws-sdk/client-polly` dan membuat sistem suara _hybrid_ (Polly untuk Inggris, Web Speech untuk Indonesia).
- **Hasil:** Ternyata kunci akses (API Key) AWS Hackathon Anda dikunci (_Access Denied_) oleh Amazon untuk layanan Polly (hanya untuk Bedrock). Demi menjaga kebersihan dan kestabilan proyek sebelum perekaman video, **saya menghapus kembali semua kode Polly tersebut** ke versi aslinya.

---

**Status Saat Ini:** Proyek Anda **100% Bersih, Stabil, dan Siap Dikumpulkan!** 🚀
