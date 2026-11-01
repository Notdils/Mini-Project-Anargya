import "./base.css";
import "./shop.css";
import { PRODUCTS, FUND, ORDER_WHATSAPP, rupiah, type Product } from "./products";
import { t, lang, onLang } from "./i18n";

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

// ---------- atap jerami ----------
{
  let s = `<path d="M20 130L120 18H1160L1260 130Z" fill="#b98e55"/>`;
  for (let x = 130; x <= 1150; x += 13) s += `<line x1="${x}" y1="26" x2="${(x + (x - 640) * 0.1).toFixed(1)}" y2="128" stroke="#9c7442" stroke-width="2" opacity=".55"/>`;
  let fringe = "M20 124 ";
  for (let x = 20, i = 0; x <= 1260; x += 20, i++) fringe += `L${x} ${i % 2 ? 150 : 132} `;
  s += `<path d="${fringe}L1260 124Z" fill="#a87e48"/>`;
  document.querySelector(".shack__roof")!.innerHTML = s;
}

// ---------- tas belanja (disimpan di browser) ----------
type Line = { id: string; size?: string; qty: number };
const KEY = "anargya-bag";
let bag: Line[] = [];
try {
  bag = JSON.parse(localStorage.getItem(KEY) || "[]");
  if (!Array.isArray(bag)) bag = [];
} catch {
  bag = [];
}
const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(bag));
  } catch {
    /* penyimpanan diblokir: tas tetap jalan selama halaman terbuka */
  }
};
const byId = (id: string) => PRODUCTS.find((p) => p.id === id);
bag = bag.filter((l) => byId(l.id) && l.qty > 0);

function add(id: string, size?: string) {
  const line = bag.find((l) => l.id === id && l.size === size);
  if (line) line.qty++;
  else bag.push({ id, size, qty: 1 });
  save();
  renderBag();
}
function change(i: number, d: number) {
  bag[i].qty += d;
  if (bag[i].qty <= 0) bag.splice(i, 1);
  save();
  renderBag();
}

// ---------- produk ----------
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&${({ "&": "amp", "<": "lt", ">": "gt", '"': "quot" } as Record<string, string>)[c]};`);

const nameOf = (p: Product) => p.name[lang];

// teks produk diisi oleh localize() di bawah, supaya ganti bahasa tidak membuang pilihan ukuran
function card(p: Product) {
  const media = p.img
    ? `<img src="${p.img}" alt="" loading="lazy" />`
    : `<div class="card__illus" role="img">${p.illus}</div>`;
  const sizes = p.sizes
    ? `<fieldset class="sizes"><legend class="sr-only"></legend>${p.sizes
        .map((s) => `<label><input type="radio" name="size-${p.id}" value="${s}" /><span>${s}</span></label>`)
        .join("")}</fieldset>`
    : "";
  return `<li class="product" data-id="${p.id}">
    ${p.place === "rail" ? `<svg class="hanger" viewBox="0 0 200 56" aria-hidden="true"><path d="M100 30C100 22 92 18 92 10C92 3 108 3 108 10" /><path d="M100 30L12 52H188Z" /></svg>` : ""}
    ${p.place === "hooks" ? `<span class="nail" aria-hidden="true"></span>` : ""}
    <div class="card${p.cutout ? " card--cutout" : ""}"${p.ring ? ` style="--ring:${p.ring}%"` : ""}>${media}</div>
    <div class="tag">
      <h3 class="tag__name"></h3>
      <p class="tag__meta"></p>
      ${sizes}
      <div class="tag__row">
        <span class="tag__price">${rupiah(p.price)}</span>
        <button class="tag__add" type="button"></button>
      </div>
      <p class="tag__msg" role="status"></p>
    </div>
  </li>`;
}
$("rail").innerHTML = PRODUCTS.filter((p) => p.place === "rail").map(card).join("");
$("hooks").innerHTML = PRODUCTS.filter((p) => p.place === "hooks").map(card).join("");
$("shelf").innerHTML = PRODUCTS.filter((p) => p.place === "shelf").map(card).join("");

document.querySelectorAll<HTMLLIElement>(".product").forEach((li, i) => {
  const p = byId(li.dataset.id!)!;
  // tiap barang berayun dengan tempo sendiri
  li.style.setProperty("--dur", `${(2.6 + ((i * 37) % 9) / 10).toFixed(1)}s`);
  li.style.setProperty("--delay", `${(-((i * 53) % 17) / 10).toFixed(1)}s`);
  // disenggol saat kursor masuk ke foto
  li.querySelector(".card")!.addEventListener("pointerenter", () => {
    if (li.classList.contains("is-nudged")) return;
    li.classList.add("is-nudged");
    setTimeout(() => li.classList.remove("is-nudged"), 1800);
  });
  const msg = li.querySelector<HTMLElement>(".tag__msg")!;
  li.querySelector(".tag__add")!.addEventListener("click", () => {
    let size: string | undefined;
    if (p.sizes) {
      size = li.querySelector<HTMLInputElement>("input:checked")?.value;
      if (!size) {
        msg.textContent = t("shop.pickSize");
        li.querySelector<HTMLInputElement>(".sizes input")!.focus();
        return;
      }
    }
    add(p.id, size);
  });
  li.querySelectorAll(".sizes input").forEach((r) => r.addEventListener("change", () => updateMsg(li)));
});

function updateMsg(li: HTMLElement) {
  const n = bag.filter((l) => l.id === li.dataset.id).reduce((s, l) => s + l.qty, 0);
  li.querySelector(".tag__msg")!.textContent = n ? t("shop.inBag", { n }) : "";
}

// ---------- struk ----------
const delivery = () => document.querySelector<HTMLInputElement>('input[name="delivery"]:checked')!.value;

function renderBag() {
  const count = bag.reduce((s, l) => s + l.qty, 0);
  const total = bag.reduce((s, l) => s + byId(l.id)!.price * l.qty, 0);
  $("lines").innerHTML = bag
    .map((l, i) => {
      const p = byId(l.id)!;
      return `<li>
        <div><b>${esc(nameOf(p))}</b><small>${l.size ? t("bag.sizeLine", { s: l.size }) : ""}${rupiah(p.price)}</small></div>
        <div class="qty">
          <button type="button" data-i="${i}" data-d="-1" aria-label="${esc(t("bag.less", { name: nameOf(p) }))}">−</button>
          <span aria-label="${t("bag.qty")}">${l.qty}</span>
          <button type="button" data-i="${i}" data-d="1" aria-label="${esc(t("bag.more", { name: nameOf(p) }))}">+</button>
        </div>
        <span class="line__sum">${rupiah(p.price * l.qty)}</span>
      </li>`;
    })
    .join("");
  $("empty").hidden = count > 0;
  $("total").textContent = rupiah(total);
  $("shipnote").hidden = delivery() !== "ship";
  const btn = $<HTMLButtonElement>("checkout");
  btn.disabled = count === 0 || !ORDER_WHATSAPP;
  $("paynote").textContent = t(ORDER_WHATSAPP ? "bag.pay" : "bag.soon");
  $("nav-bag").textContent = t("bag.nav", { n: count });
  $("bagbar").hidden = count === 0;
  $("bagbar-text").textContent = `${count === 1 ? t("bag.piece") : t("bag.pieces", { n: count })} · ${rupiah(total)}`;
  document.querySelectorAll<HTMLElement>(".product").forEach(updateMsg);
}

$("lines").addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-i]");
  if (b) change(Number(b.dataset.i), Number(b.dataset.d));
});
document.querySelectorAll('input[name="delivery"]').forEach((r) => r.addEventListener("change", renderBag));

// checkout: kirim ringkasan pesanan ke WhatsApp tim
$("checkout").addEventListener("click", () => {
  if (!ORDER_WHATSAPP || !bag.length) return;
  const lines = bag.map((l) => {
    const p = byId(l.id)!;
    return `- ${nameOf(p)}${l.size ? ` (${l.size})` : ""} x${l.qty}: ${rupiah(p.price * l.qty)}`;
  });
  const total = bag.reduce((s, l) => s + byId(l.id)!.price * l.qty, 0);
  const text = [
    t("wa.hello"),
    ...lines,
    `${t("wa.total")}: ${rupiah(total)}`,
    t(delivery() === "ship" ? "wa.ship" : "wa.pickup"),
  ].join("\n");
  window.open(`https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

// ---------- target dana ----------
const jt = (n: number) => `Rp ${(n / 1e6).toLocaleString("id-ID")} jt`;
$("fund-bar").style.width = `${Math.min(100, (FUND.raised / FUND.goal) * 100)}%`;

// ---------- bahasa ----------
function localize() {
  document.querySelectorAll<HTMLLIElement>(".product").forEach((li) => {
    const p = byId(li.dataset.id!)!;
    li.querySelector(".tag__name")!.textContent = nameOf(p);
    li.querySelector(".tag__meta")!.textContent = p.meta[lang];
    li.querySelector(".tag__add")!.textContent = t("shop.add");
    const legend = li.querySelector("legend");
    if (legend) legend.textContent = t("shop.size");
    li.querySelector("img")?.setAttribute("alt", nameOf(p));
    li.querySelector(".card__illus")?.setAttribute("aria-label", nameOf(p));
    li.querySelector(".tag__msg")!.textContent = "";
  });
  $("fund").textContent = t("chalk.fundLine", { raised: jt(FUND.raised), goal: jt(FUND.goal), n: FUND.supporters });
  renderBag();
}
onLang(localize);
