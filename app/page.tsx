"use client"
import { useState, useEffect, useRef, useCallback } from "react";

// ── GLOBAL CSS INJECTION ──────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f5f7ff;
    --bg2: #eef1ff;
    --surface: rgba(255,255,255,0.82);
    --surface2: rgba(255,255,255,0.55);
    --border: rgba(148,163,255,0.22);
    --border2: rgba(99,110,255,0.38);

    --ink: #0a0a18;
    --ink2: #1e1e3a;
    --ink3: #52527a;
    --ink4: #8585a8;

    --indigo: #4f46e5;
    --indigo2: #6366f1;
    --blue: #2563eb;
    --blue2: #3b82f6;
    --violet: #7c3aed;
    --violet2: #8b5cf6;
    --cyan: #0891b2;
    --cyan2: #06b6d4;
    --emerald: #059669;
    --emerald2: #10b981;
    --rose: #e11d48;
    --rose2: #f43f5e;
    --amber: #d97706;
    --amber2: #f59e0b;

    --g-indigo: linear-gradient(135deg, #4f46e5, #6366f1);
    --g-blue: linear-gradient(135deg, #2563eb, #3b82f6);
    --g-violet: linear-gradient(135deg, #7c3aed, #8b5cf6);
    --g-cyan: linear-gradient(135deg, #0891b2, #06b6d4);
    --g-emerald: linear-gradient(135deg, #059669, #10b981);
    --g-rose: linear-gradient(135deg, #e11d48, #f43f5e);
    --g-amber: linear-gradient(135deg, #d97706, #f59e0b);
    --g-hero: linear-gradient(160deg, #0d0b2e 0%, #1a0a3e 25%, #0f1a4e 55%, #091430 100%);

    --r-sm: 10px; --r-md: 16px; --r-lg: 24px; --r-xl: 32px; --r-2xl: 48px;
    --font-display: 'Space Grotesk', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'Fira Code', monospace;
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--ink);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    background-image:
      radial-gradient(ellipse 80% 60% at 15% -10%, rgba(79,70,229,0.09) 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at 85% 5%, rgba(37,99,235,0.07) 0%, transparent 65%),
      radial-gradient(ellipse 70% 80% at 50% 110%, rgba(124,58,237,0.06) 0%, transparent 60%);
    min-height: 100vh;
  }

  @keyframes fadeUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:none } }
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.94) } to { opacity:1; transform:scale(1) } }
  @keyframes slideRight { from { transform:scaleX(0) } to { transform:scaleX(1) } }
  @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-18px) rotate(2deg)} 66%{transform:translateY(-8px) rotate(-1deg)} }
  @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-12px) rotate(-2deg)} 66%{transform:translateY(-22px) rotate(1deg)} }
  @keyframes spin { to { transform:rotate(360deg) } }
  @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes glowPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:0.9;transform:scale(1.04)} }
  @keyframes bouncein { 0%{transform:scale(0.3);opacity:0} 60%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
  @keyframes progressFill { from{width:0} to{width:var(--pw)} }
  @keyframes orbit { from{transform:rotate(0deg) translateX(38px) rotate(0deg)} to{transform:rotate(360deg) translateX(38px) rotate(-360deg)} }
  @keyframes confettiFall { 0%{transform:translateY(-30px) rotate(0deg);opacity:1} 100%{transform:translateY(110px) rotate(540deg);opacity:0} }
  @keyframes executeLine { 0%{background:rgba(99,102,241,0)} 30%{background:rgba(99,102,241,0.18)} 100%{background:rgba(99,102,241,0.08)} }
  @keyframes ripple { 0%{transform:scale(0);opacity:0.35} 100%{transform:scale(2.8);opacity:0} }
  @keyframes typewriter { from{width:0} to{width:100%} }
  @keyframes cursor { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes dotPulse { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
  @keyframes particleDrift { 0%{transform:translate(0,0);opacity:0} 10%{opacity:1} 90%{opacity:0.6} 100%{transform:translate(var(--dx,20px),var(--dy,-60px));opacity:0} }
  @keyframes lineTrace { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
  @keyframes nodeActivate { 0%,100%{filter:none} 50%{filter:drop-shadow(0 0 8px var(--ac,#6366f1))} }
  @keyframes arrowFlow { 0%{stroke-dashoffset:30} 100%{stroke-dashoffset:0} }
  @keyframes iterCell { 0%{transform:scale(1);border-color:var(--border2)} 50%{transform:scale(1.18) translateY(-4px);border-color:var(--ac)} 100%{transform:scale(1.05);border-color:var(--ac)} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

  .fade-up { animation: fadeUp 0.6s var(--ease-smooth) both; }
  .bounce-in { animation: bouncein 0.45s var(--ease-spring) both; }
  .scale-in { animation: scaleIn 0.4s var(--ease-smooth) both; }

  .glass {
    background: var(--surface);
    backdrop-filter: blur(28px) saturate(1.4);
    -webkit-backdrop-filter: blur(28px) saturate(1.4);
    border: 1px solid var(--border2);
    border-radius: var(--r-lg);
    box-shadow: 0 12px 48px rgba(79,70,229,0.07), 0 1px 0 rgba(255,255,255,0.85) inset;
  }
  .glass-sm {
    background: var(--surface2);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
  }

  .grad-text-indigo { background: linear-gradient(135deg,#4f46e5,#818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .grad-text-blue { background: linear-gradient(135deg,#2563eb,#60a5fa); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .grad-text-violet { background: linear-gradient(135deg,#7c3aed,#c084fc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .grad-text-emerald { background: linear-gradient(135deg,#059669,#34d399); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  .btn { font-family:var(--font-body); cursor:pointer; border:none; transition:all 0.25s var(--ease-smooth); font-weight:600; letter-spacing:.01em; }
  .btn-primary { background:linear-gradient(135deg,#4f46e5,#6366f1); color:#fff; padding:13px 30px; border-radius:100px; box-shadow:0 4px 24px rgba(79,70,229,0.38); font-size:15px; }
  .btn-primary:hover { transform:translateY(-2px) scale(1.02); box-shadow:0 8px 32px rgba(79,70,229,0.5); filter:brightness(1.06); }
  .btn-primary:active { transform:translateY(0); }
  .btn-ghost { background:transparent; border:1.5px solid var(--border2); color:var(--ink3); padding:10px 22px; border-radius:100px; }
  .btn-ghost:hover { background:var(--surface); border-color:var(--indigo); color:var(--indigo); transform:translateY(-1px); }
  .btn-run { background:var(--g-emerald); color:#fff; padding:11px 22px; border-radius:12px; box-shadow:0 4px 16px rgba(5,150,105,0.32); font-size:13px; }
  .btn-run:hover { transform:translateY(-2px); box-shadow:0 6px 24px rgba(5,150,105,0.45); }

  .inp {
    background: var(--surface); border: 1.5px solid var(--border2); border-radius: 14px;
    padding: 12px 18px; font-family: var(--font-body); font-size: 14px; color: var(--ink);
    transition: all 0.2s; width: 100%; outline: none; line-height: 1.5;
  }
  .inp:focus { border-color: var(--indigo); box-shadow: 0 0 0 4px rgba(79,70,229,0.14); }
  .inp.error { border-color: var(--rose); box-shadow: 0 0 0 4px rgba(225,29,72,0.12); }

  .pill { display:inline-flex; align-items:center; gap:5px; padding:4px 12px; border-radius:100px; font-size:11px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; }

  .nav-item {
    transition: all 0.2s var(--ease-smooth);
    padding: 10px 14px; border-radius: 14px; font-size: 13px; font-weight: 500;
    color: var(--ink3); border: none; background: transparent; cursor: pointer;
    display: flex; align-items: center; gap: 9px; width: 100%; text-align: left;
    letter-spacing: 0.01em;
  }
  .nav-item:hover { background: rgba(79,70,229,0.07); color: var(--indigo); transform: translateX(2px); }
  .nav-item.active { background: linear-gradient(135deg,rgba(79,70,229,0.14),rgba(37,99,235,0.08)); color: var(--indigo); font-weight:700; box-shadow: 0 2px 16px rgba(79,70,229,0.14); }

  .tk-kw { color: #7c3aed; font-weight:600; }
  .tk-str { color: #059669; }
  .tk-num { color: #d97706; }
  .tk-cmt { color: #94a3b8; font-style:italic; }
  .tk-fn { color: #2563eb; font-weight:500; }
  .tk-op { color: #dc2626; }
  .tk-type { color: #0891b2; font-weight:600; }
  .tk-plain { color: #1e293b; }
  .tk-pp { color: #7c3aed; }

  .code-line { transition: background 0.3s, box-shadow 0.3s; border-radius: 4px; }
  .code-line.executing { background: rgba(79,70,229,0.16); box-shadow: inset 4px 0 0 var(--indigo); animation: executeLine 1.2s ease; }
  .code-line.highlighted { background: rgba(5,150,105,0.1); box-shadow: inset 4px 0 0 var(--emerald); }

  .q-option {
    background: var(--surface); border: 1.5px solid var(--border2); border-radius: 16px;
    padding: 16px 20px; cursor: pointer; transition: all 0.28s var(--ease-smooth);
    display: flex; align-items: center; gap: 14px;
  }
  .q-option:hover:not(.dis) { border-color: var(--indigo); background: rgba(79,70,229,0.06); transform: translateX(5px); box-shadow: 0 4px 20px rgba(79,70,229,0.1); }
  .q-option.correct { border-color: var(--emerald); background: rgba(5,150,105,0.09); animation: bouncein 0.38s var(--ease-spring); }
  .q-option.wrong { border-color: var(--rose); background: rgba(225,29,72,0.07); }
  .q-option.dis { cursor: default; }

  ::-webkit-scrollbar { width:4px; height:4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(79,70,229,0.22); border-radius:99px; }

  @media (max-width: 768px) { .two-col { grid-template-columns: 1fr !important; } .hide-mobile { display: none !important; } }
  @media (max-width: 920px) { .sidebar-grid { grid-template-columns: 1fr !important; } }
`;

function injectStyles() {
  if (document.getElementById("cpp-mastery-v2")) return;
  const s = document.createElement("style");
  s.id = "cpp-mastery-v2";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

// ── SYNTAX HIGHLIGHT ──────────────────────────────────────────────────────────
const KW = new Set(["if","else","for","while","do","switch","case","default","break","continue","goto","return","int","float","double","char","bool","void","const","auto","class","struct","using","namespace","new","delete","true","false","nullptr","string","endl","public","private","protected","static","inline"]);
const TYPES = new Set(["int","float","double","char","bool","void","string","auto","long","short","unsigned"]);

function tokenize(line) {
  const toks = []; let rest = line;
  while (rest.length) {
    let m;
    if ((m=rest.match(/^(\/\/.*)/))) { toks.push({t:"cmt",v:m[1]}); rest=""; continue; }
    if ((m=rest.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/))) { toks.push({t:"str",v:m[1]}); rest=rest.slice(m[1].length); continue; }
    if ((m=rest.match(/^(#\w+)/))) { toks.push({t:"pp",v:m[1]}); rest=rest.slice(m[1].length); continue; }
    if ((m=rest.match(/^([a-zA-Z_][a-zA-Z0-9_]*)/))) {
      const w=m[1]; const cls=KW.has(w)?(TYPES.has(w)?"type":"kw"):rest[w.length]==="("?"fn":"plain";
      toks.push({t:cls,v:w}); rest=rest.slice(w.length); continue;
    }
    if ((m=rest.match(/^(\d+\.?\d*)/))) { toks.push({t:"num",v:m[1]}); rest=rest.slice(m[1].length); continue; }
    if ((m=rest.match(/^([<>=!&|+\-*/%^~?:,;])/))) { toks.push({t:"op",v:m[1]}); rest=rest.slice(1); continue; }
    toks.push({t:"plain",v:rest[0]}); rest=rest.slice(1);
  }
  return toks;
}

function CodeLine({ tokens, lineNum, isExec, isHL }) {
  return (
    <div className={`code-line${isExec?" executing":isHL?" highlighted":""}`}
      style={{display:"flex",minHeight:"1.85em",lineHeight:"1.85em"}}>
      <span style={{color:"#94a3b8",userSelect:"none",minWidth:"3em",textAlign:"right",paddingRight:"1.4em",fontSize:11,paddingTop:2,flexShrink:0,fontFamily:"var(--font-mono)"}}>
        {lineNum}
      </span>
      <span style={{flex:1}}>
        {tokens.length ? tokens.map((tk,i)=>(
          <span key={i} className={`tk-${tk.t}`}>{tk.v}</span>
        )) : "\u200b"}
      </span>
      {isExec && (
        <span style={{width:7,height:7,borderRadius:"50%",background:"var(--indigo)",display:"inline-block",alignSelf:"center",marginRight:10,animation:"glowPulse 1.2s ease infinite",boxShadow:"0 0 12px var(--indigo)"}} />
      )}
    </div>
  );
}

function CodeBlock({ code, label="C++", execLine=-1, hlLines=[] }) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{threshold:0.08});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  }, []);

  const lines = code.split("\n");
  return (
    <div ref={ref} style={{
      borderRadius:"var(--r-md)", overflow:"hidden",
      border:"1px solid rgba(99,110,255,0.18)",
      marginBottom:18,
      boxShadow:"0 12px 40px rgba(79,70,229,0.09), 0 1px 0 rgba(255,255,255,0.8) inset",
      opacity:visible?1:0, transform:visible?"none":"translateY(14px)",
      transition:"all 0.6s var(--ease-smooth)"
    }}>
      <div style={{background:"linear-gradient(135deg,rgba(79,70,229,0.09),rgba(37,99,235,0.06))",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 18px",borderBottom:"1px solid rgba(99,110,255,0.12)"}}>
        <div style={{display:"flex",alignItems:"center",gap:11}}>
          <div style={{display:"flex",gap:6}}>
            {["#ff5f57","#ffbd2e","#28ca41"].map((c,i)=>(
              <div key={i} style={{width:11,height:11,borderRadius:"50%",background:c,boxShadow:`0 0 6px ${c}55`}} />
            ))}
          </div>
          <span style={{color:"var(--ink4)",fontSize:12,fontFamily:"var(--font-mono)",fontWeight:500}}>{label}</span>
        </div>
        <button onClick={()=>{navigator.clipboard?.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),1800);}}
          style={{background:copied?"rgba(5,150,105,0.14)":"rgba(79,70,229,0.08)",border:`1px solid ${copied?"rgba(5,150,105,0.4)":"rgba(99,110,255,0.28)"}`,borderRadius:9,color:copied?"var(--emerald)":"var(--ink4)",fontSize:11,padding:"5px 13px",cursor:"pointer",fontFamily:"var(--font-body)",fontWeight:600,transition:"all 0.2s"}}>
          {copied?"✓ Copied":"Copy"}
        </button>
      </div>
      <div style={{background:"rgba(248,250,255,0.92)",backdropFilter:"blur(8px)",padding:"14px 0",overflowX:"auto"}}>
        <code style={{fontFamily:"var(--font-mono)",fontSize:13,display:"block",padding:"0 10px"}}>
          {lines.map((line,i)=>(
            <CodeLine key={i} tokens={tokenize(line)} lineNum={i+1} isExec={execLine===i} isHL={hlLines.includes(i)} />
          ))}
        </code>
      </div>
    </div>
  );
}

// ── SLOW EXECUTION VISUALIZER ─────────────────────────────────────────────────
function ExecutionVisualizer({ steps, code, title, accent="#4f46e5", speed=1200 }) {
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const intRef = useRef(null);

  const play = () => {
    if (playing) { clearInterval(intRef.current); setPlaying(false); return; }
    setStep(-1); setPlaying(true);
    let i=0;
    intRef.current = setInterval(()=>{
      setStep(i++);
      if(i>=steps.length){ clearInterval(intRef.current); setPlaying(false); }
    }, speed);
  };

  useEffect(()=>()=>clearInterval(intRef.current),[]);
  const cur = step>=0 ? steps[step] : null;

  return (
    <div style={{background:"var(--surface)",borderRadius:"var(--r-md)",border:"1px solid var(--border2)",overflow:"hidden",marginTop:16,boxShadow:`0 6px 28px ${accent}12`}}>
      <div style={{padding:"13px 18px",borderBottom:"1px solid var(--border)",background:`linear-gradient(135deg,${accent}12,${accent}06)`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:9,height:9,borderRadius:"50%",background:accent,boxShadow:`0 0 12px ${accent}90`,animation:playing?"glowPulse 1.2s ease infinite":"none"}} />
          <span style={{fontSize:12.5,fontWeight:700,color:"var(--ink2)",fontFamily:"var(--font-mono)"}}>{title||"Execution Trace"}</span>
          <span className="pill" style={{background:`${accent}14`,color:accent,border:`1px solid ${accent}30`,fontSize:9}}>SLOW MODE</span>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:11,color:"var(--ink4)",fontFamily:"var(--font-mono)"}}>step {Math.max(0,step+1)}/{steps.length}</span>
          <button onClick={play} style={{background:playing?`${accent}28`:`${accent}18`,border:`1.5px solid ${accent}50`,borderRadius:9,color:accent,fontSize:11,padding:"6px 16px",cursor:"pointer",fontWeight:700,fontFamily:"var(--font-body)",transition:"all 0.2s"}}>
            {playing?"⏸ Pause":"▶ Run Slowly"}
          </button>
          <button onClick={()=>{clearInterval(intRef.current);setStep(-1);setPlaying(false);}} style={{background:"transparent",border:"1px solid var(--border2)",borderRadius:9,color:"var(--ink4)",fontSize:11,padding:"5px 12px",cursor:"pointer",fontFamily:"var(--font-body)"}}>↺</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
        <div style={{borderRight:"1px solid var(--border)",padding:"14px 0",background:"rgba(248,250,255,0.85)",overflowX:"auto"}}>
          <code style={{fontFamily:"var(--font-mono)",fontSize:12.5,display:"block",padding:"0 8px"}}>
            {code.split("\n").map((ln,i)=>(
              <CodeLine key={i} tokens={tokenize(ln)} lineNum={i+1} isExec={cur?.line===i} isHL={false} />
            ))}
          </code>
        </div>
        <div style={{padding:18}}>
          <div style={{fontSize:10.5,fontWeight:700,color:"var(--ink4)",textTransform:"uppercase",letterSpacing:".07em",marginBottom:12}}>Variables</div>
          {cur ? (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {Object.entries(cur.vars||{}).map(([k,v])=>(
                <div key={k} style={{display:"flex",alignItems:"center",gap:9,animation:"fadeUp 0.3s ease"}}>
                  <span style={{fontFamily:"var(--font-mono)",fontSize:12.5,color:accent,fontWeight:700,minWidth:44}}>{k}</span>
                  <span style={{color:"var(--ink4)",fontSize:11}}>=</span>
                  <span style={{fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:"var(--ink)",background:`${accent}14`,padding:"3px 12px",borderRadius:9,border:`1px solid ${accent}28`}}>{v}</span>
                </div>
              ))}
              {cur.note && (
                <div style={{marginTop:10,padding:"10px 14px",background:`${accent}0c`,borderRadius:12,border:`1px solid ${accent}22`,fontSize:12.5,color:"var(--ink2)",lineHeight:1.65,animation:"fadeIn 0.4s ease",fontStyle:"italic"}}>
                  💡 {cur.note}
                </div>
              )}
            </div>
          ) : (
            <div style={{color:"var(--ink4)",fontSize:13,textAlign:"center",marginTop:24,lineHeight:1.7}}>Press <strong>Run Slowly</strong> to watch<br/>execution step by step</div>
          )}
        </div>
      </div>
      <div style={{padding:"12px 18px",borderTop:"1px solid var(--border)",display:"flex",gap:5,flexWrap:"wrap"}}>
        {steps.map((s,i)=>(
          <button key={i} onClick={()=>setStep(i)} style={{width:30,height:30,borderRadius:9,border:`1.5px solid ${i===step?accent:"var(--border2)"}`,background:i<step?`${accent}22`:i===step?accent:"transparent",color:i===step?"#fff":i<step?accent:"var(--ink4)",fontSize:10.5,cursor:"pointer",fontWeight:700,transition:"all 0.25s",fontFamily:"var(--font-mono)"}}>
            {i+1}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── LOOP ANIMATOR ─────────────────────────────────────────────────────────────
function LoopAnimator({ type="for", n=5, accent="#4f46e5" }) {
  const [iter, setIter] = useState(-1);
  const [phase, setPhase] = useState("");
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);

  const phases = type==="dowhile"
    ? ["body","check","body","check","body","check","exit"]
    : ["init","check","body","update","check","body","update","check","exit"];

  const phaseInfo = {
    init:   { label:"Initialization", desc:`i = 1  (runs only once at the start)`, color:"#7c3aed" },
    check:  { label:"Condition Check", desc:`Is i ≤ ${n}?  →  enter body if true`, color:"#d97706" },
    body:   { label:"Loop Body", desc:`Executing the code inside the loop`, color:"#059669" },
    update: { label:"Increment", desc:`i++  →  increase i by 1`, color:"#2563eb" },
    exit:   { label:"Loop Exit", desc:`Condition false — execution continues after loop`, color:"#e11d48" },
  };

  const run = () => {
    if(playing) { clearInterval(ref.current); setPlaying(false); setIter(-1); setPhase(""); return; }
    setPlaying(true); setIter(-1);
    let p=0; let i=1;
    ref.current = setInterval(()=>{
      const ph=phases[p];
      setPhase(ph);
      if(ph==="init") setIter(0);
      else if(ph==="body") setIter(i);
      else if(ph==="update") i++;
      else if(ph==="exit") { clearInterval(ref.current); setPlaying(false); setTimeout(()=>{setIter(-1);setPhase("");},1400); }
      p++;
      if(p>=phases.length) { clearInterval(ref.current); setPlaying(false); setIter(-1); setPhase(""); }
    }, 1100);
  };

  useEffect(()=>()=>clearInterval(ref.current),[]);
  const cells = Array.from({length:n},(_,i)=>i+1);
  const info = phaseInfo[phase];

  return (
    <div style={{background:"var(--surface)",borderRadius:"var(--r-md)",border:"1px solid var(--border2)",padding:22,marginTop:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--ink2)",marginBottom:6}}>Loop Visualizer — {type==="dowhile"?"do-while":type} loop</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {Object.entries(phaseInfo).filter(([k])=>k!=="exit").map(([p,info])=>(
              <span key={p} style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:100,background:phase===p?`${info.color}20`:"transparent",color:phase===p?info.color:"var(--ink4)",border:`1px solid ${phase===p?info.color:"transparent"}`,transition:"all 0.35s var(--ease-smooth)",fontFamily:"var(--font-mono)"}}>
                {p}
              </span>
            ))}
          </div>
        </div>
        <button onClick={run} style={{background:playing?"rgba(225,29,72,0.1)":`${accent}18`,border:`1.5px solid ${playing?"var(--rose)":accent}`,borderRadius:11,color:playing?"var(--rose)":accent,fontSize:12,padding:"8px 20px",cursor:"pointer",fontWeight:700,fontFamily:"var(--font-body)",transition:"all 0.2s",flexShrink:0}}>
          {playing?"⏹ Stop":"▶ Animate"}
        </button>
      </div>

      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:18}}>
        {cells.map((v,i)=>{
          const isActive=iter===v;
          const isDone=iter>v;
          return (
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
              <div style={{
                width:50,height:50,borderRadius:14,
                border:`2.5px solid ${isActive?accent:isDone?`${accent}60`:"var(--border2)"}`,
                background:isActive?`${accent}18`:isDone?`${accent}0c`:"var(--surface2)",
                display:"flex",alignItems:"center",justifyContent:"center",
                transition:"all 0.5s var(--ease-spring)",
                transform:isActive?"scale(1.18) translateY(-5px)":"scale(1)",
                boxShadow:isActive?`0 12px 28px ${accent}45`:"none",
                fontFamily:"var(--font-mono)",fontSize:16,fontWeight:700,
                color:isActive?accent:isDone?`${accent}80`:"var(--ink4)"
              }}>
                {isDone?"✓":v}
              </div>
              <span style={{fontSize:9.5,color:isActive?accent:"var(--ink4)",fontFamily:"var(--font-mono)",fontWeight:isActive?700:400}}>i={v}</span>
            </div>
          );
        })}
        {phase==="exit" && (
          <div style={{padding:"10px 18px",borderRadius:12,background:"rgba(225,29,72,0.1)",border:"1px solid rgba(225,29,72,0.3)",color:"var(--rose)",fontSize:12.5,fontWeight:700,animation:"bouncein 0.35s ease"}}>Exit ✓</div>
        )}
      </div>

      <div style={{padding:"14px 18px",background:info?`${info.color}0c`:"rgba(79,70,229,0.05)",borderRadius:13,border:`1.5px solid ${info?`${info.color}22`:"var(--border)"}`,minHeight:54,transition:"all 0.4s var(--ease-smooth)"}}>
        {info ? (
          <>
            <div style={{fontSize:11,fontWeight:800,color:info.color,textTransform:"uppercase",letterSpacing:".07em",marginBottom:5}}>{info.label}</div>
            <div style={{fontSize:13.5,color:"var(--ink2)",fontWeight:500,lineHeight:1.6,fontFamily:"var(--font-mono)"}}>{info.desc}</div>
          </>
        ) : (
          <div style={{fontSize:13.5,color:"var(--ink4)",lineHeight:1.65}}>Press <strong>Animate</strong> to watch the loop execute step by step at a pace you can follow</div>
        )}
      </div>
    </div>
  );
}

// ── FLOWCHARTS ────────────────────────────────────────────────────────────────
function FlowIfElse() {
  return (
    <svg viewBox="0 0 420 330" style={{width:"100%"}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fgs" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4f46e5"/><stop offset="100%" stopColor="#2563eb"/></linearGradient>
        <linearGradient id="fgt" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#059669"/><stop offset="100%" stopColor="#0891b2"/></linearGradient>
        <linearGradient id="fgf" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e11d48"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
        <filter id="gs"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#4f46e5" floodOpacity="0.12"/></filter>
        <marker id="ma2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#94a3b8"/></marker>
        <marker id="mb2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#059669"/></marker>
        <marker id="mc2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#e11d48"/></marker>
      </defs>
      <ellipse cx="210" cy="38" rx="72" ry="26" fill="url(#fgs)" filter="url(#gs)"/>
      <text x="210" y="44" textAnchor="middle" fill="white" fontSize="13" fontFamily="Space Grotesk" fontWeight="700">START</text>
      <line x1="210" y1="64" x2="210" y2="96" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ma2)"/>
      <polygon points="210,96 296,136 210,176 124,136" fill="rgba(217,119,6,0.09)" stroke="#d97706" strokeWidth="2" filter="url(#gs)"/>
      <text x="210" y="132" textAnchor="middle" fill="#92400e" fontSize="12.5" fontFamily="DM Sans" fontWeight="700">condition?</text>
      <text x="210" y="148" textAnchor="middle" fill="#d97706" fontSize="11">true / false</text>
      <line x1="124" y1="136" x2="70" y2="136" stroke="#059669" strokeWidth="1.5" markerEnd="url(#mb2)"/>
      <text x="96" y="127" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="700">true</text>
      <rect x="10" y="116" width="88" height="42" rx="13" fill="rgba(5,150,105,0.09)" stroke="#059669" strokeWidth="1.8" filter="url(#gs)"/>
      <text x="54" y="134" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="700">Block A</text>
      <text x="54" y="149" textAnchor="middle" fill="#059669" fontSize="10.5">runs ✓</text>
      <line x1="296" y1="136" x2="350" y2="136" stroke="#e11d48" strokeWidth="1.5" markerEnd="url(#mc2)"/>
      <text x="325" y="127" textAnchor="middle" fill="#e11d48" fontSize="11" fontWeight="700">false</text>
      <rect x="322" y="116" width="88" height="42" rx="13" fill="rgba(225,29,72,0.09)" stroke="#e11d48" strokeWidth="1.8" filter="url(#gs)"/>
      <text x="366" y="134" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="700">Block B</text>
      <text x="366" y="149" textAnchor="middle" fill="#e11d48" fontSize="10.5">runs ✓</text>
      <line x1="54" y1="158" x2="54" y2="262" stroke="#059669" strokeWidth="1.4"/>
      <line x1="54" y1="262" x2="192" y2="262" stroke="#94a3b8" strokeWidth="1.4"/>
      <line x1="366" y1="158" x2="366" y2="262" stroke="#e11d48" strokeWidth="1.4"/>
      <line x1="366" y1="262" x2="228" y2="262" stroke="#94a3b8" strokeWidth="1.4"/>
      <line x1="210" y1="262" x2="210" y2="282" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ma2)"/>
      <ellipse cx="210" cy="306" rx="72" ry="26" fill="url(#fgs)" filter="url(#gs)"/>
      <text x="210" y="312" textAnchor="middle" fill="white" fontSize="13" fontFamily="Space Grotesk" fontWeight="700">END</text>
    </svg>
  );
}

function FlowForLoop() {
  return (
    <svg viewBox="0 0 380 420" style={{width:"100%"}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gfl2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#4f46e5"/></linearGradient>
        <filter id="gsf"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#2563eb" floodOpacity="0.1"/></filter>
        <marker id="mf1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#94a3b8"/></marker>
        <marker id="mf2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#059669"/></marker>
        <marker id="mf3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#e11d48"/></marker>
      </defs>
      <ellipse cx="190" cy="32" rx="70" ry="24" fill="url(#gfl2)" filter="url(#gsf)"/>
      <text x="190" y="38" textAnchor="middle" fill="white" fontSize="13" fontFamily="Space Grotesk" fontWeight="700">START</text>
      <line x1="190" y1="56" x2="190" y2="82" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#mf1)"/>
      <rect x="118" y="82" width="144" height="40" rx="13" fill="rgba(79,70,229,0.09)" stroke="#4f46e5" strokeWidth="1.8" filter="url(#gsf)"/>
      <text x="190" y="101" textAnchor="middle" fill="#3730a3" fontSize="12.5" fontWeight="700">int i = 1</text>
      <text x="190" y="115" textAnchor="middle" fill="#4f46e5" fontSize="10.5">initialization</text>
      <line x1="190" y1="122" x2="190" y2="148" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#mf1)"/>
      <polygon points="190,148 268,184 190,220 112,184" fill="rgba(217,119,6,0.09)" stroke="#d97706" strokeWidth="1.8" filter="url(#gsf)"/>
      <text x="190" y="181" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="700">i ≤ n?</text>
      <text x="190" y="196" textAnchor="middle" fill="#d97706" fontSize="10.5">condition check</text>
      <line x1="190" y1="220" x2="190" y2="246" stroke="#059669" strokeWidth="1.5" markerEnd="url(#mf2)"/>
      <text x="204" y="238" fill="#059669" fontSize="10.5" fontWeight="700">true</text>
      <rect x="118" y="246" width="144" height="42" rx="13" fill="rgba(5,150,105,0.09)" stroke="#059669" strokeWidth="1.8" filter="url(#gsf)"/>
      <text x="190" y="266" textAnchor="middle" fill="#065f46" fontSize="12.5" fontWeight="700">Execute body</text>
      <text x="190" y="280" textAnchor="middle" fill="#059669" fontSize="10.5">cout &lt;&lt; i</text>
      <line x1="190" y1="288" x2="190" y2="314" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#mf1)"/>
      <rect x="118" y="314" width="144" height="38" rx="13" fill="rgba(37,99,235,0.09)" stroke="#2563eb" strokeWidth="1.8" filter="url(#gsf)"/>
      <text x="190" y="334" textAnchor="middle" fill="#1e3a8a" fontSize="12.5" fontWeight="700">i++</text>
      <text x="190" y="346" textAnchor="middle" fill="#2563eb" fontSize="10.5">increment</text>
      <path d="M118 333 Q66 333 66 184 Q66 148 110 148" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#mf1)"/>
      <text x="36" y="248" textAnchor="middle" fill="#7c3aed" fontSize="9.5" transform="rotate(-90 36 248)">loop back</text>
      <line x1="268" y1="184" x2="328" y2="184" stroke="#e11d48" strokeWidth="1.5"/>
      <line x1="328" y1="184" x2="328" y2="376" stroke="#e11d48" strokeWidth="1.5"/>
      <line x1="328" y1="376" x2="264" y2="376" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#mf1)"/>
      <text x="306" y="176" fill="#e11d48" fontSize="10.5" fontWeight="700">false</text>
      <ellipse cx="200" cy="398" rx="70" ry="24" fill="url(#gfl2)" filter="url(#gsf)"/>
      <text x="200" y="404" textAnchor="middle" fill="white" fontSize="13" fontFamily="Space Grotesk" fontWeight="700">END</text>
    </svg>
  );
}

// ── TIP BOX ───────────────────────────────────────────────────────────────────
function TipBox({ tips, accent="#4f46e5" }) {
  return (
    <div style={{background:`${accent}07`,borderRadius:"var(--r-md)",padding:"18px 20px",marginTop:16,border:`1.5px solid ${accent}22`}}>
      <div style={{fontSize:11,fontWeight:800,color:accent,textTransform:"uppercase",letterSpacing:".09em",marginBottom:14,display:"flex",alignItems:"center",gap:7}}>
        <span style={{width:18,height:18,borderRadius:6,background:`${accent}20`,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10}}>⚡</span>
        Key Concepts
      </div>
      {tips.map((t,i)=>(
        <div key={i} style={{display:"flex",gap:11,alignItems:"flex-start",marginBottom:i<tips.length-1?10:0,animation:`fadeUp 0.4s ${i*0.08}s both`}}>
          <div style={{width:22,height:22,borderRadius:8,background:`${accent}18`,border:`1px solid ${accent}38`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
            <span style={{fontSize:9.5,color:accent,fontWeight:800}}>{i+1}</span>
          </div>
          <span style={{fontSize:13.5,color:"var(--ink2)",lineHeight:1.65}}>{t}</span>
        </div>
      ))}
    </div>
  );
}

// ── AUTH SCREEN ───────────────────────────────────────────────────────────────
function Particle({ style }) {
  return <div style={{position:"absolute",width:4,height:4,borderRadius:"50%",background:"rgba(148,163,255,0.5)",...style}} />;
}

function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);
  const [particles] = useState(()=>Array.from({length:18},(_,i)=>({
    left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
    animation:`floatA ${5+Math.random()*5}s ${Math.random()*4}s ease-in-out infinite`,
    opacity:0.3+Math.random()*0.4, width:3+Math.random()*4, height:3+Math.random()*4,
  })));

  const calcStrength = (p) => {
    let s=0;
    if(p.length>=6) s++;
    if(p.match(/[A-Z]/)) s++;
    if(p.match(/[0-9]/)) s++;
    if(p.match(/[^a-zA-Z0-9]/)) s++;
    setStrength(s);
  };

  const validate = () => {
    const e={};
    if(mode==="signup" && form.name.trim().length<2) e.name="Name must be at least 2 characters";
    if(!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email="Enter a valid email";
    if(form.password.length<6) e.password="Password must be at least 6 characters";
    return e;
  };

  const submit = () => {
    const e=validate();
    if(Object.keys(e).length){ setErrors(e); return; }
    setErrors({}); setLoading(true);
    setTimeout(()=>{
      const name=mode==="login"?form.email.split("@")[0]:form.name;
      onAuth({ name:name.charAt(0).toUpperCase()+name.slice(1), email:form.email });
    }, 1500);
  };

  const strColors=["#e11d48","#d97706","#2563eb","#059669"];
  const strLabels=["Weak","Fair","Good","Strong"];

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:"var(--bg)",backgroundImage:"radial-gradient(ellipse at 20% 0%,rgba(79,70,229,0.14) 0%,transparent 60%),radial-gradient(ellipse at 80% 100%,rgba(37,99,235,0.1) 0%,transparent 50%)",position:"relative",overflow:"hidden"}}>
      {particles.map((p,i)=><Particle key={i} style={p}/>)}

      <div style={{width:"100%",maxWidth:980,display:"grid",gridTemplateColumns:"1fr 1fr",borderRadius:"var(--r-2xl)",overflow:"hidden",boxShadow:"0 40px 100px rgba(79,70,229,0.22), 0 4px 24px rgba(0,0,0,0.06)",border:"1px solid rgba(99,110,255,0.2)",animation:"scaleIn 0.6s var(--ease-smooth)"}} className="two-col">

        {/* LEFT PANEL */}
        <div style={{background:"var(--g-hero)",padding:"56px 48px",display:"flex",flexDirection:"column",justifyContent:"space-between",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-160,right:-100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,70,229,0.22) 0%,transparent 70%)",pointerEvents:"none"}} />
          <div style={{position:"absolute",bottom:-100,left:-60,width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(37,99,235,0.15) 0%,transparent 70%)",pointerEvents:"none"}} />
          <div style={{position:"absolute",top:"40%",left:"30%",width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%)",pointerEvents:"none"}} />

          <div style={{position:"relative"}}>
            <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:56}}>
              <div style={{width:44,height:44,borderRadius:14,background:"linear-gradient(135deg,#6366f1,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(99,102,241,0.45)"}}>
                <span style={{color:"#fff",fontWeight:900,fontSize:22,fontFamily:"var(--font-display)"}}>C</span>
              </div>
              <div>
                <div style={{color:"#fff",fontWeight:700,fontSize:17,fontFamily:"var(--font-display)",letterSpacing:"-.01em"}}>Ilmaan Gujii</div>
                <div style={{color:"rgba(255,255,255,0.4)",fontSize:11.5,marginTop:2}}>Interactive Learning Platform</div>
              </div>
            </div>

            <h1 style={{fontFamily:"var(--font-display)",fontSize:42,fontWeight:700,color:"#fff",lineHeight:1.18,marginBottom:18,letterSpacing:"-.02em"}}>
              Control the<br/>
              <span style={{background:"linear-gradient(135deg,#93c5fd,#c4b5fd,#86efac)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",backgroundSize:"200%",animation:"gradientShift 4s ease infinite"}}>
                flow of code
              </span>
            </h1>
            <p style={{color:"rgba(255,255,255,0.48)",fontSize:15,lineHeight:1.78,maxWidth:300}}>
              Master selection, iteration, and jump statements through animated visualizations and step-by-step execution traces.
            </p>
          </div>

          <div style={{position:"relative",display:"flex",flexDirection:"column",gap:13}}>
            {[
              ["🎯","Interactive Code Demos","Watch code execute line by line"],
              ["🎨","Animated Flowcharts","Visual flow for every concept"],
              ["🏆","Quiz & Exam Mode","Test your knowledge instantly"],
            ].map(([icon,t,d])=>(
              <div key={t} style={{display:"flex",gap:13,alignItems:"center",padding:"14px 16px",borderRadius:16,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.09)",backdropFilter:"blur(8px)"}}>
                <span style={{fontSize:22,lineHeight:1}}>{icon}</span>
                <div>
                  <div style={{color:"#fff",fontWeight:600,fontSize:14}}>{t}</div>
                  <div style={{color:"rgba(255,255,255,0.42)",fontSize:12.5,marginTop:2}}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{background:"rgba(255,255,255,0.92)",backdropFilter:"blur(36px)",padding:"52px 48px",display:"flex",flexDirection:"column",justifyContent:"center",gap:8}}>
          <div style={{marginBottom:6}}>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:30,fontWeight:700,color:"var(--ink)",marginBottom:7,letterSpacing:"-.01em"}}>
              {mode==="login"?"Welcome back 👋":"Create account ✨"}
            </h2>
            <p style={{color:"var(--ink3)",fontSize:14,lineHeight:1.7}}>
              {mode==="login"?"Sign in to continue your learning journey":"Join thousands of learners today"}
            </p>
          </div>

          <div style={{display:"flex",background:"rgba(79,70,229,0.06)",borderRadius:15,padding:4,marginBottom:18}}>
            {["login","signup"].map(m=>(
              <button key={m} onClick={()=>{setMode(m);setErrors({});}}
                style={{flex:1,padding:"10px 0",borderRadius:12,border:"none",fontWeight:700,fontSize:13.5,cursor:"pointer",fontFamily:"var(--font-body)",transition:"all 0.3s var(--ease-spring)",background:mode===m?"#fff":"transparent",color:mode===m?"var(--indigo)":"var(--ink3)",boxShadow:mode===m?"0 4px 18px rgba(79,70,229,0.14)":"none"}}>
                {m==="login"?"Sign In":"Sign Up"}
              </button>
            ))}
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {mode==="signup" && (
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                <label style={{fontSize:12.5,fontWeight:700,color:"var(--ink2)",letterSpacing:".01em"}}>Full Name</label>
                <input className={`inp${errors.name?" error":""}`} placeholder="Your full name" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()} />
                {errors.name && <span style={{fontSize:12,color:"var(--rose)",fontWeight:600}}>{errors.name}</span>}
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <label style={{fontSize:12.5,fontWeight:700,color:"var(--ink2)",letterSpacing:".01em"}}>Email</label>
              <input className={`inp${errors.email?" error":""}`} type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()} />
              {errors.email && <span style={{fontSize:12,color:"var(--rose)",fontWeight:600}}>{errors.email}</span>}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <label style={{fontSize:12.5,fontWeight:700,color:"var(--ink2)",letterSpacing:".01em"}}>Password</label>
              <input className={`inp${errors.password?" error":""}`} type="password" placeholder="At least 6 characters" value={form.password} onChange={e=>{setForm(p=>({...p,password:e.target.value}));calcStrength(e.target.value);}} onKeyDown={e=>e.key==="Enter"&&submit()} />
              {form.password && (
                <div style={{display:"flex",gap:5,alignItems:"center",marginTop:5}}>
                  {[0,1,2,3].map(i=>(
                    <div key={i} style={{flex:1,height:3.5,borderRadius:99,background:i<strength?strColors[strength-1]:"rgba(79,70,229,0.12)",transition:"background 0.35s"}} />
                  ))}
                  <span style={{fontSize:11,fontWeight:700,color:strColors[strength-1]||"var(--ink4)",marginLeft:5,minWidth:38}}>{strLabels[strength-1]||""}</span>
                </div>
              )}
              {errors.password && <span style={{fontSize:12,color:"var(--rose)",fontWeight:600}}>{errors.password}</span>}
            </div>
          </div>

          <button className="btn btn-primary" style={{width:"100%",marginTop:22,padding:15,fontSize:15.5,letterSpacing:"-.01em"}} onClick={submit}>
            {loading ? (
              <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:9}}>
                <span style={{width:17,height:17,border:"2.5px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.8s linear infinite",display:"inline-block"}} />
                {mode==="login"?"Signing in…":"Creating account…"}
              </span>
            ) : (mode==="login"?"Sign In →":"Create Account →")}
          </button>

          <div style={{display:"flex",alignItems:"center",gap:12,margin:"14px 0"}}>
            <div style={{flex:1,height:1,background:"var(--border2)"}} />
            <span style={{fontSize:12,color:"var(--ink4)",fontWeight:500}}>or</span>
            <div style={{flex:1,height:1,background:"var(--border2)"}} />
          </div>

          <button onClick={()=>onAuth({name:"Explorer",email:"guest@example.com"})} className="btn btn-ghost" style={{width:"100%",padding:13,fontSize:14}}>
            Continue as Guest →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── TOPICS ────────────────────────────────────────────────────────────────────
const TOPICS = [
  { id:"if",      label:"if-else",        cat:"Selection",  accent:"#059669", g:"var(--g-emerald)" },
  { id:"elif",    label:"if-else-if",     cat:"Selection",  accent:"#2563eb", g:"var(--g-blue)" },
  { id:"nested",  label:"Nested if",      cat:"Selection",  accent:"#7c3aed", g:"var(--g-violet)" },
  { id:"switch",  label:"switch",         cat:"Selection",  accent:"#e11d48", g:"var(--g-rose)" },
  { id:"for",     label:"for Loop",       cat:"Iteration",  accent:"#2563eb", g:"var(--g-blue)" },
  { id:"while",   label:"while Loop",     cat:"Iteration",  accent:"#059669", g:"var(--g-emerald)" },
  { id:"dowhile", label:"do-while",       cat:"Iteration",  accent:"#7c3aed", g:"var(--g-violet)" },
  { id:"nested2", label:"Nested Loops",   cat:"Iteration",  accent:"#d97706", g:"var(--g-amber)" },
  { id:"jump",    label:"Jump Statements",cat:"Jump",       accent:"#e11d48", g:"var(--g-rose)" },
  { id:"quiz",    label:"Quiz",           cat:"Assess",     accent:"#d97706", g:"var(--g-amber)" },
  { id:"exam",    label:"Exam",           cat:"Assess",     accent:"#4f46e5", g:"var(--g-indigo)" },
];

// ── QUIZ DATA ─────────────────────────────────────────────────────────────────
const QUIZ_QS = [
  { q:"What does `break` do inside a loop?", opts:["Skips to next iteration","Exits the entire loop","Restarts the loop","Exits the function"], ans:1, exp:"break immediately terminates the enclosing loop — execution continues after the loop body." },
  { q:"Which loop is guaranteed to execute at least once?", opts:["for loop","while loop","do-while loop","nested loop"], ans:2, exp:"do-while checks its condition AFTER the body executes, so the body always runs at least once." },
  { q:"In `for(int i=0; i<5; i++)`, how many times does the body run?", opts:["4","5","6","Depends"], ans:1, exp:"i takes values 0,1,2,3,4 — that's exactly 5 iterations before i<5 becomes false." },
  { q:"Which is NOT a valid jump statement in C++?", opts:["break","continue","goto","skip"], ans:3, exp:"`skip` doesn't exist in C++. Valid jump statements are: break, continue, goto, and return." },
  { q:"What happens when you omit `break` in a switch case?", opts:["Compile error","Infinite loop","Fall-through to next case","Nothing different"], ans:2, exp:"Without break, execution falls through into the next case's code — this is called fall-through behavior." },
  { q:"Which is best for testing one variable against many constants?", opts:["if-else ladder","for loop","switch statement","while loop"], ans:2, exp:"switch is optimized for multi-way branching on a single integral expression against constant values." },
  { q:"Output of: `for(int i=1;i<=3;i++) cout<<i<<' ';`", opts:["1 2 3 4","1 2 3 ","1 2 ","0 1 2 3"], ans:1, exp:"The loop runs for i=1, i=2, i=3, printing each with a trailing space: '1 2 3 '" },
  { q:"A `while` loop checks its condition:", opts:["Never","After each iteration","Before each iteration","Only once"], ans:2, exp:"while is entry-controlled — the condition is evaluated BEFORE each iteration begins." },
  { q:"What does `continue` do in a loop?", opts:["Exits the loop","Jumps to next case","Skips remaining body, next iteration","Restarts from beginning"], ans:2, exp:"continue skips the rest of the current iteration and proceeds directly to the next iteration." },
  { q:"Which exits a function and optionally returns a value?", opts:["break","exit","return","end"], ans:2, exp:"return exits the current function, optionally passing a value back to the caller." },
];

const EXAM_QS = [
  ...QUIZ_QS,
  { q:"In `do{...}while(x<5)`, if x starts at 10:", opts:["0 times","1 time","5 times","10 times"], ans:1, exp:"do-while executes the body once before checking, so even x=10 failing x<5, the body runs exactly once." },
  { q:"Nested loops outer=3, inner=4 produce total iterations:", opts:["7","12","34","43"], ans:1, exp:"Total = outer × inner = 3 × 4 = 12. Each outer step triggers all inner steps." },
  { q:"Which is NOT valid in a switch expression?", opts:["int x","char c","float f","enum e"], ans:2, exp:"switch works only with integral types (int, char, enum). float and double are not allowed." },
  { q:"`goto` is generally considered:", opts:["Best practice","Required for loops","Harmful — avoid","Modern standard"], ans:2, exp:"goto makes code hard to follow and debug. Modern C++ uses structured control flow instead." },
  { q:"An if with no else, when condition is false:", opts:["Throws error","Executes nothing","Loops back","Exits program"], ans:1, exp:"With no else block, a false condition simply skips the if body entirely." },
];

// ── QUIZ COMPONENT ────────────────────────────────────────────────────────────
function Confetti() {
  const colors=["#4f46e5","#2563eb","#059669","#d97706","#e11d48","#7c3aed"];
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:1000}}>
      {Array.from({length:32},(_,i)=>(
        <div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:"-20px",width:8,height:8,borderRadius:Math.random()>.5?"50%":2,background:colors[i%colors.length],animation:`confettiFall ${1.4+Math.random()*2}s ${Math.random()*1.8}s ease-in both`}} />
      ))}
    </div>
  );
}

function QuizSection({ questions, title, isExam=false }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(isExam ? questions.length*45 : null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(()=>{
    if(!isExam||done) return;
    const t=setInterval(()=>setTimeLeft(p=>{if(p<=1){setDone(true);return 0;}return p-1;}),1000);
    return()=>clearInterval(t);
  },[isExam,done]);

  const choose=(i)=>{
    if(selected!==null) return;
    setSelected(i);
    setTimeout(()=>{
      const newAns=[...answers,{chosen:i,correct:i===questions[current].ans}];
      setAnswers(newAns);
      if(current+1>=questions.length){
        setDone(true);
        const pct=Math.round(newAns.filter(a=>a.correct).length/questions.length*100);
        if(pct>=70) setShowConfetti(true);
      } else { setCurrent(c=>c+1); setSelected(null); }
    }, isExam?350:1200);
  };

  const reset=()=>{setCurrent(0);setSelected(null);setAnswers([]);setDone(false);setTimeLeft(isExam?questions.length*45:null);setShowConfetti(false);};

  if(done) {
    const score=answers.filter(a=>a.correct).length;
    const pct=Math.round((score/questions.length)*100);
    const grade=pct>=90?"A":pct>=80?"B":pct>=70?"C":pct>=60?"D":"F";
    const gColor=pct>=80?"#059669":pct>=60?"#d97706":"#e11d48";
    const circ=2*Math.PI*56;
    return (
      <div style={{padding:"40px 32px",animation:"fadeUp 0.6s ease"}}>
        {showConfetti && <Confetti/>}
        <div style={{maxWidth:600,margin:"0 auto",textAlign:"center"}}>
          <div style={{marginBottom:10,fontSize:14,color:"var(--ink3)",fontWeight:500}}>{isExam?"📋 Exam":"🎯 Quiz"} Complete</div>
          <h2 style={{fontFamily:"var(--font-display)",fontSize:34,fontWeight:700,color:"var(--ink)",marginBottom:32,letterSpacing:"-.01em"}}>
            {pct>=80?"Excellent work! 🎉":pct>=60?"Good effort! 💪":"Keep studying! 📚"}
          </h2>
          <div style={{position:"relative",display:"inline-block",marginBottom:36}}>
            <svg width="148" height="148" viewBox="0 0 148 148">
              <circle cx="74" cy="74" r="56" fill="none" stroke="rgba(79,70,229,0.1)" strokeWidth="11"/>
              <circle cx="74" cy="74" r="56" fill="none" stroke={gColor} strokeWidth="11"
                strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)} strokeLinecap="round"
                transform="rotate(-90 74 74)" style={{transition:"stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)",filter:`drop-shadow(0 0 10px ${gColor}60)`}}/>
            </svg>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"var(--font-display)",fontSize:40,fontWeight:700,color:gColor,lineHeight:1}}>{pct}%</span>
              <span style={{fontSize:14,fontWeight:700,color:gColor}}>Grade {grade}</span>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:32}}>
            {[[score,"✓ Correct","#059669"],[questions.length-score,"✗ Wrong","#e11d48"],[questions.length,"Total","#4f46e5"]].map(([v,l,c])=>(
              <div key={l} className="glass-sm" style={{padding:"18px 12px",textAlign:"center"}}>
                <div style={{fontFamily:"var(--font-display)",fontSize:34,fontWeight:700,color:c}}>{v}</div>
                <div style={{fontSize:12.5,color:"var(--ink3)",fontWeight:600,marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
          {pct>=90 && (
            <div style={{marginBottom:28,padding:"18px 28px",borderRadius:20,background:"linear-gradient(135deg,rgba(217,119,6,0.1),rgba(245,158,11,0.15))",border:"1.5px solid rgba(217,119,6,0.4)",animation:"bouncein 0.5s var(--ease-spring)"}}>
              <div style={{fontSize:30}}>🏆</div>
              <div style={{fontSize:16,fontWeight:700,color:"#92400e",fontFamily:"var(--font-display)"}}>Master Achievement!</div>
              <div style={{fontSize:13,color:"#b45309",marginTop:3}}>You scored 90%+ — Outstanding!</div>
            </div>
          )}
          <div style={{textAlign:"left",marginBottom:32}}>
            {answers.map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 16px",borderRadius:13,marginBottom:7,background:a.correct?"rgba(5,150,105,0.07)":"rgba(225,29,72,0.05)",border:`1px solid ${a.correct?"rgba(5,150,105,0.2)":"rgba(225,29,72,0.15)"}`,animation:`fadeUp 0.35s ${i*0.04}s both`}}>
                <span style={{width:24,height:24,borderRadius:9,background:a.correct?"#059669":"#e11d48",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700,flexShrink:0}}>{a.correct?"✓":"✗"}</span>
                <span style={{fontSize:13,color:"var(--ink2)",flex:1}}>{questions[i].q.substring(0,60)}…</span>
                <span style={{fontSize:11.5,fontWeight:700,color:a.correct?"#059669":"#e11d48"}}>{a.correct?"Correct":"Wrong"}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{padding:"14px 44px",fontSize:15}} onClick={reset}>Try Again ↺</button>
        </div>
      </div>
    );
  }

  const q=questions[current];
  const progress=(current/questions.length)*100;
  return (
    <div style={{padding:"40px 32px",animation:"fadeUp 0.5s ease"}}>
      <div style={{maxWidth:660,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:24,color:"var(--ink)",fontWeight:700,letterSpacing:"-.01em"}}>{title}</h2>
            <span style={{fontSize:13,color:"var(--ink3)",fontWeight:500}}>Question {current+1} of {questions.length}</span>
          </div>
          {isExam&&timeLeft!==null&&(
            <div style={{padding:"12px 20px",borderRadius:15,background:timeLeft<60?"rgba(225,29,72,0.1)":"rgba(79,70,229,0.08)",border:`1.5px solid ${timeLeft<60?"rgba(225,29,72,0.4)":"rgba(79,70,229,0.2)"}`,textAlign:"center"}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:22,fontWeight:700,color:timeLeft<60?"#e11d48":"#4f46e5"}}>{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,"0")}</div>
              <div style={{fontSize:10.5,color:"var(--ink4)"}}>remaining</div>
            </div>
          )}
        </div>
        <div style={{height:5,background:"rgba(79,70,229,0.1)",borderRadius:99,marginBottom:32,overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:99,background:"linear-gradient(90deg,#4f46e5,#2563eb)",width:`${progress}%`,transition:"width 0.6s var(--ease-smooth)",boxShadow:"0 0 12px rgba(79,70,229,0.5)"}} />
        </div>
        <div className="glass" style={{padding:"26px 30px",marginBottom:22}}>
          <p style={{fontSize:17.5,fontWeight:600,color:"var(--ink)",lineHeight:1.72,fontFamily:"var(--font-body)"}}>{q.q}</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:22}}>
          {q.opts.map((opt,i)=>{
            let cls="q-option";
            if(selected!==null){ cls+=" dis"; if(i===q.ans) cls+=" correct"; else if(i===selected&&i!==q.ans) cls+=" wrong"; }
            return (
              <div key={i} className={cls} onClick={()=>choose(i)}>
                <div style={{width:32,height:32,borderRadius:11,background:selected===null?"rgba(79,70,229,0.08)":i===q.ans?"#059669":i===selected?"#e11d48":"rgba(79,70,229,0.06)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.3s",border:`1.5px solid ${selected!==null&&(i===q.ans||i===selected)?"transparent":"var(--border2)"}`}}>
                  <span style={{fontSize:12,fontWeight:800,color:selected!==null&&(i===q.ans||i===selected)?"#fff":"var(--ink3)",fontFamily:"var(--font-mono)"}}>
                    {selected!==null?(i===q.ans?"✓":i===selected?"✗":String.fromCharCode(65+i)):String.fromCharCode(65+i)}
                  </span>
                </div>
                <span style={{fontSize:14.5,color:"var(--ink2)",fontWeight:selected!==null&&i===q.ans?600:400,lineHeight:1.5}}>{opt}</span>
              </div>
            );
          })}
        </div>
        {selected!==null&&!isExam&&(
          <div style={{padding:"18px 22px",borderRadius:17,background:selected===q.ans?"rgba(5,150,105,0.07)":"rgba(225,29,72,0.06)",border:`1.5px solid ${selected===q.ans?"rgba(5,150,105,0.3)":"rgba(225,29,72,0.25)"}`,animation:"fadeIn 0.4s ease"}}>
            <div style={{fontWeight:800,color:selected===q.ans?"#059669":"#e11d48",fontSize:14,marginBottom:7,display:"flex",alignItems:"center",gap:7}}>
              {selected===q.ans?"✅ Correct!":"❌ Incorrect"}
            </div>
            <p style={{fontSize:14,color:"var(--ink2)",lineHeight:1.72,margin:0}}>{q.exp}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SHARED SECTION COMPONENTS ─────────────────────────────────────────────────
function SectionHeader({ title, badge, accent }) {
  return (
    <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
      <h2 style={{fontFamily:"var(--font-display)",fontSize:30,fontWeight:700,color:"var(--ink)",letterSpacing:"-.015em",lineHeight:1.2}}>{title}</h2>
      <span className="pill" style={{background:`${accent}16`,color:accent,border:`1.5px solid ${accent}38`}}>{badge}</span>
    </div>
  );
}

function DemoPanel({ title, children, accent }) {
  return (
    <div style={{border:`1.5px solid ${accent}28`,borderRadius:"var(--r-md)",overflow:"hidden",marginTop:16}}>
      <div style={{padding:"12px 18px",background:`${accent}0e`,borderBottom:`1px solid ${accent}18`,fontSize:13,fontWeight:800,color:accent,display:"flex",alignItems:"center",gap:9}}>
        <span style={{width:8,height:8,borderRadius:"50%",background:accent,boxShadow:`0 0 10px ${accent}`,animation:"glowPulse 2s ease infinite"}} />
        {title}
      </div>
      <div style={{padding:"20px 22px",background:"rgba(255,255,255,0.65)",backdropFilter:"blur(8px)"}}>{children}</div>
    </div>
  );
}

function ResultBubble({ val, accent }) {
  if(!val) return null;
  return (
    <div style={{marginTop:11,padding:"11px 18px",borderRadius:13,background:`${accent}10`,border:`1.5px solid ${accent}32`,fontFamily:"var(--font-mono)",fontSize:13.5,fontWeight:600,color:accent,animation:"fadeIn 0.3s ease",letterSpacing:".01em"}}>
      → {val}
    </div>
  );
}

function FlowCard({ title, children, accent }) {
  return (
    <div className="glass-sm" style={{overflow:"hidden"}}>
      <div style={{padding:"11px 17px",borderBottom:"1px solid var(--border)",background:`${accent}08`,display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:accent,boxShadow:`0 0 10px ${accent}80`}} />
        <span style={{fontSize:12.5,fontWeight:700,color:"var(--ink2)"}}>{title}</span>
      </div>
      <div style={{padding:"18px 16px",background:"rgba(248,250,255,0.7)"}}>{children}</div>
    </div>
  );
}

// ── SECTION: IF-ELSE ──────────────────────────────────────────────────────────
function IfElse() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState("");
  const accent = "#059669";
  const check = () => {
    const n = parseInt(num);
    if(isNaN(n)) return setResult("Please enter a valid integer");
    setResult(n>0?`${n} is Positive (n > 0)`:n<0?`${n} is Negative (n < 0)`:"Zero — exactly 0");
  };
  const execSteps = [
    { line:0, vars:{num:"7"}, note:"Variable num declared and assigned the value 7" },
    { line:2, vars:{num:"7"}, note:"Condition check: is 7 > 0? → TRUE — enter the if block" },
    { line:3, vars:{num:"7",result:'"Positive"'}, note:"Block A runs — prints 'Positive' to console" },
    { line:7, vars:{num:"7",result:'"Positive"'}, note:"else-if and else blocks are completely skipped" },
  ];
  return (
    <div style={{padding:"40px 32px",animation:"fadeUp 0.6s ease"}}>
      <SectionHeader title="if-else Statement" badge="Selection" accent={accent} />
      <p style={{color:"var(--ink3)",fontSize:14.5,lineHeight:1.82,marginBottom:30,maxWidth:640}}>
        The most fundamental decision-making construct. The <code style={{fontFamily:"var(--font-mono)",background:`${accent}12`,padding:"2px 8px",borderRadius:7,color:accent,fontSize:13}}>if</code> block runs when the condition is <strong>true</strong>; the optional <code style={{fontFamily:"var(--font-mono)",background:`${accent}12`,padding:"2px 8px",borderRadius:7,color:accent,fontSize:13}}>else</code> handles the <strong>false</strong> case. Only one branch ever executes.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}} className="two-col">
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
// Output: Positive`}/>
          <DemoPanel title="Live Demo — Number Classifier" accent={accent}>
            <div style={{display:"flex",gap:11,marginBottom:9}}>
              <input className="inp" style={{flex:1}} type="number" placeholder="Enter any integer…" value={num} onChange={e=>setNum(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()}/>
              <button className="btn btn-run" onClick={check}>Run →</button>
            </div>
            <ResultBubble val={result} accent={accent}/>
          </DemoPanel>
        </div>
        <div>
          <FlowCard title="if-else control flow diagram" accent={accent}><FlowIfElse/></FlowCard>
          <ExecutionVisualizer accent={accent} title="Execution trace (num = 7)" speed={1400} code={`int num = 7;
// Check first condition
if (num > 0) {
    cout << "Positive";
} else if (num < 0) {
    cout << "Negative";
} else {
    cout << "Zero";
}`} steps={execSteps}/>
          <TipBox accent={accent} tips={["The else block is optional — omitting it means nothing runs on false","Conditions use &&, ||, ! to combine multiple tests","Always use curly braces, even for single-statement blocks"]}/>
        </div>
      </div>
    </div>
  );
}

// ── SECTION: IF-ELSE-IF ───────────────────────────────────────────────────────
function IfElseIf() {
  const [score, setScore] = useState("");
  const [result, setResult] = useState("");
  const accent = "#2563eb";
  const calc = () => {
    const s = parseInt(score);
    if(isNaN(s)||s<0||s>100) return setResult("Enter a score 0–100");
    setResult(s>=90?"A — Excellent! 🌟":s>=80?"B — Very Good! ✨":s>=70?"C — Good 👍":s>=60?"D — Below Average":"F — Please review");
  };
  return (
    <div style={{padding:"40px 32px",animation:"fadeUp 0.6s ease"}}>
      <SectionHeader title="if-else-if Ladder" badge="Selection" accent={accent}/>
      <p style={{color:"var(--ink3)",fontSize:14.5,lineHeight:1.82,marginBottom:30,maxWidth:640}}>
        Chain multiple conditions vertically. Evaluation happens <strong>top-to-bottom</strong> — the first matching branch executes, then all remaining branches are skipped entirely. Think of it as a series of gates.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}} className="two-col">
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
// grade = "B" (85 >= 80 is first true)`}/>
          <DemoPanel title="Grade Calculator" accent={accent}>
            <div style={{display:"flex",gap:11,marginBottom:9}}>
              <input className="inp" style={{flex:1}} type="number" placeholder="Score 0–100…" value={score} onChange={e=>setScore(e.target.value)} onKeyDown={e=>e.key==="Enter"&&calc()}/>
              <button className="btn btn-run" onClick={calc} style={{background:"var(--g-blue)"}}>Check →</button>
            </div>
            <ResultBubble val={result} accent={accent}/>
            <div style={{display:"flex",gap:7,marginTop:14,flexWrap:"wrap"}}>
              {[["90+","A","#059669"],["80–89","B","#2563eb"],["70–79","C","#7c3aed"],["60–69","D","#d97706"],["<60","F","#e11d48"]].map(([r,g,c])=>(
                <span key={g} className="pill" style={{background:`${c}13`,color:c,border:`1px solid ${c}28`}}>{r} = {g}</span>
              ))}
            </div>
          </DemoPanel>
        </div>
        <div>
          <FlowCard title="Ladder evaluation — top to bottom" accent={accent}>
            <svg width="100%" viewBox="0 0 280 300" xmlns="http://www.w3.org/2000/svg">
              {[["score >= 90?","A","#059669",22],["score >= 80?","B","#2563eb",94],["score >= 70?","C","#7c3aed",166],["else (< 60)","F","#e11d48",238]].map(([c,o,col,y],i)=>(
                <g key={i}>
                  <rect x="8" y={y} width="108" height="32" rx="9" fill={`${col}0d`} stroke={col} strokeWidth="1.5"/>
                  <text x="62" y={y+21} textAnchor="middle" fill="#1e293b" fontSize="11" fontFamily="DM Sans" fontWeight="700">{c}</text>
                  <line x1="116" y1={y+16} x2="142" y2={y+16} stroke={col} strokeWidth="1.5" markerEnd="url(#ma2)"/>
                  <rect x="144" y={y} width="112" height="32" rx="9" fill={`${col}18`} stroke={col} strokeWidth="1.5"/>
                  <text x="200" y={y+21} textAnchor="middle" fill="#1e293b" fontSize="11" fontFamily="DM Sans" fontWeight="700">Grade {o}</text>
                  {i<3&&<line x1="62" y1={y+32} x2="62" y2={y+64} stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="4,3"/>}
                </g>
              ))}
              <text x="62" y="298" textAnchor="middle" fill="var(--ink4)" fontSize="9.5" fontFamily="DM Sans">↓ evaluated top to bottom</text>
            </svg>
          </FlowCard>
          <TipBox accent={accent} tips={["Only the FIRST matching branch runs — rest are ignored","Place the most restrictive condition first","A final else acts as a catch-all safety net"]}/>
        </div>
      </div>
    </div>
  );
}

// ── SECTION: NESTED IF ────────────────────────────────────────────────────────
function NestedIf() {
  const [val, setVal] = useState("");
  const [result, setResult] = useState("");
  const accent = "#7c3aed";
  return (
    <div style={{padding:"40px 32px",animation:"fadeUp 0.6s ease"}}>
      <SectionHeader title="Nested if Statement" badge="Selection" accent={accent}/>
      <p style={{color:"var(--ink3)",fontSize:14.5,lineHeight:1.82,marginBottom:30,maxWidth:640}}>
        An if placed inside another if block. The inner condition <strong>only evaluates</strong> when the outer condition is true — enabling multi-layered, compound decision logic.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}} className="two-col">
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
// num=-3 → "Negative"`}/>
          <DemoPanel title="Positive + Parity Checker" accent={accent}>
            <input className="inp" type="number" placeholder="Enter any number…" value={val}
              onChange={e=>{
                setVal(e.target.value);
                const n=parseInt(e.target.value);
                if(isNaN(n)) return setResult("");
                if(n>0&&n%2===0) setResult(`${n} → Positive AND Even`);
                else if(n>0) setResult(`${n} → Positive but Odd`);
                else if(n<0) setResult(`${n} → Negative`);
                else setResult("Zero");
              }}/>
            <ResultBubble val={result} accent={accent}/>
          </DemoPanel>
        </div>
        <div>
          <FlowCard title="Decision tree — nested conditions" accent={accent}>
            <svg width="100%" viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
              <polygon points="150,20 216,52 150,84 84,52" fill="rgba(124,58,237,0.09)" stroke="#7c3aed" strokeWidth="1.8"/>
              <text x="150" y="49" textAnchor="middle" fill="#1e293b" fontSize="11" fontFamily="DM Sans" fontWeight="700">num &gt; 0?</text>
              <text x="150" y="63" textAnchor="middle" fill="#7c3aed" fontSize="10">outer if</text>
              <line x1="216" y1="52" x2="256" y2="52" stroke="#e11d48" strokeWidth="1.5"/>
              <rect x="256" y="38" width="38" height="28" rx="7" fill="rgba(225,29,72,0.09)" stroke="#e11d48" strokeWidth="1.5"/>
              <text x="275" y="55" textAnchor="middle" fill="#e11d48" fontSize="10" fontWeight="700">Neg.</text>
              <text x="234" y="45" fill="#e11d48" fontSize="9.5" fontWeight="700">false</text>
              <line x1="84" y1="52" x2="42" y2="52" stroke="#059669" strokeWidth="1.5"/>
              <line x1="42" y1="52" x2="42" y2="116" stroke="#059669" strokeWidth="1.5"/>
              <text x="60" y="45" fill="#059669" fontSize="9.5" fontWeight="700">true</text>
              <polygon points="42,116 104,144 42,172 -20,144" fill="rgba(217,119,6,0.09)" stroke="#d97706" strokeWidth="1.8"/>
              <text x="42" y="141" textAnchor="middle" fill="#1e293b" fontSize="10.5" fontWeight="700">%2 == 0?</text>
              <text x="42" y="155" textAnchor="middle" fill="#d97706" fontSize="10">inner if</text>
              <line x1="104" y1="144" x2="140" y2="144" stroke="#e11d48" strokeWidth="1.5"/>
              <rect x="140" y="130" width="46" height="28" rx="7" fill="rgba(225,29,72,0.09)" stroke="#e11d48" strokeWidth="1.5"/>
              <text x="163" y="148" textAnchor="middle" fill="#e11d48" fontSize="10" fontWeight="700">Odd</text>
              <text x="124" y="137" fill="#e11d48" fontSize="9.5" fontWeight="700">false</text>
              <line x1="42" y1="172" x2="42" y2="200" stroke="#2563eb" strokeWidth="1.5"/>
              <text x="54" y="192" fill="#2563eb" fontSize="9.5" fontWeight="700">true</text>
              <rect x="10" y="200" width="64" height="28" rx="7" fill="rgba(37,99,235,0.09)" stroke="#2563eb" strokeWidth="1.5"/>
              <text x="42" y="218" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="700">Even</text>
            </svg>
          </FlowCard>
          <TipBox accent={accent} tips={["Inner conditions only evaluate when outer is true","Limit nesting to 2–3 levels for readability","Guard clauses (early returns) can often reduce nesting"]}/>
        </div>
      </div>
    </div>
  );
}

// ── SECTION: SWITCH ───────────────────────────────────────────────────────────
function SwitchSection() {
  const [grade, setGrade] = useState("");
  const [letter, setLetter] = useState("");
  const accent = "#e11d48";
  return (
    <div style={{padding:"40px 32px",animation:"fadeUp 0.6s ease"}}>
      <SectionHeader title="switch Statement" badge="Selection" accent={accent}/>
      <p style={{color:"var(--ink3)",fontSize:14.5,lineHeight:1.82,marginBottom:30,maxWidth:640}}>
        Tests a single expression against multiple constants. Each case must end with <code style={{fontFamily:"var(--font-mono)",background:`${accent}12`,padding:"2px 8px",borderRadius:7,color:accent,fontSize:13}}>break</code> to prevent fall-through. Works with <strong>int, char, and enum</strong> — not float or string.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}} className="two-col">
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
// Output: Very Good!`}/>
          <DemoPanel title="Interactive Switch Demo" accent={accent}>
            <div style={{marginBottom:16}}>
              <select className="inp" onChange={e=>{
                const m={A:"A → Excellent! 🌟",B:"B → Very Good! ✨",C:"C → Good 👍",D:"D → Needs improvement",F:"F → Review material 📚"};
                setGrade(m[e.target.value]||"");
              }}>
                <option value="">Select a grade…</option>
                {["A","B","C","D","F"].map(g=><option key={g}>{g}</option>)}
              </select>
              <ResultBubble val={grade} accent={accent}/>
            </div>
            <div>
              <label style={{fontSize:12.5,color:"var(--ink3)",fontWeight:600,display:"block",marginBottom:7}}>Vowel checker (type one letter)</label>
              <input className="inp" maxLength={1} placeholder="Type a letter…" onChange={e=>{
                const c=e.target.value.toLowerCase();
                if("aeiou".includes(c)) setLetter(`'${c}' is a Vowel`);
                else if(c>="a"&&c<="z") setLetter(`'${c}' is a Consonant`);
                else if(c) setLetter("Letters only");
                else setLetter("");
              }}/>
              <ResultBubble val={letter} accent={accent}/>
            </div>
          </DemoPanel>
        </div>
        <div>
          <FlowCard title="switch branching" accent={accent}>
            <svg viewBox="0 0 280 310" style={{width:"100%"}} xmlns="http://www.w3.org/2000/svg">
              <rect x="88" y="12" width="104" height="34" rx="11" fill="rgba(225,29,72,0.09)" stroke="#e11d48" strokeWidth="1.8"/>
              <text x="140" y="33" textAnchor="middle" fill="#9f1239" fontSize="12" fontFamily="DM Sans" fontWeight="700">switch(grade)</text>
              <line x1="140" y1="46" x2="140" y2="62" stroke="#94a3b8" strokeWidth="1.5"/>
              <line x1="36" y1="62" x2="244" y2="62" stroke="#94a3b8" strokeWidth="1.5"/>
              {[["'A'","Excellent!","#059669",36],["'B'","Very Good!","#2563eb",140],["default","Study!","#d97706",244]].map(([c,o,col,x])=>(
                <g key={c}>
                  <line x1={x} y1="62" x2={x} y2="86" stroke={col} strokeWidth="1.5"/>
                  <text x={x} y="80" textAnchor="middle" fill={col} fontSize="10" fontWeight="700">{c}</text>
                  <rect x={x-50} y="86" width="100" height="38" rx="10" fill={`${col}11`} stroke={col} strokeWidth="1.5"/>
                  <text x={x} y="108" textAnchor="middle" fill="#1e293b" fontSize="11.5" fontFamily="DM Sans" fontWeight="700">{o}</text>
                  <line x1={x} y1="124" x2={x} y2="226" stroke={col} strokeWidth="1.4" strokeDasharray="4,3"/>
                </g>
              ))}
              <line x1="36" y1="226" x2="244" y2="226" stroke="#94a3b8" strokeWidth="1.4"/>
              <line x1="140" y1="226" x2="140" y2="250" stroke="#94a3b8" strokeWidth="1.5"/>
              <rect x="78" y="250" width="124" height="36" rx="11" fill="rgba(79,70,229,0.09)" stroke="#4f46e5" strokeWidth="1.5"/>
              <text x="140" y="272" textAnchor="middle" fill="#4f46e5" fontSize="11.5" fontFamily="DM Sans" fontWeight="700">continue after switch</text>
            </svg>
          </FlowCard>
          <TipBox accent={accent} tips={["break prevents fall-through to the next case","Omitting break intentionally lets multiple cases share code","default is optional but recommended as a safety net","switch only works with integral/enum types"]}/>
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
  const accent = "#2563eb";
  const run = () => {
    const v=parseInt(n);
    if(isNaN(v)||v<1||v>20) return setOut("Enter 1–20");
    const arr=Array.from({length:v},(_,i)=>i+1);
    const nums=mode==="up"?arr:mode==="down"?[...arr].reverse():arr.filter(x=>x%2===0);
    setOut(nums.join(" → "));
  };
  const execSteps = [
    { line:0, vars:{i:"1"}, note:"Initialization: i = 1 — this runs only ONCE at the very start" },
    { line:0, vars:{i:"1","i<=5":"true"}, note:"Condition check: is 1 ≤ 5? → TRUE — enter the loop body" },
    { line:1, vars:{i:"1",output:'"1 "'}, note:"Body executes: prints the current value of i" },
    { line:0, vars:{i:"2","i<=5":"true"}, note:"Increment: i++ makes i = 2, then condition is checked again" },
    { line:1, vars:{i:"2",output:'"1 2 "'}, note:"Body executes again with i = 2" },
    { line:0, vars:{i:"5"}, note:"… continues cycling through check → body → increment…" },
    { line:0, vars:{i:"6","i<=5":"false"}, note:"Condition: 6 ≤ 5 → FALSE — EXIT loop immediately!" },
  ];
  return (
    <div style={{padding:"40px 32px",animation:"fadeUp 0.6s ease"}}>
      <SectionHeader title="for Loop" badge="Iteration" accent={accent}/>
      <p style={{color:"var(--ink3)",fontSize:14.5,lineHeight:1.82,marginBottom:30,maxWidth:640}}>
        Three-part header in one line: <em>initialize</em>, <em>condition</em>, <em>increment</em>. Best when the number of iterations is <strong>known in advance</strong>. All three parts are optional — <code style={{fontFamily:"var(--font-mono)",background:`${accent}12`,padding:"2px 8px",borderRadius:7,color:accent,fontSize:13}}>for(;;)</code> creates an infinite loop.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}} className="two-col">
        <div>
          <CodeBlock accent={accent} label="for — anatomy & patterns" code={`// for(init; condition; increment)
for (int i = 1; i <= n; i++) {
    cout << i << " ";
}

// Count DOWN
for (int i = n; i >= 1; i--) {
    cout << i << " ";
}

// Even numbers only
for (int i = 2; i <= n; i += 2) {
    cout << i << " ";
}

// Multiple variables
for (int i=0, j=10; i<j; i++, j--) {
    cout << i << "," << j << " ";
}`}/>
          <DemoPanel title="for Loop Playground" accent={accent}>
            <div style={{display:"flex",gap:7,marginBottom:14}}>
              {["up","down","even"].map(m=>(
                <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"9px 4px",borderRadius:11,border:`1.5px solid ${mode===m?accent:"var(--border2)"}`,background:mode===m?`${accent}13`:"transparent",color:mode===m?accent:"var(--ink3)",fontSize:12.5,fontWeight:700,cursor:"pointer",transition:"all 0.22s",fontFamily:"var(--font-body)"}}>
                  {m==="up"?"Count Up":m==="down"?"Count Down":"Evens Only"}
                </button>
              ))}
            </div>
            <div style={{display:"flex",gap:11,marginBottom:9}}>
              <input className="inp" style={{flex:1}} type="number" placeholder="n = ? (1–20)" value={n} onChange={e=>setN(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}/>
              <button className="btn btn-run" onClick={run} style={{background:"var(--g-blue)"}}>Run →</button>
            </div>
            <ResultBubble val={out} accent={accent}/>
          </DemoPanel>
          <LoopAnimator type="for" n={5} accent={accent}/>
        </div>
        <div>
          <FlowCard title="for loop flowchart" accent={accent}><FlowForLoop/></FlowCard>
          <ExecutionVisualizer accent={accent} title="Step-by-step trace (n=5)" speed={1400} code={`for (int i=1; i<=5; i++) {
    cout << i << " ";
}`} steps={execSteps}/>
          <TipBox accent={accent} tips={["Init runs exactly ONCE before the loop starts","Condition is checked before EVERY single iteration","Increment runs after every body execution","Any of the 3 parts can be left empty"]}/>
        </div>
      </div>
    </div>
  );
}

// ── SECTION: WHILE LOOP ───────────────────────────────────────────────────────
function WhileLoop() {
  const [n, setN] = useState("");
  const [out, setOut] = useState("");
  const accent = "#059669";
  const run = () => {
    const v=parseInt(n);
    if(isNaN(v)||v<1||v>20) return setOut("Enter 1–20");
    const arr=[]; let i=1;
    while(i<=v){ arr.push(i); i++; }
    setOut(arr.join(" → "));
  };
  return (
    <div style={{padding:"40px 32px",animation:"fadeUp 0.6s ease"}}>
      <SectionHeader title="while Loop" badge="Iteration" accent={accent}/>
      <p style={{color:"var(--ink3)",fontSize:14.5,lineHeight:1.82,marginBottom:30,maxWidth:640}}>
        Entry-controlled loop — the condition is evaluated <strong>before each iteration</strong>. If the condition starts false, the body <strong>never runs</strong>. Ideal when the iteration count depends on runtime conditions.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}} className="two-col">
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
}`}/>
          <DemoPanel title="while Loop Playground" accent={accent}>
            <div style={{display:"flex",gap:11,marginBottom:9}}>
              <input className="inp" style={{flex:1}} type="number" placeholder="n = ? (1–20)" value={n} onChange={e=>setN(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}/>
              <button className="btn btn-run" onClick={run}>Run →</button>
            </div>
            <ResultBubble val={out} accent={accent}/>
            <div style={{marginTop:12,padding:"12px 16px",background:"rgba(217,119,6,0.07)",border:"1px solid rgba(217,119,6,0.22)",borderRadius:13,fontSize:13.5,color:"#92400e",lineHeight:1.6,fontWeight:500}}>
              ⚠️ Always update the loop variable — forgetting <code style={{fontFamily:"var(--font-mono)",fontSize:12}}>i++</code> creates an infinite loop!
            </div>
          </DemoPanel>
          <LoopAnimator type="while" n={5} accent={accent}/>
        </div>
        <div>
          <FlowCard title="while — entry-controlled flow" accent={accent}>
            <svg viewBox="0 0 340 320" style={{width:"100%"}} xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="gwl2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#059669"/><stop offset="100%" stopColor="#0891b2"/></linearGradient></defs>
              <rect x="116" y="14" width="108" height="34" rx="13" fill="url(#gwl2)"/>
              <text x="170" y="36" textAnchor="middle" fill="white" fontSize="13" fontFamily="Space Grotesk" fontWeight="700">START</text>
              <line x1="170" y1="48" x2="170" y2="76" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#mf1)"/>
              <polygon points="170,76 244,110 170,144 96,110" fill="rgba(217,119,6,0.09)" stroke="#d97706" strokeWidth="1.8"/>
              <text x="170" y="107" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="700">i ≤ n?</text>
              <text x="170" y="122" textAnchor="middle" fill="#d97706" fontSize="10.5">condition</text>
              <line x1="170" y1="144" x2="170" y2="170" stroke="#059669" strokeWidth="1.5" markerEnd="url(#mf2)"/>
              <text x="184" y="162" fill="#059669" fontSize="10" fontWeight="700">true</text>
              <rect x="100" y="170" width="140" height="46" rx="13" fill="rgba(5,150,105,0.09)" stroke="#059669" strokeWidth="1.8"/>
              <text x="170" y="191" textAnchor="middle" fill="#065f46" fontSize="12.5" fontWeight="700">Execute body</text>
              <text x="170" y="206" textAnchor="middle" fill="#059669" fontSize="11">cout &lt;&lt; i; i++</text>
              <path d="M100 193 Q54 193 54 110 Q54 76 94 76" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#mf1)"/>
              <text x="32" y="152" fill="#7c3aed" fontSize="9.5" textAnchor="middle" transform="rotate(-90,32,152)">loop back</text>
              <line x1="244" y1="110" x2="298" y2="110" stroke="#e11d48" strokeWidth="1.5"/>
              <line x1="298" y1="110" x2="298" y2="270" stroke="#e11d48" strokeWidth="1.5"/>
              <line x1="298" y1="270" x2="242" y2="270" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#mf1)"/>
              <text x="275" y="102" fill="#e11d48" fontSize="10" fontWeight="700">false</text>
              <rect x="116" y="256" width="126" height="30" rx="11" fill="url(#gwl2)"/>
              <text x="179" y="275" textAnchor="middle" fill="white" fontSize="12.5" fontFamily="Space Grotesk" fontWeight="700">END</text>
            </svg>
          </FlowCard>
          <TipBox accent={accent} tips={["Condition checked BEFORE each iteration — may run 0 times","Use when iteration count is unknown at compile time","Classic use: reading input until a sentinel value"]}/>
        </div>
      </div>
    </div>
  );
}

// ── SECTION: DO-WHILE ─────────────────────────────────────────────────────────
function DoWhile() {
  const [n, setN] = useState("");
  const [out, setOut] = useState("");
  const accent = "#7c3aed";
  const run = () => {
    const v=parseInt(n);
    if(isNaN(v)||v<1||v>20) return setOut("Enter 1–20");
    const arr=[]; let i=1;
    do{ arr.push(i); i++; }while(i<=v);
    setOut(arr.join(" → "));
  };
  return (
    <div style={{padding:"40px 32px",animation:"fadeUp 0.6s ease"}}>
      <SectionHeader title="do-while Loop" badge="Iteration" accent={accent}/>
      <p style={{color:"var(--ink3)",fontSize:14.5,lineHeight:1.82,marginBottom:30,maxWidth:640}}>
        Exit-controlled loop — the body <strong>always executes at least once</strong> before the condition is checked. Ideal for menu-driven programs and input validation where one guaranteed run is needed.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}} className="two-col">
        <div>
          <CodeBlock accent={accent} label="do-while — guaranteed execution" code={`// Note the semicolon after while!
int i = 1;
do {
    cout << i << " ";
    i++;
} while (i <= n);   // ← semicolon required

// Menu-driven program:
int choice;
do {
    cout << "1. Play  2. Quit\\n";
    cin >> choice;
} while (choice < 1 || choice > 2);
// Menu ALWAYS shows at least once!

// Key difference — if n = 0:
// while(n > 0) → body NEVER runs
// do-while     → body runs ONCE`}/>
          <DemoPanel title="do-while Playground" accent={accent}>
            <div style={{display:"flex",gap:11,marginBottom:9}}>
              <input className="inp" style={{flex:1}} type="number" placeholder="n = ? (1–20)" value={n} onChange={e=>setN(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}/>
              <button className="btn btn-run" onClick={run} style={{background:"var(--g-violet)"}}>Run →</button>
            </div>
            <ResultBubble val={out} accent={accent}/>
            <div style={{marginTop:12,padding:"12px 16px",background:`${accent}09`,border:`1px solid ${accent}22`,borderRadius:13,fontSize:13.5,color:"var(--ink2)",lineHeight:1.65}}>
              💡 Try entering 0 or a negative number — the body still runs once! That's the key difference from while.
            </div>
          </DemoPanel>
          <LoopAnimator type="dowhile" n={4} accent={accent}/>
        </div>
        <div>
          <FlowCard title="do-while — exit-controlled flow" accent={accent}>
            <svg viewBox="0 0 340 310" style={{width:"100%"}} xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="gdw2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#2563eb"/></linearGradient></defs>
              <rect x="116" y="12" width="108" height="32" rx="12" fill="url(#gdw2)"/>
              <text x="170" y="32" textAnchor="middle" fill="white" fontSize="13" fontFamily="Space Grotesk" fontWeight="700">START</text>
              <line x1="170" y1="44" x2="170" y2="70" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#mf1)"/>
              <rect x="100" y="70" width="140" height="48" rx="13" fill="rgba(124,58,237,0.09)" stroke="#7c3aed" strokeWidth="1.8"/>
              <text x="170" y="91" textAnchor="middle" fill="#3b1f6e" fontSize="12.5" fontWeight="700">Execute body</text>
              <text x="170" y="107" textAnchor="middle" fill="#7c3aed" fontSize="11">runs first, always!</text>
              <line x1="170" y1="118" x2="170" y2="148" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#mf1)"/>
              <polygon points="170,148 244,182 170,216 96,182" fill="rgba(217,119,6,0.09)" stroke="#d97706" strokeWidth="1.8"/>
              <text x="170" y="179" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="700">condition?</text>
              <text x="170" y="194" textAnchor="middle" fill="#d97706" fontSize="10.5">check AFTER body</text>
              <path d="M96 182 Q52 182 52 94 Q52 70 98 70" fill="none" stroke="#059669" strokeWidth="1.5" markerEnd="url(#mf2)"/>
              <text x="30" y="140" fill="#059669" fontSize="9.5" textAnchor="middle" transform="rotate(-90,30,140)">true</text>
              <line x1="244" y1="182" x2="298" y2="182" stroke="#e11d48" strokeWidth="1.5"/>
              <line x1="298" y1="182" x2="298" y2="264" stroke="#e11d48" strokeWidth="1.5"/>
              <line x1="298" y1="264" x2="242" y2="264" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#mf1)"/>
              <text x="274" y="174" fill="#e11d48" fontSize="10" fontWeight="700">false</text>
              <rect x="118" y="250" width="124" height="28" rx="11" fill="url(#gdw2)"/>
              <text x="180" y="268" textAnchor="middle" fill="white" fontSize="12.5" fontFamily="Space Grotesk" fontWeight="700">END</text>
            </svg>
          </FlowCard>
          <TipBox accent={accent} tips={["Body executes BEFORE condition is checked","Always runs at least once — no matter what!","Semicolon after while(…) is REQUIRED","Perfect for menus that must show at least once"]}/>
        </div>
      </div>
    </div>
  );
}

// ── SECTION: NESTED LOOPS ─────────────────────────────────────────────────────
function NestedLoops() {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const accent = "#d97706";
  return (
    <div style={{padding:"40px 32px",animation:"fadeUp 0.6s ease"}}>
      <SectionHeader title="Nested Loops" badge="Iteration" accent={accent}/>
      <p style={{color:"var(--ink3)",fontSize:14.5,lineHeight:1.82,marginBottom:30,maxWidth:640}}>
        A loop inside another loop. The inner loop completes <strong>all its iterations</strong> for each single step of the outer loop. Total iterations = outer × inner. Essential for 2D arrays, patterns, and matrices.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}} className="two-col">
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
// 3  6  9`}/>
        </div>
        <div>
          <FlowCard title="Pattern Generator" accent={accent}>
            <div style={{display:"flex",gap:14,marginBottom:18,alignItems:"center"}}>
              <div style={{flex:1}}>
                <label style={{fontSize:11.5,color:"var(--ink3)",fontWeight:700,display:"block",marginBottom:6}}>Rows: {rows}</label>
                <input type="range" min={1} max={8} value={rows} onChange={e=>setRows(+e.target.value)} style={{width:"100%",accentColor:accent}}/>
              </div>
              <div style={{flex:1}}>
                <label style={{fontSize:11.5,color:"var(--ink3)",fontWeight:700,display:"block",marginBottom:6}}>Cols: {cols}</label>
                <input type="range" min={1} max={8} value={cols} onChange={e=>setCols(+e.target.value)} style={{width:"100%",accentColor:accent}}/>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div style={{background:"rgba(248,250,255,0.85)",borderRadius:13,padding:16,border:"1px solid var(--border)"}}>
                <div style={{fontSize:10.5,fontWeight:700,color:"var(--ink3)",marginBottom:9,textTransform:"uppercase",letterSpacing:".06em"}}>Triangle</div>
                {Array.from({length:rows},(_,i)=>(
                  <div key={i} style={{fontFamily:"var(--font-mono)",fontSize:15,lineHeight:2,color:accent,animation:`fadeIn 0.3s ${i*0.05}s both`}}>
                    {"●  ".repeat(Math.min(i+1,cols)).trim()}
                  </div>
                ))}
              </div>
              <div style={{background:"rgba(248,250,255,0.85)",borderRadius:13,padding:16,border:"1px solid var(--border)"}}>
                <div style={{fontSize:10.5,fontWeight:700,color:"var(--ink3)",marginBottom:9,textTransform:"uppercase",letterSpacing:".06em"}}>Table</div>
                {Array.from({length:Math.min(rows,6)},(_,i)=>(
                  <div key={i} style={{display:"flex",gap:9,lineHeight:2}}>
                    {Array.from({length:Math.min(cols,6)},(_,j)=>(
                      <span key={j} style={{fontSize:12,fontFamily:"var(--font-mono)",minWidth:22,textAlign:"center",color:i===j?"#e11d48":"var(--ink2)",fontWeight:i===j?800:400}}>
                        {(i+1)*(j+1)}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginTop:14,padding:"11px 16px",background:`${accent}10`,borderRadius:13,fontSize:13.5,color:accent,fontWeight:800,textAlign:"center",border:`1.5px solid ${accent}28`}}>
              {rows} × {cols} = {rows*cols} total iterations
            </div>
          </FlowCard>
          <TipBox accent={accent} tips={["Total iterations = outer count × inner count","Use different variable names: i, j, k…","break only exits the innermost loop","Nested complexity grows multiplicatively"]}/>
        </div>
      </div>
    </div>
  );
}

// ── SECTION: JUMP STATEMENTS ──────────────────────────────────────────────────
function JumpStatements() {
  const accent = "#e11d48";
  const jumps = [
    { name:"break", color:"#e11d48", g:"var(--g-rose)", desc:"Immediately exits the enclosing loop or switch statement.", code:`for (int i = 1; i <= 10; i++) {
    if (i == 5) break;  // exit at 5
    cout << i << " ";
}
// Output: 1 2 3 4` },
    { name:"continue", color:"#2563eb", g:"var(--g-blue)", desc:"Skips the rest of the current iteration and jumps to the next.", code:`for (int i = 1; i <= 6; i++) {
    if (i == 3) continue;
    cout << i << " ";
}
// Output: 1 2 4 5 6` },
    { name:"goto", color:"#d97706", g:"var(--g-amber)", desc:"Unconditionally jumps to a labeled statement. Avoid in modern code.", code:`int i = 1;
start:
    cout << i++ << " ";
    if (i <= 3) goto start;
// Output: 1 2 3
// ⚠️ Avoid goto — use loops!` },
    { name:"return", color:"#059669", g:"var(--g-emerald)", desc:"Exits the current function and optionally returns a value.", code:`int square(int x) {
    return x * x;  // exits & returns
}
bool isEven(int n) {
    return (n % 2 == 0);
}` },
  ];
  return (
    <div style={{padding:"40px 32px",animation:"fadeUp 0.6s ease"}}>
      <SectionHeader title="Jump Statements" badge="Jump" accent={accent}/>
      <p style={{color:"var(--ink3)",fontSize:14.5,lineHeight:1.82,marginBottom:30,maxWidth:640}}>
        Alter the sequential flow of loops and functions. C++ provides four jump statements, each serving a distinct purpose in controlling program execution.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:26}} className="two-col">
        {jumps.map(({name,color,g,desc,code})=>(
          <div key={name} style={{border:`1.5px solid ${color}22`,borderRadius:"var(--r-md)",overflow:"hidden",background:"rgba(255,255,255,0.65)",backdropFilter:"blur(8px)",boxShadow:`0 6px 24px ${color}0e`}}>
            <div style={{padding:"16px 20px",background:`linear-gradient(135deg,${color}10,${color}05)`,borderBottom:`1px solid ${color}18`,display:"flex",gap:11,alignItems:"flex-start"}}>
              <div style={{width:38,height:38,borderRadius:11,background:g,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 4px 14px ${color}40`}}>
                <span style={{color:"#fff",fontFamily:"var(--font-mono)",fontSize:11.5,fontWeight:700}}>{name}</span>
              </div>
              <div>
                <div style={{fontWeight:800,color,fontSize:15,fontFamily:"var(--font-mono)",marginBottom:4}}>{name}</div>
                <div style={{fontSize:12.5,color:"var(--ink3)",lineHeight:1.6}}>{desc}</div>
              </div>
            </div>
            <CodeBlock label={`${name} — example`} code={code}/>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(255,255,255,0.65)",backdropFilter:"blur(14px)",borderRadius:"var(--r-md)",padding:"20px 24px",border:"1px solid var(--border2)"}}>
        <div style={{fontSize:11,fontWeight:800,color:"var(--ink3)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:16}}>Quick Reference</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13}} className="two-col">
          {[["break","Exits loop/switch","#e11d48"],["continue","Next iteration","#2563eb"],["goto","Jump to label","#d97706"],["return","Exits function","#059669"]].map(([k,v,c])=>(
            <div key={k} style={{textAlign:"center",padding:"16px 12px",background:`${c}07`,borderRadius:15,border:`1.5px solid ${c}22`}}>
              <div style={{fontFamily:"var(--font-mono)",fontWeight:800,color:c,fontSize:16,marginBottom:6}}>{k}</div>
              <div style={{fontSize:12,color:"var(--ink3)",fontWeight:500,lineHeight:1.5}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── HERO SECTION ──────────────────────────────────────────────────────────────
function HeroSection({ user }) {
  const [tick, setTick] = useState(0);
  const nodes = [
    { x:12, y:22, label:"if-else", color:"#059669" },
    { x:38, y:14, label:"for loop", color:"#2563eb" },
    { x:64, y:22, label:"switch", color:"#e11d48" },
    { x:25, y:52, label:"while", color:"#7c3aed" },
    { x:50, y:58, label:"break", color:"#d97706" },
    { x:75, y:48, label:"do-while", color:"#0891b2" },
  ];

  useEffect(()=>{
    const t=setInterval(()=>setTick(p=>p+1),2200);
    return()=>clearInterval(t);
  },[]);

  const activeNode = tick % nodes.length;

  return (
    <div style={{background:"var(--g-hero)",padding:"0 0",position:"relative",overflow:"hidden",minHeight:340}}>
      {/* Animated mesh orbs */}
      <div style={{position:"absolute",top:-180,left:-100,width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,70,229,0.2) 0%,transparent 65%)",animation:"floatA 10s ease-in-out infinite",pointerEvents:"none"}} />
      <div style={{position:"absolute",top:-80,right:-120,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(37,99,235,0.15) 0%,transparent 65%)",animation:"floatB 13s ease-in-out infinite",pointerEvents:"none"}} />
      <div style={{position:"absolute",bottom:-120,left:"35%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 65%)",animation:"floatA 16s ease-in-out infinite reverse",pointerEvents:"none"}} />

      {/* Animated grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(148,163,255,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,255,0.055) 1px,transparent 1px)",backgroundSize:"44px 44px",pointerEvents:"none"}} />

      {/* Floating node graph */}
      <div style={{position:"absolute",right:"4%",top:"50%",transform:"translateY(-50%)",width:300,height:180,opacity:0.55,pointerEvents:"none"}}>
        <svg viewBox="0 0 100 80" style={{width:"100%",height:"100%"}}>
          {nodes.map((n,i)=>{
            const isActive=i===activeNode;
            return (
              <g key={i}>
                {nodes.map((n2,j)=>{
                  if(j<=i) return null;
                  const dx=n2.x-n.x, dy=n2.y-n.y;
                  if(Math.sqrt(dx*dx+dy*dy)>32) return null;
                  return <line key={j} x1={n.x} y1={n.y} x2={n2.x} y2={n2.y} stroke="rgba(148,163,255,0.3)" strokeWidth="0.4"/>;
                })}
                <circle cx={n.x} cy={n.y} r={isActive?4:2.5} fill={n.color} opacity={isActive?1:0.5} style={{transition:"all 0.6s var(--ease-smooth)",filter:isActive?`drop-shadow(0 0 6px ${n.color})`:"none"}}/>
                {isActive&&(
                  <text x={n.x} y={n.y-6} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="3.5" fontFamily="DM Sans">{n.label}</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{maxWidth:1380,margin:"0 auto",padding:"52px 32px 48px",position:"relative"}}>
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {["Selection","Iteration","Jump"].map(t=>{
            const c={Selection:"#059669",Iteration:"#2563eb",Jump:"#e11d48"}[t];
            return <span key={t} className="pill" style={{background:`${c}22`,color:c,border:`1px solid ${c}40`}}>{t}</span>;
          })}
        </div>

        <h1 style={{fontFamily:"var(--font-display)",fontSize:50,fontWeight:700,color:"#fff",lineHeight:1.14,marginBottom:18,letterSpacing:"-.025em",maxWidth:700}}>
          Control the{" "}
          <span style={{background:"linear-gradient(90deg,#93c5fd 0%,#c4b5fd 40%,#86efac 80%,#93c5fd 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",backgroundSize:"200% 100%",animation:"gradientShift 5s ease infinite"}}>
            flow of execution
          </span>
        </h1>

        <p style={{color:"rgba(255,255,255,0.5)",fontSize:16,lineHeight:1.82,maxWidth:560,marginBottom:32}}>
          Master <strong style={{color:"rgba(255,255,255,0.75)"}}>selection, iteration, and jump statements</strong> through animated visualizations, slow-motion execution traces, and interactive flowcharts — designed for students learning at their own pace.
        </p>

        <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[["11","Topics"],["40+","Examples"],["15","Quiz Qs"],["∞","Practice"]].map(([n,l])=>(
              <div key={l} style={{padding:"10px 18px",borderRadius:14,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",backdropFilter:"blur(8px)",textAlign:"center"}}>
                <div style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:700,color:"#fff",lineHeight:1}}>{n}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
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

  if(!user) return <AuthScreen onAuth={setUser}/>;

  const catColors = { Selection:"#059669", Iteration:"#2563eb", Jump:"#e11d48", Assess:"#d97706" };
  const cats = [...new Set(TOPICS.map(t=>t.cat))];

  const renderContent = () => {
    switch(active) {
      case "if":      return <IfElse key="if"/>;
      case "elif":    return <IfElseIf key="elif"/>;
      case "nested":  return <NestedIf key="nested"/>;
      case "switch":  return <SwitchSection key="switch"/>;
      case "for":     return <ForLoop key="for"/>;
      case "while":   return <WhileLoop key="while"/>;
      case "dowhile": return <DoWhile key="dowhile"/>;
      case "nested2": return <NestedLoops key="nested2"/>;
      case "jump":    return <JumpStatements key="jump"/>;
      case "quiz":    return <QuizSection key="quiz" questions={QUIZ_QS} title="Knowledge Check"/>;
      case "exam":    return <QuizSection key="exam" questions={EXAM_QS} title="Chapter 3 Exam" isExam/>;
      default:        return null;
    }
  };

  const curTopic = TOPICS.find(t=>t.id===active);

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)"}}>
      {/* HEADER */}
      <header style={{position:"sticky",top:0,zIndex:200,background:"rgba(245,247,255,0.88)",backdropFilter:"blur(28px) saturate(1.5)",borderBottom:"1px solid rgba(99,110,255,0.16)",boxShadow:"0 2px 24px rgba(79,70,229,0.07)"}}>
        <div style={{maxWidth:1380,margin:"0 auto",padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
          <div style={{display:"flex",alignItems:"center",gap:13}}>
            <div style={{width:38,height:38,borderRadius:12,background:"linear-gradient(135deg,#4f46e5,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 18px rgba(79,70,229,0.38)"}}>
              <span style={{color:"#fff",fontWeight:900,fontSize:20,fontFamily:"var(--font-display)"}}>C</span>
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:15.5,color:"var(--ink)",lineHeight:1,fontFamily:"var(--font-display)",letterSpacing:"-.01em"}}>Ilmaan Gujii</div>
              <div style={{fontSize:11,color:"var(--ink4)",letterSpacing:".03em",marginTop:2}}>Chapter 3 · Control Statements</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            {curTopic && (
              <span className="pill" style={{background:`${curTopic.accent}14`,color:curTopic.accent,border:`1px solid ${curTopic.accent}30`}} className="hide-mobile">
                {curTopic.label}
              </span>
            )}
            <div style={{fontSize:13.5,color:"var(--ink3)",fontWeight:500}}>
              Hello, <strong style={{color:"var(--ink)",fontWeight:700}}>{user.name}</strong>
            </div>
            <button onClick={()=>setUser(null)} className="btn btn-ghost" style={{padding:"8px 18px",fontSize:13}}>Sign out</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <HeroSection user={user}/>

      {/* BODY */}
      <div style={{maxWidth:1380,margin:"0 auto",padding:"32px 32px 96px",display:"grid",gridTemplateColumns:"240px 1fr",gap:28}} className="sidebar-grid">

        {/* SIDEBAR */}
        <aside className="hide-mobile" style={{position:"sticky",top:80,height:"fit-content"}}>
          <div className="glass" style={{padding:"10px 10px",borderRadius:"var(--r-lg)"}}>
            {cats.map(cat=>(
              <div key={cat}>
                <div style={{padding:"11px 12px 5px",fontSize:10,fontWeight:800,color:catColors[cat]||"var(--ink4)",textTransform:"uppercase",letterSpacing:".09em",display:"flex",alignItems:"center",gap:7}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:catColors[cat]||"var(--ink4)",flexShrink:0}} />
                  {cat}
                </div>
                {TOPICS.filter(t=>t.cat===cat).map(t=>(
                  <button key={t.id} onClick={()=>setActive(t.id)} className={`nav-item${active===t.id?" active":""}`} style={{color:active===t.id?t.accent:"var(--ink3)"}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:active===t.id?t.accent:"rgba(99,102,241,0.2)",flexShrink:0,transition:"all 0.25s",boxShadow:active===t.id?`0 0 10px ${t.accent}`:"none"}} />
                    {t.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main>
          {/* Mobile scrollable tabs */}
          <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:8,marginBottom:22,WebkitOverflowScrolling:"touch"}}>
            {TOPICS.map(t=>(
              <button key={t.id} onClick={()=>setActive(t.id)} style={{flexShrink:0,padding:"8px 16px",borderRadius:13,border:`1.5px solid ${active===t.id?t.accent:"var(--border2)"}`,background:active===t.id?`${t.accent}13`:"rgba(255,255,255,0.7)",color:active===t.id?t.accent:"var(--ink3)",fontSize:12.5,fontWeight:700,cursor:"pointer",transition:"all 0.25s",fontFamily:"var(--font-body)",backdropFilter:"blur(10px)"}}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Content card */}
          <div className="glass" style={{borderRadius:"var(--r-xl)",minHeight:600,overflow:"hidden",boxShadow:"0 24px 64px rgba(79,70,229,0.1), 0 2px 0 rgba(255,255,255,0.9) inset"}}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid var(--border2)",background:"rgba(255,255,255,0.6)",backdropFilter:"blur(18px)",padding:"24px 32px",textAlign:"center",color:"var(--ink4)",fontSize:12.5}}>
        Chapter 3 · Control Statements — C++ Programming &nbsp;·&nbsp; Interactive Reference Platform
      </footer>
    </div>
  );
}