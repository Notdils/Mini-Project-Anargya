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

const HAT = `<svg viewBox="0 0 200 140" aria-hidden="true"><path d="M60 40Q100 20 140 40L150 92H50Z" fill="#1e2a26"/><ellipse cx="100" cy="98" rx="86" ry="20" fill="#1e2a26"/><path d="M52 80H148L150 92H50Z" fill="#29d970"/></svg>`;
const TOTE = `<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M70 70C70 20 130 20 130 70" stroke="#c9a56a" stroke-width="8" fill="none"/><rect x="40" y="66" width="120" height="120" rx="6" fill="#1e2a26"/><rect x="40" y="150" width="120" height="10" fill="#29d970"/></svg>`;

export const PRODUCTS: Product[] = [
  { id: "tee-sand", name: { en: "Bali Edition tee, sand", id: "Kaos Bali Edition, pasir" }, meta: { en: "Combed cotton 24s", id: "Katun combed 24s" }, price: 135000, place: "rail", img: "/img/white-shirt.webp", sizes: ["S", "M", "L", "XL"] },
  { id: "tee-night", name: { en: "Bali Edition tee, night", id: "Kaos Bali Edition, malam" }, meta: { en: "Combed cotton 24s", id: "Katun combed 24s" }, price: 135000, place: "rail", img: "/img/black-shirt.webp", sizes: ["S", "M", "L", "XL"] },
  { id: "bucket-hat", name: { en: "Bucket hat", id: "Topi bucket" }, meta: { en: "Canvas, embroidered mark · one size", id: "Kanvas, logo bordir · satu ukuran" }, price: 85000, place: "rail", illus: HAT },
  { id: "tote", name: { en: "Tote bag", id: "Tas tote" }, meta: { en: "12 oz canvas · 38 × 42 cm", id: "Kanvas 12 oz · 38 × 42 cm" }, price: 65000, place: "shelf", illus: TOTE },
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
