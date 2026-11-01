// Lambang Anargya digambar secara algoritmik (dekorasi, bukan file logo resmi).
//
// Dua untai bersilangan, digambar dari kurva kosinus pada t ∈ [-1, 1]:
//   untai hijau  y = +A·cos(πt)  → ujung di atas, tengah melengkung ke bawah
//   untai merah  y = −A·cos(πt)  → ujung di bawah, tengah melengkung ke atas
// Keduanya bersilangan di t = ±0.5. Di luar ±1 kurva dibuat datar (turunan cos(πt) di ±1
// sama dengan 0, jadi sambungannya mulus) sehingga ujungnya melandai seperti di logo.
// Untuk versi isi, tiap untai jadi pita: tepinya digeser sepanjang garis normal sejauh
// setengah tebal, dan tebalnya meruncing ke ujung seperti goresan kuas.

const NS = "http://www.w3.org/2000/svg";
const VB = { w: 400, h: 200 }; // viewBox
const SPAN = 1.3; // panjang untai, termasuk ekor datar di luar ±1
const AMP = 44; // amplitudo dalam unit viewBox
const SCALE_X = 145; // unit viewBox per 1 t

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Titik dan arah garis singgung untai pada t. sign +1 = hijau, −1 = merah. */
function point(t: number, sign: number) {
  const u = clamp(t, -1, 1);
  const x = VB.w / 2 + t * SCALE_X;
  const y = VB.h / 2 + sign * AMP * Math.cos(Math.PI * u);
  // dy/dt dibagi dx/dt; nol di ekor datar
  const slope = Math.abs(t) <= 1 ? (-sign * AMP * Math.PI * Math.sin(Math.PI * u)) / SCALE_X : 0;
  return { x, y, slope };
}

/** Tebal pita: paling tebal di tengah, runcing ke ujung. */
const width = (t: number, max: number) => max * Math.pow(Math.cos((Math.PI / 2) * (t / SPAN)), 0.55) + 1.5;

/** Garis tengah satu untai (untuk versi line-art). */
function centerline(sign: number, steps = 120) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = -SPAN + (2 * SPAN * i) / steps;
    const { x, y } = point(t, sign);
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

/** Pita tertutup satu untai (untuk versi isi). */
function ribbon(sign: number, max: number, steps = 120) {
  const left: string[] = [], right: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = -SPAN + (2 * SPAN * i) / steps;
    const { x, y, slope } = point(t, sign);
    const len = Math.hypot(1, slope);
    const nx = -slope / len, ny = 1 / len; // normal satuan
    const w = width(t, max) / 2;
    left.push(`${(x + nx * w).toFixed(1)} ${(y + ny * w).toFixed(1)}`);
    right.push(`${(x - nx * w).toFixed(1)} ${(y - ny * w).toFixed(1)}`);
  }
  return `M${left.join("L")}L${right.reverse().join("L")}Z`;
}

const el = (name: string, attrs: Record<string, string>) => {
  const n = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
};

/**
 * Isi semua <svg data-mark="line|fill"> di dalam root.
 *  line: dua garis tengah (pakai stroke dari CSS, untuk line-art yang dilewati kamera)
 *  fill: dua pita berwarna merek dengan tepi krem seperti stiker (hijau digambar dulu, merah di atasnya)
 */
export function drawMarks(root: ParentNode = document) {
  root.querySelectorAll<SVGSVGElement>("svg[data-mark]").forEach((svg) => {
    svg.setAttribute("viewBox", `0 0 ${VB.w} ${VB.h}`);
    svg.replaceChildren();
    if (svg.dataset.mark === "line") {
      svg.append(el("path", { d: centerline(1) }), el("path", { d: centerline(-1) }));
      return;
    }
    const g = el("g", { "stroke-linejoin": "round" });
    for (const [sign, fill] of [[1, "#22351c"], [-1, "#b3121a"]] as const) {
      g.append(el("path", { d: ribbon(sign, 22), fill, stroke: "#f4e9d6", "stroke-width": "7", "paint-order": "stroke" }));
    }
    svg.append(g);
  });
}
