"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const ptRef = useRef<HTMLParagraphElement>(null);
  const animFrames = useRef<number[]>([]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(() => {
    // Check if this is a reload or a fresh visit
    // navEntry.type === "reload"   → user pressed F5 / Ctrl+R → skip loader
    // navEntry.type === "navigate" → user typed URL or clicked link → show loader
    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = navEntry?.type === "reload";

    if (isReload) return;

    // Fresh visit → show loader for 4 seconds (fade starts at 3.5s, gone at 4.2s)
    setVisible(true);

    const fadeTimer = setTimeout(() => setFadeOut(true), 3500);
    const removeTimer = setTimeout(() => setVisible(false), 4200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const layer = chipsRef.current;
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    const pt = ptRef.current;
    if (!layer || !canvas || !svg || !pt) return;

    // ── Chip data ──────────────────────────────────────────────────────────
    const inner = [
      { sym: "TS", sub: "typescript", cls: "ts ic", r: 88, a: 270 },
      { sym: "⚛", sub: "react", cls: "re ic", r: 88, a: 0 },
      { sym: "N▲", sub: "next.js", cls: "nx ic", r: 88, a: 90 },
      { sym: "⬡", sub: "node", cls: "nd ic", r: 88, a: 180 },
    ];
    const outer = [
      { sym: "EX", sub: "express", cls: "ex oc", r: 136, a: 18 },
      { sym: "◈", sub: "redux", cls: "rx oc", r: 136, a: 90 },
      { sym: "M", sub: "mongodb", cls: "mg oc", r: 136, a: 162 },
      { sym: "▲", sub: "prisma", cls: "pr oc", r: 136, a: 234 },
      { sym: "PG", sub: "postgres", cls: "pg oc", r: 136, a: 306 },
    ];

    type ChipData = (typeof inner)[number];

    if (!layer) return;

    function mkChip(d: ChipData) {
      if (!layer) return;

      const el = document.createElement("div");
      el.className = "pl-chip " + d.cls;
      el.innerHTML = `<span class="pl-chip-sym">${d.sym}</span><span class="pl-chip-sub">${d.sub}</span>`;

      const half = d.cls.includes("oc") ? -22 : -25;
      el.style.cssText = `position:absolute;top:50%;left:50%;margin-left:${half}px;margin-top:${half}px;`;

      layer.appendChild(el);
      return el;
    }

    const iEls = inner.map((d) => ({ el: mkChip(d), d }));
    const oEls = outer.map((d) => ({ el: mkChip(d), d }));

    const sp1 = svg.getElementById("pl-spark1") as SVGCircleElement | null;
    const sp2 = svg.getElementById("pl-spark2") as SVGCircleElement | null;
    const sp3 = svg.getElementById("pl-spark3") as SVGCircleElement | null;

    const toR = (deg: number) => (deg * Math.PI) / 180;
    let t = 0;

    function tick() {
  t += 0.25;

  const ir = t * 0.35;
  const or = -t * 0.22;

  // ================= INNER ELEMENTS =================
  iEls.forEach(({ el, d }) => {
    if (!el) return;

    const a = toR(d.a + ir);
    const x = Math.cos(a) * d.r;
    const y = Math.sin(a) * d.r;

    el.style.transform = `translate(${x}px, ${y}px)`;
  });

  // ================= OUTER ELEMENTS =================
  oEls.forEach(({ el, d }) => {
    if (!el) return;

    const a = toR(d.a + or);
    const x = Math.cos(a) * d.r;
    const y = Math.sin(a) * d.r;

    el.style.transform = `translate(${x}px, ${y}px)`;
  });

  // ================= SPOT 1 =================
  if (sp1) {
    const a1 = toR(90 + ir * 1.5);

    sp1.setAttribute(
      "cx",
      String(160 + Math.cos(a1) * 88)
    );

    sp1.setAttribute(
      "cy",
      String(160 + Math.sin(a1) * 88)
    );
  }

  // ================= SPOT 2 =================
  if (sp2) {
    const a2 = toR(270 + or * 1.2);

    sp2.setAttribute(
      "cx",
      String(160 + Math.cos(a2) * 136)
    );

    sp2.setAttribute(
      "cy",
      String(160 + Math.sin(a2) * 136)
    );
  }

  // ================= SPOT 3 =================
  if (sp3) {
    const a3 = toR(180 + ir * 0.9);

    sp3.setAttribute(
      "cx",
      String(160 + Math.cos(a3) * 56)
    );

    sp3.setAttribute(
      "cy",
      String(160 + Math.sin(a3) * 56)
    );
  }

  const id = requestAnimationFrame(tick);
  animFrames.current.push(id);
}
    tick();

    // ── Particle canvas ────────────────────────────────────────────────────
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 320,
      H = 320;
    const cols = [
      "#3178C6",
      "#61DAFB",
      "#5fa04e",
      "#764abc",
      "#13aa52",
      "#336791",
      "#e0e0e0",
      "#5898c4",
    ];

    const stars = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      col: cols[Math.floor(Math.random() * cols.length)],
      life: Math.random() * 300,
      max: 250 + Math.random() * 150,
    }));

    function drawStars() {
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < stars.length; i++) {
        const si = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const sj = stars[j];
          const dx = si.x - sj.x,
            dy = si.y - sj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx!.strokeStyle = si.col;
            ctx!.lineWidth = 0.4;
            ctx!.globalAlpha = (1 - dist / 60) * 0.07;
            ctx!.beginPath();
            ctx!.moveTo(si.x, si.y);
            ctx!.lineTo(sj.x, sj.y);
            ctx!.stroke();
          }
        }
      }
      stars.forEach((s) => {
        s.life++;
        if (s.life > s.max) {
          s.life = 0;
          s.x = Math.random() * W;
          s.y = Math.random() * H;
        }
        const fade = Math.sin((s.life / s.max) * Math.PI);
        ctx!.globalAlpha = fade * 0.65;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = s.col;
        ctx!.fill();
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;
      });
      ctx!.globalAlpha = 1;
      const id = requestAnimationFrame(drawStars);
      animFrames.current.push(id);
    }
    drawStars();

    // ── Status messages ────────────────────────────────────────────────────
    const msgs = [
      "initializing...",
      "loading modules...",
      "connecting db...",
      "compiling tsx...",
      "bundling...",
      "almost ready...",
      "serving app...",
    ];
    let mi = 0;
    const iv = setInterval(() => {
      mi = (mi + 1) % msgs.length;
      if (pt) {
        pt.style.animation = "none";
        void pt.offsetWidth;
        pt.style.animation = "pl-fadeMsg 0.4s ease";
        pt.textContent = msgs[mi];
      }
    }, 1800);
    intervals.current.push(iv);

    return () => {
      animFrames.current.forEach(cancelAnimationFrame);
      animFrames.current = [];
      intervals.current.forEach(clearInterval);
      intervals.current = [];
      layer.innerHTML = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        .pl-scene{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.5rem 1rem 2rem;gap:1.8rem;}
        .pl-arena{position:relative;width:320px;height:320px;}
        canvas.pl-fx{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;border-radius:50%;}
        .pl-rings-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
        .pl-chips-layer{position:absolute;inset:0;}
        .pl-hub{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:30;}
        .pl-hub-outer{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;}
        .pl-hub-glow{position:absolute;inset:-6px;border-radius:50%;animation:pl-glowPulse 2s ease-in-out infinite;}
        .pl-hub-border{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(255,255,255,0.12);}
        .pl-hub-spin1{position:absolute;inset:4px;border-radius:50%;border:1.5px solid transparent;border-top-color:#61DAFB;border-right-color:#61DAFB;animation:pl-sp 1.6s linear infinite;}
        .pl-hub-spin2{position:absolute;inset:10px;border-radius:50%;border:1.5px solid transparent;border-bottom-color:#764abc;border-left-color:#764abc;animation:pl-sp 2.2s linear infinite reverse;}
        .pl-hub-spin3{position:absolute;inset:16px;border-radius:50%;border:1px solid transparent;border-top-color:#5fa04e;animation:pl-sp 3s linear infinite;}
        .pl-hub-core{position:absolute;inset:22px;border-radius:50%;background:#0a0a0f;display:flex;align-items:center;justify-content:center;}
        .pl-hub-dot{width:14px;height:14px;border-radius:50%;background:#1a1a2e;border:1px solid rgba(97,218,251,0.4);animation:pl-corePulse 1.8s ease-in-out infinite;}
        .pl-chip{position:absolute;top:50%;left:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:14px;border:1px solid;cursor:default;transition:filter 0.25s,transform 0.25s;will-change:transform;}
        .pl-chip:hover{filter:brightness(1.4);z-index:50;}
        .pl-chip-sym{font-size:15px;font-weight:700;line-height:1;font-family:monospace;}
        .pl-chip-sub{font-size:7.5px;font-weight:500;letter-spacing:0.08em;margin-top:2px;font-family:monospace;opacity:0.8;}
        .pl-chip.ic{width:50px;height:50px;}
        .pl-chip.oc{width:44px;height:44px;}
        .pl-chip.ts{background:#060f1c;border-color:#3178C6;color:#3178C6;}
        .pl-chip.re{background:#030d17;border-color:#61DAFB;color:#61DAFB;}
        .pl-chip.nx{background:#080808;border-color:#d0d0d0;color:#d0d0d0;}
        .pl-chip.nd{background:#04100a;border-color:#5fa04e;color:#5fa04e;}
        .pl-chip.ex{background:#0e0e0e;border-color:#999;color:#bbb;}
        .pl-chip.rx{background:#0c061a;border-color:#764abc;color:#a07ae0;}
        .pl-chip.mg{background:#030c05;border-color:#13aa52;color:#13aa52;}
        .pl-chip.pr{background:#040810;border-color:#4f7ab5;color:#8ab4e0;}
        .pl-chip.pg{background:#040e1d;border-color:#336791;color:#5898c4;}
        .pl-bottom{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;max-width:340px;}
        .pl-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;}
        .pl-tag{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-family:monospace;padding:4px 10px 4px 8px;border-radius:99px;border:1px solid;font-weight:500;letter-spacing:0.04em;position:relative;overflow:hidden;}
        .pl-tag::before{content:'';position:absolute;inset:0;background:currentColor;opacity:0;transition:opacity 0.3s;}
        .pl-tag:hover::before{opacity:0.08;}
        .pl-tdot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
        .pl-progwrap{display:flex;align-items:center;gap:10px;width:100%;}
        .pl-progbar{flex:1;height:2px;background:rgba(255,255,255,0.07);border-radius:1px;overflow:visible;position:relative;}
        .pl-progfill{height:100%;border-radius:1px;animation:pl-progAnim 2s ease-in-out infinite;position:relative;}
        .pl-progfill::after{content:'';position:absolute;right:0;top:50%;transform:translateY(-50%);width:5px;height:5px;border-radius:50%;background:inherit;animation:pl-dotPulse 2s ease-in-out infinite;}
        .pl-progtext{font-size:11px;font-family:monospace;color:rgba(255,255,255,0.35);min-width:120px;text-align:right;}
        .pl-tags .pl-tag:nth-child(1){animation:pl-tagFlare 2.4s infinite 0.00s;}
        .pl-tags .pl-tag:nth-child(2){animation:pl-tagFlare 2.4s infinite 0.27s;}
        .pl-tags .pl-tag:nth-child(3){animation:pl-tagFlare 2.4s infinite 0.54s;}
        .pl-tags .pl-tag:nth-child(4){animation:pl-tagFlare 2.4s infinite 0.81s;}
        .pl-tags .pl-tag:nth-child(5){animation:pl-tagFlare 2.4s infinite 1.08s;}
        .pl-tags .pl-tag:nth-child(6){animation:pl-tagFlare 2.4s infinite 1.35s;}
        .pl-tags .pl-tag:nth-child(7){animation:pl-tagFlare 2.4s infinite 1.62s;}
        .pl-tags .pl-tag:nth-child(8){animation:pl-tagFlare 2.4s infinite 1.89s;}
        .pl-tags .pl-tag:nth-child(9){animation:pl-tagFlare 2.4s infinite 2.16s;}
        @keyframes pl-sp{to{transform:rotate(360deg);}}
        @keyframes pl-glowPulse{0%,100%{box-shadow:0 0 12px rgba(97,218,251,0.15),0 0 24px rgba(49,120,198,0.08);}50%{box-shadow:0 0 20px rgba(97,218,251,0.3),0 0 40px rgba(49,120,198,0.15);}}
        @keyframes pl-corePulse{0%,100%{box-shadow:0 0 0 0 rgba(97,218,251,0.3);}50%{box-shadow:0 0 0 5px rgba(97,218,251,0);}}
        @keyframes pl-progAnim{0%{width:15%;background:#3178C6;}40%{width:75%;background:#61DAFB;}70%{width:90%;background:#5fa04e;}100%{width:15%;background:#764abc;}}
        @keyframes pl-dotPulse{0%,100%{box-shadow:0 0 0 0 currentColor;}50%{box-shadow:0 0 0 3px transparent;}}
        @keyframes pl-tagFlare{0%,100%{opacity:0.45;}50%{opacity:1;}}
        @keyframes pl-fadeMsg{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#0A0A0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 0.7s ease",
          pointerEvents: fadeOut ? "none" : "all",
        }}
      >
        <div className="pl-scene">
          <div className="pl-arena">
            <canvas
              ref={canvasRef}
              className="pl-fx"
              width={320}
              height={320}
            />

            <svg ref={svgRef} className="pl-rings-svg" viewBox="0 0 320 320">
              <circle
                cx="160"
                cy="160"
                r="88"
                fill="none"
                stroke="rgba(97,218,251,0.1)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <circle
                cx="160"
                cy="160"
                r="136"
                fill="none"
                stroke="rgba(118,74,188,0.1)"
                strokeWidth="1"
                strokeDasharray="3 8"
              />
              <circle
                cx="160"
                cy="160"
                r="56"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
              <circle
                cx="160"
                cy="160"
                r="160"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1"
              />
              <circle
                id="pl-spark1"
                cx="160"
                cy="72"
                r="3.5"
                fill="#61DAFB"
                opacity="0.9"
              />
              <circle
                id="pl-spark2"
                cx="296"
                cy="160"
                r="3"
                fill="#764abc"
                opacity="0.8"
              />
              <circle
                id="pl-spark3"
                cx="160"
                cy="24"
                r="2.5"
                fill="#5fa04e"
                opacity="0.7"
              />
            </svg>

            <div ref={chipsRef} className="pl-chips-layer" />

            <div className="pl-hub">
              <div className="pl-hub-outer">
                <div className="pl-hub-glow" />
                <div className="pl-hub-border" />
                <div className="pl-hub-spin1" />
                <div className="pl-hub-spin2" />
                <div className="pl-hub-spin3" />
                <div className="pl-hub-core">
                  <div className="pl-hub-dot" />
                </div>
              </div>
            </div>
          </div>

          <div className="pl-bottom">
            <div className="pl-tags">
              {[
                {
                  label: "TypeScript",
                  bg: "#060f1c",
                  bc: "#3178C6",
                  col: "#4d94e8",
                  dot: "#3178C6",
                },
                {
                  label: "React",
                  bg: "#030d17",
                  bc: "#61DAFB",
                  col: "#61DAFB",
                  dot: "#61DAFB",
                },
                {
                  label: "Next.js",
                  bg: "#080808",
                  bc: "#c0c0c0",
                  col: "#c0c0c0",
                  dot: "#c0c0c0",
                },
                {
                  label: "Node.js",
                  bg: "#04100a",
                  bc: "#5fa04e",
                  col: "#5fa04e",
                  dot: "#5fa04e",
                },
                {
                  label: "Express",
                  bg: "#0e0e0e",
                  bc: "#999",
                  col: "#bbb",
                  dot: "#999",
                },
                {
                  label: "Redux",
                  bg: "#0c061a",
                  bc: "#764abc",
                  col: "#a07ae0",
                  dot: "#764abc",
                },
                {
                  label: "MongoDB",
                  bg: "#030c05",
                  bc: "#13aa52",
                  col: "#13aa52",
                  dot: "#13aa52",
                },
                {
                  label: "Prisma",
                  bg: "#040810",
                  bc: "#4f7ab5",
                  col: "#8ab4e0",
                  dot: "#4f7ab5",
                },
                {
                  label: "PostgreSQL",
                  bg: "#040e1d",
                  bc: "#336791",
                  col: "#5898c4",
                  dot: "#336791",
                },
              ].map((t) => (
                <span
                  key={t.label}
                  className="pl-tag"
                  style={{ background: t.bg, borderColor: t.bc, color: t.col }}
                >
                  <span className="pl-tdot" style={{ background: t.dot }} />
                  {t.label}
                </span>
              ))}
            </div>

            <div className="pl-progwrap">
              <div className="pl-progbar">
                <div className="pl-progfill" />
              </div>
              <p ref={ptRef} className="pl-progtext">
                initializing...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
