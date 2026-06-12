/* eslint-disable */
import React, { useState, useMemo } from 'react';
import { useInView3 } from '../home/HomeSectionsA.jsx';
import { ArticleArt } from './ArticleArt.jsx';
import { ARTICLES, CATEGORIES, hueFor } from '../../data/articles.js';

/* =========================================================================
   HERO + FEATURED
   ========================================================================= */
const NewsHero = () => {
  useInView3();
  const featured = ARTICLES.find(a => a.featured) || ARTICLES[0];
  return (
    <section id="news-hero" style={{ paddingTop: 56, paddingBottom: 56 }}>
      <div className="container">
        <div className="news-hero-head fade-up">
          <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 22 }}>Newsroom</div>
          <h1 className="mixed-weight" style={{ fontSize: "var(--fs-h1)", lineHeight: 1.02, letterSpacing: "-0.03em", margin: "0 0 18px", maxWidth: "20ch", color: "var(--ink)" }}>
            Current <em>News</em>.
          </h1>
          <p style={{ fontSize: 19, color: "var(--ink-2)", lineHeight: 1.5, margin: 0, maxWidth: "62ch" }}>
            Releases, postmortems, contract announcements, and the small operational observations that show up in our daily work. Plain language, no marketing voice.
          </p>
        </div>

        <a href={`/news/${featured.id}`} className="news-feat fade-up" aria-labelledby={`feat-title-${featured.id}`}>
          <div className="news-feat-art" aria-hidden="true">
            <ArticleArt kind={featured.art} hue={hueFor(featured.id)} />
            <div className="news-feat-art-overlay">
              <span className="mono">Featured ▪ {featured.tag}</span>
            </div>
          </div>
          <div className="news-feat-body">
            <div className="news-feat-meta">
              <time className="mono" dateTime={featured.iso}>{featured.date}</time>
              <span aria-hidden="true">▪</span>
              <span className="news-feat-cat mono">{featured.cat}</span>
              <span aria-hidden="true">▪</span>
              <span className="mono" style={{ color: "var(--ink-3)" }}>{featured.read} min read</span>
            </div>
            <h2 id={`feat-title-${featured.id}`} className="news-feat-title">{featured.title}</h2>
            <p className="news-feat-excerpt">{featured.excerpt}</p>
            <span className="news-feat-cta">
              Read the article
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </a>
      </div>
      <style>{`
        .news-hero-head { margin-bottom: 56px; }
        .news-feat {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 0;
          border: 1px solid var(--line-2);
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-2);
          color: var(--ink);
          isolation: isolate;
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }
        .news-feat:hover,
        .news-feat:focus-visible {
          border-color: rgba(125,154,239,0.35);
          box-shadow: 0 40px 80px -40px rgba(0,0,0,0.6);
          transform: translateY(-2px);
        }
        .news-feat-art {
          position: relative;
          aspect-ratio: 4 / 3;
          background: #000;
          overflow: hidden;
          min-height: 320px;
        }
        .news-feat-art svg { width: 100%; height: 100%; object-fit: cover; }
        .news-feat-art-overlay {
          position: absolute;
          inset: auto 0 0 0;
          padding: 14px 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
          color: rgba(255,255,255,0.95);
        }
        .news-feat-body {
          padding: 56px 56px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
        }
        .news-feat-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--ink-3);
          font-size: 12px;
        }
        .news-feat-cat { color: var(--pentecon-blue); }
        .news-feat-title {
          margin: 0;
          font-size: clamp(26px, 2.4vw, 36px);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.18;
          color: var(--ink);
        }
        .news-feat-excerpt {
          margin: 0;
          font-size: 17px;
          color: var(--ink-2);
          line-height: 1.55;
          max-width: 56ch;
        }
        .news-feat-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
          padding-bottom: 4px;
          color: var(--pentecon-blue);
          font-weight: 500;
          align-self: flex-start;
          border-bottom: 1px solid rgba(125,154,239,0.45);
          transition: gap 200ms ease;
        }
        .news-feat:hover .news-feat-cta,
        .news-feat:focus-visible .news-feat-cta { gap: 16px; }
        @media (max-width: 1000px) {
          .news-feat { grid-template-columns: 1fr; }
          .news-feat-art { aspect-ratio: 16 / 9; min-height: 0; }
          .news-feat-body { padding: 32px 28px 32px; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   FILTER + GRID
   ========================================================================= */
const NewsGrid = () => {
  useInView3();
  const [cat, setCat] = useState("All");
  const visible = useMemo(() =>
    ARTICLES.filter(a => !a.featured).filter(a => cat === "All" || a.cat === cat),
  [cat]);

  return (
    <section id="news-grid" className="sec-pad" style={{ paddingTop: 64 }}>
      <div className="container">
        <div className="news-grid-head fade-up">
          <div>
            <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 14 }}>Archive</div>
            <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.015em", margin: 0, color: "var(--ink)" }}>
              All articles
              <span style={{ color: "var(--ink-3)", fontWeight: 400, marginLeft: 10 }}>
                ({visible.length})
              </span>
            </h2>
          </div>
          <div role="tablist" aria-label="Filter by category" className="news-filter-chips">
            {CATEGORIES.map(c => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                className={"news-chip " + (cat === c ? "is-on" : "")}
                onClick={() => setCat(c)}
                type="button"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="news-empty" role="status">
            <p>No articles in this category yet. Try <button type="button" className="news-link" onClick={() => setCat("All")}>All</button>.</p>
          </div>
        ) : (
          <ul className="news-cards fade-up" role="list">
            {visible.map((a) => (
              <li key={a.id} className="news-card-wrap">
                <a href={`/news/${a.id}`} className="news-card" aria-labelledby={`card-title-${a.id}`}>
                  <div className="news-card-art" aria-hidden="true">
                    <ArticleArt kind={a.art} hue={hueFor(a.id)} />
                  </div>
                  <div className="news-card-body">
                    <div className="news-card-meta">
                      <span className="news-card-cat mono">{a.cat}</span>
                      <span aria-hidden="true">▪</span>
                      <time className="mono" dateTime={a.iso}>{a.date}</time>
                    </div>
                    <h3 id={`card-title-${a.id}`} className="news-card-title">{a.title}</h3>
                    <p className="news-card-excerpt">{a.excerpt}</p>
                    <div className="news-card-foot">
                      <span className="mono">{a.tag}</span>
                      <span className="mono" style={{ color: "var(--ink-3)" }}>{a.read} min read</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        <nav aria-label="News pagination" className="news-pagination fade-up">
          <button type="button" className="news-page-btn" disabled aria-label="Previous page">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 4 L6 8 L10 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Previous
          </button>
          <div className="news-page-meta mono">Page 1 of 1</div>
          <button type="button" className="news-page-btn" disabled aria-label="Next page">
            Next
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </nav>
      </div>

      <style>{`
        .news-grid-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--line);
        }
        .news-filter-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .news-chip {
          font: inherit;
          padding: 8px 14px;
          background: transparent;
          color: var(--ink-2);
          border: 1px solid var(--line-2);
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
          transition: border-color 140ms ease, color 140ms ease, background 140ms ease;
        }
        .news-chip:hover { color: var(--ink); border-color: var(--ink-3); }
        .news-chip.is-on {
          color: var(--ink);
          background: rgba(125,154,239,0.10);
          border-color: rgba(125,154,239,0.55);
        }
        .news-cards {
          list-style: none; padding: 0; margin: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px 24px;
        }
        .news-card-wrap { display: contents; }
        .news-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          color: var(--ink);
          border: 1px solid var(--line);
          border-radius: 10px;
          overflow: hidden;
          background: var(--bg-2);
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
        }
        .news-card:hover,
        .news-card:focus-visible {
          transform: translateY(-3px);
          border-color: rgba(125,154,239,0.30);
          box-shadow: 0 28px 60px -32px rgba(0,0,0,0.7);
        }
        .news-card-art {
          aspect-ratio: 16 / 10;
          background: #000;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
        }
        .news-card-body {
          padding: 22px 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .news-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--ink-3);
          font-size: 11px;
        }
        .news-card-cat { color: var(--pentecon-blue); }
        .news-card-title {
          margin: 0;
          font-size: 19px;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: var(--ink);
          text-wrap: pretty;
        }
        .news-card-excerpt {
          margin: 0;
          font-size: 14px;
          color: var(--ink-2);
          line-height: 1.5;
        }
        .news-card-foot {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: var(--ink-2);
        }
        .news-empty {
          padding: 80px 40px;
          text-align: center;
          color: var(--ink-2);
          border: 1px dashed var(--line-2);
          border-radius: 8px;
        }
        .news-empty p { font-size: 17px; margin: 0; }
        .news-link {
          font: inherit;
          background: transparent;
          border: 0;
          color: var(--pentecon-blue);
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }
        .news-pagination {
          margin-top: 56px;
          padding-top: 28px;
          border-top: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .news-page-btn {
          font: inherit;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: transparent;
          border: 1px solid var(--line-2);
          border-radius: 4px;
          color: var(--ink);
          font-size: 14px;
          cursor: pointer;
          transition: border-color 140ms ease, background 140ms ease;
        }
        .news-page-btn:hover:not(:disabled) {
          border-color: var(--pentecon-blue);
          background: rgba(125,154,239,0.06);
        }
        .news-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .news-page-meta { color: var(--ink-3); font-size: 12px; }
        @media (max-width: 1100px) { .news-cards { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) {
          .news-cards { grid-template-columns: 1fr; }
          .news-grid-head { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   NEWSLETTER STRIP
   ========================================================================= */
const NewsletterStrip = () => {
  useInView3();
  const [val, setVal] = useState("");
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section id="news-newsletter" style={{ paddingTop: 0, paddingBottom: 120 }}>
      <div className="container">
        <div className="newsletter-card fade-up">
          <div className="newsletter-art" aria-hidden="true">
            <svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="nlDots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="4" cy="4" r="0.9" fill="rgba(255,255,255,0.40)" />
                </pattern>
              </defs>
              <rect width="240" height="140" fill="hsl(220 50% 12%)" />
              <rect width="240" height="140" fill="url(#nlDots)" />
              <g transform="skewX(-12) translate(30, 0)">
                <rect x="30" y="30" width="60" height="80" fill="hsl(220 55% 28%)" />
                <rect x="36" y="46" width="36" height="3" fill="hsl(220 60% 70%)" />
                <rect x="36" y="56" width="44" height="3" fill="rgba(255,255,255,0.6)" />
                <rect x="36" y="66" width="28" height="3" fill="rgba(255,255,255,0.4)" />
              </g>
            </svg>
          </div>
          <div className="newsletter-body">
            <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 14 }}>The Pentecom dispatch</div>
            <h2 className="mixed-weight" style={{ fontSize: "clamp(26px, 2.4vw, 36px)", lineHeight: 1.1, margin: "0 0 14px", color: "var(--ink)" }}>
              Field notes in your inbox, <em>once a month</em>.
            </h2>
            <p style={{ margin: "0 0 24px", fontSize: 16, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: "52ch" }}>
              Postmortems, standards updates, and the occasional release. We never sell your address; one click unsubscribes.
            </p>
            {sent ? (
              <div role="status" aria-live="polite" className="newsletter-sent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12 L10 17 L20 7" />
                </svg>
                <span>Subscribed. We'll be in touch. Check {val} for confirmation.</span>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="newsletter-form" aria-label="Newsletter signup">
                <label htmlFor="nl-email" className="sr-only">Email address</label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                />
                <button type="submit" className="btn">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .newsletter-card {
          display: grid;
          grid-template-columns: 0.8fr 1.5fr;
          gap: 0;
          border: 1px solid var(--line-2);
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-2);
        }
        .newsletter-art { background: #000; min-height: 240px; }
        .newsletter-body {
          padding: 44px 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .newsletter-form { display: flex; gap: 10px; flex-wrap: wrap; }
        .newsletter-form input {
          flex: 1;
          min-width: 240px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--line-2);
          border-radius: 6px;
          padding: 12px 16px;
          color: var(--ink);
          font: inherit;
          font-size: 15px;
        }
        .newsletter-form input:focus {
          outline: 2px solid var(--pentecon-blue);
          outline-offset: 0;
          border-color: var(--pentecon-blue);
        }
        .newsletter-form input::placeholder { color: var(--ink-4); }
        .newsletter-sent {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 6px;
          background: rgba(125,154,239,0.08);
          color: var(--ink);
          font-size: 15px;
        }
        .newsletter-sent svg { color: var(--pentecon-blue); flex-shrink: 0; }
        .sr-only {
          position: absolute; width: 1px; height: 1px;
          padding: 0; margin: -1px; overflow: hidden;
          clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
        @media (max-width: 900px) {
          .newsletter-card { grid-template-columns: 1fr; }
          .newsletter-body { padding: 32px 28px; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================================
   DEFAULT EXPORT — assembled archive page (no Header/Footer; Layout wraps)
   ========================================================================= */
export default function NewsContent() {
  return (
    <React.Fragment>
      <NewsHero />
      <NewsGrid />
      <NewsletterStrip />
    </React.Fragment>
  );
}
