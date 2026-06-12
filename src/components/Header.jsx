import React, { useState, useRef, useEffect } from 'react';
import { OurWorkMegaMenu3, WhoWeAreMegaMenu3, NewsMegaMenu3 } from './MegaMenus.jsx';

const NAV_ITEMS = [
  { label: "Solutions", href: "/#solutions", hasMega: true },
  { label: "Our Work",  href: "/#process",   hasMega: true },
  { label: "Who We Are",href: "/#who",       hasMega: true },
  { label: "News",      href: "/news" },
  { label: "Contact",   href: "/contact" },
];

const SOLUTIONS_ITEMS = [
  { icon: "standards",  title: "Technical Document Standards",      desc: "S1000D, MIL-SPEC, ATA. Authoring and lifecycle compliance.",    href: "#" },
  { icon: "conversion", title: "Conversion",                        desc: "Legacy formats to S1000D, XML, JSON — schema-aware migration.", href: "#" },
  { icon: "automation", title: "Automation",                        desc: "Validation suites, schema mapping, repeatable pipelines.",      href: "#" },
  { icon: "writing",    title: "Technical Writing & Illustrations",  desc: "Engineering-grade docs and isometric vector artwork.",          href: "#" },
  { icon: "audit",      title: "Auditing & Quality Assurance",      desc: "Evidence-first reviews that auditors accept on first pass.",    href: "#" },
  { icon: "lifecycle",  title: "Lifecycle Acquisition",             desc: "Programs supported from RFP through sustainment.",             href: "#" },
  { icon: "consulting", title: "Consulting",                        desc: "Senior engineers on retainer — scoped, written advice.",       href: "/consulting" },
  { icon: "university", title: "University of Pentecom",            desc: "Hands-on training in standards, tooling, and audit.",          href: "#" },
];

const SolIcon = ({ kind }) => {
  const common = { width: 22, height: 22, viewBox: "0 0 48 48", "aria-hidden": true, style: { display: "block", flexShrink: 0 } };
  const icons = {
    standards:  <g transform="skewX(-12)"><rect x="10" y="6" width="32" height="36" fill="url(#g-sol-brand)" opacity="0.22"/><rect x="14" y="12" width="20" height="3" fill="url(#g-sol-brand)"/><rect x="14" y="18" width="14" height="3" fill="url(#g-sol-brand)" opacity="0.8"/><rect x="14" y="24" width="18" height="3" fill="url(#g-sol-brand)" opacity="0.8"/></g>,
    conversion: <g transform="skewX(-12)"><rect x="6"  y="8"  width="16" height="32" fill="url(#g-sol-brand)" opacity="0.55"/><rect x="26" y="8"  width="16" height="32" fill="url(#g-sol-brand)" opacity="0.85"/></g>,
    automation: <g transform="skewX(-12)"><rect x="8"  y="6"  width="32" height="36" fill="url(#g-sol-brand)" opacity="0.22"/><rect x="12" y="16" width="24" height="4"  fill="url(#g-sol-brand)"/><rect x="12" y="24" width="18" height="4"  fill="url(#g-sol-brand)" opacity="0.7"/><rect x="12" y="32" width="22" height="4"  fill="url(#g-sol-brand)" opacity="0.5"/></g>,
    writing:    <g transform="skewX(-12)"><rect x="10" y="6"  width="28" height="36" fill="url(#g-sol-brand)" opacity="0.22"/><rect x="14" y="12" width="20" height="3"  fill="url(#g-sol-brand)"/><rect x="14" y="18" width="16" height="3"  fill="url(#g-sol-brand)" opacity="0.7"/><rect x="14" y="24" width="20" height="3"  fill="url(#g-sol-brand)" opacity="0.7"/><rect x="14" y="30" width="12" height="3"  fill="url(#g-sol-brand)" opacity="0.5"/></g>,
    audit:      <g transform="skewX(-12)"><rect x="8"  y="6"  width="32" height="36" fill="url(#g-sol-brand)" opacity="0.22"/><polygon points="24,14 30,26 18,26" fill="url(#g-sol-brand)"/><rect x="22" y="28" width="4" height="4" fill="url(#g-sol-brand)" opacity="0.7"/></g>,
    lifecycle:  <><rect x="4" y="22" width="40" height="2" fill="url(#g-sol-brand)" opacity="0.55"/><g fill="url(#g-sol-brand)"><rect x="6" y="18" width="4" height="10" opacity="0.5"/><rect x="16" y="14" width="4" height="14" opacity="0.78"/><rect x="26" y="8" width="4" height="20"/><rect x="36" y="16" width="4" height="12" opacity="0.6"/></g></>,
    consulting: <g transform="skewX(-12)"><rect x="8" y="6" width="32" height="36" fill="url(#g-sol-brand)" opacity="0.22"/><rect x="12" y="14" width="24" height="3" fill="url(#g-sol-brand)"/><rect x="12" y="20" width="18" height="3" fill="url(#g-sol-brand)" opacity="0.7"/><rect x="12" y="32" width="14" height="8" fill="url(#g-sol-brand)" opacity="0.9"/></g>,
    university: <g transform="skewX(-12)"><polygon points="8,18 24,8 40,18 36,18 24,12 12,18" fill="url(#g-sol-brand)" opacity="0.5"/><polygon points="8,28 24,18 40,28 36,28 24,22 12,28" fill="url(#g-sol-brand)" opacity="0.75"/><polygon points="8,38 24,28 40,38 36,38 24,32 12,38" fill="url(#g-sol-brand)"/></g>,
  };
  return <svg {...common}>{icons[kind] || null}</svg>;
};

const SolutionsMegaMenu = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef   = useRef(null);
  const openTimer  = useRef(null);
  const closeTimer = useRef(null);
  const panelId    = "solutions-mega-3";

  const doOpen  = (focusFirst = false) => { clearTimeout(openTimer.current); clearTimeout(closeTimer.current); setOpen(true); if (focusFirst) setTimeout(() => { const f = panelRef.current?.querySelector("a.sol-mega-3-item"); if (f) f.focus(); }, 30); };
  const doClose = (ret = false)        => { clearTimeout(openTimer.current); clearTimeout(closeTimer.current); setOpen(false); if (ret && triggerRef.current) triggerRef.current.focus(); };

  useEffect(() => {
    if (!open) return;
    const away = (e) => { if (!triggerRef.current?.contains(e.target) && !panelRef.current?.contains(e.target)) doClose(false); };
    document.addEventListener("click", away);
    document.addEventListener("focusin", away);
    return () => { document.removeEventListener("click", away); document.removeEventListener("focusin", away); };
  }, [open]);

  return (
    <React.Fragment>
      <button
        ref={triggerRef} type="button" className="nav-mega-3-trigger"
        aria-expanded={open} aria-controls={panelId} aria-haspopup="true"
        onClick={() => open ? doClose(false) : doOpen(false)}
        onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); open ? panelRef.current?.querySelector("a.sol-mega-3-item")?.focus() : doOpen(true); } else if (e.key === "Escape" && open) { e.preventDefault(); doClose(true); } }}
        onMouseEnter={() => { clearTimeout(closeTimer.current); openTimer.current = setTimeout(() => doOpen(false), 80); }}
        onMouseLeave={() => { clearTimeout(openTimer.current); closeTimer.current = setTimeout(() => doClose(false), 240); }}
      >
        Solutions
        <svg className="nav-mega-3-chev" width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={panelRef} id={panelId}
        className="nav-mega-3-panel sol-mega-3-panel"
        data-open={open ? "true" : "false"} role="region" aria-label="Solutions menu" hidden={!open}
        onKeyDown={(e) => { if (e.key === "Escape") { e.preventDefault(); doClose(true); } }}
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        onMouseLeave={() => { clearTimeout(openTimer.current); closeTimer.current = setTimeout(() => doClose(false), 240); }}
      >
        <div className="sol-mega-3-inner">
          {/* SVG gradient defs — reused by all SolIcon instances */}
          <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
            <defs>
              <linearGradient id="g-sol-brand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="var(--pentecon-blue)" />
                <stop offset="100%" stopColor="var(--pentecon-navy)" />
              </linearGradient>
              <linearGradient id="g-sol-soft" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="var(--pentecon-aqua)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="var(--pentecon-blue)" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="sol-mega-3-grid">
            {SOLUTIONS_ITEMS.map(s => (
              <a key={s.title} className="sol-mega-3-item" href={s.href}>
                <span className="sol-mega-3-icon"><SolIcon kind={s.icon} /></span>
                <span className="sol-mega-3-text">
                  <span className="sol-mega-3-title">{s.title}</span>
                  <span className="sol-mega-3-desc">{s.desc}</span>
                </span>
              </a>
            ))}
          </div>

          <aside className="sol-mega-3-feat">
            <span className="sol-mega-3-feat-eyebrow">Start here</span>
            <h3 className="sol-mega-3-feat-title">S1000D authoring to audit in one engagement.</h3>
            <p className="sol-mega-3-feat-body">From data module schema through first-pass acceptance — Pentecom engineers hold the whole chain.</p>
            <a href="/consulting" className="sol-mega-3-feat-cta">
              See Consulting
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </aside>
        </div>

        <style>{`
          .sol-mega-3-panel { position: fixed; top: 120px; left: 0; right: 0; background: var(--bg-2); border-bottom: 1px solid var(--line); box-shadow: 0 20px 60px -20px rgba(0,0,0,0.85); transform: translateY(-8px); opacity: 0; pointer-events: none; visibility: hidden; transition: transform 240ms cubic-bezier(.2,.7,.2,1), opacity 200ms ease, visibility 0s linear 200ms; z-index: 49; }
          .sol-mega-3-panel[data-open="true"] { transform: translateY(0); opacity: 1; pointer-events: auto; visibility: visible; transition: transform 240ms cubic-bezier(.2,.7,.2,1), opacity 200ms ease, visibility 0s; }
          .sol-mega-3-inner { max-width: 1640px; margin: 0 auto; padding: 40px 56px 48px; display: grid; grid-template-columns: 2fr 1fr; gap: 56px; }
          .sol-mega-3-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
          .sol-mega-3-item { display: flex; flex-direction: column; gap: 12px; padding: 16px 14px; border-radius: 6px; text-decoration: none; color: inherit; transition: background 140ms ease; }
          .sol-mega-3-item:hover { background: rgba(125,154,239,0.06); }
          .sol-mega-3-item:focus-visible { background: rgba(125,154,239,0.08); outline: 2px solid #7d9aef; outline-offset: -2px; }
          .sol-mega-3-icon { width: 44px; height: 44px; border: 1px solid var(--line); border-radius: 4px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.02); transition: border-color 140ms ease; }
          .sol-mega-3-item:hover .sol-mega-3-icon { border-color: rgba(125,154,239,0.4); }
          .sol-mega-3-title { display: block; font-size: 14px; font-weight: 500; color: var(--ink); letter-spacing: -0.005em; margin: 0 0 4px; line-height: 1.3; }
          .sol-mega-3-desc { display: block; font-size: 12px; color: var(--ink-2); line-height: 1.5; }
          .sol-mega-3-feat { border-radius: 8px; padding: 28px 26px 26px; background: radial-gradient(circle at 20% 20%, hsl(222 55% 32% / 0.7) 0%, transparent 55%), radial-gradient(circle at 80% 80%, hsl(220 50% 18% / 0.9) 0%, transparent 60%), linear-gradient(140deg, hsl(222 45% 22%) 0%, hsl(222 55% 12%) 100%); display: flex; flex-direction: column; gap: 14px; border: 1px solid rgba(255,255,255,0.08); }
          .sol-mega-3-feat-eyebrow { font-family: 'Geist Mono', 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.92); }
          .sol-mega-3-feat-title { font-size: 22px; font-weight: 500; letter-spacing: -0.015em; line-height: 1.25; color: #ffffff; margin: 0; }
          .sol-mega-3-feat-body { font-size: 14px; color: rgba(255,255,255,0.92); line-height: 1.55; margin: 0; }
          .sol-mega-3-feat-cta { margin-top: auto; display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; background: #ffffff; color: #0e1014; font-weight: 500; font-size: 14px; border-radius: 4px; align-self: flex-start; text-decoration: none; transition: transform 120ms ease; }
          .sol-mega-3-feat-cta:hover { transform: translateX(2px); }
          @media (max-width: 1100px) { .sol-mega-3-inner { grid-template-columns: 1fr; } .sol-mega-3-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 720px) { .sol-mega-3-grid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </React.Fragment>
  );
};

export default function Header({ currentPath = "/" }) {
  return (
    <React.Fragment>
      {/* SVG gradient defs shared by mega menus */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          <linearGradient id="g-sol-brand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="var(--pentecon-blue)" />
            <stop offset="100%" stopColor="var(--pentecon-navy)" />
          </linearGradient>
          <linearGradient id="g-sol-soft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="var(--pentecon-aqua)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--pentecon-blue)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="announce-light">
        Supporting <strong>S1000D &amp; MIL-SPEC</strong>.&nbsp;<a href="/#solutions">See capabilities →</a>
      </div>

      <header className="site-header-3">
        <div className="container site-header-3-inner">
          <a href="/" style={{ display: "inline-flex", alignItems: "center" }} aria-label="Pentecom">
            <img src="/assets/pentecon-logo-home3.png" alt="Pentecom. Experience. Expertise. Excellence." style={{ display: "block", height: 48, width: "auto" }} />
          </a>
          <nav className="nav-center">
            <SolutionsMegaMenu />
            <OurWorkMegaMenu3 />
            <WhoWeAreMegaMenu3 />
            <NewsMegaMenu3 />
            <a href="/contact">Contact</a>
          </nav>
          <div className="nav-right">
            <a href="/contact" className="btn">Start a project</a>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
