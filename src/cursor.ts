import "./cursor.css";

// Kursor CTA: satu titik global yang mengikuti mouse. Di atas elemen [data-cta] titik itu
// melebar dari tengahnya menjadi pil berlabel, teks dan panah bergulir. Kursor native tetap ada.
// Opsi lewat atribut di .cc: data-cc-ease (detik), data-cc-gap (ms), data-cc-roll (ms), data-cc-roll-delay (ms).
function initCursorCta(cc = document.querySelector<HTMLElement>(".cc")) {
  if (!cc || !matchMedia("(hover: hover) and (pointer: fine)").matches) return; // touch: chip statis di kartu
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const num = (v: string | undefined, d: number) => (Number.isFinite(parseFloat(v ?? "")) ? parseFloat(v!) : d);
  const EASE = reduce ? 0 : num(cc.dataset.ccEase, 0.06);
  const GAP = num(cc.dataset.ccGap, 120);
  const ROLL = reduce
    ? null
    : { duration: num(cc.dataset.ccRoll, 520), delay: num(cc.dataset.ccRollDelay, 90), easing: "cubic-bezier(.65,0,.35,1)" };
  const t1 = cc.querySelector<HTMLElement>(".cc__t1")!;
  const t2 = cc.querySelector<HTMLElement>(".cc__t2")!;
  const roll = cc.querySelector<HTMLElement>(".cc__roll")!;
  const arrows = cc.querySelectorAll<SVGElement>(".cc__arrow svg");
  const pos = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let raf = 0, last = 0, closeTimer = 0, seen = false;
  let current: HTMLElement | null = null;

  const place = () => (cc.style.transform = `translate(${pos.x}px, ${pos.y}px)`);
  const tick = (now: number) => {
    const a = EASE ? 1 - Math.exp(-Math.min(0.05, (now - last) / 1000) / EASE) : 1; // lerp tak tergantung fps
    last = now;
    pos.x += (target.x - pos.x) * a;
    pos.y += (target.y - pos.y) * a;
    const done = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1;
    if (done) Object.assign(pos, target);
    place();
    raf = done ? 0 : requestAnimationFrame(tick);
  };
  const kick = () => {
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  };

  // teks lama naik keluar, salinan baru masuk dari bawah; panah bergulir diagonal
  function rollTo(text: string) {
    t2.textContent = text;
    if (!ROLL) {
      t1.textContent = text;
      return;
    }
    roll.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    const anims = [...roll.children].map((l) =>
      l.animate([{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }], ROLL),
    );
    arrows.forEach((s, i) =>
      s.animate(
        [
          { transform: i ? "translate(-100%, 100%)" : "translate(0, 0)" },
          { transform: i ? "translate(0, 0)" : "translate(100%, -100%)" },
        ],
        ROLL,
      ),
    );
    anims[0].onfinish = () => (t1.textContent = text); // dua salinan identik: kembali ke 0 tanpa lompatan
  }

  function setZone(el: HTMLElement | null) {
    if (el === current) {
      clearTimeout(closeTimer);
      return;
    }
    clearTimeout(closeTimer);
    if (el) {
      if (!current) t1.textContent = el.dataset.cta!;
      current = el;
      cc!.classList.add("is-open");
      rollTo(el.dataset.cta!);
    } else {
      // jembatan celah antar kartu: pil tidak berkedip saat pindah ke kartu sebelah
      closeTimer = window.setTimeout(() => {
        current = null;
        cc!.classList.remove("is-open");
      }, GAP);
    }
  }
  const zoneOf = (n: EventTarget | Element | null) => (n instanceof Element ? n.closest<HTMLElement>("[data-cta]") : null);

  addEventListener(
    "pointermove",
    (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        seen = true;
        Object.assign(pos, target);
        place();
        cc.classList.add("is-on");
      }
      setZone(zoneOf(e.target));
      kick();
    },
    { passive: true },
  );
  let scrollRaf = 0; // scroll tanpa gerak mouse: zona di bawah kursor bisa berganti
  addEventListener(
    "scroll",
    () => {
      if (seen && !scrollRaf)
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0;
          setZone(zoneOf(document.elementFromPoint(target.x, target.y)));
        });
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", () => {
    cc.classList.remove("is-on");
    setZone(null);
    seen = false;
  });
}
initCursorCta();
