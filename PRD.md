# PRD: Anargya at GIIAS Bali 2027

## 1. Latar belakang
GIIAS (GAIKINDO Indonesia International Auto Show) untuk pertama kalinya hadir di Bali sebagai bagian dari GIIAS The Series 2027, pada **27–31 Januari 2027** di **The Meru Sanur, Denpasar**. Anargya ITS EV Team ikut pameran dengan booth sendiri. Website ini punya dua fungsi: mengajak orang datang ke booth, dan menggalang dana musim 2027 lewat merchandise **Bali Edition**.

## 2. Tujuan
1. Pengunjung paham siapa Anargya dan bahwa tim hadir di GIIAS Bali (tanggal, venue, booth).
2. Mengarahkan pengunjung ke toko `/shop/` untuk membeli merch.
3. Memberi kesan premium dengan tema Bali, bukan template.

**Metrik (belum dipasang analytics):** klik ke `/shop/`, jumlah checkout WhatsApp, dan progres dana (`FUND`).

## 3. Pengguna
- Pengunjung GIIAS Bali (umum, keluarga, penggemar otomotif), mayoritas dari HP.
- Alumni, sponsor, dan pendukung tim ITS (desktop dan HP).
- Wisatawan di Bali, sehingga perlu versi bahasa Inggris.

## 4. Scope
**Masuk:** landing `/`, toko `/shop/`, dwibahasa EN/ID, tas belanja di browser, checkout via WhatsApp, pilihan ambil di booth atau kirim ke seluruh Indonesia.
**Tidak masuk:** backend, pembayaran online langsung, akun pengguna, CMS, stok, analytics.

## 5. Requirement fungsional
### Landing
- F1. Hero di-pin dan bercerita pagi → siang → malam mengikuti scroll. Masing-masing fase punya teks sendiri:
  - **Pagi**, "Paddock to shore": perkenalan dan GIIAS pertama di Bali.
  - **Siang**, "Come see it up close": ajakan datang ke booth.
  - **Malam**, "Back the 2027 season": tombol "Open the shop".
- F2. Matahari terbit di kanan, di tengah saat siang, lalu tenggelam di kiri. Bulan terbit dari kanan saat malam. Kart bergerak dari kanan ke kiri dan menyala hijau saat malam.
- F3. Badge "Exhibiting at" dengan logo GIIAS Bali (hitam), tampil saat pagi dan siang saja.
- F4. Indikator Morning/Midday/Night yang bisa diklik untuk lompat ke fase.
- F5. Section About, GIIAS (fakta dan petunjuk arah), "Ride the Infinity", dan merch pilihan.
- F6. "Ride the Infinity": kamera bergerak sepanjang sumbu Z melewati 7 gantungan kunci dan lambang Anargya. Di desktop, mouse menggeser kamera sedikit.
- F7. Merch pilihan: 4 kartu (kaos night, kaos sand, chibi, mobil E21) yang menuju `/shop/`. Saat kursor di atas foto, kursor berubah menjadi pil "View in shop ↗". Di bawah grid ada tombol "Visit the shop".
- F8. Tombol "Shop" di navbar memakai ikon keranjang dan teks "Shop" saja.

### Toko
- F9. Produk dikelompokkan per tempat: **rel** (pakaian), **kait** (gantungan kunci), **rak** (aksesori).
- F10. Kaos wajib pilih ukuran (S/M/L/XL). Kalau belum dipilih muncul pesan "Pick a size first" dan fokus pindah ke pilihan ukuran.
- F11. Tas belanja disimpan di `localStorage` dengan key `anargya-bag`. Jumlah bisa ditambah/dikurangi dan total dihitung otomatis.
- F12. Pengiriman: ambil di booth (gratis) atau kirim ke seluruh Indonesia (mulai Rp 18.000, 2–5 hari, ongkir dikonfirmasi lewat WhatsApp).
- F13. Checkout membuka `wa.me/<ORDER_WHATSAPP>` berisi ringkasan pesanan. Kalau nomor kosong, tombol nonaktif dan muncul teks "Online checkout opens before the show".
- F14. Papan kapur berisi 3 langkah cara beli, progres dana (`FUND`), dan alokasinya (sel baterai, ban, perjalanan).
- F15. Di layar ≤900px, tampilan rel dan rak berubah jadi daftar, dan tas belanja jadi bar di bawah layar.

### Global
- F16. Toggle EN/ID tersimpan di `localStorage` dengan key `anargya-lang`. Bahasa awal mengikuti browser. `<title>`, meta description, alt, dan aria ikut berganti.
- F17. Footer berisi tautan Instagram, Email, dan LinkedIn (URL belum ada).

## 6. Requirement non-fungsional
- **Aksesibilitas:** heading semantik, aria-label untuk judul yang dipecah per kata, `:focus-visible` hijau, target sentuh ≥44px, kontras teks ≥4.5:1, kursor native tidak disembunyikan.
- **Reduced motion:** semua konten tetap tampil (lihat DESIGN.md §6). Banyak laptop Windows mengaktifkan reduced motion tanpa disadari pemiliknya (*Animation effects* dimatikan atau mode hemat daya), jadi tampilan statis harus tetap rapi.
- **Tanpa JS:** hero dan section parallax masing-masing hanya setinggi 1 layar (class `--live` ditambahkan lewat JS).
- **Responsif:** 360–1920px tanpa scroll horizontal. Layar pendek (≤820px tinggi) tetap aman.
- **Performa:** per frame hanya mengubah `transform`/`opacity`. Loop rAF berhenti sendiri kalau tidak ada gerakan. Total aset scene parallax sekitar 300 KB.
- **Deploy:** statis (Vercel/Netlify): `npm run build`, hasilnya di `dist/`.

## 7. Konten yang masih placeholder
Lihat TODO.md: nomor WhatsApp, angka dana, harga final, jam buka, nomor booth, link sosial, foto produk, dan kendaraan yang dibawa (belum diputuskan).
