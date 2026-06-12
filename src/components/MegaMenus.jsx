import React, { useState, useRef, useEffect } from 'react';

const NavMega3Icon = ({ kind, size = 22 }) => {
  const common = {
    width: size, height: size, viewBox: "0 0 48 48",
    "aria-hidden": true,
    style: { display: "block", flexShrink: 0 },
  };
  switch (kind) {
    case "case-studies": return (
      <svg {...common}><g transform="skewX(-12)">
        <rect x="12" y="6"  width="28" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
        <rect x="16" y="2"  width="10" height="6"  fill="url(#g-sol-brand)" opacity="0.7" />
        <rect x="16" y="12" width="20" height="3"  fill="url(#g-sol-brand)" />
        <rect x="16" y="18" width="14" height="3"  fill="url(#g-sol-brand)" opacity="0.8" />
        <rect x="16" y="24" width="18" height="3"  fill="url(#g-sol-brand)" opacity="0.8" />
        <rect x="16" y="32" width="14" height="6"  fill="url(#g-sol-brand)" opacity="0.9" />
      </g></svg>
    );
    case "testimonials": return (
      <svg {...common}><g transform="skewX(-12)">
        <rect x="8"  y="10" width="10" height="14" fill="url(#g-sol-brand)" />
        <rect x="8"  y="24" width="6"  height="2"  fill="url(#g-sol-brand)" opacity="0.6" />
        <rect x="22" y="10" width="10" height="14" fill="url(#g-sol-brand)" opacity="0.7" />
        <rect x="22" y="24" width="6"  height="2"  fill="url(#g-sol-brand)" opacity="0.45" />
        <rect x="6"  y="32" width="34" height="2"  fill="url(#g-sol-brand)" opacity="0.4" />
        <rect x="6"  y="36" width="22" height="2"  fill="url(#g-sol-brand)" opacity="0.4" />
      </g></svg>
    );
    case "process": return (
      <svg {...common}>
        <g transform="skewX(-12)">
          <rect x="4"  y="14" width="10" height="20" fill="url(#g-sol-brand)" opacity="0.5" />
          <rect x="20" y="14" width="10" height="20" fill="url(#g-sol-brand)" opacity="0.75" />
          <rect x="36" y="14" width="10" height="20" fill="url(#g-sol-brand)" />
        </g>
        <g fill="url(#g-sol-brand)">
          <polygon points="14,22 18,24 14,26" />
          <polygon points="30,22 34,24 30,26" />
        </g>
      </svg>
    );
    case "why": return (
      <svg {...common}>
        <g transform="skewX(-12)">
          <rect x="10" y="6"  width="32" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
          <rect x="14" y="12" width="20" height="3"  fill="url(#g-sol-brand)" opacity="0.6" />
          <rect x="14" y="18" width="14" height="3"  fill="url(#g-sol-brand)" opacity="0.6" />
        </g>
        <polygon points="28,26 30.5,31 36,32 32,36 33,41 28,38.5 23,41 24,36 20,32 25.5,31" fill="url(#g-sol-brand)" />
      </svg>
    );
    case "about": return (
      <svg {...common}><g transform="skewX(-12)">
        <rect x="10" y="36" width="32" height="6"  fill="url(#g-sol-brand)" />
        <rect x="14" y="26" width="24" height="10" fill="url(#g-sol-brand)" opacity="0.78" />
        <rect x="18" y="16" width="16" height="10" fill="url(#g-sol-brand)" opacity="0.55" />
        <rect x="22" y="6"  width="8"  height="10" fill="url(#g-sol-brand)" opacity="0.32" />
      </g></svg>
    );
    case "leadership": return (
      <svg {...common}><g fill="url(#g-sol-brand)">
        <polygon points="8,18 24,8 40,18 36,18 24,12 12,18" opacity="0.5" />
        <polygon points="8,28 24,18 40,28 36,28 24,22 12,28" opacity="0.75" />
        <polygon points="8,38 24,28 40,38 36,38 24,32 12,38" />
      </g></svg>
    );
    case "community": return (
      <svg {...common}>
        <g stroke="url(#g-sol-brand)" strokeWidth="1.2" fill="none">
          <line x1="12" y1="12" x2="36" y2="12" /><line x1="12" y1="36" x2="36" y2="36" />
          <line x1="12" y1="12" x2="12" y2="36" /><line x1="36" y1="12" x2="36" y2="36" />
          <line x1="12" y1="12" x2="36" y2="36" /><line x1="36" y1="12" x2="12" y2="36" />
        </g>
        <g fill="url(#g-sol-brand)">
          <rect x="9"  y="9"  width="6" height="6" /><rect x="33" y="9"  width="6" height="6" opacity="0.78" />
          <rect x="9"  y="33" width="6" height="6" opacity="0.78" /><rect x="33" y="33" width="6" height="6" opacity="0.55" />
          <rect x="21" y="21" width="6" height="6" />
        </g>
      </svg>
    );
    case "careers": return (
      <svg {...common}>
        <g transform="skewX(-12)">
          <rect x="10" y="6"  width="22" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
          <rect x="16" y="12" width="14" height="26" fill="url(#g-sol-brand)" opacity="0.55" />
        </g>
        <g fill="url(#g-sol-brand)">
          <rect x="30" y="23" width="10" height="3" />
          <polygon points="36,18 44,24.5 36,31" />
        </g>
      </svg>
    );
    case "faqs": return (
      <svg {...common}><g transform="skewX(-12)">
        <rect x="8"  y="6"  width="34" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
        <rect x="12" y="12" width="4"  height="4"  fill="url(#g-sol-brand)" />
        <rect x="18" y="13" width="18" height="2"  fill="url(#g-sol-brand)" opacity="0.75" />
        <rect x="18" y="17" width="14" height="2"  fill="url(#g-sol-brand)" opacity="0.5" />
        <rect x="12" y="24" width="4"  height="4"  fill="url(#g-sol-brand)" opacity="0.8" />
        <rect x="18" y="25" width="18" height="2"  fill="url(#g-sol-brand)" opacity="0.75" />
        <rect x="18" y="29" width="10" height="2"  fill="url(#g-sol-brand)" opacity="0.5" />
        <rect x="12" y="36" width="4"  height="4"  fill="url(#g-sol-brand)" opacity="0.6" />
        <rect x="18" y="37" width="18" height="2"  fill="url(#g-sol-brand)" opacity="0.75" />
      </g></svg>
    );
    case "timeline": return (
      <svg {...common}>
        <rect x="4" y="22" width="40" height="2" fill="url(#g-sol-brand)" opacity="0.55" />
        <g fill="url(#g-sol-brand)">
          <rect x="6"  y="18" width="4" height="10" opacity="0.5" />
          <rect x="16" y="14" width="4" height="14" opacity="0.78" />
          <rect x="26" y="8"  width="4" height="20" />
          <rect x="36" y="16" width="4" height="12" opacity="0.6" />
        </g>
      </svg>
    );
    case "news": return (
      <svg {...common}><g transform="skewX(-12)">
        <rect x="8"  y="6"  width="32" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
        <rect x="12" y="10" width="24" height="5"  fill="url(#g-sol-brand)" />
        <rect x="12" y="18" width="10" height="14" fill="url(#g-sol-brand)" opacity="0.55" />
        <rect x="24" y="18" width="12" height="2"  fill="url(#g-sol-brand)" opacity="0.7" />
        <rect x="24" y="22" width="12" height="2"  fill="url(#g-sol-brand)" opacity="0.5" />
        <rect x="24" y="26" width="12" height="2"  fill="url(#g-sol-brand)" opacity="0.5" />
        <rect x="12" y="35" width="24" height="2"  fill="url(#g-sol-brand)" opacity="0.5" />
      </g></svg>
    );
    case "numbers": return (
      <svg {...common}><g transform="skewX(-12)">
        <rect x="6"  y="30" width="6" height="12" fill="url(#g-sol-brand)" opacity="0.45" />
        <rect x="16" y="22" width="6" height="20" fill="url(#g-sol-brand)" opacity="0.65" />
        <rect x="26" y="16" width="6" height="26" fill="url(#g-sol-brand)" opacity="0.85" />
        <rect x="36" y="8"  width="6" height="34" fill="url(#g-sol-brand)" />
      </g></svg>
    );
    case "one-pager": return (
      <svg {...common}><g transform="skewX(-12)">
        <polygon points="10,6 36,6 42,12 42,42 10,42" fill="url(#g-sol-brand)" opacity="0.22" />
        <polygon points="36,6 42,12 36,12" fill="url(#g-sol-brand)" opacity="0.6" />
        <rect x="14" y="14" width="20" height="2" fill="url(#g-sol-brand)" />
        <rect x="14" y="18" width="24" height="2" fill="url(#g-sol-brand)" opacity="0.6" />
        <rect x="14" y="22" width="18" height="2" fill="url(#g-sol-brand)" opacity="0.6" />
        <rect x="14" y="28" width="24" height="8" fill="url(#g-sol-brand)" opacity="0.45" />
      </g></svg>
    );
    default: return null;
  }
};

const MegaPanel3 = ({ triggerLabel, panelId, ariaLabel, layoutKind, children }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  const doOpen = (focusFirst = false) => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setOpen(true);
    if (focusFirst) {
      setTimeout(() => {
        const first = panelRef.current && panelRef.current.querySelector("a.nav-mega-3-item, a.nav-mega-3-feat-cta");
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

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (triggerRef.current && triggerRef.current.contains(e.target)) return;
      if (panelRef.current && panelRef.current.contains(e.target)) return;
      doClose(false);
    };
    const onFocusIn = (e) => {
      if (triggerRef.current && triggerRef.current.contains(e.target)) return;
      if (panelRef.current && panelRef.current.contains(e.target)) return;
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
        const first = panelRef.current && panelRef.current.querySelector("a.nav-mega-3-item");
        if (first) first.focus();
      }
    } else if (e.key === "Escape") {
      if (open) { e.preventDefault(); doClose(true); }
    }
  };
  const onPanelKeyDown = (e) => {
    if (e.key === "Escape") { e.preventDefault(); doClose(true); return; }
    if (e.key !== "Tab") return;
    const focusables = panelRef.current ? [...panelRef.current.querySelectorAll("a, button")] : [];
    if (!focusables.length) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (!e.shiftKey && document.activeElement === last) doClose(false);
    else if (e.shiftKey && document.activeElement === first) doClose(false);
  };

  return (
    <React.Fragment>
      <button
        ref={triggerRef}
        type="button"
        className="nav-mega-3-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => (open ? doClose(false) : doOpen(false))}
        onKeyDown={onTriggerKeyDown}
        onMouseEnter={() => { clearTimeout(closeTimer.current); openTimer.current = setTimeout(() => doOpen(false), 80); }}
        onMouseLeave={() => { clearTimeout(openTimer.current); closeTimer.current = setTimeout(() => doClose(false), 240); }}
      >
        {triggerLabel}
        <svg className="nav-mega-3-chev" width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        ref={panelRef}
        id={panelId}
        className={"nav-mega-3-panel nav-mega-3-layout-" + layoutKind}
        data-open={open ? "true" : "false"}
        role="region"
        aria-label={ariaLabel}
        hidden={!open}
        onKeyDown={onPanelKeyDown}
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        onMouseLeave={() => { clearTimeout(openTimer.current); closeTimer.current = setTimeout(() => doClose(false), 240); }}
      >
        <div className="nav-mega-3-inner">{children}</div>
      </div>
    </React.Fragment>
  );
};

const MegaItem3 = ({ item }) => (
  <a className="nav-mega-3-item" href={item.href}>
    <span className="nav-mega-3-icon" aria-hidden="true"><NavMega3Icon kind={item.icon} size={22} /></span>
    <span className="nav-mega-3-text">
      <span className="nav-mega-3-title">{item.title}</span>
      <span className="nav-mega-3-desc">{item.desc}</span>
    </span>
  </a>
);

const OUR_WORK_ITEMS = [
  { icon: "case-studies", title: "Case Studies",        desc: "Programs at scale — outcomes, methods, and what we learned.", href: "#" },
  { icon: "testimonials", title: "Testimonials",        desc: "What clients say after the audit closes and the program ships.", href: "#" },
  { icon: "process",      title: "How to Work With Us", desc: "Engagement model, scoping, and the path from RFP to handoff.", href: "#" },
  { icon: "why",          title: "Why Pentecom",        desc: "Three decades of standards work and audit pass rates.", href: "#" },
];
const WHO_WE_ARE_ITEMS = [
  { icon: "about",      title: "About Pentecom",              desc: "Founded in '97. Built for technical data and lifecycle compliance.", href: "#" },
  { icon: "leadership", title: "Our Leadership",              desc: "Standards veterans with seats on the committees that write the specs.", href: "#" },
  { icon: "community",  title: "S1000D Community Leadership", desc: "20 committee seats; active maintenance of the spec our clients ship.", href: "#" },
  { icon: "careers",    title: "Careers",                     desc: "Senior, remote-first. Engineers and writers who love hard data.", href: "#" },
  { icon: "faqs",       title: "FAQs",                        desc: "Engagement, IP, security, deliverables — clearly answered.", href: "#" },
  { icon: "timeline",   title: "Company Timeline",            desc: "From founding through the milestones that shaped today's practice.", href: "#" },
];
const NEWS_ITEMS = [
  { icon: "news",      title: "Current News",                 desc: "Releases, awards, contract announcements, and program milestones.", href: "#" },
  { icon: "numbers",   title: "Pentecom By the Numbers",      desc: "Annual report: throughput, pass rates, committee seats, and people.", href: "#" },
  { icon: "one-pager", title: "Solution-Oriented One-Pagers", desc: "Printable single-sheet briefs you can send to a stakeholder.", href: "#" },
];

export const OurWorkMegaMenu3 = () => (
  <MegaPanel3 triggerLabel="Our Work" panelId="our-work-mega-3" ariaLabel="Our Work menu" layoutKind="ourwork">
    <div className="nav-mega-3-col-main">
      <div className="nav-mega-3-eyebrow" id="ourwork-mega-3-heading">Work &amp; Process</div>
      <nav aria-labelledby="ourwork-mega-3-heading">
        <ul className="nav-mega-3-grid nav-mega-3-grid-2" role="list">
          {OUR_WORK_ITEMS.map((it) => <li key={it.title}><MegaItem3 item={it} /></li>)}
        </ul>
      </nav>
    </div>
    <aside className="nav-mega-3-feat" aria-label="Featured case study">
      <svg className="nav-mega-3-feat-graphic" viewBox="0 0 100 100" aria-hidden="true">
        <g transform="skewX(-12)" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="14" y="14" width="56" height="22" /><rect x="14" y="40" width="56" height="22" /><rect x="14" y="66" width="56" height="22" />
          <rect x="14" y="14" width="16" height="22" fill="currentColor" stroke="none" opacity="0.6" />
          <rect x="14" y="40" width="16" height="22" fill="currentColor" stroke="none" opacity="0.6" />
          <rect x="14" y="66" width="16" height="22" fill="currentColor" stroke="none" opacity="0.6" />
        </g>
      </svg>
      <span className="nav-mega-3-feat-eyebrow">Spotlight</span>
      <h3 className="nav-mega-3-feat-title">Tier-1 OEM — S1000D modernization, first-pass audit.</h3>
      <p className="nav-mega-3-feat-body">11 weeks. 180M records converted, validated, signed off.</p>
      <a href="#" className="nav-mega-3-feat-cta">See the case study <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
    </aside>
  </MegaPanel3>
);

export const WhoWeAreMegaMenu3 = () => (
  <MegaPanel3 triggerLabel="Who We Are" panelId="who-we-are-mega-3" ariaLabel="Who We Are menu" layoutKind="who">
    <div className="nav-mega-3-col-main">
      <div className="nav-mega-3-eyebrow" id="who-mega-3-heading">Pentecom</div>
      <nav aria-labelledby="who-mega-3-heading">
        <ul className="nav-mega-3-grid nav-mega-3-grid-2" role="list">
          {WHO_WE_ARE_ITEMS.map((it) => <li key={it.title}><MegaItem3 item={it} /></li>)}
        </ul>
      </nav>
    </div>
    <aside className="nav-mega-3-feat" aria-label="Leadership in numbers">
      <svg className="nav-mega-3-feat-graphic" viewBox="0 0 100 100" aria-hidden="true">
        <g transform="skewX(-12)" fill="currentColor">
          <rect x="14" y="60" width="12" height="28" opacity="0.4" /><rect x="32" y="46" width="12" height="42" opacity="0.6" />
          <rect x="50" y="32" width="12" height="56" opacity="0.8" /><rect x="68" y="14" width="12" height="74" />
        </g>
      </svg>
      <span className="nav-mega-3-feat-eyebrow">Leadership</span>
      <ul className="nav-mega-3-feat-stats" role="list">
        <li><span className="num">20</span><span className="lbl">S1000D committee seats</span></li>
        <li><span className="num">'97</span><span className="lbl">Founded in technical data</span></li>
        <li><span className="num">1:6</span><span className="lbl">Employees are U.S. veterans</span></li>
      </ul>
      <a href="#" className="nav-mega-3-feat-cta">Meet leadership <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
    </aside>
  </MegaPanel3>
);

export const NewsMegaMenu3 = () => (
  <MegaPanel3 triggerLabel="News" panelId="news-mega-3" ariaLabel="News menu" layoutKind="news">
    <article className="nav-mega-3-feat nav-mega-3-feat-news" aria-label="Featured news article">
      <div className="nav-mega-3-feat-news-thumb" aria-hidden="true">
        <svg viewBox="0 0 200 110" preserveAspectRatio="none">
          <g transform="skewX(-12)">
            <rect x="6"  y="6"  width="190" height="100" fill="url(#g-sol-brand)" opacity="0.6" />
            <rect x="14" y="14" width="110" height="6"   fill="#ffffff" opacity="0.92" />
            <rect x="14" y="26" width="140" height="3"   fill="#ffffff" opacity="0.55" />
            <rect x="14" y="34" width="100" height="3"   fill="#ffffff" opacity="0.55" />
            <rect x="14" y="46" width="170" height="44"  fill="#ffffff" opacity="0.16" />
            <rect x="20" y="74" width="40"  height="3"   fill="#ffffff" opacity="0.75" />
          </g>
        </svg>
      </div>
      <div className="nav-mega-3-feat-news-body">
        <span className="nav-mega-3-feat-eyebrow">Latest · May 2026</span>
        <h3 className="nav-mega-3-feat-title">Pentecom announces 20th S1000D committee seat.</h3>
        <p className="nav-mega-3-feat-body">A milestone for the practice and the spec our clients build on.</p>
        <a href="#" className="nav-mega-3-feat-cta">Read the announcement <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
      </div>
    </article>
    <div className="nav-mega-3-col-main">
      <div className="nav-mega-3-eyebrow" id="news-mega-3-heading">Newsroom</div>
      <nav aria-labelledby="news-mega-3-heading">
        <ul className="nav-mega-3-grid nav-mega-3-grid-1" role="list">
          {NEWS_ITEMS.map((it) => <li key={it.title}><MegaItem3 item={it} /></li>)}
        </ul>
      </nav>
    </div>
  </MegaPanel3>
);
