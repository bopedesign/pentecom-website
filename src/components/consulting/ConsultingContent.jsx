/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { useInView3 } from '../home/HomeSectionsA.jsx';
import { IsoCube, IsoStage, IsoFloor, iso } from '../Iso.jsx';

const useInViewC = () => { useInView3(); };

/* =========================================================================
   Shared visual primitives — used across sections to keep the
   specimen language consistent.
   ========================================================================= */

/* DataFieldArtifact — the hairline-rows-with-scan-band motif from the
   home13 Contact section. Used in the hero and the CTA at scale. */
const DataFieldArtifact = ({ rows = 56, animate = true, idSuffix = "" }) => {
  const sId = `dfScan${idSuffix}`;
  const fId = `dfFade${idSuffix}`;
  const mId = `dfFadeMask${idSuffix}`;
  return (
    <svg viewBox="0 0 480 540" preserveAspectRatio="xMidYMid meet" className="dfa-svg">
      <defs>
        <linearGradient id={sId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="hsl(215 70% 60%)" stopOpacity="0" />
          <stop offset="45%" stopColor="hsl(215 70% 60%)" stopOpacity="0.5" />
          <stop offset="55%" stopColor="hsl(195 65% 60%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(195 65% 60%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={fId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="var(--ink)" stopOpacity="0" />
          <stop offset="12%"  stopColor="var(--ink)" stopOpacity="1" />
          <stop offset="88%"  stopColor="var(--ink)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--ink)" stopOpacity="0" />
        </linearGradient>
        <mask id={mId}>
          <rect x="0" y="0" width="480" height="540" fill={`url(#${fId})`} />
        </mask>
      </defs>
      <g stroke="currentColor" strokeWidth="1" opacity="0.06">
        <line x1="60"  y1="20" x2="60"  y2="520" />
        <line x1="240" y1="20" x2="240" y2="520" />
        <line x1="420" y1="20" x2="420" y2="520" />
      </g>
      <g mask={`url(#${mId})`} stroke="currentColor" strokeWidth="1" strokeLinecap="square">
        {Array.from({ length: rows }).map((_, i) => {
          const seed = (i * 9301 + 49297) % 233280;
          const r1 = seed / 233280;
          const r2 = ((i * 7) % 13) / 13;
          const x1 = 60 + r1 * 60;
          const x2 = 420 - r2 * 60;
          const y = 24 + i * 9;
          const op = 0.18 + ((i * 13) % 7) / 30;
          return <line key={i} x1={x1} y1={y} x2={x2} y2={y} opacity={op} />;
        })}
      </g>
      <g fill="currentColor" mask={`url(#${mId})`}>
        {[3, 11, 17, 24, 31, 38, 44, 51].map((i, k) => {
          const xs = [120, 380, 200, 300, 90, 410, 260, 160];
          return <circle key={i} cx={xs[k]} cy={24 + i * 9} r="2" opacity="0.55" />;
        })}
      </g>
      {animate && (
        <g mask={`url(#${mId})`}>
          <rect className="dfa-scan" x="0" y="-80" width="480" height="120" fill={`url(#${sId})`} opacity="0.9" />
        </g>
      )}
      <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35">
        <line x1="240" y1="248" x2="240" y2="292" />
        <line x1="218" y1="270" x2="262" y2="270" />
        <rect x="230" y="260" width="20" height="20" transform="rotate(45 240 270)" />
      </g>
      <circle cx="240" cy="270" r="3" fill="currentColor" opacity="0.7" />
    </svg>
  );
};

/* SpecimenFrame — a generic hairline-bordered card with a mono header
   strip and an optional mono footer strip. Children render between
   them. Used as the chrome for every specimen visual on this page. */
const SpecimenFrame = ({ headerLeft, headerRight, footerLeft, footerRight, children, className = "", style = {} }) => (
  <div className={`specimen-frame ${className}`} style={style}>
    {(headerLeft || headerRight) && (
      <div className="specimen-header">
        <span className="mono">{headerLeft}</span>
        {headerRight && <span className="mono specimen-header-right">{headerRight}</span>}
      </div>
    )}
    <div className="specimen-body">{children}</div>
    {(footerLeft || footerRight) && (
      <div className="specimen-footer">
        <span className="mono">{footerLeft}</span>
        {footerRight && <span className="mono specimen-footer-right">{footerRight}</span>}
      </div>
    )}
  </div>
);

/* Page-level shared styles for the specimen vocabulary. */
const ConsultingSharedStyles = () => (
  <style>{`
    .dfa-svg { display: block; width: 100%; height: 100%; color: var(--ink); }
    .dfa-scan { animation: dfaScanMove 7s cubic-bezier(.45,.05,.55,.95) infinite; }
    @keyframes dfaScanMove {
      0%   { transform: translateY(0); opacity: 0; }
      12%  { opacity: 1; }
      88%  { opacity: 1; }
      100% { transform: translateY(540px); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dfa-scan { animation: none; opacity: 0; }
    }

    /* Specimen frame — shared chrome */
    .specimen-frame {
      border: 1px solid var(--line);
      background: var(--bg-2);
      display: flex;
      flex-direction: column;
      border-radius: 2px;
      overflow: hidden;
    }
    .specimen-header,
    .specimen-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      gap: 12px;
      color: var(--ink-3);
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    .specimen-header {
      border-bottom: 1px solid var(--line);
      background: rgba(255,255,255,0.015);
    }
    .specimen-footer {
      border-top: 1px solid var(--line);
    }
    .specimen-header .mono,
    .specimen-footer .mono {
      color: var(--ink-2);
    }
    .specimen-body { flex: 1; }
  `}</style>
);

/* =========================================================================
   1. CONSULTING HERO — iso-cube consulting motif.
   Mirrors the "Consulting" tile from the home14 Solutions section
   (two cubes — Pentecom blue + outline client — side by side on a
   dotted iso floor) so users recognize the visual handshake when
   they land here from the home page. The graphic is scaled up and
   given hairline scaffolding + a mono caption layer so it reads as
   an editorial diagram, not a thumbnail.
   ========================================================================= */

/* ConsultingHeroArtifact — large iso composition. Two equal cubes
   (Pentecom-blue + outline) sitting on an iso dotted floor with
   hairline guides and mono labels: the "expert" cube and the "team"
   cube, working together. Same iso primitives as solutions-home1.
   Each layer drifts in from an offset on load, then settles into a
   gentle continuous float — the cubes never come to rest, echoing
   the floating-paper animation used elsewhere in the design system. */
const ConsultingHeroArtifact = () => {
  if (typeof IsoStage !== "function" || typeof IsoCube !== "function" || typeof IsoFloor !== "function") {
    return null;
  }
  return (
    <div className="consulting-hero-iso">
      <IsoStage viewBox="-4 -3 8 5">
        {/* Dotted iso ground plane — same density as solutions-home1
            so the two compositions visually rhyme. Fades in first. */}
        <g className="iso-anim iso-anim-floor">
          <IsoFloor size={5} density={0.45} />
        </g>

        {/* Soft horizon line on the floor. */}
        <g className="iso-anim iso-anim-horizon" stroke="rgba(255,255,255,0.12)" strokeWidth="0.01" fill="none">
          <line x1="-3.6" y1="-0.6" x2="3.6" y2="-0.6" strokeDasharray="0.04 0.06" />
        </g>

        {/* Pentecom — the senior engineer on retainer (blue).
            Drifts in from the upper-left and settles. */}
        <g className="iso-anim iso-anim-cube-blue">
          <IsoCube x={-1.45} y={-0.65} z={0} size={1.3} palette="blue" />
        </g>
        {/* Client team — outline cube. Drifts in from the upper-right. */}
        <g className="iso-anim iso-anim-cube-outline">
          <IsoCube x={0.15}  y={-0.65} z={0} size={1.3} palette="outline" />
        </g>

        {/* Mono labels — drawn inside the SVG so they scale with the
            stage and pin to the cubes regardless of viewport. */}
        <g
          className="iso-anim iso-anim-labels"
          fontFamily="'Geist Mono', 'IBM Plex Mono', monospace"
          fontSize="0.16"
          letterSpacing="0.03"
          fill="rgba(255,255,255,0.6)"
        >
          <text x="-1.45" y="-1.05" textAnchor="middle">▪ PENTECOM</text>
          <text x="0.85" y="-1.05" textAnchor="middle">▪ YOUR&nbsp;TEAM</text>
        </g>

        {/* Tick marks linking the two cubes — like a callout connector
            in a technical diagram. Draws on after the cubes land. */}
        <g className="iso-anim iso-anim-tick" stroke="rgba(125,154,239,0.6)" strokeWidth="0.012" fill="none">
          <line className="iso-tick-line" x1="-0.6" y1="-1.4" x2="0.6" y2="-1.4" strokeDasharray="0.04 0.04" />
        </g>
      </IsoStage>
    </div>
  );
};

const ConsultingHero = () => {
  useInViewC();
  return (
    <section id="hero" style={{ position: "relative", paddingTop: 96, paddingBottom: 112, overflow: "hidden" }}>
      <div className="container">
        <div className="consulting-hero-grid">
          <div className="consulting-hero-copy fade-up">
            <div className="mono consulting-hero-eyebrow">
              <span className="consulting-hero-eyebrow-dot" aria-hidden="true" />
              <span>Solutions / Consulting</span>
            </div>
            <h1 className="mixed-weight" style={{
              fontSize: "clamp(36px, 3.8vw, 60px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.028em",
              margin: "0 0 28px",
              color: "var(--ink)",
              textWrap: "pretty",
            }}>
              You Know Your Business.<br />We Know <em>Tech&nbsp;Pubs</em>.
            </h1>
            <p style={{
              fontSize: 19, color: "var(--ink-2)", lineHeight: 1.5,
              margin: "0 0 36px", maxWidth: "54ch", fontWeight: 400,
            }}>
              Whether it&rsquo;s S1000D-related, conversion planning or analysis or it&rsquo;s time to put your strategy into action, don&rsquo;t struggle through difficult projects alone. We&rsquo;re here to guide and support you.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#contacts" className="btn">Book a scoping call</a>
              <a href="#expertise" className="btn btn-ghost">See areas of expertise</a>
            </div>
          </div>

          <div className="consulting-hero-artifact fade-up" aria-hidden="true">
            <ConsultingHeroArtifact />
          </div>
        </div>
      </div>

      <style>{`
        .consulting-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: center;
          min-height: 560px;
        }
        .consulting-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 26px;
          color: var(--ink-3);
        }
        .consulting-hero-eyebrow-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: var(--pentecon-blue);
          opacity: 0.9;
        }
        .consulting-hero-tagline {
          font-size: 15px;
          line-height: 1.55;
          color: var(--ink-3);
          margin: 0;
          padding-left: 16px;
          border-left: 1px solid var(--line-2);
          max-width: 52ch;
          font-style: italic;
        }
        .consulting-hero-artifact {
          width: 100%;
          color: var(--ink);
          position: relative;
        }
        .consulting-hero-iso {
          width: 100%;
          aspect-ratio: 8 / 5;
          position: relative;
        }
        .consulting-hero-iso svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        /* Iso composition animation — each layer enters from an offset
           and settles. One-shot only: no continuous float, no tick
           pulse. The initial slide-together + label fade IS the move. */
        .iso-anim {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation-fill-mode: forwards;
        }
        .iso-anim-floor        { animation: isoFadeIn 900ms 100ms cubic-bezier(.2,.7,.2,1) forwards; }
        .iso-anim-horizon      { animation: isoFadeIn 700ms 280ms cubic-bezier(.2,.7,.2,1) forwards; }
        .iso-anim-cube-blue    { animation: isoCubeDriftLeft  1100ms 360ms cubic-bezier(.22,.61,.36,1) forwards; }
        .iso-anim-cube-outline { animation: isoCubeDriftRight 1100ms 540ms cubic-bezier(.22,.61,.36,1) forwards; }
        .iso-anim-labels       { animation: isoFadeIn 700ms 1100ms ease-out forwards; }
        .iso-anim-tick         { animation: isoFadeIn 500ms 1200ms ease-out forwards; }
        @keyframes isoFadeIn {
          to { opacity: 1; }
        }
        @keyframes isoCubeDriftLeft {
          0%   { opacity: 0; transform: translate(-0.35px, -0.2px) scale(0.96); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        @keyframes isoCubeDriftRight {
          0%   { opacity: 0; transform: translate(0.35px, -0.2px) scale(0.96); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .iso-anim {
            animation: none !important;
            opacity: 1 !important;
          }
        }
        /* Corner crop marks around the iso composition — a tiny editorial
           touch that frames the diagram like a technical figure. */
        .consulting-hero-artifact::before,
        .consulting-hero-artifact::after {
          content: "";
          position: absolute;
          width: 18px;
          height: 18px;
          border: 1px solid var(--line-2);
          pointer-events: none;
        }
        .consulting-hero-artifact::before {
          top: -6px;
          left: -6px;
          border-right: none;
          border-bottom: none;
        }
        .consulting-hero-artifact::after {
          bottom: -6px;
          right: -6px;
          border-left: none;
          border-top: none;
        }
        @media (max-width: 980px) {
          .consulting-hero-grid {
            grid-template-columns: 1fr;
            gap: 56px;
            min-height: 0;
          }
          .consulting-hero-iso {
            max-width: 560px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   2. CONSULTING TRUST — leadership statement + 2x2 standards bench.
   Each specimen on the bench is a unique abstracted document fragment
   that nods to the actual format of that standard.
   ========================================================================= */

/* Per-standard inner specimen graphics. All hairline-only, all in
   monochrome var(--ink) so they read on the dark surface. */

/* S1000D — data module tree (nested branches). One branch highlighted in blue. */
const SpecimenS1000D = () => (
  <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet" className="standard-spec-svg standard-spec-anim" aria-hidden="true">
    <g stroke="currentColor" fill="none" strokeWidth="1">
      <rect x="14" y="14" width="46" height="14" opacity="0.5" />
      <path d="M 60 21 H 90" opacity="0.4" />
      <path d="M 90 21 V 50"  opacity="0.4" />
      <path d="M 90 21 V 80"  opacity="0.4" />
      <path d="M 90 21 V 110" opacity="0.4" />
      <path d="M 90 50 H 110" opacity="0.4" />
      <path d="M 90 80 H 110" opacity="0.4" />
      <path d="M 90 110 H 110" opacity="0.4" />
      <rect x="110" y="44" width="64" height="12" opacity="0.45" />
      <rect x="110" y="74" width="76" height="12" opacity="0.45" />
      <rect x="110" y="104" width="56" height="12" opacity="0.45" />
    </g>
    <g fill="var(--pentecon-blue)" opacity="0.85">
      <circle cx="62" cy="21" r="1.8" />
      <circle cx="112" cy="80" r="1.8" />
    </g>
    <g stroke="var(--pentecon-blue)" strokeWidth="1.4" fill="none" className="standard-spec-trace">
      <path d="M 60 21 H 90 V 80 H 110" />
    </g>
  </svg>
);

/* ATA — chapter/section table. One row highlighted in blue. */
const SpecimenATA = () => (
  <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet" className="standard-spec-svg standard-spec-anim" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1" opacity="0.35">
      <line x1="14" y1="20" x2="186" y2="20" />
      <line x1="14" y1="40" x2="186" y2="40" />
      <line x1="14" y1="60" x2="186" y2="60" />
      <line x1="14" y1="80" x2="186" y2="80" />
      <line x1="14" y1="100" x2="186" y2="100" />
      <line x1="48" y1="14" x2="48" y2="106" opacity="0.6" />
    </g>
    <rect x="14" y="60" width="172" height="20" fill="var(--pentecon-blue)" opacity="0.12" />
    <g fill="currentColor" fontFamily="monospace" fontSize="11" opacity="0.7" letterSpacing="0.06em">
      <text x="20" y="33">21</text>
      <text x="20" y="53">22</text>
      <text x="20" y="93">24</text>
    </g>
    <g fill="var(--pentecon-blue)" fontFamily="monospace" fontSize="11" letterSpacing="0.06em">
      <text x="20" y="73">23</text>
    </g>
    <g stroke="currentColor" strokeWidth="1" opacity="0.45">
      <line x1="58" y1="30" x2="160" y2="30" />
      <line x1="58" y1="50" x2="148" y2="50" />
      <line x1="58" y1="90" x2="138" y2="90" />
    </g>
    <g stroke="var(--pentecon-blue)" strokeWidth="1" opacity="0.85">
      <line x1="58" y1="70" x2="172" y2="70" />
    </g>
  </svg>
);

/* AIA — policy document (paragraph bars). Heading mark in blue. */
const SpecimenAIA = () => (
  <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet" className="standard-spec-svg standard-spec-anim" aria-hidden="true">
    <g stroke="var(--pentecon-blue)" strokeWidth="1.8" opacity="0.85">
      <line x1="14" y1="18" x2="80"  y2="18" />
    </g>
    <g stroke="currentColor" strokeWidth="1" opacity="0.35">
      <line x1="14" y1="34" x2="186" y2="34" />
      <line x1="14" y1="42" x2="170" y2="42" />
      <line x1="14" y1="50" x2="180" y2="50" />
      <line x1="14" y1="58" x2="124" y2="58" />
      <line x1="14" y1="74" x2="186" y2="74" />
      <line x1="14" y1="82" x2="156" y2="82" />
      <line x1="14" y1="90" x2="172" y2="90" />
      <line x1="14" y1="98" x2="140" y2="98" />
      <line x1="14" y1="106" x2="100" y2="106" />
    </g>
    <g fill="var(--pentecon-blue)" opacity="0.7">
      <rect x="178" y="33" width="3" height="3" />
    </g>
  </svg>
);

/* MIL-SPEC — numbered clauses. One clause number colored. */
const SpecimenMILSPEC = () => (
  <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid meet" className="standard-spec-svg standard-spec-anim" aria-hidden="true">
    <g fill="currentColor" fontFamily="monospace" fontSize="11" opacity="0.7" letterSpacing="0.06em">
      <text x="14" y="22">3.1</text>
      <text x="14" y="70">3.3</text>
      <text x="14" y="94">3.4</text>
    </g>
    <g fill="var(--pentecon-blue)" fontFamily="monospace" fontSize="11" letterSpacing="0.06em">
      <text x="14" y="46">3.2</text>
    </g>
    <g stroke="currentColor" strokeWidth="1" opacity="0.4">
      <line x1="36" y1="20" x2="186" y2="20" />
      <line x1="36" y1="28" x2="160" y2="28" />
      <line x1="36" y1="68" x2="174" y2="68" />
      <line x1="36" y1="76" x2="150" y2="76" />
      <line x1="36" y1="92" x2="186" y2="92" />
      <line x1="36" y1="100" x2="120" y2="100" />
    </g>
    <g stroke="var(--pentecon-blue)" strokeWidth="1" opacity="0.85">
      <line x1="36" y1="44" x2="186" y2="44" />
      <line x1="36" y1="52" x2="140" y2="52" />
    </g>
    <g stroke="currentColor" strokeWidth="1" opacity="0.5">
      <line x1="32" y1="14" x2="32" y2="108" />
    </g>
  </svg>
);

const StandardSpecimen = ({ label, type, kind }) => {
  const renderers = { s1000d: SpecimenS1000D, ata: SpecimenATA, aia: SpecimenAIA, milspec: SpecimenMILSPEC };
  const Renderer = renderers[kind];
  return (
    <SpecimenFrame
      headerLeft={label}
      headerRight={type}
      className="standard-specimen"
    >
      <div className="standard-spec-canvas">
        {Renderer && <Renderer />}
      </div>
    </SpecimenFrame>
  );
};

/* TrustConstellation — abstract connection field. Four families of items
   around the perimeter (expertise, standards, deliverables, industries),
   14 straight chords crossing the interior. The years dimension is
   annotated in the upper-left corner so it stays clear of the chord
   field. Identity (PENTECOM) sits in the surrounding page chrome — not
   repeated here — keeping the center mark minimal. */
const TrustConstellation = () => (
  <div className="trust-constellation">
    <svg viewBox="0 0 760 760" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Faint outer containment ring */}
      <circle cx="380" cy="380" r="320" fill="none" stroke="rgba(234,236,240,0.10)" strokeWidth="1" strokeDasharray="1 5"/>

      {/* Faint chords (10) */}
      <g className="trust-chord-faint" fill="none" stroke="#7d9aef" strokeWidth="1" strokeOpacity="0.5">
        <path d="M 213 181 L 616 270"/>
        <path d="M 291 136 L 636 335"/>
        <path d="M 469 136 L 636 425"/>
        <path d="M 547 181 L 616 490"/>
        <path d="M 616 270 L 547 579"/>
        <path d="M 636 335 L 469 624"/>
        <path d="M 636 425 L 291 624"/>
        <path d="M 616 490 L 213 579"/>
        <path d="M 124 335 L 547 579"/>
        <path d="M 124 425 L 213 579"/>
      </g>

      {/* Primary chords (4) */}
      <g className="trust-chord-primary" fill="none" stroke="#7d9aef" strokeWidth="1.6" strokeOpacity="0.85">
        <path d="M 380 120 L 616 490"/>
        <path d="M 616 270 L 120 380"/>
        <path d="M 636 425 L 144 490"/>
        <path d="M 469 136 L 291 624"/>
      </g>

      {/* Center mark */}
      <circle cx="380" cy="380" r="9" fill="#000"/>
      <circle cx="380" cy="380" r="9" fill="none" stroke="#7d9aef" strokeWidth="1.5"/>
      <circle cx="380" cy="380" r="2.5" fill="#7d9aef"/>

      {/* Corner annotation — years dimension */}
      <g fontFamily="'Geist Mono', monospace" letterSpacing="2.4">
        <line x1="50" y1="64" x2="80" y2="64" stroke="#7d9aef" strokeWidth="1"/>
        <text x="50" y="84"  fontSize="22" fontFamily="'Geist', sans-serif" letterSpacing="-0.5" fontWeight="300" fill="#eaecf0">30 yr</text>
        <text x="50" y="104" fontSize="9" fill="#aab0bb">1995  —  2025</text>
        <text x="50" y="118" fontSize="8" fill="#767c87">FIELD EXPERIENCE</text>
      </g>

      {/* Halos around primary-chord endpoints */}
      <g className="trust-halo" fill="none" stroke="#7d9aef" strokeWidth="1.2" strokeOpacity="0.5">
        <circle cx="380" cy="120" r="10"/>
        <circle cx="616" cy="490" r="10"/>
        <circle cx="616" cy="270" r="10"/>
        <circle cx="120" cy="380" r="10"/>
        <circle cx="636" cy="425" r="10"/>
        <circle cx="144" cy="490" r="10"/>
        <circle cx="469" cy="136" r="10"/>
        <circle cx="291" cy="624" r="10"/>
      </g>

      {/* Item dots */}
      <g className="trust-dots" fill="#7d9aef">
        <circle cx="213" cy="181" r="4.5"/>
        <circle cx="291" cy="136" r="4.5"/>
        <circle cx="380" cy="120" r="4.5"/>
        <circle cx="469" cy="136" r="4.5"/>
        <circle cx="547" cy="181" r="4.5"/>
        <circle cx="616" cy="270" r="4.5"/>
        <circle cx="636" cy="335" r="4.5"/>
        <circle cx="636" cy="425" r="4.5"/>
        <circle cx="616" cy="490" r="4.5"/>
        <circle cx="547" cy="579" r="4.5"/>
        <circle cx="469" cy="624" r="4.5"/>
        <circle cx="291" cy="624" r="4.5"/>
        <circle cx="213" cy="579" r="4.5"/>
        <circle cx="144" cy="490" r="4.5"/>
        <circle cx="124" cy="425" r="4.5"/>
        <circle cx="120" cy="380" r="4.5"/>
        <circle cx="124" cy="335" r="4.5"/>
        <circle cx="144" cy="270" r="4.5"/>
      </g>

      {/* Item labels */}
      <g fontFamily="'Geist', sans-serif" fontSize="13" fill="#eaecf0">
        <text x="195" y="166" textAnchor="end">Consulting</text>
        <text x="282" y="116" textAnchor="end">Schema</text>
        <text x="380" y="100" textAnchor="middle" fontWeight="500">Authoring</text>
        <text x="478" y="116" textAnchor="start">Conversion</text>
        <text x="565" y="166" textAnchor="start">Training</text>

        <text x="630" y="270" textAnchor="start" dominantBaseline="middle" fontWeight="500">S1000D</text>
        <text x="650" y="335" textAnchor="start" dominantBaseline="middle">ATA</text>
        <text x="650" y="425" textAnchor="start" dominantBaseline="middle">AIA</text>
        <text x="630" y="490" textAnchor="start" dominantBaseline="middle">MIL-SPEC</text>

        <text x="565" y="595" textAnchor="start" dominantBaseline="hanging">Func. Matrix</text>
        <text x="478" y="643" textAnchor="start" dominantBaseline="hanging">Applicability</text>
        <text x="282" y="643" textAnchor="end" dominantBaseline="hanging">Common Info</text>
        <text x="195" y="595" textAnchor="end" dominantBaseline="hanging">Business Rules</text>

        <text x="128" y="490" textAnchor="end" dominantBaseline="middle">Aviation</text>
        <text x="108" y="425" textAnchor="end" dominantBaseline="middle">Defense</text>
        <text x="104" y="380" textAnchor="end" dominantBaseline="middle">Army</text>
        <text x="108" y="335" textAnchor="end" dominantBaseline="middle">NAVAIR</text>
        <text x="128" y="270" textAnchor="end" dominantBaseline="middle">Commercial</text>
      </g>

      {/* Category headings */}
      <g fontFamily="'Geist Mono', monospace" fontSize="10" letterSpacing="3.5" fill="#aab0bb">
        <text x="380" y="32" textAnchor="middle">{"\u25AA  E X P E R T I S E  \u25AA"}</text>
        <text x="380" y="740" textAnchor="middle">{"\u25AA  D E L I V E R A B L E S  \u25AA"}</text>
        <text transform="translate(744 380) rotate(90)" textAnchor="middle">{"\u25AA  S T A N D A R D S  \u25AA"}</text>
        <text transform="translate(20 380) rotate(-90)" textAnchor="middle">{"\u25AA  I N D U S T R I E S  \u25AA"}</text>
      </g>

      {/* Corner crops */}
      <g stroke="rgba(234,236,240,0.28)" strokeWidth="1" fill="none">
        <path d="M 16 32 L 16 16 L 32 16"/>
        <path d="M 728 16 L 744 16 L 744 32"/>
        <path d="M 16 728 L 16 744 L 32 744"/>
        <path d="M 728 744 L 744 744 L 744 728"/>
      </g>
    </svg>
  </div>
);

const ConsultingTrust = () => {
  useInViewC();
  return (
    <section className="sec-pad" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="consulting-trust-grid">
          <div className="fade-up consulting-trust-copy">
            <div className="mono" style={{ color: "var(--ink-2)", marginBottom: 22 }}>
              Why teams trust us
            </div>
            <p className="consulting-trust-body">
              The Pentecom team has extensive field experience and decades of leadership in <em>S1000D</em>, <em>Air Transport Association (ATA)</em>, <em>Aviation Industries Association (AIA)</em>, and <em>Military-Specifications (MIL-SPEC)</em> standards development. That means you can trust our guidance and trust us with your projects.
            </p>
            <p className="consulting-trust-sub">
              Our team of industry experts support the success of a wide range of military and private sector clients. Our work spans the functionality matrix, applicability, common information repositories, and business rules &mdash; every line in the field is a real intersection of people, programs, and standards.
            </p>
          </div>

          <div className="fade-up consulting-trust-vis" aria-hidden="true">
            <TrustConstellation />
          </div>
        </div>
      </div>

      <style>{`
        .consulting-trust-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 64px;
          align-items: center;
        }
        .consulting-trust-body {
          font-size: clamp(24px, 2.2vw, 32px);
          line-height: 1.35;
          letter-spacing: -0.012em;
          color: var(--ink);
          margin: 0 0 28px;
          font-weight: 300;
          max-width: 36ch;
        }
        .consulting-trust-body em { font-style: normal; font-weight: 500; }
        .consulting-trust-sub {
          font-size: 17px;
          line-height: 1.6;
          color: var(--ink-2);
          margin: 0;
          max-width: 56ch;
        }
        .consulting-trust-vis {
          width: 100%;
          color: var(--ink);
        }
        .trust-constellation {
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 720px;
          margin-left: auto;
        }
        .trust-constellation svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* === Trust constellation animations ============================
           Subtle: chord lines draw in slowly, halos breathe.
           Total wake-up time ~1.8s, then halos loop forever very
           gently. Item dots fade in alongside the chords. */
        .trust-chord-faint path,
        .trust-chord-primary path {
          stroke-dasharray: 720;
          stroke-dashoffset: 720;
          animation: trustChordDraw 2400ms cubic-bezier(0.5, 0, 0.2, 1) forwards;
        }
        .trust-chord-faint path { animation-delay: 200ms; }
        .trust-chord-primary path {
          animation-duration: 1800ms;
          animation-delay: 900ms;
        }
        @keyframes trustChordDraw {
          to { stroke-dashoffset: 0; }
        }
        .trust-halo circle {
          opacity: 0;
          animation: trustHaloFadeIn 800ms 1500ms ease-out forwards,
                     trustHaloBreathe 4500ms 2500ms ease-in-out infinite;
        }
        @keyframes trustHaloFadeIn {
          to { opacity: 0.5; }
        }
        @keyframes trustHaloBreathe {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.65; }
        }
        .trust-dots circle {
          opacity: 0;
          animation: trustDotFadeIn 600ms forwards;
        }
        .trust-dots circle:nth-of-type(1) { animation-delay: 400ms; }
        .trust-dots circle:nth-of-type(2) { animation-delay: 460ms; }
        .trust-dots circle:nth-of-type(3) { animation-delay: 520ms; }
        .trust-dots circle:nth-of-type(4) { animation-delay: 580ms; }
        .trust-dots circle:nth-of-type(5) { animation-delay: 640ms; }
        .trust-dots circle:nth-of-type(6) { animation-delay: 700ms; }
        .trust-dots circle:nth-of-type(7) { animation-delay: 760ms; }
        .trust-dots circle:nth-of-type(8) { animation-delay: 820ms; }
        .trust-dots circle:nth-of-type(9) { animation-delay: 880ms; }
        .trust-dots circle:nth-of-type(10) { animation-delay: 940ms; }
        .trust-dots circle:nth-of-type(11) { animation-delay: 1000ms; }
        .trust-dots circle:nth-of-type(12) { animation-delay: 1060ms; }
        .trust-dots circle:nth-of-type(13) { animation-delay: 1120ms; }
        .trust-dots circle:nth-of-type(14) { animation-delay: 1180ms; }
        .trust-dots circle:nth-of-type(15) { animation-delay: 1240ms; }
        .trust-dots circle:nth-of-type(16) { animation-delay: 1300ms; }
        .trust-dots circle:nth-of-type(17) { animation-delay: 1360ms; }
        .trust-dots circle:nth-of-type(18) { animation-delay: 1420ms; }
        @keyframes trustDotFadeIn {
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-chord-faint path,
          .trust-chord-primary path {
            animation: none;
            stroke-dashoffset: 0;
          }
          .trust-halo circle,
          .trust-dots circle {
            animation: none;
            opacity: 1;
          }
        }
        @media (max-width: 980px) {
          .consulting-trust-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .trust-constellation { max-width: 560px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   3. CONSULTING EXPERTISE — 2 document-index specimens + 7 tile cards.
   The two feature cards are styled as bound "books of standards" with
   a mono header strip, a numbered TOC of sub-standards, and a footer.
   The 7 compact tiles get a tiny corner glyph.
   ========================================================================= */

const EXPERTISE = [
  {
    name: "S1000D Business Rules (BR)",
    type: "Business Rules",
    docId: "BR-001",
    items: [
      "NAVAIR S1000D Technical Manual Business Rules and Information Sets for S1000D Issues 3.0, 4.1, and 6",
      "Army MIL-STD-3031",
      "USAF MIL-STD-3048",
      "ATA Spec 1000BR",
    ],
  },
  {
    name: "U.S. legacy Military Specifications",
    type: "MIL-SPEC",
    docId: "MS-002",
    items: [
      "MIL-STD-40051",
      "MIL-STD-3001",
      "MIL-STD-38784 and subsets",
      "ASD ILS S-Series Suite",
      "MIL-PRF-87269",
    ],
  },
  { name: "ATA i-Spec 2200",                                                                         category: "Industry standard",  visualKey: "ata" },
  { name: "Requirements analysis",                                                                   category: "Discovery",          visualKey: "req" },
  { name: "S1000D Business Rules EXchange (BREX) development",                                       category: "Rule authoring",     visualKey: "brex" },
  { name: "Technical publication-related toolset selection and evaluation",                          category: "Evaluation",         visualKey: "tool" },
  { name: "Data conversion planning",                                                                category: "Migration",          visualKey: "conv" },
  { name: "Document analysis and DTD (Document Type Definition) / schema development and maintenance", category: "Schema design",    visualKey: "dtd" },
  { name: "Technical publication and implementation processes training",                             category: "Enablement",         visualKey: "train" },
];

/* =========================================================================
   Visual specimens for the expertise TILE cards. Each is an abstract
   hairline graphic that signals the nature of the practice without
   claiming any specific client data. All use the same vocabulary:
   hairline geometry + blue accent + monochromatic.
   ========================================================================= */

const VisATA = () => (
  <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet" className="tile-vis-svg tile-vis-ata">
    {/* Hairline maintenance-spec table with one row highlighted */}
    <rect className="ata-active-row" x="20" y="76" width="240" height="22" fill="rgba(125,154,239,0.14)" stroke="#7d9aef" strokeWidth="1"/>
    <line x1="64" y1="20" x2="64" y2="148" stroke="rgba(234,236,240,0.20)" strokeWidth="1"/>
    <g stroke="rgba(234,236,240,0.18)" strokeWidth="1">
      <line x1="20" y1="44" x2="260" y2="44"/>
      <line x1="20" y1="66" x2="260" y2="66"/>
      <line x1="20" y1="108" x2="260" y2="108"/>
      <line x1="20" y1="130" x2="260" y2="130"/>
    </g>
    <g fontFamily="'Geist Mono', monospace" fontSize="10" letterSpacing="1.4" fill="#767c87">
      <text x="42" y="38" textAnchor="middle">01</text>
      <text x="42" y="60" textAnchor="middle">02</text>
      <text x="42" y="91" textAnchor="middle" fill="#7d9aef" fontWeight="500">03</text>
      <text x="42" y="124" textAnchor="middle">04</text>
      <text x="42" y="145" textAnchor="middle">05</text>
    </g>
    <g stroke="rgba(234,236,240,0.42)" strokeWidth="0.9">
      <line x1="78" y1="33" x2="216" y2="33"/>
      <line x1="78" y1="55" x2="196" y2="55"/>
      <line x1="78" y1="119" x2="234" y2="119"/>
      <line x1="78" y1="140" x2="178" y2="140"/>
    </g>
    <line className="ata-active-rule" x1="78" y1="88" x2="244" y2="88" stroke="#7d9aef" strokeWidth="1.2"/>
  </svg>
);

const VisReq = () => (
  <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet" className="tile-vis-svg tile-vis-req">
    {/* Checklist: 5 requirement rows, 3 checked in blue, 2 pending */}
    <g className="req-checks" stroke="#7d9aef" strokeWidth="1.4" fill="none">
      <path d="M 30 30 L 36 36 L 48 22"/>
      <path d="M 30 82 L 36 88 L 48 74"/>
      <path d="M 30 134 L 36 140 L 48 126"/>
    </g>
    <g stroke="rgba(234,236,240,0.4)" strokeWidth="1" fill="none">
      <rect x="30" y="49" width="14" height="14"/>
      <rect x="30" y="101" width="14" height="14"/>
    </g>
    <g stroke="rgba(234,236,240,0.5)" strokeWidth="1">
      <line x1="64" y1="30" x2="240" y2="30"/>
      <line x1="64" y1="56" x2="220" y2="56"/>
      <line x1="64" y1="82" x2="206" y2="82"/>
      <line x1="64" y1="108" x2="232" y2="108"/>
      <line x1="64" y1="134" x2="186" y2="134"/>
    </g>
    <g stroke="rgba(234,236,240,0.22)" strokeWidth="0.8">
      <line x1="64" y1="40" x2="190" y2="40"/>
      <line x1="64" y1="66" x2="168" y2="66"/>
      <line x1="64" y1="92" x2="174" y2="92"/>
      <line x1="64" y1="118" x2="200" y2="118"/>
      <line x1="64" y1="144" x2="156" y2="144"/>
    </g>
  </svg>
);

const VisBREX = () => (
  <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet" className="tile-vis-svg">
    {/* Rule tree: parent rule node with constraint children */}
    <rect x="108" y="14" width="64" height="22" fill="rgba(125,154,239,0.18)" stroke="#7d9aef" strokeWidth="1.2"/>
    <text x="140" y="29" textAnchor="middle" fontFamily="'Geist Mono', monospace" fontSize="9" letterSpacing="1.5" fill="#7d9aef" fontWeight="500">RULE</text>

    <g stroke="rgba(234,236,240,0.28)" strokeWidth="1" fill="none">
      <line x1="140" y1="36" x2="140" y2="56"/>
      <line x1="56" y1="56" x2="224" y2="56"/>
      <line x1="56" y1="56" x2="56" y2="82"/>
      <line x1="140" y1="56" x2="140" y2="82"/>
      <line x1="224" y1="56" x2="224" y2="82"/>
    </g>
    <g stroke="#7d9aef" strokeWidth="1.4" fill="none">
      <line x1="140" y1="36" x2="140" y2="56"/>
      <line x1="140" y1="56" x2="56" y2="56"/>
      <line x1="56" y1="56" x2="56" y2="82"/>
    </g>

    <g>
      <rect x="32" y="82" width="48" height="22" fill="rgba(125,154,239,0.18)" stroke="#7d9aef" strokeWidth="1.2"/>
      <rect x="116" y="82" width="48" height="22" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1"/>
      <rect x="200" y="82" width="48" height="22" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1"/>
    </g>
    <g stroke="rgba(234,236,240,0.4)" strokeWidth="0.8">
      <line x1="122" y1="93" x2="158" y2="93"/>
      <line x1="206" y1="93" x2="242" y2="93"/>
    </g>
    <line x1="38" y1="93" x2="74" y2="93" stroke="#7d9aef" strokeWidth="1"/>

    {/* Sub-leaf under active node */}
    <line x1="56" y1="104" x2="56" y2="124" stroke="#7d9aef" strokeWidth="1.4"/>
    <rect x="32" y="124" width="48" height="16" fill="rgba(125,154,239,0.12)" stroke="#7d9aef" strokeWidth="1"/>
    <line x1="38" y1="132" x2="74" y2="132" stroke="#7d9aef" strokeWidth="0.9"/>
  </svg>
);

const VisTool = () => (
  <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet" className="tile-vis-svg">
    {/* 4x2 tool grid; 3 selected */}
    <g stroke="rgba(234,236,240,0.22)" strokeWidth="0.9" fill="rgba(255,255,255,0.02)">
      <rect x="24" y="28" width="56" height="42"/>
      <rect x="152" y="28" width="56" height="42"/>
      <rect x="216" y="28" width="56" height="42"/>
      <rect x="88" y="80" width="56" height="42"/>
      <rect x="216" y="80" width="56" height="42"/>
    </g>
    <g stroke="#7d9aef" strokeWidth="1.3" fill="rgba(125,154,239,0.16)">
      <rect x="88" y="28" width="56" height="42"/>
      <rect x="24" y="80" width="56" height="42"/>
      <rect x="152" y="80" width="56" height="42"/>
    </g>
    <g stroke="rgba(234,236,240,0.32)" strokeWidth="0.8">
      <line x1="34" y1="44" x2="68" y2="44"/>
      <line x1="34" y1="52" x2="58" y2="52"/>
      <line x1="34" y1="60" x2="64" y2="60"/>
      <line x1="162" y1="44" x2="196" y2="44"/>
      <line x1="162" y1="52" x2="186" y2="52"/>
      <line x1="226" y1="44" x2="262" y2="44"/>
      <line x1="226" y1="52" x2="252" y2="52"/>
      <line x1="98" y1="96" x2="132" y2="96"/>
      <line x1="98" y1="104" x2="122" y2="104"/>
      <line x1="226" y1="96" x2="262" y2="96"/>
      <line x1="226" y1="104" x2="252" y2="104"/>
    </g>
    <g stroke="#7d9aef" strokeWidth="1">
      <line x1="98" y1="44" x2="134" y2="44"/>
      <line x1="98" y1="52" x2="124" y2="52"/>
      <line x1="34" y1="96" x2="70" y2="96"/>
      <line x1="34" y1="104" x2="60" y2="104"/>
      <line x1="162" y1="96" x2="198" y2="96"/>
      <line x1="162" y1="104" x2="188" y2="104"/>
    </g>
    <text x="140" y="146" textAnchor="middle" fontFamily="'Geist Mono', monospace" fontSize="9" letterSpacing="2.4" fill="#7d9aef">▪ 3 SELECTED</text>
  </svg>
);

const VisConv = () => (
  <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet" className="tile-vis-svg tile-vis-conv">
    {/* Legacy docs → conversion arrow → S1000D page */}
    <g transform="rotate(-6 50 56)">
      <rect x="22" y="32" width="48" height="48" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1"/>
      <g stroke="rgba(234,236,240,0.32)" strokeWidth="0.7">
        <line x1="28" y1="42" x2="60" y2="42"/>
        <line x1="28" y1="50" x2="54" y2="50"/>
        <line x1="28" y1="58" x2="60" y2="58"/>
        <line x1="28" y1="66" x2="50" y2="66"/>
        <line x1="28" y1="74" x2="58" y2="74"/>
      </g>
    </g>
    <g transform="rotate(4 50 110)">
      <rect x="22" y="86" width="48" height="48" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1"/>
      <g stroke="rgba(234,236,240,0.32)" strokeWidth="0.7">
        <line x1="28" y1="96" x2="60" y2="96"/>
        <line x1="28" y1="104" x2="54" y2="104"/>
        <line x1="28" y1="112" x2="60" y2="112"/>
        <line x1="28" y1="120" x2="50" y2="120"/>
        <line x1="28" y1="128" x2="58" y2="128"/>
      </g>
    </g>

    {/* Arrow */}
    <g className="conv-arrow" stroke="#7d9aef" strokeWidth="1.6" fill="none">
      <line x1="92" y1="82" x2="162" y2="82"/>
      <path d="M 154 74 L 164 82 L 154 90"/>
    </g>
    <text x="127" y="70" textAnchor="middle" fontFamily="'Geist Mono', monospace" fontSize="9" letterSpacing="2.5" fill="#7d9aef">S1000D</text>

    {/* Clean target page */}
    <rect x="178" y="24" width="84" height="116" fill="rgba(255,255,255,0.02)" stroke="#7d9aef" strokeWidth="1.3"/>
    <line x1="188" y1="38" x2="252" y2="38" stroke="#7d9aef" strokeWidth="1.1"/>
    <g stroke="rgba(234,236,240,0.4)" strokeWidth="0.8">
      <line x1="188" y1="52" x2="244" y2="52"/>
      <line x1="188" y1="60" x2="250" y2="60"/>
      <line x1="188" y1="68" x2="230" y2="68"/>
      <line x1="188" y1="76" x2="248" y2="76"/>
      <line x1="188" y1="88" x2="244" y2="88"/>
      <line x1="188" y1="96" x2="252" y2="96"/>
      <line x1="188" y1="104" x2="222" y2="104"/>
      <line x1="188" y1="116" x2="248" y2="116"/>
      <line x1="188" y1="124" x2="240" y2="124"/>
    </g>
  </svg>
);

const VisDTD = () => (
  <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet" className="tile-vis-svg tile-vis-dtd">
    {/* Schema tree: root → branches → leaves */}
    <rect x="116" y="12" width="48" height="20" fill="rgba(125,154,239,0.18)" stroke="#7d9aef" strokeWidth="1.2"/>
    <text x="140" y="26" textAnchor="middle" fontFamily="'Geist Mono', monospace" fontSize="9" fill="#7d9aef" fontWeight="500">root</text>

    <g stroke="rgba(234,236,240,0.3)" strokeWidth="1" fill="none">
      <line x1="140" y1="32" x2="140" y2="46"/>
      <line x1="60" y1="46" x2="220" y2="46"/>
      <line x1="60" y1="46" x2="60" y2="64"/>
      <line x1="140" y1="46" x2="140" y2="64"/>
      <line x1="220" y1="46" x2="220" y2="64"/>
    </g>
    <g className="dtd-active-path" stroke="#7d9aef" strokeWidth="1.4" fill="none">
      <line x1="140" y1="32" x2="140" y2="46"/>
      <line x1="140" y1="46" x2="60" y2="46"/>
      <line x1="60" y1="46" x2="60" y2="64"/>
    </g>

    <rect x="36" y="64" width="48" height="18" fill="rgba(125,154,239,0.18)" stroke="#7d9aef" strokeWidth="1.2"/>
    <rect x="116" y="64" width="48" height="18" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1"/>
    <rect x="196" y="64" width="48" height="18" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1"/>
    <g fontFamily="'Geist Mono', monospace" fontSize="8" textAnchor="middle">
      <text x="60" y="76" fill="#7d9aef">elt</text>
      <text x="140" y="76" fill="#767c87">elt</text>
      <text x="220" y="76" fill="#767c87">elt</text>
    </g>

    <g stroke="rgba(234,236,240,0.3)" strokeWidth="1" fill="none">
      <line x1="60" y1="82" x2="60" y2="96"/>
      <line x1="30" y1="96" x2="90" y2="96"/>
      <line x1="30" y1="96" x2="30" y2="112"/>
      <line x1="60" y1="96" x2="60" y2="112"/>
      <line x1="90" y1="96" x2="90" y2="112"/>
      <line x1="140" y1="82" x2="140" y2="112"/>
      <line x1="220" y1="82" x2="220" y2="112"/>
    </g>
    <g stroke="#7d9aef" strokeWidth="1.4" fill="none">
      <line x1="60" y1="82" x2="60" y2="96"/>
      <line x1="60" y1="96" x2="30" y2="96"/>
      <line x1="30" y1="96" x2="30" y2="112"/>
    </g>

    <rect x="14" y="112" width="32" height="16" fill="rgba(125,154,239,0.20)" stroke="#7d9aef" strokeWidth="1.2"/>
    <rect x="46" y="112" width="28" height="16" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1"/>
    <rect x="76" y="112" width="28" height="16" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1"/>
    <rect x="124" y="112" width="32" height="16" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1"/>
    <rect x="204" y="112" width="32" height="16" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1"/>

    <text x="140" y="148" textAnchor="middle" fontFamily="'Geist Mono', monospace" fontSize="9" letterSpacing="2.4" fill="#767c87">SCHEMA TREE</text>
  </svg>
);

const VisTrain = () => (
  <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet" className="tile-vis-svg">
    {/* Step progression: 4 numbered modules with arrows between */}
    <g stroke="rgba(234,236,240,0.28)" strokeWidth="1" fill="none">
      <line x1="60" y1="74" x2="92" y2="74"/>
      <line x1="202" y1="74" x2="234" y2="74"/>
    </g>
    <g stroke="#7d9aef" strokeWidth="1.5" fill="none">
      <line x1="130" y1="74" x2="162" y2="74"/>
      <path d="M 154 68 L 164 74 L 154 80"/>
    </g>

    {/* Step circles */}
    <circle cx="40" cy="74" r="22" fill="rgba(125,154,239,0.18)" stroke="#7d9aef" strokeWidth="1.4"/>
    <text x="40" y="80" textAnchor="middle" fontFamily="'Geist Mono', monospace" fontSize="14" fill="#7d9aef" fontWeight="500">01</text>

    <circle cx="112" cy="74" r="22" fill="rgba(125,154,239,0.18)" stroke="#7d9aef" strokeWidth="1.4"/>
    <text x="112" y="80" textAnchor="middle" fontFamily="'Geist Mono', monospace" fontSize="14" fill="#7d9aef" fontWeight="500">02</text>

    <circle cx="180" cy="74" r="22" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1.2"/>
    <text x="180" y="80" textAnchor="middle" fontFamily="'Geist Mono', monospace" fontSize="14" fill="#767c87">03</text>

    <circle cx="252" cy="74" r="22" fill="rgba(255,255,255,0.02)" stroke="rgba(234,236,240,0.32)" strokeWidth="1.2"/>
    <text x="252" y="80" textAnchor="middle" fontFamily="'Geist Mono', monospace" fontSize="14" fill="#767c87">04</text>

    <text x="140" y="142" textAnchor="middle" fontFamily="'Geist Mono', monospace" fontSize="9" letterSpacing="2.5" fill="#767c87">PROGRESSION</text>
  </svg>
);

const TILE_VISUALS = {
  ata:   VisATA,
  req:   VisReq,
  brex:  VisBREX,
  tool:  VisTool,
  conv:  VisConv,
  dtd:   VisDTD,
  train: VisTrain,
};

const ExpertiseFeatureCard = ({ item }) => (
  <SpecimenFrame
    headerLeft={item.type}
    footerLeft={`${item.items.length} standards`}
    className="expertise-feature"
  >
    <div className="expertise-feature-inner">
      <h3 className="expertise-feature-name">{item.name}</h3>
      <ul className="expertise-feature-list">
        {item.items.map(s => (
          <li key={s}>
            <span className="expertise-feature-mark" aria-hidden="true" />
            <span className="expertise-feature-text">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  </SpecimenFrame>
);

const ExpertiseTileCard = ({ item }) => {
  const Visual = TILE_VISUALS[item.visualKey];
  return (
    <article className="expertise-tile-card">
      <h3 className="expertise-tile-card-name">{item.name}</h3>
      <div className="expertise-tile-card-visual" aria-hidden="true">
        {Visual ? <Visual /> : null}
      </div>
    </article>
  );
};

const ConsultingExpertise = () => {
  useInViewC();
  const featureItems = EXPERTISE.filter(i => i.items && i.items.length);
  const restItems    = EXPERTISE.filter(i => !i.items || !i.items.length);

  return (
    <section id="expertise" className="sec-pad">
      <div className="container">
        <div className="consulting-section-head fade-up">
          <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 22 }}>
            Areas of expertise &amp; services
          </div>
          <h2 className="mixed-weight" style={{
            fontSize: "var(--fs-h2)", lineHeight: 1.08, letterSpacing: "-0.025em",
            margin: "0 0 24px", color: "var(--ink)", maxWidth: "26ch",
          }}>
            Most-requested <em>consulting</em> and implementation areas.
          </h2>
          <p style={{ fontSize: 19, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: "52ch", margin: 0, fontWeight: 400, textWrap: "pretty" }}>
            Below are our most requested consulting and implementation areas of expertise and services.
          </p>
        </div>

        <div className="expertise-features fade-up">
          {featureItems.map((item) => (
            <ExpertiseFeatureCard key={item.name} item={item} />
          ))}
        </div>

        <div className="expertise-rest fade-up">
          {restItems.map((item) => (
            <ExpertiseTileCard key={item.name} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        .consulting-section-head { margin-bottom: 56px; }

        .expertise-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
          color: var(--ink);
        }
        .expertise-feature {
          background: var(--bg-2);
        }
        .expertise-feature-inner {
          padding: 32px 32px 30px;
          display: flex;
          flex-direction: column;
        }
        .expertise-feature-name {
          font-size: 26px;
          line-height: 1.2;
          letter-spacing: -0.018em;
          font-weight: 500;
          color: var(--ink);
          margin: 0 0 28px;
          text-wrap: balance;
        }
        .expertise-feature-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .expertise-feature-list li {
          display: grid;
          grid-template-columns: 14px 1fr;
          gap: 16px;
          padding: 14px 0;
          border-top: 1px solid var(--line);
          color: var(--ink-2);
          font-size: 15px;
          line-height: 1.5;
          align-items: baseline;
        }
        .expertise-feature-list li:last-child {
          border-bottom: 1px solid var(--line);
        }
        .expertise-feature-mark {
          display: block;
          width: 6px;
          height: 6px;
          background: var(--pentecon-blue);
          opacity: 0.85;
          transform: translateY(2px);
        }
        .expertise-feature-text { text-wrap: pretty; }

        /* TILE CARDS — equal weight to feature cards above.
           Bento spans: 4-2 / 2-2-2 / 3-3 across a 6-col grid so the 7
           tiles form a varied layout with no orphan card. Heading sits
           at the top of each card (NOT under the visual). */
        .expertise-rest {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          color: var(--ink);
        }
        .expertise-rest > :nth-child(1) { grid-column: span 4; }
        .expertise-rest > :nth-child(2) { grid-column: span 2; }
        .expertise-rest > :nth-child(3) { grid-column: span 2; }
        .expertise-rest > :nth-child(4) { grid-column: span 2; }
        .expertise-rest > :nth-child(5) { grid-column: span 2; }
        .expertise-rest > :nth-child(6) { grid-column: span 3; }
        .expertise-rest > :nth-child(7) { grid-column: span 3; }
        .expertise-tile-card {
          background: var(--bg-2);
          border: 1px solid var(--line-2);
          border-radius: 2px;
          padding: 28px 30px 30px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-height: 320px;
          transition: border-color 200ms ease;
        }
        .expertise-tile-card:hover {
          border-color: rgba(125, 154, 239, 0.38);
        }
        .expertise-tile-card-name {
          font-size: 22px;
          line-height: 1.22;
          letter-spacing: -0.015em;
          font-weight: 500;
          color: var(--ink);
          margin: 0;
          text-wrap: balance;
        }
        .expertise-tile-card-visual {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.015);
          border: 1px solid var(--line-soft);
          padding: 18px;
          min-height: 180px;
          margin-top: auto;
        }
        .tile-vis-svg {
          display: block;
          width: 100%;
          height: auto;
          max-height: 220px;
        }

        /* === Tile-visual animations =================================
           Scoped to .in-view so they trigger when the card scrolls into
           view, not on page load. Otherwise the user is below the fold
           when the animation plays and never sees it. */

        /* Initial states — elements start "before" position */
        .tile-vis-ata .ata-active-row {
          opacity: 0;
          transform-origin: 50% 50%;
          transform: scaleX(0.86);
        }
        .tile-vis-ata .ata-active-rule {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
        }
        .tile-vis-req .req-checks path {
          stroke-dasharray: 36;
          stroke-dashoffset: 36;
        }
        .tile-vis-conv .conv-arrow line,
        .tile-vis-conv .conv-arrow path {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
        }
        .tile-vis-dtd .dtd-active-path line {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
        }

        /* Animations — fire when the grid scrolls into view */
        .expertise-rest.in-view .tile-vis-ata .ata-active-row {
          animation: ataRowReveal 900ms 200ms cubic-bezier(0.5, 0, 0.2, 1) forwards;
        }
        .expertise-rest.in-view .tile-vis-ata .ata-active-rule {
          animation: ataRuleDraw 1100ms 500ms cubic-bezier(0.5, 0, 0.2, 1) forwards;
        }
        @keyframes ataRowReveal {
          0%   { opacity: 0; transform: scaleX(0.86); }
          100% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes ataRuleDraw {
          to { stroke-dashoffset: 0; }
        }
        .expertise-rest.in-view .tile-vis-req .req-checks path {
          animation: reqCheckDraw 520ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .expertise-rest.in-view .tile-vis-req .req-checks path:nth-of-type(1) { animation-delay: 200ms; }
        .expertise-rest.in-view .tile-vis-req .req-checks path:nth-of-type(2) { animation-delay: 420ms; }
        .expertise-rest.in-view .tile-vis-req .req-checks path:nth-of-type(3) { animation-delay: 640ms; }
        @keyframes reqCheckDraw {
          to { stroke-dashoffset: 0; }
        }
        .expertise-rest.in-view .tile-vis-conv .conv-arrow line,
        .expertise-rest.in-view .tile-vis-conv .conv-arrow path {
          animation: convArrowDraw 1100ms 400ms cubic-bezier(0.45, 0, 0.2, 1) forwards;
        }
        .expertise-rest.in-view .tile-vis-conv .conv-arrow path {
          animation-delay: 1100ms;
          animation-duration: 400ms;
        }
        @keyframes convArrowDraw {
          to { stroke-dashoffset: 0; }
        }
        .expertise-rest.in-view .tile-vis-dtd .dtd-active-path line {
          animation: dtdPathDraw 600ms cubic-bezier(0.5, 0, 0.2, 1) forwards;
        }
        .expertise-rest.in-view .tile-vis-dtd .dtd-active-path line:nth-of-type(1) { animation-delay: 300ms; }
        .expertise-rest.in-view .tile-vis-dtd .dtd-active-path line:nth-of-type(2) { animation-delay: 500ms; }
        .expertise-rest.in-view .tile-vis-dtd .dtd-active-path line:nth-of-type(3) { animation-delay: 700ms; }
        @keyframes dtdPathDraw {
          to { stroke-dashoffset: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tile-vis-ata .ata-active-row,
          .tile-vis-ata .ata-active-rule,
          .tile-vis-req .req-checks path,
          .tile-vis-conv .conv-arrow line,
          .tile-vis-conv .conv-arrow path,
          .tile-vis-dtd .dtd-active-path line {
            animation: none !important;
            stroke-dashoffset: 0;
            opacity: 1;
            transform: none;
          }
        }

        @media (max-width: 1100px) {
          .expertise-rest { grid-template-columns: repeat(4, 1fr); }
          .expertise-rest > :nth-child(1) { grid-column: span 4; }
          .expertise-rest > :nth-child(2),
          .expertise-rest > :nth-child(3),
          .expertise-rest > :nth-child(4),
          .expertise-rest > :nth-child(5) { grid-column: span 2; }
          .expertise-rest > :nth-child(6),
          .expertise-rest > :nth-child(7) { grid-column: span 2; }
        }
        @media (max-width: 900px) {
          .expertise-features { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .expertise-rest { grid-template-columns: 1fr; }
          .expertise-rest > * { grid-column: 1 / -1 !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   4. CONSULTING WHY EXPERTS — paragraph + tilted publication stack.
   The stack visualizes "authoring numerous pivotal specification chapters."
   Each cover is labeled with a real standard mentioned in the user's copy.
   ========================================================================= */

const PUBLICATION_STACK = [
  { label: "S1000D",       title: "Issue 6.0",         sub: "Authoring chapter",     accent: true },
  { label: "MIL-STD-3001", title: "Technical Manuals", sub: "Authoring contributor", accent: false },
  { label: "MIL-STD-40051", title: "DMWR / TM",        sub: "Authoring contributor", accent: false },
];

const PublicationCover = ({ label, title, sub, accent, offset }) => (
  <div
    className={`pub-cover ${accent ? "pub-cover-accent" : ""}`}
    style={{ "--cover-offset": offset }}
  >
    <SpecimenFrame
      headerLeft={label}
      headerRight={accent ? "Pentecom" : ""}
      footerLeft={sub}
    >
      <div className="pub-cover-body">
        <div className="pub-cover-title">{title}</div>
        <div className="pub-cover-lines" aria-hidden="true">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="pub-cover-line"
              style={{ width: `${65 + ((i * 37) % 30)}%`, animationDelay: `${i * 90 + 400}ms` }}
            />
          ))}
        </div>
      </div>
    </SpecimenFrame>
  </div>
);

const ConsultingWhyExperts = () => {
  useInViewC();
  return (
    <section className="sec-pad">
      <div className="container">
        <div className="consulting-why-grid">
          <div className="fade-up">
            <h2 className="mixed-weight" style={{
              fontSize: "var(--fs-h2)", lineHeight: 1.08, letterSpacing: "-0.025em",
              margin: "0 0 32px", color: "var(--ink)", maxWidth: "20ch",
            }}>
              What Makes Us <em>Experts</em> in Technical Data Standards
            </h2>
            <div className="consulting-why-body">
              <p>
                Not only do we have extensive field experience and decades of leadership, Pentecom continues to be at the forefront of developing concepts, creating schema frameworks, and authoring numerous pivotal specification chapters.
              </p>
              <p>
                Plus, our team has written, and updated military specifications, setting the standards for U.S. defense technical publications.
              </p>
            </div>
          </div>

          <div className="fade-up consulting-why-stack" aria-hidden="true">
            <div className="pub-stack">
              {PUBLICATION_STACK.map((p, i) => (
                <PublicationCover key={p.label} {...p} offset={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .consulting-why-grid {
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: 80px;
          align-items: center;
        }
        .consulting-why-body p {
          font-size: 18px;
          line-height: 1.6;
          color: var(--ink-2);
          margin: 0 0 20px;
        }
        .consulting-why-body p:last-child { margin-bottom: 0; }
        .consulting-why-body em {
          font-style: normal;
          color: var(--ink);
          font-weight: 500;
        }

        .consulting-why-stack {
          position: relative;
          height: 380px;
          color: var(--ink);
        }
        .pub-stack {
          position: relative;
          width: 100%;
          height: 100%;
        }
        /* 3-cover arrangement: front cover anchored bottom-right, two
           background covers stepping up and to the left. Offset 0 = front. */
        .pub-cover {
          position: absolute;
          width: 84%;
          right: calc(var(--cover-offset, 0) * 8%);
          bottom: calc(var(--cover-offset, 0) * 36px);
          transform: rotate(2deg) translate(
            calc(var(--cover-offset, 0) * 9.5%),
            calc(var(--cover-offset, 0) * 36px)
          );
          transform-origin: 100% 100%;
          z-index: calc(10 - var(--cover-offset, 0));
          box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.55);
          opacity: 0;
        }
        .consulting-why-stack.in-view .pub-cover {
          animation: pubCoverFoldApart 1100ms cubic-bezier(.22,.7,.22,1) forwards;
          animation-delay: calc(var(--cover-offset, 0) * 220ms + 300ms);
        }
        @keyframes pubCoverFoldApart {
          0% {
            opacity: 0;
            transform: rotate(2deg) translate(
              calc(var(--cover-offset, 0) * 9.5%),
              calc(var(--cover-offset, 0) * 36px)
            );
          }
          30% { opacity: 1; }
          100% {
            opacity: 1;
            transform: rotate(calc(var(--cover-offset, 0) * -4deg + 2deg)) translate(0, 0);
          }
        }
        .pub-cover-body {
          padding: 26px 26px 32px;
          background: var(--bg);
          min-height: 240px;
          display: flex;
          flex-direction: column;
        }
        .pub-cover-title {
          font-size: 26px;
          line-height: 1.2;
          font-weight: 500;
          color: var(--ink);
          letter-spacing: -0.02em;
          margin-bottom: 28px;
        }
        .pub-cover-accent .pub-cover-title { color: var(--pentecon-blue); }
        .pub-cover-accent {
          box-shadow:
            0 40px 80px -40px rgba(125, 154, 239, 0.4),
            0 30px 60px -30px rgba(0, 0, 0, 0.55);
        }
        .pub-cover-lines {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
        }
        .pub-cover-line {
          height: 1px;
          background: var(--line-2);
          transform: scaleX(0);
          transform-origin: 0 50%;
          animation: pubLineDraw 600ms ease-out forwards;
        }
        .pub-cover-accent .pub-cover-line:first-child {
          background: var(--pentecon-blue);
          opacity: 0.7;
        }
        @keyframes pubLineDraw {
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pub-cover, .pub-cover-line {
            animation: none;
            opacity: 1;
            transform: rotate(calc(var(--cover-offset, 0) * -4deg + 2deg));
          }
          .pub-cover-line { transform: scaleX(1); }
        }

        @media (max-width: 980px) {
          .consulting-why-grid { grid-template-columns: 1fr; gap: 56px; }
          .consulting-why-stack { height: 340px; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   5. CONSULTING HOW WE HELP — 4 capability cards w/ per-card specimens.
   Each capability gets a small custom visual that represents the work.
   Bullet copy is preserved verbatim.
   ========================================================================= */

const HOW_WE_HELP = [
  {
    name: "Business Rules",
    body: "Create Business Rules to satisfy project requirements and leverage industry best practices.",
    visualKind: "rules",
    hue: 225,
  },
  {
    name: "Applicability",
    body: "Establish scalable and complex applicability models.",
    visualKind: "applicability",
    hue: 210,
  },
  {
    name: "Sustainment",
    body: "Manage sustainment relationship between legacy source content and converted S1000D data as it evolves during the conversion process.",
    visualKind: "sustainment",
    hue: 200,
  },
  {
    name: "SNS",
    body: "Provide unique solutions for complex Standard Number System (SNS) and technical name challenges.",
    visualKind: "sns",
    hue: 235,
  },
];

/* Rules — 4 checkmark rule lines. Icon-sized. */
const CapVisualRules = () => (
  <svg viewBox="0 0 80 80" preserveAspectRatio="xMidYMid meet" className="cap-visual-svg cap-vis-rules">
    {[16, 32, 48, 64].map((y, i) => (
      <g key={y}>
        <path
          d={`M 8 ${y - 3} L 12 ${y + 1} L 18 ${y - 5}`}
          fill="none"
          stroke="var(--pentecon-blue)"
          strokeWidth="1.6"
          className="cap-vis-check"
          style={{ animationDelay: `${i * 140}ms` }}
        />
        <line
          x1="26"
          y1={y}
          x2={70 - (i % 2) * 10}
          y2={y}
          stroke="currentColor"
          strokeWidth="1.2"
          opacity={i === 0 ? 0.75 : 0.4}
        />
      </g>
    ))}
  </svg>
);

/* Applicability — small grid with some cells applied in blue. */
const CapVisualApplicability = () => {
  const applied = new Set(["0,0","1,1","2,2","3,0","0,2","1,3","2,1","3,3","0,3"]);
  const cols = 4, rows = 4, cellW = 14, cellH = 14;
  const gridX = 8, gridY = 8;
  return (
    <svg viewBox="0 0 80 80" preserveAspectRatio="xMidYMid meet" className="cap-visual-svg cap-vis-applicability">
      <g stroke="currentColor" strokeWidth="1" opacity="0.3">
        {Array.from({ length: cols + 1 }).map((_, c) => (
          <line key={`v-${c}`} x1={gridX + c * cellW} y1={gridY} x2={gridX + c * cellW} y2={gridY + rows * cellH} />
        ))}
        {Array.from({ length: rows + 1 }).map((_, r) => (
          <line key={`h-${r}`} x1={gridX} y1={gridY + r * cellH} x2={gridX + cols * cellW} y2={gridY + r * cellH} />
        ))}
      </g>
      <g>
        {Array.from({ length: cols }).flatMap((_, c) =>
          Array.from({ length: rows }).map((_, r) => {
            const k = `${c},${r}`;
            if (!applied.has(k)) return null;
            const idx = c * rows + r;
            return (
              <rect
                key={k}
                x={gridX + c * cellW + 1}
                y={gridY + r * cellH + 1}
                width={cellW - 2}
                height={cellH - 2}
                fill="var(--pentecon-blue)"
                fillOpacity="0.55"
                className="cap-vis-cell"
                style={{ animationDelay: `${(idx % 9) * 70}ms` }}
              />
            );
          })
        )}
      </g>
    </svg>
  );
};

/* Sustainment — 3 legacy streams converging into a blue S1000D target. */
const CapVisualSustainment = () => (
  <svg viewBox="0 0 80 80" preserveAspectRatio="xMidYMid meet" className="cap-visual-svg cap-vis-sustainment">
    {/* Legacy doc icons */}
    <g fill="currentColor" opacity="0.55">
      <rect x="6" y="16" width="10" height="8" />
      <rect x="6" y="36" width="10" height="8" />
      <rect x="6" y="56" width="10" height="8" />
    </g>
    {/* Streams */}
    <g stroke="currentColor" strokeWidth="1.2" opacity="0.4" fill="none">
      <path d="M 18 20 Q 32 20 40 40" className="cap-vis-flow" style={{ animationDelay: "0ms" }} />
      <path d="M 18 40 Q 30 40 40 40" className="cap-vis-flow" style={{ animationDelay: "140ms" }} />
      <path d="M 18 60 Q 32 60 40 40" className="cap-vis-flow" style={{ animationDelay: "280ms" }} />
    </g>
    {/* Convergence + target */}
    <g stroke="var(--pentecon-blue)" strokeWidth="1.6" fill="none">
      <path d="M 42 40 L 62 40" className="cap-vis-flow-target" />
    </g>
    <g fill="var(--pentecon-blue)">
      <circle cx="40" cy="40" r="2.5" opacity="0.9" />
      <rect x="62" y="32" width="14" height="16" fillOpacity="0.2" stroke="var(--pentecon-blue)" strokeWidth="1.4" />
    </g>
  </svg>
);

/* SNS — small hierarchical tree with one path lit in blue. */
const CapVisualSNS = () => (
  <svg viewBox="0 0 80 80" preserveAspectRatio="xMidYMid meet" className="cap-visual-svg cap-vis-sns">
    {/* Base tree */}
    <g stroke="currentColor" strokeWidth="1.2" opacity="0.32" fill="none">
      <line x1="12" y1="40" x2="28" y2="40" />
      <line x1="28" y1="40" x2="28" y2="18" />
      <line x1="28" y1="40" x2="28" y2="62" />
      <line x1="28" y1="18" x2="48" y2="18" />
      <line x1="28" y1="62" x2="48" y2="62" />
      <line x1="48" y1="18" x2="48" y2="10" />
      <line x1="48" y1="18" x2="48" y2="26" />
      <line x1="48" y1="26" x2="64" y2="26" />
      <line x1="48" y1="62" x2="48" y2="54" />
      <line x1="48" y1="62" x2="48" y2="70" />
      <line x1="48" y1="54" x2="64" y2="54" />
      <line x1="48" y1="70" x2="64" y2="70" />
    </g>
    {/* Active path */}
    <g stroke="var(--pentecon-blue)" strokeWidth="1.6" fill="none" className="cap-vis-active-path">
      <line x1="12" y1="40" x2="28" y2="40" />
      <line x1="28" y1="40" x2="28" y2="18" />
      <line x1="28" y1="18" x2="48" y2="18" />
      <line x1="48" y1="18" x2="48" y2="10" />
      <line x1="48" y1="10" x2="64" y2="10" />
    </g>
    {/* Nodes */}
    <g fill="currentColor" opacity="0.55">
      <circle cx="28" cy="62" r="1.8" />
      <circle cx="48" cy="26" r="1.4" />
      <circle cx="48" cy="54" r="1.4" />
      <circle cx="48" cy="70" r="1.4" />
    </g>
    <g fill="var(--pentecon-blue)">
      <circle cx="12" cy="40" r="2.2" />
      <circle cx="28" cy="40" r="2" opacity="0.9" />
      <circle cx="48" cy="18" r="2" opacity="0.9" />
      <circle cx="48" cy="10" r="2" opacity="0.9" />
      <circle cx="64" cy="10" r="2" opacity="0.9" />
    </g>
  </svg>
);

const CapVisual = ({ kind }) => {
  switch (kind) {
    case "rules":         return <CapVisualRules />;
    case "applicability": return <CapVisualApplicability />;
    case "sustainment":   return <CapVisualSustainment />;
    case "sns":           return <CapVisualSNS />;
    default: return null;
  }
};

const ConsultingHowWeHelp = () => {
  useInViewC();
  return (
    <section id="how" className="sec-pad">
      <div className="container">
        <div className="consulting-section-head fade-up">
          <h2 className="mixed-weight" style={{
            fontSize: "var(--fs-h2)", lineHeight: 1.08, letterSpacing: "-0.025em",
            margin: "0 0 18px", color: "var(--ink)", maxWidth: "22ch",
          }}>
            How <em>Pentecom</em> Can Help
          </h2>
          <p style={{ fontSize: 19, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: "60ch", margin: 0 }}>
            We can resolve your issues as they relate to technical publications.
          </p>
        </div>

        <div className="consulting-how-grid fade-up">
          {HOW_WE_HELP.map((cap, i) => (
            <article key={i} className="consulting-how-card" style={{ "--cap-hue": cap.hue }}>
              <div aria-hidden="true" className="consulting-how-card-mesh" />
              <div aria-hidden="true" className="consulting-how-card-vignette" />
              <div className="consulting-how-visual" aria-hidden="true">
                <CapVisual kind={cap.visualKind} />
              </div>
              <h3 className="consulting-how-name">{cap.name}</h3>
              <p className="consulting-how-body">{cap.body}</p>
            </article>
          ))}
        </div>

        <div className="consulting-how-closing fade-up">
          <p className="consulting-how-payoff">
            Ultimately, your mission is prepared for <em>organic&nbsp;sustainment</em> through management of your S1000D data. Our industry experts are ready to put their knowledge to work for you and create a customized strategy designed for your success.
          </p>
        </div>
      </div>

      <style>{`
        .consulting-how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          color: var(--ink);
        }
        .consulting-how-card {
          position: relative;
          isolation: isolate;
          border-radius: 16px;
          padding: 28px;
          min-height: 360px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: #FFFFFF;
          box-shadow:
            0 28px 60px -32px rgba(32, 50, 99, 0.45),
            0 1px 0 rgba(255,255,255,0.4) inset;
        }
        .consulting-how-card-mesh {
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(circle at 18% 28%, hsl(var(--cap-hue) 55% 30% / 0.95) 0%, transparent 55%),
            radial-gradient(circle at 78% 18%, hsl(calc(var(--cap-hue) + 18) 50% 26% / 0.85) 0%, transparent 50%),
            radial-gradient(circle at 85% 78%, hsl(calc(var(--cap-hue) - 18) 50% 18% / 0.95) 0%, transparent 55%),
            radial-gradient(circle at 30% 95%, hsl(calc(var(--cap-hue) + 10) 55% 14% / 0.95) 0%, transparent 55%),
            linear-gradient(135deg, hsl(var(--cap-hue) 45% 22%) 0%, hsl(var(--cap-hue) 55% 12%) 100%);
          filter: blur(0.4px);
        }
        .consulting-how-card-vignette {
          position: absolute;
          inset: -20px;
          z-index: -1;
          background: radial-gradient(circle at 50% 35%, transparent 35%, hsl(var(--cap-hue) 55% 8% / 0.55) 100%);
        }
        .consulting-how-visual {
          width: 80px;
          height: 80px;
          color: rgba(255, 255, 255, 0.92);
          margin-bottom: 20px;
          flex-shrink: 0;
        }
        .cap-visual-svg { display: block; width: 100%; height: 100%; }
        .consulting-how-name {
          font-size: 24px;
          line-height: 1.2;
          letter-spacing: -0.015em;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.98);
          margin: 0 0 12px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.12);
        }
        .consulting-how-body {
          font-size: 16px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.86);
          margin: 0;
          max-width: 36ch;
        }

        /* Capability visual animations */
        .cap-vis-check {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          opacity: 0;
          animation: capCheckIn 600ms cubic-bezier(.5,.1,.2,1) forwards;
        }
        @keyframes capCheckIn {
          0%   { stroke-dashoffset: 24; opacity: 0; }
          40%  { opacity: 1; }
          100% { stroke-dashoffset: 0;  opacity: 1; }
        }
        .cap-vis-cell {
          opacity: 0;
          animation: capCellIn 400ms ease-out forwards;
        }
        @keyframes capCellIn {
          from { opacity: 0; }
          to   { opacity: 0.45; }
        }
        .cap-vis-flow {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: capFlowIn 900ms ease-in-out forwards;
        }
        .cap-vis-flow-target {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: capFlowIn 700ms 500ms ease-out forwards;
        }
        @keyframes capFlowIn {
          to { stroke-dashoffset: 0; }
        }
        .cap-vis-active-path line {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: capActivePathIn 1200ms ease-out forwards;
        }
        .cap-vis-active-path line:nth-child(2) { animation-delay: 200ms; }
        .cap-vis-active-path line:nth-child(3) { animation-delay: 350ms; }
        .cap-vis-active-path line:nth-child(4) { animation-delay: 500ms; }
        .cap-vis-active-path line:nth-child(5) { animation-delay: 650ms; }
        @keyframes capActivePathIn {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cap-vis-check, .cap-vis-cell, .cap-vis-flow,
          .cap-vis-flow-target, .cap-vis-active-path line {
            animation: none;
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }
        .consulting-how-body {
          font-size: 16px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.86);
          margin: 0;
          max-width: 36ch;
        }
        .consulting-how-closing {
          margin-top: 28px;
          max-width: 880px;
        }
        .consulting-how-payoff {
          font-size: 19px;
          line-height: 1.55;
          font-weight: 400;
          margin: 0;
          color: var(--ink-2);
          max-width: 64ch;
          text-wrap: pretty;
        }
        .consulting-how-payoff em {
          font-style: normal;
          font-weight: 600;
          color: var(--ink);
        }
        @media (max-width: 1100px) {
          .consulting-how-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .consulting-how-grid { grid-template-columns: 1fr; }
          .consulting-how-card { padding: 24px; min-height: 0; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   6. CONSULTING SERVICES — XML / catalog document specimens.
   Each engagement model becomes a stylized document specimen. Brand-tagged
   services render as XML element specimens. University of Pentecom (which
   has no brackets in the source copy) renders as a catalog-page specimen.
   Lorem ipsum bodies, per user instruction.
   ========================================================================= */

const SERVICES = [
  {
    tag: "Retainer \u2009\u25aa\u2009 Ongoing",
    name: "On Retainer",
    descriptor: "Our long-term contract option",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    footer: "Continuous engagement",
  },
  {
    tag: "Training \u2009\u25aa\u2009 Structured",
    name: "University of Pentecom",
    descriptor: "For training opportunities",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    topics: [
      "S1000D fundamentals",
      "Authoring & validation",
      "Conversion workflows",
      "Business Rules studio",
      "BREX in practice",
    ],
    footer: "Workshops, courses, certifications",
  },
  {
    tag: "Mentoring \u2009\u25aa\u2009 Kickoff",
    name: "Jumpstart",
    descriptor: "For our mentoring services",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    footer: "Focused short engagement",
  },
];

const ServiceCard = ({ service }) => (
  <SpecimenFrame
    headerLeft={service.tag}
    footerLeft={service.footer}
    className="service-card"
  >
    <div className="service-card-body">
      <h3 className="service-card-name">{service.name}</h3>
      <div className="service-card-descriptor">{service.descriptor}</div>
      <p className="service-card-text">{service.body}</p>
      {service.topics && (
        <ul className="service-card-topics">
          {service.topics.map((t) => (
            <li key={t}>
              <span className="service-card-mark" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </SpecimenFrame>
);

const ConsultingServices = () => {
  useInViewC();
  return (
    <section id="services" className="sec-pad" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="consulting-section-head fade-up">
          <div className="mono" style={{ color: "var(--ink-2)", marginBottom: 22 }}>
            Engagement models
          </div>
          <h2 className="mixed-weight" style={{
            fontSize: "var(--fs-h2)", lineHeight: 1.08, letterSpacing: "-0.025em",
            margin: 0, color: "var(--ink)", maxWidth: "28ch", fontWeight: 300, textWrap: "balance",
          }}>
            Short- or long-term, we shape the engagement to your program.
          </h2>
        </div>

        <div className="consulting-services-grid fade-up">
          {SERVICES.map((s) => <ServiceCard key={s.name} service={s} />)}
        </div>
      </div>

      <style>{`
        .consulting-services-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 16px;
          color: var(--ink);
          align-items: stretch;
        }
        /* University (the card with the topic list) takes the tall left column.
           On Retainer and Jumpstart stack on the right. */
        .consulting-services-grid > :nth-child(2) {
          grid-column: 1;
          grid-row: 1 / span 2;
        }
        .consulting-services-grid > :nth-child(1) {
          grid-column: 2;
          grid-row: 1;
        }
        .consulting-services-grid > :nth-child(3) {
          grid-column: 2;
          grid-row: 2;
        }
        .service-card {
          background: var(--bg);
          border: 1px solid var(--line-2);
          opacity: 0;
          transform: translateY(10px);
        }
        .consulting-services-grid.in-view > * {
          animation: serviceCardIn 800ms cubic-bezier(.22,.7,.22,1) forwards;
        }
        .consulting-services-grid.in-view > :nth-child(1) { animation-delay: 220ms; }
        .consulting-services-grid.in-view > :nth-child(2) { animation-delay: 380ms; }
        .consulting-services-grid.in-view > :nth-child(3) { animation-delay: 540ms; }
        @keyframes serviceCardIn {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-card { animation: none !important; opacity: 1; transform: none; }
        }
        .service-card-body {
          padding: 32px 30px 34px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .service-card-name {
          font-size: 30px;
          font-weight: 500;
          color: var(--ink);
          letter-spacing: -0.022em;
          line-height: 1.12;
          margin: 0 0 10px;
          text-wrap: pretty;
        }
        .service-card-descriptor {
          font-family: 'Geist Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--pentecon-blue);
          margin-bottom: 22px;
        }
        .service-card-text {
          font-size: 15px;
          color: var(--ink-2);
          line-height: 1.6;
          margin: 0 0 24px;
          max-width: 32ch;
        }
        .service-card-topics {
          list-style: none;
          margin: auto 0 0;
          padding: 0;
          border-top: 1px solid var(--line);
        }
        .service-card-topics li {
          display: grid;
          grid-template-columns: 14px 1fr;
          gap: 14px;
          padding: 11px 0;
          border-bottom: 1px solid var(--line);
          font-size: 14px;
          color: var(--ink-2);
          align-items: center;
        }
        .service-card-mark {
          display: block;
          width: 5px;
          height: 5px;
          background: var(--pentecon-blue);
          opacity: 0.85;
        }
        @media (max-width: 960px) {
          .consulting-services-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }
          .consulting-services-grid > :nth-child(1),
          .consulting-services-grid > :nth-child(2),
          .consulting-services-grid > :nth-child(3) {
            grid-column: 1;
            grid-row: auto;
          }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   7. CONSULTING CTA — CTA + side data-field artifact (rhymes with hero).
   ========================================================================= */
const ConsultingCta = () => {
  useInViewC();
  const Panels = null; // FloatingPanelsArtifact not available in this context
  return (
    <section className="sec-pad" style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--line-2)" }}>
      {/* Floating-panels field — drifts behind the whole section,
          mirrors the home14 Contact CTA treatment. */}
      {Panels && <Panels idSuffix="-cta" height={760} />}

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="consulting-cta-grid">
          <div className="fade-up consulting-cta-copy">
            <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 22 }}>
              Next step
            </div>
            <h2 className="mixed-weight" style={{
              fontSize: "var(--fs-h1)", lineHeight: 1.05, letterSpacing: "-0.028em",
              margin: "0 0 32px", color: "var(--ink)", maxWidth: "18ch",
            }}>
              Let us design a <em>customized solution</em> for you.
            </h2>
            <p style={{ fontSize: 19, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "56ch", margin: "0 0 36px" }}>
              Download our Technical Data and Consulting marketing one-pager or contact us today to see how we can design a customized solution for you.
            </p>
            <div className="consulting-cta-actions">
              <a href="#contacts" className="btn">Contact us today</a>
              <a href="#" className="btn btn-ghost consulting-cta-pager">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5v9M4 6.5l4 4 4-4M2 13.5h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Download one-pager (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .consulting-cta-grid {
          max-width: 880px;
        }
        .consulting-cta-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .consulting-cta-pager svg { margin-right: 2px; }
        @media (max-width: 980px) {
          .consulting-cta-grid {
            gap: 56px;
          }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   8. CONSULTING CONTACTS — numbered routing index. The information is
   simple (3 people + emails), so the treatment is editorial rather than
   a card grid: "who to ask, about what," with each contact framed as a
   routing decision. Big mono number left, the route description middle,
   the named contact + email on the right. Reads like a procedure entry
   from a technical spec — native to the brand voice.
   ========================================================================= */
const CONTACTS = [
  {
    number: "01",
    route: "For scoping calls, technical strategy, and project leadership.",
    name: "Bill Wendel",
    role: "Consulting Services Director",
    email: "bill.wendel@pentecom.com",
  },
  {
    number: "02",
    route: "For engagements, contracts, and program intake.",
    name: "Susan Fort",
    role: "Business Development Manager",
    email: "susan.fort@pentecom.com",
  },
  {
    number: "03",
    route: "For anything else. We’ll route it to the right person.",
    name: "General",
    role: "Info inbox",
    email: "info@pentecom.com",
  },
];

const ConsultingContacts = () => {
  useInViewC();
  return (
    <section id="contacts" className="sec-pad" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="consulting-section-head fade-up">
          <div className="mono" style={{ color: "var(--ink-2)", marginBottom: 22 }}>
            ▪ Directory
          </div>
          <h2 className="mixed-weight" style={{
            fontSize: "var(--fs-h2)", lineHeight: 1.08, letterSpacing: "-0.025em",
            margin: 0, color: "var(--ink)", maxWidth: "22ch",
          }}>
            Who to ask, <em>about what.</em>
          </h2>
        </div>

        <div className="contacts-index fade-up">
          {CONTACTS.map((c) => (
            <a key={c.email} href={`mailto:${c.email}`} className="contacts-index-row">
              <div className="contacts-index-num mono">{c.number}</div>
              <div className="contacts-index-person">
                <div className="contacts-index-name">{c.name}</div>
                <div className="mono contacts-index-role">{c.role}</div>
              </div>
              <div className="contacts-index-route">{c.route}</div>
              <div className="contacts-index-email">
                <span>{c.email}</span>
                <span aria-hidden="true" className="contacts-index-arrow">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .contacts-index {
          margin-top: 56px;
          border-top: 1px solid var(--line-2);
          /* Grid is on the PARENT so every row's columns align across
             rows. Each row uses subgrid to inherit these column widths. */
          display: grid;
          grid-template-columns: 80px minmax(220px, 1fr) minmax(0, 1.4fr) auto;
          column-gap: 48px;
        }
        .contacts-index-row {
          display: grid;
          grid-template-columns: subgrid;
          grid-column: 1 / -1;
          align-items: baseline;
          padding: 36px 0;
          border-bottom: 1px solid var(--line-2);
          text-decoration: none;
          color: inherit;
          transition: padding 240ms ease, background 240ms ease;
        }
        .contacts-index-row:hover {
          padding-left: 16px;
          padding-right: 16px;
        }
        .contacts-index-num {
          font-size: 13px;
          color: var(--pentecon-blue);
          letter-spacing: 0.18em;
        }
        .contacts-index-route {
          font-size: 18px;
          line-height: 1.45;
          color: var(--ink);
          font-weight: 400;
          max-width: 36ch;
          text-wrap: pretty;
        }
        .contacts-index-person {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .contacts-index-name {
          font-size: clamp(26px, 2.6vw, 36px);
          line-height: 1.05;
          letter-spacing: -0.022em;
          font-weight: 300;
          color: var(--ink);
        }
        .contacts-index-role {
          color: var(--ink-3);
          font-size: 11px;
        }
        .contacts-index-email {
          display: flex;
          align-items: baseline;
          gap: 14px;
          justify-content: flex-end;
          font-family: 'Geist Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.04em;
          color: var(--pentecon-blue);
          transition: color 200ms ease;
          white-space: nowrap;
        }
        .contacts-index-arrow {
          display: inline-block;
          transition: transform 240ms ease;
        }
        .contacts-index-row:hover .contacts-index-email {
          color: #a4baf5;
        }
        .contacts-index-row:hover .contacts-index-arrow {
          transform: translateX(6px);
        }
        @media (max-width: 1000px) {
          .contacts-index {
            display: block;
          }
          .contacts-index-row {
            display: grid;
            grid-template-columns: 64px 1fr;
            grid-template-rows: auto auto auto;
            gap: 12px 24px;
            padding: 28px 0;
          }
          .contacts-index-num {
            grid-row: 1;
            grid-column: 1;
          }
          .contacts-index-person {
            grid-row: 1;
            grid-column: 2;
          }
          .contacts-index-route {
            grid-row: 2;
            grid-column: 1 / -1;
            padding-top: 12px;
          }
          .contacts-index-email {
            grid-row: 3;
            grid-column: 1 / -1;
            justify-content: flex-start;
          }
          .contacts-index-row:hover {
            padding-left: 0;
            padding-right: 0;
          }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   APP — Consulting page root.
   ========================================================================= */
export default function ConsultingContent() {
  return (
    <React.Fragment>
      <ConsultingSharedStyles />
      <ConsultingHero />
      <ConsultingTrust />
      <ConsultingExpertise />
      <ConsultingWhyExperts />
      <ConsultingHowWeHelp />
      <ConsultingServices />
      <ConsultingContacts />
      <ConsultingCta />
    </React.Fragment>
  );
}

