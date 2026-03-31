import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   THEME SYSTEM — DARK & LIGHT
═══════════════════════════════════════════════════════════ */
const DARK = {
  bg: "#080f1a",
  bgMid: "#0d1b2a",
  card: "#111e2e",
  cardHover: "#16273a",
  border: "rgba(100,160,255,0.1)",
  primary: "#1A3C6D",
  primaryBright: "#2056a8",
  accent: "#E63946",
  orange: "#F4A261",
  green: "#2ECC71",
  yellow: "#F7C948",
  text: "#F0F4F8",
  textSub: "#7a93a8",
  textMuted: "#445566",
  navBg: "rgba(8,15,26,0.97)",
  inputBg: "rgba(255,255,255,0.05)",
  inputBorder: "rgba(100,160,255,0.15)",
  shadow: "0 8px 32px rgba(0,0,0,0.5)",
  mode: "dark",
};
const LIGHT = {
  bg: "#f0f4f8",
  bgMid: "#e4ecf5",
  card: "#ffffff",
  cardHover: "#f7faff",
  border: "rgba(26,60,109,0.1)",
  primary: "#1A3C6D",
  primaryBright: "#2056a8",
  accent: "#E63946",
  orange: "#e08a4a",
  green: "#219a54",
  yellow: "#d4a017",
  text: "#0d1b2a",
  textSub: "#4a6070",
  textMuted: "#8899aa",
  navBg: "rgba(240,244,248,0.97)",
  inputBg: "rgba(26,60,109,0.04)",
  inputBorder: "rgba(26,60,109,0.15)",
  shadow: "0 8px 32px rgba(26,60,109,0.12)",
  mode: "light",
};

/* ═══════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════ */
const buildCSS = () => `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
  input,button,select{font-family:'Barlow',sans-serif;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(100,160,255,0.2);border-radius:2px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.6;transform:scale(.96);}}
  @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes ripple{0%{transform:scale(0);opacity:.4;}100%{transform:scale(4);opacity:0;}}
  @keyframes scanLine{0%{top:-10%;}100%{top:110%;}}
  @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
  @keyframes slideInRight{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0);}}
  @keyframes slideInLeft{from{opacity:0;transform:translateX(-30px);}to{opacity:1;transform:translateX(0);}}
  @keyframes recPulse{0%,100%{box-shadow:0 0 0 0 rgba(230,57,70,0.7);}70%{box-shadow:0 0 0 10px rgba(230,57,70,0);}}
  .screen-enter{animation:fadeUp .35s cubic-bezier(.22,1,.36,1) both;}
  .fade{animation:fadeIn .3s ease both;}
  button:active{transform:scale(.97)!important;}
`;

/* ═══════════════════════════════════════════════════════════
   ICON LIBRARY
═══════════════════════════════════════════════════════════ */
const Ico = ({ n, s = 20, c = "currentColor", style = {} }) => {
  const p = { width: s, height: s, fill: "none", stroke: c, strokeWidth: "2", viewBox: "0 0 24 24", strokeLinecap: "round", strokeLinejoin: "round", style, flexShrink: 0 };
  const paths = {
    home: <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
    reports: <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    ai: <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    stats: <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    user: <svg {...p}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    bell: <svg {...p}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    camera: <svg {...p}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    check: <svg {...p}><polyline points="20,6 9,17 4,12"/></svg>,
    x: <svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    send: <svg {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>,
    map: <svg {...p}><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    shield: <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    truck: <svg {...p}><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    alert: <svg {...p}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    play: <svg {...p} fill={c}><polygon points="5,3 19,12 5,21"/></svg>,
    stop: <svg {...p} fill={c}><rect x="4" y="4" width="16" height="16" rx="2"/></svg>,
    record: <svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5" fill={c} stroke="none"/></svg>,
    settings: <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    edit: <svg {...p}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    logout: <svg {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    search: <svg {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    filter: <svg {...p}><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/></svg>,
    back: <svg {...p}><polyline points="15,18 9,12 15,6"/></svg>,
    lock: <svg {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    phone: <svg {...p}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.61-.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    car: <svg {...p}><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>,
    id: <svg {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M13 11h4M13 14h4M5 17a3 3 0 016 0"/></svg>,
    wifi: <svg {...p}><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill={c}/></svg>,
    location: <svg {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    plus: <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    eye: <svg {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    video: <svg {...p}><polygon points="23,7 16,12 23,17 23,7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
    mail: <svg {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    sun: <svg {...p}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon: <svg {...p}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
    flip: <svg {...p}><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/></svg>,
    zap: <svg {...p} fill={c}><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
    star: <svg {...p} fill={c}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
    download: <svg {...p}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    trash: <svg {...p}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
    info: <svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    privacy: <svg {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1" fill={c}/></svg>,
    terms: <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="13" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>,
  };
  return paths[n] || <svg {...p}><circle cx="12" cy="12" r="5"/></svg>;
};

/* ═══════════════════════════════════════════════════════════
   REUSABLE UI PIECES
═══════════════════════════════════════════════════════════ */
const Badge = ({ label, color, small }) => (
  <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, borderRadius: 20, padding: small ? "2px 7px" : "3px 10px", fontSize: small ? 9 : 10, fontWeight: 700, letterSpacing: 0.5, whiteSpace: "nowrap" }}>{label}</span>
);

const Btn = ({ label, onClick, bg, color = "#fff", icon, full, outline, small, disabled, style = {} }) => (
  <button onClick={disabled ? undefined : onClick} style={{ width: full ? "100%" : "auto", padding: small ? "9px 14px" : "13px 20px", borderRadius: 14, border: outline ? `2px solid ${bg}` : "none", background: outline ? "transparent" : bg, color: outline ? bg : color, cursor: disabled ? "not-allowed" : "pointer", fontWeight: 700, fontSize: small ? 12 : 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .2s", fontFamily: "'Barlow',sans-serif", letterSpacing: 0.4, opacity: disabled ? 0.4 : 1, boxShadow: outline ? "none" : `0 4px 16px ${bg}55`, ...style }}>
    {icon && <Ico n={icon} s={small ? 14 : 16} c={outline ? bg : color} />}
    {label}
  </button>
);

const Input = ({ label, type = "text", icon, value, onChange, placeholder, T }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontSize: 12, fontWeight: 600, color: T.textSub, letterSpacing: 0.5 }}>{label}</label>}
    <div style={{ position: "relative" }}>
      {icon && <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}><Ico n={icon} s={16} c={T.textMuted} /></div>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: icon ? "13px 14px 13px 42px" : "13px 14px", background: T.inputBg, border: `1.5px solid ${T.inputBorder}`, borderRadius: 12, color: T.text, fontSize: 14, fontFamily: "'Barlow',sans-serif", outline: "none", transition: "border-color .2s" }} />
    </div>
  </div>
);

const Card = ({ children, T, style = {}, onClick }) => (
  <div onClick={onClick} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 18, padding: "14px 16px", boxShadow: T.shadow, cursor: onClick ? "pointer" : "default", transition: "transform .15s", ...style }}>
    {children}
  </div>
);

const TopBar = ({ title, T, onBack, rightEl, showShadow }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", background: T.card, borderBottom: `1px solid ${T.border}`, flexShrink: 0, boxShadow: showShadow ? T.shadow : "none" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {onBack && (
        <button onClick={onBack} style={{ background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: 8, cursor: "pointer", color: T.text, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ico n="back" s={18} c={T.text} />
        </button>
      )}
      <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: 1.5, color: T.text, textTransform: "uppercase" }}>{title}</span>
    </div>
    {rightEl}
  </div>
);

const Toggle = ({ val, set, T }) => (
  <div onClick={() => set(!val)} style={{ width: 48, height: 26, borderRadius: 13, background: val ? DARK.primary : T.inputBorder, cursor: "pointer", position: "relative", transition: "background .25s", flexShrink: 0, border: `1.5px solid ${val ? DARK.primaryBright : T.border}` }}>
    <div style={{ position: "absolute", top: 2, left: val ? 24 : 2, width: 18, height: 18, borderRadius: "50%", background: val ? T.orange : T.textMuted, transition: "left .25s, background .25s" }} />
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PHONE FRAME
═══════════════════════════════════════════════════════════ */
const PhoneFrame = ({ children, T }) => (
  <div style={{ width: 385, height: 836, borderRadius: 46, border: `3px solid ${T.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(26,60,109,0.2)"}`, boxShadow: T.mode === "dark" ? "0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03), inset 0 0 60px rgba(0,0,0,0.3)" : "0 30px 80px rgba(26,60,109,0.2), 0 0 0 1px rgba(26,60,109,0.08)", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", background: T.bg, transition: "all .4s" }}>
    {/* Dynamic island */}
    <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 126, height: 34, background: "#000", borderRadius: 20, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333" }} />
      <div style={{ width: 54, height: 7, borderRadius: 4, background: "#111" }} />
    </div>
    {/* Status bar */}
    <div style={{ padding: "48px 22px 4px", display: "flex", justifyContent: "space-between", fontSize: 11, color: T.textSub, flexShrink: 0, fontWeight: 600 }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Ico n="wifi" s={11} c={T.textSub} />
        <span style={{ fontSize: 12 }}>●●●</span>
        <span>⚡</span>
      </div>
    </div>
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   BOTTOM NAV
═══════════════════════════════════════════════════════════ */
const BottomNav = ({ active, onNav, T }) => {
  const tabs = [
    { id: "dashboard", icon: "home", label: "Home" },
    { id: "reports", icon: "reports", label: "Reports" },
    { id: "camera", icon: "camera", label: "Record" },
    { id: "analytics", icon: "stats", label: "Stats" },
    { id: "profile", icon: "user", label: "Profile" },
  ];
  return (
    <div style={{ display: "flex", background: T.navBg, backdropFilter: "blur(20px)", borderTop: `1px solid ${T.border}`, padding: "6px 0 18px", flexShrink: 0 }}>
      {tabs.map(t => {
        const isCenter = t.id === "camera";
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onNav(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", position: "relative", padding: "4px 0" }}>
            {isCenter ? (
              <div style={{ width: 50, height: 50, borderRadius: 18, background: `linear-gradient(135deg,${DARK.accent},#b02030)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px ${DARK.accent}88`, marginTop: -22, border: "3px solid " + T.bg, transition: "transform .2s", transform: isActive ? "scale(1.08)" : "scale(1)" }}>
                <Ico n="camera" s={22} c="#fff" />
              </div>
            ) : (
              <div style={{ padding: "6px 10px", borderRadius: 12, background: isActive ? `${T.primary}18` : "transparent", transition: "all .2s" }}>
                <Ico n={t.icon} s={21} c={isActive ? T.orange : T.textMuted} />
              </div>
            )}
            <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, color: isActive ? T.orange : T.textMuted, fontFamily: "'Barlow',sans-serif", letterSpacing: 0.3 }}>{t.label}</span>
            {isActive && !isCenter && <div style={{ position: "absolute", bottom: 0, width: 18, height: 2.5, borderRadius: 2, background: T.orange }} />}
          </button>
        );
      })}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 1 — SPLASH  (brand new design)
═══════════════════════════════════════════════════════════ */
const SplashScreen = ({ onNext, T }) => {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setPct(p => {
        if (p >= 100) { clearInterval(t); setTimeout(onNext, 400); return 100; }
        return p + 1.4;
      });
    }, 40);
    const t2 = setTimeout(() => setPhase(1), 600);
    const t3 = setTimeout(() => setPhase(2), 1200);
    return () => { clearInterval(t); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: `linear-gradient(160deg,#060f1e 0%,#0d1f38 50%,#060f1e 100%)`, position: "relative", overflow: "hidden" }}>
      {/* Animated grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(26,60,109,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(26,60,109,0.08) 1px,transparent 1px)`, backgroundSize: "40px 40px", animation: "fadeIn 2s ease" }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,60,109,0.3) 0%,transparent 70%)", top: "10%", left: "50%", transform: "translateX(-50%)" }} />
      <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle,${DARK.accent}22 0%,transparent 70%)`, bottom: "20%", right: "10%" }} />

      {/* Center content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, padding: 40, position: "relative" }}>
        {/* Logo mark */}
        <div style={{ opacity: phase >= 0 ? 1 : 0, transform: phase >= 0 ? "scale(1)" : "scale(0.6)", transition: "all 0.8s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{ width: 110, height: 110, borderRadius: 32, background: "linear-gradient(145deg,#1A3C6D,#0d2040)", border: "2px solid rgba(100,160,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 20px 60px rgba(26,60,109,0.6)" }}>
            <Ico n="shield" s={54} c={DARK.orange} />
            <div style={{ position: "absolute", inset: -4, borderRadius: 36, border: "1px solid rgba(26,60,109,0.3)", animation: "pulse 3s infinite" }} />
          </div>
        </div>

        {/* App name */}
        <div style={{ marginTop: 24, opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease .2s", textAlign: "center" }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 48, fontWeight: 900, letterSpacing: 6, background: "linear-gradient(135deg,#F4A261,#ffffff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>LINK_A_WAY</div>
          <div style={{ fontSize: 11, color: DARK.textSub, letterSpacing: 5, marginTop: 6, fontWeight: 600 }}>ROAD · SAFETY · ENFORCEMENT</div>
        </div>

        {/* Tagline cards */}
        <div style={{ marginTop: 36, opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease .3s", display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          {[
            { icon: "camera", text: "Dashcam Records Violations", c: DARK.orange },
            { icon: "ai", text: "AI Verifies Evidence Instantly", c: "#60a5fa" },
            { icon: "send", text: "Sends Report to Police", c: DARK.green },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(100,160,255,0.1)", borderRadius: 14, padding: "10px 14px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.c}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ico n={item.icon} s={18} c={item.c} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#cbd5e1" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "0 40px 50px", opacity: phase >= 2 ? 1 : 0, transition: "opacity .5s ease .5s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: DARK.textSub }}>Initializing secure connection</span>
          <span style={{ fontSize: 11, color: DARK.orange, fontWeight: 700 }}>{Math.round(pct)}%</span>
        </div>
        <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${DARK.primary},${DARK.orange})`, borderRadius: 3, transition: "width .1s linear" }} />
        </div>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 10, color: DARK.textMuted, letterSpacing: 2 }}>POWERED BY DIGILOCKER × AI VERIFICATION</div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 2 — LOGIN / REGISTER  (with name + email)
═══════════════════════════════════════════════════════════ */
const AuthScreen = ({ onNext, T }) => {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", otp: "" });
  const [step, setStep] = useState(0); // 0=form, 1=otp
  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  const handleLogin = () => { if (form.phone) setStep(1); };
  const handleVerify = () => { if (form.otp.length >= 4) onNext(); };
  const handleRegister = () => { if (form.name && form.email && form.phone) setStep(1); };

  if (step === 1) return (
    <div className="screen-enter" style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px 24px", gap: 24, background: T.bg }}>
      <button onClick={() => setStep(0)} style={{ alignSelf: "flex-start", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: 9, cursor: "pointer" }}>
        <Ico n="back" s={18} c={T.text} />
      </button>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 70, height: 70, borderRadius: 20, background: `${T.orange}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", border: `1.5px solid ${T.orange}44` }}>
          <Ico n="phone" s={34} c={T.orange} />
        </div>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 24, color: T.text, letterSpacing: 1 }}>OTP VERIFICATION</div>
        <div style={{ color: T.textSub, fontSize: 13, marginTop: 6 }}>Code sent to <b style={{ color: T.text }}>+91 {form.phone}</b></div>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ width: 44, height: 52, borderRadius: 12, background: form.otp[i] ? `${T.primary}30` : T.inputBg, border: `2px solid ${form.otp[i] ? T.orange : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: T.text, cursor: "pointer", transition: "all .2s" }}>
            {form.otp[i] || <span style={{ color: T.border }}>—</span>}
          </div>
        ))}
      </div>
      <input type="text" maxLength={6} value={form.otp} onChange={e => set("otp")(e.target.value)} placeholder="Enter 6-digit OTP" style={{ textAlign: "center", padding: "14px", background: T.inputBg, border: `1.5px solid ${T.border}`, borderRadius: 12, color: T.text, fontSize: 18, fontWeight: 700, letterSpacing: 6, fontFamily: "'Barlow',sans-serif", outline: "none" }} />
      <Btn label="Verify & Continue →" onClick={handleVerify} bg={DARK.primary} full />
      <div style={{ textAlign: "center", color: T.textSub, fontSize: 13 }}>Didn't receive? <span style={{ color: T.orange, cursor: "pointer", fontWeight: 700 }}>Resend OTP</span></div>
    </div>
  );

  return (
    <div className="screen-enter" style={{ flex: 1, display: "flex", flexDirection: "column", background: T.bg, overflowY: "auto" }}>
      {/* Header */}
      <div style={{ padding: "20px 24px 0", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: `linear-gradient(135deg,${DARK.primary},#0d2040)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", boxShadow: `0 8px 24px ${DARK.primary}66` }}>
          <Ico n="shield" s={30} c={DARK.orange} />
        </div>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 28, letterSpacing: 3, color: T.text }}>LINK_A_WAY</div>
        <div style={{ fontSize: 12, color: T.textSub, marginTop: 4 }}>Road Safety Enforcement Platform</div>
      </div>
      {/* Tab switcher */}
      <div style={{ margin: "16px 24px 0", display: "flex", background: T.inputBg, borderRadius: 14, padding: 4, border: `1px solid ${T.border}` }}>
        {["login", "register"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "9px 0", borderRadius: 11, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: tab === t ? `linear-gradient(135deg,${DARK.primary},#1450a0)` : "transparent", color: tab === t ? "#fff" : T.textSub, transition: "all .25s", fontFamily: "'Barlow',sans-serif", letterSpacing: 0.5 }}>
            {t === "login" ? "Sign In" : "Register"}
          </button>
        ))}
      </div>
      {/* Form */}
      <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {tab === "register" && <>
          <Input label="FULL NAME" icon="user" value={form.name} onChange={set("name")} placeholder="Rajesh Kumar" T={T} />
          <Input label="EMAIL ADDRESS" type="email" icon="mail" value={form.email} onChange={set("email")} placeholder="rajesh@email.com" T={T} />
        </>}
        <Input label="MOBILE NUMBER" type="tel" icon="phone" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" T={T} />
        {tab === "login" && <Input label="PASSWORD" type="password" icon="lock" value={form.password} onChange={set("password")} placeholder="••••••••" T={T} />}
        {tab === "register" && <Input label="CREATE PASSWORD" type="password" icon="lock" value={form.password} onChange={set("password")} placeholder="Min 8 characters" T={T} />}

        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          {tab === "login" ? <>
            <Btn label="Send OTP" onClick={handleLogin} bg="transparent" color={DARK.primaryBright} outline full style={{ border: `2px solid ${DARK.primary}` }} />
            <Btn label="Login →" onClick={handleLogin} bg={DARK.primary} full />
          </> : (
            <Btn label="Register & Get OTP →" onClick={handleRegister} bg={DARK.primary} full />
          )}
        </div>
        {tab === "login" && <div style={{ textAlign: "center", color: T.textSub, fontSize: 12 }}><span style={{ color: T.orange, cursor: "pointer" }}>Forgot password?</span></div>}
        {/* Security note */}
        <div style={{ marginTop: 4, padding: "12px 14px", background: `${DARK.green}0d`, border: `1px solid ${DARK.green}25`, borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Ico n="shield" s={16} c={DARK.green} />
          <span style={{ fontSize: 11, color: T.textSub, lineHeight: 1.5 }}>Verified via <b style={{ color: T.text }}>DigiLocker</b> — all evidence is encrypted end-to-end before submission.</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 3 — DASHBOARD
═══════════════════════════════════════════════════════════ */
const DashboardScreen = ({ onNav, T, user }) => {
  const cards = [
    { label: "Total Reports", value: "1,284", icon: "truck", c: T.orange },
    { label: "Pending AI", value: "47", icon: "alert", c: T.yellow },
    { label: "Sent to Police", value: "209", icon: "send", c: T.green },
  ];
  const feed = [
    { plate: "MH04-AB1234", type: "Dangerous Overtake", loc: "Nagpur Ring Rd", time: "2m ago", status: "Pending" },
    { plate: "MH12-XY5678", type: "Signal Jump", loc: "Wardha Road NH7", time: "15m ago", status: "Verified" },
    { plate: "GJ03-KL9012", type: "Overloaded Truck", loc: "Kamptee Bypass", time: "1h ago", status: "Sent" },
    { plate: "MH40-MN3456", type: "Lane Violation", loc: "Outer Ring Rd", time: "2h ago", status: "Verified" },
  ];
  const sc = { Pending: T.yellow, Verified: T.green, Sent: T.orange };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "10px 18px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: T.card, borderBottom: `1px solid ${T.border}` }}>
        <div>
          <div style={{ fontSize: 11, color: T.textSub }}>Good morning,</div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 20, color: T.text, letterSpacing: 1 }}>{user?.name?.toUpperCase() || "RAJESH KUMAR"} 👋</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onNav("notifications")} style={{ background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 12, padding: 9, cursor: "pointer", position: "relative" }}>
            <Ico n="bell" s={18} c={T.text} />
            <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: T.accent, border: `2px solid ${T.card}` }} />
          </button>
          <button onClick={() => onNav("settings")} style={{ background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 12, padding: 9, cursor: "pointer" }}>
            <Ico n="settings" s={18} c={T.text} />
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Summary cards */}
        <div style={{ display: "flex", gap: 8 }}>
          {cards.map((c, i) => (
            <div key={i} onClick={() => onNav("reports")} style={{ flex: 1, background: T.card, border: `1px solid ${c.c}20`, borderRadius: 16, padding: "12px 8px", textAlign: "center", cursor: "pointer", boxShadow: T.shadow }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.c}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                <Ico n={c.icon} s={18} c={c.c} />
              </div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 20, color: c.c }}>{c.value}</div>
              <div style={{ fontSize: 9, color: T.textSub, marginTop: 2, fontWeight: 600 }}>{c.label}</div>
            </div>
          ))}
        </div>
        {/* Live map */}
        <div onClick={() => onNav("reports")} style={{ borderRadius: 18, overflow: "hidden", position: "relative", height: 130, background: T.mode === "dark" ? "linear-gradient(135deg,#050e1a,#0a1830)" : "linear-gradient(135deg,#e4ecf7,#c8daf0)", border: `1px solid ${T.border}`, cursor: "pointer", boxShadow: T.shadow }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(26,60,109,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(26,60,109,0.1) 1px,transparent 1px)`, backgroundSize: "32px 32px" }} />
          {[[28, 38], [55, 62], [72, 28], [44, 78]].map(([x, y], i) => (
            <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 12, height: 12, borderRadius: "50%", background: i === 0 ? T.accent : T.orange, boxShadow: `0 0 10px ${i === 0 ? T.accent : T.orange}`, animation: "pulse 2s infinite", animationDelay: `${i * 0.4}s` }} />
          ))}
          <div style={{ position: "absolute", top: 10, left: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <Ico n="map" s={13} c={T.orange} />
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, color: T.mode === "dark" ? "#7a93a8" : "#4a6070", letterSpacing: 1 }}>LIVE VIOLATION MAP</span>
          </div>
          <div style={{ position: "absolute", bottom: 10, right: 12 }}><Badge label="4 Active" color={T.accent} /></div>
        </div>
        {/* Recent */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 15, color: T.text, letterSpacing: 0.8 }}>RECENT REPORTS</span>
            <span onClick={() => onNav("reports")} style={{ color: T.orange, fontSize: 12, cursor: "pointer", fontWeight: 700 }}>View All →</span>
          </div>
          {feed.map((f, i) => (
            <div key={i} onClick={() => onNav("evidence")} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? `1px solid ${T.border}` : "none", cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: `${T.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Ico n="truck" s={18} c={T.accent} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{f.plate}</span>
                  <Badge label={f.status} color={sc[f.status]} small />
                </div>
                <div style={{ fontSize: 11, color: T.textSub, marginTop: 2 }}>{f.type} · {f.loc} · {f.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 4 — REPORTS
═══════════════════════════════════════════════════════════ */
const ReportsScreen = ({ onNav, T }) => {
  const [activeFilter, setFilter] = useState("All");
  const all = [
    { id: "VIO-2847", plate: "MH04-AB1234", type: "Dangerous Overtake", loc: "Nagpur Ring Rd", time: "10:42 AM", status: "Pending", conf: 87 },
    { id: "VIO-2846", plate: "MH12-XY5678", type: "Signal Jump", loc: "Wardha Road NH7", time: "10:28 AM", status: "Verified", conf: 94 },
    { id: "VIO-2845", plate: "GJ03-KL9012", type: "Overloaded Truck", loc: "Kamptee Bypass", time: "9:15 AM", status: "Sent", conf: 91 },
    { id: "VIO-2844", plate: "MH40-MN3456", type: "Lane Violation", loc: "Outer Ring Rd", time: "8:50 AM", status: "Verified", conf: 78 },
    { id: "VIO-2843", plate: "RJ14-QR7890", type: "Rash Driving", loc: "Amravati Hwy", time: "8:10 AM", status: "Sent", conf: 88 },
  ];
  const filters = ["All", "Pending", "Verified", "Sent"];
  const sc = { Pending: T.yellow, Verified: T.green, Sent: T.orange };
  const shown = activeFilter === "All" ? all : all.filter(r => r.status === activeFilter);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar title="Live Reports" T={T} rightEl={
        <button onClick={() => onNav("notifications")} style={{ background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: 8, cursor: "pointer", position: "relative" }}>
          <Ico n="bell" s={17} c={T.text} />
          <div style={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, borderRadius: "50%", background: T.accent, border: `2px solid ${T.card}` }} />
        </button>
      } />
      <div style={{ padding: "10px 16px 0", display: "flex", gap: 6, overflow: "auto" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${activeFilter === f ? T.primary : T.border}`, background: activeFilter === f ? `${T.primary}25` : "transparent", color: activeFilter === f ? T.text : T.textSub, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", fontWeight: activeFilter === f ? 700 : 500, fontFamily: "'Barlow',sans-serif", transition: "all .2s" }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {shown.map((r, i) => (
          <Card key={i} T={T} onClick={() => onNav("evidence")}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 15, color: T.text, letterSpacing: 0.5 }}>{r.plate}</div>
                <div style={{ fontSize: 12, color: T.textSub, marginTop: 2 }}>{r.type}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <Badge label={r.status} color={sc[r.status]} small />
                <span style={{ fontSize: 10, color: T.textMuted }}>{r.id}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.textSub, fontSize: 11 }}><Ico n="location" s={11} c={T.textMuted} /> {r.loc}</div>
              <div style={{ fontSize: 11, color: T.textMuted }}>🕐 {r.time}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 5, background: T.inputBg, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${r.conf}%`, background: `linear-gradient(90deg,${T.primary},${T.green})`, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 10, color: T.green, fontWeight: 700 }}>{r.conf}% AI</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 5 — CAMERA (fully functional recording UI)
═══════════════════════════════════════════════════════════ */
const CameraScreen = ({ onNav, T }) => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState(false);
  const [saved, setSaved] = useState(false);
  const [violationType, setViolationType] = useState("Dangerous Overtake");
  const intervalRef = useRef(null);

  const startRec = () => {
    setRecording(true); setPaused(false); setSaved(false);
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };
  const pauseRec = () => {
    if (paused) { intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000); setPaused(false); }
    else { clearInterval(intervalRef.current); setPaused(true); }
  };
  const stopRec = () => {
    clearInterval(intervalRef.current);
    setRecording(false); setPaused(false); setSaved(true);
  };
  const discardRec = () => {
    clearInterval(intervalRef.current);
    setRecording(false); setPaused(false); setSeconds(0); setSaved(false);
  };
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  useEffect(() => () => clearInterval(intervalRef.current), []);

  const violations = ["Dangerous Overtake", "Signal Jump", "Overspeeding", "Lane Violation", "Overloaded Vehicle"];

  if (saved) return (
    <div className="screen-enter" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: T.bg, gap: 20, padding: 24 }}>
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: `${T.green}18`, border: `3px solid ${T.green}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Ico n="check" s={44} c={T.green} />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 24, color: T.text, letterSpacing: 1 }}>VIDEO SAVED!</div>
        <div style={{ color: T.textSub, fontSize: 13, marginTop: 6 }}>Duration: {fmt(seconds)} · Evidence ready for AI verification</div>
      </div>
      <Card T={T} style={{ width: "100%" }}>
        <div style={{ fontSize: 11, color: T.textSub, marginBottom: 6 }}>Violation Type Tagged</div>
        <div style={{ fontWeight: 700, color: T.orange, fontSize: 14 }}>{violationType}</div>
      </Card>
      <div style={{ display: "flex", gap: 10, width: "100%" }}>
        <Btn label="Send for AI Verify" onClick={() => onNav("ai")} bg={DARK.primary} icon="ai" full />
        <Btn label="Record Again" onClick={() => { setSeconds(0); setSaved(false); }} bg="transparent" color={T.orange} outline full style={{ border: `2px solid ${T.orange}` }} />
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#000", position: "relative", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "linear-gradient(to bottom,rgba(0,0,0,0.7),transparent)" }}>
        <button onClick={() => { discardRec(); onNav("dashboard"); }} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 10, padding: 9, cursor: "pointer" }}>
          <Ico n="back" s={18} c="#fff" />
        </button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {recording && <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.5)", borderRadius: 20, padding: "4px 12px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: DARK.accent, animation: paused ? "blink 1s infinite" : "recPulse 1s infinite" }} />
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>{fmt(seconds)}</span>
          </div>}
          <button onClick={() => setFlash(!flash)} style={{ background: flash ? "rgba(255,220,0,0.3)" : "rgba(255,255,255,0.12)", border: "none", borderRadius: 10, padding: 9, cursor: "pointer" }}>
            <Ico n="zap" s={18} c={flash ? "#FFD700" : "#fff"} />
          </button>
        </div>
      </div>

      {/* Viewfinder / Preview */}
      <div style={{ flex: 1, position: "relative", background: recording ? "linear-gradient(135deg,#060d18,#0a1525)" : "#050a12", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Simulated road scene */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: T.mode === "dark" ? "#1a2030" : "#2a3040" }} />
          <div style={{ position: "absolute", bottom: "45%", left: "25%", fontSize: 28 }}>🚛</div>
          <div style={{ position: "absolute", bottom: "42%", right: "20%", fontSize: 22 }}>🚗</div>
        </div>
        {/* Scan line when recording */}
        {recording && !paused && <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${DARK.green}88,transparent)`, animation: "scanLine 3s linear infinite", zIndex: 5 }} />}
        {/* Corner guides */}
        {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map(([v, h], i) => (
          <div key={i} style={{ position: "absolute", [v]: 16, [h]: 16, width: 20, height: 20, borderTop: v === "top" ? `3px solid ${recording ? DARK.accent : "rgba(255,255,255,0.4)"}` : "none", borderBottom: v === "bottom" ? `3px solid ${recording ? DARK.accent : "rgba(255,255,255,0.4)"}` : "none", borderLeft: h === "left" ? `3px solid ${recording ? DARK.accent : "rgba(255,255,255,0.4)"}` : "none", borderRight: h === "right" ? `3px solid ${recording ? DARK.accent : "rgba(255,255,255,0.4)"}` : "none" }} />
        ))}
        {/* Vehicle detection box when recording */}
        {recording && !paused && (
          <div style={{ position: "absolute", left: "18%", bottom: "42%", width: 90, height: 54, border: `2px solid ${DARK.accent}`, borderRadius: 6 }}>
            <div style={{ position: "absolute", top: -18, left: 0, background: DARK.accent, borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 700, whiteSpace: "nowrap" }}>TRUCK DETECTED</div>
          </div>
        )}
        {/* Not recording overlay */}
        {!recording && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Ico n="camera" s={44} c="rgba(255,255,255,0.3)" />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "'Barlow',sans-serif" }}>Tap REC to start recording</span>
          </div>
        )}
        {/* Zoom indicator */}
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.5)", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#fff", fontWeight: 700 }}>{zoom.toFixed(1)}×</div>
      </div>

      {/* Violation type selector */}
      <div style={{ background: "rgba(0,0,0,0.85)", padding: "10px 16px", display: "flex", gap: 6, overflow: "auto" }}>
        {violations.map(v => (
          <button key={v} onClick={() => setViolationType(v)} style={{ padding: "5px 10px", borderRadius: 20, border: `1.5px solid ${violationType === v ? DARK.orange : "rgba(255,255,255,0.15)"}`, background: violationType === v ? `${DARK.orange}22` : "transparent", color: violationType === v ? DARK.orange : "rgba(255,255,255,0.5)", fontSize: 10, cursor: "pointer", whiteSpace: "nowrap", fontWeight: violationType === v ? 700 : 400, fontFamily: "'Barlow',sans-serif" }}>
            {v}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ background: "rgba(0,0,0,0.9)", padding: "16px 24px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Flip camera */}
        <button onClick={() => setFacing(f => f === "back" ? "front" : "back")} style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ico n="flip" s={22} c="#fff" />
        </button>
        {/* Main rec button */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {recording && (
            <button onClick={pauseRec} style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {paused ? <Ico n="play" s={20} c="#fff" /> : <span style={{ fontSize: 16, color: "#fff", fontWeight: 900 }}>⏸</span>}
            </button>
          )}
          <button onClick={recording ? stopRec : startRec} style={{ width: 72, height: 72, borderRadius: "50%", background: recording ? "rgba(255,255,255,0.9)" : DARK.accent, border: `4px solid ${recording ? DARK.accent : "rgba(255,255,255,0.3)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${DARK.accent}88`, animation: recording ? "none" : "recPulse 2s infinite" }}>
            {recording ? <Ico n="stop" s={28} c={DARK.accent} /> : <Ico n="record" s={32} c="#fff" />}
          </button>
          {recording && (
            <button onClick={discardRec} style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(230,57,70,0.15)", border: `2px solid ${DARK.accent}44`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ico n="trash" s={20} c={DARK.accent} />
            </button>
          )}
        </div>
        {/* Zoom */}
        <button onClick={() => setZoom(z => z >= 3 ? 1 : z + 0.5)} style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", fontWeight: 700 }}>
          {zoom}×
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 6 — EVIDENCE
═══════════════════════════════════════════════════════════ */
const EvidenceScreen = ({ onNav, T }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar title="Evidence Detail" T={T} onBack={() => onNav("reports")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Video */}
        <div style={{ borderRadius: 16, overflow: "hidden", position: "relative", height: 190, background: "#000", cursor: "pointer" }} onClick={() => setPlaying(!playing)}>
          <div style={{ inset: 0, position: "absolute", background: "linear-gradient(135deg,#060f1e,#0a1830)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "#1a2030" }} />
            <div style={{ position: "absolute", bottom: "42%", left: "22%", fontSize: 26 }}>🚛</div>
            {playing && <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,rgba(46,204,113,0.6),transparent)", animation: "scanLine 3s linear infinite" }} />}
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
              {playing ? <span style={{ fontSize: 20, color: "#fff" }}>⏸</span> : <Ico n="play" s={24} c="#fff" />}
            </div>
          </div>
          <div style={{ position: "absolute", top: 8, left: 10 }}><Badge label={playing ? "▶ PLAYING" : "▶ DASHCAM"} color={DARK.accent} /></div>
          <div style={{ position: "absolute", top: 8, right: 10 }}><Badge label="MH04-AB1234" color={DARK.orange} /></div>
          <div style={{ position: "absolute", bottom: 8, left: 10, fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>00:00:47 · 1080p</div>
        </div>
        {/* Details */}
        <Card T={T}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, letterSpacing: 0.5, marginBottom: 10 }}>VIOLATION DETAILS</div>
          {[
            { l: "Violation", v: "Dangerous Overtake — Heavy Vehicle", icon: "alert", c: T.accent },
            { l: "Vehicle", v: "MH04-AB1234 · Tata Prima Truck", icon: "truck", c: T.orange },
            { l: "Location", v: "Nagpur Ring Road, Near Butibori", icon: "location", c: T.primary },
            { l: "Timestamp", v: "March 31, 2026 · 10:42 AM", icon: "settings", c: T.textMuted },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${T.border}` : "none" }}>
              <Ico n={d.icon} s={13} c={d.c} />
              <div><div style={{ fontSize: 10, color: T.textSub, fontWeight: 600 }}>{d.l}</div><div style={{ fontSize: 12, fontWeight: 600, marginTop: 2, color: T.text }}>{d.v}</div></div>
            </div>
          ))}
        </Card>
        {/* Map */}
        <div style={{ borderRadius: 16, height: 100, background: T.mode === "dark" ? "linear-gradient(135deg,#050e1a,#0a1830)" : "linear-gradient(135deg,#ddeaf7,#c0d8f0)", border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(26,60,109,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(26,60,109,0.1) 1px,transparent 1px)`, backgroundSize: "24px 24px" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: T.accent, boxShadow: `0 0 16px ${T.accent}`, animation: "pulse 1.5s infinite", zIndex: 2 }} />
          <div style={{ position: "absolute", top: 8, left: 12, display: "flex", alignItems: "center", gap: 4 }}>
            <Ico n="map" s={12} c={T.orange} /><span style={{ fontSize: 10, color: T.textSub, fontWeight: 700, letterSpacing: 1 }}>INCIDENT LOCATION</span>
          </div>
          <div style={{ position: "absolute", bottom: 8, right: 10 }}><Badge label="Butibori, Nagpur" color={T.primary} small /></div>
        </div>
        {/* Actions */}
        <div style={{ display: "flex", gap: 10 }}>
          <Btn label="Verify with AI" onClick={() => onNav("ai")} bg={DARK.primary} icon="ai" full />
          <Btn label="Send to Police" onClick={() => onNav("police")} bg="#145c28" icon="send" full />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 7 — AI VERIFICATION
═══════════════════════════════════════════════════════════ */
const AIScreen = ({ onNav, T }) => {
  const [approved, setApproved] = useState(null);
  const conf = 91;
  const findings = [
    { l: "Vehicle Detected", v: "Heavy Truck (Class 7)", conf: 97, c: T.green },
    { l: "Overtake Event", v: "Confirmed at 82 km/h", conf: 91, c: T.green },
    { l: "Lane Violation", v: "Double yellow line crossed", conf: 88, c: T.yellow },
    { l: "DigiLocker Status", v: "✅ Valid Registration", conf: 100, c: T.green },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar title="AI Verification" T={T} onBack={() => onNav("evidence")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ background: `${T.primary}22`, border: `1px solid ${T.primary}44`, borderRadius: 16, padding: 16, display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: `${T.primary}44`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.primary}`, animation: "pulse 2s infinite" }}>
            <Ico n="ai" s={26} c={T.orange} />
          </div>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 16, color: T.text, letterSpacing: 0.5 }}>AI ANALYSIS COMPLETE</div>
            <div style={{ fontSize: 12, color: T.textSub, marginTop: 2 }}>Dangerous Overtake — Confirmed</div>
            <Badge label="HIGH CONFIDENCE" color={T.green} />
          </div>
        </div>
        <Card T={T}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 12, letterSpacing: 0.5 }}>CONFIDENCE SCORE</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: T.textSub }}>Overall AI Confidence</span>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 24, color: T.green }}>{conf}%</span>
          </div>
          <div style={{ height: 14, background: T.inputBg, borderRadius: 7, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${conf}%`, background: `linear-gradient(90deg,${T.primary},${T.green})`, borderRadius: 7 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            {["0%", "25%", "50%", "75%", "100%"].map(l => <span key={l} style={{ fontSize: 9, color: T.textMuted }}>{l}</span>)}
          </div>
        </Card>
        <Card T={T}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 12, letterSpacing: 0.5 }}>AI FINDINGS</div>
          {findings.map((f, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 12, color: T.textSub }}>{f.l}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: f.c }}>{f.conf}%</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.text, marginBottom: 4 }}>{f.v}</div>
              <div style={{ height: 4, background: T.inputBg, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${f.conf}%`, background: f.c, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </Card>
        <div style={{ background: `${T.green}0d`, border: `1px solid ${T.green}25`, borderRadius: 14, padding: 14 }}>
          <div style={{ fontWeight: 700, color: T.green, fontSize: 13, marginBottom: 6 }}>DigiLocker Verified ✓</div>
          <div style={{ fontSize: 12, color: T.textSub, lineHeight: 1.6 }}>
            Vehicle registration & license valid. Eligible for police action.
          </div>
        </div>
        {!approved ? (
          <div style={{ display: "flex", gap: 10 }}>
            <Btn label="Approve" onClick={() => setApproved("approved")} bg="#145c28" icon="check" full />
            <Btn label="Reject" onClick={() => setApproved("rejected")} bg={`${T.accent}22`} color={T.accent} icon="x" outline full style={{ border: `2px solid ${T.accent}` }} />
          </div>
        ) : (
          <div className="fade" style={{ background: approved === "approved" ? `${T.green}12` : `${T.accent}12`, border: `1px solid ${approved === "approved" ? T.green : T.accent}30`, borderRadius: 16, padding: 18, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{approved === "approved" ? "✅" : "❌"}</div>
            <div style={{ fontWeight: 700, color: approved === "approved" ? T.green : T.accent, fontSize: 14 }}>
              {approved === "approved" ? "Evidence Approved — Forwarding to Police" : "Evidence Rejected"}
            </div>
            {approved === "approved" && <div style={{ marginTop: 14 }}><Btn label="Go to Police Screen →" onClick={() => onNav("police")} bg={DARK.primary} /></div>}
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 8 — POLICE
═══════════════════════════════════════════════════════════ */
const PoliceScreen = ({ onNav, T }) => {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar title="Police Communication" T={T} onBack={() => onNav("ai")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ background: `${T.primary}22`, border: `1px solid ${T.primary}33`, borderRadius: 16, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 15, color: T.text, letterSpacing: 0.5 }}>CASE REPORT</div>
            <Badge label="READY TO SEND" color={T.orange} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ v: "VIO-2847", l: "Case ID", c: T.orange }, { v: "HIGH", l: "Priority", c: T.accent }, { v: "91%", l: "AI Conf", c: T.green }].map((s, i) => (
              <div key={i} style={{ flex: 1, background: T.inputBg, borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 15, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 9, color: T.textSub, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <Card T={T}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 10, letterSpacing: 0.5 }}>VIOLATOR INFORMATION</div>
          {[
            { l: "Vehicle", v: "MH04-AB1234 · Tata Prima", icon: "car" },
            { l: "Owner (DigiLocker)", v: "Suresh Patil — ID Verified ✅", icon: "id" },
            { l: "Location", v: "Nagpur Ring Road, Butibori", icon: "location" },
            { l: "Violation", v: "Dangerous Overtake + Speeding", icon: "alert" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${T.border}` : "none" }}>
              <Ico n={d.icon} s={13} c={T.orange} />
              <div style={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: T.textSub }}>{d.l}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: T.text, textAlign: "right", maxWidth: "55%" }}>{d.v}</span>
              </div>
            </div>
          ))}
        </Card>
        <div style={{ background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 14, padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 44, height: 36, borderRadius: 8, background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}><Ico n="video" s={16} c={T.orange} /></div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>Dashcam Video + AI Report</div><div style={{ fontSize: 10, color: T.textSub, marginTop: 1 }}>47s clip · 1080p · AI annotated</div></div>
          <Badge label="ATTACHED" color={T.green} small />
        </div>
        <div style={{ background: `${T.primary}15`, border: `1px solid ${T.primary}30`, borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 11, color: T.textSub }}>Nearest Police Station</div>
          <div style={{ fontWeight: 700, color: T.text, marginTop: 4 }}>Butibori Police Station, Nagpur</div>
          <div style={{ fontSize: 11, color: T.textSub, marginTop: 2 }}>SI Ramesh Deshpande · MH-PO-4521</div>
        </div>
        {!sent ? (
          <div style={{ display: "flex", gap: 10 }}>
            <Btn label="Send to Police" onClick={() => setSent(true)} bg="#145c28" icon="send" full />
            <Btn label="Cancel" onClick={() => onNav("evidence")} color={T.accent} outline bg={T.accent} full style={{ border: `2px solid ${T.accent}55` }} />
          </div>
        ) : (
          <div className="fade" style={{ background: `${T.green}10`, border: `1px solid ${T.green}30`, borderRadius: 16, padding: 22, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 18, color: T.green, letterSpacing: 1 }}>CASE SENT SUCCESSFULLY!</div>
            <div style={{ fontSize: 12, color: T.textSub, marginTop: 6 }}>Police notified · Case ID: VIO-2847</div>
            <div style={{ marginTop: 14 }}><Btn label="Back to Dashboard" onClick={() => onNav("dashboard")} bg={DARK.primary} /></div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 9 — NOTIFICATIONS
═══════════════════════════════════════════════════════════ */
const NotificationsScreen = ({ onNav, T }) => {
  const notifs = [
    { icon: "check", color: T.green, title: "Case VIO-2847 Approved", msg: "AI verified. Forwarded to Butibori Police.", time: "2m ago", unread: true },
    { icon: "alert", color: T.accent, title: "New Violation Detected", msg: "Heavy vehicle overtake on Wardha Road NH7.", time: "15m ago", unread: true },
    { icon: "send", color: T.orange, title: "Police Action Taken", msg: "Case VIO-2841: Challan issued to MH12-XY5678.", time: "1h ago" },
    { icon: "shield", color: T.primary, title: "DigiLocker Sync Complete", msg: "Your profile verification is up to date.", time: "3h ago" },
    { icon: "star", color: T.yellow, title: "Reward Points Added", msg: "You earned 50 pts for valid report VIO-2840.", time: "1d ago" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar title="Notifications" T={T} onBack={() => onNav("dashboard")} showNotif={false} />
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {notifs.map((n, i) => (
          <div key={i} style={{ background: n.unread ? T.card : T.bg, border: `1px solid ${n.unread ? n.color + "22" : T.border}`, borderRadius: 16, padding: 14, display: "flex", gap: 12, position: "relative", boxShadow: n.unread ? T.shadow : "none" }}>
            {n.unread && <div style={{ position: "absolute", top: 10, right: 12, width: 8, height: 8, borderRadius: "50%", background: T.accent }} />}
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `${n.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ico n={n.icon} s={17} c={n.color} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{n.title}</div>
              <div style={{ fontSize: 11, color: T.textSub, marginTop: 2, lineHeight: 1.4 }}>{n.msg}</div>
              <div style={{ fontSize: 10, color: T.textMuted, marginTop: 4 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 10 — ANALYTICS
═══════════════════════════════════════════════════════════ */
const AnalyticsScreen = ({ onNav, T }) => {
  const bars = [42, 67, 35, 89, 54, 78, 91];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const pie = [
    { label: "Dangerous Overtake", pct: 38, c: T.accent },
    { label: "Signal Jump", pct: 24, c: T.yellow },
    { label: "Overloaded Vehicle", pct: 22, c: T.green },
    { label: "Others", pct: 16, c: T.primary },
  ];
  const maxB = Math.max(...bars);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar title="Analytics" T={T} showNotif={false} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ v: "1,284", l: "Total", c: T.orange }, { v: "91%", l: "AI Accuracy", c: T.green }, { v: "47", l: "Pending", c: T.yellow }].map((s, i) => (
            <Card key={i} T={T} style={{ flex: 1, textAlign: "center", padding: "12px 6px" }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 20, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 9, color: T.textSub, marginTop: 2, fontWeight: 600 }}>{s.l}</div>
            </Card>
          ))}
        </div>
        <Card T={T}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 14, letterSpacing: 0.5 }}>VIOLATIONS THIS WEEK</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90 }}>
            {bars.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ fontSize: 9, color: T.textSub }}>{v}</div>
                <div style={{ width: "100%", height: `${(v / maxB) * 70}px`, background: i === 6 ? `linear-gradient(180deg,${T.orange},${T.primary})` : `linear-gradient(180deg,${T.primary}99,${T.primary}44)`, borderRadius: "4px 4px 0 0", minHeight: 8, transition: "height .5s" }} />
                <div style={{ fontSize: 9, color: i === 6 ? T.orange : T.textMuted, fontWeight: i === 6 ? 700 : 400 }}>{days[i]}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card T={T}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 12, letterSpacing: 0.5 }}>VIOLATION TYPES</div>
          {pie.map((p, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? 10 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: p.c }} />
                  <span style={{ fontSize: 12, color: T.text }}>{p.label}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: p.c }}>{p.pct}%</span>
              </div>
              <div style={{ height: 6, background: T.inputBg, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${p.pct}%`, background: p.c, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </Card>
        <Card T={T}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 10, letterSpacing: 0.5 }}>APPROVED VS REJECTED</div>
          <svg width="100%" height="64" viewBox="0 0 300 64" preserveAspectRatio="none">
            <polyline points="0,54 40,38 80,44 120,22 160,32 200,12 240,20 300,8" fill="none" stroke={T.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="0,58 40,54 80,56 120,48 160,54 200,44 240,50 300,40" fill="none" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeDasharray="5 3" />
          </svg>
          <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 14, height: 2.5, background: T.green, borderRadius: 2 }} /><span style={{ fontSize: 10, color: T.textSub }}>Approved</span></div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 14, height: 2, borderTop: `2px dashed ${T.accent}` }} /><span style={{ fontSize: 10, color: T.textSub }}>Rejected</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 11 — PROFILE
═══════════════════════════════════════════════════════════ */
const ProfileScreen = ({ onNav, T, user }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <TopBar title="My Profile" T={T} rightEl={
      <button onClick={() => onNav("settings")} style={{ background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: 8, cursor: "pointer" }}>
        <Ico n="settings" s={17} c={T.text} />
      </button>
    } />
    <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: `linear-gradient(135deg,${T.primary}33,${T.card})`, border: `1px solid ${T.border}`, borderRadius: 20, padding: 20, textAlign: "center", boxShadow: T.shadow }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg,${DARK.primary},#0d2040)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", border: `3px solid ${T.orange}44`, position: "relative" }}>
          <Ico n="user" s={38} c={T.orange} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, borderRadius: "50%", background: T.green, border: `3px solid ${T.card}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ico n="check" s={10} c="#fff" /></div>
        </div>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 22, color: T.text, letterSpacing: 1 }}>{user?.name?.toUpperCase() || "RAJESH KUMAR"}</div>
        <div style={{ color: T.textSub, fontSize: 12, marginTop: 2 }}>{user?.email || "rajesh.kumar@gmail.com"}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
          <Badge label="VERIFIED" color={T.green} small />
          <Badge label="DIGILOCKER ✓" color={DARK.primaryBright} small />
        </div>
        <div style={{ display: "flex", gap: 0, marginTop: 16, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
          {[{ v: "142", l: "Reports" }, { v: "91%", l: "Accuracy" }, { v: "280", l: "Points" }].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 18, color: T.orange }}>{s.v}</div>
              <div style={{ fontSize: 10, color: T.textSub }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <Card T={T}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 10, letterSpacing: 0.5 }}>ACCOUNT DETAILS</div>
        {[
          { l: "Full Name", v: user?.name || "Rajesh Kumar", icon: "user" },
          { l: "Email", v: user?.email || "rajesh.kumar@gmail.com", icon: "mail" },
          { l: "Mobile", v: user?.phone || "+91 98765 43210", icon: "phone" },
          { l: "Vehicle No.", v: "MH04-RK7890", icon: "car" },
          { l: "License No.", v: "MH0420190012345", icon: "id" },
          { l: "Device ID", v: "DAM-NX-8821-LINK", icon: "wifi" },
        ].map((d, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: i < 5 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: T.inputBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ico n={d.icon} s={13} c={T.textSub} /></div>
            <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: T.textSub }}>{d.l}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.text, textAlign: "right", maxWidth: "60%" }}>{d.v}</span>
            </div>
          </div>
        ))}
      </Card>
      <div style={{ display: "flex", gap: 10 }}>
        <Btn label="Edit Profile" bg={DARK.primary} icon="edit" full />
        <Btn label="Logout" bg={`${T.accent}22`} color={T.accent} icon="logout" outline full style={{ border: `2px solid ${T.accent}55` }} />
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   SCREEN 12 — SETTINGS  (with dark/light toggle)
═══════════════════════════════════════════════════════════ */
const SettingsScreen = ({ onNav, T, isDark, toggleTheme }) => {
  const [notifs, setNotifs] = useState(true);
  const [gps, setGps] = useState(true);
  const [autoAI, setAutoAI] = useState(false);
  const [sound, setSound] = useState(true);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar title="Settings" T={T} onBack={() => onNav("profile")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Theme toggle — prominent */}
        <div style={{ background: isDark ? "linear-gradient(135deg,#0d2040,#1a3c6d33)" : "linear-gradient(135deg,#ddeaf7,#c0d8f0)", border: `2px solid ${isDark ? DARK.primaryBright + "44" : DARK.primary + "33"}`, borderRadius: 18, padding: 16 }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 14, letterSpacing: 0.5 }}>🎨 APPEARANCE</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ico n={isDark ? "moon" : "sun"} s={20} c={isDark ? "#8ab4f8" : DARK.orange} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: T.text, fontSize: 14 }}>{isDark ? "Dark Mode" : "Light Mode"}</div>
                <div style={{ fontSize: 11, color: T.textSub }}>Tap to switch theme</div>
              </div>
            </div>
            <Toggle val={isDark} set={toggleTheme} T={T} />
          </div>
          {/* Preview swatches */}
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            {[["Dark", "#080f1a", "#F4A261", true], ["Light", "#f0f4f8", "#1A3C6D", false]].map(([label, bg, accent, dark]) => (
              <div key={label} onClick={() => { if (isDark !== dark) toggleTheme(); }} style={{ flex: 1, background: bg, borderRadius: 12, padding: "10px 8px", textAlign: "center", cursor: "pointer", border: `2px solid ${isDark === dark ? accent : "transparent"}`, transition: "border .2s" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: accent }}>{label}</div>
                <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: 6 }}>
                  {[accent, "#2ECC71", "#E63946"].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Card T={T}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 12, letterSpacing: 0.5 }}>PREFERENCES</div>
          {[
            { l: "Push Notifications", sub: "Violation alerts, case updates", val: notifs, set: setNotifs },
            { l: "GPS Location", sub: "Required for accurate reporting", val: gps, set: setGps },
            { l: "Auto AI Verification", sub: "Verify evidence automatically", val: autoAI, set: setAutoAI },
            { l: "Sound Alerts", sub: "Beep on new detections", val: sound, set: setSound },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < 3 ? `1px solid ${T.border}` : "none" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{s.l}</div>
                <div style={{ fontSize: 11, color: T.textSub, marginTop: 1 }}>{s.sub}</div>
              </div>
              <Toggle val={s.val} set={s.set} T={T} />
            </div>
          ))}
        </Card>
        <Card T={T}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 10, letterSpacing: 0.5 }}>LEGAL & INFO</div>
          {[
            { l: "Privacy Policy", icon: "privacy" },
            { l: "Terms of Service", icon: "terms" },
            { l: "DigiLocker Agreement", icon: "shield" },
            { l: "About Link_a_Way v2.4.1", icon: "info" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "between", alignItems: "center", padding: "11px 0", borderBottom: i < 3 ? `1px solid ${T.border}` : "none", cursor: "pointer" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Ico n={item.icon} s={15} c={T.textSub} />
                <span style={{ fontSize: 13, color: T.text }}>{item.l}</span>
              </div>
              <Ico n="back" s={14} c={T.textMuted} style={{ transform: "rotate(180deg)" }} />
            </div>
          ))}
        </Card>
        <Btn label="Delete Account" bg={`${T.accent}15`} color={T.accent} icon="trash" full style={{ border: `1.5px solid ${T.accent}44` }} />
        <div style={{ textAlign: "center", color: T.textMuted, fontSize: 10, letterSpacing: 1, fontWeight: 600 }}>
          LINK_A_WAY v2.4.1 · BUILD 2026.03.31
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   HOW IT WORKS MODAL
═══════════════════════════════════════════════════════════ */
const HowItWorksModal = ({ onClose, T }) => {
  const steps = [
    { num: "01", title: "Install on Android / iOS", body: "Download from Google Play or Apple App Store. The app uses React Native / Flutter under the hood, making it truly cross-platform. Connects to your dashcam via Bluetooth or WiFi Direct.", icon: "phone", color: T.orange },
    { num: "02", title: "Dashcam Connects Automatically", body: "Pair your dashcam device (USB/BT) in Settings. The app receives live video feed. When a heavy vehicle overtakes dangerously, the camera icon records the clip automatically or you tap Record.", icon: "camera", color: T.accent },
    { num: "03", title: "AI Analyses the Video", body: "The clip is sent to our server running a YOLO-based computer vision model. It detects truck class, speed, lane markings, and confidence score in under 10 seconds.", icon: "ai", color: "#60a5fa" },
    { num: "04", title: "DigiLocker Verification", body: "The vehicle number plate is extracted via OCR. The app pings India's DigiLocker API to verify if registration, fitness certificate and insurance are valid — confirming complaint legitimacy.", icon: "id", color: T.green },
    { num: "05", title: "Report Sent to Police", body: "If AI confidence > 80% and DigiLocker verifies the plate, the case report (video + AI summary + violator details) is sent to the nearest police station via the Government Traffic API or WhatsApp Business API.", icon: "send", color: T.primary },
    { num: "06", title: "Android — React Native / Kotlin", body: "Minimum Android 8.0 (Oreo). Uses Camera2 API for hardware camera access, MediaCodec for real-time H.264 encoding, and WorkManager for background uploads. Published on Google Play Store.", icon: "phone", color: T.orange },
    { num: "07", title: "iOS — React Native / Swift", body: "Minimum iOS 14. Uses AVFoundation for camera, VideoToolbox for encoding. Background tasks via BGTaskScheduler. Location via CoreLocation. Submitted to Apple App Store via TestFlight first.", icon: "shield", color: "#a78bfa" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 999, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 480, maxHeight: "90vh", background: T.bg, borderRadius: "24px 24px 0 0", overflow: "hidden", display: "flex", flexDirection: "column" }} className="slide-up">
        <div style={{ padding: "16px 20px 12px", background: T.card, borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 20, color: T.text, letterSpacing: 1 }}>HOW LINK_A_WAY WORKS</div>
          <button onClick={onClose} style={{ background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: 7, cursor: "pointer" }}>
            <Ico n="x" s={16} c={T.text} />
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "14px 20px 30px", display: "flex", flexDirection: "column", gap: 12 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.color}18`, border: `1.5px solid ${s.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico n={s.icon} s={18} c={s.color} />
                </div>
              </div>
              <div style={{ flex: 1, paddingBottom: 12, borderBottom: i < steps.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 10, color: s.color, letterSpacing: 1 }}>STEP {s.num}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: T.textSub, lineHeight: 1.6 }}>{s.body}</div>
              </div>
            </div>
          ))}
          <div style={{ background: `${T.green}0d`, border: `1px solid ${T.green}25`, borderRadius: 14, padding: 14 }}>
            <div style={{ fontWeight: 700, color: T.green, fontSize: 13, marginBottom: 6 }}>📱 For Android & iOS Developers</div>
            <div style={{ fontSize: 12, color: T.textSub, lineHeight: 1.6 }}>
              <b style={{ color: T.text }}>Recommended stack:</b> React Native (shared codebase) + Expo + expo-camera + expo-location. Backend: Node.js + Python (AI) + Firebase. 
              AI: Python FastAPI with YOLOv8 model. DigiLocker: Official NDA API. Police reporting: Digital India traffic portal or state police APIs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("dashboard");
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [user, setUser] = useState({ name: "Rajesh Kumar", email: "rajesh.kumar@gmail.com", phone: "9876543210" });

  const T = isDark ? DARK : LIGHT;
  const toggleTheme = () => setIsDark(d => !d);

  const mainTabs = ["dashboard", "reports", "analytics", "profile"];
  const showNav = !["splash", "auth", "otp"].includes(screen);
  const navActive = mainTabs.includes(screen) ? screen : (screen === "camera" ? "camera" : tab);

  const nav = (s) => {
    setScreen(s);
    if (mainTabs.includes(s)) setTab(s);
  };

  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen onNext={() => setScreen("auth")} T={DARK} />;
      case "auth": return <AuthScreen onNext={() => setScreen("dashboard")} T={T} />;
      case "dashboard": return <DashboardScreen onNav={nav} T={T} user={user} />;
      case "reports": return <ReportsScreen onNav={nav} T={T} />;
      case "camera": return <CameraScreen onNav={nav} T={T} />;
      case "evidence": return <EvidenceScreen onNav={nav} T={T} />;
      case "ai": return <AIScreen onNav={nav} T={T} />;
      case "police": return <PoliceScreen onNav={nav} T={T} />;
      case "notifications": return <NotificationsScreen onNav={nav} T={T} />;
      case "analytics": return <AnalyticsScreen onNav={nav} T={T} />;
      case "profile": return <ProfileScreen onNav={nav} T={T} user={user} />;
      case "settings": return <SettingsScreen onNav={nav} T={T} isDark={isDark} toggleTheme={toggleTheme} />;
      default: return <DashboardScreen onNav={nav} T={T} user={user} />;
    }
  };

  return (
    <>
      <style>{buildCSS()}</style>
      <div style={{ minHeight: "100vh", background: isDark ? "#030810" : "#d4e0ed", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, flexDirection: "column", gap: 16, transition: "background .4s", fontFamily: "'Barlow',sans-serif" }}>
        {/* Top control bar */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {/* Theme toggle */}
          <button onClick={toggleTheme} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(26,60,109,0.1)", border: `1.5px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(26,60,109,0.2)"}`, cursor: "pointer", color: isDark ? "#F4A261" : "#1A3C6D", fontWeight: 700, fontSize: 13, fontFamily: "'Barlow',sans-serif" }}>
            <Ico n={isDark ? "moon" : "sun"} s={16} c={isDark ? "#F4A261" : "#1A3C6D"} />
            {isDark ? "Dark Mode" : "Light Mode"}
          </button>
          {/* How it works */}
          <button onClick={() => setShowHowItWorks(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, background: isDark ? "rgba(26,60,109,0.3)" : "rgba(26,60,109,0.15)", border: "1.5px solid rgba(26,60,109,0.3)", cursor: "pointer", color: isDark ? "#60a5fa" : "#1A3C6D", fontWeight: 700, fontSize: 13, fontFamily: "'Barlow',sans-serif" }}>
            <Ico n="info" s={16} c={isDark ? "#60a5fa" : "#1A3C6D"} />
            How It Works (Android/iOS)
          </button>
        </div>

        {/* Screen nav pills */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center", maxWidth: 520 }}>
          {[
            ["splash", "🚀 Splash"], ["auth", "🔐 Login"], ["dashboard", "🏠 Home"],
            ["reports", "📋 Reports"], ["camera", "🎥 Camera"], ["evidence", "🔍 Evidence"],
            ["ai", "🤖 AI Verify"], ["police", "👮 Police"], ["notifications", "🔔 Alerts"],
            ["analytics", "📊 Stats"], ["profile", "👤 Profile"], ["settings", "⚙️ Settings"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => nav(id)} style={{ padding: "5px 10px", borderRadius: 8, border: `1.5px solid ${screen === id ? T.orange : T.border}`, background: screen === id ? `${T.orange}20` : isDark ? "rgba(255,255,255,0.03)" : "rgba(26,60,109,0.05)", color: screen === id ? T.orange : T.textSub, fontSize: 10, cursor: "pointer", fontWeight: screen === id ? 700 : 500, transition: "all .2s", fontFamily: "'Barlow',sans-serif" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Phone */}
        <PhoneFrame T={T}>
          <div key={screen} className="screen-enter" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: T.bg, transition: "background .4s" }}>
            {renderScreen()}
          </div>
          {showNav && screen !== "camera" && (
            <BottomNav active={navActive} onNav={s => { if (s === "camera") nav("camera"); else nav(s); }} T={T} />
          )}
        </PhoneFrame>

        <div style={{ fontSize: 10, color: isDark ? "rgba(255,255,255,0.2)" : "rgba(26,60,109,0.35)", textAlign: "center", letterSpacing: 1, fontWeight: 600 }}>
          LINK_A_WAY · ROAD SAFETY · ALL 12 SCREENS · DARK/LIGHT MODE · FULLY INTERACTIVE
        </div>
      </div>

      {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} T={T} />}
    </>
  );
}
