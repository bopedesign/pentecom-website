/* eslint-disable */
/* Pentecom — news article data
   Single source of truth for the news archive and single-article pages.
   In production, replace with Sanity queries. */

export const ARTICLES = [
  {
    id: "s1000d-tier1-contract",
    date: "May 02, 2026",
    iso: "2026-05-02",
    tag: "Press release",
    cat: "Company",
    read: 4,
    title: "Pentecom awarded multi-year S1000D conversion contract for Tier-1 airframe OEM",
    excerpt: "An eight-figure modernization program spanning four product lines and three publication formats, with cutover scheduled inside the year.",
    art: "stack",
    featured: true,
  },
  {
    id: "cmmc-level-2-11-weeks",
    date: "Apr 18, 2026",
    iso: "2026-04-18",
    tag: "Case study",
    cat: "Defense",
    read: 8,
    title: "Achieving CMMC Level 2 readiness for a 2,400-record CUI environment in eleven weeks",
    excerpt: "Disciplined scope, evidence-first migration, and what the assessor actually asked for at the bench.",
    art: "datafield",
  },
  {
    id: "fda-part-11-five-mistakes",
    date: "Apr 03, 2026",
    iso: "2026-04-03",
    tag: "Field note",
    cat: "Medical",
    read: 6,
    title: "FDA 21 CFR Part 11. Five mistakes we keep seeing in clinical data migrations.",
    excerpt: "Audit trails that look complete but fail validation, and the cheap fixes that pass on the first pass.",
    art: "dome",
  },
  {
    id: "two-new-cleared-engineers",
    date: "Mar 22, 2026",
    iso: "2026-03-22",
    tag: "Announcement",
    cat: "Company",
    read: 3,
    title: "Pentecom expands cleared-personnel practice with two new senior engineers",
    excerpt: "Both joining from prime contractors, bringing IL5 and tactical-edge experience to the bench.",
    art: "blocks",
  },
  {
    id: "shadow-cutover-rehearsal",
    date: "Mar 05, 2026",
    iso: "2026-03-05",
    tag: "Field note",
    cat: "Field Notes",
    read: 7,
    title: "Why we rehearse every cutover in shadow",
    excerpt: "Notes from production data, missed-by-a-hair audits, and the operational reality diagrams cannot show.",
    art: "scan",
  },
  {
    id: "s1000d-committee-20th-seat",
    date: "Feb 21, 2026",
    iso: "2026-02-21",
    tag: "Announcement",
    cat: "Company",
    read: 2,
    title: "Pentecom announces 20th S1000D committee seat",
    excerpt: "Continuing a 28-year run of contributing to the standards we deliver against.",
    art: "dots",
  },
  {
    id: "il5-conversion-postmortem",
    date: "Feb 08, 2026",
    iso: "2026-02-08",
    tag: "Case study",
    cat: "Defense",
    read: 10,
    title: "An honest postmortem of an IL5 conversion that almost slipped",
    excerpt: "The two weeks where we thought we'd miss cutover, what we did, and what we'd repeat.",
    art: "datafield",
  },
  {
    id: "aerospace-record-validation-tool",
    date: "Jan 26, 2026",
    iso: "2026-01-26",
    tag: "Release",
    cat: "Aerospace",
    read: 5,
    title: "We open-sourced our S1000D record-validation tool",
    excerpt: "The same suite we ship on every aerospace engagement. Yours under MIT.",
    art: "blocks",
  },
  {
    id: "what-program-offices-really-need",
    date: "Jan 12, 2026",
    iso: "2026-01-12",
    tag: "Field note",
    cat: "Government",
    read: 6,
    title: "What program offices actually need from a conversion vendor",
    excerpt: "Five years of capture meetings distilled to a checklist you can take into a CDRL review.",
    art: "stack",
  },
];

export const CATEGORIES = ["All", "Company", "Defense", "Aerospace", "Medical", "Government", "Field Notes"];

/** Deterministic hue in the brand cool range (180-245) keyed to post id. */
export const hueFor = (id) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return 180 + (h % 65);
};
