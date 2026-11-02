# ANARGYA-PROJECTS: semua project di satu chat

File ini sama persis di ketiga folder project, dan menjadi peta semua pekerjaan dari chat Claude "Anargya special task web development" (9 Okt – 2 Nov 2026). Untuk detail tiap project, baca `CONTEXT.md` di folder masing-masing.

## Peta project

| # | Project | Waktu | Folder / repo | Status |
|---|---|---|---|---|
| 1 | **Special Task WebDev Anargya 9th Gen**: company profile + toko merch + admin (LOW + MED) | 9–10 Okt | `C:\Users\yahdi\Anargya-Special-Task` · GitHub `Notdils/Anargya-Special-Task` | Selesai, dikumpulkan |
| 2 | **Persiapan interview** WebDev Anargya (simulasi + pembahasan pertanyaan nyata) | 17–22 Okt | Tidak ada kode. Ringkasan di `Anargya-Special-Task/INTERVIEW-PREP.md` | Selesai |
| 3 | **PRD company profile multi-halaman** (rebuild di repo baru) | 26 Okt | Hanya dokumen: `Anargya-Special-Task/PRD-COMPANY-PROFILE.md` | PRD jadi, belum dibangun di chat ini |
| 4 | **Energize Talk 2027**: halaman event + form registrasi + daftar pendaftar di admin | 27–30 Okt | Repo yang sama dengan #1 (route `/energize-talk`). Dikirim ke staff sebagai `Notdils/Anargya-Web-Development` | Selesai, dikumpulkan |
| 5 | **Motion-Anargya** (hackathon videography & motion): landing 3D kart + minigame sirkuit ITS | 31 Okt | `D:\Motion-Anargya` · GitHub `Notdils/3D-Anargya` · deploy Vercel | Selesai (bare minimum + ghost car) |
| 6 | **Mini project GIIAS Bali 2027**: landing pagi→malam + toko `/shop` | 1–2 Nov | `D:\mini-project` | Berjalan. Perubahan setelah commit `05ff97b` belum di-commit |

## Hal yang sama di semua project
- **Pemilik:** Yahdilil Haq Sarifuddin (GitHub `Notdils`), mahasiswa ITS, calon staff Web Development Anargya EV ITS Team.
- **Identitas visual Anargya:** hitam + hijau `#29D970`. Jangan diganti, termasuk di tema pantai.
- **Figma:** satu file untuk semuanya: `https://www.figma.com/design/dAypXrqoA5G3zaGGk71ldJ`. Isinya:
  - Special Task: Home, /merch, /purchase, /admin-dashboard, detail order. Breakpoint 1280 / 800 / 375.
  - Section `/energize-talk`, "Register Form States", dan "Home — Hero Carousel (Slides)".
  - Halaman inspo GIIAS Bali (D/E/F/G, node `97:24`).
- **Bahasa:** balas dalam Bahasa Indonesia. README juga ditulis dalam Bahasa Indonesia.
- **Device:** laptop Windows "ini-gwe". Folder yang terhubung ke chat: tiga folder di tabel di atas.

## Preferensi kerja user (berlaku untuk semua)
1. **Tanya dulu, lalu kerjakan.** Untuk pekerjaan besar, susun probing/todo dulu dan biarkan user mengoreksi. "Gausah inisiatif buat dulu" berarti jangan mulai coding sebelum diminta.
2. **Figma dulu, baru kode**, kalau ada UI baru. UI, web, README, dan video harus konsisten (aturan reviewer Anargya).
3. **Surgical.** Kalau user bilang "JANGAN MODIFIKASI" atau "harus sama persis", jangan ubah sedikit pun, lalu buktikan (misalnya dengan perbandingan frame-by-frame).
4. **Hindari "AI slop":** glow, blob blur, glassmorphism, pill dengan titik "live", ikon dalam kotak, angka dekoratif 01/02/03, emoji, tombol bercahaya, badge NEW, copy generik. Standar bisnis.
5. **UX nyata lebih penting dari efek.** Contoh: wajah pembicara jangan dipecah jadi kepingan, layout jangan bergeser saat konten berganti, foto besar disembunyikan di mobile supaya info utama langsung terlihat.
6. **Jangan mengarang fakta** (harga, jam, booth, gelar, tahun). Tandai sebagai placeholder dan tanya user.
7. **Skill yang sering dipanggil:** `/coding-discipline` (lama) atau `/general-discipline`, `/design:design-critique`, `/motion-parallax`, `/motion-cursor-cta`. Connector Unslop pernah dipakai untuk audit desain.
8. **Git dipegang user.** Claude tidak commit atau push. Claude cukup memberi perintah git yang disarankan.
9. **Sinkron file:** sebelum menimpa file di laptop, cek md5-nya dulu supaya editan user tidak tertimpa. VS Code pernah menimpa README dengan isi lama, jadi ingatkan user untuk menutup tab sebelum file diganti.
10. **Verifikasi:** typecheck dan build, screenshot di beberapa breakpoint, dan tes interaksi di browser headless.

## Batasan keamanan (wajib)
- **Jangan menulis atau meng-commit** Supabase `secret_key` dan password database. Keduanya pernah dikirim user di chat. Disarankan di-rotate di dashboard Supabase.
- Publishable key Supabase memang sengaja ada di `.env` repo Special Task (aman karena RLS). Tetapi key itu **bisa dipakai untuk spam**, karena belum ada rate limit.
- Email user hanya dipakai untuk identifikasi.
- **Izin hapus file ditolak** untuk `D:\Motion-Anargya`. Jangan minta lagi. Menghapus file di `D:\mini-project` juga tidak diizinkan. Kalau perlu, pindahkan file ke `_to_delete/`.
- Lingkungan cloud Claude **tidak bisa menjangkau `supabase.co`** dan `figma.com` (proxy). SQL dijalankan user sendiri di Supabase SQL Editor.
- Tidak membuat DDoS atau load-test ke server mana pun (pernah ditanyakan, ditolak).
