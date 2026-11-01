import "./base.css";
import "./home.css";
import { onLang } from "./i18n";
import "./parallax"; // section "Ride the Infinity" (Z fly-through)

// ---------- palet per waktu (keyframe: pagi p=0, siang p=0.5, malam p=1) ----------
type Palette = Record<string, string>;
const MORNING: Palette = {
  sky0: "#2f6e6a", sky1: "#f3c680", cloud: "#f7d9a4", sun: "#fbe3a8", mtn: "#b9603a", mtn2: "#8e4129",
  seaf: "#2f8e8b", glint: "#fbe3a8", sean: "#24706f", sand: "#eec88b", track: "#d3a86b", palm: "#1e3a31", kart: "#1e3a31",
};
const MIDDAY: Palette = {
  sky0: "#3e8fb0", sky1: "#cde9ee", cloud: "#ffffff", sun: "#fff8e6", mtn: "#8c6a4a", mtn2: "#6e4f36",
  seaf: "#1e9aa0", glint: "#ffffff", sean: "#157d82", sand: "#f4ddb0", track: "#d9bc86", palm: "#1e3a31", kart: "#1e3a31",
};
const NIGHT: Palette = {
  sky0: "#0c1211", sky1: "#1b2e2b", cloud: "#22332f", sun: "#e9e4d6", mtn: "#1c2724", mtn2: "#141d1b",
  seaf: "#102522", glint: "#e9e4d6", sean: "#0d1d1b", sand: "#121a17", track: "#1c2420", palm: "#070b0a", kart: "#29d970",
};
// warna teks per fase (berganti bersama teks, tidak di-scrub, supaya selalu terbaca)
const INK = ["#fff8ec", "#1c1b17", "#f4e9d6"];

const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = hexToRgb(a), B = hexToRgb(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(" ")})`;
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// 0..1 dalam rentang [a, b]
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

const hero = document.getElementById("hero")!;
hero.classList.add("hero--live"); // panjang 500vh hanya kalau script ini benar-benar jalan
const sun = document.getElementById("sun")!;
const moon = document.getElementById("moon")!;
const glint = document.getElementById("glint")!;
const kart = document.getElementById("kart")!;
const stars = hero.querySelector<SVGGElement>(".stars")!;
const layers = [...hero.querySelectorAll<SVGGElement>(".layer")];
const phases = [...hero.querySelectorAll<HTMLElement>(".phase")];
const journey = [...hero.querySelectorAll<HTMLAnchorElement>(".journey a[data-go]")];
const nav = document.getElementById("nav")!;
const badge = document.getElementById("giias-badge")!;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

// bintang: posisi tetap (seed), dibuat sekali
{
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const ns = "http://www.w3.org/2000/svg";
  for (let i = 0; i < 70; i++) {
    const c = document.createElementNS(ns, "circle");
    c.setAttribute("cx", String(Math.round(rnd() * 1280)));
    c.setAttribute("cy", String(Math.round(rnd() * 400)));
    c.setAttribute("r", rnd() < 0.15 ? "1.5" : "1");
    c.setAttribute("opacity", (0.35 + rnd() * 0.5).toFixed(2));
    stars.appendChild(c);
  }
}

let phase = -1;
function setPhase(i: number) {
  if (i === phase) return;
  phase = i;
  phases.forEach((el, j) => {
    el.classList.toggle("is-active", j === i);
    el.setAttribute("aria-hidden", String(j !== i));
  });
  journey.forEach((a, j) => (j === i ? a.setAttribute("aria-current", "step") : a.removeAttribute("aria-current")));
  hero.style.setProperty("--ink", INK[i]);
  badge.classList.toggle("is-hidden", i === 2);
}

// Kotak teks hero dalam koordinat viewBox scene (0..1280 × 0..820), dihitung ulang saat resize.
// Scene memakai "xMidYMax slice": di layar pendek bagian atas langit terpotong, jadi tanpa ini
// matahari/bulan bisa naik ke belakang teks.
type Box = { l: number; r: number; b: number };
let textBoxes: Box[][] = [[], [], []]; // per fase
function measureText() {
  const s = Math.max(innerWidth / 1280, innerHeight / 820);
  const ox = (1280 * s - innerWidth) / 2, oy = 820 * s - innerHeight;
  const toBox = (box: DOMRect) => ({ l: (box.left + ox) / s, r: (box.right + ox) / s, b: (box.bottom + oy) / s });
  const logo = toBox(badge.getBoundingClientRect());
  textBoxes = phases.map((ph, i) => [
    ...[...ph.children].map((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return toBox(range.getBoundingClientRect());
    }),
    ...(i < 2 ? [logo] : []), // logo GIIAS tampil di pagi & siang
  ]);
}
// geser benda langit ke bawah baris teks yang ia tumpuki (hanya teks fase yang sedang tampil)
const clearOfText = (cx: number, cy: number, r: number, ph: number) => {
  for (const t of textBoxes[ph]) if (cx + r > t.l - 16 && cx - r < t.r + 16) cy = Math.max(cy, t.b + r + 16);
  return cy;
};

function render(p: number) {
  const ph = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
  // warna
  const pal = p <= 0.5 ? [MORNING, MIDDAY, p / 0.5] as const : [MIDDAY, NIGHT, (p - 0.5) / 0.5] as const;
  for (const k in MORNING) hero.style.setProperty(`--${k}`, mix(pal[0][k], pal[1][k], pal[2]));

  // Busur timur → barat: matahari terbit rendah di kanan (pagi), di tengah di bawah teks (siang),
  // lalu tenggelam di kiri ke balik laut. Bulan terbit dari kanan bawah mulai p 0.65.
  // Matahari & bulan ada di belakang layer laut, jadi terbit/tenggelam "masuk" ke laut.
  // Di layar portrait sisi kiri-kanan terpotong, jadi jarak horizontal dirapatkan ke tengah.
  const portrait = innerWidth < innerHeight;
  const squeeze = portrait ? 0.3 : 1;
  const X = (x: number) => 640 + (x - 640) * squeeze;
  // titik tertinggi (siang) sengaja di bawah teks hero, di atas gunung
  const up = span(p, 0, 0.5), down = span(p, 0.5, 0.85);
  const sx = X(p <= 0.5 ? lerp(1000, 640, up) : lerp(640, 220, down));
  const sy = p <= 0.5 ? lerp(470, 430, 1 - (1 - up) ** 2) : lerp(430, 680, down ** 2);
  const sr = p <= 0.5 ? lerp(64, 40, up) : lerp(40, 58, down);
  sun.setAttribute("cx", sx.toFixed(1));
  sun.setAttribute("cy", clearOfText(sx, sy, sr, ph).toFixed(1));
  sun.setAttribute("r", sr.toFixed(1));
  sun.style.opacity = String(1 - span(p, 0.8, 0.86));
  hero.style.setProperty("--sun", p <= 0.5 ? mix(MORNING.sun, MIDDAY.sun, up) : mix(MIDDAY.sun, "#f6c27a", down));

  const rise = span(p, 0.65, 1);
  const mx = X(lerp(1120, 1040, rise));
  moon.setAttribute("cx", mx.toFixed(1));
  moon.setAttribute("cy", clearOfText(mx, lerp(620, portrait ? 420 : 220, 1 - (1 - rise) ** 2), 28, ph).toFixed(1));
  moon.style.opacity = String(span(p, 0.65, 0.72));
  stars.style.opacity = String(span(p, 0.75, 1));

  // pantulan di laut mengikuti benda langit yang sedang terlihat
  const onMoon = p >= 0.75;
  glint.style.transform = `translateX(${((onMoon ? mx : sx) - 640).toFixed(1)}px)`;
  glint.style.opacity = String(onMoon ? span(p, 0.8, 0.95) : 1 - span(p, 0.65, 0.75));

  // parallax dari waktu: layer dekat turun lebih jauh
  // (dimatikan saat reduced motion: parallax adalah gerak yang paling sering bikin pusing)
  const px = reduced.matches ? 0 : 40;
  for (const l of layers) l.style.transform = `translateY(${(Number(l.dataset.depth) * p * px).toFixed(1)}px)`;

  // kart (menghadap kiri) menyusuri pantai dari kanan ke kiri seiring hari;
  // di layar portrait jaraknya dirapatkan ke tengah seperti matahari
  kart.setAttribute("transform", `translate(${(X(lerp(990, 430, p)) - 130).toFixed(1)} 690)`);

  setPhase(ph);
}

function progress() {
  const max = hero.offsetHeight - innerHeight;
  return max > 0 ? clamp01(-hero.getBoundingClientRect().top / max) : 0;
}

// Posisi scroll → waktu. Tiap keyframe (pagi 0, siang 0.5, malam 1) punya jeda diam,
// jadi tiap fase sempat terbaca sebelum waktu bergerak lagi.
const HOLD = 0.1;
const smooth = (t: number) => t * t * (3 - 2 * t);
function timeOf(p: number) {
  if (p < HOLD) return 0;
  if (p < 0.5 - HOLD) return 0.5 * smooth(span(p, HOLD, 0.5 - HOLD));
  if (p < 0.5 + HOLD) return 0.5;
  if (p < 1 - HOLD) return 0.5 + 0.5 * smooth(span(p, 0.5 + HOLD, 1 - HOLD));
  return 1;
}
// kebalikan untuk indikator: waktu keyframe → posisi scroll (tengah jeda)
const scrollOf = (t: number) => (t === 0 ? 0 : t === 1 ? 1 : 0.5);

// Waktu yang tampil mengejar waktu target dengan halus, supaya scroll cepat
// (roda mouse/trackpad) tidak membuat fase melompat.
let target = 0, shown = 0, last = 0, running = false;
function tick(now: number) {
  const dt = last ? now - last : 16;
  last = now;
  shown += (target - shown) * (1 - Math.exp(-dt / 140));
  if (Math.abs(target - shown) < 0.0005) shown = target;
  render(shown);
  if (shown !== target) requestAnimationFrame(tick);
  else running = false;
}
function follow() {
  target = timeOf(progress());
  // reduced motion: tanpa efek mengejar, waktu langsung mengikuti posisi scroll
  if (reduced.matches) {
    shown = target;
    render(shown);
    return;
  }
  if (!running && shown !== target) {
    running = true;
    last = 0;
    requestAnimationFrame(tick);
  }
}

let queued = false;
function onResize() {
  measureText();
  render(shown);
  onScroll();
}
function onScroll() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    nav.classList.toggle("is-solid", hero.getBoundingClientRect().bottom <= nav.offsetHeight);
    follow();
  });
}

// lompat ke fase lewat indikator di kanan
for (const a of journey) {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const max = hero.offsetHeight - innerHeight;
    scrollTo({ top: hero.offsetTop + max * scrollOf(Number(a.dataset.go)), behavior: reduced.matches ? "auto" : "smooth" });
  });
}

// riak laut: geser noise pelan, hanya saat hero terlihat
const noise = document.getElementById("ripple-noise")!;
let heroVisible = true;
new IntersectionObserver(([e]) => (heroVisible = e.isIntersecting)).observe(hero);
function ripple(t: number) {
  if (heroVisible && !reduced.matches && !document.hidden) {
    const f = 0.06 + Math.sin(t / 900) * 0.008;
    noise.setAttribute("baseFrequency", `0.006 ${f.toFixed(4)}`);
  }
  requestAnimationFrame(ripple);
}

measureText();
shown = target = timeOf(progress());
render(shown);
document.fonts.ready.then(onResize);
addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", onResize);
// teks berganti bahasa → tinggi teks berubah, ukur ulang posisi matahari/bulan
onLang(() => {
  measureText();
  render(shown);
});
reduced.addEventListener("change", () => render(shown));
requestAnimationFrame(ripple);
