# DECISIONS & riwayat

Format: keputusan → alasan. Bagian bawah: bug yang pernah terjadi dan perbaikannya (supaya tidak terulang).

## Keputusan produk & desain
0. **Awal mini project (1 Nov, dini hari):**
   - **Palet:** jangan ganti hijau Anargya dengan tosca. Usulan "Bali After Sunset": laut malam `#06171A`, hijau `#29D970`, coral `#FF7A59`, pasir `#F3E6CF`, tosca `#2EC4B6` dengan proporsi 60/30/10. Versi terang: pasir `#F4EBDD`, teks `#0B1F1A`, hijau gelap `#0E8A4A` untuk teks.
   - **Requirement awal:** satu halaman tentang Anargya & GIIAS + bagian e-commerce promosi fundraising, standar bisnis, tanpa AI slop. Rencana repo baru, sementara di `D:\mini-project`.
   - **Inspo Figma:**
     - A/B/C (desktop).
     - Lalu, dengan referensi user, efek **ripple + parallax** dan audit **connector Unslop**, dibuat D/E/F.
     - Hasil audit: tanpa eyebrow/gradien/dekorasi kosong/badge NEW/pil berlebihan/placeholder `[X]`, kartu produk bervariasi, copy memakai kata benda Anargya. Judul tetap Inter Black. Parallax/ripple hanya di hero.
     - Claude merekomendasikan D.
   - Data contoh di inspo (17–21 Mei 2027, Nusa Dua, booth B-12) **bukan fakta**. Kemudian diganti dengan info resmi (27–31 Jan 2027, The Meru Sanur, booth TBA).
1. **Toko dipisah ke `/shop/`.** Diminta user: toko harus murni untuk produk fundraising, tidak digabung dengan hero.
2. **Hero F + section D + toko G.** Dipilih user dari eksplorasi Figma (inspo D/E/F/G).
3. **Hero di-pin dengan cerita pagi → siang → malam.** Transisi dari warna terang ke hitam membuat hero menyambung mulus ke section gelap. Teks berganti per fase.
4. **Arah matahari:** terbit di kanan, siang di tengah, tenggelam di kiri, lalu bulan terbit dari kanan. Ini koreksi dari user.
5. **Transisi diperlama:** 500vh dengan jeda diam (`HOLD`) di tiap fase, plus smoothing, supaya scroll cepat tidak melompati fase.
6. **Kart bergerak dari kanan ke kiri.** Permintaan user.
7. **Tombol navbar:** ikon keranjang + "Shop", menggantikan "Open the shop".
8. **Merch di toko bergoyang:** barang gantung berayun. Untuk barang di rak, hanya label harganya yang berayun.
9. **Konten GIIAS 2027:**
   - Bilingual.
   - Booth sudah pasti, nomor dan jam masih TBA.
   - Kendaraan yang dibawa belum diputuskan, jadi copy tidak menyebut model mobil.
   - Pengiriman: ambil di booth + kirim.
10. **Logo GIIAS hanya versi hitam**, sehingga hanya tampil saat pagi dan siang (background terang). Keputusan user.
11. **Aset transparan:** user memberi izin menghapus background bila belum benar-benar transparan. Alpha dicek secara program, bukan dari preview.
12. **"Ride the Infinity" (skill /motion-parallax)** ditempatkan sebelum CTA toko, memakai aset gantungan kunci dari tim desain. Line-art dan 2 hiasan memakai lambang Anargya algoritmik.
    - Garis tipis berbentuk rak/garasi dihapus karena terbaca seperti "bookshelf" (feedback user).
    - Objek tidak boleh terlihat sebelum scroll, jadi dipasang intro fade.
13. **Komposisi animasi parallax tetap versi `05ff97b`** (tersebar dan miring). User lebih suka yang acak saat animasi berjalan. Hanya **mode reduced motion** yang disusun rapi lewat `data-static`. Keduanya sudah diverifikasi identik frame-by-frame dengan versi lama.
14. **CTA toko di landing** diganti grid 4 merch dengan kursor CTA (skill /motion-cursor-cta), plus tombol "Visit the shop".
    - Copy lama "Nine pieces that fund the 2027 season" ditolak user.
    - Copy baru: "Bali Edition merch" / "Every piece funds the 2027 car."
15. **Reduced motion tidak mematikan cerita hero.** Banyak device Windows melaporkan reduced motion tanpa disadari pemiliknya (Animation effects mati atau mode performa). Ini penyebab laporan "animasi tidak jalan di device lain".
16. **Tanpa backend.** Checkout lewat WhatsApp dan pembayaran via QRIS/transfer. Tas disimpan di localStorage.

## Bug yang pernah terjadi (jangan ulangi)
| Gejala | Penyebab | Perbaikan |
|---|---|---|
| Animasi hero "tidak keload" di device lain | Kode lama mematikan hero saat `prefers-reduced-motion` | Cerita tetap jalan, hanya efek tambahan yang dimatikan |
| Matahari lewat di belakang teks hero | `.phase` ter-stretch oleh grid sehingga teks turun | `align-content: start`, clamp per baris, judul berbasis vh, `clearOfText` |
| Toko overflow di 768px | Layout rel terlalu lebar | Pindah ke layout daftar di ≤900px; wrap di 360px |
| Objek mobile tetap dihitung | `offsetParent` undefined di `<svg>` | Pakai `getComputedStyle().display` saat resize |
| Layar kosong di p 0.9–0.95 | Gelombang 3 terlalu dekat | z ≥ 0.95·travel + nearFade |
| Objek parallax terlihat sebelum scroll | Gelombang 1 sudah di dalam kabut saat p=0 | Intro fade smoothstep(p/0.12) |
| Tes "reversible" gagal palsu | Smoothing belum selesai | Tunggu ±3 detik sebelum membandingkan |
| Overflow teks kartu D/E/F di Figma | Text box fixed height | Text fill `HEIGHT` |
| md5 gambar beda setelah transfer ke laptop | Re-encode saat transfer | Cek dimensi dan alpha, bukan md5, untuk gambar |
| Performa headless naik-turun | Tidak ada GPU | Bedakan long task JS dari frame lambat, konfirmasi di perangkat asli |
| Screenshot Figma tidak bisa diunduh | Diblokir | Audit geometri lewat metadata |
