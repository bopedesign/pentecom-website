/* eslint-disable */
import React, { useState as useStateSH1 } from 'react';
import { IsoCube, IsoStage, IsoFloor, iso } from '../Iso.jsx';

/* eslint-disable */
/* SolutionsHome1 — extracted from page-2.jsx so home14 can mount the Home 1
   sidebar-tabs Solutions section inside the home13 chrome without pulling
   in the rest of Home 1's globals.

   Renders the same content + iso visuals as the Home 1 version. Depends on:
     - IsoStage / IsoCube / IsoFloor (from iso.jsx — must load first)
     - CSS tokens: --dark, --dark-text, --dark-text-2, --dark-text-3,
       --dark-line, --accent-light (provided by home14.html)
     - utility classes: .sec-dark, .dotted-floor, .mono, .btn, .container
*/


/* =========================================================================
   ISO HELPERS \u2014 IsoDoc + IsoArrow extend the iso.jsx vocabulary so the
   solutions whose story is about documents (Technical Document Standards,
   Technical Writing & Illustrations) and flow (Conversion, Lifecycle
   Acquisition, Automation) can be drawn in the same iso projection +
   blue palette as the cubes. Same projection math (COS30/SIN30), same
   stroke language, so docs and arrows aesthetically belong with the cubes.
   ========================================================================= */
const _COS30 = 0.8660254;
const _SIN30 = 0.5;
const _iso = (x, y, z) => [(x - y) * _COS30, (x + y) * _SIN30 - z];

/* IsoDoc \u2014 a flat iso "page" with horizontal text lines on its surface.
   Stacked or composed alongside cubes to convey documents/standards. */
const IsoDoc = ({ x = 0, y = 0, z = 0, w = 2, h = 1.4, palette = "blue", opacity = 1, lines = 5 }) => {
  const c1 = _iso(x, y, z);
  const c2 = _iso(x + w, y, z);
  const c3 = _iso(x + w, y + h, z);
  const c4 = _iso(x, y + h, z);
  const palettes = {
    blue:    { fill: "#3a5fbd",     stroke: "#203263",                line: "rgba(255,255,255,0.5)"  },
    outline: { fill: "transparent", stroke: "rgba(255,255,255,0.4)",  line: "rgba(255,255,255,0.32)" },
  };
  const p = palettes[palette] || palettes.blue;

  // Text lines \u2014 varying widths so they read as natural prose
  const lineWidths = [0.85, 0.7, 0.92, 0.6, 0.78, 0.5, 0.85];
  const margin = 0.15;
  const innerH = h - 2 * margin;
  const lineSpace = innerH / (lines + 1);
  const lineList = [];
  for (let i = 0; i < lines; i++) {
    const ly = y + margin + lineSpace * (i + 1);
    const lw = (lineWidths[i % lineWidths.length]) * (w - 2 * margin);
    const a = _iso(x + margin, ly, z);
    const b = _iso(x + margin + lw, ly, z);
    lineList.push(
      <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
        stroke={p.line} strokeWidth="0.03" strokeLinecap="round" />
    );
  }

  return (
    <g opacity={opacity}>
      <polygon
        points={`${c1.join(",")} ${c2.join(",")} ${c3.join(",")} ${c4.join(",")}`}
        fill={p.fill} stroke={p.stroke} strokeWidth="0.012" strokeLinejoin="round"
      />
      {lineList}
    </g>
  );
};

/* IsoArrow \u2014 directional arrow in iso projection. Direction "+x" points
   along the iso x-axis (right-and-back in screen space), "+y" along the
   y-axis (left-and-back). palette: "accent" (brand blue) or "outline"
   (faint white). */
/* Arrow rebuilt as polygons (thin shaft + triangle head) so it shares
   the cube/doc vocabulary: same stroke weight (0.025), same blue
   palette, no round line caps. Reads like a flat iso sign on the
   ground plane rather than a stroked line. */
const IsoArrow = ({ x = 0, y = 0, z = 0, length = 1.0, direction = "+x", palette = "blue", opacity = 1 }) => {
  const isX = direction === "+x";
  const shaftW = 0.32;
  const headL  = 0.6;
  const headW  = 0.7;
  const t      = 0.22;
  const shaftL = Math.max(0, length - headL);
  const p3 = (px, py, pz) => _iso(px, py, pz);
  const ptStr = (pts) => pts.map(pt => pt.join(",")).join(" ");

  let topPts;
  if (isX) {
    topPts = [
      p3(x,            y - shaftW / 2, z + t),
      p3(x + shaftL,   y - shaftW / 2, z + t),
      p3(x + shaftL,   y - headW / 2,  z + t),
      p3(x + length,   y,              z + t),
      p3(x + shaftL,   y + headW / 2,  z + t),
      p3(x + shaftL,   y + shaftW / 2, z + t),
      p3(x,            y + shaftW / 2, z + t),
    ];
  } else {
    topPts = [
      p3(x - shaftW / 2, y,              z + t),
      p3(x - shaftW / 2, y + shaftL,     z + t),
      p3(x - headW / 2,  y + shaftL,     z + t),
      p3(x,              y + length,     z + t),
      p3(x + headW / 2,  y + shaftL,     z + t),
      p3(x + shaftW / 2, y + shaftL,     z + t),
      p3(x + shaftW / 2, y,              z + t),
    ];
  }

  // Visible side faces — same visibility rule cubes use (normals with a
  // positive component in the iso viewing direction). For +x arrows these
  // are: shaft back strip, shoulder step at x=shaftL, head back-diagonal.
  let sides = [];
  if (isX) {
    sides = [
      // shaft back (y = +shaftW/2)
      [ p3(x,           y + shaftW / 2, z + t),
        p3(x + shaftL,  y + shaftW / 2, z + t),
        p3(x + shaftL,  y + shaftW / 2, z),
        p3(x,           y + shaftW / 2, z) ],
      // shoulder step at x=shaftL
      [ p3(x + shaftL,  y + headW / 2,  z + t),
        p3(x + shaftL,  y + shaftW / 2, z + t),
        p3(x + shaftL,  y + shaftW / 2, z),
        p3(x + shaftL,  y + headW / 2,  z) ],
      // head back-diagonal
      [ p3(x + length,  y,              z + t),
        p3(x + shaftL,  y + headW / 2,  z + t),
        p3(x + shaftL,  y + headW / 2,  z),
        p3(x + length,  y,              z) ],
    ];
  } else {
    sides = [
      [ p3(x + shaftW / 2, y,              z + t),
        p3(x + shaftW / 2, y + shaftL,     z + t),
        p3(x + shaftW / 2, y + shaftL,     z),
        p3(x + shaftW / 2, y,              z) ],
      [ p3(x + headW / 2,  y + shaftL,     z + t),
        p3(x + shaftW / 2, y + shaftL,     z + t),
        p3(x + shaftW / 2, y + shaftL,     z),
        p3(x + headW / 2,  y + shaftL,     z) ],
      [ p3(x,              y + length,     z + t),
        p3(x + headW / 2,  y + shaftL,     z + t),
        p3(x + headW / 2,  y + shaftL,     z),
        p3(x,              y + length,     z) ],
    ];
  }

  // Same palette tints IsoCube uses — top brighter, sides darker — so
  // the arrow reads as a 3D block in the same scene as the cubes.
  const palettes = {
    blue:    { top: "#3a5fbd",     side: "#2f4d9e",     stroke: "none" },
    outline: { top: "transparent", side: "transparent", stroke: "rgba(255,255,255,0.4)" },
  };
  const p = palettes[palette] || palettes.blue;

  return (
    <g opacity={opacity}>
      {sides.map((sd, i) => (
        <polygon key={i} points={ptStr(sd)} fill={p.side} stroke={p.stroke} strokeWidth="0.012" strokeLinejoin="round" />
      ))}
      <polygon points={ptStr(topPts)} fill={p.top} stroke={p.stroke} strokeWidth="0.012" strokeLinejoin="round" />
    </g>
  );
};

/* Mini iso icons — one per solution. Renders its own cube faces with a
   higher-contrast palette tuned for small-scale legibility on black:
     - Outline cubes use white strokes at 65% alpha (vs the 40% in iso.jsx)
     - Filled cubes use a lifted blue palette (light top, mid left, dark
       right) so all three faces read distinctly at ~10px each
   Inactive tabs keep full color — the row's text color carries the
   active state. Geometry is hand-tuned per kind to echo the larger
   composition without trying to cram 6 cubes into 40px. */
const SolMiniIcon = ({ kind, active }) => {
  const COS30 = 0.8660254;
  const SIN30 = 0.5;
  const P = (x, y, z) => [(x - y) * COS30, (x + y) * SIN30 - z];
  const pts = (arr) => arr.map(p => p.join(",")).join(" ");

  // Bright palette — readable at 40px on pure black. Active gets a tiny
  // luminance bump; inactive still uses the full palette (no opacity
  // dim) so the icon stays legible.
  const blue = active
    ? { top: "#8aa6f2", left: "#5a78d8", right: "#2f4d9e" }
    : { top: "#7596ec", left: "#4d6cc8", right: "#2a4690" };
  const strokeCol = active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)";

  const Cube = ({ x = 0, y = 0, z = 0, s = 1, fill = "outline", opacity = 1 }) => {
    const c000 = P(x,     y,     z    );
    const c100 = P(x + s, y,     z    );
    const c010 = P(x,     y + s, z    );
    const c110 = P(x + s, y + s, z    );
    const c001 = P(x,     y,     z + s);
    const c101 = P(x + s, y,     z + s);
    const c011 = P(x,     y + s, z + s);
    const c111 = P(x + s, y + s, z + s);
    const top   = [c001, c101, c111, c011];
    const left  = [c010, c110, c111, c011];
    const right = [c100, c110, c111, c101];
    const isFill = fill === "blue";
    const fillTop   = isFill ? blue.top   : "none";
    const fillLeft  = isFill ? blue.left  : "none";
    const fillRight = isFill ? blue.right : "none";
    return (
      <g opacity={opacity}>
        <polygon points={pts(top)}   fill={fillTop}   stroke={strokeCol} strokeWidth="0.13" strokeLinejoin="round" />
        <polygon points={pts(left)}  fill={fillLeft}  stroke={strokeCol} strokeWidth="0.13" strokeLinejoin="round" />
        <polygon points={pts(right)} fill={fillRight} stroke={strokeCol} strokeWidth="0.13" strokeLinejoin="round" />
      </g>
    );
  };

  // Simplified compositions — ALL share the same viewBox so a unit cube
   // renders at the exact same pixel size in every icon. Each composition
   // sits within ±3.5 horizontal and roughly -2.6 to 1.8 vertical, with
   // padding so nothing reaches the icon edge. Patterned after the
   // Managed Data Services (timeline) silhouette — the user's reference.
  const COMMON_VB = "-3.6 -2.8 7.2 4.6";
  const compositions = {
    // 01 — pipeline (3 cubes, last accent)
    pipeline: { cubes: [
      { x: -2.4, y: -0.5, z: 0, s: 1, fill: "outline" },
      { x: -0.5, y: -0.5, z: 0, s: 1, fill: "outline" },
      { x:  1.4, y: -0.5, z: 0, s: 1, fill: "blue"    },
    ]},
    // 02 — vertical stack (2 cubes — simplified from 3 so the top doesn't
    // clip on the common viewBox)
    stack: { cubes: [
      { x: -0.5, y: -0.5, z: 0,    s: 1, fill: "blue" },
      { x: -0.5, y: -0.5, z: 1.05, s: 1, fill: "blue", opacity: 0.85 },
    ]},
    // 03 — core + 2 outline branches (pulled in so they fit)
    branches: { cubes: [
      { x: -0.5, y: -0.5, z: 0.4, s: 1, fill: "blue"    },
      { x: -2.2, y: -0.5, z: 0,   s: 0.8, fill: "outline" },
      { x:  1.4, y: -0.5, z: 0,   s: 0.8, fill: "outline" },
    ]},
    // 04 — short row, last accent
    grid: { cubes: [
      { x: -2.4, y: -0.5, z: 0, s: 1, fill: "outline" },
      { x: -0.5, y: -0.5, z: 0, s: 1, fill: "outline" },
      { x:  1.4, y: -0.5, z: 0, s: 1, fill: "blue"    },
    ]},
    // 05 — bars: 3 columns, middle is the tall accent
    bars: { cubes: [
      { x: -2.4, y: -0.5, z: 0,    s: 1, fill: "outline" },
      { x: -0.5, y: -0.5, z: 0,    s: 1, fill: "blue"    },
      { x: -0.5, y: -0.5, z: 1.05, s: 1, fill: "blue", opacity: 0.7 },
      { x:  1.4, y: -0.5, z: 0,    s: 1, fill: "outline" },
    ]},
    // 06 — hub + 2 outline satellites (satellites pulled in to fit)
    hub: { cubes: [
      { x: -0.5, y: -0.5, z: 0, s: 1, fill: "blue" },
      { x: -2.2, y:  0.2, z: 0, s: 0.6, fill: "outline" },
      { x:  1.6, y: -0.5, z: 0, s: 0.6, fill: "outline" },
    ]},
    // 07 — timeline (Managed Data Services — the user's reference shape)
    timeline: { cubes: [
      { x: -2.4, y: -0.5, z: 0,    s: 1, fill: "outline" },
      { x: -0.5, y: -0.5, z: 0,    s: 1, fill: "blue"    },
      { x: -0.5, y: -0.5, z: 1.05, s: 1, fill: "blue", opacity: 0.7 },
      { x:  1.4, y: -0.5, z: 0,    s: 1, fill: "outline" },
    ]},
    // 08 — staircase: 3 cubes at increasing z
    staircase: { cubes: [
      { x: -2.4, y: -0.5, z: 0,   s: 1, fill: "outline" },
      { x: -0.7, y: -0.5, z: 0.5, s: 1, fill: "outline" },
      { x:  1.0, y: -0.5, z: 1.0, s: 1, fill: "blue"    },
    ]},
  };
  const comp = compositions[kind] || compositions.pipeline;

  // Back-to-front render so face overlaps look right.
  const ordered = [...comp.cubes]
    .map((c, i) => ({ ...c, _i: i }))
    .sort((a, b) => (a.y + a.x + a.z) - (b.y + b.x + b.z));

  return (
    <svg
      width="64"
      height="48"
      viewBox={COMMON_VB}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      {ordered.map(c => <Cube key={c._i} {...c} />)}
    </svg>
  );
};

/* SOLUTIONS_H1 — source of truth is the SOLUTIONS_MEGA_3 list in page-3.jsx
   (the nav mega menu). Names + descriptions match that list verbatim or
   expand its single-sentence summary. Each iso composition is chosen to
   tell a metaphor-appropriate story:
     stack       layered standards
     pipeline    legacy → modern migration
     grid        repeatable parallel automation units
     branches    central doc + illustrated outputs
     hub         audit subject + verification perspectives
     timeline    program phases RFP → sustainment
     staircase   progressive consulting engagement / expertise
     bars        curriculum tiers / learning levels */
const SOLUTIONS_H1 = [
  {
    num: "01", name: "Technical Document Standards", kind: "stack", megaIcon: "standards", href: "#",
    desc: "S1000D, MIL-SPEC, and ATA standards",
    body: "S1000D, MIL-SPEC, ATA. Authoring and lifecycle compliance for technical data that has to pass program-office review on first delivery.",
    iso: () => (
      <IsoStage viewBox="-4 -2.95 8 5">
        <IsoFloor size={4} density={0.5} />
        {/* 3 stacked iso documents — outline lineage underneath, the
            current standard (blue) on top. */}
        <IsoDoc x={-1.4} y={-1.0} z={0}    w={2.8} h={2.0} palette="outline" lines={0} />
        <IsoDoc x={-1.4} y={-1.0} z={0.45} w={2.8} h={2.0} palette="outline" lines={0} />
        <IsoDoc x={-1.4} y={-1.0} z={0.90} w={2.8} h={2.0} palette="blue"    lines={6} />
      </IsoStage>
    ),
  },
  {
    num: "02", name: "Conversion", kind: "pipeline", megaIcon: "conversion", href: "#",
    desc: "Schema-aware migration to modern formats",
    body: "Legacy formats to S1000D, XML, JSON. Schema-aware migration with mapping, lineage, and verification — your data arrives auditable, not just converted.",
    iso: () => (
      <IsoStage viewBox="-4 -2.5 8 5">
        <IsoFloor size={4.5} density={0.5} />
        {/* Source doc on the left, arrow of transformation, target doc
            on the right. The story told as documents converted, not cubes
            scattered along a line. Compact and centered around origin. */}
        <IsoDoc x={-2.0} y={-0.7} z={0} w={1.4} h={1.4} palette="outline" lines={4} />
        <IsoArrow x={-0.4} y={0} z={0.05} length={0.9} direction="+x" palette="blue" />
        <IsoDoc x={0.6}  y={-0.7} z={0} w={1.4} h={1.4} palette="blue"    lines={4} />
      </IsoStage>
    ),
  },
  {
    num: "03", name: "Automation", kind: "grid", megaIcon: "automation", href: "#",
    desc: "Validation suites and repeatable pipelines",
    body: "Validation suites, schema mapping, and repeatable pipelines so the same checks run on every commit, every delivery, every audit cycle.",
    iso: () => (
      <IsoStage viewBox="-3.75 -3.05 8 5">
        <IsoFloor size={4} density={0.5} />
        {/* Three parallel lanes of identical units — same pipeline
            replicated, each driven by the same arrow on the right. */}
        {[-1.2, 0.0, 1.2].map((y, ri) => (
          <React.Fragment key={ri}>
            <IsoCube x={-2.2} y={y - 0.35} z={0} size={0.7} palette="outline" />
            <IsoCube x={-1.1} y={y - 0.35} z={0} size={0.7} palette={ri === 1 ? "blue" : "outline"} />
            <IsoArrow x={0.0} y={y} z={0.35} length={1.4} direction="+x"
              palette={ri === 1 ? "blue" : "outline"}
              opacity={ri === 1 ? 1 : 0.55} />
          </React.Fragment>
        ))}
      </IsoStage>
    ),
  },
  {
    num: "04", name: "Technical Writing & Illustrations", kind: "branches", megaIcon: "writing", href: "#",
    desc: "Engineering docs and isometric vector artwork",
    body: "Engineering-grade docs and isometric vector artwork drawn by people who understand the system, not just the page count.",
    iso: () => (
      <IsoStage viewBox="-4 -2.5 8 5">
        <IsoFloor size={4} density={0.5} />
        {/* Pentecom doc (blue page, text lines) with two iso illustration
            sketches drawn on its surface as outline cubes — the writing
            AND the iso artwork live on the same page. Cubes positioned
            diagonally on the doc to balance visual mass around its center. */}
        <IsoDoc x={-1.6} y={-1.2} z={0} w={3.2} h={2.4} palette="blue" lines={3} />
        <IsoCube x={-0.9} y={-0.55} z={0.001} size={0.55} palette="outline" />
        <IsoCube x={0.35} y={0.0}   z={0.001} size={0.55} palette="outline" />
      </IsoStage>
    ),
  },
  {
    num: "05", name: "Auditing & Quality Assurance", kind: "hub", megaIcon: "audit", href: "#",
    desc: "Evidence-first independent reviews",
    body: "Evidence-first reviews that auditors accept on first pass. Written findings, defensible methodology, no surprises in the closing meeting.",
    iso: () => (
      <IsoStage viewBox="-4 -2.625 8 5">
        <IsoFloor size={4.5} density={0.5} />
        {/* The audit report (a big doc on the ground) with the subject
            of audit (blue cube) resting on top of it. Story: subject sits
            on a foundation of evidence. Centered around origin. */}
        <IsoDoc  x={-1.5} y={-1.0} z={0}     w={3.0} h={2.0} palette="outline" lines={6} />
        <IsoCube x={-0.5} y={-0.5} z={0.001} size={1.0} palette="blue" />
      </IsoStage>
    ),
  },
  {
    num: "06", name: "Lifecycle Acquisition", kind: "timeline", megaIcon: "lifecycle", href: "#",
    desc: "RFP through sustainment support",
    body: "Programs supported from RFP through sustainment. Independent assessments, capture support, and steady hands on long contracts.",
    iso: () => (
      <IsoStage viewBox="-4 -2.9 8 5">
        <IsoFloor size={4.5} density={0.5} />
        {/* 5 phases in a horizontal timeline — RFP through sustainment.
            The middle phase (current engagement) is blue; the rest in
            outline. Cubes positioned symmetrically around origin. */}
        {[-2.4, -1.4, -0.4, 0.6, 1.6].map((x, i) => (
          <IsoCube key={i} x={x} y={-0.4} z={0} size={0.8} palette={i === 2 ? "blue" : "outline"} />
        ))}
      </IsoStage>
    ),
  },
  {
    num: "07", name: "Consulting", kind: "staircase", megaIcon: "consulting", href: "consulting.html",
    desc: "Senior engineers on retainer",
    body: "Senior engineers on retainer. Scoped, written advice from people who have shipped what you're trying to ship.",
    iso: () => (
      <IsoStage viewBox="-4 -2.5 8 5">
        <IsoFloor size={4.5} density={0.5} />
        {/* Two cubes, equal size, side by side — the consultant + the
            client, working together. Blue = Pentecom's expertise,
            outline = the team being advised. */}
        <IsoCube x={-1.3} y={-0.6} z={0} size={1.2} palette="blue" />
        <IsoCube x={0.1}  y={-0.6} z={0} size={1.2} palette="outline" />
      </IsoStage>
    ),
  },
  {
    num: "08", name: "University of Pentecom", kind: "bars", megaIcon: "university", href: "#",
    desc: "Hands-on training programs",
    body: "Hands-on training in standards, tooling, and audit. Curriculum built from real engagements, not slide-deck theory.",
    iso: () => (
      <IsoStage viewBox="-4 -2.5 8 5">
        <IsoFloor size={4.5} density={0.5} />
        {/* Three curriculum docs side by side — standards, tooling, audit.
            The middle (current subject) is blue; flanking docs in outline. */}
        <IsoDoc x={-3.0}  y={-0.9} z={0} w={1.7} h={1.8} palette="outline" lines={4} />
        <IsoDoc x={-0.85} y={-0.9} z={0} w={1.7} h={1.8} palette="blue"    lines={4} />
        <IsoDoc x={1.3}   y={-0.9} z={0} w={1.7} h={1.8} palette="outline" lines={4} />
      </IsoStage>
    ),
  },
];

const SolutionsHome1 = () => {
  const [active, setActive] = useStateSH1(0);
  const s = SOLUTIONS_H1[active];
  return (
    <section id="solutions" className="sec-dark dotted-floor" style={{ padding: "120px 0" }}>
      {/* Shared gradient defs for the SolutionIcon3 family — mirrored from
         page-3.jsx's Solutions3 so the mega-menu icons can resolve their
         url(#g-sol-*) references when used inside this section.
         Range tightened entirely within the bright/lifted-navy zone so
         even small rects (which sample the dark end of the gradient by
         position) read clearly against the pure-black + dotted-floor
         surface of home14, while still feeling subtle — not pure white. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="g-sol-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#bccff8" />
            <stop offset="100%" stopColor="#7d9aef" />
          </linearGradient>
          <linearGradient id="g-sol-soft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#d2def8" />
            <stop offset="100%" stopColor="#9ab2f3" />
          </linearGradient>
        </defs>
      </svg>
      <div className="container">
        <div className="solutions-grid-h1" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24, alignItems: "start" }}>
          {/* sidebar — tab links. "Solutions" H2 labels the list and shares
             a baseline with the right column's active solution H3, so the
             two columns read as parallel header rows: menu / detail.
             12-col grid: sidebar occupies cols 1–4, leaving col 5 as a
             generous editorial gutter before the right column. */}
          <div style={{ gridColumn: "1 / 5" }}>
            <h2 style={{
              /* Section H2 — stays inside the page's --fs-h2 range (30-44px)
                 so this section's title sits at the same scale as every
                 other section header on the page. Hierarchy vs the active
                 item's H3 (32/500) comes from WEIGHT contrast (300 vs 500),
                 not from breaking out of the type system. */
              fontSize: "var(--fs-h2)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              margin: "0 0 24px",
              color: "var(--dark-text)",
            }}>
              Solutions
            </h2>
            <div style={{ borderTop: "1px solid var(--dark-line)" }}>
            {SOLUTIONS_H1.map((sol, i) => (
              <a
                key={sol.num}
                href={sol.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={i === active ? "true" : undefined}
                className="sol-tab-h1"
                data-active={i === active ? "true" : "false"}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "10px 0",
                  borderBottom: "1px solid var(--dark-line)",
                  background: "transparent",
                  color: i === active ? "var(--dark-text)" : "var(--dark-text-3)",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "-0.005em",
                  textDecoration: "none",
                  transition: "color 200ms ease",
                  position: "relative",
                }}
              >
                <span style={{ width: 72, display: "inline-flex", justifyContent: "center", flexShrink: 0 }}>
                  {typeof SolutionIcon3 === "function"
                    ? <SolutionIcon3 kind={sol.megaIcon} size={44} opacity={i === active ? 1 : 0.5} />
                    : <SolMiniIcon kind={sol.kind} active={i === active} />}
                </span>
                <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                  <span className="sol-tab-h1-name">{sol.name}</span>
                  <span className="sol-tab-h1-desc" style={{ fontSize: 13, color: "var(--dark-text-2)", lineHeight: 1.4, fontWeight: 400 }}>{sol.desc}</span>
                </span>
                <span
                  className="sol-tab-h1-arrow"
                  aria-hidden="true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: 18,
                    lineHeight: 1,
                    color: "var(--dark-text)",
                  }}
                >→</span>
              </a>
            ))}
            </div>
          </div>

          {/* content panel — right column spans cols 6–12, leaving col 5
             as an empty gutter so the iso reaches the container's right
             edge with the body text capped at a comfortable measure. */}
          <div key={active} style={{ display: "flex", flexDirection: "column", paddingTop: 6, gridColumn: "6 / 13" }}>
            {/* Active solution title — 24/500 sits clearly subordinate to
               the 44/300 section H2 on the left (size + weight contrast
               does the hierarchy work). */}
            <h3 style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.2, margin: "0 0 14px", maxWidth: "34ch" }}>
              {s.name}
            </h3>
            <p style={{ fontSize: 17, color: "var(--dark-text-2)", lineHeight: 1.55, margin: "0 0 24px", maxWidth: "62ch" }}>
              {s.body}
            </p>
            <div style={{ position: "relative", marginTop: 8 }}>
              {s.iso()}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1300px) {
          .solutions-grid-h1 { grid-template-columns: 1fr !important; gap: 32px !important; }
          .solutions-grid-h1 > * { grid-column: 1 / -1 !important; }
        }
        /* Slide-out arrow on the right of each tab. Hidden + nudged left
           by default; on hover or when active it fades in and slides to
           its resting position. Signals clickability without adding
           permanent visual weight. */
        .sol-tab-h1-arrow {
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 200ms ease, transform 200ms ease;
          pointer-events: none;
        }
        .sol-tab-h1[data-active="true"] .sol-tab-h1-arrow,
        .sol-tab-h1:hover .sol-tab-h1-arrow,
        .sol-tab-h1:focus-visible .sol-tab-h1-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </section>
  );
};

export default SolutionsHome1;
