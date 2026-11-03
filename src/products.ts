// Data toko. Ganti di sini: produk, harga, target dana, nomor WhatsApp checkout.

type Text = { en: string; id: string };

export type Product = {
  id: string;
  name: Text;
  meta: Text;
  price: number;
  place: "rail" | "hooks" | "shelf"; // digantung di rel (pakaian), di kait (gantungan kunci), atau berdiri di rak
  img?: string;
  cutout?: boolean; // gambar berlatar transparan: tampil tanpa bingkai
  ring?: number; // posisi ring gantungan kunci, % dari kiri gambar (supaya pas di kait)
  illus?: string; // ilustrasi sementara sampai ada foto asli
  sizes?: string[];
};

export const PRODUCTS: Product[] = [
  { id: "tee-sand", name: { en: "Speed Maniac shirt, white", id: "Kemeja Speed Maniac, putih" }, meta: { en: "Short sleeve · two chest patches", id: "Lengan pendek · dua patch dada" }, price: 135000, place: "rail", img: "/img/shirt-back.webp", cutout: true, sizes: ["S", "M", "L", "XL"] },
  { id: "shirt-night", name: { en: "Speed Maniac shirt, black", id: "Kemeja Speed Maniac, hitam" }, meta: { en: "Short sleeve · two chest patches", id: "Lengan pendek · dua patch dada" }, price: 135000, place: "rail", img: "/img/shirt-back-night.webp", cutout: true, sizes: ["S", "M", "L", "XL"] },
  { id: "cap-racing-club", name: { en: "Racing Club cap", id: "Topi Racing Club" }, meta: { en: "Black cap", id: "Topi hitam" }, price: 85000, place: "rail", img: "/img/cap-racing-club.webp", cutout: true },
  { id: "patch-energized", name: { en: "Patch, Always Energized", id: "Patch, Always Energized" }, meta: { en: "Chest patch, E21 car", id: "Patch dada, mobil E21" }, price: 85000, place: "shelf", img: "/img/patch-energized.webp", cutout: true },
  { id: "tumbler", name: { en: "Tumbler", id: "Tumbler" }, meta: { en: "Stainless steel · 500 ml", id: "Baja tahan karat · 500 ml" }, price: 45000, place: "shelf", img: "/img/tumbler.webp" },
  { id: "sticker-pack", name: { en: "Sticker pack", id: "Paket stiker" }, meta: { en: "One sheet, 6 stickers", id: "Satu lembar, 6 stiker" }, price: 10000, place: "shelf", img: "/img/sticker-sheet.webp", cutout: true },
  { id: "keychain-chibi", name: { en: "Keychain, Bali chibi", id: "Gantungan kunci, chibi Bali" }, meta: { en: "Acrylic", id: "Akrilik" }, price: 15000, place: "hooks", img: "/img/keychain-chibi.webp", cutout: true, ring: 50.3 },
  { id: "keychain-e21", name: { en: "Keychain, E21 car", id: "Gantungan kunci, mobil E21" }, meta: { en: "Acrylic", id: "Akrilik" }, price: 15000, place: "hooks", img: "/img/keychain-e21.webp", cutout: true, ring: 64.6 },
  { id: "keychain-energized", name: { en: "Keychain, Always Energized", id: "Gantungan kunci, Always Energized" }, meta: { en: "Acrylic", id: "Akrilik" }, price: 15000, place: "hooks", img: "/img/keychain-energized.webp", cutout: true, ring: 52.3 },
];

// Data contoh: ganti dengan angka asli
export const FUND = { raised: 18_400_000, goal: 50_000_000, supporters: 312 };

// Nomor WhatsApp penerima pesanan, format internasional tanpa "+", contoh "6281234567890".
// Kosong = tombol checkout nonaktif.
export const ORDER_WHATSAPP = "";

export const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");
