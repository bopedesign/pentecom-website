/* eslint-disable */
import React, { useState as useState3, useEffect as useEffect3, useRef as useRef3 } from 'react';
import { OurWorkMegaMenu3, WhoWeAreMegaMenu3, NewsMegaMenu3, NavMega3SvgDefs } from './MegaMenus.jsx';
import { SolutionIcon3 } from './home/HomeSectionsA.jsx';

const NAV_ITEMS_3 = [
  { label: "Solutions", href: "#solutions", submenu: [
    { label: "Technical Document Standards", href: "#" },
    { label: "Conversion", href: "#" },
    { label: "Automation", href: "#" },
    { label: "Technical Writing & Illustrations", href: "#" },
    { label: "Auditing & Quality Assurance", href: "#" },
    { label: "Lifecycle Acquisition", href: "#" },
    { label: "Consulting", href: "/consulting" },
    { label: "University of Pentecom", href: "#" },
  ]},
  { label: "Our Work", href: "/#process" },
  { label: "Who We Are", href: "/#who", submenu: [
    { label: "Why teams rely on us", href: "/#why" },
  ]},
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const SOLUTIONS_MEGA_3 = [
  { icon: "standards",  title: "Technical Document Standards",   desc: "S1000D, MIL-SPEC, ATA. Authoring and lifecycle compliance.",       href: "#" },
  { icon: "conversion", title: "Conversion",                     desc: "Legacy formats to S1000D, XML, JSON — schema-aware migration.",    href: "#" },
  { icon: "automation", title: "Automation",                     desc: "Validation suites, schema mapping, repeatable pipelines.",          href: "#" },
  { icon: "writing",    title: "Technical Writing & Illustrations", desc: "Engineering-grade docs and isometric vector artwork.",            href: "#" },
  { icon: "audit",      title: "Auditing & Quality Assurance",   desc: "Evidence-first reviews that auditors accept on first pass.",        href: "#" },
  { icon: "lifecycle",  title: "Lifecycle Acquisition",          desc: "Programs supported from RFP through sustainment.",                  href: "#" },
  { icon: "consulting", title: "Consulting",                     desc: "Senior engineers on retainer — scoped, written advice.",            href: "/consulting" },
  { icon: "university", title: "University of Pentecom",         desc: "Hands-on training in standards, tooling, and audit.",               href: "#" },
];

const SolutionsMegaMenu3 = () => {
  const [open, setOpen] = useState3(false);
  const triggerRef = useRef3(null);
  const panelRef   = useRef3(null);
  const openTimer  = useRef3(null);
  const closeTimer = useRef3(null);
  const panelId    = "solutions-mega-3";

  const doOpen = (focusFirst = false) => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setOpen(true);
    if (focusFirst) {
      setTimeout(() => {
        const first = panelRef.current?.querySelector("a.sol-mega-3-item");
        if (first) first.focus();
      }, 30);
    }
  };
  const doClose = (returnFocus = false) => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setOpen(false);
    if (returnFocus && triggerRef.current) triggerRef.current.focus();
  };

  useEffect3(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (triggerRef.current?.contains(e.target)) return;
      if (panelRef.current?.contains(e.target)) return;
      doClose(false);
    };
    const onFocusIn = (e) => {
      if (triggerRef.current?.contains(e.target)) return;
      if (panelRef.current?.contains(e.target)) return;
      doClose(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  const onTriggerKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) doOpen(true);
      else { const first = panelRef.current?.querySelector("a.sol-mega-3-item"); if (first) first.focus(); }
    } else if (e.key === "Escape") {
      if (open) { e.preventDefault(); doClose(true); }
    }
  };

  const onPanelKeyDown = (e) => {
    if (e.key === "Escape") { e.preventDefault(); doClose(true); return; }
    if (e.key !== "Tab") return;
    const focusables = panelRef.current ? [...panelRef.current.querySelectorAll("a, button")] : [];
    if (!focusables.length) return;
    const first = focusables[0]; const last = focusables[focusables.length - 1];
    if (!e.shiftKey && document.activeElement === last) doClose(false);
    else if (e.shiftKey && document.activeElement === first) doClose(false);
  };

  return (
    <React.Fragment>
      <button
        ref={triggerRef} type="button" id="solutions-mega-3-trigger" className="sol-mega-3-trigger"
        aria-expanded={open} aria-controls={panelId} aria-haspopup="true"
        onClick={() => (open ? doClose(false) : doOpen(false))}
        onKeyDown={onTriggerKeyDown}
        onMouseEnter={() => { clearTimeout(closeTimer.current); openTimer.current = setTimeout(() => doOpen(false), 80); }}
        onMouseLeave={() => { clearTimeout(openTimer.current); closeTimer.current = setTimeout(() => doClose(false), 240); }}
      >
        Solutions
        <svg className="sol-mega-3-chev" width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={panelRef} id={panelId} className="sol-mega-3-panel"
        data-open={open ? "true" : "false"} role="region" aria-label="Solutions menu" hidden={!open}
        onKeyDown={onPanelKeyDown}
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        onMouseLeave={() => { clearTimeout(openTimer.current); closeTimer.current = setTimeout(() => doClose(false), 240); }}
      >
        <div className="sol-mega-3-inner">
          <div>
            <div className="sol-mega-3-eyebrow" id="sol-mega-3-heading">Solutions</div>
            <nav aria-labelledby="sol-mega-3-heading">
              <ul className="sol-mega-3-grid">
                {SOLUTIONS_MEGA_3.map(s => (
                  <li key={s.title}>
                    <a className="sol-mega-3-item" href={s.href}>
                      <span className="sol-mega-3-icon" aria-hidden="true"><SolutionIcon3 kind={s.icon} size={22} /></span>
                      <span>
                        <span className="sol-mega-3-title">{s.title}</span>
                        <span className="sol-mega-3-desc">{s.desc}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <aside className="sol-mega-3-feat" aria-label="Featured case study">
            <svg className="sol-mega-3-feat-graphic" viewBox="0 0 100 100" aria-hidden="true">
              <g transform="skewX(-12)" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="20" y="18" width="50" height="22" /><rect x="15" y="42" width="50" height="22" /><rect x="10" y="66" width="50" height="22" />
                <rect x="20" y="18" width="14" height="22" fill="currentColor" stroke="none" opacity="0.6" />
                <rect x="15" y="42" width="14" height="22" fill="currentColor" stroke="none" opacity="0.6" />
                <rect x="10" y="66" width="14" height="22" fill="currentColor" stroke="none" opacity="0.6" />
              </g>
            </svg>
            <span className="sol-mega-3-feat-eyebrow">Featured case study</span>
            <h3 className="sol-mega-3-feat-title">11-week S1000D cutover for a Tier-1 airframe OEM.</h3>
            <p className="sol-mega-3-feat-body">180M records converted, audited, and signed off — first-review audit pass.</p>
            <a href="#" className="sol-mega-3-feat-cta">
              Read the case study
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </aside>
        </div>
      </div>

      <style>{`
        .sol-mega-3-trigger { display:inline-flex;align-items:center;gap:6px;padding:0;font-size:15px;color:var(--ink-2);background:transparent;border:0;cursor:pointer;transition:color 140ms ease; }
        .sol-mega-3-trigger:hover,.sol-mega-3-trigger[aria-expanded="true"] { color:var(--ink); }
        .sol-mega-3-chev { transition:transform 200ms ease; }
        .sol-mega-3-trigger[aria-expanded="true"] .sol-mega-3-chev { transform:rotate(180deg); }
        .sol-mega-3-panel { position:fixed;top:120px;left:0;right:0;background:var(--bg-2);border-bottom:1px solid var(--line);box-shadow:0 20px 60px -20px rgba(0,0,0,0.85);transform:translateY(-8px);opacity:0;pointer-events:none;visibility:hidden;transition:transform 240ms cubic-bezier(.2,.7,.2,1),opacity 200ms ease,visibility 0s linear 200ms;z-index:49; }
        .sol-mega-3-panel[data-open="true"] { transform:translateY(0);opacity:1;pointer-events:auto;visibility:visible;transition:transform 240ms cubic-bezier(.2,.7,.2,1),opacity 200ms ease,visibility 0s; }
        @media(prefers-reduced-motion:reduce){.sol-mega-3-panel{transition:opacity 0.001ms,visibility 0s linear 0.001ms;transform:none!important;}}
        .sol-mega-3-inner { max-width:1640px;margin:0 auto;padding:40px 56px 48px;display:grid;grid-template-columns:2.4fr 1fr;gap:56px; }
        .sol-mega-3-eyebrow { font-family:'Geist Mono','IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:var(--ink-2);margin-bottom:18px; }
        .sol-mega-3-grid { list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:8px 24px; }
        .sol-mega-3-item { display:grid;grid-template-columns:44px 1fr;gap:14px;padding:14px;border-radius:6px;align-items:start;transition:background 140ms ease; }
        .sol-mega-3-item:hover,.sol-mega-3-item:focus-visible { background:rgba(125,154,239,0.06); }
        .sol-mega-3-icon { width:44px;height:44px;border:1px solid var(--line);border-radius:4px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.02);transition:border-color 140ms ease;flex-shrink:0; }
        .sol-mega-3-item:hover .sol-mega-3-icon,.sol-mega-3-item:focus-visible .sol-mega-3-icon { border-color:rgba(125,154,239,0.4); }
        .sol-mega-3-title { display:block;font-size:15px;font-weight:500;color:var(--ink);letter-spacing:-0.005em;margin:0 0 4px;line-height:1.3; }
        .sol-mega-3-desc { display:block;font-size:13px;color:var(--ink-2);line-height:1.45; }
        .sol-mega-3-feat { position:relative;border-radius:8px;padding:28px 26px 26px;background:radial-gradient(circle at 20% 20%,hsl(222 55% 32%/0.7) 0%,transparent 55%),radial-gradient(circle at 80% 80%,hsl(220 50% 18%/0.9) 0%,transparent 60%),linear-gradient(140deg,hsl(222 45% 22%) 0%,hsl(222 55% 12%) 100%);overflow:hidden;display:flex;flex-direction:column;gap:14px;min-height:100%;border:1px solid rgba(255,255,255,0.08); }
        .sol-mega-3-feat-eyebrow { font-family:'Geist Mono','IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.85); }
        .sol-mega-3-feat-title { font-size:22px;font-weight:500;letter-spacing:-0.015em;line-height:1.25;color:#fff;margin:0; }
        .sol-mega-3-feat-body { font-size:14px;color:rgba(255,255,255,0.85);line-height:1.55;margin:0; }
        .sol-mega-3-feat-cta { margin-top:auto;display:inline-flex;align-items:center;gap:8px;padding:10px 16px;background:rgba(255,255,255,0.95);color:#0e1014;font-weight:500;font-size:14px;border-radius:4px;align-self:flex-start;transition:background 140ms ease; }
        .sol-mega-3-feat-cta:hover,.sol-mega-3-feat-cta:focus-visible { background:#fff; }
        .sol-mega-3-feat-graphic { position:absolute;right:-20px;bottom:-20px;width:180px;height:180px;opacity:0.18;color:#fff;pointer-events:none; }
        @media(max-width:1100px){.sol-mega-3-inner{grid-template-columns:1fr;gap:32px;padding:32px 32px 36px;}}
        @media(max-width:720px){.sol-mega-3-grid{grid-template-columns:1fr;}}
      `}</style>
    </React.Fragment>
  );
};

const NavDropdown3 = ({ label, href, submenu }) => {
  const [open, setOpen] = useState3(false);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} style={{ position: "relative" }}>
      <a href={href} onClick={(e) => { if (e.metaKey || e.ctrlKey) return; }}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ink-2)" }}
        aria-haspopup="true" aria-expanded={open}>
        {label}
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {open && (
        <div role="menu" style={{ position: "absolute", top: "100%", left: -16, paddingTop: 12 }}>
          <div style={{ minWidth:240,background:"rgba(255,255,255,0.94)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",border:"1px solid var(--line)",borderRadius:8,padding:6,boxShadow:"0 18px 40px -18px rgba(14,18,28,0.18)" }}>
            {submenu.map(item => (
              <a key={item.label} href={item.href} role="menuitem"
                style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:4,fontSize:15,color:"var(--ink-2)",background:"transparent" }}>
                <span style={{ width:6,height:6,borderRadius:0,background:"var(--menu-dot,rgba(14,18,28,0.18))" }} />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Header() {
  return (
    <React.Fragment>
      <NavMega3SvgDefs />
      <div className="announce-light">
        Supporting <strong>S1000D &amp; MIL-SPEC</strong>.<a href="#solutions">See capabilities →</a>
      </div>
      <header className="site-header-3">
        <div className="container site-header-3-inner">
          <a href="/" style={{ display: "inline-flex", alignItems: "center" }} aria-label="Pentecom">
            <img src="/assets/pentecon-logo-home3.png" alt="Pentecom. Experience. Expertise. Excellence." style={{ display: "block", height: 48, width: "auto" }} />
          </a>
          <nav className="nav-center">
            {NAV_ITEMS_3.map(n => {
              if (n.label === "Solutions") return <SolutionsMegaMenu3 key={n.label} />;
              if (n.label === "Our Work")   return <OurWorkMegaMenu3  key={n.label} />;
              if (n.label === "Who We Are") return <WhoWeAreMegaMenu3 key={n.label} />;
              if (n.label === "News")       return <NewsMegaMenu3     key={n.label} />;
              return n.submenu
                ? <NavDropdown3 key={n.label} {...n} />
                : <a key={n.label} href={n.href}>{n.label}</a>;
            })}
          </nav>
          <div className="nav-right">
            <a href="#contact" className="btn">Start a project</a>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
