/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useInView3 } from '../home/HomeSectionsA.jsx';
import { ArticleCoverArt, SmallArt } from './ArticleArt.jsx';
import { ARTICLES, hueFor } from '../../data/articles.js';

/* =========================================================================
   BREADCRUMB
   ========================================================================= */
const ArticleBreadcrumb = ({ article }) => (
  <nav className="ar-breadcrumb" aria-label="Breadcrumb">
    <ol className="ar-breadcrumb-list">
      <li><a href="/">Home</a></li>
      <li aria-hidden="true">›</li>
      <li><a href="/news">News</a></li>
      <li aria-hidden="true">›</li>
      <li><a href={`/news#${article.cat}`}>{article.cat}</a></li>
      <li aria-hidden="true">›</li>
      <li aria-current="page" className="ar-breadcrumb-current">{article.title}</li>
    </ol>
    <style>{`
      .ar-breadcrumb { padding: 36px 0 0; }
      .ar-breadcrumb-list {
        list-style: none;
        padding: 0; margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 8px 10px;
        align-items: center;
        font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
        font-size: 12px;
        letter-spacing: 0.10em;
        text-transform: uppercase;
        color: var(--ink-3);
      }
      .ar-breadcrumb-list a { color: var(--ink-3); }
      .ar-breadcrumb-list a:hover { color: var(--ink); }
      .ar-breadcrumb-current {
        color: var(--ink-2);
        max-width: 60ch;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `}</style>
  </nav>
);

/* =========================================================================
   HEADER — eyebrow, mixed-weight title, byline, share
   ========================================================================= */
const ArticleHeader = ({ article }) => {
  useInView3();
  const words = article.title.split(" ");
  const mid = Math.ceil(words.length / 2);
  const half1 = words.slice(0, mid).join(" ");
  const half2 = words.slice(mid).join(" ");

  return (
    <header className="ar-header">
      <div className="container">
        <div className="fade-up">
          <h1 className="mixed-weight ar-title">
            {half1} <em>{half2}</em>
          </h1>
          <p className="ar-deck">{article.excerpt}</p>
        </div>

        <div className="ar-byline fade-up">
          <div className="ar-byline-author">
            <div className="ar-avatar" aria-hidden="true"><span>RM</span></div>
            <div>
              <div className="ar-byline-name">Rachel Marsh</div>
              <div className="ar-byline-role">Director of Programs</div>
            </div>
          </div>

          <dl className="ar-byline-meta">
            <div>
              <dt>Published</dt>
              <dd><time dateTime={article.iso}>{article.date}</time></dd>
            </div>
            <div>
              <dt>Read</dt>
              <dd>{article.read} min</dd>
            </div>
          </dl>

          <div className="ar-share" role="group" aria-label="Share this article">
            {[
              { label: "Copy link",         kind: "link" },
              { label: "Share on LinkedIn", kind: "linkedin" },
              { label: "Email article",     kind: "email" },
              { label: "Print",             kind: "print" },
            ].map(s => (
              <button key={s.kind} type="button" className="ar-share-btn" aria-label={s.label}>
                {s.kind === "link" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10 14 A4 4 0 0 0 16 14 L19 11 A4 4 0 0 0 13 5 L12 6" />
                    <path d="M14 10 A4 4 0 0 0 8 10 L5 13 A4 4 0 0 0 11 19 L12 18" />
                  </svg>
                )}
                {s.kind === "linkedin" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.01A2.5 2.5 0 014.98 3.5zM3 9.75h4V21H3V9.75zM9.75 9.75h3.83v1.54h.05c.53-1 1.83-2.07 3.77-2.07 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.05c0-1.2-.02-2.75-1.67-2.75-1.67 0-1.93 1.31-1.93 2.66V21h-4V9.75z"/>
                  </svg>
                )}
                {s.kind === "email" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" /><path d="M3 6 L12 14 L21 6" />
                  </svg>
                )}
                {s.kind === "print" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="6" y="3" width="12" height="6" /><rect x="6" y="14" width="12" height="7" /><rect x="3" y="9" width="18" height="8" rx="1" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .ar-header { padding: 16px 0 48px; }
        .ar-eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 28px; color: var(--ink-3);
        }
        .ar-eyebrow-cat { color: var(--pentecon-blue); }
        .ar-title {
          font-size: clamp(36px, 4.4vw, 64px);
          font-weight: 300;
          letter-spacing: -0.028em;
          line-height: 1.05;
          margin: 0 0 28px;
          max-width: 24ch;
          color: var(--ink);
        }
        .ar-title em { font-style: normal; font-weight: 600; }
        .ar-deck {
          font-size: 20px; line-height: 1.5; color: var(--ink-2);
          margin: 0 0 48px; max-width: 58ch; font-weight: 400;
        }
        .ar-byline {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 32px;
          align-items: center;
          padding-top: 32px;
          border-top: 1px solid var(--line);
        }
        .ar-byline-author { display: flex; align-items: center; gap: 14px; }
        .ar-avatar {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, hsl(220 55% 32%), hsl(200 55% 22%));
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.95);
          font-size: 13px; font-weight: 600; letter-spacing: 0.06em;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          border-radius: 2px;
          transform: skewX(-12deg);
        }
        .ar-avatar span { transform: skewX(12deg); }
        .ar-byline-name { font-size: 15px; font-weight: 500; color: var(--ink); letter-spacing: -0.005em; }
        .ar-byline-role { font-size: 13px; color: var(--ink-3); margin-top: 2px; }
        .ar-byline-meta { display: flex; gap: 0; margin: 0; padding: 0; }
        .ar-byline-meta > div { padding: 0 18px; border-left: 1px solid var(--line-2); }
        .ar-byline-meta > div:first-child { border-left: none; padding-left: 0; }
        .ar-byline-meta dt {
          font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-3); margin-bottom: 4px;
        }
        .ar-byline-meta dd { margin: 0; font-size: 14px; color: var(--ink); }
        .ar-share { display: flex; gap: 8px; }
        .ar-share-btn {
          width: 38px; height: 38px;
          background: transparent; border: 1px solid var(--line-2); border-radius: 4px;
          color: var(--ink-2);
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 140ms ease, color 140ms ease, background 140ms ease;
        }
        .ar-share-btn:hover, .ar-share-btn:focus-visible {
          color: var(--ink); border-color: var(--pentecon-blue); background: rgba(125,154,239,0.06);
        }
        @media (max-width: 880px) {
          .ar-byline { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </header>
  );
};

/* =========================================================================
   COVER
   ========================================================================= */
const ArticleCover = ({ article }) => (
  <section className="ar-cover">
    <div className="container">
      <figure className="ar-cover-fig fade-up">
        <div className="ar-cover-frame">
          <ArticleCoverArt kind={article.art} hue={hueFor(article.id)} />
          <div className="ar-cover-frame-header" aria-hidden="true">
            <span className="mono">{article.cat} ▪ {article.tag}</span>
            <span className="mono ar-cover-frame-meta">SPECIMEN — abstracted</span>
          </div>
        </div>
        <figcaption className="mono ar-cover-cap">
          Figure 01 ▪ A schematic of the work referenced in this article. Specimens are abstracted from any client material.
        </figcaption>
      </figure>
    </div>
    <style>{`
      .ar-cover { padding: 48px 0 0; }
      .ar-cover-fig { margin: 0; }
      .ar-cover-frame {
        position: relative;
        aspect-ratio: 12 / 5;
        background: #000;
        border: 1px solid var(--line-2);
        border-radius: 10px;
        overflow: hidden;
        color: var(--ink);
      }
      .ar-cover-frame-header {
        position: absolute;
        top: 18px; left: 22px; right: 22px;
        display: flex; justify-content: space-between; align-items: center; gap: 16px;
        color: rgba(255,255,255,0.7);
        font-size: 11px;
        pointer-events: none;
      }
      .ar-cover-cap {
        margin-top: 14px;
        color: var(--ink-3);
        text-transform: none;
        letter-spacing: 0.10em;
        font-size: 12px;
        max-width: 80ch;
      }
      @media (max-width: 800px) {
        .ar-cover-frame { aspect-ratio: 4 / 3; }
      }
    `}</style>
  </section>
);

/* =========================================================================
   BODY — sticky TOC + prose
   ========================================================================= */
const TOC = [
  { id: "lede",       label: "The situation" },
  { id: "approach",   label: "Our approach" },
  { id: "discipline", label: "Evidence discipline" },
  { id: "results",    label: "Results" },
  { id: "lessons",    label: "What we'd repeat" },
];

const ArticleBody = ({ article }) => {
  useInView3();
  const [activeId, setActiveId] = useState("lede");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const el = document.getElementById("ar-body");
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight + 100;
        const done = Math.max(0, -rect.top + 100);
        setProgress(Math.max(0, Math.min(1, done / total)));
      }
      const tops = TOC.map(t => {
        const node = document.getElementById(t.id);
        return node ? { id: t.id, top: node.getBoundingClientRect().top } : null;
      }).filter(Boolean);
      const current = tops.reduce((acc, x) => x.top < 160 ? x : acc, tops[0]);
      if (current) setActiveId(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const h = hueFor(article.id);

  return (
    <section className="ar-body sec-pad" id="ar-body" style={{ paddingTop: 80, paddingBottom: 96 }}>
      <div className="container">
        <div className="ar-body-grid">
          <aside className="ar-toc" aria-label="Table of contents">
            <div className="mono ar-toc-eyebrow">In this article</div>
            <ol className="ar-toc-list">
              {TOC.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className={"ar-toc-link " + (activeId === t.id ? "is-on" : "")}>
                    <span className="ar-toc-num mono">{String(i + 1).padStart(2, "0")}</span>
                    <span>{t.label}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="ar-toc-progress" aria-hidden="true">
              <div className="ar-toc-progress-track">
                <div className="ar-toc-progress-fill" style={{ height: `${progress * 100}%` }} />
              </div>
              <div className="mono ar-toc-progress-label">{Math.round(progress * 100)}%</div>
            </div>
          </aside>

          <article className="ar-prose">
            <p id="lede" className="ar-lede">
              {article.excerpt} What follows is a plain-language walk-through of the engagement: how it landed on our bench, the discipline we held, and what the team learned at the cutover.
            </p>

            <h2 className="ar-h2"><a href="#lede" aria-hidden="true" className="ar-anchor">§</a>The situation</h2>
            <p>
              The client came to us with a familiar inheritance: dozens of authoring systems, a manual conversion shop, and a deadline anchored to a procurement gate. Their last vendor had delivered records that passed a smoke test but failed the assessor's full review. Trust was thin. Time was thinner.
            </p>
            <p>
              We took the work in three phases, billed on phase-end deliverables, with a documented exit before each next phase began. Nothing fancy. Just the rhythm that's let us cut over thirty-plus programs without rolling back.
            </p>

            <blockquote className="ar-quote">
              <p>
                "The cleanest cutover we've ever signed. Engineering discipline, top to bottom. The audit packet read like a forensic notebook."
              </p>
              <footer>
                <strong>VP, Data Programs</strong>
                <span>Defense Prime ▪ Cleared</span>
              </footer>
            </blockquote>

            <h2 id="approach" className="ar-h2"><a href="#approach" aria-hidden="true" className="ar-anchor">§</a>Our approach</h2>
            <p>
              Conversion is not a one-shot operation. We treat every record like an evidence object: source-tagged, validated against a schema we author together with the client, and signed off in a written ledger that both teams can read in one sitting.
            </p>

            <h3 className="ar-h3">Three commitments we made on day one</h3>
            <ul className="ar-list">
              <li>Every record reconciled by tool, not by hand, with the deltas surfaced for triage.</li>
              <li>No shadow phases. The pipeline ran in production alongside live data the entire engagement.</li>
              <li>A written go/no-go at every phase boundary, signed by both program leads.</li>
            </ul>

            <p>
              We pair every conversion engineer with a documentarian. Half the value of the work is the audit packet you can hand an assessor. The other half is the bench-level discipline that produced it.
            </p>

            <figure className="ar-figure">
              <div className="ar-figure-frame">
                <svg viewBox="0 0 800 360" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
                  <rect width="800" height="360" fill={`hsl(${h} 40% 10%)`} />
                  <g stroke="rgba(255,255,255,0.07)">
                    {[120, 280, 440, 600].map(x => <line key={x} x1={x} y1="20" x2={x} y2="340" />)}
                    {[60, 130, 200, 270].map(y => <line key={y} x1="40" y1={y} x2="760" y2={y} />)}
                  </g>
                  <g stroke={`hsl(${h} 60% 65%)`} strokeWidth="1" fill="none">
                    <path d="M40 280 L160 240 L280 250 L400 180 L520 200 L640 150 L760 110" />
                    <path d="M40 300 L160 290 L280 270 L400 240 L520 220 L640 200 L760 180" strokeOpacity="0.45" strokeDasharray="3 3" />
                  </g>
                  <g fill={`hsl(${h} 60% 70%)`}>
                    {[[40,280],[160,240],[280,250],[400,180],[520,200],[640,150],[760,110]].map(([x,y]) => (
                      <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
                    ))}
                  </g>
                  <text x="40" y="334" fontFamily="Geist Mono, IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.5)">WEEK 1</text>
                  <text x="780" y="334" textAnchor="end" fontFamily="Geist Mono, IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.5)">CUTOVER</text>
                  <text x="40" y="50" fontFamily="Geist Mono, IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.5)">100%</text>
                  <text x="40" y="290" fontFamily="Geist Mono, IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.5)">0%</text>
                </svg>
              </div>
              <figcaption className="ar-figcap">
                <span className="mono">Figure 02</span>
                Records-passing-validation curve across the engagement. Dashed line: prior vendor baseline. Solid: this engagement.
              </figcaption>
            </figure>

            <h2 id="discipline" className="ar-h2"><a href="#discipline" aria-hidden="true" className="ar-anchor">§</a>Evidence discipline</h2>
            <p>
              The single most important habit we hold across every engagement: every transformation is paired with its evidence. If the tool changes a record, the diff lands in the ledger. If a human signs off on a transformation, the signature lands in the ledger. There is no story without a citation.
            </p>

            <aside className="ar-callout" role="note" aria-label="Key takeaway">
              <div className="ar-callout-tag mono">Key takeaway</div>
              <p>
                Assessors don't fail you for the work. They fail you for the gaps in the evidence trail. Build the trail first, run the work through it, and the audit becomes a reading exercise.
              </p>
            </aside>

            <h2 id="results" className="ar-h2"><a href="#results" aria-hidden="true" className="ar-anchor">§</a>Results</h2>
            <p>
              The engagement landed inside the program's procurement gate. The assessor accepted the audit packet on first review. We left documentation, runbooks, and a ninety-day standby in place for the program team to run themselves.
            </p>

            <div className="ar-keystats">
              {[
                { v: "180M",  k: "Records converted, audited, signed" },
                { v: "100%",  k: "Audit pass on first review" },
                { v: "11 wk", k: "From kickoff to cutover" },
                { v: "0",     k: "Records reconciled by hand" },
              ].map(s => (
                <div key={s.k} className="ar-keystat">
                  <div className="ar-keystat-v">{s.v}</div>
                  <div className="ar-keystat-k mono">{s.k}</div>
                </div>
              ))}
            </div>

            <h2 id="lessons" className="ar-h2"><a href="#lessons" aria-hidden="true" className="ar-anchor">§</a>What we'd repeat</h2>
            <p>
              If we ran the engagement again, we'd hold every habit. The discipline costs nothing once it's set; what it earns is the only currency that matters at the cutover: confidence.
            </p>
            <p>
              If you're staring down a similar conversion — different domain, same nerves — we'd be glad to hear about it. Sixty minutes with a senior engineer. No deck. No discovery fee. The number is at the bottom of the page.
            </p>
          </article>
        </div>
      </div>

      <style>{`
        .ar-body-grid {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          gap: 88px;
          align-items: start;
        }
        .ar-toc { position: sticky; top: 160px; font-size: 14px; }
        .ar-toc-eyebrow { color: var(--ink-3); margin-bottom: 22px; }
        .ar-toc-list { list-style: none; padding: 0; margin: 0 0 32px; display: flex; flex-direction: column; }
        .ar-toc-link {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 4px;
          align-items: baseline;
          padding: 10px 0;
          color: var(--ink-3);
          border-top: 1px solid var(--line);
          transition: color 140ms ease;
          font-size: 14px;
        }
        .ar-toc-list li:first-child .ar-toc-link { border-top: none; }
        .ar-toc-num { color: var(--ink-4); font-size: 11px; }
        .ar-toc-link.is-on { color: var(--ink); }
        .ar-toc-link.is-on .ar-toc-num { color: var(--pentecon-blue); }
        .ar-toc-link:hover { color: var(--ink); }
        .ar-toc-progress { display: flex; align-items: center; gap: 12px; }
        .ar-toc-progress-track {
          width: 3px; height: 80px;
          background: var(--line);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }
        .ar-toc-progress-fill { width: 100%; background: var(--pentecon-blue); transition: height 120ms linear; }
        .ar-toc-progress-label { font-size: 11px; color: var(--ink-3); }

        .ar-prose { max-width: 72ch; font-size: 18px; line-height: 1.65; color: var(--ink-2); }
        .ar-prose p { margin: 0 0 22px; text-wrap: pretty; }
        .ar-lede {
          font-size: 22px; line-height: 1.55; color: var(--ink); font-weight: 400;
          letter-spacing: -0.005em; margin: 0 0 40px;
          padding-bottom: 32px; border-bottom: 1px solid var(--line);
        }
        .ar-h2 {
          position: relative;
          font-size: 28px; font-weight: 500; letter-spacing: -0.015em; line-height: 1.2;
          color: var(--ink); margin: 56px 0 22px;
          scroll-margin-top: 140px;
        }
        .ar-h3 {
          font-size: 19px; font-weight: 500; letter-spacing: -0.005em; line-height: 1.3;
          color: var(--ink); margin: 32px 0 14px;
        }
        .ar-anchor {
          position: absolute; left: -28px; color: var(--ink-4); font-weight: 300;
          opacity: 0; transition: opacity 140ms ease, color 140ms ease;
        }
        .ar-h2:hover .ar-anchor { opacity: 1; }
        .ar-anchor:hover { color: var(--pentecon-blue); }
        .ar-list { margin: 0 0 22px; padding-left: 22px; list-style: square; }
        .ar-list li { margin-bottom: 8px; }
        .ar-list li::marker { color: var(--pentecon-blue); }
        .ar-quote {
          margin: 40px 0; padding: 28px 32px;
          border-left: 3px solid var(--pentecon-blue);
          background: rgba(125,154,239,0.04);
          border-radius: 0 6px 6px 0;
        }
        .ar-quote p { margin: 0 0 14px; font-size: 22px; line-height: 1.45; color: var(--ink); font-weight: 400; letter-spacing: -0.005em; }
        .ar-quote footer { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ink-3); flex-wrap: wrap; }
        .ar-quote footer strong { color: var(--ink); font-weight: 500; }
        .ar-figure { margin: 44px 0; }
        .ar-figure-frame {
          aspect-ratio: 20 / 9;
          background: #000; border: 1px solid var(--line-2); border-radius: 8px; overflow: hidden;
        }
        .ar-figcap {
          margin-top: 12px; display: flex; align-items: baseline; gap: 14px;
          font-size: 13px; color: var(--ink-3); line-height: 1.55; padding: 0 4px;
        }
        .ar-figcap .mono { color: var(--ink-2); flex-shrink: 0; }
        .ar-callout {
          margin: 40px 0; padding: 26px 28px;
          border: 1px solid var(--line-2); border-radius: 8px;
          background: radial-gradient(circle at 0% 0%, rgba(125,154,239,0.10), transparent 60%), var(--bg-2);
        }
        .ar-callout-tag { color: var(--pentecon-blue); margin-bottom: 10px; }
        .ar-callout p { margin: 0; font-size: 17px; color: var(--ink); line-height: 1.55; }
        .ar-keystats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
          margin: 36px 0; padding: 28px 0;
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .ar-keystat { padding: 0 20px; border-left: 1px solid var(--line); }
        .ar-keystat:first-child { border-left: none; padding-left: 0; }
        .ar-keystat-v {
          font-size: 32px; font-weight: 500; letter-spacing: -0.02em; color: var(--ink);
          font-variant-numeric: tabular-nums; margin-bottom: 6px; line-height: 1;
        }
        .ar-keystat-k { color: var(--ink-3); font-size: 11px; line-height: 1.45; }
        @media (max-width: 1000px) {
          .ar-body-grid { grid-template-columns: 1fr; gap: 32px; }
          .ar-toc { position: static; }
        }
        @media (max-width: 640px) {
          .ar-keystats { grid-template-columns: 1fr 1fr; row-gap: 20px; }
          .ar-keystat:nth-child(odd) { border-left: none; padding-left: 0; }
          .ar-prose { font-size: 17px; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   TAGS
   ========================================================================= */
const ArticleTags = ({ article }) => {
  const tags = ["S1000D", "Conversion", "Audit", "CMMC", "Aerospace", article.cat];
  return (
    <section className="ar-tags-section">
      <div className="container">
        <div className="ar-tags fade-up">
          <div className="mono ar-tags-label">Tags</div>
          <ul className="ar-tags-list" role="list">
            {tags.map(t => (
              <li key={t}>
                <a href={`/news?cat=${encodeURIComponent(t)}`} className="ar-tag">{t}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`
        .ar-tags-section { padding: 0 0 48px; }
        .ar-tags {
          display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center;
          padding: 24px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .ar-tags-label { color: var(--ink-3); }
        .ar-tags-list { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 8px; }
        .ar-tag {
          display: inline-flex; padding: 6px 12px;
          font-family: 'Geist Mono', 'IBM Plex Mono', monospace;
          font-size: 12px; letter-spacing: 0.06em;
          color: var(--ink);
          border: 1px solid var(--line-2); border-radius: 3px;
          background: rgba(255,255,255,0.02);
          transition: border-color 140ms ease, color 140ms ease, background 140ms ease;
        }
        .ar-tag:hover {
          border-color: var(--pentecon-blue); color: var(--pentecon-blue); background: rgba(125,154,239,0.06);
        }
        @media (max-width: 640px) { .ar-tags { grid-template-columns: 1fr; gap: 12px; } }
      `}</style>
    </section>
  );
};

/* =========================================================================
   AUTHOR BIO
   ========================================================================= */
const ArticleAuthor = () => (
  <section className="ar-author-section">
    <div className="container">
      <article className="ar-author fade-up">
        <div className="ar-author-avatar" aria-hidden="true"><span>RM</span></div>
        <div className="ar-author-body">
          <div className="mono ar-author-eyebrow">About the author</div>
          <h3 className="ar-author-name">Rachel Marsh</h3>
          <div className="ar-author-title">Director of Programs ▪ Pentecom</div>
          <p className="ar-author-bio">
            Rachel runs Pentecom's conversion practice. Twenty-two years across aerospace and defense; sits on three S1000D working groups. She'd rather walk you through a record than show you a slide.
          </p>
          <div className="ar-author-links">
            <a href="mailto:rachel@pentecom.co">rachel@pentecom.co</a>
            <span aria-hidden="true">▪</span>
            <a href="/news">More from the newsroom →</a>
          </div>
        </div>
      </article>
    </div>
    <style>{`
      .ar-author-section { padding: 0 0 96px; }
      .ar-author {
        display: grid; grid-template-columns: auto 1fr; gap: 32px;
        align-items: flex-start; padding: 36px;
        border: 1px solid var(--line); border-radius: 12px; background: var(--bg-2);
      }
      .ar-author-avatar {
        width: 92px; height: 92px;
        background: linear-gradient(135deg, hsl(220 55% 32%), hsl(200 55% 22%));
        border: 1px solid rgba(255,255,255,0.18);
        color: rgba(255,255,255,0.95);
        font-size: 26px; font-weight: 600; letter-spacing: 0.06em;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; border-radius: 4px; transform: skewX(-12deg);
      }
      .ar-author-avatar span { transform: skewX(12deg); }
      .ar-author-eyebrow { color: var(--ink-3); margin-bottom: 10px; }
      .ar-author-name { margin: 0 0 6px; font-size: 24px; font-weight: 500; letter-spacing: -0.015em; color: var(--ink); }
      .ar-author-title { font-size: 14px; color: var(--ink-3); margin-bottom: 14px; }
      .ar-author-bio { margin: 0 0 18px; font-size: 16px; color: var(--ink-2); line-height: 1.55; max-width: 58ch; }
      .ar-author-links { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; font-size: 14px; color: var(--ink-3); }
      .ar-author-links a { color: var(--pentecon-blue); }
      .ar-author-links a:hover { color: #a4baf5; }
      @media (max-width: 640px) { .ar-author { grid-template-columns: 1fr; padding: 28px 24px; } }
    `}</style>
  </section>
);

/* =========================================================================
   RELATED
   ========================================================================= */
const ArticleRelated = ({ items }) => (
  <section className="ar-related sec-pad" style={{ paddingTop: 80, paddingBottom: 120, borderTop: "1px solid var(--line)" }}>
    <div className="container">
      <div className="ar-related-head fade-up">
        <div>
          <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 14 }}>Keep reading</div>
          <h2 className="mixed-weight" style={{ fontSize: "var(--fs-h2)", lineHeight: 1.1, margin: 0, color: "var(--ink)" }}>
            More from the <em>newsroom</em>.
          </h2>
        </div>
        <a href="/news" className="btn btn-ghost">All news</a>
      </div>

      <ul className="ar-related-list" role="list">
        {items.map(a => (
          <li key={a.id}>
            <a href={`/news/${a.id}`} className="ar-related-card">
              <div className="ar-related-art" aria-hidden="true">
                <SmallArt kind={a.art} hue={hueFor(a.id)} />
              </div>
              <div className="ar-related-body">
                <div className="ar-related-meta">
                  <span className="mono" style={{ color: "var(--pentecon-blue)" }}>{a.cat}</span>
                  <span aria-hidden="true">▪</span>
                  <time className="mono" dateTime={a.iso}>{a.date}</time>
                </div>
                <h3 className="ar-related-title">{a.title}</h3>
                <p className="ar-related-excerpt">{a.excerpt}</p>
                <span className="ar-related-cta">Read article →</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
    <style>{`
      .ar-related-head {
        display: flex; justify-content: space-between; align-items: end;
        gap: 24px; margin-bottom: 40px; flex-wrap: wrap;
      }
      .ar-related-list {
        list-style: none; padding: 0; margin: 0;
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
      }
      .ar-related-card {
        display: flex; flex-direction: column; height: 100%;
        color: var(--ink); border: 1px solid var(--line);
        border-radius: 10px; overflow: hidden; background: var(--bg-2);
        transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
      }
      .ar-related-card:hover, .ar-related-card:focus-visible {
        transform: translateY(-3px);
        border-color: rgba(125,154,239,0.30);
        box-shadow: 0 28px 60px -32px rgba(0,0,0,0.7);
      }
      .ar-related-art { aspect-ratio: 16 / 10; background: #000; border-bottom: 1px solid var(--line); }
      .ar-related-body { padding: 22px 22px 24px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
      .ar-related-meta { display: flex; gap: 8px; color: var(--ink-3); font-size: 11px; }
      .ar-related-title { margin: 0; font-size: 18px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.3; color: var(--ink); text-wrap: pretty; }
      .ar-related-excerpt { margin: 0; font-size: 14px; color: var(--ink-2); line-height: 1.5; }
      .ar-related-cta { margin-top: auto; padding-top: 8px; color: var(--pentecon-blue); font-size: 14px; font-weight: 500; }
      @media (max-width: 1000px) { .ar-related-list { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 640px) { .ar-related-list { grid-template-columns: 1fr; } }
    `}</style>
  </section>
);

/* =========================================================================
   DEFAULT EXPORT — assembled single article page
   ========================================================================= */
export default function NewsArticleContent({ slug }) {
  const found = ARTICLES.find(a => a.id === slug);
  const article = found || ARTICLES[0];
  const related = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <React.Fragment>
      <div className="container">
        <ArticleBreadcrumb article={article} />
      </div>
      <ArticleHeader article={article} />
      <ArticleCover article={article} />
      <ArticleBody article={article} />
      <ArticleTags article={article} />
      <ArticleAuthor />
      <ArticleRelated items={related} />
    </React.Fragment>
  );
}
