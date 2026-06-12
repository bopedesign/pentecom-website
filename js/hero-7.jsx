/* eslint-disable */
/* =========================================================================
   HERO 7 — "First frame" cinema plate.
   Replaces the doc-rect drift field with a full-bleed letterboxed video
   plate (the static first frame of the hero film). Schematic HUD: corner
   ticks, top mono caption row, bottom timecode scrubber, dimension
   callout from the aircraft to a right-edge readout. A center play
   control suggests the film is one click from running.

   Mounted as Hero3 when window.__PENTECON_PAGE === "home7", so the rest
   of page-3b's App can reuse it without modification.
   ========================================================================= */

/* Blueprint annotation field — modeled on the engineering-drawing aesthetic
   in the brief: big sweeping arcs, full-width datum register lines, long
   diagonal extension marks, and floating telemetric numbers scattered
   across the dark space at varying distances from the aircraft. Numbers
   are NOT clipped to tidy edge rows — they litter the field like a
   coordinate dump, the way the reference does.

   Two coordinate systems coexist:
   • SVG: viewBox 0 0 1000 1000, preserveAspectRatio="none" so coords map
     directly to plate %. Used for arcs, datum lines, anchor dots, leaders.
     vectorEffect=non-scaling-stroke keeps strokes uniform despite the
     non-uniform aspect map.
   • HTML overlay: <span>s absolute-positioned in plate % so numeric type
     stays crisp at any plate aspect.

   Headline (top-left) and subhead+CTAs (bottom-left) zones are kept clear
   of numbers so reading isn't impeded. */

// Sweeping outer-envelope arcs that cross the whole plate. Quadratic
// beziers in 0..1000 SVG units; off-canvas control points are intentional
// so the curves enter/exit the frame. Larger y-spread + higher opacity
// so the arcs read as prominent curves even after preserveAspectRatio
// =none flattens the vertical scale on a 2.35:1 plate.
const HERO7_ARCS = [
  { d: "M -60,980 Q 480,-220 1100,560", opacity: 0.32, width: 1.2 },
  { d: "M 140,920 Q 520,140  1020,700", opacity: 0.22, width: 1.0 },
];

// Full-width horizontal datum / register lines.
const HERO7_DATUMS = [
  { y: 16.5, opacity: 0.18 },
  { y: 50.0, opacity: 0.10 },
  { y: 86.5, opacity: 0.18 },
];

// Diagonal & short extension leaders from anchor points on the aircraft
// out into the dark space. Each terminates at (toX, toY); a nearby number
// (HERO7_NUMS) sits near that endpoint. Anchors are in safe zones — clear
// of the headline (left x:5-55, y:15-50) and subhead+CTAs (left x:5-50,
// y:60-85).
const HERO7_LEADERS = [
  { from: [62.0, 58.0], to: [62.0, 12.0] }, // up from canopy/forward fuselage
  { from: [72.0, 62.0], to: [85.0,  8.5] }, // diagonal up-right
  { from: [88.0, 50.0], to: [95.0, 16.5] }, // up-right from tail
  { from: [92.0, 56.0], to: [98.0, 56.0] }, // short horizontal out right side, arrow
  { from: [70.0, 66.0], to: [88.0, 92.0] }, // diagonal down-right from engine
  { from: [78.0, 58.0], to: [96.0, 75.0] }, // diagonal down-right
  { from: [62.0, 70.0], to: [55.0, 95.0] }, // down to bottom (just right of CTAs)
];

// Floating numerics — most have NO attached line. They sit in the dark
// space like coordinate readouts. Positions are restricted to SAFE ZONES:
//   • top strip       y ∈ [0, 14]  — any x
//   • right column    x ∈ [55, 100] — any y outside play-button band
//   • bottom strip    y ∈ [87, 100] — any x outside far bottom-left CTAs
//   • narrow mid-left edge x ∈ [0, 4] — escape route on the left edge
// This avoids overlapping "Technical data, mission-ready" (top-left
// headline) and the subhead+CTAs (bottom-left).
const HERO7_NUMS = [
  // top strip
  { x: 10.0, y:  4.0, t: "40833.6" },
  { x: 23.0, y:  5.5, t: "283800"  },
  { x: 36.0, y:  4.0, t: "0L580"   },
  { x: 62.0, y: 11.5, t: "104"     },
  { x: 71.0, y:  4.5, t: "099,270" },
  { x: 85.0, y:  6.5, t: "045800"  },
  { x: 95.0, y: 14.5, t: "022100"  },
  // right column
  { x: 94.5, y: 30.0, t: "02AL"    },
  { x: 88.0, y: 36.0, t: "21000"   },
  { x: 96.0, y: 42.0, t: "5102"    },
  { x: 96.5, y: 56.5, t: "08225"   },
  { x: 96.5, y: 67.0, t: "F005"    },
  { x: 96.5, y: 78.0, t: "660"     },
  // bottom strip
  { x: 55.0, y: 95.0, t: "OLIN 4"  },
  { x: 72.0, y: 89.0, t: "17"      },
  { x: 82.0, y: 92.5, t: "23000"   },
  { x: 95.0, y: 90.5, t: "ROM."    },
];

const HERO7_STATS = [
  { v: "'97",  k: "Founded in technical data" },
  { v: "1:6",  k: "Employees are U.S. veterans" },
  { v: "1M+",  k: "S1000D pages delivered" },
  { v: "40+",  k: "Military systems supported" },
  { v: "20",   k: "S1000D committee seats" },
];

const Hero7 = ({ mixedWeight }) => {
  // Reuse Hero3's in-view observer hook so .fade-up still triggers.
  if (typeof window.useInView3 === "function") window.useInView3();

  return (
    <section id="hero" data-screen-label="01 Hero" style={{
      position: "relative",
      paddingTop: 36,
      paddingBottom: 96,
      overflow: "hidden",
    }}>
      <div className="container hero7-container" style={{ position: "relative", zIndex: 2 }}>

        {/* Cinema plate — letterboxed first frame with HUD overlay */}
        <div className="fade-up hero7-plate" style={{
          position: "relative",
          marginTop: 0,
          aspectRatio: "2.35 / 1",
          background: "#080a0e",
          borderLeft: "1px solid var(--line)",
          borderRight: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          overflow: "hidden",
        }}>
          {/* Background image — the first frame */}
          <img
            src="aircraft-side-frame.png"
            alt=""
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: "center 56%",
              filter: "brightness(0.95)",
            }}
          />

          {/* Subtle bottom-to-top vignette so the timecode bar reads */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(8,10,14,0.45) 0%, rgba(8,10,14,0) 22%, rgba(8,10,14,0) 70%, rgba(8,10,14,0.7) 100%)",
            pointerEvents: "none",
          }} />

          {/* Corner ticks */}
          {["tl","tr","bl","br"].map(c => (
            <span key={c} className={"hero7-corner " + c} aria-hidden="true" />
          ))}

          {/* Blueprint annotation field — see HERO7_ARCS / DATUMS / LEADERS
              / NUMS above for the layered content. SVG uses preserveAspect
              Ratio=none + non-scaling strokes so geometry maps to plate %
              while lines stay hairline. Animations stagger entry by layer:
              datums first (most ambient), then arcs sweep in, then leaders
              and floats drop in. */}
          <svg className="hero7-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none"
               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            <defs>
              <marker id="hero7-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="8" markerHeight="8" orient="auto">
                <path d="M0,0 L10,5 L0,10" fill="none"
                      stroke="rgba(234,236,240,0.55)" strokeWidth="1.2" />
              </marker>
            </defs>

            {/* DATUM register lines — full-width, ambient */}
            {HERO7_DATUMS.map((d, i) => (
              <line key={"d"+i}
                    x1="0" y1={d.y * 10} x2="1000" y2={d.y * 10}
                    stroke={`rgba(234,236,240,${d.opacity})`}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    opacity="0">
                <animate attributeName="opacity" from="0" to="1"
                         dur="0.8s" begin={`${0.4 + i * 0.12}s`} fill="freeze" />
              </line>
            ))}

            {/* SWEEPING ARCS */}
            {HERO7_ARCS.map((a, i) => (
              <path key={"a"+i} d={a.d} fill="none"
                    stroke={`rgba(234,236,240,${a.opacity})`}
                    strokeWidth={a.width || 1}
                    strokeDasharray="6 8"
                    vectorEffect="non-scaling-stroke"
                    pathLength="100"
                    strokeDashoffset="100">
                <animate attributeName="stroke-dashoffset"
                         from="100" to="0"
                         dur="1.8s" begin={`${0.9 + i * 0.25}s`} fill="freeze"
                         calcMode="spline" keySplines="0.2 0.7 0.2 1" />
              </path>
            ))}

            {/* DIAGONAL & SHORT LEADERS */}
            {HERO7_LEADERS.map((l, i) => {
              const fx = l.from[0] * 10, fy = l.from[1] * 10;
              const tx = l.to[0]   * 10, ty = l.to[1]   * 10;
              const delay = 1.6 + i * 0.08;
              const useArrow = l.to[0] > 96; // right-side rightward leader gets arrowhead
              return (
                <g key={"l"+i}>
                  <line x1={fx} y1={fy} x2={tx} y2={ty}
                        stroke="rgba(234,236,240,0.32)"
                        strokeWidth="1"
                        strokeDasharray="3 5"
                        vectorEffect="non-scaling-stroke"
                        markerEnd={useArrow ? "url(#hero7-arrow)" : undefined}
                        opacity="0">
                    <animate attributeName="opacity" from="0" to="1"
                             dur="0.45s" begin={`${delay}s`} fill="freeze" />
                  </line>
                  <circle cx={fx} cy={fy} r="2.2"
                          fill="rgba(234,236,240,0.7)"
                          vectorEffect="non-scaling-stroke"
                          opacity="0">
                    <animate attributeName="opacity" from="0" to="1"
                             dur="0.3s" begin={`${delay + 0.1}s`} fill="freeze" />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* FLOATING NUMERIC LABELS */}
          {HERO7_NUMS.map((n, i) => {
            const delay = 1.8 + i * 0.06;
            return (
              <span key={"n"+i}
                    className="hero7-ann-lbl"
                    style={{
                      left: `${n.x}%`,
                      top:  `${n.y}%`,
                      animationDelay: `${delay}s`,
                    }}>
                {n.t}
              </span>
            );
          })}

          {/* Headline group — overlaid top-left within the plate */}
          <div className="hero7-overlay-text fade-up">
            <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 22, fontSize: 12, letterSpacing: "0.18em" }}>
              Data conversion <span style={{ color: "var(--ink-4)" }}>▪</span> modernization <span style={{ color: "var(--ink-4)" }}>▪</span> compliance
            </div>
            <h1 className={mixedWeight ? "mixed-weight" : ""} style={{
              fontSize: "clamp(40px, 4.4vw, 76px)",
              fontWeight: mixedWeight ? 300 : 500,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: "14ch",
              color: "var(--ink)",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}>
              {mixedWeight
                ? (<React.Fragment>Technical data, <em>mission-ready</em>.</React.Fragment>)
                : "Technical data, mission-ready."}
            </h1>
          </div>

          {/* Bottom-left subhead + CTAs */}
          <div className="hero7-overlay-bl fade-up">
            <p style={{
              fontSize: 16, lineHeight: 1.5, color: "var(--ink-2)",
              maxWidth: "44ch", margin: "0 0 22px",
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <a href="#contact" className="btn">Start a project</a>
              <a href="#solutions" className="btn btn-ghost">See capabilities</a>
            </div>
          </div>

          {/* Timecode / scrubber bar at the bottom inside the plate */}
          <div className="hero7-scrub" aria-hidden="true">
            <div className="hero7-scrub-row">
              <span className="tc">00:00</span>
              <div className="track">
                <div className="progress" />
                <div className="head" />
              </div>
              <span className="tc">02:14</span>
            </div>
            <div className="hero7-scrub-meta">
              <span>FRAME 0001 / 3214</span>
              <span>24P · ProRes 4444</span>
              <span>OBJ · SCHEMATIC · ELEVATION</span>
              <span>NO SIG LOCK</span>
            </div>
          </div>
        </div>

        {/* Stats row — kept consistent with the other home variants */}
        <div className="hero-stats-3 fade-up" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--line)",
          marginTop: 72,
          paddingTop: 32,
          paddingBottom: 16,
          position: "relative", zIndex: 3,
        }}>
          {HERO7_STATS.map((s, i) => (
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
        .hero7-container { padding-top: 110px; }

        /* Corner ticks on the plate */
        .hero7-corner {
          position: absolute;
          width: 18px; height: 18px;
          border: 1px solid var(--ink-2);
          opacity: 0.7;
        }
        .hero7-corner.tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
        .hero7-corner.tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
        .hero7-corner.bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
        .hero7-corner.br { bottom: 10px; right: 10px; border-left: none; border-top: none; }

        /* Blueprint annotation labels — small mono numerics floating in the
           dark space across the plate. Centered on (left,top) so the
           coordinate represents where the number visually sits. */
        .hero7-ann-lbl {
          position: absolute;
          transform: translate(-50%, -50%);
          font-family: 'Geist Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.12em;
          color: rgba(234,236,240,0.62);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          animation: hero7-fade 500ms ease forwards;
          z-index: 2;
          text-shadow: 0 0 8px rgba(8,10,14,0.7);
        }
        @keyframes hero7-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Overlay text positions inside the plate */
        .hero7-overlay-text {
          position: absolute;
          top: 12.5%;
          left: 5%;
          max-width: 55%;
          z-index: 3;
        }
        .hero7-overlay-bl {
          position: absolute;
          left: 5%;
          bottom: 16%;
          max-width: 44%;
          z-index: 3;
        }

        /* Scrubber — hidden on home7 so the blueprint annotation field can
           own the bottom edge of the plate. The cinema chrome (corner ticks,
           caption row, play button) still carries the video frame motif. */
        .hero7-scrub {
          position: absolute;
          left: 24px; right: 24px; bottom: 22px;
          z-index: 3;
          display: none;
        }
        .hero7-scrub-row {
          display: flex; align-items: center; gap: 14px;
          font-family: 'Geist Mono', monospace;
          font-size: 12px;
          color: var(--ink-2);
          letter-spacing: 0.12em;
        }
        .hero7-scrub-row .tc {
          font-variant-numeric: tabular-nums;
          color: var(--ink);
        }
        .hero7-scrub .track {
          position: relative;
          flex: 1;
          height: 1px;
          background: rgba(234,236,240,0.25);
        }
        .hero7-scrub .progress {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 8%;
          background: var(--ink);
        }
        .hero7-scrub .head {
          position: absolute;
          left: 8%;
          top: 50%;
          transform: translate(-50%,-50%);
          width: 9px; height: 9px;
          background: var(--ink);
          border-radius: 50%;
        }
        .hero7-scrub-meta {
          margin-top: 8px;
          display: none; /* hidden on home7 — the blueprint annotation field
                            owns the bottom edge of the plate. */
          justify-content: space-between;
          font-family: 'Geist Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.16em;
          color: var(--ink-3);
          text-transform: uppercase;
        }

        /* Container override — push hero out to a wider max-width so the
           plate reads as cinematic. */
        body[data-variant="dark"] #hero .container.hero7-container {
          max-width: 1720px;
        }

        @media (max-width: 1100px) {
          .hero7-overlay-text { max-width: 70%; }
          .hero7-overlay-bl { max-width: 60%; }
        }
        @media (max-width: 820px) {
          .hero7-plate { aspect-ratio: 4 / 3 !important; }
          .hero7-overlay-text { max-width: 92%; }
          .hero7-overlay-bl { max-width: 92%; }
          .hero7-ann-lbl { font-size: 12px; letter-spacing: 0.08em; }
        }
      `}</style>
    </section>
  );
};

/* Swap Hero3 with Hero7 on home7 only. */
if (typeof window !== "undefined" && window.__PENTECON_PAGE === "home7") {
  window.Hero3 = Hero7;
}
window.Hero7 = Hero7;


/* =========================================================================
   HERO 7 CLEAN (home10) — Same cinema plate and aircraft image, but
   stripped of all chrome:
     • NO corner ticks
     • NO SVG arcs / datum lines / leaders / anchor dots
     • NO floating mono numbers
     • NO timecode scrubber
     • NO eyebrow caption
   Keeps the H1 (top-left), description + two buttons (bottom-left), the
   plane, and the 5-column stats row below. Whole hero is sized to fit a
   single viewport so the stats row is visible before any scroll.
   ========================================================================= */
const Hero7Clean = ({ mixedWeight }) => {
  if (typeof window.useInView3 === "function") window.useInView3();

  return (
    <section id="hero" data-screen-label="01 Hero" style={{
      position: "relative",
      paddingTop: 0,
      paddingBottom: 24,
      overflow: "hidden",
      minHeight: "calc(100vh - 120px)",
      display: "flex",
      flexDirection: "column",
    }}>
      <div className="container hero7-container hero7clean-container" style={{
        position: "relative",
        zIndex: 2,
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Cinema plate — clean, no HUD overlays */}
        <div className="fade-up hero7clean-plate" style={{
          position: "relative",
          aspectRatio: "2.35 / 1",
          background: "#080a0e",
          borderLeft: "1px solid var(--line)",
          borderRight: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          borderTop: "1px solid var(--line)",
          overflow: "hidden",
          flex: "0 0 auto",
        }}>
          {/* Background image — the first frame */}
          <img
            src="aircraft-side-frame.png"
            alt=""
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: "center 56%",
              filter: "brightness(0.95)",
            }}
          />

          {/* Subtle bottom-to-top vignette for legibility on the description */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(8,10,14,0.45) 0%, rgba(8,10,14,0) 22%, rgba(8,10,14,0) 70%, rgba(8,10,14,0.7) 100%)",
            pointerEvents: "none",
          }} />

          {/* Headline group — overlaid top-left */}
          <div className="hero7-overlay-text fade-up">
            <h1 className={mixedWeight ? "mixed-weight" : ""} style={{
              fontSize: "clamp(40px, 4.4vw, 76px)",
              fontWeight: mixedWeight ? 300 : 500,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: "14ch",
              color: "var(--ink)",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}>
              {mixedWeight
                ? (<React.Fragment>Technical data, <em>mission-ready</em>.</React.Fragment>)
                : "Technical data, mission-ready."}
            </h1>
          </div>

          {/* Bottom-left subhead + CTAs */}
          <div className="hero7-overlay-bl fade-up">
            <p style={{
              fontSize: 16, lineHeight: 1.5, color: "var(--ink-2)",
              maxWidth: "44ch", margin: "0 0 22px",
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <a href="#contact" className="btn">Start a project</a>
              <a href="#solutions" className="btn btn-ghost">See capabilities</a>
            </div>
          </div>
        </div>

        {/* Stats row — kept consistent with the other home variants */}
        <div className="hero-stats-3 fade-up" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--line)",
          marginTop: "auto",
          paddingTop: 24,
          paddingBottom: 0,
          position: "relative", zIndex: 3,
        }}>
          {HERO7_STATS.map((s, i) => (
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
        .hero7clean-container { padding-top: 24px; }

        /* The plate keeps its strict 2.35:1 aspect ratio. Its width is the
           lesser of (a) the container width and (b) what the viewport can
           afford after reserving room for the stats row, section paddings
           and the fixed header. This way the plate scales down on short
           viewports without ever squishing — the plane keeps its shape. */
        .hero7clean-plate {
          width: min(100%, calc((100vh - 320px) * 2.35));
          margin: 0 auto;
        }

        body[data-variant="dark"] #hero .container.hero7clean-container {
          max-width: 1720px;
        }

        @media (max-width: 1100px) {
          .hero7clean-container .hero7-overlay-text { max-width: 70%; }
          .hero7clean-container .hero7-overlay-bl { max-width: 60%; }
        }
        @media (max-width: 820px) {
          .hero7clean-plate { aspect-ratio: 4 / 3 !important; max-height: none; }
          .hero7clean-container .hero7-overlay-text { max-width: 92%; }
          .hero7clean-container .hero7-overlay-bl { max-width: 92%; }
        }
      `}</style>
    </section>
  );
};

/* Swap Hero3 with Hero7Clean on home10 only. */
if (typeof window !== "undefined" && window.__PENTECON_PAGE === "home10") {
  window.Hero3 = Hero7Clean;
}
window.Hero7Clean = Hero7Clean;


/* =========================================================================
   HERO 7 EDITORIAL (home11) — Option 2 from the design review.
   Plate is identical to Hero7Clean (same aircraft image, same untouched
   2.35:1 dimensions, same viewport-fit scaling — the plane is NOT resized,
   NOT recontrasted, NOT moved).

   The only thing that changes is WHERE the text lives. Text only occupies
   the genuinely dark zones of the image:
     • H1 sits TOP-LEFT, in the dark sky above the fuselage
     • Description (left) + buttons (right) form a horizontal "credits
       line" along the BOTTOM of the plate, below the wing line where
       the sky returns to dark
   Nothing crosses the bright wireframe. Reads as an art-directed film
   poster / editorial spread.
   ========================================================================= */

/* =========================================================================
   HERO 11 CALLOUTS — a set of leader lines + rolling-digit numeric
   labels that fade in at ~3s into the video (when the plane has
   settled into its final pose). Per spec, every line and every number
   sits ABOVE the plane — nothing below it, nothing left or right.
   Style matches the engineering-blueprint reference: thin hairline
   strokes, ghosted white, mono numerics in tabular-nums.
   ========================================================================= */
const HERO11_REVEAL_AT_MS = 2000;
const HERO11_INTRA_STAGGER_MS = 35;

/* Callout positions in % of the video element (0–100, x and y).
   fromX/Y — anchor point on the plane (top edge of plane elements).
   toX/Y   — label position above the plane (always y < ~30%). */
const HERO11_CALLOUTS = [
  { fromX: 18, fromY: 42, toX: 10, toY: 14, text: "283000"  },
  { fromX: 26, fromY: 38, toX: 24, toY:  6, text: "099,270" },
  { fromX: 38, fromY: 36, toX: 36, toY: 18, text: "104"     },
  { fromX: 50, fromY: 40, toX: 52, toY:  8, text: "0L580"   },
  { fromX: 60, fromY: 38, toX: 62, toY: 22, text: "40833.6" },
  { fromX: 72, fromY: 36, toX: 74, toY: 10, text: "02100"   },
  { fromX: 82, fromY: 28, toX: 84, toY: 16, text: "F005"    },
  { fromX: 90, fromY: 40, toX: 92, toY:  4, text: "660"     },
];

const Hero11RollingDigit = ({ target, delayMs }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const n = parseInt(target, 10);
    if (Number.isNaN(n)) return;
    const h = setTimeout(() => {
      if (ref.current) ref.current.style.transform = `translateY(-${n + 10}em)`;
    }, Math.max(0, delayMs));
    return () => clearTimeout(h);
  }, [target, delayMs]);
  return (
    <span className="hero11-rd-cell">
      <span className="hero11-rd-strip" ref={ref}>
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="hero11-rd-glyph">{i % 10}</span>
        ))}
      </span>
    </span>
  );
};

const Hero11RollingNumber = ({ text, baseDelayMs }) => {
  const chars = React.useMemo(() => text.split(""), [text]);
  return (
    <span className="hero11-roll">
      {chars.map((c, i) => {
        const d = baseDelayMs + i * HERO11_INTRA_STAGGER_MS;
        if (/[0-9]/.test(c)) {
          return <Hero11RollingDigit key={i} target={c} delayMs={d} />;
        }
        return (
          <span key={i} className={c === " " ? "hero11-rd-space" : "hero11-rd-static"}>
            {c === " " ? "\u00A0" : c}
          </span>
        );
      })}
    </span>
  );
};

const Hero11Callouts = () => {
  const [revealed, setRevealed] = React.useState(false);
  React.useEffect(() => {
    const h = setTimeout(() => setRevealed(true), HERO11_REVEAL_AT_MS);
    return () => clearTimeout(h);
  }, []);

  /* Each line runs from its anchor on the plane (fromX,fromY) only
     HALFWAY toward the original label position (toX,toY). The number
     label sits at that halfway endpoint, so the number is closer to
     the plane. */
  const half = (c) => ({
    midX: c.fromX + (c.toX - c.fromX) * 0.5,
    midY: c.fromY + (c.toY - c.fromY) * 0.5,
  });

  return (
    <div className="hero11-callouts" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        overflow: "visible",
      }}>
        {HERO11_CALLOUTS.map((c, i) => {
          const { midX, midY } = half(c);
          return (
            <line
              key={i}
              x1={c.fromX} y1={c.fromY}
              x2={midX}    y2={midY}
              stroke="rgba(255,255,255,0.42)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{
                opacity: revealed ? 1 : 0,
                transition: `opacity 600ms ease ${i * 60}ms`,
              }}
            />
          );
        })}
      </svg>

      {HERO11_CALLOUTS.map((c, i) => {
        const { midX, midY } = half(c);
        return (
          <span
            key={"n" + i}
            className="hero11-callout-num"
            style={{
              left: `${midX}%`,
              top:  `${midY}%`,
              opacity: revealed ? 1 : 0,
              visibility: revealed ? "visible" : "hidden",
              transition: `opacity 500ms ease ${300 + i * 80}ms`,
            }}
          >
            {revealed && (
              <Hero11RollingNumber text={c.text} baseDelayMs={400 + i * 100} />
            )}
          </span>
        );
      })}
    </div>
  );
};

/* =========================================================================
   HERO 12 CALLOUTS — a richer engineering HUD overlay. Same trigger as
   Hero11 (snaps in at ~3s into the video), but with more layered
   structure: corner viewfinder brackets, multiple horizontal datum
   register lines, sweeping concentric arcs centered above the plane,
   a crosshair on the plane, twelve leader-line callouts radiating from
   the plane to numeric labels, mono captions at the corners, and a
   small spectrum-bar readout. Everything fades on as a single composed
   layer (no per-element stagger, no rolling digits) so the entry reads
   as a cinematic instrument lock-on.
   ========================================================================= */
const HERO12_REVEAL_AT_MS = 2000;
const HERO12_REVEAL_DUR_MS = 380;
const HERO12_PLANE_CTR = { x: 50, y: 56 };

const HERO12_DATUMS = [
  { y: 28.0, opacity: 0.16 },
  { y: 54.0, opacity: 0.22 },
];

const HERO12_ARCS = [
  { r: 22, opacity: 0.42 },
  { r: 34, opacity: 0.28 },
  { r: 46, opacity: 0.16 },
];

const HERO12_CORNERS = [
  { x:  1, y:  1,  ext: 4.2, dirX:  1, dirY:  1 },
  { x: 99, y:  1,  ext: 4.2, dirX: -1, dirY:  1 },
  { x:  1, y: 56,  ext: 4.2, dirX:  1, dirY: -1 },
  { x: 99, y: 56,  ext: 4.2, dirX: -1, dirY: -1 },
];

const HERO12_CALLOUTS = [
  { fromX: 14, fromY: 52, toX:  4, toY: 32, text: "40833.6" },
  { fromX: 19, fromY: 48, toX: 12, toY: 18, text: "099,270" },
  { fromX: 26, fromY: 46, toX: 24, toY:  8, text: "Δ 0033"  },
  { fromX: 34, fromY: 50, toX: 34, toY: 22, text: "104"     },
  { fromX: 42, fromY: 44, toX: 42, toY: 12, text: "0L580"   },
  { fromX: 50, fromY: 50, toX: 50, toY: 36, text: "5102"    },
  { fromX: 58, fromY: 48, toX: 60, toY: 14, text: "283000"  },
  { fromX: 66, fromY: 50, toX: 68, toY: 36, text: "02100"   },
  { fromX: 74, fromY: 46, toX: 76, toY:  8, text: "F005"    },
  { fromX: 82, fromY: 50, toX: 86, toY: 18, text: "08225"   },
  { fromX: 88, fromY: 48, toX: 92, toY: 32, text: "660"     },
  { fromX: 94, fromY: 50, toX: 96, toY:  8, text: "21000"   },
];

/* Slide 2 callouts — same hairline + mono aesthetic, lines emanate
   from the LEFT, RIGHT, and a few from the TOP of the vehicle.
   Everything compressed up; lowest data point sits no lower than y=50%
   so nothing crosses below the wheels into the H1/credits area. */
const HERO12_V2_CALLOUTS = [
  // LEFT flank — dots solidly inside the vehicle body
  { fromX: 38, fromY: 28, toX: 12, toY: 24, text: "40833.6" },
  { fromX: 38, fromY: 36, toX:  6, toY: 34, text: "099,270" },
  { fromX: 40, fromY: 44, toX: 10, toY: 44, text: "Δ 0033"  },
  { fromX: 42, fromY: 50, toX: 14, toY: 52, text: "104"     },
  // RIGHT flank
  { fromX: 62, fromY: 28, toX: 88, toY: 24, text: "283000"  },
  { fromX: 62, fromY: 36, toX: 94, toY: 34, text: "02100"   },
  { fromX: 60, fromY: 44, toX: 90, toY: 44, text: "F005"    },
  { fromX: 58, fromY: 50, toX: 86, toY: 52, text: "08225"   },
  // TOP — dots on roof, labels above (5102 lowered to clear the header)
  { fromX: 42, fromY: 22, toX: 38, toY:  8, text: "0L580"   },
  { fromX: 50, fromY: 20, toX: 50, toY: 10, text: "5102"    },
  { fromX: 58, fromY: 22, toX: 62, toY: 10, text: "660"     },
  { fromX: 66, fromY: 22, toX: 74, toY: 12, text: "21000"   },
];

const HERO12_SPECTRUM = [22, 38, 30, 55, 70, 64, 82, 92, 76, 64, 50, 42, 32, 28, 36, 24, 18, 14];

/* A few callout indices roll continuously like a ticker so the data
   overlay always has at least one number changing. The rest stay
   static. Spread across the row so the motion isn't bunched up. */
const HERO12_ROLLER_INDICES = [1, 4, 8, 10];

/* One digit reel — a vertical strip of 0–9 repeating, that translates
   upward to show the current target. On first render it snaps to the
   initial target; on every subsequent target change it animates,
   always rolling FORWARD (down through the cycle visually) so it
   feels like an odometer. Strip is long; when scroll position gets
   high we silently wrap back to a small position before the next
   roll, so the component can run indefinitely. */
const Hero12TickerDigit = ({ target }) => {
  const stripRef = React.useRef(null);
  const posRef = React.useRef(0);
  const initialized = React.useRef(false);

  React.useLayoutEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    if (!initialized.current) {
      initialized.current = true;
      el.style.transition = "none";
      el.style.transform = `translateY(-${target + 10}em)`;
      posRef.current = target + 10;
      return;
    }

    if (posRef.current > 150) {
      const wrap = posRef.current % 10;
      el.style.transition = "none";
      el.style.transform = `translateY(-${wrap + 10}em)`;
      posRef.current = wrap + 10;
      void el.offsetHeight;
    }

    const curr = posRef.current % 10;
    let advance = (target - curr + 10) % 10;
    if (advance === 0) advance = 10;
    posRef.current += advance;

    const dur = 600 + Math.random() * 400;
    el.style.transition = `transform ${dur}ms cubic-bezier(0.22, 0.72, 0.18, 1)`;
    el.style.transform = `translateY(-${posRef.current}em)`;
  }, [target]);

  return (
    <span className="hero12-td-cell">
      <span className="hero12-td-strip" ref={stripRef}>
        {Array.from({ length: 200 }, (_, i) => (
          <span key={i} className="hero12-td-glyph">{i % 10}</span>
        ))}
      </span>
    </span>
  );
};

/* A whole rolling number — every digit gets a ticker reel, every other
   character (commas, periods, letters) renders static. Re-rolls itself
   every 1.8–4.2s to a new random value that preserves the original
   character template. */
const Hero12RollingNumber = ({ initial }) => {
  const [text, setText] = React.useState(initial);
  React.useEffect(() => {
    let t;
    const schedule = () => {
      const delay = 1800 + Math.random() * 2400;
      t = setTimeout(() => {
        setText((prev) =>
          prev.split("").map((c) =>
            /[0-9]/.test(c) ? String(Math.floor(Math.random() * 10)) : c
          ).join("")
        );
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <span className="hero12-tk">
      {text.split("").map((c, i) =>
        /[0-9]/.test(c) ? (
          <Hero12TickerDigit key={i} target={parseInt(c, 10)} />
        ) : (
          <span key={i} className="hero12-tk-static">
            {c === " " ? "\u00A0" : c}
          </span>
        )
      )}
    </span>
  );
};

const hero12Arc = (cx, cy, r, startDeg, endDeg) => {
  const s = (startDeg * Math.PI) / 180;
  const e = (endDeg * Math.PI) / 180;
  const sx = cx + r * Math.cos(s);
  const sy = cy + r * Math.sin(s);
  const ex = cx + r * Math.cos(e);
  const ey = cy + r * Math.sin(e);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${sx},${sy} A ${r},${r} 0 ${large} ${sweep} ${ex},${ey}`;
};

const Hero12Callouts = ({ variant = "top", revealDelay = HERO12_REVEAL_AT_MS }) => {
  const sides = variant === "sides";
  const callouts = sides ? HERO12_V2_CALLOUTS : HERO12_CALLOUTS;
  const [revealed, setRevealed] = React.useState(false);
  React.useEffect(() => {
    const h = setTimeout(() => setRevealed(true), revealDelay);
    return () => clearTimeout(h);
  }, [revealDelay]);

  // Staged animation timeline (ms). Each element class gets its own
  // delay so the overlay reads as a cinematic instrument lock-on —
  // structure first (datums, arcs), then leader lines fan out, then
  // dots snap in, then numbers and captions/spectrum lock on last.
  const T_DATUM     = (i) => 0   + i *  90;
  const T_TICK      = (i) => 250 + i *  12;
  const T_ARC       = (i) => 180 + i * 140;
  const T_LINE      = (i) => 480 + i *  55;
  const T_DOT       = (i) => 720 + i *  55;
  const T_NUM       = (i) => 880 + i *  55;
  const T_CAP       = (i) => 180 + i *  90;
  const T_BAR       = (i) => 540 + i *  28;

  const HERO12_CAPS = [];

  return (
    <div className="hero12-callouts" aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          overflow: "visible",
        }}
      >
        {/* Horizontal datum register lines — top variant only */}
        {!sides && HERO12_DATUMS.map((d, i) => (
          <line key={"d" + i}
                x1="0" y1={d.y} x2="100" y2={d.y}
                stroke={`rgba(255,255,255,${d.opacity})`}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                style={{
                  opacity: revealed ? 1 : 0,
                  transition: `opacity 520ms cubic-bezier(0.2,0.7,0.2,1) ${T_DATUM(i)}ms`,
                }} />
        ))}

        {/* Concentric arcs above the plane — top variant only */}
        {!sides && HERO12_ARCS.map((a, i) => (
          <path key={"a" + i}
                d={hero12Arc(HERO12_PLANE_CTR.x, HERO12_PLANE_CTR.y, a.r, 180, 360)}
                stroke={`rgba(255,255,255,${a.opacity})`}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                fill="none"
                style={{
                  opacity: revealed ? 1 : 0,
                  transition: `opacity 640ms cubic-bezier(0.2,0.7,0.2,1) ${T_ARC(i)}ms`,
                }} />
        ))}

        {/* Leader lines */}
        {callouts.map((c, i) => (
          <line key={"l" + i}
                x1={c.fromX} y1={c.fromY}
                x2={c.toX}   y2={c.toY}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                style={{
                  opacity: revealed ? 1 : 0,
                  transition: `opacity 360ms ease ${T_LINE(i)}ms`,
                }} />
        ))}
      </svg>

      {/* Anchor dots — HTML elements so they stay perfectly CIRCULAR
          regardless of the overlay's non-uniform SVG scaling. Pop in
          after the leader line draws. */}
      {callouts.map((c, i) => (
        <span key={"dot" + i}
              className="hero12-anchor-dot"
              style={{
                left: `${c.fromX}%`,
                top:  `${c.fromY}%`,
                opacity: revealed ? 1 : 0,
                transform: revealed
                  ? "translate(-50%, -50%) scale(1)"
                  : "translate(-50%, -50%) scale(0.3)",
                transition: `opacity 220ms ease ${T_DOT(i)}ms, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1) ${T_DOT(i)}ms`,
              }} />
      ))}

      {/* Numeric labels */}
      {callouts.map((c, i) => {
        const isRoller = HERO12_ROLLER_INDICES.includes(i);
        return (
          <span key={"n" + i}
                className="hero12-callout-num"
                style={{
                  left: `${c.toX}%`, top: `${c.toY}%`,
                  opacity: revealed ? 1 : 0,
                  transition: `opacity 320ms ease ${T_NUM(i)}ms`,
                }}>
            {isRoller ? <Hero12RollingNumber initial={c.text} /> : c.text}
          </span>
        );
      })}

      {/* Mono captions — fade + slight slide from outer edge */}
      {HERO12_CAPS.map((cap, i) => {
        const slideX = cap.right_align ? 12 : -12;
        return (
          <span key={"cap" + i}
                className={"hero12-cap" + (cap.right_align ? " hero12-cap-r" : "")}
                style={{
                  left: cap.left,
                  right: cap.right,
                  top: cap.top,
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateX(0)" : `translateX(${slideX}px)`,
                  transition: `opacity 420ms ease ${T_CAP(i)}ms, transform 480ms cubic-bezier(0.2,0.7,0.2,1) ${T_CAP(i)}ms`,
                }}>
            {cap.txt}
          </span>
        );
      })}
    </div>
  );
};

/* =========================================================================
   HERO 12 FLOW DIAGRAM — slide 3 centerpiece. An animated signal-flow
   schematic in the same wireframe-blueprint style as the plane and
   vehicle videos: thin ghosted lines, no words, transparent bg.
   Drawn at 16:9 so the slider crossfades cleanly to/from it.
   ========================================================================= */
/* Pin positions (as fractions of node height) where wires attach.
   Widgets have a 5-pin terminal array; inputs 2-pin; terminal 8-pin. */
const HERO12_FLOW_PINS = {
  input:    [0.50, 0.78],
  widget:   [0.30, 0.44, 0.58, 0.72, 0.86],
  matrix:   [0.40, 0.60],
  terminal: [0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88],
};

const HERO12_FLOW_NODES = [
  // y values shifted +175 from original to vertically center the flow
  // content within the 1600x900 viewBox (content now spans y=215–685,
  // centered on 450). Originally anchored to top with a baseline rail
  // at y=540; rail removed, content recentered.
  { id: "A", x:  60, y: 325, w: 160, h: 110, type: "input"    },
  { id: "B", x:  60, y: 555, w: 160, h: 110, type: "input"    },
  { id: "C", x: 420, y: 215, w: 240, h: 150, type: "widget"   },
  { id: "D", x: 420, y: 395, w: 240, h: 150, type: "widget"   },
  { id: "E", x: 420, y: 575, w: 200, h: 110, type: "matrix"   },
  { id: "F", x: 870, y: 285, w: 240, h: 150, type: "widget"   },
  { id: "G", x: 870, y: 485, w: 240, h: 150, type: "widget"   },
  { id: "T", x: 1320, y: 305, w: 200, h: 340, type: "terminal" },
];

const HERO12_FLOW_COLORS = {
  blue:  "rgba(125, 154, 239, 0.95)",
  cyan:  "rgba(120, 184, 184, 0.92)",
  amber: "rgba(215, 191, 149, 0.92)",
  white: "rgba(240, 242, 248, 0.90)",
};
const HERO12_FLOW_COLORS_DIM = {
  blue:  "rgba(125, 154, 239, 0.40)",
  cyan:  "rgba(120, 184, 184, 0.36)",
  amber: "rgba(215, 191, 149, 0.36)",
  white: "rgba(240, 242, 248, 0.40)",
};

/* Each wire specifies which PIN on the source/target node it attaches
   to, so the routing looks like a real schematic (multiple wires fan
   out from a node's pin array rather than all stacking at mid-y). */
const HERO12_FLOW_WIRES = [
  { from: "A", fromPin: 0, to: "C", toPin: 0, side: "left",  color: "blue",  dur: 2.6, delay: 0.0 },
  { from: "A", fromPin: 1, to: "D", toPin: 0, side: "left",  color: "amber", dur: 3.2, delay: 0.7 },
  { from: "B", fromPin: 0, to: "D", toPin: 1, side: "left",  color: "cyan",  dur: 2.9, delay: 0.3 },
  { from: "B", fromPin: 1, to: "E", toPin: 0, side: "left",  color: "white", dur: 2.7, delay: 1.1 },
  { from: "C", fromPin: 2, to: "F", toPin: 0, side: "left",  color: "blue",  dur: 3.1, delay: 1.4 },
  { from: "C", fromPin: 4, to: "G", toPin: 0, side: "left",  color: "amber", dur: 2.5, delay: 0.5 },
  { from: "D", fromPin: 2, to: "F", toPin: 2, side: "left",  color: "cyan",  dur: 3.4, delay: 0.9 },
  { from: "D", fromPin: 4, to: "G", toPin: 2, side: "left",  color: "white", dur: 2.8, delay: 0.2 },
  { from: "E", fromPin: 1, to: "G", toPin: 4, side: "left",  color: "amber", dur: 3.0, delay: 1.6 },
  { from: "F", fromPin: 2, to: "T", toPin: 1, side: "left",  color: "blue",  dur: 2.4, delay: 1.2 },
  { from: "F", fromPin: 4, to: "T", toPin: 3, side: "left",  color: "cyan",  dur: 2.8, delay: 0.4 },
  { from: "G", fromPin: 2, to: "T", toPin: 5, side: "left",  color: "white", dur: 3.2, delay: 0.6 },
  { from: "G", fromPin: 4, to: "T", toPin: 7, side: "left",  color: "amber", dur: 2.6, delay: 1.0 },
];

const hero12FlowNode = (id) => HERO12_FLOW_NODES.find((n) => n.id === id);

const hero12FlowAnchor = (node, side, pinIdx) => {
  const pins = HERO12_FLOW_PINS[node.type] || [0.5];
  const t = pins[Math.min(pinIdx ?? 0, pins.length - 1)];
  return side === "right"
    ? { x: node.x + node.w, y: node.y + node.h * t }
    : { x: node.x,           y: node.y + node.h * t };
};

const hero12FlowWirePath = (w) => {
  const a = hero12FlowAnchor(hero12FlowNode(w.from), "right", w.fromPin);
  const b = hero12FlowAnchor(hero12FlowNode(w.to),   w.side || "left", w.toPin);
  // Cubic bezier with horizontal tangents at both ends — reads like a
  // tidy schematic wire (orthogonal feel) without harsh right angles.
  const xm = (a.x + b.x) / 2;
  return `M ${a.x},${a.y} C ${xm},${a.y} ${xm},${b.y} ${b.x},${b.y}`;
};

/* Node-detail renderer — each node type gets a different internal
   composition (header bar, pin terminal arrays, matrix grid, etc.). */
const Hero12FlowNode = ({ n }) => {
  const pins = HERO12_FLOW_PINS[n.type] || [];
  const stroke = "rgba(255,255,255,0.42)";
  const sub = "rgba(255,255,255,0.28)";
  return (
    <g>
      <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="3" ry="3"
            fill="none" stroke={stroke} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {/* Header divider — every node has one */}
      <line x1={n.x + 6} y1={n.y + 18} x2={n.x + n.w - 6} y2={n.y + 18}
            stroke={sub} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {/* Small header-label box at top-right (echo of widget tag boxes) */}
      <rect x={n.x + n.w - 56} y={n.y + 4} width="50" height="10" rx="1"
            fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1"
            vectorEffect="non-scaling-stroke" />

      {n.type === "widget" && (
        <g>
          {/* Right-side pin terminal array with triangle indicators */}
          {pins.map((t, i) => {
            const py = n.y + n.h * t;
            return (
              <g key={"rp" + i}>
                <line x1={n.x + n.w - 24} y1={py} x2={n.x + n.w} y2={py}
                      stroke="rgba(255,255,255,0.45)" strokeWidth="1"
                      vectorEffect="non-scaling-stroke" />
                <path d={`M ${n.x + n.w - 32},${py - 3} L ${n.x + n.w - 26},${py} L ${n.x + n.w - 32},${py + 3} Z`}
                      fill="rgba(255,255,255,0.4)" />
              </g>
            );
          })}
          {/* Inner segmentation lines (cabinet feel) */}
          <line x1={n.x + n.w * 0.4} y1={n.y + 22} x2={n.x + n.w * 0.4} y2={n.y + n.h - 6}
                stroke="rgba(255,255,255,0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </g>
      )}

      {n.type === "input" && (
        <g>
          {/* Right-side simple pins */}
          {pins.map((t, i) => {
            const py = n.y + n.h * t;
            return (
              <line key={"ip" + i}
                    x1={n.x + n.w - 18} y1={py} x2={n.x + n.w} y2={py}
                    stroke="rgba(255,255,255,0.45)" strokeWidth="1"
                    vectorEffect="non-scaling-stroke" />
            );
          })}
          {/* Tiny chevron mark inside — hints at an input port */}
          <path d={`M ${n.x + 12},${n.y + n.h - 16} L ${n.x + 22},${n.y + n.h - 10} L ${n.x + 12},${n.y + n.h - 4}`}
                fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </g>
      )}

      {n.type === "matrix" && (
        <g>
          {/* Small grid of intersection circles — echoes the matrix
              distribution block in real flow-tracing diagrams. */}
          {Array.from({ length: 5 }, (_, c) =>
            Array.from({ length: 3 }, (_, r) => {
              const cx = n.x + 18 + c * ((n.w - 60) / 4);
              const cy = n.y + 32 + r * ((n.h - 50) / 2);
              return (
                <circle key={`m${r}${c}`} cx={cx} cy={cy} r="2.5"
                        fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="1"
                        vectorEffect="non-scaling-stroke" />
              );
            })
          )}
          {/* Output pin on right edge */}
          {pins.map((t, i) => {
            const py = n.y + n.h * t;
            return (
              <line key={"mp" + i}
                    x1={n.x + n.w - 16} y1={py} x2={n.x + n.w} y2={py}
                    stroke="rgba(255,255,255,0.4)" strokeWidth="1"
                    vectorEffect="non-scaling-stroke" />
            );
          })}
        </g>
      )}

      {n.type === "terminal" && (
        <g>
          {/* Left-side many-pin terminal block */}
          {pins.map((t, i) => {
            const py = n.y + n.h * t;
            return (
              <g key={"tp" + i}>
                <line x1={n.x} y1={py} x2={n.x + 22} y2={py}
                      stroke="rgba(255,255,255,0.45)" strokeWidth="1"
                      vectorEffect="non-scaling-stroke" />
                <circle cx={n.x} cy={py} r="2.2" fill="rgba(255,255,255,0.7)" />
              </g>
            );
          })}
          {/* Center spine */}
          <line x1={n.x + n.w * 0.5} y1={n.y + 22} x2={n.x + n.w * 0.5} y2={n.y + n.h - 6}
                stroke="rgba(255,255,255,0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </g>
      )}
    </g>
  );
};

const Hero12FlowDiagram = ({ isActive }) => {
  return (
    <div className="hero12-flow-stage" aria-hidden="true">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid meet"
        className="hero12-flow-svg"
      >
        {/* Nodes — each rendered per its type */}
        {HERO12_FLOW_NODES.map((n) => <Hero12FlowNode key={n.id} n={n} />)}

        {/* Wires — static base (dimmer) */}
        {HERO12_FLOW_WIRES.map((w, i) => (
          <path key={"wb" + i}
            d={hero12FlowWirePath(w)}
            stroke={HERO12_FLOW_COLORS_DIM[w.color]}
            strokeWidth="1.2"
            fill="none"
            vectorEffect="non-scaling-stroke" />
        ))}

        {/* Wires — moving luminous pulse overlay */}
        {HERO12_FLOW_WIRES.map((w, i) => (
          <path key={"wp" + i}
            d={hero12FlowWirePath(w)}
            stroke={HERO12_FLOW_COLORS[w.color]}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            strokeDasharray="0.04 0.96"
            style={{
              animation: `hero12FlowPulse ${w.dur}s linear infinite`,
              animationDelay: `${w.delay}s`,
              animationPlayState: isActive ? "running" : "paused",
            }} />
        ))}

        {/* Connection dots where wires meet nodes */}
        {HERO12_FLOW_WIRES.map((w, i) => {
          const a = hero12FlowAnchor(hero12FlowNode(w.from), "right", w.fromPin);
          const b = hero12FlowAnchor(hero12FlowNode(w.to),   w.side || "left", w.toPin);
          return (
            <g key={"d" + i}>
              <circle cx={a.x} cy={a.y} r="2.6" fill="rgba(255,255,255,0.75)" />
              <circle cx={b.x} cy={b.y} r="2.6" fill="rgba(255,255,255,0.75)" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const Hero7Editorial = ({ mixedWeight }) => {
  if (typeof window.useInView3 === "function") window.useInView3();
  const page = (typeof window !== "undefined" && window.__PENTECON_PAGE) || "";
  const CalloutComponent = (page === "home12" || page === "home13" || page === "home14") ? Hero12Callouts : Hero11Callouts;

  // Two hero slides — each a (video + data overlay) pair, crossfaded
  // on slide change. Auto-advance every 10s with manual prev/next
  // arrows. Slide 2 currently re-uses slide 1's video as a placeholder;
  // drop in a different file when ready.
  const HERO_SLIDES = [
    { kind: "video", videoSrc: "aircraft-rotate.mp4"  },
    { kind: "video", videoSrc: "aircraft-rotate-2.mp4" },
    { kind: "flow" },
  ];
  const HERO_AUTOADVANCE_MS = 10000;
  const HERO_CROSSFADE_MS = 700;

  const [currentSlide, setCurrentSlide] = React.useState(0);

  // Auto-advance — reset whenever currentSlide changes (manual or auto).
  React.useEffect(() => {
    const t = setTimeout(() => {
      setCurrentSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, HERO_AUTOADVANCE_MS);
    return () => clearTimeout(t);
  }, [currentSlide]);

  const prevSlide = () =>
    setCurrentSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlide = () =>
    setCurrentSlide((s) => (s + 1) % HERO_SLIDES.length);

  // Per-slide video element — plays from start when its slide becomes
  // active, pauses when not. Keeps each slide's video synced to its
  // own reveal timeline.
  const SlideVideo = ({ isActive, src }) => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const v = ref.current;
      if (!v) return;
      if (isActive) {
        try { v.currentTime = 0; } catch (e) {}
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        v.pause();
      }
    }, [isActive]);
    return (
      <video
        ref={ref}
        className="hero7ed-plane"
        src={src}
        muted
        playsInline
        preload="metadata"
      />
    );
  };

  // Graceful staged enter — H1, description+buttons, and stats fade
  // up in sequence on mount. Subtle 14px translate + slight blur lift
  // gives the elements a settle-in quality instead of just popping.
  const [entered, setEntered] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);
  const enterStyle = (delayMs) => ({
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(14px)",
    filter: entered ? "blur(0px)" : "blur(3px)",
    transition: `opacity 1000ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delayMs}ms, transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delayMs}ms, filter 800ms ease ${delayMs}ms`,
  });
  return (
    <section id="hero" data-screen-label="01 Hero" className="hero7ed-section" style={{
      position: "relative",
      paddingTop: 0,
      paddingBottom: 0,
      overflow: "hidden",
      minHeight: "calc(100vh - 120px)",
      display: "flex",
      flexDirection: "column",
    }}>
      <div className="container hero7-container hero7ed-container" style={{
        position: "relative",
        zIndex: 2,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingTop: 0,
        paddingBottom: 0,
      }}>

        {/* Plane stage — holds two crossfading slides. Each slide
            renders its own video element plus its own data overlay
            instance. Only the active slide's overlay is mounted, so
            its 2-second reveal timer restarts every time that slide
            becomes active. */}
        <div className="hero7ed-stage fade-up">
          {HERO_SLIDES.map((sl, i) => {
            const isActive = currentSlide === i;
            return (
              <div
                key={i}
                className="hero7ed-slide"
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transition: `opacity ${HERO_CROSSFADE_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {sl.kind === "flow"
                  ? <Hero12FlowDiagram isActive={isActive} />
                  : <SlideVideo isActive={isActive} src={sl.videoSrc} />}
                {isActive && sl.kind !== "flow" && (
                  <CalloutComponent
                    variant={i === 0 ? "top" : "sides"}
                    revealDelay={i === 0 ? 2000 : 0}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* H1 — flush-left with logo column, sits just above the
            description. Sized at the system --fs-h2 step (clamp
            30–44px) so it stays in the existing type scale AND fits on
            a single line. The bigger heading sizes wrapped the line
            ("Technical data," / "mission-ready.") which broke the
            grouped feel of the H1 + description + buttons. */}
        <div className="hero7ed-headline" style={{ position: "relative", zIndex: 2, ...enterStyle(150) }}>
          <h1 className={mixedWeight ? "mixed-weight" : ""} style={{
            fontSize: "var(--fs-h2)",
            fontWeight: mixedWeight ? 300 : 500,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: "none",
            color: "var(--ink)",
            whiteSpace: "nowrap",
          }}>
            {mixedWeight
              ? (<React.Fragment>Technical data, <em>mission-ready</em>.</React.Fragment>)
              : "Technical data, mission-ready."}
          </h1>
        </div>

        {/* Bottom row — description flush LEFT (same column as logo and
            H1), buttons flush RIGHT (same column as stats #5). Tight
            vertical gap above so it groups with the H1. */}
        <div className="hero7ed-credits" style={{ position: "relative", zIndex: 2, ...enterStyle(320) }}>
          <p className="hero7ed-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.
          </p>
          <div className="hero7ed-right-stack">
            <div className="hero7ed-nav" aria-label="Hero slide navigation">
              <button className="hero7ed-nav-btn" onClick={prevSlide} aria-label="Previous slide" type="button">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="hero7ed-nav-counter mono">{String(currentSlide + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}</span>
              <button className="hero7ed-nav-btn" onClick={nextSlide} aria-label="Next slide" type="button">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 2 L10 7 L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="hero7ed-ctas">
              <a href="#contact" className="btn">Start a project</a>
              <a href="#solutions" className="btn btn-ghost">See capabilities</a>
            </div>
          </div>
        </div>

        {/* Stats row — flush with container edges */}
        <div className="hero-stats-3 hero7ed-stats" style={enterStyle(560)}>
          {HERO7_STATS.map((s, i) => (
            <div key={s.k} style={{
              padding: "0 24px",
              borderLeft: "1px solid var(--line)",
            }}>
              <div style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em", marginBottom: 6, color: "var(--ink-2)" }}>{s.v}</div>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>{s.k}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        body[data-variant="dark"] #hero .container.hero7ed-container {
          max-width: 1640px;
        }

        .hero7ed-headline {
          /* flush-left with logo column. Sits directly above the
             description so the H1 → description → buttons read as one
             composed group. */
          margin-bottom: 18px;
          z-index: 3;
        }

        /* Plane stage — spans the container's content area, the SAME
           horizontal column as the logo, H1, description, and stats row.
           This guarantees that the plane's left edge aligns with the
           logo's left edge (and the H1 / description left edge), and
           the plane's right edge aligns with the stats column 5's right
           edge (and the buttons' right edge). Earlier rounds broke this
           by using negative margins to push the plane edge-to-edge of
           the viewport — alignment with the rest of the page won out.

           Critical: img is position:absolute so it CANNOT push the stage
           taller — stage takes whatever flex space is left and the image
           contain-fits inside it.

           min-height: 240px guarantees the plane never collapses on
           short viewports. */
        .hero7ed-stage {
          flex: 1 1 0;
          position: relative;
          min-height: 240px;
        }
        /* Subtle ambient wash behind the plane — a soft horizontal beam
           that lifts the dark fuselage off the near-black page bg
           without adding a hard plate, border, or vignette. Reads as
           atmosphere, not chrome. */
        .hero7ed-stage::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 55% at 50% 50%, rgba(125,154,239,0.09) 0%, rgba(125,154,239,0.03) 40%, transparent 70%),
            linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.015) 50%, transparent 100%);
          pointer-events: none;
        }
        .hero7ed-plane {
          /* Width is locked to the stage (logo → stats column).
             Height auto-derives from aspect-ratio so the FULL 16:9
             frame is shown — no top/bottom crop, no left/right crop.
             Element extends downward past the stage bottom into the
             H1+description+buttons area; those elements have z-index
             to sit on top. Section overflow:hidden prevents the video
             from leaking past the section. */
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          aspect-ratio: 16 / 9;
          height: auto;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          user-select: none;
        }

        /* Callouts overlay — same bounds as the video element. Lines
           + rolling-digit numeric labels live strictly in the upper
           portion (y < 30% of the video), above the plane. */
        .hero11-callouts {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          aspect-ratio: 16 / 9;
          height: auto;
          pointer-events: none;
          z-index: 3;
        }
        .hero11-callout-num {
          position: absolute;
          transform: translate(-50%, -50%);
          font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.66);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
          pointer-events: none;
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
        }
        .hero11-roll {
          display: inline-flex;
          align-items: flex-end;
          line-height: 1;
        }
        .hero11-rd-cell {
          display: inline-block;
          width: 0.62em;
          height: 1em;
          overflow: hidden;
          vertical-align: baseline;
          text-align: center;
        }
        .hero11-rd-strip {
          display: block;
          transform: translateY(0);
          transition: transform 720ms cubic-bezier(0.22, 0.72, 0.18, 1);
          will-change: transform;
        }
        .hero11-rd-glyph {
          display: block;
          height: 1em;
          line-height: 1em;
          text-align: center;
        }
        .hero11-rd-static { display: inline-block; }
        .hero11-rd-space  { display: inline-block; width: 0.32em; }

        /* Hero 12 flow diagram — slide 3. Full width to match slides 1
           & 2 (videos) and locked to aspect-ratio 16/9 so the graphic
           is the same SIZE as those videos. The element is positioned
           with top: 50% + translateY(-50%) so its CENTER aligns with
           the vertical center of the available space (between header
           and H1) instead of being pinned to the top — combined with
           the node y-coords being centered within the viewBox, this
           centers the graphic vertically between header and H1 while
           preserving its original full width. */
        .hero12-flow-stage {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          width: 100%;
          aspect-ratio: 16 / 9;
          height: auto;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .hero12-flow-svg {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        @keyframes hero12FlowPulse {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }

        /* Hero 12 \u2014 richer HUD overlay. Same bounds as the video. */
        .hero12-callouts {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          aspect-ratio: 16 / 9;
          height: auto;
          pointer-events: none;
          z-index: 3;
        }
        .hero12-callout-num {
          position: absolute;
          transform: translate(-50%, -50%);
          font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.55);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
        }
        .hero12-cap {
          position: absolute;
          font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.62);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
          text-transform: uppercase;
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
        }
        /* Hero 12 anchor dots — perfect circles in screen pixels,
           independent of the overlay's non-uniform SVG aspect. */
        .hero12-anchor-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.65);
          border-radius: 50%;
          pointer-events: none;
        }
        /* Hero 12 ticker digit reels */
        .hero12-tk {
          display: inline-flex;
          align-items: baseline;
          line-height: 1;
        }
        .hero12-td-cell {
          display: inline-block;
          width: 0.62em;
          height: 1em;
          overflow: hidden;
          vertical-align: baseline;
          text-align: center;
        }
        .hero12-td-strip {
          display: block;
          will-change: transform;
        }
        .hero12-td-glyph {
          display: block;
          height: 1em;
          line-height: 1em;
          text-align: center;
        }
        .hero12-tk-static { display: inline-block; }
        .hero12-cap-r { text-align: right; }
        .hero12-spectrum {
          position: absolute;
          right: 1.5%;
          top: 14%;
          display: flex;
          align-items: flex-end;
          gap: 2px;
          width: 84px;
          height: 28px;
        }
        .hero12-spectrum > span {
          display: block;
          width: 3px;
          background: rgba(255, 255, 255, 0.65);
          border-radius: 0;
        }
        @media (max-width: 1100px) {
          .hero11-callout-num,
          .hero12-callout-num { font-size: 12px; letter-spacing: 0.08em; }
          .hero12-cap { font-size: 12px; letter-spacing: 0.14em; }
          .hero12-spectrum { width: 64px; height: 22px; }
        }
        @media (max-width: 720px) {
          .hero11-callout-num,
          .hero12-callout-num { font-size: 12px; }
          .hero12-cap { font-size: 12px; }
        }

        /* Text-shadow on H1 + description — the video sits behind these
           rows. A soft dark halo behind each glyph keeps them legible
           against whatever frame of the rotation is showing, without
           needing a heavy darkening veil over the whole plane area. */
        .hero7ed-headline h1 {
          text-shadow: 0 1px 16px rgba(0, 0, 0, 0.85), 0 0 3px rgba(0, 0, 0, 0.7);
        }
        .hero7ed-desc {
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.85), 0 0 2px rgba(0, 0, 0, 0.6);
        }

        /* Bottom row — description left, buttons right. Breathing room
           above the stats row so the bottom doesn't feel jammed. */
        .hero7ed-credits {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 48px;
          margin-bottom: 48px;
          z-index: 3;
        }
        .hero7ed-desc {
          line-height: 1.55;
          color: var(--ink-2);
          max-width: 56ch;
          margin: 0;
          flex: 1 1 auto;
          font-size: 17px;
        }
        .hero7ed-ctas {
          display: flex;
          gap: 10px;
          flex: 0 0 auto;
        }

        /* Slider — right stack pairs nav arrows above the CTA buttons.
           Arrows are ABSOLUTELY positioned above the buttons via
           bottom:100% so they don't contribute to the right-stack's
           layout height. The right-stack's natural height = the
           buttons' height; the description bottom-aligns with the
           buttons bottom and the H1→description gap stays tight. */
        .hero7ed-right-stack {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex: 0 0 auto;
        }
        .hero7ed-nav {
          position: absolute;
          bottom: 100%;
          right: 0;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hero7ed-nav-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid var(--line-2);
          background: transparent;
          color: var(--ink-2);
          cursor: pointer;
          border-radius: 4px;
          padding: 0;
          transition: border-color 160ms ease, color 160ms ease, background 160ms ease;
        }
        .hero7ed-nav-btn:hover {
          border-color: var(--ink-2);
          color: var(--ink);
          background: rgba(255, 255, 255, 0.05);
        }
        .hero7ed-nav-btn:active { transform: translateY(1px); }
        .hero7ed-nav-counter {
          font-size: 12px;
          letter-spacing: 0.16em;
          color: var(--ink-3);
          min-width: 4.5em;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }

        /* Stats row */
        .hero7ed-stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          border-top: 1px solid var(--line);
          padding-top: 28px;
          padding-bottom: 40px;
          position: relative;
          z-index: 3;
        }

        @media (max-width: 720px) {
          .hero7ed-headline h1 { white-space: normal !important; }
        }
        @media (max-width: 1100px) {
          .hero7ed-headline h1 { max-width: 70%; }
          .hero7ed-desc { max-width: 44ch; }
        }
        @media (max-width: 820px) {
          .hero7ed-credits {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 24px;
          }
          .hero7ed-desc { max-width: 100%; }
        }
      `}</style>
    </section>
  );
};

/* Swap Hero3 with Hero7Editorial on home11, home12, home13, and home14. */
if (typeof window !== "undefined" && (window.__PENTECON_PAGE === "home11" || window.__PENTECON_PAGE === "home12" || window.__PENTECON_PAGE === "home13" || window.__PENTECON_PAGE === "home14")) {
  window.Hero3 = Hero7Editorial;
}
window.Hero7Editorial = Hero7Editorial;
