"use client"

import { useState, useEffect, useRef, useCallback } from "react";

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f0f4ff;
    --bg2: #e8eeff;
    --surface: rgba(255,255,255,0.75);
    --surface2: rgba(255,255,255,0.5);
    --border: rgba(180,190,255,0.3);
    --border2: rgba(140,160,255,0.5);

    --ink: #0f0f1a;
    --ink2: #2d2d4e;
    --ink3: #6b6b9e;
    --ink4: #9b9bc0;

    --azure: #3b82f6;
    --azure2: #60a5fa;
    --azure-g: linear-gradient(135deg,#3b82f6,#6366f1);
    --violet: #6366f1;
    --violet2: #818cf8;
    --violet-g: linear-gradient(135deg,#6366f1,#a855f7);
    --rose: #f43f5e;
    --rose2: #fb7185;
    --rose-g: linear-gradient(135deg,#f43f5e,#fb923c);
    --emerald: #10b981;
    --emerald2: #34d399;
    --emerald-g: linear-gradient(135deg,#10b981,#06b6d4);
    --amber: #f59e0b;
    --amber2: #fbbf24;
    --amber-g: linear-gradient(135deg,#f59e0b,#f97316);
    --cyan: #06b6d4;
    --cyan2: #22d3ee;
    --pink: #ec4899;
    --teal: #14b8a6;

    --glow-azure: 0 0 24px rgba(59,130,246,0.25);
    --glow-violet: 0 0 24px rgba(99,102,241,0.25);
    --glow-rose: 0 0 24px rgba(244,63,94,0.25);
    --glow-emerald: 0 0 24px rgba(16,185,129,0.25);
    --glass: backdrop-filter: blur(20px);

    --r-sm: 12px; --r-md: 18px; --r-lg: 26px; --r-xl: 36px;
    --font-display: 'Syne', sans-serif;
    --font-body: 'Outfit', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
    --ease-smooth: cubic-bezier(0.4,0,0.2,1);
  }

  html { scroll-behavior: smooth; }
  body { 
    background: var(--bg); 
    color: var(--ink); 
    font-family: var(--font-body);
    background-image: 
      radial-gradient(ellipse at 20% 0%, rgba(99,102,241,0.12) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 10%, rgba(59,130,246,0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.08) 0%, transparent 50%);
    min-height: 100vh;
  }

  /* ── KEYFRAMES ─── */
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0}to{opacity:1} }
  @keyframes slideRight { from{transform:scaleX(0);opacity:0}to{transform:scaleX(1);opacity:1} }
  @keyframes glow-pulse { 0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.03)} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
  @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
  @keyframes bounce-in { 0%{transform:scale(0.3);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1} }
  @keyframes slide-in-left { from{transform:translateX(-20px);opacity:0}to{transform:translateX(0);opacity:1} }
  @keyframes slide-in-right { from{transform:translateX(20px);opacity:0}to{transform:translateX(0);opacity:1} }
  @keyframes ping { 0%{transform:scale(1);opacity:1}75%,100%{transform:scale(1.8);opacity:0} }
  @keyframes gradient-flow { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
  @keyframes type-cursor { 0%,100%{opacity:1}50%{opacity:0} }
  @keyframes progress-in { from{width:0}to{width:var(--pw)} }
  @keyframes orbit { from{transform:rotate(0deg) translateX(30px) rotate(0deg)}to{transform:rotate(360deg) translateX(30px) rotate(-360deg)} }
  @keyframes confetti-fall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(100px) rotate(720deg);opacity:0} }
  @keyframes scale-in { from{transform:scale(0.9);opacity:0}to{transform:scale(1);opacity:1} }
  @keyframes ripple { 0%{transform:scale(0);opacity:0.4}100%{transform:scale(2.5);opacity:0} }
  @keyframes line-execute { from{background-position:0 0}to{background-position:0 100%} }

  .fade-up { animation: fadeUp 0.5s var(--ease-smooth) both; }
  .fade-in { animation: fadeIn 0.3s ease both; }
  .bounce-in { animation: bounce-in 0.4s var(--ease-spring) both; }

  /* ── GLASS CARD ─── */
  .glass {
    background: var(--surface);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--border2);
    border-radius: var(--r-lg);
    box-shadow: 0 8px 32px rgba(99,102,241,0.08), 0 1px 0 rgba(255,255,255,0.8) inset;
  }
  .glass-sm {
    background: var(--surface2);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
  }

  /* ── GRADIENT TEXT ─── */
  .grad-text-azure { background: var(--azure-g); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .grad-text-violet { background: var(--violet-g); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .grad-text-rose { background: var(--rose-g); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .grad-text-emerald { background: var(--emerald-g); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  /* ── BUTTONS ─── */
  .btn { font-family:var(--font-body); cursor:pointer; border:none; transition:all 0.22s var(--ease-smooth); font-weight:600; letter-spacing:.01em; }
  .btn-primary {
    background: linear-gradient(135deg,#6366f1,#3b82f6);
    color:#fff; padding:12px 28px; border-radius:100px;
    box-shadow:0 4px 20px rgba(99,102,241,0.35);
  }
  .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(99,102,241,0.45); filter:brightness(1.05); }
  .btn-primary:active { transform:translateY(0); }
  .btn-ghost { background:transparent; border:1.5px solid var(--border2); color:var(--ink3); padding:10px 22px; border-radius:100px; }
  .btn-ghost:hover { background:var(--surface); border-color:var(--violet); color:var(--violet); }
  .btn-run { background:var(--emerald-g); color:#fff; padding:10px 22px; border-radius:12px; box-shadow:0 4px 16px rgba(16,185,129,0.3); }
  .btn-run:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(16,185,129,0.4); }

  /* ── INPUTS ─── */
  .inp {
    background: var(--surface); border: 1.5px solid var(--border2); border-radius: 14px;
    padding: 11px 16px; font-family: var(--font-body); font-size:14px; color: var(--ink);
    transition: all 0.2s; width: 100%; outline: none;
  }
  .inp:focus { border-color: var(--violet); box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
  .inp.error { border-color: var(--rose); box-shadow: 0 0 0 3px rgba(244,63,94,0.12); }

  /* ── PILL / BADGE ─── */
  .pill { display:inline-flex; align-items:center; gap:5px; padding:4px 12px; border-radius:100px; font-size:11px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; }

  /* ── NAV LINK ─── */
  .nav-item { transition:all 0.18s; padding:9px 14px; border-radius:12px; font-size:13px; font-weight:500; color:var(--ink3); border:none; background:transparent; cursor:pointer; display:flex; align-items:center; gap:8px; width:100%; text-align:left; }
  .nav-item:hover { background:rgba(99,102,241,0.08); color:var(--violet); }
  .nav-item.active { background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(59,130,246,0.1)); color:var(--violet); font-weight:700; box-shadow:0 2px 12px rgba(99,102,241,0.15); }

  /* ── CODE TOKENS ─── */
  .tk-kw { color:#7c3aed; font-weight:600; }
  .tk-str { color:#059669; }
  .tk-num { color:#d97706; }
  .tk-cmt { color:#9ca3af; font-style:italic; }
  .tk-fn { color:#2563eb; font-weight:500; }
  .tk-op { color:#dc2626; }
  .tk-type { color:#0891b2; font-weight:600; }
  .tk-plain { color:#374151; }
  .tk-pp { color:#7c3aed; }

  /* ── CODE LINE ANIMATIONS ─── */
  .code-line { transition: background 0.25s; border-radius:4px; }
  .code-line.executing { background: rgba(99,102,241,0.15); box-shadow: inset 3px 0 0 var(--violet); }
  .code-line.highlighted { background: rgba(16,185,129,0.1); }

  /* ── QUIZ OPTIONS ─── */
  .q-option { background:var(--surface); border:1.5px solid var(--border2); border-radius:14px; padding:14px 18px; cursor:pointer; transition:all 0.22s var(--ease-smooth); display:flex; align-items:center; gap:12px; }
  .q-option:hover:not(.dis) { border-color:var(--violet); background:rgba(99,102,241,0.06); transform:translateX(4px); }
  .q-option.correct { border-color:var(--emerald); background:rgba(16,185,129,0.1); animation:bounce-in 0.35s var(--ease-spring); }
  .q-option.wrong { border-color:var(--rose); background:rgba(244,63,94,0.08); }
  .q-option.dis { cursor:default; }

  /* ── SCROLLBAR ─── */
  ::-webkit-scrollbar { width:5px; height:5px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(99,102,241,0.25); border-radius:99px; }

  /* ── RESPONSIVE ─── */
  @media(max-width:768px) { .two-col{grid-template-columns:1fr!important} .hide-mobile{display:none!important} }
  @media(max-width:900px) { .sidebar-grid{grid-template-columns:1fr!important} }
`;

function injectStyles() {
  if (document.getElementById("cpp-pro")) return;
  const s = document.createElement("style");
  s.id = "cpp-pro"; s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

// ── SYNTAX HIGHLIGHTER ────────────────────────────────────────────────────────
const KW = new Set(["if","else","for","while","do","switch","case","default","break","continue","goto","return","int","float","double","char","bool","void","const","auto","class","struct","using","namespace","new","delete","true","false","nullptr","string","endl","public","private","protected","static","inline"]);
const TYPES = new Set(["int","float","double","char","bool","void","string","auto","long","short","unsigned"]);

function tokenize(line) {
  const tokens = [];
  let rest = line;
  while (rest.length) {
    let m;
    if ((m = rest.match(/^(\/\/.*)/))) { tokens.push({ t: "cmt", v: m[1] }); rest = ""; continue; }
    if ((m = rest.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/))) { tokens.push({ t: "str", v: m[1] }); rest = rest.slice(m[1].length); continue; }
    if ((m = rest.match(/^(#\w+)/))) { tokens.push({ t: "pp", v: m[1] }); rest = rest.slice(m[1].length); continue; }
    if ((m = rest.match(/^([a-zA-Z_][a-zA-Z0-9_]*)/))) {
      const w = m[1];
      const cls = KW.has(w) ? (TYPES.has(w) ? "type" : "kw") : rest[w.length] === "(" ? "fn" : "plain";
      tokens.push({ t: cls, v: w }); rest = rest.slice(w.length); continue;
    }
    if ((m = rest.match(/^(\d+\.?\d*)/))) { tokens.push({ t: "num", v: m[1] }); rest = rest.slice(m[1].length); continue; }
    if ((m = rest.match(/^([<>=!&|+\-*/%^~?:,;])/))) { tokens.push({ t: "op", v: m[1] }); rest = rest.slice(1); continue; }
    tokens.push({ t: "plain", v: rest[0] }); rest = rest.slice(1);
  }
  return tokens;
}

function CodeLine({ tokens, lineNum, isExec, isHL }) {
  return (
    <div className={`code-line${isExec ? " executing" : isHL ? " highlighted" : ""}`}
      style={{ display: "flex", minHeight: "1.7em", lineHeight: "1.7em" }}>
      <span style={{ color: "#a0a0c0", userSelect: "none", minWidth: "2.8em", textAlign: "right", paddingRight: "1.2em", fontSize: 11, paddingTop: 2, flexShrink: 0, fontFamily: "var(--font-mono)" }}>{lineNum}</span>
      <span style={{ flex: 1 }}>
        {tokens.length ? tokens.map((tk, i) => (
          <span key={i} className={`tk-${tk.t}`}>{tk.v}</span>
        )) : "\u200b"}
      </span>
      {isExec && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--violet)", display: "inline-block", alignSelf: "center", marginRight: 8, animation: "glow-pulse 1s ease infinite", boxShadow: "0 0 8px var(--violet)" }} />}
    </div>
  );
}

function CodeBlock({ code, label = "C++", execLine = -1, hlLines = [] }) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const lines = code.split("\n");

  return (
    <div ref={ref} style={{ borderRadius: "var(--r-md)", overflow: "hidden", border: "1px solid rgba(140,160,255,0.2)", marginBottom: 16, boxShadow: "0 8px 32px rgba(99,102,241,0.1), 0 1px 0 rgba(255,255,255,0.7) inset", opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(12px)", transition: "all 0.5s var(--ease-smooth)" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(59,130,246,0.08))", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid rgba(140,160,255,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#ffbd2e", "#28ca41"].map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}60` }} />)}
          </div>
          <span style={{ color: "var(--ink3)", fontSize: 11.5, fontFamily: "var(--font-mono)", fontWeight: 500 }}>{label}</span>
        </div>
        <button onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
          style={{ background: copied ? "rgba(16,185,129,0.15)" : "rgba(99,102,241,0.1)", border: `1px solid ${copied ? "rgba(16,185,129,0.4)" : "rgba(140,160,255,0.3)"}`, borderRadius: 8, color: copied ? "var(--emerald)" : "var(--ink3)", fontSize: 11, padding: "4px 12px", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600, transition: "all 0.2s" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      {/* Code */}
      <div style={{ background: "rgba(248,250,255,0.9)", backdropFilter: "blur(8px)", padding: "12px 0", overflowX: "auto" }}>
        <code style={{ fontFamily: "var(--font-mono)", fontSize: 13, display: "block", padding: "0 8px" }}>
          {lines.map((line, i) => (
            <CodeLine key={i} tokens={tokenize(line)} lineNum={i + 1} isExec={execLine === i} isHL={hlLines.includes(i)} />
          ))}
        </code>
      </div>
    </div>
  );
}

// ── ANIMATED EXECUTION VISUALIZER ────────────────────────────────────────────
function ExecutionVisualizer({ steps, code, vars, title, accent = "#6366f1" }) {
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  const play = () => {
    if (playing) { clearInterval(intervalRef.current); setPlaying(false); return; }
    setStep(-1); setPlaying(true);
    let i = 0;
    intervalRef.current = setInterval(() => {
      setStep(i++);
      if (i >= steps.length) { clearInterval(intervalRef.current); setPlaying(false); }
    }, 900);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const cur = step >= 0 ? steps[step] : null;

  return (
    <div style={{ background: "var(--surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border2)", overflow: "hidden", marginTop: 14, boxShadow: "0 4px 20px rgba(99,102,241,0.08)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", background: `linear-gradient(135deg,${accent}15,${accent}08)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}80`, animation: playing ? "glow-pulse 1s ease infinite" : "none" }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", fontFamily: "var(--font-mono)" }}>{title || "Execution Trace"}</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--ink4)", fontFamily: "var(--font-mono)" }}>
            step {Math.max(0, step + 1)}/{steps.length}
          </span>
          <button onClick={play} style={{ background: playing ? `${accent}30` : `${accent}20`, border: `1px solid ${accent}50`, borderRadius: 8, color: accent, fontSize: 11, padding: "5px 14px", cursor: "pointer", fontWeight: 700, fontFamily: "var(--font-body)", transition: "all 0.2s" }}>
            {playing ? "⏸ Pause" : "▶ Run"}
          </button>
          <button onClick={() => { clearInterval(intervalRef.current); setStep(-1); setPlaying(false); }} style={{ background: "transparent", border: "1px solid var(--border2)", borderRadius: 8, color: "var(--ink4)", fontSize: 11, padding: "5px 12px", cursor: "pointer", fontFamily: "var(--font-body)" }}>
            ↺
          </button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {/* Code pane */}
        <div style={{ borderRight: "1px solid var(--border)", padding: "12px 0", background: "rgba(248,250,255,0.8)", overflowX: "auto" }}>
          <code style={{ fontFamily: "var(--font-mono)", fontSize: 12, display: "block", padding: "0 6px" }}>
            {code.split("\n").map((line, i) => (
              <CodeLine key={i} tokens={tokenize(line)} lineNum={i + 1} isExec={cur?.line === i} isHL={false} />
            ))}
          </code>
        </div>
        {/* State pane */}
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink4)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Variables</div>
          {cur ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {Object.entries(cur.vars || {}).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, animation: "slide-in-right 0.25s ease" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: accent, fontWeight: 600, minWidth: 40 }}>{k}</span>
                  <span style={{ color: "var(--ink4)", fontSize: 11 }}>=</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--ink)", background: `${accent}15`, padding: "2px 10px", borderRadius: 8, border: `1px solid ${accent}30` }}>{v}</span>
                </div>
              ))}
              {cur.note && (
                <div style={{ marginTop: 8, padding: "8px 12px", background: `${accent}10`, borderRadius: 10, border: `1px solid ${accent}25`, fontSize: 12, color: "var(--ink2)", lineHeight: 1.5, animation: "fadeIn 0.3s ease" }}>
                  💡 {cur.note}
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: "var(--ink4)", fontSize: 12, textAlign: "center", marginTop: 20 }}>Press Run to start execution trace</div>
          )}
        </div>
      </div>
      {/* Step track */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 4, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{ width: 28, height: 28, borderRadius: 8, border: `1.5px solid ${i === step ? accent : "var(--border2)"}`, background: i < step ? `${accent}25` : i === step ? accent : "transparent", color: i === step ? "#fff" : i < step ? accent : "var(--ink4)", fontSize: 10.5, cursor: "pointer", fontWeight: 700, transition: "all 0.2s", fontFamily: "var(--font-mono)" }}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── LOOP ANIMATION COMPONENT ──────────────────────────────────────────────────
function LoopAnimator({ type = "for", n = 5, accent = "#6366f1" }) {
  const [iter, setIter] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState(""); // init, check, body, update, exit
  const ref = useRef(null);

  const phases = type === "dowhile"
    ? ["body", "check", "body", "check", "body", "check", "exit"]
    : ["init", "check", "body", "update", "check", "body", "update", "check", "exit"];

  const phaseColors = { init: "#6366f1", check: "#f59e0b", body: "#10b981", update: "#3b82f6", exit: "#f43f5e" };

  const run = () => {
    if (playing) { clearInterval(ref.current); setPlaying(false); setIter(-1); setPhase(""); return; }
    setPlaying(true); setIter(-1);
    let p = 0; let i = 1;
    ref.current = setInterval(() => {
      const ph = phases[p];
      setPhase(ph);
      if (ph === "init") { setIter(0); }
      else if (ph === "body") { setIter(i); }
      else if (ph === "update") { i++; }
      else if (ph === "exit") { clearInterval(ref.current); setPlaying(false); setTimeout(() => { setIter(-1); setPhase(""); }, 1200); }
      p++;
      if (p >= phases.length) { clearInterval(ref.current); setPlaying(false); setIter(-1); setPhase(""); }
    }, 700);
  };

  useEffect(() => () => clearInterval(ref.current), []);

  const cells = Array.from({ length: n }, (_, i) => i + 1);

  return (
    <div style={{ background: "var(--surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border2)", padding: 20, marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", marginBottom: 3 }}>Loop Visualizer</div>
          <div style={{ display: "flex", gap: 6 }}>
            {Object.entries(phaseColors).map(([p, c]) => (
              <span key={p} style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: phase === p ? `${c}25` : "transparent", color: phase === p ? c : "var(--ink4)", border: `1px solid ${phase === p ? c : "transparent"}`, transition: "all 0.2s", fontFamily: "var(--font-mono)" }}>{p}</span>
            ))}
          </div>
        </div>
        <button onClick={run} style={{ background: playing ? "rgba(244,63,94,0.1)" : `${accent}20`, border: `1.5px solid ${playing ? "var(--rose)" : accent}`, borderRadius: 10, color: playing ? "var(--rose)" : accent, fontSize: 12, padding: "7px 18px", cursor: "pointer", fontWeight: 700, fontFamily: "var(--font-body)", transition: "all 0.2s" }}>
          {playing ? "⏹ Stop" : "▶ Animate"}
        </button>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        {cells.map((v, i) => {
          const isActive = iter === v;
          const isDone = iter > v;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, border: `2.5px solid ${isActive ? accent : isDone ? `${accent}60` : "var(--border2)"}`, background: isActive ? `${accent}20` : isDone ? `${accent}10` : "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.35s var(--ease-spring)", transform: isActive ? "scale(1.15) translateY(-3px)" : "scale(1)", boxShadow: isActive ? `0 8px 24px ${accent}40` : "none", fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: isActive ? accent : isDone ? `${accent}80` : "var(--ink4)" }}>
                {isDone ? "✓" : v}
              </div>
              <span style={{ fontSize: 9, color: isActive ? accent : "var(--ink4)", fontWeight: isActive ? 700 : 400 }}>i={v}</span>
            </div>
          );
        })}
        {phase === "exit" && (
          <div style={{ padding: "8px 16px", borderRadius: 10, background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", color: "var(--rose)", fontSize: 12, fontWeight: 700, animation: "bounce-in 0.3s ease" }}>Exit</div>
        )}
      </div>
      <div style={{ marginTop: 12, padding: "10px 14px", background: `${phaseColors[phase] || accent}10`, borderRadius: 10, border: `1px solid ${phaseColors[phase] || accent}25`, fontSize: 12.5, color: "var(--ink2)", lineHeight: 1.5, minHeight: 38, transition: "all 0.3s", fontWeight: 500 }}>
        {phase === "init" && "🔷 Initialization: i = 1 (runs once)"}
        {phase === "check" && `🟡 Condition check: i ≤ ${n} → ${iter <= n ? "true, enter body" : "false, exit loop"}`}
        {phase === "body" && `🟢 Executing body with i = ${iter}`}
        {phase === "update" && "🔵 Update: i++ (increment i)"}
        {phase === "exit" && "🔴 Loop complete — execution continues after loop"}
        {!phase && "Press Animate to visualize the loop execution step by step"}
      </div>
    </div>
  );
}

// ── FLOWCHART COMPONENTS ──────────────────────────────────────────────────────
function FlowIfElse() {
  return (
    <svg viewBox="0 0 400 320" style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gStart" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
        <linearGradient id="gTrue" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient>
        <linearGradient id="gFalse" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f43f5e" /><stop offset="100%" stopColor="#fb923c" /></linearGradient>
        <filter id="gf"><feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.15" /></filter>
        <marker id="ma" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill="#9ca3af" />
        </marker>
        <marker id="mb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill="#10b981" />
        </marker>
        <marker id="mc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill="#f43f5e" />
        </marker>
      </defs>
      <ellipse cx="200" cy="36" rx="64" ry="24" fill="url(#gStart)" filter="url(#gf)" />
      <text x="200" y="41" textAnchor="middle" fill="white" fontSize="13" fontFamily="Syne" fontWeight="700">START</text>
      <line x1="200" y1="60" x2="200" y2="90" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#ma)" />
      <polygon points="200,90 280,128 200,166 120,128" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="2" filter="url(#gf)" />
      <text x="200" y="124" textAnchor="middle" fill="#92400e" fontSize="12" fontFamily="Outfit" fontWeight="700">condition?</text>
      <text x="200" y="140" textAnchor="middle" fill="#f59e0b" fontSize="10.5">true / false</text>
      <line x1="120" y1="128" x2="70" y2="128" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#mb)" />
      <text x="94" y="120" textAnchor="middle" fill="#10b981" fontSize="10.5" fontWeight="700">true</text>
      <rect x="12" y="108" width="80" height="40" rx="12" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="2" filter="url(#gf)" />
      <text x="52" y="128" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="700">Block A</text>
      <text x="52" y="142" textAnchor="middle" fill="#10b981" fontSize="10">runs</text>
      <line x1="280" y1="128" x2="330" y2="128" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#mc)" />
      <text x="308" y="120" textAnchor="middle" fill="#f43f5e" fontSize="10.5" fontWeight="700">false</text>
      <rect x="308" y="108" width="80" height="40" rx="12" fill="rgba(244,63,94,0.1)" stroke="#f43f5e" strokeWidth="2" filter="url(#gf)" />
      <text x="348" y="128" textAnchor="middle" fill="#9f1239" fontSize="12" fontWeight="700">Block B</text>
      <text x="348" y="142" textAnchor="middle" fill="#f43f5e" fontSize="10">runs</text>
      <line x1="52" y1="148" x2="52" y2="248" stroke="#10b981" strokeWidth="1.5" />
      <line x1="52" y1="248" x2="185" y2="248" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="348" y1="148" x2="348" y2="248" stroke="#f43f5e" strokeWidth="1.5" />
      <line x1="348" y1="248" x2="215" y2="248" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="200" y1="248" x2="200" y2="270" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#ma)" />
      <ellipse cx="200" cy="292" rx="64" ry="24" fill="url(#gStart)" filter="url(#gf)" />
      <text x="200" y="297" textAnchor="middle" fill="white" fontSize="13" fontFamily="Syne" fontWeight="700">END</text>
    </svg>
  );
}

function FlowForLoop() {
  return (
    <svg viewBox="0 0 360 400" style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gfl" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
        <filter id="gff"><feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.12" /></filter>
        <marker id="mf1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9ca3af" /></marker>
        <marker id="mf2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#10b981" /></marker>
        <marker id="mf3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#f43f5e" /></marker>
      </defs>
      <ellipse cx="180" cy="30" rx="64" ry="24" fill="url(#gfl)" filter="url(#gff)" />
      <text x="180" y="35" textAnchor="middle" fill="white" fontSize="13" fontFamily="Syne" fontWeight="700">START</text>
      <line x1="180" y1="54" x2="180" y2="78" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#mf1)" />
      <rect x="112" y="78" width="136" height="38" rx="12" fill="rgba(99,102,241,0.1)" stroke="#6366f1" strokeWidth="2" filter="url(#gff)" />
      <text x="180" y="98" textAnchor="middle" fill="#3730a3" fontSize="12" fontWeight="700">int i = 1</text>
      <text x="180" y="110" textAnchor="middle" fill="#6366f1" fontSize="10">initialization</text>
      <line x1="180" y1="116" x2="180" y2="140" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#mf1)" />
      <polygon points="180,140 256,176 180,212 104,176" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="2" filter="url(#gff)" />
      <text x="180" y="173" textAnchor="middle" fill="#92400e" fontSize="11.5" fontWeight="700">i ≤ n?</text>
      <text x="180" y="187" textAnchor="middle" fill="#f59e0b" fontSize="10">condition</text>
      <line x1="180" y1="212" x2="180" y2="236" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#mf2)" />
      <text x="194" y="228" fill="#10b981" fontSize="10" fontWeight="700">true</text>
      <rect x="112" y="236" width="136" height="40" rx="12" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="2" filter="url(#gff)" />
      <text x="180" y="256" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="700">Execute body</text>
      <text x="180" y="269" textAnchor="middle" fill="#10b981" fontSize="10">cout &lt;&lt; i</text>
      <line x1="180" y1="276" x2="180" y2="300" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#mf1)" />
      <rect x="112" y="300" width="136" height="36" rx="12" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="2" filter="url(#gff)" />
      <text x="180" y="320" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="700">i++</text>
      <text x="180" y="330" textAnchor="middle" fill="#3b82f6" fontSize="10">increment</text>
      <path d="M112 318 Q62 318 62 176 Q62 140 102 140" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#mf1)" />
      <line x1="256" y1="176" x2="320" y2="176" stroke="#f43f5e" strokeWidth="1.5" />
      <line x1="320" y1="176" x2="320" y2="358" stroke="#f43f5e" strokeWidth="1.5" />
      <line x1="320" y1="358" x2="246" y2="358" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#mf1)" />
      <text x="296" y="168" textAnchor="middle" fill="#f43f5e" fontSize="10.5" fontWeight="700">false</text>
      <ellipse cx="192" cy="358" rx="64" ry="24" fill="url(#gfl)" filter="url(#gff)" />
      <text x="192" y="363" textAnchor="middle" fill="white" fontSize="13" fontFamily="Syne" fontWeight="700">END</text>
    </svg>
  );
}

// ── TIP BOX ───────────────────────────────────────────────────────────────────
function TipBox({ tips, accent = "#6366f1" }) {
  return (
    <div style={{ background: `${accent}08`, borderRadius: "var(--r-md)", padding: "16px 18px", marginTop: 14, border: `1px solid ${accent}25` }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
        <span>⚡</span> Key Concepts
      </div>
      {tips.map((t, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < tips.length - 1 ? 9 : 0, animation: `fadeUp 0.3s ${i * 0.06}s both` }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, background: `${accent}20`, border: `1px solid ${accent}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            <span style={{ fontSize: 9, color: accent, fontWeight: 800 }}>{i + 1}</span>
          </div>
          <span style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.55 }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

// ── AUTH SCREEN ───────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);

  const calcStrength = (p) => {
    let s = 0;
    if (p.length >= 6) s++;
    if (p.match(/[A-Z]/)) s++;
    if (p.match(/[0-9]/)) s++;
    if (p.match(/[^a-zA-Z0-9]/)) s++;
    setStrength(s);
  };

  const validate = () => {
    const e = {};
    if (mode === "signup" && form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email address";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setLoading(true);
    setTimeout(() => {
      const name = mode === "login" ? form.email.split("@")[0] : form.name;
      onAuth({ name: name.charAt(0).toUpperCase() + name.slice(1), email: form.email });
    }, 1400);
  };

  const strColors = ["#f43f5e", "#f59e0b", "#3b82f6", "#10b981"];
  const strLabels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "var(--bg)", backgroundImage: "radial-gradient(ellipse at 20% 0%,rgba(99,102,241,0.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 100%,rgba(59,130,246,0.12) 0%,transparent 50%)" }}>
      {/* Floating orbs */}
      <div style={{ position: "fixed", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)", pointerEvents: "none", animation: "float 6s ease-in-out infinite" }} />
      <div style={{ position: "fixed", bottom: "10%", right: "5%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)", pointerEvents: "none", animation: "float 8s ease-in-out infinite reverse" }} />

      <div style={{ width: "100%", maxWidth: 940, display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: "var(--r-xl)", overflow: "hidden", boxShadow: "0 32px 80px rgba(99,102,241,0.18), 0 4px 24px rgba(0,0,0,0.06)", border: "1px solid rgba(140,160,255,0.25)" }} className="two-col">
        {/* Left */}
        <div style={{ background: "linear-gradient(145deg,#1e1b4b 0%,#312e81 40%,#1e3a8a 100%)", padding: "52px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: -80, left: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 52 }}>
              <div style={{ width: 42, height: 42, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}>
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 20, fontFamily: "var(--font-display)" }}>C</span>
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "var(--font-display)", letterSpacing: "-.01em" }}>C++ Mastery</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>Interactive Learning Platform</div>
              </div>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 16, letterSpacing: "-.02em" }}>
              Control the<br />
              <span style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>flow of code</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14.5, lineHeight: 1.7, maxWidth: 300 }}>
              Master selection, iteration, and jump statements through cinematic visualizations and interactive demos.
            </p>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
            {[["🎯", "Interactive Code Demos", "Watch code execute step by step"], ["🎨", "Animated Flowcharts", "Visual flow diagrams for every concept"], ["🏆", "Quiz & Exam Mode", "Test your knowledge with instant feedback"]].map(([icon, t, d]) => (
              <div key={t} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 13.5 }}>{t}</div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(32px)", padding: "52px 44px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "var(--ink)", marginBottom: 5 }}>
              {mode === "login" ? "Welcome back 👋" : "Create account ✨"}
            </h2>
            <p style={{ color: "var(--ink3)", fontSize: 13.5 }}>
              {mode === "login" ? "Sign in to continue your learning journey" : "Join thousands of learners today"}
            </p>
          </div>

          <div style={{ display: "flex", background: "rgba(99,102,241,0.06)", borderRadius: 14, padding: 4, marginBottom: 16 }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setErrors({}); }}
                style={{ flex: 1, padding: "9px 0", borderRadius: 11, border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.25s var(--ease-spring)", background: mode === m ? "#fff" : "transparent", color: mode === m ? "var(--violet)" : "var(--ink3)", boxShadow: mode === m ? "0 4px 16px rgba(99,102,241,0.15)" : "none" }}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "signup" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink2)" }}>Full Name</label>
                <input className={`inp${errors.name ? " error" : ""}`} placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onKeyDown={e => e.key === "Enter" && submit()} />
                {errors.name && <span style={{ fontSize: 11.5, color: "var(--rose)", fontWeight: 600 }}>{errors.name}</span>}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink2)" }}>Email</label>
              <input className={`inp${errors.email ? " error" : ""}`} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} onKeyDown={e => e.key === "Enter" && submit()} />
              {errors.email && <span style={{ fontSize: 11.5, color: "var(--rose)", fontWeight: 600 }}>{errors.email}</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink2)" }}>Password</label>
              <input className={`inp${errors.password ? " error" : ""}`} type="password" placeholder="At least 6 characters" value={form.password} onChange={e => { setForm(p => ({ ...p, password: e.target.value })); calcStrength(e.target.value); }} onKeyDown={e => e.key === "Enter" && submit()} />
              {form.password && (
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 4 }}>
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i < strength ? strColors[strength - 1] : "rgba(99,102,241,0.15)", transition: "background 0.3s" }} />
                  ))}
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: strColors[strength - 1] || "var(--ink4)", marginLeft: 4, minWidth: 38 }}>{strLabels[strength - 1] || ""}</span>
                </div>
              )}
              {errors.password && <span style={{ fontSize: 11.5, color: "var(--rose)", fontWeight: 600 }}>{errors.password}</span>}
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: "100%", marginTop: 20, padding: 14, fontSize: 15 }} onClick={submit}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ width: 16, height: 16, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                {mode === "login" ? "Signing in..." : "Creating account..."}
              </span>
            ) : (mode === "login" ? "Sign In →" : "Create Account →")}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border2)" }} />
            <span style={{ fontSize: 11.5, color: "var(--ink4)", fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: 1, background: "var(--border2)" }} />
          </div>

          <button onClick={() => onAuth({ name: "Explorer", email: "guest@example.com" })} className="btn btn-ghost" style={{ width: "100%", padding: 12, fontSize: 14 }}>
            Continue as Guest →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── TOPICS ────────────────────────────────────────────────────────────────────
const TOPICS = [
  { id: "if", label: "if-else", cat: "Selection", accent: "#10b981", g: "var(--emerald-g)" },
  { id: "elif", label: "if-else-if", cat: "Selection", accent: "#3b82f6", g: "var(--azure-g)" },
  { id: "nested", label: "Nested if", cat: "Selection", accent: "#6366f1", g: "var(--violet-g)" },
  { id: "switch", label: "switch", cat: "Selection", accent: "#f43f5e", g: "var(--rose-g)" },
  { id: "for", label: "for Loop", cat: "Iteration", accent: "#3b82f6", g: "var(--azure-g)" },
  { id: "while", label: "while Loop", cat: "Iteration", accent: "#10b981", g: "var(--emerald-g)" },
  { id: "dowhile", label: "do-while", cat: "Iteration", accent: "#6366f1", g: "var(--violet-g)" },
  { id: "nested2", label: "Nested Loops", cat: "Iteration", accent: "#f59e0b", g: "var(--amber-g)" },
  { id: "jump", label: "Jump Statements", cat: "Jump", accent: "#f43f5e", g: "var(--rose-g)" },
  { id: "quiz", label: "Quiz", cat: "Assess", accent: "#f59e0b", g: "var(--amber-g)" },
  { id: "exam", label: "Exam", cat: "Assess", accent: "#6366f1", g: "var(--violet-g)" },
];

// ── QUIZ DATA ─────────────────────────────────────────────────────────────────
const QUIZ_QS = [
  { q: "What does `break` do inside a loop?", opts: ["Skips to next iteration", "Exits the entire loop", "Restarts the loop", "Exits the function"], ans: 1, exp: "break immediately terminates the enclosing loop — execution continues after the loop body." },
  { q: "Which loop is guaranteed to execute at least once?", opts: ["for loop", "while loop", "do-while loop", "nested loop"], ans: 2, exp: "do-while checks its condition AFTER the body executes, so the body always runs at least once." },
  { q: "In `for(int i=0; i<5; i++)`, how many times does the body run?", opts: ["4", "5", "6", "Depends"], ans: 1, exp: "i takes values 0,1,2,3,4 — that's exactly 5 iterations before i<5 becomes false." },
  { q: "Which is NOT a valid jump statement in C++?", opts: ["break", "continue", "goto", "skip"], ans: 3, exp: "`skip` doesn't exist in C++. Valid jump statements are: break, continue, goto, and return." },
  { q: "What happens when you omit `break` in a switch case?", opts: ["Compile error", "Infinite loop", "Fall-through to next case", "Nothing different"], ans: 2, exp: "Without break, execution falls through into the next case's code — this is called fall-through behavior." },
  { q: "Which is best for testing one variable against many constants?", opts: ["if-else ladder", "for loop", "switch statement", "while loop"], ans: 2, exp: "switch is optimized for multi-way branching on a single integral expression against constant values." },
  { q: "Output of: `for(int i=1;i<=3;i++) cout<<i<<' ';`", opts: ["1 2 3 4", "1 2 3 ", "1 2 ", "0 1 2 3"], ans: 1, exp: "The loop runs for i=1, i=2, i=3, printing each with a trailing space: '1 2 3 '" },
  { q: "A `while` loop checks its condition:", opts: ["Never", "After each iteration", "Before each iteration", "Only once"], ans: 2, exp: "while is entry-controlled — the condition is evaluated BEFORE each iteration begins." },
  { q: "What does `continue` do in a loop?", opts: ["Exits the loop", "Jumps to next case", "Skips remaining body, next iteration", "Restarts from beginning"], ans: 2, exp: "continue skips the rest of the current iteration and proceeds directly to the next iteration." },
  { q: "Which exits a function and optionally returns a value?", opts: ["break", "exit", "return", "end"], ans: 2, exp: "return exits the current function, optionally passing a value back to the caller." },
];

const EXAM_QS = [
  ...QUIZ_QS,
  { q: "In `do{...}while(x<5)`, if x starts at 10:", opts: ["0 times", "1 time", "5 times", "10 times"], ans: 1, exp: "do-while executes the body once before checking, so even x=10 failing x<5, the body runs exactly once." },
  { q: "Nested loops outer=3, inner=4 produce total iterations:", opts: ["7", "12", "34", "43"], ans: 1, exp: "Total = outer × inner = 3 × 4 = 12. Each outer step triggers all inner steps." },
  { q: "Which is NOT valid in a switch expression?", opts: ["int x", "char c", "float f", "enum e"], ans: 2, exp: "switch works only with integral types (int, char, enum). float and double are not allowed." },
  { q: "`goto` is generally considered:", opts: ["Best practice", "Required for loops", "Harmful — avoid", "Modern standard"], ans: 2, exp: "goto makes code hard to follow and debug. Modern C++ uses structured control flow (loops, functions) instead." },
  { q: "An if with no else, when condition is false:", opts: ["Throws error", "Executes nothing", "Loops back", "Exits program"], ans: 1, exp: "With no else block, a false condition simply skips the if body entirely — nothing happens." },
];

// ── QUIZ COMPONENT ────────────────────────────────────────────────────────────
function Confetti() {
  const colors = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#f43f5e", "#ec4899"];
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1000 }}>
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: "-20px", width: 8, height: 8, borderRadius: Math.random() > 0.5 ? "50%" : 2, background: colors[i % colors.length], animation: `confetti-fall ${1.5 + Math.random() * 2}s ${Math.random() * 1.5}s ease-in both` }} />
      ))}
    </div>
  );
}

function QuizSection({ questions, title, isExam = false }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(isExam ? questions.length * 45 : null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isExam || done) return;
    const t = setInterval(() => setTimeLeft(p => { if (p <= 1) { setDone(true); return 0; } return p - 1; }), 1000);
    return () => clearInterval(t);
  }, [isExam, done]);

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(() => {
      const newAns = [...answers, { chosen: i, correct: i === questions[current].ans }];
      setAnswers(newAns);
      if (current + 1 >= questions.length) {
        setDone(true);
        const pct = Math.round(newAns.filter(a => a.correct).length / questions.length * 100);
        if (pct >= 70) setShowConfetti(true);
      } else { setCurrent(c => c + 1); setSelected(null); }
    }, isExam ? 350 : 1100);
  };

  const reset = () => { setCurrent(0); setSelected(null); setAnswers([]); setDone(false); setTimeLeft(isExam ? questions.length * 45 : null); setShowConfetti(false); };

  if (done) {
    const score = answers.filter(a => a.correct).length;
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : pct >= 60 ? "D" : "F";
    const gColor = pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#f43f5e";
    const circ = 2 * Math.PI * 54;

    return (
      <div style={{ padding: "32px 28px", animation: "fadeUp 0.5s ease" }}>
        {showConfetti && <Confetti />}
        <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: 8, fontSize: 14, color: "var(--ink3)", fontWeight: 500 }}>
            {isExam ? "📋 Exam" : "🎯 Quiz"} Complete
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: "var(--ink)", marginBottom: 28 }}>
            {pct >= 80 ? "Excellent work! 🎉" : pct >= 60 ? "Good effort! 💪" : "Keep studying! 📚"}
          </h2>

          {/* Score ring */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 32 }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="10" />
              <circle cx="70" cy="70" r="54" fill="none" stroke={gColor} strokeWidth="10"
                strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} strokeLinecap="round"
                transform="rotate(-90 70 70)" style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 8px ${gColor}60)` }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 900, color: gColor, lineHeight: 1 }}>{pct}%</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: gColor }}>Grade {grade}</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
            {[[score, "✓ Correct", "#10b981"], [questions.length - score, "✗ Wrong", "#f43f5e"], [questions.length, "Total", "#6366f1"]].map(([v, l, c]) => (
              <div key={l} className="glass-sm" style={{ padding: "16px 10px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 900, color: c }}>{v}</div>
                <div style={{ fontSize: 12, color: "var(--ink3)", fontWeight: 600, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Achievement badge */}
          {pct >= 90 && (
            <div style={{ marginBottom: 24, padding: "16px 24px", borderRadius: 20, background: "linear-gradient(135deg,rgba(245,158,11,0.1),rgba(251,191,36,0.15))", border: "1.5px solid rgba(245,158,11,0.4)", animation: "bounce-in 0.5s var(--ease-spring)" }}>
              <div style={{ fontSize: 28 }}>🏆</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#92400e", fontFamily: "var(--font-display)" }}>Master Achievement!</div>
              <div style={{ fontSize: 12.5, color: "#b45309" }}>You scored 90%+ — Outstanding!</div>
            </div>
          )}

          <div style={{ textAlign: "left", marginBottom: 28 }}>
            {answers.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, marginBottom: 6, background: a.correct ? "rgba(16,185,129,0.08)" : "rgba(244,63,94,0.06)", border: `1px solid ${a.correct ? "rgba(16,185,129,0.2)" : "rgba(244,63,94,0.15)"}`, animation: `fadeUp 0.3s ${i * 0.04}s both` }}>
                <span style={{ width: 22, height: 22, borderRadius: 8, background: a.correct ? "#10b981" : "#f43f5e", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{a.correct ? "✓" : "✗"}</span>
                <span style={{ fontSize: 12.5, color: "var(--ink2)", flex: 1 }}>{questions[i].q.substring(0, 58)}...</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: a.correct ? "#10b981" : "#f43f5e" }}>{a.correct ? "Correct" : "Wrong"}</span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary" style={{ padding: "13px 40px", fontSize: 15 }} onClick={reset}>Try Again ↺</button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  return (
    <div style={{ padding: "32px 28px", animation: "fadeUp 0.4s ease" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink)", fontWeight: 800 }}>{title}</h2>
            <span style={{ fontSize: 12, color: "var(--ink3)", fontWeight: 500 }}>Question {current + 1} of {questions.length}</span>
          </div>
          {isExam && timeLeft !== null && (
            <div style={{ padding: "10px 18px", borderRadius: 14, background: timeLeft < 60 ? "rgba(244,63,94,0.1)" : "rgba(99,102,241,0.08)", border: `1.5px solid ${timeLeft < 60 ? "rgba(244,63,94,0.4)" : "rgba(99,102,241,0.2)"}`, textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: timeLeft < 60 ? "#f43f5e" : "#6366f1" }}>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 10, color: "var(--ink4)" }}>remaining</div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div style={{ height: 5, background: "rgba(99,102,241,0.1)", borderRadius: 99, marginBottom: 28, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#6366f1,#3b82f6)", width: `${progress}%`, transition: "width 0.5s var(--ease-smooth)", boxShadow: "0 0 10px rgba(99,102,241,0.5)" }} />
        </div>

        <div className="glass" style={{ padding: "24px 28px", marginBottom: 20 }}>
          <p style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", lineHeight: 1.65 }}>{q.q}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {q.opts.map((opt, i) => {
            let cls = "q-option";
            if (selected !== null) {
              cls += " dis";
              if (i === q.ans) cls += " correct";
              else if (i === selected && i !== q.ans) cls += " wrong";
            }
            return (
              <div key={i} className={cls} onClick={() => choose(i)}>
                <div style={{ width: 30, height: 30, borderRadius: 10, background: selected === null ? "rgba(99,102,241,0.08)" : i === q.ans ? "#10b981" : i === selected ? "#f43f5e" : "rgba(99,102,241,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.25s", border: `1.5px solid ${selected !== null && (i === q.ans || i === selected) ? "transparent" : "var(--border2)"}` }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: selected !== null && (i === q.ans || i === selected) ? "#fff" : "var(--ink3)", fontFamily: "var(--font-mono)" }}>
                    {selected !== null ? (i === q.ans ? "✓" : i === selected ? "✗" : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                  </span>
                </div>
                <span style={{ fontSize: 14, color: "var(--ink2)", fontWeight: selected !== null && i === q.ans ? 700 : 400 }}>{opt}</span>
              </div>
            );
          })}
        </div>

        {selected !== null && !isExam && (
          <div style={{ padding: "16px 20px", borderRadius: 16, background: selected === q.ans ? "rgba(16,185,129,0.08)" : "rgba(244,63,94,0.06)", border: `1.5px solid ${selected === q.ans ? "rgba(16,185,129,0.3)" : "rgba(244,63,94,0.25)"}`, animation: "fadeIn 0.3s ease" }}>
            <div style={{ fontWeight: 800, color: selected === q.ans ? "#10b981" : "#f43f5e", fontSize: 13.5, marginBottom: 5, display: "flex", alignItems: "center", gap: 6 }}>
              {selected === q.ans ? "✅ Correct!" : "❌ Incorrect"}
            </div>
            <p style={{ fontSize: 13.5, color: "var(--ink2)", lineHeight: 1.65, margin: 0 }}>{q.exp}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CONTENT SECTIONS ──────────────────────────────────────────────────────────
function SectionHeader({ title, badge, accent }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "var(--ink)", letterSpacing: "-.01em" }}>{title}</h2>
      <span className="pill" style={{ background: `${accent}18`, color: accent, border: `1.5px solid ${accent}40` }}>{badge}</span>
    </div>
  );
}

function DemoPanel({ title, children, accent }) {
  return (
    <div style={{ border: `1.5px solid ${accent}30`, borderRadius: "var(--r-md)", overflow: "hidden", marginTop: 14 }}>
      <div style={{ padding: "11px 16px", background: `${accent}10`, borderBottom: `1px solid ${accent}20`, fontSize: 13, fontWeight: 800, color: accent, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
        {title}
      </div>
      <div style={{ padding: "18px 20px", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)" }}>{children}</div>
    </div>
  );
}

function ResultBubble({ val, accent }) {
  if (!val) return null;
  return (
    <div style={{ marginTop: 10, padding: "10px 16px", borderRadius: 12, background: `${accent}12`, border: `1.5px solid ${accent}35`, fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: accent, animation: "fadeIn 0.25s ease" }}>
      → {val}
    </div>
  );
}

function FlowCard({ title, children, accent }) {
  return (
    <div className="glass-sm" style={{ overflow: "hidden" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", background: `${accent}08`, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}80` }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>{title}</span>
      </div>
      <div style={{ padding: "16px 14px", background: "rgba(248,250,255,0.7)" }}>{children}</div>
    </div>
  );
}

// ── SECTION: IF-ELSE ──────────────────────────────────────────────────────────
function IfElse() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState("");
  const accent = "#10b981";
  const check = () => {
    const n = parseInt(num);
    if (isNaN(n)) return setResult("Please enter a valid integer");
    setResult(n > 0 ? `${n} is Positive (n > 0)` : n < 0 ? `${n} is Negative (n < 0)` : "Zero — exactly 0");
  };
  const execSteps = [
    { line: 0, vars: { num: "7" }, note: "Variable num is declared and assigned" },
    { line: 2, vars: { num: "7" }, note: "Condition check: is 7 > 0? → true" },
    { line: 3, vars: { num: "7", result: '"Positive"' }, note: "Block A executes, prints Positive" },
    { line: 8, vars: { num: "7", result: '"Positive"' }, note: "else and else-if blocks are skipped" },
  ];
  return (
    <div style={{ padding: "32px 28px", animation: "fadeUp 0.5s ease" }}>
      <SectionHeader title="if-else Statement" badge="Selection" accent={accent} />
      <p style={{ color: "var(--ink3)", fontSize: 14, lineHeight: 1.75, marginBottom: 26, maxWidth: 620 }}>
        The most fundamental decision-making construct. The <code style={{ fontFamily: "var(--font-mono)", background: `${accent}12`, padding: "1px 7px", borderRadius: 6, color: accent, fontSize: 12.5 }}>if</code> block runs when the condition is true; the optional <code style={{ fontFamily: "var(--font-mono)", background: `${accent}12`, padding: "1px 7px", borderRadius: 6, color: accent, fontSize: 12.5 }}>else</code> handles the false case. Only one branch ever executes.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
        <div>
          <CodeBlock accent={accent} label="if-else — syntax & example" code={`if (condition) {
    // runs when condition is true
} else {
    // runs when condition is false
}

// Practical: number classifier
int num = 7;
if (num > 0) {
    cout << "Positive";
} else if (num < 0) {
    cout << "Negative";
} else {
    cout << "Zero";
}
// Output: Positive`} />
          <DemoPanel title="Live Demo — Number Classifier" accent={accent}>
            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <input className="inp" style={{ flex: 1 }} type="number" placeholder="Enter any integer..." value={num} onChange={e => setNum(e.target.value)} onKeyDown={e => e.key === "Enter" && check()} />
              <button className="btn btn-run" onClick={check}>Run</button>
            </div>
            <ResultBubble val={result} accent={accent} />
          </DemoPanel>
        </div>
        <div>
          <FlowCard title="if-else control flow" accent={accent}><FlowIfElse /></FlowCard>
          <ExecutionVisualizer accent={accent} title="Execution trace" code={`int num = 7;
// Check first condition
if (num > 0) {
    cout << "Positive";
} else if (num < 0) {
    cout << "Negative";
} else {
    cout << "Zero";
}`} steps={execSteps} />
          <TipBox accent={accent} tips={["The else block is optional — omitting it means nothing runs on false", "Conditions can use &&, ||, ! to combine multiple tests", "Always use curly braces even for single-statement blocks"]} />
        </div>
      </div>
    </div>
  );
}

// ── SECTION: IF-ELSE-IF ───────────────────────────────────────────────────────
function IfElseIf() {
  const [score, setScore] = useState("");
  const [result, setResult] = useState("");
  const accent = "#3b82f6";
  const calc = () => {
    const s = parseInt(score);
    if (isNaN(s) || s < 0 || s > 100) return setResult("Enter a score 0–100");
    setResult(s >= 90 ? "A — Excellent! 🌟" : s >= 80 ? "B — Very Good! ✨" : s >= 70 ? "C — Good 👍" : s >= 60 ? "D — Below Average" : "F — Please review");
  };
  return (
    <div style={{ padding: "32px 28px", animation: "fadeUp 0.5s ease" }}>
      <SectionHeader title="if-else-if Ladder" badge="Selection" accent={accent} />
      <p style={{ color: "var(--ink3)", fontSize: 14, lineHeight: 1.75, marginBottom: 26, maxWidth: 620 }}>
        Chain multiple conditions vertically. Evaluation happens top-to-bottom — the first matching branch executes, then all remaining branches are skipped entirely.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
        <div>
          <CodeBlock accent={accent} label="Grade calculator" code={`int score = 85;
string grade;

if (score >= 90) {
    grade = "A";    // Excellent
} else if (score >= 80) {
    grade = "B";    // Very Good  ← hits here
} else if (score >= 70) {
    grade = "C";    // Good
} else if (score >= 60) {
    grade = "D";    // Below avg
} else {
    grade = "F";    // Fail
}
// grade = "B" (85 >= 80 is first true)`} />
          <DemoPanel title="Grade Calculator" accent={accent}>
            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <input className="inp" style={{ flex: 1 }} type="number" placeholder="Score 0–100..." value={score} onChange={e => setScore(e.target.value)} onKeyDown={e => e.key === "Enter" && calc()} />
              <button className="btn btn-run" onClick={calc} style={{ background: "var(--azure-g)" }}>Check</button>
            </div>
            <ResultBubble val={result} accent={accent} />
            <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
              {[["90+", "A", "#10b981"], ["80–89", "B", "#3b82f6"], ["70–79", "C", "#6366f1"], ["60–69", "D", "#f59e0b"], ["<60", "F", "#f43f5e"]].map(([r, g, c]) => (
                <span key={g} className="pill" style={{ background: `${c}15`, color: c, border: `1px solid ${c}30` }}>{r} = {g}</span>
              ))}
            </div>
          </DemoPanel>
        </div>
        <div>
          <FlowCard title="Ladder execution — top to bottom" accent={accent}>
            <svg width="100%" viewBox="0 0 260 280" xmlns="http://www.w3.org/2000/svg">
              {[["score >= 90?", "A", "#10b981", 20], ["score >= 80?", "B", "#3b82f6", 90], ["score >= 70?", "C", "#6366f1", 160], ["else", "F", "#f43f5e", 230]].map(([c, o, col, y], i) => (
                <g key={i}>
                  <rect x="10" y={y} width="100" height="30" rx="8" fill={`${col}10`} stroke={col} strokeWidth="1.5" />
                  <text x="60" y={y + 19} textAnchor="middle" fill="var(--ink2)" fontSize="10.5" fontFamily="Outfit" fontWeight="700">{c}</text>
                  <line x1="110" y1={y + 15} x2="138" y2={y + 15} stroke={col} strokeWidth="1.5" markerEnd="url(#ma)" />
                  <rect x="140" y={y} width="106" height="30" rx="8" fill={`${col}18`} stroke={col} strokeWidth="1.5" />
                  <text x="193" y={y + 19} textAnchor="middle" fill="var(--ink2)" fontSize="10.5" fontFamily="Outfit" fontWeight="700">{`Grade ${o}`}</text>
                  {i < 3 && <line x1="60" y1={y + 30} x2="60" y2={y + 60} stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#ma)" />}
                </g>
              ))}
              <text x="60" y="280" textAnchor="middle" fill="var(--ink4)" fontSize="9" fontFamily="Outfit">↓ evaluated top to bottom</text>
            </svg>
          </FlowCard>
          <TipBox accent={accent} tips={["Only the FIRST matching branch runs — rest are ignored", "Place the most specific/restrictive condition first", "A final else acts as a catch-all safety net"]} />
        </div>
      </div>
    </div>
  );
}

// ── SECTION: NESTED IF ────────────────────────────────────────────────────────
function NestedIf() {
  const [val, setVal] = useState("");
  const [result, setResult] = useState("");
  const accent = "#6366f1";
  return (
    <div style={{ padding: "32px 28px", animation: "fadeUp 0.5s ease" }}>
      <SectionHeader title="Nested if Statement" badge="Selection" accent={accent} />
      <p style={{ color: "var(--ink3)", fontSize: 14, lineHeight: 1.75, marginBottom: 26, maxWidth: 620 }}>
        An if placed inside another if block. The inner condition only evaluates when the outer condition is true — enabling multi-layered, compound decision logic.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
        <div>
          <CodeBlock accent={accent} label="Nested if — positive + parity" code={`int num = 4;

if (num > 0) {           // outer: positive?
    cout << "Positive";
    if (num % 2 == 0) {  // inner: even?
        cout << " & Even";
    } else {
        cout << " & Odd";
    }
} else if (num < 0) {
    cout << "Negative";
} else {
    cout << "Zero";
}
// num=4  → "Positive & Even"
// num=7  → "Positive & Odd"
// num=-3 → "Negative"`} />
          <DemoPanel title="Positive + Parity Checker" accent={accent}>
            <input className="inp" type="number" placeholder="Enter any number..." value={val}
              onChange={e => {
                setVal(e.target.value);
                const n = parseInt(e.target.value);
                if (isNaN(n)) return setResult("");
                if (n > 0 && n % 2 === 0) setResult(`${n} → Positive AND Even`);
                else if (n > 0) setResult(`${n} → Positive but Odd`);
                else if (n < 0) setResult(`${n} → Negative`);
                else setResult("Zero");
              }} />
            <ResultBubble val={result} accent={accent} />
          </DemoPanel>
        </div>
        <div>
          <FlowCard title="Decision tree — nested conditions" accent={accent}>
            <svg width="100%" viewBox="0 0 290 270" xmlns="http://www.w3.org/2000/svg">
              <polygon points="145,18 210,50 145,82 80,50" fill="rgba(99,102,241,0.1)" stroke="#6366f1" strokeWidth="1.8" />
              <text x="145" y="47" textAnchor="middle" fill="var(--ink2)" fontSize="10.5" fontFamily="Outfit" fontWeight="700">num &gt; 0?</text>
              <text x="145" y="61" textAnchor="middle" fill="#6366f1" fontSize="10">outer if</text>
              <line x1="210" y1="50" x2="250" y2="50" stroke="#f43f5e" strokeWidth="1.5" />
              <rect x="250" y="36" width="36" height="28" rx="6" fill="rgba(244,63,94,0.1)" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="268" y="54" textAnchor="middle" fill="#f43f5e" fontSize="9.5" fontWeight="700">Neg.</text>
              <text x="228" y="43" fill="#f43f5e" fontSize="9.5" fontWeight="700">false</text>
              <line x1="80" y1="50" x2="40" y2="50" stroke="#10b981" strokeWidth="1.5" />
              <line x1="40" y1="50" x2="40" y2="112" stroke="#10b981" strokeWidth="1.5" />
              <text x="58" y="43" fill="#10b981" fontSize="9.5" fontWeight="700">true</text>
              <polygon points="40,112 100,140 40,168 -20,140" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="1.8" />
              <text x="40" y="137" textAnchor="middle" fill="var(--ink2)" fontSize="10" fontFamily="Outfit" fontWeight="700">%2 == 0?</text>
              <text x="40" y="151" textAnchor="middle" fill="#f59e0b" fontSize="10">inner if</text>
              <line x1="100" y1="140" x2="136" y2="140" stroke="#f43f5e" strokeWidth="1.5" />
              <rect x="136" y="126" width="44" height="28" rx="6" fill="rgba(244,63,94,0.1)" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="158" y="144" textAnchor="middle" fill="#f43f5e" fontSize="9.5" fontWeight="700">Odd</text>
              <text x="120" y="133" fill="#f43f5e" fontSize="9.5" fontWeight="700">false</text>
              <line x1="40" y1="168" x2="40" y2="196" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="52" y="188" fill="#3b82f6" fontSize="9.5" fontWeight="700">true</text>
              <rect x="10" y="196" width="60" height="28" rx="6" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="40" y="214" textAnchor="middle" fill="#3b82f6" fontSize="10.5" fontWeight="700">Even</text>
            </svg>
          </FlowCard>
          <TipBox accent={accent} tips={["Inner conditions only evaluate when outer is true", "Limit nesting to 2–3 levels — use functions for deeper logic", "Guard clauses (early returns) can often reduce nesting"]} />
        </div>
      </div>
    </div>
  );
}

// ── SECTION: SWITCH ───────────────────────────────────────────────────────────
function SwitchSection() {
  const [grade, setGrade] = useState("");
  const [letter, setLetter] = useState("");
  const accent = "#f43f5e";
  return (
    <div style={{ padding: "32px 28px", animation: "fadeUp 0.5s ease" }}>
      <SectionHeader title="switch Statement" badge="Selection" accent={accent} />
      <p style={{ color: "var(--ink3)", fontSize: 14, lineHeight: 1.75, marginBottom: 26, maxWidth: 620 }}>
        Tests a single expression against multiple constants. Each case must end with <code style={{ fontFamily: "var(--font-mono)", background: `${accent}12`, padding: "1px 7px", borderRadius: 6, color: accent, fontSize: 12.5 }}>break</code> to prevent fall-through. Works with int, char, and enum — not float or string.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
        <div>
          <CodeBlock accent={accent} label="switch — grade messages" code={`char grade = 'B';

switch (grade) {
    case 'A':
        cout << "Excellent!";
        break;         // exits switch
    case 'B':
        cout << "Very Good!";
        break;
    case 'C':
        cout << "Good!";
        break;
    default:           // catch-all
        cout << "Keep studying!";
        break;
}
// Output: Very Good!`} />
          <DemoPanel title="Interactive Switch Demo" accent={accent}>
            <div style={{ marginBottom: 14 }}>
              <select className="inp" onChange={e => {
                const m = { A: "A → Excellent! 🌟", B: "B → Very Good! ✨", C: "C → Good 👍", D: "D → Needs improvement", F: "F → Review material 📚" };
                setGrade(m[e.target.value] || "");
              }}>
                <option value="">Select a grade...</option>
                {["A", "B", "C", "D", "F"].map(g => <option key={g}>{g}</option>)}
              </select>
              <ResultBubble val={grade} accent={accent} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--ink3)", fontWeight: 600, display: "block", marginBottom: 6 }}>Vowel checker (type one letter)</label>
              <input className="inp" maxLength={1} placeholder="Type a letter..." onChange={e => {
                const c = e.target.value.toLowerCase();
                if ("aeiou".includes(c)) setLetter(`'${c}' is a Vowel`);
                else if (c >= "a" && c <= "z") setLetter(`'${c}' is a Consonant`);
                else if (c) setLetter("Letters only");
                else setLetter("");
              }} />
              <ResultBubble val={letter} accent={accent} />
            </div>
          </DemoPanel>
        </div>
        <div>
          <FlowCard title="switch branching" accent={accent}>
            <svg viewBox="0 0 270 300" style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
              <rect x="88" y="12" width="94" height="32" rx="9" fill="rgba(244,63,94,0.1)" stroke="#f43f5e" strokeWidth="1.8" />
              <text x="135" y="32" textAnchor="middle" fill="#9f1239" fontSize="11" fontFamily="Outfit" fontWeight="700">switch(grade)</text>
              <line x1="135" y1="44" x2="135" y2="60" stroke="#9ca3af" strokeWidth="1.5" />
              <line x1="36" y1="60" x2="234" y2="60" stroke="#9ca3af" strokeWidth="1.5" />
              {[["'A'", "Excellent!", "#10b981", 36], ["'B'", "Very Good!", "#3b82f6", 135], ["default", "Study!", "#f59e0b", 234]].map(([c, o, col, x]) => (
                <g key={c}>
                  <line x1={x} y1="60" x2={x} y2="84" stroke={col} strokeWidth="1.5" markerEnd="url(#ma)" />
                  <text x={x} y="78" textAnchor="middle" fill={col} fontSize="9.5" fontWeight="700">{c}</text>
                  <rect x={x - 46} y="84" width="92" height="36" rx="8" fill={`${col}12`} stroke={col} strokeWidth="1.5" />
                  <text x={x} y="105" textAnchor="middle" fill="var(--ink2)" fontSize="11" fontFamily="Outfit" fontWeight="700">{o}</text>
                  <line x1={x} y1="120" x2={x} y2="220" stroke={col} strokeWidth="1.5" strokeDasharray="4,3" />
                </g>
              ))}
              <line x1="36" y1="220" x2="234" y2="220" stroke="#9ca3af" strokeWidth="1.5" />
              <line x1="135" y1="220" x2="135" y2="244" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#ma)" />
              <ellipse cx="135" cy="268" rx="58" ry="22" fill="linear-gradient(135deg,#6366f1,#3b82f6)" />
              <rect x="77" y="246" width="116" height="44" rx="12" fill="rgba(99,102,241,0.1)" stroke="#6366f1" strokeWidth="1.5" />
              <text x="135" y="272" textAnchor="middle" fill="#6366f1" fontSize="11" fontFamily="Outfit" fontWeight="700">continue after switch</text>
            </svg>
          </FlowCard>
          <TipBox accent={accent} tips={["break prevents fall-through to the next case", "Omitting break intentionally lets multiple cases share code", "default is optional but recommended as a safety net", "switch only works with integral/enum types"]} />
        </div>
      </div>
    </div>
  );
}

// ── SECTION: FOR LOOP ─────────────────────────────────────────────────────────
function ForLoop() {
  const [n, setN] = useState("");
  const [out, setOut] = useState("");
  const [mode, setMode] = useState("up");
  const accent = "#3b82f6";
  const run = () => {
    const v = parseInt(n);
    if (isNaN(v) || v < 1 || v > 20) return setOut("Enter 1–20");
    const arr = Array.from({ length: v }, (_, i) => i + 1);
    const nums = mode === "up" ? arr : mode === "down" ? [...arr].reverse() : arr.filter(x => x % 2 === 0);
    setOut(nums.join(" → "));
  };
  const execSteps = [
    { line: 1, vars: { i: "1" }, note: "Initialization: i starts at 1 (runs once)" },
    { line: 1, vars: { i: "1", "i<=5": "true" }, note: "Condition check: 1 ≤ 5 → true, enter body" },
    { line: 2, vars: { i: "1", output: '"1 "' }, note: "Body executes with current i value" },
    { line: 1, vars: { i: "2", "i<=5": "true" }, note: "Increment: i++, then check condition again" },
    { line: 2, vars: { i: "2", output: '"1 2 "' }, note: "Body executes with i = 2" },
    { line: 1, vars: { i: "3" }, note: "... continues until i > 5" },
    { line: 1, vars: { i: "6", "i<=5": "false" }, note: "Condition: 6 ≤ 5 → false, EXIT loop" },
  ];
  return (
    <div style={{ padding: "32px 28px", animation: "fadeUp 0.5s ease" }}>
      <SectionHeader title="for Loop" badge="Iteration" accent={accent} />
      <p style={{ color: "var(--ink3)", fontSize: 14, lineHeight: 1.75, marginBottom: 26, maxWidth: 620 }}>
        Three-part header on one line: <em>initialize</em>, <em>condition</em>, <em>increment</em>. Best when the number of iterations is known in advance. All three parts are optional — <code style={{ fontFamily: "var(--font-mono)", background: `${accent}12`, padding: "1px 7px", borderRadius: 6, color: accent, fontSize: 12.5 }}>for(;;)</code> is an infinite loop.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
        <div>
          <CodeBlock accent={accent} label="for — anatomy & patterns" code={`// for(init; condition; increment)
for (int i = 1; i <= n; i++) {
    cout << i << " ";
}

// Count DOWN
for (int i = n; i >= 1; i--) {
    cout << i << " ";
}

// Even numbers
for (int i = 2; i <= n; i += 2) {
    cout << i << " ";
}

// Multiple variables
for (int i=0, j=10; i<j; i++, j--) {
    cout << i << "," << j << " ";
}`} />
          <DemoPanel title="for Loop Playground" accent={accent}>
            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
              {["up", "down", "even"].map(m => (
                <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "8px 4px", borderRadius: 10, border: `1.5px solid ${mode === m ? accent : "var(--border2)"}`, background: mode === m ? `${accent}15` : "transparent", color: mode === m ? accent : "var(--ink3)", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-body)" }}>
                  {m === "up" ? "Count Up" : m === "down" ? "Count Down" : "Evens Only"}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <input className="inp" style={{ flex: 1 }} type="number" placeholder="n = ? (1–20)" value={n} onChange={e => setN(e.target.value)} onKeyDown={e => e.key === "Enter" && run()} />
              <button className="btn btn-run" onClick={run} style={{ background: "var(--azure-g)" }}>Run</button>
            </div>
            <ResultBubble val={out} accent={accent} />
          </DemoPanel>
          <LoopAnimator type="for" n={5} accent={accent} />
        </div>
        <div>
          <FlowCard title="for loop flowchart" accent={accent}><FlowForLoop /></FlowCard>
          <ExecutionVisualizer accent={accent} title="Step-by-step trace (n=5)" code={`for (int i=1; i<=5; i++) {
    cout << i << " ";
}`} steps={execSteps} />
          <TipBox accent={accent} tips={["Init runs exactly once before the loop starts", "Condition is checked before EVERY iteration", "Increment runs after every body execution", "Any of the 3 parts can be empty"]} />
        </div>
      </div>
    </div>
  );
}

// ── SECTION: WHILE LOOP ───────────────────────────────────────────────────────
function WhileLoop() {
  const [n, setN] = useState("");
  const [out, setOut] = useState("");
  const accent = "#10b981";
  const run = () => {
    const v = parseInt(n);
    if (isNaN(v) || v < 1 || v > 20) return setOut("Enter 1–20");
    const arr = []; let i = 1;
    while (i <= v) { arr.push(i); i++; }
    setOut(arr.join(" → "));
  };
  return (
    <div style={{ padding: "32px 28px", animation: "fadeUp 0.5s ease" }}>
      <SectionHeader title="while Loop" badge="Iteration" accent={accent} />
      <p style={{ color: "var(--ink3)", fontSize: 14, lineHeight: 1.75, marginBottom: 26, maxWidth: 620 }}>
        Entry-controlled loop — the condition is evaluated before each iteration. If the condition starts as false, the body never runs. Ideal when the iteration count depends on runtime conditions.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
        <div>
          <CodeBlock accent={accent} label="while — patterns" code={`// Syntax
while (condition) {
    // body — must update variable!
}

// Count 1 to n
int i = 1;
while (i <= n) {
    cout << i << " ";
    i++;           // critical update!
}

// Input validation
string input;
while (input != "quit") {
    cin >> input;
    process(input);
}

// Sentinel pattern
int sum=0, num=0;
while (num != -1) {
    cin >> num;
    if (num != -1) sum += num;
}`} />
          <DemoPanel title="while Loop Playground" accent={accent}>
            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <input className="inp" style={{ flex: 1 }} type="number" placeholder="n = ? (1–20)" value={n} onChange={e => setN(e.target.value)} onKeyDown={e => e.key === "Enter" && run()} />
              <button className="btn btn-run" onClick={run}>Run</button>
            </div>
            <ResultBubble val={out} accent={accent} />
            <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 12, fontSize: 12.5, color: "#92400e", lineHeight: 1.5, fontWeight: 500 }}>
              ⚠️ Always update the loop variable — forgetting i++ creates an infinite loop!
            </div>
          </DemoPanel>
          <LoopAnimator type="while" n={5} accent={accent} />
        </div>
        <div>
          <FlowCard title="while — entry-controlled" accent={accent}>
            <svg viewBox="0 0 340 320" style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gwl" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient>
              </defs>
              <rect x="116" y="16" width="108" height="34" rx="12" fill="url(#gwl)" />
              <text x="170" y="38" textAnchor="middle" fill="white" fontSize="12" fontFamily="Syne" fontWeight="700">START</text>
              <line x1="170" y1="50" x2="170" y2="76" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#ma)" />
              <polygon points="170,76 242,110 170,144 98,110" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="2" />
              <text x="170" y="106" textAnchor="middle" fill="#92400e" fontSize="11" fontFamily="Outfit" fontWeight="700">i ≤ n?</text>
              <text x="170" y="120" textAnchor="middle" fill="#f59e0b" fontSize="10">condition</text>
              <line x1="170" y1="144" x2="170" y2="170" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#ma)" />
              <text x="183" y="162" fill="#10b981" fontSize="9.5" fontWeight="700">true</text>
              <rect x="102" y="170" width="136" height="44" rx="12" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="2" />
              <text x="170" y="190" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="700">Execute body</text>
              <text x="170" y="205" textAnchor="middle" fill="#10b981" fontSize="10">cout &lt;&lt; i; i++</text>
              <path d="M102 192 Q56 192 56 110 Q56 76 96 76" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#ma)" />
              <text x="38" y="150" fill="#6366f1" fontSize="9" textAnchor="middle" transform="rotate(-90,38,150)">loop back</text>
              <line x1="242" y1="110" x2="296" y2="110" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="296" y1="110" x2="296" y2="268" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="296" y1="268" x2="238" y2="268" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#ma)" />
              <text x="274" y="103" fill="#f43f5e" fontSize="9.5" fontWeight="700">false</text>
              <rect x="118" y="254" width="120" height="28" rx="10" fill="url(#gwl)" />
              <text x="178" y="272" textAnchor="middle" fill="white" fontSize="12" fontFamily="Syne" fontWeight="700">END</text>
            </svg>
          </FlowCard>
          <TipBox accent={accent} tips={["Condition checked BEFORE each iteration — may run 0 times", "Use when iteration count is unknown at compile time", "Classic for reading input until sentinel value"]} />
        </div>
      </div>
    </div>
  );
}

// ── SECTION: DO-WHILE ─────────────────────────────────────────────────────────
function DoWhile() {
  const [n, setN] = useState("");
  const [out, setOut] = useState("");
  const accent = "#6366f1";
  const run = () => {
    const v = parseInt(n);
    if (isNaN(v) || v < 1 || v > 20) return setOut("Enter 1–20");
    const arr = []; let i = 1;
    do { arr.push(i); i++; } while (i <= v);
    setOut(arr.join(" → "));
  };
  return (
    <div style={{ padding: "32px 28px", animation: "fadeUp 0.5s ease" }}>
      <SectionHeader title="do-while Loop" badge="Iteration" accent={accent} />
      <p style={{ color: "var(--ink3)", fontSize: 14, lineHeight: 1.75, marginBottom: 26, maxWidth: 620 }}>
        Exit-controlled loop — the body always executes at least once before the condition is checked. Ideal for menu-driven programs and input validation where one guaranteed run is needed.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
        <div>
          <CodeBlock accent={accent} label="do-while — guaranteed execution" code={`// Note the semicolon after while!
int i = 1;
do {
    cout << i << " ";
    i++;
} while (i <= n);   // ← semicolon

// Menu-driven program:
int choice;
do {
    cout << "1. Play  2. Quit\\n";
    cin >> choice;
} while (choice < 1 || choice > 2);
// Menu always shows at least once!

// Key difference — if n = 0:
// while(n > 0) → body NEVER runs
// do-while     → body runs ONCE`} />
          <DemoPanel title="do-while Playground" accent={accent}>
            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <input className="inp" style={{ flex: 1 }} type="number" placeholder="n = ? (1–20)" value={n} onChange={e => setN(e.target.value)} onKeyDown={e => e.key === "Enter" && run()} />
              <button className="btn btn-run" onClick={run} style={{ background: "var(--violet-g)" }}>Run</button>
            </div>
            <ResultBubble val={out} accent={accent} />
            <div style={{ marginTop: 10, padding: "10px 14px", background: `${accent}08`, border: `1px solid ${accent}25`, borderRadius: 12, fontSize: 12.5, color: "var(--ink2)", lineHeight: 1.5 }}>
              💡 Try entering 0 or a negative — the body still runs once! That's the key difference from while.
            </div>
          </DemoPanel>
          <LoopAnimator type="dowhile" n={4} accent={accent} />
        </div>
        <div>
          <FlowCard title="do-while — exit-controlled" accent={accent}>
            <svg viewBox="0 0 340 310" style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gdw" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
              </defs>
              <rect x="116" y="14" width="108" height="32" rx="12" fill="url(#gdw)" />
              <text x="170" y="35" textAnchor="middle" fill="white" fontSize="12" fontFamily="Syne" fontWeight="700">START</text>
              <line x1="170" y1="46" x2="170" y2="70" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#ma)" />
              <rect x="100" y="70" width="140" height="48" rx="12" fill="rgba(99,102,241,0.1)" stroke="#6366f1" strokeWidth="2" />
              <text x="170" y="90" textAnchor="middle" fill="#3730a3" fontSize="12" fontWeight="700">Execute body</text>
              <text x="170" y="106" textAnchor="middle" fill="#6366f1" fontSize="10.5">runs first, unconditionally</text>
              <line x1="170" y1="118" x2="170" y2="148" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#ma)" />
              <polygon points="170,148 244,182 170,216 96,182" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="2" />
              <text x="170" y="179" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="700">condition?</text>
              <text x="170" y="194" textAnchor="middle" fill="#f59e0b" fontSize="10">check after body</text>
              <path d="M96 182 Q52 182 52 94 Q52 70 98 70" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#ma)" />
              <text x="32" y="140" fill="#10b981" fontSize="9.5" textAnchor="middle" transform="rotate(-90,32,140)">true</text>
              <line x1="244" y1="182" x2="296" y2="182" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="296" y1="182" x2="296" y2="262" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="296" y1="262" x2="240" y2="262" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#ma)" />
              <text x="272" y="175" fill="#f43f5e" fontSize="9.5" fontWeight="700">false</text>
              <rect x="118" y="248" width="122" height="28" rx="10" fill="url(#gdw)" />
              <text x="179" y="266" textAnchor="middle" fill="white" fontSize="12" fontFamily="Syne" fontWeight="700">END</text>
            </svg>
          </FlowCard>
          <TipBox accent={accent} tips={["Body executes BEFORE condition is checked", "Always runs at least once — no matter what!", "Semicolon after while(...) is required", "Perfect for menu-driven programs"]} />
        </div>
      </div>
    </div>
  );
}

// ── SECTION: NESTED LOOPS ─────────────────────────────────────────────────────
function NestedLoops() {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const accent = "#f59e0b";
  return (
    <div style={{ padding: "32px 28px", animation: "fadeUp 0.5s ease" }}>
      <SectionHeader title="Nested Loops" badge="Iteration" accent={accent} />
      <p style={{ color: "var(--ink3)", fontSize: 14, lineHeight: 1.75, marginBottom: 26, maxWidth: 620 }}>
        A loop inside another loop. The inner loop completes ALL its iterations for each single step of the outer loop. Total iterations = outer × inner. Essential for 2D arrays, patterns, and matrices.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
        <div>
          <CodeBlock accent={accent} label="Nested loops — triangle & table" code={`// Star triangle
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        cout << "* ";
    }
    cout << endl;
}
// *
// * *
// * * *

// Multiplication table
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        cout << (i*j) << "\\t";
    }
    cout << endl;
}
// 1  2  3
// 2  4  6
// 3  6  9`} />
        </div>
        <div>
          <FlowCard title="Pattern Generator" accent={accent}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11, color: "var(--ink3)", fontWeight: 700, display: "block", marginBottom: 5 }}>Rows: {rows}</label>
                <input type="range" min={1} max={8} value={rows} onChange={e => setRows(+e.target.value)} style={{ width: "100%", accentColor: accent }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11, color: "var(--ink3)", fontWeight: 700, display: "block", marginBottom: 5 }}>Cols: {cols}</label>
                <input type="range" min={1} max={8} value={cols} onChange={e => setCols(+e.target.value)} style={{ width: "100%", accentColor: accent }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "rgba(248,250,255,0.8)", borderRadius: 12, padding: 14, border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>Triangle</div>
                {Array.from({ length: rows }, (_, i) => (
                  <div key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 14, lineHeight: 1.9, color: accent, animation: `fadeIn 0.3s ${i * 0.04}s both` }}>
                    {"●  ".repeat(Math.min(i + 1, cols)).trim()}
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(248,250,255,0.8)", borderRadius: 12, padding: 14, border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>Table</div>
                {Array.from({ length: Math.min(rows, 5) }, (_, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, lineHeight: 1.9 }}>
                    {Array.from({ length: Math.min(cols, 5) }, (_, j) => (
                      <span key={j} style={{ fontSize: 12, fontFamily: "var(--font-mono)", minWidth: 22, textAlign: "center", color: i === j ? "#f43f5e" : "var(--ink2)", fontWeight: i === j ? 800 : 400 }}>
                        {(i + 1) * (j + 1)}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 12, padding: "10px 14px", background: `${accent}12`, borderRadius: 12, fontSize: 13, color: accent, fontWeight: 800, textAlign: "center", border: `1px solid ${accent}30` }}>
              {rows} × {cols} = {rows * cols} total iterations
            </div>
          </FlowCard>
          <TipBox accent={accent} tips={["Total = outer count × inner count", "Use different variable names: i, j, k...", "break exits only the innermost loop", "Nested complexity grows multiplicatively"]} />
        </div>
      </div>
    </div>
  );
}

// ── SECTION: JUMP STATEMENTS ──────────────────────────────────────────────────
function JumpStatements() {
  const accent = "#f43f5e";
  const jumps = [
    { name: "break", color: "#f43f5e", g: "var(--rose-g)", desc: "Immediately exits the enclosing loop or switch statement.", code: `for (int i = 1; i <= 10; i++) {
    if (i == 5) break;  // exit at 5
    cout << i << " ";
}
// Output: 1 2 3 4` },
    { name: "continue", color: "#3b82f6", g: "var(--azure-g)", desc: "Skips the rest of the current iteration and jumps to the next.", code: `for (int i = 1; i <= 6; i++) {
    if (i == 3) continue;
    cout << i << " ";
}
// Output: 1 2 4 5 6` },
    { name: "goto", color: "#f59e0b", g: "var(--amber-g)", desc: "Unconditionally jumps to a labeled statement. Avoid in modern code.", code: `int i = 1;
start:
    cout << i++ << " ";
    if (i <= 3) goto start;
// Output: 1 2 3
// ⚠️ Avoid goto — use loops!` },
    { name: "return", color: "#10b981", g: "var(--emerald-g)", desc: "Exits the current function and optionally returns a value.", code: `int square(int x) {
    return x * x;  // exits & returns
}
bool isEven(int n) {
    return (n % 2 == 0);
}` },
  ];
  return (
    <div style={{ padding: "32px 28px", animation: "fadeUp 0.5s ease" }}>
      <SectionHeader title="Jump Statements" badge="Jump" accent={accent} />
      <p style={{ color: "var(--ink3)", fontSize: 14, lineHeight: 1.75, marginBottom: 26, maxWidth: 620 }}>
        Alter the sequential flow of loops and functions. C++ provides four jump statements, each serving a distinct purpose in controlling program flow.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }} className="two-col">
        {jumps.map(({ name, color, g, desc, code }) => (
          <div key={name} style={{ border: `1.5px solid ${color}25`, borderRadius: "var(--r-md)", overflow: "hidden", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", boxShadow: `0 4px 20px ${color}10` }}>
            <div style={{ padding: "14px 18px", background: `linear-gradient(135deg,${color}12,${color}06)`, borderBottom: `1px solid ${color}20`, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: g, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 12px ${color}40` }}>
                <span style={{ color: "#fff", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>{name}</span>
              </div>
              <div>
                <div style={{ fontWeight: 800, color, fontSize: 14.5, fontFamily: "var(--font-mono)", marginBottom: 3 }}>{name}</div>
                <div style={{ fontSize: 12, color: "var(--ink3)", lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
            <CodeBlock label={`${name} — example`} code={code} />
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", borderRadius: "var(--r-md)", padding: "18px 22px", border: "1px solid var(--border2)" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>Quick Reference</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="two-col">
          {[["break", "Exits loop/switch", "#f43f5e"], ["continue", "Next iteration", "#3b82f6"], ["goto", "Jump to label", "#f59e0b"], ["return", "Exits function", "#10b981"]].map(([k, v, c]) => (
            <div key={k} style={{ textAlign: "center", padding: "14px 10px", background: `${c}08`, borderRadius: 14, border: `1px solid ${c}25` }}>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 800, color: c, fontSize: 15, marginBottom: 5 }}>{k}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink3)", fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  injectStyles();
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("if");
  const [prevActive, setPrevActive] = useState(null);

  if (!user) return <AuthScreen onAuth={setUser} />;

  const catColors = { Selection: "#10b981", Iteration: "#3b82f6", Jump: "#f43f5e", Assess: "#f59e0b" };

  const cats = [...new Set(TOPICS.map(t => t.cat))];

  const renderContent = () => {
    switch (active) {
      case "if": return <IfElse key="if" />;
      case "elif": return <IfElseIf key="elif" />;
      case "nested": return <NestedIf key="nested" />;
      case "switch": return <SwitchSection key="switch" />;
      case "for": return <ForLoop key="for" />;
      case "while": return <WhileLoop key="while" />;
      case "dowhile": return <DoWhile key="dowhile" />;
      case "nested2": return <NestedLoops key="nested2" />;
      case "jump": return <JumpStatements key="jump" />;
      case "quiz": return <QuizSection key="quiz" questions={QUIZ_QS} title="Knowledge Check" />;
      case "exam": return <QuizSection key="exam" questions={EXAM_QS} title="Chapter 3 Exam" isExam />;
      default: return null;
    }
  };

  const curTopic = TOPICS.find(t => t.id === active);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(240,244,255,0.85)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(140,160,255,0.2)", boxShadow: "0 2px 20px rgba(99,102,241,0.08)" }}>
        <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 18, fontFamily: "var(--font-display)" }}>C</span>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: "var(--ink)", lineHeight: 1, fontFamily: "var(--font-display)" }}>C++ Mastery</div>
              <div style={{ fontSize: 10.5, color: "var(--ink4)", letterSpacing: ".03em" }}>Chapter 3 · Control Statements</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 13, color: "var(--ink3)", fontWeight: 500 }}>
              Hello, <strong style={{ color: "var(--ink)", fontWeight: 800 }}>{user.name}</strong>
            </div>
            <button onClick={() => setUser(null)} className="btn btn-ghost" style={{ padding: "7px 16px", fontSize: 12.5 }}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div style={{ background: "linear-gradient(145deg,#0f0c29 0%,#302b63 50%,#24243e 100%)", padding: "48px 28px 44px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -80, left: 80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", top: "20%", left: "60%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.1) 0%,transparent 70%)" }} />
        <div style={{ maxWidth: 1340, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {["Selection", "Iteration", "Jump"].map(t => (
              <span key={t} className="pill" style={{ background: `${catColors[t]}20`, color: catColors[t], border: `1px solid ${catColors[t]}40` }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 800, color: "#fff", lineHeight: 1.12, marginBottom: 14, letterSpacing: "-.02em", maxWidth: 680 }}>
            Control the{" "}
            <span style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundSize: "200%", animation: "gradient-flow 4s ease infinite" }}>
              flow of execution
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.7, maxWidth: 520 }}>
            Master selection, iteration, and jump statements through cinematic visualizations, step-by-step execution traces, and animated flowcharts.
          </p>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "28px 28px 80px", display: "grid", gridTemplateColumns: "230px 1fr", gap: 26 }} className="sidebar-grid">
        {/* SIDEBAR */}
        <aside className="hide-mobile" style={{ position: "sticky", top: 80, height: "fit-content" }}>
          <div className="glass" style={{ padding: "8px 8px", borderRadius: "var(--r-lg)" }}>
            {cats.map(cat => (
              <div key={cat}>
                <div style={{ padding: "10px 10px 4px 10px", fontSize: 10, fontWeight: 800, color: catColors[cat] || "var(--ink4)", textTransform: "uppercase", letterSpacing: ".08em", display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: catColors[cat] || "var(--ink4)" }} />
                  {cat}
                </div>
                {TOPICS.filter(t => t.cat === cat).map(t => (
                  <button key={t.id} onClick={() => setActive(t.id)} className={`nav-item${active === t.id ? " active" : ""}`} style={{ color: active === t.id ? t.accent : "var(--ink3)" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: active === t.id ? t.accent : "rgba(99,102,241,0.2)", flexShrink: 0, transition: "all 0.2s", boxShadow: active === t.id ? `0 0 8px ${t.accent}` : "none" }} />
                    {t.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main>
          {/* Mobile tabs */}
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 6, marginBottom: 18 }}>
            {TOPICS.map(t => (
              <button key={t.id} onClick={() => setActive(t.id)} style={{ flexShrink: 0, padding: "7px 14px", borderRadius: 12, border: `1.5px solid ${active === t.id ? t.accent : "var(--border2)"}`, background: active === t.id ? `${t.accent}15` : "rgba(255,255,255,0.6)", color: active === t.id ? t.accent : "var(--ink3)", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-body)", backdropFilter: "blur(8px)" }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Content card */}
          <div className="glass" style={{ borderRadius: "var(--r-xl)", minHeight: 600, overflow: "hidden" }}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border2)", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(16px)", padding: "22px 28px", textAlign: "center", color: "var(--ink4)", fontSize: 12 }}>
        Chapter 3 · Control Statements — C++ Programming &nbsp;·&nbsp; Interactive Reference
      </footer>
    </div>
  );
}