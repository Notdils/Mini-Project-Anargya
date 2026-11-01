# Anargya at GIIAS Bali 2027

## Setup & Menjalankan

### 1. Prasyarat
- **Node.js 18.18 atau lebih baru** (disarankan 20/22/24). Cek: `node -v`

### 2. Install & jalankan
```bash
cd mini-project
npm install
npm run dev
```
Buka **http://localhost:5173** (landing) dan **http://localhost:5173/shop/** (toko).

Dari HP di WiFi yang sama: `npm run dev -- --host`, lalu buka alamat **Network** yang muncul.

### 3. Build & deploy
```bash
npm run build      # hasil di dist/
npm run preview    # cek hasil build di http://localhost:4173
```
Vercel: import repo, Vercel otomatis mengenali Vite (Build `npm run build`, Output `dist`).

## Tentang

Website satu halaman untuk Anargya ITS EV Team di GIIAS Bali 2027 (27–31 Januari 2027, The Meru Sanur, Denpasar), plus toko fundraising terpisah. Dua bahasa: English dan Bahasa Indonesia.

| | |
|---|---|
| **Stack** | Vite 6 + TypeScript, tanpa framework |
| **Halaman** | `/` landing · `/shop/` toko Bali Edition |
| **Bahasa** | EN / ID, tombol di navbar. Awalnya mengikuti bahasa browser, pilihan disimpan di `localStorage`. Semua teks ada di `src/i18n.ts` |
| **Backend** | Tidak ada. Isi tas belanja disimpan di `localStorage` browser, checkout dikirim ke WhatsApp tim |

### Landing (`index.html`, `src/home.ts`, `src/home.css`)
- **Hero pagi → siang → malam**: hero setinggi 500vh (±4 layar scroll) dengan scene yang menempel di layar. Pagi, siang, dan malam masing-masing punya jeda diam, dan waktu mengejar posisi scroll dengan halus, jadi scroll cepat tidak membuat fase terlewat. Scroll menggeser waktu: warna langit, laut, pasir, gunung berubah halus, matahari terbit di kanan, berada di tengah saat siang, lalu tenggelam di kiri ke balik laut, bulan terbit dari kanan dan bintang muncul, kart bergerak dari kanan ke kiri menyusuri pantai dan menyala hijau saat malam.
- **Parallax dari waktu**: selama scroll, layer dekat bergeser lebih jauh dari layer jauh. Tidak ada parallax lain di halaman.
- **Teks berganti per fase** (pagi, siang, malam) di 33% dan 66% scroll, dengan crossfade singkat.
- **Riak laut**: filter SVG di laut dekat, hanya berjalan saat hero terlihat.
- Akhir hero menyatu ke section gelap: About, GIIAS Bali, link ke toko.
- Indikator di kanan (Morning / Midday / Night) bisa diklik untuk lompat ke fase.
- Logo GIIAS Bali (`public/img/giias-bali-2027.png`, hanya versi hitam) tampil di badge "Exhibiting at / Hadir di" saat pagi & siang, dan hilang saat malam.
- `prefers-reduced-motion`: tanpa pin, tanpa riak, hero statis versi pagi. Mobile: hero 360vh.

### Toko (`shop/index.html`, `src/shop.ts`, `src/shop.css`, `src/products.ts`)
- Halaman berupa lapak pantai: atap jerami, papan nama, kanopi garis hijau, kaos digantung di rel, gantungan kunci di kait, aksesori di rak.
- Produk dengan gambar berlatar transparan (`cutout: true` di `src/products.ts`) tampil tanpa bingkai, bayangannya mengikuti bentuk. Gantungan kunci menggantung dari ring-nya: isi `ring` = posisi ring dalam % dari kiri gambar.
- Label harga kertas kraft: pilih ukuran (wajib untuk kaos), tombol Add.
- Papan kapur: cara beli + progres dana.
- Struk sebagai tas belanja: ubah jumlah, pilih ambil di booth / kirim, total.
- Checkout membuka WhatsApp dengan ringkasan pesanan.
- Barang di rel berayun dari gantungannya, label harga berayun dari talinya (juga di rak). Kursor di foto = disenggol; kursor di label = berhenti supaya tombol mudah diklik. Mati di mobile & reduced motion.
- Layar ≤ 900px (HP & tablet portrait): rel & rak jadi daftar, tas jadi bar di bawah layar.

## Yang perlu diisi sebelum rilis

| Apa | Lokasi |
|---|---|
| Nomor WhatsApp checkout (kosong = tombol checkout nonaktif) | `ORDER_WHATSAPP` di `src/products.ts` |
| Angka dana & jumlah pendukung (sekarang data contoh) | `FUND` di `src/products.ts` |
| Produk & harga | `PRODUCTS` di `src/products.ts` |
| Jam buka & nomor booth (sekarang "To be announced / menyusul"). Tanggal & venue sudah sesuai pengumuman GIIAS Bali 2027 | `src/i18n.ts` (kunci `giias.*`, `bag.pickupNote`, `chalk.3`) |
| Teks apa pun (EN & ID) | `src/i18n.ts` |
| Link Instagram / Email / LinkedIn | footer di `index.html` dan `shop/index.html` |
| Foto produk | `public/img/`. Kaos & tumbler masih crop dari kartu promo. Bucket hat & tote masih ilustrasi. Gantungan kunci & stiker sudah aset transparan dari tim desain. Bahan/ukuran gantungan kunci ("Acrylic") dan harganya (Rp 15.000, dari kartu promo) perlu dicek |

## Struktur

```
├── index.html          # landing
├── shop/index.html     # toko /shop
├── public/img/         # foto & logo
├── src/
│   ├── i18n.ts         # semua teks EN/ID + tombol bahasa
│   ├── base.css        # font, warna, tombol, nav, footer
│   ├── home.ts         # scroll pagi → malam, riak laut
│   ├── home.css
│   ├── shop.ts         # render produk, tas belanja, checkout
│   ├── shop.css
│   └── products.ts     # data produk, dana, nomor WhatsApp
└── vite.config.ts      # konfigurasi 2 halaman
```
