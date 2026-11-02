# TODO

## Wajib sebelum rilis (konten dari tim)
- [ ] **Nomor WhatsApp checkout** → `ORDER_WHATSAPP` di `src/products.ts`. Format `628xxxxxxxxxx` tanpa "+". Kalau kosong, checkout nonaktif.
- [ ] **Angka dana asli** → `FUND` di `src/products.ts`. Sekarang data contoh: 18,4 jt dari 50 jt, 312 pendukung.
- [ ] **Harga final semua produk** → `PRODUCTS`. Sekarang:
  - kaos 135.000
  - bucket hat 85.000
  - tote 65.000
  - tumbler 45.000
  - sticker pack 10.000
  - 3 gantungan kunci masing-masing 15.000 (dari kartu promo)
- [ ] **Bahan gantungan kunci** (sekarang "Acrylic"). Perlu dicek.
- [ ] **Jam buka & nomor booth** → `src/i18n.ts`: `giias.hoursV`, `giias.boothV`, juga cek `bag.pickupNote` dan `chalk.3`.
- [ ] **Kendaraan yang dibawa ke GIIAS** belum diputuskan. Kalau sudah pasti, boleh disebut di copy (`hero.1.body`, `giias.body`).
- [ ] **Link Instagram / Email / LinkedIn** → footer `index.html` dan `shop/index.html`. Sekarang masih `#`.
- [ ] **Foto produk:**
  - Kaos dan tumbler masih crop resolusi rendah (±300px), jadi buram di kartu merch landing. Minta foto ≥800px.
  - Bucket hat dan tote masih ilustrasi.
- [ ] **PI-EV**: tahun di tabel kompetisi About masih kosong.
- [ ] Biaya ongkir "mulai Rp 18.000" (`bag.shipNote`) perlu dikonfirmasi.

## Belum dikerjakan / ide (tanya user dulu)
- [ ] Commit perubahan terbaru (dilakukan user sendiri): grid merch + kursor CTA, susunan statis reduced motion, dan dokumen ini.
- [ ] Analytics (klik ke /shop, checkout).
- [ ] OG image / meta sosial untuk share link.
- [ ] Favicon dari lambang Anargya.
- [ ] Deep-link kartu merch ke produk tertentu di `/shop/` (sekarang semua menuju `/shop/`).
- [ ] Uji di perangkat asli: performa `mix-blend-mode` di HP kelas bawah, Safari iOS.
- [ ] Deploy (Vercel/Netlify).
