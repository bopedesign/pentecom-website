/* eslint-disable */
/* Pentecom — Home 3 (Light) — Part B
   Industries3 (dome), Process3 (phases), News3, Contact3, Footer3, App3 mount.
*/

/* =========================================================================
   INDUSTRIES 3 — thin-line dome / orbital scaffold w/ industry labels,
   below: 3 cards with corner gradient bloom per industry.
   ========================================================================= */
const INDUSTRIES_3 = [
  { name: "Defense and Military",                   icon: "defense",   line: "Cleared, controlled, and audit-ready.",            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",                            standards: ["CMMC L2/L3", "ITAR", "NIST 800-171", "IL4 / IL5"], hue: 225 },
  { name: "Aerospace and Aviation",                 icon: "aerospace", line: "Programs flying on the back of clean data.",        body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",                                            standards: ["AS9100D", "S1000D", "iSpec 2200", "STEP AP242"], hue: 210 },
  { name: "Government and Public Sector",           icon: "government", line: "Modernization at the pace your program contracts to.", body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",                                              standards: ["FedRAMP", "NIST 800-53", "FISMA", "Section 508"],   hue: 195 },
  { name: "Energy and Industrial",                  icon: "energy",    line: "Lifecycle data the field can trust.",                body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",                                       standards: ["ISO 15926", "CFIHOS", "API", "IEC 61850"],         hue: 235 },
  { name: "Technology and Systems Engineering",     icon: "tech",      line: "Engineering artifacts that survive the next release.", body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",                                  standards: ["OASIS", "ISO/IEC 11179", "DDS", "DCAT"],            hue: 200 },
];

/* Industry glyphs — monochrome hairline icons built from the same
   atomic vocabulary the rest of the site uses (1px strokes, geometric
   shapes, no fills, no decoration). Each glyph references its sector
   directly rather than the generic "document" placeholder we had
   before. All sized to 40×40 with stroke-width 1.25; same currentColor
   so the card's text color rules them. */
const IndustryGlyph = ({ kind }) => {
  const stroke = "rgba(255,255,255,0.92)";
  const dim    = "rgba(255,255,255,0.55)";
  const sw     = 1.25;
  const common = {
    width: 40, height: 40, viewBox: "0 0 40 40", fill: "none",
    stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (kind) {
    /* Defense — shield with two chevrons inside (rank stripes) */
    case "defense":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M20 4 L34 9 V20 C34 27.5 28 33.5 20 36 C12 33.5 6 27.5 6 20 V9 Z" />
          <path d="M12 18 L20 22 L28 18" stroke={dim} />
          <path d="M12 24 L20 28 L28 24" stroke={dim} />
        </svg>
      );
    /* Aerospace — top-down delta-wing aircraft silhouette */
    case "aerospace":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M20 4 L21 16 L34 24 L34 27 L21 23 L21 30 L25 33 L25 35 L20 34 L15 35 L15 33 L19 30 L19 23 L6 27 L6 24 L19 16 Z" />
        </svg>
      );
    /* Government — portico / classical column row with pediment */
    case "government":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M6 12 L20 5 L34 12" />
          <line x1="4"  y1="15" x2="36" y2="15" />
          <line x1="4"  y1="34" x2="36" y2="34" />
          <line x1="9"  y1="15" x2="9"  y2="34" />
          <line x1="16" y1="15" x2="16" y2="34" />
          <line x1="24" y1="15" x2="24" y2="34" />
          <line x1="31" y1="15" x2="31" y2="34" />
          <line x1="2"  y1="36" x2="38" y2="36" stroke={dim} />
        </svg>
      );
    /* Energy — pipe T-junction with two valves, hairline schematic */
    case "energy":
      return (
        <svg {...common} aria-hidden="true">
          <line x1="4" y1="22" x2="36" y2="22" />
          <line x1="20" y1="22" x2="20" y2="34" />
          <circle cx="12" cy="22" r="3.2" />
          <circle cx="28" cy="22" r="3.2" />
          <line x1="4"  y1="8"  x2="36" y2="8"  stroke={dim} />
          <line x1="6"  y1="8"  x2="6"  y2="22" stroke={dim} />
          <line x1="34" y1="8"  x2="34" y2="22" stroke={dim} />
        </svg>
      );
    /* Technology — three connected schematic nodes (flow diagram echo) */
    case "tech":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="4"  y="7"  width="10" height="10" rx="1.5" />
          <rect x="26" y="7"  width="10" height="10" rx="1.5" />
          <rect x="15" y="24" width="10" height="10" rx="1.5" />
          <line x1="14" y1="12" x2="26" y2="12" stroke={dim} />
          <line x1="9"  y1="17" x2="17" y2="24" stroke={dim} />
          <line x1="31" y1="17" x2="23" y2="24" stroke={dim} />
        </svg>
      );
    default:
      return null;
  }
};

const DomeDiagram = () => {
  // Five rim labels evenly spaced across the dome's base width.
  // Heights stair-step inward toward the apex so the labels track the
  // dome's curvature rather than sitting on a single horizontal line.
  const labels = [
    { x:  60, y: 232, label: "Defense and Military",               align: "start"  },
    { x: 200, y: 152, label: "Aerospace and Aviation",             align: "middle" },
    { x: 360, y:  44, label: "Government and Public Sector",       align: "middle" },
    { x: 520, y: 152, label: "Energy and Industrial",              align: "middle" },
    { x: 660, y: 232, label: "Technology and Systems Engineering", align: "end"    },
  ];
  return (
    <svg viewBox="0 0 720 280" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
      {/* Meridian curves — 18 thin lines */}
      {Array.from({ length: 19 }).map((_, i) => {
        const t = i / 18;
        const xOffset = (t - 0.5) * 600;
        return (
          <path
            key={i}
            className="draw-line"
            style={{ "--dash-len": 700, transitionDelay: `${i * 40}ms` }}
            d={`M${360 + xOffset} 270 Q${360 + xOffset * 0.55} ${10 + Math.abs(xOffset) * 0.05} 360 10`}
            fill="none"
            stroke="var(--line)"
            strokeWidth="0.6"
          />
        );
      })}
      {/* Base hairline */}
      <line className="draw-line" style={{ "--dash-len": 720 }} x1="0" y1="270" x2="720" y2="270" stroke="var(--line-2)" strokeWidth="0.8" />
      {/* Labels with leader lines */}
      {labels.map(l => (
        <g key={l.label}>
          <line x1={l.x} y1={l.y + 4} x2={l.x} y2={l.y + 14} stroke="var(--line-2)" strokeWidth="0.6" />
          <text x={l.x} y={l.y} fontSize="12" fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.10em" textAnchor={l.align} fill="var(--ink-2)" style={{ textTransform: "uppercase" }}>{l.label}</text>
        </g>
      ))}
    </svg>
  );
};

const IndustryCard = ({ v }) => (
  <article style={{
    position: "relative",
    borderRadius: 16,
    padding: 28,
    minHeight: 380,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    overflow: "hidden",
    color: "#FFFFFF",
    isolation: "isolate",
    boxShadow: "0 28px 60px -32px rgba(32, 50, 99,0.45), 0 1px 0 rgba(255,255,255,0.4) inset",
  }}>
    {/* Full-bleed gradient mesh background — DARK, lightness 14-30%
        so white text reads at high contrast everywhere on the card. */}
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0, zIndex: -2,
      background: `
        radial-gradient(circle at 18% 28%, hsl(${v.hue} 55% 30% / 0.95) 0%, transparent 55%),
        radial-gradient(circle at 78% 18%, hsl(${(v.hue + 18) % 360} 50% 26% / 0.85) 0%, transparent 50%),
        radial-gradient(circle at 85% 78%, hsl(${(v.hue - 18 + 360) % 360} 50% 18% / 0.95) 0%, transparent 55%),
        radial-gradient(circle at 30% 95%, hsl(${(v.hue + 10) % 360} 55% 14% / 0.95) 0%, transparent 55%),
        linear-gradient(135deg, hsl(${v.hue} 45% 22%) 0%, hsl(${v.hue} 55% 12%) 100%)
      `,
      filter: "blur(0.4px)",
    }} />
    {/* Vignette to deepen the corners and pin text on the lighter top */}
    <div aria-hidden="true" style={{
      position: "absolute", inset: -20, zIndex: -1,
      background: `radial-gradient(circle at 50% 35%, transparent 35%, hsl(${v.hue} 55% 8% / 0.55) 100%)`,
    }} />

    {/* Header — industry-specific monochrome glyph at top, then heading
        and subdued tagline beneath. Industry name is the H3 (the thing
        people actually need to read). Tagline drops to a smaller mono
        supporting line. */}
    <div style={{ marginBottom: 16 }}>
      <IndustryGlyph kind={v.icon} />
    </div>

    <h3 style={{
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: "-0.015em",
      lineHeight: 1.2,
      margin: "0 0 8px",
      maxWidth: "18ch",
      color: "rgba(255,255,255,0.96)",
      textShadow: "0 1px 2px rgba(0,0,0,0.12)",
    }}>{v.name}</h3>

    <div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.62)",
      marginBottom: 14,
    }}>{v.line}</div>

    <p style={{
      fontSize: 15,
      color: "rgba(255,255,255,0.86)",
      margin: 0,
      lineHeight: 1.55,
    }}>{v.body}</p>

    <div style={{
      marginTop: "auto",
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      paddingTop: 18,
      borderTop: "1px solid rgba(255,255,255,0.18)",
    }}>
      {v.standards.map(s => (
        <span key={s} style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.85)",
          padding: "3px 9px",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 3,
          background: "rgba(255,255,255,0.06)",
        }}>{s}</span>
      ))}
    </div>
  </article>
);

const Industries3 = () => {
  useInView3();
  return (
    <section id="who" className="sec-pad">
      <div className="container">
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="mixed-weight" style={{ fontSize: "var(--fs-h2)", lineHeight: 1.1, margin: 0, maxWidth: "24ch", marginLeft: "auto", marginRight: "auto", color: "var(--ink)" }}>
            Industries we <em>serve</em>.
          </h2>
        </div>

        <div className="fade-up" style={{ padding: "40px 0 24px", maxWidth: 880, margin: "0 auto" }}>
          <DomeDiagram />
        </div>

        <div className="industries-grid-3" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 18,
          marginTop: 48,
        }}>
          {INDUSTRIES_3.map(v => (
            <div key={v.name} className="fade-up"><IndustryCard v={v} /></div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1400px) {
          .industries-grid-3 { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 980px) {
          .industries-grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .industries-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   PROCESS 3 — 4 phases, each a soft white doc-card with hairline rule
   ========================================================================= */
const STEPS_3 = [
  { num: "01", title: "Brief & Assess",    body: "60-minute scoping call, written assessment. Scope, time, and risk in plain language." },
  { num: "02", title: "Map & Validate",    body: "Schema mapping, validation suite, pilot conversion on a representative slice." },
  { num: "03", title: "Convert & Verify",  body: "Full conversion in shadow alongside live. Every record reconciled, every exception triaged." },
  { num: "04", title: "Cutover & Sustain", body: "Cutover on your timeline. Rollback live. Documentation, runbooks, 90-day stand-by." },
];

const Process3 = () => {
  useInView3();
  return (
    <section id="process" className="sec-pad" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container">
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="mono" style={{ marginBottom: 22 }}>How We Work</div>
          <h2 className="mixed-weight" style={{ fontSize: "var(--fs-h2)", lineHeight: 1.1, margin: 0, color: "var(--ink)" }}>
            A four-phase <em>engagement</em>.
          </h2>
          <p style={{ fontSize: 17, color: "var(--ink-2)", margin: "16px auto 0", maxWidth: "56ch", lineHeight: 1.55 }}>
            We sell on phases — each with a fixed scope, fixed deliverable, and a documented exit before the next begins.
          </p>
        </div>

        <div className="process-grid-3" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}>
          {STEPS_3.map((st, i) => (
            <article key={st.num} className="fade-up" style={{
              position: "relative",
              background: "#FFFFFF",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 28,
              minHeight: 240,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              overflow: "hidden",
              boxShadow: "0 18px 36px -28px rgba(14, 18, 28,0.15)",
            }}>
              {/* Tiny gradient seed at top-right — image #11 reference */}
              <div style={{
                position: "absolute",
                right: "-30%", top: "-40%",
                width: "70%", height: "80%",
                background: `radial-gradient(circle, hsl(${[210, 225, 195, 215][i]} 55% 60% / 0.45), transparent 65%)`,
                filter: "blur(18px)",
                pointerEvents: "none",
              }} />
              <div className="mono" style={{ position: "relative", zIndex: 1 }}>Phase {st.num}</div>
              <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em", margin: 0, color: "var(--ink)", position: "relative", zIndex: 1 }}>{st.title}</h3>
              <p style={{ fontSize: 15, color: "var(--ink-2)", margin: 0, lineHeight: 1.55, position: "relative", zIndex: 1 }}>{st.body}</p>
              {/* Hairline doc-line marks at bottom */}
              <div style={{ marginTop: "auto", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 6, paddingTop: 16 }}>
                <div style={{ height: 1, background: "var(--line)" }} />
                <div style={{ height: 1, background: "var(--line)", width: "78%" }} />
                <div style={{ height: 1, background: "var(--line-soft)", width: "62%" }} />
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .process-grid-3 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .process-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   NEWS 3 — editorial list, light
   ========================================================================= */
const NEWS_3 = [
  { date: "May 02, 2026", tag: "Aerospace",  title: "Pentecom awarded multi-year S1000D conversion contract for Tier-1 airframe OEM", excerpt: "An eight-figure modernization program spanning four product lines." },
  { date: "Apr 18, 2026", tag: "Defense",    title: "Achieving CMMC Level 2 readiness for a 2,400-record CUI environment in 11 weeks", excerpt: "Disciplined scope, evidence-first migration, and what the assessor actually asked for." },
  { date: "Apr 03, 2026", tag: "Medical",    title: "FDA 21 CFR Part 11 — five mistakes we keep seeing in clinical data migrations", excerpt: "Audit trails that look complete but fail validation." },
  { date: "Mar 22, 2026", tag: "Company",    title: "Pentecom expands cleared-personnel practice with two new senior engineers", excerpt: "Both joining from prime contractors, bringing IL5 and tactical edge experience." },
  { date: "Mar 05, 2026", tag: "Field Note", title: "Why we rehearse every cutover in shadow", excerpt: "Notes from production data and the operational reality diagrams can't show." },
];

const News3 = () => {
  useInView3();
  return (
    <section id="news" className="sec-pad">
      <div className="container">
        {/* News section header — two-row editorial layout.
           Row 1: small mono eyebrow on the left, "All news" link on the
           right (aligned to the eyebrow baseline, not the H2 baseline —
           the old version dropped the link into space next to a
           multi-line H2 and read as detached).
           Row 2: large headline beneath, capped at ~20ch so it sets in
           two clean lines instead of stretching across the grid. */}
        <div className="news-head-3 fade-up" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 22, borderBottom: "1px solid var(--line)", paddingBottom: 18 }}>
            <div className="mono">News</div>
            <a href="#" style={{ fontFamily: "'Geist Mono', 'IBM Plex Mono', monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-2)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              All news <span aria-hidden="true">→</span>
            </a>
          </div>
          <h2 className="mixed-weight" style={{ fontSize: "var(--fs-h2)", lineHeight: 1.05, margin: 0, color: "var(--ink)", maxWidth: "22ch" }}>
            Recent work, recent <em>thinking</em>.
          </h2>
        </div>

        <div className="fade-up">
          {NEWS_3.map((n, i) => (
            <a key={i} href="#" className="news-row">
              <div>
                <div style={{ fontSize: 14, color: "var(--ink-3)" }}>{n.date}</div>
                <div style={{ fontSize: 14, color: "var(--pentecon-blue)", marginTop: 2 }}>{n.tag}</div>
              </div>
              <div>
                <div style={{ fontSize: 19, color: "var(--ink)", marginBottom: 4, letterSpacing: "-0.005em", fontWeight: 500 }}>{n.title}</div>
                <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.5 }}>{n.excerpt}</div>
              </div>
              <span style={{ color: "var(--ink-3)" }} aria-hidden>→</span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .news-head-3 h2 { max-width: none !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   FLOATING PANELS FIELD — the home4 hero's drifting doc-rect background,
   used as a section background behind the CTAs. Reuses the global
   .doc-rect class (skewX(-12deg) + drift-in + continuous float keyframes
   are already defined in the page CSS). The panel array mirrors the
   docsStack arrangement from Hero3 in page-3.jsx so the CTAs feel like
   a natural rhyme of the hero.

   Render this as a direct child of a position:relative section with
   overflow:hidden so panels clip to the section bounds. The component
   sets its own position:absolute + inset:0.
   ========================================================================= */
const FloatingPanelsArtifact = ({ idSuffix = "", height = 720 }) => {
  // Same arrangement Hero3 uses (page-3.jsx docsStack). Px coords
  // assume a section height roughly equal to `height`; the field
  // is clipped by the section's overflow:hidden so it works at any
  // actual section height — taller sections just leave a little
  // empty space top/bottom around the field.
  const docs = [
    { x: "2%",   y: 30,   w: 360, h: 230, lit: "tl", fromX: -120, fromY: -80,  delay: 80,  floatY: -5 },
    { x: "22%",  y: 180,  w: 300, h: 190, lit: "br", fromX: -40,  fromY:  90,  delay: 220, floatY:  5 },
    { x: "14%",  y: 470,  w: 420, h: 150, lit: "bl", fromX: -80,  fromY:  60,  delay: 360, floatY: -4 },
    { x: "48%",  y: 50,   w: 340, h: 210, lit: "tr", fromX:  80,  fromY: -120, delay: 140, floatY: -6 },
    { x: "72%",  y: 380,  w: 380, h: 220, lit: "tl", fromX: 120,  fromY:  80,  delay: 300, floatY:  5 },
    { x: "84%",  y: 100,  w: 260, h: 170, lit: "tr", fromX: 160,  fromY: -40,  delay: 440, floatY: -4 },
    { x: "62%",  y: 560,  w: 260, h: 120, lit: "br", fromX:   0,  fromY:  80,  delay: 560, floatY:  3 },
    { x: "8%",   y: 280,  w: 280, h: 170, lit: "tl", fromX: -90,  fromY: -50,  delay: 200, floatY: -4 },
    { x: "44%",  y: 260,  w: 200, h: 140, lit: "bl", fromX:  60,  fromY: -30,  delay: 340, floatY:  4 },
    { x: "78%",  y: 580,  w: 220, h: 130, lit: "tr", fromX:  80,  fromY:  60,  delay: 500, floatY: -3 },
  ];
  const angleMap = { tl: "135deg", tr: "225deg", bl: "45deg", br: "315deg" };
  return (
    <div
      className={`floating-panels-field floating-panels-field${idSuffix}`}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        height: height,
        pointerEvents: "none",
        overflow: "hidden",
        // Soft elliptical knock-back over the text area (left/center of
        // the section). Mask alpha controls visibility, so 0.5 alpha in
        // the inner region = 50% opacity on the panels there, fading
        // back to full opacity past the text.
        WebkitMaskImage:
          "radial-gradient(ellipse 62% 55% at 28% 50%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 32%, rgba(0,0,0,1) 72%, rgba(0,0,0,1) 100%)",
        maskImage:
          "radial-gradient(ellipse 62% 55% at 28% 50%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 32%, rgba(0,0,0,1) 72%, rgba(0,0,0,1) 100%)",
      }}
    >
      {docs.map((d, i) => (
        <div
          key={i}
          className="doc-rect floats"
          data-lit={d.lit}
          style={{
            left: d.x,
            top: d.y,
            width: d.w,
            height: d.h,
            zIndex: 1,
            "--from-x": `${d.fromX}px`,
            "--from-y": `${d.fromY}px`,
            "--delay": `${d.delay}ms`,
            "--float-x": "0px",
            "--float-y": `${d.floatY}px`,
            "--lit-angle": angleMap[d.lit],
            "--edge-strength": 0.55,
          }}
        />
      ))}
    </div>
  );
};

if (typeof window !== "undefined") {
  window.FloatingPanelsArtifact = FloatingPanelsArtifact;
}

/* =========================================================================
   CONTACT 3 — large CTA on warm gray, frosted contact-detail card
   with orb behind.
   ========================================================================= */
const Contact3 = () => {
  useInView3();
  return (
    <section id="contact" className="sec-pad" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--line)", background: "var(--bg-2)" }}>
      {/* Floating-panels field — drifts behind the whole section,
          matches the home4 hero treatment. */}
      <FloatingPanelsArtifact idSuffix="-home" height={760} />

      {/* Ambient blooms — sit above the panel field, below the text. */}
      <div className="bloom" style={{ right: "-10%", top: "10%", width: 520, height: 520, background: "radial-gradient(circle, hsl(215 65% 55% / 0.4), transparent 60%)", zIndex: 1 }} />
      <div className="bloom" style={{ left: "-8%", bottom: "-10%", width: 420, height: 420, background: "radial-gradient(circle, hsl(195 50% 55% / 0.32), transparent 60%)", zIndex: 1 }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="contact-grid-3b" style={{ maxWidth: 880 }}>
          <div className="fade-up">
            <div className="mono" style={{ marginBottom: 22, color: "var(--ink-2)" }}>Contact</div>
            <h2 className="mixed-weight" style={{ fontSize: "var(--fs-h1)", lineHeight: 1.05, margin: "0 0 24px", maxWidth: "20ch", color: "var(--ink)" }}>
              How can we help with your <em>technical data</em>?
            </h2>
            <p style={{ fontSize: 18, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 32px", maxWidth: "52ch" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#" className="btn">Book a scoping call</a>
              <a href="mailto:info@pentecom.co" className="btn btn-ghost">Email us</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-artifact {
          position: relative;
          width: 100%;
          aspect-ratio: 480 / 540;
          color: var(--ink);
        }
        /* Floating panels artifact — a contained drift field. The
           panels inside are .doc-rect (positioned absolutely) so we
           need a positioned, overflow-clipped frame around them. */
        .floating-panels-art {
          position: absolute;
          inset: 0;
          overflow: hidden;
          /* Hairline frame so the drift field reads as a contained
             figure on the CTA, not a leaked background element. */
          border: 1px solid var(--line);
          border-radius: 2px;
          /* Mask the top and bottom edges so panels fade in/out of
             the frame rather than colliding with it — echoes the data-
             field artifact's vertical fade. */
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%);
                  mask-image: linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%);
        }
        .cta-artifact-svg {
          display: block;
          width: 100%;
          height: 100%;
        }
        .cta-scan {
          animation: ctaScanMove 7s cubic-bezier(.45,.05,.55,.95) infinite;
        }
        @keyframes ctaScanMove {
          0%   { transform: translateY(0); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(540px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-scan { animation: none; opacity: 0; }
        }
        @media (max-width: 900px) {
          .contact-grid-3b { grid-template-columns: 1fr !important; gap: 48px !important; }
          .cta-artifact { max-width: 420px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   FOOTER 3 — light
   Layout (top → bottom):
     1. BRAND ROW   — logo + tagline + social
     2. MENUS       — 5-column sitemap (Solutions / Our Work / Who We Are
                      / News / Contact), with nested sub-items where shown
     3. CONTACT     — 3 mini-cols: Mailing Address · Offices · Contact details
     4. CERTS       — four logos, larger, with breathing room
     5. LEGAL       — copyright + legal links
   ========================================================================= */

const FOOTER_MENUS_3B = [
  {
    t: "Solutions",
    l: [
      { name: "Technical Document Standards" },
      { name: "S1000D + S-Series", sub: true },
      { name: "MIL-SPEC", sub: true },
      { name: "ATA", sub: true },
      { name: "Conversion" },
      { name: "Automation" },
      { name: "Technical Writing & Illustrations" },
      { name: "Auditing & Quality Assurance" },
      { name: "Lifecycle Acquisition" },
      { name: "Consulting" },
      { name: "OnRetainer", sub: true },
      { name: "JumpStart", sub: true },
      { name: "University of Pentecom" },
    ],
  },
  {
    t: "Our Work",
    l: [
      { name: "Case Studies" },
      { name: "Testimonials" },
      { name: "How to Work With Us" },
      { name: "Why Pentecom" },
    ],
  },
  {
    t: "Who We Are",
    l: [
      { name: "About Pentecom" },
      { name: "Our Leadership" },
      { name: "S1000D Community Leadership" },
      { name: "Careers" },
      { name: "FAQs" },
      { name: "Company Timeline" },
    ],
  },
  {
    t: "News",
    l: [
      { name: "Current News" },
      { name: "Pentecom By the Numbers" },
      { name: "Solution-Oriented One-Pagers" },
    ],
  },
  {
    t: "Contact",
    l: [
      { name: "Book a Scoping Call" },
      { name: "Email Us" },
      { name: "Locations" },
    ],
  },
];

const FOOTER_CERTS_3B = [
  { src: window.__resources.certEsop,       alt: "ESOP. Employee Stock Ownership Plan" },
  { src: window.__resources.certHubzone,    alt: "SBA HUBZone Certified" },
  { src: window.__resources.certWeHireVets, alt: "2026 We Hire Vets" },
  { src: window.__resources.certWosb,       alt: "SBA WOSB Certified. Women-Owned Small Business" },
];

const Footer3 = () => {
  // home14-style trimmed footer is now used across every production
  // surface (consulting, news, news-article, contact) in addition to
  // home14 itself. Older home explorations keep the full nested list.
  const page = typeof window !== "undefined" ? window.__PENTECON_PAGE : "";
  const trimSolutions = (
    page === "home14" ||
    page === "consulting" ||
    page === "consulting-v2" ||
    page === "news" ||
    page === "news-article" ||
    page === "contact"
  );
  const menus = trimSolutions
    ? FOOTER_MENUS_3B.map(col =>
        col.t === "Solutions"
          ? { ...col, l: [
              ...col.l.filter(i => !i.sub),
              { name: "All solutions →", all: true },
            ] }
          : col
      )
    : FOOTER_MENUS_3B;

  return (
  <footer className="footer-13" style={{ paddingTop: 80, paddingBottom: 28 }}>
    <div className="container">

      {/* 1. BRAND ROW */}
      <div className="footer-13-brand-row">
        <div className="footer-13-brand">
          <a href="/" style={{ display: "inline-flex", alignItems: "center", marginBottom: 20 }} aria-label="Pentecom">
            <img src={window.__resources.logo} alt="Pentecom. Experience. Expertise. Excellence." style={{ display: "block", height: 56, width: "auto" }} />
          </a>
          <p className="footer-13-tagline">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.
          </p>
        </div>

        <div className="footer-13-social">
          <a href="#" aria-label="Pentecom on LinkedIn" className="footer-13-social-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.01A2.5 2.5 0 014.98 3.5zM3 9.75h4v11.25H3V9.75zM9.75 9.75h3.83v1.54h.05c.53-1 1.83-2.07 3.77-2.07 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.05c0-1.2-.02-2.75-1.67-2.75-1.67 0-1.93 1.31-1.93 2.66V21h-4V9.75z"/>
            </svg>
          </a>
          <a href="#" aria-label="Pentecom on Instagram" className="footer-13-social-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>

      {/* 2. MENUS — 5 columns */}
      <div className="footer-13-menus">
        {menus.map(col => (
          <div key={col.t} className="footer-13-menu-col">
            <div className="mono footer-13-col-h">{col.t}</div>
            <div className="footer-13-col-links">
              {col.l.map(item => (
                <a
                  key={item.name}
                  href="#"
                  className={
                    item.sub ? "footer-13-col-sub" :
                    item.all ? "footer-13-col-all" : ""
                  }
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. CONTACT STRIP — mailing address · offices · contact details */}
      <div className="footer-13-contact-strip">
        <div className="footer-13-cs-block">
          <div className="mono footer-13-cs-eyebrow">Mailing Address</div>
          <div className="footer-13-cs-body">
            1101 N. Cedar Street<br />
            Palestine, TX 75801
          </div>
        </div>

        <div className="footer-13-cs-block">
          <div className="mono footer-13-cs-eyebrow">Offices</div>
          <div className="footer-13-cs-body">
            Palestine, TX<br />
            Scottsboro, AL
          </div>
        </div>

        <div className="footer-13-cs-block">
          <div className="mono footer-13-cs-eyebrow">Contact</div>
          <dl className="footer-13-cs-contact">
            <div>
              <dt>Phone</dt>
              <dd><a href="tel:+18887739067">888.773.9067</a></dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:info@pentecom.co">info@pentecom.co</a></dd>
            </div>
            <div>
              <dt>Fax</dt>
              <dd>888.229.6507</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* 4. CERTIFICATIONS — four logos, larger, with breathing room */}
      <div className="footer-13-certs">
        <div className="mono footer-13-certs-eyebrow">Certifications &amp; Affiliations</div>
        <ul className="footer-13-certs-list">
          {FOOTER_CERTS_3B.map(c => (
            <li key={c.src} className="footer-13-cert-item">
              <img src={c.src} alt={c.alt} />
            </li>
          ))}
        </ul>
      </div>

      {/* 5. BOTTOM — copyright + legal */}
      <div className="footer-13-bottom">
        <div className="mono">© 2026 Pentecom, Inc.</div>
        <div className="footer-13-legal">
          {["Privacy", "Terms", "Accessibility", "Site by Proxi PR"].map(l => (
            <a key={l} href="#" className="mono">{l}</a>
          ))}
        </div>
      </div>
    </div>

    <style>{`
      .footer-13 { border-top: 1px solid var(--line); }

      /* "All solutions" link — mono caption styling so it reads as a
         meta-action, not a peer of the top-level menu items above. */
      .footer-13-col-all {
        font-family: 'Geist Mono', 'IBM Plex Mono', monospace !important;
        font-size: 12px !important;
        letter-spacing: 0.14em !important;
        text-transform: uppercase !important;
        color: var(--ink-3) !important;
        margin-top: 8px !important;
      }
      .footer-13-col-all:hover { color: var(--ink) !important; }

      /* 1. BRAND ROW */
      .footer-13-brand-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 40px;
        padding-bottom: 56px;
      }
      .footer-13-brand { max-width: 480px; }
      .footer-13-tagline {
        font-size: 15px;
        color: var(--ink-2);
        line-height: 1.55;
        margin: 0;
        max-width: 42ch;
      }

      /* Social icon buttons */
      .footer-13-social { display: flex; gap: 10px; flex-shrink: 0; }
      .footer-13-social-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: 1px solid var(--line-2);
        color: var(--ink-2);
        border-radius: 4px;
        transition: border-color 160ms ease, color 160ms ease, background 160ms ease;
      }
      .footer-13-social-btn:hover {
        border-color: var(--ink-2);
        color: var(--ink);
        background: rgba(255,255,255,0.04);
      }

      /* 2. MENUS — 5 columns */
      .footer-13-menus {
        display: grid;
        grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr;
        gap: 40px;
        padding: 48px 0;
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
      }
      .footer-13-col-h {
        margin-bottom: 22px;
        color: var(--ink-2);
      }
      .footer-13-col-links { display: flex; flex-direction: column; gap: 11px; }
      .footer-13-col-links a {
        font-size: 14px;
        color: var(--ink-2);
        line-height: 1.4;
      }
      .footer-13-col-links a:hover { color: var(--ink); }
      .footer-13-col-sub {
        padding-left: 18px;
        font-size: 13px !important;
        color: var(--ink-3) !important;
        position: relative;
      }
      .footer-13-col-sub::before {
        content: "";
        position: absolute;
        left: 4px;
        top: 50%;
        width: 8px;
        height: 1px;
        background: var(--line-2);
      }
      .footer-13-col-sub:hover { color: var(--ink-2) !important; }

      /* 3. CONTACT STRIP */
      .footer-13-contact-strip {
        display: grid;
        grid-template-columns: 1fr 1fr 1.2fr;
        gap: 56px;
        padding: 40px 0;
        border-bottom: 1px solid var(--line);
      }
      .footer-13-cs-eyebrow {
        margin-bottom: 14px;
        color: var(--ink-3);
      }
      .footer-13-cs-body {
        font-size: 15px;
        color: var(--ink);
        line-height: 1.55;
      }
      .footer-13-cs-contact {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 8px 24px;
        margin: 0;
      }
      .footer-13-cs-contact dt {
        font-family: var(--font-mono, 'IBM Plex Mono', monospace);
        font-size: 12px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-3);
        margin-bottom: 4px;
      }
      .footer-13-cs-contact dd {
        margin: 0;
        font-size: 14px;
        color: var(--ink);
      }
      .footer-13-cs-contact a { color: inherit; }
      .footer-13-cs-contact a:hover { color: var(--pentecon-blue); }

      /* 4. CERTIFICATIONS */
      .footer-13-certs {
        padding: 48px 0;
        border-bottom: 1px solid var(--line);
        display: grid;
        gap: 28px;
      }
      .footer-13-certs-eyebrow { color: var(--ink-3); }
      .footer-13-certs-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 72px;
        flex-wrap: wrap;
      }
      .footer-13-cert-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
      }
      .footer-13-cert-item img {
        display: block;
        height: 100%;
        width: auto;
        max-width: 160px;
        object-fit: contain;
      }

      /* 5. BOTTOM */
      .footer-13-bottom {
        padding-top: 28px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
        color: var(--ink-3);
      }
      .footer-13-legal { display: flex; gap: 24px; flex-wrap: wrap; }
      .footer-13-legal a { color: var(--ink-3); }
      .footer-13-legal a:hover { color: var(--ink); }

      /* RESPONSIVE */
      @media (max-width: 1180px) {
        .footer-13-menus { gap: 28px; }
      }
      @media (max-width: 980px) {
        .footer-13-brand-row { flex-direction: column; }
        .footer-13-menus {
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px 32px;
        }
        .footer-13-contact-strip {
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
      }
      @media (max-width: 720px) {
        .footer-13-menus { grid-template-columns: 1fr 1fr; }
        .footer-13-contact-strip { grid-template-columns: 1fr; }
        .footer-13-cs-contact { grid-template-columns: 1fr 1fr; }
        .footer-13-certs-list { gap: 48px; }
        .footer-13-cert-item { height: 96px; }
      }
      @media (max-width: 480px) {
        .footer-13-menus { grid-template-columns: 1fr; gap: 32px; }
        .footer-13-cs-contact { grid-template-columns: 1fr; }
        .footer-13-certs-list { gap: 32px; }
        .footer-13-cert-item { height: 80px; }
      }
    `}</style>
  </footer>
  );
};

/* =========================================================================
   VIDEO BLOCK 4 — dark-variant only. Full-bleed editorial video frame
   that sits between Hero and WhyUs on home4. Uses a poster placeholder
   and standard <video controls>; replace the <source> with a real file.
   ========================================================================= */
const VideoBlock4 = () => {
  useInView3();
  return (
    <section id="video" className="sec-pad" style={{ paddingTop: 40, paddingBottom: 96 }}>
      <div className="container">
        <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "end", marginBottom: 32 }}>
          <div>
            <div className="mono" style={{ marginBottom: 18, color: "var(--ink-3)" }}>01.5 / In the field</div>
            <h2 className="mixed-weight" style={{ fontSize: "var(--fs-h2)", lineHeight: 1.1, margin: 0, color: "var(--ink)" }}>
              See the work, <em>not the pitch</em>.
            </h2>
          </div>
          <p style={{ fontSize: 17, color: "var(--ink-2)", margin: 0, lineHeight: 1.55, maxWidth: "60ch", justifySelf: "end" }}>
            A walk-through of a recent conversion — pulled straight from the program. No music. No actors. Engineering at the bench.
          </p>
        </div>

        <div className="fade-up" style={{
          position: "relative",
          borderRadius: 14,
          overflow: "hidden",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          boxShadow: "0 40px 80px -40px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.05) inset",
          aspectRatio: "16 / 9",
        }}>
          <video
            controls
            preload="metadata"
            playsInline
            poster="hero-aircraft.png"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              background: "#000",
            }}
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Editorial overlay caption — top-left mono tag */}
          <div aria-hidden="true" style={{
            position: "absolute",
            top: 18, left: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 10px",
            background: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: 3,
            pointerEvents: "none",
          }}>
            <span style={{
              width: 8, height: 8, background: "#e35e5e", borderRadius: 0,
              boxShadow: "0 0 8px rgba(227, 94, 94, 0.7)",
            }} />
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.92)",
            }}>Field recording ▪ 02:14</span>
          </div>
        </div>

        {/* Caption rail under the player */}
        <div className="fade-up" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--line)",
          marginTop: 28,
          paddingTop: 18,
        }}>
          {[
            { k: "Program",   v: "Tier-1 Airframe OEM" },
            { k: "Phase",     v: "Cutover & Verify" },
            { k: "Posture",   v: "IL5 ▪ CUI" },
          ].map((c, i) => (
            <div key={c.k} style={{
              padding: "0 24px",
              borderLeft: i === 0 ? "none" : "1px solid var(--line)",
            }}>
              <div className="mono" style={{ marginBottom: 6 }}>{c.k}</div>
              <div style={{ fontSize: 15, color: "var(--ink)" }}>{c.v}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          #video > .container > .fade-up:first-child { grid-template-columns: 1fr !important; gap: 16px !important; }
          #video > .container > .fade-up:first-child > p { justify-self: start !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   APP 3 — mount; owns useTweaks so values flow into both the page
   and the tweaks panel.
   ========================================================================= */
const App3 = () => {
  // Variant-aware defaults: home4.html sets body[data-variant="dark"] and
  // a dark base palette in CSS. Pick a dark-appropriate bg default so the
  // useEffect below doesn't paint a light surface over the dark theme.
  const isDark3 = typeof document !== "undefined" && document.body && document.body.dataset.variant === "dark";
  const page3 = (typeof window !== "undefined" && window.__PENTECON_PAGE) || "";
  const heroVideoSrc3 = page3 === "home5" ? "uploads/hero-video.mp4" : null;
  const heroImageSrc3 = page3 === "home6" ? "uploads/vehicle.png"
                      : page3 === "home8" ? "uploads/aircraft-top-cutout.png"
                      : page3 === "home9" ? "uploads/aircraft-top-cutout.png"
                      : null;
  const docsVariant3 = (page3 === "home6" || page3 === "home8") ? "tilted" : "stack";
  const defaults3 = isDark3
    ? { ...HOME3_TWEAK_DEFAULTS, bg: "#0e1014" }
    : HOME3_TWEAK_DEFAULTS;
  const bgOptions3 = isDark3
    ? ["#0e1014", "#14161b", "#0b0d12", "#171a20"]
    : ["#f2f1f0", "#f5f4f3", "#edeceb", "#e9e8e6"];

  const [t, setTweak] = useTweaks(defaults3);

  // Push tweak values to CSS custom properties / body class.
  useEffect3(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg", t.bg);
    root.style.setProperty("--orb-h1", String(t.orbHue));
    root.style.setProperty("--orb-h2", String((Number(t.orbHue) + 15) % 360));
    root.style.setProperty("--orb-h3", String((Number(t.orbHue) - 15 + 360) % 360));
    if (!t.motion) {
      document.body.classList.add("no-motion");
    } else {
      document.body.classList.remove("no-motion");
    }
  }, [t.bg, t.orbHue, t.motion]);

  return (
    <React.Fragment>
      <Header3 />
      <main>
        <Hero3 showDocs={(page3 === "home8" || page3 === "home9") ? false : t.showDocs} mixedWeight={t.mixedWeight} videoSrc={heroVideoSrc3} heroImageSrc={heroImageSrc3} docsVariant={docsVariant3} />
        {page3 === "home14" && typeof SolutionsHome1 !== "undefined"
          ? <SolutionsHome1 />
          : <Solutions3 />}
        <WhyUs3 />
        <Industries3 />
        {(page3 !== "home13" && page3 !== "home14") && <Process3 />}
        {(page3 === "home13" || page3 === "home14") && <ProofStats13 />}
        <Proof3 />
        <News3 />
        <Contact3 />
      </main>
      <Footer3 />

      <TweaksPanel>
        <TweakSection label="Surface">
          <TweakColor label="Background tone" value={t.bg} onChange={v => setTweak("bg", v)} options={bgOptions3} />
        </TweakSection>
        <TweakSection label="Orb">
          <TweakSlider label="Hue" value={t.orbHue} min={190} max={245} step={5} onChange={v => setTweak("orbHue", v)} />
        </TweakSection>
        <TweakSection label="Motion & layout">
          <TweakToggle label="Motion" value={t.motion} onChange={v => setTweak("motion", v)} />
          <TweakToggle label="Show floating documents" value={t.showDocs} onChange={v => setTweak("showDocs", v)} />
          <TweakToggle label="Mixed-weight headlines" value={t.mixedWeight} onChange={v => setTweak("mixedWeight", v)} />
        </TweakSection>
      </TweaksPanel>
      <style>{`
        body.no-motion .doc-rect { animation: none !important; opacity: 1 !important; transform: none !important; }
        body.no-motion .orb { animation: none !important; }
        body.no-motion .draw-line { stroke-dashoffset: 0 !important; }
        body.no-motion .fade-up { opacity: 1 !important; transform: none !important; }
      `}</style>
    </React.Fragment>
  );
};

/* Expose Footer3 (and any pieces) for sibling pages like consulting.html
   that build their own App but reuse the home13 chrome. */
Object.assign(window, { Footer3, App3 });

/* Skip auto-mount on pages that mount their own React tree. */
const PAGES_WITH_OWN_MOUNT_3B = ["consulting", "contact", "news", "news-article"];
if (typeof window === "undefined" || !PAGES_WITH_OWN_MOUNT_3B.includes(window.__PENTECON_PAGE)) {
  ReactDOM.createRoot(document.getElementById("root")).render(<App3 />);
}
