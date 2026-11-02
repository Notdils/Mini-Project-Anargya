import "./parallax.css";
import { drawMarks } from "./mark";

// Z fly-through tanpa library: kamera maju sepanjang sumbu Z mengikuti scroll,
// tiap objek diproyeksikan perspektif (s = focal / dz), jadi kecil di tengah lalu
// membesar sambil bergerak keluar dari pusat. Mouse menggeser kamera sedikit ke samping
// (objek dekat bergeser lebih jauh, headline diam). Atur rasa lewat data-mp-* di <section>.

const DEFAULTS = {
  focal: 1000, travel: 3400, fogFar: 3200, fogNear: 2600,
  nearFade: 400, nearClip: 260, scrub: 0.6, staticP: 0.45,
  mouse: 0.08, mouseEase: 0.15,
};
type Config = typeof DEFAULTS;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const outCubic = (t: number) => 1 - (1 - t) ** 3; // power3.out
const inCubic = (t: number) => t ** 3; // power3.in
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

function config(section: HTMLElement): Config {
  const c = { ...DEFAULTS };
  for (const k of Object.keys(c) as (keyof Config)[]) {
    const v = parseFloat(section.dataset["mp" + k[0].toUpperCase() + k.slice(1)] ?? "");
    if (Number.isFinite(v)) c[k] = v;
  }
  return c;
}

function scene(section: HTMLElement) {
  const { focal, travel, fogFar, fogNear, nearFade, nearClip, scrub, staticP, mouse, mouseEase } = config(section);
  section.classList.add("mp--live");
  drawMarks(section);
  const stage = section.querySelector<HTMLElement>(".mp__stage")!;
  const words = [...section.querySelectorAll<HTMLElement>(".mp__word > span")];
  const items = [...section.querySelectorAll<HTMLElement>(".mp__obj, .mp__plane")].map((el) => ({
    el,
    x: +el.dataset.x!, y: +el.dataset.y!, z: +el.dataset.z!, size: +el.dataset.size!,
    plane: el.matches(".mp__plane"),
    tilt: +(el.dataset.tilt ?? 0) || 0, // derajat, tetap selama scroll & gerak mouse
    hidden: false, // disembunyikan CSS (mis. data-mobile="hide"); dicek saat resize, bukan per frame
    // susunan statis untuk reduced motion: "x y size tilt" (x, y fraksi setengah layar; size % sisi terpanjang)
    still: el.dataset.static ? el.dataset.static.trim().split(/\s+/).map(Number) : null,
  }));
  let W = 0, H = 0;
  const cam = { mx: 0, my: 0 }; // posisi mouse ter-smooth, −1..1 (0 = tengah)

  function layout() {
    // hanya saat resize, bukan per frame
    W = stage.clientWidth;
    H = stage.clientHeight;
    const unit = Math.max(W, H) / 100;
    const stillUnit = Math.min(Math.max(W, H), W * 1.6) / 100; // layar tegak: ukur dari lebar supaya baris tidak berdesakan
    for (const it of items) {
      it.el.style.width = reduced.matches && it.still ? it.still[2] * stillUnit + "px" : it.size * unit + "px";
      it.hidden = getComputedStyle(it.el).display === "none"; // berlaku juga untuk <svg> (tidak punya offsetParent)
    }
  }

  // Reduced motion: tanpa kamera & tanpa fly-through, objek berbaris rapi menurut data-static.
  function renderStill() {
    for (const it of items) {
      if (it.hidden) continue;
      if (!it.still) {
        it.el.style.opacity = "0";
        continue;
      }
      const [x, y, , tilt] = it.still;
      it.el.style.opacity = "1";
      it.el.style.transform = `translate(${W / 2 + (x * W) / 2}px, ${H / 2 + (y * H) / 2}px) rotate(${tilt || 0}deg)`;
      it.el.style.zIndex = it.plane ? "1" : "10";
    }
    words.forEach((w) => (w.style.transform = "translateY(0%)"));
  }

  function render(p: number) {
    if (reduced.matches) return renderStill();
    const camZ = p * travel;
    // intro: belum terlihat apa pun sebelum scroll masuk ke scene, lalu muncul bertahap
    // bersama kata headline (p 0–0.12); handoff: hilang di akhir (p 0.9–1)
    const k = clamp01(p / 0.12);
    const fade = k * k * (3 - 2 * k) * (1 - clamp01((p - 0.9) / 0.1));
    for (const it of items) {
      if (it.hidden) continue; // disembunyikan di mobile
      const dz = it.z - camZ;
      if (dz <= nearClip) {
        it.el.style.opacity = "0";
        continue;
      }
      const s = focal / dz;
      const fogIn = clamp01((fogFar - dz) / (fogFar - fogNear));
      const nearOut = clamp01((dz - nearClip) / (nearFade - nearClip));
      it.el.style.opacity = String(fogIn * nearOut * fade);
      // pan kamera dari mouse: berlawanan arah mouse, sebanding scale (yang dekat bergeser lebih jauh)
      const px = (it.x - cam.mx * mouse) * (W / 2) * s;
      const py = (it.y - cam.my * mouse) * (H / 2) * s;
      it.el.style.transform = `translate(${W / 2 + px}px, ${H / 2 + py}px) rotate(${it.tilt}deg) scale(${s})`;
      // urut kedalaman tiap frame; line-art selalu di bawah, headline (1000) selalu di atas
      it.el.style.zIndex = it.plane ? "1" : String(Math.round(s * 100));
    }
    // headline: kata naik dari mask (p 0–0.2), lalu keluar ke atas (mulai p 0.68)
    words.forEach((w, i) => {
      const enter = outCubic(clamp01((p - i * 0.03) / 0.2));
      const exit = inCubic(clamp01((p - 0.68 - i * 0.03) / 0.2));
      w.style.transform = `translateY(${110 * (1 - enter) - 110 * exit}%)`;
    });
  }

  function progress() {
    const r = section.getBoundingClientRect();
    const max = r.height - innerHeight;
    return max > 0 ? clamp01(-r.top / max) : 0;
  }

  // scrub: p yang tampil mengejar posisi scroll (≈ scrub detik), kamera tetap linear terhadap scroll
  let target = 0, shown = 0, last = 0, running = false;
  function tick(now: number) {
    const dt = last ? now - last : 16;
    last = now;
    shown += (target - shown) * (1 - Math.exp(-dt / ((scrub * 1000) / 3)));
    if (Math.abs(target - shown) < 0.0002) shown = target;
    render(shown);
    if (shown !== target) requestAnimationFrame(tick);
    else running = false;
  }
  function follow() {
    if (reduced.matches) {
      shown = target = staticP; // komposisi statis
      render(shown);
      return;
    }
    target = progress();
    if (!running && shown !== target) {
      running = true;
      last = 0;
      requestAnimationFrame(tick);
    }
  }

  layout();
  shown = target = reduced.matches ? staticP : progress();
  render(shown);
  addEventListener("scroll", follow, { passive: true });

  // Mouse: hanya perangkat dengan hover + pointer presisi, dan bukan reduced motion.
  // Loop rAF hanya jalan selama masih ada sisa gerak dan scene terlihat.
  if (mouse > 0 && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const aim = { x: 0, y: 0 };
    let raf = 0, prev = 0, inView = false;
    new IntersectionObserver(([e]) => (inView = e.isIntersecting)).observe(section);
    const step = (now: number) => {
      const a = 1 - Math.exp(-Math.min(0.05, (now - prev) / 1000) / mouseEase); // lerp tak tergantung fps
      prev = now;
      cam.mx += (aim.x - cam.mx) * a;
      cam.my += (aim.y - cam.my) * a;
      const settled = Math.abs(aim.x - cam.mx) < 1e-3 && Math.abs(aim.y - cam.my) < 1e-3;
      if (settled) {
        cam.mx = aim.x;
        cam.my = aim.y;
      }
      render(shown);
      raf = settled ? 0 : requestAnimationFrame(step);
    };
    const kick = () => {
      if (inView && !reduced.matches && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(step);
      }
    };
    addEventListener("pointermove", (e) => {
      aim.x = (e.clientX / innerWidth) * 2 - 1;
      aim.y = (e.clientY / innerHeight) * 2 - 1;
      kick();
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => {
      aim.x = aim.y = 0; // mouse keluar jendela: kamera kembali ke tengah
      kick();
    });
  }
  addEventListener("resize", () => {
    layout();
    render(shown);
    follow();
  });
  reduced.addEventListener("change", () => {
    layout(); // lebar objek berbeda antara susunan statis dan animasi
    shown = target = reduced.matches ? staticP : progress();
    render(shown);
  });
}

document.querySelectorAll<HTMLElement>("[data-mp]").forEach(scene);
