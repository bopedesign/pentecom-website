/* eslint-disable */
/* Pentecom — Home 3 (Light, "Documents in motion") — Part A
   Contains: scroll helpers, Header3, Hero3, WhyUs3, CtaBand3, Proof3,
   Solutions3, Orb component, doc-rectangle helpers.
   Part B (page-3b.jsx) handles: Industries3, Process3, News3, Contact3,
   Footer3, App3 + ReactDOM mount.
*/

const { useState: useState3, useEffect: useEffect3, useRef: useRef3, useMemo: useMemo3 } = React;

/* =========================================================================
   Scroll-in observer — adds .in-view to any element with .fade-up
   or .draw-line when it enters the viewport.
   ========================================================================= */
function useInView3(threshold = 0.15) {
  useEffect3(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".fade-up, .draw-line").forEach(el => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold, rootMargin: "-40px 0px" });

    // Observe everything currently in DOM, then keep watching for new nodes
    // (sections that lazy-render after a state change).
    const observeAll = () => {
      document.querySelectorAll(".fade-up:not(.in-view), .draw-line:not(.in-view)").forEach(el => io.observe(el));
    };
    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

/* =========================================================================
   Tweaks — exposed via tweaks-panel.jsx
   ========================================================================= */
const HOME3_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bg": "#f2f1f0",
  "orbHue": 210,
  "motion": true,
  "showDocs": true,
  "mixedWeight": true
}/*EDITMODE-END*/;

/* =========================================================================
   HEADER 3 — light, sits below a hairline announce bar
   ========================================================================= */
const NAV_ITEMS_3 = [
  { label: "Solutions", href: "#solutions", submenu: [
    { label: "Technical Document Standards", href: "#" },
    { label: "Conversion", href: "#" },
    { label: "Automation", href: "#" },
    { label: "Technical Writing & Illustrations", href: "#" },
    { label: "Auditing & Quality Assurance", href: "#" },
    { label: "Lifecycle Acquisition", href: "#" },
    { label: "Consulting", href: "consulting.html" },
    { label: "University of Pentecom", href: "#" },
  ]},
  { label: "Our Work", href: "#process" },
  { label: "Who We Are", href: "#who", submenu: [
    { label: "Why teams rely on us", href: "#why" },
    { label: "Iconography exploration", href: "icons-exploration.html" },
  ]},
  { label: "News", href: "news.html" },
  { label: "Contact", href: "contact.html" },
];

/* =========================================================================
   SOLUTIONS MEGA MENU — accessible disclosure pattern.
   Used in place of NavDropdown3 for the Solutions item on home13.

   ARIA: button trigger w/ aria-expanded + aria-controls + aria-haspopup,
   panel as a region with aria-label, items as a navigation list.

   Keyboard:
     Enter / Space / click — toggle
     ArrowDown on trigger  — open and focus first item
     Esc inside panel      — close and return focus to trigger
     Tab past last item    — close (focus continues naturally)
     Shift+Tab from first  — close
   Pointer:
     Hover trigger or panel — open after 80ms
     Mouse leaves both     — close after 240ms grace period
     Click outside         — close
   Motion: respects prefers-reduced-motion via existing global rule.
   ========================================================================= */
const SOLUTIONS_MEGA_3 = [
  { icon: "standards",  title: "Technical Document Standards",   desc: "S1000D, MIL-SPEC, ATA. Authoring and lifecycle compliance.",       href: "#" },
  { icon: "conversion", title: "Conversion",                     desc: "Legacy formats to S1000D, XML, JSON — schema-aware migration.",    href: "#" },
  { icon: "automation", title: "Automation",                     desc: "Validation suites, schema mapping, repeatable pipelines.",          href: "#" },
  { icon: "writing",    title: "Technical Writing & Illustrations", desc: "Engineering-grade docs and isometric vector artwork.",            href: "#" },
  { icon: "audit",      title: "Auditing & Quality Assurance",   desc: "Evidence-first reviews that auditors accept on first pass.",        href: "#" },
  { icon: "lifecycle",  title: "Lifecycle Acquisition",          desc: "Programs supported from RFP through sustainment.",                  href: "#" },
  { icon: "consulting", title: "Consulting",                     desc: "Senior engineers on retainer — scoped, written advice.",            href: "consulting.html" },
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
      // Defer past React commit + visibility transition so the first item
      // is actually focusable when we call .focus().
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

  // Document-level: click outside, focus moving outside
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
      else {
        const first = panelRef.current?.querySelector("a.sol-mega-3-item");
        if (first) first.focus();
      }
    } else if (e.key === "Escape") {
      if (open) { e.preventDefault(); doClose(true); }
    }
  };

  const onPanelKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      doClose(true);
      return;
    }
    if (e.key !== "Tab") return;
    const focusables = panelRef.current ? [...panelRef.current.querySelectorAll("a, button")] : [];
    if (!focusables.length) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (!e.shiftKey && document.activeElement === last) {
      doClose(false); // let Tab continue past
    } else if (e.shiftKey && document.activeElement === first) {
      doClose(false); // let Shift+Tab return to trigger
    }
  };

  const onTriggerMouseEnter = () => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => doOpen(false), 80);
  };
  const onTriggerMouseLeave = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => doClose(false), 240);
  };
  const onPanelMouseEnter = () => clearTimeout(closeTimer.current);
  const onPanelMouseLeave = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => doClose(false), 240);
  };

  return (
    <React.Fragment>
      <button
        ref={triggerRef}
        type="button"
        id="solutions-mega-3-trigger"
        className="sol-mega-3-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => (open ? doClose(false) : doOpen(false))}
        onKeyDown={onTriggerKeyDown}
        onMouseEnter={onTriggerMouseEnter}
        onMouseLeave={onTriggerMouseLeave}
      >
        Solutions
        <svg className="sol-mega-3-chev" width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        className="sol-mega-3-panel"
        data-open={open ? "true" : "false"}
        role="region"
        aria-label="Solutions menu"
        hidden={!open}
        onKeyDown={onPanelKeyDown}
        onMouseEnter={onPanelMouseEnter}
        onMouseLeave={onPanelMouseLeave}
      >
        <div className="sol-mega-3-inner">
          <div>
            <div className="sol-mega-3-eyebrow" id="sol-mega-3-heading">Solutions</div>
            <nav aria-labelledby="sol-mega-3-heading">
              <ul className="sol-mega-3-grid">
                {SOLUTIONS_MEGA_3.map(s => (
                  <li key={s.title}>
                    <a className="sol-mega-3-item" href={s.href}>
                      <span className="sol-mega-3-icon" aria-hidden="true">
                        <SolutionIcon3 kind={s.icon} size={22} />
                      </span>
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
                <rect x="20" y="18" width="50" height="22" />
                <rect x="15" y="42" width="50" height="22" />
                <rect x="10" y="66" width="50" height="22" />
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
        .sol-mega-3-trigger {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 0;
          font-size: 15px;
          color: var(--ink-2);
          background: transparent;
          border: 0;
          cursor: pointer;
          transition: color 140ms ease;
        }
        .sol-mega-3-trigger:hover,
        .sol-mega-3-trigger[aria-expanded="true"] { color: var(--ink); }
        .sol-mega-3-chev { transition: transform 200ms ease; }
        .sol-mega-3-trigger[aria-expanded="true"] .sol-mega-3-chev { transform: rotate(180deg); }

        /* Panel anchored under the fixed header: 36px announce + 84px header = 120px */
        .sol-mega-3-panel {
          position: fixed;
          top: 120px; left: 0; right: 0;
          background: var(--bg-2);
          border-bottom: 1px solid var(--line);
          box-shadow: 0 20px 60px -20px rgba(0,0,0,0.85);
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transition: transform 240ms cubic-bezier(.2,.7,.2,1),
                      opacity 200ms ease,
                      visibility 0s linear 200ms;
          z-index: 49;
        }
        .sol-mega-3-panel[data-open="true"] {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
          transition: transform 240ms cubic-bezier(.2,.7,.2,1),
                      opacity 200ms ease,
                      visibility 0s;
        }
        @media (prefers-reduced-motion: reduce) {
          .sol-mega-3-panel { transition: opacity 0.001ms, visibility 0s linear 0.001ms; transform: none !important; }
        }

        .sol-mega-3-inner {
          max-width: 1640px;
          margin: 0 auto;
          padding: 40px 56px 48px;
          display: grid;
          grid-template-columns: 2.4fr 1fr;
          gap: 56px;
        }
        .sol-mega-3-eyebrow {
          font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-2);
          margin-bottom: 18px;
        }
        .sol-mega-3-grid {
          list-style: none; padding: 0; margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 24px;
        }
        .sol-mega-3-item {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 14px;
          padding: 14px;
          border-radius: 6px;
          align-items: start;
          transition: background 140ms ease;
        }
        .sol-mega-3-item:hover,
        .sol-mega-3-item:focus-visible {
          background: rgba(125, 154, 239, 0.06);
        }
        .sol-mega-3-icon {
          width: 44px; height: 44px;
          border: 1px solid var(--line);
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.02);
          transition: border-color 140ms ease;
          flex-shrink: 0;
        }
        .sol-mega-3-item:hover .sol-mega-3-icon,
        .sol-mega-3-item:focus-visible .sol-mega-3-icon {
          border-color: rgba(125,154,239,0.4);
        }
        .sol-mega-3-title {
          display: block;
          font-size: 15px;
          font-weight: 500;
          color: var(--ink);
          letter-spacing: -0.005em;
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .sol-mega-3-desc {
          display: block;
          font-size: 13px;
          color: var(--ink-2);
          line-height: 1.45;
        }

        .sol-mega-3-feat {
          position: relative;
          border-radius: 8px;
          padding: 28px 26px 26px;
          background:
            radial-gradient(circle at 20% 20%, hsl(222 55% 32% / 0.7) 0%, transparent 55%),
            radial-gradient(circle at 80% 80%, hsl(220 50% 18% / 0.9) 0%, transparent 60%),
            linear-gradient(140deg, hsl(222 45% 22%) 0%, hsl(222 55% 12%) 100%);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 100%;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .sol-mega-3-feat-eyebrow {
          font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
        }
        .sol-mega-3-feat-title {
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.015em;
          line-height: 1.25;
          color: #fff;
          margin: 0;
        }
        .sol-mega-3-feat-body {
          font-size: 14px;
          color: rgba(255,255,255,0.85);
          line-height: 1.55;
          margin: 0;
        }
        .sol-mega-3-feat-cta {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(255,255,255,0.95);
          color: #0e1014;
          font-weight: 500;
          font-size: 14px;
          border-radius: 4px;
          align-self: flex-start;
          transition: background 140ms ease;
        }
        .sol-mega-3-feat-cta:hover,
        .sol-mega-3-feat-cta:focus-visible { background: #fff; }
        .sol-mega-3-feat-graphic {
          position: absolute;
          right: -20px; bottom: -20px;
          width: 180px; height: 180px;
          opacity: 0.18;
          color: #fff;
          pointer-events: none;
        }

        @media (max-width: 1100px) {
          .sol-mega-3-inner { grid-template-columns: 1fr; gap: 32px; padding: 32px 32px 36px; }
        }
        @media (max-width: 720px) {
          .sol-mega-3-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </React.Fragment>
  );
};

/* Generic dropdown for a nav item with a submenu — mirrors the Home dropdown's chrome. */
const NavDropdown3 = ({ label, href, submenu }) => {
  const [open, setOpen] = useState3(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ position: "relative" }}
    >
      <a
        href={href}
        onClick={(e) => { if (e.metaKey || e.ctrlKey) return; }}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ink-2)" }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {open && (
        <div role="menu" style={{ position: "absolute", top: "100%", left: -16, paddingTop: 12 }}>
          <div style={{
            minWidth: 240,
            background: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid var(--line)",
            borderRadius: 8,
            padding: 6,
            boxShadow: "0 18px 40px -18px rgba(14, 18, 28,0.18)",
          }}>
            {submenu.map(item => (
              <a
                key={item.label}
                href={item.href}
                role="menuitem"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px",
                  borderRadius: 4,
                  fontSize: 15,
                  color: "var(--ink-2)",
                  background: "transparent",
                }}
              >
                <span style={{
                  width: 6, height: 6, borderRadius: 0,
                  background: "var(--menu-dot, rgba(14, 18, 28,0.18))",
                }} />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Header3 = () => {
  return (
    <React.Fragment>
      <div className="announce-light">
        Supporting <strong>S1000D &amp; MIL-SPEC</strong>.<a href="#solutions">See capabilities →</a>
      </div>
      <header className="site-header-3">
        <div className="container site-header-3-inner">
          <a href="home14.html" style={{ display: "inline-flex", alignItems: "center" }} aria-label="Pentecom">
            <img src={window.__resources.logo} alt="Pentecom. Experience. Expertise. Excellence." style={{ display: "block", height: 48, width: "auto" }} />
          </a>
          <nav className="nav-center">
            {NAV_ITEMS_3.map(n => {
              // Mega menus are now the default treatment across every page
              // on the production site (consulting, news, news-article,
              // contact) plus the canonical home (home14). Older home
              // explorations still get the dropdown fallback.
              const page = (typeof window !== "undefined" && window.__PENTECON_PAGE) || "";
              const usesMega = (page === "home13" || page === "home14" ||
                                page === "consulting" || page === "consulting-v2" ||
                                page === "news" || page === "news-article" ||
                                page === "contact");
              if (usesMega) {
                if (n.label === "Solutions") {
                  return <SolutionsMegaMenu3 key={n.label} />;
                }
                // Our Work / Who We Are / News. defined in mega-menus.jsx and
                // exposed on window. Use whichever is registered.
                const OurWork  = (typeof window !== "undefined") && window.OurWorkMegaMenu3;
                const WhoWeAre = (typeof window !== "undefined") && window.WhoWeAreMegaMenu3;
                const NewsMM   = (typeof window !== "undefined") && window.NewsMegaMenu3;
                if (n.label === "Our Work" && OurWork)    return <OurWork key={n.label} />;
                if (n.label === "Who We Are" && WhoWeAre) return <WhoWeAre key={n.label} />;
                if (n.label === "News" && NewsMM)         return <NewsMM key={n.label} />;
              }
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
};

/* =========================================================================
   DOC RECT — soft white floating rectangle
   ========================================================================= */
const DocRect = ({ x, y, w, h, fromX = 0, fromY = 0, delay = 0, floats = true, floatX = 0, floatY = -4, opacity = 1, zIndex = 1, lit = "tl", litAngle, edgeStrength = 0.55, skew = 0 }) => (
  <div
    className={floats ? "doc-rect floats" : "doc-rect"}
    data-lit={lit}
    style={{
      left: x, top: y, width: w, height: h, zIndex, opacity,
      "--from-x": typeof fromX === "number" ? `${fromX}px` : fromX,
      "--from-y": typeof fromY === "number" ? `${fromY}px` : fromY,
      "--delay": `${delay}ms`,
      "--float-x": `${floatX}px`,
      "--float-y": `${floatY}px`,
      "--skew": `${skew}deg`,
      "--lit-angle": litAngle || ({ tl: "135deg", tr: "225deg", bl: "45deg", br: "315deg" }[lit] || "135deg"),
      "--edge-strength": edgeStrength,
    }}
  />
);

/* =========================================================================
   HERO 3 — mixed-weight headline, doc-rectangles drifting behind,
   hairline crosshair scaffolding.
   ========================================================================= */
const HERO_STATS_3 = [
  { v: "'97",  k: "Founded in technical data" },
  { v: "1:6",  k: "Employees are U.S. veterans" },
  { v: "1M+",  k: "S1000D pages delivered" },
  { v: "40+",  k: "Military systems supported" },
  { v: "20",   k: "S1000D committee seats" },
];

const Hero3 = ({ showDocs, mixedWeight, videoSrc, heroImageSrc, docsVariant = "stack" }) => {
  useInView3();
  const page3IsHome8 = (typeof window !== "undefined" && window.__PENTECON_PAGE === "home8");
  const page3IsHome9 = (typeof window !== "undefined" && window.__PENTECON_PAGE === "home9");
  // Two doc-field variants:
  //   "stack"  — original landscape rectangles, no rotation
  //   "tilted" — portrait, paper-like (echoes the logo glyph), with
  //              varied small rotations (-9° to +9°). Panels at
  //              nth-child(1,2,3,8) sit behind the text column and use
  //              minimal tilt so they don't compete with the headline.
  const docsStack = [
    { x: "2%",   y: 30,   w: 360, h: 230, lit: "tl", fromX: -120, fromY: -80,  delay: 80,  floatY: -5, zIndex: 1 },
    { x: "22%",  y: 180,  w: 300, h: 190, lit: "br", fromX: -40,  fromY: 90,   delay: 220, floatY: 5,  zIndex: 1 },
    { x: "14%",  y: 470,  w: 420, h: 150, lit: "bl", fromX: -80,  fromY: 60,   delay: 360, floatY: -4, zIndex: 1 },
    { x: "48%",  y: 50,   w: 340, h: 210, lit: "tr", fromX: 80,   fromY: -120, delay: 140, floatY: -6, zIndex: 1 },
    { x: "72%",  y: 380,  w: 380, h: 220, lit: "tl", fromX: 120,  fromY: 80,   delay: 300, floatY: 5,  zIndex: 1 },
    { x: "84%",  y: 100,  w: 260, h: 170, lit: "tr", fromX: 160,  fromY: -40,  delay: 440, floatY: -4, zIndex: 1 },
    { x: "62%",  y: 560,  w: 260, h: 120, lit: "br", fromX: 0,    fromY: 80,   delay: 560, floatY: 3,  zIndex: 1 },
    { x: "8%",   y: 280,  w: 280, h: 170, lit: "tl", fromX: -90,  fromY: -50,  delay: 200, floatY: -4, zIndex: 1 },
    { x: "44%",  y: 260,  w: 200, h: 140, lit: "bl", fromX: 60,   fromY: -30,  delay: 340, floatY: 4,  zIndex: 1 },
    { x: "78%",  y: 580,  w: 220, h: 130, lit: "tr", fromX: 80,   fromY: 60,   delay: 500, floatY: -3, zIndex: 1 },
  ];
  const docsTilted = [
    // All panels share identical dimensions and identical skew (applied
    // uniformly via CSS in home6.html). Variation comes only from
    // position — the field reads as an ordered drift of identical
    // sheets, echoing the logo glyph's skew gesture.
    // Indices 0/1/2/7 (nth-child 1/2/3/8) sit behind the text column
    // and get dimmed by the existing rule.
    { x: "0%",  y: 90,  w: 170, h: 230, lit: "tl", fromX: -100, fromY: -60, delay: 80,  floatY: -4, zIndex: 1 },
    { x: "20%", y: 230, w: 170, h: 230, lit: "br", fromX: -40,  fromY: 80,  delay: 220, floatY: 4,  zIndex: 1 },
    { x: "8%",  y: 480, w: 170, h: 230, lit: "bl", fromX: -80,  fromY: 60,  delay: 360, floatY: -3, zIndex: 1 },
    { x: "48%", y: 30,  w: 170, h: 230, lit: "tr", fromX: 80,   fromY: -120, delay: 140, floatY: -5, zIndex: 1 },
    { x: "72%", y: 380, w: 170, h: 230, lit: "tl", fromX: 120,  fromY: 80,   delay: 300, floatY: 4,  zIndex: 1 },
    { x: "86%", y: 90,  w: 170, h: 230, lit: "tr", fromX: 160,  fromY: -40,  delay: 440, floatY: -3, zIndex: 1 },
    { x: "62%", y: 540, w: 170, h: 230, lit: "br", fromX: 0,    fromY: 80,   delay: 560, floatY: 3,  zIndex: 1 },
    { x: "30%", y: 80,  w: 170, h: 230, lit: "tl", fromX: -90,  fromY: -50,  delay: 200, floatY: -4, zIndex: 1 },
    { x: "44%", y: 290, w: 170, h: 230, lit: "bl", fromX: 60,   fromY: -30,  delay: 340, floatY: 4,  zIndex: 1 },
    { x: "84%", y: 470, w: 170, h: 230, lit: "tr", fromX: 80,   fromY: 60,   delay: 500, floatY: -3, zIndex: 1 },
  ];
  const docs = docsVariant === "tilted" ? docsTilted : docsStack;

  // Messaging block — extracted so we can reuse in both layouts
  const messaging = (
    <React.Fragment>
      {!page3IsHome9 && (
        <div className="mono fade-up" style={{ marginBottom: 28, color: "var(--ink-3)" }}>
          Data conversion ▪ modernization ▪ compliance
        </div>
      )}
      <h1
        className={"fade-up " + (mixedWeight ? "mixed-weight" : "")}
        style={{
          fontSize: "var(--fs-h1)",
          fontWeight: mixedWeight ? 300 : 500,
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          margin: "0 0 28px",
          maxWidth: "16ch",
          color: "var(--ink)",
        }}
      >
        {mixedWeight ? (
          <React.Fragment>Technical data, <em>mission-ready</em>.</React.Fragment>
        ) : (
          "Technical data, mission-ready."
        )}
      </h1>
      <p className="fade-up" style={{
        fontSize: 19,
        color: "var(--ink-2)",
        lineHeight: 1.5,
        margin: "0 0 36px",
        maxWidth: "54ch",
        fontWeight: 400,
      }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.
      </p>
      <div className="fade-up" style={{ display: "flex", gap: 12 }}>
        <a href="#contact" className="btn">Start a project</a>
        <a href="#solutions" className="btn btn-ghost">See capabilities</a>
      </div>
    </React.Fragment>
  );

  return (
    <section id="hero" style={{
      position: "relative",
      paddingTop: page3IsHome9 ? 0 : 40,
      paddingBottom: page3IsHome9 ? 24 : 96,
      overflow: "hidden",
      minHeight: page3IsHome9 ? "calc(100vh - 120px)" : undefined,
      display: page3IsHome9 ? "flex" : undefined,
      flexDirection: page3IsHome9 ? "column" : undefined,
    }}>
      {/* Doc rectangle field */}
      {showDocs && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, height: 760, pointerEvents: "none" }}>
          {docs.map((d, i) => <DocRect key={i} {...d} />)}
        </div>
      )}

      <div className="container" style={{
        position: "relative",
        zIndex: 2,
        flex: page3IsHome9 ? 1 : undefined,
        display: page3IsHome9 ? "flex" : undefined,
        flexDirection: page3IsHome9 ? "column" : undefined,
      }}>
        {videoSrc ? (
          <div className="hero-2col-3" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
            minHeight: 600,
            paddingTop: 60,
          }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {messaging}
            </div>
            <div className="fade-up" style={{
              position: "relative",
              aspectRatio: "16 / 9",
              borderRadius: 14,
              overflow: "hidden",
              background: "#000",
              border: "1px solid var(--line)",
            }}>
              <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        ) : heroImageSrc ? (
          /* Two-column hero with a transparent product/vehicle PNG on
             the right. Image sits inside the .container (zIndex 2) so it
             renders above the floating doc panels (which are kept). */
          <div className="hero-2col-3" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
            minHeight: page3IsHome9 ? 0 : 600,
            paddingTop: page3IsHome9 ? 24 : 60,
            flex: page3IsHome9 ? 1 : undefined,
          }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {messaging}
            </div>
            <div className="fade-up" style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{
                position: "relative",
                width: "100%",
                maxWidth: (page3IsHome8 || page3IsHome9) ? 640 : 720,
                display: "flex",
                justifyContent: "center",
              }}>
                <img
                  src={heroImageSrc}
                  alt=""
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    maxHeight: page3IsHome9 ? "min(520px, 55vh)" : 520,
                    objectFit: "contain",
                    filter: (page3IsHome8 || page3IsHome9)
                      ? "drop-shadow(0 30px 60px rgba(0,0,0,0.65))"
                      : "drop-shadow(0 30px 30px rgba(0,0,0,0.55))",
                  }}
                />
                {page3IsHome8 && window.Hero8Overlay
                  ? React.createElement(window.Hero8Overlay)
                  : null}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ minHeight: 600, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 80 }}>
            {messaging}
          </div>
        )}

        {/* Stats — hairline rule, 5 columns */}
        <div className="hero-stats-3 fade-up" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--line)",
          marginTop: page3IsHome9 ? 24 : 120,
          paddingTop: page3IsHome9 ? 20 : 32,
          paddingBottom: page3IsHome9 ? 0 : 16,
          position: "relative", zIndex: 3,
        }}>
          {HERO_STATS_3.map((s, i) => (
            <div key={s.k} style={{
              padding: "0 24px",
              borderLeft: i === 0 ? "none" : "1px solid var(--line)",
            }}>
              <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 6, color: "var(--ink)" }}>{s.v}</div>
              <div className="mono">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-stats-3 { grid-template-columns: 1fr 1fr !important; }
          .hero-stats-3 > div:nth-child(odd) { border-left: none !important; }
          .hero-stats-3 > div { padding: 18px 16px !important; border-top: 1px solid var(--line); }
        }
        @media (max-width: 1000px) {
          .hero-2col-3 { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   WHY US 3 — Reasons (unlabeled) + featured case-study card on dark
   gradient mesh (echoes the Industries card system).
   ========================================================================= */
/* Hairline icons matching the data-block / skewed-paper motif.
   All built on a 24×24 grid, 1.25 stroke, currentColor, square caps.
   Kept abstract so they read as a system, not as literal pictograms. */
const WhyIcon3 = ({ kind }) => {
  const common = {
    width: 28, height: 28, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
    strokeWidth: 1.25, strokeLinecap: "square", strokeLinejoin: "miter",
    "aria-hidden": true,
  };
  switch (kind) {
    case "flag":
      // Canton-style flag glyph — outer rect with a small filled
      // block top-left, echoes the logo's data-block canton.
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="13" />
          <rect x="3" y="4" width="7" height="5" fill="currentColor" stroke="none" />
          <line x1="3" y1="21" x2="3" y2="4" />
        </svg>
      );
    case "standard":
      // Ruled spec sheet — three horizontal rules with a tick marker
      // on the bottom rule = adherence to a standard.
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" />
          <line x1="6"  y1="8"  x2="18" y2="8"  />
          <line x1="6"  y1="12" x2="18" y2="12" />
          <line x1="6"  y1="16" x2="14" y2="16" />
          <line x1="16" y1="16" x2="18" y2="16" />
        </svg>
      );
    case "committee":
      // Three nodes connected — committee / network of contributors.
      return (
        <svg {...common}>
          <line x1="6"  y1="6"  x2="18" y2="6"  />
          <line x1="6"  y1="6"  x2="12" y2="18" />
          <line x1="18" y1="6"  x2="12" y2="18" />
          <rect x="4"  y="4"  width="4" height="4" fill="currentColor" stroke="none" />
          <rect x="16" y="4"  width="4" height="4" fill="currentColor" stroke="none" />
          <rect x="10" y="16" width="4" height="4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "experts":
      // Concentrated cluster of three filled blocks against a sparse
      // outlined field — small senior team, not a large generalist one.
      return (
        <svg {...common}>
          <rect x="3"  y="3"  width="4" height="4" fill="currentColor" stroke="none" />
          <rect x="8"  y="3"  width="4" height="4" fill="currentColor" stroke="none" />
          <rect x="3"  y="8"  width="4" height="4" fill="currentColor" stroke="none" />
          <rect x="13" y="3"  width="4" height="4" />
          <rect x="18" y="3"  width="3" height="4" />
          <rect x="8"  y="8"  width="4" height="4" />
          <rect x="13" y="8"  width="4" height="4" />
          <rect x="18" y="8"  width="3" height="4" />
          <rect x="3"  y="13" width="4" height="4" />
          <rect x="8"  y="13" width="4" height="4" />
          <rect x="13" y="13" width="4" height="4" />
          <rect x="18" y="13" width="3" height="4" />
        </svg>
      );
    default: return null;
  }
};

const WHY_REASONS_3 = [
  { icon: "flag",      title: "U.S.-based and employee-owned",                                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed ut perspiciatis." },
  { icon: "standard",  title: "Deeply involved in industry standards",                         body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Aute irure dolor in reprehenderit." },
  { icon: "committee", title: "Active contributors to standards committees",                   body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, sint occaecat cupidatat non proident." },
  { icon: "experts",   title: "A team of senior experts, not a large generalist workforce",    body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, accusantium doloremque." },
];

const WHY_CASE_3 = {
  tag:    "Featured case study",
  client: "Tier-1 Airframe OEM ▪ Aerospace",
  title:  "Lorem ipsum dolor sit amet consectetur",
  body:   "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  metric: "180M",
  metricLabel: "Records converted, audited, and signed off",
  hue: 222,  // Pentecom brand navy/blue — house mesh, not a fourth industry hue
  stats: [
    { v: "11 wk",  k: "From kickoff to cutover" },
    { v: "100%",   k: "Audit pass on first review" },
    { v: "0",      k: "Records reconciled by hand" },
  ],
};

/* Dark gradient-mesh card for the featured case study — same family as
   IndustryCard but solo, wider, and tuned for a brand-neutral navy. */
const CaseStudyCard3 = ({ v }) => (
  <article style={{
    position: "relative",
    borderRadius: 16,
    padding: "52px 56px",
    minHeight: 420,
    display: "grid",
    gridTemplateColumns: "minmax(280px, 0.9fr) 1fr",
    gap: 72,
    overflow: "hidden",
    color: "#FFFFFF",
    isolation: "isolate",
    boxShadow: "0 28px 60px -32px rgba(32, 50, 99, 0.45), 0 1px 0 rgba(255,255,255,0.4) inset",
  }}>
    {/* Full-bleed mesh — same recipe as IndustryCard but anchored on
        the brand navy. Slightly more luminous in the upper-left so the
        massive numeral sits on the highlight. */}
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0, zIndex: -2,
      background: `
        radial-gradient(circle at 14% 22%, hsl(${v.hue} 55% 32% / 0.95) 0%, transparent 55%),
        radial-gradient(circle at 78% 18%, hsl(${(v.hue + 14) % 360} 50% 26% / 0.85) 0%, transparent 50%),
        radial-gradient(circle at 88% 80%, hsl(${(v.hue - 16 + 360) % 360} 50% 18% / 0.95) 0%, transparent 55%),
        radial-gradient(circle at 28% 95%, hsl(${(v.hue + 8) % 360} 55% 14% / 0.95) 0%, transparent 55%),
        linear-gradient(135deg, hsl(${v.hue} 45% 20%) 0%, hsl(${v.hue} 55% 10%) 100%)
      `,
      filter: "blur(0.4px)",
    }} />
    <div aria-hidden="true" style={{
      position: "absolute", inset: -20, zIndex: -1,
      background: `radial-gradient(circle at 50% 40%, transparent 38%, hsl(${v.hue} 55% 6% / 0.55) 100%)`,
    }} />

    {/* LEFT — metric. Top group (tag + numeral + label) sits at top,
        sub-stats anchored at bottom — mirrors the right column's
        title-up / link-down rhythm so both halves share a baseline. */}
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
      <div>
        <div style={{
          fontFamily: "'Geist Mono', 'IBM Plex Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.82)",
          marginBottom: 22,
        }}>{v.tag}</div>
        <div style={{
          fontSize: "clamp(80px, 8.5vw, 124px)",
          fontWeight: 300,
          letterSpacing: "-0.04em",
          lineHeight: 0.92,
          color: "#FFFFFF",
          textShadow: "0 2px 18px rgba(0,0,0,0.25)",
          marginBottom: 18,
          fontVariantNumeric: "tabular-nums",
        }}>{v.metric}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.5, maxWidth: "30ch" }}>{v.metricLabel}</div>
      </div>
      {/* Three sub-stats — hairline-divided, anchored to bottom */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 18,
        paddingTop: 22,
        borderTop: "1px solid rgba(255,255,255,0.18)",
      }}>
        {v.stats.map((s, i) => (
          <div key={s.k} style={{
            paddingLeft: i === 0 ? 0 : 18,
            borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)",
          }}>
            <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.015em", color: "#FFFFFF", marginBottom: 6, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 12, fontFamily: "'Geist Mono', 'IBM Plex Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.62)", lineHeight: 1.4 }}>{s.k}</div>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT — title at top, link anchored at bottom. Mirrors the
        left column's space-between so the card has a shared top and
        bottom baseline across both halves. */}
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ position: "relative", width: 40, height: 32, flexShrink: 0 }} aria-hidden="true">
            <div style={{
              position: "absolute", left: 0, top: 6, width: 26, height: 20,
              background: "rgba(255,255,255,0.32)",
              boxShadow: "0 2px 6px -2px rgba(0,0,0,0.4)",
            }} />
            <div style={{
              position: "absolute", left: 7, top: 3, width: 26, height: 20,
              background: "rgba(255,255,255,0.62)",
              boxShadow: "0 3px 8px -2px rgba(0,0,0,0.45)",
            }} />
            <div style={{
              position: "absolute", left: 14, top: 0, width: 26, height: 20,
              background: "#FFFFFF",
              boxShadow: "0 4px 10px -2px rgba(0,0,0,0.5)",
            }}>
              <span style={{
                position: "absolute", right: 3, top: 3,
                width: 4, height: 4,
                background: `hsl(${v.hue} 65% 60%)`,
              }} />
              <span style={{
                position: "absolute", left: 4, bottom: 4,
                width: 12, height: 1, background: "rgba(14, 18, 28,0.15)",
              }} />
              <span style={{
                position: "absolute", left: 4, bottom: 7,
                width: 8, height: 1, background: "rgba(14, 18, 28,0.15)",
              }} />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Geist Mono', 'IBM Plex Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.88)",
              marginBottom: 8,
            }}>{v.client}</div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.28)" }} />
          </div>
        </div>
        <h3 style={{
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.22,
          margin: "0 0 18px",
          color: "rgba(255,255,255,0.96)",
          textShadow: "0 1px 2px rgba(0,0,0,0.12)",
        }}>{v.title}</h3>
        <p style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.82)",
          margin: 0,
          lineHeight: 1.6,
          maxWidth: "44ch",
        }}>{v.body}</p>
      </div>
      <a href="#" style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 15,
        fontWeight: 500,
        color: "#FFFFFF",
        alignSelf: "flex-start",
        paddingBottom: 6,
        borderBottom: "1px solid rgba(255,255,255,0.5)",
      }}>Read the full case study <span aria-hidden="true">→</span></a>
    </div>
  </article>
);

const WhyUs3 = () => {
  useInView3();
  return (
    <section id="why" className="sec-pad">
      <div className="container">
        <div className="why-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          {/* Sticky left rail */}
          <div style={{ position: "sticky", top: 240 }}>
            <div className="mono fade-up" style={{ marginBottom: 22, color: "var(--ink-3)" }}>Proven results, industry leaders.</div>
            <h2 className="fade-up mixed-weight" style={{
              fontSize: "var(--fs-h2)",
              lineHeight: 1.1,
              margin: "0 0 20px",
              color: "var(--ink)",
            }}>
              Why teams rely on <em>Pentecom</em>.
            </h2>
            <p className="fade-up" style={{ fontSize: 18, color: "var(--ink-2)", margin: 0, lineHeight: 1.55 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis nostrud exercitation ullamco laboris.
            </p>
          </div>

          {/* Right column — unlabeled reasons + featured case-study card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>

            {/* Reasons — no mono header. Just the list. */}
            <div style={{ borderTop: "1px solid var(--line)" }}>
              {WHY_REASONS_3.map((r) => (
                <article key={r.title} className="fade-up why-reason-row-3" style={{
                  display: "grid",
                  gridTemplateColumns: "40px minmax(220px, 0.9fr) 1fr",
                  gap: 28,
                  padding: "22px 0",
                  borderBottom: "1px solid var(--line)",
                  alignItems: "start",
                }}>
                  <div style={{ color: "var(--ink-3)", paddingTop: 1, lineHeight: 0 }}>
                    <WhyIcon3 kind={r.icon} />
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 500, letterSpacing: "-0.005em", margin: 0, color: "var(--ink)", lineHeight: 1.3 }}>{r.title}</h3>
                  <p style={{ fontSize: 16, color: "var(--ink-2)", margin: 0, lineHeight: 1.55 }}>{r.body}</p>
                </article>
              ))}
            </div>

            {/* Featured case study — dark mesh card */}
            <div className="fade-up case-study-3-wrap">
              <CaseStudyCard3 v={WHY_CASE_3} />
            </div>

          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .why-grid-3 { grid-template-columns: 1fr !important; gap: 40px !important; }
          .why-grid-3 > div:first-child { position: relative !important; top: auto !important; }
          .why-grid-3 article.why-reason-row-3 { grid-template-columns: 40px 1fr !important; grid-template-areas: 'icon title' '. body' !important; gap: 12px 16px !important; }
          .why-grid-3 article.why-reason-row-3 > div:first-child { grid-area: icon; }
          .why-grid-3 article.why-reason-row-3 > h3 { grid-area: title; }
          .why-grid-3 article.why-reason-row-3 > p { grid-area: body; }
          .case-study-3-wrap > article { grid-template-columns: 1fr !important; padding: 32px 28px !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   SMALL CTA BAND 3 — hairline divided band
   ========================================================================= */
const CtaBand3 = () => {
  useInView3();
  return (
    <section style={{ padding: "0 0 96px" }}>
      <div className="container">
        <div className="cta-band-3 fade-up" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 32,
          paddingTop: 40,
          borderTop: "1px solid var(--line)",
        }}>
          <div>
            <h2 className="mixed-weight" style={{ fontSize: "var(--fs-h2)", lineHeight: 1.1, margin: "0 0 6px", color: "var(--ink)" }}>
              Modernize your <em>data</em>.
            </h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", margin: 0 }}>
              Sixty minutes with a senior engineer. No deck. No discovery fee.
            </p>
          </div>
          <a href="#contact" className="btn">Start a project</a>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .cta-band-3 { flex-direction: column; align-items: flex-start !important; gap: 18px !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   PROOF 3 — light, frosted testimonial card with orb behind
   ========================================================================= */
/* =========================================================================
   PROOF 3 — featured testimonial + 3-up chorus + procurement / scale stats.
   No brand logo row.
   ========================================================================= */
const PROOF_CHORUS_3 = [
  {
    quote: "The cleanest cutover we've ever signed. Engineering discipline, top to bottom.",
    author: "VP, Data Programs",
    org: "Defense Prime ▪ Cleared",
  },
  {
    quote: "They wrote the validation suite we wish we'd had for the last three migrations.",
    author: "Director of Engineering",
    org: "Med-Device OEM ▪ FDA-regulated",
  },
  {
    quote: "Documentation an auditor can read in one sitting. That's not nothing.",
    author: "Head of Compliance",
    org: "Aerospace Tier-1",
  },
];

const PROOF_STATS_3 = [
  { v: "33%",     k: "Of team with 20+ years experience" },
  { v: "100%",    k: "Employee-owned since 2022" },
  { v: "21",      k: "States with technical experts" },
  { v: "$4.5M",   k: "HUBZone sole-source ceiling" },
];

const Proof3 = () => {
  useInView3();
  const isHome13 = (typeof window !== "undefined" && (window.__PENTECON_PAGE === "home13" || window.__PENTECON_PAGE === "home14"));
  return (
    <section id="proof" className="sec-pad">
      <div className="container">
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 56 }}>
          {!isHome13 && (
            <div className="mono" style={{ marginBottom: 22 }}>Proof</div>
          )}
          <h2 className="mixed-weight" style={{ fontSize: "var(--fs-h2)", lineHeight: 1.1, margin: 0, color: "var(--ink)" }}>
            Trusted by <em>agencies like yours</em>.
          </h2>
        </div>

        {/* Featured testimonial + orb — hidden on home13. */}
        {!isHome13 && (
        <div className="fade-up" style={{
          position: "relative",
          padding: "64px 20px 40px",
          display: "flex",
          justifyContent: "center",
        }}>
          <div className="orb" style={{
            position: "absolute",
            left: "50%", top: "5%",
            width: 520, height: 520,
            transform: "translateX(-50%)",
            opacity: 0.85,
            zIndex: 0,
          }} />
          <div className="frosted" style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 820,
            padding: "44px 48px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 22,
          }}>
            <svg width="38" height="28" viewBox="0 0 38 28" fill="none" aria-hidden="true" style={{ opacity: 0.45 }}>
              <path d="M0 28 V16 C0 7 6 0 16 0 V6 C10 6 8 10 8 16 H16 V28 H0 Z M22 28 V16 C22 7 28 0 38 0 V6 C32 6 30 10 30 16 H38 V28 H22 Z" fill="#0e121c" />
            </svg>
            <p style={{
              fontSize: 26,
              fontWeight: 400,
              letterSpacing: "-0.015em",
              lineHeight: 1.32,
              margin: 0,
              color: "var(--ink)",
            }}>
              Pentecom brought a level of engineering discipline we hadn't seen from a conversion vendor. The audit packet they delivered was the first one our assessor accepted without a single follow-up.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 6 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>Director of Data Engineering</span>
              <span style={{ fontSize: 14, color: "var(--ink-2)" }}>Tier-1 Airframe OEM ▪ Aerospace</span>
            </div>
          </div>
        </div>
        )}

        {/* Chorus — three testimonials. Home 13 gets a calmer editorial
            treatment since they're the section's only content. */}
        {isHome13 ? (
          <div className="proof-chorus-13 fade-up">
            <div className="proof-chorus-13-spacer" />
            {PROOF_CHORUS_3.map((t) => (
              <figure key={t.author} className="proof-13-card">
                <svg className="proof-13-q" width="30" height="22" viewBox="0 0 38 28" fill="none" aria-hidden="true">
                  <path d="M0 28 V16 C0 7 6 0 16 0 V6 C10 6 8 10 8 16 H16 V28 H0 Z M22 28 V16 C22 7 28 0 38 0 V6 C32 6 30 10 30 16 H38 V28 H22 Z" fill="currentColor" />
                </svg>
                <blockquote className="proof-13-quote">{t.quote}</blockquote>
                <figcaption className="proof-13-figcap">
                  <span className="proof-13-author">{t.author}</span>
                  <span className="proof-13-org">{t.org}</span>
                </figcaption>
              </figure>
            ))}
            <div className="proof-chorus-13-spacer" />
          </div>
        ) : (
        <div className="proof-chorus-3 fade-up" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          marginTop: 24,
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}>
          {PROOF_CHORUS_3.map((t, i) => (
            <figure key={t.author} style={{
              margin: 0,
              padding: "30px 28px",
              borderLeft: i === 0 ? "none" : "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}>
              <blockquote style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.45,
                color: "var(--ink)",
                letterSpacing: "-0.005em",
              }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{t.author}</span>
                <span style={{ fontSize: 13, color: "var(--ink-3)" }}>{t.org}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        )}

        {/* Stats block — hidden on home13 (relocated to ProofStats13). */}
        {!isHome13 && (
        <div className="proof-stats-3 fade-up" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          marginTop: 56,
          borderTop: "1px solid var(--line)",
        }}>
          {PROOF_STATS_3.map((s, i) => (
            <div key={s.k} style={{
              padding: "32px 0",
              borderLeft: i === 0 ? "none" : "1px solid var(--line)",
              paddingLeft: i === 0 ? 0 : 28,
            }}>
              <div style={{ fontSize: 40, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8, color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
              <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.4 }}>{s.k}</div>
            </div>
          ))}
        </div>
        )}
      </div>
      <style>{`
        /* Home 13 — Sanity-style DOT GRID background.
           Tight, clearly-visible grid of dots fills the entire block.
           Three testimonial cards have a solid black bg so dots show
           only in the gutters AROUND and BETWEEN them. Cards have a
           visible gap between them (column-gap) so the dot field is
           visible between each card. No borders. */
        .proof-chorus-13 {
          position: relative;
          display: grid;
          grid-template-columns: 1fr repeat(3, minmax(0, 400px)) 1fr;
          column-gap: 40px;
          align-items: start;
          margin-top: 24px;
          padding: 64px 0;
          background-image: radial-gradient(circle, rgba(234, 236, 240, 0.38) 1px, transparent 1.2px);
          background-size: 10px 10px;
          background-position: 0 0;
        }
        .proof-chorus-13 > .proof-chorus-13-spacer { background: transparent; }
        .proof-13-card {
          margin: 0;
          padding: 56px 52px;
          display: flex;
          flex-direction: column;
          background: #000;
        }
        .proof-13-q {
          color: var(--ink-3);
          opacity: 0.55;
          margin-bottom: 32px;
        }
        .proof-13-quote {
          margin: 0 0 56px;
          font-size: 20px;
          line-height: 1.5;
          color: var(--ink);
          letter-spacing: -0.005em;
          max-width: 32ch;
        }
        .proof-13-figcap {
          margin: 0;
          padding: 0;
          display: flex; flex-direction: column; gap: 6px;
        }
        .proof-13-author { font-size: 15px; font-weight: 500; color: var(--ink); }
        .proof-13-org    { font-size: 14px; color: var(--ink-3); }
        @media (max-width: 1100px) {
          .proof-chorus-13 {
            grid-template-columns: 1fr;
            row-gap: 16px;
            padding: 36px 24px;
          }
          .proof-chorus-13 > .proof-chorus-13-spacer { display: none; }
          .proof-13-card { padding: 40px 32px; }
          .proof-13-quote { margin-bottom: 36px; max-width: none; }
        }
        @media (max-width: 900px) {
          .proof-chorus-3 { grid-template-columns: 1fr !important; }
          .proof-chorus-3 > figure { border-left: none !important; border-top: 1px solid var(--line); }
          .proof-chorus-3 > figure:first-child { border-top: none; }
          .proof-stats-3 { grid-template-columns: 1fr 1fr !important; }
          .proof-stats-3 > div { padding-left: 16px !important; }
          .proof-stats-3 > div:nth-child(odd) { border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 520px) {
          .proof-stats-3 { grid-template-columns: 1fr !important; }
          .proof-stats-3 > div { border-left: none !important; border-top: 1px solid var(--line); padding-left: 0 !important; }
          .proof-stats-3 > div:first-child { border-top: none !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   SOLUTIONS 3 — sidebar tabs (8) + a gradient orb that morphs hue
   per tab. Frosted detail panel.
   ========================================================================= */
/* =========================================================================
   SOLUTIONS 3 — sidebar tabs (8) + a gradient orb that morphs hue
   per tab. Frosted detail panel.
   ========================================================================= */

/* Solution iconography — the resolved hybrid system from
   icons-exploration.html. Each icon is built from skewed
   parallelogram sheets (echoing the hero doc-rect motif) and/or
   data-block squares (echoing the logo glyph), in the brand
   navy→blue gradient. Designed as a family: shared skew angle,
   shared gradient, shared geometry. */
const SolutionIcon3 = ({ kind, size = 28, opacity = 1 }) => {
  const common = { width: size, height: size, viewBox: "0 0 48 48", "aria-hidden": true, style: { opacity, display: "block", flexShrink: 0 } };
  switch (kind) {
    case "standards":
      // Stacked skewed sheets — documents in cascade.
      return (
        <svg {...common}>
          <g transform="skewX(-12)">
            <rect x="16" y="6"  width="26" height="12" fill="url(#g-sol-soft)" opacity="0.42" />
            <rect x="13" y="18" width="26" height="12" fill="url(#g-sol-soft)" opacity="0.72" />
            <rect x="10" y="30" width="26" height="12" fill="url(#g-sol-brand)" />
          </g>
        </svg>
      );
    case "conversion":
      // Two opposed sheets bridged by a data-block flow.
      return (
        <svg {...common}>
          <g transform="skewX(-12)"><rect x="6"  y="12" width="12" height="24" fill="url(#g-sol-soft)" opacity="0.6" /></g>
          <g transform="skewX(12)"> <rect x="30" y="12" width="12" height="24" fill="url(#g-sol-brand)" /></g>
          <rect x="20" y="22" width="3" height="4" fill="url(#g-sol-brand)" opacity="0.45" />
          <rect x="24" y="22" width="3" height="4" fill="url(#g-sol-brand)" opacity="0.75" />
          <rect x="28" y="22" width="3" height="4" fill="url(#g-sol-brand)" />
        </svg>
      );
    case "automation":
      // Four skewed sheets fanned around an axis.
      return (
        <svg {...common}>
          <g transform="rotate(0 24 24)">  <g transform="skewX(-12)"><rect x="14" y="6" width="20" height="10" fill="url(#g-sol-brand)" /></g></g>
          <g transform="rotate(90 24 24)"> <g transform="skewX(-12)"><rect x="14" y="6" width="20" height="10" fill="url(#g-sol-brand)" opacity="0.78" /></g></g>
          <g transform="rotate(180 24 24)"><g transform="skewX(-12)"><rect x="14" y="6" width="20" height="10" fill="url(#g-sol-brand)" opacity="0.55" /></g></g>
          <g transform="rotate(270 24 24)"><g transform="skewX(-12)"><rect x="14" y="6" width="20" height="10" fill="url(#g-sol-brand)" opacity="0.4"  /></g></g>
        </svg>
      );
    case "writing":
      // Sheet hosts data-block text lines and a figure.
      return (
        <svg {...common}>
          <g transform="skewX(-12)">
            <rect x="10" y="6"  width="32" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
            <rect x="14" y="12" width="20" height="3"  fill="url(#g-sol-brand)" />
            <rect x="14" y="18" width="24" height="3"  fill="url(#g-sol-brand)" />
            <rect x="14" y="24" width="14" height="3"  fill="url(#g-sol-brand)" />
            <rect x="14" y="32" width="10" height="8"  fill="url(#g-sol-brand)" />
            <rect x="26" y="32" width="12" height="8"  fill="url(#g-sol-brand)" opacity="0.7" />
          </g>
        </svg>
      );
    case "audit":
      // Data-block check traversing a verified page.
      return (
        <svg {...common}>
          <g transform="skewX(-12)">
            <rect x="10" y="6"  width="32" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
            <rect x="14" y="22" width="4" height="4" fill="url(#g-sol-brand)" opacity="0.65" />
            <rect x="18" y="26" width="4" height="4" fill="url(#g-sol-brand)" opacity="0.8" />
            <rect x="22" y="30" width="4" height="4" fill="url(#g-sol-brand)" />
            <rect x="26" y="24" width="4" height="4" fill="url(#g-sol-brand)" />
            <rect x="30" y="18" width="4" height="4" fill="url(#g-sol-brand)" />
            <rect x="34" y="12" width="4" height="4" fill="url(#g-sol-brand)" />
          </g>
        </svg>
      );
    case "lifecycle":
      // Four sheets stepped through phases.
      return (
        <svg {...common}>
          <g transform="skewX(-12)">
            <rect x="4"  y="20" width="8" height="18" fill="url(#g-sol-brand)" opacity="0.32" />
            <rect x="14" y="16" width="8" height="22" fill="url(#g-sol-brand)" opacity="0.55" />
            <rect x="24" y="12" width="8" height="26" fill="url(#g-sol-brand)" opacity="0.78" />
            <rect x="34" y="8"  width="8" height="30" fill="url(#g-sol-brand)" />
          </g>
        </svg>
      );
    case "consulting":
      // Two opposed sheets exchanging through a 4-block dialogue.
      return (
        <svg {...common}>
          <g transform="skewX(-12)"><rect x="4"  y="10" width="14" height="22" fill="url(#g-sol-brand)" opacity="0.7" /></g>
          <g transform="skewX(12)"> <rect x="30" y="14" width="14" height="22" fill="url(#g-sol-brand)" /></g>
          <rect x="20" y="20" width="3" height="3" fill="url(#g-sol-brand)" opacity="0.55" />
          <rect x="24" y="20" width="3" height="3" fill="url(#g-sol-brand)" opacity="0.85" />
          <rect x="20" y="26" width="3" height="3" fill="url(#g-sol-brand)" opacity="0.85" />
          <rect x="24" y="26" width="3" height="3" fill="url(#g-sol-brand)" opacity="0.55" />
        </svg>
      );
    case "university":
      // Skewed entablature on data-block pillars.
      return (
        <svg {...common}>
          <g transform="skewX(-12)">
            <rect x="4"  y="8"  width="40" height="6"  fill="url(#g-sol-brand)" />
            <rect x="9"  y="18" width="5"  height="22" fill="url(#g-sol-brand)" opacity="0.78" />
            <rect x="21" y="18" width="5"  height="22" fill="url(#g-sol-brand)" opacity="0.78" />
            <rect x="33" y="18" width="5"  height="22" fill="url(#g-sol-brand)" opacity="0.78" />
            <rect x="6"  y="40" width="36" height="4"  fill="url(#g-sol-brand)" opacity="0.62" />
          </g>
        </svg>
      );
    default: return null;
  }
};

/* ========================================================================
   SOLUTIONS 3 — 3×3 card grid (Option B · minimal, blue link)
   Eight capability cards + one intro cell holding the section heading.
   No master/detail, no orb. Each card carries a small document-artifact
   preview in the brand's skewed-sheet + hairline + mono vocabulary.
   ======================================================================== */
const CARDS_3 = [
  { icon: "standards",  name: "Technical Document Standards",     short: "Standards",                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { icon: "conversion", name: "Conversion",                       short: "Conversion",               body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { icon: "automation", name: "Automation",                       short: "Automation",               body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
  { icon: "writing",    name: "Technical Writing & Illustrations", short: "Writing & Illustrations", body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { icon: "audit",      name: "Auditing & Quality Assurance",     short: "Auditing & QA",            body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." },
  { icon: "lifecycle",  name: "Lifecycle Acquisition",            short: "Lifecycle",                body: "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
  { icon: "consulting", name: "Consulting",                       short: "Consulting",               body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores." },
  { icon: "university", name: "University of Pentecom",           short: "University",               body: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam." },
];

/* ---------- Artifact components (one per capability) ------------------- */
const ArtifactFrame3 = ({ children, height = 160 }) => (
  <div style={{ position: "relative", height, background: "rgba(255,255,255,0.015)", border: "1px solid var(--line)", borderRadius: 4, overflow: "hidden" }}>{children}</div>
);

const StandardsArtifact3 = () => (
  <ArtifactFrame3>
    <div style={{ position: "absolute", top: 20, left: 60, width: 200, height: 100, transform: "skewX(-12deg)", background: "linear-gradient(135deg, #1c1f26 0%, rgba(40,44,54,0.4) 60%, transparent 90%)", boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.05)" }} />
    <div style={{ position: "absolute", top: 40, left: 90, width: 200, height: 100, transform: "skewX(-12deg)", background: "linear-gradient(135deg, #1c1f26 0%, rgba(40,44,54,0.5) 60%, transparent 90%)", boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.06)" }} />
    <div style={{ position: "absolute", top: 60, left: 120, width: 200, height: 100, transform: "skewX(-12deg)", background: "linear-gradient(135deg, #232732 0%, rgba(50,55,70,0.7) 60%, transparent 90%)", boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.08)" }}>
      <div style={{ transform: "skewX(12deg)", padding: "16px 24px" }}>
        <div style={{ height: 3, width: 80, background: "#7d9aef", marginBottom: 8 }} />
        <div style={{ height: 2, width: 140, background: "var(--ink-3)", marginBottom: 5, opacity: 0.6 }} />
        <div style={{ height: 2, width: 110, background: "var(--ink-3)", marginBottom: 5, opacity: 0.6 }} />
        <div style={{ height: 2, width: 130, background: "var(--ink-3)", marginBottom: 5, opacity: 0.6 }} />
      </div>
    </div>
    <div className="mono" style={{ position: "absolute", bottom: 8, left: 12, color: "var(--ink-2)" }}>SHEET 03 / 03</div>
  </ArtifactFrame3>
);

const ConversionArtifact3 = () => (
  <ArtifactFrame3>
    <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "20px 20px" }}>
      <div>
        <div className="mono" style={{ color: "var(--ink-2)", marginBottom: 8 }}>LEGACY</div>
        <div style={{ transform: "skewX(-12deg)", background: "linear-gradient(135deg, #1c1f26 0%, rgba(40,44,54,0.5) 60%, transparent 90%)", height: 88, padding: 10, boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.05)" }}>
          <div style={{ transform: "skewX(12deg)" }}>
            {[44, 70, 56, 80, 48].map((w, i) => (
              <div key={i} style={{ height: 2, width: w, background: "var(--ink-3)", marginBottom: 6, opacity: 0.55 }} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 4 }}>
        {[0.35, 0.55, 0.75, 1].map((o, i) => (
          <div key={i} style={{ width: 28, height: 4, background: "#7d9aef", opacity: o }} />
        ))}
      </div>
      <div>
        <div className="mono" style={{ color: "var(--pentecon-blue)", marginBottom: 8 }}>S1000D</div>
        <div style={{ transform: "skewX(12deg)", background: "linear-gradient(225deg, #1f2330 0%, rgba(50,60,90,0.6) 60%, transparent 90%)", height: 88, padding: 10, boxShadow: "inset -1px 1px 0 rgba(125,154,239,0.15)" }}>
          <div style={{ transform: "skewX(-12deg)" }}>
            {[60, 84, 70, 90, 64].map((w, i) => (
              <div key={i} style={{ height: 2, width: w, background: "#7d9aef", marginBottom: 6, opacity: 0.75 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </ArtifactFrame3>
);

const AutomationArtifact3 = () => {
  const steps = ["validate", "transform", "publish"];
  return (
    <ArtifactFrame3>
      <div style={{ padding: "20px 20px", fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "var(--ink-2)", lineHeight: 1.7 }}>
        <div><span style={{ color: "var(--ink-2)" }}>$</span> <span style={{ color: "var(--ink)" }}>pentecom build --watch</span></div>
        <div style={{ color: "var(--ink-2)" }}>───────────────────</div>
        {steps.map((s, i) => (
          <div key={s}>
            <span style={{ color: "var(--pentecon-blue)" }}>✓</span>{" "}
            <span>{s.padEnd(11, " ")}</span>
            <span style={{ color: "var(--ink-2)" }}>{` ${(120 + i * 84)}ms`}</span>
          </div>
        ))}
        <div style={{ color: "#7d9aef" }}>● running · 14:02:31</div>
      </div>
    </ArtifactFrame3>
  );
};

const WritingArtifact3 = () => (
  <ArtifactFrame3>
    <div style={{ position: "absolute", inset: "16px 24px", border: "1px solid var(--line-2)", padding: 14 }}>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ width: 70, height: 8, background: "var(--ink-2)", marginBottom: 8 }} />
          {[100, 90, 95, 80, 100, 60].map((w, i) => (
            <div key={i} style={{ width: w + "%", height: 2, background: "var(--ink-3)", opacity: 0.55, marginBottom: 4 }} />
          ))}
        </div>
        <div style={{ width: 90, background: "linear-gradient(135deg, #232732 0%, rgba(50,55,70,0.6) 70%, transparent 100%)", border: "1px solid var(--line)" }}>
          <div style={{ padding: 6 }}>
            <div className="mono" style={{ color: "var(--ink-2)", fontSize: 12 }}>FIG 2.1</div>
            <div style={{ transform: "skewX(-12deg)", width: 50, height: 30, background: "#7d9aef", opacity: 0.5, margin: "10px auto" }} />
          </div>
        </div>
      </div>
      <div className="mono" style={{ position: "absolute", bottom: 4, right: 8, color: "var(--ink-2)" }}>§ 4.2.1</div>
    </div>
  </ArtifactFrame3>
);

const AuditArtifact3 = () => (
  <ArtifactFrame3>
    <svg viewBox="0 0 440 160" preserveAspectRatio="none" width="100%" height="100%">
      <rect x="20" y="20" width="400" height="120" fill="none" stroke="var(--line-2)" strokeWidth="1" />
      {[[50, 110], [90, 90], [130, 105], [170, 75], [210, 95], [250, 60], [290, 80], [330, 40]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="14" height="14" fill="#7d9aef" opacity={0.35 + (i / 7) * 0.65} />
          {i > 0 && (
            <line x1={x - 26} y1={[110,90,105,75,95,60,80,40][i-1]+7} x2={x+7} y2={y+7} stroke="#7d9aef" strokeWidth="0.5" opacity="0.4" />
          )}
        </g>
      ))}
      <text x="30" y="14" fill="var(--ink-2)" fontFamily="Geist Mono, monospace" fontSize="12" letterSpacing="0.12em">AUDIT TRAIL ▪ AS9100 ▪ 8 OF 8 PASS</text>
    </svg>
  </ArtifactFrame3>
);

const LifecycleArtifact3 = () => (
  <ArtifactFrame3>
    <div style={{ padding: "22px 20px" }}>
      <div className="mono" style={{ color: "var(--ink-2)", marginBottom: 14 }}>PROGRAM LIFECYCLE</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
        {["RFP", "AWARD", "EXECUTE", "CLOSE"].map((p, i) => (
          <div key={p} style={{ transform: "skewX(-12deg)", background: `linear-gradient(135deg, rgba(125,154,239,${0.18 + i * 0.18}), rgba(61,92,184,${0.32 + i * 0.18}))`, height: 28, position: "relative" }}>
            <div className="mono" style={{ transform: "skewX(12deg)", position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", fontSize: 12, letterSpacing: "0.12em" }}>{p}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between" }}>
        <span className="mono" style={{ color: "var(--ink-2)" }}>T-0</span>
        <span className="mono" style={{ color: "var(--ink-2)" }}>T+36 mo</span>
      </div>
    </div>
  </ArtifactFrame3>
);

const ConsultingArtifact3 = () => (
  <ArtifactFrame3>
    <div style={{ padding: "22px 24px" }}>
      <svg width="22" height="18" viewBox="0 0 22 18" style={{ marginBottom: 10 }}>
        <path d="M0 18V9C0 4 3 0 9 0V4C5 4 4 6 4 9H9V18H0ZM13 18V9C13 4 16 0 22 0V4C18 4 17 6 17 9H22V18H13Z" fill="#7d9aef" opacity="0.7" />
      </svg>
      <div style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.45, fontWeight: 400, letterSpacing: "-0.005em" }}>
        We rehearsed the cutover in shadow for 14 days. Day 15 was uneventful — which was the point.
      </div>
      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 18, height: 1, background: "var(--ink-3)" }} />
        <div className="mono" style={{ color: "var(--ink-2)" }}>SR. ADVISOR ▪ TIER-1 OEM</div>
      </div>
    </div>
  </ArtifactFrame3>
);

const UniversityArtifact3 = () => {
  const modules = [
    { num: "M-01", name: "S1000D Issue 5.0 — Authoring" },
    { num: "M-02", name: "BREX Rules & DM Codes" },
    { num: "M-03", name: "Conversion & Validation" },
  ];
  return (
    <ArtifactFrame3>
      <div style={{ padding: "18px 20px" }}>
        <div className="mono" style={{ color: "var(--ink-2)", marginBottom: 10 }}>SYLLABUS ▪ COHORT 2026·Q3</div>
        {modules.map((m, i) => (
          <div key={m.num} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 12, padding: "8px 0", borderTop: i === 0 ? "1px solid var(--line)" : "none", borderBottom: "1px solid var(--line)", alignItems: "center" }}>
            <span className="mono" style={{ color: "var(--pentecon-blue)" }}>{m.num}</span>
            <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{m.name}</span>
            <span className="mono" style={{ color: "var(--ink-2)" }}>4H</span>
          </div>
        ))}
      </div>
    </ArtifactFrame3>
  );
};

const ARTIFACT_BY_ICON_3 = {
  standards:   StandardsArtifact3,
  conversion:  ConversionArtifact3,
  automation:  AutomationArtifact3,
  writing:     WritingArtifact3,
  audit:       AuditArtifact3,
  lifecycle:   LifecycleArtifact3,
  consulting:  ConsultingArtifact3,
  university:  UniversityArtifact3,
};

const CapabilityCard3 = ({ cap }) => {
  const Artifact = ARTIFACT_BY_ICON_3[cap.icon];
  return (
    <a className="cap-card-3 fade-up" href="#contact">
      <div className="cap-card-3-top">
        <h3 className="cap-card-3-name">{cap.name}</h3>
        <p className="cap-card-3-body">{cap.body}</p>
        <div className="cap-card-3-link">
          <span className="mono">Explore {cap.short}</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
      <div className="cap-card-3-artifact">
        {Artifact ? <Artifact /> : null}
      </div>
    </a>
  );
};

const Solutions3 = () => {
  useInView3();
  const isHome13 = (typeof window !== "undefined" && window.__PENTECON_PAGE === "home13");
  return (
    <section id="solutions" className={isHome13 ? "solutions13" : undefined} style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      {/* Shared gradient defs for the SolutionIcon family — rendered
          once per page so every icon SVG can reference url(#g-sol-*). */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="g-sol-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7d9aef" />
            <stop offset="100%" stopColor="#2a3a78" />
          </linearGradient>
          <linearGradient id="g-sol-soft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9ab2f3" />
            <stop offset="100%" stopColor="#3d5cb8" />
          </linearGradient>
        </defs>
      </svg>
      <div className={isHome13 ? "container" : undefined} style={isHome13 ? undefined : { maxWidth: 1640, margin: "0 auto" }}>
        {isHome13 && (
          <div className="solutions13-header fade-up">
            <div className="mono solutions13-eyebrow">Capabilities</div>
            <h2 className="mixed-weight solutions13-h2">
              Solutions built for <em>Technical&nbsp;Data</em>.
            </h2>
            <p className="solutions13-lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>
        )}
        <div className="cap-grid-3">
          {!isHome13 && (
            /* Intro cell — heading is a peer to the cards, not a separate header */
            <a className="cap-card-3 cap-card-3-intro fade-up" href="#contact">
              <div className="cap-card-3-top">
                <h2 className="mixed-weight" style={{ fontSize: 38, lineHeight: 1.05, margin: "0 0 18px", color: "var(--ink)" }}>
                  Solutions built for <em>Technical&nbsp;Data</em>.
                </h2>
                <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.55, margin: 0 }}>
                  Eight capabilities. One operating model. Every deliverable defended at the standard your program contracts to.
                </p>
                <div className="cap-card-3-link" style={{ marginTop: 28 }}>
                  <span className="mono">Start a brief &amp; assess</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </a>
          )}
          {CARDS_3.map((cap) => (
            <CapabilityCard3 key={cap.icon} cap={cap} />
          ))}
          {isHome13 && (
            /* 9th CTA card — closes the 3×3 grid with intent */
            <a className="cap-card-3 cap-card-3-cta fade-up" href="#contact">
              <div className="cap-card-3-top">
                <h3 className="solutions13-cta-h">
                  Ready to <em>scope a project</em>?
                </h3>
                <p className="solutions13-cta-body">
                  Sixty-minute scoping call. Written assessment back within three business days. Fixed scope, fixed deliverable.
                </p>
                <div className="cap-card-3-link solutions13-cta-link" style={{ marginTop: 28 }}>
                  <span className="mono">Start a brief &amp; assess</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
      <style>{`
        /* Home 13 — section header lives ABOVE the card grid, not inside
           it. Uses the system standard sec-pad (120 top + 120 bottom)
           so spacing matches every other section on the site. */
        .solutions13 { padding: 120px 0; }
        .solutions13-header {
          margin-bottom: 80px;
        }
        .solutions13-eyebrow {
          margin-bottom: 22px;
          color: var(--ink-2);
        }
        .solutions13-h2 {
          font-size: var(--fs-h2);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 22px;
          max-width: 22ch;
          color: var(--ink);
        }
        .solutions13-lead {
          font-size: 18px;
          line-height: 1.55;
          color: var(--ink-2);
          margin: 0;
          max-width: 60ch;
        }
        /* Close the top of the card grid — hairline above the first
           row of cards (cards 1–3) so the grid reads as a complete
           bordered box, matching the bottom edge. */
        .solutions13 .cap-card-3:nth-child(-n+3) {
          border-top: 1px solid var(--line);
        }
        .solutions13-cta-h {
          font-size: 30px;
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 18px;
          color: var(--ink);
        }
        .solutions13-cta-h em { font-style: normal; font-weight: 600; }
        .solutions13-cta-body {
          font-size: 16px;
          color: var(--ink-2);
          line-height: 1.55;
          margin: 0;
          max-width: 36ch;
        }
        .solutions13-cta-link { color: var(--pentecon-blue) !important; }
        @media (max-width: 1100px) {
          .solutions13-header { margin-bottom: 56px; }
        }
        @media (max-width: 700px) {
          .solutions13-header { margin-bottom: 36px; }
        }
      `}</style>
      <style>{`
        .cap-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
        .cap-card-3 {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 44px 44px 36px;
          min-height: 480px;
          text-decoration: none;
          color: inherit;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: transparent;
          transition: background 200ms ease;
        }
        .cap-card-3:hover { background: rgba(125, 154, 239, 0.03); }
        .cap-card-3:nth-child(3n) { border-right: none; }
        .cap-card-3:nth-last-child(-n+3) { border-bottom: none; }
        .cap-card-3-top { display: flex; flex-direction: column; flex: 1; }
        .cap-card-3-name {
          font-size: 26px;
          font-weight: 500;
          letter-spacing: -0.018em;
          line-height: 1.2;
          margin: 0 0 14px;
          color: var(--ink);
        }
        .cap-card-3-body {
          font-size: 15px;
          color: var(--ink-2);
          line-height: 1.55;
          margin: 0 0 24px;
          max-width: 36ch;
        }
        .cap-card-3-link {
          display: inline-flex; align-items: center; gap: 10px;
          color: var(--pentecon-blue);
          margin-top: auto;
          transition: gap 200ms ease, color 200ms ease;
        }
        .cap-card-3:hover .cap-card-3-link { gap: 16px; color: #a4baf5; }
        .cap-card-3-link .mono { color: inherit; }
        .cap-card-3-artifact { margin-top: 24px; }
        .cap-card-3-intro {
          background: linear-gradient(160deg, rgba(125, 154, 239, 0.05), transparent 70%);
        }
        .cap-card-3-intro:hover { background: linear-gradient(160deg, rgba(125, 154, 239, 0.07), transparent 70%); }
        .cap-card-3-intro .cap-card-3-artifact { display: none; }
        /* CTA card — placed AFTER the .cap-card-3 base rule so its
           background actually applies. Rest = the visible 7% blue
           tint. Hover bumps higher. */
        .cap-card-3-cta {
          background: rgba(125, 154, 239, 0.07) !important;
        }
        .cap-card-3-cta:hover {
          background: rgba(125, 154, 239, 0.13) !important;
        }
        .cap-card-3-cta .cap-card-3-link {
          gap: 16px;
          color: rgb(164, 186, 245);
        }
        .cap-card-3-cta:hover .cap-card-3-link {
          gap: 22px;
        }
        .cap-card-3-cta .cap-card-3-artifact { display: none; }
        @media (max-width: 1100px) {
          .cap-grid-3 { grid-template-columns: repeat(2, 1fr); }
          .cap-card-3:nth-child(3n) { border-right: 1px solid var(--line); }
          .cap-card-3:nth-child(2n) { border-right: none; }
          .cap-card-3:nth-last-child(-n+3) { border-bottom: 1px solid var(--line); }
          .cap-card-3:nth-last-child(-n+2) { border-bottom: none; }
        }
        @media (max-width: 700px) {
          .cap-grid-3 { grid-template-columns: 1fr; }
          .cap-card-3 { border-right: none !important; border-bottom: 1px solid var(--line) !important; min-height: 0; padding: 32px 24px; }
          .cap-card-3:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   PROOF STATS 13 — standalone callout for the four big stats. No
   heading or eyebrow — the numbers speak for themselves.
   ========================================================================= */
const ProofStats13 = () => {
  useInView3();
  return (
    <section id="proof-stats" style={{ padding: "96px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container">
        <div className="proof-stats-13 fade-up">
          {PROOF_STATS_3.map((s, i) => (
            <div key={s.k} className="proof-stats-13-cell" style={{
              borderLeft: i === 0 ? "none" : "1px solid var(--line)",
            }}>
              <div className="proof-stats-13-v">{s.v}</div>
              <div className="proof-stats-13-k">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .proof-stats-13 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .proof-stats-13-cell { padding: 0 32px; }
        .proof-stats-13-v {
          font-size: clamp(48px, 5vw, 72px);
          font-weight: 300;
          letter-spacing: -0.03em;
          line-height: 1.0;
          margin-bottom: 14px;
          color: var(--ink);
          font-variant-numeric: tabular-nums;
        }
        .proof-stats-13-k {
          font-size: 14px;
          color: var(--ink-2);
          line-height: 1.45;
          max-width: 26ch;
        }
        @media (max-width: 900px) {
          .proof-stats-13 { grid-template-columns: 1fr 1fr; row-gap: 40px; }
          .proof-stats-13-cell:nth-child(odd) { border-left: none !important; padding-left: 0; }
        }
        @media (max-width: 520px) {
          .proof-stats-13 { grid-template-columns: 1fr; }
          .proof-stats-13-cell { border-left: none !important; padding: 0; }
        }
      `}</style>
    </section>
  );
};

/* Export to window so part B can read them */
Object.assign(window, {
  Header3, Hero3, WhyUs3, CtaBand3, Proof3, ProofStats13, Solutions3, DocRect,
  SolutionIcon3,
  useInView3, HOME3_TWEAK_DEFAULTS,
});
