/* eslint-disable */
/* =========================================================================
   MEGA MENUS — Our Work, Who We Are, News
   Three sibling mega menus that share chrome + accessibility behavior with
   SolutionsMegaMenu3 in page-3.jsx. Each has its OWN layout and content
   shape, with brand-vocabulary skewed-sheet icons.

   ACCESSIBILITY:
   • WAI-ARIA disclosure pattern: button trigger with aria-expanded +
     aria-controls + aria-haspopup, panel as role="region" with aria-label.
   • Keyboard: Enter/Space/click toggles; ArrowDown opens + focuses first
     item; Esc closes and returns focus to trigger; Tab past last (or
     Shift+Tab from first) closes naturally.
   • Pointer: hover trigger or panel opens after 80ms; leaving both closes
     after a 240ms grace so the cursor can travel through the gap.
   • prefers-reduced-motion respected via shared CSS rule.
   • All decorative SVG / icons aria-hidden; text always present.
   • Contrast: titles use --ink (≥ 14:1 on --bg-2 in both light + dark);
     descriptions use --ink-2 (~ 8.5:1 dark, ~ 9:1 light) — both pass AAA.
   • Body copy ≥ 13px (descriptions) and 15px (titles); feature titles
     22px. Mono eyebrows 12px — within label/eyebrow norms.
   • :focus-visible: visible focus ring on triggers, items, and CTAs.
   ========================================================================= */

(function () {
  const { useState, useRef, useEffect } = React;

  /* ---------------- Icons (skewed-sheet vocabulary; same gradients
     as SolutionIcon3: url(#g-sol-brand), url(#g-sol-soft)) -------------- */
  const NavMega3Icon = ({ kind, size = 22 }) => {
    const common = {
      width: size, height: size, viewBox: "0 0 48 48",
      "aria-hidden": true,
      style: { display: "block", flexShrink: 0 },
    };
    switch (kind) {
      /* Our Work */
      case "case-studies":
        return (
          <svg {...common}>
            <g transform="skewX(-12)">
              <rect x="12" y="6"  width="28" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
              <rect x="16" y="2"  width="10" height="6"  fill="url(#g-sol-brand)" opacity="0.7" />
              <rect x="16" y="12" width="20" height="3"  fill="url(#g-sol-brand)" />
              <rect x="16" y="18" width="14" height="3"  fill="url(#g-sol-brand)" opacity="0.8" />
              <rect x="16" y="24" width="18" height="3"  fill="url(#g-sol-brand)" opacity="0.8" />
              <rect x="16" y="32" width="14" height="6"  fill="url(#g-sol-brand)" opacity="0.9" />
            </g>
          </svg>
        );
      case "testimonials":
        return (
          <svg {...common}>
            <g transform="skewX(-12)">
              <rect x="8"  y="10" width="10" height="14" fill="url(#g-sol-brand)" />
              <rect x="8"  y="24" width="6"  height="2"  fill="url(#g-sol-brand)" opacity="0.6" />
              <rect x="22" y="10" width="10" height="14" fill="url(#g-sol-brand)" opacity="0.7" />
              <rect x="22" y="24" width="6"  height="2"  fill="url(#g-sol-brand)" opacity="0.45" />
              <rect x="6"  y="32" width="34" height="2"  fill="url(#g-sol-brand)" opacity="0.4" />
              <rect x="6"  y="36" width="22" height="2"  fill="url(#g-sol-brand)" opacity="0.4" />
            </g>
          </svg>
        );
      case "process":
        return (
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
      case "why":
        return (
          <svg {...common}>
            <g transform="skewX(-12)">
              <rect x="10" y="6"  width="32" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
              <rect x="14" y="12" width="20" height="3"  fill="url(#g-sol-brand)" opacity="0.6" />
              <rect x="14" y="18" width="14" height="3"  fill="url(#g-sol-brand)" opacity="0.6" />
            </g>
            <polygon points="28,26 30.5,31 36,32 32,36 33,41 28,38.5 23,41 24,36 20,32 25.5,31"
                     fill="url(#g-sol-brand)" />
          </svg>
        );

      /* Who We Are */
      case "about":
        return (
          <svg {...common}>
            <g transform="skewX(-12)">
              <rect x="10" y="36" width="32" height="6"  fill="url(#g-sol-brand)" />
              <rect x="14" y="26" width="24" height="10" fill="url(#g-sol-brand)" opacity="0.78" />
              <rect x="18" y="16" width="16" height="10" fill="url(#g-sol-brand)" opacity="0.55" />
              <rect x="22" y="6"  width="8"  height="10" fill="url(#g-sol-brand)" opacity="0.32" />
            </g>
          </svg>
        );
      case "leadership":
        return (
          <svg {...common}>
            <g fill="url(#g-sol-brand)">
              <polygon points="8,18 24,8 40,18 36,18 24,12 12,18" opacity="0.5" />
              <polygon points="8,28 24,18 40,28 36,28 24,22 12,28" opacity="0.75" />
              <polygon points="8,38 24,28 40,38 36,38 24,32 12,38" />
            </g>
          </svg>
        );
      case "community":
        return (
          <svg {...common}>
            <g stroke="url(#g-sol-brand)" strokeWidth="1.2" fill="none">
              <line x1="12" y1="12" x2="36" y2="12" />
              <line x1="12" y1="36" x2="36" y2="36" />
              <line x1="12" y1="12" x2="12" y2="36" />
              <line x1="36" y1="12" x2="36" y2="36" />
              <line x1="12" y1="12" x2="36" y2="36" />
              <line x1="36" y1="12" x2="12" y2="36" />
            </g>
            <g fill="url(#g-sol-brand)">
              <rect x="9"  y="9"  width="6" height="6" />
              <rect x="33" y="9"  width="6" height="6" opacity="0.78" />
              <rect x="9"  y="33" width="6" height="6" opacity="0.78" />
              <rect x="33" y="33" width="6" height="6" opacity="0.55" />
              <rect x="21" y="21" width="6" height="6" />
            </g>
          </svg>
        );
      case "careers":
        return (
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
      case "faqs":
        return (
          <svg {...common}>
            <g transform="skewX(-12)">
              <rect x="8"  y="6"  width="34" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
              <rect x="12" y="12" width="4"  height="4"  fill="url(#g-sol-brand)" />
              <rect x="18" y="13" width="18" height="2"  fill="url(#g-sol-brand)" opacity="0.75" />
              <rect x="18" y="17" width="14" height="2"  fill="url(#g-sol-brand)" opacity="0.5" />
              <rect x="12" y="24" width="4"  height="4"  fill="url(#g-sol-brand)" opacity="0.8" />
              <rect x="18" y="25" width="18" height="2"  fill="url(#g-sol-brand)" opacity="0.75" />
              <rect x="18" y="29" width="10" height="2"  fill="url(#g-sol-brand)" opacity="0.5" />
              <rect x="12" y="36" width="4"  height="4"  fill="url(#g-sol-brand)" opacity="0.6" />
              <rect x="18" y="37" width="18" height="2"  fill="url(#g-sol-brand)" opacity="0.75" />
            </g>
          </svg>
        );
      case "timeline":
        return (
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

      /* News */
      case "news":
        return (
          <svg {...common}>
            <g transform="skewX(-12)">
              <rect x="8"  y="6"  width="32" height="36" fill="url(#g-sol-brand)" opacity="0.22" />
              <rect x="12" y="10" width="24" height="5"  fill="url(#g-sol-brand)" />
              <rect x="12" y="18" width="10" height="14" fill="url(#g-sol-brand)" opacity="0.55" />
              <rect x="24" y="18" width="12" height="2"  fill="url(#g-sol-brand)" opacity="0.7" />
              <rect x="24" y="22" width="12" height="2"  fill="url(#g-sol-brand)" opacity="0.5" />
              <rect x="24" y="26" width="12" height="2"  fill="url(#g-sol-brand)" opacity="0.5" />
              <rect x="12" y="35" width="24" height="2"  fill="url(#g-sol-brand)" opacity="0.5" />
            </g>
          </svg>
        );
      case "numbers":
        return (
          <svg {...common}>
            <g transform="skewX(-12)">
              <rect x="6"  y="30" width="6" height="12" fill="url(#g-sol-brand)" opacity="0.45" />
              <rect x="16" y="22" width="6" height="20" fill="url(#g-sol-brand)" opacity="0.65" />
              <rect x="26" y="16" width="6" height="26" fill="url(#g-sol-brand)" opacity="0.85" />
              <rect x="36" y="8"  width="6" height="34" fill="url(#g-sol-brand)" />
            </g>
          </svg>
        );
      case "one-pager":
        return (
          <svg {...common}>
            <g transform="skewX(-12)">
              <polygon points="10,6 36,6 42,12 42,42 10,42" fill="url(#g-sol-brand)" opacity="0.22" />
              <polygon points="36,6 42,12 36,12" fill="url(#g-sol-brand)" opacity="0.6" />
              <rect x="14" y="14" width="20" height="2" fill="url(#g-sol-brand)" />
              <rect x="14" y="18" width="24" height="2" fill="url(#g-sol-brand)" opacity="0.6" />
              <rect x="14" y="22" width="18" height="2" fill="url(#g-sol-brand)" opacity="0.6" />
              <rect x="14" y="28" width="24" height="8" fill="url(#g-sol-brand)" opacity="0.45" />
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  /* ---------------- Shared mega panel chrome ---------------- */
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
          className="nav-mega-3-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          aria-haspopup="true"
          onClick={() => (open ? doClose(false) : doOpen(false))}
          onKeyDown={onTriggerKeyDown}
          onMouseEnter={onTriggerMouseEnter}
          onMouseLeave={onTriggerMouseLeave}
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
          onMouseEnter={onPanelMouseEnter}
          onMouseLeave={onPanelMouseLeave}
        >
          <div className="nav-mega-3-inner">{children}</div>
        </div>
      </React.Fragment>
    );
  };

  /* ---------------- Item link ---------------- */
  const MegaItem3 = ({ item }) => (
    <a className="nav-mega-3-item" href={item.href}>
      <span className="nav-mega-3-icon" aria-hidden="true">
        <NavMega3Icon kind={item.icon} size={22} />
      </span>
      <span className="nav-mega-3-text">
        <span className="nav-mega-3-title">{item.title}</span>
        <span className="nav-mega-3-desc">{item.desc}</span>
      </span>
    </a>
  );

  /* ---------------- Data ---------------- */
  const OUR_WORK_ITEMS = [
    { icon: "case-studies", title: "Case Studies",          desc: "Programs at scale — outcomes, methods, and what we learned.", href: "#" },
    { icon: "testimonials", title: "Testimonials",          desc: "What clients say after the audit closes and the program ships.", href: "#" },
    { icon: "process",      title: "How to Work With Us",   desc: "Engagement model, scoping, and the path from RFP to handoff.",  href: "#" },
    { icon: "why",          title: "Why Pentecom",          desc: "Three decades of standards work and audit pass rates.",         href: "#" },
  ];
  const WHO_WE_ARE_ITEMS = [
    { icon: "about",        title: "About Pentecom",                 desc: "Founded in '97. Built for technical data and lifecycle compliance.", href: "#" },
    { icon: "leadership",   title: "Our Leadership",                 desc: "Standards veterans with seats on the committees that write the specs.", href: "#" },
    { icon: "community",    title: "S1000D Community Leadership",    desc: "20 committee seats; active maintenance of the spec our clients ship.", href: "#" },
    { icon: "careers",      title: "Careers",                        desc: "Senior, remote-first. Engineers and writers who love hard data.",      href: "#" },
    { icon: "faqs",         title: "FAQs",                           desc: "Engagement, IP, security, deliverables — clearly answered.",           href: "#" },
    { icon: "timeline",     title: "Company Timeline",               desc: "From founding through the milestones that shaped today's practice.",   href: "#" },
  ];
  const NEWS_ITEMS = [
    { icon: "news",         title: "Current News",                    desc: "Releases, awards, contract announcements, and program milestones.",  href: "#" },
    { icon: "numbers",      title: "Pentecom By the Numbers",         desc: "Annual report: throughput, pass rates, committee seats, and people.", href: "#" },
    { icon: "one-pager",    title: "Solution-Oriented One-Pagers",    desc: "Printable single-sheet briefs you can send to a stakeholder.",       href: "#" },
  ];

  /* ---------------- Our Work — 2×2 grid + spotlight case study ---------------- */
  const OurWorkMegaMenu3 = () => (
    <MegaPanel3 triggerLabel="Our Work" panelId="our-work-mega-3" ariaLabel="Our Work menu" layoutKind="ourwork">
      <div className="nav-mega-3-col-main">
        <div className="nav-mega-3-eyebrow" id="ourwork-mega-3-heading">Work &amp; Process</div>
        <nav aria-labelledby="ourwork-mega-3-heading">
          <ul className="nav-mega-3-grid nav-mega-3-grid-2" role="list">
            {OUR_WORK_ITEMS.map((it) => (
              <li key={it.title}><MegaItem3 item={it} /></li>
            ))}
          </ul>
        </nav>
      </div>
      <aside className="nav-mega-3-feat" aria-label="Featured case study">
        <svg className="nav-mega-3-feat-graphic" viewBox="0 0 100 100" aria-hidden="true">
          <g transform="skewX(-12)" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="14" y="14" width="56" height="22" />
            <rect x="14" y="40" width="56" height="22" />
            <rect x="14" y="66" width="56" height="22" />
            <rect x="14" y="14" width="16" height="22" fill="currentColor" stroke="none" opacity="0.6" />
            <rect x="14" y="40" width="16" height="22" fill="currentColor" stroke="none" opacity="0.6" />
            <rect x="14" y="66" width="16" height="22" fill="currentColor" stroke="none" opacity="0.6" />
          </g>
        </svg>
        <span className="nav-mega-3-feat-eyebrow">Spotlight</span>
        <h3 className="nav-mega-3-feat-title">Tier-1 OEM — S1000D modernization, first-pass audit.</h3>
        <p className="nav-mega-3-feat-body">11 weeks. 180M records converted, validated, signed off.</p>
        <a href="#" className="nav-mega-3-feat-cta">
          See the case study
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </aside>
    </MegaPanel3>
  );

  /* ---------------- Who We Are — 2×3 grid + leadership-by-the-numbers ---------------- */
  const WhoWeAreMegaMenu3 = () => (
    <MegaPanel3 triggerLabel="Who We Are" panelId="who-we-are-mega-3" ariaLabel="Who We Are menu" layoutKind="who">
      <div className="nav-mega-3-col-main">
        <div className="nav-mega-3-eyebrow" id="who-mega-3-heading">Pentecom</div>
        <nav aria-labelledby="who-mega-3-heading">
          <ul className="nav-mega-3-grid nav-mega-3-grid-2" role="list">
            {WHO_WE_ARE_ITEMS.map((it) => (
              <li key={it.title}><MegaItem3 item={it} /></li>
            ))}
          </ul>
        </nav>
      </div>
      <aside className="nav-mega-3-feat" aria-label="Leadership in numbers">
        <svg className="nav-mega-3-feat-graphic" viewBox="0 0 100 100" aria-hidden="true">
          <g transform="skewX(-12)" fill="currentColor">
            <rect x="14" y="60" width="12" height="28" opacity="0.4" />
            <rect x="32" y="46" width="12" height="42" opacity="0.6" />
            <rect x="50" y="32" width="12" height="56" opacity="0.8" />
            <rect x="68" y="14" width="12" height="74" />
          </g>
        </svg>
        <span className="nav-mega-3-feat-eyebrow">Leadership</span>
        <ul className="nav-mega-3-feat-stats" role="list">
          <li>
            <span className="num">20</span>
            <span className="lbl">S1000D committee seats</span>
          </li>
          <li>
            <span className="num">'97</span>
            <span className="lbl">Founded in technical data</span>
          </li>
          <li>
            <span className="num">1:6</span>
            <span className="lbl">Employees are U.S. veterans</span>
          </li>
        </ul>
        <a href="#" className="nav-mega-3-feat-cta">
          Meet leadership
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </aside>
    </MegaPanel3>
  );

  /* ---------------- News — featured article + 3-item list ---------------- */
  const NewsMegaMenu3 = () => (
    <MegaPanel3 triggerLabel="News" panelId="news-mega-3" ariaLabel="News menu" layoutKind="news">
      <article className="nav-mega-3-feat nav-mega-3-feat-news" aria-label="Featured news article">
        <div className="nav-mega-3-feat-news-thumb" aria-hidden="true">
          <svg viewBox="0 0 200 110" preserveAspectRatio="none">
            <g transform="skewX(-12)">
              <rect x="6"   y="6"   width="190" height="100" fill="url(#g-sol-brand)" opacity="0.6" />
              <rect x="14"  y="14"  width="110" height="6"   fill="#ffffff" opacity="0.92" />
              <rect x="14"  y="26"  width="140" height="3"   fill="#ffffff" opacity="0.55" />
              <rect x="14"  y="34"  width="100" height="3"   fill="#ffffff" opacity="0.55" />
              <rect x="14"  y="46"  width="170" height="44"  fill="#ffffff" opacity="0.16" />
              <rect x="20"  y="74"  width="40"  height="3"   fill="#ffffff" opacity="0.75" />
            </g>
          </svg>
        </div>
        <div className="nav-mega-3-feat-news-body">
          <span className="nav-mega-3-feat-eyebrow">Latest · May 2026</span>
          <h3 className="nav-mega-3-feat-title">Pentecom announces 20th S1000D committee seat.</h3>
          <p className="nav-mega-3-feat-body">A milestone for the practice and the spec our clients build on.</p>
          <a href="#" className="nav-mega-3-feat-cta">
            Read the announcement
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </article>
      <div className="nav-mega-3-col-main">
        <div className="nav-mega-3-eyebrow" id="news-mega-3-heading">Newsroom</div>
        <nav aria-labelledby="news-mega-3-heading">
          <ul className="nav-mega-3-grid nav-mega-3-grid-1" role="list">
            {NEWS_ITEMS.map((it) => (
              <li key={it.title}><MegaItem3 item={it} /></li>
            ))}
          </ul>
        </nav>
      </div>
    </MegaPanel3>
  );

  /* Expose to global so page-3.jsx's Header3 can mount them on home13. */
  Object.assign(window, { OurWorkMegaMenu3, WhoWeAreMegaMenu3, NewsMegaMenu3 });

  /* ---------------- Styles — injected once on first import ----------- */
  if (!document.getElementById("nav-mega-3-styles")) {
    const styleTag = document.createElement("style");
    styleTag.id = "nav-mega-3-styles";
    styleTag.textContent = `
      .nav-mega-3-trigger {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 0;
        font-family: inherit;
        font-size: 15px;
        line-height: 1.4;
        color: var(--ink-2);
        background: transparent;
        border: 0;
        cursor: pointer;
        transition: color 140ms ease;
      }
      .nav-mega-3-trigger:hover,
      .nav-mega-3-trigger[aria-expanded="true"] { color: var(--ink); }
      .nav-mega-3-trigger:focus-visible {
        outline: 2px solid #7d9aef;
        outline-offset: 4px;
        border-radius: 2px;
      }
      .nav-mega-3-chev { transition: transform 200ms ease; }
      .nav-mega-3-trigger[aria-expanded="true"] .nav-mega-3-chev { transform: rotate(180deg); }

      /* Panel — anchored under fixed header: 36px announce + 84px header */
      .nav-mega-3-panel {
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
      .nav-mega-3-panel[data-open="true"] {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
        transition: transform 240ms cubic-bezier(.2,.7,.2,1),
                    opacity 200ms ease,
                    visibility 0s;
      }
      @media (prefers-reduced-motion: reduce) {
        .nav-mega-3-panel {
          transition: opacity 0.001ms, visibility 0s linear 0.001ms;
          transform: none !important;
        }
      }

      .nav-mega-3-inner {
        max-width: 1640px;
        margin: 0 auto;
        padding: 40px 56px 48px;
        display: grid;
        gap: 56px;
      }
      .nav-mega-3-layout-ourwork .nav-mega-3-inner { grid-template-columns: 2.4fr 1fr; }
      .nav-mega-3-layout-who     .nav-mega-3-inner { grid-template-columns: 2.4fr 1fr; }
      .nav-mega-3-layout-news    .nav-mega-3-inner { grid-template-columns: 1.1fr 1.4fr; }

      .nav-mega-3-eyebrow {
        font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--ink-2);
        margin: 0 0 18px;
      }

      .nav-mega-3-grid {
        list-style: none; padding: 0; margin: 0;
        display: grid;
        gap: 8px 24px;
      }
      .nav-mega-3-grid-1 { grid-template-columns: 1fr; }
      .nav-mega-3-grid-2 { grid-template-columns: 1fr 1fr; }

      .nav-mega-3-item {
        display: grid;
        grid-template-columns: 44px 1fr;
        gap: 14px;
        padding: 14px;
        border-radius: 6px;
        align-items: start;
        text-decoration: none;
        color: inherit;
        transition: background 140ms ease;
      }
      .nav-mega-3-item:hover { background: rgba(125, 154, 239, 0.06); }
      .nav-mega-3-item:focus-visible {
        background: rgba(125, 154, 239, 0.08);
        outline: 2px solid #7d9aef;
        outline-offset: -2px;
      }
      .nav-mega-3-icon {
        width: 44px; height: 44px;
        border: 1px solid var(--line);
        border-radius: 4px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(255,255,255,0.02);
        transition: border-color 140ms ease;
        flex-shrink: 0;
      }
      .nav-mega-3-item:hover .nav-mega-3-icon,
      .nav-mega-3-item:focus-visible .nav-mega-3-icon {
        border-color: rgba(125,154,239,0.4);
      }
      .nav-mega-3-title {
        display: block;
        font-size: 15px;
        font-weight: 500;
        color: var(--ink);
        letter-spacing: -0.005em;
        margin: 0 0 4px;
        line-height: 1.3;
      }
      .nav-mega-3-desc {
        display: block;
        font-size: 13px;
        color: var(--ink-2);
        line-height: 1.5;
      }

      /* Featured aside — same gradient block as the Solutions feature card */
      .nav-mega-3-feat {
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
      .nav-mega-3-feat-eyebrow {
        font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.92);
      }
      .nav-mega-3-feat-title {
        font-size: 22px;
        font-weight: 500;
        letter-spacing: -0.015em;
        line-height: 1.25;
        color: #ffffff;
        margin: 0;
      }
      .nav-mega-3-feat-body {
        font-size: 14px;
        color: rgba(255,255,255,0.92);
        line-height: 1.55;
        margin: 0;
      }
      .nav-mega-3-feat-cta {
        margin-top: auto;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: #ffffff;
        color: #0e1014;
        font-weight: 500;
        font-size: 14px;
        border-radius: 4px;
        align-self: flex-start;
        text-decoration: none;
        transition: transform 120ms ease;
      }
      .nav-mega-3-feat-cta:hover { transform: translateX(2px); }
      .nav-mega-3-feat-cta:focus-visible {
        outline: 2px solid #7d9aef;
        outline-offset: 3px;
      }
      .nav-mega-3-feat-graphic {
        position: absolute;
        right: -20px; bottom: -20px;
        width: 180px; height: 180px;
        opacity: 0.18;
        color: #ffffff;
        pointer-events: none;
      }

      /* Who We Are — stats inside feat */
      .nav-mega-3-feat-stats {
        list-style: none; margin: 0; padding: 0;
        display: flex; flex-direction: column; gap: 14px;
        position: relative; z-index: 1;
      }
      .nav-mega-3-feat-stats li {
        display: grid;
        grid-template-columns: 64px 1fr;
        align-items: baseline;
        gap: 14px;
      }
      .nav-mega-3-feat-stats .num {
        font-size: 28px;
        font-weight: 400;
        color: #ffffff;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
        line-height: 1;
      }
      .nav-mega-3-feat-stats .lbl {
        font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
        font-size: 12px;
        letter-spacing: 0.10em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.92);
        line-height: 1.35;
      }

      /* News — featured article variant: thumb sits above the body */
      .nav-mega-3-feat-news {
        padding: 0;
        gap: 0;
      }
      .nav-mega-3-feat-news-thumb {
        height: 200px;
        overflow: hidden;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }
      .nav-mega-3-feat-news-thumb svg {
        display: block; width: 100%; height: 100%;
      }
      .nav-mega-3-feat-news-body {
        padding: 24px 26px 26px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        flex: 1;
      }

      /* Responsive */
      @media (max-width: 1100px) {
        .nav-mega-3-layout-ourwork .nav-mega-3-inner,
        .nav-mega-3-layout-who     .nav-mega-3-inner,
        .nav-mega-3-layout-news    .nav-mega-3-inner {
          grid-template-columns: 1fr;
          gap: 32px;
          padding: 32px 32px 36px;
        }
      }
      @media (max-width: 720px) {
        .nav-mega-3-grid-2 { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(styleTag);
  }
})();
