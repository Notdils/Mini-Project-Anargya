# DESIGN: Anargya at GIIAS Bali 2027

Angka di dokumen ini adalah nilai yang dipakai di kode. Kalau kode dan dokumen berbeda, kode yang benar. Setelah mengubah kode, perbarui dokumen ini.

## 1. Prinsip
- Tema Bali dengan standar bisnis. Ilustrasi flat yang tenang, tanpa emoji, gradien neon, atau copy generik.
- Warna gelap dengan krem untuk konten, hijau untuk aksi (CTA). Merah dan hijau tua adalah warna lambang Anargya.
- Gerak harus punya makna (cerita waktu, kedalaman) dan selalu ada fallback statis yang rapi.
- Setiap susunan objek harus punya hierarki dan alignment yang jelas.

## 2. Token (`src/base.css`)
| Token | Nilai | Pakai |
|---|---|---|
| `--dark` | `#0c1211` | background utama |
| `--dark-2` | `#121a18` | section alternatif, tile kartu |
| `--cream` | `#ece5d8` | teks utama |
| `--green` | `#29d970` | CTA, focus ring, kart malam |
| `--green-ink` | `#06130c` | teks di atas hijau |
| `--sans` | Inter (@fontsource) | semua teks |
| `--mono` | Roboto Mono | label, harga, angka, toggle bahasa |
| `--gutter` | 48px | padding samping desktop |
- Teks sekunder: krem dengan opacity 0.7–0.78. Garis: krem dengan opacity 0.08.
- Body 17px/1.55. Focus ring: `outline 2px var(--green), offset 3px`.
- Tombol `.btn`: min-height 44px, padding 12×20, radius 8. Varian `--green` (hover `#4fe48b`) dan `--line` (border krem 0.3).
- Warna lambang: hijau `#22351c`, merah `#b3121a`, tepi krem `#f4e9d6`.

## 3. Tipografi
| Elemen | Gaya |
|---|---|
| Judul hero | Inter 900, `clamp(40px, min(8vw, 10.5vh), 100px)` / 0.95 |
| Eyebrow hero | 500 16px |
| Judul section (`.sheet__title`) | 900 44px/1.08, letter-spacing −0.03em (mobile 32). Varian `--sm` 32 (mobile 26) |
| Label section | Roboto Mono 13px, mis. `01  About Anargya` (dua spasi tak terputus) |
| "Ride the Infinity" | `clamp(2.5rem, 7.5vw, 8rem)`, krem, `mix-blend-mode: difference` |
| Papan nama toko | 900 64px; harga dan label memakai mono |

## 4. Landing
### Nav
Brand "Anargya" di kiri, link About/GIIAS di tengah, lalu di kanan toggle `EN | ID` (mono, pil) dan tombol hijau dengan ikon keranjang + "Shop" (bukan "Open the shop"). Breakpoint 760px.

### Hero (`index.html` SVG viewBox 1280×820, `src/home.ts`, `src/home.css`)
- Tinggi `.hero--live` 500vh (mobile ≤760: 360vh). Tanpa JS tingginya 100vh dengan versi pagi statis.
- **Waktu dari scroll:** `timeOf(p)` dengan `HOLD = 0.1`, yaitu jeda diam di pagi (p<0.1), siang (0.4–0.6), dan malam (>0.9), dengan transisi smoothstep di antaranya.
- **Smoothing:** lerp eksponensial dengan tau 140 ms (waktu yang tampil mengejar target).
- **Palet** (diinterpolasi lewat CSS var: sky0, sky1, cloud, sun, mtn, mtn2, seaf, glint, sean, sand, track, palm, kart):
  - Pagi: sky `#2f6e6a → #f3c680`, gunung `#b9603a`, laut `#2f8e8b`, pasir `#eec88b`
  - Siang: sky `#3e8fb0 → #cde9ee`, laut `#1e9aa0`, pasir `#f4ddb0`
  - Malam: sky `#0c1211 → #1b2e2b`, laut `#102522`, pasir `#121a17`, kart `#29d970`, sehingga warnanya menyambung ke section gelap
- **Warna teks per fase:** `#fff8ec` / `#1c1b17` / `#f4e9d6`. Berganti bersama teks (tidak di-scrub).
- **Matahari:** lintasan dari kanan (1000,470) ke tengah (640,430), lalu tenggelam di kiri (220,680). **Bulan** terbit dari kanan, opacity naik di p 0.65–0.72. Di layar portrait, posisi x dirapatkan ke tengah (squeeze 0.3). `clearOfText` menjaga matahari dan bulan tetap di bawah baris teks fase aktif.
- **Kart** menghadap kiri, bergerak dari x 990 ke 430.
- **Parallax layer:** `translateY(depth × p × 40px)` dengan depth 0.1–1 per `<g class="layer">`. Bernilai 0 saat reduced motion.
- **Riak laut:** feTurbulence `baseFrequency 0.006 0.06`. Hanya berjalan saat hero terlihat; mati saat reduced motion.
- **Teks fase** berganti di 33% dan 66% scroll dengan crossfade. `.phase` memakai grid-area 2/1 dan `align-content: start`.
- **Badge GIIAS** (`giias-bali-2027.png`, hitam) hanya tampil di fase 0–1.
- Layar tinggi ≤820px: copy hero dinaikkan ke 88px dan judul mengecil mengikuti vh.

### Section "timing sheet" (gaya D)
Grid `280px | 1fr` dengan label mono, garis kanan, dan konten di padding-left 48 (≤960px jadi 1 kolom). `--alt` memakai background `--dark-2`.

### "Ride the Infinity" (`src/parallax.ts`, `src/parallax.css`, `src/mark.ts`)
- Proyeksi: `s = focal/dz`, posisi layar `= W/2 + (x − mx·mouse)·W/2·s`. Transform berurutan translate → rotate(tilt) → scale. z-index `round(s·100)`, plane 1, headline 1000. Stage `isolation: isolate` tanpa background.
- Konfigurasi: focal 1000, **travel 3700**, fog 3200/2600, nearFade 400, nearClip 260, scrub 0.6 s, mouse 0.08, mouseEase 0.15 s.
- Intro fade smoothstep pada p 0–0.12, handoff fade pada p 0.9–1. Kata headline masuk dengan `outCubic` (stagger 0.03) dan keluar mulai p 0.68 dengan `inCubic`.
- Panjang `.mp--live` 350vh (mobile 250vh). Tanpa JS dan saat reduced motion 100vh.
- **Komposisi animasi**: sama persis dengan commit `05ff97b`; jangan diubah tanpa izin.

| Objek | x | y | z | size | tilt | mobile |
|---|---|---|---|---|---|---|
| line mark (plane) | 0 | 0 | 3050 | 70 | – | ✓ |
| car-side | −0.5 | −0.45 | 1700 | 15 | −6 | ✓ |
| e07 | 0.55 | 0.42 | 1950 | 12 | 3 | ✓ |
| mark fill | 0.22 | −0.62 | 2250 | 6 | −11 | hide |
| energized | −0.62 | 0.03 | 2600 | 12 | −13 | ✓ |
| chibi | 0.48 | −0.38 | 2850 | 8 | 15 | ✓ |
| helmet | −0.3 | 0.58 | 3350 | 8 | −17 | ✓ |
| mark fill | −0.6 | 0.22 | 3700 | 7 | 12 | hide |
| logo | −0.32 | −0.52 | 3950 | 9 | 1 | ✓ |
| frame | 0.4 | 0.45 | 4050 | 7 | 8 | hide |

- **Susunan reduced motion** (`data-static="x y size tilt"`): x/y adalah posisi layar dalam fraksi setengah viewport, size dalam % dari `min(sisi terpanjang, lebar × 1.6)`, tanpa scale dan tanpa fly-through. Objek tanpa `data-static` (frame) disembunyikan.
  - Baris atas (y −0.56): car-side (−0.52, 15.8), logo (0, y −0.6, 6.4), e07 (0.52, 10.5)
  - Tengah (y 0): lambang ±0.74, size 6 (disembunyikan di mobile), plane line di (0, 0, 62)
  - Baris bawah (y 0.56): energized (−0.45, 11.1), chibi (0, 4.7), helmet (0.45, 5.6)
  - Semua tilt 0. Dalam satu baris, tinggi objek sama (size = tinggi × rasio aspek).
- **Rasio aspek aset** (w/h): car-side 1.52, e07 1.01, energized 1.33, chibi 0.56, helmet 0.67, logo 1.04, frame 0.65.
- **Lambang algoritmik** (`mark.ts`, viewBox 400×200):
  - Dua untai `y = ±44·cos(πt)`, dengan SPAN 1.3, SCALE_X 145, dan ekor datar di |t|>1.
  - Versi fill: pita dengan lebar maksimal 22 yang meruncing, hijau `#22351c` dan merah `#b3121a`, stroke krem 7 (`paint-order: stroke`).
  - Versi line: garis 1px `non-scaling-stroke`, opacity rendah.
  - Ini dekorasi, bukan file logo resmi.

### Merch pilihan + kursor CTA (`src/home.ts`, `src/home.css`, `src/cursor.ts`, `src/cursor.css`)
- Layout: label `03  Bali Edition`, judul "Bali Edition merch", sub "Every piece funds the 2027 car.", grid 4 kolom (≤960px: 2 kolom, gap 20, ≤480: 14), lalu tombol hijau dengan ikon keranjang "Visit the shop".
- Kartu `a.feat` → `/shop/`:
  - Foto 4:5, radius 6, background `--dark-2`. Cutout memakai `contain` + padding 14%, foto biasa `cover`. Hover membuat gambar scale 1.04.
  - Di bawah foto: nama, lalu harga dalam mono.
  - Zona CTA hanya foto (`data-cta`).
- `FEATURED = ["tee-night","tee-sand","keychain-chibi","keychain-e21"]`.
- Kursor `.cc`:
  - Titik krem 12px. Di atas zona CTA, titik melebar dari tengah menjadi pil hijau (radius 999) dengan teks `--green-ink` 600 15px, bertuliskan "View in shop ↗" / "Lihat di toko".
  - Transisi pil: clip-path 0.32s `cubic-bezier(.65,0,.35,1)`, warna 0.28s.
  - Teks dan panah bergulir lewat WAAPI selama 520 ms (delay 90).
  - Kursor mengikuti mouse dengan lag 0.06 s. Gap antar zona 120 ms supaya pil tidak menutup saat pindah ke kartu sebelah.
  - Kursor native tetap terlihat.
- Fallback: chip hijau statis di pojok foto untuk touch dan `:focus-visible`. Saat reduced motion, pil langsung terbuka tanpa gulungan.

## 5. Toko (`shop/index.html`, `src/shop.ts`, `src/shop.css`)
- Palet lapak: sand `#f2e6d0`, wall `#4a2f1d`, plank `#3b2516`, post `#7a4e2e`, fascia `#6b4428`, wood `#8a5a35`, kraft `#d8b88a`, tag-ink `#2a1e14`, card `#efe3cc`, chalk `#f4e9d6`.
- Struktur: atap jerami (SVG digenerate di `shop.ts`), fascia dengan papan nama "Anargya" + sub, kanopi garis hijau, dinding dengan 3 zona (rail/hooks/shelf), lalu counter berisi papan kapur dan struk (tas).
- Kartu produk:
  - `cutout: true` berarti tanpa bingkai, bayangan mengikuti bentuk.
  - Gantungan kunci tergantung dari ring-nya. `ring` adalah posisi ring dalam % dari kiri gambar (chibi 50.3, e21 64.6, energized 52.3).
  - Label kraft berisi nama, meta, ukuran, harga, tombol Add, dan pesan status.
- Gerak (≥901px & tidak reduced):
  - Barang di rel dan kait berayun ±0.9°. Label berayun ±2° dari talinya. Durasi dan delay per item dibuat berbeda (2.6–3.4 s).
  - Hover pada foto memicu animasi "nudge" 1.8 s. Hover atau fokus pada label menghentikan ayunan.
- Struk: kertas `#fffdf8` dengan tepi zigzag, baris item ±, pilihan pengiriman radio, total, tombol checkout, dan catatan pembayaran.
- ≤1100px tablet. ≤900px tampilan berubah jadi daftar dan bar tas di bawah layar. 360px: ukuran dan baris harga wrap.

## 6. Mode reduced motion (ringkas)
| Bagian | Yang terjadi |
|---|---|
| Hero | Cerita pagi → malam tetap berjalan (digerakkan scroll). Parallax, riak, smoothing, dan crossfade teks dimatikan |
| Ride the Infinity | Satu layar statis tersusun rapi (`data-static`), tanpa pin panjang dan tanpa efek mouse |
| Kursor CTA | Pil langsung terbuka, tanpa gulungan teks dan tanpa lag |
| Toko | Tanpa ayunan |

## 7. Aset (`public/img/`)
- `giias-bali-2027.png` (hitam saja), `logo.png`, `team.webp`.
- `white-shirt.webp`, `black-shirt.webp`, `tumbler.webp`: crop dari kartu promo, resolusi rendah (±300px).
- `sticker-sheet.webp`, `keychain-chibi|e21|energized.webp`: transparan.
- `mp/*.webp`: 7 gantungan kunci cutout, total ±300 KB. Background sudah dihapus dan dicek alpha-nya secara program.
- Bucket hat dan tote masih ilustrasi SVG inline di `products.ts`.
