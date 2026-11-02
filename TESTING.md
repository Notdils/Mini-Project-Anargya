# TESTING

Belum ada test suite di repo. Verifikasi selama pengembangan dilakukan dengan skrip Playwright (Chromium headless) terhadap `npm run build && npm run preview` (port 4173).

## Cek wajib setiap perubahan
1. `npx tsc --noEmit` dan `npm run build` tanpa error.
2. Tidak ada error di console di `/` dan `/shop/`.
3. Tidak ada scroll horizontal di 375px dan 360px.
4. Screenshot di 1440×900, 1280×720, 1366×768, 768, 390×844, dalam mode normal **dan** `reducedMotion: 'reduce'`.
5. Ganti bahasa EN ↔ ID: semua teks, `<title>`, alt, aria, dan label kursor ikut berganti.

## Hero
- Pada p = 0 / 0.5 / 1, fase 0 / 1 / 2 aktif. Matahari ada di kanan / tengah / terbenam di kiri. Bulan terlihat saat malam.
- Matahari dan bulan tidak menimpa teks fase aktif, di semua viewport di atas.
- Badge GIIAS terlihat di fase 0–1 dan tersembunyi di fase 2.
- Saat reduced motion, scroll tetap mengganti fase. Parallax layer = 0 dan riak mati.
- Tanpa JS, hero setinggi 100vh.

## "Ride the Infinity" (acceptance skill /motion-parallax)
0. Opacity 0 sebelum scroll (p = 0) dan penuh di p 0.12.
1. Scale tiap objek terus bertambah dan bergerak radial keluar dari pusat.
2. Reversibel: scroll maju lalu mundur menghasilkan state sama (tunggu ±3 s).
3. z-index berurutan menurut scale. Headline z 1000 dengan `difference`, stage `isolate` tanpa background.
4. Rotasi = `data-tilt` di setiap p.
6. Pada p 0.40–0.65, maksimal 1 kata tertutup objek.
7. Mouse: pergeseran = −n·mouse·W/2·s (toleransi 1px). Headline 0px, tilt tidak berubah.
8. Lag mouse: ±48% jarak dalam 100 ms.
9. Mouse mati di touch dan reduced motion.
10. Tidak ada layar kosong di p 0.05–0.95.
11. Tidak ada long task. Frame time headless naik-turun, jadi konfirmasi di perangkat asli.
12. Reduced motion: section 100vh, 8 objek tersusun rapi (`data-static`), kata headline tampil.
13. Mobile 375: maksimal 6 objek tampil, headline tidak terpotong.
14. Aset scene di bawah 600 KB.
- **Regresi animasi:** bandingkan transform/opacity/z-index/width semua objek di 21 titik p (dengan dan tanpa mouse) terhadap build commit `05ff97b`. Harus identik untuk semua elemen yang terlihat.

## Kursor CTA (acceptance skill /motion-cursor-cta)
1. Di luar zona: clip = lingkaran 12px, pusat tepat di kursor.
2. Masuk zona: `inset(0 round 999px)` dan background hijau dalam ±0.35 s. Di ±120 ms pil terlihat pucat dan setengah terbuka.
3. Di ±250 ms teks sedang bergulir. Di ±700 ms animasi selesai dan teks tunggal.
4. Pindah ke kartu sebelah lewat celah: `is-open` tetap aktif dan teks bergulir lagi.
5. Keluar zona: tertutup setelah 120 ms, kembali ke titik dalam ±0.4 s.
6. Lag: 50 ms setelah lompatan 200px, kursor sudah menempuh 40–60% jarak.
7. Klik di atas pil membuka `/shop/`.
8. Touch: `.cc` disembunyikan dan chip tampil. Fokus Tab: chip tampil. Reduced motion: pil langsung terbuka.
9. Tidak ada error console dan tidak ada scroll horizontal di 375px.

## Toko
- Tambah kaos tanpa memilih ukuran menampilkan pesan dan memindahkan fokus ke pilihan ukuran.
- Tambah/kurang item membuat total benar. Reload halaman tidak menghilangkan isi tas (localStorage).
- Pilih "kirim" memunculkan catatan ongkir.
- `ORDER_WHATSAPP` kosong membuat checkout nonaktif. Kalau diisi, link `wa.me` berisi ringkasan dalam bahasa aktif.
- ≤900px: tampilan daftar dan bar tas muncul saat tas berisi.
