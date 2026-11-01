// Teks dua bahasa (EN/ID). Elemen HTML ditandai data-t="kunci" (isi teks),
// data-t-alt / data-t-aria-label (atribut). Ubah teks di sini, bukan di HTML.

export type Lang = "en" | "id";

const NB = " "; // spasi tak terputus untuk label bernomor "01  ..."

const DICT = {
  // ---------- umum ----------
  "nav.about": { en: "About", id: "Tentang" },
  "nav.giias": { en: "GIIAS Bali", id: "GIIAS Bali" },
  "nav.shop": { en: "Shop", id: "Toko" },
  "nav.lang": { en: "Language", id: "Bahasa" },
  "cta.shop": { en: "Open the shop", id: "Buka toko" },

  // ---------- landing ----------
  "home.title": { en: "Anargya at GIIAS Bali 2027", id: "Anargya di GIIAS Bali 2027" },
  "home.desc": {
    en: "Anargya ITS EV Team at GIIAS Bali 2027, 27–31 January at The Meru Sanur. Visit our booth or back the 2027 season through the Bali Edition shop.",
    id: "Anargya ITS EV Team di GIIAS Bali 2027, 27–31 Januari di The Meru Sanur. Kunjungi booth kami atau dukung musim 2027 lewat toko Bali Edition.",
  },
  "hero.aria": { en: "Anargya at GIIAS Bali 2027", id: "Anargya di GIIAS Bali 2027" },
  "hero.badge": { en: "Exhibiting at", id: "Hadir di" },
  "hero.badgeAlt": { en: "GIIAS Bali, 27–31 January 2027, The Meru Sanur", id: "GIIAS Bali, 27–31 Januari 2027, The Meru Sanur" },
  "hero.0.eyebrow": { en: "Morning · Anargya ITS EV Team", id: "Pagi · Anargya ITS EV Team" },
  "hero.0.title": { en: "Paddock to shore", id: "Dari paddock ke pantai" },
  "hero.0.body": {
    en: "GIIAS comes to Bali for the first time, and Anargya ITS EV Team comes with it. Find our booth in Sanur, or back the 2027 season from here.",
    id: "GIIAS hadir di Bali untuk pertama kalinya, dan Anargya ITS EV Team ikut hadir. Temui kami di booth di Sanur, atau dukung musim 2027 dari sini.",
  },
  "hero.1.eyebrow": { en: "Midday · on the show floor", id: "Siang · di area pameran" },
  "hero.1.title": { en: "Come see it up close", id: "Lihat dari dekat" },
  "hero.1.body": {
    en: "Five days at The Meru Sanur. See our electric car and talk to the students who designed and built it.",
    id: "Lima hari di The Meru Sanur. Lihat mobil listrik kami dan ngobrol dengan mahasiswa yang merancang dan membangunnya.",
  },
  "hero.2.eyebrow": { en: "Night · after the show", id: "Malam · setelah pameran" },
  "hero.2.title": { en: "Back the 2027 season", id: "Dukung musim 2027" },
  "hero.2.body": {
    en: "Every Bali Edition piece helps fund our 2027 season: battery cells, tyres and travel.",
    id: "Setiap barang Bali Edition membantu mendanai musim 2027 kami: sel baterai, ban, dan perjalanan.",
  },
  "journey.aria": { en: "Time of day", id: "Waktu" },
  "journey.0": { en: "Morning", id: "Pagi" },
  "journey.1": { en: "Midday", id: "Siang" },
  "journey.2": { en: "Night", id: "Malam" },
  "journey.3": { en: "Bali Edition", id: "Bali Edition" },

  "about.label": { en: `01${NB}${NB}About Anargya`, id: `01${NB}${NB}Tentang Anargya` },
  "about.title": {
    en: "Students from ITS Surabaya who design, build and race electric cars",
    id: "Mahasiswa ITS Surabaya yang merancang, membangun, dan membalap mobil listrik",
  },
  "about.body": {
    en: "The team handles every part of the car itself: frame, battery pack, motor controller and the code that runs on it. Engineering, design and business students share one workshop on campus.",
    id: "Tim mengerjakan sendiri setiap bagian mobil: rangka, battery pack, motor controller, dan kode yang menjalankannya. Mahasiswa teknik, desain, dan bisnis berbagi satu bengkel di kampus.",
  },
  "about.raced": { en: "Competitions", id: "Kompetisi" },
  "about.photo": {
    en: "An Anargya driver in the team's electric kart on the ITS circuit",
    id: "Pembalap Anargya di kart listrik tim, di sirkuit ITS",
  },

  "giias.label": { en: `02${NB}${NB}GIIAS Bali 2027`, id: `02${NB}${NB}GIIAS Bali 2027` },
  "giias.title": { en: "GIIAS comes to Bali for the first time", id: "GIIAS hadir di Bali untuk pertama kalinya" },
  "giias.body": {
    en: "GAIKINDO adds Bali to GIIAS The Series in 2027. Car makers bring their latest models to Sanur, and we bring what a student team can build for electric mobility.",
    id: "GAIKINDO menambahkan Bali ke GIIAS The Series pada 2027. Produsen mobil membawa model terbarunya ke Sanur, dan kami membawa apa yang bisa dibangun tim mahasiswa untuk mobilitas listrik.",
  },
  "giias.dates": { en: "Dates", id: "Tanggal" },
  "giias.datesV": { en: "27–31 January 2027", id: "27–31 Januari 2027" },
  "giias.hours": { en: "Hours", id: "Jam buka" },
  "giias.hoursV": { en: "To be announced", id: "Diumumkan menyusul" },
  "giias.venue": { en: "Venue", id: "Lokasi" },
  "giias.venueV": { en: "The Meru Sanur, Denpasar", id: "The Meru Sanur, Denpasar" },
  "giias.booth": { en: "Booth", id: "Booth" },
  "giias.boothV": { en: "Number to be announced", id: "Nomor menyusul" },
  "giias.directions": { en: "Get directions", id: "Petunjuk arah" },

  "link.label": { en: `03${NB}${NB}Bali Edition`, id: `03${NB}${NB}Bali Edition` },
  "link.title": { en: "Nine pieces that fund the 2027 season", id: "Sembilan barang yang mendanai musim 2027" },

  // ---------- toko ----------
  "shop.title": { en: "Bali Edition shop · Anargya", id: "Toko Bali Edition · Anargya" },
  "shop.desc": {
    en: "Bali Edition tees, hats and accessories from Anargya ITS EV Team at GIIAS Bali 2027. Every sale helps fund the 2027 season.",
    id: "Kaos, topi, dan aksesori Bali Edition dari Anargya ITS EV Team di GIIAS Bali 2027. Setiap pembelian membantu mendanai musim 2027.",
  },
  "shop.sub1": { en: "Bali Edition stall · GIIAS Bali 2027", id: "Lapak Bali Edition · GIIAS Bali 2027" },
  "shop.sub2": { en: "Every sale helps fund the 2027 season", id: "Setiap pembelian membantu mendanai musim 2027" },
  "shop.rail": { en: "On the rail · Apparel", id: "Di gantungan · Pakaian" },
  "shop.hooks": { en: "On the hooks · Keychains", id: "Di kait · Gantungan kunci" },
  "shop.shelf": { en: "On the shelf · Accessories", id: "Di rak · Aksesori" },
  "shop.size": { en: "Size", id: "Ukuran" },
  "shop.add": { en: "Add", id: "Tambah" },
  "shop.pickSize": { en: "Pick a size first", id: "Pilih ukuran dulu" },
  "shop.inBag": { en: "In your bag · {n}", id: "Di tas · {n}" },
  "chalk.title": { en: "How to buy", id: "Cara beli" },
  "chalk.1": { en: "Pick a size, add it to your bag", id: "Pilih ukuran, masukkan ke tas" },
  "chalk.2": { en: "Pay by QRIS or bank transfer", id: "Bayar lewat QRIS atau transfer bank" },
  "chalk.3": {
    en: "Collect at our booth, 27–31 January at The Meru Sanur, or ship within Indonesia, 2–5 days",
    id: "Ambil di booth kami, 27–31 Januari di The Meru Sanur, atau kirim ke seluruh Indonesia, 2–5 hari",
  },
  "chalk.fund": { en: "Season fund", id: "Dana musim 2027" },
  "chalk.fundLine": { en: "{raised} of {goal} · {n} supporters", id: "{raised} dari {goal} · {n} pendukung" },
  "chalk.note": { en: "Battery cells, tyres and travel for the 2027 season.", id: "Sel baterai, ban, dan perjalanan untuk musim 2027." },
  "bag.title": { en: "Your bag", id: "Tas belanja" },
  "bag.empty": { en: "Your bag is empty. Pick something off the rail.", id: "Tas masih kosong. Ambil sesuatu dari gantungan." },
  "bag.delivery": { en: "Delivery", id: "Pengiriman" },
  "bag.pickup": { en: "Pick up at our booth", id: "Ambil di booth kami" },
  "bag.pickupNote": { en: "Free · 27–31 Jan, The Meru Sanur", id: "Gratis · 27–31 Jan, The Meru Sanur" },
  "bag.ship": { en: "Ship within Indonesia", id: "Kirim ke seluruh Indonesia" },
  "bag.shipNote": { en: "From Rp 18.000 · 2–5 days, confirmed on WhatsApp", id: "Mulai Rp 18.000 · 2–5 hari, dikonfirmasi lewat WhatsApp" },
  "bag.total": { en: "Total", id: "Total" },
  "bag.plusShip": { en: "Plus shipping, confirmed on WhatsApp", id: "Belum termasuk ongkir, dikonfirmasi lewat WhatsApp" },
  "bag.checkout": { en: "Checkout", id: "Checkout" },
  "bag.pay": { en: "Pay by QRIS or bank transfer", id: "Bayar lewat QRIS atau transfer bank" },
  "bag.soon": { en: "Online checkout opens before the show", id: "Checkout online dibuka sebelum pameran" },
  "bag.sizeLine": { en: "Size {s} · ", id: "Ukuran {s} · " },
  "bag.less": { en: "One less {name}", id: "Kurangi {name}" },
  "bag.more": { en: "One more {name}", id: "Tambah {name}" },
  "bag.qty": { en: "Quantity", id: "Jumlah" },
  "bag.nav": { en: "Bag · {n}", id: "Tas · {n}" },
  "bag.pieces": { en: "{n} pieces", id: "{n} barang" },
  "bag.piece": { en: "1 piece", id: "1 barang" },
  "bag.view": { en: "View bag", id: "Lihat tas" },
  "wa.hello": { en: "Hi Anargya, I'd like to order from the Bali Edition shop:", id: "Halo Anargya, saya mau pesan dari toko Bali Edition:" },
  "wa.total": { en: "Total", id: "Total" },
  "wa.ship": { en: "Delivery: ship within Indonesia (please confirm shipping cost)", id: "Pengiriman: kirim ke dalam Indonesia (mohon konfirmasi ongkir)" },
  "wa.pickup": { en: "Delivery: pick up at your booth at GIIAS Bali 2027", id: "Pengiriman: ambil di booth Anargya di GIIAS Bali 2027" },
} satisfies Record<string, Record<Lang, string>>;

export type Key = keyof typeof DICT;
const KEY = "anargya-lang";

function initial(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "id") return saved;
  } catch {
    /* penyimpanan diblokir */
  }
  return navigator.language.toLowerCase().startsWith("id") ? "id" : "en";
}

export let lang: Lang = initial();

/** Teks untuk kunci, dengan {placeholder} diganti dari vars. */
export function t(key: Key, vars: Record<string, string | number> = {}) {
  return DICT[key][lang].replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

const listeners: (() => void)[] = [];
/** Jalankan fn sekarang dan setiap kali bahasa berganti. */
export function onLang(fn: () => void) {
  listeners.push(fn);
  fn();
}

function apply() {
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t as Key)));
  document.querySelectorAll<HTMLElement>("[data-t-alt]").forEach((el) => el.setAttribute("alt", t(el.dataset.tAlt as Key)));
  document.querySelectorAll<HTMLElement>("[data-t-aria-label]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.tAriaLabel as Key)));
  const title = document.documentElement.dataset.tTitle as Key | undefined;
  if (title) document.title = t(title);
  const desc = document.documentElement.dataset.tDesc as Key | undefined;
  if (desc) document.querySelector('meta[name="description"]')?.setAttribute("content", t(desc));
  document.querySelectorAll<HTMLButtonElement>(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
}

export function setLang(next: Lang) {
  lang = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* penyimpanan diblokir */
  }
  apply();
  listeners.forEach((fn) => fn());
}

// tombol EN | ID di navbar
document.querySelectorAll<HTMLButtonElement>(".lang button").forEach((b) =>
  b.addEventListener("click", () => setLang(b.dataset.lang as Lang)),
);
apply();
