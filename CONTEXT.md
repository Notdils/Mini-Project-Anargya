# CONTEXT: Anargya at GIIAS Bali 2027

Dokumen serah terima untuk melanjutkan proyek di chat Claude lain. Baca berurutan: **ANARGYA-PROJECTS → CONTEXT → PRD → DESIGN → DECISIONS → TODO**. README berisi cara menjalankan proyek. `ANARGYA-PROJECTS.md` adalah peta semua project lain dari chat yang sama (Special Task, Energize Talk, Motion-Anargya, dan lainnya).

## Ringkasan 30 detik
- **Apa:** website mini project untuk **Anargya ITS EV Team** (tim mobil listrik mahasiswa ITS Surabaya) di **GIIAS Bali 2027**. Isinya landing satu halaman (`/`) dan toko fundraising terpisah (`/shop/`).
- **Event:** 27–31 Januari 2027 di The Meru Sanur, Denpasar. Booth sudah pasti, tapi nomor dan jam buka masih *To be announced*.
- **Tema:** Bali. Standar bisnis, tanpa "AI slop" (tidak ada copy generik, emoji, atau gradien norak).
- **Stack:** Vite 6 + TypeScript vanilla, multi-page, tanpa framework dan tanpa backend.
- **Bahasa:** EN/ID. Semua teks ada di `src/i18n.ts`.
- **Status:** semua fitur jalan dan sudah diverifikasi. Sisanya placeholder konten (lihat TODO.md).

## Lokasi & cara kerja
| | |
|---|---|
| Kode | `D:\mini-project` di laptop user (Windows). Git dipegang user sendiri; Claude **tidak** commit/push. |
| Commit terakhir user | `05ff97b final fix: parallax effect`. Perubahan sesudahnya (grid merch, kursor CTA, susunan statis reduced motion) belum di-commit. |
| Figma | `https://www.figma.com/design/dAypXrqoA5G3zaGGk71ldJ` (file yang sama dengan Special Task & Energize). Page inspo GIIAS Bali (node `97:24`): A After Sunset, B Shoreline, C Paddock Postcard, lalu D/E/F setelah audit Unslop, dan G (shack). Arah yang dipilih: hero F + section D + toko G. |
| Aset brand | Dari tim Design & Creative Branding (Google Drive user). Logo GIIAS hanya boleh **versi hitam**. |

## Arah desain yang dipilih (final)
- **Landing:** hero gaya **F** (pantai Bali ilustrasi SVG) yang di-pin dan bergerak **pagi → siang → malam** mengikuti scroll, teks berganti per fase. Setelah itu section gelap gaya **D** (label "timing sheet" bernomor 01/02/03).
- **Toko:** konsep **G**, lapak pernak-pernik pantai (*beach shack*): atap jerami, rel gantungan, kait, rak, label harga kraft, papan kapur, dan struk sebagai tas belanja.

## Urutan section landing
1. Nav fixed: Anargya · About · GIIAS Bali · toggle EN/ID · tombol hijau 🛒 "Shop"
2. **Hero** 500vh (mobile 360vh), pagi → siang → malam, badge logo GIIAS (pagi & siang saja), indikator Morning/Midday/Night yang bisa diklik
3. **01 About Anargya**: teks, tabel kompetisi (FSAE Japan 2025, Jakarta Formula E-Prix 2022, PI-EV), foto tim
4. **02 GIIAS Bali 2027**: fakta tanggal/jam/venue/booth, tombol Get directions (Google Maps)
5. **"Ride the Infinity"**: Z fly-through gantungan kunci (350vh)
6. **03 Bali Edition**: grid 4 merch dengan kursor CTA, lalu tombol "Visit the shop"
7. Footer (link sosial masih `#`)

## Preferensi user (penting)
- Komunikasi dalam **Bahasa Indonesia**, kode dan komentar boleh campur ID.
- Suka memanggil skill: `/general-discipline`, `/design:design-critique`, `/motion-parallax`, `/motion-cursor-cta`. Ikuti instruksi dan acceptance criteria-nya.
- Mau perubahan **surgical**. Jangan ubah hal yang tidak diminta. Kalau user bilang "harus sama persis", verifikasi dengan perbandingan frame-by-frame.
- Visual harus rapi: hierarki dan alignment jelas, tidak "hamburadul".
- Tanya dulu untuk hal faktual yang belum pasti (harga, jam, nomor booth, kendaraan yang dibawa). Jangan mengarang.
- Sinkronisasi file ke laptop: cek md5 di device dulu (jangan menimpa editan user), stage → commit, lalu verifikasi md5 dan `tsc`.

## Batasan keamanan (wajib)
- Jangan pernah menulis atau meng-commit Supabase `secret_key` atau password DB (pernah muncul di sesi; proyek ini tidak memakai Supabase).
- Email user hanya untuk identifikasi.
- User **menolak** izin hapus untuk `D:\Motion-Anargya`. Jangan minta lagi.
- Menghapus file di `D:\mini-project` tidak diizinkan. Kalau perlu, pindahkan ke `_to_delete/`.

## Dokumen lain
- `PRD.md`: tujuan, scope, requirement fungsional & non-fungsional
- `DESIGN.md`: token, tipografi, komponen, animasi (angka persis)
- `DECISIONS.md`: keputusan + alasan + bug yang pernah terjadi
- `TODO.md`: placeholder yang harus diisi dan ide lanjutan
- `TESTING.md`: cara uji dan acceptance criteria
- `HANDOFF-PROMPT.md`: prompt siap tempel untuk chat baru
