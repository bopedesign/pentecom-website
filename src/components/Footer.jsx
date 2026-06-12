import React from 'react';

const FOOTER_MENUS = [
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

const FOOTER_CERTS = [
  { src: "/assets/cert-esop.png",         alt: "ESOP. Employee Stock Ownership Plan" },
  { src: "/assets/cert-hubzone.png",      alt: "SBA HUBZone Certified" },
  { src: "/assets/cert-we-hire-vets.png", alt: "2026 We Hire Vets" },
  { src: "/assets/cert-wosb.png",         alt: "SBA WOSB Certified. Women-Owned Small Business" },
];

export default function Footer() {
  const menus = FOOTER_MENUS.map(col =>
    col.t === "Solutions"
      ? { ...col, l: [
          ...col.l.filter(i => !i.sub),
          { name: "All solutions →", all: true },
        ] }
      : col
  );

  return (
    <footer className="footer-13" style={{ paddingTop: 80, paddingBottom: 28 }}>
      <div className="container">

        {/* 1. BRAND ROW */}
        <div className="footer-13-brand-row">
          <div className="footer-13-brand">
            <a href="/" style={{ display: "inline-flex", alignItems: "center", marginBottom: 20 }} aria-label="Pentecom">
              <img src="/assets/pentecon-logo-home3.png" alt="Pentecom. Experience. Expertise. Excellence." style={{ display: "block", height: 56, width: "auto" }} />
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

        {/* 3. CONTACT STRIP */}
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

        {/* 4. CERTIFICATIONS */}
        <div className="footer-13-certs">
          <div className="mono footer-13-certs-eyebrow">Certifications &amp; Affiliations</div>
          <ul className="footer-13-certs-list">
            {FOOTER_CERTS.map(c => (
              <li key={c.src} className="footer-13-cert-item">
                <img src={c.src} alt={c.alt} />
              </li>
            ))}
          </ul>
        </div>

        {/* 5. BOTTOM */}
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

        .footer-13-col-all {
          font-family: 'Geist Mono', 'IBM Plex Mono', monospace !important;
          font-size: 12px !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase !important;
          color: var(--ink-3) !important;
          margin-top: 8px !important;
        }
        .footer-13-col-all:hover { color: var(--ink) !important; }

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
}
