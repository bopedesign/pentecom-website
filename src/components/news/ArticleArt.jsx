/* eslint-disable */
import React from 'react';

/* =========================================================================
   ArticleArt — small card thumbnail (320x180 viewBox)
   kind: "stack" | "datafield" | "dome" | "blocks" | "scan" | "dots"
   ========================================================================= */
export const ArticleArt = ({ kind, hue = 220 }) => {
  const baseProps = {
    viewBox: "0 0 320 180",
    preserveAspectRatio: "xMidYMid slice",
    style: { display: "block", width: "100%", height: "100%" },
    "aria-hidden": true,
  };
  switch (kind) {
    case "stack":
      return (
        <svg {...baseProps}>
          <defs>
            <linearGradient id={`gStack-${hue}`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%"  stopColor={`hsl(${hue} 55% 55%)`} stopOpacity="0.55" />
              <stop offset="100%" stopColor={`hsl(${(hue + 20) % 360} 55% 25%)`} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill={`hsl(${hue} 40% 10%)`} />
          <g transform="skewX(-12) translate(40, 0)">
            <rect x="0"  y="22"  width="160" height="40" fill={`url(#gStack-${hue})`} opacity="0.32" />
            <rect x="20" y="70"  width="180" height="40" fill={`url(#gStack-${hue})`} opacity="0.55" />
            <rect x="40" y="118" width="200" height="40" fill={`url(#gStack-${hue})`} opacity="0.85" />
          </g>
          <line x1="0" y1="160" x2="320" y2="160" stroke="rgba(255,255,255,0.18)" />
        </svg>
      );
    case "datafield":
      return (
        <svg {...baseProps}>
          <defs>
            <linearGradient id={`gDf-${hue}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor={`hsl(${hue} 70% 60%)`} stopOpacity="0.0" />
              <stop offset="50%" stopColor={`hsl(${hue} 70% 60%)`} stopOpacity="0.6" />
              <stop offset="100%" stopColor={`hsl(${(hue + 20) % 360} 65% 60%)`} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill={`hsl(${hue} 40% 9%)`} />
          <g stroke="rgba(255,255,255,0.42)" strokeWidth="1">
            {Array.from({ length: 16 }).map((_, i) => {
              const r1 = ((i * 9301 + 49297) % 233280) / 233280;
              const r2 = ((i * 17) % 13) / 13;
              const x1 = 30 + r1 * 30;
              const x2 = 290 - r2 * 30;
              const y = 24 + i * 9;
              return <line key={i} x1={x1} y1={y} x2={x2} y2={y} opacity={0.18 + ((i * 13) % 7) / 30} />;
            })}
          </g>
          <g fill="rgba(255,255,255,0.75)">
            {[2, 5, 9, 13].map((i, k) => <circle key={i} cx={[120, 240, 80, 200][k]} cy={24 + i * 9} r="1.6" />)}
          </g>
          <rect x="0" y="50" width="320" height="40" fill={`url(#gDf-${hue})`} />
          <g stroke="rgba(255,255,255,0.55)" strokeWidth="1" fill="none">
            <line x1="160" y1="140" x2="160" y2="170" />
            <line x1="145" y1="155" x2="175" y2="155" />
          </g>
        </svg>
      );
    case "dome":
      return (
        <svg {...baseProps}>
          <rect width="320" height="180" fill={`hsl(${hue} 40% 10%)`} />
          {Array.from({ length: 13 }).map((_, i) => {
            const t = i / 12;
            const xOffset = (t - 0.5) * 280;
            return (
              <path key={i}
                d={`M${160 + xOffset} 170 Q${160 + xOffset * 0.55} ${10 + Math.abs(xOffset) * 0.05} 160 10`}
                fill="none"
                stroke={`hsl(${hue} 50% 60%)`}
                strokeOpacity={0.18 + (i % 3) * 0.08}
                strokeWidth="0.8"
              />
            );
          })}
          <line x1="0" y1="170" x2="320" y2="170" stroke="rgba(255,255,255,0.28)" />
          <circle cx="160" cy="10" r="3" fill={`hsl(${hue} 60% 70%)`} />
        </svg>
      );
    case "blocks":
      return (
        <svg {...baseProps}>
          <rect width="320" height="180" fill={`hsl(${hue} 40% 10%)`} />
          {Array.from({ length: 12 }).map((_, i) =>
            Array.from({ length: 6 }).map((__, j) => {
              const seed = ((i * 7 + j * 31) * 9301 + 49297) % 233280;
              const v = seed / 233280;
              const fill = v > 0.75
                ? `hsl(${hue} 55% 60%)`
                : v > 0.55
                  ? `hsl(${hue} 50% 35%)`
                  : "rgba(255,255,255,0.05)";
              return (
                <rect key={`${i}-${j}`}
                  x={20 + i * 24} y={16 + j * 24}
                  width={20} height={20}
                  fill={fill}
                  transform={`skewX(-12) translate(${j * 4}, 0)`}
                  opacity={0.4 + v * 0.6}
                />
              );
            })
          )}
        </svg>
      );
    case "scan":
      return (
        <svg {...baseProps}>
          <defs>
            <linearGradient id={`gScan-${hue}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor={`hsl(${hue} 70% 60%)`} stopOpacity="0" />
              <stop offset="50%" stopColor={`hsl(${hue} 70% 60%)`} stopOpacity="0.45" />
              <stop offset="100%" stopColor={`hsl(${(hue + 20) % 360} 65% 60%)`} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill={`hsl(${hue} 40% 10%)`} />
          {Array.from({ length: 20 }).map((_, i) => (
            <rect key={i} x={i * 16} y="0" width="1" height="180"
              fill={i % 3 === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"} />
          ))}
          <rect x="80" y="0" width="120" height="180" fill={`url(#gScan-${hue})`} opacity="0.85" />
          <g stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none">
            <line x1="140" y1="80" x2="180" y2="80" />
            <line x1="160" y1="60" x2="160" y2="100" />
          </g>
        </svg>
      );
    case "dots":
    default:
      return (
        <svg {...baseProps}>
          <rect width="320" height="180" fill={`hsl(${hue} 40% 10%)`} />
          <defs>
            <pattern id={`pDots-${hue}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.32)" />
            </pattern>
          </defs>
          <rect width="320" height="180" fill={`url(#pDots-${hue})`} />
          <g transform="skewX(-12) translate(40, 0)">
            <rect x="40" y="50" width="180" height="80" fill={`hsl(${hue} 55% 28%)`} opacity="0.92" />
            <rect x="60" y="68" width="100" height="3" fill={`hsl(${hue} 60% 70%)`} />
            <rect x="60" y="78" width="140" height="3" fill="rgba(255,255,255,0.55)" />
            <rect x="60" y="88" width="80"  height="3" fill="rgba(255,255,255,0.40)" />
            <rect x="60" y="106" width="40" height="14" fill={`hsl(${hue} 65% 55%)`} />
          </g>
        </svg>
      );
  }
};

/* =========================================================================
   ArticleCoverArt — full-bleed cover variant (1200x540 viewBox)
   ========================================================================= */
export const ArticleCoverArt = ({ kind, hue = 220 }) => {
  const baseProps = {
    viewBox: "0 0 1200 540",
    preserveAspectRatio: "xMidYMid slice",
    style: { display: "block", width: "100%", height: "100%" },
    "aria-hidden": true,
  };
  switch (kind) {
    case "datafield":
      return (
        <svg {...baseProps}>
          <defs>
            <linearGradient id="acDfScan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor={`hsl(${hue} 70% 60%)`} stopOpacity="0" />
              <stop offset="50%" stopColor={`hsl(${hue} 70% 60%)`} stopOpacity="0.55" />
              <stop offset="100%" stopColor={`hsl(${(hue + 20) % 360} 65% 60%)`} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="acDfFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#000" stopOpacity="0" />
              <stop offset="12%"  stopColor="#000" stopOpacity="1" />
              <stop offset="88%"  stopColor="#000" stopOpacity="1" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </linearGradient>
            <mask id="acDfMask">
              <rect width="1200" height="540" fill="url(#acDfFade)" />
            </mask>
          </defs>
          <rect width="1200" height="540" fill={`hsl(${hue} 40% 9%)`} />
          <g stroke="rgba(255,255,255,0.06)">
            {[200, 600, 1000].map(x => <line key={x} x1={x} y1="20" x2={x} y2="520" />)}
          </g>
          <g mask="url(#acDfMask)" stroke="rgba(255,255,255,0.55)" strokeWidth="1">
            {Array.from({ length: 50 }).map((_, i) => {
              const seed = (i * 9301 + 49297) % 233280;
              const r1 = seed / 233280;
              const r2 = ((i * 7) % 13) / 13;
              const x1 = 160 + r1 * 200;
              const x2 = 1040 - r2 * 200;
              const y = 30 + i * 10;
              const op = 0.18 + ((i * 13) % 7) / 30;
              return <line key={i} x1={x1} y1={y} x2={x2} y2={y} opacity={op} />;
            })}
          </g>
          <g fill="rgba(255,255,255,0.9)" mask="url(#acDfMask)">
            {[5, 14, 22, 28, 35, 42].map((i, k) => (
              <circle key={i} cx={[280, 920, 480, 720, 200, 1000][k]} cy={30 + i * 10} r="3" opacity="0.6" />
            ))}
          </g>
          <g mask="url(#acDfMask)">
            <rect className="ac-cover-scan" x="0" y="-100" width="1200" height="160" fill="url(#acDfScan)" opacity="0.9" />
          </g>
          <g stroke="rgba(255,255,255,0.55)" strokeWidth="1" fill="none">
            <line x1="600" y1="240" x2="600" y2="300" />
            <line x1="570" y1="270" x2="630" y2="270" />
            <rect x="582" y="252" width="36" height="36" transform="rotate(45 600 270)" />
          </g>
          <circle cx="600" cy="270" r="4" fill="rgba(255,255,255,0.95)" />
        </svg>
      );
    case "stack":
      return (
        <svg {...baseProps}>
          <defs>
            <linearGradient id="acStackG" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%"  stopColor={`hsl(${hue} 55% 55%)`} stopOpacity="0.55" />
              <stop offset="100%" stopColor={`hsl(${(hue + 20) % 360} 55% 22%)`} stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <rect width="1200" height="540" fill={`hsl(${hue} 40% 10%)`} />
          <g transform="skewX(-12) translate(220, 0)">
            <rect x="0"   y="80"  width="600" height="80"  fill="url(#acStackG)" opacity="0.32" />
            <rect x="60"  y="200" width="640" height="80"  fill="url(#acStackG)" opacity="0.55" />
            <rect x="120" y="320" width="680" height="80"  fill="url(#acStackG)" opacity="0.85" />
            <rect x="120" y="332" width="120" height="56"  fill="rgba(255,255,255,0.7)" />
          </g>
          <line x1="0" y1="480" x2="1200" y2="480" stroke="rgba(255,255,255,0.18)" />
        </svg>
      );
    case "dome":
      return (
        <svg {...baseProps}>
          <rect width="1200" height="540" fill={`hsl(${hue} 40% 10%)`} />
          {Array.from({ length: 25 }).map((_, i) => {
            const t = i / 24;
            const xOffset = (t - 0.5) * 1100;
            return (
              <path key={i}
                d={`M${600 + xOffset} 510 Q${600 + xOffset * 0.55} ${30 + Math.abs(xOffset) * 0.05} 600 30`}
                fill="none"
                stroke={`hsl(${hue} 50% 60%)`}
                strokeOpacity={0.16 + (i % 3) * 0.08}
                strokeWidth="1"
              />
            );
          })}
          <line x1="0" y1="510" x2="1200" y2="510" stroke="rgba(255,255,255,0.28)" />
          <circle cx="600" cy="30" r="5" fill={`hsl(${hue} 60% 70%)`} />
        </svg>
      );
    case "blocks":
      return (
        <svg {...baseProps}>
          <rect width="1200" height="540" fill={`hsl(${hue} 40% 10%)`} />
          {Array.from({ length: 24 }).map((_, i) =>
            Array.from({ length: 10 }).map((__, j) => {
              const seed = ((i * 7 + j * 31) * 9301 + 49297) % 233280;
              const v = seed / 233280;
              const fill = v > 0.75
                ? `hsl(${hue} 55% 60%)`
                : v > 0.55
                  ? `hsl(${hue} 50% 35%)`
                  : "rgba(255,255,255,0.04)";
              return (
                <rect key={`${i}-${j}`}
                  x={60 + i * 44} y={40 + j * 44}
                  width={36} height={36}
                  fill={fill}
                  transform={`skewX(-12) translate(${j * 6}, 0)`}
                  opacity={0.4 + v * 0.6}
                />
              );
            })
          )}
        </svg>
      );
    case "scan":
      return (
        <svg {...baseProps}>
          <defs>
            <linearGradient id="acScanG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor={`hsl(${hue} 70% 60%)`} stopOpacity="0" />
              <stop offset="50%" stopColor={`hsl(${hue} 70% 60%)`} stopOpacity="0.45" />
              <stop offset="100%" stopColor={`hsl(${(hue + 20) % 360} 65% 60%)`} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="1200" height="540" fill={`hsl(${hue} 40% 10%)`} />
          {Array.from({ length: 60 }).map((_, i) => (
            <rect key={i} x={i * 20} y="0" width="1" height="540"
              fill={i % 3 === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"} />
          ))}
          <rect x="360" y="0" width="480" height="540" fill="url(#acScanG)" opacity="0.9" />
          <g stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" fill="none">
            <line x1="540" y1="270" x2="660" y2="270" />
            <line x1="600" y1="210" x2="600" y2="330" />
          </g>
          <circle cx="600" cy="270" r="4" fill="rgba(255,255,255,0.95)" />
        </svg>
      );
    case "dots":
    default:
      return (
        <svg {...baseProps}>
          <rect width="1200" height="540" fill={`hsl(${hue} 40% 10%)`} />
          <defs>
            <pattern id="acDots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="1.2" fill="rgba(255,255,255,0.30)" />
            </pattern>
          </defs>
          <rect width="1200" height="540" fill="url(#acDots)" />
          <g transform="skewX(-12) translate(120, 0)">
            <rect x="120" y="120" width="720" height="280" fill={`hsl(${hue} 55% 26%)`} opacity="0.95" />
            <rect x="160" y="160" width="320" height="6" fill={`hsl(${hue} 60% 70%)`} />
            <rect x="160" y="186" width="520" height="6" fill="rgba(255,255,255,0.6)" />
            <rect x="160" y="212" width="280" height="6" fill="rgba(255,255,255,0.4)" />
            <rect x="160" y="280" width="120" height="30" fill={`hsl(${hue} 65% 55%)`} />
          </g>
        </svg>
      );
  }
};

/* =========================================================================
   SmallArt — compact related-card variant (320x180 viewBox, simplified)
   ========================================================================= */
export const SmallArt = ({ kind, hue = 220 }) => {
  const ratio = { width: "100%", height: "100%", display: "block" };
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" style={ratio} aria-hidden="true">
      <rect width="320" height="180" fill={`hsl(${hue} 40% 10%)`} />
      {kind === "stack" && (
        <g transform="skewX(-12) translate(40, 0)">
          <rect x="0"  y="22" width="160" height="40" fill={`hsl(${hue} 55% 30%)`} opacity="0.45" />
          <rect x="20" y="70" width="180" height="40" fill={`hsl(${hue} 55% 35%)`} opacity="0.7" />
          <rect x="40" y="118" width="200" height="40" fill={`hsl(${hue} 60% 45%)`} />
        </g>
      )}
      {kind === "datafield" && (
        <g stroke={`hsl(${hue} 60% 60%)`} strokeWidth="1">
          {Array.from({ length: 14 }).map((_, i) => {
            const r = ((i * 9301 + 49297) % 233280) / 233280;
            return <line key={i} x1={30 + r * 30} y1={20 + i * 10} x2={290 - r * 30} y2={20 + i * 10} opacity={0.22 + (i % 4) * 0.1} />;
          })}
        </g>
      )}
      {kind === "dome" && (
        <g>
          {Array.from({ length: 13 }).map((_, i) => {
            const t = i / 12;
            const xOffset = (t - 0.5) * 280;
            return <path key={i} d={`M${160 + xOffset} 170 Q${160 + xOffset * 0.55} ${10 + Math.abs(xOffset) * 0.05} 160 10`} fill="none" stroke={`hsl(${hue} 50% 60%)`} strokeOpacity={0.18 + (i % 3) * 0.08} strokeWidth="0.8" />;
          })}
          <circle cx="160" cy="10" r="3" fill={`hsl(${hue} 60% 70%)`} />
        </g>
      )}
      {kind === "blocks" && Array.from({ length: 9 }).map((_, i) =>
        Array.from({ length: 5 }).map((__, j) => {
          const seed = ((i * 7 + j * 31) * 9301 + 49297) % 233280;
          const v = seed / 233280;
          const fill = v > 0.7 ? `hsl(${hue} 55% 60%)` : v > 0.45 ? `hsl(${hue} 50% 35%)` : "rgba(255,255,255,0.05)";
          return <rect key={`${i}-${j}`} x={32 + i * 28} y={20 + j * 28} width={22} height={22} fill={fill} transform={`skewX(-12) translate(${j * 4}, 0)`} opacity={0.4 + v * 0.6} />;
        })
      )}
      {kind === "scan" && (
        <g>
          {Array.from({ length: 18 }).map((_, i) => (
            <rect key={i} x={i * 18} y="0" width="1" height="180" fill={i % 3 === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"} />
          ))}
          <rect x="90" y="0" width="140" height="180" fill={`hsl(${hue} 60% 50%)`} opacity="0.32" />
        </g>
      )}
      {(kind === "dots" || !kind) && (
        <g>
          <defs>
            <pattern id={`sDots-${hue}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.32)" />
            </pattern>
          </defs>
          <rect width="320" height="180" fill={`url(#sDots-${hue})`} />
        </g>
      )}
    </svg>
  );
};
